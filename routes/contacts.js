//express is the framework we're going to use to handle requests
const express = require('express')

//Access the connection to Heroku Database
const pool = require('../utilities/exports').pool

const router = express.Router()

const validation = require('../utilities').validation
let isStringProvided = validation.isStringProvided

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */

//TODO: FINISH IT:
router.post("/", (request, response, next) => {
    //validate on empty parameters
    if (request.body.memberID_A === undefined || !isStringProvided(request.body.Username)) {
        response.status(400).send({
            message: "Missing required information"
        })
    } else if (isNaN(request.body.memberID_A)) {
        response.status(400).send({
            message: "Malformed parameter. MemberID must be a number"
        })
    } else {
        next()
    }
},(request, response, next) => {
    //validate member id exists
    let query = `SELECT * FROM Contacts WHERE MemberID_A=$1`
    let values = [request.body.memberID_A]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: "Member ID not found"
                })
            } else {
                next()
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error on memberid check",
                error: error
            })
        })
}, (request, response) => { //, next
    //validate memberid exists in the Members table
    let query = `SELECT * FROM Members WHERE Username=$1 AND MemberId=$2`
    let values = [request.body.Username, request.decoded.memberid]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount > 0) {
                //GOOD
                //next()
            } else {
                response.status(400).send({
                    message: "user not in contacts"
                })
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error on member in conctacts check",
                error: error
            })
        })

})

/* ------------------------- ADD TO POST LATER ------------------------
   , (request, response, next) => {
    //TODO: add friend status to database???
    let insert = `INSERT INTO Messages(ChatId, Message, MemberId)
                  VALUES($1, $2, $3) 
                  RETURNING PrimaryKey AS MessageId, ChatId, Message, MemberId AS email, TimeStamp`
    let values = [request.body.chatId, request.body.message, request.decoded.memberid]
    pool.query(insert, values)
        .then(result => {
            if (result.rowCount == 1) {
                //insertion success. Attach the message to the Response obj
                response.message = result.rows[0]
                response.message.email = request.decoded.email
                //Pass on to next to push
                next()
            } else {
                response.status(400).send({
                    "message": "unknown error"
                })
            }

        }).catch(err => {
            response.status(400).send({
                message: "SQL Error on insert",
                error: err
            })
        })
},


    (request, response) => {
    // send a notification of friend request to member matching registered token
    let query = `SELECT token FROM Push_Token
                        INNER JOIN ChatMembers ON
                        Push_Token.memberid=ChatMembers.memberid
                        WHERE ChatMembers.chatId=$1`
    let values = [request.body.chatId]
    pool.query(query, values)
        .then(result => {
            console.log(request.decoded.email)
            console.log(request.body.message)
            result.rows.forEach(entry =>
                msg_functions.sendMessageToIndividual(
                    entry.token,
                    response.message))
            response.send({
                success: true
            })
        }).catch(err => {

            response.status(400).send({
                message: "SQL Error on select from push token",
                error: err
            })
        })
    })

*/


router.get("/", (request, response, next) => {
    let query = 'SELECT * FROM Contacts WHERE MemberID_A=$1'
    let values = [request.decoded.memberid]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.send({
                    message: "user not found"
                })
            } else {
                next()
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error 1st part",
                error: error
            })
        })

}, (request, response) => {

    let query = `SELECT DISTINCT Members.Username, Members.Email, Contacts.FriendStatus, Contacts.BlockedStatus FROM Contacts 
                INNER JOIN Members ON (Contacts.MemberID_B = Members.MemberID)
                WHERE MemberID_A=$1 AND FriendStatus=$2 AND BlockedStatus=$3`
    let values = [request.decoded.memberid, 1, 0]

    pool.query(query, values)
        .then(result => {
            response.send({
                rowCount: result.rowCount,
                rows: result.rows
            })
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error 2nd part",
                error: error
            })
        })
})



/*
router.delete("/:MemberID_A/:Username", (request, response, next) => { //Unfriend contact
    //validate on empty parameters
    if (!request.params.MemberID_A || !request.params.Username) {
        response.status(400).send({
            message: "Missing required information"
        })
    } else if (isNaN(request.params.MemberID_A)) {
        response.status(400).send({
            message: "Malformed parameter. MemberID_A must be a number"
        })
    } else {
        next()
    }
}, (request, response, next) => {
    //validate chat id exists
    let query = `SELECT * FROM Contacts WHERE MemberID_A=$1`
    let values = [request.params.MemberID_A]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: "Chat ID not found"
                })
            } else {
                next()
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error",
                error: error
            })
        })
}, (request, response, next) => {
    //validate username exists AND convert it to the associated memberId
    let query = `SELECT MemberID FROM Members WHERE Username=$1`
    let values = [request.params.Username]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: "email not found"
                })
            } else {
                request.params.Username = result.rows[0].memberid
                next()
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error",
                error: error
            })
        })
}, (request, response, next) => { //TODO: REVIEW
    //validate username exists in the contacts
    let query = `SELECT * FROM Contacts WHERE MemberID_A=$2`
    let values = [request.params.Username]

    pool.query(query, values)
        .then(result => {
            if (result.rowCount > 0) {
                next()
            } else {
                response.status(400).send({
                    message: "user not in contacts"
                })
            }
        }).catch(error => {
            response.status(400).send({
                message: "SQL Error",
                error: error
            })
        })

}, (request, response) => {
    //Delete the memberId from the contacts
    let insert = `DELETE FROM Contacts
                  WHERE MemberID_A=$1
                  RETURNING *`
    let values = [request.params.Username]
    pool.query(insert, values)
        .then(result => {
            response.send({
                success: true
            })
        }).catch(err => {
            response.status(400).send({
                message: "SQL Error",
                error: err
            })
        })
}
)
**/

module.exports = router
