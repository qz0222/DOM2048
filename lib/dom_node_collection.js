class DOMNodeCollection {
  constructor(array) {
    this.htmlArray = array;
  }

  html(string) {
    if (string === undefined) {
      return this.htmlArray[0].innerHTML;
    } else {
      this.htmlArray.forEach (function(htmlElement) {
        htmlElement.innerHTML = string;
      });
    }
  }

  empty(){
    this.html("");
  }

  isaDOM(inputObj) {
    return (inputObj instanceof DOMNodeCollection);
  }

  append(inputObj){
    if (this.htmlArray.length === 0) return;

    if (typeof inputObj === 'object' &&
        !(inputObj instanceof DOMNodeCollection)) {
      // ensure argument is coerced into DOMNodeCollection
      inputObj = $l(inputObj);
    }

    this.htmlArray.forEach ((htmlElement)=> {
      if (typeof inputObj === "string") {
        htmlElement.innerHTML += inputObj;
      } else if (inputObj instanceof DOMNodeCollection) {
        inputObj.htmlArray.forEach((inputElement)=> {
          htmlElement.appendChild(inputElement.cloneNode(true));
        });
      }
    });
  }

  attr(key,val){
    if ( val === undefined ){
      return this.htmlArray[0].getAttribute(key);
    } else {
      this.htmlArray.forEach (function(htmlElement) {
        htmlElement.setAttribute(key, val);
      });
    }
  }

  addClass(classname){
    this.htmlArray.forEach (function(htmlElement) {
      let currentClassName = htmlElement.className;
      if ( currentClassName==="" ){
        htmlElement.className = classname;
      } else {
        if (currentClassName.includes(classname) === false){
          htmlElement.className += (' '+classname);
        }
      }
    });
  }

  removeClass(classname){
    this.htmlArray.forEach (function(htmlElement) {
      htmlElement.className = htmlElement.className.replace((" " + classname), "");
      htmlElement.className = htmlElement.className.replace((classname+" "), "");
      htmlElement.className = htmlElement.className.replace((classname), "");
    });
  }

  children(){
    let allChildren = [];
    this.htmlArray.forEach (function(htmlElement) {
      htmlElement.childNodes.forEach ( function(childnode){
        if (childnode.nodeType === 1){ allChildren.push(childnode); }
      });
    });
    return allChildren;
  }

  parent(){
    let allParents = [];
    this.htmlArray.forEach (function(htmlElement) {
      if (!allParents.includes(htmlElement.parentNode)){
        allParents.push(htmlElement.parentNode);
      }
    });
    return allParents;
  }

  find(selector) {
    let result = [];
    this.htmlArray.forEach (function(htmlElement){
      let finded = htmlElement.querySelectorAll(selector);
      if (finded.length > 0){
        result = result.concat(Array.from(finded));
      }
    });
    return result;
  }

  remove(){
    this.htmlArray.forEach (function(htmlElement){
      htmlElement.parentNode.removeChild(htmlElement);
    });
    this.htmlArray = [];
  }

  on(eventName, callback) {
    this.htmlArray.forEach (function(htmlElement){
      const eventKey = `Events-${eventName}`;
      if (typeof htmlElement[eventKey] === 'undefined'){
        htmlElement[eventKey] = [];
      }
      htmlElement[eventKey].push(callback);
      htmlElement.addEventListener(eventName, callback);
    });
  }

  off(eventName) {
    this.htmlArray.forEach (function(htmlElement){
      const eventKey = `Events-${eventName}`;
      if(htmlElement[eventKey]){
        htmlElement[eventKey].forEach(function(callback){
          htmlElement.removeEventListener(eventName, callback);
        });
      }
    });
  }

  // css(cssText) {
  //   this.htmlArray.forEach (function(htmlElement){
  //     htmlElement.style.cssText=cssText;
  //   });
  // }

  css(cssHash) {
    const cssKeys=Object.keys(cssHash);
    this.htmlArray.forEach (function(htmlElement){
      cssKeys.forEach (function(key){
        htmlElement.style[key]=cssHash[key];
      });
    });
  }
}

module.exports = DOMNodeCollection;
