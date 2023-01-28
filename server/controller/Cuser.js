const { User } = require("../models/index");

exports.postJoin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  const enteredNickName = req.body.nickName;
  //const enteredConfirmPassword = req.body.nickName;

  console.log(enteredId);
  // const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  // const existingUserId = await User.findOne({
  //   raw: true,
  //   where: { user_id: enteredId },
  // });

  // if (existingUserId) {
  //   res.send({ check: true, msg: "동일한 아이디가 이미 사용중입니다." });
  // } else {
  //   req.session.user = {
  //     id: enteredId,
  //     nickname: enteredNickName,
  //     password: enteredPassword,
  //   };

  let data = {
    user_id: enteredId,
    user_pw: enteredPassword,
    user_nickname: enteredNickName,
  };

  await User.create(data);
  res.send({ check: true, msg: "회원가입에 성공했습니다." });
};

exports.postLogin = async (req, res) => {
  const enteredId = req.body.id;
  const enteredPassword = req.body.pw;
  console.log("reqbody", req.body);
  //const idsave = req.body.idsave;

  console.log(User);
  let result = await User.findOne({
    raw: true,
    where: { user_id: enteredId },
  });

  if (!result) {
    console.log(result);
    res.send({
      check: false,
      msg: "이메일 또는 비밀번호를 잘못 입력했습니다.",
    });
  } else {
    // req.session.user = {
    //   id: enteredId,
    //   nickname: result.user_nickname,
    //   password: enteredPassword,
    // };
    res.send({ check: true, msg: "로그인에 성공하셨습니다!" });
  }
};
