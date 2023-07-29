--Remove all memebers from all chats
DELETE FROM Contacts;

--Get users from members table with verified emails
SELECT (memberid, username) FROM members WHERE verification = 1;


--Insert hardcoded friend statuses based on SetupTestMessages
INSERT INTO Contacts 
	(MemberID_A, MemberID_B, FriendStatus, BlockedStatus, Verified) 
VALUES 
	(5, 83, 1, 0, 1),(5, 31, 1, 0, 1),(5, 32, 1, 0, 1),(5, 30, 1, 0, 1),(5, 80, 0, 0, 1),
	(83, 31, 1, 0, 1),(83, 32, 1, 0, 1),(83, 30, 1, 0, 1),(83, 80, 1, 0, 1),
	(32, 31, 1, 0, 1),(32, 30, 1, 0, 1),(32, 80, 0, 0, 1),
	(31, 80, 1, 0, 1),(31, 30, 1, 0, 1),
	(80, 30, 0, 0, 1);
