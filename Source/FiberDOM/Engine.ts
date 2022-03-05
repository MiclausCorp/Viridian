//
//  FiberDOM/Engine.ts
//  Viridian FiberDOM Reconciliation Engine
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
import { VRContainer } from "./VRContainer";                                         // Viridian DOM Container
import { isEvent, isGone, isNew, isProperty } from "./Keys";                         // Filter Keys
import { OptionalVRFiber, VRFiber, VRFiberType, VRFiberEffectTag } from "./VRFiber"; // Viridian FiberDOM VRFiber


/* Runtime Data */
let nextUnitOfWork:     OptionalVRFiber       = null; // Upcoming Fiber
let workInProgressRoot: OptionalVRFiber       = null; // WIP Fiber Tree Root
let currentRoot:        OptionalVRFiber 	  = null; // Current Fiber Tree root
let deletions:  	 	VRFiber[] | null      = null; // Fibers to be deleted

/* Implementation */
// Set Idle Callback on `workLoop(_)`
requestIdleCallback(workLoop);

/**
 * Main Engine Work Loop
 * @param deadline Rendering Deadline
 */
function workLoop(deadline: IdleDeadline): void {
	// Should yield work
	let shouldYield = false;

	// While we have to work on a fiber and we shouldn't yield
	while (nextUnitOfWork && !shouldYield) {
		// Perform the work
		nextUnitOfWork = performUnitOfWork(
			nextUnitOfWork
		);

		// Set should yield if Deadline is less than 1
		shouldYield = deadline.timeRemaining() < 1;
	}

	// Once we finish all the work 
	// (we know it because there isn’t a next unit of work) 
	// we commit the whole fiber tree to the DOM.
	if (!nextUnitOfWork && workInProgressRoot) {
		// Commit the tree root to the DOM
		commitRoot();
	}

	// Set Idle Callback on `workLoop(_)`
	requestIdleCallback(workLoop);
}

/**
 * Perform Unit of Work on a fiber
 * @param fiber Input Fiber
 * @returns Viridian Fiber
 */
function performUnitOfWork(fiber: VRFiber): VRFiber {
	/* Abstract:
	 * One of the goals of the fiber data structure is to make it easy to find the next unit 
 	 * of work. That’s why each fiber has a link to its first child, its next sibling and 
 	 * its parent. When we finish performing work on a fiber, if it has a child that fiber will 
 	 * be the next unit of work. If the fiber doesn’t have a child, we use the sibling 
	 * as the next unit of work. And if the fiber doesn’t have a child nor a sibling 
 	 * we go to the “uncle”: the sibling of the parent. Also, if the parent doesn’t 
 	 * have a sibling, we keep going up through the parents until we find one with a 
 	 * sibling or until we reach the root. If we have reached the root, it means we
 	 * have finished performing all the work for this render.
 	 */

	// First, we create a new node and append it to the DOM.
	if (!fiber.dom) {
		fiber.dom = createFiberTree(fiber);
	}

	// Then for each child we create a new fiber.
	const elements = fiber.props.children;
	reconcileChildren(fiber, elements);

	// If it has a child fiber
	if (fiber.child) {
		// Return it
		return fiber.child;
	}

	// Set the next fiber
	let nextFiber = fiber;

	// While the next fiber isn't the root
	while (nextFiber) {
		// If it has a sibling
		if (nextFiber.sibling) {
			// return it
			return nextFiber.sibling;
		}
		// Set it as its parent
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		nextFiber = nextFiber.parent!;
	}

	// Outermost return
	return nextFiber;
}

/**
 * Reconcile the old fibers with the new elements.
 * @param workInProgressFiber Current Fiber
 * @param elements Fiber Elements
 */
