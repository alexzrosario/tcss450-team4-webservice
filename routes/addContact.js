//express is the framework we're going to use to handle requests
const express = require('express')

//Access the connection to Heroku Database
const pool = require('../utilities/exports').pool

const router = express.Router()

const validation = require('../utilities').validation

//ADD CONTACT - Search for username (match with MemberID_B in table)
router.post("/", (request, response) => {
    //validate that the Contact exists
    const myEmail = request.body.myEmail
    const friendEmail = request.body.friendEmail
    let query = `SELECT * FROM Members
                 WHERE Members.email=$1
                 OR Members.email=$2` 
    let values = [myEmail,friendEmail]
    pool.query(query, values)
        .then(result => { 
            if (result.rowCount == 0 ||result.rowCount==1) {
                response.status(404).send({
                    message: 'User not found - enter a new user' 
            })
                return
            }else{
                //stash the memberid into the request object to be used in the next function
                request.memberid1 = result.rows[0].memberid
                request.memberid2 = result.rows[1].memberid

                const sucessQuery =`INSERT INTO Contacts(MemberID_A, MemberID_B, FriendStatus, BlockedStatus, Verified)
                                    VALUES ($1,$2,$3,$4,$5)`
                const theValues = [request.memberid1,request.memberid2,1,0,1]
                pool.query(sucessQuery, theValues)
                    .then(result => { 
                        const sucessQuery2 =`INSERT INTO Contacts(MemberID_A, MemberID_B, FriendStatus, BlockedStatus, Verified)
                                    VALUES ($1,$2,$3,$4,$5)`
                        const theValues2 = [request.memberid2,request.memberid1,1,0,1]
                        pool.query(sucessQuery2, theValues2)
                        .then(result2 => { 
                    
                        
                            response.json({
                                success: true,
                                message:'Friendship successful!'
                            })     
                        })    
                    })
            }
        })
})

module.exports = router
