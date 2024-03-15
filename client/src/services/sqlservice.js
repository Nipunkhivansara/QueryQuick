// services/getDataFromSql.js


async function getDataFromSql({ query, database }) {

    try {
        console.log(`Querying database: ${database} with query: ${query}`)
        const response = await fetch(`http://localhost:5000/sql?query=${query}&database=${database}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data from SQL:', error.message);
        throw error;
    }
}

export default getDataFromSql;
