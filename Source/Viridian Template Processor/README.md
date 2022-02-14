# Viridian Template Processor

Here's where the source code for the Viridian Template Processor templating engine can be found.

## What's a **template**?
templates are a way to display information on the user's browser. It aims to describe what we want to show.

For example, the following templates of the different existing frameworks aim to say Hello to somebody. It's easy to read and informative.

There is no "way to go" while dealing with templates and template engines. Every framework implements its own system. But the interesting thing is that they all use a superset of HTML [declarative programming](https://stackoverflow.com/questions/129628/what-is-declarative-programming).

### Template in **Vue.js**
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

### Template in **Angular**
It's the same syntax as Vue.js:
```html
<template>
	<span>Hello {{firstname}} {{lastName}}</span>
<template>
```

### Template in **React**
Templating in React is made using an extension of JavaScript called **JSX** to display information.
```javascript
const Component = ({ firstName, lastName }) => (
  <span>
    Hello {firstName} {lastName}
  </span>
);
```