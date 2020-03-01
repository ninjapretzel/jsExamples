// Initial tiny test data set
let data = [
	34, 12, 56, 90, 78
	// 90, 78, 56, 34, 12
]

// Fill another array with lots of random values
let arr = [];
for (let i = 0; i < 10000; i++) {
// This generates an integer between 0 and 100,000,000
	arr[i] = Math.floor(Math.random() * 10000);
}

function bubbleSort(array) {
	let compares = 0;
	let swaps = 0;
	for (let i = 0; i < array.length; i++) {
		let swapped = false;
	
		// Pass over the unsorted part of the array
		for (let k = 1; k < array.length - i; k++) {
			
			compares++;
			// Compare two elements, swap if out of order
			if (array[k-1] > array[k]) {
				const temp = array[k];
				array[k] = array[k-1];
				array[k-1] = temp;
				swapped = true;	
				swaps++;
			}
		}
		
		// If we do not make a single swap when passing through, we are finished!
		if (!swapped) {
			return { swaps, compares};
		}
		
	}
	
	return { swaps, compares};
}

let result;	
console.log(`Before Sorting: `);
console.log(data);
result = bubbleSort(data);
console.log(`After Sorting: `);
console.log(data);
console.log(`Result:`);
console.log(result);

console.log(`Before Sorting: `);
console.log(arr);
result = bubbleSort(arr);
console.log(`After Sorting: `);
console.log(arr);

console.log(`Result:`);
console.log(result);