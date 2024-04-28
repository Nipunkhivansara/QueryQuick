const express = require('express');
const OpenAI = require("openai");
const processDocuments = require('../vectoreStoreMongo.js');

const mongoRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

mongoRouter.post('/chat', async (req, res) => {

    try {
        const {prompt} = req.body;

        const result = await processDocuments(`mongodbschema.json`, prompt, 4); 
        const combinedPageContent = result.map(doc => doc.pageContent).join('');
        const x = `These are the mongodb collections and documents: ${combinedPageContent} ... give me the mongodb query for: ${prompt} ... follow the naming conventions of all fields. aggregate and give pipeline stages, if you must. give it in a single line without newline characters. .... give strictly only the mongodb query. NO Explanation.`;
        console.log(x);
        openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: x, // Replace "Your prompt text goes here" with your actual prompt text
            temperature: 1,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            }).then(response => {
            const responseData = response.choices[0].text.trim();
            console.log(response);
            res.status(200).json({"msg" : responseData}); // Send the response back to the client
            }).catch(error => {
            console.error("Error:", error);
            res.status(500).send(error); // Send an error response back to the client
            });

        // Find all documents in the "transaction_data" collection using the Mongoose Model
        // const documents = await Transaction.find();
        // // console.log('Transactions:', transactions);
        // res.json(documents); // Send the results as JSON

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = mongoRouter;
