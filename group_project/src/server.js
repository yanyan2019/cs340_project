/*server.js with express*/

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 50001;
var user = {
	name: "guest",
	pass: undefined
};
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
	console.log(" ["+user.name+"]@'/'!");
	close(req);
});

/* about page */
app.get('/about', function(req, res){
	res.status(200).render('about');
	console.log(" ["+user.name+"]@'/about'!");
	close(req);
});

app.post('/request/login', function(req, res) {
	console.log("req.url: ",req.url);
	console.log("req.body: ",req.body);
	if(req.body && req.body.name && req.body.text) {
		var usernamefrombox 		= req.body.name;
		var passwordfrombox 		= req.body.text;
		if(usernamefrombox && true) {
			if(passwordfrombox && true) {
				res.status(200).send("Login Successful!");
				user.name = usernamefrombox;
				user.pass = passwordfrombox;
				console.log("Hello "+user.name+"!");
			}
			else {
				res.status(200).send("Incorrect Password!");
			}
		}
		else {
			console.log("User doesn't exist!");
			res.status(200).send("Creating New Account!");
			//INSERT NEW USER INTO MEMBERS!
		}
	}
	else {
		res.status(400).send("req.body is undefined!");
	}
});

app.get('/account', function(req, res){
	res.status(200).render('account');
	console.log(" ["+user.name+"]@'/account'!");
	close(req);
});

app.get('/quest', function(req, res){
	res.status(200).render('quest');
	close(req);
});

/* not found 404*/
app.get('*', function(req,res){
	res.status(400).render('notfound');
	console.log(" ["+user.name+"]@'*'!");
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
