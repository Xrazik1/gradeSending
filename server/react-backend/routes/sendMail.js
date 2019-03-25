const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const path = require("path");



let sendEmail = async (email, name, letter) => {

    // Generate test SMTP service account from ethereal.email

  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "yandex",
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "gradesapp1@yandex.ru", // generated ethereal user
        pass: "22808250Xraz" // generated ethereal password
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Grades App" <gradesapp1@yandex.ru>', // sender address
      to: email, // list of receivers
      subject: `Оценки студента ${name}`, // Subject line
      text: letter, // plain text body
      html: letter // html body
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
  
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/', async (req, res) => {
    let credentials = req.body;

  sendEmail(credentials.email, credentials.name, credentials.letter).then(() => {
    res.end('Письмо отправлено');
  }).catch((e) => {
    res.end("Письмо не отправлено")
    console.error(e)
});



});





module.exports = router;