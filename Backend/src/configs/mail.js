const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, 
    auth: {
      user: "anubhav.varshney02nov@gmail.com", 
      pass: "CQg3GjM7vsZxrtyY", 
    },
});