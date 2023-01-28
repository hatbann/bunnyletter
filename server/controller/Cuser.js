const { User } = require('../model/index');
const bcrypt = require('bcryptjs');

// 회원가입 POST
exports.postJoin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  const enteredNickName = req.body.nickName;

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const existingID = await User.findOne({
    raw: true,
    where: { user_id: enteredId },
  });

  const exisingNickname = await User.findOne({
    raw: true,
    where: {
      user_nickname: enteredNickName,
    },
  });

  if (existingID) {
    res.send({ check: false, msg: '동일한 아이디가 이미 사용중입니다.' });
  } else {
    if (exisingNickname) {
      res.send({ check: false, msg: '동일한 닉네임이 이미 사용중입니다.' });
    } else {
      req.session.user = {
        id: enteredId,
        pw: enteredPassword,
        nickname: enteredNickName,
      };

      let data = {
        user_id: enteredId,
        user_pw: hashedPassword,
        user_nickname: enteredNickName,
      };

      await User.create(data)
        .then((result) => {
          console.log(result);
          res.send({ check: true, msg: '회원가입에 성공했습니다!' });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  }
};

// 로그인 POST
exports.postLogin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  console.log('reqbody', req.body);

  let result = await User.findOne({
    raw: true,
    where: { user_id: enteredId },
  });

  if (!result) {
    console.log('!', result);
    res.send({
      check: false,
      msg: '아이디 또는 비밀번호를 잘못 입력했습니다.',
    });
  } else {
    const samePW = await bcrypt.compare(enteredPassword, result.user_pw);
    if (samePW) {
      req.session.save(function () {
        req.session.user = result;
        res.send({
          check: true,
          msg: '로그인에 성공하셨습니다!',
          userInfo: result,
        });
      });
    } else
      res.send({
        check: false,
        msg: '아이디 또는 비밀번호를 잘못 입력했습니다.',
      });
  }
};

exports.postSearch = async (req, res) => {
  const searchNickName = req.body.searchNickName;

  console.log(searchNickName);
  let result = await User.findOne({
    raw: true,
    where: { user_nickname: searchNickName },
  });

  if (!result) {
    console.log('!', result);
    res.send({
      check: false,
      msg: '찾는 정보가 없습니다.',
    });
  } else {
    res.send({
      userInfo: result,
    });
  }
};
