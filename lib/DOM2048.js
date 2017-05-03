/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__(0);

const _docReadyCallbacks = [];
let _docReady = false;

Window.prototype.$l = function (arg){
  switch (typeof(arg)) {
    case 'function':
      return registerDocReadyCallback(arg);
    case 'string':
      let nodeList = document.querySelectorAll(arg);
      let nodeArray = Array.from(nodeList);
      return new DOMNodeCollection(nodeArray);
    case 'object':
      if (arg instanceof HTMLElement ) {
        return new DOMNodeCollection([arg]);
      }
      break;
    default:

  }

};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach( obj => {
    for(let prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};




$l.ajax = options => {

  const request = new XMLHttpRequest();


  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {console.log('success');},
    error: () => {console.log('failed');},
    data: {},

  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();


  request.open(options.method, options.url, true);
  request.onload = e => {
    //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};



// helper methods
registerDocReadyCallback = func => {
  if(!_docReady){
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};


document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});


/***/ })
/******/ ]);
