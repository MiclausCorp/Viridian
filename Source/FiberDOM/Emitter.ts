//
//  FiberDOM/Emmiter.ts
//  Viridian Fiber factory
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

/* Include Directive */
import { VRFiber, VRFiberType } from "./VRFiber"; // Viridian Fiber

/**
 * Create and return a new Viridian Fiber element of the given type
 * @param type a `string` that specifies the type of the DOM node we want to create, it’s the `tagName` you pass to `document.createElement(_)` when you want to create an HTML element.
 * @param props The keys and values from the attributes. It also contains the property: `children`.
 * @param children Element Content
 * @returns Viridian Fiber of the given type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createElement(type: string, props: any, ...children: Array<string>): VRFiber {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				/* The children array could contain primitive values like strings or numbers. */
				/* We’ll wrap everything that isn’t an object inside its own element and create a special type for them: `TEXT`. */
				typeof child === "object"
					? child
					: createTextElement(child)
			),
		},
	};
}

/**
 * Wrap primitive values in a text element
 * @param text Input object
 * @returns Viridian Text element
 */
function createTextElement(text: string): VRFiber {
	return {
		type: VRFiberType.textElement,
		props: {
			nodeValue: text,
			children: [],
		},
	};
}
