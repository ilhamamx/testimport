const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adimediaexpertindo@gmail.com",
    pass: "TanyaKantor1!",
  },
});

const mailOptions = {
  from: "adimediaexpertindo@gmail.com",
  to: "bryan@amxware.com, vita@amxware.com, fathur@amxware.com, ilham@amxware.com, fikri@amxware.com",
  subject: "Testing Sent Email",
  text: "Testing sent email with nodemailer",
};

const sendTestEmail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      //set less secure app access in gmail adimediaexpertindo@gmail.com
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendTestEmail };
