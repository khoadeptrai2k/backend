const Users = require('../models/user.model')
const {Role} = require('../constants/enum')

const authAdmin = async (req, res, next) =>{
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== Role.ADMIN)
            return res.status(500).json({msg:"Admin resource access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin