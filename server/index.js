const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const Cuser = require('./controller/Cuser');

let corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(
  session({
    secret: 'bunny',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 5300000,
      secure: true,
    },
  })
);

app.post('/login', Cuser.postLogin);
app.post('/join', Cuser.postJoin);
app.post('/search', Cuser.postSearch);
app.post('/saveletter', Cuser.postSaveLetter);
app.post('/getLetterImg', Cuser.postGetImg);
app.post('/getSendLetters', Cuser.postGetSendLetters);
app.post('/getReceiveLetters', Cuser.postGetReceivedLetters);

app.put('/editProfile', Cuser.fetchProfile);
app.put('/deleteLetter', Cuser.deleteLetter);

app.delete('/deleteUser', Cuser.deleteAccount);

app.use(function (error, req, res, next) {
  res.render('500');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server open: ${PORT}`);
});
