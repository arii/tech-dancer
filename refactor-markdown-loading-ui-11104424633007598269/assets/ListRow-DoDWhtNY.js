import{j as e}from"./vendor-markdown-e9PAft-3.js";import{c as o,h as x,r as p,B as t,T as a,S as y}from"./index-CbW3vYGK.js";import{N as g}from"./vendor-react-qDFqdIvJ.js";import{g as j,a as c}from"./categoryUtils-BK2kYhjW.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],b=o("chevron-right",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],k=o("layout-grid",f);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],w=o("list",N);function M({view:r,onChange:s}){return e.jsx("div",{className:"flex border border-line rounded-none overflow-hidden",children:["card","list"].map(i=>e.jsx("button",{onClick:()=>s(i),className:x("p-2 transition-colors",i==="card"?"border-r border-line":"",r===i?"bg-surface text-text-main":"bg-bg text-text-dim hover:text-text-main"),"aria-label":i==="card"?"Card view":"List view","aria-pressed":r===i,children:i==="card"?e.jsx(k,{className:"w-4 h-4"}):e.jsx(w,{className:"w-4 h-4"})},i))})}function _({slug:r,title:s,category:i,excerpt:n,date:d,basePath:l,content:h}){const m=p(h,n);return e.jsxs(t,{as:g,to:`${l}/${r}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(t,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(t,{className:`w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden flex items-center justify-center ${c(i).split(" ")[0]}`,children:e.jsx(a,{variant:"mono",size:"micro",className:`opacity-40 text-center leading-none ${c(i).split(" ")[1]}`,children:j(i,4)})}),e.jsxs(y,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(t,{display:"flex",align:"center",gap:3,children:[e.jsx(a,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:i}),e.jsx(a,{variant:"mono",size:"micro",color:"dim",children:d})]}),e.jsx(a,{variant:"display",size:"sm",weight:"font-bold",className:"truncate",children:s}),e.jsx(a,{variant:"body",size:"xs",color:"dim",className:"truncate",children:n})]}),e.jsxs(t,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(a,{variant:"mono",size:"micro",children:[m," min"]}),e.jsx(b,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{_ as L,M as V};
