const User = require("../models/user")

const registro = (req, res) => {
    res.json('functionally')
}
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //checando se colocaram o nome
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };
        //checando senha
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password required and must be at least 6 characters long'
            })
        };
        //checando email
        const exist= await User.findOne({email});
        if (exist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        const user = await User.create({
            name, email, password
        })
    }   catch (error){
            console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        //checando senha
        if (!password) {
            return res.json({
                error: 'Password required'
            })
        };
        //checando email
        if (!email) {
            return res.json({
                error: 'email required'
            })
        };

        const exist= await User.findOne({email, senha});

        if (exist){
            return res.json({
                error: 'login feito'
            })
        }
    }   catch (error){
            console.log(error)
    }
}
module.exports = {
    registro, 
    registerUser,
    loginUser
}