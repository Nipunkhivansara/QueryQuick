const mysql = require('mysql');
const fs = require('fs');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nipunsql@123',
  database: 'new_schema'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
  getSchemaInfo();
});

function getSchemaInfo() {
    connection.query('SHOW TABLES', (err, tables) => {
      if (err) {
        console.error('Error retrieving table information:', err);
        connection.end(); // Close the connection in case of error
        return;
      }
  
      let schema = '';
      let remainingQueries = tables.length;
  
      // Iterate through tables and get schema
      tables.forEach((table) => {
        const tableName = table[`Tables_in_${connection.config.database}`];
       // schema += `-- Table: ${tableName}\n`;
  
        connection.query(`SHOW CREATE TABLE \`${tableName}\``, (err, results) => {
          remainingQueries--; // Decrement count regardless of success or error
  
          if (err) {
            console.error('Error retrieving create table statement:', err);
            checkCompletion();
            return;
          }
  
          schema += results[0]['Create Table'] + ';\n\n';
  
          console.log(`Retrieved schema information for table: ${tableName}`);
          console.log('Schema so far:', schema);
  
          checkCompletion();
        });
      });
  
      function checkCompletion() {
        if (remainingQueries === 0) {
          // Write schema information to a text file
          fs.writeFile('schema.sql', schema, (err) => {
            if (err) {
              console.error('Error writing schema information to file:', err);
              return;
            }
            console.log('Schema information has been saved to schema.sql');
            connection.end(); // Close the connection after all queries have finished
          });
        }
      }
    });
  }
// Perform database operations here

// Close the connection when done
