const OpenAI = require("openai");
const express = require("express");
const dotenv = require("dotenv");
const processDocuments = require('../vectorstore.js');

dotenv.config()

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Welcome to the Airbook");
});

router.post("/chat", async (req,res) => {
try {
  console.log("Post request received");
  const {prompt} = req.body;
  const result = await processDocuments(`../server/schema.sql`, prompt, 4); 
  const combinedPageContent = result.map(doc => doc.pageContent).join('');
  console.log(combinedPageContent)
  const x = '...' + 'This is the schema of the tables' +
           combinedPageContent +
          '...' + 'give me the sql query for:' +
          prompt +
          '... give strictly only the sql query';
  console.log(x);
  openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: x, // Replace "Your prompt text goes here" with your actual prompt text
      temperature: 1,
      max_tokens: 10,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then(response => {
      const responseData = response.choices[0].text;
      console.log(response);
      res.status(200).json({"msg" : responseData}); // Send the response back to the client
    }).catch(error => {
      console.error("Error:", error);
      res.status(500).send(error); // Send an error response back to the client
    });
  }
   catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});




module.exports = router;

