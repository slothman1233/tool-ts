﻿!function a(i,s,u){function c(t,e){if(!s[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(f)return f(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};i[t][0].call(o.exports,function(e){return c(i[t][1][e]||e)},o,o.exports,a,i,s,u)}return s[t].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,n){var r,o;r=this,o=function(e){"use strict";function t(e){return!!e&&"object"==typeof e}function r(e){return t(e)&&"[object Object]"===Object.prototype.toString.call(e)&&e.constructor===Object}var o=function(e){return t(e)?Object.keys(e):[]};function a(t,n){o(t).forEach(function(e){return n(t[e],e)})}function p(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n={};return e.forEach(function(e){e&&a(e,function(e,t){r(e)?(r(n[t])||(n[t]={}),n[t]=p(n[t],e)):n[t]=e})}),n}var i=window,l={ajax:function(e,o,a){var t;if(void 0===e&&(e={}),(t=p({url:"",type:"GET",dataType:"json",async:!0,data:null,headers:{},timeout:1e4,isFromdata:!1,beforeSend:function(e){},complete:function(e,t){}},e)).url&&t.type&&t.data&&t.dataType){var i=new XMLHttpRequest;i.addEventListener("loadstart",function(e){t.beforeSend(i)}),i.addEventListener("load",function(e){var t=i.status;if(200<=t&&t<=300||304===t){var n=void 0;if("text"===i.responseType)n=i.responseText;else if("document"===i.responseType)n=i.responseXML;else if(i.response){n="";try{n="[object String]"===Object.prototype.toString.call(i.response)?JSON.parse(i.response):i.response}catch(e){n=i.response}}else{n="";try{n="[object String]"===Object.prototype.toString.call(i.responseText)?JSON.parse(i.responseText):i.responseText}catch(e){n=i.responseText}}o(n)}else{var r=l.getErrorObj("请求错误","ERR0003",t);a(r)}}),i.addEventListener("loadend",function(e){t.complete(i,i.status)}),i.addEventListener("error",function(e){var t=l.getErrorObj("请求错误","ERR0003",i.status);a(t)}),i.addEventListener("timeout",function(e){var t=l.getErrorObj("请求超时","ERR0002",408);a(t)});var n,r=!1,s=t.type.toUpperCase();"GET"!==s&&"DELETE"!==s||(r=!0,t.url+=l.getUrlParam(t.url,t.data));try{i.open(t.type,t.url,t.async)}catch(e){var u=l.getErrorObj("初始化请求错误","ERR0001",i.status);return void a(u)}if(i.responseType=t.dataType,t.headers)for(var c=0,f=Object.keys(t.headers);c<f.length;c++){var d=f[c];i.setRequestHeader(d,t.headers[d])}t.async&&t.timeout&&(i.timeout=t.timeout),n=t.isFromdata?t.data:r?null:t.headers["Content-Type"]&&0<=t.headers["Content-Type"].indexOf("application/json")?JSON.stringify(t.data):l.getQueryString(t.data),i.send(n)}},getErrorObj:function(e,t,n){return{bodyMessage:null,code:"-1",message:e,subCode:t,status:n}},getUrlParam:function(e,t){if(!t)return"";var n=t instanceof Object?l.getQueryString(t):t;return-1!==e.indexOf("?")?n:"?"+n},getQueryString:function(e){var r=[];return e instanceof Object&&a(e,function(e,t){var n=e;r.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}),r.join("&")},request:function(e){void 0===e&&(e={}),e.beforeSend=(e.beforeSend||function(){}).before(function(e){});var r=e.success;e.success=function(e,t,n){e&&e instanceof Object&&1!==e.code||r&&r(e,t,n)},e.error=(e.error||function(){}).before(function(e,t,n){}),e.complete=(e.complete||function(){}).after(function(e,t){}),l.ajax.before(l.addAuthorizationHeader)(e)},addAuthorizationHeader:function(e){e.headers=e.headers||{};var t="Authorization";Object.keys(e.headers).some(function(e){return e===t})||(e.headers[t]="test")}};Function.prototype.before=function(n){var r=i;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n.apply(i,e),r.apply(i,e)}},Function.prototype.after=function(n){var r=i;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r.apply(i,e),n.apply(i,e)}};function s(e){this.dataType="json",this.data={},this.headers={},this.beforeSend=function(){},this.complete=function(){},this.headers=e.headers,this.type=e.type,this.isFromdata=e.isFromdata||!1}var n={get:function(e){var n=p(new s({headers:{},type:"GET"}),e);return new Promise(function(e,t){l.ajax(n,e,t)})},delete:function(e){var n=p(new s({headers:{},type:"DELETE"}),e);return new Promise(function(e,t){l.ajax(n,e,t)})},post:function(e){var n=p(new s({headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},type:"POST"}),e);return new Promise(function(e,t){l.ajax(n,e,t)})},put:function(e){var n=p(new s({headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","X-HTTP-Method-Override":"put"},type:"POST"}),e);return new Promise(function(e,t){l.ajax(n,e,t)})},postbody:function(e){var n=p(new s({headers:{"Content-Type":"application/json; charset=UTF-8"},type:"POST"}),e);return new Promise(function(e,t){l.ajax(n,e,t)})},fromData:function(e){var n=p(new s({headers:{},type:"POST",isFromdata:!0}),e);return new Promise(function(e,t){l.ajax(n,e,t)})}};e.http=n,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof n&&void 0!==t?o(n):"function"==typeof define&&define.amd?define(["exports"],o):o((r="undefined"!=typeof globalThis?globalThis:r||self).indexjs={})},{}],2:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};n.__esModule=!0,n.login=void 0;var o=r(e("../http"));n.login=function(e){return o.default.post({url:"/login/loginByAccount"})}},{"../http":3}],3:[function(e,t,n){"use strict";n.__esModule=!0;var r=e("@stl/httpRequest");n.default=r.http},{"@stl/httpRequest":1}],4:[function(e,t,n){"use strict";n.__esModule=!0,e("../../common/service/LoginService/LoginService").login({username:"ss",password:"s"})},{"../../common/service/LoginService/LoginService":2}]},{},[4]);