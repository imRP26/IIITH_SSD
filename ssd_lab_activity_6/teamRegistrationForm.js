function formValidation() {
	if (groupemail_validation() && teamlead_selection() && password_verification()) {
		alert('Form successfully submitted');
		window.location.reload();
		return true;
	}
	else {
		return false;
	}
}


function password_verification() {
	var serverpassword = document.registration.serverpassword;
	var confirmpassword = document.registration.confirmpassword;
	if (serverpassword != confirmpassword) {
		alert("Passwords do not match");
		return false;
	}
	else {
		return true;
	}
}


function groupemail_validation() {
	var groupemail = document.registration.groupemail;
	var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (groupemail.value.match(mailformat)) {
		return true;
	}
	else {
		alert("You have entered an invalid email address.");
		groupemail.focus();
		return false;
	}
}


function teamlead_selection() {
	var teamlead = document.registration.teamlead;
	if (teamlead.value == "Default") {
		alert('Select Team Lead from the list.');
		teamlead.focus();
		return false;
	}
	else {
		return true;
	}
}


function dsHandler(e){
    e.dataTransfer.setData("elem", e.target.id);
}


function doHandler(e){
    e.preventDefault();
}


function dpHandler(e){
    e.preventDefault();
    var elId = e.dataTransfer.getData("elem");
    e.target.appendChild(document.getElementById(elId));
}