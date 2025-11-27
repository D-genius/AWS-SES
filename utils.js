const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require('dotenv').config();

const SES_CONFIG = {
    region: process.env.SES_REGION,
    credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_KEY,
    },
};

const sesClient = new SESClient(SES_CONFIG);

const sendEmail = async (recipientEmail, recipientEmail2, senderEmail, fName, lName,country, phone, message) => {

    let params = {
        Source: process.env.SES_SOURCE_EMAIL /* required */,
        ReplyToAddresses: [
            senderEmail,
        ],
        Destination: {
            /* required */
            // CcAddresses: [
            // "EMAIL_ADDRESS",
            // ],
            ToAddresses: [
                recipientEmail,
                recipientEmail2,
            ],
        },
        Message: {
            /* required */
            Subject: {
                Charset: "UTF-8",
                Data: `Hello I am ${fName} ${lName} from ${country}`,
            },
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <html>
                            <body>
                                <h2>New Contact Message</h2>
                                <p><strong>From:</strong> ${fName} ${lName}</p>
                                <p><strong>Country:</strong> ${country}</p>
                                <p><strong>Phone:</strong> ${phone}</p>
                                <p><strong>Email:</strong> ${senderEmail}</p>
                                <hr>
                                <p><strong>Message:</strong></p>
                                <p>${message}</p>
                            </body>
                        </html>
                    `,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `
                        New Contact Message
                        From: ${fName} ${lName}
                        Country: ${country}
                        Phone: ${phone}
                        Email: ${senderEmail}
                        Message: 
                            ${message}
                   `
                },
            },
        },
    };

    console.log("Sending email to:", recipientEmail, recipientEmail2);

    try{
        const result = await sesClient.send(new SendEmailCommand(params));
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
    
};

// sendEmail("diero.timothy@shinraitechnologies.io", "timothydiero254@gmail.com","Timothy","Diero", "Kenya", "1234567890", "This is a test message from Shinrai Technologies.");

module.exports = {
    sendEmail
};