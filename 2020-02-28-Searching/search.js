let data = [
	12, 34, 56, 78, 90	
]

	
let arr = [];
for (let i = 0; i < 10000000; i++) {
	arr[i] = Math.floor(Math.random() * 100000000);
}
console.log("array built");
arr.sort((a,b) => a - b);
console.log("array sorted");
// console.log(arr);

// Should find the item in the array,
// and return the index the item exists at
// it not found, returns -1
// On average n/2 lookups to find the item
function find(array, item) {
	for (let i = 0; i < array.length; i++) {
		if (item === array[i]) {
			return i; // Found it (wherever!)
		}
	}
	return -1; // Didn't find it 
}

// Should find the item in the array,
// and return the index the item exists at
// it not found, returns -1
// on average takes log2(n) lookup
//	 log grows REALLY slow
// log2(4) = 2, 2^2 = 4
// log2(8) = 3, 2^3 = 8
// log2(1024) = 10, 2^10 = 1024
// log2(2048) = 11, 2^11 = 2048
// log2(4096) = 12, 2^12 = 4096
// ... double the input size, only one more step on average!
function binarySearch(array, item) {
	let pos = Math.floor(array.length / 2);
	let jump = Math.floor(array.length / 4);
	while (jump > 0) {
		// console.log(`Pos: ${pos} Jump: ${jump} value: ${array[pos]}`);
		if (array[pos] === item) {
			return pos; // Found it !	
		}
		let dir = item - array[pos];
		if (dir > 0) { // item is bigger, look to the right
			pos += jump;
		} else { // item is smaller, look to the left
			pos -= jump;	
		}
		
		
		jump = Math.floor(jump/2);
	}
	return -1;
}


// //let i = find(data, 56);
// let num = 48;
for (let k = 0; k < 20000; k++) {
	let num = Math.floor(Math.random() * 100000000);
	// let i = find(data, num);
	// let i = find(arr, num);
	let i = binarySearch(arr, num);

	if (i === -1) {
		console.log("didn't find " + num);
	} else {
		console.log("found " + num  + " at " + i);
	}
}