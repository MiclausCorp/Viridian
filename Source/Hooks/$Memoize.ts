//
//  Hooks/$Memoize.ts
//  $Memoize Hook implementation
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
/* eslint-disable @typescript-eslint/no-explicit-any */

/* Include Directive */
import { globalState } from "../FiberDOM/Engine";    // FiberDOM Global State
import { isEqual }     from "../Utilities/isEqual"; // Lodash isequal Alternative

/** Hook that returns a memoized value.
 * 
 * `$Memoize` caches return values so that they do not need to be recalculated. */
export function $Memoize<T>(compute: () => T, deps: any[]): T {
	// Get the old hook
	const oldHook =
        globalState.workInProgressFiber?.alternate &&
        globalState.workInProgressFiber?.alternate.hooks &&
        globalState.workInProgressFiber?.alternate.hooks[globalState.hookIndex];

	// Build the hook
	const hook = {
		value: null as any,
		deps
	};

	// If we have an old hook
	if (oldHook) {
		// If their deps equal
		if (isEqual(oldHook.deps, hook.deps)) {
			// Set the new hook's value to the old one's
			hook.value = oldHook.value;
		} else {
			// Otherwise compute expensive function
			hook.value = compute();
		}
	} else {
		// Otherwise compute expensive function
		hook.value = compute();
	}

	// If the WIB fiber has hooks
	if (globalState.workInProgressFiber?.hooks) {
		// Push the hook to the WIP fiber
		globalState.workInProgressFiber?.hooks.push(hook);

		// Bump the Hook Index
		globalState.hookIndex++;
	}

	// And return the value
	return hook.value;
}