const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  const token = jwt.sign({ id, email, fullname }, secret, {
    expiresIn: '2h'
  });
  console.log('Generate token: ', token);
  return token;
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      try {
        /**
         * @TODO: Authentication - Server
         *
         * Storing passwords in your project's database requires some basic security
         * precautions. If someone gains access to your database, and passwords
         * are stored in 'clear-text' your users accounts immediately compromised.
         *
         * The solution is to create a cryptographic hash of the password provided,
         * and store that instead. The password can be decoded using the original password.
         */
        // @TODO: Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = bcrypt.hashSync(args.user.password, 10);

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return user;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        const valid = await bcrypt.compare(args.user.password, user.password);
        if (!valid || !args.user) throw 'User was not found.';

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return user;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
