const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

const mongoRouter = express.Router();

mongoRouter.get('/', async (req, res) => {
    const databaseName = req.query.database;

    try {
        // Connect to MongoDB
        await mongoose.connect(`mongodb://localhost:27017/${databaseName}`);
        console.log(`Connected successfully to MongoDB server ${databaseName}`);
        // Get a reference to the MongoDB database
        const db = mongoose.connection.db;

        // List all collections in the database
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        console.log('Collections:', collectionNames);
        // Find all documents in the "transaction_data" collection using the Mongoose Model
        const documents = await Transaction.find();
        // console.log('Transactions:', transactions);
        res.json(documents); // Send the results as JSON
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = mongoRouter;
