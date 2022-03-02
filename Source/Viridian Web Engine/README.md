# Viridian Web Engine

Here's where the source code for the Viridian Templating Processor and Reconciliation Engine can be found.

## What's a **template**?
templates are a way to display information on the user's browser. It aims to describe what we want to show.

For example, the following templates of the different existing frameworks aim to say Hello to somebody. It's easy to read and informative.

There is no "way to go" while dealing with templates and template engines. Every framework implements its own system. But the interesting thing is that they all use a superset of HTML [declarative programming](https://stackoverflow.com/questions/129628/what-is-declarative-programming).

* Template in **Vue.js**
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

* Template in **Angular**
It's the same syntax as Vue.js:
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

* Template in **React**
Templating in React is made using an extension of JavaScript called **JSX** to display information.
```javascript
const Component = ({ firstName, lastName }) => (
  <span>
    Hello {firstName} {lastName}
  </span>
);
```

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