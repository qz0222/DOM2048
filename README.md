# DOM2048

## Summary
Inspired by jQuery, DOM2048 is a small JavaScript library that makes HTML elements easier to handle and manipulate, which works with a variety of different browsers. Includes the basic features of jQuery.

## Demo
See a demo of Game 2048 built using DOM2048 library [here][link]
[link]: http://dom2048.herokuapp.com/


## Public API

* `$l(selector)` - creates a new DOMNodeCollection or adds callback to be called on DOM ready
  * `$l.extend(root,[object]...[object])` - merges one or more objects into the root object
  * `$l.ajax([options])` - creates an asynchronous XMLHttpRequest
* `DOMNodeCollection.prototype`
  * `addClass(className)` - adds a class to each DOM element
  * `append(children)` - adds children elements to DOM elements
  * `attr(attrName, value)` - sets attribute to value for DOM elements.
  * `children()` - gets children of DOM elements, and returns new DOMNodeCollection
  * `each()` - iterates through the DOM elements in the DOMNodeCollection
  * `empty()` - set DOM elements to empty strings
  * `equal(index)` - finds DOM element by index in DOMNodeCollection, and returns a new DOMNodeCollection
  * `filter(selector)` - finds DOM elements that match on string selector, and returns new DOMNodeCollection
  * `find(selector)` - finds DOM elements by selector, and returns new a  DOMNodeCollection
  * `on(eventName, callback)` - adds event listener to DOM elements for a  particular event
  * `off(eventName, callback)` - removes event listener from DOM elements for particular event
  * `parent()` - gets parent of DOM elements, and returns new a  DOMNodeCollection
  * `remove()` - removes DOM elements from the DOMNodeCollection
  * `removeClass(className)` - removes class from DOM elements
  * `css(properties)` - setting properties of elements
