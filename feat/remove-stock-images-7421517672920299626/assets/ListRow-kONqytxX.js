import{e as n,k as p,r as m,j as a,c as y,B as c,d as x,N as u,S as k,T as l}from"./index-fy6QwLsC.js";import{C as g,a as f}from"./chevron-right-BS9-JrsO.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],w=n("circle-question-mark",j);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],b=n("cpu",M);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],v=n("globe",N);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],C=n("heart",z);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],L=n("layout-grid",_);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],P=n("list",$);function q(s,r=""){const[e,t]=p(),i=e.get(s)||r,o=m.useCallback(h=>{const d=new URLSearchParams(e);h&&h!==r?d.set(s,h):d.delete(s),t(d,{replace:!0})},[s,r,e,t]);return[i,o]}function B({view:s,onChange:r}){return a.jsx("div",{className:"flex border border-line rounded-none overflow-hidden",children:["card","list"].map(e=>a.jsx("button",{onClick:()=>r(e),className:y("p-2 transition-colors",e==="card"?"border-r border-line":"",s===e?"bg-surface text-text-main":"bg-bg text-text-dim hover:text-text-main"),"aria-label":e==="card"?"Card view":"List view","aria-pressed":s===e,children:e==="card"?a.jsx(L,{className:"w-4 h-4"}):a.jsx(P,{className:"w-4 h-4"})},e))})}function S({category:s,size:r="lg"}){const e=(s||"").toLowerCase();let t=w,i="muted";e.includes("tech")?(t=b,i="brand"):e.includes("travel")||e.includes("wcs")?(t=v,i="accent"):e.includes("gear")?(t=g,i="warning"):e.includes("lifestyle")&&(t=C,i="danger");const o={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return a.jsx(c,{surface:i,className:"w-full h-full flex items-center justify-center",children:a.jsx(t,{className:o[r],strokeWidth:1.5})})}function E({slug:s,title:r,category:e,excerpt:t,date:i,basePath:o,content:h}){const d=x(h,t);return a.jsxs(c,{as:u,to:`${o}/${s}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[a.jsx(c,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),a.jsx(c,{className:"w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden flex items-center justify-center",children:a.jsx(S,{category:e,size:"md"})}),a.jsxs(k,{gap:1,flex:!0,className:"py-3 min-w-0",children:[a.jsxs(c,{display:"flex",align:"center",gap:3,children:[a.jsx(l,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:e}),a.jsx(l,{variant:"mono",size:"micro",color:"dim",children:i})]}),a.jsx(l,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-1",children:r}),a.jsx(l,{variant:"body",size:"xs",color:"dim",className:"truncate",children:t})]}),a.jsxs(c,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[a.jsxs(l,{variant:"mono",size:"micro",children:[d," min"]}),a.jsx(f,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{E as L,B as V,q as u};
