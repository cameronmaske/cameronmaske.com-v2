---
title: ES6 Cheatsheet
date: 2017-01-12
published: true
topic: ES6, JAVASCRIPT
intro: Recently, I've switched to working with ES6. Here I've documented my every growing ES6 personal cheatsheet.
---

This is not intended to be an in an depth guide, but rather a quick reference of the most elegant javascript approaches I've found to dealing with various common scenarios.

## Immutable operations on an array.

### Adding an element.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-adding-element-to-arary?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Removing an element.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-removing-element-from-array?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Immutable operations on an object.

### Adding key/value.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-adding-keyvalue-to-object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Removing a key.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-removing-keyvalue-from-nested-Object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Adding a nested key/value.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-adding-nested-keyvalue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

*Bad*: **Be careful**, directly deleting nested keys doesn't work as you might expect with the spread operation.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-Incorrectly-removing-keyvalue-in-nested-object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Removing a nested key.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Immutable-removing-keyvalue-from-object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Looping over keys of an object.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Looping-over-keys-of-an-Object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Looping over values of an object.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Looping-over-values-of-an-Object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Looping over key/values of an object.

<iframe height="400px" width="100%" src="https://repl.it/@cameronmaske/Looping-over-keys-and-values-on-an-Object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Require's [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). You may need to install [Babel Runtime transform](https://babeljs.io/docs/plugins/transform-runtime/).


## Additional Resources

* [`lodash` documentation](https://lodash.com)
* The [`...` spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
* [Spread syntax vs `Object.assign`](http://stackoverflow.com/questions/32925460/spread-operator-vs-object-assign)
* [Immutable Update Patters](http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
