import{j as e}from"./vendor-markdown-e9PAft-3.js";import{c,j as y,B as r,r as p,S as m,T as o}from"./index-BqFOSXSn.js";import{N as x}from"./vendor-react-qDFqdIvJ.js";import{C as k,a as u}from"./chevron-right-Ca7qhcPm.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],f=c("circle-question-mark",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],w=c("cpu",j);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],N=c("globe",M);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],v=c("heart",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],_=c("layout-grid",z);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],L=c("list",C);function G({view:i,onChange:n}){return e.jsx("div",{className:"flex border border-line rounded-none overflow-hidden",children:["card","list"].map(t=>e.jsx("button",{onClick:()=>n(t),className:y("p-2 transition-colors",t==="card"?"border-r border-line":"",i===t?"bg-surface text-text-main":"bg-bg text-text-dim hover:text-text-main"),"aria-label":t==="card"?"Card view":"List view","aria-pressed":i===t,children:t==="card"?e.jsx(_,{className:"w-4 h-4"}):e.jsx(L,{className:"w-4 h-4"})},t))})}function $({category:i,size:n="lg"}){const t=(i||"").toLowerCase();let a=f,s="muted";t.includes("tech")?(a=w,s="brand"):t.includes("travel")||t.includes("wcs")?(a=N,s="accent"):t.includes("gear")?(a=k,s="warning"):t.includes("lifestyle")&&(a=v,s="danger");const d={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return e.jsx(r,{surface:s,className:"w-full h-full flex items-center justify-center",children:e.jsx(a,{className:d[n],strokeWidth:1.5})})}function I({slug:i,title:n,category:t,excerpt:a,date:s,basePath:d,content:h}){const l=p(h,a);return e.jsxs(r,{as:x,to:`${d}/${i}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(r,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(r,{className:"w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden flex items-center justify-center",children:e.jsx($,{category:t,size:"md"})}),e.jsxs(m,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(r,{display:"flex",align:"center",gap:3,children:[e.jsx(o,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:t}),e.jsx(o,{variant:"mono",size:"micro",color:"dim",children:s})]}),e.jsx(o,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-1",children:n}),e.jsx(o,{variant:"body",size:"xs",color:"dim",className:"truncate",children:a})]}),e.jsxs(r,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(o,{variant:"mono",size:"micro",children:[l," min"]}),e.jsx(u,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{I as L,G as V};
