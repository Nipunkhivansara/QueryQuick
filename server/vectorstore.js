const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const {
  HuggingFaceInferenceEmbeddings,
} = require("@langchain/community/embeddings/hf");

const { OpenAIEmbeddings } = require("@langchain/openai");
const dotenv = require("dotenv");
const { Document } = require("langchain/document");
const RecursiveCharacterTextSplitter = require("langchain/text_splitter");
const fs = require("fs");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const {
  getTopKEmbeddings,
  deleteAndStore,
} = require("../server/pinecone/pineconeconn");
const {
  insertRecordsInDb,
  getTopKEmbeddingsFromDb,
} = require("./dao/VectorDao");

dotenv.config();

let vectorStore = null;

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  // Default value if omitted is 512. Max is 2048
  modelName: "text-embedding-3-large",
  dimensions: parseInt(process.env.DIMENSIONS),
});

const getTableSchemas = async (filePath, dbType) => {
  // Parse the file , separate content by ";" and add it to the list
  const fileContent = await fs.readFileSync(filePath, "utf8");
  let tableSchemas;
  if (dbType == "sql") {
    tableSchemas = fileContent.split(";");
  } else if (dbType == "mongo") {
    tableSchemas = fileContent.split("}").map((doc) => doc.trim() + "}");
  }
  return tableSchemas;
};

async function loadDocuments(filePath, dbType) {
  console.log("Loading schema");
  const tableSchemas = getTableSchemas(filePath, dbType);
  return tableSchemas;
}

const createOpenAiEmbeddings = async (documents) => {
  const documentRes = await embeddings.embedDocuments(documents);
  console.log("created open ai embedding");
  return documentRes;
};

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

const createAndStoreVectorEmbeddings = async (filePath, dbType) => {
  try {
    if (!vectorStore) {
      const docOutput = await loadDocuments(filePath, dbType);
      const openAi = await createOpenAiEmbeddings(docOutput);
      const records = docOutput.map((doc, index) => {
        return {
          id: index, // Assuming 'content' property is unique and suitable as ID
          content: doc,
        };
      });
      const rec = openAi.map((vector, index) => {
        return {
          id: index.toString(), // Assuming 'content' property is unique and suitable as ID
          values: vector,
        };
      });
      await insertRecordsInDb(records, dbType);
      await deleteAndStore(rec, dbType);
    }
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
};

const processQuery = async (query, dbType) => {
  try {
    const queryvectorStore = await createOpenAiEmbeddings([query]);
    const topKEmbeddings = await getTopKEmbeddings(queryvectorStore[0], dbType);
    const ids = topKEmbeddings.matches.map((el) => el.id);
    console.log("Topk ids is", ids);
    const topKTablesContent = await getTopKEmbeddingsContent(ids, dbType);
    return topKTablesContent; // Return processedData
  } catch (error) {
    console.error("Error processing documents:", error);
    return null;
  }
};

async function getTopKEmbeddingsContent(topKEmbeddingsId, dbType) {
  const topKTablesContent = await getTopKEmbeddingsFromDb(
    topKEmbeddingsId,
    dbType
  );
  return topKTablesContent;
}

module.exports = { processQuery, createAndStoreVectorEmbeddings };
