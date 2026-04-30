import{v as xp,w as kp,x as zu,y as Dp,z as zh,E as $h,r as _e,F as Np,I as Op,d as Rn,J as Mp,j as x,S as Pe,B as ie,G as Lp,T as Ee}from"./index-BZIQbGpe.js";import{u as Fp}from"./useQuery-B0jyBEXY.js";import{P as Up}from"./PageHeader-CrRRjztb.js";import{S as Bp}from"./SEO-CLdtOT-y.js";import{C as $u}from"./camera-CsezouWl.js";import{C as jp}from"./chevron-right-DFcrwjXE.js";import{G as qp}from"./github-3LSnkjMj.js";var zp=class extends xp{#t;#r=void 0;#e;#n;constructor(r,e){super(),this.#t=r,this.setOptions(e),this.bindMethods(),this.#s()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(r){const e=this.options;this.options=this.#t.defaultMutationOptions(r),kp(this.options,e)||this.#t.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#e,observer:this}),e?.mutationKey&&this.options.mutationKey&&zu(e.mutationKey)!==zu(this.options.mutationKey)?this.reset():this.#e?.state.status==="pending"&&this.#e.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#e?.removeObserver(this)}onMutationUpdate(r){this.#s(),this.#i(r)}getCurrentResult(){return this.#r}reset(){this.#e?.removeObserver(this),this.#e=void 0,this.#s(),this.#i()}mutate(r,e){return this.#n=e,this.#e?.removeObserver(this),this.#e=this.#t.getMutationCache().build(this.#t,this.options),this.#e.addObserver(this),this.#e.execute(r)}#s(){const r=this.#e?.state??Dp();this.#r={...r,isPending:r.status==="pending",isSuccess:r.status==="success",isError:r.status==="error",isIdle:r.status==="idle",mutate:this.mutate,reset:this.reset}}#i(r){zh.batch(()=>{if(this.#n&&this.hasListeners()){const e=this.#r.variables,t=this.#r.context,n={client:this.#t,meta:this.options.meta,mutationKey:this.options.mutationKey};if(r?.type==="success"){try{this.#n.onSuccess?.(r.data,e,t,n)}catch(s){Promise.reject(s)}try{this.#n.onSettled?.(r.data,null,e,t,n)}catch(s){Promise.reject(s)}}else if(r?.type==="error"){try{this.#n.onError?.(r.error,e,t,n)}catch(s){Promise.reject(s)}try{this.#n.onSettled?.(void 0,r.error,e,t,n)}catch(s){Promise.reject(s)}}}this.listeners.forEach(e=>{e(this.#r)})})}};function $p(r,e){const t=$h(),[n]=_e.useState(()=>new zp(t,r));_e.useEffect(()=>{n.setOptions(r)},[n,r]);const s=_e.useSyncExternalStore(_e.useCallback(o=>n.subscribe(zh.batchCalls(o)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),i=_e.useCallback((o,c)=>{n.mutate(o,c).catch(Np)},[n]);if(s.error&&Op(n.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:i,mutateAsync:s.mutate}}/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],ia=Rn("circle-check-big",Gp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Gh=Rn("copy",Kp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Wp=Rn("image",Hp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],Jp=Rn("monitor",Qp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],qr=Rn("refresh-cw",Yp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],Zp=Rn("smartphone",Xp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]],tg=Rn("tablet",eg);/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng=()=>{};var Gu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},rg=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Hh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let w=(c&15)<<2|h>>6,S=h&63;u||(S=64,o||(w=64)),n.push(t[f],t[p],t[w],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Kh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):rg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const p=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new sg;const w=i<<2|c>>4;if(n.push(w),h!==64){const S=c<<4&240|h>>2;if(n.push(S),p!==64){const C=h<<6&192|p;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class sg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ig=function(r){const e=Kh(r);return Hh.encodeByteArray(e,!0)},bi=function(r){return ig(r).replace(/\./g,"")},Wh=function(r){try{return Hh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=()=>Qh().__FIREBASE_DEFAULTS__,ag=()=>{if(typeof process>"u"||typeof Gu>"u")return;const r=Gu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},cg=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Wh(r[1]);return e&&JSON.parse(e)},Hi=()=>{try{return ng()||og()||ag()||cg()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Jh=r=>Hi()?.emulatorHosts?.[r],ug=r=>{const e=Jh(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Yh=()=>Hi()?.config,Xh=r=>Hi()?.[`_${r}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[bi(JSON.stringify(t)),bi(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function dg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function Zh(){const r=Hi()?.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function fg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function pg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gg(){const r=ye();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function ed(){return!Zh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function td(){return!Zh()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function nd(){try{return typeof indexedDB=="object"}catch{return!1}}function _g(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg="FirebaseError";class gt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=yg,Object.setPrototypeOf(this,gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ws.prototype.create)}}class ws{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Ig(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new gt(s,c,n)}}function Ig(r,e){return r.replace(Tg,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Tg=/\{\$([^}]+)}/g;function Eg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function $t(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Ku(i)&&Ku(o)){if(!$t(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Ku(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function wg(r,e){const t=new vg(r,e);return t.subscribe.bind(t)}class vg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Ag(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=zo),s.error===void 0&&(s.error=zo),s.complete===void 0&&(s.complete=zo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ag(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function zo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ba(r){return(await fetch(r,{credentials:"include"})).ok}class gn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new lg;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Sg(e))try{this.getOrInitializeService({instanceIdentifier:rn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rn){return this.instances.has(e)}getOptions(e=rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Rg(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=rn){return this.component?this.component.multipleInstances?e:rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rg(r){return r===rn?void 0:r}function Sg(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new bg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Y||(Y={}));const Cg={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Vg=Y.INFO,xg={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},kg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=xg[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ja{constructor(e){this.name=e,this._logLevel=Vg,this._logHandler=kg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Cg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const Dg=(r,e)=>e.some(t=>r instanceof t);let Hu,Wu;function Ng(){return Hu||(Hu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Og(){return Wu||(Wu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rd=new WeakMap,oa=new WeakMap,sd=new WeakMap,$o=new WeakMap,qa=new WeakMap;function Mg(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Mt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&rd.set(t,r)}).catch(()=>{}),qa.set(e,r),e}function Lg(r){if(oa.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});oa.set(r,e)}let aa={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return oa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||sd.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Mt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Fg(r){aa=r(aa)}function Ug(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Go(this),e,...t);return sd.set(n,e.sort?e.sort():[e]),Mt(n)}:Og().includes(r)?function(...e){return r.apply(Go(this),e),Mt(rd.get(this))}:function(...e){return Mt(r.apply(Go(this),e))}}function Bg(r){return typeof r=="function"?Ug(r):(r instanceof IDBTransaction&&Lg(r),Dg(r,Ng())?new Proxy(r,aa):r)}function Mt(r){if(r instanceof IDBRequest)return Mg(r);if($o.has(r))return $o.get(r);const e=Bg(r);return e!==r&&($o.set(r,e),qa.set(e,r)),e}const Go=r=>qa.get(r);function jg(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=Mt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Mt(o.result),u.oldVersion,u.newVersion,Mt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const qg=["get","getKey","getAll","getAllKeys","count"],zg=["put","add","delete","clear"],Ko=new Map;function Qu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Ko.get(e))return Ko.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=zg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||qg.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Ko.set(e,i),i}Fg(r=>({...r,get:(e,t,n)=>Qu(e,t)||r.get(e,t,n),has:(e,t)=>!!Qu(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Gg(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Gg(r){return r.getComponent()?.type==="VERSION"}const ca="@firebase/app",Ju="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=new ja("@firebase/app"),Kg="@firebase/app-compat",Hg="@firebase/analytics-compat",Wg="@firebase/analytics",Qg="@firebase/app-check-compat",Jg="@firebase/app-check",Yg="@firebase/auth",Xg="@firebase/auth-compat",Zg="@firebase/database",e_="@firebase/data-connect",t_="@firebase/database-compat",n_="@firebase/functions",r_="@firebase/functions-compat",s_="@firebase/installations",i_="@firebase/installations-compat",o_="@firebase/messaging",a_="@firebase/messaging-compat",c_="@firebase/performance",u_="@firebase/performance-compat",l_="@firebase/remote-config",h_="@firebase/remote-config-compat",d_="@firebase/storage",f_="@firebase/storage-compat",m_="@firebase/firestore",p_="@firebase/ai",g_="@firebase/firestore-compat",__="firebase",y_="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua="[DEFAULT]",I_={[ca]:"fire-core",[Kg]:"fire-core-compat",[Wg]:"fire-analytics",[Hg]:"fire-analytics-compat",[Jg]:"fire-app-check",[Qg]:"fire-app-check-compat",[Yg]:"fire-auth",[Xg]:"fire-auth-compat",[Zg]:"fire-rtdb",[e_]:"fire-data-connect",[t_]:"fire-rtdb-compat",[n_]:"fire-fn",[r_]:"fire-fn-compat",[s_]:"fire-iid",[i_]:"fire-iid-compat",[o_]:"fire-fcm",[a_]:"fire-fcm-compat",[c_]:"fire-perf",[u_]:"fire-perf-compat",[l_]:"fire-rc",[h_]:"fire-rc-compat",[d_]:"fire-gcs",[f_]:"fire-gcs-compat",[m_]:"fire-fst",[g_]:"fire-fst-compat",[p_]:"fire-vertex","fire-js":"fire-js",[__]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=new Map,T_=new Map,la=new Map;function Yu(r,e){try{r.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Yn(r){const e=r.name;if(la.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;la.set(e,r);for(const t of rs.values())Yu(t,r);for(const t of T_.values())Yu(t,r);return!0}function Wi(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function ze(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new ws("app","Firebase",E_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=y_;function id(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:ua,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Lt.create("bad-app-name",{appName:String(s)});if(t||(t=Yh()),!t)throw Lt.create("no-options");const i=rs.get(s);if(i){if($t(t,i.options)&&$t(n,i.config))return i;throw Lt.create("duplicate-app",{appName:s})}const o=new Pg(s);for(const u of la.values())o.addComponent(u);const c=new w_(t,n,o);return rs.set(s,c),c}function za(r=ua){const e=rs.get(r);if(!e&&r===ua&&Yh())return id();if(!e)throw Lt.create("no-app",{appName:r});return e}function v_(){return Array.from(rs.values())}function Ft(r,e,t){let n=I_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(o.join(" "));return}Yn(new gn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="firebase-heartbeat-database",b_=1,ss="firebase-heartbeat-store";let Ho=null;function od(){return Ho||(Ho=jg(A_,b_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ss)}catch(t){console.warn(t)}}}}).catch(r=>{throw Lt.create("idb-open",{originalErrorMessage:r.message})})),Ho}async function R_(r){try{const t=(await od()).transaction(ss),n=await t.objectStore(ss).get(ad(r));return await t.done,n}catch(e){if(e instanceof gt)lt.warn(e.message);else{const t=Lt.create("idb-get",{originalErrorMessage:e?.message});lt.warn(t.message)}}}async function Xu(r,e){try{const n=(await od()).transaction(ss,"readwrite");await n.objectStore(ss).put(e,ad(r)),await n.done}catch(t){if(t instanceof gt)lt.warn(t.message);else{const n=Lt.create("idb-set",{originalErrorMessage:t?.message});lt.warn(n.message)}}}function ad(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_=1024,P_=30;class C_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new x_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=Zu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>P_){const s=k_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){lt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zu(),{heartbeatsToSend:t,unsentEntries:n}=V_(this._heartbeatsCache.heartbeats),s=bi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return lt.warn(e),""}}}function Zu(){return new Date().toISOString().substring(0,10)}function V_(r,e=S_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),el(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),el(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class x_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nd()?_g().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await R_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function el(r){return bi(JSON.stringify({version:2,heartbeats:r})).length}function k_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(r){Yn(new gn("platform-logger",e=>new $g(e),"PRIVATE")),Yn(new gn("heartbeat",e=>new C_(e),"PRIVATE")),Ft(ca,Ju,r),Ft(ca,Ju,"esm2020"),Ft("fire-js","")}D_("");var N_="firebase",O_="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ft(N_,O_,"app");function cd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const M_=cd,ud=new ws("auth","Firebase",cd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=new ja("@firebase/auth");function L_(r,...e){Ri.logLevel<=Y.WARN&&Ri.warn(`Auth (${fr}): ${r}`,...e)}function ui(r,...e){Ri.logLevel<=Y.ERROR&&Ri.error(`Auth (${fr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(r,...e){throw $a(r,...e)}function tt(r,...e){return $a(r,...e)}function ld(r,e,t){const n={...M_(),[e]:t};return new ws("auth","Firebase",n).create(e,{appName:r.name})}function ut(r){return ld(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $a(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return ud.create(r,...e)}function $(r,e,...t){if(!r)throw $a(e,...t)}function ot(r){const e="INTERNAL ASSERTION FAILED: "+r;throw ui(e),new Error(e)}function dt(r,e){r||ot(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(){return typeof self<"u"&&self.location?.href||""}function F_(){return tl()==="http:"||tl()==="https:"}function tl(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(F_()||mg()||"connection"in navigator)?navigator.onLine:!0}function B_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t){this.shortDelay=e,this.longDelay=t,dt(t>e,"Short delay should be less than long delay!"),this.isMobile=dg()||pg()}get(){return U_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(r,e){dt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],z_=new As(3e4,6e4);function bs(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function mr(r,e,t,n,s={}){return dd(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=vs({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return fg()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&dr(r.emulatorConfig.host)&&(h.credentials="include"),hd.fetch()(await fd(r,r.config.apiHost,t,c),h)})}async function dd(r,e,t){r._canInitEmulator=!1;const n={...j_,...e};try{const s=new $_(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Zs(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zs(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Zs(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw Zs(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ld(r,f,h);ht(r,f)}}catch(s){if(s instanceof gt)throw s;ht(r,"network-request-failed",{message:String(s)})}}async function Ka(r,e,t,n,s={}){const i=await mr(r,e,t,n,s);return"mfaPendingCredential"in i&&ht(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function fd(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?Ga(r.config,s):`${r.config.apiScheme}://${s}`;return q_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class $_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(tt(this.auth,"network-request-failed")),z_.get())})}}function Zs(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=tt(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(r,e){return mr(r,"POST","/v1/accounts:delete",e)}async function Si(r,e){return mr(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function K_(r,e=!1){const t=Re(r),n=await t.getIdToken(e),s=Ha(n);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:n,authTime:Wr(Wo(s.auth_time)),issuedAtTime:Wr(Wo(s.iat)),expirationTime:Wr(Wo(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Wo(r){return Number(r)*1e3}function Ha(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return ui("JWT malformed, contained fewer than 3 sections"),null;try{const s=Wh(t);return s?JSON.parse(s):(ui("Failed to decode base64 JWT payload"),null)}catch(s){return ui("Caught error parsing JWT payload as JSON",s?.toString()),null}}function nl(r){const e=Ha(r);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof gt&&H_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function H_({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wr(this.lastLoginAt),this.creationTime=Wr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pi(r){const e=r.auth,t=await r.getIdToken(),n=await is(r,Si(e,{idToken:t}));$(n?.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=s.providerUserInfo?.length?md(s.providerUserInfo):[],o=J_(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!o?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new da(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function Q_(r){const e=Re(r);await Pi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function J_(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function md(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y_(r,e){const t=await dd(r,{},async()=>{const n=vs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await fd(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&dr(r.emulatorConfig.host)&&(u.credentials="include"),hd.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function X_(r,e){return mr(r,"POST","/v2/accounts:revokeToken",bs(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):nl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=nl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await Y_(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Gn;return n&&($(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&($(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gn,this.toJSON())}_performRefresh(){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(r,e){$(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class We{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new W_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new da(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await is(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return K_(this,e)}reload(){return Q_(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new We({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Pi(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(ut(this.auth));const e=await this.getIdToken();return await is(this,G_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:w,isAnonymous:S,providerData:C,stsTokenManager:O}=t;$(p&&O,e,"internal-error");const D=Gn.fromJSON(this.name,O);$(typeof p=="string",e,"internal-error"),bt(n,e.name),bt(s,e.name),$(typeof w=="boolean",e,"internal-error"),$(typeof S=="boolean",e,"internal-error"),bt(i,e.name),bt(o,e.name),bt(c,e.name),bt(u,e.name),bt(h,e.name),bt(f,e.name);const W=new We({uid:p,auth:e,email:s,emailVerified:w,displayName:n,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&(W.providerData=C.map(H=>({...H}))),u&&(W._redirectEventId=u),W}static async _fromIdTokenResponse(e,t,n=!1){const s=new Gn;s.updateFromServerResponse(t);const i=new We({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Pi(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];$(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?md(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Gn;c.updateFromIdToken(n);const u=new We({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new da(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=new Map;function at(r){dt(r instanceof Function,"Expected a class definition");let e=rl.get(r);return e?(dt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,rl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}pd.type="NONE";const sl=pd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(r,e,t){return`firebase:${r}:${e}:${t}`}class Kn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=li(this.userKey,s.apiKey,i),this.fullPersistenceKey=li("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Si(this.auth,{idToken:e}).catch(()=>{});return t?We._fromGetAccountInfoResponse(this.auth,t,e):null}return We._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Kn(at(sl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||at(sl);const o=li(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const w=await Si(e,{idToken:f}).catch(()=>{});if(!w)break;p=await We._fromGetAccountInfoResponse(e,w,f)}else p=We._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Kn(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Kn(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(gd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ed(e))return"Blackberry";if(wd(e))return"Webos";if(_d(e))return"Safari";if((e.includes("chrome/")||yd(e))&&!e.includes("edge/"))return"Chrome";if(Td(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function gd(r=ye()){return/firefox\//i.test(r)}function _d(r=ye()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function yd(r=ye()){return/crios\//i.test(r)}function Id(r=ye()){return/iemobile/i.test(r)}function Td(r=ye()){return/android/i.test(r)}function Ed(r=ye()){return/blackberry/i.test(r)}function wd(r=ye()){return/webos/i.test(r)}function Wa(r=ye()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Z_(r=ye()){return Wa(r)&&!!window.navigator?.standalone}function ey(){return gg()&&document.documentMode===10}function vd(r=ye()){return Wa(r)||Td(r)||wd(r)||Ed(r)||/windows phone/i.test(r)||Id(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(r,e=[]){let t;switch(r){case"Browser":t=il(ye());break;case"Worker":t=`${il(ye())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ny(r,e={}){return mr(r,"GET","/v2/passwordPolicy",bs(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ry=6;class sy{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ry,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ol(this),this.idTokenSubscription=new ol(this),this.beforeStateQueue=new ty(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ud,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=at(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Kn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Si(this,{idToken:e}),n=await We._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ze(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Pi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=B_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(ut(this));const t=e?Re(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(at(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ny(this),t=new sy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ws("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await X_(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&at(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await Kn.create(this,[at(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ad(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&L_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Rs(r){return Re(r)}class ol{constructor(e){this.auth=e,this.observer=null,this.addObserver=wg(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function oy(r){Qa=r}function ay(r){return Qa.loadJS(r)}function cy(){return Qa.gapiScript}function uy(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ly(r,e){const t=Wi(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if($t(i,e??{}))return s;ht(s,"already-initialized")}return t.initialize({options:e})}function hy(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(at);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function dy(r,e,t){const n=Rs(r);$(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=bd(e),{host:o,port:c}=fy(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){$(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),$($t(h,n.config.emulator)&&$t(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,dr(o)?Ba(`${i}//${o}${u}`):my()}function bd(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function fy(r){const e=bd(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:al(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:al(o)}}}function al(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function my(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ot("not implemented")}_getIdTokenResponse(e){return ot("not implemented")}_linkToIdToken(e,t){return ot("not implemented")}_getReauthenticationResolver(e){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hn(r,e){return Ka(r,"POST","/v1/accounts:signInWithIdp",bs(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="http://localhost";class _n extends Rd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new _n(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Hn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Hn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Hn(e,t)}buildRequest(){const e={requestUri:py,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=vs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss extends Sd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends Ss{constructor(){super("facebook.com")}static credential(e){return _n._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends Ss{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _n._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return xt.credential(t,n)}catch{return null}}}xt.GOOGLE_SIGN_IN_METHOD="google.com";xt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Ss{constructor(){super("github.com")}static credential(e){return _n._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.GITHUB_SIGN_IN_METHOD="github.com";kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Ss{constructor(){super("twitter.com")}static credential(e,t){return _n._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Dt.credential(t,n)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gy(r,e){return Ka(r,"POST","/v1/accounts:signUp",bs(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await We._fromIdTokenResponse(e,n,s),o=cl(n);return new ft({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=cl(n);return new ft({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function cl(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _y(r){if(ze(r.app))return Promise.reject(ut(r));const e=Rs(r);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new ft({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await gy(e,{returnSecureToken:!0}),n=await ft._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci extends gt{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Ci.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Ci(e,t,n,s)}}function Pd(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ci._fromErrorAndOperation(r,i,e,n):i})}async function yy(r,e,t=!1){const n=await is(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return ft._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iy(r,e,t=!1){const{auth:n}=r;if(ze(n.app))return Promise.reject(ut(n));const s="reauthenticate";try{const i=await is(r,Pd(n,s,e,r),t);$(i.idToken,n,"internal-error");const o=Ha(i.idToken);$(o,n,"internal-error");const{sub:c}=o;return $(r.uid===c,n,"user-mismatch"),ft._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&ht(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ty(r,e,t=!1){if(ze(r.app))return Promise.reject(ut(r));const n="signIn",s=await Pd(r,n,e),i=await ft._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ey(r,e){return Ka(r,"POST","/v1/accounts:signInWithCustomToken",bs(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wy(r,e){if(ze(r.app))return Promise.reject(ut(r));const t=Rs(r),n=await Ey(t,{token:e,returnSecureToken:!0}),s=await ft._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(s.user),s}function vy(r,e,t,n){return Re(r).onIdTokenChanged(e,t,n)}function Ay(r,e,t){return Re(r).beforeAuthStateChanged(e,t)}function by(r,e,t,n){return Re(r).onAuthStateChanged(e,t,n)}const Vi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vi,"1"),this.storage.removeItem(Vi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry=1e3,Sy=10;class Vd extends Cd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=vd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);ey()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Sy):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Ry)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Vd.type="LOCAL";const Py=Vd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd extends Cd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xd.type="SESSION";const kd=xd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Qi(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await Cy(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Ja("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(p){const w=p;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(){return window}function xy(r){nt().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(){return typeof nt().WorkerGlobalScope<"u"&&typeof nt().importScripts=="function"}async function ky(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Dy(){return navigator?.serviceWorker?.controller||null}function Ny(){return Dd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="firebaseLocalStorageDb",Oy=1,xi="firebaseLocalStorage",Od="fbase_key";class Ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ji(r,e){return r.transaction([xi],e?"readwrite":"readonly").objectStore(xi)}function My(){const r=indexedDB.deleteDatabase(Nd);return new Ps(r).toPromise()}function fa(){const r=indexedDB.open(Nd,Oy);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(xi,{keyPath:Od})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(xi)?e(n):(n.close(),await My(),e(await fa()))})})}async function ul(r,e,t){const n=Ji(r,!0).put({[Od]:e,value:t});return new Ps(n).toPromise()}async function Ly(r,e){const t=Ji(r,!1).get(e),n=await new Ps(t).toPromise();return n===void 0?null:n.value}function ll(r,e){const t=Ji(r,!0).delete(e);return new Ps(t).toPromise()}const Fy=800,Uy=3;class Md{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await fa(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Uy)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Dd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qi._getInstance(Ny()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await ky(),!this.activeServiceWorker)return;this.sender=new Vy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Dy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await fa();return await ul(e,Vi,"1"),await ll(e,Vi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ul(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>Ly(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ll(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ji(s,!1).getAll();return new Ps(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Fy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Md.type="LOCAL";const By=Md;new As(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jy(r,e){return e?at(e):($(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya extends Rd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Hn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Hn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Hn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qy(r){return Ty(r.auth,new Ya(r),r.bypassAuthState)}function zy(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),Iy(t,new Ya(r),r.bypassAuthState)}async function $y(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),yy(t,new Ya(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qy;case"linkViaPopup":case"linkViaRedirect":return $y;case"reauthViaPopup":case"reauthViaRedirect":return zy;default:ht(this.auth,"internal-error")}}resolve(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=new As(2e3,1e4);class $n extends Ld{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,$n.currentPopupAction&&$n.currentPopupAction.cancel(),$n.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){dt(this.filter.length===1,"Popup operations only handle one event");const e=Ja();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$n.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Gy.get())};e()}}$n.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky="pendingRedirect",hi=new Map;class Hy extends Ld{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=hi.get(this.auth._key());if(!e){try{const n=await Wy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}hi.set(this.auth._key(),e)}return this.bypassAuthState||hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Wy(r,e){const t=Yy(e),n=Jy(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Qy(r,e){hi.set(r._key(),e)}function Jy(r){return at(r._redirectPersistence)}function Yy(r){return li(Ky,r.config.apiKey,r.name)}async function Xy(r,e,t=!1){if(ze(r.app))return Promise.reject(ut(r));const n=Rs(r),s=jy(n,e),o=await new Hy(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zy=600*1e3;class eI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!tI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Fd(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(tt(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Zy&&this.cachedEventUids.clear(),this.cachedEventUids.has(hl(e))}saveEventToCache(e){this.cachedEventUids.add(hl(e)),this.lastProcessedEventTime=Date.now()}}function hl(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Fd({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function tI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fd(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nI(r,e={}){return mr(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sI=/^https?/;async function iI(r){if(r.config.emulator)return;const{authorizedDomains:e}=await nI(r);for(const t of e)try{if(oI(t))return}catch{}ht(r,"unauthorized-domain")}function oI(r){const e=ha(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!sI.test(t))return!1;if(rI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI=new As(3e4,6e4);function dl(){const r=nt().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function cI(r){return new Promise((e,t)=>{function n(){dl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{dl(),t(tt(r,"network-request-failed"))},timeout:aI.get()})}if(nt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(nt().gapi?.load)n();else{const s=uy("iframefcb");return nt()[s]=()=>{gapi.load?n():t(tt(r,"network-request-failed"))},ay(`${cy()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw di=null,e})}let di=null;function uI(r){return di=di||cI(r),di}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=new As(5e3,15e3),hI="__/auth/iframe",dI="emulator/auth/iframe",fI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function pI(r){const e=r.config;$(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Ga(e,dI):`https://${r.config.authDomain}/${hI}`,n={apiKey:e.apiKey,appName:r.name,v:fr},s=mI.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${vs(n).slice(1)}`}async function gI(r){const e=await uI(r),t=nt().gapi;return $(t,r,"internal-error"),e.open({where:document.body,url:pI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:fI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=tt(r,"network-request-failed"),c=nt().setTimeout(()=>{i(o)},lI.get());function u(){nt().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},yI=500,II=600,TI="_blank",EI="http://localhost";class fl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function wI(r,e,t,n=yI,s=II){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={..._I,width:n.toString(),height:s.toString(),top:i,left:o},h=ye().toLowerCase();t&&(c=yd(h)?TI:t),gd(h)&&(e=e||EI,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[S,C])=>`${w}${S}=${C},`,"");if(Z_(h)&&c!=="_self")return vI(e||"",c),new fl(null);const p=window.open(e||"",c,f);$(p,r,"popup-blocked");try{p.focus()}catch{}return new fl(p)}function vI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI="__/auth/handler",bI="emulator/auth/handler",RI=encodeURIComponent("fac");async function ml(r,e,t,n,s,i){$(r.config.authDomain,r,"auth-domain-config-required"),$(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:fr,eventId:s};if(e instanceof Sd){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Eg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Ss){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${RI}=${encodeURIComponent(u)}`:"";return`${SI(r)}?${vs(c).slice(1)}${h}`}function SI({config:r}){return r.emulator?Ga(r,bI):`https://${r.authDomain}/${AI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="webStorageSupport";class PI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=kd,this._completeRedirectFn=Xy,this._overrideRedirectResult=Qy}async _openPopup(e,t,n,s){dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ml(e,t,n,ha(),s);return wI(e,i,Ja())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await ml(e,t,n,ha(),s);return xy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(dt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await gI(e),n=new eI(e);return t.register("authEvent",s=>($(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Qo,{type:Qo},s=>{const i=s?.[0]?.[Qo];i!==void 0&&t(!!i),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=iI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return vd()||_d()||Wa()}}const CI=PI;var pl="@firebase/auth",gl="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kI(r){Yn(new gn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;$(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ad(r)},h=new iy(n,s,i,u);return hy(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Yn(new gn("auth-internal",e=>{const t=Rs(e.getProvider("auth").getImmediate());return(n=>new VI(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(pl,gl,xI(r)),Ft(pl,gl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI=300,NI=Xh("authIdTokenMaxAge")||DI;let _l=null;const OI=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>NI)return;const s=t?.token;_l!==s&&(_l=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function MI(r=za()){const e=Wi(r,"auth");if(e.isInitialized())return e.getImmediate();const t=ly(r,{popupRedirectResolver:CI,persistence:[By,Py,kd]}),n=Xh("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=OI(i.toString());Ay(t,o,()=>o(t.currentUser)),vy(t,c=>o(c))}}const s=Jh("auth");return s&&dy(t,`http://${s}`),t}function LI(){return document.getElementsByTagName("head")?.[0]??document}oy({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=tt("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",LI().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kI("Browser");var yl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ut,Ud;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,g){function y(){}y.prototype=g.prototype,_.F=g.prototype,_.prototype=new y,_.prototype.constructor=_,_.D=function(E,T,A){for(var I=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)I[ve-2]=arguments[ve];return g.prototype[T].apply(E,I)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,g,y){y||(y=0);const E=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)E[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;T<16;++T)E[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=_.g[0],y=_.g[1],T=_.g[2];let A=_.g[3],I;I=g+(A^y&(T^A))+E[0]+3614090360&4294967295,g=y+(I<<7&4294967295|I>>>25),I=A+(T^g&(y^T))+E[1]+3905402710&4294967295,A=g+(I<<12&4294967295|I>>>20),I=T+(y^A&(g^y))+E[2]+606105819&4294967295,T=A+(I<<17&4294967295|I>>>15),I=y+(g^T&(A^g))+E[3]+3250441966&4294967295,y=T+(I<<22&4294967295|I>>>10),I=g+(A^y&(T^A))+E[4]+4118548399&4294967295,g=y+(I<<7&4294967295|I>>>25),I=A+(T^g&(y^T))+E[5]+1200080426&4294967295,A=g+(I<<12&4294967295|I>>>20),I=T+(y^A&(g^y))+E[6]+2821735955&4294967295,T=A+(I<<17&4294967295|I>>>15),I=y+(g^T&(A^g))+E[7]+4249261313&4294967295,y=T+(I<<22&4294967295|I>>>10),I=g+(A^y&(T^A))+E[8]+1770035416&4294967295,g=y+(I<<7&4294967295|I>>>25),I=A+(T^g&(y^T))+E[9]+2336552879&4294967295,A=g+(I<<12&4294967295|I>>>20),I=T+(y^A&(g^y))+E[10]+4294925233&4294967295,T=A+(I<<17&4294967295|I>>>15),I=y+(g^T&(A^g))+E[11]+2304563134&4294967295,y=T+(I<<22&4294967295|I>>>10),I=g+(A^y&(T^A))+E[12]+1804603682&4294967295,g=y+(I<<7&4294967295|I>>>25),I=A+(T^g&(y^T))+E[13]+4254626195&4294967295,A=g+(I<<12&4294967295|I>>>20),I=T+(y^A&(g^y))+E[14]+2792965006&4294967295,T=A+(I<<17&4294967295|I>>>15),I=y+(g^T&(A^g))+E[15]+1236535329&4294967295,y=T+(I<<22&4294967295|I>>>10),I=g+(T^A&(y^T))+E[1]+4129170786&4294967295,g=y+(I<<5&4294967295|I>>>27),I=A+(y^T&(g^y))+E[6]+3225465664&4294967295,A=g+(I<<9&4294967295|I>>>23),I=T+(g^y&(A^g))+E[11]+643717713&4294967295,T=A+(I<<14&4294967295|I>>>18),I=y+(A^g&(T^A))+E[0]+3921069994&4294967295,y=T+(I<<20&4294967295|I>>>12),I=g+(T^A&(y^T))+E[5]+3593408605&4294967295,g=y+(I<<5&4294967295|I>>>27),I=A+(y^T&(g^y))+E[10]+38016083&4294967295,A=g+(I<<9&4294967295|I>>>23),I=T+(g^y&(A^g))+E[15]+3634488961&4294967295,T=A+(I<<14&4294967295|I>>>18),I=y+(A^g&(T^A))+E[4]+3889429448&4294967295,y=T+(I<<20&4294967295|I>>>12),I=g+(T^A&(y^T))+E[9]+568446438&4294967295,g=y+(I<<5&4294967295|I>>>27),I=A+(y^T&(g^y))+E[14]+3275163606&4294967295,A=g+(I<<9&4294967295|I>>>23),I=T+(g^y&(A^g))+E[3]+4107603335&4294967295,T=A+(I<<14&4294967295|I>>>18),I=y+(A^g&(T^A))+E[8]+1163531501&4294967295,y=T+(I<<20&4294967295|I>>>12),I=g+(T^A&(y^T))+E[13]+2850285829&4294967295,g=y+(I<<5&4294967295|I>>>27),I=A+(y^T&(g^y))+E[2]+4243563512&4294967295,A=g+(I<<9&4294967295|I>>>23),I=T+(g^y&(A^g))+E[7]+1735328473&4294967295,T=A+(I<<14&4294967295|I>>>18),I=y+(A^g&(T^A))+E[12]+2368359562&4294967295,y=T+(I<<20&4294967295|I>>>12),I=g+(y^T^A)+E[5]+4294588738&4294967295,g=y+(I<<4&4294967295|I>>>28),I=A+(g^y^T)+E[8]+2272392833&4294967295,A=g+(I<<11&4294967295|I>>>21),I=T+(A^g^y)+E[11]+1839030562&4294967295,T=A+(I<<16&4294967295|I>>>16),I=y+(T^A^g)+E[14]+4259657740&4294967295,y=T+(I<<23&4294967295|I>>>9),I=g+(y^T^A)+E[1]+2763975236&4294967295,g=y+(I<<4&4294967295|I>>>28),I=A+(g^y^T)+E[4]+1272893353&4294967295,A=g+(I<<11&4294967295|I>>>21),I=T+(A^g^y)+E[7]+4139469664&4294967295,T=A+(I<<16&4294967295|I>>>16),I=y+(T^A^g)+E[10]+3200236656&4294967295,y=T+(I<<23&4294967295|I>>>9),I=g+(y^T^A)+E[13]+681279174&4294967295,g=y+(I<<4&4294967295|I>>>28),I=A+(g^y^T)+E[0]+3936430074&4294967295,A=g+(I<<11&4294967295|I>>>21),I=T+(A^g^y)+E[3]+3572445317&4294967295,T=A+(I<<16&4294967295|I>>>16),I=y+(T^A^g)+E[6]+76029189&4294967295,y=T+(I<<23&4294967295|I>>>9),I=g+(y^T^A)+E[9]+3654602809&4294967295,g=y+(I<<4&4294967295|I>>>28),I=A+(g^y^T)+E[12]+3873151461&4294967295,A=g+(I<<11&4294967295|I>>>21),I=T+(A^g^y)+E[15]+530742520&4294967295,T=A+(I<<16&4294967295|I>>>16),I=y+(T^A^g)+E[2]+3299628645&4294967295,y=T+(I<<23&4294967295|I>>>9),I=g+(T^(y|~A))+E[0]+4096336452&4294967295,g=y+(I<<6&4294967295|I>>>26),I=A+(y^(g|~T))+E[7]+1126891415&4294967295,A=g+(I<<10&4294967295|I>>>22),I=T+(g^(A|~y))+E[14]+2878612391&4294967295,T=A+(I<<15&4294967295|I>>>17),I=y+(A^(T|~g))+E[5]+4237533241&4294967295,y=T+(I<<21&4294967295|I>>>11),I=g+(T^(y|~A))+E[12]+1700485571&4294967295,g=y+(I<<6&4294967295|I>>>26),I=A+(y^(g|~T))+E[3]+2399980690&4294967295,A=g+(I<<10&4294967295|I>>>22),I=T+(g^(A|~y))+E[10]+4293915773&4294967295,T=A+(I<<15&4294967295|I>>>17),I=y+(A^(T|~g))+E[1]+2240044497&4294967295,y=T+(I<<21&4294967295|I>>>11),I=g+(T^(y|~A))+E[8]+1873313359&4294967295,g=y+(I<<6&4294967295|I>>>26),I=A+(y^(g|~T))+E[15]+4264355552&4294967295,A=g+(I<<10&4294967295|I>>>22),I=T+(g^(A|~y))+E[6]+2734768916&4294967295,T=A+(I<<15&4294967295|I>>>17),I=y+(A^(T|~g))+E[13]+1309151649&4294967295,y=T+(I<<21&4294967295|I>>>11),I=g+(T^(y|~A))+E[4]+4149444226&4294967295,g=y+(I<<6&4294967295|I>>>26),I=A+(y^(g|~T))+E[11]+3174756917&4294967295,A=g+(I<<10&4294967295|I>>>22),I=T+(g^(A|~y))+E[2]+718787259&4294967295,T=A+(I<<15&4294967295|I>>>17),I=y+(A^(T|~g))+E[9]+3951481745&4294967295,_.g[0]=_.g[0]+g&4294967295,_.g[1]=_.g[1]+(T+(I<<21&4294967295|I>>>11))&4294967295,_.g[2]=_.g[2]+T&4294967295,_.g[3]=_.g[3]+A&4294967295}n.prototype.v=function(_,g){g===void 0&&(g=_.length);const y=g-this.blockSize,E=this.C;let T=this.h,A=0;for(;A<g;){if(T==0)for(;A<=y;)s(this,_,A),A+=this.blockSize;if(typeof _=="string"){for(;A<g;)if(E[T++]=_.charCodeAt(A++),T==this.blockSize){s(this,E),T=0;break}}else for(;A<g;)if(E[T++]=_[A++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=g},n.prototype.A=function(){var _=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);_[0]=128;for(var g=1;g<_.length-8;++g)_[g]=0;g=this.o*8;for(var y=_.length-8;y<_.length;++y)_[y]=g&255,g/=256;for(this.v(_),_=Array(16),g=0,y=0;y<4;++y)for(let E=0;E<32;E+=8)_[g++]=this.g[y]>>>E&255;return _};function i(_,g){var y=c;return Object.prototype.hasOwnProperty.call(y,_)?y[_]:y[_]=g(_)}function o(_,g){this.h=g;const y=[];let E=!0;for(let T=_.length-1;T>=0;T--){const A=_[T]|0;E&&A==g||(y[T]=A,E=!1)}this.g=y}var c={};function u(_){return-128<=_&&_<128?i(_,function(g){return new o([g|0],g<0?-1:0)}):new o([_|0],_<0?-1:0)}function h(_){if(isNaN(_)||!isFinite(_))return p;if(_<0)return D(h(-_));const g=[];let y=1;for(let E=0;_>=y;E++)g[E]=_/y|0,y*=4294967296;return new o(g,0)}function f(_,g){if(_.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(_.charAt(0)=="-")return D(f(_.substring(1),g));if(_.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let E=p;for(let A=0;A<_.length;A+=8){var T=Math.min(8,_.length-A);const I=parseInt(_.substring(A,A+T),g);T<8?(T=h(Math.pow(g,T)),E=E.j(T).add(h(I))):(E=E.j(y),E=E.add(h(I)))}return E}var p=u(0),w=u(1),S=u(16777216);r=o.prototype,r.m=function(){if(O(this))return-D(this).m();let _=0,g=1;for(let y=0;y<this.g.length;y++){const E=this.i(y);_+=(E>=0?E:4294967296+E)*g,g*=4294967296}return _},r.toString=function(_){if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(C(this))return"0";if(O(this))return"-"+D(this).toString(_);const g=h(Math.pow(_,6));var y=this;let E="";for(;;){const T=F(y,g).g;y=W(y,T.j(g));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(_);if(y=T,C(y))return A+E;for(;A.length<6;)A="0"+A;E=A+E}},r.i=function(_){return _<0?0:_<this.g.length?this.g[_]:this.h};function C(_){if(_.h!=0)return!1;for(let g=0;g<_.g.length;g++)if(_.g[g]!=0)return!1;return!0}function O(_){return _.h==-1}r.l=function(_){return _=W(this,_),O(_)?-1:C(_)?0:1};function D(_){const g=_.g.length,y=[];for(let E=0;E<g;E++)y[E]=~_.g[E];return new o(y,~_.h).add(w)}r.abs=function(){return O(this)?D(this):this},r.add=function(_){const g=Math.max(this.g.length,_.g.length),y=[];let E=0;for(let T=0;T<=g;T++){let A=E+(this.i(T)&65535)+(_.i(T)&65535),I=(A>>>16)+(this.i(T)>>>16)+(_.i(T)>>>16);E=I>>>16,A&=65535,I&=65535,y[T]=I<<16|A}return new o(y,y[y.length-1]&-2147483648?-1:0)};function W(_,g){return _.add(D(g))}r.j=function(_){if(C(this)||C(_))return p;if(O(this))return O(_)?D(this).j(D(_)):D(D(this).j(_));if(O(_))return D(this.j(D(_)));if(this.l(S)<0&&_.l(S)<0)return h(this.m()*_.m());const g=this.g.length+_.g.length,y=[];for(var E=0;E<2*g;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(let T=0;T<_.g.length;T++){const A=this.i(E)>>>16,I=this.i(E)&65535,ve=_.i(T)>>>16,it=_.i(T)&65535;y[2*E+2*T]+=I*it,H(y,2*E+2*T),y[2*E+2*T+1]+=A*it,H(y,2*E+2*T+1),y[2*E+2*T+1]+=I*ve,H(y,2*E+2*T+1),y[2*E+2*T+2]+=A*ve,H(y,2*E+2*T+2)}for(_=0;_<g;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=g;_<2*g;_++)y[_]=0;return new o(y,0)};function H(_,g){for(;(_[g]&65535)!=_[g];)_[g+1]+=_[g]>>>16,_[g]&=65535,g++}function z(_,g){this.g=_,this.h=g}function F(_,g){if(C(g))throw Error("division by zero");if(C(_))return new z(p,p);if(O(_))return g=F(D(_),g),new z(D(g.g),D(g.h));if(O(g))return g=F(_,D(g)),new z(D(g.g),g.h);if(_.g.length>30){if(O(_)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var y=w,E=g;E.l(_)<=0;)y=q(y),E=q(E);var T=B(y,1),A=B(E,1);for(E=B(E,2),y=B(y,2);!C(E);){var I=A.add(E);I.l(_)<=0&&(T=T.add(y),A=I),E=B(E,1),y=B(y,1)}return g=W(_,T.j(g)),new z(T,g)}for(T=p;_.l(g)>=0;){for(y=Math.max(1,Math.floor(_.m()/g.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),A=h(y),I=A.j(g);O(I)||I.l(_)>0;)y-=E,A=h(y),I=A.j(g);C(A)&&(A=w),T=T.add(A),_=W(_,I)}return new z(T,_)}r.B=function(_){return F(this,_).h},r.and=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let E=0;E<g;E++)y[E]=this.i(E)&_.i(E);return new o(y,this.h&_.h)},r.or=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let E=0;E<g;E++)y[E]=this.i(E)|_.i(E);return new o(y,this.h|_.h)},r.xor=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let E=0;E<g;E++)y[E]=this.i(E)^_.i(E);return new o(y,this.h^_.h)};function q(_){const g=_.g.length+1,y=[];for(let E=0;E<g;E++)y[E]=_.i(E)<<1|_.i(E-1)>>>31;return new o(y,_.h)}function B(_,g){const y=g>>5;g%=32;const E=_.g.length-y,T=[];for(let A=0;A<E;A++)T[A]=g>0?_.i(A+y)>>>g|_.i(A+y+1)<<32-g:_.i(A+y);return new o(T,_.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Ud=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Ut=o}).apply(typeof yl<"u"?yl:typeof self<"u"?self:typeof window<"u"?window:{});var ei=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bd,zr,jd,fi,ma,qd,zd,$d;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ei=="object"&&ei];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var b=a[m];if(!(b in d))break e;d=d[b]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,b,R){for(var N=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)N[Q-2]=arguments[Q];return l.prototype[b].apply(m,N)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function S(a){const l=a.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function C(a,l){for(let m=1;m<arguments.length;m++){const b=arguments[m];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=a.length||0;const R=b.length||0;a.length=d+R;for(let N=0;N<R;N++)a[d+N]=b[N]}else a.push(b)}}class O{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function D(a){o.setTimeout(()=>{throw a},0)}function W(){var a=_;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class H{constructor(){this.h=this.g=null}add(l,d){const m=z.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var z=new O(()=>new F,a=>a.reset());class F{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let q,B=!1,_=new H,g=()=>{const a=Promise.resolve(void 0);q=()=>{a.then(y)}};function y(){for(var a;a=W();){try{a.h.call(a.g)}catch(d){D(d)}var l=z;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}B=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var A=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function I(a){return/^[\s\xa0]*$/.test(a)}function ve(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(ve,T),ve.prototype.init=function(a,l){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ve.Z.h.call(this)},ve.prototype.h=function(){ve.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var it="closure_listenable_"+(Math.random()*1e6|0),yo=0;function Ir(a,l,d,m,b){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=b,this.key=++yo,this.da=this.fa=!1}function Fs(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Us(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function tp(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function qc(a){const l={};for(const d in a)l[d]=a[d];return l}const zc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function $c(a,l){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)a[d]=m[d];for(let R=0;R<zc.length;R++)d=zc[R],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function Bs(a){this.src=a,this.g={},this.h=0}Bs.prototype.add=function(a,l,d,m,b){const R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);const N=To(a,l,m,b);return N>-1?(l=a[N],d||(l.fa=!1)):(l=new Ir(l,this.src,R,!!m,b),l.fa=d,a.push(l)),l};function Io(a,l){const d=l.type;if(d in a.g){var m=a.g[d],b=Array.prototype.indexOf.call(m,l,void 0),R;(R=b>=0)&&Array.prototype.splice.call(m,b,1),R&&(Fs(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function To(a,l,d,m){for(let b=0;b<a.length;++b){const R=a[b];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==m)return b}return-1}var Eo="closure_lm_"+(Math.random()*1e6|0),wo={};function Gc(a,l,d,m,b){if(Array.isArray(l)){for(let R=0;R<l.length;R++)Gc(a,l[R],d,m,b);return null}return d=Wc(d),a&&a[it]?a.J(l,d,c(m)?!!m.capture:!1,b):np(a,l,d,!1,m,b)}function np(a,l,d,m,b,R){if(!l)throw Error("Invalid event type");const N=c(b)?!!b.capture:!!b;let Q=Ao(a);if(Q||(a[Eo]=Q=new Bs(a)),d=Q.add(l,d,m,N,R),d.proxy)return d;if(m=rp(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)A||(b=N),b===void 0&&(b=!1),a.addEventListener(l.toString(),m,b);else if(a.attachEvent)a.attachEvent(Hc(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function rp(){function a(d){return l.call(a.src,a.listener,d)}const l=sp;return a}function Kc(a,l,d,m,b){if(Array.isArray(l))for(var R=0;R<l.length;R++)Kc(a,l[R],d,m,b);else m=c(m)?!!m.capture:!!m,d=Wc(d),a&&a[it]?(a=a.i,R=String(l).toString(),R in a.g&&(l=a.g[R],d=To(l,d,m,b),d>-1&&(Fs(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[R],a.h--)))):a&&(a=Ao(a))&&(l=a.g[l.toString()],a=-1,l&&(a=To(l,d,m,b)),(d=a>-1?l[a]:null)&&vo(d))}function vo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[it])Io(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(Hc(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=Ao(l))?(Io(d,a),d.h==0&&(d.src=null,l[Eo]=null)):Fs(a)}}}function Hc(a){return a in wo?wo[a]:wo[a]="on"+a}function sp(a,l){if(a.da)a=!0;else{l=new ve(l,this);const d=a.listener,m=a.ha||a.src;a.fa&&vo(a),a=d.call(m,l)}return a}function Ao(a){return a=a[Eo],a instanceof Bs?a:null}var bo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Wc(a){return typeof a=="function"?a:(a[bo]||(a[bo]=function(l){return a.handleEvent(l)}),a[bo])}function Se(){E.call(this),this.i=new Bs(this),this.M=this,this.G=null}p(Se,E),Se.prototype[it]=!0,Se.prototype.removeEventListener=function(a,l,d,m){Kc(this,a,l,d,m)};function De(a,l){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var b=l;l=new T(m,a),$c(l,b)}b=!0;let R,N;if(d)for(N=d.length-1;N>=0;N--)R=l.g=d[N],b=js(R,m,!0,l)&&b;if(R=l.g=a,b=js(R,m,!0,l)&&b,b=js(R,m,!1,l)&&b,d)for(N=0;N<d.length;N++)R=l.g=d[N],b=js(R,m,!1,l)&&b}Se.prototype.N=function(){if(Se.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let m=0;m<d.length;m++)Fs(d[m]);delete a.g[l],a.h--}}this.G=null},Se.prototype.J=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},Se.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function js(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let R=0;R<l.length;++R){const N=l[R];if(N&&!N.da&&N.capture==d){const Q=N.listener,ge=N.ha||N.src;N.fa&&Io(a.i,N),b=Q.call(ge,m)!==!1&&b}}return b&&!m.defaultPrevented}function ip(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Qc(a){a.g=ip(()=>{a.g=null,a.i&&(a.i=!1,Qc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class op extends E{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Qc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Tr(a){E.call(this),this.h=a,this.g={}}p(Tr,E);var Jc=[];function Yc(a){Us(a.g,function(l,d){this.g.hasOwnProperty(d)&&vo(l)},a),a.g={}}Tr.prototype.N=function(){Tr.Z.N.call(this),Yc(this)},Tr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ro=o.JSON.stringify,ap=o.JSON.parse,cp=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Xc(){}function Zc(){}var Er={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function So(){T.call(this,"d")}p(So,T);function Po(){T.call(this,"c")}p(Po,T);var Yt={},eu=null;function qs(){return eu=eu||new Se}Yt.Ia="serverreachability";function tu(a){T.call(this,Yt.Ia,a)}p(tu,T);function wr(a){const l=qs();De(l,new tu(l))}Yt.STAT_EVENT="statevent";function nu(a,l){T.call(this,Yt.STAT_EVENT,a),this.stat=l}p(nu,T);function Ne(a){const l=qs();De(l,new nu(l,a))}Yt.Ja="timingevent";function ru(a,l){T.call(this,Yt.Ja,a),this.size=l}p(ru,T);function vr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Ar(){this.g=!0}Ar.prototype.ua=function(){this.g=!1};function up(a,l,d,m,b,R){a.info(function(){if(a.g)if(R){var N="",Q=R.split("&");for(let se=0;se<Q.length;se++){var ge=Q[se].split("=");if(ge.length>1){const Te=ge[0];ge=ge[1];const Ye=Te.split("_");N=Ye.length>=2&&Ye[1]=="type"?N+(Te+"="+ge+"&"):N+(Te+"=redacted&")}}}else N=null;else N=R;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+l+`
`+d+`
`+N})}function lp(a,l,d,m,b,R,N){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+l+`
`+d+`
`+R+" "+N})}function Vn(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+dp(a,d)+(m?" "+m:"")})}function hp(a,l){a.info(function(){return"TIMEOUT: "+l})}Ar.prototype.info=function(){};function dp(a,l){if(!a.g)return l;if(!l)return null;try{const R=JSON.parse(l);if(R){for(a=0;a<R.length;a++)if(Array.isArray(R[a])){var d=R[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var b=m[0];if(b!="noop"&&b!="stop"&&b!="close")for(let N=1;N<m.length;N++)m[N]=""}}}}return Ro(R)}catch{return l}}var zs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},su={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},iu;function Co(){}p(Co,Xc),Co.prototype.g=function(){return new XMLHttpRequest},iu=new Co;function br(a){return encodeURIComponent(String(a))}function fp(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function It(a,l,d,m){this.j=a,this.i=l,this.l=d,this.S=m||1,this.V=new Tr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ou}function ou(){this.i=null,this.g="",this.h=!1}var au={},Vo={};function xo(a,l,d){a.M=1,a.A=Gs(Je(l)),a.u=d,a.R=!0,cu(a,null)}function cu(a,l){a.F=Date.now(),$s(a),a.B=Je(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Eu(d.i,"t",m),a.C=0,d=a.j.L,a.h=new ou,a.g=Uu(a.j,d?l:null,!a.u),a.P>0&&(a.O=new op(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,m=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(Jc[0]=b.toString()),b=Jc);for(let R=0;R<b.length;R++){const N=Gc(d,b[R],m||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=a.J?qc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),wr(),up(a.i,a.v,a.B,a.l,a.S,a.u)}It.prototype.ba=function(a){a=a.target;const l=this.O;l&&wt(a)==3?l.j():this.Y(a)},It.prototype.Y=function(a){try{if(a==this.g)e:{const Q=wt(this.g),ge=this.g.ya(),se=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||Pu(this.g)))){this.K||Q!=4||ge==7||(ge==8||se<=0?wr(3):wr(2)),ko(this);var l=this.g.ca();this.X=l;var d=mp(this);if(this.o=l==200,lp(this.i,this.v,this.B,this.l,this.S,Q,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,b=this.g;if((m=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(m)){var R=m;break t}}R=null}if(a=R)Vn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Do(this,a);else{this.o=!1,this.m=3,Ne(12),Xt(this),Rr(this);break e}}if(this.R){a=!0;let Te;for(;!this.K&&this.C<d.length;)if(Te=pp(this,d),Te==Vo){Q==4&&(this.m=4,Ne(14),a=!1),Vn(this.i,this.l,null,"[Incomplete Response]");break}else if(Te==au){this.m=4,Ne(15),Vn(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Vn(this.i,this.l,Te,null),Do(this,Te);if(uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||d.length!=0||this.h.h||(this.m=1,Ne(16),a=!1),this.o=this.o&&a,!a)Vn(this.i,this.l,d,"[Invalid Chunked Response]"),Xt(this),Rr(this);else if(d.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),jo(N),N.P=!0,Ne(11))}}else Vn(this.i,this.l,d,null),Do(this,d);Q==4&&Xt(this),this.o&&!this.K&&(Q==4?Ou(this.j,this):(this.o=!1,$s(this)))}else Cp(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Ne(12)):(this.m=0,Ne(13)),Xt(this),Rr(this)}}}catch{}finally{}};function mp(a){if(!uu(a))return a.g.la();const l=Pu(a.g);if(l==="")return"";let d="";const m=l.length,b=wt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Xt(a),Rr(a),"";a.h.i=new o.TextDecoder}for(let R=0;R<m;R++)a.h.h=!0,d+=a.h.i.decode(l[R],{stream:!(b&&R==m-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function uu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function pp(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?Vo:(d=Number(l.substring(d,m)),isNaN(d)?au:(m+=1,m+d>l.length?Vo:(l=l.slice(m,m+d),a.C=m+d,l)))}It.prototype.cancel=function(){this.K=!0,Xt(this)};function $s(a){a.T=Date.now()+a.H,lu(a,a.H)}function lu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=vr(h(a.aa,a),l)}function ko(a){a.D&&(o.clearTimeout(a.D),a.D=null)}It.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(hp(this.i,this.B),this.M!=2&&(wr(),Ne(17)),Xt(this),this.m=2,Rr(this)):lu(this,this.T-a)};function Rr(a){a.j.I==0||a.K||Ou(a.j,a)}function Xt(a){ko(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Yc(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Do(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||No(d.h,a))){if(!a.L&&No(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Js(d),Ws(d);else break e;Bo(d),Ne(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=vr(h(d.Va,d),6e3));fu(d.h)<=1&&d.ta&&(d.ta=void 0)}else en(d,11)}else if((a.L||d.g==a)&&Js(d),!I(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let se=b[l];const Te=se[0];if(!(Te<=d.K))if(d.K=Te,se=se[1],d.I==2)if(se[0]=="c"){d.M=se[1],d.ba=se[2];const Ye=se[3];Ye!=null&&(d.ka=Ye,d.j.info("VER="+d.ka));const tn=se[4];tn!=null&&(d.za=tn,d.j.info("SVER="+d.za));const vt=se[5];vt!=null&&typeof vt=="number"&&vt>0&&(m=1.5*vt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const At=a.g;if(At){const Xs=At.g?At.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Xs){var R=m.h;R.g||Xs.indexOf("spdy")==-1&&Xs.indexOf("quic")==-1&&Xs.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Oo(R,R.h),R.h=null))}if(m.G){const qo=At.g?At.g.getResponseHeader("X-HTTP-Session-Id"):null;qo&&(m.wa=qo,oe(m.J,m.G,qo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var N=a;if(m.na=Fu(m,m.L?m.ba:null,m.W),N.L){mu(m.h,N);var Q=N,ge=m.O;ge&&(Q.H=ge),Q.D&&(ko(Q),$s(Q)),m.g=N}else Du(m);d.i.length>0&&Qs(d)}else se[0]!="stop"&&se[0]!="close"||en(d,7);else d.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?en(d,7):Uo(d):se[0]!="noop"&&d.l&&d.l.qa(se),d.A=0)}}wr(4)}catch{}}var gp=class{constructor(a,l){this.g=a,this.map=l}};function hu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function du(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fu(a){return a.h?1:a.g?a.g.size:0}function No(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Oo(a,l){a.g?a.g.add(l):a.h=l}function mu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}hu.prototype.cancel=function(){if(this.i=pu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function pu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return S(a.i)}var gu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _p(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let b,R=null;m>=0?(b=a[d].substring(0,m),R=a[d].substring(m+1)):b=a[d],l(b,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Tt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof Tt?(this.l=a.l,Sr(this,a.j),this.o=a.o,this.g=a.g,Pr(this,a.u),this.h=a.h,Mo(this,wu(a.i)),this.m=a.m):a&&(l=String(a).match(gu))?(this.l=!1,Sr(this,l[1]||"",!0),this.o=Cr(l[2]||""),this.g=Cr(l[3]||"",!0),Pr(this,l[4]),this.h=Cr(l[5]||"",!0),Mo(this,l[6]||"",!0),this.m=Cr(l[7]||"")):(this.l=!1,this.i=new xr(null,this.l))}Tt.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Vr(l,_u,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Vr(l,_u,!0),"@"),a.push(br(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Vr(d,d.charAt(0)=="/"?Tp:Ip,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Vr(d,wp)),a.join("")},Tt.prototype.resolve=function(a){const l=Je(this);let d=!!a.j;d?Sr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var m=a.h;if(d)Pr(l,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var b=l.h.lastIndexOf("/");b!=-1&&(m=l.h.slice(0,b+1)+m)}if(b=m,b==".."||b==".")m="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){m=b.lastIndexOf("/",0)==0,b=b.split("/");const R=[];for(let N=0;N<b.length;){const Q=b[N++];Q=="."?m&&N==b.length&&R.push(""):Q==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),m&&N==b.length&&R.push("")):(R.push(Q),m=!0)}m=R.join("/")}else m=b}return d?l.h=m:d=a.i.toString()!=="",d?Mo(l,wu(a.i)):d=!!a.m,d&&(l.m=a.m),l};function Je(a){return new Tt(a)}function Sr(a,l,d){a.j=d?Cr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Pr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Mo(a,l,d){l instanceof xr?(a.i=l,vp(a.i,a.l)):(d||(l=Vr(l,Ep)),a.i=new xr(l,a.l))}function oe(a,l,d){a.i.set(l,d)}function Gs(a){return oe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Cr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,yp),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function yp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var _u=/[#\/\?@]/g,Ip=/[#\?:]/g,Tp=/[#\?]/g,Ep=/[#\?@]/g,wp=/#/g;function xr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Zt(a){a.g||(a.g=new Map,a.h=0,a.i&&_p(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=xr.prototype,r.add=function(a,l){Zt(this),this.i=null,a=xn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function yu(a,l){Zt(a),l=xn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Iu(a,l){return Zt(a),l=xn(a,l),a.g.has(l)}r.forEach=function(a,l){Zt(this),this.g.forEach(function(d,m){d.forEach(function(b){a.call(l,b,m,this)},this)},this)};function Tu(a,l){Zt(a);let d=[];if(typeof l=="string")Iu(a,l)&&(d=d.concat(a.g.get(xn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return Zt(this),this.i=null,a=xn(this,a),Iu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Tu(this,a),a.length>0?String(a[0]):l):l};function Eu(a,l,d){yu(a,l),d.length>0&&(a.i=null,a.g.set(xn(a,l),S(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const b=br(d);d=Tu(this,d);for(let R=0;R<d.length;R++){let N=b;d[R]!==""&&(N+="="+br(d[R])),a.push(N)}}return this.i=a.join("&")};function wu(a){const l=new xr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function xn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function vp(a,l){l&&!a.j&&(Zt(a),a.i=null,a.g.forEach(function(d,m){const b=m.toLowerCase();m!=b&&(yu(this,m),Eu(this,b,d))},a)),a.j=l}function Ap(a,l){const d=new Ar;if(o.Image){const m=new Image;m.onload=f(Et,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(Et,d,"TestLoadImage: error",!1,l,m),m.onabort=f(Et,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(Et,d,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function bp(a,l){const d=new Ar,m=new AbortController,b=setTimeout(()=>{m.abort(),Et(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(R=>{clearTimeout(b),R.ok?Et(d,"TestPingServer: ok",!0,l):Et(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Et(d,"TestPingServer: error",!1,l)})}function Et(a,l,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function Rp(){this.g=new cp}function Lo(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Lo,Xc),Lo.prototype.g=function(){return new Ks(this.i,this.h)};function Ks(a,l){Se.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ks,Se),r=Ks.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Dr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,kr(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Dr(this)),this.g&&(this.readyState=3,Dr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;vu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function vu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?kr(this):Dr(this),this.readyState==3&&vu(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,kr(this))},r.Na=function(a){this.g&&(this.response=a,kr(this))},r.ga=function(){this.g&&kr(this)};function kr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Dr(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Dr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ks.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Au(a){let l="";return Us(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Fo(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Au(d),typeof a=="string"?d!=null&&br(d):oe(a,l,d))}function le(a){Se.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(le,Se);var Sp=/^https?$/i,Pp=["POST","PUT"];r=le.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():iu.g(),this.g.onreadystatechange=w(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(R){bu(this,R);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Pp,l,void 0)>=0)||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,N]of d)this.g.setRequestHeader(R,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(R){bu(this,R)}};function bu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Ru(a),Hs(a)}function Ru(a){a.A||(a.A=!0,De(a,"complete"),De(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,De(this,"complete"),De(this,"abort"),Hs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Hs(this,!0)),le.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Su(this):this.Xa())},r.Xa=function(){Su(this)};function Su(a){if(a.h&&typeof i<"u"){if(a.v&&wt(a)==4)setTimeout(a.Ca.bind(a),0);else if(De(a,"readystatechange"),wt(a)==4){a.h=!1;try{const R=a.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=R===0){let N=String(a.D).match(gu)[1]||null;!N&&o.self&&o.self.location&&(N=o.self.location.protocol.slice(0,-1)),m=!Sp.test(N?N.toLowerCase():"")}d=m}if(d)De(a,"complete"),De(a,"success");else{a.o=6;try{var b=wt(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",Ru(a)}}finally{Hs(a)}}}}function Hs(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||De(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function wt(a){return a.g?a.g.readyState:0}r.ca=function(){try{return wt(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),ap(l)}};function Pu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Cp(a){const l={};a=(a.g&&wt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(I(a[m]))continue;var d=fp(a[m]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=l[b]||[];l[b]=R,R.push(d)}tp(l,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Cu(a){this.za=0,this.i=[],this.j=new Ar,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Nr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Nr("baseRetryDelayMs",5e3,a),this.Za=Nr("retryDelaySeedMs",1e4,a),this.Ta=Nr("forwardChannelMaxRetries",2,a),this.va=Nr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new hu(a&&a.concurrentRequestLimit),this.Ba=new Rp,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Cu.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,m){Ne(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Fu(this,null,this.W),Qs(this)};function Uo(a){if(Vu(a),a.I==3){var l=a.V++,d=Je(a.J);if(oe(d,"SID",a.M),oe(d,"RID",l),oe(d,"TYPE","terminate"),Or(a,d),l=new It(a,a.j,l),l.M=2,l.A=Gs(Je(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Uu(l.j,null),l.g.ea(l.A)),l.F=Date.now(),$s(l)}Lu(a)}function Ws(a){a.g&&(jo(a),a.g.cancel(),a.g=null)}function Vu(a){Ws(a),a.v&&(o.clearTimeout(a.v),a.v=null),Js(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Qs(a){if(!du(a.h)&&!a.m){a.m=!0;var l=a.Ea;q||g(),B||(q(),B=!0),_.add(l,a),a.D=0}}function Vp(a,l){return fu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=vr(h(a.Ea,a,l),Mu(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new It(this,this.j,a);let R=this.o;if(this.U&&(R?(R=qc(R),$c(R,this.U)):R=this.U),this.u!==null||this.R||(b.J=R,R=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=ku(this,b,l),d=Je(this.J),oe(d,"RID",a),oe(d,"CVER",22),this.G&&oe(d,"X-HTTP-Session-Id",this.G),Or(this,d),R&&(this.R?l="headers="+br(Au(R))+"&"+l:this.u&&Fo(d,this.u,R)),Oo(this.h,b),this.Ra&&oe(d,"TYPE","init"),this.S?(oe(d,"$req",l),oe(d,"SID","null"),b.U=!0,xo(b,d,null)):xo(b,d,l),this.I=2}}else this.I==3&&(a?xu(this,a):this.i.length==0||du(this.h)||xu(this))};function xu(a,l){var d;l?d=l.l:d=a.V++;const m=Je(a.J);oe(m,"SID",a.M),oe(m,"RID",d),oe(m,"AID",a.K),Or(a,m),a.u&&a.o&&Fo(m,a.u,a.o),d=new It(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=ku(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Oo(a.h,d),xo(d,m,l)}function Or(a,l){a.H&&Us(a.H,function(d,m){oe(l,m,d)}),a.l&&Us({},function(d,m){oe(l,m,d)})}function ku(a,l,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var b=a.i;let Q=-1;for(;;){const ge=["count="+d];Q==-1?d>0?(Q=b[0].g,ge.push("ofs="+Q)):Q=0:ge.push("ofs="+Q);let se=!0;for(let Te=0;Te<d;Te++){var R=b[Te].g;const Ye=b[Te].map;if(R-=Q,R<0)Q=Math.max(0,b[Te].g-100),se=!1;else try{R="req"+R+"_"||"";try{var N=Ye instanceof Map?Ye:Object.entries(Ye);for(const[tn,vt]of N){let At=vt;c(vt)&&(At=Ro(vt)),ge.push(R+tn+"="+encodeURIComponent(At))}}catch(tn){throw ge.push(R+"type="+encodeURIComponent("_badmap")),tn}}catch{m&&m(Ye)}}if(se){N=ge.join("&");break e}}N=void 0}return a=a.i.splice(0,d),l.G=a,N}function Du(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;q||g(),B||(q(),B=!0),_.add(l,a),a.A=0}}function Bo(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=vr(h(a.Da,a),Mu(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Nu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=vr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ne(10),Ws(this),Nu(this))};function jo(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Nu(a){a.g=new It(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Je(a.na);oe(l,"RID","rpc"),oe(l,"SID",a.M),oe(l,"AID",a.K),oe(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&oe(l,"TO",a.ia),oe(l,"TYPE","xmlhttp"),Or(a,l),a.u&&a.o&&Fo(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Gs(Je(l)),d.u=null,d.R=!0,cu(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Ws(this),Bo(this),Ne(19))};function Js(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ou(a,l){var d=null;if(a.g==l){Js(a),jo(a),a.g=null;var m=2}else if(No(a.h,l))d=l.G,mu(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=a.D;m=qs(),De(m,new ru(m,d)),Qs(a)}else Du(a);else if(b=l.m,b==3||b==0&&l.X>0||!(m==1&&Vp(a,l)||m==2&&Bo(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),b){case 1:en(a,5);break;case 4:en(a,10);break;case 3:en(a,6);break;default:en(a,2)}}}function Mu(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function en(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),m=a.Ua;const b=!m;m=new Tt(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Sr(m,"https"),Gs(m),b?Ap(m.toString(),d):bp(m.toString(),d)}else Ne(2);a.I=0,a.l&&a.l.pa(l),Lu(a),Vu(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ne(2)):(this.j.info("Failed to ping google.com"),Ne(1))};function Lu(a){if(a.I=0,a.ja=[],a.l){const l=pu(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ja,l),C(a.ja,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.oa()}}function Fu(a,l,d){var m=d instanceof Tt?Je(d):new Tt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Pr(m,m.u);else{var b=o.location;m=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const R=new Tt(null);m&&Sr(R,m),l&&(R.g=l),b&&Pr(R,b),d&&(R.h=d),m=R}return d=a.G,l=a.wa,d&&l&&oe(m,d,l),oe(m,"VER",a.ka),Or(a,m),m}function Uu(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new le(new Lo({ab:d})):new le(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bu(){}r=Bu.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Ys(){}Ys.prototype.g=function(a,l){return new Ue(a,l)};function Ue(a,l){Se.call(this),this.g=new Cu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!I(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!I(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new kn(this)}p(Ue,Se),Ue.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){Uo(this.g)},Ue.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Ro(a),a=d);l.i.push(new gp(l.Ya++,a)),l.I==3&&Qs(l)},Ue.prototype.N=function(){this.g.l=null,delete this.j,Uo(this.g),delete this.g,Ue.Z.N.call(this)};function ju(a){So.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(ju,So);function qu(){Po.call(this),this.status=1}p(qu,Po);function kn(a){this.g=a}p(kn,Bu),kn.prototype.ra=function(){De(this.g,"a")},kn.prototype.qa=function(a){De(this.g,new ju(a))},kn.prototype.pa=function(a){De(this.g,new qu)},kn.prototype.oa=function(){De(this.g,"b")},Ys.prototype.createWebChannel=Ys.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,$d=function(){return new Ys},zd=function(){return qs()},qd=Yt,ma={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},zs.NO_ERROR=0,zs.TIMEOUT=8,zs.HTTP_ERROR=6,fi=zs,su.COMPLETE="complete",jd=su,Zc.EventType=Er,Er.OPEN="a",Er.CLOSE="b",Er.ERROR="c",Er.MESSAGE="d",Se.prototype.listen=Se.prototype.J,zr=Zc,le.prototype.listenOnce=le.prototype.K,le.prototype.getLastError=le.prototype.Ha,le.prototype.getLastErrorCode=le.prototype.ya,le.prototype.getStatus=le.prototype.ca,le.prototype.getResponseJson=le.prototype.La,le.prototype.getResponseText=le.prototype.la,le.prototype.send=le.prototype.ea,le.prototype.setWithCredentials=le.prototype.Fa,Bd=le}).apply(typeof ei<"u"?ei:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ae.UNAUTHENTICATED=new Ae(null),Ae.GOOGLE_CREDENTIALS=new Ae("google-credentials-uid"),Ae.FIRST_PARTY=new Ae("first-party-uid"),Ae.MOCK_USER=new Ae("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pr="12.12.0";function FI(r){pr=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new ja("@firebase/firestore");function Un(){return yn.logLevel}function V(r,...e){if(yn.logLevel<=Y.DEBUG){const t=e.map(Xa);yn.debug(`Firestore (${pr}): ${r}`,...t)}}function Oe(r,...e){if(yn.logLevel<=Y.ERROR){const t=e.map(Xa);yn.error(`Firestore (${pr}): ${r}`,...t)}}function In(r,...e){if(yn.logLevel<=Y.WARN){const t=e.map(Xa);yn.warn(`Firestore (${pr}): ${r}`,...t)}}function Xa(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Gd(r,n,t)}function Gd(r,e,t){let n=`FIRESTORE (${pr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw Oe(n),new Error(n)}function U(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Gd(e,s,n)}function K(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class UI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ae.UNAUTHENTICATED)))}shutdown(){}}class BI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class jI{constructor(e){this.t=e,this.currentUser=Ae.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new Bt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Bt,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Bt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string",31837,{l:n}),new Kd(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{h:e}),new Ae(e)}}class qI{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Ae.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class zI{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new qI(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ae.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Il{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $I{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){U(this.o===void 0,3512);const n=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Il(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Il(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=GI(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function G(r,e){return r<e?-1:r>e?1:0}function pa(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Jo(s)===Jo(i)?G(s,i):Jo(s)?1:-1}return G(r.length,e.length)}const KI=55296,HI=57343;function Jo(r){const e=r.charCodeAt(0);return e>=KI&&e<=HI}function Xn(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Hd(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl="__name__";class Xe{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&L(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Xe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Xe?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Xe.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return G(e.length,t.length)}static compareSegments(e,t){const n=Xe.isNumericId(e),s=Xe.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Xe.extractNumericId(e).compare(Xe.extractNumericId(t)):pa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ut.fromString(e.substring(4,e.length-2))}}class ee extends Xe{construct(e,t,n){return new ee(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new ee(t)}static emptyPath(){return new ee([])}}const WI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends Xe{construct(e,t,n){return new ue(e,t,n)}static isValidIdentifier(e){return WI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Tl}static keyField(){return new ue([Tl])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new k(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new k(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ue(t)}static emptyPath(){return new ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(ee.fromString(e))}static fromName(e){return new M(ee.fromString(e).popFirst(5))}static empty(){return new M(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new ee(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(r,e,t){if(!t)throw new k(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function QI(r,e,t,n){if(e===!0&&n===!0)throw new k(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function El(r){if(!M.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function wl(r){if(M.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Qd(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Yi(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L(12329,{type:typeof r})}function jt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Yi(r);throw new k(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(r,e){const t={typeString:r};return e&&(t.value=e),t}function Cs(r,e){if(!Qd(r))throw new k(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new k(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl=-62135596800,Al=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Al);return new te(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<vl)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Al}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Cs(e,te._jsonSchema))return new te(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-vl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:me("string",te._jsonSchemaVersion),seconds:me("number"),nanoseconds:me("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(e){return new j(e)}static min(){return new j(new te(0,0))}static max(){return new j(new te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=-1;class ki{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function ga(r){return r.fields.find((e=>e.kind===2))}function sn(r){return r.fields.filter((e=>e.kind!==2))}ki.UNKNOWN_ID=-1;class mi{constructor(e,t){this.fieldPath=e,this.kind=t}}class as{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new as(0,qe.min())}}function JI(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=j.fromTimestamp(n===1e9?new te(t+1,0):new te(t,n));return new qe(s,M.empty(),e)}function Jd(r){return new qe(r.readTime,r.key,os)}class qe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new qe(j.min(),M.empty(),os)}static max(){return new qe(j.max(),M.empty(),os)}}function ec(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:G(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Xd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Yd)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):v.reject(t)}static resolve(e){return new v(((t,n)=>{t(e)}))}static reject(e){return new v(((t,n)=>{n(e)}))}static waitFor(e){return new v(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next((s=>s?v.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new v(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new v(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="SimpleDb";class Xi{static open(e,t,n,s){try{return new Xi(t,e.transaction(s,n))}catch(i){throw new Qr(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Bt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Qr(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=tc(n.target.error);this.S.reject(new Qr(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(Be,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new XI(t)}}class qt{static delete(e){return V(Be,"Removing database:",e),an(Qh().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!nd())return!1;if(qt.F())return!0;const e=ye(),t=qt.M(e),n=0<t&&t<10,s=Zd(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,qt.M(ye())===12.2&&Oe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(V(Be,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new Qr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new k(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new k(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Qr(e,o))},s.onupgradeneeded=i=>{V(Be,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{V(Be,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Xi.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),v.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(V(Be,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Zd(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class YI{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return an(this.U.delete())}}class Qr extends k{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Qt(r){return r.name==="IndexedDbTransactionError"}class XI{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(V(Be,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(V(Be,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),an(n)}add(e){return V(Be,"ADD",this.store.name,e,e),an(this.store.add(e))}get(e){return an(this.store.get(e)).next((t=>(t===void 0&&(t=null),V(Be,"GET",this.store.name,e,t),t)))}delete(e){return V(Be,"DELETE",this.store.name,e),an(this.store.delete(e))}count(){return V(Be,"COUNT",this.store.name),an(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(n),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}X(e,t){V(Be,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new v(((n,s)=>{t.onerror=i=>{const o=tc(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}H(e,t){const n=[];return new v(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new YI(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch((p=>(u.done(),v.reject(p))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>v.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function an(r){return new v(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=tc(n.target.error);t(s)}}))}let bl=!1;function tc(r){const e=qt.M(ye());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return bl||(bl=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Jr="IndexBackfiller";class ZI{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){V(Jr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();V(Jr,`Documents written: ${t}`)}catch(t){Qt(t)?V(Jr,"Ignoring IndexedDB error during index backfill: ",t):await Sn(t)}await this.re(6e4)}))}}class eT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return V(Jr,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(V(Jr,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=Jd(i);ec(o,n)>0&&(n=o)})),new qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ge.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn=-1;function Zi(r){return r==null}function cs(r){return r===0&&1/r==-1/0}function tT(r){return typeof r=="number"&&Number.isInteger(r)&&!cs(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Di="";function ke(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Rl(e)),e=nT(r.get(t),e);return Rl(e)}function nT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Di:t+="";break;default:t+=i}}return t}function Rl(r){return r+Di+""}function Ze(r){const e=r.length;if(U(e>=2,64408,{path:r}),e===2)return U(r.charAt(0)===Di&&r.charAt(1)==="",56145,{path:r}),ee.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Di,i);switch((o<0||o>t)&&L(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:L(61167,{path:r})}i=o+2}return new ee(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on="remoteDocuments",Vs="owner",Dn="owner",us="mutationQueues",rT="userId",He="mutations",Sl="batchId",hn="userMutationsIndex",Pl=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(r,e){return[r,ke(e)]}function ef(r,e,t){return[r,ke(e),t]}const sT={},Zn="documentMutations",Ni="remoteDocumentsV14",iT=["prefixPath","collectionGroup","readTime","documentId"],gi="documentKeyIndex",oT=["prefixPath","collectionGroup","documentId"],tf="collectionGroupIndex",aT=["collectionGroup","readTime","prefixPath","documentId"],ls="remoteDocumentGlobal",_a="remoteDocumentGlobalKey",er="targets",nf="queryTargetsIndex",cT=["canonicalId","targetId"],tr="targetDocuments",uT=["targetId","path"],nc="documentTargetsIndex",lT=["path","targetId"],Oi="targetGlobalKey",fn="targetGlobal",hs="collectionParents",hT=["collectionId","parent"],nr="clientMetadata",dT="clientId",eo="bundles",fT="bundleId",to="namedQueries",mT="name",rc="indexConfiguration",pT="indexId",ya="collectionGroupIndex",gT="collectionGroup",Yr="indexState",_T=["indexId","uid"],rf="sequenceNumberIndex",yT=["uid","sequenceNumber"],Xr="indexEntries",IT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],sf="documentKeyIndex",TT=["indexId","uid","orderedDocumentKey"],no="documentOverlays",ET=["userId","collectionPath","documentId"],Ia="collectionPathOverlayIndex",wT=["userId","collectionPath","largestBatchId"],of="collectionGroupOverlayIndex",vT=["userId","collectionGroup","largestBatchId"],sc="globals",AT="name",af=[us,He,Zn,on,er,Vs,fn,tr,nr,ls,hs,eo,to],bT=[...af,no],cf=[us,He,Zn,Ni,er,Vs,fn,tr,nr,ls,hs,eo,to,no],uf=cf,ic=[...uf,rc,Yr,Xr],RT=ic,lf=[...ic,sc],ST=lf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta extends Xd{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ie(r,e){const t=K(r);return qt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Jt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function hf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ti(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ti(this.root,e,this.comparator,!1)}getReverseIterator(){return new ti(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ti(this.root,e,this.comparator,!0)}}class ti{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??be.RED,this.left=s??be.EMPTY,this.right=i??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new be(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vl(this.data.getIterator())}getIteratorFrom(e){return new Vl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Vl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Nn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(ue.comparator)}static empty(){return new Le([])}unionWith(e){let t=new re(ue.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Xn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new df("Invalid base64 string: "+i):i}})(e);return new pe(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pe.EMPTY_BYTE_STRING=new pe("");const PT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function mt(r){if(U(!!r,39018),typeof r=="string"){let e=0;const t=PT.exec(r);if(U(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ae(r.seconds),nanos:ae(r.nanos)}}function ae(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function pt(r){return typeof r=="string"?pe.fromBase64String(r):pe.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="server_timestamp",mf="__type__",pf="__previous_value__",gf="__local_write_time__";function oc(r){return(r?.mapValue?.fields||{})[mf]?.stringValue===ff}function ro(r){const e=r.mapValue.fields[pf];return oc(e)?ro(e):e}function ds(r){const e=mt(r.mapValue.fields[gf].timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e,t,n,s,i,o,c,u,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const fs="(default)";class Tn{constructor(e,t){this.projectId=e,this.database=t||fs}static empty(){return new Tn("","")}get isDefaultDatabase(){return this.database===fs}isEqual(e){return e instanceof Tn&&e.projectId===this.projectId&&e.database===this.database}}function VT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new k(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Tn(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="__type__",_f="__max__",Ot={mapValue:{fields:{__type__:{stringValue:_f}}}},cc="__vector__",rr="value",_i={nullValue:"NULL_VALUE"};function Gt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?oc(r)?4:yf(r)?9007199254740991:so(r)?10:11:L(28295,{value:r})}function st(r,e){if(r===e)return!0;const t=Gt(r);if(t!==Gt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ds(r).isEqual(ds(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=mt(s.timestampValue),c=mt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return pt(s.bytesValue).isEqual(pt(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return ae(s.geoPointValue.latitude)===ae(i.geoPointValue.latitude)&&ae(s.geoPointValue.longitude)===ae(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ae(s.integerValue)===ae(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=ae(s.doubleValue),c=ae(i.doubleValue);return o===c?cs(o)===cs(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return Xn(r.arrayValue.values||[],e.arrayValue.values||[],st);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Cl(o)!==Cl(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!st(o[u],c[u])))return!1;return!0})(r,e);default:return L(52216,{left:r})}}function ms(r,e){return(r.values||[]).find((t=>st(t,e)))!==void 0}function Kt(r,e){if(r===e)return 0;const t=Gt(r),n=Gt(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=ae(i.integerValue||i.doubleValue),u=ae(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return xl(r.timestampValue,e.timestampValue);case 4:return xl(ds(r),ds(e));case 5:return pa(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=pt(i),u=pt(o);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=G(c[h],u[h]);if(f!==0)return f}return G(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=G(ae(i.latitude),ae(o.latitude));return c!==0?c:G(ae(i.longitude),ae(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return kl(r.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},h=c[rr]?.arrayValue,f=u[rr]?.arrayValue,p=G(h?.values?.length||0,f?.values?.length||0);return p!==0?p:kl(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Ot.mapValue&&o===Ot.mapValue)return 0;if(i===Ot.mapValue)return 1;if(o===Ot.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const w=pa(u[p],f[p]);if(w!==0)return w;const S=Kt(c[u[p]],h[f[p]]);if(S!==0)return S}return G(u.length,f.length)})(r.mapValue,e.mapValue);default:throw L(23264,{he:t})}}function xl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return G(r,e);const t=mt(r),n=mt(e),s=G(t.seconds,n.seconds);return s!==0?s:G(t.nanos,n.nanos)}function kl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Kt(t[s],n[s]);if(i)return i}return G(t.length,n.length)}function sr(r){return Ea(r)}function Ea(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=mt(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return pt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return M.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Ea(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Ea(t.fields[o])}`;return s+"}"})(r.mapValue):L(61005,{value:r})}function yi(r){switch(Gt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ro(r);return e?16+yi(e):16;case 5:return 2*r.stringValue.length;case 6:return pt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+yi(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return Jt(n.fields,((i,o)=>{s+=i.length+yi(o)})),s})(r.mapValue);default:throw L(13486,{value:r})}}function ps(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function wa(r){return!!r&&"integerValue"in r}function gs(r){return!!r&&"arrayValue"in r}function Dl(r){return!!r&&"nullValue"in r}function Nl(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ii(r){return!!r&&"mapValue"in r}function so(r){return(r?.mapValue?.fields||{})[ac]?.stringValue===cc}function Zr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Jt(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Zr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Zr(r.arrayValue.values[t]);return e}return{...r}}function yf(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===_f}const If={mapValue:{fields:{[ac]:{stringValue:cc},[rr]:{arrayValue:{}}}}};function xT(r){return"nullValue"in r?_i:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?ps(Tn.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?so(r)?If:{mapValue:{}}:L(35942,{value:r})}function kT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?ps(Tn.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?If:"mapValue"in r?so(r)?{mapValue:{}}:Ot:L(61959,{value:r})}function Ol(r,e){const t=Kt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Ml(r,e){const t=Kt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ii(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Zr(t)}setAll(e){let t=ue.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=Zr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ii(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ii(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Jt(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new xe(Zr(this.value))}}function Tf(r){const e=[];return Jt(r.fields,((t,n)=>{const s=new ue([t]);if(Ii(n)){const i=Tf(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new he(e,0,j.min(),j.min(),j.min(),xe.empty(),0)}static newFoundDocument(e,t,n,s){return new he(e,1,t,j.min(),n,s,0)}static newNoDocument(e,t){return new he(e,2,t,j.min(),j.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new he(e,3,t,j.min(),j.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof he&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new he(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t){this.position=e,this.inclusive=t}}function Ll(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=Kt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Fl(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!st(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t="asc"){this.field=e,this.dir=t}}function DT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{}class X extends Ef{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new NT(e,t,n):t==="array-contains"?new LT(e,n):t==="in"?new Sf(e,n):t==="not-in"?new FT(e,n):t==="array-contains-any"?new UT(e,n):new X(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new OT(e,n):new MT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Kt(t,this.value)):t!==null&&Gt(this.value)===Gt(t)&&this.matchesComparison(Kt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends Ef{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ne(e,t)}matches(e){return or(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function or(r){return r.op==="and"}function va(r){return r.op==="or"}function uc(r){return wf(r)&&or(r)}function wf(r){for(const e of r.filters)if(e instanceof ne)return!1;return!0}function Aa(r){if(r instanceof X)return r.field.canonicalString()+r.op.toString()+sr(r.value);if(uc(r))return r.filters.map((e=>Aa(e))).join(",");{const e=r.filters.map((t=>Aa(t))).join(",");return`${r.op}(${e})`}}function vf(r,e){return r instanceof X?(function(n,s){return s instanceof X&&n.op===s.op&&n.field.isEqual(s.field)&&st(n.value,s.value)})(r,e):r instanceof ne?(function(n,s){return s instanceof ne&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&vf(o,s.filters[c])),!0):!1})(r,e):void L(19439)}function Af(r,e){const t=r.filters.concat(e);return ne.create(t,r.op)}function bf(r){return r instanceof X?(function(t){return`${t.field.canonicalString()} ${t.op} ${sr(t.value)}`})(r):r instanceof ne?(function(t){return t.op.toString()+" {"+t.getFilters().map(bf).join(" ,")+"}"})(r):"Filter"}class NT extends X{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class OT extends X{constructor(e,t){super(e,"in",t),this.keys=Rf("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class MT extends X{constructor(e,t){super(e,"not-in",t),this.keys=Rf("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Rf(r,e){return(e.arrayValue?.values||[]).map((t=>M.fromName(t.referenceValue)))}class LT extends X{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gs(t)&&ms(t.arrayValue,this.value)}}class Sf extends X{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ms(this.value.arrayValue,t)}}class FT extends X{constructor(e,t){super(e,"not-in",t)}matches(e){if(ms(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ms(this.value.arrayValue,t)}}class UT extends X{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gs(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>ms(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function ba(r,e=null,t=[],n=[],s=null,i=null,o=null){return new BT(r,e,t,n,s,i,o)}function En(r){const e=K(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Aa(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),Zi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>sr(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>sr(n))).join(",")),e.Te=t}return e.Te}function xs(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!DT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!vf(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Fl(r.startAt,e.startAt)&&Fl(r.endAt,e.endAt)}function Mi(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Li(r,e){return r.filters.filter((t=>t instanceof X&&t.field.isEqual(e)))}function Ul(r,e,t){let n=_i,s=!0;for(const i of Li(r,e)){let o=_i,c=!0;switch(i.op){case"<":case"<=":o=xT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=_i}Ol({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ol({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Bl(r,e,t){let n=Ot,s=!0;for(const i of Li(r,e)){let o=Ot,c=!0;switch(i.op){case">=":case">":o=kT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Ot}Ml({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ml({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function jT(r,e,t,n,s,i,o,c){return new gr(r,e,t,n,s,i,o,c)}function io(r){return new gr(r)}function jl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function qT(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Pf(r){return r.collectionGroup!==null}function es(r){const e=K(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new re(ue.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new _s(i,n))})),t.has(ue.keyField().canonicalString())||e.Ee.push(new _s(ue.keyField(),n))}return e.Ee}function Ke(r){const e=K(r);return e.Ie||(e.Ie=zT(e,es(r))),e.Ie}function zT(r,e){if(r.limitType==="F")return ba(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new _s(s.field,i)}));const t=r.endAt?new ir(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new ir(r.startAt.position,r.startAt.inclusive):null;return ba(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Ra(r,e){const t=r.filters.concat([e]);return new gr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function $T(r,e){const t=r.explicitOrderBy.concat([e]);return new gr(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Sa(r,e,t){return new gr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function oo(r,e){return xs(Ke(r),Ke(e))&&r.limitType===e.limitType}function Cf(r){return`${En(Ke(r))}|lt:${r.limitType}`}function Bn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>bf(s))).join(", ")}]`),Zi(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>sr(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>sr(s))).join(",")),`Target(${n})`})(Ke(r))}; limitType=${r.limitType})`}function ks(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of es(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,u){const h=Ll(o,c,u);return o.inclusive?h<=0:h<0})(n.startAt,es(n),s)||n.endAt&&!(function(o,c,u){const h=Ll(o,c,u);return o.inclusive?h>=0:h>0})(n.endAt,es(n),s))})(r,e)}function GT(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Vf(r){return(e,t)=>{let n=!1;for(const s of es(r)){const i=KT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function KT(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Kt(u,h):L(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return hf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT=new ce(M.comparator);function je(){return HT}const xf=new ce(M.comparator);function $r(...r){let e=xf;for(const t of r)e=e.insert(t.key,t);return e}function kf(r){let e=xf;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function et(){return ts()}function Df(){return ts()}function ts(){return new _t((r=>r.toString()),((r,e)=>r.isEqual(e)))}const WT=new ce(M.comparator),QT=new re(M.comparator);function J(...r){let e=QT;for(const t of r)e=e.add(t);return e}const JT=new re(G);function YT(){return JT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:cs(e)?"-0":e}}function Nf(r){return{integerValue:""+r}}function XT(r,e){return tT(e)?Nf(e):lc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(){this._=void 0}}function ZT(r,e,t){return r instanceof ys?(function(s,i){const o={fields:{[mf]:{stringValue:ff},[gf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&oc(i)&&(i=ro(i)),i&&(o.fields[pf]=i),{mapValue:o}})(t,e):r instanceof ar?Mf(r,e):r instanceof cr?Lf(r,e):(function(s,i){const o=Of(s,i),c=ql(o)+ql(s.Ae);return wa(o)&&wa(s.Ae)?Nf(c):lc(s.serializer,c)})(r,e)}function eE(r,e,t){return r instanceof ar?Mf(r,e):r instanceof cr?Lf(r,e):t}function Of(r,e){return r instanceof Is?(function(n){return wa(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class ys extends ao{}class ar extends ao{constructor(e){super(),this.elements=e}}function Mf(r,e){const t=Ff(e);for(const n of r.elements)t.some((s=>st(s,n)))||t.push(n);return{arrayValue:{values:t}}}class cr extends ao{constructor(e){super(),this.elements=e}}function Lf(r,e){let t=Ff(e);for(const n of r.elements)t=t.filter((s=>!st(s,n)));return{arrayValue:{values:t}}}class Is extends ao{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function ql(r){return ae(r.integerValue||r.doubleValue)}function Ff(r){return gs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e,t){this.field=e,this.transform=t}}function nE(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof ar&&s instanceof ar||n instanceof cr&&s instanceof cr?Xn(n.elements,s.elements,st):n instanceof Is&&s instanceof Is?st(n.Ae,s.Ae):n instanceof ys&&s instanceof ys})(r.transform,e.transform)}class rE{constructor(e,t){this.version=e,this.transformResults=t}}class Fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Fe}static exists(e){return new Fe(void 0,e)}static updateTime(e){return new Fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ti(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class co{}function Uf(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new hc(r.key,Fe.none()):new _r(r.key,r.data,Fe.none());{const t=r.data,n=xe.empty();let s=new re(ue.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new yt(r.key,n,new Le(s.toArray()),Fe.none())}}function sE(r,e,t){r instanceof _r?(function(s,i,o){const c=s.value.clone(),u=$l(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof yt?(function(s,i,o){if(!Ti(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=$l(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Bf(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ns(r,e,t,n){return r instanceof _r?(function(i,o,c,u){if(!Ti(i.precondition,o))return c;const h=i.value.clone(),f=Gl(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof yt?(function(i,o,c,u){if(!Ti(i.precondition,o))return c;const h=Gl(i.fieldTransforms,u,o),f=o.data;return f.setAll(Bf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(r,e,t,n):(function(i,o,c){return Ti(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function iE(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Of(n.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(n.field,i))}return t||null}function zl(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Xn(n,s,((i,o)=>nE(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class _r extends co{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class yt extends co{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Bf(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function $l(r,e,t){const n=new Map;U(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,eE(o,c,t[s]))}return n}function Gl(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,ZT(i,o,e))}return n}class hc extends co{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jf extends co{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&sE(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ns(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ns(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Df();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Uf(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(j.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),J())}isEqual(e){return this.batchId===e.batchId&&Xn(this.mutations,e.mutations,((t,n)=>zl(t,n)))&&Xn(this.baseMutations,e.baseMutations,((t,n)=>zl(t,n)))}}class fc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){U(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return WT})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new fc(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,Z;function aE(r){switch(r){case P.OK:return L(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return L(15467,{code:r})}}function qf(r){if(r===void 0)return Oe("GRPC error has no .code"),P.UNKNOWN;switch(r){case fe.OK:return P.OK;case fe.CANCELLED:return P.CANCELLED;case fe.UNKNOWN:return P.UNKNOWN;case fe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case fe.INTERNAL:return P.INTERNAL;case fe.UNAVAILABLE:return P.UNAVAILABLE;case fe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case fe.NOT_FOUND:return P.NOT_FOUND;case fe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case fe.ABORTED:return P.ABORTED;case fe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case fe.DATA_LOSS:return P.DATA_LOSS;default:return L(39323,{code:r})}}(Z=fe||(fe={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=new Ut([4294967295,4294967295],0);function Kl(r){const e=cE().encode(r),t=new Ud;return t.update(e),new Uint8Array(t.digest())}function Hl(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ut([t,n],0),new Ut([s,i],0)]}class pc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Gr(`Invalid padding: ${t}`);if(n<0)throw new Gr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Gr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Gr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ut.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Ut.fromNumber(n)));return s.compare(uE)===1&&(s=new Ut([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Kl(e),[n,s]=Hl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new pc(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Kl(e),[n,s]=Hl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Gr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Ds.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new uo(j.min(),s,new ce(G),je(),J())}}class Ds{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ds(n,t,J(),J(),J())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class zf{constructor(e,t){this.targetId=e,this.Ce=t}}class $f{constructor(e,t,n=pe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Wl{constructor(){this.ve=0,this.Fe=Ql(),this.Me=pe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),n=J();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:L(38017,{changeType:i})}})),new Ds(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Ql()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,U(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class lE{constructor(e){this.Ge=e,this.ze=new Map,this.je=je(),this.Je=ni(),this.He=ni(),this.Ze=new ce(G)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:L(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Mi(i))if(n===0){const o=new M(i.path);this.et(t,o,he.newNoDocument(o,j.min()))}else U(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=pt(n).toUint8Array()}catch(u){if(u instanceof df)return In("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new pc(o,s,i)}catch(u){return In(u instanceof Gr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Mi(c.target)){const u=new M(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,he.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let n=J();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new uo(e,t,this.Ze,this.je,n);return this.je=je(),this.Je=ni(),this.He=ni(),this.Ze=new ce(G),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Wl,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new re(G),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new re(G),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Wl),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ni(){return new ce(M.comparator)}function Ql(){return new ce(M.comparator)}const hE={asc:"ASCENDING",desc:"DESCENDING"},dE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fE={and:"AND",or:"OR"};class mE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Pa(r,e){return r.useProto3Json||Zi(e)?e:{value:e}}function ur(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gf(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function pE(r,e){return ur(r,e.toTimestamp())}function Me(r){return U(!!r,49232),j.fromTimestamp((function(t){const n=mt(t);return new te(n.seconds,n.nanos)})(r))}function gc(r,e){return Ca(r,e).canonicalString()}function Ca(r,e){const t=(function(s){return new ee(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function Kf(r){const e=ee.fromString(r);return U(tm(e),10190,{key:e.toString()}),e}function Fi(r,e){return gc(r.databaseId,e.path)}function mn(r,e){const t=Kf(e);if(t.get(1)!==r.databaseId.projectId)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(Qf(t))}function Hf(r,e){return gc(r.databaseId,e)}function Wf(r){const e=Kf(r);return e.length===4?ee.emptyPath():Qf(e)}function Va(r){return new ee(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Qf(r){return U(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Jl(r,e,t){return{name:Fi(r,e),fields:t.value.mapValue.fields}}function gE(r,e,t){const n=mn(r,e.name),s=Me(e.updateTime),i=e.createTime?Me(e.createTime):j.min(),o=new xe({mapValue:{fields:e.fields}}),c=he.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function _E(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(U(f===void 0||typeof f=="string",58123),pe.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),pe.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:qf(h.code);return new k(f,h.message||"")})(o);t=new $f(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=mn(r,n.document.name),i=Me(n.document.updateTime),o=n.document.createTime?Me(n.document.createTime):j.min(),c=new xe({mapValue:{fields:n.document.fields}}),u=he.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Ei(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=mn(r,n.document),i=n.readTime?Me(n.readTime):j.min(),o=he.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ei([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=mn(r,n.document),i=n.removedTargetIds||[];t=new Ei([],i,s,null)}else{if(!("filter"in e))return L(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new oE(s,i),c=n.targetId;t=new zf(c,o)}}return t}function Ui(r,e){let t;if(e instanceof _r)t={update:Jl(r,e.key,e.value)};else if(e instanceof hc)t={delete:Fi(r,e.key)};else if(e instanceof yt)t={update:Jl(r,e.key,e.data),updateMask:vE(e.fieldMask)};else{if(!(e instanceof jf))return L(16599,{dt:e.type});t={verify:Fi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof ys)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ar)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof cr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Is)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw L(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:pE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L(27497)})(r,e.precondition)),t}function xa(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?Fe.updateTime(Me(i.updateTime)):i.exists!==void 0?Fe.exists(i.exists):Fe.none()})(e.currentDocument):Fe.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)U(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new ys;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new ar(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new cr(f)}else"increment"in c?u=new Is(o,c.increment):L(16584,{proto:c});const h=ue.fromServerFormat(c.fieldPath);return new tE(h,u)})(r,s))):[];if(e.update){e.update.name;const s=mn(r,e.update.name),i=new xe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const h=u.fieldPaths||[];return new Le(h.map((f=>ue.fromServerFormat(f))))})(e.updateMask);return new yt(s,i,o,t,n)}return new _r(s,i,t,n)}if(e.delete){const s=mn(r,e.delete);return new hc(s,t)}if(e.verify){const s=mn(r,e.verify);return new jf(s,t)}return L(1463,{proto:e})}function yE(r,e){return r&&r.length>0?(U(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Me(s.updateTime):Me(i);return o.isEqual(j.min())&&(o=Me(i)),new rE(o,s.transformResults||[])})(t,e)))):[]}function Jf(r,e){return{documents:[Hf(r,e.path)]}}function Yf(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Hf(r,s);const i=(function(h){if(h.length!==0)return em(ne.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(w){return{field:jn(w.field),direction:TE(w.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Pa(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function Xf(r){let e=Wf(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){U(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const w=Zf(p);return w instanceof ne&&uc(w)?w.getFilters():[w]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((w=>(function(C){return new _s(qn(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(w)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let w;return w=typeof p=="object"?p.value:p,Zi(w)?null:w})(t.limit));let u=null;t.startAt&&(u=(function(p){const w=!!p.before,S=p.values||[];return new ir(S,w)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const w=!p.before,S=p.values||[];return new ir(S,w)})(t.endAt)),jT(e,s,o,i,c,"F",u,h)}function IE(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Zf(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=qn(t.unaryFilter.field);return X.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=qn(t.unaryFilter.field);return X.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=qn(t.unaryFilter.field);return X.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=qn(t.unaryFilter.field);return X.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}})(r):r.fieldFilter!==void 0?(function(t){return X.create(qn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ne.create(t.compositeFilter.filters.map((n=>Zf(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}})(t.compositeFilter.op))})(r):L(30097,{filter:r})}function TE(r){return hE[r]}function EE(r){return dE[r]}function wE(r){return fE[r]}function jn(r){return{fieldPath:r.canonicalString()}}function qn(r){return ue.fromServerFormat(r.fieldPath)}function em(r){return r instanceof X?(function(t){if(t.op==="=="){if(Nl(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NAN"}};if(Dl(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Nl(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NAN"}};if(Dl(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jn(t.field),op:EE(t.op),value:t.value}}})(r):r instanceof ne?(function(t){const n=t.getFilters().map((s=>em(s)));return n.length===1?n[0]:{compositeFilter:{op:wE(t.op),filters:n}}})(r):L(54877,{filter:r})}function vE(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function tm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function nm(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t,n,s,i=j.min(),o=j.min(),c=pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e){this.yt=e}}function AE(r,e){let t;if(e.document)t=gE(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),s=vn(e.noDocument.readTime);t=he.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L(56709);{const n=M.fromSegments(e.unknownDocument.path),s=vn(e.unknownDocument.version);t=he.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new te(s[0],s[1]);return j.fromTimestamp(i)})(e.readTime)),t}function Yl(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Bi(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:Fi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:ur(i,o.version.toTimestamp()),createTime:ur(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:wn(e.version)};else{if(!e.isUnknownDocument())return L(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:wn(e.version)}}return n}function Bi(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function wn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function vn(r){const e=new te(r.seconds,r.nanoseconds);return j.fromTimestamp(e)}function cn(r,e){const t=(e.baseMutations||[]).map((i=>xa(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>xa(r.yt,i))),s=te.fromMillis(e.localWriteTimeMs);return new dc(e.batchId,s,t,n)}function Kr(r){const e=vn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?vn(r.lastLimboFreeSnapshotVersion):j.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return U(o===1,1966,{count:o}),Ke(io(Wf(i.documents[0])))})(r.query):(function(i){return Ke(Xf(i))})(r.query),new ct(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,pe.fromBase64String(r.resumeToken))}function sm(r,e){const t=wn(e.snapshotVersion),n=wn(e.lastLimboFreeSnapshotVersion);let s;s=Mi(e.target)?Jf(r.yt,e.target):Yf(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:En(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function im(r){const e=Xf({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Sa(e,e.limit,"L"):e}function Yo(r,e){return new mc(e.largestBatchId,xa(r.yt,e.overlayMutation))}function Xl(r,e){const t=e.path.lastSegment();return[r,ke(e.path.popLast()),t]}function Zl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:wn(n.readTime),documentKey:ke(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{getBundleMetadata(e,t){return eh(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:vn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return eh(e).put((function(s){return{bundleId:s.id,createTime:wn(Me(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return th(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:im(i.bundledQuery),readTime:vn(i.readTime)}})(n)}))}saveNamedQuery(e,t){return th(e).put((function(s){return{name:s.name,readTime:wn(Me(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function eh(r){return Ie(r,eo)}function th(r){return Ie(r,to)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new lo(e,n)}getOverlay(e,t){return Mr(e).get(Xl(this.userId,t)).next((n=>n?Yo(this.serializer,n):null))}getOverlays(e,t){const n=et();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new mc(t,o);s.push(this.St(e,c))})),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(ke(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Mr(e).X(Ia,c))})),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=et(),i=ke(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Mr(e).J(Ia,o).next((c=>{for(const u of c){const h=Yo(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=et();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Mr(e).ee({index:of,range:c},((u,h,f)=>{const p=Yo(this.serializer,h);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()})).next((()=>i))}St(e,t){return Mr(e).put((function(s,i,o){const[c,u,h]=Xl(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ui(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Mr(r){return Ie(r,no)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{bt(e){return Ie(e,sc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t?.value;return n?pe.fromUint8Array(n):pe.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(ae(e.integerValue));else if("doubleValue"in e){const n=ae(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),cs(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=mt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(pt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?yf(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):so(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):L(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const s=rr,i=n[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(ae(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),M.fromName(e).path.forEach((n=>{this.Ft(t,60),this.$t(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}un.Wt=new un;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=255;function SE(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function nh(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=SE(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class PE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=nh(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=nh(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(On),this.sn(255)}_n(){this.an(On),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===On?(this.sn(On),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===On?(this.an(On),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class CE{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class VE{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Lr{constructor(){this.cn=new PE,this.ascending=new CE(this.cn),this.descending=new VE(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new ln(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:wi(this.Tn),directionalValue:wi(this.En),orderedDocumentKey:wi(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Rt(r,e){let t=r.hn-e.hn;return t!==0?t:(t=rh(r.Tn,e.Tn),t!==0?t:(t=rh(r.En,e.En),t!==0?t:M.comparator(r.Pn,e.Pn)))}function rh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function wi(r){return td()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function sh(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class ih{constructor(e){this.Vn=new re(((t,n)=>ue.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(U(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=ga(e);if(t!==void 0&&!this.pn(t))return!1;const n=sn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new re(ue.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new mi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new mi(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new mi(n.field,n.dir==="asc"?0:1)));return new ki(ki.UNKNOWN_ID,this.collectionId,t,as.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(r){if(U(r instanceof X||r instanceof ne,20012),r instanceof X){if(r instanceof Sf){const t=r.value.arrayValue?.values?.map((n=>X.create(r.field,"==",n)))||[];return ne.create(t,"or")}return r}const e=r.filters.map((t=>om(t)));return ne.create(e,r.op)}function xE(r){if(r.getFilters().length===0)return[];const e=Na(om(r));return U(am(e),7391),ka(e)||Da(e)?[e]:e.getFilters()}function ka(r){return r instanceof X}function Da(r){return r instanceof ne&&uc(r)}function am(r){return ka(r)||Da(r)||(function(t){if(t instanceof ne&&va(t)){for(const n of t.getFilters())if(!ka(n)&&!Da(n))return!1;return!0}return!1})(r)}function Na(r){if(U(r instanceof X||r instanceof ne,34018),r instanceof X)return r;if(r.filters.length===1)return Na(r.filters[0]);const e=r.filters.map((n=>Na(n)));let t=ne.create(e,r.op);return t=ji(t),am(t)?t:(U(t instanceof ne,64498),U(or(t),40251),U(t.filters.length>1,57927),t.filters.reduce(((n,s)=>_c(n,s))))}function _c(r,e){let t;return U(r instanceof X||r instanceof ne,38388),U(e instanceof X||e instanceof ne,25473),t=r instanceof X?e instanceof X?(function(s,i){return ne.create([s,i],"and")})(r,e):oh(r,e):e instanceof X?oh(e,r):(function(s,i){if(U(s.filters.length>0&&i.filters.length>0,48005),or(s)&&or(i))return Af(s,i.getFilters());const o=va(s)?s:i,c=va(s)?i:s,u=o.filters.map((h=>_c(h,c)));return ne.create(u,"or")})(r,e),ji(t)}function oh(r,e){if(or(e))return Af(e,r.getFilters());{const t=e.filters.map((n=>_c(r,n)));return ne.create(t,"or")}}function ji(r){if(U(r instanceof X||r instanceof ne,11850),r instanceof X)return r;const e=r.getFilters();if(e.length===1)return ji(e[0]);if(wf(r))return r;const t=e.map((s=>ji(s))),n=[];return t.forEach((s=>{s instanceof X?n.push(s):s instanceof ne&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ne.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this.bn=new yc}addToCollectionParentIndex(e,t){return this.bn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve(qe.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve(qe.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class yc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new re(ee.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new re(ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah="IndexedDbIndexManager",ri=new Uint8Array(0);class DE{constructor(e,t){this.databaseId=t,this.Dn=new yc,this.Cn=new _t((n=>En(n)),((n,s)=>xs(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:n,parent:ke(s)};return ch(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Hd(t),""],!1,!0);return ch(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(Ze(o.parent))}return n}))}addFieldIndex(e,t){const n=Fr(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=Ln(e);return i.next((c=>{o.put(Zl(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Fr(e),s=Ln(e),i=Mn(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Fr(e),n=Mn(e),s=Ln(e);return t.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(e,t){return v.forEach(this.vn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new ih(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=Mn(e);let s=!0;const i=new Map;return v.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=J();const c=[];return v.forEach(i,((u,h)=>{V(ah,`Using index ${(function(z){return`id=${z.indexId}|cg=${z.collectionGroup}|f=${z.fields.map((F=>`${F.fieldPath}:${F.kind}`)).join(",")}`})(u)} to execute ${En(t)}`);const f=(function(z,F){const q=ga(F);if(q===void 0)return null;for(const B of Li(z,q.fieldPath))switch(B.op){case"array-contains-any":return B.value.arrayValue.values||[];case"array-contains":return[B.value]}return null})(h,u),p=(function(z,F){const q=new Map;for(const B of sn(F))for(const _ of Li(z,B.fieldPath))switch(_.op){case"==":case"in":q.set(B.fieldPath.canonicalString(),_.value);break;case"not-in":case"!=":return q.set(B.fieldPath.canonicalString(),_.value),Array.from(q.values())}return null})(h,u),w=(function(z,F){const q=[];let B=!0;for(const _ of sn(F)){const g=_.kind===0?Ul(z,_.fieldPath,z.startAt):Bl(z,_.fieldPath,z.startAt);q.push(g.value),B&&(B=g.inclusive)}return new ir(q,B)})(h,u),S=(function(z,F){const q=[];let B=!0;for(const _ of sn(F)){const g=_.kind===0?Bl(z,_.fieldPath,z.endAt):Ul(z,_.fieldPath,z.endAt);q.push(g.value),B&&(B=g.inclusive)}return new ir(q,B)})(h,u),C=this.Mn(u,h,w),O=this.Mn(u,h,S),D=this.xn(u,h,p),W=this.On(u.indexId,f,C,w.inclusive,O,S.inclusive,D);return v.forEach(W,(H=>n.Z(H,t.limit).next((z=>{z.forEach((F=>{const q=M.fromSegments(F.documentKey);o.has(q)||(o=o.add(q),c.push(q))}))}))))})).next((()=>c))}return v.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=xE(ne.create(e.filters,"and")).map((n=>ba(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const w=t?this.Nn(t[p/h]):ri,S=this.Bn(e,w,n[p%h],s),C=this.Ln(e,w,i[p%h],o),O=c.map((D=>this.Bn(e,w,D,!0)));f.push(...this.createRange(S,C,O))}return f}Bn(e,t,n,s){const i=new ln(e,M.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new ln(e,M.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new ih(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.vn(t);return v.forEach(s,(i=>this.Fn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(u){let h=new re(ue.comparator),f=!1;for(const p of u.filters)for(const w of p.getFlattenedFilters())w.field.isKeyField()||(w.op==="array-contains"||w.op==="array-contains-any"?f=!0:h=h.add(w.field));for(const p of u.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}kn(e,t){const n=new Lr;for(const s of sn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);un.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new Lr;return un.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new Lr;return un.Wt.Dt(ps(this.databaseId,t),n.ln((function(i){const o=sn(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new Lr);let i=0;for(const o of sn(e)){const c=n[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&gs(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);un.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new Lr;u.seed(c.un()),un.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find((n=>n instanceof X&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Fr(e),s=Ln(e);return(t?n.J(ya,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const o=[];return v.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,p){const w=p?new as(p.sequenceNumber,new qe(vn(p.readTime),new M(Ze(p.documentKey)),p.largestBatchId)):as.empty(),S=f.fields.map((([C,O])=>new mi(ue.fromServerFormat(C),O)));return new ki(f.indexId,f.collectionGroup,S,w)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:G(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Fr(e),i=Ln(e);return this.Wn(e).next((o=>s.J(ya,IDBKeyRange.bound(t,t)).next((c=>v.forEach(c,(u=>i.put(Zl(u.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?v.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),v.forEach(c,(u=>this.Qn(e,s,u).next((h=>{const f=this.Gn(i,u);return h.isEqual(f)?v.resolve():this.zn(e,i,u,h,f)})))))))}))}jn(e,t,n,s){return Mn(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return Mn(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=Mn(e);let i=new re(Rt);return s.ee({index:sf,range:IDBKeyRange.only([n.indexId,this.uid,wi(this.qn(n,t))])},((o,c)=>{i=i.add(new ln(n.indexId,t,sh(c.arrayValue),sh(c.directionalValue)))})).next((()=>i))}Gn(e,t){let n=new re(Rt);const s=this.kn(t,e);if(s==null)return n;const i=ga(t);if(i!=null){const o=e.data.field(i.fieldPath);if(gs(o))for(const c of o.arrayValue.values||[])n=n.add(new ln(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new ln(t.indexId,e.key,ri,s));return n}zn(e,t,n,s,i){V(ah,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,h,f,p,w){const S=u.getIterator(),C=h.getIterator();let O=Nn(S),D=Nn(C);for(;O||D;){let W=!1,H=!1;if(O&&D){const z=f(O,D);z<0?H=!0:z>0&&(W=!0)}else O!=null?H=!0:W=!0;W?(p(D),D=Nn(C)):H?(w(O),O=Nn(S)):(O=Nn(S),D=Nn(C))}})(s,i,Rt,(c=>{o.push(this.jn(e,t,n,c))}),(c=>{o.push(this.Jn(e,t,n,c))})),v.waitFor(o)}Wn(e){let t=1;return Ln(e).ee({index:rf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>Rt(o,c))).filter(((o,c,u)=>!c||Rt(o,u[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=Rt(o,e),u=Rt(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,ri,M.empty()),u=s[o+1].An(this.uid,ri,M.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Rt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(uh)}getMinOffset(e,t){return v.mapArray(this.vn(t),(n=>this.Fn(e,n).next((s=>s||L(44426))))).next(uh)}}function ch(r){return Ie(r,hs)}function Mn(r){return Ie(r,Xr)}function Fr(r){return Ie(r,rc)}function Ln(r){return Ie(r,Yr)}function uh(r){U(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ec(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new qe(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},cm=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function um(r,e,t){const n=r.store(He),s=r.store(Zn),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},((f,p,w)=>(c++,w.delete())));i.push(u.next((()=>{U(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const p=ef(e,f.key.path,t.batchId);i.push(s.delete(p)),h.push(f.key)}return v.waitFor(i).next((()=>h))}function qi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(cm,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);class ho{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){U(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new ho(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return St(e).ee({index:hn,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=zn(e),o=St(e);return o.add({}).next((c=>{U(typeof c=="number",49019);const u=new dc(c,t,n,s),h=(function(S,C,O){const D=O.baseMutations.map((H=>Ui(S.yt,H))),W=O.mutations.map((H=>Ui(S.yt,H)));return{userId:C,batchId:O.batchId,localWriteTimeMs:O.localWriteTime.toMillis(),baseMutations:D,mutations:W}})(this.serializer,this.userId,u),f=[];let p=new re(((w,S)=>G(w.canonicalString(),S.canonicalString())));for(const w of s){const S=ef(this.userId,w.key.path,c);p=p.add(w.key.path.popLast()),f.push(o.put(h)),f.push(i.put(S,sT))}return p.forEach((w=>{f.push(this.indexManager.addToCollectionParentIndex(e,w))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),v.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return St(e).get(t).next((n=>n?(U(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),cn(this.serializer,n)):null))}Xn(e,t){return this.Zn[t]?v.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return St(e).ee({index:hn,range:s},((o,c,u)=>{c.userId===this.userId&&(U(c.batchId>=n,47524,{Yn:n}),i=cn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=dn;return St(e).ee({index:hn,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,dn],[this.userId,Number.POSITIVE_INFINITY]);return St(e).J(hn,t).next((n=>n.map((s=>cn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=pi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return zn(e).ee({range:s},((o,c,u)=>{const[h,f,p]=o,w=Ze(f);if(h===this.userId&&t.path.isEqual(w))return St(e).get(p).next((S=>{if(!S)throw L(61480,{er:o,batchId:p});U(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:p}),i.push(cn(this.serializer,S))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);const s=[];return t.forEach((i=>{const o=pi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=zn(e).ee({range:c},((h,f,p)=>{const[w,S,C]=h,O=Ze(S);w===this.userId&&i.path.isEqual(O)?n=n.add(C):p.done()}));s.push(u)})),v.waitFor(s).next((()=>this.tr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=pi(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new re(G);return zn(e).ee({range:o},((u,h,f)=>{const[p,w,S]=u,C=Ze(w);p===this.userId&&n.isPrefixOf(C)?C.length===s&&(c=c.add(S)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(St(e).get(i).next((o=>{if(o===null)throw L(35274,{batchId:i});U(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(cn(this.serializer,o))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return um(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return zn(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const u=Ze(i[1]);s.push(u)}else c.done()})).next((()=>{U(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return lm(e,this.userId,t)}ir(e){return hm(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:dn,lastStreamToken:""}))}}function lm(r,e,t){const n=pi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return zn(r).ee({range:i,Y:!0},((c,u,h)=>{const[f,p,w]=c;f===e&&p===s&&(o=!0),h.done()})).next((()=>o))}function St(r){return Ie(r,He)}function zn(r){return Ie(r,Zn)}function hm(r){return Ie(r,us)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new An(0)}static ar(){return new An(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const n=new An(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>j.fromTimestamp(new te(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Fn(e).delete(t.targetId))).next((()=>this.ur(e))).next((n=>(U(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return Fn(e).ee(((o,c)=>{const u=Kr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Fn(e).ee(((n,s)=>{const i=Kr(s);t(i)}))}ur(e){return hh(e).get(Oi).next((t=>(U(t!==null,2888),t)))}cr(e,t){return hh(e).put(Oi,t)}lr(e,t){return Fn(e).put(sm(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const n=En(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Fn(e).ee({range:s,index:nf},((o,c,u)=>{const h=Kr(c);xs(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=Nt(e);return t.forEach((o=>{const c=ke(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=Nt(e);return v.forEach(t,(i=>{const o=ke(i.path);return v.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=Nt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Nt(e);let i=J();return s.ee({range:n,Y:!0},((o,c,u)=>{const h=Ze(o[1]),f=new M(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=ke(t.path),s=IDBKeyRange.bound([n],[Hd(n)],!1,!0);let i=0;return Nt(e).ee({index:nc,Y:!0,range:s},(([o,c],u,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return Fn(e).get(t).next((n=>n?Kr(n):null))}}function Fn(r){return Ie(r,er)}function hh(r){return Ie(r,fn)}function Nt(r){return Ie(r,tr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="LruGarbageCollector",dm=1048576;function fh([r,e],[t,n]){const s=G(r,t);return s===0?G(e,n):s}class OE{constructor(e){this.Pr=e,this.buffer=new re(fh),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();fh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class fm{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(dh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qt(t)?V(dh,"Ignoring IndexedDB error during garbage collection: ",t):await Sn(t)}await this.Ar(3e5)}))}}class ME{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return v.resolve(Ge.ce);const n=new OE(t);return this.Vr.forEachTarget(e,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(lh)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),lh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(n=p,c=Date.now(),this.removeTargets(e,n,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((p=>(h=Date.now(),Un()<=Y.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function mm(r,e){return new ME(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e,t){this.db=e,this.garbageCollector=mm(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((n,s)=>t(s)))}addReference(e,t,n){return si(e,n)}removeReference(e,t,n){return si(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return si(e,t)}wr(e,t){return(function(s,i){let o=!1;return hm(s).te((c=>lm(s,c,i).next((u=>(u&&(o=!0),v.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,j.min()),Nt(e).delete((function(p){return[0,ke(p.path)]})(o)))))}));s.push(u)}})).next((()=>v.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return si(e,t)}yr(e,t){const n=Nt(e);let s,i=Ge.ce;return n.ee({index:nc},(([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==Ge.ce&&t(new M(Ze(s)),i),i=h,s=u):i=Ge.ce})).next((()=>{i!==Ge.ce&&t(new M(Ze(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function si(r,e){return Nt(r).put((function(n,s){return{targetId:0,path:ke(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(){this.changes=new _t((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,he.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return nn(e).put(n)}removeEntry(e,t,n){return nn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Bi(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Sr(e,n))))}getEntry(e,t){let n=he.newInvalidDocument(t);return nn(e).ee({index:gi,range:IDBKeyRange.only(Ur(t))},((s,i)=>{n=this.br(t,i)})).next((()=>n))}Dr(e,t){let n={size:0,document:he.newInvalidDocument(t)};return nn(e).ee({index:gi,range:IDBKeyRange.only(Ur(t))},((s,i)=>{n={document:this.br(t,i),size:qi(i)}})).next((()=>n))}getEntries(e,t){let n=je();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);n=n.insert(s,o)})).next((()=>n))}vr(e,t){let n=je(),s=new ce(M.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);n=n.insert(i,c),s=s.insert(i,qi(o))})).next((()=>({documents:n,Fr:s})))}Cr(e,t,n){if(t.isEmpty())return v.resolve();let s=new re(gh);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Ur(s.first()),Ur(s.last())),o=s.getIterator();let c=o.getNext();return nn(e).ee({index:gi,range:i},((u,h,f)=>{const p=M.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&gh(c,p)<0;)n(c,null),c=o.getNext();c&&c.isEqual(p)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Ur(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Bi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return nn(e).J(IDBKeyRange.bound(c,u,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=je();for(const p of h){const w=this.br(M.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);w.isFoundDocument()&&(ks(t,w)||s.has(w.key))&&(f=f.insert(w.key,w))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=je();const o=ph(t,n),c=ph(t,qe.max());return nn(e).ee({index:tf,range:IDBKeyRange.bound(o,c,!0)},((u,h,f)=>{const p=this.br(M.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new UE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return mh(e).get(_a).next((t=>(U(!!t,20021),t)))}Sr(e,t){return mh(e).put(_a,t)}br(e,t){if(t){const n=AE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(j.min())))return n}return he.newInvalidDocument(e)}}function gm(r){return new FE(r)}class UE extends pm{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new _t((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new re(((i,o)=>G(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Yl(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=qi(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=Yl(this.Mr.serializer,o.convertToNoDocument(j.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:n,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function mh(r){return Ie(r,ls)}function nn(r){return Ie(r,Ni)}function Ur(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ph(r,e){const t=e.documentKey.path.toArray();return[r,Bi(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function gh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=G(t[i],n[i]),s)return s;return s=G(t.length,n.length),s||(s=G(t[t.length-2],n[n.length-2]),s||G(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&ns(n.mutation,s,Le.empty(),te.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,J()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=J()){const s=et();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=$r();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=et();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,J())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=je();const o=ts(),c=(function(){return ts()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof yt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ns(f.mutation,h,f.mutation.getFieldMask(),te.now())):o.set(h.key,Le.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new BE(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=ts();let s=new ce(((o,c)=>o-c)),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Le.empty();f=c.applyToLocalView(h,f),n.set(u,f);const p=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=Df();f.forEach((w=>{if(!i.has(w)){const S=Uf(t.get(w),n.get(w));S!==null&&p.set(w,S),i=i.add(w)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return v.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return qT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Pf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(et());let c=os,u=i;return o.next((h=>v.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next((w=>{u=u.insert(f,w)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,J()))).next((f=>({batchId:c,changes:kf(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next((n=>{let s=$r();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=$r();return this.indexManager.getCollectionParents(e,i).next((c=>v.forEach(c,(u=>{const h=(function(p,w){return new gr(w,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((p,w)=>{o=o.insert(p,w)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,he.newInvalidDocument(f)))}));let c=$r();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&ns(f.mutation,h,Le.empty(),te.now()),ks(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return v.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Me(s.createTime)}})(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:im(s.bundledQuery),readTime:Me(s.readTime)}})(t)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(){this.overlays=new ce(M.comparator),this.Lr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=et();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=et(),i=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ce(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=et(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=et(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return v.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new mc(t,n));let i=this.Lr.get(t);i===void 0&&(i=J(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(){this.kr=new re(we.qr),this.Kr=new re(we.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new we(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Wr(new we(e,t))}Qr(e,t){e.forEach((n=>this.removeReference(n,t)))}Gr(e){const t=new M(new ee([])),n=new we(t,e),s=new we(t,e+1),i=[];return this.Kr.forEachInRange([n,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new M(new ee([])),n=new we(t,e),s=new we(t,e+1);let i=J();return this.Kr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new we(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class we{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return M.comparator(e.key,t.key)||G(e.Jr,t.Jr)}static Ur(e,t){return G(e.Jr,t.Jr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new re(we.qr)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new dc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new we(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(o)}lookupMutationBatch(e,t){return v.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?dn:this.Yn-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new we(t,0),s=new we(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);return t.forEach((s=>{const i=new we(s,0),o=new we(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{n=n.add(c.Jr)}))})),v.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const o=new we(new M(i),0);let c=new re(G);return this.Hr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Jr)),!0)}),o),v.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((n=>{const s=this.Zr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){U(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return v.forEach(t.mutations,(s=>{const i=new we(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=n}))}nr(e){}containsKey(e,t){const n=new we(t,0),s=this.Hr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e){this.ti=e,this.docs=(function(){return new ce(M.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():he.newInvalidDocument(t))}getEntries(e,t){let n=je();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():he.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=je();const o=t.path,c=new M(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||ec(Jd(f),n)<=0||(s.has(f.key)||ks(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){L(9500)}ni(e,t){return v.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new KE(this)}getSize(e){return v.resolve(this.size)}}class KE extends pm{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)})),v.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.persistence=e,this.ri=new _t((t=>En(t)),xs),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.ii=0,this.si=new Ic,this.targetCount=0,this.oi=An._r()}forEachTarget(e,t){return this.ri.forEach(((n,s)=>t(s))),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),v.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new An(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.lr(t),v.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),v.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e,t){this._i={},this.overlays={},this.ai=new Ge(0),this.ui=!1,this.ui=!0,this.ci=new zE,this.referenceDelegate=e(this),this.li=new HE(this),this.indexManager=new kE,this.remoteDocumentCache=(function(s){return new GE(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new rm(t),this.Pi=new jE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new qE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new $E(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const s=new WE(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return v.or(Object.values(this._i).map((n=>()=>n.containsKey(e,t))))}}class WE extends Xd{constructor(e){super(),this.currentSequenceNumber=e}}class fo{constructor(e){this.persistence=e,this.Ri=new Ic,this.Ai=null}static Vi(e){return new fo(e)}get di(){if(this.Ai)return this.Ai;throw L(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.di,(n=>{const s=M.fromPath(n);return this.mi(e,s).next((i=>{i||t.removeEntry(s,j.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class zi{constructor(e,t){this.persistence=e,this.fi=new _t((n=>ke(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=mm(this,t)}static Vi(e,t){return new zi(e,t)}Ti(){}Ei(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}mr(e,t){return v.forEach(this.fi,((n,s)=>this.wr(e,n,s).next((i=>i?v.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(n++,i.removeEntry(o,j.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=yi(e.data.value)),t}wr(e,t,n){return v.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(e){this.serializer=e}k(e,t,n,s){const i=new Xi("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(Vs)})(e),(function(u){u.createObjectStore(us,{keyPath:rT}),u.createObjectStore(He,{keyPath:Sl,autoIncrement:!0}).createIndex(hn,Pl,{unique:!0}),u.createObjectStore(Zn)})(e),_h(e),(function(u){u.createObjectStore(on)})(e));let o=v.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(tr),u.deleteObjectStore(er),u.deleteObjectStore(fn)})(e),_h(e)),o=o.next((()=>(function(u){const h=u.store(fn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:j.min().toTimestamp(),targetCount:0};return h.put(Oi,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(u,h){return h.store(He).J().next((p=>{u.deleteObjectStore(He),u.createObjectStore(He,{keyPath:Sl,autoIncrement:!0}).createIndex(hn,Pl,{unique:!0});const w=h.store(He),S=p.map((C=>w.put(C)));return v.waitFor(S)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(nr,{keyPath:dT})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.gi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(ls)})(e),this.pi(i))))),n<7&&s>=7&&(o=o.next((()=>this.yi(i)))),n<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.Si(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(eo,{keyPath:fT})})(e),(function(u){u.createObjectStore(to,{keyPath:mT})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(u){const h=u.createObjectStore(no,{keyPath:ET});h.createIndex(Ia,wT,{unique:!1}),h.createIndex(of,vT,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(u){const h=u.createObjectStore(Ni,{keyPath:iT});h.createIndex(gi,oT),h.createIndex(tf,aT)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(on)))),n<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(rc,{keyPath:pT,autoIncrement:!0}).createIndex(ya,gT,{unique:!1}),u.createObjectStore(Yr,{keyPath:_T}).createIndex(rf,yT,{unique:!1}),u.createObjectStore(Xr,{keyPath:IT}).createIndex(sf,TT,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(Yr).clear()})).next((()=>{t.objectStore(Xr).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(sc,{keyPath:AT})})(e)}))),n<18&&s>=18&&td()&&(o=o.next((()=>{t.objectStore(Yr).clear()})).next((()=>{t.objectStore(Xr).clear()}))),o}pi(e){let t=0;return e.store(on).ee(((n,s)=>{t+=qi(s)})).next((()=>{const n={byteSize:t};return e.store(ls).put(_a,n)}))}gi(e){const t=e.store(us),n=e.store(He);return t.J().next((s=>v.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,dn],[i.userId,i.lastAcknowledgedBatchId]);return n.J(hn,o).next((c=>v.forEach(c,(u=>{U(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=cn(this.serializer,u);return um(e,i.userId,h).next((()=>{}))}))))}))))}yi(e){const t=e.store(tr),n=e.store(on);return e.store(fn).get(Oi).next((s=>{const i=[];return n.ee(((o,c)=>{const u=new ee(o),h=(function(p){return[0,ke(p)]})(u);i.push(t.get(h).next((f=>f?v.resolve():(p=>t.put({targetId:0,path:ke(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>v.waitFor(i)))}))}wi(e,t){e.createObjectStore(hs,{keyPath:hT});const n=t.store(hs),s=new yc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:ke(u)})}};return t.store(on).ee({Y:!0},((o,c)=>{const u=new ee(o);return i(u.popLast())})).next((()=>t.store(Zn).ee({Y:!0},(([o,c,u],h)=>{const f=Ze(c);return i(f.popLast())}))))}Si(e){const t=e.store(er);return t.ee(((n,s)=>{const i=Kr(s),o=sm(this.serializer,i);return t.put(o)}))}bi(e,t){const n=t.store(on),s=[];return n.ee(((i,o)=>{const c=t.store(Ni),u=(function(p){return p.document?new M(ee.fromString(p.document.name).popFirst(5)):p.noDocument?M.fromSegments(p.noDocument.path):p.unknownDocument?M.fromSegments(p.unknownDocument.path):L(36783)})(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>v.waitFor(s)))}Di(e,t){const n=t.store(He),s=gm(this.serializer),i=new Tc(fo.Vi,this.serializer.yt);return n.J().next((o=>{const c=new Map;return o.forEach((u=>{let h=c.get(u.userId)??J();cn(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),v.forEach(c,((u,h)=>{const f=new Ae(h),p=lo.wt(this.serializer,f),w=i.getIndexManager(f),S=ho.wt(f,this.serializer,w,i.referenceDelegate);return new _m(s,S,p,w).recalculateAndSaveOverlaysForDocumentKeys(new Ta(t,Ge.ce),u).next()}))}))}}function _h(r){r.createObjectStore(tr,{keyPath:uT}).createIndex(nc,lT,{unique:!0}),r.createObjectStore(er,{keyPath:"targetId"}).createIndex(nf,cT,{unique:!0}),r.createObjectStore(fn)}const Pt="IndexedDbPersistence",Xo=18e5,Zo=5e3,ea="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",JE="main";class Ec{constructor(e,t,n,s,i,o,c,u,h,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=w=>Promise.resolve(),!Ec.v())throw new k(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new LE(this,s),this.qi=t+JE,this.serializer=new rm(u),this.Ki=new qt(this.qi,this.xi,new QE(this.serializer)),this.ci=new RE,this.li=new NE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=gm(this.serializer),this.Pi=new bE,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&Oe(Pt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ea);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Ge(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.Ki&&this.Ki.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ii(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(Qt(e))return V(Pt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(Pt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Br(e).get(Dn).next((t=>v.resolve(this.Xi(t))))}Yi(e){return ii(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Xo)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ie(t,nr);return n.J().next((s=>{const i=this.ns(s,Xo),o=s.filter((c=>i.indexOf(c)===-1));return v.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?v.resolve(!0):Br(e).get(Dn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Zo)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ea);return!1}}return!(!this.networkEnabled||!this.inForeground)||ii(e).J().next((n=>this.ns(n,Zo).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&V(Pt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Vs,nr],(e=>{const t=new Ta(e,Ge.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.Ki.close(),this.ls()}ns(e,t){return e.filter((n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>ii(e).J().next((t=>this.ns(t,Xo).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return ho.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new DE(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return lo.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){V(Pt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?ST:u===17?lf:u===16?RT:u===15?ic:u===14?uf:u===13?cf:u===12?bT:u===11?af:void L(60245)})(this.xi);let o;return this.Ki.runTransaction(e,s,i,(c=>(o=new Ta(c,this.ai?this.ai.next():Ge.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw Oe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new k(P.FAILED_PRECONDITION,Yd);return n(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Br(e).get(Dn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Zo)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(P.FAILED_PRECONDITION,ea)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Br(e).put(Dn,t)}static v(){return qt.v()}Hi(e){const t=Br(e);return t.get(Dn).next((n=>this.Xi(n)?(V(Pt,"Releasing primary lease."),t.delete(Dn)):v.resolve()))}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Oe(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){typeof this.window?.addEventListener=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;ed()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=this.Ui?.getItem(this.rs(e))!==null;return V(Pt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return Oe(Pt,"Failed to get zombied client id.",t),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Oe("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Br(r){return Ie(r,Vs)}function ii(r){return Ie(r,nr)}function YE(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=J(),s=J();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return ed()?8:Zd(ye())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new XE;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,n,s){return n.documentReadCount<this.Vs?(Un()<=Y.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Bn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(Un()<=Y.DEBUG&&V("QueryEngine","Query:",Bn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Un()<=Y.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Bn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):v.resolve())}gs(e,t){if(jl(t))return v.resolve(null);let n=Ke(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Sa(t,null,"F"),n=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=J(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,Sa(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,n,s){return jl(t)||s.isEqual(j.min())?v.resolve(null):this.fs.getDocuments(e,n).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?v.resolve(null):(Un()<=Y.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Bn(t)),this.Ds(e,o,t,JI(s,os)).next((c=>c)))}))}Ss(e,t){let n=new re(Vf(e));return t.forEach(((s,i)=>{ks(e,i)&&(n=n.add(i))})),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return Un()<=Y.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Bn(t)),this.fs.getDocumentsMatchingQuery(e,t,qe.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vc="LocalStore",ZE=3e8;class ew{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ce(G),this.Fs=new _t((i=>En(i)),xs),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _m(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function Im(r,e,t,n){return new ew(r,e,t,n)}async function Tm(r,e){const t=K(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let u=J();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function tw(r,e){const t=K(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,w=p.keys();let S=v.resolve();return w.forEach((C=>{S=S.next((()=>f.getEntry(u,C))).next((O=>{const D=h.docVersions.get(C);U(D!==null,48541),O.version.compareTo(D)<0&&(p.applyToRemoteDocument(O,h),O.isValidDocument()&&(O.setReadTime(h.commitVersion),f.addEntry(O)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=J();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Em(r){const e=K(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function nw(r,e){const t=K(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,p)=>{const w=s.get(p);if(!w)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,p))));let S=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(pe.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),s=s.insert(p,S),(function(O,D,W){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=ZE?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0})(w,S,f)&&c.push(t.li.updateTargetData(i,S))}));let u=je(),h=J();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(rw(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!n.isEqual(j.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return v.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=s,i)))}function rw(r,e,t){let n=J(),s=J();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=je();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(j.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):V(vc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function sw(r,e){const t=K(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=dn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function iw(r,e){const t=K(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.li.getTargetData(n,e).next((i=>i?(s=i,v.resolve(s)):t.li.allocateTargetId(n).next((o=>(s=new ct(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n}))}async function Oa(r,e,t){const n=K(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Qt(o))throw o;V(vc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function yh(r,e,t){const n=K(r);let s=j.min(),i=J();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=K(u),w=p.Fs.get(f);return w!==void 0?v.resolve(p.vs.get(w)):p.li.getTargetData(h,f)})(n,o,Ke(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:j.min(),t?i:J()))).next((c=>(ow(n,GT(e),c),{documents:c,ks:i})))))}function ow(r,e,t){let n=r.Ms.get(e)||j.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(e,n)}class Ih{constructor(){this.activeTargetIds=YT()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class wm{constructor(){this.vo=new Ih,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Ih,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="ConnectivityMonitor";class Eh{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(Th,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(Th,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oi=null;function Ma(){return oi===null?oi=(function(){return 268435456+Math.round(2147483648*Math.random())})():oi++,"0x"+oi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta="RestConnection",cw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class uw{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===fs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=Ma(),c=this.Qo(e,t.toUriEncodedString());V(ta,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=dr(h);return this.zo(e,c,u,n,f).then((p=>(V(ta,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw In(ta,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",n),p}))}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+pr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const n=cw[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce="WebChannelConnection",jr=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Wn extends uw{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Wn.c_){const e=zd();jr(e,qd.STAT_EVENT,(t=>{t.stat===ma.PROXY?V(Ce,"STAT_EVENT: detected buffering proxy"):t.stat===ma.NOPROXY&&V(Ce,"STAT_EVENT: detected no buffering proxy")})),Wn.c_=!0}}zo(e,t,n,s,i){const o=Ma();return new Promise(((c,u)=>{const h=new Bd;h.setWithCredentials(!0),h.listenOnce(jd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case fi.NO_ERROR:const p=h.getResponseJson();V(Ce,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case fi.TIMEOUT:V(Ce,`RPC '${e}' ${o} timed out`),u(new k(P.DEADLINE_EXCEEDED,"Request time out"));break;case fi.HTTP_ERROR:const w=h.getStatus();if(V(Ce,`RPC '${e}' ${o} failed with status:`,w,"response text:",h.getResponseText()),w>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S?.error;if(C&&C.status&&C.message){const O=(function(W){const H=W.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(H)>=0?H:P.UNKNOWN})(C.status);u(new k(O,C.message))}else u(new k(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new k(P.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{V(Ce,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);V(Ce,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=Ma(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");V(Ce,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let p=!1,w=!1;const S=new lw({Jo:C=>{w?V(Ce,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(V(Ce,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),V(Ce,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Ho:()=>f.close()});return jr(f,zr.EventType.OPEN,(()=>{w||(V(Ce,`RPC '${e}' stream ${s} transport opened.`),S.i_())})),jr(f,zr.EventType.CLOSE,(()=>{w||(w=!0,V(Ce,`RPC '${e}' stream ${s} transport closed`),S.o_(),this.I_(f))})),jr(f,zr.EventType.ERROR,(C=>{w||(w=!0,In(Ce,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),S.o_(new k(P.UNAVAILABLE,"The operation could not be completed")))})),jr(f,zr.EventType.MESSAGE,(C=>{if(!w){const O=C.data[0];U(!!O,16349);const D=O,W=D?.error||D[0]?.error;if(W){V(Ce,`RPC '${e}' stream ${s} received error:`,W);const H=W.status;let z=(function(B){const _=fe[B];if(_!==void 0)return qf(_)})(H),F=W.message;H==="NOT_FOUND"&&F.includes("database")&&F.includes("does not exist")&&F.includes(this.databaseId.database)&&In(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),z===void 0&&(z=P.INTERNAL,F="Unknown error status: "+H+" with message "+W.message),w=!0,S.o_(new k(z,F)),f.close()}else V(Ce,`RPC '${e}' stream ${s} received:`,O),S.__(O)}})),Wn.u_(),setTimeout((()=>{S.s_()}),0),S}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return $d()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(r){return new Wn(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(){return typeof window<"u"?window:null}function vi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(r){return new mE(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Wn.c_=!1;class vm{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh="PersistentStream";class Am{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new vm(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Oe(t.toString()),Oe("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new k(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return V(wh,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(V(wh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class fw extends Am{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=_E(this.serializer,e),n=(function(i){if(!("targetChange"in i))return j.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?j.min():o.readTime?Me(o.readTime):j.min()})(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=Va(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=Mi(u)?{documents:Jf(i,u)}:{query:Yf(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Gf(i,o.resumeToken);const h=Pa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(j.min())>0){c.readTime=ur(i,o.snapshotVersion.toTimestamp());const h=Pa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=IE(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=Va(this.serializer),t.removeTarget=e,this.q_(t)}}class mw extends Am{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=yE(e.writeResults,e.commitTime),n=Me(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Va(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Ui(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{}class gw extends pw{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Ca(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(P.UNKNOWN,i.toString())}))}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Ca(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function _w(r,e,t,n){return new gw(r,e,t,n)}class yw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Oe(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn="RemoteStore";class Iw{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{n.enqueueAndForget((async()=>{Pn(this)&&(V(bn,"Restarting streams for network reachability change."),await(async function(u){const h=K(u);h.Ia.add(4),await Ns(h),h.Va.set("Unknown"),h.Ia.delete(4),await po(h)})(this))}))})),this.Va=new yw(n,s)}}async function po(r){if(Pn(r))for(const e of r.Ra)await e(!0)}async function Ns(r){for(const e of r.Ra)await e(!1)}function bm(r,e){const t=K(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Sc(t)?Rc(t):yr(t).O_()&&bc(t,e))}function Ac(r,e){const t=K(r),n=yr(t);t.Ea.delete(e),n.O_()&&Rm(t,e),t.Ea.size===0&&(n.O_()?n.L_():Pn(t)&&t.Va.set("Unknown"))}function bc(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}yr(r).Z_(e)}function Rm(r,e){r.da.$e(e),yr(r).X_(e)}function Rc(r){r.da=new lE({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),yr(r).start(),r.Va.ua()}function Sc(r){return Pn(r)&&!yr(r).x_()&&r.Ea.size>0}function Pn(r){return K(r).Ia.size===0}function Sm(r){r.da=void 0}async function Tw(r){r.Va.set("Online")}async function Ew(r){r.Ea.forEach(((e,t)=>{bc(r,e)}))}async function ww(r,e){Sm(r),Sc(r)?(r.Va.ha(e),Rc(r)):r.Va.set("Unknown")}async function vw(r,e,t){if(r.Va.set("Online"),e instanceof $f&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))})(r,e)}catch(n){V(bn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await $i(r,n)}else if(e instanceof Ei?r.da.Xe(e):e instanceof zf?r.da.st(e):r.da.tt(e),!t.isEqual(j.min()))try{const n=await Em(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(pe.EMPTY_BYTE_STRING,f.snapshotVersion)),Rm(i,u);const p=new ct(f.target,u,h,f.sequenceNumber);bc(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){V(bn,"Failed to raise snapshot:",n),await $i(r,n)}}async function $i(r,e,t){if(!Qt(e))throw e;r.Ia.add(1),await Ns(r),r.Va.set("Offline"),t||(t=()=>Em(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V(bn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await po(r)}))}function Pm(r,e){return e().catch((t=>$i(r,t,e)))}async function Os(r){const e=K(r),t=Ht(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:dn;for(;Aw(e);)try{const s=await sw(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,bw(e,s)}catch(s){await $i(e,s)}Cm(e)&&Vm(e)}function Aw(r){return Pn(r)&&r.Ta.length<10}function bw(r,e){r.Ta.push(e);const t=Ht(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function Cm(r){return Pn(r)&&!Ht(r).x_()&&r.Ta.length>0}function Vm(r){Ht(r).start()}async function Rw(r){Ht(r).ra()}async function Sw(r){const e=Ht(r);for(const t of r.Ta)e.ea(t.mutations)}async function Pw(r,e,t){const n=r.Ta.shift(),s=fc.from(n,e,t);await Pm(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Os(r)}async function Cw(r,e){e&&Ht(r).Y_&&await(async function(n,s){if((function(o){return aE(o)&&o!==P.ABORTED})(s.code)){const i=n.Ta.shift();Ht(n).B_(),await Pm(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Os(n)}})(r,e),Cm(r)&&Vm(r)}async function vh(r,e){const t=K(r);t.asyncQueue.verifyOperationInProgress(),V(bn,"RemoteStore received new credentials");const n=Pn(t);t.Ia.add(3),await Ns(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await po(t)}async function Vw(r,e){const t=K(r);e?(t.Ia.delete(2),await po(t)):e||(t.Ia.add(2),await Ns(t),t.Va.set("Unknown"))}function yr(r){return r.ma||(r.ma=(function(t,n,s){const i=K(t);return i.sa(),new fw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:Tw.bind(null,r),Yo:Ew.bind(null,r),t_:ww.bind(null,r),H_:vw.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),Sc(r)?Rc(r):r.Va.set("Unknown")):(await r.ma.stop(),Sm(r))}))),r.ma}function Ht(r){return r.fa||(r.fa=(function(t,n,s){const i=K(t);return i.sa(),new mw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Rw.bind(null,r),t_:Cw.bind(null,r),ta:Sw.bind(null,r),na:Pw.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await Os(r)):(await r.fa.stop(),r.Ta.length>0&&(V(bn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Bt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new Pc(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Cc(r,e){if(Oe("AsyncQueue",`${e}: ${r}`),Qt(r))return new k(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{static emptySet(e){return new Qn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=$r(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Qn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(){this.ga=new ce(M.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):L(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class lr{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new lr(e,t,Qn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class kw{constructor(){this.queries=bh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=K(t),i=s.queries;s.queries=bh(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new k(P.ABORTED,"Firestore shutting down"))}}function bh(){return new _t((r=>Cf(r)),oo)}async function Dw(r,e){const t=K(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new xw,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Cc(o,`Initialization of query '${Bn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Vc(t)}async function Nw(r,e){const t=K(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Ow(r,e){const t=K(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&Vc(t)}function Mw(r,e,t){const n=K(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function Vc(r){r.Ca.forEach((e=>{e.next()}))}var La,Rh;(Rh=La||(La={})).Ma="default",Rh.Cache="cache";class Lw{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new lr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=lr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==La.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e){this.key=e}}class km{constructor(e){this.key=e}}class Fw{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=J(),this.mutatedKeys=J(),this.eu=Vf(e),this.tu=new Qn(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Ah,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const w=s.get(f),S=ks(this.query,p)?p:null,C=!!w&&this.mutatedKeys.has(w.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;w&&S?w.data.isEqual(S.data)?C!==O&&(n.track({type:3,doc:S}),D=!0):this.su(w,S)||(n.track({type:2,doc:S}),D=!0,(u&&this.eu(S,u)>0||h&&this.eu(S,h)<0)&&(c=!0)):!w&&S?(n.track({type:0,doc:S}),D=!0):w&&!S&&(n.track({type:1,doc:w}),D=!0,(u||h)&&(c=!0)),D&&(S?(o=o.add(S),i=O?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,p)=>(function(S,C){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Vt:D})}};return O(S)-O(C)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new lr(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ah,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=J(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const t=[];return e.forEach((n=>{this.Ya.has(n)||t.push(new km(n))})),this.Ya.forEach((n=>{e.has(n)||t.push(new xm(n))})),t}cu(e){this.Za=e.ks,this.Ya=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return lr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const xc="SyncEngine";class Uw{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Bw{constructor(e){this.key=e,this.hu=!1}}class jw{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new _t((c=>Cf(c)),oo),this.Eu=new Map,this.Iu=new Set,this.Ru=new ce(M.comparator),this.Au=new Map,this.Vu=new Ic,this.du={},this.mu=new Map,this.fu=An.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function qw(r,e,t=!0){const n=Fm(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Dm(n,e,t,!0),s}async function zw(r,e){const t=Fm(r);await Dm(t,e,!0,!1)}async function Dm(r,e,t,n){const s=await iw(r.localStore,Ke(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await $w(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&bm(r.remoteStore,s),c}async function $w(r,e,t,n,s){r.pu=(p,w,S)=>(async function(O,D,W,H){let z=D.view.ru(W);z.bs&&(z=await yh(O.localStore,D.query,!1).then((({documents:_})=>D.view.ru(_,z))));const F=H&&H.targetChanges.get(D.targetId),q=H&&H.targetMismatches.get(D.targetId)!=null,B=D.view.applyChanges(z,O.isPrimaryClient,F,q);return Ph(O,D.targetId,B.au),B.snapshot})(r,p,w,S);const i=await yh(r.localStore,e,!0),o=new Fw(e,i.ks),c=o.ru(i.documents),u=Ds.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);Ph(r,t,h.au);const f=new Uw(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function Gw(r,e,t){const n=K(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter((o=>!oo(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Oa(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Ac(n.remoteStore,s.targetId),Fa(n,s.targetId)})).catch(Sn)):(Fa(n,s.targetId),await Oa(n.localStore,s.targetId,!0))}async function Kw(r,e){const t=K(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Ac(t.remoteStore,n.targetId))}async function Hw(r,e,t){const n=Um(r);try{const s=await(function(o,c){const u=K(o),h=te.now(),f=c.reduce(((S,C)=>S.add(C.key)),J());let p,w;return u.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let C=je(),O=J();return u.xs.getEntries(S,f).next((D=>{C=D,C.forEach(((W,H)=>{H.isValidDocument()||(O=O.add(W))}))})).next((()=>u.localDocuments.getOverlayedDocuments(S,C))).next((D=>{p=D;const W=[];for(const H of c){const z=iE(H,p.get(H.key).overlayedDocument);z!=null&&W.push(new yt(H.key,z,Tf(z.value.mapValue),Fe.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,W,c)})).next((D=>{w=D;const W=D.applyToLocalDocumentSet(p,O);return u.documentOverlayCache.saveOverlays(S,D.batchId,W)}))})).then((()=>({batchId:w.batchId,changes:kf(p)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new ce(G)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(n,s.batchId,t),await Ms(n,s.changes),await Os(n.remoteStore)}catch(s){const i=Cc(s,"Failed to persist write");t.reject(i)}}async function Nm(r,e){const t=K(r);try{const n=await nw(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?U(o.hu,14607):s.removedDocuments.size>0&&(U(o.hu,42227),o.hu=!1))})),await Ms(t,n,e)}catch(n){await Sn(n)}}function Sh(r,e,t){const n=K(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=K(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const w of p.Sa)w.va(c)&&(h=!0)})),h&&Vc(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Ww(r,e,t){const n=K(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new ce(M.comparator);o=o.insert(i,he.newNoDocument(i,j.min()));const c=J().add(i),u=new uo(j.min(),new Map,new ce(G),o,c);await Nm(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),kc(n)}else await Oa(n.localStore,e,!1).then((()=>Fa(n,e,t))).catch(Sn)}async function Qw(r,e){const t=K(r),n=e.batch.batchId;try{const s=await tw(t.localStore,e);Mm(t,n,null),Om(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Ms(t,s)}catch(s){await Sn(s)}}async function Jw(r,e,t){const n=K(r);try{const s=await(function(o,c){const u=K(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(U(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Mm(n,e,t),Om(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Ms(n,s)}catch(s){await Sn(s)}}function Om(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Mm(r,e,t){const n=K(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function Fa(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((n=>{r.Vu.containsKey(n)||Lm(r,n)}))}function Lm(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(Ac(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),kc(r))}function Ph(r,e,t){for(const n of t)n instanceof xm?(r.Vu.addReference(n.key,e),Yw(r,n)):n instanceof km?(V(xc,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||Lm(r,n.key)):L(19791,{wu:n})}function Yw(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(V(xc,"New document in limbo: "+t),r.Iu.add(n),kc(r))}function kc(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new M(ee.fromString(e)),n=r.fu.next();r.Au.set(n,new Bw(t)),r.Ru=r.Ru.insert(t,n),bm(r.remoteStore,new ct(Ke(io(t.path)),n,"TargetPurposeLimboResolution",Ge.ce))}}async function Ms(r,e,t){const n=K(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{o.push(n.pu(u,e,t).then((h=>{if((h||t)&&n.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;n.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=wc.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(o),n.Pu.H_(s),await(async function(u,h){const f=K(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>v.forEach(h,(w=>v.forEach(w.Ts,(S=>f.persistence.referenceDelegate.addReference(p,w.targetId,S))).next((()=>v.forEach(w.Es,(S=>f.persistence.referenceDelegate.removeReference(p,w.targetId,S)))))))))}catch(p){if(!Qt(p))throw p;V(vc,"Failed to update sequence numbers: "+p)}for(const p of h){const w=p.targetId;if(!p.fromCache){const S=f.vs.get(w),C=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(C);f.vs=f.vs.insert(w,O)}}})(n.localStore,i))}async function Xw(r,e){const t=K(r);if(!t.currentUser.isEqual(e)){V(xc,"User change. New user:",e.toKey());const n=await Tm(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new k(P.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Ms(t,n.Ns)}}function Zw(r,e){const t=K(r),n=t.Au.get(e);if(n&&n.hu)return J().add(n.key);{let s=J();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function Fm(r){const e=K(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Nm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Zw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ww.bind(null,e),e.Pu.H_=Ow.bind(null,e.eventManager),e.Pu.yu=Mw.bind(null,e.eventManager),e}function Um(r){const e=K(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Qw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Jw.bind(null,e),e}class Ts{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Im(this.persistence,new ym,e.initialUser,this.serializer)}Cu(e){return new Tc(fo.Vi,this.serializer)}Du(e){return new wm}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ts.provider={build:()=>new Ts};class ev extends Ts{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){U(this.persistence.referenceDelegate instanceof zi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new fm(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new Tc((n=>zi.Vi(n,t)),this.serializer)}}class tv extends Ts{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Um(this.xu.syncEngine),await Os(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return Im(this.persistence,new ym,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new fm(n,e.asyncQueue,t)}Mu(e,t){const n=new eT(t,this.persistence);return new ZI(e.asyncQueue,n)}Cu(e){const t=YE(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new Ec(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,dw(),vi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new wm}}class Gi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Sh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xw.bind(null,this.syncEngine),await Vw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new kw})()}createDatastore(e){const t=mo(e.databaseInfo.databaseId),n=hw(e.databaseInfo);return _w(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new Iw(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Sh(this.syncEngine,t,0)),(function(){return Eh.v()?new Eh:new aw})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const p=new jw(s,i,o,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const n=K(t);V(bn,"RemoteStore shutting down."),n.Ia.add(5),await Ns(n),n.Aa.shutdown(),n.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Gi.provider={build:()=>new Gi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Oe("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="FirestoreClient";class rv{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=Ae.UNAUTHENTICATED,this.clientId=Za.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{V(Wt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(V(Wt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Bt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Cc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function na(r,e){r.asyncQueue.verifyOperationInProgress(),V(Wt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Tm(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Ch(r,e){r.asyncQueue.verifyOperationInProgress();const t=await sv(r);V(Wt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>vh(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>vh(e.remoteStore,s))),r._onlineComponents=e}async function sv(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(Wt,"Using user provided OfflineComponentProvider");try{await na(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;In("Error using user provided cache. Falling back to memory cache: "+t),await na(r,new Ts)}}else V(Wt,"Using default OfflineComponentProvider"),await na(r,new ev(void 0));return r._offlineComponents}async function Bm(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(Wt,"Using user provided OnlineComponentProvider"),await Ch(r,r._uninitializedComponentsProvider._online)):(V(Wt,"Using default OnlineComponentProvider"),await Ch(r,new Gi))),r._onlineComponents}function iv(r){return Bm(r).then((e=>e.syncEngine))}async function Vh(r){const e=await Bm(r),t=e.eventManager;return t.onListen=qw.bind(null,e.syncEngine),t.onUnlisten=Gw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=zw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Kw.bind(null,e.syncEngine),t}function ov(r,e,t,n){const s=new nv(n),i=new Lw(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>Dw(await Vh(r),i))),()=>{s.Nu(),r.asyncQueue.enqueueAndForget((async()=>Nw(await Vh(r),i)))}}function av(r,e){const t=new Bt;return r.asyncQueue.enqueueAndForget((async()=>Hw(await iv(r),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv="ComponentProvider",xh=new Map;function uv(r,e,t,n,s){return new CT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,jm(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm="firestore.googleapis.com",kh=!0;class Dh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=qm,this.ssl=kh}else this.host=e.host,this.ssl=e.ssl??kh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=cm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<dm)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}QI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jm(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class go{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new UI;switch(n.type){case"firstParty":return new zI(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=xh.get(t);n&&(V(cv,"Removing Datastore"),xh.delete(t),n.terminate())})(this),Promise.resolve()}}function lv(r,e,t,n={}){r=jt(r,go);const s=dr(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&Ba(`https://${c}`),i.host!==qm&&i.host!==c&&In("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:n};if(!$t(u,o)&&(r._setSettings(u),n.mockUserToken)){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=Ae.MOCK_USER;else{h=hg(n.mockUserToken,r._app?.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new k(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ae(p)}r._authCredentials=new BI(new Kd(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Cn(this.firestore,e,this._query)}}class de{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new zt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new de(this.firestore,e,this._key)}toJSON(){return{type:de._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Cs(t,de._jsonSchema))return new de(e,n||null,new M(ee.fromString(t.referencePath)))}}de._jsonSchemaVersion="firestore/documentReference/1.0",de._jsonSchema={type:me("string",de._jsonSchemaVersion),referencePath:me("string")};class zt extends Cn{constructor(e,t,n){super(e,t,io(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new de(this.firestore,null,new M(e))}withConverter(e){return new zt(this.firestore,e,this._path)}}function hv(r,e,...t){if(r=Re(r),Wd("collection","path",e),r instanceof go){const n=ee.fromString(e,...t);return wl(n),new zt(r,null,n)}{if(!(r instanceof de||r instanceof zt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ee.fromString(e,...t));return wl(n),new zt(r.firestore,null,n)}}function ra(r,e,...t){if(r=Re(r),arguments.length===1&&(e=Za.newId()),Wd("doc","path",e),r instanceof go){const n=ee.fromString(e,...t);return El(n),new de(r,null,new M(n))}{if(!(r instanceof de||r instanceof zt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ee.fromString(e,...t));return El(n),new de(r.firestore,r instanceof zt?r.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="AsyncQueue";class Oh{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new vm(this,"async_queue_retry"),this._c=()=>{const n=vi();n&&V(Nh,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=vi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=vi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Bt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Qt(e))throw e;V(Nh,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,Oe("INTERNAL UNHANDLED ERROR: ",Mh(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Pc.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:Mh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Mh(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class Es extends go{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Oh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Oh(e),this._firestoreClient=void 0,await e}}}function dv(r,e,t){t||(t=fs);const n=Wi(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if($t(i,e))return s;throw new k(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<dm)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&dr(e.host)&&Ba(e.host),n.initialize({options:e,instanceIdentifier:t})}function ai(r,e){const t=za(),n=fs,s=Wi(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=ug("firestore");i&&lv(s,...i)}return s}function zm(r){if(r._terminated)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||fv(r),r._firestoreClient}function fv(r){const e=r._freezeSettings(),t=uv(r._databaseId,r._app?.options.appId||"",r._persistenceKey,r._app?.options.apiKey,e);r._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new rv(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this._byteString=e}static fromBase64String(e){try{return new $e(pe.fromBase64String(e))}catch(t){throw new k(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new $e(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:$e._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Cs(e,$e._jsonSchema))return $e.fromBase64String(e.bytes)}}$e._jsonSchemaVersion="firestore/bytes/1.0",$e._jsonSchema={type:me("string",$e._jsonSchemaVersion),bytes:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:rt._jsonSchemaVersion}}static fromJSON(e){if(Cs(e,rt._jsonSchema))return new rt(e.latitude,e.longitude)}}rt._jsonSchemaVersion="firestore/geoPoint/1.0",rt._jsonSchema={type:me("string",rt._jsonSchemaVersion),latitude:me("number"),longitude:me("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Qe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Cs(e,Qe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Qe(e.vectorValues);throw new k(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Qe._jsonSchemaVersion="firestore/vectorValue/1.0",Qe._jsonSchema={type:me("string",Qe._jsonSchemaVersion),vectorValues:me("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv=/^__.*__$/;class pv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new yt(e,this.data,this.fieldMask,t,this.fieldTransforms):new _r(e,this.data,t,this.fieldTransforms)}}class $m{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new yt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Gm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{dataSource:r})}}class Oc{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Oc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Ki(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Gm(this.dataSource)&&mv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class gv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||mo(e)}I(e,t,n,s=!1){return new Oc({dataSource:e,methodName:t,targetDoc:n,path:ue.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mc(r){const e=r._freezeSettings(),t=mo(r._databaseId);return new gv(r._databaseId,!!e.ignoreUndefinedProperties,t)}function _v(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);Lc("Data must be an object, but it was:",o,n);const c=Km(n,o);let u,h;if(i.merge)u=new Le(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const w=hr(e,p,t);if(!o.contains(w))throw new k(P.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Qm(f,w)||f.push(w)}u=new Le(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new pv(new xe(c),u,h)}class _o extends Nc{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof _o}}function yv(r,e,t,n){const s=r.I(1,e,t);Lc("Data must be an object, but it was:",s,n);const i=[],o=xe.empty();Jt(n,((u,h)=>{const f=Wm(e,u,t);h=Re(h);const p=s.fc(f);if(h instanceof _o)i.push(f);else{const w=Ls(h,p);w!=null&&(i.push(f),o.set(f,w))}}));const c=new Le(i);return new $m(o,c,s.fieldTransforms)}function Iv(r,e,t,n,s,i){const o=r.I(1,e,t),c=[hr(e,n,t)],u=[s];if(i.length%2!=0)throw new k(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<i.length;w+=2)c.push(hr(e,i[w])),u.push(i[w+1]);const h=[],f=xe.empty();for(let w=c.length-1;w>=0;--w)if(!Qm(h,c[w])){const S=c[w];let C=u[w];C=Re(C);const O=o.fc(S);if(C instanceof _o)h.push(S);else{const D=Ls(C,O);D!=null&&(h.push(S),f.set(S,D))}}const p=new Le(h);return new $m(f,p,o.fieldTransforms)}function Tv(r,e,t,n=!1){return Ls(t,r.I(n?4:3,e))}function Ls(r,e){if(Hm(r=Re(r)))return Lc("Unsupported field value:",e,r),Km(r,e);if(r instanceof Nc)return(function(n,s){if(!Gm(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let u=Ls(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=Re(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return XT(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=te.fromDate(n);return{timestampValue:ur(s.serializer,i)}}if(n instanceof te){const i=new te(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ur(s.serializer,i)}}if(n instanceof rt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof $e)return{bytesValue:Gf(s.serializer,n._byteString)};if(n instanceof de){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:gc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Qe)return(function(o,c){const u=o instanceof Qe?o.toArray():o;return{mapValue:{fields:{[ac]:{stringValue:cc},[rr]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return lc(c.serializer,f)}))}}}}}})(n,s);if(nm(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Yi(n)}`)})(r,e)}function Km(r,e){const t={};return hf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(r,((n,s)=>{const i=Ls(s,e.dc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Hm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof te||r instanceof rt||r instanceof $e||r instanceof de||r instanceof Nc||r instanceof Qe||nm(r))}function Lc(r,e,t){if(!Hm(t)||!Qd(t)){const n=Yi(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function hr(r,e,t){if((e=Re(e))instanceof Dc)return e._internalPath;if(typeof e=="string")return Wm(r,e);throw Ki("Field path arguments must be of type string or ",r,!1,void 0,t)}const Ev=new RegExp("[~\\*/\\[\\]]");function Wm(r,e,t){if(e.search(Ev)>=0)throw Ki(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Dc(...e.split("."))._internalPath}catch{throw Ki(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Ki(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new k(P.INVALID_ARGUMENT,c+r+u)}function Qm(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{convertValue(e,t="none"){switch(Gt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(pt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Jt(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){const t=e.fields?.[rr].arrayValue?.values?.map((n=>ae(n.doubleValue)));return new Qe(t)}convertGeoPoint(e){return new rt(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ro(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ds(e));default:return null}}convertTimestamp(e){const t=mt(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ee.fromString(e);U(tm(n),9688,{name:e});const s=new Tn(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(t)||Oe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm extends wv{constructor(e){super(),this.firestore=e}convertBytes(e){return new $e(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new de(this.firestore,null,t)}}const Lh="@firebase/firestore",Fh="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new de(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new vv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(hr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class vv extends Ym{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fc{}class Xm extends Fc{}function bv(r,e,...t){let n=[];e instanceof Fc&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof Bc)).length,c=i.filter((u=>u instanceof Uc)).length;if(o>1||o>0&&c>0)throw new k(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Uc extends Xm{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Uc(e,t,n)}_apply(e){const t=this._parse(e);return Zm(e._query,t),new Cn(e.firestore,e.converter,Ra(e._query,t))}_parse(e){const t=Mc(e.firestore);return(function(i,o,c,u,h,f,p){let w;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){jh(p,f);const C=[];for(const O of p)C.push(Bh(u,i,O));w={arrayValue:{values:C}}}else w=Bh(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||jh(p,f),w=Tv(c,o,p,f==="in"||f==="not-in");return X.create(h,f,w)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Bc extends Fc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Bc(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Zm(o,u),o=Ra(o,u)})(e._query,t),new Cn(e.firestore,e.converter,Ra(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class jc extends Xm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new jc(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _s(i,o)})(e._query,this._field,this._direction);return new Cn(e.firestore,e.converter,$T(e._query,t))}}function Rv(r,e="asc"){const t=e,n=hr("orderBy",r);return jc._create(n,t)}function Bh(r,e,t){if(typeof(t=Re(t))=="string"){if(t==="")throw new k(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Pf(e)&&t.indexOf("/")!==-1)throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(ee.fromString(t));if(!M.isDocumentKey(n))throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ps(r,new M(n))}if(t instanceof de)return ps(r,t._key);throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Yi(t)}.`)}function jh(r,e){if(!Array.isArray(r)||r.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zm(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Sv(r,e,t){let n;return n=r?r.toFirestore(e):e,n}class Pv{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=xv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Cv(r){return new Pv(r)}class Vv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Gi.provider,this._offlineComponentProvider={build:t=>new tv(t,e?.cacheSizeBytes,this.forceOwnership)}}}function xv(r){return new Vv(r?.forceOwnership)}class Hr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pn extends Ym{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ai(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(hr("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=pn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}pn._jsonSchemaVersion="firestore/documentSnapshot/1.0",pn._jsonSchema={type:me("string",pn._jsonSchemaVersion),bundleSource:me("string","DocumentSnapshot"),bundleName:me("string"),bundle:me("string")};class Ai extends pn{data(e={}){return super.data(e)}}class Jn{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Hr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Ai(this._firestore,this._userDataWriter,n.key,n,new Hr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new Ai(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Ai(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:kv(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Jn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Za.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function kv(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Jn._jsonSchemaVersion="firestore/querySnapshot/1.0",Jn._jsonSchema={type:me("string",Jn._jsonSchemaVersion),bundleSource:me("string","QuerySnapshot"),bundleName:me("string"),bundle:me("string")};function Dv(r,e,t){r=jt(r,de);const n=jt(r.firestore,Es),s=Sv(r.converter,e),i=Mc(n);return ep(n,[_v(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Fe.none())])}function qh(r,e,t,...n){r=jt(r,de);const s=jt(r.firestore,Es),i=Mc(s);let o;return o=typeof(e=Re(e))=="string"||e instanceof Dc?Iv(i,"updateDoc",r._key,e,t,n):yv(i,"updateDoc",r._key,e),ep(s,[o.toMutation(r._key,Fe.exists(!0))])}function Nv(r,...e){r=Re(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Uh(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Uh(e[n])){const h=e[n];e[n]=h.next?.bind(h),e[n+1]=h.error?.bind(h),e[n+2]=h.complete?.bind(h)}let i,o,c;if(r instanceof de)o=jt(r.firestore,Es),c=io(r._key.path),i={next:h=>{e[n]&&e[n](Ov(o,r,h))},error:e[n+1],complete:e[n+2]};else{const h=jt(r,Cn);o=jt(h.firestore,Es),c=h._query;const f=new Jm(o);i={next:p=>{e[n]&&e[n](new Jn(o,f,h,p))},error:e[n+1],complete:e[n+2]},Av(r._query)}const u=zm(o);return ov(u,c,s,i)}function ep(r,e){const t=zm(r);return av(t,e)}function Ov(r,e,t){const n=t.docs.get(e._key),s=new Jm(r);return new pn(r,s,e._key,n,new Hr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){FI(fr),Yn(new gn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new Es(new jI(n.getProvider("auth-internal")),new $I(o,n.getProvider("app-check-internal")),VT(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Ft(Lh,Fh,e),Ft(Lh,Fh,"esm2020")})();async function sa(r,e=3,t=1e3){const n=["unavailable","deadline-exceeded","resource-exhausted","internal","aborted"];let s;for(let i=0;i<=e;i++)try{return await r()}catch(o){s=o;const c=o?.code;if(c&&n.includes(c)&&i<e){const h=t*Math.pow(2,i)+Math.random()*100;await new Promise(f=>setTimeout(f,h))}else throw o}throw s}const Mv="",ci=typeof __app_id<"u"?__app_id:"ux-auditor-v2",Ct=typeof __firebase_config<"u"?JSON.parse(__firebase_config):null,Ua=[{name:"Mobile",width:375,height:667},{name:"Tablet",width:768,height:1024},{name:"Desktop",width:1440,height:900}];function Lv(){const r=$h(),[e,t]=_e.useState(null),[n,s]=_e.useState(null),[i,o]=_e.useState("https://arii.github.io/tech-dancer/"),[c,u]=_e.useState(!1),[h,f]=_e.useState(!1);_e.useEffect(()=>{if(!c)return;const F=setTimeout(()=>u(!1),2e3);return()=>clearTimeout(F)},[c]),_e.useEffect(()=>{if(!h)return;const F=setTimeout(()=>f(!1),1e3);return()=>clearTimeout(F)},[h]),_e.useEffect(()=>{if(!Ct)return;const F=v_().length===0?id(Ct):za();try{dv(F,{localCache:Cv({})})}catch{}const q=MI(F);(async()=>{try{typeof __initial_auth_token<"u"&&__initial_auth_token?await wy(q,__initial_auth_token):await _y(q)}catch(g){console.error("Firebase auth error:",g)}})();const _=by(q,t);return()=>_()},[]);const{data:p=[]}=Fp({queryKey:["ux-reports",e?.uid],queryFn:()=>r.getQueryData(["ux-reports",e?.uid])??[],enabled:!!e&&!!Ct,staleTime:1/0,gcTime:1/0});_e.useEffect(()=>{if(!e||!Ct)return;const F=ai(),q=bv(hv(F,"artifacts",ci,"users",e.uid,"ux_reports"),Rv("timestamp","desc")),B=Nv(q,_=>{const g=_.docs.map(y=>({id:y.id,...y.data()}));r.setQueryData(["ux-reports",e.uid],g)},_=>console.error("Firestore error:",_));return()=>B()},[e,r]);const w=$p({mutationFn:async F=>{const q=Date.now().toString(),B={id:q,url:F,timestamp:Date.now(),status:"processing"};if(s(q),r.setQueryData(["ux-reports",e?.uid],(_=[])=>[B,..._]),e&&Ct){const _=ai();await sa(()=>Dv(ra(_,"artifacts",ci,"users",e.uid,"ux_reports",q),B))}for(const _ of Ua){let g=`https://placehold.co/${_.width}x${_.height}/6366f1/ffffff?text=${_.name}+Analysis+Pending`,y="";try{const T=Math.floor(_.width*.5),A=Math.floor(_.height*.5),I=`https://s0.wp.com/mshots/v1/${encodeURIComponent(F)}?w=${T}&h=${A}`,ve=await fetch(I);if(ve.ok){const it=await ve.blob();y=await new Promise(yo=>{const Ir=new FileReader;Ir.onloadend=()=>yo(Ir.result),Ir.readAsDataURL(it)}),g=y}}catch{console.error("Failed to fetch realistic snapshot, using placeholder")}const E=await O(_,F,y);if(B[`findings_${_.name.toLowerCase()}`]=E,B[`image_${_.name.toLowerCase()}`]=g,r.setQueryData(["ux-reports",e?.uid],(T=[])=>T.map(A=>A.id===q?{...B}:A)),e&&Ct){const T=ai();await sa(()=>qh(ra(T,"artifacts",ci,"users",e.uid,"ux_reports",q),{[`findings_${_.name.toLowerCase()}`]:E,[`image_${_.name.toLowerCase()}`]:g}))}}if(B.status="completed",r.setQueryData(["ux-reports",e?.uid],(_=[])=>_.map(g=>g.id===q?{...B}:g)),e&&Ct){const _=ai();await sa(()=>qh(ra(_,"artifacts",ci,"users",e.uid,"ux_reports",q),{status:"completed"}))}return B},onSuccess:()=>{r.invalidateQueries({queryKey:["ux-reports",e?.uid]})}}),S=_e.useRef(Mp(2e3,F=>{w.mutate(F)},{noTrailing:!0})),C=_e.useCallback(F=>{S.current(F)},[]),O=async(F,q,B)=>{const _=`You are a Senior UX Auditor. Analyze the UI for ${F.name}. Focus on specific elements, accessibility, and visual bugs. Output JSON.`,g=`Analyze ${q} on ${F.name}.`;try{const E=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${Mv}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:g}]}],systemInstruction:{parts:[{text:_}]},generationConfig:{responseMimeType:"application/json",responseSchema:{type:"OBJECT",properties:{summary:{type:"STRING"},improvements:{type:"ARRAY",items:{type:"OBJECT",properties:{element:{type:"STRING"},issue:{type:"STRING"},suggestion:{type:"STRING"},severity:{type:"NUMBER"}}}}}}}})})).json();return JSON.parse(E.candidates[0].content.parts[0].text)}catch{const y=B?`Here is the base64 encoded snapshot:
${B}`:"[Please attach the image from scripts/ux-capture.js here]";return{summary:"API Key missing or fetch failed. Manual analysis required. Copy the prompt below.",improvements:[{element:"Manual Audit Required",issue:"No automated analysis generated.",suggestion:`Prompt: You are a Senior UX Auditor. Analyze the UI for ${F.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations.

${y}`.trim(),severity:5}]}}},D=p.find(F=>F.id===n)||null,W=()=>{if(!D)return"";let F=`# Visual UX Audit for ${D.url}

`;return Ua.forEach(q=>{const B=D[`findings_${q.name.toLowerCase()}`];B&&(F+=`## ${q.name} Analysis
${B.summary}

`,F+=`| Element | Issue | Suggestion | Severity |
|---|---|---|---|
`,B.improvements?.forEach(_=>{F+=`| ${_.element} | ${_.issue} | ${_.suggestion} | ${_.severity}/10 |
`}),F+=`
`)}),F},H=async()=>{if(!D)return;f(!0);const F=encodeURIComponent(W()),q=encodeURIComponent(`UX Audit Findings: ${D.url}`);let B="https://github.com/new";try{const _=new URL(D.url);if(_.hostname.endsWith(".github.io")){const g=_.hostname.split(".")[0],y=_.pathname.split("/")[1];g&&y&&(B=`https://github.com/${g}/${y}/issues/new`)}}catch{}window.open(`${B}?title=${q}&body=${F}`,"_blank")},z=async()=>{const F=W();try{await navigator.clipboard.writeText(F),u(!0)}catch(q){console.error("Failed to copy markdown:",q)}};return{user:e,reports:p,isAnalyzing:w.isPending,activeReport:D,setActiveReport:F=>s(F?.id||null),url:i,setUrl:o,isCopiedMarkdown:c,isExportingToGithub:h,runUXAudit:C,exportToGithub:H,copyMarkdown:z,firebaseConfig:Ct}}const Fv={Mobile:x.jsx(Zp,{className:"w-5 h-5"}),Tablet:x.jsx(tg,{className:"w-5 h-5"}),Desktop:x.jsx(Jp,{className:"w-5 h-5"})};function Uv({suggestion:r}){const[e,t]=_e.useState(!1),[n,s]=_e.useState(!1);_e.useEffect(()=>{if(!e)return;const o=setTimeout(()=>{document.startViewTransition?document.startViewTransition(()=>t(!1)):t(!1)},2e3);return()=>clearTimeout(o)},[e]);const i=async()=>{s(!0);try{await navigator.clipboard.writeText(r),await new Promise(o=>setTimeout(o,400)),document.startViewTransition?document.startViewTransition(()=>{t(!0)}):t(!0)}catch(o){console.error("Failed to copy:",o)}finally{s(!1)}};return x.jsxs(ie,{as:"button",onClick:i,disabled:n,marginTop:2,display:"flex",align:"center",gap:1,paddingX:3,paddingY:1,radius:"md",surface:"default",border:!0,className:"hover:border-accent transition-colors hover:text-accent font-bold text-xs",children:[n?x.jsx(qr,{className:"w-3 h-3 animate-spin"}):e?x.jsx(ia,{className:"w-3 h-3 text-emerald-500"}):x.jsx(Gh,{className:"w-3 h-3"}),x.jsx("span",{children:n?"Copying...":e?"Copied!":"Copy Prompt"})]})}function Wv(){const{reports:r,isAnalyzing:e,activeReport:t,setActiveReport:n,url:s,setUrl:i,isCopiedMarkdown:o,isExportingToGithub:c,runUXAudit:u,exportToGithub:h,copyMarkdown:f}=Lv();return x.jsxs(Pe,{gap:8,width:"full",children:[x.jsx(Bp,{title:"Visual UX Auditor",description:"Run automated visual UX audits on any URL using multimodal AI. Identify usability issues and get improvement suggestions for Mobile, Tablet, and Desktop."}),x.jsxs(Pe,{direction:{base:"col",md:"row"},align:{base:"start",md:"center"},justify:"between",gap:6,border:"b",paddingBottom:6,children:[x.jsx(ie,{children:x.jsx(Up,{label:"Visual UX Auditor",title:"Multimodal AI Analysis",description:"Automated visual regression and UX improvement suggestions across viewports."})}),x.jsxs(Pe,{direction:"row",align:"center",gap:3,surface:"default",padding:2,radius:"xl",shadow:"sm",border:!0,children:[x.jsx(ie,{as:"input",type:"text",value:s,title:s,onChange:p=>i(p.target.value),className:"bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm",width:64,paddingX:4,paddingY:2,radius:"lg",placeholder:"https://...","aria-label":"URL to audit"}),x.jsxs(ie,{as:"button",onClick:()=>u(s),disabled:e,display:"flex",align:"center",gap:2,className:"bg-accent hover:opacity-90 text-white font-bold transition-all disabled:opacity-50",paddingX:6,paddingY:2,radius:"md",children:[e?x.jsx(qr,{className:"animate-spin w-4 h-4"}):x.jsx($u,{className:"w-4 h-4"}),e?"Auditing...":"Start Audit"]})]})]}),x.jsxs(Lp,{cols:{base:1,lg:4},gap:8,children:[x.jsxs(Pe,{gap:4,span:{lg:1},children:[x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-bold",uppercase:!0,tracking:"widest",color:"dim",paddingX:1,children:"Audit History"}),x.jsxs(Pe,{surface:"default",radius:"2xl",shadow:"sm",border:!0,overflow:"hidden",className:"divide-y divide-line",children:[r.length===0&&x.jsx(ie,{padding:10,className:"italic",color:"dim",align:"center",size:"sm",children:"No audits recorded."}),r.map(p=>x.jsxs(ie,{as:"button",onClick:()=>n(p),width:"full",display:"flex",align:"center",gap:3,padding:4,className:`text-left hover:bg-surface transition-all ${t?.id===p.id?"bg-bg border-l-4 border-accent":"border-l-4 border-transparent"}`,children:[x.jsx(ie,{padding:2,radius:"full",surface:p.status==="completed"?"success":"warning",className:p.status!=="completed"?"animate-pulse":"",children:p.status==="completed"?x.jsx(ia,{className:"w-4 h-4"}):x.jsx(qr,{className:"w-4 h-4"})}),x.jsxs(ie,{flex:1,minWidth:"0",children:[x.jsx(Ee,{variant:"sans",size:"sm",weight:"font-bold",className:"truncate",children:p.url.replace("https://","")}),x.jsx(Ee,{variant:"mono",size:"xs",weight:"font-medium",color:"dim",uppercase:!0,children:new Date(p.timestamp).toLocaleTimeString()})]}),x.jsx(jp,{className:"w-4 h-4 text-text-dim opacity-50"})]},p.id))]})]}),x.jsx(Pe,{gap:6,span:{lg:3},children:t?x.jsxs(x.Fragment,{children:[x.jsxs(ie,{surface:"default",padding:6,radius:"2xl",shadow:"sm",border:!0,display:"flex",justify:"between",align:{base:"start",md:"center"},gap:4,direction:{base:"col",md:"row"},children:[x.jsxs(Pe,{gap:1,marginBottom:{base:4,md:0},minWidth:"0",flex:1,children:[x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-bold",color:"accent",uppercase:!0,tracking:"widest",display:"block",children:"Current Session"}),x.jsx(Ee,{variant:"sans",size:"xl",weight:"font-black",className:"truncate block",title:t.url,children:t.url})]}),x.jsxs(ie,{display:"flex",gap:2,children:[x.jsxs(ie,{as:"button",onClick:f,display:"flex",align:"center",gap:2,className:"font-bold hover:text-text-main transition-all text-sm",surface:"muted",color:"dim",paddingX:4,paddingY:2,radius:"xl",children:[o?x.jsx(ia,{className:"w-4 h-4"}):x.jsx(Gh,{className:"w-4 h-4"}),o?"Copied":"Copy MD"]}),x.jsxs(ie,{as:"button",onClick:h,disabled:t.status!=="completed"||c,display:"flex",align:"center",gap:2,className:"font-bold bg-accent text-white hover:opacity-90 shadow-md transition-all disabled:opacity-50 text-sm",paddingX:6,paddingY:2,radius:"xl",children:[c?x.jsx(qr,{className:"w-4 h-4 animate-spin"}):x.jsx(qp,{className:"w-4 h-4"}),x.jsx("span",{className:"whitespace-nowrap",children:c?"Exporting...":"Export to GitHub Issue"})]})]})]}),x.jsx(Pe,{gap:8,children:Ua.map(p=>{const w=t[`findings_${p.name.toLowerCase()}`],S=t[`image_${p.name.toLowerCase()}`];return x.jsxs(ie,{surface:"default",radius:"2xl",shadow:"sm",border:!0,overflow:"hidden",children:[x.jsxs(ie,{padding:4,border:"b",display:"flex",align:"center",justify:"between",surface:"muted",children:[x.jsxs(ie,{display:"flex",align:"center",gap:3,children:[x.jsx(ie,{padding:2,surface:"default",radius:"lg",shadow:"sm",color:"accent",children:Fv[p.name]}),x.jsxs(Ee,{variant:"sans",size:"base",weight:"font-bold",children:[p.name," Analysis"]})]}),x.jsxs(Ee,{variant:"mono",size:"xs",weight:"font-bold",color:"dim",uppercase:!0,tracking:"widest",children:[p.width,"w × ",p.height,"h"]})]}),x.jsxs(Pe,{direction:{base:"col",md:"row"},width:"full",children:[x.jsx(ie,{padding:8,surface:"muted",display:"flex",align:"center",justify:"center",border:{base:"b",md:"r"},minHeight:400,width:{base:"full",md:"41.666%"},children:S?x.jsx("img",{src:S,alt:`${p.name} snapshot`,loading:"lazy",className:"w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface max-h-96",onError:C=>{C.target.src=`https://placehold.co/${p.width}x${p.height}/e2e8f0/64748b?text=Snapshot+Unavailable`}}):x.jsxs(Pe,{align:"center",justify:"center",color:"dim",className:"text-center",children:[x.jsx(ie,{marginBottom:2,children:x.jsx(Wp,{className:"w-12 h-12 opacity-20"})}),x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-bold",uppercase:!0,tracking:"wider",children:"Awaiting Frame..."})]})}),x.jsx(Pe,{gap:6,padding:8,flex:1,minWidth:"0",overflow:"hidden",children:w?x.jsxs(x.Fragment,{children:[x.jsxs(ie,{surface:"muted",border:!0,padding:5,radius:"2xl",children:[x.jsx(ie,{marginBottom:3,children:x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-black",color:"accent",uppercase:!0,display:"block",tracking:"widest",children:"Analysis Summary"})}),x.jsxs(Ee,{variant:"sans",size:"sm",weight:"font-medium",className:"leading-relaxed break-words block",children:['"',w.summary,'"']})]}),x.jsx(Pe,{gap:4,children:w.improvements?.map((C,O)=>x.jsxs(ie,{padding:4,radius:"xl",border:!0,surface:"default",shadow:"sm",className:"hover:border-accent transition-all",children:[x.jsxs(ie,{display:"flex",justify:"between",align:"start",marginBottom:2,children:[x.jsxs(Pe,{direction:"row",align:"center",gap:2,children:[x.jsx(ie,{width:2,height:2,radius:"full",className:C.severity>7?"bg-error shadow-sm":"bg-amber-500"}),x.jsx(Ee,{variant:"sans",size:"sm",weight:"font-black",children:C.element})]}),x.jsxs(Ee,{variant:"mono",size:"xs",weight:"font-black",paddingX:2,paddingY:.5,radius:"full",surface:"muted",color:"dim",uppercase:!0,title:`Severity level: ${C.severity} out of 10 (1-10 scale)`,children:["SEV ",C.severity]})]}),x.jsx(Ee,{variant:"sans",size:"xs",color:"dim",marginBottom:3,children:C.issue}),C.suggestion&&C.suggestion.trim()!==""&&x.jsx(ie,{surface:"muted",padding:3,radius:"lg",border:!0,children:x.jsxs(Pe,{direction:{base:"col",sm:"row"},align:"start",gap:2,children:[x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-black",color:"accent",marginTop:.5,uppercase:!0,tracking:"widest",className:"shrink-0",children:"FIX"}),x.jsxs(ie,{flex:1,minWidth:"0",children:[x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-bold",className:"break-words whitespace-pre-wrap line-clamp-4",children:C.suggestion}),C.element==="Manual Audit Required"&&x.jsx(Uv,{suggestion:C.suggestion})]})]})})]},O))})]}):x.jsxs(Pe,{align:"center",justify:"center",paddingY:20,color:"dim",children:[x.jsx(qr,{className:"animate-spin w-6 h-6"}),x.jsx(Ee,{variant:"sans",size:"xs",weight:"font-bold",tracking:"widest",uppercase:!0,children:"Agent Processing..."})]})})]})]},p.name)})})]}):x.jsxs(Pe,{height:"full",align:"center",justify:"center",surface:"default",radius:"3xl",padding:20,minHeight:500,className:"border-2 border-dashed text-center",children:[x.jsx(ie,{surface:"muted",padding:6,radius:"full",marginBottom:6,className:"text-text-dim/50",children:x.jsx($u,{className:"w-16 h-16"})}),x.jsx(Ee,{variant:"sans",size:"xl",weight:"font-black",marginBottom:2,children:"Ready to Audit"}),x.jsx(Ee,{variant:"sans",size:"sm",weight:"font-medium",color:"dim",maxWidth:"sm",marginX:"auto",children:"Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop."})]})})]})]})}export{Wv as default};
