drop Table if exists Reward;
drop Table if exists Takes_On;
drop Table if exists Quest;
drop Table if exists Belong;
drop Table if exists Member;
drop Table if exists Guild;
drop Table if exists Ranks;


CREATE TABLE Ranks
(	
	R_id INT NOT NULL,
	R_name varchar(15) NOT NULL,
	PRIMARY KEY(R_id)
);

CREATE TABLE Member
(
  M_id INT NOT NULL,
  M_rank INT NOT NULL,
  M_name VARCHAR(30) NOT NULL,
  State VARCHAR(30) NOT NULL,
  Street VARCHAR(30) NOT NULL,
  ZIP CHAR(5) NOT NULL,
  City VARCHAR(30) NOT NULL,
  PRIMARY KEY (M_id),
  FOREIGN KEY (M_rank) REFERENCES Ranks(R_id) ON DELETE CASCADE
);

CREATE TABLE Guild
(
  G_id INT NOT NULL,
  Type VARCHAR(30) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (G_id)
);

CREATE TABLE Belong
(
  G_id INT NOT NULL,
  M_id INT NOT NULL,
  FOREIGN KEY (G_id) REFERENCES Guild(G_id) ON DELETE CASCADE,
  FOREIGN KEY (M_id) REFERENCES Member(M_id)
  ON DELETE CASCADE
);

CREATE TABLE Quest
(
  Q_id INT NOT NULL,
  Post_Date DATE NOT NULL,
  Q_rank INT NOT NULL,
  `Type` VARCHAR(30) NOT NULL,
  Description VARCHAR(100) NOT NULL,
  G_id INT NOT NULL,
  PRIMARY KEY (Q_id),
  FOREIGN KEY (G_id) REFERENCES Guild(G_id) ON DELETE CASCADE,
  FOREIGN KEY (Q_rank) REFERENCES Ranks(R_id) ON DELETE CASCADE
);

CREATE TABLE Takes_On
(
  M_id INT NOT NULL,
  Q_id INT NOT NULL,
  complete boolean NOT NULL default 0,
  FOREIGN KEY (M_id) REFERENCES Member(M_id) ON DELETE CASCADE,
  FOREIGN KEY (Q_id) REFERENCES Quest(Q_id) ON DELETE CASCADE
);

CREATE TABLE Reward
(
   Id Int NOT NULL,
  `Type` VARCHAR(50) NOT NULL,
  Amount INT NOT NULL,
  Q_id INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (Q_id) REFERENCES Quest(Q_id) ON DELETE CASCADE
);




/* START INSERTS */

Delete from Ranks;
/* INSERT Rank Table */
INSERT INTO Ranks (R_id, R_name) VALUES ( 1, 'Porcelain');
INSERT INTO Ranks (R_id, R_name) VALUES ( 2, 'Obsidian');
INSERT INTO Ranks (R_id, R_name) VALUES ( 3, 'Bronze');
INSERT INTO Ranks (R_id, R_name) VALUES ( 4, 'Copper');
INSERT INTO Ranks (R_id, R_name) VALUES ( 5, 'Steel');
INSERT INTO Ranks (R_id, R_name) VALUES ( 6, 'Silver');
INSERT INTO Ranks (R_id, R_name) VALUES ( 7, 'Gold');
INSERT INTO Ranks (R_id, R_name) VALUES ( 8, 'Diamond');
INSERT INTO Ranks (R_id, R_name) VALUES ( 9, 'Platinum');
INSERT INTO Ranks (R_id, R_name) VALUES ( 10, 'Phosphophyllite');



