const User = require('../models/user')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const saltRounds = 10;

exports.postSignup = async (req, res, next)=>{
    let userDetails = req.body

    let existingUser = await User.findAll({where:{email: userDetails.email}})
    //console.log(existingUser)

    if(existingUser.length === 0){
        const hashedPassword = bcrypt.hashSync(userDetails.password, saltRounds);
        let newUser = await User.create({
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.phone,
            password: hashedPassword
        })
        res,json({flag: true, msg: "User created"})
    }else{
        res.json({flag: false, msg: "user already exists"})
    }
}

