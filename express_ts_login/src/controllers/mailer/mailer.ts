const nodemailer = require("nodemailer");

export const mailSender = {
    sendGamil: function(param: { toEmail: any; subject: any; text: any; }) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.MAILUSER,
                pass: process.env.MAILPASS
            }
        });
        const mailOptions = {
            from: process.env.MAILUSER,
            to: param.toEmail,
            subject: param.subject,
            text: param.text
        };

        transport.sendMail(mailOptions, function(error: any, info: { response: string; }) {
            if(error) {
                console.error(error);
            } else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}