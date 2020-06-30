
$(document).ready(()=>{
	$("#makeButton").click(()=>{
		const name = $("#burgerName").val();
		
		$.post("/burgers/create", {name}, (data, status) => {
			// Page will be re-rendered server side.
			// We tell the browser to discard 
			// the cached page by passing in "true".
			window.location.reload(true);
		});
	});
	
	$(".devour").click((event)=>{
		const burgerID = $(event.target).attr("data");
		
		$.post("/burgers/devour/"+burgerID, {}, (data, status) => {
			// Page will be re-rendered server side.
			// We tell the browser to discard 
			// the cached page by passing in "true".
			window.location.reload(true);
		});
	});
	
	
});
