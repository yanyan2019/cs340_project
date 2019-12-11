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
	extname: '.hbs'
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
		req.db.query('SELECT * FROM Member WHERE M_name = ?',[usernamefrombox],function(err,members) {
			if(err) {
				console.log("Error getting Member");
			}
			else {
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
					if(members[0].M_id == passwordfrombox) {
						console.log("Login Successful!");
						user = {
							name: usernamefrombox,
							pass: passwordfrombox
						};
						close(req);
						res.status(200).send("Login Successful!");
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
		req.db.query('SELECT * FROM Quest',function(err,Quests) {
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
app.get('guild', connectDb, function(req,res) {
	if(user === undefined) {
		console.log("You need to login to view this page!");
		res.status(200).render('notloggedin');
	}
	else {
		req.db.query('SELECT * FROM Guild',function(err,Guilds) {
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
