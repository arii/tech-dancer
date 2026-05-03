import{e as n,j as e,B as r,c as p,d as u,R as y,n as x,N as m,S as g,T as c}from"./index-BNCw8kX1.js";import{C as f}from"./camera-BU9kPGLD.js";import{C as k}from"./chevron-right-CBDfgCjc.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],j=n("circle-question-mark",w);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],v=n("cpu",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],N=n("globe",M);/**
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
 */const $=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],S=n("list",$);function G({view:i,onChange:a}){return e.jsx(r,{display:"flex",border:!0,radius:"none",overflow:"hidden",children:["card","list"].map(t=>e.jsx("button",{onClick:()=>a(t),className:p("p-2 transition-colors cursor-pointer",t==="card"?"border-r border-line":"",i===t?"bg-accent-navy text-white shadow-inner":"bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors"),"aria-label":t==="card"?"Card view":"List view","aria-pressed":i===t,children:t==="card"?e.jsx(L,{className:"w-4 h-4"}):e.jsx(S,{className:"w-4 h-4"})},t))})}function H({value:i,onChange:a,placeholder:t="Search articles, guides, or gear...",maxWidth:s="2xl"}){return e.jsxs(r,{display:"flex",align:"center",position:"relative",surface:"default",border:!0,paddingX:4,paddingY:2,maxWidth:s,flex:1,minHeight:"44px",radius:"lg",className:"focus-within:ring-2 focus-within:ring-accent transition-all",children:[e.jsx(u,{size:18,className:"text-text-dim absolute left-4 pointer-events-none"}),e.jsx(r,{as:"input",type:"text",placeholder:t,variant:"mono",size:"sm",className:"bg-transparent border-none outline-none pl-10 w-full focus:ring-0",value:i,onChange:a})]})}function R(i){const a=(i||"").toLowerCase();return a.includes("tech")?v:a.includes("travel")||a.includes("wcs")?N:a.includes("gear")?f:a.includes("lifestyle")?C:j}function T({category:i,size:a="lg"}){const t=(i||"").toLowerCase();let s="muted";t.includes("tech")?s="brand":t.includes("travel")||t.includes("wcs")?s="accent":t.includes("gear")?s="warning":t.includes("lifestyle")&&(s="danger");const o={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-24 h-24 opacity-10"},l=R(i);return e.jsx(r,{surface:s,width:"full",height:"full",display:"flex",align:"center",justify:"center",children:y.createElement(l,{className:o[a],strokeWidth:1.5})})}function I({slug:i,title:a,category:t,excerpt:s,date:o,basePath:l,content:d}){const h=x(d,s);return e.jsxs(r,{as:m,to:`${l}/${i}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(r,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(r,{width:12,height:12,margin:3,shrink:0,radius:"none",overflow:"hidden",display:"flex",align:"center",justify:"center",children:e.jsx(T,{category:t,size:"md"})}),e.jsxs(g,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(r,{display:"flex",align:"center",gap:3,children:[e.jsx(c,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:t}),e.jsx(c,{variant:"mono",size:"micro",color:"dim",children:o})]}),e.jsx(c,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-1",children:a}),e.jsx(c,{variant:"body",size:"xs",color:"dim",className:"truncate",children:s})]}),e.jsxs(r,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(c,{variant:"mono",size:"micro",children:[h," min"]}),e.jsx(k,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{I as L,H as S,G as V};
