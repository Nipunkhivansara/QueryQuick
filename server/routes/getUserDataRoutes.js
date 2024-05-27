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
    console.log("request received to get noteboook data");
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

router.get("/allUsers", async(req, res) => {
  console.log("Received request to get all Users");
  try{
    const db = await getConnectionFromPool();
    const userDAO = new UserDAO(db);
    const users = await userDAO.getAllUsers();
    releaseConnectionToPool(db);
    res.status(200).json(users);

  }catch (error) {
    console.error("Error fetching users:", error);
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }

});

router.get("/notebooks/ids", async (req, res) => {
  // This is how I want the data format to be sent from this function
  console.log("Received request to get notebooks by ids");
  /* await res.status(200).json([
    {
      "notebook_id": "1",
      "notebook_name": "Notebook 1",
      "associated_users": [
        {
          "username": "superdataman00@gmail.com",
          "profile": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        }
      ]
    }
  ]); */
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
};



module.exports = router;
