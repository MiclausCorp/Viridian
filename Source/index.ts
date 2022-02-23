//
//  index.ts
//  Core file for the Viridian Project
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
import * as ViridianTemplateProcessor from "./Viridian Template Processor/index"; // Viridian Template Processor engine

/**
 * Display a template in the DOM.
 * 
 * @param selector The first `Element` within the document that matches the specified selector, which will receive the HTML component (eg. `div`).
 * @param component The HTML templated element to give to the `selector` (eg. `div'Hello ${user.name}`).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function init({ selector, component }: { selector: string; component: any; }): void {
	// Get the object using the document selector
	const app = document.querySelector(selector);

	// Create the new HTML component
	const newElement = document.createElement(component.type);

	// Add the inner HTML
	const newTextContent = document.createTextNode(component.template);

	// Append the Inner HTML to the element
	newElement.append(newTextContent);

	// Finally, append the element to the DOM. 
	app?.append(newElement);
}

/* Module Exports */
exports.html = ViridianTemplateProcessor.html;
exports.init = init;