function reconcileChildren(workInProgressFiber: VRFiber, elements: Array<VRFiber>): void {
	/* Abstract:
 	* Here we will reconcile the old fibers with the new elements. Note that this
 	* is where we update the child and sibling properties on the fiber, preventing
 	* the workloop from ending prematurely. 
 	*/
	let index = 0;
	let previousFiber = workInProgressFiber.alternate && workInProgressFiber.alternate.child;

	let previousSibling: OptionalVRFiber = null;

	// Iterate over the children of the old fiber (wipFiber.alternate) and the array of elements we want to reconcile.
	while (index < elements.length || previousFiber != null) {
		const element = elements[index];
		let newFiber: OptionalVRFiber = null;
		
		// Compare Previous fiber to element
		const sameType = previousFiber && element && element.type == previousFiber.type;
	
		// Compare them to see if there’s any change we need to apply to the DOM.
		// If the old fiber and the new element have the same type,
		// we can keep the DOM node and just update it with the new props.
		if (sameType) {
			// Update the node by keeping the same dom node and just updating with the new props.
			newFiber = {                                              // Fiber:
				type: previousFiber ? previousFiber.type : undefined, // Fiber type
				props: element.props,                                 // Fiber props
				dom: previousFiber ? previousFiber.dom : undefined,   // Fiber DOM
				parent: workInProgressFiber,                          // Fiber Parent
				alternate: previousFiber,                             // Fiber Previous fiber
				effectTag: VRFiberEffectTag.update,                   // Fiber Effect Tab
			};
		}
        
		// If the type is different and there is a new element, 
		// it means we need to create a new DOM node.
		if (element && !sameType) {
			// Insert a new node
			newFiber = {                            // Fiber:
				type: element.type,                 // Fiber type
				props: element.props,               // Fiber props
				dom: null,                          // Fiber DOM
				parent: workInProgressFiber,        // Fiber Root
				alternate: null,                    // Fiber Previous fiber
				effectTag: VRFiberEffectTag.place,  // Fiber Effect tag
			};
		}

		// If the types are different and there is an old fiber, we need to remove the old node
		if (previousFiber && !sameType) {
			// Delete the old node
			// Add deletion tag
			previousFiber.effectTag = VRFiberEffectTag.delete;

			// Push it to deletions.
			deletions?.push(previousFiber);
		}

		// If we have an old fiber
		if (previousFiber) {
			// Set it to its sibling.
			previousFiber = previousFiber.sibling;
		}

		// If we're at 0
		if (index === 0) {
			// set the new Fiber as the WIP fiber's child
			workInProgressFiber.child = newFiber;
		
		// Otherwise if we have an element and old sibling
		} else if (element && previousSibling) {
			// Set the new fiber as the old sibling's sibling.
			previousSibling.sibling = newFiber;
		}

		// Set the previous sibling as the new fiber
		previousSibling = newFiber;
		
		// And bump the count.
		index++;
	}
}

/**
 * Render a fiber in a DOM container.
 * @param fiber Input Fiber
 * @param container Hosting DOM Container
 */
export function render(fiber: VRFiber, container: VRContainer): void {
	// Unwrap the container
	if (container !== null) {
		workInProgressRoot = {
		// Set nextUnitOfWork to the root of the fiber tree.
			dom: container,
			props: {
				children: [fiber]
			},
			alternate: currentRoot
		},
		deletions = [];

		// We’ll keep track of the root of the fiber tree. 
		nextUnitOfWork = workInProgressRoot;
	}
}

/**
 * Update DOM container with new fiber props
 * @param dom DOM Container
 * @param previousProps Old (alternate) Fiber props
 * @param nextProps New Fiber props
 */
