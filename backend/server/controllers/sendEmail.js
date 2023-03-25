// send email using nodemailer
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'reminder.usfchatible@hotmail.com',
      pass: '12345678Aa@'
    }
  });

const mailOptions = async (email, content) => {

    return {
      from: 'reminder.usfchatible@hotmail.com',
      to: email,
      subject: 'Reminder from USF Chatible',
      text: content
    };
  };

  // send email
  // use async await
  // get content from json body

const sendEmail = async (email, content) => {
    try {
      if (email === null || email === undefined || email === '') {
        return res.status(400).json({ message: 'Email is required' });
      }

      // set content to default if content is empty
      if (content === null || content === undefined || content === '') {
        content = 'This is a reminder from USF Chatible, You may forget to set up your reminder!';
      }
      
      const mail = await mailOptions(email, content);

      await transporter.sendMail(mail);

    } catch (error) {
      console.log(error);
    }
  };

module.exports = sendEmail;
  