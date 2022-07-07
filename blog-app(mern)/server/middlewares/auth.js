const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // const token = req.header("Authorization").replace("Bearer ", "");
  const token = req.cookies.access_token;
  console.log(token);
  console.log(req.cookies)
  if (!token) {
    return res.status(500).send("invalid token");
  }

  try {
    const decodedToken = await jwt.verify(token, "this-is-your-token");
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = verifyToken;
