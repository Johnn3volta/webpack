const autoprefixer = require('autoprefixer'),
      cssnano      = require('cssnano');

module.exports = {
    plugins: [
        autoprefixer('last 15 version'),
        cssnano(true)
    ],
};