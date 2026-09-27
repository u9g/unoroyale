(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,T=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),E=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},D=/-\w/g,O=E(e=>e.replace(D,e=>e.slice(1).toUpperCase())),ee=/\B([A-Z])/g,k=E(e=>e.replace(ee,`-$1`).toLowerCase()),te=E(e=>e.charAt(0).toUpperCase()+e.slice(1)),ne=E(e=>e?`on${te(e)}`:``),A=(e,t)=>!Object.is(e,t),re=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},j=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ie=e=>{let t=parseFloat(e);return isNaN(t)?e:t},ae=e=>{let t=g(e)?Number(e):NaN;return isNaN(t)?e:t},oe,se=()=>oe||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function M(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?de(r):M(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var ce=/;(?![^(]*\))/g,le=/:([^]+)/,ue=/\/\*[^]*?\*\//g;function de(e){let t={};return e.replace(ue,``).split(ce).forEach(e=>{if(e){let n=e.split(le);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function N(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=N(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var fe=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,pe=e(fe);fe+``;function me(e){return!!e||e===``}function he(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ge(e[r],t[r]);return n}function ge(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?he(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ge(e[n],t[n]))return!1}}return String(e)===String(t)}var _e=e=>!!(e&&e.__v_isRef===!0),P=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?_e(e)?P(e.value):JSON.stringify(e,ve,2):String(e),ve=(e,t)=>_e(t)?ve(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[ye(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ye(e))}:_(t)?ye(t):v(t)&&!d(t)&&!C(t)?String(t):t,ye=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,be,xe=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=be,!e&&be&&(this.index=(be.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=be;try{return be=this,e()}finally{be=t}}}on(){++this._on===1&&(this.prevScope=be,be=this)}off(){this._on>0&&--this._on===0&&(be=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Se(){return be}var F,Ce=new WeakSet,we=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,be&&be.active&&be.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ce.has(this)&&(Ce.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Oe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),je(this);let e=F,t=Le;F=this,Le=!0;try{return this.fn()}finally{Me(this),F=e,Le=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fe(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ce.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ne(this)&&this.run()}get dirty(){return Ne(this)}},Te=0,Ee,De;function Oe(e,t=!1){if(e.flags|=8,t){e.next=De,De=e;return}e.next=Ee,Ee=e}function ke(){Te++}function Ae(){if(--Te>0)return;if(De){let e=De;for(De=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Ee;){let t=Ee;for(Ee=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function je(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Me(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Fe(r),Ie(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ne(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Pe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Pe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ne(e))))return;e.flags|=2;let t=e.dep,n=F,r=Le;F=e,Le=!0;try{je(e);let n=e.fn(e._value);(t.version===0||A(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{F=n,Le=r,Me(e),e.flags&=-3}}function Fe(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Fe(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ie(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Le=!0,Re=[];function ze(){Re.push(Le),Le=!1}function Be(){let e=Re.pop();Le=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=F;F=void 0;try{t()}finally{F=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!F||!Le||F===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==F)t=this.activeLink=new Ue(F,this),F.deps?(t.prevDep=F.depsTail,F.depsTail.nextDep=t,F.depsTail=t):F.deps=F.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=F.depsTail,t.nextDep=void 0,F.depsTail.nextDep=t,F.depsTail=t,F.deps===t&&(F.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){ke();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ae()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function I(e,t,n){if(Le&&F){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(ke(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}Ae()}function Ze(e){let t=L(e);return t===e?t:(I(t,`iterate`,Ye),Lt(e)?t:t.map(Bt))}function Qe(e){return I(e=L(e),`iterate`,Ye),e}function $e(e,t){return It(e)?Vt(Ft(e)?Bt(t):t):Bt(t)}var et={__proto__:null,[Symbol.iterator](){return tt(this,Symbol.iterator,e=>$e(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return tt(this,`entries`,e=>(e[1]=$e(this,e[1]),e))},every(e,t){return rt(this,`every`,e,t,void 0,arguments)},filter(e,t){return rt(this,`filter`,e,t,e=>e.map(e=>$e(this,e)),arguments)},find(e,t){return rt(this,`find`,e,t,e=>$e(this,e),arguments)},findIndex(e,t){return rt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return rt(this,`findLast`,e,t,e=>$e(this,e),arguments)},findLastIndex(e,t){return rt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return rt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return at(this,`includes`,e)},indexOf(...e){return at(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return at(this,`lastIndexOf`,e)},map(e,t){return rt(this,`map`,e,t,void 0,arguments)},pop(){return ot(this,`pop`)},push(...e){return ot(this,`push`,e)},reduce(e,...t){return it(this,`reduce`,e,t)},reduceRight(e,...t){return it(this,`reduceRight`,e,t)},shift(){return ot(this,`shift`)},some(e,t){return rt(this,`some`,e,t,void 0,arguments)},splice(...e){return ot(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return ot(this,`unshift`,e)},values(){return tt(this,`values`,e=>$e(this,e))}};function tt(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!Lt(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var nt=Array.prototype;function rt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!Lt(e),c=o[t];if(c!==nt[t]){let t=c.apply(e,a);return s?Bt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,$e(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function it(e,t,n,r){let i=Qe(e),a=i!==e&&!Lt(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=$e(e,t)),n.call(this,t,$e(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?$e(e,c):c}function at(e,t,n){let r=L(e);I(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&Rt(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function ot(e,t,n=[]){ze(),ke();let r=L(e)[t].apply(e,n);return Ae(),Be(),r}var st=e(`__proto__,__v_isRef,__isVue`),ct=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function lt(e){_(e)||(e=String(e));let t=L(this);return I(t,`has`,e),t.hasOwnProperty(e)}var ut=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Ot:Dt:i?Et:Tt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=et[t]))return e;if(t===`hasOwnProperty`)return lt}let o=Reflect.get(e,t,R(e)?e:n);if((_(t)?ct.has(t):st(t))||(r||I(e,`get`,t),i))return o;if(R(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Nt(e):e}return v(o)?r?Nt(o):jt(o):o}},dt=class extends ut{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=It(i);if(!Lt(n)&&!It(n)&&(i=L(i),n=L(n)),!a&&R(i)&&!R(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,R(e)?e:r);return e===L(r)&&(o?A(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ct.has(t))&&I(e,`has`,t),n}ownKeys(e){return I(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},ft=class extends ut{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},pt=new dt,mt=new ft,ht=new dt(!0),gt=e=>e,_t=e=>Reflect.getPrototypeOf(e);function vt(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?gt:t?Vt:Bt;return!t&&I(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function yt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function bt(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(A(n,a)&&I(i,`get`,n),I(i,`get`,a));let{has:o}=_t(i),s=t?gt:e?Vt:Bt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&I(L(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(A(t,i)&&I(r,`has`,t),I(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?gt:e?Vt:Bt;return!e&&I(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:yt(`add`),set:yt(`set`),delete:yt(`delete`),clear:yt(`clear`)}:{add(e){let n=L(this),r=_t(n),i=L(e),a=!t&&!Lt(e)&&!It(e)?i:e;return r.has.call(n,a)||A(e,a)&&r.has.call(n,e)||A(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!Lt(n)&&!It(n)&&(n=L(n));let r=L(this),{has:i,get:a}=_t(r),o=i.call(r,e);o||=(e=L(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?A(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=_t(t),i=n.call(t,e);i||=(e=L(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=vt(r,e,t)}),n}function xt(e,t){let n=bt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var St={get:xt(!1,!1)},Ct={get:xt(!1,!0)},wt={get:xt(!0,!1)},Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap;function kt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function At(e){return e.__v_skip||!Object.isExtensible(e)?0:kt(S(e))}function jt(e){return It(e)?e:Pt(e,!1,pt,St,Tt)}function Mt(e){return Pt(e,!1,ht,Ct,Et)}function Nt(e){return Pt(e,!0,mt,wt,Dt)}function Pt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=At(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Ft(e){return It(e)?Ft(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function Lt(e){return!!(e&&e.__v_isShallow)}function Rt(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}function zt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&j(e,`__v_skip`,!0),e}var Bt=e=>v(e)?jt(e):e,Vt=e=>v(e)?Nt(e):e;function R(e){return e?e.__v_isRef===!0:!1}function z(e){return Ht(e,!1)}function Ht(e,t){return R(e)?e:new Ut(e,t)}var Ut=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:L(e),this._value=t?e:Bt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Lt(e)||It(e);e=n?e:L(e),A(e,t)&&(this._rawValue=e,this._value=n?e:Bt(e),this.dep.trigger())}};function B(e){return R(e)?e.value:e}var Wt={get:(e,t,n)=>t===`__v_raw`?e:B(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return R(i)&&!R(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Gt(e){return Ft(e)?e:new Proxy(e,Wt)}var Kt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&F!==this)return Oe(this,!0),!0}get value(){let e=this.dep.track();return Pe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function qt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Kt(r,i,n)}var Jt={},Yt=new WeakMap,Xt=void 0;function Zt(e,t=!1,n=Xt){if(n){let t=Yt.get(n);t||Yt.set(n,t=[]),t.push(e)}}function Qt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:Lt(e)||o===!1||o===0?$t(e,1):$t(e),m,g,_,v,y=!1,b=!1;if(R(e)?(g=()=>e.value,y=Lt(e)):Ft(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Ft(e)||Lt(e)),g=()=>e.map(e=>{if(R(e))return e.value;if(Ft(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Xt;Xt=m;try{return f?f(e,3,[v]):e(v)}finally{Xt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>$t(e(),t)}let x=Se(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(Jt):Jt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>A(e,C[t])):A(e,C))){_&&_();let t=Xt;Xt=m;try{let t=[e,C===Jt?void 0:b&&C[0]===Jt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Xt=t}}}else m.run()};return u&&u(w),m=new we(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Zt(e,!1,m),_=m.onStop=()=>{let e=Yt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Yt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function $t(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,R(e))$t(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)$t(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{$t(e,t,n)});else if(C(e)){for(let r in e)$t(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&$t(e[r],t,n)}return e}function en(e,t,n,r){try{return r?e(...r):e()}catch(e){nn(e,t,n)}}function tn(e,t,n,r){if(h(e)){let i=en(e,t,n,r);return i&&y(i)&&i.catch(e=>{nn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(tn(e[a],t,n,r));return i}}function nn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),en(o,null,10,[e,i,a]),Be();return}}rn(e,r,a,i,s)}function rn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var V=[],an=-1,on=[],sn=null,cn=0,ln=Promise.resolve(),un=null;function dn(e){let t=un||ln;return e?t.then(this?e.bind(this):e):t}function fn(e){let t=an+1,n=V.length;for(;t<n;){let r=t+n>>>1,i=V[r],a=vn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function pn(e){if(!(e.flags&1)){let t=vn(e),n=V[V.length-1];!n||!(e.flags&2)&&t>=vn(n)?V.push(e):V.splice(fn(t),0,e),e.flags|=1,mn()}}function mn(){un||=ln.then(yn)}function hn(e){d(e)?on.push(...e):sn&&e.id===-1?sn.splice(cn+1,0,e):e.flags&1||(on.push(e),e.flags|=1),mn()}function gn(e,t,n=an+1){for(;n<V.length;n++){let t=V[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;V.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function _n(e){if(on.length){let e=[...new Set(on)].sort((e,t)=>vn(e)-vn(t));if(on.length=0,sn){sn.push(...e);return}for(sn=e,cn=0;cn<sn.length;cn++){let e=sn[cn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}sn=null,cn=0}}var vn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function yn(e){try{for(an=0;an<V.length;an++){let e=V[an];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),en(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;an<V.length;an++){let e=V[an];e&&(e.flags&=-2)}an=-1,V.length=0,_n(e),un=null,(V.length||on.length)&&yn(e)}}var bn=null,xn=null;function Sn(e){let t=bn;return bn=e,xn=e&&e.type.__scopeId||null,t}function Cn(e,t=bn,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Vi(-1);let i=Sn(t),a;try{a=e(...n)}finally{Sn(i),r._d&&Vi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function wn(e,n){if(bn===null)return e;let r=xa(bn),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&$t(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function Tn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),tn(c,n,8,[e.el,s,e,t]),Be())}}function En(e,t){if(X){let n=X.provides,r=X.parent&&X.parent.provides;r===n&&(n=X.provides=Object.create(r)),n[e]=t}}function Dn(e,t,n=!1){let r=oa();if(r||Gr){let i=Gr?Gr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var On=Symbol.for(`v-scx`),kn=()=>Dn(On);function An(e,t,n){return jn(e,t,n)}function jn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(fa){if(c===`sync`){let e=kn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=X;u.call=(e,t,n)=>tn(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{Si(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():pn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Qt(e,n,u);return fa&&(f?f.push(h):d&&h()),h}function Mn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?Nn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=la(this),s=jn(i,a.bind(r),n);return o(),s}function Nn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Pn=Symbol(`_vte`),Fn=e=>e.__isTeleport,In=Symbol(`_leaveCb`),Ln=Symbol(`_enterCb`);function Rn(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fr(()=>{e.isMounted=!0}),hr(()=>{e.isUnmounting=!0}),e}var zn=[Function,Array],Bn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:zn,onEnter:zn,onAfterEnter:zn,onEnterCancelled:zn,onBeforeLeave:zn,onLeave:zn,onAfterLeave:zn,onLeaveCancelled:zn,onBeforeAppear:zn,onAppear:zn,onAfterAppear:zn,onAppearCancelled:zn},Vn=e=>{let t=e.subTree;return t.component?Vn(t.component):t},Hn={name:`BaseTransition`,props:Bn,setup(e,{slots:t}){let n=oa(),r=Rn();return()=>{let i=t.default&&Xn(t.default(),!0);if(!i||!i.length)return;let a=Un(i),o=L(e),{mode:s}=o;if(r.isLeaving)return qn(a);let c=Jn(a);if(!c)return qn(a);let l=Kn(c,o,r,n,e=>l=e);c.type!==W&&Yn(c,l);let u=n.subTree&&Jn(n.subTree);if(u&&u.type!==W&&!Gi(u,c)&&Vn(n).type!==W){let e=Kn(u,o,r,n);if(Yn(u,e),s===`out-in`&&c.type!==W)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},qn(a);s===`in-out`&&c.type!==W?e.delayLeave=(e,t,n)=>{let i=Gn(r,u);i[String(u.key)]=u,e[In]=()=>{t(),e[In]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function Un(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==W){t=n;break}}return t}var Wn=Hn;function Gn(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Kn(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:_,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,x=String(e.key),S=Gn(n,e),C=(e,t)=>{e&&tn(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),d(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},T={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted)if(a)r=_||c;else return;t[In]&&t[In](!0);let i=S[x];i&&Gi(e,i)&&i.el[In]&&i.el[In](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=f;if(!n.isMounted)if(a)r=v||l,i=y||u,o=b||f;else return;let s=!1;t[Ln]=e=>{s||(s=!0,C(e?o:i,[t]),T.delayedLeave&&T.delayedLeave(),t[Ln]=void 0)};let c=t[Ln].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[Ln]&&t[Ln](!0),n.isUnmounting)return r();C(p,[t]);let a=!1;t[In]=n=>{a||(a=!0,r(),C(n?g:h,[t]),t[In]=void 0,S[i]===e&&delete S[i])};let o=t[In].bind(null,!1);S[i]=e,m?w(m,[t,o]):o()},clone(e){let a=Kn(e,t,n,r,i);return i&&i(a),a}};return T}function qn(e){if(ir(e))return e=Xi(e),e.children=null,e}function Jn(e){if(!ir(e))return Fn(e.type)&&e.children?Un(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function Yn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Yn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Xn(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===U?(o.patchFlag&128&&i++,r=r.concat(Xn(o.children,t,s))):(t||o.type!==W)&&r.push(s==null?o:Xi(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function Zn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function Qn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function $n(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var er=new WeakMap;function tr(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>tr(e,n&&(d(n)?n[t]:n),r,a,o));return}if(rr(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&tr(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?xa(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=L(v),b=v===t?i:e=>$n(_,e)?!1:u(y,e),x=(e,t)=>!(t&&$n(_,t));if(m!=null&&m!==p){if(nr(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(R(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))en(p,f,12,[l,_]);else{let t=g(p),n=R(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),er.delete(e)};t.id=-1,er.set(e,t),Si(t,r)}else nr(e),i()}}}function nr(e){let t=er.get(e);t&&(t.flags|=8,er.delete(e))}se().requestIdleCallback,se().cancelIdleCallback;var rr=e=>!!e.type.__asyncLoader,ir=e=>e.type.__isKeepAlive;function ar(e,t){sr(e,`a`,t)}function or(e,t){sr(e,`da`,t)}function sr(e,t,n=X){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(lr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)ir(e.parent.vnode)&&cr(r,t,n,e),e=e.parent}}function cr(e,t,n,r){let i=lr(t,e,r,!0);gr(()=>{c(r[t],i)},n)}function lr(e,t,n=X,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=la(n),a=tn(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var ur=e=>(t,n=X)=>{(!fa||e===`sp`)&&lr(e,(...e)=>t(...e),n)},dr=ur(`bm`),fr=ur(`m`),pr=ur(`bu`),mr=ur(`u`),hr=ur(`bum`),gr=ur(`um`),_r=ur(`sp`),vr=ur(`rtg`),yr=ur(`rtc`);function br(e,t=X){lr(`ec`,e,t)}var xr=Symbol.for(`v-ndc`);function Sr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Ft(e),r=!1,s=!1;n&&(r=!Lt(e),s=It(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Vt(Bt(e[n])):Bt(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var Cr=e=>e?da(e)?xa(e):Cr(e.parent):null,wr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Cr(e.parent),$root:e=>Cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Nr(e),$forceUpdate:e=>e.f||=()=>{pn(e.update)},$nextTick:e=>e.n||=dn.bind(e.proxy),$watch:e=>Mn.bind(e)}),Tr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),Er={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(Tr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else Or&&(s[n]=0)}let d=wr[n],f,p;if(d)return n===`$attrs`&&I(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return Tr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||Tr(n,c)||u(o,c)||u(i,c)||u(wr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function Dr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var Or=!0;function kr(e){let t=Nr(e),n=e.proxy,i=e.ctx;Or=!1,t.beforeCreate&&jr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:E,renderTriggered:D,errorCaptured:O,serverPrefetch:ee,expose:k,inheritAttrs:te,components:ne,directives:A,filters:re}=t;if(u&&Ar(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=jt(t))}if(Or=!0,o)for(let e in o){let t=o[e],a=Z({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)Mr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{En(t,e[t])})}f&&jr(f,e,`c`);function j(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(j(dr,p),j(fr,m),j(pr,g),j(mr,_),j(ar,y),j(or,b),j(br,O),j(yr,E),j(vr,D),j(hr,S),j(gr,w),j(_r,ee),d(k))if(k.length){let t=e.exposed||={};k.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),te!=null&&(e.inheritAttrs=te),ne&&(e.components=ne),A&&(e.directives=A),ee&&Qn(e)}function Ar(e,t,n=r){d(e)&&(e=Rr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Dn(r.from||n,r.default,!0):Dn(r.from||n):Dn(r),R(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function jr(e,t,n){tn(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Mr(e,t,n,r){let i=r.includes(`.`)?Nn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&An(i,n)}else if(h(e))An(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>Mr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&An(i,r,e)}}function Nr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Pr(c,e,o,!0)),Pr(c,t,o)),v(t)&&a.set(t,c),c}function Pr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Pr(e,a,n,!0),i&&i.forEach(t=>Pr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Fr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Fr={data:Ir,props:Br,emits:Br,methods:zr,computed:zr,beforeCreate:H,created:H,beforeMount:H,mounted:H,beforeUpdate:H,updated:H,beforeDestroy:H,beforeUnmount:H,destroyed:H,unmounted:H,activated:H,deactivated:H,errorCaptured:H,serverPrefetch:H,components:zr,directives:zr,watch:Vr,provide:Ir,inject:Lr};function Ir(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function Lr(e,t){return zr(Rr(e),Rr(t))}function Rr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function H(e,t){return e?[...new Set([].concat(e,t))]:t}function zr(e,t){return e?s(Object.create(null),e,t):t}function Br(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),Dr(e),Dr(t??{})):t}function Vr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=H(e[r],t[r]);return n}function Hr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Ur=0;function Wr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Hr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Ur++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:wa,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||J(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,xa(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(tn(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Gr;Gr=l;try{return e()}finally{Gr=t}}};return l}}var Gr=null,Kr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${O(t)}Modifiers`]||e[`${k(t)}Modifiers`];function qr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Kr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(ie)));let c,l=i[c=ne(n)]||i[c=ne(O(n))];!l&&o&&(l=i[c=ne(k(n))]),l&&tn(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,tn(u,e,6,a)}}var Jr=new WeakMap;function Yr(e,t,n=!1){let r=n?Jr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Yr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Xr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,k(t))||u(e,t))}function Zr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=Sn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Qi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Qi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Qr(c)}}catch(t){Li.length=0,nn(t,e,1),v=J(W)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=$r(y,a)),b=Xi(b,y,!1,!0))}return n.dirs&&(b=Xi(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Yn(b,n.transition),v=b,Sn(_),v}var Qr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},$r=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function ei(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?ti(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(ni(o,r,n)&&!Xr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?ti(r,o,l):!0:!!o;return!1}function ti(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(ni(t,e,a)&&!Xr(n,a))return!0}return!1}function ni(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!ge(r,i):r!==i}function ri({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var ii={},ai=()=>Object.create(ii),oi=e=>Object.getPrototypeOf(e)===ii;function si(e,t,n,r=!1){let i={},a=ai();e.propsDefaults=Object.create(null),li(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Mt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function ci(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=L(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Xr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=O(o);i[t]=ui(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{li(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=k(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=ui(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function li(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(T(t))continue;let l=n[t],d;a&&u(a,d=O(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Xr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=L(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=ui(a,n,s,i[s],e,!u(i,s))}}return s}function ui(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=la(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===k(n))&&(r=!0))}return r}var di=new WeakMap;function fi(e,r,i=!1){let a=i?di:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=fi(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=O(c[e]);pi(n)&&(l[n]=t)}else if(c)for(let e in c){let t=O(e);if(pi(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function pi(e){return e[0]!==`$`&&!T(e)}var mi=e=>e===`_`||e===`_ctx`||e===`$stable`,hi=e=>d(e)?e.map(Qi):[Qi(e)],gi=(e,t,n)=>{if(t._n)return t;let r=Cn((...e)=>hi(t(...e)),n);return r._c=!1,r},_i=(e,t,n)=>{let r=e._ctx;for(let n in e){if(mi(n))continue;let i=e[n];if(h(i))t[n]=gi(n,i,r);else if(i!=null){let e=hi(i);t[n]=()=>e}}},vi=(e,t)=>{let n=hi(t);e.slots.default=()=>n},yi=(e,t,n)=>{for(let r in t)(n||!mi(r))&&(e[r]=t[r])},bi=(e,t,n)=>{let r=e.slots=ai();if(e.vnode.shapeFlag&32){let e=t._;e?(yi(r,t,n),n&&j(r,`_`,e,!0)):_i(t,r)}else t&&vi(e,t)},xi=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:yi(a,n,r):(o=!n.$stable,_i(n,a)),s=n}else n&&(vi(e,n),s={default:1});if(o)for(let e in a)!mi(e)&&s[e]==null&&delete a[e]},Si=Pi;function Ci(e){return wi(e)}function wi(e,i){let a=se();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Gi(e,t)&&(r=he(e),de(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Fi:y(e,t,n,r);break;case W:b(e,t,n,r);break;case Ii:e??x(t,n,r,o);break;case U:ne(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?A(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,P)}u!=null&&i?tr(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&tr(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)E(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ee(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},E=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&O(e.children,d,null,r,i,Ti(e,a),s,u),_&&Tn(e,null,r,`created`),D(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!T(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&na(f,r,e)}_&&Tn(e,null,r,`beforeMount`);let v=Di(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&Si(()=>{try{f&&na(f,r,e),v&&g.enter(d),_&&Tn(e,null,r,`mounted`)}finally{}},i)},D=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Ni(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;D(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},O=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?$i(e[l]):Qi(e[l]),t,n,r,i,a,o,s)},ee=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&Ei(r,!1),(g=h.onVnodeBeforeUpdate)&&na(g,r,n,e),f&&Tn(n,e,r,`beforeUpdate`),r&&Ei(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?k(e.dynamicChildren,d,l,r,i,Ti(n,a),o):s||M(e,n,l,null,r,i,Ti(n,a),o,!1),u>0){if(u&16)te(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&te(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&Si(()=>{g&&na(g,r,n,e),f&&Tn(n,e,r,`updated`)},i)},k=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===U||!Gi(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},te=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!T(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(T(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ne=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),O(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(k(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&Oi(e,t,!0)):M(e,t,n,f,i,a,s,c,l)},A=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):j(t,n,r,i,a,o,c):ie(e,t,c)},j=(e,t,n,r,i,a,o)=>{let s=e.component=aa(e,r,i);if(ir(e)&&(s.ctx.renderer=P),pa(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ae,o),!e.el){let r=s.subTree=J(W);b(null,r,t,n),e.placeholder=r.el}}else ae(s,e,t,n,i,a,o)},ie=(e,t,n)=>{let r=t.component=e.component;if(ei(e,t,n))if(r.asyncDep&&!r.asyncResolved){oe(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},ae=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=Ai(e);if(n){t&&(t.el=c.el,oe(e,t,o)),n.asyncDep.then(()=>{Si(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;Ei(e,!1),t?(t.el=c.el,oe(e,t,o)):t=c,n&&re(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&na(d,s,t,c),Ei(e,!0);let f=Zr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),he(p),e,i,a),t.el=f.el,u===null&&ri(e,f.el),r&&Si(r,i),(d=t.props&&t.props.onVnodeUpdated)&&Si(()=>na(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=rr(t);if(Ei(e,!1),l&&re(l),!m&&(o=c&&c.onVnodeBeforeMount)&&na(o,d,t),Ei(e,!0),s&&ye){let t=()=>{e.subTree=Zr(e),ye(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Zr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&Si(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;Si(()=>na(o,d,e),i)}(t.shapeFlag&256||d&&rr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&Si(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new we(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>pn(u),Ei(e,!0),l()},oe=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,ci(e,t.props,r,n),xi(e,t.children,n),ze(),gn(e),Be()},M=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){le(l,d,n,r,i,a,o,s,c);return}else if(f&256){ce(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&me(l,i,a),d!==l&&p(n,d)):u&16?m&16?le(l,d,n,r,i,a,o,s,c):me(l,i,a,!0):(u&8&&p(n,``),m&16&&O(d,n,r,i,a,o,s,c))},ce=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?$i(t[p]):Qi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?me(e,a,o,!0,!1,f):O(t,r,i,a,o,s,c,l,f)},le=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?$i(t[u]):Qi(t[u]);if(Gi(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?$i(t[p]):Qi(t[p]);if(Gi(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?$i(t[u]):Qi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)de(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?$i(t[u]):Qi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){de(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Gi(n,t[_])){i=_;break}i===void 0?de(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?ki(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||Mi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?ue(n,r,p,2):_--)}}},ue=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){ue(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,P);return}if(c===U){o(a,t,n);for(let e=0;e<u.length;e++)ue(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Ii){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),Si(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[In](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},de=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),tr(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!rr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&na(_,t,e),u&6)pe(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Tn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,P,r):l&&!l.hasOnce&&(a!==U||d>0&&d&64)?me(l,t,n,!1,!0):(a===U&&d&384||!i&&u&16)&&me(c,t,n),r&&N(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&Si(()=>{_&&na(_,t,e),h&&Tn(e,null,t,`unmounted`),v&&(e.el=null)},n)},N=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===U){fe(n,r);return}if(t===Ii){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},fe=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},pe=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;ji(c),ji(l),r&&re(r),i.stop(),a&&(a.flags|=8,de(o,e,t,n)),s&&Si(s,t),Si(()=>{e.isUnmounted=!0},t)},me=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)de(e[o],t,n,r,i)},he=e=>{if(e.shapeFlag&6)return he(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Pn];return n?h(n):t},ge=!1,_e=(e,t,n)=>{let r;e==null?t._vnode&&(de(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ge||=(ge=!0,gn(r),_n(),!1)},P={p:v,um:de,m:ue,r:N,mt:j,mc:O,pc:M,pbc:k,n:he,o:e},ve,ye;return i&&([ve,ye]=i(P)),{render:_e,hydrate:ve,createApp:Wr(_e,ve)}}function Ti({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function Ei({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Di(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Oi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=$i(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&Oi(t,a)),a.type===Fi&&(a.patchFlag===-1&&(a=i[e]=$i(a)),a.el=t.el),a.type===W&&!a.el&&(a.el=t.el)}}function ki(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function Ai(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Ai(t)}function ji(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Mi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?Mi(t.subTree):null}var Ni=e=>e.__isSuspense;function Pi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):hn(e)}var U=Symbol.for(`v-fgt`),Fi=Symbol.for(`v-txt`),W=Symbol.for(`v-cmt`),Ii=Symbol.for(`v-stc`),Li=[],Ri=null;function G(e=!1){Li.push(Ri=e?null:[])}function zi(){Li.pop(),Ri=Li[Li.length-1]||null}var Bi=1;function Vi(e,t=!1){Bi+=e,e<0&&Ri&&t&&(Ri.hasOnce=!0)}function Hi(e){return e.dynamicChildren=Bi>0?Ri||n:null,zi(),Bi>0&&Ri&&Ri.push(e),e}function K(e,t,n,r,i,a){return Hi(q(e,t,n,r,i,a,!0))}function Ui(e,t,n,r,i){return Hi(J(e,t,n,r,i,!0))}function Wi(e){return e?e.__v_isVNode===!0:!1}function Gi(e,t){return e.type===t.type&&e.key===t.key}var Ki=({key:e})=>e??null,qi=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||R(e)||h(e)?{i:bn,r:e,k:t,f:!!n}:e);function q(e,t=null,n=null,r=0,i=null,a=e===U?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ki(t),ref:t&&qi(t),scopeId:xn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:bn};return s?(ea(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Bi>0&&!o&&Ri&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Ri.push(c),c}var J=Ji;function Ji(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===xr)&&(e=W),Wi(e)){let r=Xi(e,t,!0);return n&&ea(r,n),Bi>0&&!a&&Ri&&(r.shapeFlag&6?Ri[Ri.indexOf(e)]=r:Ri.push(r)),r.patchFlag=-2,r}if(Sa(e)&&(e=e.__vccOpts),t){t=Yi(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=N(e)),v(n)&&(Rt(n)&&!d(n)&&(n=s({},n)),t.style=M(n))}let o=g(e)?1:Ni(e)?128:Fn(e)?64:v(e)?4:h(e)?2:0;return q(e,t,n,r,i,o,a,!0)}function Yi(e){return e?Rt(e)||oi(e)?s({},e):e:null}function Xi(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?ta(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Ki(l),ref:t&&t.ref?n&&a?d(a)?a.concat(qi(t)):[a,qi(t)]:qi(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==U?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Xi(e.ssContent),ssFallback:e.ssFallback&&Xi(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Yn(u,c.clone(u)),u}function Zi(e=` `,t=0){return J(Fi,null,e,t)}function Y(e=``,t=!1){return t?(G(),Ui(W,null,e)):J(W,null,e)}function Qi(e){return e==null||typeof e==`boolean`?J(W):d(e)?J(U,null,e.slice()):Wi(e)?$i(e):J(Fi,null,String(e))}function $i(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Xi(e)}function ea(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),ea(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!oi(t)?t._ctx=bn:r===3&&bn&&(bn.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:bn},n=32):(t=String(t),r&64?(n=16,t=[Zi(t)]):n=8);e.children=t,e.shapeFlag|=n}function ta(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=N([t.class,r.class]));else if(e===`style`)t.style=M([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function na(e,t,n,r=null){tn(e,t,7,[n,r])}var ra=Hr(),ia=0;function aa(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||ra,o={uid:ia++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new xe(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:fi(i,a),emitsOptions:Yr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=qr.bind(null,o),e.ce&&e.ce(o),o}var X=null,oa=()=>X||bn,sa,ca;{let e=se(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};sa=t(`__VUE_INSTANCE_SETTERS__`,e=>X=e),ca=t(`__VUE_SSR_SETTERS__`,e=>fa=e)}var la=e=>{let t=X;return sa(e),e.scope.on(),()=>{e.scope.off(),sa(t)}},ua=()=>{X&&X.scope.off(),sa(null)};function da(e){return e.vnode.shapeFlag&4}var fa=!1;function pa(e,t=!1,n=!1){t&&ca(t);let{props:r,children:i}=e.vnode,a=da(e);si(e,r,a,t),bi(e,i,n||t);let o=a?ma(e,t):void 0;return t&&ca(!1),o}function ma(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Er);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?ba(e):null,i=la(e),a=en(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!rr(e)&&Qn(e),o){if(a.then(ua,ua),t)return a.then(n=>{ha(e,n,t)}).catch(t=>{nn(t,e,0)});e.asyncDep=a}else ha(e,a,t)}else va(e,t)}function ha(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Gt(t)),va(e,n)}var ga,_a;function va(e,t,n){let i=e.type;if(!e.render){if(!t&&ga&&!i.render){let t=i.template||Nr(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=ga(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,_a&&_a(e)}{let t=la(e);ze();try{kr(e)}finally{Be(),t()}}}var ya={get(e,t){return I(e,`get`,``),e[t]}};function ba(e){return{attrs:new Proxy(e.attrs,ya),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function xa(e){return e.exposed?e.exposeProxy||=new Proxy(Gt(zt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in wr)return wr[n](e)},has(e,t){return t in e||t in wr}}):e.proxy}function Sa(e){return h(e)&&`__vccOpts`in e}var Z=(e,t)=>qt(e,t,fa);function Ca(e,t,n){try{Vi(-1);let r=arguments.length;return r===2?v(t)&&!d(t)?Wi(t)?J(e,null,[t]):J(e,t):J(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Wi(n)&&(n=[n]),J(e,t,n))}finally{Vi(1)}}var wa=`3.5.31`,Ta=void 0,Ea=typeof window<`u`&&window.trustedTypes;if(Ea)try{Ta=Ea.createPolicy(`vue`,{createHTML:e=>e})}catch{}var Da=Ta?e=>Ta.createHTML(e):e=>e,Oa=`http://www.w3.org/2000/svg`,ka=`http://www.w3.org/1998/Math/MathML`,Aa=typeof document<`u`?document:null,ja=Aa&&Aa.createElement(`template`),Ma={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Aa.createElementNS(Oa,e):t===`mathml`?Aa.createElementNS(ka,e):n?Aa.createElement(e,{is:n}):Aa.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Aa.createTextNode(e),createComment:e=>Aa.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Aa.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{ja.innerHTML=Da(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=ja.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Na=`transition`,Pa=`animation`,Fa=Symbol(`_vtc`),Ia={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},La=s({},Bn,Ia),Ra=(e=>(e.displayName=`Transition`,e.props=La,e))((e,{slots:t})=>Ca(Wn,Va(e),t)),za=(e,t=[])=>{d(e)?e.forEach(e=>e(...t)):e&&e(...t)},Ba=e=>e?d(e)?e.some(e=>e.length>1):e.length>1:!1;function Va(e){let t={};for(let n in e)n in Ia||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=a,appearActiveClass:u=o,appearToClass:d=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,h=Ha(i),g=h&&h[0],_=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:x,onLeaveCancelled:S,onBeforeAppear:C=v,onAppear:w=y,onAppearCancelled:T=b}=t,E=(e,t,n,r)=>{e._enterCancelled=r,Ga(e,t?d:c),Ga(e,t?u:o),n&&n()},D=(e,t)=>{e._isLeaving=!1,Ga(e,f),Ga(e,m),Ga(e,p),t&&t()},O=e=>(t,n)=>{let i=e?w:y,o=()=>E(t,e,n);za(i,[t,o]),Ka(()=>{Ga(t,e?l:a),Wa(t,e?d:c),Ba(i)||Ja(t,r,g,o)})};return s(t,{onBeforeEnter(e){za(v,[e]),Wa(e,a),Wa(e,o)},onBeforeAppear(e){za(C,[e]),Wa(e,l),Wa(e,u)},onEnter:O(!1),onAppear:O(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>D(e,t);Wa(e,f),e._enterCancelled?(Wa(e,p),Qa(e)):(Qa(e),Wa(e,p)),Ka(()=>{e._isLeaving&&(Ga(e,f),Wa(e,m),Ba(x)||Ja(e,r,_,n))}),za(x,[e,n])},onEnterCancelled(e){E(e,!1,void 0,!0),za(b,[e])},onAppearCancelled(e){E(e,!0,void 0,!0),za(T,[e])},onLeaveCancelled(e){D(e),za(S,[e])}})}function Ha(e){if(e==null)return null;if(v(e))return[Ua(e.enter),Ua(e.leave)];{let t=Ua(e);return[t,t]}}function Ua(e){return ae(e)}function Wa(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[Fa]||(e[Fa]=new Set)).add(t)}function Ga(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[Fa];n&&(n.delete(t),n.size||(e[Fa]=void 0))}function Ka(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var qa=0;function Ja(e,t,n,r){let i=e._endId=++qa,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=Ya(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function Ya(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${Na}Delay`),a=r(`${Na}Duration`),o=Xa(i,a),s=r(`${Pa}Delay`),c=r(`${Pa}Duration`),l=Xa(s,c),u=null,d=0,f=0;t===Na?o>0&&(u=Na,d=o,f=a.length):t===Pa?l>0&&(u=Pa,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?Na:Pa:null,f=u?u===Na?a.length:c.length:0);let p=u===Na&&/\b(?:transform|all)(?:,|$)/.test(r(`${Na}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function Xa(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>Za(t)+Za(e[n])))}function Za(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function Qa(e){return(e?e.ownerDocument:document).body.offsetHeight}function $a(e,t,n){let r=e[Fa];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var eo=Symbol(`_vod`),to=Symbol(`_vsh`),no=Symbol(``),ro=/(?:^|;)\s*display\s*:/;function io(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??oo(r,t,``)}else for(let e in t)n[e]??oo(r,e,``);for(let e in n)e===`display`&&(a=!0),oo(r,e,n[e])}else if(i){if(t!==n){let e=r[no];e&&(n+=`;`+e),r.cssText=n,a=ro.test(n)}}else t&&e.removeAttribute(`style`);eo in e&&(e[eo]=a?r.display:``,e[to]&&(r.display=`none`))}var ao=/\s*!important$/;function oo(e,t,n){if(d(n))n.forEach(n=>oo(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=lo(e,t);ao.test(n)?e.setProperty(k(r),n.replace(ao,``),`important`):e[r]=n}}var so=[`Webkit`,`Moz`,`ms`],co={};function lo(e,t){let n=co[t];if(n)return n;let r=O(t);if(r!==`filter`&&r in e)return co[t]=r;r=te(r);for(let n=0;n<so.length;n++){let i=so[n]+r;if(i in e)return co[t]=i}return t}var uo=`http://www.w3.org/1999/xlink`;function fo(e,t,n,r,i,a=pe(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(uo,t.slice(6,t.length)):e.setAttributeNS(uo,t,n):n==null||a&&!me(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function po(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?Da(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=me(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function mo(e,t,n,r){e.addEventListener(t,n,r)}function ho(e,t,n,r){e.removeEventListener(t,n,r)}var go=Symbol(`_vei`);function _o(e,t,n,r,i=null){let a=e[go]||(e[go]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=yo(t);r?mo(e,n,a[t]=Co(r,i),s):o&&(ho(e,n,o,s),a[t]=void 0)}}var vo=/(?:Once|Passive|Capture)$/;function yo(e){let t;if(vo.test(e)){t={};let n;for(;n=e.match(vo);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):k(e.slice(2)),t]}var bo=0,xo=Promise.resolve(),So=()=>bo||=(xo.then(()=>bo=0),Date.now());function Co(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;tn(wo(e,n.value),t,5,[e])};return n.value=e,n.attached=So(),n}function wo(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var To=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Eo=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?$a(e,r,c):t===`style`?io(e,n,r):a(t)?o(t)||_o(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Do(e,t,r,c))?(po(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&fo(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Oo(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?po(e,O(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),fo(e,t,r,c))};function Do(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&To(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return To(t)&&g(n)?!1:t in e}function Oo(e,t){let n=e._def.props;if(!n)return!1;let r=O(t);return Array.isArray(n)?n.some(e=>O(e)===r):Object.keys(n).some(e=>O(e)===r)}var ko=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>re(t,e):t};function Ao(e){e.target.composing=!0}function jo(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Mo=Symbol(`_assign`);function No(e,t,n){return t&&(e=e.trim()),n&&(e=ie(e)),e}var Po={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[Mo]=ko(i);let a=r||i.props&&i.props.type===`number`;mo(e,t?`change`:`input`,t=>{t.target.composing||e[Mo](No(e.value,n,a))}),(n||a)&&mo(e,`change`,()=>{e.value=No(e.value,n,a)}),t||(mo(e,`compositionstart`,Ao),mo(e,`compositionend`,jo),mo(e,`change`,jo))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Mo]=ko(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ie(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},Fo=[`ctrl`,`shift`,`alt`,`meta`],Io={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>Fo.some(n=>e[`${n}Key`]&&!t.includes(n))},Lo=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Io[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},Ro=s({patchProp:Eo},Ma),zo;function Bo(){return zo||=Ci(Ro)}var Vo=((...e)=>{let t=Bo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Uo(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,Ho(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function Ho(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Uo(e){return g(e)?document.querySelector(e):e}function Wo(e){return e.value===`wild`||e.value===`wild_draw_four`}function Go(e){return e.chosenColor==null?e.color:e.chosenColor}function Ko(e){if(typeof e.value==`number`)return String(e.value);switch(e.value){case`skip`:return`Skip`;case`reverse`:return`Rev`;case`draw_two`:return`+2`;case`wild`:return`Wild`;case`wild_draw_four`:return`+4`}}function qo(e){return e.value===`draw_two`?2:e.value===`wild_draw_four`?4:0}function Jo(e){let t=Go(e);return`${t?t.charAt(0).toUpperCase()+t.slice(1):``} ${Ko(e)}`.trim()}function Yo(e){return e.discardPile.length>0?e.discardPile[0]:null}function Xo(e,t,n){let r=e.players.map((e,r)=>r===t?n(e):e);return{...e,players:r}}function Zo(e){let t=e.players.length,n=e.direction===`clockwise`?1:t-1,r=e.currentPlayer;do r=(r+n)%t;while(e.finished.includes(r)&&r!==e.currentPlayer);return r}function Qo(e,t,n){let r=[[t,n],...e.recentPlays].slice(0,4);return{...e,recentPlays:r}}function $o(e){let t=Xo(e,e.currentPlayer,e=>({...e,hand:e.hand.map(e=>({...e,drawn:!1}))}));return{...t,currentPlayer:Zo(t)}}var es=Math.random;function ts(e,t){return e[Math.floor(t()*e.length)]}var ns=[`red`,`blue`,`green`,`yellow`],rs=[`skip`,`reverse`,`draw_two`];function is(){let e=[];for(let t of ns){e.push({color:t,value:0});for(let n=1;n<=9;n++)for(let r=0;r<2;r++)e.push({color:t,value:n});for(let n of rs)for(let r=0;r<2;r++)e.push({color:t,value:n})}for(let t=0;t<4;t++)e.push({color:null,value:`wild`});for(let t=0;t<4;t++)e.push({color:null,value:`wild_draw_four`});return e}function as(e,t=es){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function os(e,t){return[e.slice(0,t),e.slice(t)]}function ss(e,t=es){return as(e.map(e=>({...e,chosenColor:null})),t)}function cs(e){return e.hand.length}function ls(e,t){let n=e.hand[t],r=[...e.hand.slice(0,t),...e.hand.slice(t+1)];return[n,{...e,hand:r}]}function us(e,t){return{...e,hand:[...e.hand,...t]}}function ds(e,t){return!!(Wo(e)||Go(e)===Go(t)||e.value===t.value)}function fs(e,t){return e.map((e,t)=>[t,e]).filter(([,e])=>ds(e,t))}function ps(e,t){return fs(e,t).map(([e])=>e)}var ms=7,hs=.6;function gs(e){return Array.from({length:e},(e,t)=>`Player ${t+2}`)}function _s(e,t=4,n={}){let r=n.rng??es,i=as(is(),r),a=n.aiNames??gs(t-1),o=e=>Array.isArray(n.aiSkill)?n.aiSkill[e]??hs:n.aiSkill??hs,s=[{id:0,name:e,type:`human`,hand:[],saidUno:!1},...a.map((e,t)=>({id:t+1,name:e,type:`ai`,hand:[],saidUno:!1,skill:o(t)}))],c=[];for(let e of s){let[t,n]=os(i,ms);c.push({...e,hand:t}),i=n}let[l,u]=Ss(i,r);return i=u,Cs({players:c,drawPile:i,discardPile:[l],currentPlayer:0,direction:`counter_clockwise`,phase:`playing`,finished:[],lastAction:`Game started! ${Jo(l)} on the pile.`,unoPenalty:null,recentPlays:[]},l,r)}function vs(e,t,n,r,i=es){let a=e.players[t].hand[n],o=Yo(e);return e.phase===`playing`?e.currentPlayer===t?a?ds(a,o)?Wo(a)&&!r?{ok:!1,error:`must_choose_color`}:ws(e,t,n,a,r??null,i):{ok:!1,error:`not_playable`}:{ok:!1,error:`invalid_card`}:{ok:!1,error:`not_your_turn`}:{ok:!1,error:`wrong_phase`}}function ys(e,t,n=es){return e.phase===`playing`?e.currentPlayer===t?Os(e,t,n):{ok:!1,error:`not_your_turn`}:{ok:!1,error:`wrong_phase`}}function bs(e,t,n=es){let r=e.players[t];return r.saidUno?{ok:!0,state:e}:cs(r)>2?{ok:!0,state:{...As(e,t,`early`,n),unoPenalty:t===0?{reason:`early`}:null}}:{ok:!0,state:{...Xo(e,t,e=>({...e,saidUno:!0})),lastAction:`${r.name} called ONE!`}}}function xs(e,t){return e.currentPlayer===t?{ok:!0,state:$o(e)}:{ok:!1,error:`not_your_turn`}}function Ss(e,t){let[[n],r]=os(e,1);return n.value===`wild_draw_four`?Ss(as([...r,n],t),t):[n,r]}function Cs(e,t,n){let r=e.players[e.currentPlayer].name;switch(t.value){case`skip`:return $o({...e,lastAction:`${Jo(t)} - ${r} is skipped!`});case`reverse`:return $o({...e,discardPile:[{...e.discardPile[0],reverseTo:`clockwise`},...e.discardPile.slice(1)],direction:`clockwise`,lastAction:`${Jo(t)} - Reversed! Playing clockwise.`});case`draw_two`:{let[i,a]=ks(e.drawPile,e.discardPile,2,n),o=e.currentPlayer,s={...e,drawPile:a};return s=Xo(s,o,e=>us(e,i)),{...s,lastAction:`${Jo(t)} - ${r} drew 2!`}}case`wild`:{let r=ts([`red`,`blue`,`green`,`yellow`],n),i={...t,chosenColor:r};return{...e,discardPile:[i],lastAction:`Wild opened - color is ${r}!`}}default:return e}}function ws(e,t,n,r,i,a){let o=Wo(r)?{...r,chosenColor:i}:r,s=e.players[t],[,c]=ls(s,n),l={...e,discardPile:[o,...e.discardPile]};l=Xo(l,t,()=>c),l=Qo(l,s.name,o);let u=cs(l.players[t]);if(l={...l,unoPenalty:null},u===0){if(s.saidUno)return{ok:!0,state:Ts(l,t,o,a)};{l=As(l,t,`forgot`,a);let e=l.lastAction;return l=Ds(l,o,t,a),l={...l,unoPenalty:t===0?{reason:`forgot`}:null,lastAction:`${e} ${l.lastAction}`},{ok:!0,state:l}}}else return u>1&&(l=Xo(l,t,e=>({...e,saidUno:!1}))),l=Ds(l,o,t,a),{ok:!0,state:l}}function Ts(e,t,n,r){let i=e.players[t],a=[...e.finished,t],o=e.players.map((e,t)=>t).filter(e=>!a.includes(e));if(o.length<=1)return{...e,phase:`game_over`,finished:[...a,...o],lastAction:a.length===1?`${i.name} wins!`:`${i.name} is out! Game over.`};let s=Ds({...e,finished:a},n,t,r);return{...s,lastAction:`${i.name} is out in ${Es(a.length)}! ${s.lastAction}`}}function Es(e){return`${e}${[`th`,`st`,`nd`,`rd`][e%10<=3&&Math.floor(e/10)!==1?e%10:0]}`}function Ds(e,t,n,r){let i=e.players[n];switch(t.value){case`skip`:{let n=Zo(e),r=e.players[n];return $o($o({...e,lastAction:`${i.name} played ${Jo(t)} - ${r.name} is skipped!`}))}case`reverse`:{let n=e.direction===`clockwise`?`counter_clockwise`:`clockwise`;return $o({...e,discardPile:[{...e.discardPile[0],reverseTo:n},...e.discardPile.slice(1)],recentPlays:e.recentPlays.map((e,t)=>t===0?[e[0],{...e[1],reverseTo:n}]:e),direction:n,lastAction:`${i.name} played ${Jo(t)} - Reversed!`})}case`draw_two`:{let n=Zo(e),a=e.players[n],[o,s]=ks(e.drawPile,e.discardPile,2,r),c={...e,drawPile:s};return c=Xo(c,n,e=>us(e,o)),$o({...c,lastAction:`${i.name} played ${Jo(t)} - ${a.name} drew 2!`})}case`wild`:{let n=t.chosenColor;return $o({...e,lastAction:`${i.name} played Wild - chose ${n}!`})}case`wild_draw_four`:{let n=Zo(e),a=e.players[n],o=t.chosenColor,[s,c]=ks(e.drawPile,e.discardPile,4,r),l={...e,drawPile:c};return l=Xo(l,n,e=>us(e,s)),$o({...l,lastAction:`${i.name} played Wild +4 - ${a.name} drew 4! Color is ${o}!`})}default:return $o({...e,lastAction:`${i.name} played ${Jo(t)}.`})}}function Os(e,t,n){let[r,i]=ks(e.drawPile,e.discardPile,1,n),a=r[0],o=e.players[t],s={...e,drawPile:i};return s=Xo(s,t,e=>us(e,[a])),s={...s,lastAction:`${o.name} drew a card.`},{ok:!0,state:s,drawnCard:a}}function ks(e,t,n,r){if(e.length>=n){let[t,r]=os(e,n);return[t.map(e=>({...e,drawn:!0})),r]}let[,...i]=t,a=ss(i,r),o=[...e,...a],[s,c]=os(o,Math.min(n,o.length));return[s.map(e=>({...e,drawn:!0})),c]}function As(e,t,n,r){let i=e.players[t],[a,o]=ks(e.drawPile,e.discardPile,2,r),s={...e,drawPile:o};s=Xo(s,t,e=>us(e,a));let c=n===`forgot`?`forgot to call ONE!`:`called ONE! too early!`;return{...s,lastAction:`${i.name} ${c} Drew 2 penalty cards.`}}function js(e){let t=Math.max(0,Math.min(1,e));return{blunder:.35*(1-t),smartColor:t>=.25,holdWilds:t>=.5,aggressive:t>=.65,callsOne:.6+.4*t,readsOpponents:t>=.8}}var Ms=[`red`,`blue`,`green`,`yellow`];function Ns(e,t,n=es){let r=e.players[t],i=Yo(e),a=js(r.skill??.6),o=fs(r.hand,i);if(o.length===0)return{type:`draw`};let[s,c]=n()<a.blunder?ts(o,n):Bs(o,e,t,a);return{type:`play`,cardIndex:s,color:Wo(c)?Ps(r.hand,{rng:n,profile:a,avoid:zs(e,t,a)}):null}}function Ps(e,t={}){let n=t.rng??es,r=t.profile??js(.6),i=t.avoid??[];if(!r.smartColor)return ts(Ms,n);let a=new Map;for(let t of e)!Wo(t)&&t.color&&a.set(t.color,(a.get(t.color)??0)+1);if(a.size===0)return ts(Ms,n);let o=Ms[0],s=-1/0;for(let e of Ms){let t=a.get(e)??0;if(t===0)continue;let n=t-(i.includes(e)?.5:0);n>s&&(s=n,o=e)}return o}function Fs(e,t,n=es){let r=e.players[t];if(e.phase!==`playing`||r.type!==`ai`)return e;let i=js(r.skill??.6),a=e;cs(r)===2&&n()<i.callsOne&&(a=bs(a,t).state);let o=Ns(a,t,n);if(o.type===`play`){let e=vs(a,t,o.cardIndex,o.color,n);return e.ok?e.state:Ls(a,t,n)}let s=ys(a,t,n);return s.ok?Is(s.state,t,s.drawnCard,n):a}function Is(e,t,n,r){let i=Yo(e);if(i&&ds(n,i)){let i=e.players[t],a=js(i.skill??.6),o=vs(e,t,i.hand.length-1,Wo(n)?Ps(i.hand,{rng:r,profile:a,avoid:zs(e,t,a)}):null,r);if(o.ok)return o.state}return Rs(e,t)}function Ls(e,t,n){let r=ys(e,t,n);return r.ok?Rs(r.state,t):e}function Rs(e,t){let n=xs(e,t);return n.ok?n.state:e}function zs(e,t,n){if(!n.readsOpponents)return[];let r=e.players[t].name;return e.recentPlays.filter(([e])=>e!==r).map(([,e])=>e.chosenColor??e.color).filter(e=>e!=null)}function Bs(e,t,n,r){let i=e.some(([,e])=>!Wo(e)),a=t.players[Zo(t)],o=cs(a)<=2,s=t.players.length-t.finished.length===2,c=new Map,l=t.players[n].hand;for(let e of l)!Wo(e)&&e.color&&c.set(e.color,(c.get(e.color)??0)+1);let u=e=>Vs(e,r,i,o,s,c);return e.reduce((e,t)=>u(t[1])>u(e[1])?t:e)}function Vs(e,t,n,r,i,a){if(Wo(e))return t.holdWilds?n?t.aggressive&&r&&e.value===`wild_draw_four`?190:-10:e.value===`wild`?10:5:120;switch(e.value){case`draw_two`:return 200;case`skip`:return 180;case`reverse`:return t.aggressive&&i?170:50;default:{let n=t.aggressive?10-(a.get(e.color)??0):0;return 60+e.value+n*2}}}var Hs;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(Hs||={});var Us=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Ws=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,Gs=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Ws(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new Us(`"${e}" plugin is not implemented on ${c}`,Hs.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}else throw new Us(`"${e}.${t}()" is not implemented on ${c}`,Hs.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,`name`,{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{g({eventName:e,callbackId:await n},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=Us,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Ks=(e=>e.Capacitor=Gs(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),qs=Ks.registerPlugin,Js=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(!r){if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}return}r.forEach(e=>e(t))}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new Ks.Exception(e,Hs.Unimplemented)}unavailable(e=`not available`){return new Ks.Exception(e,Hs.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},Ys=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Xs=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Zs=class extends Js{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=Xs(n).trim(),r=Xs(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=Ys(e.key),n=Ys(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};qs(`CapacitorCookies`,{web:()=>new Zs});var Qs=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),$s=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},ec=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,tc=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=$s(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else (r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},nc=class extends Js{async request(e){let t=tc(e,e.webFetchExtra),n=ec(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Qs(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};qs(`CapacitorHttp`,{web:()=>new nc});var rc;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(rc||={});var ic;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(ic||={});var ac=class extends Js{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};qs(`SystemBars`,{web:()=>new ac});var oc=`modulepreload`,sc=function(e,t){return new URL(e,t).href},cc={},lc=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=sc(t,n),t in cc)return;cc[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:oc,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},uc=qs(`Preferences`,{web:()=>lc(()=>import(`./web-Cumnb9IP.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),dc=``;async function fc(){let{value:e}=await uc.get({key:`device_id`});return dc=e??crypto.randomUUID(),e||await uc.set({key:`device_id`,value:dc}),dc}var pc=`__capgo_keep_url_path_after_reload`,mc=`__capgo_history_stack__`,hc=100;if(typeof window<`u`&&typeof document<`u`&&typeof history<`u`){let e=window;if(!e.__capgoHistoryPatched){e.__capgoHistoryPatched=!0;let t=()=>{try{if(e.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(pc)===`1`}catch{return!1}},n=()=>{try{let e=window.sessionStorage.getItem(mc);if(!e)return{stack:[],index:-1};let t=JSON.parse(e);return!t||!Array.isArray(t.stack)||typeof t.index!=`number`?{stack:[],index:-1}:t}catch{return{stack:[],index:-1}}},r=(e,t)=>{try{window.sessionStorage.setItem(mc,JSON.stringify({stack:e,index:t}))}catch{}},i=()=>{try{window.sessionStorage.removeItem(mc)}catch{}},a=e=>{try{let t=e??window.location.href,n=new URL(t instanceof URL?t.toString():t,window.location.href);return`${n.pathname}${n.search}${n.hash}`}catch{return null}},o=(e,t)=>{if(e.length<=hc)return{stack:e,index:t};let n=e.length-hc;return{stack:e.slice(n),index:Math.max(0,t-n)}},s=e=>{document.readyState===`complete`||document.readyState===`interactive`?e():window.addEventListener(`DOMContentLoaded`,e,{once:!0})},c=!1,l=!1,u=!1,d=()=>{if(!c)return;let e=n(),t=a();if(t){if(e.stack.length===0){e.stack.push(t),e.index=0,r(e.stack,e.index);return}(e.index<0||e.index>=e.stack.length)&&(e.index=e.stack.length-1),e.stack[e.index]!==t&&(e.stack[e.index]=t,r(e.stack,e.index))}},f=(e,t)=>{if(!c||l)return;let i=a(e);if(!i)return;let{stack:s,index:u}=n();s.length===0?(s.push(i),u=s.length-1):t?((u<0||u>=s.length)&&(u=s.length-1),s[u]=i):u>=s.length-1?(s.push(i),u=s.length-1):(s=s.slice(0,u+1),s.push(i),u=s.length-1),{stack:s,index:u}=o(s,u),r(s,u)},p=()=>{if(!c||l)return;let e=n();if(e.stack.length===0){d();return}let t=e.index>=0&&e.index<e.stack.length?e.index:e.stack.length-1,r=a();if(e.stack.length===1&&r===e.stack[0])return;let i=e.stack[0];if(!i)return;l=!0;try{history.replaceState(history.state,document.title,i);for(let t=1;t<e.stack.length;t+=1)history.pushState(history.state,document.title,e.stack[t])}catch{l=!1;return}l=!1;let o=t-(e.stack.length-1);o===0?(history.replaceState(history.state,document.title,e.stack[t]),window.dispatchEvent(new PopStateEvent(`popstate`))):history.go(o)},m=()=>{!c||u||(u=!0,s(()=>{u=!1,p()}))},h=null,g=null,_=()=>{if(!c||l)return;let e=a();if(!e)return;let t=n(),i=t.stack.lastIndexOf(e);i>=0?t.index=i:(t.stack.push(e),t.index=t.stack.length-1);let s=o(t.stack,t.index);r(s.stack,s.index)},v=()=>{h&&g||(h=history.pushState,g=history.replaceState,history.pushState=function(e,t,n){let r=h?.call(history,e,t,n);return f(n,!1),r},history.replaceState=function(e,t,n){let r=g?.call(history,e,t,n);return f(n,!0),r},window.addEventListener(`popstate`,_))},y=()=>{h&&=(history.pushState=h,null),g&&=(history.replaceState=g,null),window.removeEventListener(`popstate`,_)},b=e=>{if(c===e){c&&(d(),m());return}c=e,c?(v(),d(),m()):(y(),i())};window.addEventListener(`CapacitorUpdaterKeepUrlPathAfterReload`,t=>{let n=t?.detail?.enabled;typeof n==`boolean`?(e.__capgoKeepUrlPathAfterReload=n,b(n)):(e.__capgoKeepUrlPathAfterReload=!0,b(!0))}),b(t())}}var gc;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.UPDATE_NOT_AVAILABLE=1]=`UPDATE_NOT_AVAILABLE`,e[e.UPDATE_AVAILABLE=2]=`UPDATE_AVAILABLE`,e[e.UPDATE_IN_PROGRESS=3]=`UPDATE_IN_PROGRESS`})(gc||={});var _c;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.PENDING=1]=`PENDING`,e[e.DOWNLOADING=2]=`DOWNLOADING`,e[e.INSTALLING=3]=`INSTALLING`,e[e.INSTALLED=4]=`INSTALLED`,e[e.FAILED=5]=`FAILED`,e[e.CANCELED=6]=`CANCELED`,e[e.DOWNLOADED=11]=`DOWNLOADED`})(_c||={});var vc;(function(e){e[e.OK=0]=`OK`,e[e.CANCELED=1]=`CANCELED`,e[e.FAILED=2]=`FAILED`,e[e.NOT_AVAILABLE=3]=`NOT_AVAILABLE`,e[e.NOT_ALLOWED=4]=`NOT_ALLOWED`,e[e.INFO_MISSING=5]=`INFO_MISSING`})(vc||={});var yc=qs(`CapacitorUpdater`,{web:()=>lc(()=>import(`./web-CRyOEPOl.js`).then(e=>new e.CapacitorUpdaterWeb),[],import.meta.url)}),bc=`builtin`;async function xc(e){Ks.isNativePlatform()&&(await yc.setCustomId({customId:e}),bc=(await yc.current()).bundle.version,await yc.notifyAppReady())}var Sc=`https://uno-stats.aibotted849.workers.dev`;function Cc(e){let t=JSON.stringify({...e,device_id:dc,bundle:bc});navigator.sendBeacon(Sc,new Blob([t],{type:`application/json`}))}var wc=`Rank,Girl Name,Boy Name
1,Emily,Jacob
2,Emma,Michael
3,Madison,Joshua
4,Hannah,Matthew
5,Olivia,Andrew
6,Abigail,Joseph
7,Alexis,Ethan
8,Ashley,Daniel
9,Elizabeth,Christopher
10,Samantha,Anthony
11,Isabella,William
12,Sarah,Nicholas
13,Grace,Ryan
14,Alyssa,David
15,Lauren,Tyler
16,Kayla,Alexander
17,Brianna,John
18,Jessica,James
19,Taylor,Dylan
20,Sophia,Zachary
21,Anna,Brandon
22,Victoria,Jonathan
23,Natalie,Samuel
24,Chloe,Benjamin
25,Sydney,Christian
26,Hailey,Nathan
27,Jasmine,Justin
28,Rachel,Logan
29,Morgan,Gabriel
30,Megan,Jose
31,Jennifer,Noah
32,Kaitlyn,Kevin
33,Julia,Austin
34,Haley,Caleb
35,Katherine,Robert
36,Mia,Thomas
37,Destiny,Elijah
38,Alexandra,Jordan
39,Ava,Aidan
40,Nicole,Cameron
41,Savannah,Hunter
42,Maria,Jason
43,Brooke,Connor
44,Ella,Evan
45,Mackenzie,Jack
46,Allison,Luke
47,Paige,Angel
48,Jordan,Isaac
49,Stephanie,Isaiah
50,Faith,Aaron
51,Makayla,Gavin
52,Kylie,Jackson
53,Kaylee,Kyle
54,Jenna,Mason
55,Amanda,Juan
56,Trinity,Eric
57,Zoe,Charles
58,Katelyn,Adam
59,Mary,Brian
60,Andrea,Luis
61,Madeline,Sean
62,Michelle,Alex
63,Rebecca,Nathaniel
64,Kimberly,Bryan
65,Sara,Ian
66,Gabrielle,Carlos
67,Alexa,Jesus
68,Caroline,Adrian
69,Lily,Cole
70,Vanessa,Steven
71,Angelina,Lucas
72,Riley,Owen
73,Sierra,Aiden
74,Amber,Devin
75,Autumn,Jayden
76,Lillian,Timothy
77,Gabriella,Julian
78,Audrey,Cody
79,Jada,Blake
80,Erin,Seth
81,Leah,Dominic
82,Danielle,Jaden
83,Isabel,Diego
84,Maya,Hayden
85,Ariana,Xavier
86,Arianna,Richard
87,Jocelyn,Chase
88,Evelyn,Colin
89,Avery,Carson
90,Aaliyah,Jeremiah
91,Leslie,Patrick
92,Claire,Antonio
93,Melanie,Sebastian
94,Shelby,Jesse
95,Marissa,Miguel
96,Melissa,Victor
97,Sofia,Landon
98,Bailey,Jake
99,Molly,Trevor
100,Jacqueline,Alejandro
101,Jade,Ashton
102,Gabriela,Carter
103,Courtney,Bryce
104,Angela,Riley
105,Breanna,Mark
106,Catherine,Garrett
107,Katie,Jared
108,Diana,Jeremy
109,Christina,Wyatt
110,Isabelle,Brayden
111,Amelia,Kenneth
112,Daniela,Tristan
113,Mariah,Caden
114,Briana,Liam
115,Madelyn,Jorge
116,Mya,Henry
117,Kathryn,Vincent
118,Brooklyn,Kaleb
119,Angel,Marcus
120,Amy,Tanner
121,Adriana,Kaden
122,Kennedy,Oscar
123,Alexandria,Paul
124,Laura,Joel
125,Kelly,Parker
126,Gracie,Dakota
127,Lydia,Ivan
128,Margaret,Stephen
129,Ana,Eduardo
130,Kelsey,Edward
131,Alicia,Alan
132,Lindsey,Maxwell
133,Alexia,Collin
134,Cheyenne,Nicolas
135,Jillian,Colton
136,Daisy,Gage
137,Sabrina,Grant
138,Mikayla,George
139,Ashlyn,Spencer
140,Cassandra,Jeffrey
141,Karen,Brendan
142,Caitlin,Brady
143,Gianna,Dalton
144,Skylar,Shane
145,Nevaeh,Cristian
146,Lizbeth,Peter
147,Tiffany,Francisco
148,Natalia,Ricardo
149,Mckenzie,Derek
150,Cassidy,Alexis
151,Sophie,Omar
152,Angelica,Josiah
153,Summer,Conner
154,Kylee,Preston
155,Jordyn,Jalen
156,Kendall,Shawn
157,Juliana,Fernando
158,Miranda,Erik
159,Erica,Travis
160,Caitlyn,Devon
161,Kate,Javier
162,Bianca,Max
163,Naomi,Damian
164,Abby,Jonah
165,Kyla,Bradley
166,Crystal,Cooper
167,Rylee,Levi
168,Alondra,Mario
169,Karina,Cesar
170,Jamie,Braden
171,Valerie,Andres
172,Hope,Edgar
173,Kiara,Micah
174,Hayley,Manuel
175,Delaney,Nolan
176,Chelsea,Donovan
177,Veronica,Giovanni
178,Erika,Johnathan
179,Karla,Trenton
180,Giselle,Edwin
181,Amaya,Colby
182,Charlotte,Emmanuel
183,Carly,Clayton
184,Aubrey,Wesley
185,Valeria,Gregory
186,Julianna,Erick
187,Ellie,Raymond
188,Maggie,Dillon
189,Ruby,Hector
190,Sadie,Sergio
191,Addison,Eli
192,Peyton,Marco
193,Mckenna,Ty
194,Meghan,Malachi
195,Layla,Abraham
196,Jazmin,Mitchell
197,Alejandra,Damien
198,Jasmin,Corey
199,Cynthia,Martin
200,Jayla,Roberto
201,Reagan,Ayden
202,Esmeralda,Taylor
203,Alana,Jaylen
204,Bethany,Dawson
205,Payton,Dominick
206,Heather,Scott
207,Monica,Dustin
208,Nadia,Peyton
209,Brittany,Andre
210,Makenzie,Elias
211,Adrianna,Leonardo
212,Ariel,Harrison
213,Hanna,Josue
214,Eva,Bryson
215,Desiree,Ruben
216,Haylee,Andy
217,Rebekah,Brett
218,Genesis,Jakob
219,Macy,Avery
220,Lucy,Zane
221,Zoey,Cade
222,Elena,Drew
223,Kyra,Calvin
224,Vivian,Pedro
225,Makenna,Griffin
226,Jaden,Alec
227,Shannon,Trey
228,Brenda,Miles
229,Kristen,Malik
230,Mallory,Frank
231,Raven,Skyler
232,Elise,Brody
233,Alison,Phillip
234,Serenity,Xander
235,Diamond,Simon
236,Aliyah,Rafael
237,Michaela,Ronald
238,Asia,Raul
239,Kara,Gerardo
240,Nina,Chance
241,Fatima,Marcos
242,Julie,Trent
243,Jayden,Brock
244,Liliana,Derrick
245,Kailey,Oliver
246,Guadalupe,Israel
247,Savanna,Johnny
248,Jazmine,Enrique
249,Allyson,Jace
250,Laila,Allen
251,Claudia,Keith
252,Joanna,Dante
253,Mariana,Donald
254,Carmen,Camden
255,Serena,Darius
256,Camille,Troy
257,Katelynn,Armando
258,Josephine,Yahir
259,Kendra,Keegan
260,Lindsay,Chandler
261,Holly,Payton
262,Carolina,Jaime
263,Heaven,Casey
264,Kaitlin,Kai
265,Lilly,Kobe
266,Sandra,Brenden
267,Jadyn,Gustavo
268,Selena,Zackary
269,Nancy,Lance
270,Anastasia,Angelo
271,Cecilia,Julio
272,Cindy,Fabian
273,Paris,Drake
274,Katrina,Lane
275,Tatiana,Myles
276,Skyler,Brennan
277,Alaina,Alberto
278,April,Jimmy
279,Kirsten,Mathew
280,Tessa,Corbin
281,Miriam,Kameron
282,Perla,Dennis
283,Kathleen,Louis
284,Esther,Jaxon
285,Annika,Leo
286,Wendy,Jerry
287,Kira,Kyler
288,Priscilla,Danny
289,Cierra,Philip
290,Kayleigh,Quinn
291,Brynn,Saul
292,Annabelle,Jonathon
293,Alissa,Emanuel
294,Clara,Roman
295,Cameron,Tucker
296,Brenna,Tyson
297,Tori,Grayson
298,Celeste,Damon
299,Kristina,Pablo
300,Camila,Cayden
301,Bridget,Braxton
302,Yesenia,Tony
303,Melody,Arturo
304,Emilee,Landen
305,Josie,Bryant
306,Kassandra,Darren
307,Patricia,Douglas
308,Eleanor,Jaiden
309,Shayla,Theodore
310,Camryn,Lorenzo
311,Harley,Lukas
312,Reese,Emilio
313,Casey,Zander
314,Ashlynn,Albert
315,Heidi,Larry
316,Aniya,Camron
317,Bella,Randy
318,Allie,Alfredo
319,Bryanna,Santiago
320,Rachael,Cory
321,Natasha,Aden
322,Daniella,Marc
323,Britney,Ezekiel
324,Madeleine,Gary
325,Ashanti,Nickolas
326,Denise,Curtis
327,Shania,Joe
328,Imani,Jayson
329,Paola,Zion
330,Sidney,Braeden
331,Kiana,Mateo
332,Mercedes,Ismael
333,Marisa,Marvin
334,Eliza,Chad
335,Christine,Ernesto
336,Tara,Salvador
337,Annie,Tristen
338,Halle,Esteban
339,Callie,Quentin
340,Dakota,Amir
341,Alayna,Lawrence
342,Eden,Ramon
343,Piper,Russell
344,Ruth,Ali
345,Leila,Jay
346,Nia,Axel
347,Eliana,Brayan
348,Kaylie,Marshall
349,Alivia,Ricky
350,Aniyah,Moises
351,Fiona,Arthur
352,Logan,Nikolas
353,Leilani,Kristopher
354,Yasmin,Carl
355,Talia,Walter
356,Julissa,Micheal
357,Emely,Bailey
358,Rose,Maurice
359,Ashleigh,Reece
360,Hailee,Abel
361,Kiley,Morgan
362,Ayanna,Rodrigo
363,Meredith,Keaton
364,Lesly,Isiah
365,Cristina,Hugo
366,Lauryn,Kayden
367,Nora,Kaiden
368,Sasha,Charlie
369,Jayda,Reese
370,Alexus,Davis
371,Lacey,Maximus
372,Lisa,Jadon
373,Aurora,Orlando
374,Georgia,Jeffery
375,Rylie,Jon
376,Clarissa,Felix
377,Madalyn,Kade
378,Angie,Mekhi
379,Dana,Rodney
380,Stella,Zachariah
381,Anne,Shaun
382,Ashlee,Brent
383,Ciara,Dean
384,Tatum,Dallas
385,Genevieve,Mauricio
386,Kyleigh,Zachery
387,Lexi,Julius
388,Iris,Chris
389,Rosa,Eddie
390,Amari,Tommy
391,Marisol,Hudson
392,Helen,Terry
393,Izabella,Justice
394,Haleigh,Roger
395,Kassidy,Branden
396,Raquel,Graham
397,Alina,Melvin
398,Kamryn,Jamal
399,Brittney,Issac
400,Tiana,Ezra
401,Tabitha,Conor
402,Marina,Quinton
403,Noelle,Kelvin
404,Ivy,Tate
405,Brooklynn,Deandre
406,Sage,Jaylin
407,Viviana,Weston
408,Virginia,Skylar
409,Linda,Adan
410,India,Jessie
411,Hallie,Asher
412,Krystal,Allan
413,Madisyn,Kody
414,Jaiden,Walker
415,Skye,Holden
416,Anahi,Jarrett
417,Paulina,Tyrese
418,Kristin,Harley
419,Tania,Amari
420,Deanna,Beau
421,Francesca,Elliot
422,Gloria,Nelson
423,Elisabeth,Declan
424,Jenny,Craig
425,Amya,Rylan
426,Malia,Billy
427,Jane,Jaylon
428,Madyson,Guillermo
429,Teresa,Bennett
430,Carolyn,Brendon
431,Alice,Emiliano
432,Nayeli,Frederick
433,Cora,Nasir
434,Baylee,Toby
435,Itzel,Uriel
436,Phoebe,Sam
437,Ainsley,Dane
438,Laci,Kristian
439,Alisha,Jermaine
440,Kaitlynn,Sawyer
441,Krista,Zackery
442,Kaylin,Roy
443,Kiera,Jude
444,Alyson,Rene
445,Whitney,Felipe
446,Dominique,Javon
447,Pamela,Silas
448,Regan,Steve
449,Ellen,Dorian
450,Kaleigh,Trevon
451,Justice,Bobby
452,Renee,Joaquin
453,Taryn,Willie
454,Emilie,Desmond
455,Karissa,Demetrius
456,Samara,Jaheim
457,Monique,Terrance
458,Tamia,Reid
459,Valentina,Quincy
460,Elaina,Jonas
461,Carissa,Khalil
462,Carla,Osvaldo
463,Cheyanne,Luca
464,Sarai,Kolby
465,Gina,Ahmad
466,Gillian,Franklin
467,Macie,Nathanael
468,Jaqueline,Tomas
469,Martha,Marquis
470,Mckayla,Noe
471,Destinee,Johnathon
472,Ashton,Damion
473,Abbey,Reginald
474,Joselyn,Gerald
475,Lucia,Jaydon
476,Cadence,Kendrick
477,Jessie,Kenny
478,Nyla,Blaine
479,Ryleigh,Clay
480,Yasmine,Devan
481,Anika,Jamari
482,Tia,Terrell
483,Isabela,Noel
484,Janelle,Pierce
485,Kiersten,Cyrus
486,Miracle,Bruce
487,Ryan,Malcolm
488,Anya,Adolfo
489,Hailie,Rogelio
490,Dulce,Easton
491,Meagan,Moses
492,Alanna,Byron
493,Kailee,Warren
494,Joy,Joey
495,Kaley,Solomon
496,Liberty,Trace
497,Fernanda,Leon
498,Tamara,Rodolfo
499,Lana,Tobias
500,Susan,Kendall
501,Dylan,Gilberto
502,Marie,Dayton
503,Cara,Maximilian
504,Lena,Rohan
505,Katlyn,Davion
506,Trista,Jair
507,Deja,Mohamed
508,Janet,Deven
509,Ximena,Reed
510,America,Elliott
511,Gisselle,Alvin
512,Maddison,Caiden
513,Marlene,Jasper
514,Emilia,Deshawn
515,Abbigail,Wilson
516,Precious,Braydon
517,Elisa,Todd
518,Larissa,Francis
519,Johanna,Marlon
520,Jimena,Kadin
521,Helena,Alfonso
522,Mayra,Triston
523,Sharon,Darian
524,Athena,Harry
525,Abbie,Leonel
526,Carley,Gael
527,Willow,Randall
528,Nataly,Ben
529,Charity,Omarion
530,Estrella,Terrence
531,Jacquelyn,Jaxson
532,Kasey,Octavio
533,Madilyn,Alonzo
534,Kierra,Tristin
535,Jaelyn,Will
536,Aileen,Jayce
537,Araceli,Ahmed
538,Angelique,Kieran
539,Anaya,Addison
540,Kaya,Ramiro
541,Madelynn,Izaiah
542,Raegan,Cedric
543,Simone,Duncan
544,Julianne,Ronnie
545,Marilyn,Tyrone
546,Mikaela,Jamie
547,Cassie,Jerome
548,Janiya,Alvaro
549,Sydnee,Lincoln
550,Sylvia,Dale
551,Maci,Tyrell
552,Ann,Rolando
553,Eve,Stanley
554,Kailyn,Amarion
555,Sonia,Tyree
556,Elle,Jameson
557,Lilian,Lee
558,Carlie,Wade
559,Laney,Leonard
560,Macey,Brennen
561,Maritza,Darrell
562,Aspen,Orion
563,Janae,Phoenix
564,Kali,Jordon
565,Maia,Mohammad
566,Tess,Coby
567,Theresa,Ezequiel
568,Reyna,Rudy
569,Lila,Aldo
570,Hayden,Johan
571,Lorena,River
572,Kaila,Ariel
573,Lexie,Everett
574,Marley,Kellen
575,Aracely,Neil
576,Melany,Eugene
577,Aimee,Efrain
578,Luz,Isaias
579,Rhiannon,Keenan
580,Arielle,Wayne
581,Irene,Jaquan
582,Kenya,Maddox
583,Nathalie,Ross
584,Haylie,Davin
585,Harmony,Jamison
586,Jazlyn,Cristopher
587,Violet,Gunnar
588,Isis,Maximiliano
589,Jaclyn,Coleman
590,Janessa,Davon
591,Justine,Vicente
592,Brielle,Grady
593,Haven,Jairo
594,Daphne,Colten
595,Kelsie,Donte
596,Alessandra,Ernest
597,Gwendolyn,Gilbert
598,Arely,Cruz
599,Tyler,Moshe
600,Brandy,Nehemiah
601,Yadira,Camren
602,Tanya,Sage
603,Juliet,Keshawn
604,Lesley,Mohammed
605,Tiara,Dominik
606,Brandi,Titus
607,Frances,Freddy
608,Zoie,Quintin
609,Melina,Dwayne
610,Jaida,Garret
611,Delilah,Harold
612,Kaelyn,Ibrahim
613,Bailee,Anderson
614,Barbara,Brice
615,Lola,Kolton
616,Tianna,Elisha
617,Mariela,Karson
618,Noemi,Ray
619,Kaia,Layne
620,Colleen,Jabari
621,Keira,Jett
622,Shyanne,Omari
623,Thalia,Koby
624,Felicity,Dominique
625,Skyla,Humberto
626,Teagan,Rowan
627,Yazmin,Kamron
628,Regina,Nathanial
629,Elaine,Darien
630,Judith,Gunner
631,Aisha,Devyn
632,Deborah,Sterling
633,Lillie,Irvin
634,Rebeca,Jaron
635,Adrienne,Keagan
636,Alma,Keon
637,Savanah,Kole
638,Clare,Julien
639,Mara,Lewis
640,Aubree,Mike
641,Sienna,Romeo
642,Kennedi,Ulises
643,Karlee,Antoine
644,Maeve,Jamarion
645,Jaylin,Rory
646,Mollie,Porter
647,Zaria,Agustin
648,Frida,Junior
649,Halie,Aron
650,Kaylyn,Elmer
651,Mariam,Judah
652,Amara,Muhammad
653,Celia,Ryder
654,Tatyana,August
655,Cristal,Asa
656,Laurel,Gianni
657,Presley,Markus
658,Adeline,Alijah
659,Jamya,Finn
660,Kenzie,Ralph
661,Aria,Dashawn
662,Carina,Jaeden
663,Rosemary,Kareem
664,Alena,Karl
665,Stacy,Rocco
666,Lia,Ari
667,Shaniya,Giancarlo
668,Esperanza,Dillan
669,Lea,Alonso
670,Ally,Glenn
671,Quinn,Rashad
672,Taliyah,Darnell
673,Emmalee,Devonte
674,Dayana,Greyson
675,Hana,Alexzander
676,Corinne,Brodie
677,Edith,Emmett
678,Lyric,Gideon
679,Eileen,Garrison
680,Carlee,Keyshawn
681,Hazel,Sidney
682,Stephany,Cullen
683,Jazmyn,Ignacio
684,Taniya,Gannon
685,Ansley,Rhett
686,Princess,Estevan
687,Breana,Gaven
688,Chelsey,Jamar
689,Felicia,Darryl
690,Leticia,Draven
691,Tina,Marquise
692,Jolie,Zechariah
693,Kayley,Santos
694,Salma,Elvis
695,Greta,Kane
696,Karlie,Alfred
697,Katharine,Stefan
698,Nya,Josh
699,Alisa,Rigoberto
700,Amira,Derick
701,Ingrid,Salvatore
702,Hadley,Xzavier
703,Juliette,Armani
704,Kendal,Brooks
705,Tyra,Jean
706,Micah,Donavan
707,Ayana,German
708,Blanca,Nigel
709,Amani,Emerson
710,Annabella,Abram
711,Keely,Alessandro
712,Penelope,Conrad
713,Dayanara,Kenyon
714,Leanna,Misael
715,Lizeth,Clarence
716,Myah,Gavyn
717,Mattie,Yair
718,Annalise,Howard
719,Giovanna,Sincere
720,Paula,Giovanny
721,Jalyn,Heath
722,Janiyah,Aditya
723,Tayler,Deon
724,Toni,Daquan
725,Jenifer,Anton
726,Brisa,Blaze
727,Cayla,Clinton
728,Chasity,Raphael
729,Jewel,Alden
730,Abigayle,Jaylan
731,Liana,Jefferson
732,Aiyana,Maverick
733,Elsa,Roland
734,Elyse,Antony
735,Kaylynn,Seamus
736,Lara,Hamza
737,Anissa,Baby
738,Antonia,Kurt
739,Aryanna,Matteo
740,Carrie,Talon
741,Joyce,Aydan
742,Lisbeth,Isai
743,Evelin,Milton
744,Micaela,Vance
745,Candace,Adrien
746,Cecelia,Aryan
747,Shakira,Jorden
748,Nichole,Oswaldo
749,Ebony,Roderick
750,Essence,Demarcus
751,Kayli,Zakary
752,Dalia,Lamar
753,Annette,Nico
754,Gia,Cale
755,Marianna,Geoffrey
756,Stacey,Ronaldo
757,Catalina,Gordon
758,Joana,Braiden
759,Scarlett,Jarod
760,Shaylee,Jacoby
761,Meadow,Darion
762,Taniyah,Reuben
763,Lilliana,Ronan
764,Alize,Darin
765,Devon,Keyon
766,Emerson,Jovan
767,Hunter,Semaj
768,Karli,Sheldon
769,Aliya,Sonny
770,Donna,Jagger
771,Chaya,Haden
772,Jakayla,Arjun
773,Kaliyah,Marcel
774,Yvette,Pranav
775,Desirae,Brycen
776,Kelli,Justus
777,Aleah,Keven
778,Shea,Korbin
779,Cali,Korey
780,Joslyn,Tariq
781,Maura,Travon
782,Gretchen,Bruno
783,Shayna,Dandre
784,Iliana,Guadalupe
785,London,Jovani
786,Shreya,Leroy
787,Sydni,Quinten
788,Ericka,Shamar
789,Jaylynn,Cornelius
790,Noelia,Konner
791,Ryann,Bernard
792,Samira,Chaz
793,Shirley,Clark
794,Ayla,Dallin
795,Devin,Milo
796,Kenia,Domenic
797,Abigale,Jordy
798,Parker,Norman
799,Sanaa,Vaughn
800,Celine,Alexandro
801,Danna,Samir
802,Galilea,Blaise
803,Kaylah,Ean
804,Shyann,Javion
805,Casandra,Maximillian
806,Kathy,Sammy
807,Kaiya,Stephan
808,Raina,Brad
809,Moriah,Braedon
810,Lacie,Damarion
811,Montana,Frankie
812,Nikki,Jahir
813,Nyah,Lawson
814,Yuliana,Reynaldo
815,Amiya,Hassan
816,Karly,Irving
817,Kianna,Jakobe
818,Norah,Jovany
819,Sheila,Lamont
820,Tracy,Perry
821,Kenna,Remington
822,Christian,Arnold
823,Kya,Chaim
824,Makena,Darrius
825,Johana,Tristian
826,Lacy,Adriel
827,Maliyah,Fredrick
828,Sandy,Adonis
829,Monserrat,Andreas
830,Savana,Ellis
831,Kacie,Simeon
832,Kasandra,Tylor
833,Rayna,Dario
834,Yahaira,Denzel
835,Dorothy,Houston
836,Katarina,Brenton
837,Litzy,Dimitri
838,Lizette,Jarrod
839,Aliza,Keanu
840,Damaris,Gonzalo
841,Karley,Tyshawn
842,Maribel,Waylon
843,Areli,Kevon
844,Jasmyn,Shannon
845,Margarita,Barrett
846,Jacey,Rylee
847,Jaidyn,Shea
848,Madisen,Zaire
849,Arlene,Gaige
850,Aubrie,Jarred
851,Alysa,Maxim
852,Elissa,Augustus
853,Bria,Kelton
854,Carli,Nick
855,Devyn,Marques
856,Marlee,Prince
857,Jaycee,Dexter
858,Annabel,Dion
859,Berenice,Nikhil
860,Jaylene,Santino
861,Paloma,Antwan
862,Carson,Dangelo
863,Ciera,Gino
864,Miah,Jamel
865,Ashly,Raymundo
866,Amina,Reagan
867,Estefania,Barry
868,Patience,Earl
869,Abagail,Kian
870,Brianne,Konnor
871,Carol,Darwin
872,Giana,Enzo
873,Graciela,Jahiem
874,Kadence,Jaren
875,Madalynn,Reilly
876,Reilly,Winston
877,Susana,Cortez
878,Alia,Forrest
879,Jaliyah,Deonte
880,Lexus,Hugh
881,Mireya,Kylan
882,Amelie,Luciano
883,Destiney,Kent
884,Sky,Cannon
885,Yoselin,Jan
886,Ashtyn,London
887,Rocio,Malakai
888,Calista,Abdullah
889,Camilla,Jarvis
890,Luna,Nathen
891,Destini,Nestor
892,Tierra,Zain
893,Yareli,Dylon
894,Belen,Josef
895,Nicolette,Layton
896,Christa,Shayne
897,Sydnie,Ethen
898,Jaime,Jadyn
899,Jalynn,Kamari
900,Journey,Heriberto
901,Rachelle,Kaeden
902,Reina,Marcelo
903,Joelle,Marquez
904,Katelin,Savion
905,Lyndsey,Carlo
906,Kallie,Kale
907,Magdalena,Treyton
908,Robyn,Bo
909,Amiyah,Darrion
910,Tamya,Efren
911,Christiana,Thaddeus
912,Jackeline,Zack
913,Sherlyn,Bradyn
914,Campbell,Deangelo
915,Isabell,Rex
916,Natalee,Stone
917,Sarahi,Jovanni
918,Marlen,Jovanny
919,Saige,Trever
920,Candice,Valentin
921,Elyssa,Isaak
922,Libby,Yosef
923,Armani,Elian
924,Robin,Jamir
925,Jailyn,Syed
926,Kellie,Darrin
927,Kourtney,Dwight
928,Lainey,Javen
929,Nyasia,Niko
930,Angeles,Terence
931,Kayden,Tre
932,Makaila,Cael
933,Aryana,Cristobal
934,Beatriz,Pierre
935,Bridgette,Broderick
936,Dasia,Cason
937,Diane,Clifford
938,Lucille,Daryl
939,Karyme,Giovani
940,Lina,Ryker
941,Hayleigh,Amos
942,Shawna,Austen
943,Taya,Paxton
944,Myra,Alexandre
945,Bonnie,Clifton
946,Delia,Cordell
947,Denisse,Guy
948,Natalya,Rey
949,Abril,Sabastian
950,Arly,Vernon
951,Fabiola,Khalid
952,Jaylyn,Latrell
953,Mandy,Mathias
954,Anita,Stephon
955,Baby,Bret
956,Janice,Destin
957,Rowan,Ervin
958,Alexys,Sullivan
959,Brionna,Dontae
960,Brook,Eliezer
961,Christy,Kennedy
962,Keyla,Kurtis
963,Sariah,Soren
964,Tristen,Kory
965,Trisha,Mordechai
966,Saniya,Stuart
967,Citlali,Fidel
968,Kaci,Zavier
969,Roselyn,Cash
970,Vanesa,Glen
971,Breonna,Mikel
972,Loren,Cristofer
973,Silvia,Jase
974,Miya,Menachem
975,Selina,Bernardo
976,Sonya,Campbell
977,Yaritza,Freddie
978,Asha,Jamil
979,Iyanna,Deshaun
980,Mira,Nash
981,Phoenix,Trystan
982,Bryana,Rahul
983,Laisha,Benito
984,Alani,Benny
985,Jacklyn,Bridger
986,Kacey,Elvin
987,Kaydence,Justyn
988,Kinsey,Kasey
989,Rory,Matthias
990,Amaris,Ryland
991,Anais,Yusuf
992,Katerina,Coy
993,Katy,Fletcher
994,Kaylen,Kyree
995,Priscila,Rocky
996,Reanna,Trevion
997,Alexandrea,Truman
998,Caleigh,Yehuda
999,Angeline,Zaid
1000,Anjali,Zayne`.split(`
`).slice(1).flatMap(e=>{let[,t,n]=e.split(`,`);return[t?.trim(),n?.trim()].filter(e=>!!e)});function Tc(e,t,n=es){let r=wc.filter(t=>t.toLowerCase()!==e.toLowerCase()),i=[];for(let e=0;e<t;e++){let e=Math.floor(n()*r.length);i.push(r[e]),r.splice(e,1)}return i}var Ec=[{name:`The Parlour`,min:0,accent:`#8fbf7a`,card:{face:`linear-gradient(160deg, #1d6b38, #0f3d20)`,frame:`#fff`,motif:`repeating-linear-gradient(45deg, rgb(255 255 255 / 50%) 0 1px, transparent 1px 9px)`,motifAlpha:`0.10`,oval:`rgb(255 255 255 / 16%)`,ink:`#f2e9c9`,fg:`#fff`}},{name:`Velvet Room`,min:300,accent:`#b06ac4`,card:{face:`radial-gradient(ellipse at 50% 28%, #7a3a92 0%, #4b1f5e 55%, #2c0f3a 100%)`,frame:`linear-gradient(160deg, #f3e6f7, #c9a6d6)`,motif:`radial-gradient(circle at 50% 50%, rgb(255 255 255 / 55%) 1px, transparent 1.6px) 0 0 / 14px 14px`,motifAlpha:`0.18`,oval:`rgb(255 255 255 / 20%)`,ink:`#e9c6f5`,fg:`#fff`}},{name:`Gilded Hall`,min:600,accent:`#e0b44a`,card:{face:`linear-gradient(160deg, #1b1710, #0b0906)`,frame:`linear-gradient(140deg, #f6e3a1 0%, #e0b44a 30%, #8a6a20 55%, #e0b44a 80%, #f6e3a1 100%)`,motif:`repeating-conic-gradient(from 45deg, rgb(224 180 74 / 60%) 0deg 4deg, transparent 4deg 12deg)`,motifAlpha:`0.12`,oval:`rgb(224 180 74 / 35%)`,ink:`#e0b44a`,fg:`#f6eddc`}},{name:`Crown Court`,min:900,accent:`#5aa9e6`,card:{face:`linear-gradient(160deg, #1e3f7a, #0c1c3e)`,frame:`linear-gradient(160deg, #fff, #b9c6d8)`,motif:`repeating-linear-gradient(60deg, rgb(255 255 255 / 50%) 0 2px, transparent 2px 14px)`,motifAlpha:`0.14`,oval:`rgb(255 255 255 / 22%)`,ink:`#cfe0ff`,fg:`#fff`}},{name:`Royal Vault`,min:1200,accent:`#e2744a`,card:{face:`linear-gradient(160deg, #4a1220, #1a0a10)`,frame:`linear-gradient(140deg, #cfd6dd 0%, #7d8894 40%, #40484f 60%, #a9b3bd 100%)`,motif:`repeating-radial-gradient(circle at 50% 50%, rgb(226 116 74 / 70%) 0 1px, transparent 1px 10px)`,motifAlpha:`0.20`,oval:`rgb(226 116 74 / 30%)`,ink:`#e2744a`,fg:`#f7e9e4`}},{name:`Sovereign's Table`,min:1500,accent:`#f2f0e6`,card:{face:`linear-gradient(160deg, #fdfbf3, #e7dfc9)`,frame:`linear-gradient(140deg, #fff6cf 0%, #e0b44a 35%, #9a7524 55%, #e0b44a 75%, #fff6cf 100%)`,motif:`repeating-conic-gradient(from 0deg, rgb(154 117 36 / 70%) 0deg 2deg, transparent 2deg 9deg)`,motifAlpha:`0.16`,oval:`rgb(154 117 36 / 35%)`,ink:`#9a7524`,fg:`#241d0c`,good:`#1f7a34`,bad:`#b3261e`,sheen:!0}}],Dc=()=>({trophies:0,best:0,wins:0,losses:0,version:1});function Oc(e){return Ec.reduce((t,n)=>e>=n.min?n:t,Ec[0])}function kc(e){return{"--card-face":e.card.face,"--card-frame":e.card.frame,"--card-motif":e.card.motif,"--card-motif-alpha":e.card.motifAlpha,"--card-oval":e.card.oval,"--card-ink":e.card.ink,"--card-fg":e.card.fg,"--card-good":e.card.good??`#7ddc8a`,"--card-bad":e.card.bad??`#e58a8a`}}var Ac=`ranked_profile`,jc=`ranked_name`,Q=z(Dc());async function Mc(){let{value:e}=await uc.get({key:Ac});if(e)try{Q.value={...Dc(),...JSON.parse(e)}}catch{Q.value=Dc()}return Q.value}async function Nc(e){Q.value=e,await uc.set({key:Ac,value:JSON.stringify(e)})}var Pc=z(``);async function Fc(){let{value:e}=await uc.get({key:jc});return Pc.value=e??``,Pc.value}async function Ic(e){let t;try{t=await fetch(`${Sc}/name`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify({device_id:dc,name:e})})}catch{return`unreachable`}if(t.status===409)return`taken`;if(t.status===400)return`invalid`;if(!t.ok)return`unreachable`;let n=await t.json().catch(()=>null);return n?.name?(Pc.value=n.name,await uc.set({key:jc,value:n.name}),`claimed`):`unreachable`}var Lc=Sc;async function Rc(){if(!Lc)return null;try{let e=await fetch(`${Lc}/me?device_id=${encodeURIComponent(dc)}`);return e.ok?await e.json():null}catch{return null}}async function zc(e,t){let n=await fetch(`${Lc}${e}`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`${e} ${n.status}`);return n.json()}async function Bc(e){if(!Lc)throw Error(`no match server configured`);let{token:t}=await zc(`/session`,{device_id:dc}),{match_id:n}=await zc(`/match`,{device_id:dc,name:e,token:t}),r=new WebSocket(`${Lc.replace(/^http/,`ws`)}/match/${n}/ws?device_id=${encodeURIComponent(dc)}&token=${encodeURIComponent(t)}`),i=z(null),a=z(null),o=z(!1);return r.addEventListener(`message`,e=>{let t=JSON.parse(e.data);t.t===`state`&&(i.value=t.state),t.t===`result`&&(a.value=t)}),r.addEventListener(`close`,()=>o.value=!0),await new Promise((e,t)=>{if(r.readyState===WebSocket.OPEN)return e();r.addEventListener(`open`,()=>e(),{once:!0}),r.addEventListener(`error`,()=>t(Error(`socket failed`)),{once:!0})}),{state:i,result:a,closed:o,send(e){r.readyState===WebSocket.OPEN&&r.send(JSON.stringify(e))},close(){r.close()}}}var Vc=800,Hc=1500;function Uc(){let e=z(null),t=z(`lobby`),n=z(``),r=z(4),i=z(`casual`),a=z(null),o=null,s=null,c=!1,l=z(localStorage.getItem(`uno_instant_cpu`)===`true`),u=null,d=0;function f(n){e.value=n,t.value=`playing`,d=Date.now(),a.value=null,Cc({event:`started`,players:n.players.length,mode:i.value,trophies:Q.value.trophies}),D(n)}function p(e){t.value=`game_over`;let n=e.finished[0]===0;Cc({event:`finished`,players:e.players.length,winner:n?`human`:`ai`,duration_s:Math.round((Date.now()-d)/1e3),mode:i.value,trophies:Q.value.trophies})}async function m(e){if(c){await Nc({...Q.value,trophies:e.trophies,best:Math.max(Q.value.best,e.trophies),losses:Q.value.losses+1}),v();return}a.value={profile:{...Q.value,trophies:e.trophies,best:Math.max(Q.value.best,e.trophies)},delta:e.delta,promoted:e.promoted?Ec.find(t=>t.name===e.promoted)??null:null,floored:e.floored},t.value=`game_over`,await Nc({...Q.value,trophies:e.trophies,best:Math.max(Q.value.best,e.trophies),wins:Q.value.wins+(e.won?1:0),losses:Q.value.losses+(e.won?0:1)}),Cc({event:`finished`,players:2,winner:e.won?`human`:`ai`,duration_s:Math.round((Date.now()-d)/1e3),mode:`ranked`,trophies:e.trophies})}async function h(){let e=await Rc();!e||e.trophies===Q.value.trophies||await Nc({...Q.value,trophies:e.trophies,best:Math.max(Q.value.best,e.trophies)})}async function g(n){let l=await Bc(n);o=l,c=!1,i.value=`ranked`,r.value=2,a.value=null,d=Date.now(),Cc({event:`started`,players:2,mode:`ranked`,trophies:Q.value.trophies}),s=An([l.state,l.result],([t,n])=>{t&&(e.value=t),n&&m(n)},{immediate:!0}),t.value=`playing`}function _(e){if(o){if(e&&!a.value){c=!0,o.send({t:`resign`}),setTimeout(()=>{c&&h().finally(v)},2e3);return}v()}}function v(){c=!1,o?.close(),o=null,s?.(),s=null}function y(e,t){return _s(e,t,{aiNames:Tc(e,t-1)})}async function b(e,t,a=`casual`){if(n.value=e,i.value=a,r.value=a===`ranked`?2:t,a===`ranked`)return g(e);f(y(e,t))}function x(){u&&clearTimeout(u),_(t.value===`playing`),e.value=null,t.value=`lobby`}async function S(){if(u&&clearTimeout(u),_(t.value===`playing`),i.value===`ranked`)return g(n.value);f(y(n.value,r.value))}function C(t,n){if(o)return o.send({t:`play`,cardIndex:t,color:n??null});if(!e.value)return;let r=vs(e.value,0,t,n);r.ok&&(e.value=r.state,r.state.phase===`game_over`&&p(r.state),D(r.state))}function w(){if(o)return o.send({t:`draw`}),null;if(!e.value)return null;let t=ys(e.value,0);if(t.ok){e.value=t.state;let n=Yo(t.state);if(n&&ds(t.drawnCard,n))return D(t.state),t.drawnCard;{let n=xs(t.state,0);return n.ok&&(e.value=n.state,D(n.state)),t.drawnCard}}return null}function T(){if(o)return o.send({t:`one`});if(!e.value)return;let t=bs(e.value,0);t.ok&&(e.value=t.state)}function E(t,n){if(o||!e.value)return;let r=e.value,i=r.players[0].hand;if(t>=0&&t<i.length&&n>=0&&n<i.length){let a=i[t],o=[...i.slice(0,t),...i.slice(t+1)];o.splice(n,0,a),e.value=Xo(r,0,e=>({...e,hand:o}))}}function D(e){if(u&&clearTimeout(u),e.phase===`playing`&&e.players[e.currentPlayer].type===`ai`){let e=l.value?0:Vc+Math.floor(Math.random()*(Hc-Vc));u=setTimeout(()=>O(),e)}}function O(){if(!e.value)return;let t=Fs(e.value,e.value.currentPlayer);e.value=t,t.phase===`game_over`&&p(t),D(t)}return{gameState:e,phase:t,playerName:n,mode:i,lastRanked:a,startGame:b,restartGame:S,quitToLobby:x,playCard:C,drawCard:w,sayUno:T,reorderHand:E,instantCpu:l,syncFromServer:h,setInstantCpu(e){l.value=e,localStorage.setItem(`uno_instant_cpu`,String(e))}}}var Wc=[`aria-checked`,`tabindex`,`onClick`],Gc=Zn({__name:`SegmentedPicker`,props:{modelValue:{},options:{}},emits:[`update:modelValue`],setup(e,{emit:t}){let n=e,r=t,i=Z(()=>n.options.indexOf(n.modelValue));function a(e){let t=e.key===`ArrowRight`||e.key===`ArrowUp`?1:e.key===`ArrowLeft`||e.key===`ArrowDown`?-1:0;if(!t)return;e.preventDefault();let a=n.options[Math.max(0,Math.min(n.options.length-1,i.value+t))];r(`update:modelValue`,a)}return(t,n)=>(G(),K(`div`,{class:`segmented`,role:`radiogroup`,style:M({"--count":e.options.length,"--selected":i.value}),onKeydown:a},[n[0]||=q(`span`,{class:`segmented__thumb`,"aria-hidden":`true`},null,-1),(G(!0),K(U,null,Sr(e.options,t=>(G(),K(`button`,{key:t,type:`button`,role:`radio`,class:N([`segmented__option`,{"segmented__option--selected":t===e.modelValue}]),"aria-checked":t===e.modelValue,tabindex:t===e.modelValue?0:-1,onClick:e=>r(`update:modelValue`,t)},P(t),11,Wc))),128))],36))}}),Kc={class:`modal-overlay`},qc={class:`result`},Jc={class:`result__card`},Yc={key:0,class:`result__sheen`},Xc={class:`result__title`},Zc={class:`result__room`},Qc={class:`result__total`},$c=Zn({__name:`RankedResultOverlay`,props:{result:{},won:{type:Boolean}},emits:[`playAgain`,`mainMenu`],setup(e,{emit:t}){let n=e,r=t,i=Z(()=>n.result.promoted??Oc(n.result.profile.trophies)),a=Z(()=>Ec.find(e=>e.min>n.result.profile.trophies)??null),o=Z(()=>kc(i.value));return(t,n)=>(G(),K(`div`,Kc,[q(`div`,qc,[q(`div`,{class:`result__frame`,style:M(o.value)},[q(`div`,Jc,[n[2]||=q(`span`,{class:`result__motif`},null,-1),n[3]||=q(`span`,{class:`result__oval`},null,-1),i.value.card.sheen?(G(),K(`span`,Yc)):Y(``,!0),n[4]||=q(`span`,{class:`result__corner result__corner--tl`},`♛`,-1),n[5]||=q(`span`,{class:`result__corner result__corner--br`},`♛`,-1),n[6]||=q(`span`,{class:`result__crown`},`♛`,-1),q(`h2`,Xc,P(e.won?`Victory`:`Defeat`),1),q(`p`,{class:N([`result__delta`,e.won?`result__delta--up`:`result__delta--down`])},P(e.result.delta>=0?`+`:``)+P(e.result.delta)+` ♛ `,3),q(`span`,Zc,P(i.value.name),1),q(`span`,Qc,P(e.result.profile.trophies)+` trophies`,1)])],4),e.result.promoted?(G(),K(`p`,{key:0,class:`result__note result__note--promo`,style:M(o.value)},` Promoted to `+P(e.result.promoted.name)+`! `,5)):e.result.floored?(G(),K(`p`,{key:1,class:`result__note`,style:M(o.value)},P(i.value.name)+` floor held you at `+P(e.result.profile.trophies)+` ♛. `,5)):a.value?(G(),K(`p`,{key:2,class:`result__note`,style:M(o.value)},P(a.value.min-e.result.profile.trophies)+` ♛ to `+P(a.value.name),5)):Y(``,!0),q(`button`,{class:`result__btn`,onClick:n[0]||=e=>r(`playAgain`)},`Next Match`),q(`button`,{class:`result__menu`,onClick:n[1]||=e=>r(`mainMenu`)},`Main Menu`)])]))}}),el=[`draggable`,`data-card-index`],tl={class:`card__corner card__corner--top`},nl={key:0,class:`card__center card__center--reverse`},rl={key:1,class:`card__center card__center--draw`},il={key:2,class:`card__center`},al={class:`card__corner card__corner--bottom`},ol={key:3,class:`card__drawn-star`},sl=Zn({__name:`CardFace`,props:{card:{},index:{},playable:{type:Boolean},disabled:{type:Boolean},draggable:{type:Boolean},direction:{}},emits:[`play`],setup(e,{emit:t}){let n=[`red`,`blue`,`green`,`yellow`],r=e,i=t;function a(e,t){return e===`red`?`card--red`:e===`blue`?`card--blue`:e===`green`?`card--green`:e===`yellow`?`card--yellow`:`card--wild`}function o(){return r.card.reverseTo?r.card.reverseTo===`clockwise`:r.direction?r.direction===`counter_clockwise`:!1}function s(){r.playable&&r.index!=null&&i(`play`,r.index)}return(t,r)=>(G(),K(`div`,{class:N([`card`,a(B(Go)(e.card),B(Wo)(e.card)),e.playable&&`card--playable`,e.disabled&&`card--disabled`]),draggable:e.draggable?`true`:`false`,"data-card-index":e.index,onClick:s},[q(`span`,tl,P(B(Ko)(e.card)),1),e.card.value===`reverse`?(G(),K(`span`,nl,P(o()?`↻`:`↺`),1)):B(qo)(e.card)?(G(),K(`span`,rl,[q(`span`,{class:`card__draw-pips`,style:M({"--pip-n":B(qo)(e.card)}),"aria-hidden":`true`},[(G(!0),K(U,null,Sr(B(qo)(e.card),t=>(G(),K(`span`,{key:t,class:N([`card__draw-pip`,B(Wo)(e.card)&&`card__draw-pip--${n[t-1]}`]),style:M({"--pip-i":t-1})},null,6))),128))],4)])):(G(),K(`span`,il,P(B(Ko)(e.card)),1)),q(`span`,al,P(B(Ko)(e.card)),1),r[0]||=q(`div`,{class:`card__oval`},null,-1),e.card.drawn?(G(),K(`span`,ol,`★`)):Y(``,!0)],10,el))}}),cl={class:`ai-hand__label`},ll={class:`ai-hand__name`},ul={class:`ai-hand__count`},dl={key:0,class:`ai-hand__target-badge`},fl=Zn({__name:`AiHand`,props:{player:{},position:{},isCurrent:{type:Boolean},isTarget:{type:Boolean}},setup(e){let t=e,n=()=>cs(t.player),r=()=>Math.min(n(),10);return(t,i)=>(G(),K(`div`,{class:N([`ai-hand`,`ai-hand--${e.position}`,e.isCurrent&&`ai-hand--active`,e.isTarget&&`ai-hand--target`])},[q(`div`,cl,[q(`span`,ll,P(e.player.name),1),q(`span`,ul,P(n())+` cards`,1),e.isTarget?(G(),K(`span`,dl,`your target`)):Y(``,!0)]),q(`div`,{class:N([`ai-hand__cards`,`ai-hand__cards--${e.position}`])},[(G(!0),K(U,null,Sr(r(),t=>(G(),K(`div`,{key:t,class:N([`card`,`card--back`,`card--small`,`ai-card--${e.position}`]),style:M(`--card-index: ${t-1}; --card-total: ${r()};`)},[...i[0]||=[q(`span`,{class:`card__uno-text card__uno-text--small`},`♛`,-1)]],6))),128))],2)],2))}}),pl=[`data-value`,`data-color`,`data-last-player`],ml={class:`card__corner card__corner--top`},hl={key:0,class:`card__center card__center--large card__center--reverse`},gl={key:1,class:`card__center card__center--large card__center--draw`},_l={key:2,class:`card__center card__center--large`},vl={class:`card__corner card__corner--bottom`},yl=Zn({__name:`DiscardPile`,props:{card:{},lastPlayer:{}},setup(e){let t=[`red`,`blue`,`green`,`yellow`];function n(e,t){return e===`red`?`card--red`:e===`blue`?`card--blue`:e===`green`?`card--green`:e===`yellow`?`card--yellow`:`card--wild`}return(r,i)=>(G(),K(`div`,{id:`discard-top`,class:N([`card`,`card--large`,n(B(Go)(e.card),B(Wo)(e.card))]),"data-value":B(Ko)(e.card),"data-color":B(Go)(e.card)||``,"data-last-player":e.lastPlayer??-1},[q(`span`,ml,P(B(Ko)(e.card)),1),e.card.value===`reverse`?(G(),K(`span`,hl,P(e.card.reverseTo===`clockwise`?`↻`:`↺`),1)):B(qo)(e.card)?(G(),K(`span`,gl,[q(`span`,{class:`card__draw-pips`,style:M({"--pip-n":B(qo)(e.card)}),"aria-hidden":`true`},[(G(!0),K(U,null,Sr(B(qo)(e.card),n=>(G(),K(`span`,{key:n,class:N([`card__draw-pip`,B(Wo)(e.card)&&`card__draw-pip--${t[n-1]}`]),style:M({"--pip-i":n-1})},null,6))),128))],4)])):(G(),K(`span`,_l,P(B(Ko)(e.card)),1)),q(`span`,vl,P(B(Ko)(e.card)),1),i[0]||=q(`div`,{class:`card__oval`},null,-1)],10,pl))}}),bl={class:`color-chooser__grid`},xl=Zn({__name:`ColorChooser`,props:{visible:{type:Boolean}},emits:[`choose`,`cancel`],setup(e,{emit:t}){let n=t;return(t,r)=>e.visible?(G(),K(`div`,{key:0,class:`modal-overlay`,onClick:r[5]||=e=>n(`cancel`)},[q(`div`,{class:`color-chooser`,onClick:r[4]||=Lo(()=>{},[`stop`])},[r[6]||=q(`h3`,{class:`color-chooser__title`},`Choose a color`,-1),q(`div`,bl,[q(`button`,{class:`color-btn color-btn--red`,onClick:r[0]||=e=>n(`choose`,`red`)}),q(`button`,{class:`color-btn color-btn--blue`,onClick:r[1]||=e=>n(`choose`,`blue`)}),q(`button`,{class:`color-btn color-btn--green`,onClick:r[2]||=e=>n(`choose`,`green`)}),q(`button`,{class:`color-btn color-btn--yellow`,onClick:r[3]||=e=>n(`choose`,`yellow`)})])])])):Y(``,!0)}}),Sl={class:`top-bar`},Cl={class:`top-bar__status`},wl={key:0,class:`out-toast`},Tl=[`data-direction`,`data-from`,`data-to`],El=[`data-player`],Dl=[`data-player`],Ol={class:`center-area`},kl={class:`center-area__piles`},Al={key:0,class:`recent-plays`},jl={class:`discard-area`},Ml=[`data-player`],Nl={class:`game-table__bottom`},Pl={key:0,class:`your-turn-indicator`},Fl={class:`human-hand__label`},Il={key:0,class:`human-hand__name`},Ll=Zn({__name:`GameBoard`,props:{gameState:{},choosingColor:{type:Boolean},isNewGame:{type:Boolean}},emits:[`playCard`,`drawCard`,`sayUno`,`newGame`,`chooseColor`,`cancelColor`,`reorderHand`,`dealComplete`,`menu`],setup(e,{emit:t}){let n=null,r=null,i=null;function a(){let e=document.getElementById(`direction-arrow`);if(!e)return null;let t=parseInt(e.dataset.from),n=parseInt(e.dataset.to),r=e.closest(`.game-table`);if(!r)return null;let i=r.getBoundingClientRect(),a=window.matchMedia(`(orientation: landscape) and (max-height: 500px)`).matches,o=window.innerWidth<=1100&&!a,s=window.innerWidth<=640||a,c=s?20:35,l=e=>e===0?r.querySelector(`.human-hand__cards`):r.querySelector(`[data-player="${e}"] .ai-hand__cards`),u=o?(e,t)=>{let n=l(e);if(!n)return null;let r=n.closest(`.ai-hand`)||n.closest(`.human-hand`),a=(r||n).getBoundingClientRect(),o=l(t);if(!o)return null;let s=(o.closest(`.ai-hand`)||o.closest(`.human-hand`)||o).getBoundingClientRect();if(e===0){let e=r?.querySelector(`.your-turn-indicator`),t=e?e.getBoundingClientRect():a,n=s.left-i.left+s.width/2;return{x:t.left-i.left+t.width/2,y:t.top-i.top-c,_humanArc:!0,_arcRight:n>i.width/2}}if(t===0){let e=a.left-i.left+a.width/2;return{x:e,y:a.bottom-i.top+c,_humanArc:!0,_arcRight:e>i.width/2}}if(Math.min(a.bottom,s.bottom)-Math.max(a.top,s.top)>Math.min(a.height,s.height)*.5)return{x:a.left-i.left+a.width/2,y:a.bottom-i.top+c,_sameRow:!0};{let e=s.top>a.top;return{x:a.left-i.left+a.width/2,y:e?a.bottom-i.top+c:a.top-i.top-c}}}:(e,t)=>{let n=l(e);if(!n)return null;let r=n.querySelectorAll(`.card`);if(r.length===0)return null;let a=oe(e),o=oe(t);if(a===`bottom`||a===`top`){let e=o===`right`||(a===`bottom`?o===`top`:o===`bottom`),t=(e?r[r.length-1]:r[0]).getBoundingClientRect();return{x:e?t.right-i.left+c:t.left-i.left-c,y:t.top-i.top+t.height/2}}let s=n.closest(`.ai-hand`),u=s.querySelector(`.ai-hand__label`);if(o===`top`&&u){let e=u.getBoundingClientRect();return{x:e.left-i.left+e.width/2,y:e.top-i.top-c}}let d=s.getBoundingClientRect();return{x:d.left-i.left+d.width/2,y:d.bottom-i.top+c}},d=u(t,n),f=u(n,t);if(!d||!f)return null;let p,m,h=s?8:12;if(d._humanArc||f._humanArc){p=d._arcRight||f._arcRight?i.width-h:h;let e=r.querySelector(`.draw-pile`)?.getBoundingClientRect();m=e?e.top-i.top+e.height/2:(d.y+f.y)/2}else if(d._sameRow){let e=(d.x+f.x)/2,t=Math.abs(f.x-d.x);p=e,m=d.y+t*.5}else{let e=i.width/2,t=i.height/2,n=(d.x+f.x)/2,r=(d.y+f.y)/2,a=n-e,o=r-t,c=Math.sqrt(a*a+o*o)||1,l=s?40:80;p=n+a/c*l,m=r+o/c*l}return{sx:d.x,sy:d.y,cpX:p,cpY:m,ex:f.x,ey:f.y}}function o(e){let t=document.getElementById(`arrow-line`),n=document.getElementById(`arrow-head`);if(!t)return;let r=window.matchMedia(`(orientation: landscape) and (max-height: 500px)`).matches,i=window.innerWidth<=640||r,a=i?28:48,o=e.ex-e.cpX,s=e.ey-e.cpY,c=Math.sqrt(o*o+s*s),l=o/c,u=s/c,d=e.ex-l*a,f=e.ey-u*a;if(t.setAttribute(`d`,`M ${e.sx} ${e.sy} Q ${e.cpX} ${e.cpY} ${d} ${f}`),n){let t=i?14:24;n.setAttribute(`points`,`${e.ex-l*a+u*t} ${e.ey-u*a-l*t}, ${e.ex} ${e.ey}, ${e.ex-l*a-u*t} ${e.ey-u*a+l*t}`)}}function s(e,t,n){return{sx:e.sx+(t.sx-e.sx)*n,sy:e.sy+(t.sy-e.sy)*n,cpX:e.cpX+(t.cpX-e.cpX)*n,cpY:e.cpY+(t.cpY-e.cpY)*n,ex:e.ex+(t.ex-e.ex)*n,ey:e.ey+(t.ey-e.ey)*n}}function c(e){i&&=(cancelAnimationFrame(i),null),requestAnimationFrame(()=>{let t=a();if(!t)return;if(!e||!n){o(t),n=t;return}let c=r||n,l=performance.now(),u=e=>{let a=e-l,d=Math.min(a/500,1);r=s(c,t,d<.5?4*d*d*d:1-(-2*d+2)**3/2),o(r),d<1?i=requestAnimationFrame(u):(n=t,r=null,i=null)};i=requestAnimationFrame(u)})}let l=null,u=null,d=null,f=null;function p(e){return`${e.dataset.value||``}${e.dataset.color||``}`}function m(e){let t=e.closest(`.game-table`);if(!t)return null;let n=parseInt(e.dataset.lastPlayer||`-1`,10);if(n===0){let e=Date.now()-(u||0);return l&&e<2e3?l:null}if(n<1)return null;let r=t.querySelector(`[data-player="${n}"] .ai-hand__cards`);if(!r)return null;let i=r.querySelectorAll(`.card`);return i.length===0?null:i[i.length-1].getBoundingClientRect()}function h(e,t,n){let r=n.cloneNode(!0);r.id=``,r.style.cssText=`
    position: fixed; z-index: 50; pointer-events: none;
    left: ${e.left}px; top: ${e.top}px;
    width: ${e.width}px; height: ${e.height}px;
    transition: all 0.35s ease-in-out;
  `,document.body.appendChild(r),requestAnimationFrame(()=>{r.style.left=t.left+`px`,r.style.top=t.top+`px`,r.style.width=t.width+`px`,r.style.height=t.height+`px`}),r.addEventListener(`transitionend`,()=>r.remove()),setTimeout(()=>r.remove(),500)}function g(e){let t=document.getElementById(`discard-top`);if(!t){f=null,l=null,u=null;return}let n=p(t);if(!e||!f){f=n,e||(l=null,u=null);return}if(n!==f){let e=m(t);e&&h(e,t.getBoundingClientRect(),t)}f=n,l=null,u=null}function _(e,t,n){let r=e.getBoundingClientRect();e.style.visibility=`hidden`,e.style.opacity=`0`;let i=document.createElement(`div`);i.style.cssText=`
    position: fixed; z-index: 1000; pointer-events: none;
    left: ${t.left}px; top: ${t.top}px;
    width: ${t.width}px; height: ${t.height}px;
    perspective: 800px;
    transition: left 0.4s ease-in-out, top 0.4s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out;
  `;let a=document.createElement(`div`);a.style.cssText=`
    width: 100%; height: 100%; position: relative;
    transform-style: preserve-3d;
    transition: transform 0.35s ease-in-out;
  `;let o=document.createElement(`div`);o.className=`card card--back`,o.innerHTML=`<span class="card__uno-text">♛</span>`,o.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px;`;let s=e.cloneNode(!0);s.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 10px;`,a.appendChild(o),a.appendChild(s),i.appendChild(a),document.body.appendChild(i),setTimeout(()=>{requestAnimationFrame(()=>{i.style.left=r.left+`px`,i.style.top=r.top+`px`,i.style.width=r.width+`px`,i.style.height=r.height+`px`}),setTimeout(()=>{a.style.transform=`rotateY(180deg)`},400),setTimeout(()=>{i.remove(),e.style.visibility=``,e.style.opacity=``},750)},n)}function v(e,t=1){let n=document.querySelector(`.draw-pile .card`);if(!e||!n||!d)return;if(Date.now()-(d||0)>2e3){d=null;return}let r=Array.from(document.querySelectorAll(`#human-hand-cards [data-card-index]`)).slice(-t);if(r.length===0){d=null;return}let i=n.getBoundingClientRect();r.forEach((e,t)=>{_(e,i,t*200)}),d=null}function y(e){let t=document.querySelector(`.draw-pile .card`);if(!t){e?.();return}let n=t.getBoundingClientRect(),r=Array.from(document.querySelectorAll(`#human-hand-cards [data-card-index]`));if(r.length===0){e?.();return}r.forEach(e=>{e.style.visibility=`hidden`}),requestAnimationFrame(()=>{r.forEach((e,t)=>{let r=e.getBoundingClientRect(),i=t*80,a=document.createElement(`div`);a.style.cssText=`
        position: fixed; z-index: 1000; pointer-events: none;
        left: ${n.left}px; top: ${n.top}px;
        width: ${n.width}px; height: ${n.height}px;
        perspective: 800px;
        transition: left 0.4s ease-in-out, top 0.4s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out;
        transition-delay: ${i}ms;
      `;let o=document.createElement(`div`);o.style.cssText=`
        width: 100%; height: 100%; position: relative;
        transform-style: preserve-3d;
        transition: transform 0.35s ease-in-out;
      `;let s=document.createElement(`div`);s.className=`card card--back`,s.innerHTML=`<span class="card__uno-text">♛</span>`,s.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px;`;let c=e.cloneNode(!0);c.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 10px;`,o.appendChild(s),o.appendChild(c),a.appendChild(o),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.left=r.left+`px`,a.style.top=r.top+`px`,a.style.width=r.width+`px`,a.style.height=r.height+`px`}),setTimeout(()=>{o.style.transform=`rotateY(180deg)`},400+i),setTimeout(()=>{a.remove(),e.style.visibility=``},750+i)});let t=750+(r.length-1)*80+50;setTimeout(()=>e?.(),t)})}function b(e){l=e.getBoundingClientRect(),u=Date.now()}function x(){d=Date.now()}let S=e,C=t,w=Z(()=>S.gameState.players[0]),T=Z(()=>Yo(S.gameState)),E=Z(()=>S.gameState.currentPlayer===0&&S.gameState.phase===`playing`),D=Z(()=>E.value&&T.value?ps(w.value.hand,T.value):[]),O=Z(()=>E.value),ee=Z(()=>S.gameState.phase===`playing`),k=Z(()=>Zo({...S.gameState,currentPlayer:0})),te=Z(()=>S.gameState.currentPlayer),ne=Z(()=>Zo(S.gameState)),A={1:[`top`],2:[`left`,`right`],3:[`left`,`top`,`right`]},re=Z(()=>{let{players:e,finished:t,phase:n}=S.gameState;return e.map((e,t)=>t).filter(e=>e!==0&&(n===`game_over`||!t.includes(e)))}),j=Z(()=>{let e=A[re.value.length]??A[3];return Object.fromEntries(e.map((e,t)=>[e,re.value[t]]))}),ie=z(``),ae=null;An(()=>S.gameState.finished.length,(e,t)=>{if(e<=t||S.gameState.phase===`game_over`)return;let n=S.gameState.finished[e-1];ie.value=`${S.gameState.players[n].name} is out in ${Es(e)}!`,ae&&clearTimeout(ae),ae=setTimeout(()=>ie.value=``,3e3)});function oe(e){return e===0?`bottom`:Object.keys(j.value).find(t=>j.value[t]===e)??`top`}let se=Z(()=>{let e=S.gameState.recentPlays;if(e.length===0)return-1;let t=e[0][0];return S.gameState.players.findIndex(e=>e.name===t)}),ce=!1;fr(()=>{S.isNewGame?(ce=!0,dn(()=>{y(()=>{ce=!1,C(`dealComplete`),c(!1)})})):dn(()=>{c(!1),g(!1)})});let le=()=>c(!1);fr(()=>window.addEventListener(`resize`,le)),gr(()=>window.removeEventListener(`resize`,le)),An(()=>[S.gameState.currentPlayer,S.gameState.direction],()=>{ce||dn(()=>c(!0))}),An(()=>S.gameState.discardPile[0],()=>{ce||dn(()=>g(!0))}),An(()=>S.gameState.players[0]?.hand.length,(e,t)=>{if(!ce&&t!==void 0&&e>t){let n=e-t;d||=Date.now(),dn(()=>v(!0,n))}});function ue(e){let t=document.querySelector(`#human-hand-cards [data-card-index="${e}"]`);t&&b(t),C(`playCard`,e)}function de(){O.value&&(x(),C(`drawCard`))}let fe=null,pe=null;function me(e,t){let n=Array.from(t.querySelectorAll(`[data-card-index]`)),r=null,i=1/0,a=!1;for(let t of n){let n=t.getBoundingClientRect(),o=n.left+n.width/2,s=Math.abs(e-o);s<i&&(i=s,r=t,a=e>=o)}return{closest:r,insertAfter:a}}function he(e,t,n){pe||(pe=document.createElement(`div`),pe.className=`drop-indicator`);let r=e.getBoundingClientRect(),i=t.getBoundingClientRect();pe.style.height=i.height+`px`,pe.style.left=(n?i.right:i.left)-r.left+`px`,pe.style.top=i.top-r.top+`px`,pe.parentElement||e.appendChild(pe)}function ge(){pe&&pe.parentElement&&pe.remove()}function _e(e){let t=e.target.closest(`[data-card-index]`);t&&(fe=parseInt(t.dataset.cardIndex),t.classList.add(`card--dragging`),e.dataTransfer&&(e.dataTransfer.effectAllowed=`move`))}function ve(e){let t=e.target.closest(`[data-card-index]`);t&&t.classList.remove(`card--dragging`),fe=null,ge()}function ye(e){if(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),fe===null)return;let t=e.target.closest(`.human-hand__cards`);if(!t)return;let{closest:n,insertAfter:r}=me(e.clientX,t);n&&he(t,n,r)}function be(e){if(e.preventDefault(),ge(),fe===null)return;let t=e.target.closest(`.human-hand__cards`);if(!t)return;let{closest:n,insertAfter:r}=me(e.clientX,t);if(n){let e=parseInt(n.dataset.cardIndex);r&&(e+=1),fe<e&&--e,fe!==e&&C(`reorderHand`,fe,e)}fe=null}return(t,n)=>(G(),K(U,null,[q(`div`,Sl,[n[5]||=q(`h1`,{class:`top-bar__title`},`Card Royale`,-1),q(`div`,Cl,P(e.gameState.lastAction),1),q(`button`,{class:`top-bar__new-game`,onClick:n[0]||=e=>C(`newGame`)},`New Game`)]),ie.value?(G(),K(`div`,wl,P(ie.value),1)):Y(``,!0),q(`div`,{class:N([`game-table`,`game-table--${e.gameState.direction}`])},[e.gameState.phase===`game_over`?Y(``,!0):(G(),K(`svg`,{key:0,class:`direction-arrow`,id:`direction-arrow`,"data-direction":e.gameState.direction,"data-from":te.value,"data-to":ne.value},[...n[6]||=[q(`defs`,null,[q(`marker`,{id:`arrowhead`,markerWidth:`32`,markerHeight:`28`,refX:`32`,refY:`14`,orient:`auto`,markerUnits:`userSpaceOnUse`},[q(`polygon`,{points:`0 0, 32 14, 0 28`,fill:`white`,opacity:`0.35`})])],-1),q(`path`,{id:`arrow-line`,fill:`none`,stroke:`white`,"stroke-opacity":`0.3`,"stroke-width":`12`},null,-1),q(`polygon`,{id:`arrow-head`,fill:`white`,opacity:`0.35`},null,-1)]],8,Tl)),q(`div`,{class:`game-table__top`,"data-player":j.value.top},[j.value.top==null?Y(``,!0):(G(),Ui(fl,{key:0,player:e.gameState.players[j.value.top],position:`top`,"is-current":e.gameState.currentPlayer===j.value.top,"is-target":k.value===j.value.top},null,8,[`player`,`is-current`,`is-target`]))],8,El),q(`div`,{class:`game-table__left`,"data-player":j.value.left},[j.value.left==null?Y(``,!0):(G(),Ui(fl,{key:0,player:e.gameState.players[j.value.left],position:`left`,"is-current":e.gameState.currentPlayer===j.value.left,"is-target":k.value===j.value.left},null,8,[`player`,`is-current`,`is-target`]))],8,Dl),q(`div`,Ol,[q(`div`,kl,[e.gameState.recentPlays.length>0?(G(),K(`div`,Al,[n[7]||=q(`div`,{class:`recent-plays__label`},`Card Play History`,-1),(G(!0),K(U,null,Sr([...e.gameState.recentPlays].reverse(),([,e],t)=>(G(),K(`div`,{key:t,class:`recent-play`},[J(sl,{card:e,index:-1,playable:!1,disabled:!1,draggable:!1,style:{"--card-index":`0`,"--card-total":`1`}},null,8,[`card`])]))),128))])):Y(``,!0),q(`div`,{id:`draw-pile`,class:N([`draw-pile`,O.value&&`draw-pile--active`]),onClick:de},[...n[8]||=[q(`div`,{class:`card card--back card--large`},[q(`span`,{class:`card__uno-text`},`♛`)],-1)]],2),q(`div`,jl,[T.value?(G(),Ui(yl,{key:0,card:T.value,"last-player":se.value},null,8,[`card`,`last-player`])):Y(``,!0)])]),e.gameState.phase===`game_over`?Y(``,!0):(G(),K(`button`,{key:0,class:`menu-btn`,onClick:n[1]||=e=>C(`menu`)},`Menu`))]),q(`div`,{class:`game-table__right`,"data-player":j.value.right},[j.value.right==null?Y(``,!0):(G(),Ui(fl,{key:0,player:e.gameState.players[j.value.right],position:`right`,"is-current":e.gameState.currentPlayer===j.value.right,"is-target":k.value===j.value.right},null,8,[`player`,`is-current`,`is-target`]))],8,Ml),q(`div`,Nl,[q(`div`,{class:N([`human-hand`,E.value&&`human-hand--active`])},[E.value?(G(),K(`div`,Pl,`It's your turn!`)):Y(``,!0),q(`div`,Fl,[e.gameState.phase===`game_over`?Y(``,!0):(G(),K(`span`,Il,P(w.value.name),1)),ee.value?(G(),K(`button`,{key:1,class:`uno-btn`,onClick:n[2]||=e=>C(`sayUno`)},`ONE!`)):Y(``,!0)]),q(`div`,{id:`human-hand-cards`,class:`human-hand__cards`,onDragstart:_e,onDragend:ve,onDragover:ye,onDrop:be},[(G(!0),K(U,null,Sr(w.value.hand,(t,n)=>(G(),Ui(sl,{key:n,card:t,index:n,playable:D.value.includes(n),draggable:!0,direction:e.gameState.direction,style:M(`--card-index: ${n}; --card-total: ${w.value.hand.length};`),onPlay:ue},null,8,[`card`,`index`,`playable`,`direction`,`style`]))),128))],32)],2)])],2),J(xl,{visible:e.choosingColor,onChoose:n[3]||=e=>C(`chooseColor`,e),onCancel:n[4]||=e=>C(`cancelColor`)},null,8,[`visible`])],64))}}),Rl={class:`modal-overlay`},zl={class:`game-over`},Bl={class:`game-over__title`},Vl={class:`game-over__placements`},Hl=Zn({__name:`GameOverOverlay`,props:{placements:{}},emits:[`playAgain`],setup(e,{emit:t}){let n=t;return(t,r)=>(G(),K(`div`,Rl,[q(`div`,zl,[q(`h2`,Bl,P(e.placements[0])+` wins!`,1),q(`ol`,Vl,[(G(!0),K(U,null,Sr(e.placements,e=>(G(),K(`li`,{key:e},P(e),1))),128))]),q(`button`,{class:`btn-play-again`,onClick:r[0]||=e=>n(`playAgain`)},`Play Again`)])]))}}),Ul=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},Wl={},Gl={class:`card card--back`};function Kl(e,t){return G(),K(`div`,Gl,[...t[0]||=[q(`span`,{class:`card__uno-text`},`♛`,-1)]])}var ql=Ul(Wl,[[`render`,Kl]]),Jl={class:`tutorial__header`},Yl={class:`tutorial__dots`},Xl={class:`tutorial__step-title`},Zl={key:0,class:`tutorial__match-row`},Ql={class:`tutorial__card-group`},$l={class:`tutorial__card-group`},eu={class:`tutorial__cards`},tu={key:1,class:`tutorial__match-row`},nu={class:`tutorial__card-group`},ru={class:`tutorial__card-group`},iu={key:2,class:`tutorial__cards`},au={key:3,class:`tutorial__color-circles`},ou={key:4,class:`tutorial__uno-demo`},su=[`innerHTML`],cu={key:5,class:`tutorial__tip`},lu={class:`tutorial__footer`},uu={key:1},du=Zn({__name:`TutorialOverlay`,emits:[`close`],setup(e,{emit:t}){let n=t,r=[{title:`The Goal`,body:`Be the <strong>first player</strong> to play all the cards in your hand. You play against 1 or 3 computer opponents — whoever empties their hand first wins!`,cards:[{color:`red`,value:7},{color:`blue`,value:3},{color:`green`,value:9}],tip:`Keep an eye on how many cards your opponents have.`},{title:`Matching Cards`,body:`On your turn, play a card that matches the top card by <strong>color</strong> or <strong>value</strong>.`,discardCard:{color:`red`,value:5},cards:[{color:`red`,value:8},{color:`blue`,value:5}],tip:`Red 8 matches by color, Blue 5 matches by value.`},{title:`Drawing Cards`,body:`If you can't play any card, tap the <strong>draw pile</strong> to draw one. If the drawn card is playable, it appears with a <strong>star</strong> — you can play it right away or keep it.`,drawStep:!0,cards:[{color:`blue`,value:2,drawn:!0}],tip:`A star on a card means you just drew it.`},{title:`Action Cards`,body:`<strong>Skip</strong> — next player loses their turn.<br><strong>Reverse</strong> — changes the direction of play.<br><strong>Draw Two (+2)</strong> — next player draws 2 cards and loses their turn.`,cards:[{color:`blue`,value:`skip`},{color:`green`,value:`reverse`},{color:`red`,value:`draw_two`}],tip:`The arrow on a Reverse card shows the direction play will switch to in your hand, or the direction it changed to when it was played.`},{title:`Wild Cards`,body:`<strong>Wild</strong> — play it anytime and choose the next color.<br><strong>Wild +4</strong> — play it anytime, choose the color, and the next player draws 4 cards and loses their turn.`,cards:[{color:null,value:`wild`},{color:null,value:`wild_draw_four`}],tip:`Wild cards can be played on any card, regardless of color or value.`},{title:`Choosing a Color`,body:`After playing a Wild card, you'll pick one of the four colors. The next player must match the color you choose. Or play a Wild card!`,colorCircles:!0,tip:`Once played, a Wild card changes to show the chosen color.`,cards:[{color:null,value:`wild`,chosenColor:`green`},{color:null,value:`wild_draw_four`,chosenColor:`red`}]},{title:`Calling ONE!`,body:`When you're down to <strong>one card</strong>, press the <strong>ONE</strong> button before playing your last card. If you forget, you'll draw <strong>2 penalty cards</strong> instead of winning!`,unoButton:!0,tip:`Press ONE when you're down to two cards or fewer — pressing it any earlier also costs 2 cards.`},{title:`You're Ready!`,body:`That's everything you need to know. Play cards by matching color or value, use action cards strategically, and don't forget to call ONE. <strong>Good luck!</strong>`,cards:[{color:`red`,value:0},{color:`blue`,value:`skip`},{color:null,value:`wild`},{color:`green`,value:`reverse`},{color:`yellow`,value:7}]}],i=z(0),a=z(`tutorial-slide-left`);function o(){i.value<r.length-1?(a.value=`tutorial-slide-left`,i.value++):n(`close`)}function s(){i.value>0&&(a.value=`tutorial-slide-right`,i.value--)}function c(e){e.key===`ArrowRight`||e.key===`Enter`?o():e.key===`ArrowLeft`?s():e.key===`Escape`&&n(`close`)}return fr(()=>window.addEventListener(`keydown`,c)),gr(()=>window.removeEventListener(`keydown`,c)),(e,t)=>(G(),K(`div`,{class:`modal-overlay`,onClick:t[2]||=e=>n(`close`)},[q(`div`,{class:`tutorial`,onClick:t[1]||=Lo(()=>{},[`stop`])},[q(`div`,Jl,[q(`div`,Yl,[(G(),K(U,null,Sr(r,(e,t)=>q(`span`,{key:t,class:N([`tutorial__dot`,t===i.value&&`tutorial__dot--active`,t<i.value&&`tutorial__dot--done`])},null,2)),64))]),q(`button`,{class:`tutorial__close`,onClick:t[0]||=e=>n(`close`)},`×`)]),J(Ra,{name:a.value,mode:`out-in`},{default:Cn(()=>[(G(),K(`div`,{key:i.value,class:`tutorial__body`},[q(`h2`,Xl,P(r[i.value].title),1),r[i.value].discardCard?(G(),K(`div`,Zl,[q(`div`,Ql,[t[3]||=q(`span`,{class:`tutorial__card-group-label`},`Top Card`,-1),J(sl,{card:r[i.value].discardCard,disabled:!1},null,8,[`card`])]),t[5]||=q(`span`,{class:`tutorial__match-arrow`},`←`,-1),q(`div`,$l,[t[4]||=q(`span`,{class:`tutorial__card-group-label`},`Your Hand`,-1),q(`div`,eu,[(G(!0),K(U,null,Sr(r[i.value].cards,(e,t)=>(G(),Ui(sl,{key:t,card:e,disabled:!1},null,8,[`card`]))),128))])])])):r[i.value].drawStep?(G(),K(`div`,tu,[q(`div`,nu,[t[6]||=q(`span`,{class:`tutorial__card-group-label`},`Drawn Card`,-1),J(sl,{card:r[i.value].cards[0],disabled:!1},null,8,[`card`])]),t[8]||=q(`span`,{class:`tutorial__match-arrow`},`←`,-1),q(`div`,ru,[t[7]||=q(`span`,{class:`tutorial__card-group-label`},`Draw Pile`,-1),J(ql)])])):r[i.value].cards?(G(),K(`div`,iu,[(G(!0),K(U,null,Sr(r[i.value].cards,(e,t)=>(G(),Ui(sl,{key:t,card:e,disabled:!1},null,8,[`card`]))),128))])):Y(``,!0),r[i.value].colorCircles?(G(),K(`div`,au,[...t[9]||=[q(`span`,{class:`tutorial__color-circle tutorial__color-circle--red`},null,-1),q(`span`,{class:`tutorial__color-circle tutorial__color-circle--blue`},null,-1),q(`span`,{class:`tutorial__color-circle tutorial__color-circle--green`},null,-1),q(`span`,{class:`tutorial__color-circle tutorial__color-circle--yellow`},null,-1)]])):Y(``,!0),r[i.value].unoButton?(G(),K(`div`,ou,[...t[10]||=[q(`button`,{class:`uno-btn uno-btn--demo`},`ONE`,-1)]])):Y(``,!0),q(`p`,{class:`tutorial__step-text`,innerHTML:r[i.value].body},null,8,su),r[i.value].tip?(G(),K(`div`,cu,[t[11]||=q(`strong`,null,`Tip:`,-1),Zi(` `+P(r[i.value].tip),1)])):Y(``,!0)]))]),_:1},8,[`name`]),q(`div`,lu,[i.value>0?(G(),K(`button`,{key:0,class:`tutorial__btn tutorial__btn--prev`,onClick:s},` Back `)):(G(),K(`span`,uu)),q(`button`,{class:`tutorial__btn tutorial__btn--next`,onClick:o},P(i.value===r.length-1?`Let's Play!`:`Next`),1)])])]))}}),fu=`uno_sound`,pu=localStorage.getItem(fu)!==`false`,mu=null,hu=null;function gu(){return pu}function _u(e){pu=e,localStorage.setItem(fu,String(e)),e&&vu()}function vu(){if(!mu){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;mu=new e}mu.state===`suspended`&&mu.resume()}for(let e of[`pointerdown`,`keydown`])window.addEventListener(e,()=>{pu&&vu()},{capture:!0,passive:!0});function yu(e){if(!hu){hu=e.createBuffer(1,e.sampleRate*.5,e.sampleRate);let t=hu.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1}return hu}function $(e,t,n,r,i,a={}){let o=e.createOscillator(),s=e.createGain();o.type=a.type??`triangle`,o.frequency.setValueAtTime(n,r),a.slideTo&&o.frequency.exponentialRampToValueAtTime(a.slideTo,r+i),s.gain.setValueAtTime(1e-4,r),s.gain.exponentialRampToValueAtTime(a.gain??.3,r+.01),s.gain.exponentialRampToValueAtTime(1e-4,r+i),o.connect(s).connect(t),o.start(r),o.stop(r+i+.02)}function bu(e,t,n,r,i={}){let a=e.createBufferSource();a.buffer=yu(e);let o=e.createBiquadFilter();o.type=`bandpass`,o.Q.value=i.q??1,o.frequency.setValueAtTime(i.freq??2e3,n),i.slideTo&&o.frequency.exponentialRampToValueAtTime(i.slideTo,n+r);let s=e.createGain();s.gain.setValueAtTime(i.gain??.4,n),s.gain.exponentialRampToValueAtTime(1e-4,n+r),a.connect(o).connect(s).connect(t),a.start(n),a.stop(n+r+.02)}function xu(e,t,n){bu(e,t,n,.08,{freq:1800,gain:.5,q:.8}),$(e,t,180,n,.09,{type:`sine`,gain:.35,slideTo:90})}var Su={deal(e,t,n){for(let r=0;r<6;r++)bu(e,t,n+r*.06,.05,{freq:2500,gain:.25,q:1.2})},play:xu,draw(e,t,n){bu(e,t,n,.18,{freq:700,slideTo:3e3,gain:.3,q:1.5})},skip(e,t,n){xu(e,t,n),$(e,t,660,n+.06,.1,{type:`square`,gain:.08}),$(e,t,440,n+.16,.14,{type:`square`,gain:.08})},reverse(e,t,n){xu(e,t,n),$(e,t,400,n+.05,.14,{gain:.2,slideTo:800}),$(e,t,800,n+.19,.14,{gain:.2,slideTo:400})},wild(e,t,n){xu(e,t,n),[523,659,784,1047].forEach((r,i)=>$(e,t,r,n+.05+i*.05,.25,{type:`sine`,gain:.15}))},drawPenalty(e,t,n){xu(e,t,n),$(e,t,300,n+.05,.3,{type:`sawtooth`,gain:.1,slideTo:120})},one(e,t,n){$(e,t,880,n,.12,{type:`square`,gain:.1}),$(e,t,1320,n+.1,.25,{type:`square`,gain:.1})},penalty(e,t,n){$(e,t,150,n,.18,{type:`sawtooth`,gain:.15}),$(e,t,110,n+.2,.3,{type:`sawtooth`,gain:.15})},turn(e,t,n){$(e,t,1047,n,.12,{type:`sine`,gain:.12})},win(e,t,n){[523,659,784].forEach((r,i)=>$(e,t,r,n+i*.12,.2,{gain:.25})),$(e,t,1047,n+.36,.6,{gain:.25}),$(e,t,784,n+.36,.6,{type:`sine`,gain:.15})},lose(e,t,n){[392,370,349].forEach((r,i)=>$(e,t,r,n+i*.25,.25,{gain:.2})),$(e,t,330,n+.75,.6,{gain:.2,slideTo:300})}};function Cu(e){if(!pu||e.length===0)return;vu();let t=mu;if(!t)return;let n=()=>{let n=t.createGain();n.gain.value=.8,n.connect(t.destination);let r=t.currentTime+.01;e.forEach((e,i)=>Su[e](t,n,r+i*.15))};if(t.state===`running`)return n();let r=performance.now();t.resume().then(()=>{performance.now()-r<300&&n()},()=>{})}function wu(e,t){if(!t||e===t)return[];if(!e||t.recentPlays.length===0&&t.discardPile[0]!==e.discardPile[0])return t.recentPlays.length===0?[`deal`]:[];let n=[];t.players.some((t,n)=>t.saidUno&&!e.players[n].saidUno)&&n.push(`one`);let r=t.discardPile[0];if(t.recentPlays.length>0&&t.recentPlays[0]!==e.recentPlays[0]&&r)switch(r.value){case`skip`:n.push(`skip`);break;case`reverse`:n.push(`reverse`);break;case`wild`:n.push(`wild`);break;case`draw_two`:case`wild_draw_four`:n.push(`drawPenalty`);break;default:n.push(`play`)}else{let r=e=>e.players.reduce((e,t)=>e+t.hand.length,0);r(t)>r(e)&&n.push(`draw`)}return t.unoPenalty&&!e.unoPenalty&&n.push(`penalty`),t.finished[0]===0&&e.finished[0]!==0?n.push(`win`):t.phase===`game_over`&&e.phase!==`game_over`&&t.finished[0]!==0?n.push(`lose`):t.phase===`playing`&&t.currentPlayer===0&&e.currentPlayer!==0&&n.push(`turn`),n}var Tu={key:0,class:`feedback-sheet__text feedback-sheet__text--error`},Eu=[`disabled`],Du=Zn({__name:`FeedbackSheet`,emits:[`close`],setup(e,{emit:t}){let n=t,r=z(!0),i=z(``),a=z(``),o=z(`idle`);async function s(){if(!(!i.value.trim()||o.value===`sending`)){o.value=`sending`;try{o.value=(await fetch(`https://uno-stats.aibotted849.workers.dev/feedback`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify({message:i.value.trim(),email:a.value.trim()||void 0,device_id:dc})})).ok?`sent`:`error`}catch{o.value=`error`}}}return(e,t)=>(G(),Ui(Ra,{name:`feedback`,appear:``,onAfterLeave:t[5]||=e=>n(`close`)},{default:Cn(()=>[r.value?(G(),K(`div`,{key:0,class:`modal-overlay feedback-overlay`,onClick:t[4]||=e=>r.value=!1},[q(`form`,{class:`feedback-sheet`,onClick:t[3]||=Lo(()=>{},[`stop`]),onSubmit:Lo(s,[`prevent`])},[t[9]||=q(`div`,{class:`feedback-sheet__handle`},null,-1),o.value===`sent`?(G(),K(U,{key:0},[t[6]||=q(`h2`,{class:`feedback-sheet__title`},`Thanks!`,-1),t[7]||=q(`p`,{class:`feedback-sheet__text`},`Your feedback is on its way.`,-1),q(`button`,{type:`button`,class:`feedback-sheet__btn`,onClick:t[0]||=e=>r.value=!1},`Done`)],64)):(G(),K(U,{key:1},[t[8]||=q(`h2`,{class:`feedback-sheet__title`},`Give Feedback`,-1),wn(q(`textarea`,{"onUpdate:modelValue":t[1]||=e=>i.value=e,class:`feedback-sheet__input feedback-sheet__textarea`,placeholder:`What would make the game better?`,rows:`4`,maxlength:`5000`,required:``},null,512),[[Po,i.value]]),wn(q(`input`,{"onUpdate:modelValue":t[2]||=e=>a.value=e,type:`email`,class:`feedback-sheet__input`,placeholder:`Email (optional, if you'd like a reply)`,autocomplete:`email`},null,512),[[Po,a.value]]),o.value===`error`?(G(),K(`p`,Tu,` Couldn't send right now — check your connection and try again. `)):Y(``,!0),q(`button`,{type:`submit`,class:`feedback-sheet__btn`,disabled:o.value===`sending`||!i.value.trim()},P(o.value===`sending`?`Sending…`:`Send`),9,Eu)],64))],32)])):Y(``,!0)]),_:1}))}}),Ou=50,ku=38,Au=150,ju=2e3,Mu=2e3,Nu=`uno_tilt_snooze_until`,Pu=1e3*60*60*24*7;function Fu(){localStorage.setItem(Nu,String(Date.now()+Pu))}function Iu(e){let t=null,n=null,r=0;function i(i){let a=i.accelerationIncludingGravity;if(!a||a.y==null||a.z==null)return;let o=Math.atan2(Math.abs(a.y),Math.abs(a.z))*180/Math.PI,s=Date.now();if(o>Ou){t??=s,s-t>=Au&&(n=s);return}if(t=null,o<ku&&n!=null){let t=n;if(n=null,s-t<=ju&&s-r>=Mu){if(r=s,s<Number(localStorage.getItem(Nu)))return;e()}}}async function a(){let e=DeviceMotionEvent;if(e.requestPermission)try{await e.requestPermission()}catch{}}fr(()=>{window.addEventListener(`devicemotion`,i),window.addEventListener(`click`,a,{once:!0})}),gr(()=>{window.removeEventListener(`devicemotion`,i),window.removeEventListener(`click`,a)})}var Lu=`# Card Royale - Game Rules

## Overview

Card Royale is a 2- to 4-player card game: you against 1–3 AI opponents with random names, seated across from you (2 players), to your left and right (3 players), or at West, North, and East (4 players). The goal is to be the first player to empty your hand.

## The Deck

The deck has 108 cards:

- **Number cards (0-9)** in four colors: Red, Blue, Green, Yellow
  - One 0 per color, two of each 1-9 per color (76 total)
- **Action cards** in four colors:
  - **Skip** (2 per color) - Skips the next player's turn
  - **Reverse** (2 per color) - Reverses the turn direction
  - **Draw Two (+2)** (2 per color) - Next player draws 2 cards, then takes their turn
- **Wild cards** (no color):
  - **Wild** (4 total) - Play on anything, choose the next color
  - **Wild +4** (4 total) - Next player draws 4 cards, then takes their turn; you choose the next color

## Setup

1. Each player is dealt 7 cards
2. One card is flipped from the draw pile to start the discard pile
3. If the opening card is a **Wild +4**, it is shuffled back and a new card is flipped
4. Opening card effects are applied immediately:
   - **Skip**: You (the first player) are skipped
   - **Reverse**: Direction flips from counter-clockwise to clockwise
   - **Draw Two**: You draw 2 extra cards (starting with 9)
   - **Wild**: A random color is chosen

## Turn Direction

- The default turn direction is **counter-clockwise**: You -> East -> North -> West
- A **Reverse** card flips the direction to clockwise: You -> West -> North -> East
- The current direction is shown by an arrow on the game board connecting the current player to the next

## Playing a Card

On your turn, you may play a card from your hand if it matches the top card of the discard pile by:

- **Color** - Same color as the top card (or the chosen color if the top card is a wild)
- **Value** - Same number or same action type (e.g., Skip on Skip)
- **Wild** - Wild and Wild +4 can be played on anything

Playable cards are highlighted on your turn. Click a playable card to play it. If you play a Wild or Wild +4, you'll be prompted to choose a color.

## Drawing a Card

If you have no playable cards (or choose not to play), click the draw pile to draw one card:

- If the drawn card is playable, it stays in your hand for you to play (marked with a star)
- If the drawn card is not playable, your turn is automatically passed
- Cards drawn this turn are marked with a **star** so you can tell them apart from your dealt hand

## Card Effects

| Card | Effect |
|------|--------|
| **Skip** | The next player loses their turn |
| **Reverse** | Turn direction flips (clockwise <-> counter-clockwise) |
| **Draw Two (+2)** | Next player immediately receives 2 cards from the draw pile, then takes their normal turn |
| **Wild** | You choose the color that the next player must match |
| **Wild +4** | Next player immediately receives 4 cards, you choose the color, then they take their normal turn |

Note: Draw penalties are dealt automatically. The receiving player does **not** lose their turn - they draw the cards and then play normally.

## Ranked Mode

Ranked is a one-on-one ladder through six rooms, played on the server — it needs
a connection, and your trophies are held there rather than on your phone. Casual
works offline, always. Every match is you against a single opponent, and every result moves your trophy count:

- **Win: +30 trophies. Loss: -30 trophies.**
- Trophies can never fall below the floor of the room you have reached, so a losing streak cannot demote you out of a room.
- Quitting or restarting a ranked match in progress counts as a loss.
- The more trophies you hold, the sharper your opponents play — see AI Behavior below.

| Room | Trophies |
|-------|----------|
| The Parlour | 0 |
| Velvet Room | 300 |
| Gilded Hall | 600 |
| Crown Court | 900 |
| Royal Vault | 1200 |
| Sovereign's Table | 1500 |

Your **ranked name** is chosen once, the first time you play a ranked match, and is bound to your install. Ranked names are 3-30 letters, numbers or underscores, and are unique — a name another player already holds is refused while you pick another. There is no rename: it is the name real opponents will see. If the name cannot be registered — no connection, say — the match still starts and the name is claimed the next time you play.

Casual mode is unranked, leaves your trophies alone, uses whatever name you type, and is where 3- and 4-player tables live.

## Calling ONE

The ONE button is always visible during play. You must press it **before** playing your second-to-last card. If you play down to 0 cards without having called ONE, you draw 2 penalty cards instead of winning.

AI players call ONE when they have 2 cards — though weaker opponents forget, and take the penalty for it.

## Winning

The first player to play all their cards wins the game (provided they called ONE). If you win with a Wild or Wild +4, the color chooser is skipped automatically. A game over screen appears with the option to play again.

## Sound Effects

Card plays, draws, ONE calls, and wins have sound effects. Turn them off with **Sound effects** in the pause menu.

## Recent Plays

The Card Play History above the draw and discard piles shows the last 4 cards played.

## Hand Management

You can **drag and drop** cards in your hand to rearrange them.

## Deck Exhaustion

If the draw pile runs out, all cards from the discard pile (except the top card) are shuffled to form a new draw pile. Any chosen colors on wild cards are cleared.

## No Stacking

Draw Two and Wild +4 cards **cannot** be stacked. When a +2 or +4 is played against you, you receive the cards immediately with no option to counter with your own +2 or +4.

## AI Behavior

Every opponent has a skill rating. Casual games use a middling one; in Ranked it rises with your trophy count, so the ladder gets harder as you climb.

A **sharp** opponent:

- Plays **Draw Two**, **Skip** and (heads-up) **Reverse** on sight, for the extra turn they buy
- Dumps cards from the colors it holds least of, keeping the rest of its hand chainable
- Holds **Wild** and **Wild +4** until it is stuck, or until you are one card from going out
- Picks the color it holds the most of, steering away from colors you have just played
- Never forgets to call ONE

A **careless** opponent plays a random legal card roughly a third of the time, burns wilds the moment it can, picks colors at random, and often forgets to call ONE.

AI turns are delayed 0.8-1.5 seconds to feel more natural.
`,Ru={class:`game-container`},zu={key:0,class:`lobby`},Bu=[`href`],Vu={key:0,class:`lobby__claimed`},Hu=[`placeholder`,`maxlength`],Uu={key:2,class:`lobby__error`},Wu={class:`room__head`},Gu={class:`room__name`},Ku={class:`room__trophies`},qu={class:`room__track`},Ju={class:`room__next`},Yu={key:4,class:`lobby__players`},Xu=[`disabled`],Zu={class:`pause-menu__toggle`},Qu=[`checked`],$u={class:`pause-menu__toggle`},ed=[`checked`],td={class:`rules-modal__header`},nd={class:`rules-modal__actions`},rd={class:`rules-modal__body`},id=[`innerHTML`],ad=`af44f784-965f-496f-b0eb-b86e6c810399`,od=Zn({__name:`App`,setup(e){let t=Uc(),n=dc===ad,r=z(``),i=[2,4],a=Number(localStorage.getItem(`uno_player_count`)),o=z(i.includes(a)?a:4),s=z(gu());function c(e){_u(e),s.value=e}let l=[`Ranked`,`Casual`],u=z(localStorage.getItem(`uno_mode`)===`Casual`?`Casual`:`Ranked`),d=Z(()=>u.value===`Ranked`?`ranked`:`casual`),f=Z(()=>Oc(Q.value.trophies)),p=Z(()=>Ec.find(e=>e.min>Q.value.trophies)??null),m=Z(()=>{let e=p.value;if(!e)return 100;let t=e.min-f.value.min;return Math.round((Q.value.trophies-f.value.min)/t*100)}),h=Z(()=>t.gameState.value?.finished[0]===0),g=z(``),_=z(!1),v=z(``),y=z(!1),b=Z(()=>d.value===`casual`?`Start Game`:_.value?`Claiming...`:y.value?`Finding match...`:Pc.value?`Find Match`:`Claim Name & Play`),x=z(!1),S=z(!1);async function C(){await navigator.clipboard.writeText(dc),S.value=!0,setTimeout(()=>S.value=!1,1500)}let w=z(!1),T=z(!1),E=z(!1),D=z(!1),O=z(null),ee=z(!1),k=z(!1),te=z(!1);Iu(()=>{k.value=!0,te.value=!0});function ne(){te.value&&Fu(),k.value=!1,te.value=!1}let A=z(0),re=null;fr(()=>{let e=localStorage.getItem(`uno_player_name`);e&&(r.value=e),t.syncFromServer()});async function j(){let e=r.value.trim()||`Player`;if(v.value=``,d.value===`ranked`&&!Pc.value){_.value=!0;let t=await Ic(e);if(_.value=!1,t===`taken`){g.value=`${e} is already taken — pick another name.`;return}if(t===`invalid`){g.value=`Ranked names are 3-30 letters, numbers or underscores.`;return}}g.value=``,localStorage.setItem(`uno_player_name`,e),localStorage.setItem(`uno_player_count`,String(o.value)),localStorage.setItem(`uno_mode`,u.value),D.value=!0,A.value++;try{y.value=!0,await t.startGame(d.value===`ranked`&&Pc.value||e,o.value,d.value)}catch{v.value=`Ranked needs a connection. Casual works offline.`}finally{y.value=!1}}function ie(e){if(!t.gameState.value)return;let n=t.gameState.value.players[0].hand,r=n[e];if(Wo(r))if(n.length===1){let n=[`red`,`blue`,`green`,`yellow`];t.playCard(e,n[Math.floor(Math.random()*n.length)])}else re=e,E.value=!0;else t.playCard(e)}function ae(e){re!=null&&(t.playCard(re,e),re=null,E.value=!1)}function oe(){re=null,E.value=!1}function se(){x.value=!1,E.value=!1,re=null,t.quitToLobby()}function ce(){x.value=!1,E.value=!1,re=null,D.value=!0,A.value++,t.restartGame()}function le(){D.value=!1}function ue(){let e=t.gameState.value;return e?e.finished.map(t=>e.players[t].name):[]}An(()=>t.gameState.value,(e,t)=>Cu(wu(t??null,e))),An(()=>t.gameState.value?.unoPenalty,e=>{e&&(O.value=e.reason)});function de(e){let t=e.replace(/^\|(.+)\|$/gm,e=>{let t=e.split(`|`).filter(e=>e.trim());return t.every(e=>/^[\s-:]+$/.test(e))?`<!--sep-->`:`<tr>`+t.map(e=>`<td>${e.trim()}</td>`).join(``)+`</tr>`}).replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/^\d+\. (.+)$/gm,`<li>$1</li>`);return t=t.replace(/((?:<li>.*<\/li>\n?)+)/g,`<ul>$1</ul>`),t=t.replace(/((?:<tr>.*<\/tr>\n?|<!--sep-->\n?)+)/g,e=>{let t=e.replace(/<!--sep-->\n?/g,``).trim(),n=t.match(/<tr>.*?<\/tr>/);return n?`<table><thead>${n[0].replace(/<td>/g,`<th>`).replace(/<\/td>/g,`</th>`)}</thead><tbody>${t.replace(n[0],``)}</tbody></table>`:`<table>${t}</table>`}),t=t.replace(/^(?!<[hultop])(.+)$/gm,`<p>$1</p>`),t=t.replace(/<p>\s*<\/p>/g,``),t}return(e,a)=>(G(),K(`div`,Ru,[B(t).phase.value===`lobby`?(G(),K(`div`,zu,[a[26]||=q(`h1`,{class:`lobby__title`},`Card Royale`,-1),n?(G(),K(`a`,{key:0,class:`build-chip`,href:`https://github.com/u9g/unoroyale-private/commit/${B(bc)}`,target:`_blank`,rel:`noreferrer`},`OTA `+P(B(bc)),9,Bu)):Y(``,!0),q(`form`,{class:N([`lobby__form`,d.value===`ranked`&&`lobby__form--ranked`]),onSubmit:Lo(j,[`prevent`])},[d.value===`ranked`&&B(Pc)?(G(),K(`p`,Vu,[a[24]||=Zi(` Playing as `,-1),q(`strong`,null,P(B(Pc)),1)])):wn((G(),K(`input`,{key:1,"onUpdate:modelValue":a[0]||=e=>r.value=e,type:`text`,placeholder:d.value===`ranked`?`Choose your ranked name`:`Enter your name`,maxlength:d.value===`ranked`?30:void 0,class:`lobby__input`,required:``,onInput:a[1]||=e=>{g.value=``,v.value=``}},null,40,Hu)),[[Po,r.value]]),g.value||v.value?(G(),K(`p`,Uu,P(g.value||v.value),1)):Y(``,!0),J(Gc,{modelValue:u.value,"onUpdate:modelValue":a[2]||=e=>u.value=e,options:l,class:`segmented--wide`},null,8,[`modelValue`]),d.value===`ranked`?(G(),K(`div`,{key:3,class:`room`,style:M({"--room-accent":f.value.accent})},[q(`div`,Wu,[q(`span`,Gu,P(f.value.name),1),q(`span`,Ku,P(B(Q).trophies)+` ♛`,1)]),q(`div`,qu,[q(`div`,{class:`room__fill`,style:M({width:m.value+`%`})},null,4)]),q(`span`,Ju,P(p.value?`${p.value.min-B(Q).trophies} ♛ to ${p.value.name}`:`Top room reached`),1)],4)):(G(),K(`label`,Yu,[J(Gc,{modelValue:o.value,"onUpdate:modelValue":a[3]||=e=>o.value=e,options:i},null,8,[`modelValue`]),a[25]||=q(`span`,null,`players at the table`,-1)])),q(`button`,{type:`submit`,class:`lobby__btn`,disabled:_.value||y.value},P(b.value),9,Xu)],34),q(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[4]||=e=>ee.value=!0},`How to Play`),q(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[5]||=e=>w.value=!0},`Game Info`),q(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[6]||=e=>k.value=!0},`Give Feedback`)])):B(t).phase.value===`playing`&&B(t).gameState.value?(G(),Ui(Ll,{key:A.value,"game-state":B(t).gameState.value,"choosing-color":E.value,"is-new-game":D.value,onPlayCard:ie,onDrawCard:B(t).drawCard,onSayUno:B(t).sayUno,onNewGame:ce,onChooseColor:ae,onCancelColor:oe,onReorderHand:B(t).reorderHand,onDealComplete:le,onMenu:a[7]||=e=>x.value=!x.value},null,8,[`game-state`,`choosing-color`,`is-new-game`,`onDrawCard`,`onSayUno`,`onReorderHand`])):B(t).phase.value===`game_over`&&B(t).gameState.value?(G(),K(U,{key:2},[J(Ll,{"game-state":B(t).gameState.value,"choosing-color":!1,onPlayCard:()=>{},onDrawCard:()=>{},onSayUno:()=>{},onNewGame:ce,onChooseColor:()=>{},onCancelColor:()=>{},onReorderHand:()=>{},onDealComplete:()=>{},onMenu:a[8]||=e=>x.value=!x.value},null,8,[`game-state`]),B(t).mode.value===`ranked`&&B(t).lastRanked.value?(G(),Ui($c,{key:0,result:B(t).lastRanked.value,won:h.value,onPlayAgain:ce,onMainMenu:se},null,8,[`result`,`won`])):(G(),Ui(Hl,{key:1,placements:ue(),onPlayAgain:ce},null,8,[`placements`]))],64)):Y(``,!0),x.value&&B(t).phase.value!==`lobby`?(G(),K(`div`,{key:3,class:`modal-overlay`,onClick:a[15]||=e=>x.value=!1},[q(`div`,{class:`pause-menu`,onClick:a[14]||=Lo(()=>{},[`stop`])},[a[31]||=q(`h2`,{class:`pause-menu__title`},`Paused`,-1),q(`button`,{class:`pause-menu__btn pause-menu__btn--resume`,onClick:a[9]||=e=>x.value=!1},`Resume`),q(`button`,{class:`pause-menu__btn pause-menu__btn--tutorial`,onClick:a[10]||=e=>{x.value=!1,ee.value=!0}},`How to Play`),q(`button`,{class:`pause-menu__btn pause-menu__btn--main-menu`,onClick:se},`Main Menu`),q(`label`,Zu,[q(`input`,{type:`checkbox`,checked:B(t).instantCpu.value,onChange:a[11]||=e=>B(t).setInstantCpu(e.target.checked)},null,40,Qu),a[27]||=q(`span`,{class:`toggle-check`},null,-1),a[28]||=q(`span`,null,`Make computer players instant`,-1)]),q(`label`,$u,[q(`input`,{type:`checkbox`,checked:s.value,onChange:a[12]||=e=>c(e.target.checked)},null,40,ed),a[29]||=q(`span`,{class:`toggle-check`},null,-1),a[30]||=q(`span`,null,`Sound effects`,-1)]),q(`button`,{class:`pause-menu__btn pause-menu__btn--feedback`,onClick:a[13]||=e=>{x.value=!1,k.value=!0}},`Give Feedback`),q(`button`,{class:`pause-menu__btn pause-menu__btn--new-game`,onClick:ce},`New Game`)])])):Y(``,!0),w.value?(G(),K(`div`,{key:4,class:`modal-overlay`,onClick:a[19]||=e=>w.value=!1},[q(`div`,{class:N([`rules-modal`,T.value&&`rules-modal--expanded`]),onClick:a[18]||=Lo(()=>{},[`stop`])},[q(`div`,td,[a[32]||=q(`h2`,null,`Game Info`,-1),q(`div`,nd,[q(`button`,{class:`rules-modal__expand`,onClick:a[16]||=e=>T.value=!T.value},P(T.value?`−`:`+`),1),q(`button`,{class:`rules-modal__close`,onClick:a[17]||=e=>{w.value=!1,T.value=!1}},`×`)])]),q(`div`,rd,[q(`div`,{innerHTML:de(B(Lu))},null,8,id),q(`button`,{type:`button`,class:`rules-modal__device`,onClick:C},P(S.value?`Copied`:`Copy Device ID`),1)])],2)])):Y(``,!0),ee.value?(G(),Ui(du,{key:5,onClose:a[20]||=e=>ee.value=!1})):Y(``,!0),k.value?(G(),Ui(Du,{key:6,onClose:ne})):Y(``,!0),O.value?(G(),K(`div`,{key:7,class:`uno-penalty-popup`,onClick:a[23]||=e=>O.value=null},[q(`div`,{class:`uno-penalty-popup__card`,onClick:a[22]||=Lo(()=>{},[`stop`])},[O.value===`forgot`?(G(),K(U,{key:0},[a[33]||=q(`h3`,{class:`uno-penalty-popup__title`},`You forgot to say ONE!`,-1),a[34]||=q(`p`,{class:`uno-penalty-popup__text`},[Zi(`When you play your second-to-last card, press the `),q(`strong`,null,`ONE`),Zi(` button before playing your final card. If you don't, you'll draw 2 penalty cards instead of winning.`)],-1)],64)):(G(),K(U,{key:1},[a[35]||=q(`h3`,{class:`uno-penalty-popup__title`},`Too early for ONE!`,-1),a[36]||=q(`p`,{class:`uno-penalty-popup__text`},[Zi(`You can only call `),q(`strong`,null,`ONE`),Zi(` when you're down to two cards or fewer. Calling it earlier costs 2 penalty cards.`)],-1)],64)),q(`button`,{class:`uno-penalty-popup__btn`,onClick:a[21]||=e=>O.value=null},`Got it`)])])):Y(``,!0)]))}});Promise.all([fc(),Mc(),Fc()]).then(([e])=>xc(e)).then(()=>Vo(od).mount(`#app`));export{Js as n,gc as t};