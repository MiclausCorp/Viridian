//
//  Hooks/$reference.ts
//  $reference Hook implementation
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
// @ts-nocheck
import { engineState } from "../FiberDOM/Engine";

/** Hook that allows you to persist values between renders. 
 * 
 * It can be used to store a mutable value that does not cause a re-render when updated. 
 * It can be used to access a DOM element directly. */
export function $reference<T>(initial: T): { current: T } {
	// Get the old hook
	const oldHook =
      engineState.workInProgressFiber?.alternate &&
      engineState.workInProgressFiber?.alternate.hooks &&
      engineState.workInProgressFiber?.alternate.hooks[engineState.hookIndex];
  
	// Build the hook
	const hook = {
		value: oldHook ? oldHook.value : { current: initial }
	};
  
	// Push the hook to the WIP fiber
	engineState.workInProgressFiber.hooks.push(hook);

	// Bump the hook index
	engineState.hookIndex++;
  
	// And return
	return hook.value;
}