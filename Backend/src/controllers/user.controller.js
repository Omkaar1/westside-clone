const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const {body, validationResult} = require("express-validator");

const {welcomeMail, adminMail} = require("../utils");

const newToken = (user) => {
    return jwt.sign({user}, process.env.secretKey);
}

const User = require("../models/user.model");

router.post("", body("first_name").notEmpty().withMessage("Name is required").bail().isString().withMessage("Incrrect name"), body("last_name").notEmpty().withMessage("Name is required").bail().isString().withMessage("Incrrect name"), body("mobile").notEmpty().withMessage("Contact is required").bail().isNumeric().withMessage("Incrrect contact"), body("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Incorrect Email"), async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const newErrors = errors.array().map((elem)=>{
                return {key: elem.param, message: elem.msg}
            });
            return res.status(400).send(newErrors);
        }

        const user = await User.create(req.body);
        
        const token= newToken(user);

        welcomeMail({user});
        adminMail({user});

        return res.status(200).send({"token": token, "user":user});
    }
    catch(e){
        return res.status(500).send(e.message);
    }
});

module.exports = router;