class NotebookDao {
  constructor(database) {
    this.database = database; // Assume database is a database connection object
  }

  async getMaxNotebookIdForUser(userId) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT MAX(notebook_id) AS max_id FROM notebooks WHERE user_id = ?";
      this.database.query(query, [userId], (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        resolve(result[0].max_id || 0);
      });
    });
  }

  async saveNotebook(notebookData, user_id) {
    const { notebook_id } = notebookData;

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO notebooks (notebook_id, user_id) VALUES (${notebook_id}, ${user_id}) ON DUPLICATE KEY UPDATE notebook_id=VALUES(notebook_id)`;
      console.log("query", query);
      this.database.query(query, (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  async saveCell(notebookData, user_id) {
    const { notebook_id, cells } = notebookData;
    const promises = cells.map((cell) => {
      console.log("cell", cell);
      const {
        id,
        notebook_id,
        user_id,
        cellType,
        cellValue,
        cellDatabaseType,
        cellDatabase,
        prompt,
        query,
      } = cell;
      return new Promise((resolve, reject) => {
        const sqlQuery =
          "INSERT INTO cells (id, notebook_id, user_id, cellType, cellValue, cellDatabaseType, cellDatabase, prompt, query) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE cellValue=VALUES(cellValue), cellDatabaseType=VALUES(cellDatabaseType), cellDatabase=VALUES(cellDatabase), prompt=VALUES(prompt), query=VALUES(query)";
        this.database.query(
          sqlQuery,
          [
            id,
            notebook_id,
            user_id,
            cellType,
            cellValue,
            cellDatabaseType,
            cellDatabase,
            prompt,
            query,
          ],
          (error, result) => {
            if (error) {
              console.error("Error querying database:", error);
              reject(error);
              return;
            }
            resolve(result[0]);
          }
        );
      });
    });

    return Promise.all(promises);
  }

  async createNewNotebook(userId) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT MAX(notebook_id) AS max_id FROM notebooks WHERE user_id = ?";
      this.database.query(query, [userId], (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        const newNotebookId = (result[0].max_id || 0) + 1;
        const insertQuery =
          "INSERT INTO notebooks (notebook_id, user_id) VALUES (?, ?, ?)";
        this.database.query(
          insertQuery,
          [newNotebookId, userId],
          (insertError, insertResult) => {
            if (insertError) {
              console.error("Error inserting into database:", insertError);
              reject(insertError);
              return;
            }
            resolve(newNotebookId);
          }
        );
      });
    });
  }

  async updateCells(cells) {
    const promises = cells.map((cell) => {
      return new Promise((resolve, reject) => {
        const query =
          "UPDATE cells SET prompt = ?, query = ?, cellType = ?, cellValue = ?, cellDatabaseType = ?, cellDatabase = ? WHERE id = ? AND user_id = ? AND notebook_id = ?";
        this.database.query(
          query,
          [
            cell.prompt,
            cell.query,
            cell.cellType,
            cell.cellValue,
            cell.cellDatabaseType,
            cell.cellDatabase,
            cell.id,
            cell.user_id,
            cell.notebook_id,
          ],
          (error, result) => {
            if (error) {
              console.error("Error updating cell:", error);
              reject(error);
              return;
            }
            resolve(result);
          }
        );
      });
    });

    return Promise.all(promises);
  }

  //   async getNotebookById(notebookId, userId) {
  //     return new Promise((resolve, reject) => {
  //       const query = "SELECT * FROM notebooks WHERE notebook_id = ? AND user_id = ?";
  //       this.database.query(query, [notebookId, userId], (error, result) => {
  //         if (error) {
  //           console.error("Error querying database:", error);
  //           reject(error);
  //           return;
  //         }
  //         resolve(result[0]);
  //       });
  //     });
  //   }

  //   async getCellsByNotebookId(notebookId, userId) {
  //     return new Promise((resolve, reject) => {
  //       const query = "SELECT * FROM cells WHERE notebook_id = ? AND user_id = ?";
  //       this.database.query(query, [notebookId, userId], (error, result) => {
  //         if (error) {
  //           console.error("Error querying database:", error);
  //           reject(error);
  //           return;
  //         }
  //         resolve(result);
  //       });
  //     });
  //   }
  // }

  async getNotebookById(notebookId, userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM notebooks WHERE notebook_id = ${notebookId} AND user_id = ${userId};`;
      this.database.query(query, (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  async getCellsByNotebookId(notebookId, userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM cells WHERE notebook_id = ${notebookId} AND user_id = ${userId};`;
      this.database.query(query, (error, result) => {
        if (error) {
          console.error("Error querying database:", error);
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }
}

module.exports = NotebookDao;
