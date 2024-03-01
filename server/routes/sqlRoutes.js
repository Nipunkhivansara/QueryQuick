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
    connection.query(`SELECT * FROM users`, (error, results, fields) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(results);
        }
    });
});

module.exports = sqlRouter;