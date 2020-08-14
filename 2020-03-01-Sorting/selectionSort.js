// Initial tiny test data set
let data = [
	34, 12, 56, 90, 78
]

// Fill another array with lots of random values
let arr = [];
for (let i = 0; i < 10000; i++) {
// This generates an integer between 0 and 100,000,000
	arr[i] = Math.floor(Math.random() * 10000);
}


function selectionSort(array) {
	let swaps = 0;
	let compares = 0;
	
	// Loop over the array, here, the loop counter
	// is the index we want to select the lowest element for.
	for (let i = 0; i < array.length-1; i++) {
		// Mark the first element of the unsorted region as the 'lowest'
		// cause so far, it's all we've seen
		let lowest = i;
		let lowestNum = array[i];
		//console.log(`Outer Loop ${i}`)
		
		// Go over the rest of the elements
		for (let k = i+1; k < array.length; k++) {
			// If any of them are lower, 
			compares++;
			if (array[k] < lowestNum) {
				// Update the lowest we've seen with that element	
				lowest = k;
				lowestNum = array[k];	
			}
		}
		
		
		// If we've moved the marker during that inner for loop,
		// We have an element to swap in place 
		if (lowest !== i) {
			// Bad, swapping doesn't work this way!
			// array[i] = array[lowest];
			// array[lowest] = array[i];
			// This would put the same data at both places in the array
			
			//console.log(`Swapping ${i} and ${lowest}\nBefore: `)
			//console.log(array)
			// Remember The element we want to replace,
			// otherwise when the middle line runs, we would lose that data.
			const temp = array[i]; 
			// Stick the first thing we are swapping in its place
			array[i] = lowestNum;	
			// Stick the other thing we are swapping in the other place
			array[lowest] = temp;
			
			swaps++;
			
			
			//console.log(`After: `)
			//console.log(array)
		}
	}
	return { swaps, compares };
}
		
let result;	
console.log(`Before Sorting: `);
console.log(data);
result = selectionSort(data);
console.log(`After Sorting: `);
console.log(data);
console.log(`Result:`);
console.log(result);

console.log(`Before Sorting: `);
console.log(arr);
result = selectionSort(arr);
console.log(`After Sorting: `);
console.log(arr);

console.log(`Result:`);
console.log(result);