function updateDom(dom: VRContainer, previousProps: VRFiber["props"], nextProps: VRFiber["props"]) {
	/* Abstract: 
	 * Compare the props from the old fiber to the props of the new fiber, 
	 * remove the props that are gone, and set the props that are new or changed.
	 */

	// Remove old or changed event listeners
	Object.keys(previousProps)
		.filter(isEvent)
		.filter(key => !(key in nextProps) || isNew(previousProps, nextProps)(key))
		.forEach(name => { 
			// Event types usally begin with "on_"
			const eventType = name
				.toLowerCase() // Lower case the name
				.substring(2); // Get the first two characters
			
			// Remove the old event listener
			dom?.removeEventListener(
				eventType,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				/* @ts-ignore */
				previousProps[name]
			);
		});


	// Remove old properties
	Object.keys(previousProps)
		.filter(isProperty)
		.filter(isGone(previousProps, nextProps))
		.forEach(name => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/* @ts-ignore */
			dom[name] = "";
		});
  
	// Set new or changed properties
	Object.keys(nextProps)
		.filter(isProperty)
		.filter(isNew(previousProps, nextProps))
		.forEach(name => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/* @ts-ignore */
			dom[name] = nextProps[name];
		});

	// Add event listeners
	Object.keys(nextProps)
		.filter(isEvent)
		.filter(isNew(previousProps, nextProps))
		.forEach(name => {
			const eventType = name.toLowerCase().substring(2);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/* @ts-ignore */
			dom.addEventListener(eventType, nextProps[name]);
		});
  
}

/**
 * Create a Fiber Tree from viridian elements
 * @param fiber Viridian Element
 * @returns (virtual) DOM Representation
 */
export function createFiberTree(fiber: VRFiber): VRContainer {
	// Create Fiber Tree
	// If the element type is `_` we create a text fiber instead of a regular fiber.
	const dom = fiber.type === VRFiberType.textElement 
		? document.createTextNode("")
		: document.createElement(fiber.type ? fiber.type : "div");

	// Assign the element props to the node.
	updateDom(dom, {children: []}, fiber.props);
	return dom;
}

/**
 * Commit input Fiber to the Fiber Tree
 * @param fiber Input Fiber
 */
function commitWork(fiber: OptionalVRFiber): void {
	// If we get no input
	if (!fiber) {
		// Exit
		return;
	}

	// Get the DOM Parent
	const domParent = fiber.parent?.dom;

	/* Fiber Effects */
	// If the fiber has a "PLACE" tag we need to append the DOM node to the node from the parent fiber.
	if (fiber.effectTag === VRFiberEffectTag.place && fiber.dom != null) {
		// Append the DOM node to the node from the parent fiber.
		domParent?.appendChild(fiber.dom);

	// If the fiber has a "DELETE" tag we do the opposite and remove the child.
	} else if (fiber.effectTag === VRFiberEffectTag.delete && fiber.dom != null) {
		if (domParent) { 
			// Remove the fiber
			commitDeletion(domParent, fiber); 
		}

	// If the fiber has a "UPDATE" tag we update the existing DOM node with the props that changed.
	} else if (fiber.effectTag === VRFiberEffectTag.update && fiber.dom != null) {
		if (fiber.alternate?.props) {
			// Update the existing DOM node with the props that changed.
			updateDom(fiber.dom, fiber.alternate.props, fiber.props);
		}
	}  
	
	// If the fiber has a child
	if (fiber.child) {
		// Commit the child.
		commitWork(fiber.child);
	}

	// If the fiber has a sibling
	if (fiber.sibling) {
		// Commit the sibling.
		commitWork(fiber.sibling);
	}
}

/**
 * Commit Fiber tree to the DOM.
 */
function commitRoot(): void {
	// Commit deletions
	deletions?.forEach(commitWork);

	// Commit the Fiber tree
	commitWork(workInProgressRoot?.child);

	// So we need to save a reference to that “last fiber tree we committed to the DOM”
	currentRoot = workInProgressRoot;

	// Remove WIP DOM
	workInProgressRoot = null;
}


/**
 * Delete Fiber from DOM Container
 * @param container DOM Container
 * @param fiber Fiber to delete
 */
function commitDeletion(container: VRContainer, fiber: VRFiber): void {
	// If we have a fiber and it has a container
	if (fiber && fiber.dom) {
		// Remove the fiber's dom from the hosting container
		container?.removeChild(fiber.dom);

	// Otherwise if we have a fiber but it has a child
	} else if (fiber && fiber.child) {
		// Recursively delete its child from the hosting container. 
		commitDeletion(container, fiber.child);
	}
}