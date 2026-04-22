import{j as e}from"./vendor-markdown-e9PAft-3.js";import{c as o,i as m,r as x,B as i,S as p,T as r}from"./index-CRKtuMOv.js";import{N as y}from"./vendor-react-qDFqdIvJ.js";import{C as g}from"./CategoryPlaceholder-DwyBcIzv.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],u=o("chevron-right",j);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],b=o("layout-grid",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],f=o("list",N);function M({view:s,onChange:t}){return e.jsx("div",{className:"flex border border-line rounded-none overflow-hidden",children:["card","list"].map(a=>e.jsx("button",{onClick:()=>t(a),className:m("p-2 transition-colors",a==="card"?"border-r border-line":"",s===a?"bg-surface text-text-main":"bg-bg text-text-dim hover:text-text-main"),"aria-label":a==="card"?"Card view":"List view","aria-pressed":s===a,children:a==="card"?e.jsx(b,{className:"w-4 h-4"}):e.jsx(f,{className:"w-4 h-4"})},a))})}function _({slug:s,title:t,category:a,excerpt:n,date:c,basePath:d,content:h}){const l=x(h,n);return e.jsxs(i,{as:y,to:`${d}/${s}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(i,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(i,{className:"w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden",children:e.jsx(g,{category:a,size:"md"})}),e.jsxs(p,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(i,{display:"flex",align:"center",gap:3,children:[e.jsx(r,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:a}),e.jsx(r,{variant:"mono",size:"micro",color:"dim",children:c})]}),e.jsx(r,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-2",children:t}),e.jsx(r,{variant:"body",size:"xs",color:"dim",className:"truncate",children:n})]}),e.jsxs(i,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(r,{variant:"mono",size:"micro",children:[l," min"]}),e.jsx(u,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{_ as L,M as V};
