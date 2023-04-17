const UserGroups = require("../models/UserGroup.model");
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
};

module.exports = ManagerController;
