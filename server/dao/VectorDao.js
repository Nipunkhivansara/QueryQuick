const sqlRouter = require("express").Router();
const mysql = require("mysql");
const {
  getConnectionFromPool,
  releaseConnectionToPool,
} = require("../dbconnection/sqldbconn.js");

// Function to insert records
async function insertRecordsInDb(records, dbType) {
  const connection = await getConnectionFromPool(); // Get a connection from the pool
  try {
    // Insert each record into the SQL table
    await deleteVectorStore(dbType);
    for (const record of records) {
      if (dbType == "sql") {
        const sql = `INSERT INTO VectorStore (id, value) VALUES ('${record.id}',
                '${JSON.stringify(record.content)}')`;
        await executeQuery(connection, sql); // Execute the query using the connection
      } else if (dbType == "mongo") {
        const sql = `INSERT INTO VectorStoreMongo (id, value) VALUES ('${
          record.id
        }',
                '${JSON.stringify(record.content)}')`;
        await executeQuery(connection, sql); // Execute the query using the connection
      }
    }
  } catch (error) {
    console.error("Error inserting records:", error);
  } finally {
    releaseConnectionToPool(connection); // Release the connection back to the pool
  }
}

async function getTopKEmbeddingsFromDb(ids, dbType) {
  const connection = await getConnectionFromPool(); // Get a connection from the pool
  try {
    // Insert each record into the SQL table
    var placeholders = ids.map(() => "?").join(",");
    let SQL;
    if (dbType == "sql") {
      SQL = `SELECT value FROM VectorStore WHERE id IN (?)`;
    } else if (dbType == "mongo") {
      SQL = `SELECT value FROM VectorStoreMongo WHERE id IN (?)`;
    }

    const queryData = [ids];

    const content = await new Promise((resolve, reject) => {
      connection.query(SQL, queryData, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const topKEmbeddingsData = content.map((item) => item.value);

    return topKEmbeddingsData;
  } catch (error) {
    console.error("Error inserting records:", error);
  } finally {
    releaseConnectionToPool(connection); // Release the connection back to the pool
  }
}

async function deleteVectorStore(dbType) {
  const connection = await getConnectionFromPool(); // Get a connection from the pool
  try {
    let SQL;
    if (dbType == "sql") {
      SQL = `DELETE FROM VectorStore`;
    } else if (dbType == "mongo") {
      SQL = `DELETE FROM VectorStoreMongo`;
    }
    await executeQuery(connection, SQL); // Execute the query using the connection
    console.log("Records deleted successfully");
  } catch (error) {
    console.error("Error deleting records:", error);
  } finally {
    releaseConnectionToPool(connection); // Release the connection back to the pool
  }
}

// Function to execute a query using a connection
function executeQuery(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { sqlRouter, insertRecordsInDb, getTopKEmbeddingsFromDb };
