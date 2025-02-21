const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  console.log("MAR: Got the request");
  let { password, ...rest } = req.body;

  console.log(password);
  console.log(rest);

  const user = await User.create({
    ...rest,
    passwordDigest: await bcrypt.hash(password, 10),
  });
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
