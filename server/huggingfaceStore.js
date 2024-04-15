import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import dotenv from "dotenv";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
const storeEmbeddings = require('../server/pinecone/pineconeconn');
dotenv.config();

let globalVectorStore = null;

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
    new HuggingFaceInferenceEmbeddings({
        apiKey: "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", 
        model: "intfloat/e5-large"
      })
  );
}

async function getOrCreateVectorStore(docOutput) {
  if (!globalVectorStore) {
    globalVectorStore = await createVectorStore(docOutput);
  }
  return globalVectorStore;
}

async function similaritySearch(vectorStore, query, k) {
  return await vectorStore.similaritySearch(query, k);
}

export async function processDocuments(filePath, query, k) {
  try {
    const docs = await loadDocuments(filePath);
    const docOutput = await splitDocuments(docs);
    const vectorStore = await getOrCreateVectorStore(docOutput);
    const abc = await storeEmbeddings(vectorStore);
    const result = await similaritySearch(vectorStore, query, k);
    return result;
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
}
