var form = {
	name: document.getElementById('ftitle'),
	text: document.getElementById('ftext'),
	button: document.getElementById('fbutton')
}
function POST(event) {
	postReq = new XMLHttpRequest();
	reqURL = '/request/login';
	postReq.open('POST',reqURL);
	if(form.name.value == "" || form.text.value == "") {
		alert("You did not fill out all fields!");
		return;
	}
	reqPost = JSON.stringify({
		"name": form.name.value,//"SuperPrushka64",
		"text": form.text.value//"Howdy from Post.js"
	});
	console.log(reqPost);
	postReq.addEventListener('load', function(event) {
		if(event.target.status === 200) {
			console.log("Yay! Request Recieved! " + event.target.response);
			res = event.target.response;
			if(res === "Login Successful!") {
				// Do nothing!
			}
			else if(res === "Incorrect Password!") {
				alert("Incorrect Password!");
			}
			else if(res === "Creating New Account!") {
				alert("Creating New Account!");
			}
			else {

			}
		}
		else {
			console.log("Boo! Request lost!");
		}
	});
	postReq.setRequestHeader('Content-Type','application/json');
	postReq.send(reqPost);
}
form.button.addEventListener('click',POST);
