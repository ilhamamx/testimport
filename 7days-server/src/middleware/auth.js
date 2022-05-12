const bcrypt = require("bcryptjs");

// token is "development test" (encrypted) for dev purpose
const fixToken = process.env.SuperUserToken;
const authSU = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const isMatch = await bcrypt.compare(fixToken, token);
    if (!isMatch) {
      throw new Error("Invalid token");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    //TODO change matching to compare with user token in firebase
    const isMatch = await bcrypt.compare(fixToken, token);
    if (!isMatch) {
      throw new Error("Invalid token");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
}

module.exports = {authSU};