const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes.js");
const sqlRoutes = require("./routes/sqlRoutes.js");
const mongoRoutes = require("./routes/mongoRoutes.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/", chatRoutes);
app.use("/sql",sqlRoutes);
app.use("/mongo",mongoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port changing ${port}`);
});
