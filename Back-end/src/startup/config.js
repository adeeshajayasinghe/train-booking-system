// require('dotenv').config();


// module.exports.checkConfig = function () {
//   if (!process.env.JWT_PRIVATE_KEY) {
//     throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
//   }
// }
module.exports.checkConfig = function (key) {
  if (!key) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}