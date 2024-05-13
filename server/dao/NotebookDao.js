class NotebookDao {
  constructor(database) {
    this.database = database; // Assume database is a database connection object
  }

  async getMaxNotebookIdForUser(userId) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    return new Promise((resolve, reject) => {
      const query =
        "SELECT MAX(notebook_id) AS max_id from notebooks where user_id = ?";
      this.database.query(query, [userId], (error, result, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }
        // Results contain the rows returned by the query
        resolve(result == null ? 0 : result[0].max_id); // Resolve the promise with the max_id value
      });
    });
  }

  async createNewNotebook(userId) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    return new Promise((resolve, reject) => {
      const query = "Insert into notebooks(user_id) values (?)";
      this.database.query(query, [userId], (error, result, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }
        // Results contain the rows returned by the query
        resolve(result); // Resolve the promise with the max_id value
      });
    });
  }

  async saveCells(userId, notebookId, cells) {
    return new Promise((resolve, reject) => {
      const values = cells.map((cell) => [
        notebookId,
        userId,
        cell.prompt,
        cell.query,
      ]);
      const query =
        "INSERT INTO cells (notebook_id, user_id, prompt, query) VALUES ?";
      this.database.query(query, [values], (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  async updateCells(userId, cells) {
    return new Promise((resolve, reject) => {
      const values = cells.map((cell) => ({
        id: cell.cell_id,
        prompt: cell.prompt,
        query: cell.query,
      }));

      // Iterate over the values array and execute each update query
      const promises = values.map((cell) => {
        return new Promise((resolveUpdate, rejectUpdate) => {
          const query = "UPDATE cells SET prompt = ?, query = ? WHERE id = ?";
          this.database.query(
            query,
            [cell.prompt, cell.query, cell.id],
            (error, result) => {
              if (error) {
                console.error("Error updating cell:", error);
                rejectUpdate(error);
                return;
              }
              resolveUpdate(result);
            }
          );
        });
      });

      // Wait for all update queries to complete
      Promise.all(promises)
        .then((results) => {
          // Resolve the main promise with the results of all update queries
          resolve(results);
        })
        .catch((error) => {
          // If any update query fails, reject the main promise with the error
          reject(error);
        });
    });
  }
}

module.exports = NotebookDao;