Delete From Guild;
/* INSERT Guilds  */
INSERT INTO Guild (G_id, Type, Name) Values (1, 'Mage', 'Mage Guild 1');
INSERT INTO Guild (G_id, Type, Name) Values (2, 'Mage', 'Mage Guild 2');
INSERT INTO Guild (G_id, Type, Name) Values (3, 'Mage', 'Mage Guild 3');
INSERT INTO Guild (G_id, Type, Name) Values (4, 'Mage', 'Mage Guild 4');
INSERT INTO Guild (G_id, Type, Name) Values (5, 'Mage', 'Mage Guild 5');
INSERT INTO Guild (G_id, Type, Name) Values (6, 'Mage', 'Mage Guild 6');
INSERT INTO Guild (G_id, Type, Name) Values (7, 'Mage', 'Mage Guild 7');
INSERT INTO Guild (G_id, Type, Name) Values (8, 'Mage', 'Mage Guild 8');
INSERT INTO Guild (G_id, Type, Name) Values (9, 'Mage', 'Mage Guild 9');
INSERT INTO Guild (G_id, Type, Name) Values (10, 'Mage', 'Mage Guild 10');
INSERT INTO Guild (G_id, Type, Name) Values (11, 'Fighter', 'Fighter Guild 1');
INSERT INTO Guild (G_id, Type, Name) Values (12, 'Fighter', 'Fighter Guild 2');
INSERT INTO Guild (G_id, Type, Name) Values (13, 'Fighter', 'Fighter Guild 3');
INSERT INTO Guild (G_id, Type, Name) Values (14, 'Fighter', 'Fighter Guild 4');
INSERT INTO Guild (G_id, Type, Name) Values (15, 'Fighter', 'Fighter Guild 5');
INSERT INTO Guild (G_id, Type, Name) Values (16, 'Fighter', 'Fighter Guild 6');
INSERT INTO Guild (G_id, Type, Name) Values (17, 'Fighter', 'Fighter Guild 7');
INSERT INTO Guild (G_id, Type, Name) Values (18, 'Fighter', 'Fighter Guild 8');
INSERT INTO Guild (G_id, Type, Name) Values (19, 'Fighter', 'Fighter Guild 9');
INSERT INTO Guild (G_id, Type, Name) Values (20, 'Fighter', 'Fighter Guild 10');

Delete from Member;
/* INSERT MEMBER  */
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (1, 5, 'Kira', 'OR', '5th', '97355', 'Lebanon');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (2, 4, 'YanYan', 'OR', 'Some St.', '97000', 'Not Portland');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (3, 3, 'Tyler', 'NV', 'Alien Way', '10001', 'Groom Lake');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (4, 2, 'Vinh', 'OR', 'Another St', '97001', 'Idiotville');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (5, 4, 'Rick', 'OR', 'Not Sure Lane', '97000', 'Nowhere');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (6, 3, 'Ny cousin Vinny', 'NJ', 'Forgot St', '02001', 'Groom Lake');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (7, 2, 'Vinh', 'OR', 'Another St', '97002', 'Idiotville');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (8, 5, 'Tiffany', 'OR', 'Lamp St.', '97073', 'Canby');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (9, 1, 'Bill', 'OR', 'McInnis Lanr', '97078', 'Beaverton');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (10, 1, 'Homer', 'OR', 'Doh Way', '97007', 'Springfeild');
INSERT INTO Member (M_id, M_rank, M_name, State, Street, ZIP, City) VALUES (11, 5, 'Steve', 'OR', '1st', 97355, 'Lebanon');

Delete from Belong;
/* INSERT Belong  */
INSERT INTO Belong (M_id, G_id) Values (1,1);
INSERT INTO Belong (M_id, G_id) Values (1,20);
INSERT INTO Belong (M_id, G_id) Values (2,2);
INSERT INTO Belong (M_id, G_id) Values (3,1);
INSERT INTO Belong (M_id, G_id) Values (4,5);
INSERT INTO Belong (M_id, G_id) Values (5,5);
INSERT INTO Belong (M_id, G_id) Values (6,6);
INSERT INTO Belong (M_id, G_id) Values (7,7);
INSERT INTO Belong (M_id, G_id) Values (8,8);
INSERT INTO Belong (M_id, G_id) Values (9,2);
INSERT INTO Belong (M_id, G_id) Values (10,1);
INSERT INTO Belong (M_id, G_id) Values (11,5);
INSERT INTO Belong (M_id, G_id) Values (11,15);
INSERT INTO Belong (M_id, G_id) Values (3,6);
INSERT INTO Belong (M_id, G_id) Values (10,14);
INSERT INTO Belong (M_id, G_id) Values (5,12);
INSERT INTO Belong (M_id, G_id) Values (11,6);
INSERT INTO Belong (M_id, G_id) Values (7,9);

