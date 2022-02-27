const express = require("express");
const app =express();

const connect = require("./configs/db");

const cors = require("cors");

const email_controller = require("./controllers/email.controller");
const otp_controller = require("./controllers/otpverify.controller");
const user_controller = require("./controllers/user.controller");

app.use(cors());

app.use(express.json());

app.use("/email",email_controller);
app.use("/otp",otp_controller);
app.use("/user",user_controller);

app.listen(5500,async()=>{
    try{
        await connect();
        console.log("Listening to no 5500");
    }
    catch(e){
        console.log(e.message);
    }
});