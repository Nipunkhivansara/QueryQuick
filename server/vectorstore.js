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

const getTableSchemas =  (filePath) => {
  // Parse the file , separate content by ";" and add it to the list
  const fileContent =  fs.readFileSync(filePath, "utf8");
            const tableSchemas = fileContent.split(";");
  return tableSchemas;
};

async function loadDocuments(filePath) {

const tableSchemas =  getTableSchemas(filePath);

  return tableSchemas;
}

const createVectorStore = async (docOutput) => {
  let ids = docOutput.map((_, index) => ({ id : index + 1 }));

  return  await MemoryVectorStore.fromTexts(
    docOutput,
    ids,
    new HuggingFaceInferenceEmbeddings({
      apiKey: "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", 
      model: "intfloat/e5-large"
    })
  );
}


async function similaritySearch(vectorStore, query, k) {
  return await vectorStore.similaritySearch(query, k);
}

const createAndStoreVectorEmbeddings = async(filePath) => {
  try {
    // Process documents only if processedData is null (first time)
    if (!vectorStore) {
      console.log("processing the data for 1st time");
      const docOutput = await loadDocuments(filePath);
      const vectorStore = await createVectorStore(docOutput);
      const records = vectorStore.memoryVectors.map((vector) => {
      return {
          "id": vector.metadata.id.toString(), // Assuming 'content' property is unique and suitable as ID
          "values": vector.embedding,
          "content": vector.content // Assuming 'embedding' property contains the vector values
      };
    });
      const rec = vectorStore.memoryVectors.map((vector) => {
        return {
            "id": vector.metadata.id.toString(), // Assuming 'content' property is unique and suitable as ID
            "values": vector.embedding,
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

const processQuery = async (query, k) => {
  try {
    // Process documents only if processedData is null (first time)
    const queryvectorStore = await createVectorStore([query]);
    console.log("queryvectorStore", queryvectorStore);
    // const rec = queryvectorStore.memoryVectors.map((vector) => {
    //   return {
    //       "id": "40", // Assuming 'content' property is unique and suitable as ID
    //       "values": vector.embedding,
    //   };
    // });
    // await storeEmbeddings(rec);
``
    const topKEmbeddings =  await getTopKEmbeddings(queryvectorStore.memoryVectors[0].embedding, k);
    //console.log(topKEmbeddings);
    const ids = topKEmbeddings.matches.map(el => el.id);
    console.log("ids is", ids);

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