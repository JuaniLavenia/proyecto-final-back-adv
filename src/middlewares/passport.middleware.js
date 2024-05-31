const GitHubStrategy = require("passport-github2");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

const serializeUser = (user, done) => {
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, {
      id: user.id,
      username: user.username,
      email: user.email,
      googleId: user.googleId,
      githubId: user.githubId,
    });
  } catch (error) {
    done(error);
  }
};

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:
      "https://proyecto-final-back-adv.onrender.com/api/login/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      //console.log("PROFILE: ", profile);
      const exist = await User.findOne({
        where: { email: profile.emails[0].value },
      });

      if (exist && exist.googleId)
        return done(null, false, {
          message: "Ya tiene una cuenta con otro servicio",
        });
      if (exist && exist.githubId) return done(null, exist);

      const user = await User.create({
        email: profile.emails[0].value,
        username: profile.username,
        githubId: profile.id,
      });

      done(null, user);
    } catch (err) {
      done(null, false, { message: "No se pudo iniciar sesion con Github" });
    }
  }
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:
      "https://proyecto-final-back-adv.onrender.com/api/login/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      //console.log("PROFILE: ", profile);
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        return done(null, user);
      }
      user = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      await user.save();
      done(null, user);
    } catch (error) {
      done(null, false, { message: "No se pudo iniciar sesion con Google" });
    }
  }
);

module.exports = {
  serializeUser,
  deserializeUser,
  googleStrategy,
  githubStrategy,
};
