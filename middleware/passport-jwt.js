const keys = require('../config/keys');
const User = require('../models/User');

module.exports = (passport) => {
  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.jwt;
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        //const user = await User.findById(payload.userId).select('email id');
        const user = await User.findOne({ _id: payload.userId }).select(
          'email id'
        );

        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
