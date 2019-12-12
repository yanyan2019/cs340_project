var form = {

    questTitle: document.getElementById('questTitle'),
	questDesc: document.getElementById('questDesc'),
    questRank: document.getElementById('questRank'),
    questReward: document.getElementById('questReward'),
    questAmount: document.getElementById('questAmount'),
    guildID: document.getElementById('guildID'),
	submitButton: document.getElementById('submitButton')
}

function POST(event) {
	postReq = new XMLHttpRequest();
	reqURL = '/quest/add';
	postReq.open('POST',reqURL);
	if(form.questTitle.value == "" || form.questDesc.value == "" || form.questRank.value == "" || form.questReward.value == "" || form.questAmount.value == "" || form.guildID.value < 1) {
		alert("You did not fill out all fields!");
		return;
	}
	var data = JSON.stringify({
		"questTitle": form.questTitle.value,
		"questDesc": form.questDesc.value,
        "questRank": form.questRank.value,
        "questReward": form.questReward.value,
        "questAmount": form.questAmount.value,
        "guildID": form.guildID.value
	});
	console.log(data);
	postReq.addEventListener('load', function(event) {
		if(event.target.status === 200) {
            console.log("Attempting to Submit 'addQuest' " + event.target.response);
            window.location = "/quest";
		}
		else {
			console.log("Boo! Request lost!");
		}
	});
	postReq.setRequestHeader('Content-Type','application/json');
	postReq.send(data);
}
form.submitButton.addEventListener('click',POST);