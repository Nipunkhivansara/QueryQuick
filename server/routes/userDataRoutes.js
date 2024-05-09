const UserDAO = require("../dao/UserDao");
const express = require("express");

const {
  getConnectionFromPool,
  releaseConnectionToPool,
} = require("../sqldbconn");

const router = express.Router();

router.get("/getNotebooks", async (req, res) => {
  try {
    // Get database connection from pool
    // Pass connection to getUserByEmail method
    const email = req.query.email;
    console.log("Getting user data for email", email);
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(email);
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

router.get("/getNotebooks", async (req, res) => {
  try {
    // Get database connection from pool
    // Pass connection to getUserByEmail method
    const email = req.query.email;
    console.log("Getting user data for email", email);
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(email);
    // Release the connection back to the pool
    console.log("user is");
    res.json(user);
    releaseConnectionToPool(db);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred while fetching user." });
  }
});

module.exports = router;
