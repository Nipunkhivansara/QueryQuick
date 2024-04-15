const mongoose = require('mongoose');
const fs = require('fs');


// Create a connection to the database
const databaseName = 'SampleUCI';

mongoose.connect(`mongodb://localhost:27017/${databaseName}`)
  .then(async () => {
    console.log(`Connected successfully to MongoDB server ${databaseName}`);
    // Get a reference to the MongoDB database
    const db = mongoose.connection.db;
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    console.log('Collections:', collectionNames);

    const documents = {}

    // Iterate over each collection
    for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;

        // Fetch a document from the collection
        const Model = mongoose.model(collectionName, new mongoose.Schema({}, { collection: collectionName }));
        const document = await Model.findOne();

        documents[collectionName] = document.toObject();

        // Write schema information to a text file
        fs.writeFile('mongodbschema.json', `${JSON.stringify(documents)}`, (err) => {
            if (err) {
              console.error('Error writing schema information to file:', err);
              return;
            }
        })        
    }
    console.log('Schema information has been saved to mongodbschema.json');

  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB server ${databaseName}:`, error);
  });

        