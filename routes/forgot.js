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
const { sendForgotEmail } = require('../utilities/email')
const generateHash = require('../utilities').generateHash
const generateSalt = require('../utilities').generateSalt
const config = {
    secret: process.env.JSON_WEB_TOKEN
}

router.post('/', (request, response) => {
    const email = request.body.email
    if (isStringProvided(email)) {
        const theQuery = `SELECT saltedhash, salt, Credentials.memberid FROM Credentials
                          INNER JOIN Members ON
                          Credentials.memberid=Members.memberid 
                          WHERE Members.email=$1
                          AND Members.verification=$2`
        const values = [email,1]
            pool.query(theQuery, values)
                .then(result => { 
                    if (result.rowCount == 0) {
                        response.status(404).send({
                            message: 'User not found. Email does not exits or not verified.' 
                        })
                        return
                    }else{
                        sendForgotEmail(email,"Requested Password Reset")
                        response.json({
                            success: true,
                            message:'Email sent!'
                        })  
                    }
                })

    }else{
        response.status(400).send({
            message: "Missing required information: parameters sent is not a string" 
        })
    }
}) 

router.get('/', (request, response) => {
    const email = request.query.email;
    const pass = request.query.password;
    let bool = false
    var pattern = new RegExp(
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    ); 

    if(pass){
        if((pass.length >= 7) && (pattern.test(pass)) && !(/\s/g.test(pass)) ){
            bool=true
        }

    }
    //this is a Web page so set the content-type to HTML
    if((email!== null) && (pass !== null) && (bool===true)){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>Thank you for resetting your password.</h1>');
        response.write('<h2>You may now close this tab.</h2>');
        response.end(); //end the response

        const axios = require('axios');
        const data = {
            //test get
            "email": email,
            "password": pass
        };
        
        axios.put('https://tcss450-2022au-group4.herokuapp.com/forgot', data)
            .then((res) => {
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
            }).catch((err) => {
                console.error(err);
            });
    }else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>Please enter your new password to complete your password reset.</h1>');
        if(bool == false){
            response.write('<p>Requirement for a valid Password.<br>* Must be at least 7 characters long.<br>* Must include a special character (@#$%&*!?)<br>* Must include either a lower case or upper case letter<br>* Must include a digit (0-9)<br>* No spaces are allowed.<br></p>')
        }
        response.write('<FORM ACTION="https://tcss450-2022au-group4.herokuapp.com/forgot?email=" METHOD="GET" target="_self"<label for="email">Email:</label> <input type="text" id="email" name="email"><br><label for="password">Password:</label> <input type="password" id="password" name="password"><br><br><INPUT TYPE="SUBMIT" VALUE="Verify"></FORM>');
        response.end(); //end the response
    }
})

//put changing password in data base 
router.put('/', (request, response) => {
    const email = (request.body.email || request.query.email)
    const pass = (request.body.password || request.query.password)
    if (isStringProvided(email)) {
        const theQuery = `SELECT saltedhash, salt, Credentials.memberid FROM Credentials
                          INNER JOIN Members ON
                          Credentials.memberid=Members.memberid 
                          WHERE Members.email=$1
                          AND Members.verification=$2`
        const values = [email,1]
            pool.query(theQuery, values)
                .then(result => { 
                    if (result.rowCount == 0) {
                        response.status(404).send({
                            message: 'User not found or email already verified.' 
                    })
                        return
                    }else{
                        //stash the memberid into the request object to be used in the next function
                        request.memberid = result.rows[0].memberid
                        let salt = generateSalt(32)
                        let salted_hash = generateHash(pass, salt)

                        const sucessQuery =`UPDATE Credentials
                                            SET SaltedHash=$2,
                                                SALT = $3
                                            WHERE Credentials.memberid=$1`
                        const theValues = [request.memberid,salted_hash,salt]
                           pool.query(sucessQuery, theValues)
                              .then(result => { 
                                sendGenericEmail("uwtcss450team4@gmail.com", email, "Password reset was a sucess!", "Your account's password has been updated.")
                                
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
