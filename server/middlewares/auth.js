const UserSchema = require('../models/user.model')
const jsonwebtoken = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded = jsonwebtoken.verify(token, "DP05")
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})
        const user = await UserSchema.findOne({_id: decoded.id})
        if(!user) return res.status(400).json({msg: "Invalid Authentication."})
        
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = auth