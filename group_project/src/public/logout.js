var form = {
	name: document.getElementById('ftitle'),
	text: document.getElementById('ftext'),
	button: document.getElementById('fbutton'),
	logout: document.getElementById('flogout')
}
function LOGOUT(event) {
	postReq = new XMLHttpRequest();
	reqURL = '/request/logout';
	postReq.open('POST',reqURL);
	reqPost = JSON.stringify({
		"text": "Logged out!"
	});
	console.log(reqPost);
	postReq.addEventListener('load', function(event) {
		if(event.target.status === 200) {
			console.log("Yay! Request Recieved! " + event.target.response);
			res = event.target.response;
			if(res === "Logout Successful!") {}
			else if(res === "Not logged in!") {
				alert("Not logged in!");
			}
			else {}
		}
		else {
			console.log("Boo! Request lost!");
		}
	});
	postReq.setRequestHeader('Content-Type','application/json');
	postReq.send(reqPost);
}
form.logout.addEventListener('click',LOGOUT);
