const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get('/del/:id', async (req, res) => {
  const { id } = req.params
  await User.deleteOne({ _id: id })
})

router.get('/getal', async (req, res) => {
  const user = await User.find()
  res.json({
    data: user
  })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        const token = JWT.sign(
          {
            userid: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "10h",
          }
        );
        res.json({
          status: "success",
          token: token,
          name: user.firstName + ' ' + user.lastName,
          role: user.role
        });
      } else {
        res.json({
          status: "wrong_pwd",
          data: req.body,
        });
      }
    });
  } else {
    res.json({
      status: "not_exist",
      data: req.body,
    });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    res.json({ status: "alreadyExist" });
  } else {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: 'user',
      password: password,
    });
    const newUser = await user.save();
    res.json({
      status: "success",
      user: newUser,
    });
  }
});

module.exports = router;
