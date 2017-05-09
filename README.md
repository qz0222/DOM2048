# DOMini

## Summary
Inspired by jQuery, DOMini is a small JavaScript library that makes HTML elements easier to handle and manipulate, which works with a variety of different browsers. Includes the basic features of jQuery.

## Demo
See a demo of Game 2048 built using DOMini library [here](http://dom2048.herokuapp.com/)


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

## Future update

* write `animate` function

# Game 2048 using DOMini

## Setup Game options
```
$l.startGame=(option)=>{
  var state=[];
  var defaultOption = {
  		animateTime:300,
  		width:4,
  		height:4,
  		style:{
  			background_color:"rgb(184,175,158)",
  			block_background_color:"rgb(204,192,178)",
  			padding:18,
  			block_size:100,
  			block_style:{
  			"font-family":"sans-serif",
  			"font-weight":"bold",
  			"text-align":"center"
  			}
  		},

  		blocks:[
  		{level:0,value:2,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:1,value:4,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:2,value:8,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:3,value:16,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:4,value:32,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:5,value:64,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:6,value:128,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:7,value:256,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:8,value:512,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:9,value:1024,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}},
  		{level:10,value:2048,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}},
  		{level:11,value:4096,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}}

  		]
  };
  option = $l.extend({},defaultOption,option);
```

## Build background
```
$this=$l('.game');

$this.css({
    "background-color":option.style.background_color,
    "border-radius":option.style.padding,
    "position":"relative",
    "-webkit-user-select":"none",
});

var getPosition = function(x,y){
    return ({
  "top":option.style.padding+y*(option.style.block_size+option.style.padding),
  "left":option.style.padding+x*(option.style.block_size+option.style.padding)
});};

var buildBackground = function(){
  var backgrounds=[];
  for(var x=0;x<option.width;x++){
    for(var y=0;y<option.height;y++)
    {
      state.push(null);
      var bg_block=$l(document.createElement("div"));
      var position=getPosition(x,y);
      bg_block.css({
        "width":(option.style.block_size+'px'),
        "height":(option.style.block_size+'px'),
        "background-color":option.style.block_background_color,
        "position":"absolute",
        "top":(position.top+'px'),
        "left":(position.left+'px')
      });


      $this.append(bg_block);
    }
  }

  $this.css({'width':`${(option.style.padding+option.style.block_size)*option.width+option.style.padding}px`});
  $this.css({'height':`${(option.style.padding+option.style.block_size)*option.height+option.style.padding}px`});
};
```

## Build blocks

### helper functions

```
var getEmptyBlockIndexs = function(x,y){
  var emptyBlockIndexs = [];
  (state).forEach((o,i)=>{
    if(o === null) emptyBlockIndexs.push(i);
  });
  return emptyBlockIndexs;
};

var getCoordinate=function(putIndex){
  return {
    x:putIndex % option.width,
    y:Math.floor(putIndex / option.width)
  };
};
var getIndex=function(x,y){
  return x+y*option.width;
};
```

### buildBlock Function
```
var buildBlock = function(level,x,y){
  var emptyBlockIndexs = getEmptyBlockIndexs();
  if(emptyBlockIndexs.length === 0) return false;
  //generate random blocks
  var putIndex;
  if(x!==undefined && y!==undefined){
    putIndex = getIndex(x,y);
  }
  else{
  putIndex = emptyBlockIndexs[Math.floor(Math.random()*emptyBlockIndexs.length)];
  }
  var block;
  if(level !== undefined){

    block=$l.extend({},option.blocks[level]);
  }
  else{
    block=Math.random()>=0.5?option.blocks[0]:option.blocks[1];
  }
  //get coordinates
  var coordinate = getCoordinate(putIndex);

      var position = getPosition(coordinate.x,coordinate.y);


  var blockDom=$l(document.createElement("div"));

  blockDom.addClass("block_"+coordinate.x+"_"+coordinate.y);

  blockDom.css(option.style.block_style);
  blockDom.css({
    "position":"absolute",
    "top":(position.top+25+'px'),
    "left":(position.left+25+'px'),
    "width":0,
    "height":0,
  });
  blockDom.css(block.style);

  blockDom.html(block.value);
  $this.append(blockDom);
  state[putIndex] = block;

  return true;
};
var getBlock=function(x,y){
  return state[getIndex(x,y)];
};
```
