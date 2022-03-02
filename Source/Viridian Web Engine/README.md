# Viridian Web Engine

Here's where the source code for the Viridian Templating Processor and Reconciliation Engine can be found.

## What's a **template**?
Templates are a way of binding interactive data to HTML objects.

For example, here's a template which you may see when logging in on a website.

* Template in **Vue.js**
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

* Template in **Angular**
(It uses the same syntax as Vue.js)
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

* Template in **React**
(Templating in React is made using an syntax extension of JavaScript called [**JSX**](https://reactjs.org/docs/introducing-jsx.html))
```javascript
const Component = ({ firstName, lastName }) => (
  <span>
    Hello {firstName} {lastName}
  </span>
);
```

There is no "de facto" way of dealing with templates and template engines. Every framework implements its own system. But the interesting thing is that they all use [declarative programming](https://stackoverflow.com/questions/129628/what-is-declarative-programming).

## What's a **virtual DOM**?
The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual” representation of the DOM is kept in memory and synced with the “real” DOM by a library such as [snabbdom](https://github.com/snabbdom/snabbdom). This process is called reconciliation.

## Why would we use a virtual DOM?
Because it solves the problem that DOM manipulations are really heavy and slow. Computing simple `Objects` in memory is much faster than manipulating DOM objects for every transformation.

## Existing VDOM implementations
A virtual DOM is more of a concept / technique rather than a spec. There exist multiple approaches and opinionated implementations of such a thing:
- [Vue.js](https://vuejs.org/) uses a fork of [snabbdom](https://github.com/snabbdom/snabbdom)
- [Cycle.js](https://cycle.js.org/) uses [snabbdom](https://github.com/snabbdom/snabbdom)
- [React](https://reactjs.org/) uses its own internal implementation.

* Notice: [AngularJS](https://angularjs.org/) & [Svelte](https://svelte.dev/) don't use a virtual DOM.