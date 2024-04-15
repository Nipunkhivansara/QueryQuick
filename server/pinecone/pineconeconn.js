const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require("dotenv");
dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECODE_API_KEY 
});
const index = pc.index("capstone1")


async function storeEmbeddings(records) {
    try {
      // Generate embeddings using Hugging Face model
      // Store embeddings into Pinecone
    const stats = await index.describeIndexStats();
  //  console.log(embeddingsData);
    
    console.log(records);

  //  console.log(records)
    await index.upsert(records);
   
    //await pc.upsertVectors('capstone1', ids, embeddings);
    console.log("Embeddings stored successfully!");
}


  catch (error) {
      console.error("Error generating or storing embeddings:", error);
    }
  }


  async function  getTopKEmbeddings(query, k) {
    try {
    console.log("queyr is ", query);
    const stats = await index.describeIndexStats();
    console.log(stats);
     const queryResponse = await index.namespace('').query({
      vector: query,
      topK: 8,    
    });
    console.log(queryResponse);
    return queryResponse;
  }
  catch (error) {
      console.error("Error generating or storing embeddings:", error);
    }
  }

  async function deleteVectorStoreFromPineCone() {
    try {
    const queryResponse = await index.deleteAll();
    console.log("Embeddings deleted successfully!");
  }
  catch (error) {
    console.error("Error generating or storing embeddings:", error);
  }
}

  async function deleteAndStore(records) {
    await deleteVectorStoreFromPineCone();
    await storeEmbeddings(records)
  }

 
  
module.exports = {storeEmbeddings,getTopKEmbeddings, deleteAndStore};