const OpenAI = require("openai");
const express = require("express");
const dotenv = require("dotenv");
const {
  processQuery,
  createAndStoreVectorEmbeddings,
} = require("../vectorstore.js");

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Welcome to the Airbook");
});

router.post("/chat", async (req, res) => {
  try {
    console.log("Post request received");
    const { prompt } = req.body;
    // res.status(200).json({ msg: "select * from events;" });
    const result = await processQuery(prompt, "sql");
    const x =
      "..." +
      "This is the schema of the tables of my sql database" +
      result +
      "..." +
      "give me the sql query for finding the:" +
      prompt +
      "Using strictly the schema details I provided." +
      "... give strictly only the sql query";
    console.log(x);
    openai.completions
      .create({
        model: "gpt-3.5-turbo-instruct",
        prompt: x, // Replace "Your prompt text goes here" with your actual prompt text
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        let responseData = response.choices[0].text;
        responseData = responseData.trim().replace(/\n/g, " ");
        console.log(responseData);
        res.status(200).json({ msg: responseData }); // Send the response back to the client
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).send(error); // Send an error response back to the client
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});

router.post("/generateSqlEmbeddings", async (req, res) => {
  try {
    console.log("Post request received for intialization");
    const result = await createAndStoreVectorEmbeddings(
      `../server/schema.sql`,
      "sql"
    );
    res.sendStatus(200);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});

module.exports = router;
