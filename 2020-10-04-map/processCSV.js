if (!module) { module = {}; }

const VALID_NUMBER_CHARS = "-0123456789Ee.";
function parseDouble(str) {
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (!VALID_NUMBER_CHARS.includes(char)) {
			return NaN;
		}
	}
	return parseFloat(str);
}

function parseCSV(csv, sep = ',', keyIndex = 0) {
	const ret = {}
	
	const lines = csv.split("\n");
	const keys = lines[0].split(sep);
	
	for (let i = 0; i < keys.length; i++) {
		// Clean up extra whitespace from inside keys.
		keys[i] = keys[i].trim();
	}
	
	for (let i = 1; i < lines.length; i++) {
		const obj = {};
		const line = lines[i];
		// Skip empty lines
		if (line.length <= 2) { continue; }
		// Skip comments
		if (line.trim()[0] === "#") { continue; }
		
		const content = line.split(sep);
		const objKey = content[keyIndex];
		
		for (let k = 0; k < keys.length && k < content.length; k++) {
			const str = content[k];
			
			if (str != null && str !== "") {
				const key = keys[k];
				const val = parseDouble(str);
				
				if (!isNaN(val)) {
					obj[key] = val; // insert numeric value
				} else if (str.toLowerCase() === "true") {
					obj[key] = true; // insert boolean true
				} else if (str.toLowerCase() === "false") {
					obj[key] = false; // insert boolean false
				} else {
					obj[key] = str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
				}
			}
		}
		
		ret[objKey] = obj;
	}
	
	return ret;
}

// obj = { Colorado: { ... } }
// mapping = { "Colorado": "US-CO" }
// ret = { "US-CO": { ... } }
function renameKeys(obj, mapping) {
	const ret = {};
	
	for (let key in obj) {
		if (mapping[key]) {
			ret[mapping[key]] = obj[key];
		}
	}
	
	return ret;
}

module.exports = { parseCSV, renameKeys }
