const RED = {r: 1, g: 0, b: 0}
const GREEN = {r: 0, g: 1, b: 0}
const BLUE = {r: 0, g: 0, b: 1}

/** Linear Interpolation
@param {number} f - number to interpolate
@param {number} a - first endpoint
@param {number} b - second endpoint
@returns {number} - number at position (f) on line made by ab */
function lerp(f, a, b) {
	return a + (b - a) * f;
}

/** Fractional part of number
@param {number} f - number to get fractional part of */
function frac(f) {
	return f - Math.floor(f);
}
/** Mathematical repeat 
@param {number} f - number to repeat 
@param {number} length - length of [0, length) range
@returns {number} - (f) repeated in range [0, length), always positive.*/
function repeat(f, length) { 
	return clamp(f - Math.floor(f / length) * length, 0, length);
}
/** Mathematical ping-pong
@param {number} f - number to ping-pong 
@param {number} length - length of [0, length) range
@returns {number} - (f) ping-pong in range [0, length), always positive. */
function pingPong(f, length) {
	f = repeat(f, length*2.0);
	return length - Math.abs(f - length);
}

/** Mathematical clamp
@param {number} f - number to clamp
@param {number} a - first endpoint
@param {number} b - second endpoint
@returns {number} - a, if (f < a), b if (b < f), otherwise f. */
function clamp(f, a, b) {
	return (f < a) ? a : (f > b) ? b : f;
}

/** Color lerp
@param {number} f - number to lerp
@param { {r:number,g:number,b:number} } a - object holding first color
@param { {r:number,g:number,b:number} } b - object holding second color
@returns { {r:number,g:number,b:number} } - color in-between first and second color.*/
function colorLerp(f, a, b) {
	const result = {
		r: lerp(f, a.r, b.r),
		g: lerp(f, a.g, b.g),
		b: lerp(f, a.b, b.b),
	}
	return result;
}

/** Color Code generator
@param { {r:number,g:number,b:number} } color - object holding first color
@returns {string} - "#RRGGBB" color code for color */
function toColorCode(color) {
	let r = clamp(color.r, 0, 1);
	let g = clamp(color.g, 0, 1);
	let b = clamp(color.b, 0, 1);
	r = Math.floor(r * 255).toString(16);
	g = Math.floor(g * 255).toString(16);
	b = Math.floor(b * 255).toString(16);
	r = r.length < 2 ? "0" + r : r;
	g = g.length < 2 ? "0" + g : g;
	b = b.length < 2 ? "0" + b : b;
	
	return `#`+r+g+b;
}


function color(val, lowVal, highVal, lowColor, highColor) {
	
}
// #FF88CC
// 255,136,200
