const mysql = require("mysql");
const fs = require("fs");

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust the limit as per your requirements
  host: "localhost",
  user: "root",
  password: "Nipunsql@123",
  // password: "Meet@123",
  database: "capstone", // Replace 'your_database_name' with your database name
});

let clientConnectionpool = null;

async function getclientConnectionpool(req) {
  if (clientConnectionpool == null) {
    clientConnectionpool = mysql.createPool({
      connectionLimit: 10, // Adjust the limit as per your requirements
      host: "localhost",
      user: "root",
      //password: "aswin",
      password: "Nipunsql@123",
      //password: "Meet@123",
      database: req.query.database,
    });
  }
  return getClientConnectionFromPool();
}

// Function to get a connection from the pool
async function getConnectionFromPool() {
  return new Promise((resolve, reject) => {
    if (!pool) {
      reject(new Error("Connection pool is not initialized"));
      return;
    }
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
}

async function getClientConnectionFromPool() {
  return new Promise((resolve, reject) => {
    if (!clientConnectionpool) {
      reject(new Error("Connection pool is not initialized"));
      return;
    }
    clientConnectionpool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
}

// Function to release a connection back to the pool
async function releaseConnectionToPool(connection) {
  connection.release();
}

async function releaseClientConnectionToPool(clientconnection) {
  clientconnection.release();
}

async function getSchemaInfo() {
  const connection = await getConnectionFromPool(); // Get a connection from the pool

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

module.exports = {
  getConnectionFromPool,
  releaseConnectionToPool,
  getclientConnectionpool,
  releaseClientConnectionToPool,
};

// Perform database operations here

// Close the connection when done
