const sqlExecutionRouter = require("express").Router();
const {
  getclientConnectionpool,
  releaseClientConnectionToPool,
} = require("../dbconnection/sqldbconn.js");

sqlExecutionRouter.get("/", async (req, res) => {
  const connection = await getclientConnectionpool(req);
  console.log(
    `Backend : Querying database: ${req.query.database} with query: ${req.query.query}`
  );
  connection.query(req.query.query, (error, results, fields) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
  releaseClientConnectionToPool(connection);
});

module.exports = { sqlExecutionRouter };
