const { User } = require('../model/index');

// 회원가입 POST
exports.postJoin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  const enteredNickName = req.body.nickName;

  console.log(enteredId, enteredPassword, enteredNickName);
  let data = {
    user_id: enteredId,
    user_pw: enteredPassword,
    user_nickname: enteredNickName,
  };

  await User.create(data)
    .then((result) => {
      console.log(result);
      res.send(true);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// 로그인 POST
exports.postLogin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  console.log('reqbody', req.body);
  //const idsave = req.body.idsave;

  console.log(User);
  let result = await User.findOne({
    raw: true,
    where: { user_id: enteredId },
  });

  if (!result) {
    console.log('!', result);
    res.send({
      check: false,
      msg: '이메일 또는 비밀번호를 잘못 입력했습니다.',
    });
  } else {
    req.session.save(function () {
      req.session.user = result;
      res.send({
        check: true,
        msg: '로그인에 성공하셨습니다!',
        userInfo: result,
      });
    });
  }
};
