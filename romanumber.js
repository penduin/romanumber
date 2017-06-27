/*
  romanumber.js - 2017 Owen Swerkstrom
  this is public domain.  it is also silly.
*/

// roman numeral stringification
Number.prototype.plainToString = Number.prototype.toString;
Number.prototype.toString = function toString(radix) {
	if(radix && radix.toUpperCase && radix.toUpperCase() === "R") {
		var num = this.valueOf();
		var str = "";
		var map = {
			"M": 1000,
			"CM": 900,
			"D": 500,
			"CD": 400,
			"C": 100,
			"XC": 90,
			"L": 50,
			"XL": 40,
			"X": 10,
			"IX": 9,
			"V": 5,
			"IV": 4,
			"I": 1
		};
		Object.keys(map).every(function(sym) {
			while(num >= map[sym]) {
				str += sym;
				num -= map[sym];
			}
			return true;
		});
		return str;
	} else {
		return this.plainToString(radix);
	}
};

// roman numeral parsing
Number.plainParseInt = Number.parseInt || parseInt;
Number.parseInt = function parseInt(str, radix) {
	if(radix && radix.toUpperCase && radix.toUpperCase() === "R") {
		var num = 0;
		var map = {
			"I": 1,
			"IV": 4,
			"V": 5,
			"IX": 9,
			"X": 10,
			"XL": 40,
			"L": 50,
			"XC": 90,
			"C": 100,
			"CD": 400,
			"D": 500,
			"CM": 900,
			"M": 1000
		};
		Object.keys(map).every(function(sym) {
			while(str.lastIndexOf(sym) == str.length - sym.length && str.length - sym.length >= 0) {
				str = str.substring(0, str.lastIndexOf(sym));
				num += map[sym];
			}
			return true;
		});
		return num || NaN;
	} else {
		return Number.plainParseInt(str, radix);
	}
};
parseInt = Number.parseInt;


// super-rigorous unit tests
/*
for(i = 0; i < 25; ++i) {
	console.log(i + " -> " + i.toString("r") + " -> " + parseInt(i.toString("r"), "r"));
}
console.log("parseInt fail: " + parseInt("1234", "r"));
console.log("parseInt pass: " + parseInt("XVII", "r"));
var foo = 5
console.log("toString: " + foo.toString("r"));
*/
