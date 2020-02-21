let payload = {
	token: "",
	data: {
		name: "nameFirst",
		email: "internetEmail",
		phone: "phoneHome",
		_repeat: 20
	}
};

$.ajax({
	type: "POST",
	url: "https://app.fakejson.com/q",
	data: payload,
	success: function(resp) {
		console.log(resp);
	}
});