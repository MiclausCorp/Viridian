//
//  FiberDOM/Fiber.ts
//  Viridian Fiber Tree node type
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
import { VRContainer } from "./VRContainer"; // Viridian DOM Container

/**
 * Viridian Fiber node type
 */
export type VRFiber = {
    /** Fiber type. Can be a function thanks to Viridian Function Components */
    // eslint-disable-next-line @typescript-eslint/ban-types
    type?: VRFiberType | Function,

    /** Fiber Props */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: any;

    /** Hosting Container */
    dom?: VRContainer;
    
    /** Parent Fiber */
    parent?: VRFiber;

    /** Sibling Fiber */
    sibling?: VRFiber;

    /** Child Fiber */
    child?: VRFiber;

    /** Fiber Update Effect tag */
    effectTag?: VRFiberEffectTag;

    /** A link to the old fiber, that was committed to the DOM in the previous commit phase. */
    alternate?: VRFiber;

    /** Interactivity Hooks */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hooks?: Array<any>
};

/**
 * Viridian Fiber Type enumeration
 */
export enum VRFiberType {
    /** Text element */
    textElement = "_"
}

/**
 * Viridian Fiber Effect tags
 */
export enum VRFiberEffectTag {
    /** Element needs to be deleted. */
    delete = "DELETE",

    /** Element needs a new DOM node. */
    place  = "PLACE",

    /** Element needs to be updated. */
    update = "UPDATE",
}

/**
 * Value that can either be a Viridian Fiber, null or undefined. (a.k.a. an Optional value)
 */
export type OptionalVRFiber = VRFiber | null | undefined;

/**
 * Provides ability to put a <Fragment> root
 * node on JSX. Simply returns the children
 * objects.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fragment(props: any) {
	return props.children;
}