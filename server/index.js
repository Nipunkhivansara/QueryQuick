const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes.js");
const executesqlRoutes =
  require("../server/routes/executeQueryRoutes.js").sqlExecutionRouter;
const mongoRoutes = require("./routes/mongoRoutes.js");
const userroutes = require("./routes/getUserDataRoutes.js");
const saveUserRoutes = require("./routes/saveUserDataRoutes.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/", chatRoutes);
app.use("/sql", executesqlRoutes);
app.use("/mongo", mongoRoutes);
app.use("/", userroutes);
app.use("/", saveUserRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port changing ${port}`);
});
