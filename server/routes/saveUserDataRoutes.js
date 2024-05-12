const UserDAO = require("../dao/UserDao");
const express = require("express");
const NotebookDAO = require("../dao/NotebookDao");

const {
  getConnectionFromPool,
  releaseConnectionToPool,
} = require("../dbconnection/sqldbconn");

const router = express.Router();

router.post("/updateCells", async (req, res) => {
  try {
    console.log("Post request received to create new cell");
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(req.body.email);
    if (user == null) {
      throw new Error("User does not exist");
    }
    const notebookDao = new NotebookDAO(db);
    await notebookDao.updateCells(user.id, req.body.cells);
    res.status(200).send("OK");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});

router.post("/createNotebook", async (req, res) => {
  try {
    console.log("Post request received to create New Notebook ");
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(req.body.email);
    if (user == null) {
      throw new Error("User does not exist");
    }
    const notebookDao = new NotebookDAO(db);
    await notebookDao.createNewNotebook(userId);

    const getMaxnotebookCount = await notebookDao.getMaxNotebookIdForUser(
      userId
    );

    await notebookDao.saveCells(userId, getMaxnotebookCount, req.body.cells);
    res.status(200).send("OK");
    console.log("Max count", getMaxnotebookCount);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});

module.exports = router;
