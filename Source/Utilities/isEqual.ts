//
//  Utilities/isEqual.ts
//  Equality Utility
//
//  Created by Darius Miclaus (mdarius13)
//
//  Copyright (c) 2022 Miclaus Industries Corporation B.V. Advanced Software Technologies Research Group.
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, 
//  modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
//  persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall 
//  be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
//  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
//  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
//  OR OTHER DEALINGS IN THE SOFTWARE.
//
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/**
 * Check equality
 * @param a Object A
 * @param b Object B
 * @param refs References
 * @returns Returns `true` if the values are equivalent, else `false`.
 */
function checkEquality(a, b, refs) {
	// @ts-expect-error TS-loader can't understand this
	// eslint-disable-next-line no-var
	var toString = Object.prototype.toString,
		getPrototypeOf = Object.getPrototypeOf,
		getOwnProperties = Object.getOwnPropertySymbols
			? function(c) {
				return Object.keys(c).concat(Object.getOwnPropertySymbols(c));
			}
			: Object.keys;
		
	// @ts-expect-error TS-loader can't understand this
	// eslint-disable-next-line no-var
	var aElements, bElements, element,
		aType = toString.call(a),
		bType = toString.call(b);

	// trivial case: primitives and referentially equal objects
	if (a === b) return true;

	// if both are null/undefined, the above check would have returned true
	if (a == null || b == null) return false;

	// check to see if we've seen this reference before; if yes, return true
	if (refs.indexOf(a) > -1 && refs.indexOf(b) > -1) return true;

	// save results for circular checks
	refs.push(a, b);

	if (aType != bType) return false; // not the same type of objects

	// for non-null objects, check all custom properties
	aElements = getOwnProperties(a);
	bElements = getOwnProperties(b);
	if (
		aElements.length != bElements.length || aElements.some(function(key) { 
			return !checkEquality(a[key], b[key], refs);
		})
	) {
		return false;
	}

	switch (aType.slice(8, -1)) {
	case "Symbol":
		return a.valueOf() == b.valueOf();
	case "Date":
	case "Number":
		return +a == +b || (+a != +a && +b != +b); // convert Dates to ms, check for NaN
	case "RegExp":
	case "Function":
	case "String":
	case "Boolean":
		return "" + a == "" + b;
	case "Set":
	case "Map": {
		aElements = a.entries();
		bElements = b.entries();
		do {
			element = aElements.next();
			if (!checkEquality(element.value, bElements.next().value, refs)) {
				return false;
			}
		} while (!element.done);
		return true;
	}
	case "ArrayBuffer":
		(a = new Uint8Array(a)), (b = new Uint8Array(b)); // fall through to be handled as an Array
	case "DataView":
		(a = new Uint8Array(a.buffer)), (b = new Uint8Array(b.buffer)); // fall through to be handled as an Array
	case "Float32Array":
	case "Float64Array":
	case "Int8Array":
	case "Int16Array":
	case "Int32Array":
	case "Uint8Array":
	case "Uint16Array":
	case "Uint32Array":
	case "Uint8ClampedArray":
	case "Arguments":
	case "Array":
		if (a.length != b.length) return false;
		for (element = 0; element < a.length; element++) {
			if (!(element in a) && !(element in b)) continue; // empty slots are equal
			// either one slot is empty but not both OR the elements are not equal
			if (
				element in a != element in b || !checkEquality(a[element], b[element], refs)
			)
				return false;
		}
		return true;
	case "Object":
		return checkEquality(getPrototypeOf(a), getPrototypeOf(b), refs);
	default:
		return false;
	}
}

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * @param lhs The value to compare. Left-hand side input object
 * @param rhs The other value to compare.  Right-hand side input object
 * @returns Returns `true` if the values are equivalent, else `false`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(lhs: any, rhs: any): boolean {
	return checkEquality(lhs, rhs, []);
}