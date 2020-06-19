
class Foobar {
	constructor (a, b, c, d) {
		this.a = a; this.b = b; this.c = c; this.d =d;	
	}	
}

function createInstance(constructor, argArray) {
	const args = [null, ...argArray];
	const factory = constructor.bind.apply(constructor, args);
	return new factory();
}

const constructors = {
	Foobar,
};

const params = [ 1,2,3,4 ];

console.log(createInstance(constructors["Foobar"], params));

