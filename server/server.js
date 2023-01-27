const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./models").sequelize;
const bodyParser = require("body-parser");

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);
app.use(cors());

const router = require("./routes");
app.use("/bunnyletter", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server open: ${PORT}`);
});
