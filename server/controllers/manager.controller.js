const UserGroups = require("../models/UserGroup.model");
const Users = require("../models/user.model");
require("dotenv").config();

const ManagerController = {
  getUserGroups: async (req, res) => {
    try {
      const UserGroup = await UserGroups.find({})
        .populate({
          path: staffs,
        })
        .populate({
          path: masters,
        });
      res.status(200).json(UserGroup);
    } catch (error) {
      console.log(error);
    }
  },
  createUserGroup: async (req, res) => {
    try {
      const { name, staffs, masters } = req.body;

      const exist_usergroup = await UserGroups.findOne({ name });
      if (exist_usergroup) return res.status(400).json({ msg: "The UserGroup already exists." });

      const new_usergroup = new UserGroups({
        name,
        staffs,
        masters,
      });

      await new_usergroup.save();

      res.json({ msg: "Create UserGroup Successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  deleteUserGroup: async (req, res) => {
    try {
      const exist_usergroup = await UserGroups.findById(req.params.id);
      if (!exist_usergroup) return res.status(400).json({ msg: "The UserGroup doesnt exists." });

      await exist_usergroup.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "UserGroup deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateUserGroup: async (req, res) => {
    try {
      const { name, staffs, masters } = req.body;

      const exist_usergroup = await UserGroups.findById(req.params.id);
      if (!exist_usergroup) return res.status(400).json({ msg: "The UserGroup doesnt exists." });

      const update_usergroup = {
        name,
        staffs,
        masters,
      };
      await UserGroups.findByIdAndUpdate({ _id: req.params.id }, update_usergroup);

      res.json({ message: "UserGroup Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },

  createStaff: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "The email already exists." });
      let passwordHash = await bcrypt.hash("123456", 10);

      const newUser = new Users({
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
        role: "STAFF",
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: "Create staff Successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  getListStaff: async (req, res) => {
    try {
      const staffs = await Users.find({ role: "Staff" }).sort({
        fullName: 1,
      });
      res.send(staffs);
    } catch (error) {
      console.log(error);
    }
  },
  deleteStaff: async (req, res) => {
    try {
      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff) return res.status(400).json({ msg: "The staff doesnt exists." });

      await Users.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "Staff deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateStaff: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff) return res.status(400).json({ msg: "The staff doesnt exists." });

      let passwordHash = await bcrypt.hash("123456", 10);

      const update_staff = {
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
        role,
        password: passwordHash,
      };
      await Users.findByIdAndUpdate({ _id: req.params.id }, update_staff);

      res.json({ message: "Staff Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },

  updateRoleStaffToMaster: async (req, res) => {
    try {

      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff) return res.status(400).json({ msg: "The staff doesnt exists." });

      const update_staff = {
        role: req.body.role || "Staff",
      };
      await Users.findByIdAndUpdate({ _id: req.params.id }, update_staff);

      res.json({ message: "Staff Updated role to master successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateRoleStaffToManager: async (req, res) => {
    try {

      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff) return res.status(400).json({ msg: "The staff doesnt exists." });

      const update_staff = {
        role: req.body.role || "Manager",
      };
      await Users.findByIdAndUpdate({ _id: req.params.id }, update_staff);

      res.json({ message: "Staff Updated role to manager successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  
};

module.exports = ManagerController;
