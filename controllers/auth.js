const User = require('../models/User');

module.exports.login = (req, res) => {
  res
    .status(200)
    .json({ login: { email: req.body.email, password: req.body.password } });
  //.json({ login: req.body });
};

module.exports.register = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then(() => res.status(200).json(user))
    .catch((e) => res.status(500).json(e));
};
