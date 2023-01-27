const { User } = require("../models/index");

exports.postJoin = async (req, res) => {
  console.log(req.body);
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.pw;
  const enteredNickname = req.body.nickname;

  let data = {
    user_email: enteredEmail,
    user_pw: enteredPassword,
    user_name: enteredNickname,
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
