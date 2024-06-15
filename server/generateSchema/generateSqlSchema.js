const {
  getConnectionFromPool,
  releaseConnectionToPool,
  getclientConnectionpool,
} = require("../dbconnection/sqldbconn");

const fs = require("fs");

async function getSchemaInfo() {
  // Get a connection from the pool
  const connection = await getclientConnectionpool("ecommerce");

  connection.query("SHOW TABLES", (err, tables) => {
    if (err) {
      console.error("Error retrieving table information:", err);
      connection.end(); // Close the connection in case of error
      return;
    }

    let schema = "";
    let remainingQueries = tables.length;

    // Iterate through tables and get schema
    tables.forEach((table) => {
      const tableName = table[`Tables_in_${connection.config.database}`];
      // schema += `-- Table: ${tableName}\n`;

      connection.query(`SHOW CREATE TABLE \`${tableName}\``, (err, results) => {
        remainingQueries--; // Decrement count regardless of success or error

        if (err) {
          console.error("Error retrieving create table statement:", err);
          checkCompletion();
          return;
        }

        schema += results[0]["Create Table"] + ";\n\n";

        console.log(`Retrieved schema information for table: ${tableName}`);
        console.log("Schema so far:", schema);

        checkCompletion();
      });
    });

    function checkCompletion() {
      if (remainingQueries === 0) {
        // Write schema information to a text file
        fs.writeFile("schema.sql", schema, (err) => {
          if (err) {
            console.error("Error writing schema information to file:", err);
            return;
          }
          console.log("Schema information has been saved to schema.sql");
          releaseConnectionToPool(connection);
        });
      }
    }
  });
}

getSchemaInfo();
