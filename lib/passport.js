const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');


// Konfigurasi Passport-JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: 'secret', // Ganti 'secret' dengan kunci yang sesuai
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Temukan pengguna berdasarkan ID dari payload token JWT
      const user = await User.findByPk(payload.id);

      if (user) {
        // Pengguna ditemukan, kirimkan pengguna sebagai req.user
        done(null, user);
      } else {
        // Pengguna tidak ditemukan
        done(null, false);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi
      done(error, false);
    }
  })
);

module.exports = passport;
