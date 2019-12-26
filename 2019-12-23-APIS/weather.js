

$(document).ready(function() { 
	$.get( `http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=${accuweatherKey}`, 
	// $.get( `https://dataservice.accuweather.com/locations/v1/regions?apikey=${accuweatherKey}`, 
	function(res) {
		console.log(res);
		console.log(typeof(res))
		
		
		if (res.length) {
			for (let i = 0; i < res.length; i++) {
				
				let element = $("<div></div>");
				let location = res[i];
				element.attr("id", location.Key);
				element.addClass("col s4 card tiny");
				
				element.text(`City: ${location.EnglishName}, ${location.Country.EnglishName}`)
				//element.text("City: " + location.EnglishName + ` Id: ` + location.ID)
				element.click(function() {
					$.get("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location.Key + `?apikey=${accuweatherKey}`,
					function(res) {
						let forecast = res.DailyForecasts[0];
						let mintemp = forecast.Temperature.Minimum
						let maxtemp = forecast.Temperature.Maximum
						console.log("forecast: " +forecast);
						let felem = $(`#${location.Key} .forecast`);
						console.log(felem);
						if (felem.length == 0) {
							
							felem = $(`<div></div>`)
							felem.addClass("forecast");
							$(`#${location.Key}`).append(felem);
						}
							
						felem.text(`Temperature ${mintemp.Value} ${mintemp.Unit} - ${maxtemp.Value} ${maxtemp.Unit}`)
						console.log(felem);
						
					})
					console.log(`${location.EnglishName} clicked!`)
				})
				
				$(".container").append(element);
			}
			
		}
		
	})
})
