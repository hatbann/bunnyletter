const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const Cuser = require("./controller/Cuser");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: "bunny",
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/login", Cuser.postLogin);
app.post("/join", Cuser.postJoin);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server open: ${PORT}`);
});
