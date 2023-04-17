const Users = require('../models/user.model')
const {Role} = require('../constants/enum')

const authManager = async (req, res, next) =>{
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== Role.MANAGER)
            return res.status(500).json({msg:"MANAGER resource access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authManager