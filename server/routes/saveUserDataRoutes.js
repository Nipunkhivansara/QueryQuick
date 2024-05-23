const UserDAO = require("../dao/UserDao");
const express = require("express");
const NotebookDAO = require("../dao/NotebookDao");
const { v4: uuidv4 } = require("uuid");

const {
  getConnectionFromPool,
  releaseConnectionToPool,
} = require("../dbconnection/sqldbconn");

const router = express.Router();

router.post("/saveNotebook", async (req, res) => {
  console.log(req.body);
  const db = await getConnectionFromPool();
  const notebookData = req.body;
  console.log("received save notebook call" + notebookData);
  const userDAO = new UserDAO(db);
  const user_id = await userDAO.getUserIdByEmail(req.body.user_id);
  console.log("user_id", user_id);
  if (user_id == null) {
    throw new Error("User does not exist");
  }
  try {
    const notebookDao = new NotebookDAO(db);
    await notebookDao.saveNotebook(notebookData, user_id);
    await notebookDao.saveCell(notebookData, user_id);
    res.status(200).send("Notebook saved successfully");
  } catch (error) {
    console.error("Error saving notebook:", error);
    res.status(500).send("Failed to save notebook");
  }
});

router.get("/getNotebook", async (req, res) => {
  console.log("received reqqqq");

  try {
    const notebook_id = req.query.notebook_id;
    const email = req.query.email;
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    console.log(email);
    const user_id = await userDAO.getUserIdByEmail(email);
    console.log("user_id", user_id);
    if (user_id == null) {
      throw new Error("User does not exist");
    }
    const notebookDao = new NotebookDAO(db);

    // Fetch notebook
    const notebook = await notebookDao.getNotebookById(notebook_id, user_id);
    console.log(notebook);

    // Fetch cells associated with the notebook
    const cells = await notebookDao.getCellsByNotebookId(notebook_id, user_id);
    console.log(cells);
    // Release database connection back to the pool
    await releaseConnectionToPool(db);

    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    res.status(200).json({ notebook, cells });
  } catch (error) {
    console.error("Error fetching notebook:", error);
    res.status(500).json({ message: "Failed to fetch notebook" });
  }
});

router.post("/updateCells", async (req, res) => {
  try {
    console.log("Post request received to create new cell");
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(req.query.email);
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

router.post("/deleteCell", async (req, res) => {
  try {
    console.log("Post request received to delete cell");
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const user = await userDAO.getUserByEmail(req.body.email);
    if (user == null) {
      throw new Error("User does not exist");
    }
    const notebookDao = new NotebookDAO(db);
    await notebookDao.deleteRecordIfExists(req.body.id, req.body.notebook_id, req.body.user_id);
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

    // await notebookDao.saveCells(userId, getMaxnotebookCount, req.body.cells);
    res.status(200).send("OK");
    console.log("Max count", getMaxnotebookCount);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err); // Send an error response back to the client
  }
});

module.exports = router;
