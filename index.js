const express = require('express');
const bodyParser = require('body-parser')
const { sendEmail } = require('./utils');
// const path = require('path');
require('dotenv').config();

const app = express();
// const url = process.env.BASE_URL;
const PORT = process.env.PORT || 3000;


// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// API endpoint to handle email sending
app.post('/sendEmail', async (req, res) => {
    const { recipientEmail, recipientEmail2, senderEmail, fName, lName, country, phone, message } = req.body;

    if(!senderEmail || !recipientEmail){
        return res.status(400).json({
            message:'Invalid format'
        });
    }

    try{
        await sendEmail(recipientEmail,recipientEmail2, senderEmail, fName, lName, country, phone, message);
        console.log('Email sent successfully');
        
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    }catch(error){
        console.error('Error sending email:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Handle 404 errors
// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'public', 'page-not-found.html'));
// });

// Start the server
app.listen(PORT, (res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // return res.status(200).json({
    //     success: true,
    //     message: 'Email sent successfully'
    // });
});

//show response from server
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server is running',
        timestamp: new Date()
    });
});