const Users = require('../models/user.model');
require('dotenv').config();

const AdminController = {
  createManager: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } =
        req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'The email already exists.' });
      let passwordHash = await bcrypt.hash('123456', 10);

      const newUser = new Users({
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
        role,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: 'Create User Successfully' });
    } catch (error) {
      console.log(error);
    }
  },
  getListManager: async (req, res) => {
    try {
      const managers = await Users.find({ role: 'Manager' }).sort({
        fullName: 1,
      });
      res.send(managers);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = AdminController;
