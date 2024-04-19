const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { HuggingFaceInferenceEmbeddings } = require("@langchain/community/embeddings/hf");
const { OpenAIEmbeddings } = require("@langchain/openai");
const dotenv = require("dotenv");
const {Document} = require("langchain/document");
const RecursiveCharacterTextSplitter = require("langchain/text_splitter");
const fs = require("fs");
const {TextLoader} = require("langchain/document_loaders/fs/text");
const {storeEmbeddings, getTopKEmbeddings, deleteAndStore} = require('../server/pinecone/pineconeconn');
const {insertRecordsInDb, getTopKEmbeddingsFromDb} = require("../server/routes/sqlRoutes");

dotenv.config();

let vectorStore = null;

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  // Default value if omitted is 512. Max is 2048
  modelName: "text-embedding-3-large",
  dimensions: parseInt(process.env.DIMENSIONS),
});

const getTableSchemas =  async (filePath) => {
  // Parse the file , separate content by ";" and add it to the list
  const fileContent =  await fs.readFileSync(filePath, "utf8");
  const tableSchemas = fileContent.split(";");
  return tableSchemas;
};

async function loadDocuments(filePath) {
console.log("Loading schema");
const tableSchemas =  getTableSchemas(filePath);
  return tableSchemas;
}

const createOpenAiEmbeddings = async(documents) => {
  const documentRes = await embeddings.embedDocuments(documents);
  console.log("created open ai embedding");
  return documentRes;
}

// const createVectorStore = async (docOutput) => {
//   let ids = docOutput.map((_, index) => ({ id : index + 1 }));

//   return  await MemoryVectorStore.fromTexts(
//     docOutput,
//     ids,
//     new HuggingFaceInferenceEmbeddings({
//       apiKey: process.env.HUGGING_FACE_KEY, 
//       model: "intfloat/e5-large"
//     })
//   );
// }

// async function similaritySearch(vectorStore, query, k) {
//   return await vectorStore.similaritySearch(query, k);
// }

const createAndStoreVectorEmbeddings = async(filePath) => {
  try {
    if (!vectorStore) {
      const docOutput = await loadDocuments(filePath);
      const openAi = await createOpenAiEmbeddings(docOutput);
      const records = docOutput.map((doc, index) => {
      return {
          "id": index, // Assuming 'content' property is unique and suitable as ID
          "content": doc,
      };
    });
    const rec = openAi.map((vector, index) => {
        return {
            "id": index.toString() ,// Assuming 'content' property is unique and suitable as ID
            "values": vector,
        };
      });
    await insertRecordsInDb(records);
    await deleteAndStore(rec);
    } 
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
}

const processQuery = async (query) => {
  try {
    const queryvectorStore = await createOpenAiEmbeddings([query]);
    const topKEmbeddings =  await getTopKEmbeddings(queryvectorStore[0]);
    const ids = topKEmbeddings.matches.map(el => el.id);
    console.log("Topk ids is", ids);
    const topKTablesContent = await getTopKEmbeddingsContent(ids);
    return topKTablesContent; // Return processedData
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
}

async function getTopKEmbeddingsContent(topKEmbeddingsId) {
  const topKTablesContent = await getTopKEmbeddingsFromDb(topKEmbeddingsId);
  return topKTablesContent
}

module.exports = {processQuery, createAndStoreVectorEmbeddings};