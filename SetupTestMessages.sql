--Remove all memebers from all chats
DELETE FROM ChatMembers;

--Remove all messages from all chats
DELETE FROM Messages;

--Remove all chats
DELETE FROM Chats;


--Create Global Chat room, ChatId 1
INSERT INTO
    chats(chatid, name)
VALUES
    (1, 'Global Chat')
RETURNING *;

--Add users to Global Chat
INSERT INTO 
    ChatMembers(ChatId, MemberId)
SELECT 1, Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
      OR Members.Email='test1@test.com'
RETURNING *;

--Add Multiple messages to create a conversation
INSERT INTO 
    Messages(ChatId, Message, MemberId)
SELECT 
    1, 
    'Hello Everyone!',
    Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
RETURNING *;

INSERT INTO
    Messages(ChatId, Message, MemberId)
SELECT
    1,
    'This is test to see if this works!',
    Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
RETURNING *;

--Create another chat room, ChatId 2
INSERT INTO
    chats(chatid, name)
VALUES
    (2, 'Chat')
RETURNING *;

--Add into users to Chat
INSERT INTO
ChatMembers(ChatId, MemberId)
SELECT 2, Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
      OR Members.Email='alexzrosario@gmail.com'
RETURNING *;

--Add Multiple messages to create a conversation
INSERT INTO 
    Messages(ChatId, Message, MemberId)
SELECT 
    2, 
    'This is a different chat room!',
    Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
RETURNING *;

INSERT INTO
    Messages(ChatId, Message, MemberId)
SELECT
    2,
    'How are you all doing?',
    Members.MemberId
FROM Members
WHERE Members.Email='tests@gmail.com'
RETURNING *;