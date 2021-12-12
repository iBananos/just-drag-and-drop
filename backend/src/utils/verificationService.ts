import "dotenv/config";
import nodeMailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';



const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { user: `${process.env.EMAIL_SCANYLAB}`, pass: `${process.env.PASSW_SCANYLAB}` }
});


transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        partialsDir: './email_templates/',
        layoutsDir: './email_templates/',
        defaultLayout: 'verification.hbs',
    },

    viewPath: './email_templates/',
    extName: '.hbs',
}));




export default function sendVerificationEmail(email : string, token : string, jwtToken : string) {
    return new Promise((resolve, reject) => {

        let mailOptions = {
            from: '<info@bis-mart.com>', // sender address
            to: email, // list of receivers
            subject: 'Verify Your Account', // Subject line
            context: {
                verificationLink: `http://localhost:3000/verification?token=${token}&email=${email}&jwtToken=${jwtToken}`,
                email: email
            },
            template: 'verification'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("err1 ", error);
                reject(error)

            } else {
                resolve("Activation link has been sent!")
            }
        });
    });
}