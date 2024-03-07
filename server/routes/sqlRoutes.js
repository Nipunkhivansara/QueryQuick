const sqlRouter = require('express').Router();
const mysql = require('mysql');


sqlRouter.get('/', (req, res) => {
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'aswin',
        database: req.query.database
    });
    
    connection.connect();
    console.log(`Backend : Querying database: ${req.query.database} with query: ${req.query.query}`);
    connection.query(req.query.query, (error, results, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = sqlRouter;