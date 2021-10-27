const jwt = require("jsonwebtoken");

const secretWord = "ThisMustBeASecret";

const getToken = function (payload) {
    return jwt.sign ({data: payload}, secretWord, { expiresIn: "12h" });
}

const getTokenData = function (token) {
  let data = null;
  try {
    jwt.verify(token, secretWord, function (err, decoded) {
      try {
        if (!err) {data = decoded}
      } catch {}
    });
  } catch (error) {
    throw new Error("Function 'getTokenData' error: " + error);
  }
  return data;
}

module.exports = {getToken, getTokenData};