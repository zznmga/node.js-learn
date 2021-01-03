const express = require('express');
const controllers = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');

router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  controllers.me
);

module.exports = router;
