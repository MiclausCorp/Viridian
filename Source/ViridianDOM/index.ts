//
//  Viridian Web Engine/index.ts
//  Main implementation for the Viridian Templating Processor and Reconciliation Engine.
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

/**
 * Viridian Element type
 */
export type VRElement = {
	// Element type
	type: string;

	// Element Props
	props: { 
		// HTML DOM node value
		nodeValue: string; 

		// Children elements
		children: Array<VRElement>;
	}
}

/**
 * Viridian DOM Container type
 */
type VRContainer = HTMLElement | Text | Element | null;

/**
 * Create and return a new Viridian element of the given type
 * @param type a `string` that specifies the type of the DOM node we want to create, it’s the `tagName` you pass to `document.createElement(_)` when you want to create an HTML element.
 * @param props The keys and values from the JSX attributes. It also contains the property: `children`.
 * @param children Element Content
 * @returns Viridian element of the given type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createElement(type: string, props: any, ...children: Array<string>): VRElement {
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
 * @param Input object
 * @returns Viridian Text element
 */
export function createTextElement(text: string): VRElement {
	return {
		type: "_",
		props: {
			nodeValue: text,
			children: [],
		},
	};
}

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

/**
 * Viridian DOM Engine
 */
export const ViridianDOM = {
	createElement,
	render,
};
