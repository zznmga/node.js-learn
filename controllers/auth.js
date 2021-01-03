const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = (req, res) => {
  res
    .status(200)
    .json({ login: { email: req.body.email, password: req.body.password } });
  //.json({ login: req.body });
};

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({ message: 'Conflict. Email exists!' });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = req.body.password;
      const user = new User({
        email: req.body.email,
        password: await bcrypt.hash(password, salt),
      });

      await user.save();
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({ message: e.toString() });
    }
  }
};
