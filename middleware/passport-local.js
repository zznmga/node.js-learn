const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = async (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser ', user.id);
    //done(null, { ...user, payload: 'test1' });
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser ', id);
    const user = await User.findOne({ _id: id });
    console.log('user after des ', user);
    //done(null, { ...user, payload: 'test2' })

    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const user = await User.findOne({ email: username });

        if (user) {
          const passwordResult = await bcrypt.compareSync(
            password,
            user.password
          );
          if (passwordResult) {
            console.log('passwordResult==true', user);
            return done(null, { id: user.id, email: user.email });
          } else {
            console.log('passwordResult==false');
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      }
    )
  );
};
