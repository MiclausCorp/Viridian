# Viridian VirtualDOM Engine

Here's where the source code for the Viridian VirtualDOM Engine reconciliation engine can be found.

## What's a **virtual DOM**?
The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as Viridian. This process is called reconciliation.

## Why would we use a virtual DOM?
Because it solves the problem that DOM manipulations are really heavy and slow. 
This way computing simple JS Objects in memory is really much faster that manipulated DOM objects for every transformations.

## Existing VDOM implementations
VDOM is more a concept or a technique than a spec. It exists approaches and multiple opinionated implementations of such a thing:
- [Vue.js](https://vuejs.org/) uses a fork of [snabbdom](https://github.com/snabbdom/snabbdom)
- [Cycle.js](https://cycle.js.org/) uses [snabbdom](https://github.com/snabbdom/snabbdom)
- [React](https://reactjs.org/) uses its own internal implementation.

* [AngularJS](https://angularjs.org/) & [Svelte](https://svelte.dev/) don't use a virtual DOM per se, that's why they're not listed here.