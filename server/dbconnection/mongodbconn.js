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

    const schemas = {}

    // Iterate over each collection
    for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;

        // Attempt to get the Mongoose model for the collection, if it exists
        let Model;
        if (mongoose.models[collectionName]) {
            Model = mongoose.models[collectionName];
        } else {
            // If the model does not exist, use a basic schema to fetch documents
            Model = mongoose.model(collectionName, new mongoose.Schema({}, { collection: collectionName }));
        }

        // Use the model's schema to get field names and types
        const schemaDefinition = Model.schema.obj;
        const fieldTypes = {};
        for (const [key, value] of Object.entries(schemaDefinition)) {
            fieldTypes[key] = value.type?.name || 'Mixed';
        }

        // If necessary, fetch a document to infer any schema-less fields
        if (Object.keys(fieldTypes).length === 0) {
            const document = await Model.findOne();
            if (document) {
                for (const [key, value] of Object.entries(document.toObject())) {
                    fieldTypes[key] = typeof value;
                }
            }
        }

        schemas[collectionName] = fieldTypes;
    }

    // Write schema information to a text file
    fs.writeFile('mongodbschema.json', JSON.stringify(schemas, null, 4), (err) => {
        if (err) {
        console.error('Error writing schema information to file:', err);
        return;
        }
        console.log('Schema information has been saved to mongodbschema.json');
    });
    console.log('Schema information has been saved to mongodbschema.json');

  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB server ${databaseName}:`, error);
  });

        