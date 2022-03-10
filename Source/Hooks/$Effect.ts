//
//  Hooks/$Effect.ts
//  $Effect Hook implementation
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
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

/* Include Directive */
import { globalState } from "../FiberDOM/Engine";    // FiberDOM Global State
import { isEqual }     from "../Utilities/isEqual"; // Lodash isequal Alternative

/** Hook that lets your component do something after rendering.
 * 
 * Viridian will store the callback function you passed (the “effect”), 
 * and call it later after performing the DOM updates. */
export function $Effect(callback: () => void, deps: any[]) {
	// Get the old hook
	const oldHook =
        globalState.workInProgressFiber?.alternate &&
        globalState.workInProgressFiber?.alternate.hooks &&
        globalState.workInProgressFiber?.alternate.hooks[globalState.hookIndex];

	// Build the hook
	const hook = {
		deps
	};

	// If we don't have an old hook
	if (!oldHook) {
		// invoke callback if this is the first time
		callback();
	} else {
		// If the deps have changed
		if (!isEqual(oldHook.deps, hook.deps)) {
			// Call the callback
			callback();
		}
	}
	// If the WIP Fiber has hooks
	if (globalState.workInProgressFiber?.hooks) {
		// Push the hook to it
		globalState.workInProgressFiber?.hooks.push(hook);

		// And bump the hook index.
		globalState.hookIndex++;
	}
}