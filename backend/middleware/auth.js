const jwt = require("jsonwebtoken")
const User = require("../model/user")
//const key = process.env.TOKEN_KEY
// const user = User.findOne({ email });

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"]
  console.log("body", token)
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication", status: 403 })
  }
  let parsedToken = token.substring(7, token.length)
  // let parsedToken = token.split(' ')[1];

  console.log("body", parsedToken)

  try {
    // const decoded = jwt.decode(parsedToken);
    // console.log("decoded",decoded)
    // req.user2 = decoded;
    console.log("decoded", parsedToken, process.env.TOKEN_KEY)
    const verify = await jwt.verify(parsedToken, process.env.TOKEN_KEY)
    console.log("verify", verify)
    //    req.user2 = verify;

    //  console.log("decodesd", decoded)
  } catch (err) {
    console.log("err", err)
    return res.status(401).json({ message: "Invalid Token", status: 401 })
  }
  return next()
}

module.exports = verifyToken
