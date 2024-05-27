class UserDAO {
  constructor(database) {
    this.database = database; // Assume database is a database connection object
  }

  async getUserByEmail(email) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    let result;
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      this.database.query(query, [email], (error, results, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }

        // Results contain the rows returned by the query
        console.log("Query results:", results[0]);
        resolve(results[0]);
      });
    });
  }

  async getUserIdByEmail(email) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    let result;
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM users WHERE email = ?";
      this.database.query(query, [email], (error, results, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }

        // Results contain the rows returned by the query
        console.log("Query results:", results[0]);
        resolve(results[0].id);
      });
    });
  }


  async getAllUsers() {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    let result;
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users";
      this.database.query(query, (error, results, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }
  
        // Results contain the rows returned by the query
        console.log("Query results for ALL USERS:", results);
        resolve(results);
      });
    });
  }
  

  async getUsersFromNotebookId(notebook_ids) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    console.log(notebook_ids);
    const query =
      "SELECT us.id,us.username,us.profile, nb.notebook_id, nb.name FROM users us join notebooks nb on nb.user_id = us.id WHERE notebook_id IN (?)";
    const results = await new Promise((resolve, reject) => {
      this.database.query(query, [notebook_ids], function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return results;
    // Results contain the rows returned by the quer
    // Other CRUD methods can be implemented similarly
  }

  async getUserNoteBooksByUserId(userId) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    return await new Promise((resolve, reject) => {
      const query = "SELECT notebook_id FROM notebooks WHERE user_id = ?";
      this.database.query(query, [userId], (error, results, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          return;
        }

        // Results contain the rows returned by the query
        resolve(results);
      });
    });
  }

  async getCellsByNotebookIds(notebook_ids) {
    // Perform database query to fetch user by email
    // Example using MySQL and promises
    const query = "SELECT * FROM cells WHERE notebook_id IN (?)";
    const results = await new Promise((resolve, reject) => {
      this.database.query(query, notebook_ids, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return results;
    // Results contain the rows returned by the quer
    // Other CRUD methods can be implemented similarly
  }
}
module.exports = UserDAO;
