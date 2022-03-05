# FiberDOM
A Lightweight DOM Reconciliation Engine

## What is FiberDOM?
FiberDOM is a lightweight stack reconciler that can incrementally generate DOM elements *(Fibers)* in a virtual DOM
tree-like structure. *(Fiber Tree)*

FiberDOM supports concurrency, which allows you to divide the work into multiple chunks and divide the rendering work over multiple frames, and can perform work while idling.

## What is a Fiber?
A fiber (`VRFiber`) is a simple object that represents a DOM element, and is organized in a tree-like structure.

## How does it work internally?
Take this example:

<img width="350" alt="Fiber Tree" src="https://user-images.githubusercontent.com/70854359/156885898-9d684b12-95ad-4dbd-8b37-c6441eed56b5.png">

In the rendering phase, we’ll create the root fiber and set it as the next unit of work. The rest of the work will happen on a separate thread, where we will do three things for each fiber:
1. Add the element to the DOM
2. Create the fibers for the element’s children
3. Select the next unit of work

One of the goals of FiberDOM is to make it easy to find the next unit of work. That’s why each fiber has a link to its first child, its next sibling, and its parent.

When we finish performing work on a fiber, if it has a child, that fiber will be the next unit of work. *(From our example, when we finish working on the `<div>` fiber the next unit of work will be the `<h1>` fiber.)*

If the fiber doesn’t have a child, we use the sibling as the next unit of work. *(For example, the `<p>` fiber doesn’t have a child, so we move to the `<a>` fiber after finishing it.)*

And If the fiber doesn’t have a child, nor a sibling, we go to the “uncle”: the sibling of the parent. Like `<a>` and `<h2>` fibers from the example. If the parent doesn’t have a sibling, we keep going up through the parents until we find one with a sibling or until we reach the root. If we have reached the root, it means we have finished performing all the work for this render.