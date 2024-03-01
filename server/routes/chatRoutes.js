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

router.post("/chat", async(req,res) => {
try {
  const {prompt} = req.body;
  let result = await processDocuments(`../sample_sql.txt`, prompt, 2); 
  // openai.completions.create({
  //     model: "gpt-3.5-turbo-instruct",
  //     prompt: prompt,
  //     temperature: 1,
  //     max_tokens: 10,
  //     top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     }).then(response => {
  //       const responseData = response.choices[0].text;
  //       console.log(response);
  //       res.send(response);
  //     }).catch(error => {
  //       console.error("Error:", error);
  //     });
    return res.status(200).send(result);
    }
    catch(err) {
      res.status(500).send(err)
    }
  })

module.exports = router;

