import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import dotenv from "dotenv";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

dotenv.config();

async function loadDocuments(filePath) {
  const loader = new TextLoader(filePath);
  const docs = await loader.load();
  return docs;
}

async function splitDocuments(docs) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 1,
  });
  return await splitter.splitDocuments(docs);
}

// TODO: This should be created only once at the start of the session
async function createVectorStore(docOutput) {
  return await MemoryVectorStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings()
  );
}

async function similaritySearch(vectorStore, query, k) {
  return await vectorStore.similaritySearch(query, k);
}

export async function processDocuments(filePath, query, k) {
  try {
    const docs = await loadDocuments(filePath);
    const docOutput = await splitDocuments(docs);
    const vectorStore = await createVectorStore(docOutput);
    const result = await similaritySearch(vectorStore, query, k);
    return result;
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
}
