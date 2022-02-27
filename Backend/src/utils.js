const transporter = require("./configs/mail");

const sendMail = async ({from,to,subject,text,html}) => {
    await transporter.sendMail({from,to,subject,text,html});
}

const verifyOtp = async (user) => {
    await sendMail({
        from: "westsideclone@gmail.com",
        to:user.email, 
        subject: `Otp Verification`,
        text: `Your 4 digit otp is ${user.otp}.`
    });
} 

const welcomeMail = async ({user}) => {
    await sendMail({
        from: "westsideclone@gmail.com",
        to:user.email, 
        subject: `Welcome to Westside ${user.first_name}`,
        text: `Hi ${user.first_name}, you are successfully registered on westside.
        Enjoy Shoping.`
    });
}

var admin=["anubhav.varshney02nov@gmail.com","md.alishanali88@gmail.com","imomkarlondhe@gmail.com","sheeluofficial@gmail.com","maneshs111@gmail.com"];

const adminMail = async ({user}) => {
    for(var i=0;i<admin.length;i++){
        await sendMail({
            from: "westsideclone@gmail.com",
            to: admin[i],
            subject: `${user.first_name} has registered with us`,
            text: `Please welcome ${user.first_name}`
        });
    }
}

module.exports = {verifyOtp, welcomeMail, adminMail};