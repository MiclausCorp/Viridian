//
//  ViridianDOM/Renderer.ts
//  Viridian DOM renderer
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
import { VRContainer } from "./VRContainer"; // Viridian DOM Container Type
import { VRElement } from "./VRElement";     // Viridian DOM Element Type

/**
 * Render a Viridian Element in a DOM Container
 * @param element Viridian Element
 * @param container DOM Container
 */
export function render(element: VRElement, container: VRContainer): void {
	// Unwrap the container
	if (container !== null) {
		// Create HTML element
		// If the element type is `_` we create a text node instead of a regular node.
		const dom = element.type === "_" 
			? document.createTextNode("")
			: document.createElement(element.type);

		// Assign the element props to the node.
		const isProperty = (key: string) => key !== "children";
		Object.keys(element.props)
			.filter(isProperty)
			.forEach(name => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				/* @ts-ignore */
				dom[name] = element.props[name];
			});


		// Render each child element recursively
		element.props.children.forEach((child: VRElement): void =>
			render(child, dom)
		);

		// Append them to the DOM.
		container.appendChild(dom);
	}
}