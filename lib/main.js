let DOMNodeCollection = require('./dom_node_collection.js');

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
