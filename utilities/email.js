const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

let sendEmail = (memberid, receiver, subject) => {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'uwtcss450team4@gmail.com',
                pass: 'skmjjzmelazhfnne'
            }
        });
    
        const token = jwt.sign(
            {
                "email": receiver,
                "memberid": memberid
            }, 
            process.env.JSON_WEB_TOKEN, 
            {
                expiresIn: '20m'
            }
        );

        let mailOptions = {
            from: 'uwtcss450team4@gmail.com',
            to: receiver,
            subject: subject,
            html: `
                <h2>Please verify your account.</h2>
                <p>Verify your email address to complete the registration process.</p>
                <FORM ACTION="https://tcss450-2022au-group4.herokuapp.com/verify" METHOD="GET" target="_blank">
                    <INPUT TYPE="SUBMIT" VALUE="Verify">
                </FORM>
                `,
        };

        transporter.sendMail(mailOptions, function(err, data){
            if(err){
                console.log(err)
            }else{
                console.log('Email sent')
            }   
        });
};

let sendGenericEmail = (sender, receiver, subject, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uwtcss450team4@gmail.com',
            pass: 'skmjjzmelazhfnne'
        }
    });
    let mailOptions = {
        from: 'uwtcss450team4@gmail.com',
        to: receiver,
        subject: subject,
        text: message,

    };
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err)
        }else{
            console.log('Email sent')
        }   
    });
};

let sendForgotEmail = (receiver, subject) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uwtcss450team4@gmail.com',
            pass: 'skmjjzmelazhfnne'
        }
    });
    
    const token = jwt.sign(
        {
            "email": receiver,
        }, 
        process.env.JSON_WEB_TOKEN, 
        {
            expiresIn: '20m'
        }
    );
    let mailOptions = {
        from: 'uwtcss450team4@gmail.com',
        to: receiver,
        subject: subject,
        html: `
            <h2>You have requested to change your password. </h2>
            <p>If you have not requested to change you password please ignore this email.</p>
            <FORM ACTION="https://tcss450-2022au-group4.herokuapp.com/forgot" METHOD="GET" target="_blank">
                <INPUT TYPE="SUBMIT" VALUE="Forgot Password?">
            </FORM>
            `,
    };

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err)
        }else{
            console.log('Email sent')
        }   
    });
};

    module.exports = { 
    sendEmail,
    sendGenericEmail,
    sendForgotEmail,
}