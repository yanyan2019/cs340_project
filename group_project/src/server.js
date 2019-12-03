/*server.js with express*/

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 1884;

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

app.get('/quest', function(req, res){
	res.status(200).render('quest');
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
