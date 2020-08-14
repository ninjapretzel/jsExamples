// Initial tiny test data set
let data = [
	34, 12, 56, 90, 78
]

// Fill another array with lots of random values
let arr = [];
for (let i = 0; i < 100; i++) {
// This generates an integer between 0 and 100,000,000
	arr[i] = Math.floor(Math.random() * 10000);
}


function insertionSort(array) {
	debugger;
	let compares = 0;
	let swaps = 0;
	
	for (let i = 1; i < array.length; i++) {
		let element = array[i];
		let swapped = false;
		
		let k;
		for (k = i-1; k >= 0; k--) {
			compares++;
			if (array[k] > element) {
				// Shift larger item over to make room
				swaps++;
				array[k+1] = array[k];
				swapped = true;
			} else {
				break; 
			}
			
		}
		// if we moved any elements over,
		if (swapped) {
			// insert the element in the open slot
			console.log(`inserting ${element} at ${k}`)
			swaps++;
			array[k+1] = element;	
		}
		//console.log(array);
	}
	return { swaps, compares };
}

let result;	
console.log(`Before Sorting: `);
console.log(data);
result = insertionSort(data);
console.log(`After Sorting: `);
console.log(data);
console.log(`Result:`);
console.log(result);

console.log(`Before Sorting: `);
console.log(arr);
result = insertionSort(arr);
console.log(`After Sorting: `);
console.log(arr);

console.log(`Result:`);
console.log(result);