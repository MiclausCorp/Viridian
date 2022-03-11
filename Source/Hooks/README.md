# Viridian FiberDOM Interactivity Hooks

Here's where the source code for the Viridian FiberDOM hook interactivity extension can be found.

## What is a hook?
Hooks allow you to get interactive components without writing a class. Hooks are the functions which "hook into" FiberDOM state and lifecycle features from function components.

## $State
`$State` is an Interactivity Hook that allows you to have state variables in functional components.

You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state), and another function to update this value.

**Example**:
```js
function Component() {
  const [state, setState] = Viridian.$State(1);

  // Create Viridian element
  return Viridian.createElement(
      onClick: () => {                                                                  
        setState(function (c) {                                                         
          return c += 1;                                                                
        });                                                                             
      }                                                      
    },
    `Count: ${state}`,                                                                  
  );
}

var element = Viridian.createElement(Component, null);

Viridian.render(element, container);
```

## $Reference
`$Reference` is an Interactivity Hook that allows you to persist values between renders.


It can be used to store a mutable value that does not cause a re-render when updated. It can also be used to access a DOM element directly.

**Example**
```js
function MyComponent() {
  const reference = Viridian.$Reference(value);
  
  const someHandler = () => {
    // Access reference value:
    const value = reference.current;
    
    // Update reference value:
    reference.current = newValue;
  };
}
```

## $Effect
`$Effect` is an Interactivity Hook that lets your component do something after rendering.

**Viridian FiberDOM** will store the callback function you passed (the “effect”), and call it later after performing the DOM updates.

**Example**
```js
function MyComponent() {
  const effect = Viridian.$Effect(() => {
    const foo = props.doSomething();

    return () => {
      foo.bar();
    };
  });
}
```

## $Memoize
`$Memoize` is an Interactivity Hook that returns a memoized value.

It caches return values so that they do not need to be recalculated.
**Example**
```js
function MyComponent() {
  // Compute expensive value
  const memoizedValue = Viridian.$Memoize(() => computeExpensiveValue(a, b), [a, b]);
}
```

## $Callback
`$Callback` is an Interactivity Hook that returns a memoized callback function.

This will return a memoized version of the callback that only changes if one its dependencies have changed.

**Example**
```js
function MyComponent() {
  const memoizedCallback = Viridian.$Callback(() => {
    doSomething(a, b);
  }, [a, b]);
}
```