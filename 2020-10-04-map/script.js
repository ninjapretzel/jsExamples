
function showData(data, key, minColor, maxColor) {
	let min = Number.MAX_VALUE;
	let max = Number.MIN_VALUE;
	
	for (let k in data) {
		const obj = data[k];
		const value = obj[key];
		if (value < min) { min = value; }
		if (value > max) { max = value; }
	}

	const range = (max - min);
	for (let k in data) {
		const obj = data[k];
		const value = obj[key];
		
		const p = (value - min) / range;
		let col = colorLerp(p, minColor, maxColor);
		
		$("#"+k).css("fill", toColorCode(col));
		
	}
	
	const map = $("#map")
	$("#box").empty();
	$("#box").append(map);
	
}

function makeLabels(data, key, color) {
	const group = $(`<g class="map-labels" />`);
	
	for (let k in data) {
		const obj = data[k];
		const value = obj[key];
		
		const bbox = document.getElementById(k).getBBox();
		const centerx = bbox.x + bbox.width/2;
		const centery = bbox.y + bbox.height/2;
		
		const text = $(`<text />`);
		text.text(value);
		text.attr("x", centerx);
		text.attr("y", centery);
		text.attr("fill", toColorCode(color));
		group.append(text);
	}
	
	const map = $("#map")
	$("#box").empty();
	$("#box").append(map);
	map.append(group);
	
	
	
}

$(document).ready(()=>{
	
	makeLabels(data, "State", { r:0, g:0, b:0 });
	
	showData(data, "Population", { r:1, g:1, b:1 }, RED);
	
});