Delete from Quest;
/* INSERT Quests  */
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (1, '2019-01-01', 5, 'Slay Dragon', 'Kill the Ugly, 2 headed dragon', 1);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (2, '2019-02-01', 1, 'Slay the T.A.', 'Somebody must''ve been naughty', 2);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (3, '2019-03-01', 2, 'Collect Herbs', 'Collect Thyme, Rosemary, and Sage', 3);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (4, '2019-04-01', 3, 'Blah 3', 'Desc 3', 4);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (5, '2019-05-01', 4, 'Blah 4', 'Desc 4', 5);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (6, '2019-06-01', 5, 'Blah 5', 'Desc 5', 1);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (7, '2019-07-01', 1, 'Blah 6', 'Desc 6', 6);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (8, '2019-08-01', 2, 'Blah 7', 'Desc 7', 7);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (9, '2019-09-01', 3, 'Blah 8', 'Desc 8', 13);
INSERT INTO Quest (Q_id, Post_Date, Q_rank, `Type`, Description, G_id) VALUES (10, '2019-10-31', 4, 'Blah 9', 'Desc 9', 14);

Delete from Reward;
/* INSERT Rewards  */
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 1, 'Thing', 1, 1);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 2, 'Gold', 300, 2);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 3, 'Phoenix Feather', 3 , 10);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 4, 'Boat', 1, 9);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 5, 'Cool Socks', 5, 3);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 6, 'Elephant', 2, 4);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 7, 'Gold', 100, 8);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 8, 'Different Thing', 1, 7);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 9, 'Bottle of Mysterious Potion', 1, 5);
INSERT INTO Reward ( Id, `Type`, Amount, Q_id) VALUES ( 10, 'Gold', 1000, 6);


Delete from Takes_On;
/* INSERT Takes_On Lookup Table  */
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 1, 10);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 2, 1);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 3, 9);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 4, 2);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 5, 8);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 6, 3);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 7, 7);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 8, 4);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 9, 6);
INSERT INTO Takes_On (M_id, Q_id) VALUES ( 10, 5);



/* START UPDATES */

Update Guild
set Type = 'Sorcerer'
Where Type = 'Mage';


/* Create Procs */
Drop PROCEDURE IF EXISTS Member_Guild_Select;
Drop PROCEDURE IF EXISTS Guild_Member_Count_Select;

DELIMITER |
	CREATE PROCEDURE `Member_Guild_Select` ()
BEGIN
	select
		  m.M_name as Person
		, g.`Name` as Guild
		, g.Type as Guild_Type
	from Member m
	Inner Join Belong b on m.M_id = b.M_id
	Inner Join Guild g on b.G_id = g.G_id
	Order By m.M_name, g.`Name`;
END
|

DELIMITER |
	CREATE PROCEDURE `Guild_Member_Count_Select` ()
BEGIN
	Select
		  g.Name as Guild
		, count(b.M_id) as Members
	From Belong b
	Inner Join Guild g on b.G_id = g.G_id
	Group By g.Name
	Order By count(b.M_id) desc, g.Name;
END
|


/* CREATE Views */
DELIMITER |
Drop View IF EXISTS `Rank_Member_5`;
|
DELIMITER |
CREATE VIEW `Rank_Member_5` AS
select * from Member Where M_rank = 5;
|

/* START SELECTS */
Call Member_Guild_Select;

Call Guild_Member_Count_Select;

select * from Rank_Member_5;

Select
	q.*
FROM Quest q
Inner Join Reward r on q.Q_id = r.Q_id
Where r.`Type` = 'Gold';

select * from Member;



