const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./models").sequelize;
const bodyParser = require("body-parser");

const Cuser = require("./controller/Cuser");

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);
app.use(cors());

app.post("/join", Cuser.postJoin);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server open: ${PORT}`);
});
