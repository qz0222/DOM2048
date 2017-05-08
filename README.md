# DOM2048

## Summary
Inspired by jQuery, DOM2048 is a small JavaScript library that makes HTML elements easier to handle and manipulate, which works with a variety of different browsers. Includes the basic features of jQuery.

## Demo
See a demo of Game 2048 built using DOM2048 library [here](http://dom2048.herokuapp.com/)


## Public API

* `$l(selector)` - creates a new DOMNodeCollection or adds callback to be called on DOM ready
  * `$l.extend(root,[object]...[object])` - merges one or more objects into the root object
  * `$l.ajax([options])` - creates an asynchronous XMLHttpRequest
* `DOMNodeCollection.prototype`
  * `html(string)` - If it receives an argument, this will become the innerHTML of the each of the DOM element. If it does not receive an argument, it will return the innerHTML of the first DOM element in the array.
  * `empty()` - set DOM elements to empty strings
  * `append(children)` - adds children elements to DOM elements
  * `attr(attrName, value)` - sets attribute to value for DOM elements.
  * `addClass(className)` - adds a class to each DOM element
  * `removeClass(className)` - removes class from DOM elements
  * `children()` - gets children of DOM elements, and returns new DOMNodeCollection
  * `parent()` - gets parent of DOM elements, and returns new a  DOMNodeCollection
  * `find(selector)` - finds DOM elements by selector, and returns new a  DOMNodeCollection
  * `remove()` - removes DOM elements from the DOMNodeCollection
  * `on(eventName, callback)` - adds event listener to DOM elements for a  particular event
  * `off(eventName, callback)` - removes event listener from DOM elements for particular event
  * `css(properties)` - setting properties of elements
