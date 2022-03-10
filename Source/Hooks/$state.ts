//
//  Hooks/$State.ts
//  $State Hook implementation
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
import { globalState } from "../FiberDOM/Engine"; // FiberDOM Engine

/** Hook that allows you to have state variables in functional components.

You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state),
and another function to update this value. */
export function $State<T>(initial: T): [T, (action: (prevState: T) => T) => void] {
	/* When the function component calls `useState(_)`, we check if we have an old hook. 
	We check in the alternate of the fiber using the hook index. */
	const oldHook =
		globalState.workInProgressFiber?.alternate &&
		globalState.workInProgressFiber?.alternate.hooks &&
		globalState.workInProgressFiber?.alternate.hooks[globalState.hookIndex];
	
	// Current hook
	const hook = {
		state: oldHook ? oldHook.state : initial, // Hook State
		queue: []                     		      // Hook Queue
	};

	// Apply the queued setState actions
	const actions = oldHook ? oldHook.queue : [];
	actions.forEach((action: any) => {
		hook.state = action(hook.state);
	});

	// Function that receives an action
	const setState = (action: any) => {
		hook.queue.push(action as never);
		globalState.workInProgressRoot = {
			dom: globalState.currentRoot.dom,
			props: globalState.currentRoot.props,
			alternate:  globalState.currentRoot,
		};
		globalState.nextUnitOfWork =  globalState.workInProgressRoot;
		globalState.deletions = [];
	};

	// Push the hook to the WIP fiber
	if (globalState.workInProgressFiber?.hooks) {
		globalState.workInProgressFiber.hooks.push(hook);

		// Bump the hook index
		globalState.hookIndex++;
	}

	// And return
	return [hook.state, setState];
}