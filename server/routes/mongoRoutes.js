const express = require('express');
const OpenAI = require("openai");
const processDocuments = require('../vectoreStoreMongo.js');
const {processQuery, createAndStoreVectorEmbeddings} = require('../vectorstore.js');

const mongoRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

mongoRouter.post("/", async (req,res) => {
    try {
        console.log("Post request received for intialization");
        const result = await createAndStoreVectorEmbeddings(`../server/mongodbschema.json`, 'mongo'); 
        res.sendStatus(200);
    }
        catch (err) {
        console.error("Error:", err);
        res.status(500).send(err); // Send an error response back to the client
        }
});

mongoRouter.post('/chat', async (req, res) => {

    try {
        const {prompt} = req.body;

        const result = await processQuery(`mongodbschema.json`, prompt, 2); 
        const combinedPageContent = result.map(doc => doc.pageContent).join('');
        const x = `These are the mongodb collections and documents: ${combinedPageContent} ... give me the mongodb query for: ${prompt} ... follow the naming conventions of all fields. aggregate and give pipeline stages, if you must. give it in a single line without newline characters. .... give strictly only the mongodb query. NO Explanation.`;
        openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: x, // Replace "Your prompt text goes here" with your actual prompt text
            temperature: 1,
            max_tokens: 70,
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

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = mongoRouter;
