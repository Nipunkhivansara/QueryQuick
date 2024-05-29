const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, // Adjust the limit as per your requirements
  host: "localhost",
  user: "root",
  // password: "Nipunsql@123",
  // password: "Meet@123",
  // password: "king2002",
  password: "aswin",
  // password: "king2002",
  database: "capstone", // Replace 'your_database_name' with your database name
});

let clientConnectionpool = null;

async function getclientConnectionpool(database) {
  if (clientConnectionpool == null) {
    clientConnectionpool = mysql.createPool({
      connectionLimit: 100, // Adjust the limit as per your requirements
      host: "localhost",
      user: "root",
      //password: "Meet@123",
      // password: "Nipunsql@123",
      // password: "king2002",
      password: "aswin",
      database: database,
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

module.exports = {
  getConnectionFromPool,
  releaseConnectionToPool,
  getclientConnectionpool,
  releaseClientConnectionToPool,
};

// Perform database operations here

// Close the connection when done
