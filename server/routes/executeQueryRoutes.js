const sqlExecutionRouter = require("express").Router();
const {
  getclientConnectionpool,
  releaseClientConnectionToPool,
} = require("../dbconnection/sqldbconn.js");

sqlExecutionRouter.get("/", async (req, res) => {
  const connection = await getclientConnectionpool(req.query.database);
  console.log(
    `Backend : Querying database: ${req.query.database} with query: ${req.query.query}`
  );
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(req.query.query, (error, results, fields) => {
        if (error) {
          console.error(error);
          reject(error); //
        } else {
          // Results contain the rows returned by the query
          resolve(results);
        }
      });
    });
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    // Catch any errors that occurred during query execution
    console.error(error);
    // Send an error response with a 500 status code
    res.status(500).send(error.message);
  } finally {
    // Always release the connection back to the pool
    releaseClientConnectionToPool(connection);
  }
});

module.exports = { sqlExecutionRouter };
