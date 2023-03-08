//import "regenerator-runtime/runtime.js";

export const cfg = {
	host: "http://localhost"
}
export let doc=document,
    qsa=(s,o=doc)=>o.querySelectorAll(s),
    qs=(s,o=doc)=>o.querySelector(s);

export function loadCSS(n,e,o,d){"use strict";var t=window.document.createElement("link"),i=e||window.document.getElementsByTagName("script")[0],l=window.document.styleSheets;return t.rel="stylesheet",t.href=n,t.media="only x",d&&(t.onload=d),i.parentNode.insertBefore(t,i),t.onloadcssdefined=function(n){for(var e,o=0;o<l.length;o++)l[o].href&&l[o].href===t.href&&(e=!0);e?n():setTimeout(function(){t.onloadcssdefined(n)})},t.onloadcssdefined(function(){t.media=o||"all"}),t}

export function onloadCSS(n,e){
	n.onload=function(){
		n.onload=null,e&&e.call(n)
	},"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(e);
}

export async function xml(action, data, path){
  
  data && (data = JSON.stringify(data))


  return new Promise(resolve => {

		let xhr = new XMLHttpRequest();
		let body = `action=${action}${data ? `&data=`+data : ""}`

		process.env.NODE_ENV == 'production' && (cfg.host = '')
    


		xhr.open("POST", cfg.host + path, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onreadystatechange = function () {

			if (this.readyState != 4) return
			resolve(this.responseText)
		}

		xhr.send(body);
	})
}


export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// https://gist.github.com/ionurboz/51b505ee3281cd713747b4a84d69f434

export function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this 
    //   function several times, but it will only execute once 
    //   [before or after imposing a delay]. 
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments 
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  }
}

export async function load_toast(){

	// https://github.com/joostlawerman/SnackbarLightjs

	// new Snackbar("Hey! Im a snackbar");

	return new Promise(resolve => {
		let script = document.createElement('script')
    let path = ''
    window.location.host == 'ashaev.by' && (path = '/test/')
		script.src = `${path}/vendors/snackbar/snackbarlight.min.js`
		qs('body').appendChild(script)
		script.onload = () => {
			let style = loadCSS(`${path}/vendors/snackbar/snackbarlight.min.css`)
			onloadCSS(style, () => {
				resolve('toast assets loaded')
			})
		}
	})
}


export async function err_mail(obj){

	let body = `action=err_mail&title=${obj.title}&message=${obj.message}`

  return new Promise(resolve => {


    let xhr = new XMLHttpRequest();

    xhr.open("POST", cfg.host + '/api', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {

      if (this.readyState != 4) return

      resolve(JSON.parse(this.responseText))
    }

    xhr.send(body);
  })
}