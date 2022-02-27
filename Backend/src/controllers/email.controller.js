const express = require("express");
const router = express.Router();

const {body, validationResult} = require("express-validator");

const Email = require("../models/email.model");

const {verifyOtp} = require("../utils");

router.post("", body("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Incorrect Email"), async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const newErrors = errors.array().map((elem)=>{
                return {key: elem.param, message: elem.msg}
            });
            return res.status(400).send(newErrors);
        }

        const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

        const user = await Email.findOne({email: req.body.email});

        let userU;
        if(user){
            userU = await Email.findByIdAndUpdate(user._id, {otp: otp}, {new: true});
        }
        else{
            userU = await Email.create({
                email: req.body.email,
                otp: otp
            });    
        }

        verifyOtp(userU);
        return res.status(200).send({"msg":"Otp sent"});
    }
    catch(e){
        return res.status(500).send(e.message);
    }
});

module.exports = router;