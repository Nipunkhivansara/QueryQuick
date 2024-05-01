const sqlRouter = require('express').Router();
const mysql = require('mysql');

// Create connection pool
const pool =  mysql.createPool({
    connectionLimit: 10, // Adjust the limit as per your requirements
    host: 'localhost',
    user: 'root',
    // password: 'Nipunsql@123',
    password: 'Meet@123',
    database: 'capstone' // Replace 'your_database_name' with your database name
});


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

// Function to insert records
async function insertRecordsInDb(records, database) {
    const connection = await getConnectionFromPool(pool); // Get a connection from the pool
    try {
        // Insert each record into the SQL table
        await deleteVectorStore();
        for (const record of records) {
            if ( database == 'sql') {
                const sql = `INSERT INTO VectorStore (id, value) VALUES ('${record.id}',
                '${JSON.stringify(record.content)}')`;
                await executeQuery(connection, sql); // Execute the query using the connection
            } else if ( database == 'mongo') {
                const sql = `INSERT INTO VectorStoreMongo (id, value) VALUES ('${record.id}',
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

// Function to insert records
async function insertRecordsInMongoDb(records) {
    const connection = await getConnectionFromPool(pool); // Get a connection from the pool
    try {
        // Insert each record into the SQL table
        await deleteVectorStore();
        for (const record of records) {
            const sql = `INSERT INTO VectorStoreMongo (id, value) VALUES ('${record.id}',
             '${JSON.stringify(record.content)}')`;
            await executeQuery(connection, sql); // Execute the query using the connection
        }
    } catch (error) {
        console.error("Error inserting records:", error);
    } finally {
        releaseConnectionToPool(connection); // Release the connection back to the pool
    }
}

async function getTopKTablesContent(records) {
    const connection = await getConnectionFromPool(pool); // Get a connection from the pool
    try {
        // Insert each record into the SQL table
        await deleteVectorStore();
        for (const record of records) {
            const sql = `INSERT INTO VectorStore (id, value) VALUES ('${record.id}', '${JSON.stringify(record.content)}')`;
            await executeQuery(connection, sql); // Execute the query using the connection
        }
    } catch (error) {
        console.error("Error inserting records:", error);
    } finally {
        releaseConnectionToPool(connection); // Release the connection back to the pool
    }
}

async function getTopKEmbeddingsFromDb(ids) {
    const connection = await getConnectionFromPool(pool); // Get a connection from the pool
    try {
        // Insert each record into the SQL table
        var placeholders = ids.map(() => '?').join(',');
        var SQL = `SELECT value FROM VectorStore WHERE id IN (?)`;
        const queryData = [ids];
        
        const content = await new Promise((resolve, reject) => { connection.query(SQL, queryData, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
    return content;

    } catch (error) {
        console.error("Error inserting records:", error);
    } finally {
        releaseConnectionToPool(connection); // Release the connection back to the pool
    }
}

async function deleteVectorStore() {
    const connection = await getConnectionFromPool(pool); // Get a connection from the pool
    try {
        // Insert each record into the SQL table
            const sql = `DELETE FROM VectorStore`;
            await executeQuery(connection, sql); // Execute the query using the connection
            console.log("Records deleted successfully");

        }
    catch (error) {
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

// Function to get a connection from the pool
function getConnectionFromPool(pool) {
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


// Function to release a connection back to the pool
function releaseConnectionToPool(connection) {
    connection.release();
}



module.exports = {sqlRouter, insertRecordsInDb, getTopKEmbeddingsFromDb};