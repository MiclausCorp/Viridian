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
//  OR
//

/* Include Directive */
import { h } from "snabbdom";

/**
 * State Types
 */
const State = {
	template: "",
};

/**
 * Get raw content from template string.
 * @param args Input Arguments
 * @returns Template content
 */
const reduce = (args: Array<string>) => (acc: typeof State, currentString: string, index: number) => ({
	...acc,
	template: acc.template + currentString + (args[index] || "")
});

/**
 * Generate an HTML element from a template.
 * @param tagName Tag Name
 * @returns Virtual DOM Element
 */
export function html(tagName: string) {
	return (strings: TemplateStringsArray, ...args: Array<string>) => {
		// Get raw template content
		const { template } = strings.reduce(reduce(args), State);

		// Build HTML element
		return {
			type: "element",
			template: h(
				tagName,
				{},
				template)
		};
	};
}