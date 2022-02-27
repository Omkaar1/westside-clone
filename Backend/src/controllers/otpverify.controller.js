const express = require("express");
const router = express.Router();

const Email = require("../models/email.model");
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const {body, validationResult} = require("express-validator");

const newToken = (user) => {
    return jwt.sign({user}, process.env.secretKey);
}

router.post("", body("otp").notEmpty().withMessage("Otp required").bail().isNumeric().withMessage("Invalid Otp"), async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const newErrors = errors.array().map((elem)=>{
                return {key: elem.param, message: elem.msg}
            });
            return res.status(400).send(newErrors);
        }

        //verify otp
        const email = await Email.findOne({email: req.body.email}).lean().exec();
        //if not return wrong otp
        if(req.body.otp!=email.otp){
            return res.status(400).send({"msg":"Wrong otp"});
        }

        await Email.findByIdAndDelete(email._id);

        const user = await User.findOne({email: req.body.email}).lean().exec();

        if(!user){
            return res.status(400).send({"msg":"User not found"});
        }

        const token = newToken(user);
        return res.status(200).send({"token":token, "user":user});
    }
    catch(e){
        return res.status(500).send(e.message);
    }
});

module.exports = router;