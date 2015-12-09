function login() {
	var login_email = $("#email").val();
	var login_password = $("#password").val();
	var ref = new Firebase("https://vibekey-open.firebaseio.com/");
	ref.authWithPassword({
	  email    : login_email,
	  password : login_password
	}, function(error, authData) {
	  if (error) {
	    alert("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    var username = authData.password.email;
	    $("#modal_trigger").text("Login as " + username + "Click to log out");
	    $(".loginPop").hide();
	    $(".logoutPop").show();
	    changeToDjView();
	  }
	});
}

function logout() {
	var ref = new Firebase("https://vibekey-open.firebaseio.com/");
	ref.unauth();
	$("#modal_trigger").text("Login or register");
	$(".logoutPop").hide();
	$(".loginPop").show();
	changeToUserView();
}

function changeToDjView() {
	$(".DjView").show();
	$(".UserView").hide();
}

function changeToUserView() {
	$(".DjView").hide();
	$(".UserView").show();
}

// function register() {
// 	var ref = new Firebase("https://vibekey-open.firebaseio.com/");
// 	ref.createUser({
//   		email    : "bobtony@firebase.com",
// 	  	password : "correcthorsebatterystaple"
// 	}, function(error, userData) {
// 	  if (error) {
// 	    console.log("Error creating user:", error);
// 	  } else {
// 	    console.log("Successfully created user account with uid:", userData.uid);
// 	  }
// 	});
// }