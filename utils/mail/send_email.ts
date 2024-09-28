import nodemailer from 'nodemailer';
import config from '../../config.json' assert { type: "json" };


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.mail.email,
        pass: config.mail.appPassword
    }
});

export function send_email(email:string,subject:string,text?:string,html?:string){
    var mailOptions = {
        from: config.mail.email,
        to: email,
        subject: subject,
        text: text,
        html:html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
    });
}
