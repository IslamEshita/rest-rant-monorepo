const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email },
  });

  let msg = "";

  if (!user) {
    msg = `Could not find a user with the provided username`;
    res.status(404).json({
      message: msg,
    });
  } else {
    let passwordMatch = await bcrypt.compare(
      req.body.password,
      user.passwordDigest
    );
    if (!passwordMatch) {
      msg = `Password did not match!`;
      console.log("password mismatch");
      res.status(404).json({
        message: msg,
      });
    } else {
      console.log("Successfully authenticated!");
      console.log(user);
      res.status(200).json({ user });
    }
  }
});

module.exports = router;
