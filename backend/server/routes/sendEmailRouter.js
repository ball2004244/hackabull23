// set up router to send email
sendEmailRouter = require('express').Router();

// import sendEmail function
const sendEmailFunctions = require('../controllers/sendEmail');

const { response } = require('express');

// only send when user visit /sendEmail/:id
// do it use async await
// remember to call the sendEmail.js

sendEmailRouter.post('/:id', async (req, res) => {
    try {
        // loop through database to find the email address
        
        // mock data
        const email = 'nguyenminhtam7124@gmail.com';
        const content = 'This is something else';

        await sendEmailFunctions(email, content);
        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = sendEmailRouter;