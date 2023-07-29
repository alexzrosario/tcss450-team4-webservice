const nodemailer =require('nodemailer')
require("dotenv").config();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uwtcss450team4@gmail.com',
        pass: 'skmjjzmelazhfnne'
    }
});
let receiver = 'test2@test.com'
let memberid = 32
let credentials = receiver + ":" + memberid 
let b64Header = toBase64(credentials);
let auth = replaceSpecialChars(b64Header);

let h ={
    authorization:'Basic '+ auth
}
const jwt = require('jsonwebtoken');
const token = jwt.sign(
    {
        "email":receiver,
        "memberid":memberid
    }, 
    process.env.JSON_WEB_TOKEN, 
    {
        header:h,
        expiresIn: '10m'}
    );
let mailOptions = {
    from: 'uwtcss450team4@gmail.com',
    to: 'uwtcss450team4@gmail.com',
    subject: 'subject',
    //text: 'i am sending me a message',
    html: `
            <h2> Please click on this link to verify your account.</h2>
            <p>https://tcss450-team4-webservice.herokuapp.com/verify${token}</p>
        `
};

transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log(err)
    }else{
        console.log('Email sent')
    }   
});

const toBase64 = obj => {
    // converts the obj to a string
    const str = JSON.stringify (obj);
    // returns string converted to base64
    return Buffer.from(str).toString ('base64');
 };

 const replaceSpecialChars = b64string => {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
      return b64string.replace (/[=+/]/g, charToBeReplaced => {
        switch (charToBeReplaced) {
          case '=':
            return '';
          case '+':
            return '-';
          case '/':
            return '_';
        }
      });
    };