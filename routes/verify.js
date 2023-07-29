//express is the framework we're going to use to handle requests
const { response } = require('express')
const { request } = require('express')
const express = require('express')
const querystring = require('querystring');

//Access the connection to Heroku Database
const pool = require('../utilities').pool

const validation = require('../utilities').validation
let isStringProvided = validation.isStringProvided

const router = express.Router()

//Pull in the JWT module along with out a secret key
const jwt = require('jsonwebtoken')
const { sendGenericEmail } = require('../utilities/email')
const config = {
    secret: process.env.JSON_WEB_TOKEN
}

//verify webpages
router.get('/', (request, response) => {
    const email = request.query.email;
    //this is a Web page so set the content-type to HTML
    if(email){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>Thank you for completing the registration process.</h1>');
        response.write('<h2>You may now close this tab.</h2>');
        response.end(); //end the response

        const axios = require('axios');
        const data = {
            //test get
            "email": email
        };
    
        axios.post('https://tcss450-2022au-group4.herokuapp.com/verify', data)
            .then((res) => {
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
            }).catch((err) => {
                console.error(err);
            });
    }else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>Verify your email address to complete the registration process.</h1>');
        response.write('<FORM ACTION="https://tcss450-2022au-group4.herokuapp.com/verify" METHOD="GET" target="_self"<label for="email">Email:</label> <input type="text" id="email" name="email"><br><br><INPUT TYPE="SUBMIT" VALUE="Verify"></FORM>');
        response.end(); //end the response
    }
})
//Async verification
router.post('/', (request, response) => {
    const email = (request.body.email || request.query.email)
    if (isStringProvided(email)) {
        const theQuery = `SELECT saltedhash, salt, Credentials.memberid FROM Credentials
                          INNER JOIN Members ON
                          Credentials.memberid=Members.memberid 
                          WHERE Members.email=$1
                          AND Members.verification=$2`
        const values = [email,0]
            pool.query(theQuery, values)
                .then(result => { 
                    if (result.rowCount == 0) {
                        response.status(404).send({
                            message: 'User not found or email already verified.' 
                    })
                        return
                    }else{
                        const sucessQuery =`UPDATE Members
                                            SET VERIFICATION=$2 
                                            WHERE Members.email=$1`;
                        const theValues = [email,1]
                           pool.query(sucessQuery, theValues)
                              .then(result => { 
                                sendGenericEmail("uwtcss450team4@gmail.com", email, "Thank You for Registering!", "Your email account has been verified.")
                                
                                response.json({
                                    success: true,
                                    message:'Authentication successful!'
                                })     
                            })
                    }
                })
    } else {
        response.status(400).send({
            message: "Missing required information: parameters sent is not a string" + request 
        })
    }
}) 

module.exports = router