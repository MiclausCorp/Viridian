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
import * as ViridianDOM from "./ViridianDOM"; // Viridian Template Processor & Reconciliation Engine

/**
 * Display a component in the DOM.
 * 
 * @param selector The first `Element` within the document that matches the specified selector, which will receive the HTML component (eg. `div`).
 * @param component The Viridian element to give to the `selector` (eg. `'Hello ${user.name}`).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function init({ selector, type, component }: { selector: string; type?: string; component: string; }): void {
	// Get the object using the document selector
	const app = document.querySelector(selector);

	// Create the component.
	// If we got a custom type (eg. "h1"), use that. otherwise use a `div`.
	const element = ViridianDOM.createElement(type || "div", null, component);

	// Render the component
	ViridianDOM.render(element, app);
}

/* Module Exports */
exports.createElement = ViridianDOM.createElement;
exports.render = ViridianDOM.render;
exports.init = init;