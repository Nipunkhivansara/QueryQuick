const UserDAO = require("../dao/UserDao");
const express = require("express");
const utility = require("../utility/Utility");

const {
  getConnectionFromPool,
  releaseConnectionToPool,
} = require("../dbconnection/sqldbconn");

const router = express.Router();

router.get("/notebooks", async (req, res) => {
  try {
    // Get database connection from pool
    // Pass connection to getUserByEmail method
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await getUser(userDAO, req);
    const notebooks = await userDAO.getUserNoteBooksByUserId(user.id);
    const cells = await userDAO.getCellsByNotebookIds(
      notebooks.map((el) => el.notebook_id)
    ); // Release the connection back to the pool
    res.json(cells);
    releaseConnectionToPool(db);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred while fetching user." });
  }
});

router.get("/notebooks/ids", async (req, res) => {
  try {
    // Get database connection from pool
    // Pass connection to getUserByEmail method
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await getUser(userDAO, req);
    const notebooks = await userDAO.getUserNoteBooksByUserId(user.id);
    const allUsersLinkedToNotebooks = await userDAO.getUsersFromNotebookId(
      notebooks.map((el) => el.notebook_id)
    );
    releaseConnectionToPool(db);
    return res.json(
      await utility.getTransformedData(allUsersLinkedToNotebooks)
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred while fetching user." });
  }
});

async function getUser(userDAO, req) {
  const email = req.query.email;
  console.log("Getting user data for email", email);
  const user = await userDAO.getUserByEmail(email);
  return user;
}

module.exports = router;
