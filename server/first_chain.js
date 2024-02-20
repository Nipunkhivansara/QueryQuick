import dotenv from "dotenv";
dotenv.config()


import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {LLMChain } from "langchain/chains";

const model = new OpenAI({temperature:0});
const promptAsString = "Human: Tell me a short joke about ice cream";


const chain = new LLMChain({llm: model , promptAsString})
const response = await chain.call();
console.log(response);