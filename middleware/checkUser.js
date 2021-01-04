module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(500).json({ message: 'No req.user' });
  }
};
