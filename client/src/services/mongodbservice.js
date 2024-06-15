async function getDataFromMongoDB({ query, cellDatabase }) {

    try {
        console.log(`Querying database: ${cellDatabase} with query: ${query}`)
        const response = await fetch(`http://localhost:5001/mongo?query=${query}&database=${cellDatabase}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data from SQL:', error.message);
        throw error;
    }
}

export default getDataFromMongoDB;