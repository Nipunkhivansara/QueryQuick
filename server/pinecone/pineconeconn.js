const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require("dotenv");
dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECODE_API_KEY 
});
// const index = pc.index(process.env.PINECODE_API_INDEX)
let index;


async function storeEmbeddings(records, dbType) {
    try {
      if(dbType == 'sql') {
        index = pc.index(process.env.PINECODE_API_MYSQL_INDEX);
      } else if (dbType == 'mongo') {
        index = pc.index(process.env.PINECODE_API_MONGODB_INDEX);
      }
    const stats = await index.describeIndexStats();
    console.log(stats);
    
   // console.log(records);

  //  console.log(records)
    await index.upsert(records);
   
    //await pc.upsertVectors('capstone1', ids, embeddings);
    console.log("Embeddings stored successfully!");
}


  catch (error) {
      console.error("Error generating or storing embeddings:", error);
    }
  }


  async function  getTopKEmbeddings(query, dbType) {
    try {
    if(dbType == 'sql') {
      index = pc.index(process.env.PINECODE_API_MYSQL_INDEX);
    } else if (dbType == 'mongo') {
      index = pc.index(process.env.PINECODE_API_MONGODB_INDEX);
    }
     const queryResponse = await index.namespace('').query({
      vector: query,
      topK: parseInt(process.env.K_SIMILAR),    
    });
    console.log(queryResponse);
    return queryResponse;
  }
  catch (error) {
      console.error("Error generating or storing embeddings:", error);
    }
  }

  async function deleteVectorStoreFromPineCone(dbType) {
    try {
      let index;
      if(dbType == 'sql') {
        index = pc.index(process.env.PINECODE_API_MYSQL_INDEX);
      } else if (dbType == 'mongo') {
        index = pc.index(process.env.PINECODE_API_MONGODB_INDEX);
      }
    const queryResponse = await index.deleteAll();
    console.log("Embeddings deleted successfully!");
  }
  catch (error) {
    console.error("Error generating or storing embeddings:", error);
  }
}

  async function deleteAndStore(records, dbType) {
    await deleteVectorStoreFromPineCone(dbType);
    await storeEmbeddings(records, dbType)
  }

 
  
module.exports = {storeEmbeddings,getTopKEmbeddings, deleteAndStore};