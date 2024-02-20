import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import { processDocuments } from "file:///D:/Keystone/server/vectorstore.js";

dotenv.config()

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


router.post("/chat", async(req,res) => {
try {
    const {prompt} = req.body;
    const result = await processDocuments("D:/Keystone/sample_sql.txt", prompt, 3); 
    console.log(result)
    // Call the processDocuments function with appropriate parameters

    openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        temperature: 1,
        max_tokens: 10,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then(response => {
        const responseData = response.choices[0].text;
        console.log(response);
        res.send(response);
      }).catch(error => {
        console.error("Error:", error);
      });
          }
    catch(err) {
        res.status(500).send(err)
    }
})

export default router

