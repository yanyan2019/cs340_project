/*server.js with express*/

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');


var app = express();
var port = process.env.PORT || 3000;


/*add layouts */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

/* root path to home page*/
app.get('/home', function(req, res, next){
	res.status(200).render('home');
});

/* not found 404*/
app.get('*', function(req,res,next){
	res.status(400).render('notfound');
});

app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log("== Server listening on port", port);
});
