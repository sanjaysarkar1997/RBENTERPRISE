let nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");

const nodeMailer = (receiptMail: string) => {
    let userMail = "keedacoding@gmail.com";
    let userPass = "Sanjay@1997";
    let subject = "Learning NodeJS Server";
    let text = `This is defined Text`;
    let htmlTemplate = `<p>This is tag P</p>`;
    let host = "smtp.gmail.com";
    let service = "gmail";

    let mailOptions = {
        from: userMail,
        to: receiptMail,
        subject: subject,
        text: text,
        html: htmlTemplate,
    };

    let transporter = nodemailer.createTransport(
        smtpTransport({
            service: service,
            host: host,
            auth: {
                user: userMail,
                pass: userPass,
            },
        })
    );

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            return error;
        } else {
            return info.response;
        }
    });
};

export default nodeMailer;