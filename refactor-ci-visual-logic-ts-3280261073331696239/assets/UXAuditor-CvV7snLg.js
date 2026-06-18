import{z as Mm,C as Lm,E as Hu,F as Fm,H as Qh,I as Jh,r as ce,J as Um,K as Bm,c as Dn,j as C,S as oe,l as jm,B as ae,q as fn,T as ge,G as zm,M as qm,O as Wu,P as ri}from"./index-DTxVs0Zo.js";import{I as Ie}from"./Icon-Vpy-8dui.js";import{u as $m}from"./useQuery-ChfJDISB.js";import{P as Gm}from"./PageHeader-WC2u1i20.js";import{S as Km}from"./SEO-BPLO9PYh.js";import{R as Hm}from"./research-tools-DCUYZZy7.js";import{E as Qu}from"./EmptyState-dnzckbRH.js";import{C as Ju}from"./camera-Cf3Q0boA.js";import{T as Wm}from"./trash-2-4AfnBcLN.js";import{C as Qm}from"./chevron-right-0mCmMExT.js";import{G as Jm}from"./github-DG9PPjAi.js";import"./suspense-Bw3JakZ1.js";var Ym=class extends Mm{#t;#r=void 0;#e;#n;constructor(r,e){super(),this.#t=r,this.setOptions(e),this.bindMethods(),this.#s()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(r){const e=this.options;this.options=this.#t.defaultMutationOptions(r),Lm(this.options,e)||this.#t.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#e,observer:this}),e?.mutationKey&&this.options.mutationKey&&Hu(e.mutationKey)!==Hu(this.options.mutationKey)?this.reset():this.#e?.state.status==="pending"&&this.#e.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#e?.removeObserver(this)}onMutationUpdate(r){this.#s(),this.#i(r)}getCurrentResult(){return this.#r}reset(){this.#e?.removeObserver(this),this.#e=void 0,this.#s(),this.#i()}mutate(r,e){return this.#n=e,this.#e?.removeObserver(this),this.#e=this.#t.getMutationCache().build(this.#t,this.options),this.#e.addObserver(this),this.#e.execute(r)}#s(){const r=this.#e?.state??Fm();this.#r={...r,isPending:r.status==="pending",isSuccess:r.status==="success",isError:r.status==="error",isIdle:r.status==="idle",mutate:this.mutate,reset:this.reset}}#i(r){Qh.batch(()=>{if(this.#n&&this.hasListeners()){const e=this.#r.variables,t=this.#r.context,n={client:this.#t,meta:this.options.meta,mutationKey:this.options.mutationKey};if(r?.type==="success"){try{this.#n.onSuccess?.(r.data,e,t,n)}catch(s){Promise.reject(s)}try{this.#n.onSettled?.(r.data,null,e,t,n)}catch(s){Promise.reject(s)}}else if(r?.type==="error"){try{this.#n.onError?.(r.error,e,t,n)}catch(s){Promise.reject(s)}try{this.#n.onSettled?.(void 0,r.error,e,t,n)}catch(s){Promise.reject(s)}}}this.listeners.forEach(e=>{e(this.#r)})})}};function Xm(r,e){const t=Jh(),[n]=ce.useState(()=>new Ym(t,r));ce.useEffect(()=>{n.setOptions(r)},[n,r]);const s=ce.useSyncExternalStore(ce.useCallback(o=>n.subscribe(Qh.batchCalls(o)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),i=ce.useCallback((o,c)=>{n.mutate(o,c).catch(Um)},[n]);if(s.error&&Bm(n.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:i,mutateAsync:s.mutate}}/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Zm=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],ua=Dn("circle-check-big",Zm);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const eg=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Yh=Dn("copy",eg);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const tg=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],ng=Dn("image",tg);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const rg=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],sg=Dn("monitor",rg);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const ig=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Yn=Dn("refresh-cw",ig);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const og=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],ag=Dn("smartphone",og);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const cg=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]],ug=Dn("tablet",cg);function lg(){const[r,e]=ce.useState(localStorage.getItem("ux-auditor-snapshot-service")||""),t=i=>{e(i),localStorage.setItem("ux-auditor-snapshot-service",i)},n=ce.useCallback((i,o)=>{const c=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";if(r)return r.replaceAll("{url}",encodeURIComponent(i)).replaceAll("{width}",o.width.toString()).replaceAll("{height}",o.height.toString()).replaceAll("{viewport}",o.name.toLowerCase());if(c)return`/ux-audits/audit-${o.name.toLowerCase()}.png`;const u=Math.floor(o.width*.5),h=Math.floor(o.height*.5);return`https://s0.wp.com/mshots/v1/${encodeURIComponent(i)}?w=${u}&h=${h}`},[r]);return{snapshotService:r,setSnapshotService:t,getSnapshotUrl:n,fetchSnapshot:async i=>{const o=await fetch(i);if(!o.ok)throw new Error("Failed to fetch snapshot");const c=await o.blob();return new Promise(u=>{const h=new FileReader;h.onloadend=()=>u(h.result),h.readAsDataURL(c)})}}}/**
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
*/const hg=()=>{};var Yu={};/**
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
 */const Xh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},dg=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Zh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,S=h&63;u||(S=64,o||(E=64)),n.push(t[f],t[m],t[E],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Xh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):dg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new fg;const E=i<<2|c>>4;if(n.push(E),h!==64){const S=c<<4&240|h>>2;if(n.push(S),m!==64){const k=h<<6&192|m;n.push(k)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class fg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pg=function(r){const e=Xh(r);return Zh.encodeByteArray(e,!0)},Vi=function(r){return pg(r).replace(/\./g,"")},ed=function(r){try{return Zh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function td(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const mg=()=>td().__FIREBASE_DEFAULTS__,gg=()=>{if(typeof process>"u"||typeof Yu>"u")return;const r=Yu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},_g=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&ed(r[1]);return e&&JSON.parse(e)},Xi=()=>{try{return hg()||mg()||gg()||_g()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},nd=r=>Xi()?.emulatorHosts?.[r],yg=r=>{const e=nd(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},rd=()=>Xi()?.config,sd=r=>Xi()?.[`_${r}`];/**
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
 */class Ig{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function Tg(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Vi(JSON.stringify(t)),Vi(JSON.stringify(o)),""].join(".")}/**
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
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Eg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function id(){const r=Xi()?.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Ag(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bg(){const r=Ae();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function od(){return!id()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ad(){return!id()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function cd(){try{return typeof indexedDB=="object"}catch{return!1}}function Rg(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Sg="FirebaseError";class Et extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Sg,Object.setPrototypeOf(this,Et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ps.prototype.create)}}class Ps{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Pg(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Et(s,c,n)}}function Pg(r,e){return r.replace(Cg,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Cg=/\{\$([^}]+)}/g;function Vg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Qt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Xu(i)&&Xu(o)){if(!Qt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Xu(r){return r!==null&&typeof r=="object"}/**
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
 */function Cs(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function xg(r,e){const t=new kg(r,e);return t.subscribe.bind(t)}class kg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Dg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Ho),s.error===void 0&&(s.error=Ho),s.complete===void 0&&(s.complete=Ho);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Dg(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Ho(){}/**
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
 */function xe(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Tr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $a(r){return(await fetch(r,{credentials:"include"})).ok}class vn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ln="[DEFAULT]";/**
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
 */class Ng{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Ig;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Mg(e))try{this.getOrInitializeService({instanceIdentifier:ln})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=ln){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ln){return this.instances.has(e)}getOptions(e=ln){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Og(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=ln){return this.component?this.component.multipleInstances?e:ln:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Og(r){return r===ln?void 0:r}function Mg(r){return r.instantiationMode==="EAGER"}/**
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
 */class Lg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ng(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
*/var J;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(J||(J={}));const Fg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},Ug=J.INFO,Bg={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},jg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Bg[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ga{constructor(e){this.name=e,this._logLevel=Ug,this._logHandler=jg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Fg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}const zg=(r,e)=>e.some(t=>r instanceof t);let Zu,el;function qg(){return Zu||(Zu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $g(){return el||(el=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ud=new WeakMap,la=new WeakMap,ld=new WeakMap,Wo=new WeakMap,Ka=new WeakMap;function Gg(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(jt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ud.set(t,r)}).catch(()=>{}),Ka.set(e,r),e}function Kg(r){if(la.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});la.set(r,e)}let ha={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return la.get(r);if(e==="objectStoreNames")return r.objectStoreNames||ld.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return jt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Hg(r){ha=r(ha)}function Wg(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Qo(this),e,...t);return ld.set(n,e.sort?e.sort():[e]),jt(n)}:$g().includes(r)?function(...e){return r.apply(Qo(this),e),jt(ud.get(this))}:function(...e){return jt(r.apply(Qo(this),e))}}function Qg(r){return typeof r=="function"?Wg(r):(r instanceof IDBTransaction&&Kg(r),zg(r,qg())?new Proxy(r,ha):r)}function jt(r){if(r instanceof IDBRequest)return Gg(r);if(Wo.has(r))return Wo.get(r);const e=Qg(r);return e!==r&&(Wo.set(r,e),Ka.set(e,r)),e}const Qo=r=>Ka.get(r);function Jg(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=jt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(jt(o.result),u.oldVersion,u.newVersion,jt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Yg=["get","getKey","getAll","getAllKeys","count"],Xg=["put","add","delete","clear"],Jo=new Map;function tl(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Jo.get(e))return Jo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Xg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Yg.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Jo.set(e,i),i}Hg(r=>({...r,get:(e,t,n)=>tl(e,t)||r.get(e,t,n),has:(e,t)=>!!tl(e,t)||r.has(e,t)}));/**
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
*/class Zg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(e_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function e_(r){return r.getComponent()?.type==="VERSION"}const da="@firebase/app",nl="0.14.11";/**
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
 */const mt=new Ga("@firebase/app"),t_="@firebase/app-compat",n_="@firebase/analytics-compat",r_="@firebase/analytics",s_="@firebase/app-check-compat",i_="@firebase/app-check",o_="@firebase/auth",a_="@firebase/auth-compat",c_="@firebase/database",u_="@firebase/data-connect",l_="@firebase/database-compat",h_="@firebase/functions",d_="@firebase/functions-compat",f_="@firebase/installations",p_="@firebase/installations-compat",m_="@firebase/messaging",g_="@firebase/messaging-compat",__="@firebase/performance",y_="@firebase/performance-compat",I_="@firebase/remote-config",T_="@firebase/remote-config-compat",E_="@firebase/storage",w_="@firebase/storage-compat",v_="@firebase/firestore",A_="@firebase/ai",b_="@firebase/firestore-compat",R_="firebase",S_="12.12.0";/**
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
 */const fa="[DEFAULT]",P_={[da]:"fire-core",[t_]:"fire-core-compat",[r_]:"fire-analytics",[n_]:"fire-analytics-compat",[i_]:"fire-app-check",[s_]:"fire-app-check-compat",[o_]:"fire-auth",[a_]:"fire-auth-compat",[c_]:"fire-rtdb",[u_]:"fire-data-connect",[l_]:"fire-rtdb-compat",[h_]:"fire-fn",[d_]:"fire-fn-compat",[f_]:"fire-iid",[p_]:"fire-iid-compat",[m_]:"fire-fcm",[g_]:"fire-fcm-compat",[__]:"fire-perf",[y_]:"fire-perf-compat",[I_]:"fire-rc",[T_]:"fire-rc-compat",[E_]:"fire-gcs",[w_]:"fire-gcs-compat",[v_]:"fire-fst",[b_]:"fire-fst-compat",[A_]:"fire-vertex","fire-js":"fire-js",[R_]:"fire-js-all"};/**
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
 */const us=new Map,C_=new Map,pa=new Map;function rl(r,e){try{r.container.addComponent(e)}catch(t){mt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function ir(r){const e=r.name;if(pa.has(e))return mt.debug(`There were multiple attempts to register component ${e}.`),!1;pa.set(e,r);for(const t of us.values())rl(t,r);for(const t of C_.values())rl(t,r);return!0}function Zi(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function He(r){return r==null?!1:r.settings!==void 0}/**
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
 */const V_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new Ps("app","Firebase",V_);/**
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
 */class x_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
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
 */const Er=S_;function hd(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:fa,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw zt.create("bad-app-name",{appName:String(s)});if(t||(t=rd()),!t)throw zt.create("no-options");const i=us.get(s);if(i){if(Qt(t,i.options)&&Qt(n,i.config))return i;throw zt.create("duplicate-app",{appName:s})}const o=new Lg(s);for(const u of pa.values())o.addComponent(u);const c=new x_(t,n,o);return us.set(s,c),c}function Ha(r=fa){const e=us.get(r);if(!e&&r===fa&&rd())return hd();if(!e)throw zt.create("no-app",{appName:r});return e}function k_(){return Array.from(us.values())}function qt(r,e,t){let n=P_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mt.warn(o.join(" "));return}ir(new vn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
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
 */const D_="firebase-heartbeat-database",N_=1,ls="firebase-heartbeat-store";let Yo=null;function dd(){return Yo||(Yo=Jg(D_,N_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ls)}catch(t){console.warn(t)}}}}).catch(r=>{throw zt.create("idb-open",{originalErrorMessage:r.message})})),Yo}async function O_(r){try{const t=(await dd()).transaction(ls),n=await t.objectStore(ls).get(fd(r));return await t.done,n}catch(e){if(e instanceof Et)mt.warn(e.message);else{const t=zt.create("idb-get",{originalErrorMessage:e?.message});mt.warn(t.message)}}}async function sl(r,e){try{const n=(await dd()).transaction(ls,"readwrite");await n.objectStore(ls).put(e,fd(r)),await n.done}catch(t){if(t instanceof Et)mt.warn(t.message);else{const n=zt.create("idb-set",{originalErrorMessage:t?.message});mt.warn(n.message)}}}function fd(r){return`${r.name}!${r.options.appId}`}/**
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
 */const M_=1024,L_=30;class F_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new B_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=il();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>L_){const s=j_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){mt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=il(),{heartbeatsToSend:t,unsentEntries:n}=U_(this._heartbeatsCache.heartbeats),s=Vi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return mt.warn(e),""}}}function il(){return new Date().toISOString().substring(0,10)}function U_(r,e=M_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),ol(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ol(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class B_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cd()?Rg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await O_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function ol(r){return Vi(JSON.stringify({version:2,heartbeats:r})).length}function j_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
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
 */function z_(r){ir(new vn("platform-logger",e=>new Zg(e),"PRIVATE")),ir(new vn("heartbeat",e=>new F_(e),"PRIVATE")),qt(da,nl,r),qt(da,nl,"esm2020"),qt("fire-js","")}z_("");var q_="firebase",$_="12.12.1";/**
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
 */qt(q_,$_,"app");function pd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const G_=pd,md=new Ps("auth","Firebase",pd());/**
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
 */const xi=new Ga("@firebase/auth");function K_(r,...e){xi.logLevel<=J.WARN&&xi.warn(`Auth (${Er}): ${r}`,...e)}function pi(r,...e){xi.logLevel<=J.ERROR&&xi.error(`Auth (${Er}): ${r}`,...e)}/**
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
 */function gt(r,...e){throw Wa(r,...e)}function at(r,...e){return Wa(r,...e)}function gd(r,e,t){const n={...G_(),[e]:t};return new Ps("auth","Firebase",n).create(e,{appName:r.name})}function pt(r){return gd(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Wa(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return md.create(r,...e)}function z(r,e,...t){if(!r)throw Wa(e,...t)}function ht(r){const e="INTERNAL ASSERTION FAILED: "+r;throw pi(e),new Error(e)}function _t(r,e){r||ht(e)}/**
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
 */function ma(){return typeof self<"u"&&self.location?.href||""}function H_(){return al()==="http:"||al()==="https:"}function al(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function W_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(H_()||vg()||"connection"in navigator)?navigator.onLine:!0}function Q_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class Vs{constructor(e,t){this.shortDelay=e,this.longDelay=t,_t(t>e,"Short delay should be less than long delay!"),this.isMobile=Eg()||Ag()}get(){return W_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Qa(r,e){_t(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class _d{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const J_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Y_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],X_=new Vs(3e4,6e4);function xs(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function wr(r,e,t,n,s={}){return yd(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Cs({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return wg()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&Tr(r.emulatorConfig.host)&&(h.credentials="include"),_d.fetch()(await Id(r,r.config.apiHost,t,c),h)})}async function yd(r,e,t){r._canInitEmulator=!1;const n={...J_,...e};try{const s=new Z_(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw si(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw si(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw si(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw si(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw gd(r,f,h);gt(r,f)}}catch(s){if(s instanceof Et)throw s;gt(r,"network-request-failed",{message:String(s)})}}async function Ja(r,e,t,n,s={}){const i=await wr(r,e,t,n,s);return"mfaPendingCredential"in i&&gt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Id(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?Qa(r.config,s):`${r.config.apiScheme}://${s}`;return Y_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Z_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(at(this.auth,"network-request-failed")),X_.get())})}}function si(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=at(r,e,n);return s.customData._tokenResponse=t,s}/**
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
 */async function ey(r,e){return wr(r,"POST","/v1/accounts:delete",e)}async function ki(r,e){return wr(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function es(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ty(r,e=!1){const t=xe(r),n=await t.getIdToken(e),s=Ya(n);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:n,authTime:es(Xo(s.auth_time)),issuedAtTime:es(Xo(s.iat)),expirationTime:es(Xo(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Xo(r){return Number(r)*1e3}function Ya(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return pi("JWT malformed, contained fewer than 3 sections"),null;try{const s=ed(t);return s?JSON.parse(s):(pi("Failed to decode base64 JWT payload"),null)}catch(s){return pi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function cl(r){const e=Ya(r);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function hs(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Et&&ny(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function ny({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class ry{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ga{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=es(this.lastLoginAt),this.creationTime=es(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Di(r){const e=r.auth,t=await r.getIdToken(),n=await hs(r,ki(e,{idToken:t}));z(n?.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=s.providerUserInfo?.length?Td(s.providerUserInfo):[],o=iy(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!o?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ga(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function sy(r){const e=xe(r);await Di(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iy(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Td(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function oy(r,e){const t=await yd(r,{},async()=>{const n=Cs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Id(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&Tr(r.emulatorConfig.host)&&(u.credentials="include"),_d.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ay(r,e){return wr(r,"POST","/v2/accounts:revokeToken",xs(r,e))}/**
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
 */class Zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):cl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=cl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await oy(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Zn;return n&&(z(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(z(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zn,this.toJSON())}_performRefresh(){return ht("not implemented")}}/**
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
 */function Vt(r,e){z(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new ry(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ga(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await hs(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ty(this,e)}reload(){return sy(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Di(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(He(this.auth.app))return Promise.reject(pt(this.auth));const e=await this.getIdToken();return await hs(this,ey(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:E,isAnonymous:S,providerData:k,stsTokenManager:N}=t;z(m&&N,e,"internal-error");const V=Zn.fromJSON(this.name,N);z(typeof m=="string",e,"internal-error"),Vt(n,e.name),Vt(s,e.name),z(typeof E=="boolean",e,"internal-error"),z(typeof S=="boolean",e,"internal-error"),Vt(i,e.name),Vt(o,e.name),Vt(c,e.name),Vt(u,e.name),Vt(h,e.name),Vt(f,e.name);const K=new Xe({uid:m,auth:e,email:s,emailVerified:E,displayName:n,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:h,lastLoginAt:f});return k&&Array.isArray(k)&&(K.providerData=k.map(q=>({...q}))),u&&(K._redirectEventId=u),K}static async _fromIdTokenResponse(e,t,n=!1){const s=new Zn;s.updateFromServerResponse(t);const i=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Di(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Td(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Zn;c.updateFromIdToken(n);const u=new Xe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ga(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
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
 */const ul=new Map;function dt(r){_t(r instanceof Function,"Expected a class definition");let e=ul.get(r);return e?(_t(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,ul.set(r,e),e)}/**
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
 */class Ed{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ed.type="NONE";const ll=Ed;/**
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
 */function mi(r,e,t){return`firebase:${r}:${e}:${t}`}class er{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=mi(this.userKey,s.apiKey,i),this.fullPersistenceKey=mi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ki(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new er(dt(ll),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||dt(ll);const o=mi(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const E=await ki(e,{idToken:f}).catch(()=>{});if(!E)break;m=await Xe._fromGetAccountInfoResponse(e,E,f)}else m=Xe._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new er(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new er(i,e,n))}}/**
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
 */function hl(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Sd(e))return"Blackberry";if(Pd(e))return"Webos";if(vd(e))return"Safari";if((e.includes("chrome/")||Ad(e))&&!e.includes("edge/"))return"Chrome";if(Rd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function wd(r=Ae()){return/firefox\//i.test(r)}function vd(r=Ae()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ad(r=Ae()){return/crios\//i.test(r)}function bd(r=Ae()){return/iemobile/i.test(r)}function Rd(r=Ae()){return/android/i.test(r)}function Sd(r=Ae()){return/blackberry/i.test(r)}function Pd(r=Ae()){return/webos/i.test(r)}function Xa(r=Ae()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function cy(r=Ae()){return Xa(r)&&!!window.navigator?.standalone}function uy(){return bg()&&document.documentMode===10}function Cd(r=Ae()){return Xa(r)||Rd(r)||Pd(r)||Sd(r)||/windows phone/i.test(r)||bd(r)}/**
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
 */function Vd(r,e=[]){let t;switch(r){case"Browser":t=hl(Ae());break;case"Worker":t=`${hl(Ae())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Er}/${n}`}/**
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
 */class ly{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
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
 */async function hy(r,e={}){return wr(r,"GET","/v2/passwordPolicy",xs(r,e))}/**
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
 */const dy=6;class fy{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??dy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class py{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dl(this),this.idTokenSubscription=new dl(this),this.beforeStateQueue=new ly(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=md,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await er.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ki(this,{idToken:e}),n=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(He(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Di(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Q_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(He(this.app))return Promise.reject(pt(this));const t=e?xe(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return He(this.app)?Promise.reject(pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return He(this.app)?Promise.reject(pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hy(this),t=new fy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ps("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await ay(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await er.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Vd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(He(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&K_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ks(r){return xe(r)}class dl{constructor(e){this.auth=e,this.observer=null,this.addObserver=xg(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Za={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function my(r){Za=r}function gy(r){return Za.loadJS(r)}function _y(){return Za.gapiScript}function yy(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Iy(r,e){const t=Zi(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Qt(i,e??{}))return s;gt(s,"already-initialized")}return t.initialize({options:e})}function Ty(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(dt);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function Ey(r,e,t){const n=ks(r);z(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=xd(e),{host:o,port:c}=wy(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){z(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),z(Qt(h,n.config.emulator)&&Qt(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,Tr(o)?$a(`${i}//${o}${u}`):vy()}function xd(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function wy(r){const e=xd(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:fl(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:fl(o)}}}function fl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function vy(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
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
 */class kd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}/**
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
 */async function tr(r,e){return Ja(r,"POST","/v1/accounts:signInWithIdp",xs(r,e))}/**
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
 */const Ay="http://localhost";class An extends kd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new An(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):gt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new An(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return tr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,tr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}buildRequest(){const e={requestUri:Ay,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Cs(t)}return e}}/**
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
 */class Dd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ds extends Dd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ot extends Ds{constructor(){super("facebook.com")}static credential(e){return An._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ot.credential(e.oauthAccessToken)}catch{return null}}}Ot.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ot.PROVIDER_ID="facebook.com";/**
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
 */class Mt extends Ds{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return An._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Mt.credential(t,n)}catch{return null}}}Mt.GOOGLE_SIGN_IN_METHOD="google.com";Mt.PROVIDER_ID="google.com";/**
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
 */class Lt extends Ds{constructor(){super("github.com")}static credential(e){return An._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Lt.credential(e.oauthAccessToken)}catch{return null}}}Lt.GITHUB_SIGN_IN_METHOD="github.com";Lt.PROVIDER_ID="github.com";/**
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
 */class Ft extends Ds{constructor(){super("twitter.com")}static credential(e,t){return An._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ft.credential(t,n)}catch{return null}}}Ft.TWITTER_SIGN_IN_METHOD="twitter.com";Ft.PROVIDER_ID="twitter.com";/**
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
 */async function by(r,e){return Ja(r,"POST","/v1/accounts:signUp",xs(r,e))}/**
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
 */class yt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Xe._fromIdTokenResponse(e,n,s),o=pl(n);return new yt({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=pl(n);return new yt({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function pl(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */async function Ry(r){if(He(r.app))return Promise.reject(pt(r));const e=ks(r);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new yt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await by(e,{returnSecureToken:!0}),n=await yt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
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
 */class Ni extends Et{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Ni.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Ni(e,t,n,s)}}function Nd(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ni._fromErrorAndOperation(r,i,e,n):i})}async function Sy(r,e,t=!1){const n=await hs(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return yt._forOperation(r,"link",n)}/**
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
 */async function Py(r,e,t=!1){const{auth:n}=r;if(He(n.app))return Promise.reject(pt(n));const s="reauthenticate";try{const i=await hs(r,Nd(n,s,e,r),t);z(i.idToken,n,"internal-error");const o=Ya(i.idToken);z(o,n,"internal-error");const{sub:c}=o;return z(r.uid===c,n,"user-mismatch"),yt._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&gt(n,"user-mismatch"),i}}/**
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
 */async function Cy(r,e,t=!1){if(He(r.app))return Promise.reject(pt(r));const n="signIn",s=await Nd(r,n,e),i=await yt._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
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
 */async function Vy(r,e){return Ja(r,"POST","/v1/accounts:signInWithCustomToken",xs(r,e))}/**
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
 */async function xy(r,e){if(He(r.app))return Promise.reject(pt(r));const t=ks(r),n=await Vy(t,{token:e,returnSecureToken:!0}),s=await yt._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(s.user),s}function ky(r,e,t,n){return xe(r).onIdTokenChanged(e,t,n)}function Dy(r,e,t){return xe(r).beforeAuthStateChanged(e,t)}function Ny(r,e,t,n){return xe(r).onAuthStateChanged(e,t,n)}const Oi="__sak";/**
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
 */class Od{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Oi,"1"),this.storage.removeItem(Oi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Oy=1e3,My=10;class Md extends Od{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Cd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);uy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,My):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Oy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Md.type="LOCAL";const Ly=Md;/**
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
 */class Ld extends Od{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ld.type="SESSION";const Fd=Ld;/**
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
 */function Fy(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class eo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new eo(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await Fy(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}eo.receivers=[];/**
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
 */function ec(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
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
 */class Uy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=ec("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(m){const E=m;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ct(){return window}function By(r){ct().location.href=r}/**
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
 */function Ud(){return typeof ct().WorkerGlobalScope<"u"&&typeof ct().importScripts=="function"}async function jy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function zy(){return navigator?.serviceWorker?.controller||null}function qy(){return Ud()?self:null}/**
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
 */const Bd="firebaseLocalStorageDb",$y=1,Mi="firebaseLocalStorage",jd="fbase_key";class Ns{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function to(r,e){return r.transaction([Mi],e?"readwrite":"readonly").objectStore(Mi)}function Gy(){const r=indexedDB.deleteDatabase(Bd);return new Ns(r).toPromise()}function _a(){const r=indexedDB.open(Bd,$y);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Mi,{keyPath:jd})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Mi)?e(n):(n.close(),await Gy(),e(await _a()))})})}async function ml(r,e,t){const n=to(r,!0).put({[jd]:e,value:t});return new Ns(n).toPromise()}async function Ky(r,e){const t=to(r,!1).get(e),n=await new Ns(t).toPromise();return n===void 0?null:n.value}function gl(r,e){const t=to(r,!0).delete(e);return new Ns(t).toPromise()}const Hy=800,Wy=3;class zd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _a(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Wy)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ud()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=eo._getInstance(qy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await jy(),!this.activeServiceWorker)return;this.sender=new Uy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||zy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _a();return await ml(e,Oi,"1"),await gl(e,Oi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ml(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>Ky(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>gl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=to(s,!1).getAll();return new Ns(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}zd.type="LOCAL";const Qy=zd;new Vs(3e4,6e4);/**
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
 */function Jy(r,e){return e?dt(e):(z(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
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
 */class tc extends kd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Yy(r){return Cy(r.auth,new tc(r),r.bypassAuthState)}function Xy(r){const{auth:e,user:t}=r;return z(t,e,"internal-error"),Py(t,new tc(r),r.bypassAuthState)}async function Zy(r){const{auth:e,user:t}=r;return z(t,e,"internal-error"),Sy(t,new tc(r),r.bypassAuthState)}/**
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
 */class qd{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Yy;case"linkViaPopup":case"linkViaRedirect":return Zy;case"reauthViaPopup":case"reauthViaRedirect":return Xy;default:gt(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const eI=new Vs(2e3,1e4);class Xn extends qd{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Xn.currentPopupAction&&Xn.currentPopupAction.cancel(),Xn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){_t(this.filter.length===1,"Popup operations only handle one event");const e=ec();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,eI.get())};e()}}Xn.currentPopupAction=null;/**
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
 */const tI="pendingRedirect",gi=new Map;class nI extends qd{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=gi.get(this.auth._key());if(!e){try{const n=await rI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}gi.set(this.auth._key(),e)}return this.bypassAuthState||gi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rI(r,e){const t=oI(e),n=iI(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function sI(r,e){gi.set(r._key(),e)}function iI(r){return dt(r._redirectPersistence)}function oI(r){return mi(tI,r.config.apiKey,r.name)}async function aI(r,e,t=!1){if(He(r.app))return Promise.reject(pt(r));const n=ks(r),s=Jy(n,e),o=await new nI(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
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
 */const cI=600*1e3;class uI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!$d(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(at(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=cI&&this.cachedEventUids.clear(),this.cachedEventUids.has(_l(e))}saveEventToCache(e){this.cachedEventUids.add(_l(e)),this.lastProcessedEventTime=Date.now()}}function _l(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function $d({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function lI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $d(r);default:return!1}}/**
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
 */async function hI(r,e={}){return wr(r,"GET","/v1/projects",e)}/**
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
 */const dI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fI=/^https?/;async function pI(r){if(r.config.emulator)return;const{authorizedDomains:e}=await hI(r);for(const t of e)try{if(mI(t))return}catch{}gt(r,"unauthorized-domain")}function mI(r){const e=ma(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!fI.test(t))return!1;if(dI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
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
 */const gI=new Vs(3e4,6e4);function yl(){const r=ct().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function _I(r){return new Promise((e,t)=>{function n(){yl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{yl(),t(at(r,"network-request-failed"))},timeout:gI.get()})}if(ct().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ct().gapi?.load)n();else{const s=yy("iframefcb");return ct()[s]=()=>{gapi.load?n():t(at(r,"network-request-failed"))},gy(`${_y()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw _i=null,e})}let _i=null;function yI(r){return _i=_i||_I(r),_i}/**
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
 */const II=new Vs(5e3,15e3),TI="__/auth/iframe",EI="emulator/auth/iframe",wI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function AI(r){const e=r.config;z(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Qa(e,EI):`https://${r.config.authDomain}/${TI}`,n={apiKey:e.apiKey,appName:r.name,v:Er},s=vI.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Cs(n).slice(1)}`}async function bI(r){const e=await yI(r),t=ct().gapi;return z(t,r,"internal-error"),e.open({where:document.body,url:AI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=at(r,"network-request-failed"),c=ct().setTimeout(()=>{i(o)},II.get());function u(){ct().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const RI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},SI=500,PI=600,CI="_blank",VI="http://localhost";class Il{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function xI(r,e,t,n=SI,s=PI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...RI,width:n.toString(),height:s.toString(),top:i,left:o},h=Ae().toLowerCase();t&&(c=Ad(h)?CI:t),wd(h)&&(e=e||VI,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[S,k])=>`${E}${S}=${k},`,"");if(cy(h)&&c!=="_self")return kI(e||"",c),new Il(null);const m=window.open(e||"",c,f);z(m,r,"popup-blocked");try{m.focus()}catch{}return new Il(m)}function kI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
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
 */const DI="__/auth/handler",NI="emulator/auth/handler",OI=encodeURIComponent("fac");async function Tl(r,e,t,n,s,i){z(r.config.authDomain,r,"auth-domain-config-required"),z(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Er,eventId:s};if(e instanceof Dd){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Vg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof Ds){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${OI}=${encodeURIComponent(u)}`:"";return`${MI(r)}?${Cs(c).slice(1)}${h}`}function MI({config:r}){return r.emulator?Qa(r,NI):`https://${r.authDomain}/${DI}`}/**
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
 */const Zo="webStorageSupport";class LI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fd,this._completeRedirectFn=aI,this._overrideRedirectResult=sI}async _openPopup(e,t,n,s){_t(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Tl(e,t,n,ma(),s);return xI(e,i,ec())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await Tl(e,t,n,ma(),s);return By(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(_t(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await bI(e),n=new uI(e);return t.register("authEvent",s=>(z(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Zo,{type:Zo},s=>{const i=s?.[0]?.[Zo];i!==void 0&&t(!!i),gt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=pI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Cd()||vd()||Xa()}}const FI=LI;var El="@firebase/auth",wl="1.13.0";/**
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
 */class UI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function BI(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jI(r){ir(new vn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;z(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Vd(r)},h=new py(n,s,i,u);return Ty(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),ir(new vn("auth-internal",e=>{const t=ks(e.getProvider("auth").getImmediate());return(n=>new UI(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),qt(El,wl,BI(r)),qt(El,wl,"esm2020")}/**
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
 */const zI=300,qI=sd("authIdTokenMaxAge")||zI;let vl=null;const $I=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>qI)return;const s=t?.token;vl!==s&&(vl=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function GI(r=Ha()){const e=Zi(r,"auth");if(e.isInitialized())return e.getImmediate();const t=Iy(r,{popupRedirectResolver:FI,persistence:[Qy,Ly,Fd]}),n=sd("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=$I(i.toString());Dy(t,o,()=>o(t.currentUser)),ky(t,c=>o(c))}}const s=nd("auth");return s&&Ey(t,`http://${s}`),t}function KI(){return document.getElementsByTagName("head")?.[0]??document}my({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=at("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",KI().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jI("Browser");var Al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $t,Gd;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function I(){}I.prototype=_.prototype,T.F=_.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(v,y,w){for(var g=Array(arguments.length-2),j=2;j<arguments.length;j++)g[j-2]=arguments[j];return _.prototype[y].apply(v,g)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,I){I||(I=0);const v=Array(16);if(typeof _=="string")for(var y=0;y<16;++y)v[y]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(y=0;y<16;++y)v[y]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=T.g[0],I=T.g[1],y=T.g[2];let w=T.g[3],g;g=_+(w^I&(y^w))+v[0]+3614090360&4294967295,_=I+(g<<7&4294967295|g>>>25),g=w+(y^_&(I^y))+v[1]+3905402710&4294967295,w=_+(g<<12&4294967295|g>>>20),g=y+(I^w&(_^I))+v[2]+606105819&4294967295,y=w+(g<<17&4294967295|g>>>15),g=I+(_^y&(w^_))+v[3]+3250441966&4294967295,I=y+(g<<22&4294967295|g>>>10),g=_+(w^I&(y^w))+v[4]+4118548399&4294967295,_=I+(g<<7&4294967295|g>>>25),g=w+(y^_&(I^y))+v[5]+1200080426&4294967295,w=_+(g<<12&4294967295|g>>>20),g=y+(I^w&(_^I))+v[6]+2821735955&4294967295,y=w+(g<<17&4294967295|g>>>15),g=I+(_^y&(w^_))+v[7]+4249261313&4294967295,I=y+(g<<22&4294967295|g>>>10),g=_+(w^I&(y^w))+v[8]+1770035416&4294967295,_=I+(g<<7&4294967295|g>>>25),g=w+(y^_&(I^y))+v[9]+2336552879&4294967295,w=_+(g<<12&4294967295|g>>>20),g=y+(I^w&(_^I))+v[10]+4294925233&4294967295,y=w+(g<<17&4294967295|g>>>15),g=I+(_^y&(w^_))+v[11]+2304563134&4294967295,I=y+(g<<22&4294967295|g>>>10),g=_+(w^I&(y^w))+v[12]+1804603682&4294967295,_=I+(g<<7&4294967295|g>>>25),g=w+(y^_&(I^y))+v[13]+4254626195&4294967295,w=_+(g<<12&4294967295|g>>>20),g=y+(I^w&(_^I))+v[14]+2792965006&4294967295,y=w+(g<<17&4294967295|g>>>15),g=I+(_^y&(w^_))+v[15]+1236535329&4294967295,I=y+(g<<22&4294967295|g>>>10),g=_+(y^w&(I^y))+v[1]+4129170786&4294967295,_=I+(g<<5&4294967295|g>>>27),g=w+(I^y&(_^I))+v[6]+3225465664&4294967295,w=_+(g<<9&4294967295|g>>>23),g=y+(_^I&(w^_))+v[11]+643717713&4294967295,y=w+(g<<14&4294967295|g>>>18),g=I+(w^_&(y^w))+v[0]+3921069994&4294967295,I=y+(g<<20&4294967295|g>>>12),g=_+(y^w&(I^y))+v[5]+3593408605&4294967295,_=I+(g<<5&4294967295|g>>>27),g=w+(I^y&(_^I))+v[10]+38016083&4294967295,w=_+(g<<9&4294967295|g>>>23),g=y+(_^I&(w^_))+v[15]+3634488961&4294967295,y=w+(g<<14&4294967295|g>>>18),g=I+(w^_&(y^w))+v[4]+3889429448&4294967295,I=y+(g<<20&4294967295|g>>>12),g=_+(y^w&(I^y))+v[9]+568446438&4294967295,_=I+(g<<5&4294967295|g>>>27),g=w+(I^y&(_^I))+v[14]+3275163606&4294967295,w=_+(g<<9&4294967295|g>>>23),g=y+(_^I&(w^_))+v[3]+4107603335&4294967295,y=w+(g<<14&4294967295|g>>>18),g=I+(w^_&(y^w))+v[8]+1163531501&4294967295,I=y+(g<<20&4294967295|g>>>12),g=_+(y^w&(I^y))+v[13]+2850285829&4294967295,_=I+(g<<5&4294967295|g>>>27),g=w+(I^y&(_^I))+v[2]+4243563512&4294967295,w=_+(g<<9&4294967295|g>>>23),g=y+(_^I&(w^_))+v[7]+1735328473&4294967295,y=w+(g<<14&4294967295|g>>>18),g=I+(w^_&(y^w))+v[12]+2368359562&4294967295,I=y+(g<<20&4294967295|g>>>12),g=_+(I^y^w)+v[5]+4294588738&4294967295,_=I+(g<<4&4294967295|g>>>28),g=w+(_^I^y)+v[8]+2272392833&4294967295,w=_+(g<<11&4294967295|g>>>21),g=y+(w^_^I)+v[11]+1839030562&4294967295,y=w+(g<<16&4294967295|g>>>16),g=I+(y^w^_)+v[14]+4259657740&4294967295,I=y+(g<<23&4294967295|g>>>9),g=_+(I^y^w)+v[1]+2763975236&4294967295,_=I+(g<<4&4294967295|g>>>28),g=w+(_^I^y)+v[4]+1272893353&4294967295,w=_+(g<<11&4294967295|g>>>21),g=y+(w^_^I)+v[7]+4139469664&4294967295,y=w+(g<<16&4294967295|g>>>16),g=I+(y^w^_)+v[10]+3200236656&4294967295,I=y+(g<<23&4294967295|g>>>9),g=_+(I^y^w)+v[13]+681279174&4294967295,_=I+(g<<4&4294967295|g>>>28),g=w+(_^I^y)+v[0]+3936430074&4294967295,w=_+(g<<11&4294967295|g>>>21),g=y+(w^_^I)+v[3]+3572445317&4294967295,y=w+(g<<16&4294967295|g>>>16),g=I+(y^w^_)+v[6]+76029189&4294967295,I=y+(g<<23&4294967295|g>>>9),g=_+(I^y^w)+v[9]+3654602809&4294967295,_=I+(g<<4&4294967295|g>>>28),g=w+(_^I^y)+v[12]+3873151461&4294967295,w=_+(g<<11&4294967295|g>>>21),g=y+(w^_^I)+v[15]+530742520&4294967295,y=w+(g<<16&4294967295|g>>>16),g=I+(y^w^_)+v[2]+3299628645&4294967295,I=y+(g<<23&4294967295|g>>>9),g=_+(y^(I|~w))+v[0]+4096336452&4294967295,_=I+(g<<6&4294967295|g>>>26),g=w+(I^(_|~y))+v[7]+1126891415&4294967295,w=_+(g<<10&4294967295|g>>>22),g=y+(_^(w|~I))+v[14]+2878612391&4294967295,y=w+(g<<15&4294967295|g>>>17),g=I+(w^(y|~_))+v[5]+4237533241&4294967295,I=y+(g<<21&4294967295|g>>>11),g=_+(y^(I|~w))+v[12]+1700485571&4294967295,_=I+(g<<6&4294967295|g>>>26),g=w+(I^(_|~y))+v[3]+2399980690&4294967295,w=_+(g<<10&4294967295|g>>>22),g=y+(_^(w|~I))+v[10]+4293915773&4294967295,y=w+(g<<15&4294967295|g>>>17),g=I+(w^(y|~_))+v[1]+2240044497&4294967295,I=y+(g<<21&4294967295|g>>>11),g=_+(y^(I|~w))+v[8]+1873313359&4294967295,_=I+(g<<6&4294967295|g>>>26),g=w+(I^(_|~y))+v[15]+4264355552&4294967295,w=_+(g<<10&4294967295|g>>>22),g=y+(_^(w|~I))+v[6]+2734768916&4294967295,y=w+(g<<15&4294967295|g>>>17),g=I+(w^(y|~_))+v[13]+1309151649&4294967295,I=y+(g<<21&4294967295|g>>>11),g=_+(y^(I|~w))+v[4]+4149444226&4294967295,_=I+(g<<6&4294967295|g>>>26),g=w+(I^(_|~y))+v[11]+3174756917&4294967295,w=_+(g<<10&4294967295|g>>>22),g=y+(_^(w|~I))+v[2]+718787259&4294967295,y=w+(g<<15&4294967295|g>>>17),g=I+(w^(y|~_))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+y&4294967295,T.g[3]=T.g[3]+w&4294967295}n.prototype.v=function(T,_){_===void 0&&(_=T.length);const I=_-this.blockSize,v=this.C;let y=this.h,w=0;for(;w<_;){if(y==0)for(;w<=I;)s(this,T,w),w+=this.blockSize;if(typeof T=="string"){for(;w<_;)if(v[y++]=T.charCodeAt(w++),y==this.blockSize){s(this,v),y=0;break}}else for(;w<_;)if(v[y++]=T[w++],y==this.blockSize){s(this,v),y=0;break}}this.h=y,this.o+=_},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,I=0;I<4;++I)for(let v=0;v<32;v+=8)T[_++]=this.g[I]>>>v&255;return T};function i(T,_){var I=c;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=_(T)}function o(T,_){this.h=_;const I=[];let v=!0;for(let y=T.length-1;y>=0;y--){const w=T[y]|0;v&&w==_||(I[y]=w,v=!1)}this.g=I}var c={};function u(T){return-128<=T&&T<128?i(T,function(_){return new o([_|0],_<0?-1:0)}):new o([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return V(h(-T));const _=[];let I=1;for(let v=0;T>=I;v++)_[v]=T/I|0,I*=4294967296;return new o(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return V(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(_,8));let v=m;for(let w=0;w<T.length;w+=8){var y=Math.min(8,T.length-w);const g=parseInt(T.substring(w,w+y),_);y<8?(y=h(Math.pow(_,y)),v=v.j(y).add(h(g))):(v=v.j(I),v=v.add(h(g)))}return v}var m=u(0),E=u(1),S=u(16777216);r=o.prototype,r.m=function(){if(N(this))return-V(this).m();let T=0,_=1;for(let I=0;I<this.g.length;I++){const v=this.i(I);T+=(v>=0?v:4294967296+v)*_,_*=4294967296}return T},r.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(k(this))return"0";if(N(this))return"-"+V(this).toString(T);const _=h(Math.pow(T,6));var I=this;let v="";for(;;){const y=te(I,_).g;I=K(I,y.j(_));let w=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=y,k(I))return w+v;for(;w.length<6;)w="0"+w;v=w+v}},r.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function k(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function N(T){return T.h==-1}r.l=function(T){return T=K(this,T),N(T)?-1:k(T)?0:1};function V(T){const _=T.g.length,I=[];for(let v=0;v<_;v++)I[v]=~T.g[v];return new o(I,~T.h).add(E)}r.abs=function(){return N(this)?V(this):this},r.add=function(T){const _=Math.max(this.g.length,T.g.length),I=[];let v=0;for(let y=0;y<=_;y++){let w=v+(this.i(y)&65535)+(T.i(y)&65535),g=(w>>>16)+(this.i(y)>>>16)+(T.i(y)>>>16);v=g>>>16,w&=65535,g&=65535,I[y]=g<<16|w}return new o(I,I[I.length-1]&-2147483648?-1:0)};function K(T,_){return T.add(V(_))}r.j=function(T){if(k(this)||k(T))return m;if(N(this))return N(T)?V(this).j(V(T)):V(V(this).j(T));if(N(T))return V(this.j(V(T)));if(this.l(S)<0&&T.l(S)<0)return h(this.m()*T.m());const _=this.g.length+T.g.length,I=[];for(var v=0;v<2*_;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(let y=0;y<T.g.length;y++){const w=this.i(v)>>>16,g=this.i(v)&65535,j=T.i(y)>>>16,de=T.i(y)&65535;I[2*v+2*y]+=g*de,q(I,2*v+2*y),I[2*v+2*y+1]+=w*de,q(I,2*v+2*y+1),I[2*v+2*y+1]+=g*j,q(I,2*v+2*y+1),I[2*v+2*y+2]+=w*j,q(I,2*v+2*y+2)}for(T=0;T<_;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=_;T<2*_;T++)I[T]=0;return new o(I,0)};function q(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function B(T,_){this.g=T,this.h=_}function te(T,_){if(k(_))throw Error("division by zero");if(k(T))return new B(m,m);if(N(T))return _=te(V(T),_),new B(V(_.g),V(_.h));if(N(_))return _=te(T,V(_)),new B(V(_.g),_.h);if(T.g.length>30){if(N(T)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var I=E,v=_;v.l(T)<=0;)I=ee(I),v=ee(v);var y=H(I,1),w=H(v,1);for(v=H(v,2),I=H(I,2);!k(v);){var g=w.add(v);g.l(T)<=0&&(y=y.add(I),w=g),v=H(v,1),I=H(I,1)}return _=K(T,y.j(_)),new B(y,_)}for(y=m;T.l(_)>=0;){for(I=Math.max(1,Math.floor(T.m()/_.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),w=h(I),g=w.j(_);N(g)||g.l(T)>0;)I-=v,w=h(I),g=w.j(_);k(w)&&(w=E),y=y.add(w),T=K(T,g)}return new B(y,T)}r.B=function(T){return te(this,T).h},r.and=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)&T.i(v);return new o(I,this.h&T.h)},r.or=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)|T.i(v);return new o(I,this.h|T.h)},r.xor=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)^T.i(v);return new o(I,this.h^T.h)};function ee(T){const _=T.g.length+1,I=[];for(let v=0;v<_;v++)I[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(I,T.h)}function H(T,_){const I=_>>5;_%=32;const v=T.g.length-I,y=[];for(let w=0;w<v;w++)y[w]=_>0?T.i(w+I)>>>_|T.i(w+I+1)<<32-_:T.i(w+I);return new o(y,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Gd=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,$t=o}).apply(typeof Al<"u"?Al:typeof self<"u"?self:typeof window<"u"?window:{});var ii=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kd,Qr,Hd,yi,ya,Wd,Qd,Jd;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ii=="object"&&ii];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var b=a[p];if(!(b in d))break e;d=d[b]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function m(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(p,b,R){for(var O=Array(arguments.length-2),W=2;W<arguments.length;W++)O[W-2]=arguments[W];return l.prototype[b].apply(p,O)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function S(a){const l=a.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function k(a,l){for(let p=1;p<arguments.length;p++){const b=arguments[p];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=a.length||0;const R=b.length||0;a.length=d+R;for(let O=0;O<R;O++)a[d+O]=b[O]}else a.push(b)}}class N{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function V(a){o.setTimeout(()=>{throw a},0)}function K(){var a=T;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class q{constructor(){this.h=this.g=null}add(l,d){const p=B.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var B=new N(()=>new te,a=>a.reset());class te{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ee,H=!1,T=new q,_=()=>{const a=Promise.resolve(void 0);ee=()=>{a.then(I)}};function I(){for(var a;a=K();){try{a.h.call(a.g)}catch(d){V(d)}var l=B;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}H=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function g(a){return/^[\s\xa0]*$/.test(a)}function j(a,l){y.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(j,y),j.prototype.init=function(a,l){const d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&j.Z.h.call(this)},j.prototype.h=function(){j.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var de="closure_listenable_"+(Math.random()*1e6|0),we=0;function et(a,l,d,p,b){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=b,this.key=++we,this.da=this.fa=!1}function Pe(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function tt(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function nn(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Kc(a){const l={};for(const d in a)l[d]=a[d];return l}const Hc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wc(a,l){let d,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(d in p)a[d]=p[d];for(let R=0;R<Hc.length;R++)d=Hc[R],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function $s(a){this.src=a,this.g={},this.h=0}$s.prototype.add=function(a,l,d,p,b){const R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);const O=Ao(a,l,p,b);return O>-1?(l=a[O],d||(l.fa=!1)):(l=new et(l,this.src,R,!!p,b),l.fa=d,a.push(l)),l};function vo(a,l){const d=l.type;if(d in a.g){var p=a.g[d],b=Array.prototype.indexOf.call(p,l,void 0),R;(R=b>=0)&&Array.prototype.splice.call(p,b,1),R&&(Pe(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ao(a,l,d,p){for(let b=0;b<a.length;++b){const R=a[b];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==p)return b}return-1}var bo="closure_lm_"+(Math.random()*1e6|0),Ro={};function Qc(a,l,d,p,b){if(Array.isArray(l)){for(let R=0;R<l.length;R++)Qc(a,l[R],d,p,b);return null}return d=Xc(d),a&&a[de]?a.J(l,d,c(p)?!!p.capture:!1,b):am(a,l,d,!1,p,b)}function am(a,l,d,p,b,R){if(!l)throw Error("Invalid event type");const O=c(b)?!!b.capture:!!b;let W=Po(a);if(W||(a[bo]=W=new $s(a)),d=W.add(l,d,p,O,R),d.proxy)return d;if(p=cm(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)w||(b=O),b===void 0&&(b=!1),a.addEventListener(l.toString(),p,b);else if(a.attachEvent)a.attachEvent(Yc(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function cm(){function a(d){return l.call(a.src,a.listener,d)}const l=um;return a}function Jc(a,l,d,p,b){if(Array.isArray(l))for(var R=0;R<l.length;R++)Jc(a,l[R],d,p,b);else p=c(p)?!!p.capture:!!p,d=Xc(d),a&&a[de]?(a=a.i,R=String(l).toString(),R in a.g&&(l=a.g[R],d=Ao(l,d,p,b),d>-1&&(Pe(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[R],a.h--)))):a&&(a=Po(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Ao(l,d,p,b)),(d=a>-1?l[a]:null)&&So(d))}function So(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[de])vo(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(Yc(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Po(l))?(vo(d,a),d.h==0&&(d.src=null,l[bo]=null)):Pe(a)}}}function Yc(a){return a in Ro?Ro[a]:Ro[a]="on"+a}function um(a,l){if(a.da)a=!0;else{l=new j(l,this);const d=a.listener,p=a.ha||a.src;a.fa&&So(a),a=d.call(p,l)}return a}function Po(a){return a=a[bo],a instanceof $s?a:null}var Co="__closure_events_fn_"+(Math.random()*1e9>>>0);function Xc(a){return typeof a=="function"?a:(a[Co]||(a[Co]=function(l){return a.handleEvent(l)}),a[Co])}function ke(){v.call(this),this.i=new $s(this),this.M=this,this.G=null}m(ke,v),ke.prototype[de]=!0,ke.prototype.removeEventListener=function(a,l,d,p){Jc(this,a,l,d,p)};function Le(a,l){var d,p=a.G;if(p)for(d=[];p;p=p.G)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new y(l,a);else if(l instanceof y)l.target=l.target||a;else{var b=l;l=new y(p,a),Wc(l,b)}b=!0;let R,O;if(d)for(O=d.length-1;O>=0;O--)R=l.g=d[O],b=Gs(R,p,!0,l)&&b;if(R=l.g=a,b=Gs(R,p,!0,l)&&b,b=Gs(R,p,!1,l)&&b,d)for(O=0;O<d.length;O++)R=l.g=d[O],b=Gs(R,p,!1,l)&&b}ke.prototype.N=function(){if(ke.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let p=0;p<d.length;p++)Pe(d[p]);delete a.g[l],a.h--}}this.G=null},ke.prototype.J=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},ke.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Gs(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let R=0;R<l.length;++R){const O=l[R];if(O&&!O.da&&O.capture==d){const W=O.listener,ve=O.ha||O.src;O.fa&&vo(a.i,O),b=W.call(ve,p)!==!1&&b}}return b&&!p.defaultPrevented}function lm(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Zc(a){a.g=lm(()=>{a.g=null,a.i&&(a.i=!1,Zc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class hm extends v{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Zc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Sr(a){v.call(this),this.h=a,this.g={}}m(Sr,v);var eu=[];function tu(a){tt(a.g,function(l,d){this.g.hasOwnProperty(d)&&So(l)},a),a.g={}}Sr.prototype.N=function(){Sr.Z.N.call(this),tu(this)},Sr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Vo=o.JSON.stringify,dm=o.JSON.parse,fm=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function nu(){}function ru(){}var Pr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function xo(){y.call(this,"d")}m(xo,y);function ko(){y.call(this,"c")}m(ko,y);var rn={},su=null;function Ks(){return su=su||new ke}rn.Ia="serverreachability";function iu(a){y.call(this,rn.Ia,a)}m(iu,y);function Cr(a){const l=Ks();Le(l,new iu(l))}rn.STAT_EVENT="statevent";function ou(a,l){y.call(this,rn.STAT_EVENT,a),this.stat=l}m(ou,y);function Fe(a){const l=Ks();Le(l,new ou(l,a))}rn.Ja="timingevent";function au(a,l){y.call(this,rn.Ja,a),this.size=l}m(au,y);function Vr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function xr(){this.g=!0}xr.prototype.ua=function(){this.g=!1};function pm(a,l,d,p,b,R){a.info(function(){if(a.g)if(R){var O="",W=R.split("&");for(let ie=0;ie<W.length;ie++){var ve=W[ie].split("=");if(ve.length>1){const Re=ve[0];ve=ve[1];const rt=Re.split("_");O=rt.length>=2&&rt[1]=="type"?O+(Re+"="+ve+"&"):O+(Re+"=redacted&")}}}else O=null;else O=R;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+l+`
`+d+`
`+O})}function mm(a,l,d,p,b,R,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+l+`
`+d+`
`+R+" "+O})}function Ln(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+_m(a,d)+(p?" "+p:"")})}function gm(a,l){a.info(function(){return"TIMEOUT: "+l})}xr.prototype.info=function(){};function _m(a,l){if(!a.g)return l;if(!l)return null;try{const R=JSON.parse(l);if(R){for(a=0;a<R.length;a++)if(Array.isArray(R[a])){var d=R[a];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var b=p[0];if(b!="noop"&&b!="stop"&&b!="close")for(let O=1;O<p.length;O++)p[O]=""}}}}return Vo(R)}catch{return l}}var Hs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},cu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},uu;function Do(){}m(Do,nu),Do.prototype.g=function(){return new XMLHttpRequest},uu=new Do;function kr(a){return encodeURIComponent(String(a))}function ym(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function At(a,l,d,p){this.j=a,this.i=l,this.l=d,this.S=p||1,this.V=new Sr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new lu}function lu(){this.i=null,this.g="",this.h=!1}var hu={},No={};function Oo(a,l,d){a.M=1,a.A=Qs(nt(l)),a.u=d,a.R=!0,du(a,null)}function du(a,l){a.F=Date.now(),Ws(a),a.B=nt(a.A);var d=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),bu(d.i,"t",p),a.C=0,d=a.j.L,a.h=new lu,a.g=qu(a.j,d?l:null,!a.u),a.P>0&&(a.O=new hm(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,p=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(eu[0]=b.toString()),b=eu);for(let R=0;R<b.length;R++){const O=Qc(d,b[R],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.J?Kc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Cr(),pm(a.i,a.v,a.B,a.l,a.S,a.u)}At.prototype.ba=function(a){a=a.target;const l=this.O;l&&St(a)==3?l.j():this.Y(a)},At.prototype.Y=function(a){try{if(a==this.g)e:{const W=St(this.g),ve=this.g.ya(),ie=this.g.ca();if(!(W<3)&&(W!=3||this.g&&(this.h.h||this.g.la()||ku(this.g)))){this.K||W!=4||ve==7||(ve==8||ie<=0?Cr(3):Cr(2)),Mo(this);var l=this.g.ca();this.X=l;var d=Im(this);if(this.o=l==200,mm(this.i,this.v,this.B,this.l,this.S,W,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,b=this.g;if((p=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(p)){var R=p;break t}}R=null}if(a=R)Ln(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Lo(this,a);else{this.o=!1,this.m=3,Fe(12),sn(this),Dr(this);break e}}if(this.R){a=!0;let Re;for(;!this.K&&this.C<d.length;)if(Re=Tm(this,d),Re==No){W==4&&(this.m=4,Fe(14),a=!1),Ln(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==hu){this.m=4,Fe(15),Ln(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Ln(this.i,this.l,Re,null),Lo(this,Re);if(fu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),W!=4||d.length!=0||this.h.h||(this.m=1,Fe(16),a=!1),this.o=this.o&&a,!a)Ln(this.i,this.l,d,"[Invalid Chunked Response]"),sn(this),Dr(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Go(O),O.P=!0,Fe(11))}}else Ln(this.i,this.l,d,null),Lo(this,d);W==4&&sn(this),this.o&&!this.K&&(W==4?Uu(this.j,this):(this.o=!1,Ws(this)))}else Nm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Fe(12)):(this.m=0,Fe(13)),sn(this),Dr(this)}}}catch{}finally{}};function Im(a){if(!fu(a))return a.g.la();const l=ku(a.g);if(l==="")return"";let d="";const p=l.length,b=St(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return sn(a),Dr(a),"";a.h.i=new o.TextDecoder}for(let R=0;R<p;R++)a.h.h=!0,d+=a.h.i.decode(l[R],{stream:!(b&&R==p-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function fu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Tm(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?No:(d=Number(l.substring(d,p)),isNaN(d)?hu:(p+=1,p+d>l.length?No:(l=l.slice(p,p+d),a.C=p+d,l)))}At.prototype.cancel=function(){this.K=!0,sn(this)};function Ws(a){a.T=Date.now()+a.H,pu(a,a.H)}function pu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Vr(h(a.aa,a),l)}function Mo(a){a.D&&(o.clearTimeout(a.D),a.D=null)}At.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(gm(this.i,this.B),this.M!=2&&(Cr(),Fe(17)),sn(this),this.m=2,Dr(this)):pu(this,this.T-a)};function Dr(a){a.j.I==0||a.K||Uu(a.j,a)}function sn(a){Mo(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,tu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Lo(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Fo(d.h,a))){if(!a.L&&Fo(d.h,a)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)ei(d),Xs(d);else break e;$o(d),Fe(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Vr(h(d.Va,d),6e3));_u(d.h)<=1&&d.ta&&(d.ta=void 0)}else an(d,11)}else if((a.L||d.g==a)&&ei(d),!g(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let ie=b[l];const Re=ie[0];if(!(Re<=d.K))if(d.K=Re,ie=ie[1],d.I==2)if(ie[0]=="c"){d.M=ie[1],d.ba=ie[2];const rt=ie[3];rt!=null&&(d.ka=rt,d.j.info("VER="+d.ka));const cn=ie[4];cn!=null&&(d.za=cn,d.j.info("SVER="+d.za));const Pt=ie[5];Pt!=null&&typeof Pt=="number"&&Pt>0&&(p=1.5*Pt,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ct=a.g;if(Ct){const ni=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ni){var R=p.h;R.g||ni.indexOf("spdy")==-1&&ni.indexOf("quic")==-1&&ni.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Uo(R,R.h),R.h=null))}if(p.G){const Ko=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;Ko&&(p.wa=Ko,ue(p.J,p.G,Ko))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var O=a;if(p.na=zu(p,p.L?p.ba:null,p.W),O.L){yu(p.h,O);var W=O,ve=p.O;ve&&(W.H=ve),W.D&&(Mo(W),Ws(W)),p.g=O}else Lu(p);d.i.length>0&&Zs(d)}else ie[0]!="stop"&&ie[0]!="close"||an(d,7);else d.I==3&&(ie[0]=="stop"||ie[0]=="close"?ie[0]=="stop"?an(d,7):qo(d):ie[0]!="noop"&&d.l&&d.l.qa(ie),d.A=0)}}Cr(4)}catch{}}var Em=class{constructor(a,l){this.g=a,this.map=l}};function mu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function _u(a){return a.h?1:a.g?a.g.size:0}function Fo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Uo(a,l){a.g?a.g.add(l):a.h=l}function yu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}mu.prototype.cancel=function(){if(this.i=Iu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Iu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return S(a.i)}var Tu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function wm(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const p=a[d].indexOf("=");let b,R=null;p>=0?(b=a[d].substring(0,p),R=a[d].substring(p+1)):b=a[d],l(b,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function bt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof bt?(this.l=a.l,Nr(this,a.j),this.o=a.o,this.g=a.g,Or(this,a.u),this.h=a.h,Bo(this,Ru(a.i)),this.m=a.m):a&&(l=String(a).match(Tu))?(this.l=!1,Nr(this,l[1]||"",!0),this.o=Mr(l[2]||""),this.g=Mr(l[3]||"",!0),Or(this,l[4]),this.h=Mr(l[5]||"",!0),Bo(this,l[6]||"",!0),this.m=Mr(l[7]||"")):(this.l=!1,this.i=new Fr(null,this.l))}bt.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Lr(l,Eu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Lr(l,Eu,!0),"@"),a.push(kr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Lr(d,d.charAt(0)=="/"?bm:Am,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Lr(d,Sm)),a.join("")},bt.prototype.resolve=function(a){const l=nt(this);let d=!!a.j;d?Nr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var p=a.h;if(d)Or(l,a.u);else if(d=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var b=l.h.lastIndexOf("/");b!=-1&&(p=l.h.slice(0,b+1)+p)}if(b=p,b==".."||b==".")p="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){p=b.lastIndexOf("/",0)==0,b=b.split("/");const R=[];for(let O=0;O<b.length;){const W=b[O++];W=="."?p&&O==b.length&&R.push(""):W==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),p&&O==b.length&&R.push("")):(R.push(W),p=!0)}p=R.join("/")}else p=b}return d?l.h=p:d=a.i.toString()!=="",d?Bo(l,Ru(a.i)):d=!!a.m,d&&(l.m=a.m),l};function nt(a){return new bt(a)}function Nr(a,l,d){a.j=d?Mr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Or(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Bo(a,l,d){l instanceof Fr?(a.i=l,Pm(a.i,a.l)):(d||(l=Lr(l,Rm)),a.i=new Fr(l,a.l))}function ue(a,l,d){a.i.set(l,d)}function Qs(a){return ue(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Mr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Lr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,vm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function vm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Eu=/[#\/\?@]/g,Am=/[#\?:]/g,bm=/[#\?]/g,Rm=/[#\?@]/g,Sm=/#/g;function Fr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function on(a){a.g||(a.g=new Map,a.h=0,a.i&&wm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Fr.prototype,r.add=function(a,l){on(this),this.i=null,a=Fn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function wu(a,l){on(a),l=Fn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function vu(a,l){return on(a),l=Fn(a,l),a.g.has(l)}r.forEach=function(a,l){on(this),this.g.forEach(function(d,p){d.forEach(function(b){a.call(l,b,p,this)},this)},this)};function Au(a,l){on(a);let d=[];if(typeof l=="string")vu(a,l)&&(d=d.concat(a.g.get(Fn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return on(this),this.i=null,a=Fn(this,a),vu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Au(this,a),a.length>0?String(a[0]):l):l};function bu(a,l,d){wu(a,l),d.length>0&&(a.i=null,a.g.set(Fn(a,l),S(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const b=kr(d);d=Au(this,d);for(let R=0;R<d.length;R++){let O=b;d[R]!==""&&(O+="="+kr(d[R])),a.push(O)}}return this.i=a.join("&")};function Ru(a){const l=new Fr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Fn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Pm(a,l){l&&!a.j&&(on(a),a.i=null,a.g.forEach(function(d,p){const b=p.toLowerCase();p!=b&&(wu(this,p),bu(this,b,d))},a)),a.j=l}function Cm(a,l){const d=new xr;if(o.Image){const p=new Image;p.onload=f(Rt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Rt,d,"TestLoadImage: error",!1,l,p),p.onabort=f(Rt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Rt,d,"TestLoadImage: timeout",!1,l,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Vm(a,l){const d=new xr,p=new AbortController,b=setTimeout(()=>{p.abort(),Rt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(R=>{clearTimeout(b),R.ok?Rt(d,"TestPingServer: ok",!0,l):Rt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Rt(d,"TestPingServer: error",!1,l)})}function Rt(a,l,d,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(d)}catch{}}function xm(){this.g=new fm}function jo(a){this.i=a.Sb||null,this.h=a.ab||!1}m(jo,nu),jo.prototype.g=function(){return new Js(this.i,this.h)};function Js(a,l){ke.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Js,ke),r=Js.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Br(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ur(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Br(this)),this.g&&(this.readyState=3,Br(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Su(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Su(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Ur(this):Br(this),this.readyState==3&&Su(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,Ur(this))},r.Na=function(a){this.g&&(this.response=a,Ur(this))},r.ga=function(){this.g&&Ur(this)};function Ur(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Br(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Br(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Js.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Pu(a){let l="";return tt(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function zo(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Pu(d),typeof a=="string"?d!=null&&kr(d):ue(a,l,d))}function pe(a){ke.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(pe,ke);var km=/^https?$/i,Dm=["POST","PUT"];r=pe.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():uu.g(),this.g.onreadystatechange=E(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(R){Cu(this,R);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)d.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Dm,l,void 0)>=0)||p||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(R){Cu(this,R)}};function Cu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Vu(a),Ys(a)}function Vu(a){a.A||(a.A=!0,Le(a,"complete"),Le(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Le(this,"complete"),Le(this,"abort"),Ys(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ys(this,!0)),pe.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?xu(this):this.Xa())},r.Xa=function(){xu(this)};function xu(a){if(a.h&&typeof i<"u"){if(a.v&&St(a)==4)setTimeout(a.Ca.bind(a),0);else if(Le(a,"readystatechange"),St(a)==4){a.h=!1;try{const R=a.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=R===0){let O=String(a.D).match(Tu)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),p=!km.test(O?O.toLowerCase():"")}d=p}if(d)Le(a,"complete"),Le(a,"success");else{a.o=6;try{var b=St(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",Vu(a)}}finally{Ys(a)}}}}function Ys(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Le(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function St(a){return a.g?a.g.readyState:0}r.ca=function(){try{return St(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),dm(l)}};function ku(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Nm(a){const l={};a=(a.g&&St(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(g(a[p]))continue;var d=ym(a[p]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=l[b]||[];l[b]=R,R.push(d)}nn(l,function(p){return p.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function jr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Du(a){this.za=0,this.i=[],this.j=new xr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=jr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=jr("baseRetryDelayMs",5e3,a),this.Za=jr("retryDelaySeedMs",1e4,a),this.Ta=jr("forwardChannelMaxRetries",2,a),this.va=jr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new mu(a&&a.concurrentRequestLimit),this.Ba=new xm,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Du.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,p){Fe(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=zu(this,null,this.W),Zs(this)};function qo(a){if(Nu(a),a.I==3){var l=a.V++,d=nt(a.J);if(ue(d,"SID",a.M),ue(d,"RID",l),ue(d,"TYPE","terminate"),zr(a,d),l=new At(a,a.j,l),l.M=2,l.A=Qs(nt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=qu(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ws(l)}ju(a)}function Xs(a){a.g&&(Go(a),a.g.cancel(),a.g=null)}function Nu(a){Xs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ei(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Zs(a){if(!gu(a.h)&&!a.m){a.m=!0;var l=a.Ea;ee||_(),H||(ee(),H=!0),T.add(l,a),a.D=0}}function Om(a,l){return _u(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Vr(h(a.Ea,a,l),Bu(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new At(this,this.j,a);let R=this.o;if(this.U&&(R?(R=Kc(R),Wc(R,this.U)):R=this.U),this.u!==null||this.R||(b.J=R,R=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Mu(this,b,l),d=nt(this.J),ue(d,"RID",a),ue(d,"CVER",22),this.G&&ue(d,"X-HTTP-Session-Id",this.G),zr(this,d),R&&(this.R?l="headers="+kr(Pu(R))+"&"+l:this.u&&zo(d,this.u,R)),Uo(this.h,b),this.Ra&&ue(d,"TYPE","init"),this.S?(ue(d,"$req",l),ue(d,"SID","null"),b.U=!0,Oo(b,d,null)):Oo(b,d,l),this.I=2}}else this.I==3&&(a?Ou(this,a):this.i.length==0||gu(this.h)||Ou(this))};function Ou(a,l){var d;l?d=l.l:d=a.V++;const p=nt(a.J);ue(p,"SID",a.M),ue(p,"RID",d),ue(p,"AID",a.K),zr(a,p),a.u&&a.o&&zo(p,a.u,a.o),d=new At(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Mu(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Uo(a.h,d),Oo(d,p,l)}function zr(a,l){a.H&&tt(a.H,function(d,p){ue(l,p,d)}),a.l&&tt({},function(d,p){ue(l,p,d)})}function Mu(a,l,d){d=Math.min(a.i.length,d);const p=a.l?h(a.l.Ka,a.l,a):null;e:{var b=a.i;let W=-1;for(;;){const ve=["count="+d];W==-1?d>0?(W=b[0].g,ve.push("ofs="+W)):W=0:ve.push("ofs="+W);let ie=!0;for(let Re=0;Re<d;Re++){var R=b[Re].g;const rt=b[Re].map;if(R-=W,R<0)W=Math.max(0,b[Re].g-100),ie=!1;else try{R="req"+R+"_"||"";try{var O=rt instanceof Map?rt:Object.entries(rt);for(const[cn,Pt]of O){let Ct=Pt;c(Pt)&&(Ct=Vo(Pt)),ve.push(R+cn+"="+encodeURIComponent(Ct))}}catch(cn){throw ve.push(R+"type="+encodeURIComponent("_badmap")),cn}}catch{p&&p(rt)}}if(ie){O=ve.join("&");break e}}O=void 0}return a=a.i.splice(0,d),l.G=a,O}function Lu(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;ee||_(),H||(ee(),H=!0),T.add(l,a),a.A=0}}function $o(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Vr(h(a.Da,a),Bu(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Fu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Vr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Fe(10),Xs(this),Fu(this))};function Go(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Fu(a){a.g=new At(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=nt(a.na);ue(l,"RID","rpc"),ue(l,"SID",a.M),ue(l,"AID",a.K),ue(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ue(l,"TO",a.ia),ue(l,"TYPE","xmlhttp"),zr(a,l),a.u&&a.o&&zo(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Qs(nt(l)),d.u=null,d.R=!0,du(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Xs(this),$o(this),Fe(19))};function ei(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Uu(a,l){var d=null;if(a.g==l){ei(a),Go(a),a.g=null;var p=2}else if(Fo(a.h,l))d=l.G,yu(a.h,l),p=1;else return;if(a.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=a.D;p=Ks(),Le(p,new au(p,d)),Zs(a)}else Lu(a);else if(b=l.m,b==3||b==0&&l.X>0||!(p==1&&Om(a,l)||p==2&&$o(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),b){case 1:an(a,5);break;case 4:an(a,10);break;case 3:an(a,6);break;default:an(a,2)}}}function Bu(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function an(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),p=a.Ua;const b=!p;p=new bt(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Nr(p,"https"),Qs(p),b?Cm(p.toString(),d):Vm(p.toString(),d)}else Fe(2);a.I=0,a.l&&a.l.pa(l),ju(a),Nu(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function ju(a){if(a.I=0,a.ja=[],a.l){const l=Iu(a.h);(l.length!=0||a.i.length!=0)&&(k(a.ja,l),k(a.ja,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.oa()}}function zu(a,l,d){var p=d instanceof bt?nt(d):new bt(d);if(p.g!="")l&&(p.g=l+"."+p.g),Or(p,p.u);else{var b=o.location;p=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const R=new bt(null);p&&Nr(R,p),l&&(R.g=l),b&&Or(R,b),d&&(R.h=d),p=R}return d=a.G,l=a.wa,d&&l&&ue(p,d,l),ue(p,"VER",a.ka),zr(a,p),p}function qu(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new pe(new jo({ab:d})):new pe(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function $u(){}r=$u.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ti(){}ti.prototype.g=function(a,l){return new qe(a,l)};function qe(a,l){ke.call(this),this.g=new Du(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!g(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!g(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Un(this)}m(qe,ke),qe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},qe.prototype.close=function(){qo(this.g)},qe.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Vo(a),a=d);l.i.push(new Em(l.Ya++,a)),l.I==3&&Zs(l)},qe.prototype.N=function(){this.g.l=null,delete this.j,qo(this.g),delete this.g,qe.Z.N.call(this)};function Gu(a){xo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(Gu,xo);function Ku(){ko.call(this),this.status=1}m(Ku,ko);function Un(a){this.g=a}m(Un,$u),Un.prototype.ra=function(){Le(this.g,"a")},Un.prototype.qa=function(a){Le(this.g,new Gu(a))},Un.prototype.pa=function(a){Le(this.g,new Ku)},Un.prototype.oa=function(){Le(this.g,"b")},ti.prototype.createWebChannel=ti.prototype.g,qe.prototype.send=qe.prototype.o,qe.prototype.open=qe.prototype.m,qe.prototype.close=qe.prototype.close,Jd=function(){return new ti},Qd=function(){return Ks()},Wd=rn,ya={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Hs.NO_ERROR=0,Hs.TIMEOUT=8,Hs.HTTP_ERROR=6,yi=Hs,cu.COMPLETE="complete",Hd=cu,ru.EventType=Pr,Pr.OPEN="a",Pr.CLOSE="b",Pr.ERROR="c",Pr.MESSAGE="d",ke.prototype.listen=ke.prototype.J,Qr=ru,pe.prototype.listenOnce=pe.prototype.K,pe.prototype.getLastError=pe.prototype.Ha,pe.prototype.getLastErrorCode=pe.prototype.ya,pe.prototype.getStatus=pe.prototype.ca,pe.prototype.getResponseJson=pe.prototype.La,pe.prototype.getResponseText=pe.prototype.la,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Fa,Kd=pe}).apply(typeof ii<"u"?ii:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
*/class Ce{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ce.UNAUTHENTICATED=new Ce(null),Ce.GOOGLE_CREDENTIALS=new Ce("google-credentials-uid"),Ce.FIRST_PARTY=new Ce("first-party-uid"),Ce.MOCK_USER=new Ce("mock-user");/**
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
 */let vr="12.12.0";function HI(r){vr=r}/**
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
 */const bn=new Ga("@firebase/firestore");function Kn(){return bn.logLevel}function x(r,...e){if(bn.logLevel<=J.DEBUG){const t=e.map(nc);bn.debug(`Firestore (${vr}): ${r}`,...t)}}function Ue(r,...e){if(bn.logLevel<=J.ERROR){const t=e.map(nc);bn.error(`Firestore (${vr}): ${r}`,...t)}}function Rn(r,...e){if(bn.logLevel<=J.WARN){const t=e.map(nc);bn.warn(`Firestore (${vr}): ${r}`,...t)}}function nc(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
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
 */function L(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Yd(r,n,t)}function Yd(r,e,t){let n=`FIRESTORE (${vr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw Ue(n),new Error(n)}function F(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Yd(e,s,n)}function G(r,e){return r}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Et{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Gt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class Xd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class WI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ce.UNAUTHENTICATED)))}shutdown(){}}class QI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class JI{constructor(e){this.t=e,this.currentUser=Ce.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new Gt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Gt,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Gt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new Xd(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new Ce(e)}}class YI{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Ce.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class XI{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new YI(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ce.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class bl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ZI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,He(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);const n=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new bl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new bl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function eT(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */class rc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=eT(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function $(r,e){return r<e?-1:r>e?1:0}function Ia(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return ea(s)===ea(i)?$(s,i):ea(s)?1:-1}return $(r.length,e.length)}const tT=55296,nT=57343;function ea(r){const e=r.charCodeAt(0);return e>=tT&&e<=nT}function or(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Zd(r){return r+"\0"}/**
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
 */const Rl="__name__";class st{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&L(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return st.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof st?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=st.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return $(e.length,t.length)}static compareSegments(e,t){const n=st.isNumericId(e),s=st.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?st.extractNumericId(e).compare(st.extractNumericId(t)):Ia(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return $t.fromString(e.substring(4,e.length-2))}}class Z extends st{construct(e,t,n){return new Z(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new Z(t)}static emptyPath(){return new Z([])}}const rT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends st{construct(e,t,n){return new fe(e,t,n)}static isValidIdentifier(e){return rT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Rl}static keyField(){return new fe([Rl])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
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
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(Z.fromString(e))}static fromName(e){return new M(Z.fromString(e).popFirst(5))}static empty(){return new M(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new Z(e.slice()))}}/**
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
 */function ef(r,e,t){if(!t)throw new D(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function sT(r,e,t,n){if(e===!0&&n===!0)throw new D(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Sl(r){if(!M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Pl(r){if(M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function tf(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function no(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L(12329,{type:typeof r})}function Kt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=no(r);throw new D(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
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
 */function Te(r,e){const t={typeString:r};return e&&(t.value=e),t}function Os(r,e){if(!tf(r))throw new D(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new D(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const Cl=-62135596800,Vl=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Vl);return new ne(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Cl)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vl}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Os(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Cl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:Te("string",ne._jsonSchemaVersion),seconds:Te("number"),nanoseconds:Te("number")};/**
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
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new ne(0,0))}static max(){return new U(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ds=-1;class Li{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Ta(r){return r.fields.find((e=>e.kind===2))}function hn(r){return r.fields.filter((e=>e.kind!==2))}Li.UNKNOWN_ID=-1;class Ii{constructor(e,t){this.fieldPath=e,this.kind=t}}class fs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new fs(0,Ke.min())}}function iT(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=U.fromTimestamp(n===1e9?new ne(t+1,0):new ne(t,n));return new Ke(s,M.empty(),e)}function nf(r){return new Ke(r.readTime,r.key,ds)}class Ke{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ke(U.min(),M.empty(),ds)}static max(){return new Ke(U.max(),M.empty(),ds)}}function sc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:$(r.largestBatchId,e.largestBatchId))}/**
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
 */const rf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Nn(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==rf)throw r;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,n)=>{t(e)}))}static reject(e){return new A(((t,n)=>{n(e)}))}static waitFor(e){return new A(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next((s=>s?A.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new A(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new A(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
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
 */const $e="SimpleDb";class ro{static open(e,t,n,s){try{return new ro(t,e.transaction(s,n))}catch(i){throw new ts(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Gt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new ts(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=ic(n.target.error);this.S.reject(new ts(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(x($e,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new aT(t)}}class Ht{static delete(e){return x($e,"Removing database:",e),pn(td().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!cd())return!1;if(Ht.F())return!0;const e=Ae(),t=Ht.M(e),n=0<t&&t<10,s=of(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,Ht.M(Ae())===12.2&&Ue("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(x($e,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new ts(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new D(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new ts(e,o))},s.onupgradeneeded=i=>{x($e,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{x($e,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ro.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),A.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(x($e,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function of(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class oT{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return pn(this.U.delete())}}class ts extends D{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function en(r){return r.name==="IndexedDbTransactionError"}class aT{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(x($e,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(x($e,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),pn(n)}add(e){return x($e,"ADD",this.store.name,e,e),pn(this.store.add(e))}get(e){return pn(this.store.get(e)).next((t=>(t===void 0&&(t=null),x($e,"GET",this.store.name,e,t),t)))}delete(e){return x($e,"DELETE",this.store.name,e),pn(this.store.delete(e))}count(){return x($e,"COUNT",this.store.name),pn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(n),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}X(e,t){x($e,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new A(((n,s)=>{t.onerror=i=>{const o=ic(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}H(e,t){const n=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new oT(c),h=t(c.primaryKey,c.value,u);if(h instanceof A){const f=h.catch((m=>(u.done(),A.reject(m))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function pn(r){return new A(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=ic(n.target.error);t(s)}}))}let xl=!1;function ic(r){const e=Ht.M(Ae());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return xl||(xl=!0,setTimeout((()=>{throw n}),0)),n}}return r}const ns="IndexBackfiller";class cT{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){x(ns,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();x(ns,`Documents written: ${t}`)}catch(t){en(t)?x(ns,"Ignoring IndexedDB error during index backfill: ",t):await Nn(t)}await this.re(6e4)}))}}class uT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return x(ns,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(x(ns,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=nf(i);sc(o,n)>0&&(n=o)})),new Ke(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Qe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Qe.ce=-1;/**
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
 */const In=-1;function so(r){return r==null}function ps(r){return r===0&&1/r==-1/0}function lT(r){return typeof r=="number"&&Number.isInteger(r)&&!ps(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const Fi="";function Me(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=kl(e)),e=hT(r.get(t),e);return kl(e)}function hT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Fi:t+="";break;default:t+=i}}return t}function kl(r){return r+Fi+""}function it(r){const e=r.length;if(F(e>=2,64408,{path:r}),e===2)return F(r.charAt(0)===Fi&&r.charAt(1)==="",56145,{path:r}),Z.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Fi,i);switch((o<0||o>t)&&L(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:L(61167,{path:r})}i=o+2}return new Z(n)}/**
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
 */const dn="remoteDocuments",Ms="owner",Bn="owner",ms="mutationQueues",dT="userId",Ye="mutations",Dl="batchId",yn="userMutationsIndex",Nl=["userId","batchId"];/**
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
 */function Ti(r,e){return[r,Me(e)]}function af(r,e,t){return[r,Me(e),t]}const fT={},ar="documentMutations",Ui="remoteDocumentsV14",pT=["prefixPath","collectionGroup","readTime","documentId"],Ei="documentKeyIndex",mT=["prefixPath","collectionGroup","documentId"],cf="collectionGroupIndex",gT=["collectionGroup","readTime","prefixPath","documentId"],gs="remoteDocumentGlobal",Ea="remoteDocumentGlobalKey",cr="targets",uf="queryTargetsIndex",_T=["canonicalId","targetId"],ur="targetDocuments",yT=["targetId","path"],oc="documentTargetsIndex",IT=["path","targetId"],Bi="targetGlobalKey",Tn="targetGlobal",_s="collectionParents",TT=["collectionId","parent"],lr="clientMetadata",ET="clientId",io="bundles",wT="bundleId",oo="namedQueries",vT="name",ac="indexConfiguration",AT="indexId",wa="collectionGroupIndex",bT="collectionGroup",rs="indexState",RT=["indexId","uid"],lf="sequenceNumberIndex",ST=["uid","sequenceNumber"],ss="indexEntries",PT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],hf="documentKeyIndex",CT=["indexId","uid","orderedDocumentKey"],ao="documentOverlays",VT=["userId","collectionPath","documentId"],va="collectionPathOverlayIndex",xT=["userId","collectionPath","largestBatchId"],df="collectionGroupOverlayIndex",kT=["userId","collectionGroup","largestBatchId"],cc="globals",DT="name",ff=[ms,Ye,ar,dn,cr,Ms,Tn,ur,lr,gs,_s,io,oo],NT=[...ff,ao],pf=[ms,Ye,ar,Ui,cr,Ms,Tn,ur,lr,gs,_s,io,oo,ao],mf=pf,uc=[...mf,ac,rs,ss],OT=uc,gf=[...uc,cc],MT=gf;/**
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
 */class Aa extends sf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function be(r,e){const t=G(r);return Ht.O(t.le,e)}/**
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
 */function Ol(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function tn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function _f(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||Ve.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ve.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ve.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new oi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new oi(this.root,e,this.comparator,!1)}getReverseIterator(){return new oi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new oi(this.root,e,this.comparator,!0)}}class oi{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ve{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Ve.RED,this.left=s??Ve.EMPTY,this.right=i??Ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Ve(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ve.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}}Ve.EMPTY=null,Ve.RED=!0,Ve.BLACK=!1;Ve.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Ve(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class se{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ml(this.data.getIterator())}getIteratorFrom(e){return new Ml(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof se)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new se(this.comparator);return t.data=e,t}}class Ml{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function jn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class je{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new je([])}unionWith(e){let t=new se(fe.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return or(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
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
 */class yf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ee{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new yf("Invalid base64 string: "+i):i}})(e);return new Ee(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Ee(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ee.EMPTY_BYTE_STRING=new Ee("");const LT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function It(r){if(F(!!r,39018),typeof r=="string"){let e=0;const t=LT.exec(r);if(F(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:le(r.seconds),nanos:le(r.nanos)}}function le(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Tt(r){return typeof r=="string"?Ee.fromBase64String(r):Ee.fromUint8Array(r)}/**
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
 */const If="server_timestamp",Tf="__type__",Ef="__previous_value__",wf="__local_write_time__";function lc(r){return(r?.mapValue?.fields||{})[Tf]?.stringValue===If}function co(r){const e=r.mapValue.fields[Ef];return lc(e)?co(e):e}function ys(r){const e=It(r.mapValue.fields[wf].timestampValue);return new ne(e.seconds,e.nanos)}/**
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
 */class FT{constructor(e,t,n,s,i,o,c,u,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const Is="(default)";class Sn{constructor(e,t){this.projectId=e,this.database=t||Is}static empty(){return new Sn("","")}get isDefaultDatabase(){return this.database===Is}isEqual(e){return e instanceof Sn&&e.projectId===this.projectId&&e.database===this.database}}function UT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Sn(r.options.projectId,e)}/**
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
 */const hc="__type__",vf="__max__",Bt={mapValue:{fields:{__type__:{stringValue:vf}}}},dc="__vector__",hr="value",wi={nullValue:"NULL_VALUE"};function Jt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?lc(r)?4:Af(r)?9007199254740991:uo(r)?10:11:L(28295,{value:r})}function lt(r,e){if(r===e)return!0;const t=Jt(r);if(t!==Jt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ys(r).isEqual(ys(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=It(s.timestampValue),c=It(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return Tt(s.bytesValue).isEqual(Tt(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return le(s.geoPointValue.latitude)===le(i.geoPointValue.latitude)&&le(s.geoPointValue.longitude)===le(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return le(s.integerValue)===le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=le(s.doubleValue),c=le(i.doubleValue);return o===c?ps(o)===ps(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return or(r.arrayValue.values||[],e.arrayValue.values||[],lt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Ol(o)!==Ol(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!lt(o[u],c[u])))return!1;return!0})(r,e);default:return L(52216,{left:r})}}function Ts(r,e){return(r.values||[]).find((t=>lt(t,e)))!==void 0}function Yt(r,e){if(r===e)return 0;const t=Jt(r),n=Jt(e);if(t!==n)return $(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=le(i.integerValue||i.doubleValue),u=le(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return Ll(r.timestampValue,e.timestampValue);case 4:return Ll(ys(r),ys(e));case 5:return Ia(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=Tt(i),u=Tt(o);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=$(c[h],u[h]);if(f!==0)return f}return $(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=$(le(i.latitude),le(o.latitude));return c!==0?c:$(le(i.longitude),le(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Fl(r.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},h=c[hr]?.arrayValue,f=u[hr]?.arrayValue,m=$(h?.values?.length||0,f?.values?.length||0);return m!==0?m:Fl(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Bt.mapValue&&o===Bt.mapValue)return 0;if(i===Bt.mapValue)return 1;if(o===Bt.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const E=Ia(u[m],f[m]);if(E!==0)return E;const S=Yt(c[u[m]],h[f[m]]);if(S!==0)return S}return $(u.length,f.length)})(r.mapValue,e.mapValue);default:throw L(23264,{he:t})}}function Ll(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return $(r,e);const t=It(r),n=It(e),s=$(t.seconds,n.seconds);return s!==0?s:$(t.nanos,n.nanos)}function Fl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Yt(t[s],n[s]);if(i)return i}return $(t.length,n.length)}function dr(r){return ba(r)}function ba(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=It(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Tt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return M.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=ba(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${ba(t.fields[o])}`;return s+"}"})(r.mapValue):L(61005,{value:r})}function vi(r){switch(Jt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=co(r);return e?16+vi(e):16;case 5:return 2*r.stringValue.length;case 6:return Tt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+vi(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return tn(n.fields,((i,o)=>{s+=i.length+vi(o)})),s})(r.mapValue);default:throw L(13486,{value:r})}}function Es(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ra(r){return!!r&&"integerValue"in r}function ws(r){return!!r&&"arrayValue"in r}function Ul(r){return!!r&&"nullValue"in r}function Bl(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ai(r){return!!r&&"mapValue"in r}function uo(r){return(r?.mapValue?.fields||{})[hc]?.stringValue===dc}function is(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return tn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=is(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=is(r.arrayValue.values[t]);return e}return{...r}}function Af(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===vf}const bf={mapValue:{fields:{[hc]:{stringValue:dc},[hr]:{arrayValue:{}}}}};function BT(r){return"nullValue"in r?wi:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Es(Sn.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?uo(r)?bf:{mapValue:{}}:L(35942,{value:r})}function jT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Es(Sn.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?bf:"mapValue"in r?uo(r)?{mapValue:{}}:Bt:L(61959,{value:r})}function jl(r,e){const t=Yt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function zl(r,e){const t=Yt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
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
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ai(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=is(t)}setAll(e){let t=fe.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=is(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ai(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return lt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ai(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){tn(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new Oe(is(this.value))}}function Rf(r){const e=[];return tn(r.fields,((t,n)=>{const s=new fe([t]);if(Ai(n)){const i=Rf(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new je(e)}/**
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
 */class me{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new me(e,0,U.min(),U.min(),U.min(),Oe.empty(),0)}static newFoundDocument(e,t,n,s){return new me(e,1,t,U.min(),n,s,0)}static newNoDocument(e,t){return new me(e,2,t,U.min(),U.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new me(e,3,t,U.min(),U.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class fr{constructor(e,t){this.position=e,this.inclusive=t}}function ql(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=Yt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function $l(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!lt(r.position[t],e.position[t]))return!1;return!0}/**
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
 */class vs{constructor(e,t="asc"){this.field=e,this.dir=t}}function zT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
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
 */class Sf{}class Y extends Sf{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new qT(e,t,n):t==="array-contains"?new KT(e,n):t==="in"?new Df(e,n):t==="not-in"?new HT(e,n):t==="array-contains-any"?new WT(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new $T(e,n):new GT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Yt(t,this.value)):t!==null&&Jt(this.value)===Jt(t)&&this.matchesComparison(Yt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class re extends Sf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new re(e,t)}matches(e){return pr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function pr(r){return r.op==="and"}function Sa(r){return r.op==="or"}function fc(r){return Pf(r)&&pr(r)}function Pf(r){for(const e of r.filters)if(e instanceof re)return!1;return!0}function Pa(r){if(r instanceof Y)return r.field.canonicalString()+r.op.toString()+dr(r.value);if(fc(r))return r.filters.map((e=>Pa(e))).join(",");{const e=r.filters.map((t=>Pa(t))).join(",");return`${r.op}(${e})`}}function Cf(r,e){return r instanceof Y?(function(n,s){return s instanceof Y&&n.op===s.op&&n.field.isEqual(s.field)&&lt(n.value,s.value)})(r,e):r instanceof re?(function(n,s){return s instanceof re&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&Cf(o,s.filters[c])),!0):!1})(r,e):void L(19439)}function Vf(r,e){const t=r.filters.concat(e);return re.create(t,r.op)}function xf(r){return r instanceof Y?(function(t){return`${t.field.canonicalString()} ${t.op} ${dr(t.value)}`})(r):r instanceof re?(function(t){return t.op.toString()+" {"+t.getFilters().map(xf).join(" ,")+"}"})(r):"Filter"}class qT extends Y{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class $T extends Y{constructor(e,t){super(e,"in",t),this.keys=kf("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class GT extends Y{constructor(e,t){super(e,"not-in",t),this.keys=kf("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function kf(r,e){return(e.arrayValue?.values||[]).map((t=>M.fromName(t.referenceValue)))}class KT extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ws(t)&&Ts(t.arrayValue,this.value)}}class Df extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ts(this.value.arrayValue,t)}}class HT extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ts(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ts(this.value.arrayValue,t)}}class WT extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ws(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>Ts(this.value.arrayValue,n)))}}/**
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
 */class QT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Ca(r,e=null,t=[],n=[],s=null,i=null,o=null){return new QT(r,e,t,n,s,i,o)}function Pn(r){const e=G(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Pa(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),so(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>dr(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>dr(n))).join(",")),e.Te=t}return e.Te}function Ls(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!zT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Cf(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!$l(r.startAt,e.startAt)&&$l(r.endAt,e.endAt)}function ji(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function zi(r,e){return r.filters.filter((t=>t instanceof Y&&t.field.isEqual(e)))}function Gl(r,e,t){let n=wi,s=!0;for(const i of zi(r,e)){let o=wi,c=!0;switch(i.op){case"<":case"<=":o=BT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=wi}jl({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];jl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Kl(r,e,t){let n=Bt,s=!0;for(const i of zi(r,e)){let o=Bt,c=!0;switch(i.op){case">=":case">":o=jT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Bt}zl({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];zl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Ar{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function JT(r,e,t,n,s,i,o,c){return new Ar(r,e,t,n,s,i,o,c)}function lo(r){return new Ar(r)}function Hl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function YT(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Nf(r){return r.collectionGroup!==null}function os(r){const e=G(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new se(fe.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new vs(i,n))})),t.has(fe.keyField().canonicalString())||e.Ee.push(new vs(fe.keyField(),n))}return e.Ee}function Je(r){const e=G(r);return e.Ie||(e.Ie=XT(e,os(r))),e.Ie}function XT(r,e){if(r.limitType==="F")return Ca(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new vs(s.field,i)}));const t=r.endAt?new fr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new fr(r.startAt.position,r.startAt.inclusive):null;return Ca(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Va(r,e){const t=r.filters.concat([e]);return new Ar(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function ZT(r,e){const t=r.explicitOrderBy.concat([e]);return new Ar(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function xa(r,e,t){return new Ar(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function ho(r,e){return Ls(Je(r),Je(e))&&r.limitType===e.limitType}function Of(r){return`${Pn(Je(r))}|lt:${r.limitType}`}function Hn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>xf(s))).join(", ")}]`),so(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>dr(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>dr(s))).join(",")),`Target(${n})`})(Je(r))}; limitType=${r.limitType})`}function Fs(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of os(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,u){const h=ql(o,c,u);return o.inclusive?h<=0:h<0})(n.startAt,os(n),s)||n.endAt&&!(function(o,c,u){const h=ql(o,c,u);return o.inclusive?h>=0:h>0})(n.endAt,os(n),s))})(r,e)}function eE(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Mf(r){return(e,t)=>{let n=!1;for(const s of os(r)){const i=tE(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function tE(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Yt(u,h):L(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L(19790,{direction:r.dir})}}/**
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
 */class wt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){tn(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return _f(this.inner)}size(){return this.innerSize}}/**
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
 */const nE=new he(M.comparator);function Ge(){return nE}const Lf=new he(M.comparator);function Jr(...r){let e=Lf;for(const t of r)e=e.insert(t.key,t);return e}function Ff(r){let e=Lf;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function ot(){return as()}function Uf(){return as()}function as(){return new wt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const rE=new he(M.comparator),sE=new se(M.comparator);function Q(...r){let e=sE;for(const t of r)e=e.add(t);return e}const iE=new se($);function oE(){return iE}/**
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
 */function pc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ps(e)?"-0":e}}function Bf(r){return{integerValue:""+r}}function aE(r,e){return lT(e)?Bf(e):pc(r,e)}/**
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
 */class fo{constructor(){this._=void 0}}function cE(r,e,t){return r instanceof As?(function(s,i){const o={fields:{[Tf]:{stringValue:If},[wf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&lc(i)&&(i=co(i)),i&&(o.fields[Ef]=i),{mapValue:o}})(t,e):r instanceof mr?zf(r,e):r instanceof gr?qf(r,e):(function(s,i){const o=jf(s,i),c=Wl(o)+Wl(s.Ae);return Ra(o)&&Ra(s.Ae)?Bf(c):pc(s.serializer,c)})(r,e)}function uE(r,e,t){return r instanceof mr?zf(r,e):r instanceof gr?qf(r,e):t}function jf(r,e){return r instanceof bs?(function(n){return Ra(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class As extends fo{}class mr extends fo{constructor(e){super(),this.elements=e}}function zf(r,e){const t=$f(e);for(const n of r.elements)t.some((s=>lt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class gr extends fo{constructor(e){super(),this.elements=e}}function qf(r,e){let t=$f(e);for(const n of r.elements)t=t.filter((s=>!lt(s,n)));return{arrayValue:{values:t}}}class bs extends fo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Wl(r){return le(r.integerValue||r.doubleValue)}function $f(r){return ws(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class lE{constructor(e,t){this.field=e,this.transform=t}}function hE(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof mr&&s instanceof mr||n instanceof gr&&s instanceof gr?or(n.elements,s.elements,lt):n instanceof bs&&s instanceof bs?lt(n.Ae,s.Ae):n instanceof As&&s instanceof As})(r.transform,e.transform)}class dE{constructor(e,t){this.version=e,this.transformResults=t}}class ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ze}static exists(e){return new ze(void 0,e)}static updateTime(e){return new ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function bi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class po{}function Gf(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new mc(r.key,ze.none()):new br(r.key,r.data,ze.none());{const t=r.data,n=Oe.empty();let s=new se(fe.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new vt(r.key,n,new je(s.toArray()),ze.none())}}function fE(r,e,t){r instanceof br?(function(s,i,o){const c=s.value.clone(),u=Jl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof vt?(function(s,i,o){if(!bi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Jl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Kf(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function cs(r,e,t,n){return r instanceof br?(function(i,o,c,u){if(!bi(i.precondition,o))return c;const h=i.value.clone(),f=Yl(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof vt?(function(i,o,c,u){if(!bi(i.precondition,o))return c;const h=Yl(i.fieldTransforms,u,o),f=o.data;return f.setAll(Kf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(r,e,t,n):(function(i,o,c){return bi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function pE(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=jf(n.transform,s||null);i!=null&&(t===null&&(t=Oe.empty()),t.set(n.field,i))}return t||null}function Ql(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&or(n,s,((i,o)=>hE(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class br extends po{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class vt extends po{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Kf(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Jl(r,e,t){const n=new Map;F(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,uE(o,c,t[s]))}return n}function Yl(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,cE(i,o,e))}return n}class mc extends po{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Hf extends po{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class gc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&fE(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=cs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=cs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Uf();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Gf(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(U.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Q())}isEqual(e){return this.batchId===e.batchId&&or(this.mutations,e.mutations,((t,n)=>Ql(t,n)))&&or(this.baseMutations,e.baseMutations,((t,n)=>Ql(t,n)))}}class _c{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return rE})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new _c(e,t,n,s)}}/**
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
 */class yc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class mE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ye,X;function gE(r){switch(r){case P.OK:return L(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return L(15467,{code:r})}}function Wf(r){if(r===void 0)return Ue("GRPC error has no .code"),P.UNKNOWN;switch(r){case ye.OK:return P.OK;case ye.CANCELLED:return P.CANCELLED;case ye.UNKNOWN:return P.UNKNOWN;case ye.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ye.INTERNAL:return P.INTERNAL;case ye.UNAVAILABLE:return P.UNAVAILABLE;case ye.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ye.NOT_FOUND:return P.NOT_FOUND;case ye.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ye.ABORTED:return P.ABORTED;case ye.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ye.DATA_LOSS:return P.DATA_LOSS;default:return L(39323,{code:r})}}(X=ye||(ye={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function _E(){return new TextEncoder}/**
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
 */const yE=new $t([4294967295,4294967295],0);function Xl(r){const e=_E().encode(r),t=new Gd;return t.update(e),new Uint8Array(t.digest())}function Zl(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new $t([t,n],0),new $t([s,i],0)]}class Ic{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Yr(`Invalid padding: ${t}`);if(n<0)throw new Yr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Yr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Yr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=$t.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply($t.fromNumber(n)));return s.compare(yE)===1&&(s=new $t([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Xl(e),[n,s]=Zl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Ic(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Xl(e),[n,s]=Zl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Yr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class mo{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Us.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new mo(U.min(),s,new he($),Ge(),Q())}}class Us{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Us(n,t,Q(),Q(),Q())}}/**
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
 */class Ri{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Qf{constructor(e,t){this.targetId=e,this.Ce=t}}class Jf{constructor(e,t,n=Ee.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class eh{constructor(){this.ve=0,this.Fe=th(),this.Me=Ee.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Q(),t=Q(),n=Q();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:L(38017,{changeType:i})}})),new Us(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=th()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class IE{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ge(),this.Je=ai(),this.He=ai(),this.Ze=new he($)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:L(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ji(i))if(n===0){const o=new M(i.path);this.et(t,o,me.newNoDocument(o,U.min()))}else F(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Tt(n).toUint8Array()}catch(u){if(u instanceof yf)return Rn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ic(o,s,i)}catch(u){return Rn(u instanceof Yr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&ji(c.target)){const u=new M(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,me.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let n=Q();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new mo(e,t,this.Ze,this.je,n);return this.je=Ge(),this.Je=ai(),this.He=ai(),this.Ze=new he($),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new eh,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new se($),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new se($),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new eh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ai(){return new he(M.comparator)}function th(){return new he(M.comparator)}const TE={asc:"ASCENDING",desc:"DESCENDING"},EE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},wE={and:"AND",or:"OR"};class vE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ka(r,e){return r.useProto3Json||so(e)?e:{value:e}}function _r(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yf(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function AE(r,e){return _r(r,e.toTimestamp())}function Be(r){return F(!!r,49232),U.fromTimestamp((function(t){const n=It(t);return new ne(n.seconds,n.nanos)})(r))}function Tc(r,e){return Da(r,e).canonicalString()}function Da(r,e){const t=(function(s){return new Z(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function Xf(r){const e=Z.fromString(r);return F(ap(e),10190,{key:e.toString()}),e}function qi(r,e){return Tc(r.databaseId,e.path)}function En(r,e){const t=Xf(e);if(t.get(1)!==r.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(tp(t))}function Zf(r,e){return Tc(r.databaseId,e)}function ep(r){const e=Xf(r);return e.length===4?Z.emptyPath():tp(e)}function Na(r){return new Z(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function tp(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function nh(r,e,t){return{name:qi(r,e),fields:t.value.mapValue.fields}}function bE(r,e,t){const n=En(r,e.name),s=Be(e.updateTime),i=e.createTime?Be(e.createTime):U.min(),o=new Oe({mapValue:{fields:e.fields}}),c=me.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function RE(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),Ee.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ee.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:Wf(h.code);return new D(f,h.message||"")})(o);t=new Jf(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=En(r,n.document.name),i=Be(n.document.updateTime),o=n.document.createTime?Be(n.document.createTime):U.min(),c=new Oe({mapValue:{fields:n.document.fields}}),u=me.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Ri(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=En(r,n.document),i=n.readTime?Be(n.readTime):U.min(),o=me.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ri([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=En(r,n.document),i=n.removedTargetIds||[];t=new Ri([],i,s,null)}else{if(!("filter"in e))return L(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new mE(s,i),c=n.targetId;t=new Qf(c,o)}}return t}function $i(r,e){let t;if(e instanceof br)t={update:nh(r,e.key,e.value)};else if(e instanceof mc)t={delete:qi(r,e.key)};else if(e instanceof vt)t={update:nh(r,e.key,e.data),updateMask:kE(e.fieldMask)};else{if(!(e instanceof Hf))return L(16599,{dt:e.type});t={verify:qi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof As)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof mr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof gr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof bs)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw L(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:AE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L(27497)})(r,e.precondition)),t}function Oa(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?ze.updateTime(Be(i.updateTime)):i.exists!==void 0?ze.exists(i.exists):ze.none()})(e.currentDocument):ze.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new As;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new mr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new gr(f)}else"increment"in c?u=new bs(o,c.increment):L(16584,{proto:c});const h=fe.fromServerFormat(c.fieldPath);return new lE(h,u)})(r,s))):[];if(e.update){e.update.name;const s=En(r,e.update.name),i=new Oe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const h=u.fieldPaths||[];return new je(h.map((f=>fe.fromServerFormat(f))))})(e.updateMask);return new vt(s,i,o,t,n)}return new br(s,i,t,n)}if(e.delete){const s=En(r,e.delete);return new mc(s,t)}if(e.verify){const s=En(r,e.verify);return new Hf(s,t)}return L(1463,{proto:e})}function SE(r,e){return r&&r.length>0?(F(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Be(s.updateTime):Be(i);return o.isEqual(U.min())&&(o=Be(i)),new dE(o,s.transformResults||[])})(t,e)))):[]}function np(r,e){return{documents:[Zf(r,e.path)]}}function rp(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Zf(r,s);const i=(function(h){if(h.length!==0)return op(re.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(E){return{field:Wn(E.field),direction:CE(E.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=ka(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function sp(r){let e=ep(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const E=ip(m);return E instanceof re&&fc(E)?E.getFilters():[E]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((E=>(function(k){return new vs(Qn(k.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let E;return E=typeof m=="object"?m.value:m,so(E)?null:E})(t.limit));let u=null;t.startAt&&(u=(function(m){const E=!!m.before,S=m.values||[];return new fr(S,E)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const E=!m.before,S=m.values||[];return new fr(S,E)})(t.endAt)),JT(e,s,o,i,c,"F",u,h)}function PE(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ip(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Qn(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Qn(t.unaryFilter.field);return Y.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Qn(t.unaryFilter.field);return Y.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Qn(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}})(r):r.fieldFilter!==void 0?(function(t){return Y.create(Qn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return re.create(t.compositeFilter.filters.map((n=>ip(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}})(t.compositeFilter.op))})(r):L(30097,{filter:r})}function CE(r){return TE[r]}function VE(r){return EE[r]}function xE(r){return wE[r]}function Wn(r){return{fieldPath:r.canonicalString()}}function Qn(r){return fe.fromServerFormat(r.fieldPath)}function op(r){return r instanceof Y?(function(t){if(t.op==="=="){if(Bl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(Ul(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Bl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(Ul(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:VE(t.op),value:t.value}}})(r):r instanceof re?(function(t){const n=t.getFilters().map((s=>op(s)));return n.length===1?n[0]:{compositeFilter:{op:xE(t.op),filters:n}}})(r):L(54877,{filter:r})}function kE(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function ap(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function cp(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class ft{constructor(e,t,n,s,i=U.min(),o=U.min(),c=Ee.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class up{constructor(e){this.yt=e}}function DE(r,e){let t;if(e.document)t=bE(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),s=Vn(e.noDocument.readTime);t=me.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L(56709);{const n=M.fromSegments(e.unknownDocument.path),s=Vn(e.unknownDocument.version);t=me.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new ne(s[0],s[1]);return U.fromTimestamp(i)})(e.readTime)),t}function rh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Gi(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:qi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:_r(i,o.version.toTimestamp()),createTime:_r(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Cn(e.version)};else{if(!e.isUnknownDocument())return L(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Cn(e.version)}}return n}function Gi(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Cn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Vn(r){const e=new ne(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function mn(r,e){const t=(e.baseMutations||[]).map((i=>Oa(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>Oa(r.yt,i))),s=ne.fromMillis(e.localWriteTimeMs);return new gc(e.batchId,s,t,n)}function Xr(r){const e=Vn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?Vn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return F(o===1,1966,{count:o}),Je(lo(ep(i.documents[0])))})(r.query):(function(i){return Je(sp(i))})(r.query),new ft(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,Ee.fromBase64String(r.resumeToken))}function lp(r,e){const t=Cn(e.snapshotVersion),n=Cn(e.lastLimboFreeSnapshotVersion);let s;s=ji(e.target)?np(r.yt,e.target):rp(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Pn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function hp(r){const e=sp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?xa(e,e.limit,"L"):e}function ta(r,e){return new yc(e.largestBatchId,Oa(r.yt,e.overlayMutation))}function sh(r,e){const t=e.path.lastSegment();return[r,Me(e.path.popLast()),t]}function ih(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Cn(n.readTime),documentKey:Me(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class NE{getBundleMetadata(e,t){return oh(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:Vn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return oh(e).put((function(s){return{bundleId:s.id,createTime:Cn(Be(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return ah(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:hp(i.bundledQuery),readTime:Vn(i.readTime)}})(n)}))}saveNamedQuery(e,t){return ah(e).put((function(s){return{name:s.name,readTime:Cn(Be(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function oh(r){return be(r,io)}function ah(r){return be(r,oo)}/**
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
 */class go{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new go(e,n)}getOverlay(e,t){return qr(e).get(sh(this.userId,t)).next((n=>n?ta(this.serializer,n):null))}getOverlays(e,t){const n=ot();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new yc(t,o);s.push(this.St(e,c))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(Me(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(qr(e).X(va,c))})),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=ot(),i=Me(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return qr(e).J(va,o).next((c=>{for(const u of c){const h=ta(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=ot();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qr(e).ee({index:df,range:c},((u,h,f)=>{const m=ta(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):f.done()})).next((()=>i))}St(e,t){return qr(e).put((function(s,i,o){const[c,u,h]=sh(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:$i(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function qr(r){return be(r,ao)}/**
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
 */class OE{bt(e){return be(e,cc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t?.value;return n?Ee.fromUint8Array(n):Ee.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class gn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(le(e.integerValue));else if("doubleValue"in e){const n=le(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),ps(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=It(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Tt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?Af(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):uo(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):L(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const s=hr,i=n[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(le(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),M.fromName(e).path.forEach((n=>{this.Ft(t,60),this.$t(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}gn.Wt=new gn;/**
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
 */const zn=255;function ME(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function ch(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=ME(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class LE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=ch(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=ch(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(zn),this.sn(255)}_n(){this.an(zn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===zn?(this.sn(zn),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===zn?(this.an(zn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class FE{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class UE{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class $r{constructor(){this.cn=new LE,this.ascending=new FE(this.cn),this.descending=new UE(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class _n{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new _n(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Si(this.Tn),directionalValue:Si(this.En),orderedDocumentKey:Si(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function xt(r,e){let t=r.hn-e.hn;return t!==0?t:(t=uh(r.Tn,e.Tn),t!==0?t:(t=uh(r.En,e.En),t!==0?t:M.comparator(r.Pn,e.Pn)))}function uh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function Si(r){return ad()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function lh(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class hh{constructor(e){this.Vn=new se(((t,n)=>fe.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(F(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Ta(e);if(t!==void 0&&!this.pn(t))return!1;const n=hn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new se(fe.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Ii(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Ii(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Ii(n.field,n.dir==="asc"?0:1)));return new Li(Li.UNKNOWN_ID,this.collectionId,t,fs.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function dp(r){if(F(r instanceof Y||r instanceof re,20012),r instanceof Y){if(r instanceof Df){const t=r.value.arrayValue?.values?.map((n=>Y.create(r.field,"==",n)))||[];return re.create(t,"or")}return r}const e=r.filters.map((t=>dp(t)));return re.create(e,r.op)}function BE(r){if(r.getFilters().length===0)return[];const e=Fa(dp(r));return F(fp(e),7391),Ma(e)||La(e)?[e]:e.getFilters()}function Ma(r){return r instanceof Y}function La(r){return r instanceof re&&fc(r)}function fp(r){return Ma(r)||La(r)||(function(t){if(t instanceof re&&Sa(t)){for(const n of t.getFilters())if(!Ma(n)&&!La(n))return!1;return!0}return!1})(r)}function Fa(r){if(F(r instanceof Y||r instanceof re,34018),r instanceof Y)return r;if(r.filters.length===1)return Fa(r.filters[0]);const e=r.filters.map((n=>Fa(n)));let t=re.create(e,r.op);return t=Ki(t),fp(t)?t:(F(t instanceof re,64498),F(pr(t),40251),F(t.filters.length>1,57927),t.filters.reduce(((n,s)=>Ec(n,s))))}function Ec(r,e){let t;return F(r instanceof Y||r instanceof re,38388),F(e instanceof Y||e instanceof re,25473),t=r instanceof Y?e instanceof Y?(function(s,i){return re.create([s,i],"and")})(r,e):dh(r,e):e instanceof Y?dh(e,r):(function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),pr(s)&&pr(i))return Vf(s,i.getFilters());const o=Sa(s)?s:i,c=Sa(s)?i:s,u=o.filters.map((h=>Ec(h,c)));return re.create(u,"or")})(r,e),Ki(t)}function dh(r,e){if(pr(e))return Vf(e,r.getFilters());{const t=e.filters.map((n=>Ec(r,n)));return re.create(t,"or")}}function Ki(r){if(F(r instanceof Y||r instanceof re,11850),r instanceof Y)return r;const e=r.getFilters();if(e.length===1)return Ki(e[0]);if(Pf(r))return r;const t=e.map((s=>Ki(s))),n=[];return t.forEach((s=>{s instanceof Y?n.push(s):s instanceof re&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:re.create(n,r.op)}/**
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
 */class jE{constructor(){this.bn=new wc}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Ke.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Ke.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class wc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new se(Z.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new se(Z.comparator)).toArray()}}/**
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
 */const fh="IndexedDbIndexManager",ci=new Uint8Array(0);class zE{constructor(e,t){this.databaseId=t,this.Dn=new wc,this.Cn=new wt((n=>Pn(n)),((n,s)=>Ls(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:n,parent:Me(s)};return ph(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Zd(t),""],!1,!0);return ph(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(it(o.parent))}return n}))}addFieldIndex(e,t){const n=Gr(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=$n(e);return i.next((c=>{o.put(ih(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Gr(e),s=$n(e),i=qn(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Gr(e),n=qn(e),s=$n(e);return t.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new hh(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=qn(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=Q();const c=[];return A.forEach(i,((u,h)=>{x(fh,`Using index ${(function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map((te=>`${te.fieldPath}:${te.kind}`)).join(",")}`})(u)} to execute ${Pn(t)}`);const f=(function(B,te){const ee=Ta(te);if(ee===void 0)return null;for(const H of zi(B,ee.fieldPath))switch(H.op){case"array-contains-any":return H.value.arrayValue.values||[];case"array-contains":return[H.value]}return null})(h,u),m=(function(B,te){const ee=new Map;for(const H of hn(te))for(const T of zi(B,H.fieldPath))switch(T.op){case"==":case"in":ee.set(H.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return ee.set(H.fieldPath.canonicalString(),T.value),Array.from(ee.values())}return null})(h,u),E=(function(B,te){const ee=[];let H=!0;for(const T of hn(te)){const _=T.kind===0?Gl(B,T.fieldPath,B.startAt):Kl(B,T.fieldPath,B.startAt);ee.push(_.value),H&&(H=_.inclusive)}return new fr(ee,H)})(h,u),S=(function(B,te){const ee=[];let H=!0;for(const T of hn(te)){const _=T.kind===0?Kl(B,T.fieldPath,B.endAt):Gl(B,T.fieldPath,B.endAt);ee.push(_.value),H&&(H=_.inclusive)}return new fr(ee,H)})(h,u),k=this.Mn(u,h,E),N=this.Mn(u,h,S),V=this.xn(u,h,m),K=this.On(u.indexId,f,k,E.inclusive,N,S.inclusive,V);return A.forEach(K,(q=>n.Z(q,t.limit).next((B=>{B.forEach((te=>{const ee=M.fromSegments(te.documentKey);o.has(ee)||(o=o.add(ee),c.push(ee))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=BE(re.create(e.filters,"and")).map((n=>Ca(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const E=t?this.Nn(t[m/h]):ci,S=this.Bn(e,E,n[m%h],s),k=this.Ln(e,E,i[m%h],o),N=c.map((V=>this.Bn(e,E,V,!0)));f.push(...this.createRange(S,k,N))}return f}Bn(e,t,n,s){const i=new _n(e,M.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new _n(e,M.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new hh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.vn(t);return A.forEach(s,(i=>this.Fn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(u){let h=new se(fe.comparator),f=!1;for(const m of u.filters)for(const E of m.getFlattenedFilters())E.field.isKeyField()||(E.op==="array-contains"||E.op==="array-contains-any"?f=!0:h=h.add(E.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}kn(e,t){const n=new $r;for(const s of hn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);gn.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new $r;return gn.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new $r;return gn.Wt.Dt(Es(this.databaseId,t),n.ln((function(i){const o=hn(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new $r);let i=0;for(const o of hn(e)){const c=n[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&ws(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);gn.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new $r;u.seed(c.un()),gn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find((n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Gr(e),s=$n(e);return(t?n.J(wa,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const o=[];return A.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,m){const E=m?new fs(m.sequenceNumber,new Ke(Vn(m.readTime),new M(it(m.documentKey)),m.largestBatchId)):fs.empty(),S=f.fields.map((([k,N])=>new Ii(fe.fromServerFormat(k),N)));return new Li(f.indexId,f.collectionGroup,S,E)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:$(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Gr(e),i=$n(e);return this.Wn(e).next((o=>s.J(wa,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>i.put(ih(u.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,s,u).next((h=>{const f=this.Gn(i,u);return h.isEqual(f)?A.resolve():this.zn(e,i,u,h,f)})))))))}))}jn(e,t,n,s){return qn(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return qn(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=qn(e);let i=new se(xt);return s.ee({index:hf,range:IDBKeyRange.only([n.indexId,this.uid,Si(this.qn(n,t))])},((o,c)=>{i=i.add(new _n(n.indexId,t,lh(c.arrayValue),lh(c.directionalValue)))})).next((()=>i))}Gn(e,t){let n=new se(xt);const s=this.kn(t,e);if(s==null)return n;const i=Ta(t);if(i!=null){const o=e.data.field(i.fieldPath);if(ws(o))for(const c of o.arrayValue.values||[])n=n.add(new _n(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new _n(t.indexId,e.key,ci,s));return n}zn(e,t,n,s,i){x(fh,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,h,f,m,E){const S=u.getIterator(),k=h.getIterator();let N=jn(S),V=jn(k);for(;N||V;){let K=!1,q=!1;if(N&&V){const B=f(N,V);B<0?q=!0:B>0&&(K=!0)}else N!=null?q=!0:K=!0;K?(m(V),V=jn(k)):q?(E(N),N=jn(S)):(N=jn(S),V=jn(k))}})(s,i,xt,(c=>{o.push(this.jn(e,t,n,c))}),(c=>{o.push(this.Jn(e,t,n,c))})),A.waitFor(o)}Wn(e){let t=1;return $n(e).ee({index:lf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>xt(o,c))).filter(((o,c,u)=>!c||xt(o,u[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=xt(o,e),u=xt(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,ci,M.empty()),u=s[o+1].An(this.uid,ci,M.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return xt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(mh)}getMinOffset(e,t){return A.mapArray(this.vn(t),(n=>this.Fn(e,n).next((s=>s||L(44426))))).next(mh)}}function ph(r){return be(r,_s)}function qn(r){return be(r,ss)}function Gr(r){return be(r,ac)}function $n(r){return be(r,rs)}function mh(r){F(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;sc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Ke(e.readTime,e.documentKey,t)}/**
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
 */const gh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},pp=41943040;class Ne{static withCacheSize(e){return new Ne(e,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function mp(r,e,t){const n=r.store(Ye),s=r.store(ar),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},((f,m,E)=>(c++,E.delete())));i.push(u.next((()=>{F(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const m=af(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next((()=>h))}function Hi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L(14731);e=r.noDocument}return JSON.stringify(e).length}/**
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
 */Ne.DEFAULT_COLLECTION_PERCENTILE=10,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ne.DEFAULT=new Ne(pp,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ne.DISABLED=new Ne(-1,0,0);class _o{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){F(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new _o(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).ee({index:yn,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=Jn(e),o=kt(e);return o.add({}).next((c=>{F(typeof c=="number",49019);const u=new gc(c,t,n,s),h=(function(S,k,N){const V=N.baseMutations.map((q=>$i(S.yt,q))),K=N.mutations.map((q=>$i(S.yt,q)));return{userId:k,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:V,mutations:K}})(this.serializer,this.userId,u),f=[];let m=new se(((E,S)=>$(E.canonicalString(),S.canonicalString())));for(const E of s){const S=af(this.userId,E.key.path,c);m=m.add(E.key.path.popLast()),f.push(o.put(h)),f.push(i.put(S,fT))}return m.forEach((E=>{f.push(this.indexManager.addToCollectionParentIndex(e,E))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return kt(e).get(t).next((n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),mn(this.serializer,n)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return kt(e).ee({index:yn,range:s},((o,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n,47524,{Yn:n}),i=mn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=In;return kt(e).ee({index:yn,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,In],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).J(yn,t).next((n=>n.map((s=>mn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Ti(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Jn(e).ee({range:s},((o,c,u)=>{const[h,f,m]=o,E=it(f);if(h===this.userId&&t.path.isEqual(E))return kt(e).get(m).next((S=>{if(!S)throw L(61480,{er:o,batchId:m});F(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:m}),i.push(mn(this.serializer,S))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new se($);const s=[];return t.forEach((i=>{const o=Ti(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Jn(e).ee({range:c},((h,f,m)=>{const[E,S,k]=h,N=it(S);E===this.userId&&i.path.isEqual(N)?n=n.add(k):m.done()}));s.push(u)})),A.waitFor(s).next((()=>this.tr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=Ti(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new se($);return Jn(e).ee({range:o},((u,h,f)=>{const[m,E,S]=u,k=it(E);m===this.userId&&n.isPrefixOf(k)?k.length===s&&(c=c.add(S)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(kt(e).get(i).next((o=>{if(o===null)throw L(35274,{batchId:i});F(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(mn(this.serializer,o))})))})),A.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return mp(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Jn(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const u=it(i[1]);s.push(u)}else c.done()})).next((()=>{F(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return gp(e,this.userId,t)}ir(e){return _p(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:In,lastStreamToken:""}))}}function gp(r,e,t){const n=Ti(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Jn(r).ee({range:i,Y:!0},((c,u,h)=>{const[f,m,E]=c;f===e&&m===s&&(o=!0),h.done()})).next((()=>o))}function kt(r){return be(r,Ye)}function Jn(r){return be(r,ar)}function _p(r){return be(r,ms)}/**
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
 */class xn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new xn(0)}static ar(){return new xn(-1)}}/**
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
 */class qE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const n=new xn(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>U.fromTimestamp(new ne(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Gn(e).delete(t.targetId))).next((()=>this.ur(e))).next((n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return Gn(e).ee(((o,c)=>{const u=Xr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Gn(e).ee(((n,s)=>{const i=Xr(s);t(i)}))}ur(e){return _h(e).get(Bi).next((t=>(F(t!==null,2888),t)))}cr(e,t){return _h(e).put(Bi,t)}lr(e,t){return Gn(e).put(lp(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const n=Pn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Gn(e).ee({range:s,index:uf},((o,c,u)=>{const h=Xr(c);Ls(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=Ut(e);return t.forEach((o=>{const c=Me(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=Ut(e);return A.forEach(t,(i=>{const o=Me(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=Ut(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Ut(e);let i=Q();return s.ee({range:n,Y:!0},((o,c,u)=>{const h=it(o[1]),f=new M(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=Me(t.path),s=IDBKeyRange.bound([n],[Zd(n)],!1,!0);let i=0;return Ut(e).ee({index:oc,Y:!0,range:s},(([o,c],u,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return Gn(e).get(t).next((n=>n?Xr(n):null))}}function Gn(r){return be(r,cr)}function _h(r){return be(r,Tn)}function Ut(r){return be(r,ur)}/**
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
 */const yh="LruGarbageCollector",yp=1048576;function Ih([r,e],[t,n]){const s=$(r,t);return s===0?$(e,n):s}class $E{constructor(e){this.Pr=e,this.buffer=new se(Ih),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Ih(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ip{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){x(yh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){en(t)?x(yh,"Ignoring IndexedDB error during garbage collection: ",t):await Nn(t)}await this.Ar(3e5)}))}}class GE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Qe.ce);const n=new $E(t);return this.Vr.forEachTarget(e,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(gh)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(n=m,c=Date.now(),this.removeTargets(e,n,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((m=>(h=Date.now(),Kn()<=J.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Tp(r,e){return new GE(r,e)}/**
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
 */class KE{constructor(e,t){this.db=e,this.garbageCollector=Tp(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((n,s)=>t(s)))}addReference(e,t,n){return ui(e,n)}removeReference(e,t,n){return ui(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return ui(e,t)}wr(e,t){return(function(s,i){let o=!1;return _p(s).te((c=>gp(s,c,i).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,U.min()),Ut(e).delete((function(m){return[0,Me(m.path)]})(o)))))}));s.push(u)}})).next((()=>A.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return ui(e,t)}yr(e,t){const n=Ut(e);let s,i=Qe.ce;return n.ee({index:oc},(([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==Qe.ce&&t(new M(it(s)),i),i=h,s=u):i=Qe.ce})).next((()=>{i!==Qe.ce&&t(new M(it(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ui(r,e){return Ut(r).put((function(n,s){return{targetId:0,path:Me(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
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
 */class Ep{constructor(){this.changes=new wt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class HE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return un(e).put(n)}removeEntry(e,t,n){return un(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Gi(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Sr(e,n))))}getEntry(e,t){let n=me.newInvalidDocument(t);return un(e).ee({index:Ei,range:IDBKeyRange.only(Kr(t))},((s,i)=>{n=this.br(t,i)})).next((()=>n))}Dr(e,t){let n={size:0,document:me.newInvalidDocument(t)};return un(e).ee({index:Ei,range:IDBKeyRange.only(Kr(t))},((s,i)=>{n={document:this.br(t,i),size:Hi(i)}})).next((()=>n))}getEntries(e,t){let n=Ge();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);n=n.insert(s,o)})).next((()=>n))}vr(e,t){let n=Ge(),s=new he(M.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);n=n.insert(i,c),s=s.insert(i,Hi(o))})).next((()=>({documents:n,Fr:s})))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let s=new se(wh);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Kr(s.first()),Kr(s.last())),o=s.getIterator();let c=o.getNext();return un(e).ee({index:Ei,range:i},((u,h,f)=>{const m=M.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&wh(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Kr(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Gi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return un(e).J(IDBKeyRange.bound(c,u,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=Ge();for(const m of h){const E=this.br(M.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);E.isFoundDocument()&&(Fs(t,E)||s.has(E.key))&&(f=f.insert(E.key,E))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Ge();const o=Eh(t,n),c=Eh(t,Ke.max());return un(e).ee({index:cf,range:IDBKeyRange.bound(o,c,!0)},((u,h,f)=>{const m=this.br(M.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new WE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Th(e).get(Ea).next((t=>(F(!!t,20021),t)))}Sr(e,t){return Th(e).put(Ea,t)}br(e,t){if(t){const n=DE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return me.newInvalidDocument(e)}}function wp(r){return new HE(r)}class WE extends Ep{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new wt((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new se(((i,o)=>$(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=rh(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Hi(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=rh(this.Mr.serializer,o.convertToNoDocument(U.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:n,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function Th(r){return be(r,gs)}function un(r){return be(r,Ui)}function Kr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Eh(r,e){const t=e.documentKey.path.toArray();return[r,Gi(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function wh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=$(t[i],n[i]),s)return s;return s=$(t.length,n.length),s||(s=$(t[t.length-2],n[n.length-2]),s||$(t[t.length-1],n[n.length-1]))}/**
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
 */class QE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class vp{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&cs(n.mutation,s,je.empty(),ne.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,Q()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=Q()){const s=ot();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=Jr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=ot();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Q())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=Ge();const o=as(),c=(function(){return as()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof vt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),cs(f.mutation,h,f.mutation.getFieldMask(),ne.now())):o.set(h.key,je.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new QE(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=as();let s=new he(((o,c)=>o-c)),i=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||je.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(s.get(c.batchId)||Q()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Uf();f.forEach((E=>{if(!i.has(E)){const S=Gf(t.get(E),n.get(E));S!==null&&m.set(E,S),i=i.add(E)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return YT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(ot());let c=ds,u=i;return o.next((h=>A.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((E=>{u=u.insert(f,E)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,Q()))).next((f=>({batchId:c,changes:Ff(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next((n=>{let s=Jr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Jr();return this.indexManager.getCollectionParents(e,i).next((c=>A.forEach(c,(u=>{const h=(function(m,E){return new Ar(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((m,E)=>{o=o.insert(m,E)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,me.newInvalidDocument(f)))}));let c=Jr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&cs(f.mutation,h,je.empty(),ne.now()),Fs(t,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class JE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Be(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:hp(s.bundledQuery),readTime:Be(s.readTime)}})(t)),A.resolve()}}/**
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
 */class YE{constructor(){this.overlays=new he(M.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ot();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=ot(),i=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new he(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=ot(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=ot(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return A.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new yc(t,n));let i=this.Lr.get(t);i===void 0&&(i=Q(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
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
 */class XE{constructor(){this.sessionToken=Ee.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
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
 */class vc{constructor(){this.kr=new se(Se.qr),this.Kr=new se(Se.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new Se(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Wr(new Se(e,t))}Qr(e,t){e.forEach((n=>this.removeReference(n,t)))}Gr(e){const t=new M(new Z([])),n=new Se(t,e),s=new Se(t,e+1),i=[];return this.Kr.forEachInRange([n,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new M(new Z([])),n=new Se(t,e),s=new Se(t,e+1);let i=Q();return this.Kr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Se(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Se{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return M.comparator(e.key,t.key)||$(e.Jr,t.Jr)}static Ur(e,t){return $(e.Jr,t.Jr)||M.comparator(e.key,t.key)}}/**
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
 */class ZE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new se(Se.qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new gc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Se(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?In:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Se(t,0),s=new Se(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new se($);return t.forEach((s=>{const i=new Se(s,0),o=new Se(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{n=n.add(c.Jr)}))})),A.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const o=new Se(new M(i),0);let c=new se($);return this.Hr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Jr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((n=>{const s=this.Zr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){F(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return A.forEach(t.mutations,(s=>{const i=new Se(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=n}))}nr(e){}containsKey(e,t){const n=new Se(t,0),s=this.Hr.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class ew{constructor(e){this.ti=e,this.docs=(function(){return new he(M.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():me.newInvalidDocument(t))}getEntries(e,t){let n=Ge();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():me.newInvalidDocument(s))})),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Ge();const o=t.path,c=new M(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||sc(nf(f),n)<=0||(s.has(f.key)||Fs(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,n,s){L(9500)}ni(e,t){return A.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new tw(this)}getSize(e){return A.resolve(this.size)}}class tw extends Ep{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class nw{constructor(e){this.persistence=e,this.ri=new wt((t=>Pn(t)),Ls),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new vc,this.targetCount=0,this.oi=xn._r()}forEachTarget(e,t){return this.ri.forEach(((n,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new xn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
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
 */class Ac{constructor(e,t){this._i={},this.overlays={},this.ai=new Qe(0),this.ui=!1,this.ui=!0,this.ci=new XE,this.referenceDelegate=e(this),this.li=new nw(this),this.indexManager=new jE,this.remoteDocumentCache=(function(s){return new ew(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new up(t),this.Pi=new JE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new YE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new ZE(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){x("MemoryPersistence","Starting transaction:",e);const s=new rw(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return A.or(Object.values(this._i).map((n=>()=>n.containsKey(e,t))))}}class rw extends sf{constructor(e){super(),this.currentSequenceNumber=e}}class yo{constructor(e){this.persistence=e,this.Ri=new vc,this.Ai=null}static Vi(e){return new yo(e)}get di(){if(this.Ai)return this.Ai;throw L(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(n=>{const s=M.fromPath(n);return this.mi(e,s).next((i=>{i||t.removeEntry(s,U.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Wi{constructor(e,t){this.persistence=e,this.fi=new wt((n=>Me(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Tp(this,t)}static Vi(e,t){return new Wi(e,t)}Ti(){}Ei(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((n,s)=>this.wr(e,n,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(n++,i.removeEntry(o,U.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vi(e.data.value)),t}wr(e,t,n){return A.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class sw{constructor(e){this.serializer=e}k(e,t,n,s){const i=new ro("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(Ms)})(e),(function(u){u.createObjectStore(ms,{keyPath:dT}),u.createObjectStore(Ye,{keyPath:Dl,autoIncrement:!0}).createIndex(yn,Nl,{unique:!0}),u.createObjectStore(ar)})(e),vh(e),(function(u){u.createObjectStore(dn)})(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(ur),u.deleteObjectStore(cr),u.deleteObjectStore(Tn)})(e),vh(e)),o=o.next((()=>(function(u){const h=u.store(Tn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put(Bi,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(u,h){return h.store(Ye).J().next((m=>{u.deleteObjectStore(Ye),u.createObjectStore(Ye,{keyPath:Dl,autoIncrement:!0}).createIndex(yn,Nl,{unique:!0});const E=h.store(Ye),S=m.map((k=>E.put(k)));return A.waitFor(S)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(lr,{keyPath:ET})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.gi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(gs)})(e),this.pi(i))))),n<7&&s>=7&&(o=o.next((()=>this.yi(i)))),n<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.Si(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(io,{keyPath:wT})})(e),(function(u){u.createObjectStore(oo,{keyPath:vT})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(u){const h=u.createObjectStore(ao,{keyPath:VT});h.createIndex(va,xT,{unique:!1}),h.createIndex(df,kT,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(u){const h=u.createObjectStore(Ui,{keyPath:pT});h.createIndex(Ei,mT),h.createIndex(cf,gT)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(dn)))),n<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(ac,{keyPath:AT,autoIncrement:!0}).createIndex(wa,bT,{unique:!1}),u.createObjectStore(rs,{keyPath:RT}).createIndex(lf,ST,{unique:!1}),u.createObjectStore(ss,{keyPath:PT}).createIndex(hf,CT,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(rs).clear()})).next((()=>{t.objectStore(ss).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(cc,{keyPath:DT})})(e)}))),n<18&&s>=18&&ad()&&(o=o.next((()=>{t.objectStore(rs).clear()})).next((()=>{t.objectStore(ss).clear()}))),o}pi(e){let t=0;return e.store(dn).ee(((n,s)=>{t+=Hi(s)})).next((()=>{const n={byteSize:t};return e.store(gs).put(Ea,n)}))}gi(e){const t=e.store(ms),n=e.store(Ye);return t.J().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,In],[i.userId,i.lastAcknowledgedBatchId]);return n.J(yn,o).next((c=>A.forEach(c,(u=>{F(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=mn(this.serializer,u);return mp(e,i.userId,h).next((()=>{}))}))))}))))}yi(e){const t=e.store(ur),n=e.store(dn);return e.store(Tn).get(Bi).next((s=>{const i=[];return n.ee(((o,c)=>{const u=new Z(o),h=(function(m){return[0,Me(m)]})(u);i.push(t.get(h).next((f=>f?A.resolve():(m=>t.put({targetId:0,path:Me(m),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(i)))}))}wi(e,t){e.createObjectStore(_s,{keyPath:TT});const n=t.store(_s),s=new wc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Me(u)})}};return t.store(dn).ee({Y:!0},((o,c)=>{const u=new Z(o);return i(u.popLast())})).next((()=>t.store(ar).ee({Y:!0},(([o,c,u],h)=>{const f=it(c);return i(f.popLast())}))))}Si(e){const t=e.store(cr);return t.ee(((n,s)=>{const i=Xr(s),o=lp(this.serializer,i);return t.put(o)}))}bi(e,t){const n=t.store(dn),s=[];return n.ee(((i,o)=>{const c=t.store(Ui),u=(function(m){return m.document?new M(Z.fromString(m.document.name).popFirst(5)):m.noDocument?M.fromSegments(m.noDocument.path):m.unknownDocument?M.fromSegments(m.unknownDocument.path):L(36783)})(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>A.waitFor(s)))}Di(e,t){const n=t.store(Ye),s=wp(this.serializer),i=new Ac(yo.Vi,this.serializer.yt);return n.J().next((o=>{const c=new Map;return o.forEach((u=>{let h=c.get(u.userId)??Q();mn(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),A.forEach(c,((u,h)=>{const f=new Ce(h),m=go.wt(this.serializer,f),E=i.getIndexManager(f),S=_o.wt(f,this.serializer,E,i.referenceDelegate);return new vp(s,S,m,E).recalculateAndSaveOverlaysForDocumentKeys(new Aa(t,Qe.ce),u).next()}))}))}}function vh(r){r.createObjectStore(ur,{keyPath:yT}).createIndex(oc,IT,{unique:!0}),r.createObjectStore(cr,{keyPath:"targetId"}).createIndex(uf,_T,{unique:!0}),r.createObjectStore(Tn)}const Dt="IndexedDbPersistence",na=18e5,ra=5e3,sa="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",iw="main";class bc{constructor(e,t,n,s,i,o,c,u,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=m,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=E=>Promise.resolve(),!bc.v())throw new D(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new KE(this,s),this.qi=t+iw,this.serializer=new up(u),this.Ki=new Ht(this.qi,this.xi,new sw(this.serializer)),this.ci=new OE,this.li=new qE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=wp(this.serializer),this.Pi=new NE,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&Ue(Dt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,sa);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Qe(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.Ki&&this.Ki.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>li(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(en(e))return x(Dt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x(Dt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Hr(e).get(Bn).next((t=>A.resolve(this.Xi(t))))}Yi(e){return li(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,na)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=be(t,lr);return n.J().next((s=>{const i=this.ns(s,na),o=s.filter((c=>i.indexOf(c)===-1));return A.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):Hr(e).get(Bn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,ra)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,sa);return!1}}return!(!this.networkEnabled||!this.inForeground)||li(e).J().next((n=>this.ns(n,ra).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&x(Dt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Ms,lr],(e=>{const t=new Aa(e,Qe.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.Ki.close(),this.ls()}ns(e,t){return e.filter((n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>li(e).J().next((t=>this.ns(t,na).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return _o.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new zE(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return go.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){x(Dt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?MT:u===17?gf:u===16?OT:u===15?uc:u===14?mf:u===13?pf:u===12?NT:u===11?ff:void L(60245)})(this.xi);let o;return this.Ki.runTransaction(e,s,i,(c=>(o=new Aa(c,this.ai?this.ai.next():Qe.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw Ue(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(P.FAILED_PRECONDITION,rf);return n(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Hr(e).get(Bn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,ra)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(P.FAILED_PRECONDITION,sa)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Hr(e).put(Bn,t)}static v(){return Ht.v()}Hi(e){const t=Hr(e);return t.get(Bn).next((n=>this.Xi(n)?(x(Dt,"Releasing primary lease."),t.delete(Bn)):A.resolve()))}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Ue(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){typeof this.window?.addEventListener=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;od()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=this.Ui?.getItem(this.rs(e))!==null;return x(Dt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return Ue(Dt,"Failed to get zombied client id.",t),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Ue("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Hr(r){return be(r,Ms)}function li(r){return be(r,lr)}function ow(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Rc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=Q(),s=Q();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Rc(e,t.fromCache,n,s)}}/**
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
 */class aw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ap{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return od()?8:of(Ae())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new aw;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,n,s){return n.documentReadCount<this.Vs?(Kn()<=J.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Kn()<=J.DEBUG&&x("QueryEngine","Query:",Hn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Kn()<=J.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Je(t))):A.resolve())}gs(e,t){if(Hl(t))return A.resolve(null);let n=Je(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=xa(t,null,"F"),n=Je(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=Q(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,xa(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,n,s){return Hl(t)||s.isEqual(U.min())?A.resolve(null):this.fs.getDocuments(e,n).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?A.resolve(null):(Kn()<=J.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hn(t)),this.Ds(e,o,t,iT(s,ds)).next((c=>c)))}))}Ss(e,t){let n=new se(Mf(e));return t.forEach(((s,i)=>{Fs(e,i)&&(n=n.add(i))})),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return Kn()<=J.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.fs.getDocumentsMatchingQuery(e,t,Ke.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const Sc="LocalStore",cw=3e8;class uw{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new he($),this.Fs=new wt((i=>Pn(i)),Ls),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new vp(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function bp(r,e,t,n){return new uw(r,e,t,n)}async function Rp(r,e){const t=G(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let u=Q();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function lw(r,e){const t=G(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,E=m.keys();let S=A.resolve();return E.forEach((k=>{S=S.next((()=>f.getEntry(u,k))).next((N=>{const V=h.docVersions.get(k);F(V!==null,48541),N.version.compareTo(V)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=Q();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Sp(r){const e=G(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function hw(r,e){const t=G(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,m)=>{const E=s.get(m);if(!E)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,m))));let S=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(Ee.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),s=s.insert(m,S),(function(N,V,K){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=cw?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(E,S,f)&&c.push(t.li.updateTargetData(i,S))}));let u=Ge(),h=Q();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(dw(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!n.isEqual(U.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((m=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return A.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=s,i)))}function dw(r,e,t){let n=Q(),s=Q();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=Ge();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):x(Sc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function fw(r,e){const t=G(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=In),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function pw(r,e){const t=G(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.li.getTargetData(n,e).next((i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(n).next((o=>(s=new ft(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n}))}async function Ua(r,e,t){const n=G(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!en(o))throw o;x(Sc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function Ah(r,e,t){const n=G(r);let s=U.min(),i=Q();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const m=G(u),E=m.Fs.get(f);return E!==void 0?A.resolve(m.vs.get(E)):m.li.getTargetData(h,f)})(n,o,Je(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:Q()))).next((c=>(mw(n,eE(e),c),{documents:c,ks:i})))))}function mw(r,e,t){let n=r.Ms.get(e)||U.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(e,n)}class bh{constructor(){this.activeTargetIds=oE()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pp{constructor(){this.vo=new bh,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new bh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class gw{Mo(e){}shutdown(){}}/**
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
 */const Rh="ConnectivityMonitor";class Sh{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){x(Rh,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){x(Rh,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let hi=null;function Ba(){return hi===null?hi=(function(){return 268435456+Math.round(2147483648*Math.random())})():hi++,"0x"+hi.toString(16)}/**
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
 */const ia="RestConnection",_w={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class yw{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===Is?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=Ba(),c=this.Qo(e,t.toUriEncodedString());x(ia,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=Tr(h);return this.zo(e,c,u,n,f).then((m=>(x(ia,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Rn(ia,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",n),m}))}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+vr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const n=_w[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class Iw{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const De="WebChannelConnection",Wr=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class nr extends yw{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!nr.c_){const e=Qd();Wr(e,Wd.STAT_EVENT,(t=>{t.stat===ya.PROXY?x(De,"STAT_EVENT: detected buffering proxy"):t.stat===ya.NOPROXY&&x(De,"STAT_EVENT: detected no buffering proxy")})),nr.c_=!0}}zo(e,t,n,s,i){const o=Ba();return new Promise(((c,u)=>{const h=new Kd;h.setWithCredentials(!0),h.listenOnce(Hd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case yi.NO_ERROR:const m=h.getResponseJson();x(De,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case yi.TIMEOUT:x(De,`RPC '${e}' ${o} timed out`),u(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case yi.HTTP_ERROR:const E=h.getStatus();if(x(De,`RPC '${e}' ${o} failed with status:`,E,"response text:",h.getResponseText()),E>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S?.error;if(k&&k.status&&k.message){const N=(function(K){const q=K.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN})(k.status);u(new D(N,k.message))}else u(new D(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new D(P.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{x(De,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);x(De,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=Ba(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");x(De,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let m=!1,E=!1;const S=new Iw({Jo:k=>{E?x(De,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(m||(x(De,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),x(De,`RPC '${e}' stream ${s} sending:`,k),f.send(k))},Ho:()=>f.close()});return Wr(f,Qr.EventType.OPEN,(()=>{E||(x(De,`RPC '${e}' stream ${s} transport opened.`),S.i_())})),Wr(f,Qr.EventType.CLOSE,(()=>{E||(E=!0,x(De,`RPC '${e}' stream ${s} transport closed`),S.o_(),this.I_(f))})),Wr(f,Qr.EventType.ERROR,(k=>{E||(E=!0,Rn(De,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),S.o_(new D(P.UNAVAILABLE,"The operation could not be completed")))})),Wr(f,Qr.EventType.MESSAGE,(k=>{if(!E){const N=k.data[0];F(!!N,16349);const V=N,K=V?.error||V[0]?.error;if(K){x(De,`RPC '${e}' stream ${s} received error:`,K);const q=K.status;let B=(function(H){const T=ye[H];if(T!==void 0)return Wf(T)})(q),te=K.message;q==="NOT_FOUND"&&te.includes("database")&&te.includes("does not exist")&&te.includes(this.databaseId.database)&&Rn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),B===void 0&&(B=P.INTERNAL,te="Unknown error status: "+q+" with message "+K.message),E=!0,S.o_(new D(B,te)),f.close()}else x(De,`RPC '${e}' stream ${s} received:`,N),S.__(N)}})),nr.u_(),setTimeout((()=>{S.s_()}),0),S}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Jd()}}/**
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
 */function Tw(r){return new nr(r)}/**
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
 */function Ew(){return typeof window<"u"?window:null}function Pi(){return typeof document<"u"?document:null}/**
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
 */function Io(r){return new vE(r,!0)}/**
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
 */nr.c_=!1;class Cp{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Ph="PersistentStream";class Vp{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Cp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Ue(t.toString()),Ue("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new D(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return x(Ph,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(x(Ph,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ww extends Vp{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=RE(this.serializer,e),n=(function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?Be(o.readTime):U.min()})(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=Na(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=ji(u)?{documents:np(i,u)}:{query:rp(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Yf(i,o.resumeToken);const h=ka(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){c.readTime=_r(i,o.snapshotVersion.toTimestamp());const h=ka(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=PE(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=Na(this.serializer),t.removeTarget=e,this.q_(t)}}class vw extends Vp{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=SE(e.writeResults,e.commitTime),n=Be(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Na(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>$i(this.serializer,n)))};this.q_(t)}}/**
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
 */class Aw{}class bw extends Aw{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Da(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(P.UNKNOWN,i.toString())}))}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Da(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function Rw(r,e,t,n){return new bw(r,e,t,n)}class Sw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ue(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const kn="RemoteStore";class Pw{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{n.enqueueAndForget((async()=>{On(this)&&(x(kn,"Restarting streams for network reachability change."),await(async function(u){const h=G(u);h.Ia.add(4),await Bs(h),h.Va.set("Unknown"),h.Ia.delete(4),await To(h)})(this))}))})),this.Va=new Sw(n,s)}}async function To(r){if(On(r))for(const e of r.Ra)await e(!0)}async function Bs(r){for(const e of r.Ra)await e(!1)}function xp(r,e){const t=G(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),xc(t)?Vc(t):Rr(t).O_()&&Cc(t,e))}function Pc(r,e){const t=G(r),n=Rr(t);t.Ea.delete(e),n.O_()&&kp(t,e),t.Ea.size===0&&(n.O_()?n.L_():On(t)&&t.Va.set("Unknown"))}function Cc(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Rr(r).Z_(e)}function kp(r,e){r.da.$e(e),Rr(r).X_(e)}function Vc(r){r.da=new IE({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Rr(r).start(),r.Va.ua()}function xc(r){return On(r)&&!Rr(r).x_()&&r.Ea.size>0}function On(r){return G(r).Ia.size===0}function Dp(r){r.da=void 0}async function Cw(r){r.Va.set("Online")}async function Vw(r){r.Ea.forEach(((e,t)=>{Cc(r,e)}))}async function xw(r,e){Dp(r),xc(r)?(r.Va.ha(e),Vc(r)):r.Va.set("Unknown")}async function kw(r,e,t){if(r.Va.set("Online"),e instanceof Jf&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))})(r,e)}catch(n){x(kn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Qi(r,n)}else if(e instanceof Ri?r.da.Xe(e):e instanceof Qf?r.da.st(e):r.da.tt(e),!t.isEqual(U.min()))try{const n=await Sp(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(Ee.EMPTY_BYTE_STRING,f.snapshotVersion)),kp(i,u);const m=new ft(f.target,u,h,f.sequenceNumber);Cc(i,m)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){x(kn,"Failed to raise snapshot:",n),await Qi(r,n)}}async function Qi(r,e,t){if(!en(e))throw e;r.Ia.add(1),await Bs(r),r.Va.set("Offline"),t||(t=()=>Sp(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{x(kn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await To(r)}))}function Np(r,e){return e().catch((t=>Qi(r,t,e)))}async function js(r){const e=G(r),t=Xt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:In;for(;Dw(e);)try{const s=await fw(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,Nw(e,s)}catch(s){await Qi(e,s)}Op(e)&&Mp(e)}function Dw(r){return On(r)&&r.Ta.length<10}function Nw(r,e){r.Ta.push(e);const t=Xt(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function Op(r){return On(r)&&!Xt(r).x_()&&r.Ta.length>0}function Mp(r){Xt(r).start()}async function Ow(r){Xt(r).ra()}async function Mw(r){const e=Xt(r);for(const t of r.Ta)e.ea(t.mutations)}async function Lw(r,e,t){const n=r.Ta.shift(),s=_c.from(n,e,t);await Np(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await js(r)}async function Fw(r,e){e&&Xt(r).Y_&&await(async function(n,s){if((function(o){return gE(o)&&o!==P.ABORTED})(s.code)){const i=n.Ta.shift();Xt(n).B_(),await Np(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await js(n)}})(r,e),Op(r)&&Mp(r)}async function Ch(r,e){const t=G(r);t.asyncQueue.verifyOperationInProgress(),x(kn,"RemoteStore received new credentials");const n=On(t);t.Ia.add(3),await Bs(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await To(t)}async function Uw(r,e){const t=G(r);e?(t.Ia.delete(2),await To(t)):e||(t.Ia.add(2),await Bs(t),t.Va.set("Unknown"))}function Rr(r){return r.ma||(r.ma=(function(t,n,s){const i=G(t);return i.sa(),new ww(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:Cw.bind(null,r),Yo:Vw.bind(null,r),t_:xw.bind(null,r),H_:kw.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),xc(r)?Vc(r):r.Va.set("Unknown")):(await r.ma.stop(),Dp(r))}))),r.ma}function Xt(r){return r.fa||(r.fa=(function(t,n,s){const i=G(t);return i.sa(),new vw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Ow.bind(null,r),t_:Fw.bind(null,r),ta:Mw.bind(null,r),na:Lw.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await js(r)):(await r.fa.stop(),r.Ta.length>0&&(x(kn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
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
 */class kc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new kc(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Dc(r,e){if(Ue("AsyncQueue",`${e}: ${r}`),en(r))return new D(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
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
 */class rr{static emptySet(e){return new rr(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=Jr(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof rr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new rr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class Vh{constructor(){this.ga=new he(M.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):L(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class yr{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new yr(e,t,rr.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ho(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class Bw{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class jw{constructor(){this.queries=xh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=G(t),i=s.queries;s.queries=xh(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new D(P.ABORTED,"Firestore shutting down"))}}function xh(){return new wt((r=>Of(r)),ho)}async function zw(r,e){const t=G(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Bw,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Dc(o,`Initialization of query '${Hn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Nc(t)}async function qw(r,e){const t=G(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function $w(r,e){const t=G(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&Nc(t)}function Gw(r,e,t){const n=G(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function Nc(r){r.Ca.forEach((e=>{e.next()}))}var ja,kh;(kh=ja||(ja={})).Ma="default",kh.Cache="cache";class Kw{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new yr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=yr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ja.Cache}}/**
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
 */class Lp{constructor(e){this.key=e}}class Fp{constructor(e){this.key=e}}class Hw{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Q(),this.mutatedKeys=Q(),this.eu=Mf(e),this.tu=new rr(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Vh,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const E=s.get(f),S=Fs(this.query,m)?m:null,k=!!E&&this.mutatedKeys.has(E.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let V=!1;E&&S?E.data.isEqual(S.data)?k!==N&&(n.track({type:3,doc:S}),V=!0):this.su(E,S)||(n.track({type:2,doc:S}),V=!0,(u&&this.eu(S,u)>0||h&&this.eu(S,h)<0)&&(c=!0)):!E&&S?(n.track({type:0,doc:S}),V=!0):E&&!S&&(n.track({type:1,doc:E}),V=!0,(u||h)&&(c=!0)),V&&(S?(o=o.add(S),i=N?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,m)=>(function(S,k){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Vt:V})}};return N(S)-N(k)})(f.type,m.type)||this.eu(f.doc,m.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new yr(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Vh,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Q(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const t=[];return e.forEach((n=>{this.Ya.has(n)||t.push(new Fp(n))})),this.Ya.forEach((n=>{e.has(n)||t.push(new Lp(n))})),t}cu(e){this.Za=e.ks,this.Ya=Q();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return yr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Oc="SyncEngine";class Ww{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Qw{constructor(e){this.key=e,this.hu=!1}}class Jw{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new wt((c=>Of(c)),ho),this.Eu=new Map,this.Iu=new Set,this.Ru=new he(M.comparator),this.Au=new Map,this.Vu=new vc,this.du={},this.mu=new Map,this.fu=xn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Yw(r,e,t=!0){const n=$p(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Up(n,e,t,!0),s}async function Xw(r,e){const t=$p(r);await Up(t,e,!0,!1)}async function Up(r,e,t,n){const s=await pw(r.localStore,Je(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await Zw(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&xp(r.remoteStore,s),c}async function Zw(r,e,t,n,s){r.pu=(m,E,S)=>(async function(N,V,K,q){let B=V.view.ru(K);B.bs&&(B=await Ah(N.localStore,V.query,!1).then((({documents:T})=>V.view.ru(T,B))));const te=q&&q.targetChanges.get(V.targetId),ee=q&&q.targetMismatches.get(V.targetId)!=null,H=V.view.applyChanges(B,N.isPrimaryClient,te,ee);return Nh(N,V.targetId,H.au),H.snapshot})(r,m,E,S);const i=await Ah(r.localStore,e,!0),o=new Hw(e,i.ks),c=o.ru(i.documents),u=Us.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);Nh(r,t,h.au);const f=new Ww(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function ev(r,e,t){const n=G(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter((o=>!ho(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Ua(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Pc(n.remoteStore,s.targetId),za(n,s.targetId)})).catch(Nn)):(za(n,s.targetId),await Ua(n.localStore,s.targetId,!0))}async function tv(r,e){const t=G(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Pc(t.remoteStore,n.targetId))}async function nv(r,e,t){const n=Gp(r);try{const s=await(function(o,c){const u=G(o),h=ne.now(),f=c.reduce(((S,k)=>S.add(k.key)),Q());let m,E;return u.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let k=Ge(),N=Q();return u.xs.getEntries(S,f).next((V=>{k=V,k.forEach(((K,q)=>{q.isValidDocument()||(N=N.add(K))}))})).next((()=>u.localDocuments.getOverlayedDocuments(S,k))).next((V=>{m=V;const K=[];for(const q of c){const B=pE(q,m.get(q.key).overlayedDocument);B!=null&&K.push(new vt(q.key,B,Rf(B.value.mapValue),ze.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,K,c)})).next((V=>{E=V;const K=V.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(S,V.batchId,K)}))})).then((()=>({batchId:E.batchId,changes:Ff(m)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new he($)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(n,s.batchId,t),await zs(n,s.changes),await js(n.remoteStore)}catch(s){const i=Dc(s,"Failed to persist write");t.reject(i)}}async function Bp(r,e){const t=G(r);try{const n=await hw(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?F(o.hu,14607):s.removedDocuments.size>0&&(F(o.hu,42227),o.hu=!1))})),await zs(t,n,e)}catch(n){await Nn(n)}}function Dh(r,e,t){const n=G(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=G(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const E of m.Sa)E.va(c)&&(h=!0)})),h&&Nc(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function rv(r,e,t){const n=G(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new he(M.comparator);o=o.insert(i,me.newNoDocument(i,U.min()));const c=Q().add(i),u=new mo(U.min(),new Map,new he($),o,c);await Bp(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),Mc(n)}else await Ua(n.localStore,e,!1).then((()=>za(n,e,t))).catch(Nn)}async function sv(r,e){const t=G(r),n=e.batch.batchId;try{const s=await lw(t.localStore,e);zp(t,n,null),jp(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await zs(t,s)}catch(s){await Nn(s)}}async function iv(r,e,t){const n=G(r);try{const s=await(function(o,c){const u=G(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(F(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);zp(n,e,t),jp(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await zs(n,s)}catch(s){await Nn(s)}}function jp(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function zp(r,e,t){const n=G(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function za(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((n=>{r.Vu.containsKey(n)||qp(r,n)}))}function qp(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(Pc(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),Mc(r))}function Nh(r,e,t){for(const n of t)n instanceof Lp?(r.Vu.addReference(n.key,e),ov(r,n)):n instanceof Fp?(x(Oc,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||qp(r,n.key)):L(19791,{wu:n})}function ov(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(x(Oc,"New document in limbo: "+t),r.Iu.add(n),Mc(r))}function Mc(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new M(Z.fromString(e)),n=r.fu.next();r.Au.set(n,new Qw(t)),r.Ru=r.Ru.insert(t,n),xp(r.remoteStore,new ft(Je(lo(t.path)),n,"TargetPurposeLimboResolution",Qe.ce))}}async function zs(r,e,t){const n=G(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{o.push(n.pu(u,e,t).then((h=>{if((h||t)&&n.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;n.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Rc.Is(u.targetId,h);i.push(f)}})))})),await Promise.all(o),n.Pu.H_(s),await(async function(u,h){const f=G(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>A.forEach(h,(E=>A.forEach(E.Ts,(S=>f.persistence.referenceDelegate.addReference(m,E.targetId,S))).next((()=>A.forEach(E.Es,(S=>f.persistence.referenceDelegate.removeReference(m,E.targetId,S)))))))))}catch(m){if(!en(m))throw m;x(Sc,"Failed to update sequence numbers: "+m)}for(const m of h){const E=m.targetId;if(!m.fromCache){const S=f.vs.get(E),k=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(k);f.vs=f.vs.insert(E,N)}}})(n.localStore,i))}async function av(r,e){const t=G(r);if(!t.currentUser.isEqual(e)){x(Oc,"User change. New user:",e.toKey());const n=await Rp(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new D(P.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await zs(t,n.Ns)}}function cv(r,e){const t=G(r),n=t.Au.get(e);if(n&&n.hu)return Q().add(n.key);{let s=Q();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function $p(r){const e=G(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Bp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=cv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=rv.bind(null,e),e.Pu.H_=$w.bind(null,e.eventManager),e.Pu.yu=Gw.bind(null,e.eventManager),e}function Gp(r){const e=G(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=sv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iv.bind(null,e),e}class Rs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Io(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return bp(this.persistence,new Ap,e.initialUser,this.serializer)}Cu(e){return new Ac(yo.Vi,this.serializer)}Du(e){return new Pp}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Rs.provider={build:()=>new Rs};class uv extends Rs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof Wi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ip(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new Ac((n=>Wi.Vi(n,t)),this.serializer)}}class lv extends Rs{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Gp(this.xu.syncEngine),await js(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return bp(this.persistence,new Ap,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Ip(n,e.asyncQueue,t)}Mu(e,t){const n=new uT(t,this.persistence);return new cT(e.asyncQueue,n)}Cu(e){const t=ow(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new bc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Ew(),Pi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Pp}}class Ji{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Dh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=av.bind(null,this.syncEngine),await Uw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new jw})()}createDatastore(e){const t=Io(e.databaseInfo.databaseId),n=Tw(e.databaseInfo);return Rw(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new Pw(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Dh(this.syncEngine,t,0)),(function(){return Sh.v()?new Sh:new gw})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const m=new Jw(s,i,o,c,u,h);return f&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const n=G(t);x(kn,"RemoteStore shutting down."),n.Ia.add(5),await Bs(n),n.Aa.shutdown(),n.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ji.provider={build:()=>new Ji};/**
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
 */class hv{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ue("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const Zt="FirestoreClient";class dv{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=Ce.UNAUTHENTICATED,this.clientId=rc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{x(Zt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(x(Zt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Dc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function oa(r,e){r.asyncQueue.verifyOperationInProgress(),x(Zt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Rp(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Oh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await fv(r);x(Zt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>Ch(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>Ch(e.remoteStore,s))),r._onlineComponents=e}async function fv(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){x(Zt,"Using user provided OfflineComponentProvider");try{await oa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Rn("Error using user provided cache. Falling back to memory cache: "+t),await oa(r,new Rs)}}else x(Zt,"Using default OfflineComponentProvider"),await oa(r,new uv(void 0));return r._offlineComponents}async function Kp(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(x(Zt,"Using user provided OnlineComponentProvider"),await Oh(r,r._uninitializedComponentsProvider._online)):(x(Zt,"Using default OnlineComponentProvider"),await Oh(r,new Ji))),r._onlineComponents}function pv(r){return Kp(r).then((e=>e.syncEngine))}async function Mh(r){const e=await Kp(r),t=e.eventManager;return t.onListen=Yw.bind(null,e.syncEngine),t.onUnlisten=ev.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Xw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=tv.bind(null,e.syncEngine),t}function mv(r,e,t,n){const s=new hv(n),i=new Kw(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>zw(await Mh(r),i))),()=>{s.Nu(),r.asyncQueue.enqueueAndForget((async()=>qw(await Mh(r),i)))}}function gv(r,e){const t=new Gt;return r.asyncQueue.enqueueAndForget((async()=>nv(await pv(r),e,t))),t.promise}/**
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
 */function Hp(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
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
 */const _v="ComponentProvider",Lh=new Map;function yv(r,e,t,n,s){return new FT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Hp(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const Wp="firestore.googleapis.com",Fh=!0;class Uh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Wp,this.ssl=Fh}else this.host=e.host,this.ssl=e.ssl??Fh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=pp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yp)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}sT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hp(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Eo{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Uh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Uh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new WI;switch(n.type){case"firstParty":return new XI(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Lh.get(t);n&&(x(_v,"Removing Datastore"),Lh.delete(t),n.terminate())})(this),Promise.resolve()}}function Iv(r,e,t,n={}){r=Kt(r,Eo);const s=Tr(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&$a(`https://${c}`),i.host!==Wp&&i.host!==c&&Rn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:n};if(!Qt(u,o)&&(r._setSettings(u),n.mockUserToken)){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=Ce.MOCK_USER;else{h=Tg(n.mockUserToken,r._app?.options.projectId);const m=n.mockUserToken.sub||n.mockUserToken.user_id;if(!m)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ce(m)}r._authCredentials=new QI(new Xd(h,f))}}/**
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
 */class Mn{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Mn(this.firestore,e,this._query)}}class _e{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Os(t,_e._jsonSchema))return new _e(e,n||null,new M(Z.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:Te("string",_e._jsonSchemaVersion),referencePath:Te("string")};class Wt extends Mn{constructor(e,t,n){super(e,t,lo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new M(e))}withConverter(e){return new Wt(this.firestore,e,this._path)}}function Tv(r,e,...t){if(r=xe(r),ef("collection","path",e),r instanceof Eo){const n=Z.fromString(e,...t);return Pl(n),new Wt(r,null,n)}{if(!(r instanceof _e||r instanceof Wt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return Pl(n),new Wt(r.firestore,null,n)}}function aa(r,e,...t){if(r=xe(r),arguments.length===1&&(e=rc.newId()),ef("doc","path",e),r instanceof Eo){const n=Z.fromString(e,...t);return Sl(n),new _e(r,null,new M(n))}{if(!(r instanceof _e||r instanceof Wt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return Sl(n),new _e(r.firestore,r instanceof Wt?r.converter:null,new M(n))}}/**
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
 */const Bh="AsyncQueue";class jh{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Cp(this,"async_queue_retry"),this._c=()=>{const n=Pi();n&&x(Bh,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=Pi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Pi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Gt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!en(e))throw e;x(Bh,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,Ue("INTERNAL UNHANDLED ERROR: ",zh(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=kc.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:zh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function zh(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class Ss extends Eo{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new jh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new jh(e),this._firestoreClient=void 0,await e}}}function Ev(r,e,t){t||(t=Is);const n=Zi(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(Qt(i,e))return s;throw new D(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yp)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Tr(e.host)&&$a(e.host),n.initialize({options:e,instanceIdentifier:t})}function di(r,e){const t=Ha(),n=Is,s=Zi(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=yg("firestore");i&&Iv(s,...i)}return s}function Qp(r){if(r._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||wv(r),r._firestoreClient}function wv(r){const e=r._freezeSettings(),t=yv(r._databaseId,r._app?.options.appId||"",r._persistenceKey,r._app?.options.apiKey,e);r._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new dv(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}/**
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
 */class We{constructor(e){this._byteString=e}static fromBase64String(e){try{return new We(Ee.fromBase64String(e))}catch(t){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new We(Ee.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:We._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Os(e,We._jsonSchema))return We.fromBase64String(e.bytes)}}We._jsonSchemaVersion="firestore/bytes/1.0",We._jsonSchema={type:Te("string",We._jsonSchemaVersion),bytes:Te("string")};/**
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
 */class Lc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Fc{constructor(e){this._methodName=e}}/**
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
 */class ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(e){if(Os(e,ut._jsonSchema))return new ut(e.latitude,e.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:Te("string",ut._jsonSchemaVersion),latitude:Te("number"),longitude:Te("number")};/**
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
 */class Ze{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ze._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Os(e,Ze._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ze(e.vectorValues);throw new D(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ze._jsonSchemaVersion="firestore/vectorValue/1.0",Ze._jsonSchema={type:Te("string",Ze._jsonSchemaVersion),vectorValues:Te("object")};/**
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
 */const vv=/^__.*__$/;class Av{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new vt(e,this.data,this.fieldMask,t,this.fieldTransforms):new br(e,this.data,t,this.fieldTransforms)}}class Jp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new vt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Yp(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{dataSource:r})}}class Uc{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Uc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Yi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Yp(this.dataSource)&&vv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class bv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Io(e)}I(e,t,n,s=!1){return new Uc({dataSource:e,methodName:t,targetDoc:n,path:fe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Bc(r){const e=r._freezeSettings(),t=Io(r._databaseId);return new bv(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Rv(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);jc("Data must be an object, but it was:",o,n);const c=Xp(n,o);let u,h;if(i.merge)u=new je(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const E=Ir(e,m,t);if(!o.contains(E))throw new D(P.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);tm(f,E)||f.push(E)}u=new je(f),h=o.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=o.fieldTransforms;return new Av(new Oe(c),u,h)}class wo extends Fc{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof wo}}function Sv(r,e,t,n){const s=r.I(1,e,t);jc("Data must be an object, but it was:",s,n);const i=[],o=Oe.empty();tn(n,((u,h)=>{const f=em(e,u,t);h=xe(h);const m=s.fc(f);if(h instanceof wo)i.push(f);else{const E=qs(h,m);E!=null&&(i.push(f),o.set(f,E))}}));const c=new je(i);return new Jp(o,c,s.fieldTransforms)}function Pv(r,e,t,n,s,i){const o=r.I(1,e,t),c=[Ir(e,n,t)],u=[s];if(i.length%2!=0)throw new D(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)c.push(Ir(e,i[E])),u.push(i[E+1]);const h=[],f=Oe.empty();for(let E=c.length-1;E>=0;--E)if(!tm(h,c[E])){const S=c[E];let k=u[E];k=xe(k);const N=o.fc(S);if(k instanceof wo)h.push(S);else{const V=qs(k,N);V!=null&&(h.push(S),f.set(S,V))}}const m=new je(h);return new Jp(f,m,o.fieldTransforms)}function Cv(r,e,t,n=!1){return qs(t,r.I(n?4:3,e))}function qs(r,e){if(Zp(r=xe(r)))return jc("Unsupported field value:",e,r),Xp(r,e);if(r instanceof Fc)return(function(n,s){if(!Yp(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let u=qs(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=xe(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return aE(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=ne.fromDate(n);return{timestampValue:_r(s.serializer,i)}}if(n instanceof ne){const i=new ne(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:_r(s.serializer,i)}}if(n instanceof ut)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof We)return{bytesValue:Yf(s.serializer,n._byteString)};if(n instanceof _e){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Tc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ze)return(function(o,c){const u=o instanceof Ze?o.toArray():o;return{mapValue:{fields:{[hc]:{stringValue:dc},[hr]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return pc(c.serializer,f)}))}}}}}})(n,s);if(cp(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${no(n)}`)})(r,e)}function Xp(r,e){const t={};return _f(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):tn(r,((n,s)=>{const i=qs(s,e.dc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Zp(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ne||r instanceof ut||r instanceof We||r instanceof _e||r instanceof Fc||r instanceof Ze||cp(r))}function jc(r,e,t){if(!Zp(t)||!tf(t)){const n=no(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function Ir(r,e,t){if((e=xe(e))instanceof Lc)return e._internalPath;if(typeof e=="string")return em(r,e);throw Yi("Field path arguments must be of type string or ",r,!1,void 0,t)}const Vv=new RegExp("[~\\*/\\[\\]]");function em(r,e,t){if(e.search(Vv)>=0)throw Yi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Lc(...e.split("."))._internalPath}catch{throw Yi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Yi(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new D(P.INVALID_ARGUMENT,c+r+u)}function tm(r,e){return r.some((t=>t.isEqual(e)))}/**
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
 */class xv{convertValue(e,t="none"){switch(Jt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return tn(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){const t=e.fields?.[hr].arrayValue?.values?.map((n=>le(n.doubleValue)));return new Ze(t)}convertGeoPoint(e){return new ut(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=co(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ys(e));default:return null}}convertTimestamp(e){const t=It(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Z.fromString(e);F(ap(n),9688,{name:e});const s=new Sn(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(t)||Ue(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class nm extends xv{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}const qh="@firebase/firestore",$h="4.14.0";/**
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
 */function Gh(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
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
 */class rm{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new kv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Ir("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class kv extends rm{data(){return super.data()}}/**
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
 */function Dv(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class zc{}class sm extends zc{}function Nv(r,e,...t){let n=[];e instanceof zc&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof $c)).length,c=i.filter((u=>u instanceof qc)).length;if(o>1||o>0&&c>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class qc extends sm{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new qc(e,t,n)}_apply(e){const t=this._parse(e);return im(e._query,t),new Mn(e.firestore,e.converter,Va(e._query,t))}_parse(e){const t=Bc(e.firestore);return(function(i,o,c,u,h,f,m){let E;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Hh(m,f);const k=[];for(const N of m)k.push(Kh(u,i,N));E={arrayValue:{values:k}}}else E=Kh(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Hh(m,f),E=Cv(c,o,m,f==="in"||f==="not-in");return Y.create(h,f,E)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class $c extends zc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new $c(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:re.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)im(o,u),o=Va(o,u)})(e._query,t),new Mn(e.firestore,e.converter,Va(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Gc extends sm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Gc(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new vs(i,o)})(e._query,this._field,this._direction);return new Mn(e.firestore,e.converter,ZT(e._query,t))}}function Ov(r,e="asc"){const t=e,n=Ir("orderBy",r);return Gc._create(n,t)}function Kh(r,e,t){if(typeof(t=xe(t))=="string"){if(t==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nf(e)&&t.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(Z.fromString(t));if(!M.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Es(r,new M(n))}if(t instanceof _e)return Es(r,t._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${no(t)}.`)}function Hh(r,e){if(!Array.isArray(r)||r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function im(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Mv(r,e,t){let n;return n=r?r.toFirestore(e):e,n}class Lv{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Bv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Fv(r){return new Lv(r)}class Uv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ji.provider,this._offlineComponentProvider={build:t=>new lv(t,e?.cacheSizeBytes,this.forceOwnership)}}}function Bv(r){return new Uv(r?.forceOwnership)}class Zr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wn extends rm{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ci(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Ir("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",wn._jsonSchema={type:Te("string",wn._jsonSchemaVersion),bundleSource:Te("string","DocumentSnapshot"),bundleName:Te("string"),bundle:Te("string")};class Ci extends wn{data(e={}){return super.data(e)}}class sr{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Zr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Ci(this._firestore,this._userDataWriter,n.key,n,new Zr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new Ci(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Ci(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:jv(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=sr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=rc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function jv(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:r})}}/**
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
 */sr._jsonSchemaVersion="firestore/querySnapshot/1.0",sr._jsonSchema={type:Te("string",sr._jsonSchemaVersion),bundleSource:Te("string","QuerySnapshot"),bundleName:Te("string"),bundle:Te("string")};function zv(r,e,t){r=Kt(r,_e);const n=Kt(r.firestore,Ss),s=Mv(r.converter,e),i=Bc(n);return om(n,[Rv(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,ze.none())])}function Wh(r,e,t,...n){r=Kt(r,_e);const s=Kt(r.firestore,Ss),i=Bc(s);let o;return o=typeof(e=xe(e))=="string"||e instanceof Lc?Pv(i,"updateDoc",r._key,e,t,n):Sv(i,"updateDoc",r._key,e),om(s,[o.toMutation(r._key,ze.exists(!0))])}function qv(r,...e){r=xe(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Gh(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Gh(e[n])){const h=e[n];e[n]=h.next?.bind(h),e[n+1]=h.error?.bind(h),e[n+2]=h.complete?.bind(h)}let i,o,c;if(r instanceof _e)o=Kt(r.firestore,Ss),c=lo(r._key.path),i={next:h=>{e[n]&&e[n]($v(o,r,h))},error:e[n+1],complete:e[n+2]};else{const h=Kt(r,Mn);o=Kt(h.firestore,Ss),c=h._query;const f=new nm(o);i={next:m=>{e[n]&&e[n](new sr(o,f,h,m))},error:e[n+1],complete:e[n+2]},Dv(r._query)}const u=Qp(o);return mv(u,c,s,i)}function om(r,e){const t=Qp(r);return gv(t,e)}function $v(r,e,t){const n=t.docs.get(e._key),s=new nm(r);return new wn(r,s,e._key,n,new Zr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){HI(Er),ir(new vn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new Ss(new JI(n.getProvider("auth-internal")),new ZI(o,n.getProvider("app-check-internal")),UT(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),qt(qh,$h,e),qt(qh,$h,"esm2020")})();async function ca(r,e=3,t=1e3){const n=["unavailable","deadline-exceeded","resource-exhausted","internal","aborted"];let s;for(let i=0;i<=e;i++)try{return await r()}catch(o){s=o;const c=o?.code;if(c&&n.includes(c)&&i<e){const h=t*Math.pow(2,i)+Math.random()*100;await new Promise(f=>setTimeout(f,h))}else throw o}throw s}const Gv=sessionStorage.getItem("ux-auditor-api-key")||"",fi=typeof __app_id<"u"?__app_id:"ux-auditor-v2",Nt=typeof __firebase_config<"u"?JSON.parse(__firebase_config):null,qa=[{name:"Mobile",width:375,height:667},{name:"Tablet",width:768,height:1024},{name:"Desktop",width:1440,height:900}];function Kv(){const r=Jh(),[e,t]=ce.useState(null),[n,s]=ce.useState(null),[i,o]=ce.useState("https://arii.github.io/tech-dancer/refactor-ci-visual-logic-ts-3280261073331696239/"),[c,u]=ce.useState(sessionStorage.getItem("ux-auditor-api-key")||""),{snapshotService:h,setSnapshotService:f,getSnapshotUrl:m,fetchSnapshot:E}=lg(),[S,k]=ce.useState(!1),[N,V]=ce.useState(!1);ce.useEffect(()=>{if(!S)return;const y=setTimeout(()=>k(!1),2e3);return()=>clearTimeout(y)},[S]),ce.useEffect(()=>{if(!N)return;const y=setTimeout(()=>V(!1),1e3);return()=>clearTimeout(y)},[N]),ce.useEffect(()=>{if(!Nt)return;const y=k_().length===0?hd(Nt):Ha();try{Ev(y,{localCache:Fv({})})}catch{}const w=GI(y);(async()=>{try{typeof __initial_auth_token<"u"&&__initial_auth_token?await xy(w,__initial_auth_token):await Ry(w)}catch(de){console.error("Firebase auth error:",de)}})();const j=Ny(w,t);return()=>j()},[]);const{data:K=[]}=$m({queryKey:["ux-reports",e?.uid],queryFn:()=>r.getQueryData(["ux-reports",e?.uid])??[],enabled:!!e&&!!Nt,staleTime:1/0,gcTime:1/0});ce.useEffect(()=>{if(!e||!Nt)return;const y=di(),w=Nv(Tv(y,"artifacts",fi,"users",e.uid,"ux_reports"),Ov("timestamp","desc")),g=qv(w,j=>{const de=j.docs.map(we=>({id:we.id,...we.data()}));r.setQueryData(["ux-reports",e.uid],de)},j=>console.error("Firestore error:",j));return()=>g()},[e,r]);const q=Xm({mutationFn:async y=>{const w=Date.now().toString(),g={id:w,url:y,timestamp:Date.now(),status:"processing"};if(s(w),r.setQueryData(["ux-reports",e?.uid],(j=[])=>[g,...j]),e&&Nt){const j=di();await ca(()=>zv(aa(j,"artifacts",fi,"users",e.uid,"ux_reports",w),g))}for(const j of qa){let de=`https://placehold.co/${j.width}x${j.height}/6366f1/ffffff?text=${j.name}+Analysis+Pending`,we="";try{const Pe=m(y,j);we=await E(Pe),de=we}catch{console.error("Failed to fetch snapshot, using placeholder")}const et=await ee(j,y,we);if(g[`findings_${j.name.toLowerCase()}`]=et,g[`image_${j.name.toLowerCase()}`]=de,r.setQueryData(["ux-reports",e?.uid],(Pe=[])=>Pe.map(tt=>tt.id===w?{...g}:tt)),e&&Nt){const Pe=di();await ca(()=>Wh(aa(Pe,"artifacts",fi,"users",e.uid,"ux_reports",w),{[`findings_${j.name.toLowerCase()}`]:et,[`image_${j.name.toLowerCase()}`]:de}))}}if(g.status="completed",r.setQueryData(["ux-reports",e?.uid],(j=[])=>j.map(de=>de.id===w?{...g}:de)),e&&Nt){const j=di();await ca(()=>Wh(aa(j,"artifacts",fi,"users",e.uid,"ux_reports",w),{status:"completed"}))}return g},onSuccess:()=>{r.invalidateQueries({queryKey:["ux-reports",e?.uid]})}}),B=ce.useRef(!1),te=ce.useCallback(y=>{B.current||(B.current=!0,q.mutate(y),setTimeout(()=>{B.current=!1},2e3))},[q]),ee=async(y,w,g)=>{const j=`You are a Senior UX Auditor. Analyze the UI for ${y.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations. Output JSON.`,de=`Analyze the provided snapshot of ${w} for ${y.name} viewport issues.`;try{const we=c||Gv;if(!we)throw new Error("API Key missing");const et=[{text:de}];if(g){const nn=g.match(/^data:(image\/[a-z]+);base64,(.+)$/);nn&&et.push({inline_data:{mime_type:nn[1],data:nn[2]}})}const Pe=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${we}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:et}],systemInstruction:{parts:[{text:j}]},generationConfig:{responseMimeType:"application/json",responseSchema:{type:"OBJECT",properties:{summary:{type:"STRING"},improvements:{type:"ARRAY",items:{type:"OBJECT",properties:{element:{type:"STRING"},issue:{type:"STRING"},suggestion:{type:"STRING"},severity:{type:"NUMBER"}}}}}}}})});if(!Pe.ok){const nn=await Pe.json().catch(()=>({}));throw new Error(nn.error?.message||`HTTP error! status: ${Pe.status}`)}const tt=await Pe.json();if(!tt.candidates?.[0]?.content?.parts?.[0]?.text)throw new Error("Invalid API response structure");return JSON.parse(tt.candidates[0].content.parts[0].text)}catch(we){const et=we instanceof Error?we.message:String(we);console.error("Gemini API Error:",we);const Pe=g?`Here is the base64 encoded snapshot:
${g}`:"[Please attach the image from scripts/ux-capture.js here]";return{summary:`Analysis failed: ${et}. Manual analysis required. Copy the prompt below.`,improvements:[{element:"Manual Audit Required",issue:`The Gemini API returned an error: ${et}`,suggestion:`Prompt: You are a Senior UX Auditor. Analyze the UI for ${y.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations.

${Pe}`.trim(),severity:5}]}}},H=K.find(y=>y.id===n)||null,T=()=>{if(!H)return"";let y=`# Visual UX Audit for ${H.url}

`;return qa.forEach(w=>{const g=H[`findings_${w.name.toLowerCase()}`];g&&(y+=`## ${w.name} Analysis
${g.summary}

`,y+=`| Element | Issue | Suggestion | Severity |
|---|---|---|---|
`,g.improvements?.forEach(j=>{y+=`| ${j.element} | ${j.issue} | ${j.suggestion} | ${j.severity}/10 |
`}),y+=`
`)}),y},_=async()=>{if(!H)return;V(!0);const y=encodeURIComponent(T()),w=encodeURIComponent(`UX Audit Findings: ${H.url}`);let g="https://github.com/new";try{const j=new URL(H.url);if(j.hostname.endsWith(".github.io")){const de=j.hostname.split(".")[0],we=j.pathname.split("/")[1];de&&we&&(g=`https://github.com/${de}/${we}/issues/new`)}}catch{}window.open(`${g}?title=${w}&body=${y}`,"_blank")},I=async()=>{const y=T();try{await navigator.clipboard.writeText(y),k(!0)}catch(w){console.error("Failed to copy markdown:",w)}},v=y=>{u(y),sessionStorage.setItem("ux-auditor-api-key",y)};return{user:e,reports:K,isAnalyzing:q.isPending,activeReport:H,setActiveReport:y=>s(y?.id||null),url:i,setUrl:o,customApiKey:c,setCustomApiKey:v,snapshotService:h,setSnapshotService:f,isCopiedMarkdown:S,isExportingToGithub:N,runUXAudit:te,exportToGithub:_,copyMarkdown:I,firebaseConfig:Nt}}const Hv={Mobile:C.jsx(Ie,{icon:ag,size:"md"}),Tablet:C.jsx(Ie,{icon:ug,size:"md"}),Desktop:C.jsx(Ie,{icon:sg,size:"md"})};function Wv({suggestion:r}){const[e,t]=ce.useState(!1),[n,s]=ce.useState(!1);ce.useEffect(()=>{if(!e)return;const o=setTimeout(()=>{document.startViewTransition?document.startViewTransition(()=>t(!1)):t(!1)},2e3);return()=>clearTimeout(o)},[e]);const i=async()=>{s(!0);try{await navigator.clipboard.writeText(r),await new Promise(o=>setTimeout(o,400)),document.startViewTransition?document.startViewTransition(()=>{t(!0)}):t(!0)}catch(o){console.error("Failed to copy:",o)}finally{s(!1)}};return C.jsxs(ae,{as:"button",onClick:i,disabled:n,marginTop:2,display:"flex",align:"center",gap:1,paddingX:3,paddingY:1,radius:"md",surface:"default",border:!0,className:"hover:border-accent transition-colors hover:text-accent font-bold text-xs",children:[n?C.jsx(Ie,{icon:Yn,size:"xs",className:"animate-spin"}):e?C.jsx(Ie,{icon:ua,size:"xs",color:"accent"}):C.jsx(Ie,{icon:Yh,size:"xs"}),C.jsx("span",{children:n?"Copying...":e?"Copied!":"Copy Prompt"})]})}function Qv({url:r,width:e,height:t}){const n=ce.useRef(null),[s,i]=ce.useState(1),[o,c]=ce.useState(!0);return ce.useEffect(()=>{const u=()=>{if(n.current){const h=n.current.offsetWidth,f=n.current.offsetHeight,m=h/e,E=f/t;i(Math.min(m,E,1))}};return u(),window.addEventListener("resize",u),()=>window.removeEventListener("resize",u)},[e,t]),C.jsxs(ae,{ref:n,width:"full",height:"full",display:"flex",align:"center",justify:"center",overflow:"hidden",position:"relative",className:"bg-surface rounded-xl shadow-2xl border border-line",children:[o&&C.jsx(ae,{position:"absolute",inset:!0,display:"flex",align:"center",justify:"center",zIndex:"docked",surface:"muted",children:C.jsxs(oe,{align:"center",gap:3,children:[C.jsx(Ie,{icon:Yn,size:"md",className:"animate-spin text-accent"}),C.jsx(ge,{variant:"sans",size:"xs",color:"dim",weight:"font-bold",uppercase:!0,tracking:"wider",children:"Loading Preview..."})]})}),C.jsx(ae,{as:"iframe",src:r,title:"Viewport Preview",onLoad:()=>c(!1),width:e,height:t,className:"border-none bg-white origin-center",style:{transform:`scale(${s})`,width:`${e}px`,height:`${t}px`,minWidth:`${e}px`,minHeight:`${t}px`}}),C.jsx(ae,{position:"absolute",bottom:4,right:4,maxWidth:48,pointerEvents:"none",children:C.jsx(ae,{paddingX:2,paddingY:1,radius:"sm",border:!0,className:"bg-bg/80 backdrop-blur-sm",children:C.jsx(ge,{variant:"sans",size:"xs",color:"dim",children:"⚠️ Some sites block embedding via CORS."})})})]})}function Jv({vp:r,data:e,activeReportUrl:t}){return C.jsxs(ae,{className:fn({overflow:"hidden"}),minWidth:0,children:[C.jsxs(oe,{padding:4,border:"b",direction:"row",align:"center",justify:"between",surface:"muted",children:[C.jsxs(oe,{direction:"row",align:"center",gap:3,children:[C.jsx(ae,{width:9,height:9,surface:"default",radius:"lg",shadow:"sm",color:"accent",display:"flex",align:"center",justify:"center",shrink:0,children:Hv[r.name]}),C.jsxs(ge,{variant:"sans",size:"base",weight:"font-bold",children:[r.name," Analysis"]})]}),C.jsxs(ge,{variant:"mono",size:"xs",weight:"font-bold",color:"dim",uppercase:!0,tracking:"widest",children:[r.width,"w × ",r.height,"h"]})]}),C.jsxs(oe,{direction:{base:"col",md:"row"},width:"full",children:[C.jsx(ae,{padding:8,surface:"muted",display:"flex",align:"center",justify:"center",border:{base:"b",md:"r"},minHeight:400,width:{base:"full",md:"41.666%"},children:t?C.jsx(Qv,{url:t,width:r.width,height:r.height},`${r.name}-${t}`):C.jsxs(oe,{align:"center",justify:"center",color:"dim",className:"text-center",children:[C.jsx(ae,{marginBottom:2,children:C.jsx(Ie,{icon:ng,size:"2xl",color:"muted"})}),C.jsx(ge,{variant:"sans",size:"xs",weight:"font-bold",uppercase:!0,tracking:"wider",children:"Awaiting Frame..."})]})}),C.jsx(oe,{gap:6,padding:8,flex:1,minWidth:"0",overflow:"hidden",children:e?C.jsxs(C.Fragment,{children:[C.jsxs(ae,{surface:"alt",padding:5,className:"border border-line rounded-lg",children:[C.jsx(ae,{marginBottom:3,children:C.jsx(ge,{variant:"sans",size:"xs",weight:"font-black",color:"accent",uppercase:!0,display:"block",tracking:"widest",children:"Analysis Summary"})}),C.jsxs(ge,{variant:"sans",size:"sm",weight:"font-medium",className:"leading-relaxed break-words block",children:['"',e.summary,'"']})]}),C.jsx(oe,{gap:4,children:e.improvements?.map((n,s)=>C.jsxs(ae,{padding:4,className:fn({interactive:!0}),children:[C.jsxs(ae,{display:"flex",justify:"between",align:"start",marginBottom:2,children:[C.jsxs(oe,{direction:"row",align:"center",gap:2,children:[C.jsx(ae,{width:2,height:2,radius:"full",className:n.severity>7?"bg-error shadow-sm":"bg-accent-purple shadow-sm"}),C.jsx(ge,{variant:"sans",size:"sm",weight:"font-black",children:n.element})]}),C.jsxs(ge,{variant:"mono",size:"xs",weight:"font-black",paddingX:2,paddingY:.5,radius:"full",surface:"muted",color:"dim",uppercase:!0,title:`Severity level: ${n.severity} out of 10 (1-10 scale)`,children:["SEV ",n.severity]})]}),C.jsx(ge,{variant:"sans",size:"xs",color:"dim",marginBottom:3,children:n.issue}),n.suggestion&&n.suggestion.trim()!==""&&C.jsx(ae,{surface:"muted",padding:3,radius:"lg",border:!0,children:C.jsxs(oe,{direction:{base:"col",sm:"row"},align:"start",gap:2,minWidth:0,children:[C.jsx(ge,{variant:"sans",size:"xs",weight:"font-black",color:"accent",marginTop:.5,uppercase:!0,tracking:"widest",className:"shrink-0",children:"FIX"}),C.jsxs(ae,{flex:1,minWidth:"0",className:"overflow-hidden",children:[C.jsx(ge,{variant:"sans",size:"xs",weight:"font-bold",className:"break-all line-clamp-3",title:n.suggestion,children:n.suggestion}),n.element==="Manual Audit Required"&&C.jsx(Wv,{suggestion:n.suggestion})]})]})})]},s))})]}):C.jsxs(oe,{gap:4,width:"full",children:[C.jsx(ri,{height:20,width:"full"}),C.jsxs(oe,{gap:2,children:[C.jsx(ri,{height:4,width:"full"}),C.jsx(ri,{height:4,width:"full"}),C.jsx(ri,{height:4,width:"3/4"})]})]})})]})]})}function lA(){const r=Hm.find(V=>V.id==="ux-auditor"),{reports:e,isAnalyzing:t,activeReport:n,setActiveReport:s,url:i,setUrl:o,customApiKey:c,setCustomApiKey:u,snapshotService:h,setSnapshotService:f,isCopiedMarkdown:m,isExportingToGithub:E,runUXAudit:S,exportToGithub:k,copyMarkdown:N}=Kv();return C.jsxs(oe,{gap:8,width:"full",children:[C.jsx(Km,{title:"Visual UX Auditor | Perception Telemetry System",description:"Run automated visual UX audits on any URL using multimodal AI. Identify usability issues and get improvement suggestions for Mobile, Tablet, and Desktop.",canonical:`${jm}${r?.canonicalPath||"/ux-auditor"}`}),C.jsxs(oe,{direction:{base:"col",xl:"row"},align:{base:"stretch",xl:"center"},justify:"between",gap:6,border:"b",paddingBottom:6,children:[C.jsx(ae,{children:C.jsx(Gm,{label:"Visual UX Auditor",title:"Multimodal AI Analysis",description:"Automated visual regression and UX improvement suggestions across viewports."})}),C.jsxs(oe,{gap:4,as:"form",autoComplete:"off",onSubmit:V=>{V.preventDefault(),S(i)},children:[C.jsxs(oe,{direction:"row",align:"center",gap:3,padding:2,className:fn(),children:[C.jsx(ae,{as:"input",id:"audit-url",name:"audit-url",type:"url",autoComplete:"off",value:i,title:i,onChange:V=>o(V.target.value),onFocus:V=>V.target.select(),className:"bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm",flex:1,minWidth:0,paddingX:4,paddingY:2,radius:"lg",placeholder:"https://...","aria-label":"URL to audit"}),C.jsxs(ae,{as:"button",onClick:()=>S(i),disabled:t,display:"flex",align:"center",gap:2,className:"bg-accent hover:opacity-solid text-bg font-bold transition-all disabled:opacity-muted",paddingX:6,paddingY:2,radius:"md",children:[t?C.jsx(Ie,{icon:Yn,size:"sm",className:"animate-spin"}):C.jsx(Ie,{icon:Ju,size:"sm"}),t?"Auditing...":"Start Audit"]})]}),C.jsxs(oe,{gap:2,children:[C.jsxs(oe,{direction:"row",align:"center",gap:3,padding:2,className:fn(),children:[C.jsx(ge,{variant:"mono",size:"xs",color:"dim",paddingLeft:2,uppercase:!0,weight:"font-bold",children:"API KEY"}),C.jsx(ae,{as:"input",id:"audit-api-key",name:"audit-api-key",type:"password",autoComplete:"new-password",value:c,onChange:V=>u(V.target.value),onFocus:V=>V.target.select(),className:"bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm",flex:1,paddingX:4,paddingY:2,radius:"lg",placeholder:"OpenAI or Gemini API Key (optional override)","aria-label":"API Key"}),c&&C.jsx(ae,{as:"button",onClick:()=>u(""),display:"flex",align:"center",justify:"center",padding:2,radius:"md",className:"hover:bg-surface-alt text-dim hover:text-error transition-colors",title:"Clear API Key",children:C.jsx(Ie,{icon:Wm,size:"sm"})})]}),C.jsx(ge,{variant:"sans",size:"xs",color:"warning",paddingX:2,weight:"font-medium",children:"⚠️ API keys are stored in your browser's session storage. They are cleared when you close the tab. Plain-text storage is not fully secure; use only on trusted devices."})]}),C.jsxs(oe,{gap:1,children:[C.jsxs(oe,{direction:"row",align:"center",gap:3,padding:2,className:fn(),children:[C.jsx(ge,{variant:"mono",size:"xs",color:"dim",paddingLeft:2,uppercase:!0,weight:"font-bold",children:"SNAPSHOT SERVICE"}),C.jsx(ae,{as:"input",id:"audit-snapshot-url",name:"audit-snapshot-url",type:"url",autoComplete:"off",value:h,onChange:V=>f(V.target.value),onFocus:V=>V.target.select(),className:"bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main truncate text-sm",flex:1,paddingX:4,paddingY:2,radius:"lg",placeholder:"Custom service URL with {url}, {width}, {height} (optional)","aria-label":"Snapshot Service URL"})]}),C.jsxs(ge,{variant:"sans",size:"xs",color:"dim",paddingX:2,marginTop:1,children:["Use ","{url}",", ","{width}",", and ","{height}"," as placeholders. Example: https://api.service.com?url=","{url}","&size=","{width}","x","{height}"]})]})]})]}),C.jsxs(zm,{cols:{base:1,lg:4},gap:8,children:[C.jsxs(oe,{gap:4,span:{lg:1},minWidth:0,children:[C.jsx(ge,{variant:"sans",size:"xs",weight:"font-bold",uppercase:!0,tracking:"widest",color:"dim",paddingX:1,children:"Audit History"}),C.jsxs(oe,{className:`${fn({overflow:"hidden"})} divide-y divide-line`,minWidth:0,children:[e.length===0&&C.jsx(Qu,{compact:!0,title:"No history",icon:C.jsx(Ie,{icon:Yn,size:"sm",color:"muted"})}),e.map(V=>C.jsxs(oe,{as:"button",direction:"row",onClick:()=>s(V),width:"full",align:"center",gap:3,padding:4,className:qm({active:n?.id===V.id}),children:[C.jsx(ae,{width:9,height:9,radius:"full",surface:V.status==="completed"?"success":"warning",className:`${V.status!=="completed"?"animate-pulse":""} flex items-center justify-center`,shrink:0,children:V.status==="completed"?C.jsx(Ie,{icon:ua,size:"sm"}):C.jsx(Ie,{icon:Yn,size:"sm"})}),C.jsxs(ae,{flex:1,minWidth:"0",children:[C.jsx(ge,{variant:"sans",size:"sm",weight:"font-bold",className:"truncate block",children:V.url.replace("https://","")}),C.jsx(ge,{variant:"mono",size:"xs",weight:"font-medium",color:"dim",uppercase:!0,children:new Date(V.timestamp).toLocaleTimeString()})]}),C.jsx(Ie,{icon:Qm,size:"sm",color:"muted"})]},V.id))]})]}),C.jsx(oe,{gap:6,span:{lg:3},minWidth:0,width:"full",style:{gridColumn:"span 3 / span 3"},children:n?C.jsxs(C.Fragment,{children:[C.jsxs(oe,{padding:6,className:fn(),justify:"between",align:{base:"start",md:"center"},gap:6,direction:{base:"col",md:"row"},children:[C.jsxs(oe,{gap:1,minWidth:"0",flex:1,children:[C.jsx(ge,{variant:"sans",size:"xs",weight:"font-bold",color:"accent",uppercase:!0,tracking:"widest",display:"block",children:"Current Session"}),C.jsx(ge,{variant:"sans",size:"xl",weight:"font-black",className:"truncate block",title:n.url,children:n.url})]}),C.jsxs(oe,{direction:{base:"col",sm:"row"},gap:3,shrink:0,width:{base:"full",sm:"auto"},align:{base:"stretch",sm:"center"},children:[C.jsxs(ae,{as:"button",onClick:N,display:"flex",align:"center",justify:"center",gap:2,className:Wu({variant:"default"}),surface:"muted",color:"dim",paddingX:4,paddingY:2,radius:"xl",width:{base:"full",sm:"auto"},children:[m?C.jsx(Ie,{icon:ua,size:"sm"}):C.jsx(Ie,{icon:Yh,size:"sm"}),m?"Copied":"Copy MD"]}),C.jsxs(ae,{as:"button",onClick:k,disabled:n.status!=="completed"||E,display:"flex",align:"center",justify:"center",gap:2,className:Wu({variant:"primary"}),paddingX:6,paddingY:2,radius:"xl",width:{base:"full",sm:"auto"},children:[E?C.jsx(Ie,{icon:Yn,size:"sm",className:"animate-spin"}):C.jsx(Ie,{icon:Jm,size:"sm"}),C.jsx("span",{className:"whitespace-nowrap",children:E?"Exporting...":"Export to GitHub Issue"})]})]})]}),C.jsx(oe,{gap:8,children:qa.map(V=>C.jsx(Jv,{vp:V,data:n[`findings_${V.name.toLowerCase()}`],activeReportUrl:n.url},V.name))})]}):C.jsx(Qu,{minHeight:500,icon:C.jsx(Ie,{icon:Ju,size:"xl",color:"muted"}),title:"Ready to Audit",description:"Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop."})})]})]})}export{lA as default};
