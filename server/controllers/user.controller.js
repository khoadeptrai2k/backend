const Users = require("../models/user.model");
require("dotenv").config();
// const Payments = require('../models/paymentModel')

const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserController = {
  register: async (req, res) => {
    try {
      const { fullName, phone, email, slackId, avatar, groupsId, role } =
        req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });
      let passwordHash = await bcrypt.hash("123456", 10);

      const newUser = new Users({
        fullName,
        phone,
        email,
        slackId,
        avatar,
        groupsId,
        role,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: "Create User Successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const refresh_token = createRefreshToken({id: user._id})
            
      res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: '/api/refresh_token',
          maxAge: 7*24*60*60*1000 // 7 days
      })

      res.json({ msg: "Login Successfully", refresh_token: refresh_token });
    } catch (error) {
      console.log(error);
    }
  },

  getRefreshToken: async (req, res, next) => {
    try {
      const rf_token = req.cookies.refreshtoken
      if(!rf_token) return res.status(500).json({msg:"Please login now!"})

      jsonwebtoken.verify(rf_token, "DP05", async (err, result) =>{
          if(err) return res.status(500).json({msg: "Please login now!"})

          const user = await Users.findById(result.id).select("-password")
          if (!user) return res.status(400).json({ msg: "User is not exist" });

          const refresh_token = createRefreshToken({id: result.id})
          res.json({refresh_token, user})
      })

    } catch (error) {
      console.log(error);
    }
  },
};

const createRefreshToken = (payload) =>{
  return jsonwebtoken.sign(payload, "DP05", {expiresIn: '7d'})
}

module.exports = UserController;
