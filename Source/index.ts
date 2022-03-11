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

/* Viridian FiberDOM Reconciliation Engine */
import { createElement } from "./FiberDOM/Emitter";  // Viridian FiberDOM Fiber Factory
import { render }        from "./FiberDOM/Engine";   // Viridian FiberDOM DOM Renderer

/* Viridian FiberDOM Interactivity Hooks */
import { $Callback }     from "./Hooks/$Callback";   // `$Callback`  interactivity hook
import { $Effect }       from "./Hooks/$Effect";	 // `$Effect`    interactivity hook
import { $Memoize }      from "./Hooks/$Memoize";    // `$Memoize`   interactivity hook
import { $Reference }    from "./Hooks/$Reference";  // `$Reference` interactivity hook
import { $State }        from "./Hooks/$State";      // `$State`     interactivity hook
import { isEqual } from "./Utilities/isEqual";

/**
 * Viridian Frontend Library
 */
export {
	/**
 	* Render a fiber in a DOM container.
 	* @param fiber Input Fiber
 	* @param container Hosting DOM Container
 	*/
	render,

	/**
 	* Create and return a new Viridian Fiber element of the given type
 	* @param type a `string` that specifies the type of the DOM node we want to create, it’s the `tagName` you pass to `document.createElement(_)` when you want to create an HTML element.
 	* @param props The keys and values from the attributes. It also contains the property: `children`.
 	* @param children Element Content
 	* @returns Viridian Fiber of the given type
 	*/
	createElement,
	
	/** Hook that allows you to persist values between renders. 
	 * 
	 * It can be used to store a mutable value that does not cause a re-render when updated. 
	 * It can be used to access a DOM element directly. */
	$Reference,
	
	/** Hook that allows you to have state variables in functional components.
     *
	 * You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state),
	 * and another function to update this value. */
	$State,

	/** Hook that lets your component do something after rendering.
 	 * 
 	 * Viridian will store the callback function you passed (the “effect”), 
 	 * and call it later after performing the DOM updates. */
	$Effect,

	/** Hook that returns a memoized value.
 	 * 
	 * `$Memoize` caches return values so that they do not need to be recalculated. */
	$Memoize,

	/** Hook that returns a memoized callback function.
	 * 
	 * This will return a memoized version of the callback that only changes if one its dependencies have changed. */
	$Callback,
};