const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    const passwordResult = await bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        { email: candidate.email, userId: candidate._id },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: 'Password wrong' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
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
      errorHandler(res, e);
    }
  }
};

module.exports.me = (req, res) => {
  res.status(200).json(req.user);
};
