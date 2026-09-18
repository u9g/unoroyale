(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,T=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),E=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ee=/-\w/g,D=E(e=>e.replace(ee,e=>e.slice(1).toUpperCase())),te=/\B([A-Z])/g,O=E(e=>e.replace(te,`-$1`).toLowerCase()),ne=E(e=>e.charAt(0).toUpperCase()+e.slice(1)),re=E(e=>e?`on${ne(e)}`:``),k=(e,t)=>!Object.is(e,t),ie=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},A=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ae=e=>{let t=parseFloat(e);return isNaN(t)?e:t},oe=e=>{let t=g(e)?Number(e):NaN;return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function le(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?pe(r):le(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var ue=/;(?![^(]*\))/g,de=/:([^]+)/,fe=/\/\*[^]*?\*\//g;function pe(e){let t={};return e.replace(fe,``).split(ue).forEach(e=>{if(e){let n=e.split(de);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function j(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=j(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var me=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,M=e(me);me+``;function he(e){return!!e||e===``}function ge(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=_e(e[r],t[r]);return n}function _e(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?ge(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!_e(e[n],t[n]))return!1}}return String(e)===String(t)}var ve=e=>!!(e&&e.__v_isRef===!0),N=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ve(e)?N(e.value):JSON.stringify(e,ye,2):String(e),ye=(e,t)=>ve(t)?ye(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[be(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>be(e))}:_(t)?be(t):v(t)&&!d(t)&&!C(t)?String(t):t,be=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,P,xe=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=P,!e&&P&&(this.index=(P.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=P;try{return P=this,e()}finally{P=t}}}on(){++this._on===1&&(this.prevScope=P,P=this)}off(){this._on>0&&--this._on===0&&(P=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Se(){return P}var F,Ce=new WeakSet,we=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,P&&P.active&&P.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ce.has(this)&&(Ce.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Oe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),je(this);let e=F,t=Le;F=this,Le=!0;try{return this.fn()}finally{Me(this),F=e,Le=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fe(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ce.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ne(this)&&this.run()}get dirty(){return Ne(this)}},Te=0,Ee,De;function Oe(e,t=!1){if(e.flags|=8,t){e.next=De,De=e;return}e.next=Ee,Ee=e}function ke(){Te++}function Ae(){if(--Te>0)return;if(De){let e=De;for(De=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Ee;){let t=Ee;for(Ee=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function je(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Me(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Fe(r),Ie(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ne(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Pe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Pe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ne(e))))return;e.flags|=2;let t=e.dep,n=F,r=Le;F=e,Le=!0;try{je(e);let n=e.fn(e._value);(t.version===0||k(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{F=n,Le=r,Me(e),e.flags&=-3}}function Fe(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Fe(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ie(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Le=!0,Re=[];function ze(){Re.push(Le),Le=!1}function Be(){let e=Re.pop();Le=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=F;F=void 0;try{t()}finally{F=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!F||!Le||F===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==F)t=this.activeLink=new Ue(F,this),F.deps?(t.prevDep=F.depsTail,F.depsTail.nextDep=t,F.depsTail=t):F.deps=F.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=F.depsTail,t.nextDep=void 0,F.depsTail.nextDep=t,F.depsTail=t,F.deps===t&&(F.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){ke();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ae()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function I(e,t,n){if(Le&&F){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(ke(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}Ae()}function Ze(e){let t=L(e);return t===e?t:(I(t,`iterate`,Ye),Lt(e)?t:t.map(Bt))}function Qe(e){return I(e=L(e),`iterate`,Ye),e}function $e(e,t){return It(e)?Vt(Ft(e)?Bt(t):t):Bt(t)}var et={__proto__:null,[Symbol.iterator](){return tt(this,Symbol.iterator,e=>$e(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return tt(this,`entries`,e=>(e[1]=$e(this,e[1]),e))},every(e,t){return rt(this,`every`,e,t,void 0,arguments)},filter(e,t){return rt(this,`filter`,e,t,e=>e.map(e=>$e(this,e)),arguments)},find(e,t){return rt(this,`find`,e,t,e=>$e(this,e),arguments)},findIndex(e,t){return rt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return rt(this,`findLast`,e,t,e=>$e(this,e),arguments)},findLastIndex(e,t){return rt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return rt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return at(this,`includes`,e)},indexOf(...e){return at(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return at(this,`lastIndexOf`,e)},map(e,t){return rt(this,`map`,e,t,void 0,arguments)},pop(){return ot(this,`pop`)},push(...e){return ot(this,`push`,e)},reduce(e,...t){return it(this,`reduce`,e,t)},reduceRight(e,...t){return it(this,`reduceRight`,e,t)},shift(){return ot(this,`shift`)},some(e,t){return rt(this,`some`,e,t,void 0,arguments)},splice(...e){return ot(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return ot(this,`unshift`,e)},values(){return tt(this,`values`,e=>$e(this,e))}};function tt(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!Lt(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var nt=Array.prototype;function rt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!Lt(e),c=o[t];if(c!==nt[t]){let t=c.apply(e,a);return s?Bt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,$e(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function it(e,t,n,r){let i=Qe(e),a=i!==e&&!Lt(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=$e(e,t)),n.call(this,t,$e(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?$e(e,c):c}function at(e,t,n){let r=L(e);I(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&Rt(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function ot(e,t,n=[]){ze(),ke();let r=L(e)[t].apply(e,n);return Ae(),Be(),r}var st=e(`__proto__,__v_isRef,__isVue`),ct=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function lt(e){_(e)||(e=String(e));let t=L(this);return I(t,`has`,e),t.hasOwnProperty(e)}var ut=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Ot:Dt:i?Et:Tt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=et[t]))return e;if(t===`hasOwnProperty`)return lt}let o=Reflect.get(e,t,R(e)?e:n);if((_(t)?ct.has(t):st(t))||(r||I(e,`get`,t),i))return o;if(R(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Nt(e):e}return v(o)?r?Nt(o):jt(o):o}},dt=class extends ut{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=It(i);if(!Lt(n)&&!It(n)&&(i=L(i),n=L(n)),!a&&R(i)&&!R(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,R(e)?e:r);return e===L(r)&&(o?k(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ct.has(t))&&I(e,`has`,t),n}ownKeys(e){return I(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},ft=class extends ut{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},pt=new dt,mt=new ft,ht=new dt(!0),gt=e=>e,_t=e=>Reflect.getPrototypeOf(e);function vt(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?gt:t?Vt:Bt;return!t&&I(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function yt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function bt(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(k(n,a)&&I(i,`get`,n),I(i,`get`,a));let{has:o}=_t(i),s=t?gt:e?Vt:Bt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&I(L(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(k(t,i)&&I(r,`has`,t),I(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?gt:e?Vt:Bt;return!e&&I(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:yt(`add`),set:yt(`set`),delete:yt(`delete`),clear:yt(`clear`)}:{add(e){let n=L(this),r=_t(n),i=L(e),a=!t&&!Lt(e)&&!It(e)?i:e;return r.has.call(n,a)||k(e,a)&&r.has.call(n,e)||k(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!Lt(n)&&!It(n)&&(n=L(n));let r=L(this),{has:i,get:a}=_t(r),o=i.call(r,e);o||=(e=L(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?k(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=_t(t),i=n.call(t,e);i||=(e=L(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=vt(r,e,t)}),n}function xt(e,t){let n=bt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var St={get:xt(!1,!1)},Ct={get:xt(!1,!0)},wt={get:xt(!0,!1)},Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap;function kt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function At(e){return e.__v_skip||!Object.isExtensible(e)?0:kt(S(e))}function jt(e){return It(e)?e:Pt(e,!1,pt,St,Tt)}function Mt(e){return Pt(e,!1,ht,Ct,Et)}function Nt(e){return Pt(e,!0,mt,wt,Dt)}function Pt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=At(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Ft(e){return It(e)?Ft(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function Lt(e){return!!(e&&e.__v_isShallow)}function Rt(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}function zt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&A(e,`__v_skip`,!0),e}var Bt=e=>v(e)?jt(e):e,Vt=e=>v(e)?Nt(e):e;function R(e){return e?e.__v_isRef===!0:!1}function z(e){return Ht(e,!1)}function Ht(e,t){return R(e)?e:new Ut(e,t)}var Ut=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:L(e),this._value=t?e:Bt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Lt(e)||It(e);e=n?e:L(e),k(e,t)&&(this._rawValue=e,this._value=n?e:Bt(e),this.dep.trigger())}};function B(e){return R(e)?e.value:e}var Wt={get:(e,t,n)=>t===`__v_raw`?e:B(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return R(i)&&!R(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Gt(e){return Ft(e)?e:new Proxy(e,Wt)}var Kt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&F!==this)return Oe(this,!0),!0}get value(){let e=this.dep.track();return Pe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function qt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Kt(r,i,n)}var Jt={},Yt=new WeakMap,Xt=void 0;function Zt(e,t=!1,n=Xt){if(n){let t=Yt.get(n);t||Yt.set(n,t=[]),t.push(e)}}function Qt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:Lt(e)||o===!1||o===0?$t(e,1):$t(e),m,g,_,v,y=!1,b=!1;if(R(e)?(g=()=>e.value,y=Lt(e)):Ft(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Ft(e)||Lt(e)),g=()=>e.map(e=>{if(R(e))return e.value;if(Ft(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Xt;Xt=m;try{return f?f(e,3,[v]):e(v)}finally{Xt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>$t(e(),t)}let x=Se(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(Jt):Jt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>k(e,C[t])):k(e,C))){_&&_();let t=Xt;Xt=m;try{let t=[e,C===Jt?void 0:b&&C[0]===Jt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Xt=t}}}else m.run()};return u&&u(w),m=new we(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Zt(e,!1,m),_=m.onStop=()=>{let e=Yt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Yt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function $t(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,R(e))$t(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)$t(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{$t(e,t,n)});else if(C(e)){for(let r in e)$t(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&$t(e[r],t,n)}return e}function en(e,t,n,r){try{return r?e(...r):e()}catch(e){nn(e,t,n)}}function tn(e,t,n,r){if(h(e)){let i=en(e,t,n,r);return i&&y(i)&&i.catch(e=>{nn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(tn(e[a],t,n,r));return i}}function nn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),en(o,null,10,[e,i,a]),Be();return}}rn(e,r,a,i,s)}function rn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var V=[],an=-1,on=[],sn=null,cn=0,ln=Promise.resolve(),un=null;function dn(e){let t=un||ln;return e?t.then(this?e.bind(this):e):t}function fn(e){let t=an+1,n=V.length;for(;t<n;){let r=t+n>>>1,i=V[r],a=vn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function pn(e){if(!(e.flags&1)){let t=vn(e),n=V[V.length-1];!n||!(e.flags&2)&&t>=vn(n)?V.push(e):V.splice(fn(t),0,e),e.flags|=1,mn()}}function mn(){un||=ln.then(yn)}function hn(e){d(e)?on.push(...e):sn&&e.id===-1?sn.splice(cn+1,0,e):e.flags&1||(on.push(e),e.flags|=1),mn()}function gn(e,t,n=an+1){for(;n<V.length;n++){let t=V[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;V.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function _n(e){if(on.length){let e=[...new Set(on)].sort((e,t)=>vn(e)-vn(t));if(on.length=0,sn){sn.push(...e);return}for(sn=e,cn=0;cn<sn.length;cn++){let e=sn[cn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}sn=null,cn=0}}var vn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function yn(e){try{for(an=0;an<V.length;an++){let e=V[an];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),en(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;an<V.length;an++){let e=V[an];e&&(e.flags&=-2)}an=-1,V.length=0,_n(e),un=null,(V.length||on.length)&&yn(e)}}var bn=null,xn=null;function Sn(e){let t=bn;return bn=e,xn=e&&e.type.__scopeId||null,t}function Cn(e,t=bn,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&zi(-1);let i=Sn(t),a;try{a=e(...n)}finally{Sn(i),r._d&&zi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function wn(e,n){if(bn===null)return e;let r=ya(bn),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&$t(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function Tn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),tn(c,n,8,[e.el,s,e,t]),Be())}}function En(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function Dn(e,t,n=!1){let r=ia();if(r||Gr){let i=Gr?Gr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var On=Symbol.for(`v-scx`),kn=()=>Dn(On);function An(e,t,n){return jn(e,t,n)}function jn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(ua){if(c===`sync`){let e=kn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>tn(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{U(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():pn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Qt(e,n,u);return ua&&(f?f.push(h):d&&h()),h}function Mn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?Nn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=sa(this),s=jn(i,a.bind(r),n);return o(),s}function Nn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Pn=Symbol(`_vte`),Fn=e=>e.__isTeleport,In=Symbol(`_leaveCb`),Ln=Symbol(`_enterCb`);function Rn(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fr(()=>{e.isMounted=!0}),hr(()=>{e.isUnmounting=!0}),e}var zn=[Function,Array],Bn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:zn,onEnter:zn,onAfterEnter:zn,onEnterCancelled:zn,onBeforeLeave:zn,onLeave:zn,onAfterLeave:zn,onLeaveCancelled:zn,onBeforeAppear:zn,onAppear:zn,onAfterAppear:zn,onAppearCancelled:zn},Vn=e=>{let t=e.subTree;return t.component?Vn(t.component):t},Hn={name:`BaseTransition`,props:Bn,setup(e,{slots:t}){let n=ia(),r=Rn();return()=>{let i=t.default&&Xn(t.default(),!0);if(!i||!i.length)return;let a=Un(i),o=L(e),{mode:s}=o;if(r.isLeaving)return qn(a);let c=Jn(a);if(!c)return qn(a);let l=Kn(c,o,r,n,e=>l=e);c.type!==G&&Yn(c,l);let u=n.subTree&&Jn(n.subTree);if(u&&u.type!==G&&!Ui(u,c)&&Vn(n).type!==G){let e=Kn(u,o,r,n);if(Yn(u,e),s===`out-in`&&c.type!==G)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},qn(a);s===`in-out`&&c.type!==G?e.delayLeave=(e,t,n)=>{let i=Gn(r,u);i[String(u.key)]=u,e[In]=()=>{t(),e[In]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function Un(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==G){t=n;break}}return t}var Wn=Hn;function Gn(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Kn(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:_,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,x=String(e.key),S=Gn(n,e),C=(e,t)=>{e&&tn(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),d(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},T={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted)if(a)r=_||c;else return;t[In]&&t[In](!0);let i=S[x];i&&Ui(e,i)&&i.el[In]&&i.el[In](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=f;if(!n.isMounted)if(a)r=v||l,i=y||u,o=b||f;else return;let s=!1;t[Ln]=e=>{s||(s=!0,C(e?o:i,[t]),T.delayedLeave&&T.delayedLeave(),t[Ln]=void 0)};let c=t[Ln].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[Ln]&&t[Ln](!0),n.isUnmounting)return r();C(p,[t]);let a=!1;t[In]=n=>{a||(a=!0,r(),C(n?g:h,[t]),t[In]=void 0,S[i]===e&&delete S[i])};let o=t[In].bind(null,!1);S[i]=e,m?w(m,[t,o]):o()},clone(e){let a=Kn(e,t,n,r,i);return i&&i(a),a}};return T}function qn(e){if(ir(e))return e=Ji(e),e.children=null,e}function Jn(e){if(!ir(e))return Fn(e.type)&&e.children?Un(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function Yn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Yn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Xn(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===W?(o.patchFlag&128&&i++,r=r.concat(Xn(o.children,t,s))):(t||o.type!==G)&&r.push(s==null?o:Ji(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function Zn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function Qn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function $n(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var er=new WeakMap;function tr(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>tr(e,n&&(d(n)?n[t]:n),r,a,o));return}if(rr(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&tr(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?ya(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=L(v),b=v===t?i:e=>$n(_,e)?!1:u(y,e),x=(e,t)=>!(t&&$n(_,t));if(m!=null&&m!==p){if(nr(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(R(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))en(p,f,12,[l,_]);else{let t=g(p),n=R(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),er.delete(e)};t.id=-1,er.set(e,t),U(t,r)}else nr(e),i()}}}function nr(e){let t=er.get(e);t&&(t.flags|=8,er.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var rr=e=>!!e.type.__asyncLoader,ir=e=>e.type.__isKeepAlive;function ar(e,t){sr(e,`a`,t)}function or(e,t){sr(e,`da`,t)}function sr(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(lr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)ir(e.parent.vnode)&&cr(r,t,n,e),e=e.parent}}function cr(e,t,n,r){let i=lr(t,e,r,!0);gr(()=>{c(r[t],i)},n)}function lr(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=sa(n),a=tn(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var ur=e=>(t,n=Q)=>{(!ua||e===`sp`)&&lr(e,(...e)=>t(...e),n)},dr=ur(`bm`),fr=ur(`m`),pr=ur(`bu`),mr=ur(`u`),hr=ur(`bum`),gr=ur(`um`),_r=ur(`sp`),vr=ur(`rtg`),yr=ur(`rtc`);function br(e,t=Q){lr(`ec`,e,t)}var xr=Symbol.for(`v-ndc`);function Sr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Ft(e),r=!1,s=!1;n&&(r=!Lt(e),s=It(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Vt(Bt(e[n])):Bt(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var Cr=e=>e?la(e)?ya(e):Cr(e.parent):null,wr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Cr(e.parent),$root:e=>Cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Nr(e),$forceUpdate:e=>e.f||=()=>{pn(e.update)},$nextTick:e=>e.n||=dn.bind(e.proxy),$watch:e=>Mn.bind(e)}),Tr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),Er={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(Tr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else Or&&(s[n]=0)}let d=wr[n],f,p;if(d)return n===`$attrs`&&I(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return Tr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||Tr(n,c)||u(o,c)||u(i,c)||u(wr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function Dr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var Or=!0;function kr(e){let t=Nr(e),n=e.proxy,i=e.ctx;Or=!1,t.beforeCreate&&jr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:E,renderTriggered:ee,errorCaptured:D,serverPrefetch:te,expose:O,inheritAttrs:ne,components:re,directives:k,filters:ie}=t;if(u&&Ar(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=jt(t))}if(Or=!0,o)for(let e in o){let t=o[e],a=$({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)Mr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{En(t,e[t])})}f&&jr(f,e,`c`);function A(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(A(dr,p),A(fr,m),A(pr,g),A(mr,_),A(ar,y),A(or,b),A(br,D),A(yr,E),A(vr,ee),A(hr,S),A(gr,w),A(_r,te),d(O))if(O.length){let t=e.exposed||={};O.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),ne!=null&&(e.inheritAttrs=ne),re&&(e.components=re),k&&(e.directives=k),te&&Qn(e)}function Ar(e,t,n=r){d(e)&&(e=Rr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Dn(r.from||n,r.default,!0):Dn(r.from||n):Dn(r),R(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function jr(e,t,n){tn(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Mr(e,t,n,r){let i=r.includes(`.`)?Nn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&An(i,n)}else if(h(e))An(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>Mr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&An(i,r,e)}}function Nr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Pr(c,e,o,!0)),Pr(c,t,o)),v(t)&&a.set(t,c),c}function Pr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Pr(e,a,n,!0),i&&i.forEach(t=>Pr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Fr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Fr={data:Ir,props:Br,emits:Br,methods:zr,computed:zr,beforeCreate:H,created:H,beforeMount:H,mounted:H,beforeUpdate:H,updated:H,beforeDestroy:H,beforeUnmount:H,destroyed:H,unmounted:H,activated:H,deactivated:H,errorCaptured:H,serverPrefetch:H,components:zr,directives:zr,watch:Vr,provide:Ir,inject:Lr};function Ir(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function Lr(e,t){return zr(Rr(e),Rr(t))}function Rr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function H(e,t){return e?[...new Set([].concat(e,t))]:t}function zr(e,t){return e?s(Object.create(null),e,t):t}function Br(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),Dr(e),Dr(t??{})):t}function Vr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=H(e[r],t[r]);return n}function Hr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Ur=0;function Wr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Hr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Ur++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:Sa,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||X(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,ya(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(tn(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Gr;Gr=l;try{return e()}finally{Gr=t}}};return l}}var Gr=null,Kr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${D(t)}Modifiers`]||e[`${O(t)}Modifiers`];function qr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Kr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(ae)));let c,l=i[c=re(n)]||i[c=re(D(n))];!l&&o&&(l=i[c=re(O(n))]),l&&tn(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,tn(u,e,6,a)}}var Jr=new WeakMap;function Yr(e,t,n=!1){let r=n?Jr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Yr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Xr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,O(t))||u(e,t))}function Zr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=Sn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Xi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Xi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Qr(c)}}catch(t){Ii.length=0,nn(t,e,1),v=X(G)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=$r(y,a)),b=Ji(b,y,!1,!0))}return n.dirs&&(b=Ji(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Yn(b,n.transition),v=b,Sn(_),v}var Qr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},$r=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function ei(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?ti(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(ni(o,r,n)&&!Xr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?ti(r,o,l):!0:!!o;return!1}function ti(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(ni(t,e,a)&&!Xr(n,a))return!0}return!1}function ni(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!_e(r,i):r!==i}function ri({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var ii={},ai=()=>Object.create(ii),oi=e=>Object.getPrototypeOf(e)===ii;function si(e,t,n,r=!1){let i={},a=ai();e.propsDefaults=Object.create(null),li(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Mt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function ci(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=L(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Xr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=D(o);i[t]=ui(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{li(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=O(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=ui(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function li(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(T(t))continue;let l=n[t],d;a&&u(a,d=D(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Xr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=L(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=ui(a,n,s,i[s],e,!u(i,s))}}return s}function ui(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=sa(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===O(n))&&(r=!0))}return r}var di=new WeakMap;function fi(e,r,i=!1){let a=i?di:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=fi(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=D(c[e]);pi(n)&&(l[n]=t)}else if(c)for(let e in c){let t=D(e);if(pi(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function pi(e){return e[0]!==`$`&&!T(e)}var mi=e=>e===`_`||e===`_ctx`||e===`$stable`,hi=e=>d(e)?e.map(Xi):[Xi(e)],gi=(e,t,n)=>{if(t._n)return t;let r=Cn((...e)=>hi(t(...e)),n);return r._c=!1,r},_i=(e,t,n)=>{let r=e._ctx;for(let n in e){if(mi(n))continue;let i=e[n];if(h(i))t[n]=gi(n,i,r);else if(i!=null){let e=hi(i);t[n]=()=>e}}},vi=(e,t)=>{let n=hi(t);e.slots.default=()=>n},yi=(e,t,n)=>{for(let r in t)(n||!mi(r))&&(e[r]=t[r])},bi=(e,t,n)=>{let r=e.slots=ai();if(e.vnode.shapeFlag&32){let e=t._;e?(yi(r,t,n),n&&A(r,`_`,e,!0)):_i(t,r)}else t&&vi(e,t)},xi=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:yi(a,n,r):(o=!n.$stable,_i(n,a)),s=n}else n&&(vi(e,n),s={default:1});if(o)for(let e in a)!mi(e)&&s[e]==null&&delete a[e]},U=Ni;function Si(e){return Ci(e)}function Ci(e,i){let a=ce();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Ui(e,t)&&(r=ge(e),pe(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Pi:y(e,t,n,r);break;case G:b(e,t,n,r);break;case Fi:e??x(t,n,r,o);break;case W:re(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?k(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,N)}u!=null&&i?tr(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&tr(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)E(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),te(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},E=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&D(e.children,d,null,r,i,wi(e,a),s,u),_&&Tn(e,null,r,`created`),ee(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!T(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&ea(f,r,e)}_&&Tn(e,null,r,`beforeMount`);let v=Ei(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&U(()=>{try{f&&ea(f,r,e),v&&g.enter(d),_&&Tn(e,null,r,`mounted`)}finally{}},i)},ee=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Mi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;ee(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},D=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Zi(e[l]):Xi(e[l]),t,n,r,i,a,o,s)},te=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&Ti(r,!1),(g=h.onVnodeBeforeUpdate)&&ea(g,r,n,e),f&&Tn(n,e,r,`beforeUpdate`),r&&Ti(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?O(e.dynamicChildren,d,l,r,i,wi(n,a),o):s||le(e,n,l,null,r,i,wi(n,a),o,!1),u>0){if(u&16)ne(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&ne(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&U(()=>{g&&ea(g,r,n,e),f&&Tn(n,e,r,`updated`)},i)},O=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===W||!Ui(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},ne=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!T(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(T(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},re=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),D(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(O(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&Di(e,t,!0)):le(e,t,n,f,i,a,s,c,l)},k=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):A(t,n,r,i,a,o,c):ae(e,t,c)},A=(e,t,n,r,i,a,o)=>{let s=e.component=ra(e,r,i);if(ir(e)&&(s.ctx.renderer=N),da(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,oe,o),!e.el){let r=s.subTree=X(G);b(null,r,t,n),e.placeholder=r.el}}else oe(s,e,t,n,i,a,o)},ae=(e,t,n)=>{let r=t.component=e.component;if(ei(e,t,n))if(r.asyncDep&&!r.asyncResolved){se(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},oe=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=ki(e);if(n){t&&(t.el=c.el,se(e,t,o)),n.asyncDep.then(()=>{U(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;Ti(e,!1),t?(t.el=c.el,se(e,t,o)):t=c,n&&ie(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&ea(d,s,t,c),Ti(e,!0);let f=Zr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ge(p),e,i,a),t.el=f.el,u===null&&ri(e,f.el),r&&U(r,i),(d=t.props&&t.props.onVnodeUpdated)&&U(()=>ea(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=rr(t);if(Ti(e,!1),l&&ie(l),!m&&(o=c&&c.onVnodeBeforeMount)&&ea(o,d,t),Ti(e,!0),s&&be){let t=()=>{e.subTree=Zr(e),be(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Zr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&U(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;U(()=>ea(o,d,e),i)}(t.shapeFlag&256||d&&rr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&U(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new we(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>pn(u),Ti(e,!0),l()},se=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,ci(e,t.props,r,n),xi(e,t.children,n),ze(),gn(e),Be()},le=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}else if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&he(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):he(l,i,a,!0):(u&8&&p(n,``),m&16&&D(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Zi(t[p]):Xi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?he(e,a,o,!0,!1,f):D(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Zi(t[u]):Xi(t[u]);if(Ui(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Zi(t[p]):Xi(t[p]);if(Ui(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Zi(t[u]):Xi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)pe(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Zi(t[u]):Xi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){pe(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Ui(n,t[_])){i=_;break}i===void 0?pe(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?Oi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||ji(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,N);return}if(c===W){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Fi){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),U(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[In](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},pe=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),tr(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!rr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&ea(_,t,e),u&6)M(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Tn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,N,r):l&&!l.hasOnce&&(a!==W||d>0&&d&64)?he(l,t,n,!1,!0):(a===W&&d&384||!i&&u&16)&&he(c,t,n),r&&j(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&U(()=>{_&&ea(_,t,e),h&&Tn(e,null,t,`unmounted`),v&&(e.el=null)},n)},j=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===W){me(n,r);return}if(t===Fi){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},me=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},M=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;Ai(c),Ai(l),r&&ie(r),i.stop(),a&&(a.flags|=8,pe(o,e,t,n)),s&&U(s,t),U(()=>{e.isUnmounted=!0},t)},he=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)pe(e[o],t,n,r,i)},ge=e=>{if(e.shapeFlag&6)return ge(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Pn];return n?h(n):t},_e=!1,ve=(e,t,n)=>{let r;e==null?t._vnode&&(pe(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,_e||=(_e=!0,gn(r),_n(),!1)},N={p:v,um:pe,m:fe,r:j,mt:A,mc:D,pc:le,pbc:O,n:ge,o:e},ye,be;return i&&([ye,be]=i(N)),{render:ve,hydrate:ye,createApp:Wr(ve,ye)}}function wi({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function Ti({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Ei(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Di(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Zi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&Di(t,a)),a.type===Pi&&(a.patchFlag===-1&&(a=i[e]=Zi(a)),a.el=t.el),a.type===G&&!a.el&&(a.el=t.el)}}function Oi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function ki(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ki(t)}function Ai(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ji(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?ji(t.subTree):null}var Mi=e=>e.__isSuspense;function Ni(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):hn(e)}var W=Symbol.for(`v-fgt`),Pi=Symbol.for(`v-txt`),G=Symbol.for(`v-cmt`),Fi=Symbol.for(`v-stc`),Ii=[],K=null;function q(e=!1){Ii.push(K=e?null:[])}function Li(){Ii.pop(),K=Ii[Ii.length-1]||null}var Ri=1;function zi(e,t=!1){Ri+=e,e<0&&K&&t&&(K.hasOnce=!0)}function Bi(e){return e.dynamicChildren=Ri>0?K||n:null,Li(),Ri>0&&K&&K.push(e),e}function J(e,t,n,r,i,a){return Bi(Y(e,t,n,r,i,a,!0))}function Vi(e,t,n,r,i){return Bi(X(e,t,n,r,i,!0))}function Hi(e){return e?e.__v_isVNode===!0:!1}function Ui(e,t){return e.type===t.type&&e.key===t.key}var Wi=({key:e})=>e??null,Gi=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||R(e)||h(e)?{i:bn,r:e,k:t,f:!!n}:e);function Y(e,t=null,n=null,r=0,i=null,a=e===W?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Wi(t),ref:t&&Gi(t),scopeId:xn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:bn};return s?(Qi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Ri>0&&!o&&K&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&K.push(c),c}var X=Ki;function Ki(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===xr)&&(e=G),Hi(e)){let r=Ji(e,t,!0);return n&&Qi(r,n),Ri>0&&!a&&K&&(r.shapeFlag&6?K[K.indexOf(e)]=r:K.push(r)),r.patchFlag=-2,r}if(ba(e)&&(e=e.__vccOpts),t){t=qi(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=j(e)),v(n)&&(Rt(n)&&!d(n)&&(n=s({},n)),t.style=le(n))}let o=g(e)?1:Mi(e)?128:Fn(e)?64:v(e)?4:h(e)?2:0;return Y(e,t,n,r,i,o,a,!0)}function qi(e){return e?Rt(e)||oi(e)?s({},e):e:null}function Ji(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?$i(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Wi(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Gi(t)):[a,Gi(t)]:Gi(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==W?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ji(e.ssContent),ssFallback:e.ssFallback&&Ji(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Yn(u,c.clone(u)),u}function Yi(e=` `,t=0){return X(Pi,null,e,t)}function Z(e=``,t=!1){return t?(q(),Vi(G,null,e)):X(G,null,e)}function Xi(e){return e==null||typeof e==`boolean`?X(G):d(e)?X(W,null,e.slice()):Hi(e)?Zi(e):X(Pi,null,String(e))}function Zi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ji(e)}function Qi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Qi(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!oi(t)?t._ctx=bn:r===3&&bn&&(bn.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:bn},n=32):(t=String(t),r&64?(n=16,t=[Yi(t)]):n=8);e.children=t,e.shapeFlag|=n}function $i(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=j([t.class,r.class]));else if(e===`style`)t.style=le([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function ea(e,t,n,r=null){tn(e,t,7,[n,r])}var ta=Hr(),na=0;function ra(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||ta,o={uid:na++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new xe(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:fi(i,a),emitsOptions:Yr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=qr.bind(null,o),e.ce&&e.ce(o),o}var Q=null,ia=()=>Q||bn,aa,oa;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};aa=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),oa=t(`__VUE_SSR_SETTERS__`,e=>ua=e)}var sa=e=>{let t=Q;return aa(e),e.scope.on(),()=>{e.scope.off(),aa(t)}},ca=()=>{Q&&Q.scope.off(),aa(null)};function la(e){return e.vnode.shapeFlag&4}var ua=!1;function da(e,t=!1,n=!1){t&&oa(t);let{props:r,children:i}=e.vnode,a=la(e);si(e,r,a,t),bi(e,i,n||t);let o=a?fa(e,t):void 0;return t&&oa(!1),o}function fa(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Er);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?va(e):null,i=sa(e),a=en(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!rr(e)&&Qn(e),o){if(a.then(ca,ca),t)return a.then(n=>{pa(e,n,t)}).catch(t=>{nn(t,e,0)});e.asyncDep=a}else pa(e,a,t)}else ga(e,t)}function pa(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Gt(t)),ga(e,n)}var ma,ha;function ga(e,t,n){let i=e.type;if(!e.render){if(!t&&ma&&!i.render){let t=i.template||Nr(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=ma(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,ha&&ha(e)}{let t=sa(e);ze();try{kr(e)}finally{Be(),t()}}}var _a={get(e,t){return I(e,`get`,``),e[t]}};function va(e){return{attrs:new Proxy(e.attrs,_a),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function ya(e){return e.exposed?e.exposeProxy||=new Proxy(Gt(zt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in wr)return wr[n](e)},has(e,t){return t in e||t in wr}}):e.proxy}function ba(e){return h(e)&&`__vccOpts`in e}var $=(e,t)=>qt(e,t,ua);function xa(e,t,n){try{zi(-1);let r=arguments.length;return r===2?v(t)&&!d(t)?Hi(t)?X(e,null,[t]):X(e,t):X(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Hi(n)&&(n=[n]),X(e,t,n))}finally{zi(1)}}var Sa=`3.5.31`,Ca=void 0,wa=typeof window<`u`&&window.trustedTypes;if(wa)try{Ca=wa.createPolicy(`vue`,{createHTML:e=>e})}catch{}var Ta=Ca?e=>Ca.createHTML(e):e=>e,Ea=`http://www.w3.org/2000/svg`,Da=`http://www.w3.org/1998/Math/MathML`,Oa=typeof document<`u`?document:null,ka=Oa&&Oa.createElement(`template`),Aa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Oa.createElementNS(Ea,e):t===`mathml`?Oa.createElementNS(Da,e):n?Oa.createElement(e,{is:n}):Oa.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Oa.createTextNode(e),createComment:e=>Oa.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Oa.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{ka.innerHTML=Ta(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=ka.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ja=`transition`,Ma=`animation`,Na=Symbol(`_vtc`),Pa={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Fa=s({},Bn,Pa),Ia=(e=>(e.displayName=`Transition`,e.props=Fa,e))((e,{slots:t})=>xa(Wn,za(e),t)),La=(e,t=[])=>{d(e)?e.forEach(e=>e(...t)):e&&e(...t)},Ra=e=>e?d(e)?e.some(e=>e.length>1):e.length>1:!1;function za(e){let t={};for(let n in e)n in Pa||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=a,appearActiveClass:u=o,appearToClass:d=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,h=Ba(i),g=h&&h[0],_=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:x,onLeaveCancelled:S,onBeforeAppear:C=v,onAppear:w=y,onAppearCancelled:T=b}=t,E=(e,t,n,r)=>{e._enterCancelled=r,Ua(e,t?d:c),Ua(e,t?u:o),n&&n()},ee=(e,t)=>{e._isLeaving=!1,Ua(e,f),Ua(e,m),Ua(e,p),t&&t()},D=e=>(t,n)=>{let i=e?w:y,o=()=>E(t,e,n);La(i,[t,o]),Wa(()=>{Ua(t,e?l:a),Ha(t,e?d:c),Ra(i)||Ka(t,r,g,o)})};return s(t,{onBeforeEnter(e){La(v,[e]),Ha(e,a),Ha(e,o)},onBeforeAppear(e){La(C,[e]),Ha(e,l),Ha(e,u)},onEnter:D(!1),onAppear:D(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>ee(e,t);Ha(e,f),e._enterCancelled?(Ha(e,p),Xa(e)):(Xa(e),Ha(e,p)),Wa(()=>{e._isLeaving&&(Ua(e,f),Ha(e,m),Ra(x)||Ka(e,r,_,n))}),La(x,[e,n])},onEnterCancelled(e){E(e,!1,void 0,!0),La(b,[e])},onAppearCancelled(e){E(e,!0,void 0,!0),La(T,[e])},onLeaveCancelled(e){ee(e),La(S,[e])}})}function Ba(e){if(e==null)return null;if(v(e))return[Va(e.enter),Va(e.leave)];{let t=Va(e);return[t,t]}}function Va(e){return oe(e)}function Ha(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[Na]||(e[Na]=new Set)).add(t)}function Ua(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[Na];n&&(n.delete(t),n.size||(e[Na]=void 0))}function Wa(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var Ga=0;function Ka(e,t,n,r){let i=e._endId=++Ga,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=qa(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function qa(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${ja}Delay`),a=r(`${ja}Duration`),o=Ja(i,a),s=r(`${Ma}Delay`),c=r(`${Ma}Duration`),l=Ja(s,c),u=null,d=0,f=0;t===ja?o>0&&(u=ja,d=o,f=a.length):t===Ma?l>0&&(u=Ma,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?ja:Ma:null,f=u?u===ja?a.length:c.length:0);let p=u===ja&&/\b(?:transform|all)(?:,|$)/.test(r(`${ja}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function Ja(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>Ya(t)+Ya(e[n])))}function Ya(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function Xa(e){return(e?e.ownerDocument:document).body.offsetHeight}function Za(e,t,n){let r=e[Na];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var Qa=Symbol(`_vod`),$a=Symbol(`_vsh`),eo=Symbol(``),to=/(?:^|;)\s*display\s*:/;function no(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??io(r,t,``)}else for(let e in t)n[e]??io(r,e,``);for(let e in n)e===`display`&&(a=!0),io(r,e,n[e])}else if(i){if(t!==n){let e=r[eo];e&&(n+=`;`+e),r.cssText=n,a=to.test(n)}}else t&&e.removeAttribute(`style`);Qa in e&&(e[Qa]=a?r.display:``,e[$a]&&(r.display=`none`))}var ro=/\s*!important$/;function io(e,t,n){if(d(n))n.forEach(n=>io(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=so(e,t);ro.test(n)?e.setProperty(O(r),n.replace(ro,``),`important`):e[r]=n}}var ao=[`Webkit`,`Moz`,`ms`],oo={};function so(e,t){let n=oo[t];if(n)return n;let r=D(t);if(r!==`filter`&&r in e)return oo[t]=r;r=ne(r);for(let n=0;n<ao.length;n++){let i=ao[n]+r;if(i in e)return oo[t]=i}return t}var co=`http://www.w3.org/1999/xlink`;function lo(e,t,n,r,i,a=M(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(co,t.slice(6,t.length)):e.setAttributeNS(co,t,n):n==null||a&&!he(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function uo(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?Ta(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=he(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function fo(e,t,n,r){e.addEventListener(t,n,r)}function po(e,t,n,r){e.removeEventListener(t,n,r)}var mo=Symbol(`_vei`);function ho(e,t,n,r,i=null){let a=e[mo]||(e[mo]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=_o(t);r?fo(e,n,a[t]=xo(r,i),s):o&&(po(e,n,o,s),a[t]=void 0)}}var go=/(?:Once|Passive|Capture)$/;function _o(e){let t;if(go.test(e)){t={};let n;for(;n=e.match(go);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):O(e.slice(2)),t]}var vo=0,yo=Promise.resolve(),bo=()=>vo||=(yo.then(()=>vo=0),Date.now());function xo(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;tn(So(e,n.value),t,5,[e])};return n.value=e,n.attached=bo(),n}function So(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var Co=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,wo=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?Za(e,r,c):t===`style`?no(e,n,r):a(t)?o(t)||ho(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):To(e,t,r,c))?(uo(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&lo(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Eo(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?uo(e,D(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),lo(e,t,r,c))};function To(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Co(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Co(t)&&g(n)?!1:t in e}function Eo(e,t){let n=e._def.props;if(!n)return!1;let r=D(t);return Array.isArray(n)?n.some(e=>D(e)===r):Object.keys(n).some(e=>D(e)===r)}var Do=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>ie(t,e):t};function Oo(e){e.target.composing=!0}function ko(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Ao=Symbol(`_assign`);function jo(e,t,n){return t&&(e=e.trim()),n&&(e=ae(e)),e}var Mo={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[Ao]=Do(i);let a=r||i.props&&i.props.type===`number`;fo(e,t?`change`:`input`,t=>{t.target.composing||e[Ao](jo(e.value,n,a))}),(n||a)&&fo(e,`change`,()=>{e.value=jo(e.value,n,a)}),t||(fo(e,`compositionstart`,Oo),fo(e,`compositionend`,ko),fo(e,`change`,ko))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Ao]=Do(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ae(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},No=[`ctrl`,`shift`,`alt`,`meta`],Po={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>No.some(n=>e[`${n}Key`]&&!t.includes(n))},Fo=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Po[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},Io=s({patchProp:wo},Aa),Lo;function Ro(){return Lo||=Si(Io)}var zo=((...e)=>{let t=Ro().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Vo(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,Bo(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function Bo(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Vo(e){return g(e)?document.querySelector(e):e}function Ho(e){return e.value===`wild`||e.value===`wild_draw_four`}function Uo(e){return e.chosenColor==null?e.color:e.chosenColor}function Wo(e){if(typeof e.value==`number`)return String(e.value);switch(e.value){case`skip`:return`Skip`;case`reverse`:return`Rev`;case`draw_two`:return`+2`;case`wild`:return`Wild`;case`wild_draw_four`:return`+4`}}function Go(e){let t=Uo(e);return`${t?t.charAt(0).toUpperCase()+t.slice(1):``} ${Wo(e)}`.trim()}function Ko(e){return e.discardPile.length>0?e.discardPile[0]:null}function qo(e,t,n){let r=e.players.map((e,r)=>r===t?n(e):e);return{...e,players:r}}function Jo(e){let t=e.players.length,n=e.direction===`clockwise`?1:t-1,r=e.currentPlayer;do r=(r+n)%t;while(e.finished.includes(r)&&r!==e.currentPlayer);return r}function Yo(e,t,n){let r=[[t,n],...e.recentPlays].slice(0,4);return{...e,recentPlays:r}}function Xo(e){let t=qo(e,e.currentPlayer,e=>({...e,hand:e.hand.map(e=>({...e,drawn:!1}))}));return{...t,currentPlayer:Jo(t)}}var Zo=[`red`,`blue`,`green`,`yellow`],Qo=[`skip`,`reverse`,`draw_two`];function $o(){let e=[];for(let t of Zo){e.push({color:t,value:0});for(let n=1;n<=9;n++)for(let r=0;r<2;r++)e.push({color:t,value:n});for(let n of Qo)for(let r=0;r<2;r++)e.push({color:t,value:n})}for(let t=0;t<4;t++)e.push({color:null,value:`wild`});for(let t=0;t<4;t++)e.push({color:null,value:`wild_draw_four`});return e}function es(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function ts(e,t){return[e.slice(0,t),e.slice(t)]}function ns(e){return es(e.map(e=>({...e,chosenColor:null})))}function rs(e){return e.hand.length}function is(e,t){let n=e.hand[t],r=[...e.hand.slice(0,t),...e.hand.slice(t+1)];return[n,{...e,hand:r}]}function as(e,t){return{...e,hand:[...e.hand,...t]}}function os(e,t){return!!(Ho(e)||Uo(e)===Uo(t)||e.value===t.value)}function ss(e,t){return e.map((e,t)=>[t,e]).filter(([,e])=>os(e,t))}function cs(e,t){return ss(e,t).map(([e])=>e)}var ls=`Rank,Girl Name,Boy Name
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
1000,Anjali,Zayne
`,us=7,ds=ls.trim().split(`
`).slice(1).flatMap(e=>{let[,t,n]=e.split(`,`);return[t?.trim(),n?.trim()].filter(e=>!!e)});function fs(e,t){let n=ds.filter(t=>t.toLowerCase()!==e.toLowerCase()),r=[];for(let e=0;e<t;e++){let e=Math.floor(Math.random()*n.length);r.push(n[e]),n.splice(e,1)}return r}function ps(e,t=4){let n=es($o()),r=fs(e,t-1),i=[{id:0,name:e,type:`human`,hand:[],saidUno:!1},...r.map((e,t)=>({id:t+1,name:e,type:`ai`,hand:[],saidUno:!1}))],a=[];for(let e of i){let[t,r]=ts(n,us);a.push({...e,hand:t}),n=r}let[o,s]=vs(n);return n=s,ys({players:a,drawPile:n,discardPile:[o],currentPlayer:0,direction:`counter_clockwise`,phase:`playing`,finished:[],lastAction:`Game started! ${Go(o)} on the pile.`,unoPenalty:!1,recentPlays:[]},o)}function ms(e,t,n,r){let i=e.players[t].hand[n],a=Ko(e);return e.phase===`playing`?e.currentPlayer===t?i?os(i,a)?Ho(i)&&!r?{ok:!1,error:`must_choose_color`}:bs(e,t,n,i,r??null):{ok:!1,error:`not_playable`}:{ok:!1,error:`invalid_card`}:{ok:!1,error:`not_your_turn`}:{ok:!1,error:`wrong_phase`}}function hs(e,t){return e.phase===`playing`?e.currentPlayer===t?ws(e,t):{ok:!1,error:`not_your_turn`}:{ok:!1,error:`wrong_phase`}}function gs(e,t){let n=e.players[t];return{ok:!0,state:{...qo(e,t,e=>({...e,saidUno:!0})),lastAction:`${n.name} called ONE!`}}}function _s(e,t){return e.currentPlayer===t?{ok:!0,state:Xo(e)}:{ok:!1,error:`not_your_turn`}}function vs(e){let[[t],n]=ts(e,1);return t.value===`wild_draw_four`?vs(es([...n,t])):[t,n]}function ys(e,t){let n=e.players[e.currentPlayer].name;switch(t.value){case`skip`:return Xo({...e,lastAction:`${Go(t)} - ${n} is skipped!`});case`reverse`:return Xo({...e,discardPile:[{...e.discardPile[0],reverseTo:`clockwise`},...e.discardPile.slice(1)],direction:`clockwise`,lastAction:`${Go(t)} - Reversed! Playing clockwise.`});case`draw_two`:{let[r,i]=Ts(e.drawPile,e.discardPile,2),a=e.currentPlayer,o={...e,drawPile:i};return o=qo(o,a,e=>as(e,r)),{...o,lastAction:`${Go(t)} - ${n} drew 2!`}}case`wild`:{let n=[`red`,`blue`,`green`,`yellow`],r=n[Math.floor(Math.random()*n.length)],i={...t,chosenColor:r};return{...e,discardPile:[i],lastAction:`Wild opened - color is ${r}!`}}default:return e}}function bs(e,t,n,r,i){let a=Ho(r)?{...r,chosenColor:i}:r,o=e.players[t],[,s]=is(o,n),c={...e,discardPile:[a,...e.discardPile]};c=qo(c,t,()=>s),c=Yo(c,o.name,a);let l=rs(c.players[t]);if(c={...c,unoPenalty:!1},l===0){if(o.saidUno)return{ok:!0,state:xs(c,t,a)};{c=Es(c,t);let e=c.lastAction;return c=Cs(c,a,t),c={...c,unoPenalty:t===0,lastAction:`${e} ${c.lastAction}`},{ok:!0,state:c}}}else return l>1&&(c=qo(c,t,e=>({...e,saidUno:!1}))),c=Cs(c,a,t),{ok:!0,state:c}}function xs(e,t,n){let r=e.players[t],i=[...e.finished,t],a=e.players.map((e,t)=>t).filter(e=>!i.includes(e));if(a.length<=1)return{...e,phase:`game_over`,finished:[...i,...a],lastAction:i.length===1?`${r.name} wins!`:`${r.name} is out! Game over.`};let o=Cs({...e,finished:i},n,t);return{...o,lastAction:`${r.name} is out in ${Ss(i.length)}! ${o.lastAction}`}}function Ss(e){return`${e}${[`th`,`st`,`nd`,`rd`][e%10<=3&&Math.floor(e/10)!==1?e%10:0]}`}function Cs(e,t,n){let r=e.players[n];switch(t.value){case`skip`:{let n=Jo(e),i=e.players[n];return Xo(Xo({...e,lastAction:`${r.name} played ${Go(t)} - ${i.name} is skipped!`}))}case`reverse`:{let n=e.direction===`clockwise`?`counter_clockwise`:`clockwise`;return Xo({...e,discardPile:[{...e.discardPile[0],reverseTo:n},...e.discardPile.slice(1)],recentPlays:e.recentPlays.map((e,t)=>t===0?[e[0],{...e[1],reverseTo:n}]:e),direction:n,lastAction:`${r.name} played ${Go(t)} - Reversed!`})}case`draw_two`:{let n=Jo(e),i=e.players[n],[a,o]=Ts(e.drawPile,e.discardPile,2),s={...e,drawPile:o};return s=qo(s,n,e=>as(e,a)),Xo({...s,lastAction:`${r.name} played ${Go(t)} - ${i.name} drew 2!`})}case`wild`:{let n=t.chosenColor;return Xo({...e,lastAction:`${r.name} played Wild - chose ${n}!`})}case`wild_draw_four`:{let n=Jo(e),i=e.players[n],a=t.chosenColor,[o,s]=Ts(e.drawPile,e.discardPile,4),c={...e,drawPile:s};return c=qo(c,n,e=>as(e,o)),Xo({...c,lastAction:`${r.name} played Wild +4 - ${i.name} drew 4! Color is ${a}!`})}default:return Xo({...e,lastAction:`${r.name} played ${Go(t)}.`})}}function ws(e,t){let[n,r]=Ts(e.drawPile,e.discardPile,1),i=n[0],a=e.players[t],o={...e,drawPile:r};return o=qo(o,t,e=>as(e,[i])),o={...o,lastAction:`${a.name} drew a card.`},{ok:!0,state:o,drawnCard:i}}function Ts(e,t,n){if(e.length>=n){let[t,r]=ts(e,n);return[t.map(e=>({...e,drawn:!0})),r]}let[,...r]=t,i=ns(r),a=[...e,...i],[o,s]=ts(a,Math.min(n,a.length));return[o.map(e=>({...e,drawn:!0})),s]}function Es(e,t){let n=e.players[t],[r,i]=Ts(e.drawPile,e.discardPile,2),a={...e,drawPile:i};return a=qo(a,t,e=>as(e,r)),{...a,lastAction:`${n.name} forgot to call ONE! Drew 2 penalty cards.`}}function Ds(e,t){let n=e.players[t],r=Ko(e),i=ss(n.hand,r);if(i.length===0)return{type:`draw`};let[a,o]=ks(i);return{type:`play`,cardIndex:a,color:Ho(o)?Os(n.hand):null}}function Os(e){let t=[`red`,`blue`,`green`,`yellow`],n=e.filter(e=>!Ho(e));if(n.length===0)return t[Math.floor(Math.random()*t.length)];let r=new Map;for(let e of n)e.color&&r.set(e.color,(r.get(e.color)??0)+1);if(r.size===0)return t[Math.floor(Math.random()*t.length)];let i=t[0],a=0;for(let[e,t]of r)t>a&&(i=e,a=t);return i}function ks(e){return e.reduce((e,t)=>As(t[1])>As(e[1])?t:e)}function As(e){switch(e.value){case`draw_two`:return 100;case`skip`:return 90;case`reverse`:return 50;case`wild`:return 10;case`wild_draw_four`:return 5;default:return 60+e.value}}var js;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(js||={});var Ms=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Ns=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,Ps=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Ns(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new Ms(`"${e}" plugin is not implemented on ${c}`,js.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}else throw new Ms(`"${e}.${t}()" is not implemented on ${c}`,js.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,`name`,{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{g({eventName:e,callbackId:await n},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=Ms,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Fs=(e=>e.Capacitor=Ps(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),Is=Fs.registerPlugin,Ls=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(!r){if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}return}r.forEach(e=>e(t))}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new Fs.Exception(e,js.Unimplemented)}unavailable(e=`not available`){return new Fs.Exception(e,js.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},Rs=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),zs=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Bs=class extends Ls{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=zs(n).trim(),r=zs(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=Rs(e.key),n=Rs(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};Is(`CapacitorCookies`,{web:()=>new Bs});var Vs=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),Hs=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},Us=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,Ws=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=Hs(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else (r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},Gs=class extends Ls{async request(e){let t=Ws(e,e.webFetchExtra),n=Us(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Vs(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};Is(`CapacitorHttp`,{web:()=>new Gs});var Ks;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Ks||={});var qs;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(qs||={});var Js=class extends Ls{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};Is(`SystemBars`,{web:()=>new Js});var Ys=`modulepreload`,Xs=function(e,t){return new URL(e,t).href},Zs={},Qs=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=Xs(t,n),t in Zs)return;Zs[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:Ys,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},$s=Is(`Preferences`,{web:()=>Qs(()=>import(`./web-BhidJ7Wq.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),ec=``;async function tc(){let{value:e}=await $s.get({key:`device_id`});return ec=e??crypto.randomUUID(),e||await $s.set({key:`device_id`,value:ec}),ec}var nc=`__capgo_keep_url_path_after_reload`,rc=`__capgo_history_stack__`,ic=100;if(typeof window<`u`&&typeof document<`u`&&typeof history<`u`){let e=window;if(!e.__capgoHistoryPatched){e.__capgoHistoryPatched=!0;let t=()=>{try{if(e.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(nc)===`1`}catch{return!1}},n=()=>{try{let e=window.sessionStorage.getItem(rc);if(!e)return{stack:[],index:-1};let t=JSON.parse(e);return!t||!Array.isArray(t.stack)||typeof t.index!=`number`?{stack:[],index:-1}:t}catch{return{stack:[],index:-1}}},r=(e,t)=>{try{window.sessionStorage.setItem(rc,JSON.stringify({stack:e,index:t}))}catch{}},i=()=>{try{window.sessionStorage.removeItem(rc)}catch{}},a=e=>{try{let t=e??window.location.href,n=new URL(t instanceof URL?t.toString():t,window.location.href);return`${n.pathname}${n.search}${n.hash}`}catch{return null}},o=(e,t)=>{if(e.length<=ic)return{stack:e,index:t};let n=e.length-ic;return{stack:e.slice(n),index:Math.max(0,t-n)}},s=e=>{document.readyState===`complete`||document.readyState===`interactive`?e():window.addEventListener(`DOMContentLoaded`,e,{once:!0})},c=!1,l=!1,u=!1,d=()=>{if(!c)return;let e=n(),t=a();if(t){if(e.stack.length===0){e.stack.push(t),e.index=0,r(e.stack,e.index);return}(e.index<0||e.index>=e.stack.length)&&(e.index=e.stack.length-1),e.stack[e.index]!==t&&(e.stack[e.index]=t,r(e.stack,e.index))}},f=(e,t)=>{if(!c||l)return;let i=a(e);if(!i)return;let{stack:s,index:u}=n();s.length===0?(s.push(i),u=s.length-1):t?((u<0||u>=s.length)&&(u=s.length-1),s[u]=i):u>=s.length-1?(s.push(i),u=s.length-1):(s=s.slice(0,u+1),s.push(i),u=s.length-1),{stack:s,index:u}=o(s,u),r(s,u)},p=()=>{if(!c||l)return;let e=n();if(e.stack.length===0){d();return}let t=e.index>=0&&e.index<e.stack.length?e.index:e.stack.length-1,r=a();if(e.stack.length===1&&r===e.stack[0])return;let i=e.stack[0];if(!i)return;l=!0;try{history.replaceState(history.state,document.title,i);for(let t=1;t<e.stack.length;t+=1)history.pushState(history.state,document.title,e.stack[t])}catch{l=!1;return}l=!1;let o=t-(e.stack.length-1);o===0?(history.replaceState(history.state,document.title,e.stack[t]),window.dispatchEvent(new PopStateEvent(`popstate`))):history.go(o)},m=()=>{!c||u||(u=!0,s(()=>{u=!1,p()}))},h=null,g=null,_=()=>{if(!c||l)return;let e=a();if(!e)return;let t=n(),i=t.stack.lastIndexOf(e);i>=0?t.index=i:(t.stack.push(e),t.index=t.stack.length-1);let s=o(t.stack,t.index);r(s.stack,s.index)},v=()=>{h&&g||(h=history.pushState,g=history.replaceState,history.pushState=function(e,t,n){let r=h?.call(history,e,t,n);return f(n,!1),r},history.replaceState=function(e,t,n){let r=g?.call(history,e,t,n);return f(n,!0),r},window.addEventListener(`popstate`,_))},y=()=>{h&&=(history.pushState=h,null),g&&=(history.replaceState=g,null),window.removeEventListener(`popstate`,_)},b=e=>{if(c===e){c&&(d(),m());return}c=e,c?(v(),d(),m()):(y(),i())};window.addEventListener(`CapacitorUpdaterKeepUrlPathAfterReload`,t=>{let n=t?.detail?.enabled;typeof n==`boolean`?(e.__capgoKeepUrlPathAfterReload=n,b(n)):(e.__capgoKeepUrlPathAfterReload=!0,b(!0))}),b(t())}}var ac;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.UPDATE_NOT_AVAILABLE=1]=`UPDATE_NOT_AVAILABLE`,e[e.UPDATE_AVAILABLE=2]=`UPDATE_AVAILABLE`,e[e.UPDATE_IN_PROGRESS=3]=`UPDATE_IN_PROGRESS`})(ac||={});var oc;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.PENDING=1]=`PENDING`,e[e.DOWNLOADING=2]=`DOWNLOADING`,e[e.INSTALLING=3]=`INSTALLING`,e[e.INSTALLED=4]=`INSTALLED`,e[e.FAILED=5]=`FAILED`,e[e.CANCELED=6]=`CANCELED`,e[e.DOWNLOADED=11]=`DOWNLOADED`})(oc||={});var sc;(function(e){e[e.OK=0]=`OK`,e[e.CANCELED=1]=`CANCELED`,e[e.FAILED=2]=`FAILED`,e[e.NOT_AVAILABLE=3]=`NOT_AVAILABLE`,e[e.NOT_ALLOWED=4]=`NOT_ALLOWED`,e[e.INFO_MISSING=5]=`INFO_MISSING`})(sc||={});var cc=Is(`CapacitorUpdater`,{web:()=>Qs(()=>import(`./web-Ct9bve_5.js`).then(e=>new e.CapacitorUpdaterWeb),[],import.meta.url)}),lc=`builtin`;async function uc(e){Fs.isNativePlatform()&&(await cc.setCustomId({customId:e}),lc=(await cc.current()).bundle.version,await cc.notifyAppReady())}var dc=`https://uno-stats.aibotted849.workers.dev`;function fc(e){let t=JSON.stringify({...e,device_id:ec,bundle:lc});navigator.sendBeacon(dc,new Blob([t],{type:`application/json`}))}var pc=800,mc=1500;function hc(){let e=z(null),t=z(`lobby`),n=z(``),r=z(4),i=z(localStorage.getItem(`uno_instant_cpu`)===`true`),a=null,o=0;function s(n){e.value=n,t.value=`playing`,o=Date.now(),fc({event:`started`,players:n.players.length}),g(n)}function c(e){t.value=`game_over`,fc({event:`finished`,players:e.players.length,winner:e.players[e.finished[0]].type===`human`?`human`:`ai`,duration_s:Math.round((Date.now()-o)/1e3)})}function l(e,t){n.value=e,r.value=t,s(ps(e,t))}function u(){a&&clearTimeout(a),e.value=null,t.value=`lobby`}function d(){a&&clearTimeout(a),s(ps(n.value,r.value))}function f(t,n){if(!e.value)return;let r=ms(e.value,0,t,n);r.ok&&(e.value=r.state,r.state.phase===`game_over`&&c(r.state),g(r.state))}function p(){if(!e.value)return null;let t=hs(e.value,0);if(t.ok){e.value=t.state;let n=Ko(t.state);if(n&&os(t.drawnCard,n))return g(t.state),t.drawnCard;{let n=_s(t.state,0);return n.ok&&(e.value=n.state,g(n.state)),t.drawnCard}}return null}function m(){if(!e.value)return;let t=gs(e.value,0);t.ok&&(e.value=t.state)}function h(t,n){if(!e.value)return;let r=e.value,i=r.players[0].hand;if(t>=0&&t<i.length&&n>=0&&n<i.length){let a=i[t],o=[...i.slice(0,t),...i.slice(t+1)];o.splice(n,0,a),e.value=qo(r,0,e=>({...e,hand:o}))}}function g(e){if(a&&clearTimeout(a),e.phase===`playing`&&e.players[e.currentPlayer].type===`ai`){let e=i.value?0:pc+Math.floor(Math.random()*(mc-pc));a=setTimeout(()=>_(),e)}}function _(){if(!e.value)return;let t=e.value;if(t.phase!==`playing`)return;let n=t.currentPlayer,r=t.players[n];if(r.type!==`ai`)return;if(rs(r)===2){let e=gs(t,n);e.ok&&(t=e.state)}let i=Ds(t,n);if(i.type===`play`){let e=ms(t,n,i.cardIndex,i.color);t=e.ok?e.state:b(t,n)}else{let e=hs(t,n);e.ok&&(t=v(e.state,n,e.drawnCard))}e.value=t,t.phase===`game_over`&&c(t),g(t)}function v(e,t,n){let r=Ko(e);if(r&&os(n,r)){let r=e.players[t],i=ms(e,t,r.hand.length-1,Ho(n)?Os(r.hand):null);return i.ok?i.state:y(e,t)}return y(e,t)}function y(e,t){let n=_s(e,t);return n.ok?n.state:e}function b(e,t){let n=hs(e,t);if(n.ok){let e=_s(n.state,t);return e.ok?e.state:n.state}return e}return{gameState:e,phase:t,playerName:n,startGame:l,restartGame:d,quitToLobby:u,playCard:f,drawCard:p,sayUno:m,reorderHand:h,instantCpu:i,setInstantCpu(e){i.value=e,localStorage.setItem(`uno_instant_cpu`,String(e))}}}var gc=[`aria-checked`,`tabindex`,`onClick`],_c=Zn({__name:`PlayerCountPicker`,props:{modelValue:{},options:{}},emits:[`update:modelValue`],setup(e,{emit:t}){let n=e,r=t,i=$(()=>n.options.indexOf(n.modelValue));function a(e){let t=e.key===`ArrowRight`||e.key===`ArrowUp`?1:e.key===`ArrowLeft`||e.key===`ArrowDown`?-1:0;if(!t)return;e.preventDefault();let a=n.options[Math.max(0,Math.min(n.options.length-1,i.value+t))];r(`update:modelValue`,a)}return(t,n)=>(q(),J(`div`,{class:`segmented`,role:`radiogroup`,style:le({"--count":e.options.length,"--selected":i.value}),onKeydown:a},[n[0]||=Y(`span`,{class:`segmented__thumb`,"aria-hidden":`true`},null,-1),(q(!0),J(W,null,Sr(e.options,t=>(q(),J(`button`,{key:t,type:`button`,role:`radio`,class:j([`segmented__option`,{"segmented__option--selected":t===e.modelValue}]),"aria-checked":t===e.modelValue,tabindex:t===e.modelValue?0:-1,onClick:e=>r(`update:modelValue`,t)},N(t),11,gc))),128))],36))}}),vc=[`draggable`,`data-card-index`],yc={class:`card__corner card__corner--top`},bc={key:0,class:`card__center card__center--reverse`},xc={key:1,class:`card__center`},Sc={class:`card__corner card__corner--bottom`},Cc={key:2,class:`card__drawn-star`},wc=Zn({__name:`CardFace`,props:{card:{},index:{},playable:{type:Boolean},disabled:{type:Boolean},draggable:{type:Boolean},direction:{}},emits:[`play`],setup(e,{emit:t}){let n=e,r=t;function i(e,t){return e===`red`?`card--red`:e===`blue`?`card--blue`:e===`green`?`card--green`:e===`yellow`?`card--yellow`:`card--wild`}function a(){return n.card.reverseTo?n.card.reverseTo===`clockwise`:n.direction?n.direction===`counter_clockwise`:!1}function o(){n.playable&&n.index!=null&&r(`play`,n.index)}return(t,n)=>(q(),J(`div`,{class:j([`card`,i(B(Uo)(e.card),B(Ho)(e.card)),e.playable&&`card--playable`,e.disabled&&`card--disabled`]),draggable:e.draggable?`true`:`false`,"data-card-index":e.index,onClick:o},[Y(`span`,yc,N(B(Wo)(e.card)),1),e.card.value===`reverse`?(q(),J(`span`,bc,N(a()?`↻`:`↺`),1)):(q(),J(`span`,xc,N(B(Wo)(e.card)),1)),Y(`span`,Sc,N(B(Wo)(e.card)),1),n[0]||=Y(`div`,{class:`card__oval`},null,-1),e.card.drawn?(q(),J(`span`,Cc,`★`)):Z(``,!0)],10,vc))}}),Tc={class:`ai-hand__label`},Ec={class:`ai-hand__name`},Dc={class:`ai-hand__count`},Oc={key:0,class:`ai-hand__target-badge`},kc=Zn({__name:`AiHand`,props:{player:{},position:{},isCurrent:{type:Boolean},isTarget:{type:Boolean}},setup(e){let t=e,n=()=>rs(t.player),r=()=>Math.min(n(),10);return(t,i)=>(q(),J(`div`,{class:j([`ai-hand`,`ai-hand--${e.position}`,e.isCurrent&&`ai-hand--active`,e.isTarget&&`ai-hand--target`])},[Y(`div`,Tc,[Y(`span`,Ec,N(e.player.name),1),Y(`span`,Dc,N(n())+` cards`,1),e.isTarget?(q(),J(`span`,Oc,`your target`)):Z(``,!0)]),Y(`div`,{class:j([`ai-hand__cards`,`ai-hand__cards--${e.position}`])},[(q(!0),J(W,null,Sr(r(),t=>(q(),J(`div`,{key:t,class:j([`card`,`card--back`,`card--small`,`ai-card--${e.position}`]),style:le(`--card-index: ${t-1}; --card-total: ${r()};`)},[...i[0]||=[Y(`span`,{class:`card__uno-text card__uno-text--small`},`♛`,-1)]],6))),128))],2)],2))}}),Ac=[`data-value`,`data-color`,`data-last-player`],jc={class:`card__corner card__corner--top`},Mc={key:0,class:`card__center card__center--large card__center--reverse`},Nc={key:1,class:`card__center card__center--large`},Pc={class:`card__corner card__corner--bottom`},Fc=Zn({__name:`DiscardPile`,props:{card:{},lastPlayer:{}},setup(e){function t(e,t){return e===`red`?`card--red`:e===`blue`?`card--blue`:e===`green`?`card--green`:e===`yellow`?`card--yellow`:`card--wild`}return(n,r)=>(q(),J(`div`,{id:`discard-top`,class:j([`card`,`card--large`,t(B(Uo)(e.card),B(Ho)(e.card))]),"data-value":B(Wo)(e.card),"data-color":B(Uo)(e.card)||``,"data-last-player":e.lastPlayer??-1},[Y(`span`,jc,N(B(Wo)(e.card)),1),e.card.value===`reverse`?(q(),J(`span`,Mc,N(e.card.reverseTo===`clockwise`?`↻`:`↺`),1)):(q(),J(`span`,Nc,N(B(Wo)(e.card)),1)),Y(`span`,Pc,N(B(Wo)(e.card)),1),r[0]||=Y(`div`,{class:`card__oval`},null,-1)],10,Ac))}}),Ic={class:`color-chooser__grid`},Lc=Zn({__name:`ColorChooser`,props:{visible:{type:Boolean}},emits:[`choose`,`cancel`],setup(e,{emit:t}){let n=t;return(t,r)=>e.visible?(q(),J(`div`,{key:0,class:`modal-overlay`,onClick:r[5]||=e=>n(`cancel`)},[Y(`div`,{class:`color-chooser`,onClick:r[4]||=Fo(()=>{},[`stop`])},[r[6]||=Y(`h3`,{class:`color-chooser__title`},`Choose a color`,-1),Y(`div`,Ic,[Y(`button`,{class:`color-btn color-btn--red`,onClick:r[0]||=e=>n(`choose`,`red`)}),Y(`button`,{class:`color-btn color-btn--blue`,onClick:r[1]||=e=>n(`choose`,`blue`)}),Y(`button`,{class:`color-btn color-btn--green`,onClick:r[2]||=e=>n(`choose`,`green`)}),Y(`button`,{class:`color-btn color-btn--yellow`,onClick:r[3]||=e=>n(`choose`,`yellow`)})])])])):Z(``,!0)}}),Rc={class:`top-bar`},zc={class:`top-bar__status`},Bc={key:0,class:`out-toast`},Vc=[`data-direction`,`data-from`,`data-to`],Hc=[`data-player`],Uc=[`data-player`],Wc={class:`center-area`},Gc={class:`center-area__piles`},Kc={key:0,class:`recent-plays`},qc={class:`discard-area`},Jc=[`data-player`],Yc={class:`game-table__bottom`},Xc={key:0,class:`your-turn-indicator`},Zc={class:`human-hand__label`},Qc={key:0,class:`human-hand__name`},$c=Zn({__name:`GameBoard`,props:{gameState:{},choosingColor:{type:Boolean},isNewGame:{type:Boolean}},emits:[`playCard`,`drawCard`,`sayUno`,`newGame`,`chooseColor`,`cancelColor`,`reorderHand`,`dealComplete`,`menu`],setup(e,{emit:t}){let n=null,r=null,i=null;function a(){let e=document.getElementById(`direction-arrow`);if(!e)return null;let t=parseInt(e.dataset.from),n=parseInt(e.dataset.to),r=e.closest(`.game-table`);if(!r)return null;let i=r.getBoundingClientRect(),a=window.matchMedia(`(orientation: landscape) and (max-height: 500px)`).matches,o=window.innerWidth<=1100&&!a,s=window.innerWidth<=640||a,c=s?20:35,l=e=>e===0?r.querySelector(`.human-hand__cards`):r.querySelector(`[data-player="${e}"] .ai-hand__cards`),u=o?(e,t)=>{let n=l(e);if(!n)return null;let r=n.closest(`.ai-hand`)||n.closest(`.human-hand`),a=(r||n).getBoundingClientRect(),o=l(t);if(!o)return null;let s=(o.closest(`.ai-hand`)||o.closest(`.human-hand`)||o).getBoundingClientRect();if(e===0){let e=r?.querySelector(`.your-turn-indicator`),t=e?e.getBoundingClientRect():a,n=s.left-i.left+s.width/2;return{x:t.left-i.left+t.width/2,y:t.top-i.top-c,_humanArc:!0,_arcRight:n>i.width/2}}if(t===0){let e=a.left-i.left+a.width/2;return{x:e,y:a.bottom-i.top+c,_humanArc:!0,_arcRight:e>i.width/2}}if(Math.min(a.bottom,s.bottom)-Math.max(a.top,s.top)>Math.min(a.height,s.height)*.5)return{x:a.left-i.left+a.width/2,y:a.bottom-i.top+c,_sameRow:!0};{let e=s.top>a.top;return{x:a.left-i.left+a.width/2,y:e?a.bottom-i.top+c:a.top-i.top-c}}}:(e,t)=>{let n=l(e);if(!n)return null;let r=n.querySelectorAll(`.card`);if(r.length===0)return null;let a=se(e),o=se(t);if(a===`bottom`||a===`top`){let e=o===`right`||(a===`bottom`?o===`top`:o===`bottom`),t=(e?r[r.length-1]:r[0]).getBoundingClientRect();return{x:e?t.right-i.left+c:t.left-i.left-c,y:t.top-i.top+t.height/2}}let s=n.closest(`.ai-hand`),u=s.querySelector(`.ai-hand__label`);if(o===`top`&&u){let e=u.getBoundingClientRect();return{x:e.left-i.left+e.width/2,y:e.top-i.top-c}}let d=s.getBoundingClientRect();return{x:d.left-i.left+d.width/2,y:d.bottom-i.top+c}},d=u(t,n),f=u(n,t);if(!d||!f)return null;let p,m,h=s?8:12;if(d._humanArc||f._humanArc){p=d._arcRight||f._arcRight?i.width-h:h;let e=r.querySelector(`.draw-pile`)?.getBoundingClientRect();m=e?e.top-i.top+e.height/2:(d.y+f.y)/2}else if(d._sameRow){let e=(d.x+f.x)/2,t=Math.abs(f.x-d.x);p=e,m=d.y+t*.5}else{let e=i.width/2,t=i.height/2,n=(d.x+f.x)/2,r=(d.y+f.y)/2,a=n-e,o=r-t,c=Math.sqrt(a*a+o*o)||1,l=s?40:80;p=n+a/c*l,m=r+o/c*l}return{sx:d.x,sy:d.y,cpX:p,cpY:m,ex:f.x,ey:f.y}}function o(e){let t=document.getElementById(`arrow-line`),n=document.getElementById(`arrow-head`);if(!t)return;let r=window.matchMedia(`(orientation: landscape) and (max-height: 500px)`).matches,i=window.innerWidth<=640||r,a=i?28:48,o=e.ex-e.cpX,s=e.ey-e.cpY,c=Math.sqrt(o*o+s*s),l=o/c,u=s/c,d=e.ex-l*a,f=e.ey-u*a;if(t.setAttribute(`d`,`M ${e.sx} ${e.sy} Q ${e.cpX} ${e.cpY} ${d} ${f}`),n){let t=i?14:24;n.setAttribute(`points`,`${e.ex-l*a+u*t} ${e.ey-u*a-l*t}, ${e.ex} ${e.ey}, ${e.ex-l*a-u*t} ${e.ey-u*a+l*t}`)}}function s(e,t,n){return{sx:e.sx+(t.sx-e.sx)*n,sy:e.sy+(t.sy-e.sy)*n,cpX:e.cpX+(t.cpX-e.cpX)*n,cpY:e.cpY+(t.cpY-e.cpY)*n,ex:e.ex+(t.ex-e.ex)*n,ey:e.ey+(t.ey-e.ey)*n}}function c(e){i&&=(cancelAnimationFrame(i),null),requestAnimationFrame(()=>{let t=a();if(!t)return;if(!e||!n){o(t),n=t;return}let c=r||n,l=performance.now(),u=e=>{let a=e-l,d=Math.min(a/500,1);r=s(c,t,d<.5?4*d*d*d:1-(-2*d+2)**3/2),o(r),d<1?i=requestAnimationFrame(u):(n=t,r=null,i=null)};i=requestAnimationFrame(u)})}let l=null,u=null,d=null,f=null;function p(e){return`${e.dataset.value||``}${e.dataset.color||``}`}function m(e){let t=e.closest(`.game-table`);if(!t)return null;let n=parseInt(e.dataset.lastPlayer||`-1`,10);if(n===0){let e=Date.now()-(u||0);return l&&e<2e3?l:null}if(n<1)return null;let r=t.querySelector(`[data-player="${n}"] .ai-hand__cards`);if(!r)return null;let i=r.querySelectorAll(`.card`);return i.length===0?null:i[i.length-1].getBoundingClientRect()}function h(e,t,n){let r=n.cloneNode(!0);r.id=``,r.style.cssText=`
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
      `;let s=document.createElement(`div`);s.className=`card card--back`,s.innerHTML=`<span class="card__uno-text">♛</span>`,s.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px;`;let c=e.cloneNode(!0);c.style.cssText=`position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 10px;`,o.appendChild(s),o.appendChild(c),a.appendChild(o),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.left=r.left+`px`,a.style.top=r.top+`px`,a.style.width=r.width+`px`,a.style.height=r.height+`px`}),setTimeout(()=>{o.style.transform=`rotateY(180deg)`},400+i),setTimeout(()=>{a.remove(),e.style.visibility=``},750+i)});let t=750+(r.length-1)*80+50;setTimeout(()=>e?.(),t)})}function b(e){l=e.getBoundingClientRect(),u=Date.now()}function x(){d=Date.now()}let S=e,C=t,w=$(()=>S.gameState.players[0]),T=$(()=>Ko(S.gameState)),E=$(()=>S.gameState.currentPlayer===0&&S.gameState.phase===`playing`),ee=$(()=>E.value&&T.value?cs(w.value.hand,T.value):[]),D=$(()=>E.value),te=$(()=>S.gameState.phase===`playing`),O=$(()=>Jo({...S.gameState,currentPlayer:0})),ne=$(()=>S.gameState.currentPlayer),re=$(()=>Jo(S.gameState)),k={1:[`top`],2:[`left`,`right`],3:[`left`,`top`,`right`]},ie=$(()=>{let{players:e,finished:t,phase:n}=S.gameState;return e.map((e,t)=>t).filter(e=>e!==0&&(n===`game_over`||!t.includes(e)))}),A=$(()=>{let e=k[ie.value.length]??k[3];return Object.fromEntries(e.map((e,t)=>[e,ie.value[t]]))}),ae=z(``),oe=null;An(()=>S.gameState.finished.length,(e,t)=>{if(e<=t||S.gameState.phase===`game_over`)return;let n=S.gameState.finished[e-1];ae.value=`${S.gameState.players[n].name} is out in ${Ss(e)}!`,oe&&clearTimeout(oe),oe=setTimeout(()=>ae.value=``,3e3)});function se(e){return e===0?`bottom`:Object.keys(A.value).find(t=>A.value[t]===e)??`top`}let ce=$(()=>{let e=S.gameState.recentPlays;if(e.length===0)return-1;let t=e[0][0];return S.gameState.players.findIndex(e=>e.name===t)}),ue=!1;fr(()=>{S.isNewGame?(ue=!0,dn(()=>{y(()=>{ue=!1,C(`dealComplete`),c(!1)})})):dn(()=>{c(!1),g(!1)})});let de=()=>c(!1);fr(()=>window.addEventListener(`resize`,de)),gr(()=>window.removeEventListener(`resize`,de)),An(()=>[S.gameState.currentPlayer,S.gameState.direction],()=>{ue||dn(()=>c(!0))}),An(()=>S.gameState.discardPile[0],()=>{ue||dn(()=>g(!0))}),An(()=>S.gameState.players[0]?.hand.length,(e,t)=>{if(!ue&&t!==void 0&&e>t){let n=e-t;d||=Date.now(),dn(()=>v(!0,n))}});function fe(e){let t=document.querySelector(`#human-hand-cards [data-card-index="${e}"]`);t&&b(t),C(`playCard`,e)}function pe(){D.value&&(x(),C(`drawCard`))}let me=null,M=null;function he(e,t){let n=Array.from(t.querySelectorAll(`[data-card-index]`)),r=null,i=1/0,a=!1;for(let t of n){let n=t.getBoundingClientRect(),o=n.left+n.width/2,s=Math.abs(e-o);s<i&&(i=s,r=t,a=e>=o)}return{closest:r,insertAfter:a}}function ge(e,t,n){M||(M=document.createElement(`div`),M.className=`drop-indicator`);let r=e.getBoundingClientRect(),i=t.getBoundingClientRect();M.style.height=i.height+`px`,M.style.left=(n?i.right:i.left)-r.left+`px`,M.style.top=i.top-r.top+`px`,M.parentElement||e.appendChild(M)}function _e(){M&&M.parentElement&&M.remove()}function ve(e){let t=e.target.closest(`[data-card-index]`);t&&(me=parseInt(t.dataset.cardIndex),t.classList.add(`card--dragging`),e.dataTransfer&&(e.dataTransfer.effectAllowed=`move`))}function ye(e){let t=e.target.closest(`[data-card-index]`);t&&t.classList.remove(`card--dragging`),me=null,_e()}function be(e){if(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),me===null)return;let t=e.target.closest(`.human-hand__cards`);if(!t)return;let{closest:n,insertAfter:r}=he(e.clientX,t);n&&ge(t,n,r)}function P(e){if(e.preventDefault(),_e(),me===null)return;let t=e.target.closest(`.human-hand__cards`);if(!t)return;let{closest:n,insertAfter:r}=he(e.clientX,t);if(n){let e=parseInt(n.dataset.cardIndex);r&&(e+=1),me<e&&--e,me!==e&&C(`reorderHand`,me,e)}me=null}return(t,n)=>(q(),J(W,null,[Y(`div`,Rc,[n[5]||=Y(`h1`,{class:`top-bar__title`},`Card Royale`,-1),Y(`div`,zc,N(e.gameState.lastAction),1),Y(`button`,{class:`top-bar__new-game`,onClick:n[0]||=e=>C(`newGame`)},`New Game`)]),ae.value?(q(),J(`div`,Bc,N(ae.value),1)):Z(``,!0),Y(`div`,{class:j([`game-table`,`game-table--${e.gameState.direction}`])},[e.gameState.phase===`game_over`?Z(``,!0):(q(),J(`svg`,{key:0,class:`direction-arrow`,id:`direction-arrow`,"data-direction":e.gameState.direction,"data-from":ne.value,"data-to":re.value},[...n[6]||=[Y(`defs`,null,[Y(`marker`,{id:`arrowhead`,markerWidth:`32`,markerHeight:`28`,refX:`32`,refY:`14`,orient:`auto`,markerUnits:`userSpaceOnUse`},[Y(`polygon`,{points:`0 0, 32 14, 0 28`,fill:`white`,opacity:`0.35`})])],-1),Y(`path`,{id:`arrow-line`,fill:`none`,stroke:`white`,"stroke-opacity":`0.3`,"stroke-width":`12`},null,-1),Y(`polygon`,{id:`arrow-head`,fill:`white`,opacity:`0.35`},null,-1)]],8,Vc)),Y(`div`,{class:`game-table__top`,"data-player":A.value.top},[A.value.top==null?Z(``,!0):(q(),Vi(kc,{key:0,player:e.gameState.players[A.value.top],position:`top`,"is-current":e.gameState.currentPlayer===A.value.top,"is-target":O.value===A.value.top},null,8,[`player`,`is-current`,`is-target`]))],8,Hc),Y(`div`,{class:`game-table__left`,"data-player":A.value.left},[A.value.left==null?Z(``,!0):(q(),Vi(kc,{key:0,player:e.gameState.players[A.value.left],position:`left`,"is-current":e.gameState.currentPlayer===A.value.left,"is-target":O.value===A.value.left},null,8,[`player`,`is-current`,`is-target`]))],8,Uc),Y(`div`,Wc,[Y(`div`,Gc,[e.gameState.recentPlays.length>0?(q(),J(`div`,Kc,[n[7]||=Y(`div`,{class:`recent-plays__label`},`Card Play History`,-1),(q(!0),J(W,null,Sr([...e.gameState.recentPlays].reverse(),([,e],t)=>(q(),J(`div`,{key:t,class:`recent-play`},[X(wc,{card:e,index:-1,playable:!1,disabled:!1,draggable:!1,style:{"--card-index":`0`,"--card-total":`1`}},null,8,[`card`])]))),128))])):Z(``,!0),Y(`div`,{id:`draw-pile`,class:j([`draw-pile`,D.value&&`draw-pile--active`]),onClick:pe},[...n[8]||=[Y(`div`,{class:`card card--back card--large`},[Y(`span`,{class:`card__uno-text`},`♛`)],-1)]],2),Y(`div`,qc,[T.value?(q(),Vi(Fc,{key:0,card:T.value,"last-player":ce.value},null,8,[`card`,`last-player`])):Z(``,!0)])]),e.gameState.phase===`game_over`?Z(``,!0):(q(),J(`button`,{key:0,class:`menu-btn`,onClick:n[1]||=e=>C(`menu`)},`Menu`))]),Y(`div`,{class:`game-table__right`,"data-player":A.value.right},[A.value.right==null?Z(``,!0):(q(),Vi(kc,{key:0,player:e.gameState.players[A.value.right],position:`right`,"is-current":e.gameState.currentPlayer===A.value.right,"is-target":O.value===A.value.right},null,8,[`player`,`is-current`,`is-target`]))],8,Jc),Y(`div`,Yc,[Y(`div`,{class:j([`human-hand`,E.value&&`human-hand--active`])},[E.value?(q(),J(`div`,Xc,`It's your turn!`)):Z(``,!0),Y(`div`,Zc,[e.gameState.phase===`game_over`?Z(``,!0):(q(),J(`span`,Qc,N(w.value.name),1)),te.value?(q(),J(`button`,{key:1,class:`uno-btn`,onClick:n[2]||=e=>C(`sayUno`)},`ONE!`)):Z(``,!0)]),Y(`div`,{id:`human-hand-cards`,class:`human-hand__cards`,onDragstart:ve,onDragend:ye,onDragover:be,onDrop:P},[(q(!0),J(W,null,Sr(w.value.hand,(t,n)=>(q(),Vi(wc,{key:n,card:t,index:n,playable:ee.value.includes(n),draggable:!0,direction:e.gameState.direction,style:le(`--card-index: ${n}; --card-total: ${w.value.hand.length};`),onPlay:fe},null,8,[`card`,`index`,`playable`,`direction`,`style`]))),128))],32)],2)])],2),X(Lc,{visible:e.choosingColor,onChoose:n[3]||=e=>C(`chooseColor`,e),onCancel:n[4]||=e=>C(`cancelColor`)},null,8,[`visible`])],64))}}),el={class:`modal-overlay`},tl={class:`game-over`},nl={class:`game-over__title`},rl={class:`game-over__placements`},il=Zn({__name:`GameOverOverlay`,props:{placements:{}},emits:[`playAgain`],setup(e,{emit:t}){let n=t;return(t,r)=>(q(),J(`div`,el,[Y(`div`,tl,[Y(`h2`,nl,N(e.placements[0])+` wins!`,1),Y(`ol`,rl,[(q(!0),J(W,null,Sr(e.placements,e=>(q(),J(`li`,{key:e},N(e),1))),128))]),Y(`button`,{class:`btn-play-again`,onClick:r[0]||=e=>n(`playAgain`)},`Play Again`)])]))}}),al=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},ol={},sl={class:`card card--back`};function cl(e,t){return q(),J(`div`,sl,[...t[0]||=[Y(`span`,{class:`card__uno-text`},`♛`,-1)]])}var ll=al(ol,[[`render`,cl]]),ul={class:`tutorial__header`},dl={class:`tutorial__dots`},fl={class:`tutorial__step-title`},pl={key:0,class:`tutorial__match-row`},ml={class:`tutorial__card-group`},hl={class:`tutorial__card-group`},gl={class:`tutorial__cards`},_l={key:1,class:`tutorial__match-row`},vl={class:`tutorial__card-group`},yl={class:`tutorial__card-group`},bl={key:2,class:`tutorial__cards`},xl={key:3,class:`tutorial__color-circles`},Sl={key:4,class:`tutorial__uno-demo`},Cl=[`innerHTML`],wl={key:5,class:`tutorial__tip`},Tl={class:`tutorial__footer`},El={key:1},Dl=Zn({__name:`TutorialOverlay`,emits:[`close`],setup(e,{emit:t}){let n=t,r=[{title:`The Goal`,body:`Be the <strong>first player</strong> to play all the cards in your hand. You play against 1 or 3 computer opponents — whoever empties their hand first wins!`,cards:[{color:`red`,value:7},{color:`blue`,value:3},{color:`green`,value:9}],tip:`Keep an eye on how many cards your opponents have.`},{title:`Matching Cards`,body:`On your turn, play a card that matches the top card by <strong>color</strong> or <strong>value</strong>.`,discardCard:{color:`red`,value:5},cards:[{color:`red`,value:8},{color:`blue`,value:5}],tip:`Red 8 matches by color, Blue 5 matches by value.`},{title:`Drawing Cards`,body:`If you can't play any card, tap the <strong>draw pile</strong> to draw one. If the drawn card is playable, it appears with a <strong>star</strong> — you can play it right away or keep it.`,drawStep:!0,cards:[{color:`blue`,value:2,drawn:!0}],tip:`A star on a card means you just drew it.`},{title:`Action Cards`,body:`<strong>Skip</strong> — next player loses their turn.<br><strong>Reverse</strong> — changes the direction of play.<br><strong>Draw Two (+2)</strong> — next player draws 2 cards and loses their turn.`,cards:[{color:`blue`,value:`skip`},{color:`green`,value:`reverse`},{color:`red`,value:`draw_two`}],tip:`The arrow on a Reverse card shows the direction play will switch to in your hand, or the direction it changed to when it was played.`},{title:`Wild Cards`,body:`<strong>Wild</strong> — play it anytime and choose the next color.<br><strong>Wild +4</strong> — play it anytime, choose the color, and the next player draws 4 cards and loses their turn.`,cards:[{color:null,value:`wild`},{color:null,value:`wild_draw_four`}],tip:`Wild cards can be played on any card, regardless of color or value.`},{title:`Choosing a Color`,body:`After playing a Wild card, you'll pick one of the four colors. The next player must match the color you choose. Or play a Wild card!`,colorCircles:!0,tip:`Once played, a Wild card changes to show the chosen color.`,cards:[{color:null,value:`wild`,chosenColor:`green`},{color:null,value:`wild_draw_four`,chosenColor:`red`}]},{title:`Calling ONE!`,body:`When you're down to <strong>one card</strong>, press the <strong>ONE</strong> button before playing your last card. If you forget, you'll draw <strong>2 penalty cards</strong> instead of winning!`,unoButton:!0,tip:`Press ONE after playing your second-to-last card, before your final play.`},{title:`You're Ready!`,body:`That's everything you need to know. Play cards by matching color or value, use action cards strategically, and don't forget to call ONE. <strong>Good luck!</strong>`,cards:[{color:`red`,value:0},{color:`blue`,value:`skip`},{color:null,value:`wild`},{color:`green`,value:`reverse`},{color:`yellow`,value:7}]}],i=z(0),a=z(`tutorial-slide-left`);function o(){i.value<r.length-1?(a.value=`tutorial-slide-left`,i.value++):n(`close`)}function s(){i.value>0&&(a.value=`tutorial-slide-right`,i.value--)}function c(e){e.key===`ArrowRight`||e.key===`Enter`?o():e.key===`ArrowLeft`?s():e.key===`Escape`&&n(`close`)}return fr(()=>window.addEventListener(`keydown`,c)),gr(()=>window.removeEventListener(`keydown`,c)),(e,t)=>(q(),J(`div`,{class:`modal-overlay`,onClick:t[2]||=e=>n(`close`)},[Y(`div`,{class:`tutorial`,onClick:t[1]||=Fo(()=>{},[`stop`])},[Y(`div`,ul,[Y(`div`,dl,[(q(),J(W,null,Sr(r,(e,t)=>Y(`span`,{key:t,class:j([`tutorial__dot`,t===i.value&&`tutorial__dot--active`,t<i.value&&`tutorial__dot--done`])},null,2)),64))]),Y(`button`,{class:`tutorial__close`,onClick:t[0]||=e=>n(`close`)},`×`)]),X(Ia,{name:a.value,mode:`out-in`},{default:Cn(()=>[(q(),J(`div`,{key:i.value,class:`tutorial__body`},[Y(`h2`,fl,N(r[i.value].title),1),r[i.value].discardCard?(q(),J(`div`,pl,[Y(`div`,ml,[t[3]||=Y(`span`,{class:`tutorial__card-group-label`},`Top Card`,-1),X(wc,{card:r[i.value].discardCard,disabled:!1},null,8,[`card`])]),t[5]||=Y(`span`,{class:`tutorial__match-arrow`},`←`,-1),Y(`div`,hl,[t[4]||=Y(`span`,{class:`tutorial__card-group-label`},`Your Hand`,-1),Y(`div`,gl,[(q(!0),J(W,null,Sr(r[i.value].cards,(e,t)=>(q(),Vi(wc,{key:t,card:e,disabled:!1},null,8,[`card`]))),128))])])])):r[i.value].drawStep?(q(),J(`div`,_l,[Y(`div`,vl,[t[6]||=Y(`span`,{class:`tutorial__card-group-label`},`Drawn Card`,-1),X(wc,{card:r[i.value].cards[0],disabled:!1},null,8,[`card`])]),t[8]||=Y(`span`,{class:`tutorial__match-arrow`},`←`,-1),Y(`div`,yl,[t[7]||=Y(`span`,{class:`tutorial__card-group-label`},`Draw Pile`,-1),X(ll)])])):r[i.value].cards?(q(),J(`div`,bl,[(q(!0),J(W,null,Sr(r[i.value].cards,(e,t)=>(q(),Vi(wc,{key:t,card:e,disabled:!1},null,8,[`card`]))),128))])):Z(``,!0),r[i.value].colorCircles?(q(),J(`div`,xl,[...t[9]||=[Y(`span`,{class:`tutorial__color-circle tutorial__color-circle--red`},null,-1),Y(`span`,{class:`tutorial__color-circle tutorial__color-circle--blue`},null,-1),Y(`span`,{class:`tutorial__color-circle tutorial__color-circle--green`},null,-1),Y(`span`,{class:`tutorial__color-circle tutorial__color-circle--yellow`},null,-1)]])):Z(``,!0),r[i.value].unoButton?(q(),J(`div`,Sl,[...t[10]||=[Y(`button`,{class:`uno-btn uno-btn--demo`},`ONE`,-1)]])):Z(``,!0),Y(`p`,{class:`tutorial__step-text`,innerHTML:r[i.value].body},null,8,Cl),r[i.value].tip?(q(),J(`div`,wl,[t[11]||=Y(`strong`,null,`Tip:`,-1),Yi(` `+N(r[i.value].tip),1)])):Z(``,!0)]))]),_:1},8,[`name`]),Y(`div`,Tl,[i.value>0?(q(),J(`button`,{key:0,class:`tutorial__btn tutorial__btn--prev`,onClick:s},` Back `)):(q(),J(`span`,El)),Y(`button`,{class:`tutorial__btn tutorial__btn--next`,onClick:o},N(i.value===r.length-1?`Let's Play!`:`Next`),1)])])]))}}),Ol={key:0,class:`feedback-sheet__text feedback-sheet__text--error`},kl=[`disabled`],Al=Zn({__name:`FeedbackSheet`,emits:[`close`],setup(e,{emit:t}){let n=t,r=z(!0),i=z(``),a=z(``),o=z(`idle`);async function s(){if(!(!i.value.trim()||o.value===`sending`)){o.value=`sending`;try{o.value=(await fetch(`https://uno-stats.aibotted849.workers.dev/feedback`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify({message:i.value.trim(),email:a.value.trim()||void 0,device_id:ec})})).ok?`sent`:`error`}catch{o.value=`error`}}}return(e,t)=>(q(),Vi(Ia,{name:`feedback`,appear:``,onAfterLeave:t[5]||=e=>n(`close`)},{default:Cn(()=>[r.value?(q(),J(`div`,{key:0,class:`modal-overlay feedback-overlay`,onClick:t[4]||=e=>r.value=!1},[Y(`form`,{class:`feedback-sheet`,onClick:t[3]||=Fo(()=>{},[`stop`]),onSubmit:Fo(s,[`prevent`])},[t[9]||=Y(`div`,{class:`feedback-sheet__handle`},null,-1),o.value===`sent`?(q(),J(W,{key:0},[t[6]||=Y(`h2`,{class:`feedback-sheet__title`},`Thanks!`,-1),t[7]||=Y(`p`,{class:`feedback-sheet__text`},`Your feedback is on its way.`,-1),Y(`button`,{type:`button`,class:`feedback-sheet__btn`,onClick:t[0]||=e=>r.value=!1},`Done`)],64)):(q(),J(W,{key:1},[t[8]||=Y(`h2`,{class:`feedback-sheet__title`},`Give Feedback`,-1),wn(Y(`textarea`,{"onUpdate:modelValue":t[1]||=e=>i.value=e,class:`feedback-sheet__input feedback-sheet__textarea`,placeholder:`What would make the game better?`,rows:`4`,maxlength:`5000`,required:``},null,512),[[Mo,i.value]]),wn(Y(`input`,{"onUpdate:modelValue":t[2]||=e=>a.value=e,type:`email`,class:`feedback-sheet__input`,placeholder:`Email (optional, if you'd like a reply)`,autocomplete:`email`},null,512),[[Mo,a.value]]),o.value===`error`?(q(),J(`p`,Ol,` Couldn't send right now — check your connection and try again. `)):Z(``,!0),Y(`button`,{type:`submit`,class:`feedback-sheet__btn`,disabled:o.value===`sending`||!i.value.trim()},N(o.value===`sending`?`Sending…`:`Send`),9,kl)],64))],32)])):Z(``,!0)]),_:1}))}}),jl=50,Ml=38,Nl=150,Pl=2e3,Fl=2e3,Il=`uno_tilt_snooze_until`,Ll=1e3*60*60*24*7;function Rl(){localStorage.setItem(Il,String(Date.now()+Ll))}function zl(e){let t=null,n=null,r=0;function i(i){let a=i.accelerationIncludingGravity;if(!a||a.y==null||a.z==null)return;let o=Math.atan2(Math.abs(a.y),Math.abs(a.z))*180/Math.PI,s=Date.now();if(o>jl){t??=s,s-t>=Nl&&(n=s);return}if(t=null,o<Ml&&n!=null){let t=n;if(n=null,s-t<=Pl&&s-r>=Fl){if(r=s,s<Number(localStorage.getItem(Il)))return;e()}}}async function a(){let e=DeviceMotionEvent;if(e.requestPermission)try{await e.requestPermission()}catch{}}fr(()=>{window.addEventListener(`devicemotion`,i),window.addEventListener(`click`,a,{once:!0})}),gr(()=>{window.removeEventListener(`devicemotion`,i),window.removeEventListener(`click`,a)})}var Bl=`# Card Royale - Game Rules

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

## Calling ONE

The ONE button is always visible during play. You must press it **before** playing your second-to-last card. If you play down to 0 cards without having called ONE, you draw 2 penalty cards instead of winning.

AI players call ONE automatically when they have 2 cards.

## Winning

The first player to play all their cards wins the game (provided they called ONE). If you win with a Wild or Wild +4, the color chooser is skipped automatically. A game over screen appears with the option to play again.

## Recent Plays

The Card Play History above the draw and discard piles shows the last 4 cards played.

## Hand Management

You can **drag and drop** cards in your hand to rearrange them.

## Deck Exhaustion

If the draw pile runs out, all cards from the discard pile (except the top card) are shuffled to form a new draw pile. Any chosen colors on wild cards are cleared.

## No Stacking

Draw Two and Wild +4 cards **cannot** be stacked. When a +2 or +4 is played against you, you receive the cards immediately with no option to counter with your own +2 or +4.

## AI Behavior

The AI opponents play with a simple strategy:

- They prioritize **Draw Two** (highest), then **Skip**, then **high number cards**, then **Reverse**
- They save **Wild** and **Wild +4** cards for last (lowest priority)
- When choosing a color for wilds, they pick the color they hold the most of
- If they have no playable card, they draw and immediately play the drawn card if possible
- AI turns are delayed 0.8-1.5 seconds to feel more natural
`,Vl={class:`game-container`},Hl={key:0,class:`lobby`},Ul=[`href`],Wl={class:`lobby__players`},Gl={class:`pause-menu__toggle`},Kl=[`checked`],ql={class:`rules-modal__header`},Jl={class:`rules-modal__actions`},Yl={class:`rules-modal__body`},Xl=[`innerHTML`],Zl=`af44f784-965f-496f-b0eb-b86e6c810399`,Ql=Zn({__name:`App`,setup(e){let t=hc(),n=ec===Zl,r=z(``),i=[2,4],a=Number(localStorage.getItem(`uno_player_count`)),o=z(i.includes(a)?a:4),s=z(!1),c=z(!1);async function l(){await navigator.clipboard.writeText(ec),c.value=!0,setTimeout(()=>c.value=!1,1500)}let u=z(!1),d=z(!1),f=z(!1),p=z(!1),m=z(!1),h=z(!1),g=z(!1),_=z(!1);zl(()=>{g.value=!0,_.value=!0});function v(){_.value&&Rl(),g.value=!1,_.value=!1}let y=z(0),b=null;fr(()=>{let e=localStorage.getItem(`uno_player_name`);e&&(r.value=e)});function x(){let e=r.value.trim()||`Player`;localStorage.setItem(`uno_player_name`,e),localStorage.setItem(`uno_player_count`,String(o.value)),p.value=!0,y.value++,t.startGame(e,o.value)}function S(e){if(!t.gameState.value)return;let n=t.gameState.value.players[0].hand,r=n[e];if(Ho(r))if(n.length===1){let n=[`red`,`blue`,`green`,`yellow`];t.playCard(e,n[Math.floor(Math.random()*n.length)])}else b=e,f.value=!0;else t.playCard(e)}function C(e){b!=null&&(t.playCard(b,e),b=null,f.value=!1)}function w(){b=null,f.value=!1}function T(){s.value=!1,f.value=!1,b=null,t.quitToLobby()}function E(){s.value=!1,f.value=!1,b=null,p.value=!0,y.value++,t.restartGame()}function ee(){p.value=!1}function D(){let e=t.gameState.value;return e?e.finished.map(t=>e.players[t].name):[]}An(()=>t.gameState.value?.unoPenalty,e=>{e&&(m.value=!0)});function te(e){let t=e.replace(/^\|(.+)\|$/gm,e=>{let t=e.split(`|`).filter(e=>e.trim());return t.every(e=>/^[\s-:]+$/.test(e))?`<!--sep-->`:`<tr>`+t.map(e=>`<td>${e.trim()}</td>`).join(``)+`</tr>`}).replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/^\d+\. (.+)$/gm,`<li>$1</li>`);return t=t.replace(/((?:<li>.*<\/li>\n?)+)/g,`<ul>$1</ul>`),t=t.replace(/((?:<tr>.*<\/tr>\n?|<!--sep-->\n?)+)/g,e=>{let t=e.replace(/<!--sep-->\n?/g,``).trim(),n=t.match(/<tr>.*?<\/tr>/);return n?`<table><thead>${n[0].replace(/<td>/g,`<th>`).replace(/<\/td>/g,`</th>`)}</thead><tbody>${t.replace(n[0],``)}</tbody></table>`:`<table>${t}</table>`}),t=t.replace(/^(?!<[hultop])(.+)$/gm,`<p>$1</p>`),t=t.replace(/<p>\s*<\/p>/g,``),t}return(e,a)=>(q(),J(`div`,Vl,[B(t).phase.value===`lobby`?(q(),J(`div`,Hl,[a[23]||=Y(`h1`,{class:`lobby__title`},`Card Royale`,-1),n?(q(),J(`a`,{key:0,class:`build-chip`,href:`https://github.com/u9g/unoroyale/commit/${B(lc)}`,target:`_blank`,rel:`noreferrer`},`OTA `+N(B(lc)),9,Ul)):Z(``,!0),Y(`form`,{class:`lobby__form`,onSubmit:Fo(x,[`prevent`])},[wn(Y(`input`,{"onUpdate:modelValue":a[0]||=e=>r.value=e,type:`text`,placeholder:`Enter your name`,class:`lobby__input`,required:``},null,512),[[Mo,r.value]]),Y(`label`,Wl,[X(_c,{modelValue:o.value,"onUpdate:modelValue":a[1]||=e=>o.value=e,options:i},null,8,[`modelValue`]),a[21]||=Y(`span`,null,`players at the table`,-1)]),a[22]||=Y(`button`,{type:`submit`,class:`lobby__btn`},`Start Game`,-1)],32),Y(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[2]||=e=>h.value=!0},`How to Play`),Y(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[3]||=e=>u.value=!0},`Game Info`),Y(`button`,{type:`button`,class:`lobby__tutorial-btn`,onClick:a[4]||=e=>g.value=!0},`Give Feedback`)])):B(t).phase.value===`playing`&&B(t).gameState.value?(q(),Vi($c,{key:y.value,"game-state":B(t).gameState.value,"choosing-color":f.value,"is-new-game":p.value,onPlayCard:S,onDrawCard:B(t).drawCard,onSayUno:B(t).sayUno,onNewGame:E,onChooseColor:C,onCancelColor:w,onReorderHand:B(t).reorderHand,onDealComplete:ee,onMenu:a[5]||=e=>s.value=!s.value},null,8,[`game-state`,`choosing-color`,`is-new-game`,`onDrawCard`,`onSayUno`,`onReorderHand`])):B(t).phase.value===`game_over`&&B(t).gameState.value?(q(),J(W,{key:2},[X($c,{"game-state":B(t).gameState.value,"choosing-color":!1,onPlayCard:()=>{},onDrawCard:()=>{},onSayUno:()=>{},onNewGame:E,onChooseColor:()=>{},onCancelColor:()=>{},onReorderHand:()=>{},onDealComplete:()=>{},onMenu:a[6]||=e=>s.value=!s.value},null,8,[`game-state`]),X(il,{placements:D(),onPlayAgain:E},null,8,[`placements`])],64)):Z(``,!0),s.value&&B(t).phase.value!==`lobby`?(q(),J(`div`,{key:3,class:`modal-overlay`,onClick:a[12]||=e=>s.value=!1},[Y(`div`,{class:`pause-menu`,onClick:a[11]||=Fo(()=>{},[`stop`])},[a[26]||=Y(`h2`,{class:`pause-menu__title`},`Paused`,-1),Y(`button`,{class:`pause-menu__btn pause-menu__btn--resume`,onClick:a[7]||=e=>s.value=!1},`Resume`),Y(`button`,{class:`pause-menu__btn pause-menu__btn--tutorial`,onClick:a[8]||=e=>{s.value=!1,h.value=!0}},`How to Play`),Y(`button`,{class:`pause-menu__btn pause-menu__btn--main-menu`,onClick:T},`Main Menu`),Y(`label`,Gl,[Y(`input`,{type:`checkbox`,checked:B(t).instantCpu.value,onChange:a[9]||=e=>B(t).setInstantCpu(e.target.checked)},null,40,Kl),a[24]||=Y(`span`,{class:`toggle-check`},null,-1),a[25]||=Y(`span`,null,`Make computer players instant`,-1)]),Y(`button`,{class:`pause-menu__btn pause-menu__btn--feedback`,onClick:a[10]||=e=>{s.value=!1,g.value=!0}},`Give Feedback`),Y(`button`,{class:`pause-menu__btn pause-menu__btn--new-game`,onClick:E},`New Game`)])])):Z(``,!0),u.value?(q(),J(`div`,{key:4,class:`modal-overlay`,onClick:a[16]||=e=>u.value=!1},[Y(`div`,{class:j([`rules-modal`,d.value&&`rules-modal--expanded`]),onClick:a[15]||=Fo(()=>{},[`stop`])},[Y(`div`,ql,[a[27]||=Y(`h2`,null,`Game Info`,-1),Y(`div`,Jl,[Y(`button`,{class:`rules-modal__expand`,onClick:a[13]||=e=>d.value=!d.value},N(d.value?`−`:`+`),1),Y(`button`,{class:`rules-modal__close`,onClick:a[14]||=e=>{u.value=!1,d.value=!1}},`×`)])]),Y(`div`,Yl,[Y(`div`,{innerHTML:te(B(Bl))},null,8,Xl),Y(`button`,{type:`button`,class:`rules-modal__device`,onClick:l},N(c.value?`Copied`:`Copy Device ID`),1)])],2)])):Z(``,!0),h.value?(q(),Vi(Dl,{key:5,onClose:a[17]||=e=>h.value=!1})):Z(``,!0),g.value?(q(),Vi(Al,{key:6,onClose:v})):Z(``,!0),m.value?(q(),J(`div`,{key:7,class:`uno-penalty-popup`,onClick:a[20]||=e=>m.value=!1},[Y(`div`,{class:`uno-penalty-popup__card`,onClick:a[19]||=Fo(()=>{},[`stop`])},[a[28]||=Y(`h3`,{class:`uno-penalty-popup__title`},`You forgot to say ONE!`,-1),a[29]||=Y(`p`,{class:`uno-penalty-popup__text`},[Yi(`When you play your second-to-last card, press the `),Y(`strong`,null,`ONE`),Yi(` button before playing your final card. If you don't, you'll draw 2 penalty cards instead of winning.`)],-1),Y(`button`,{class:`uno-penalty-popup__btn`,onClick:a[18]||=e=>m.value=!1},`Got it`)])])):Z(``,!0)]))}});tc().then(uc).then(()=>zo(Ql).mount(`#app`));export{Ls as n,ac as t};