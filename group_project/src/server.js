/*server.js with express*/

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 50001;
var user = undefined;
/* configure handlebars*/
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: '.hbs',

	helpers: {
		if_eq: function(a, b, opts) {
			console.log(a + " = " + b);
			if(a == b) // Or === depending on your needs
				return opts.fn(this);
			else
				return opts.inverse(this);
		}
	}
});
/*add layouts */
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(path.basename(__dirname), 'views'));


/* set up static content serving*/
app.use(express.static(path.join(path.basename(__dirname),'public')));
app.use(bodyParser.json());


/* Create a database connection. This is our middleware function that will initilaze
 * a new connection to our MYSQL database on every request.
 */
const config = require('./config');
function connectDb(req, res, next){
	console.log('Connection to the database');
	let connection = mysql.createConnection(config);
	connection.connect();
	req.db = connection;
	console.log('Database conncected');
	next();
}

/* Handler for main page. The middleware pipeline includes our custom 'connectDb()' function
 * that creates our database connection and exposes it as 'req.db'.
 */
app.get('/',connectDb, function(req, res){
	res.status(200).render('home');
	close(req);
});



/* about page */
app.get('/about', function(req, res){
	res.status(200).render('about');
	close(req);
});

app.post('/request/login',connectDb, function(req, res) {
	console.log("req.url: ",req.url);
	console.log("req.body: ",req.body);
	if(req.body && req.body.name && req.body.text) {
		var usernamefrombox 		= req.body.name;
		var passwordfrombox 		= req.body.text;

		var qry = `SELECT m.M_id, m.M_name FROM Member m WHERE m.M_name = '${usernamefrombox}' AND m.M_pass = '${passwordfrombox}'`
		console.log(qry);
		//req.db.query('SELECT * FROM Member WHERE M_name = ?',[usernamefrombox],function(err,members) {
		req.db.query(qry,function(err,members) {
			if(err) {
				console.log("Error getting Member");
			}
			else {
				console.log(members);
				console.log("User: ")
				console.log(members[0].M_name);
				console.log(members[0].M_id);
				console.log(usernamefrombox);
				console.log(passwordfrombox);
				if(members.length === 0) {
					console.log("Creating New User!");
					user = {
						name: usernamefrombox,
						pass: passwordfrombox
					};
					close(req);
					res.status(200).send("Creating New Account!");
				}
				else {
					// We have a member with that name.
					if(members.length > 0
						) {
						console.log("Login Successful! from /request/login");
						user = {
							id: members[0].M_id,
							name: usernamefrombox,
							pass: passwordfrombox
						};
						close(req);
						//res.status(200).send("Login Successful!");
						
					}
					else {
						console.log("Incorrect Password!");
						close(req);
						res.status(200).send("Incorrect Password!");
					}
				} 
			}
		});
	}
	else {
		res.status(400).send("req.body is undefined!");
	}
});
app.post('/request/logout', function(req,res) {
	console.log("req.url: ",req.url);
	console.log("req.body: ",req.body);
	if(user == undefined) {
		console.log("User not logged in!");
		res.status(200).send("Not logged in!");
	}
	else {
		user = undefined;
		res.status(200).send("Logout Successful!");
	}
	close(req);
});

app.get('/account', function(req, res){
	if(user == undefined) {
		res.status(200).render('login');
	}
	else {
		user == undefined;
		res.status(200).render('logout');
	}
	close(req);
});

app.get('/quest', connectDb,function(req, res){
	if(user === undefined) {
		console.log("You need to login to view this page!");
		res.status(200).render('notloggedin');
	}
	else {
		var qry = `SELECT
		*
	FROM
		Quest q
	WHERE q.Q_id NOT IN (
		Select t.Q_id from Takes_On t
		)`;
		req.db.query(qry,function(err,Quests) {
			if(err) {
				console.log("Error getting Quests!");
			}
			else {
				console.log(Quests);
				res.status(200).render('quest',{Quests});
			}
		});
	}
	close(req);
});

app.post('/quest/accept', connectDb, function(req,res) {
	console.log("Hit here.");
	 var questID = req.body.Q_id
	 console.log(user.id + " is Accepting Quest " + questID);
	 if(user === undefined) {
	  	//console.log("You need to login to view this page!");
	 	 //res.status(200).render('notloggedin');
	 	 res.redirect('/account');
	 }
	 else {
	 	var qry = `Insert into Takes_On (M_id, Q_id) 
	 	values (`+ user.id + `,` + questID + `)`;
	 	req.db.query(qry,function(err,Quests) {
	 		if(err) {
	 			console.log("Error accepting quest!");
	 		}
	 		else {
	 			console.log(Quests);
	 			res.status(200).render('quest',{Quests});
	 		}
	 	});
	close(req);
	 }
});

app.get('/guild', connectDb, function(req,res) {
	if(user === undefined) {
		//console.log("You need to login to view this page!");
		//res.status(200).render('notloggedin');
		res.redirect('/account');
	}
	else {
		var qry = `SELECT
		g.G_id
		, g.Name
		, g.Type
		, (
			CASE wHEN b.M_id is null THEN FALSE
			else tRUE
			END
			) AS IS_Member
	FROM Guild g
	Left Outer Join Belong b on g.G_id = b.G_id AND b.M_id = ` + user.id + `
	ORDER BY g.Name`;
		req.db.query(qry,function(err,Guilds) {
			if(err) {
				console.log("Error getting Guild!");
			}
			else {
				console.log(Guilds);
				res.status(200).render('guild',{Guilds});
			}
		});
	}
	close(req);
});

app.post('/guild/join', connectDb, function(req,res) {
	console.log("Hit here.");
	var guildID = req.body.G_id
	console.log(user.id + " is Joining Guild " + guildID);
	if(user === undefined) {
	 	//console.log("You need to login to view this page!");
		 //res.status(200).render('notloggedin');
		 res.redirect('/account');
	}
	else {
		var qry = `Insert into Belong (M_id, G_id) 
		values (`+ user.id + `,` + guildID + `)`;
		req.db.query(qry,function(err,Guilds) {
			if(err) {
				console.log("Error joining Guild!");
			}
			else {
				console.log(Guilds);
				res.status(200).render('guild',{Guilds});
			}
		});
	close(req);
	}
});

app.post('/guild/leave', connectDb, function(req,res) {
	console.log("Hit here.");
	var guildID = req.body.G_id
	console.log(user.id + " is Leaving Guild " + guildID);
	if(user === undefined) {
	 	//console.log("You need to login to view this page!");
		 //res.status(200).render('notloggedin');
		 res.redirect('/account');
	}
	else {
		var qry = `delete from Belong Where M_id = `+ user.id + ` AND G_id = ` + guildID;
		console.log(qry);
		
		req.db.query(qry,function(err,Guilds) {
			if(err) {
				console.log("Error Leaving Guild!");
			}
			else {
				console.log(Guilds);
				res.status(200).render('guild',{Guilds});
			}
		});
		
	close(req);
	}
});

// app.post(
// 	'/guild',
// 	connectDb,
// 	function(req, res, next) {
// 		let guildName = req.body.guildname;
// 		let memberName = req.body.membername;
// 	}
// )

/* not found 404*/
app.get('*', function(req,res){
	res.status(400).render('notfound');
	close (req);
});

/* Handled all of the resources we need to clean up, In this case,
 * we just need to close the database connection.
 */
function close(req) {
	if (req.db){
		req.db.end();
		req.db = undefined;
		console.log('Database connection closed');
	}
}


app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log("== Server listening on port", port);
});
