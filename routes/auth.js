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

router.post(
  '/login2',
  passport.authenticate('local', {
    successRedirect: '/api/auth/home',
    failureRedirect: '/api/auth/fail',
  })
);

router.get('/home', require('../middleware/checkUser'), controllers.home);

module.exports = router;
