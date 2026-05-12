import{i as n,j as e,B as r,c as p,q as y,N as m,S as x,T as s}from"./index-ffIJe4BG.js";import{I as g}from"./Icon-hBTiZGX4.js";import{G as u}from"./globe-DjXPW3CN.js";import{C as k}from"./EmptyState-CWcUpLG3.js";import{C as f}from"./chevron-right-iy2WxD3H.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],w=n("circle-question-mark",j);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],M=n("cpu",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],N=n("heart",v);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],C=n("layout-grid",z);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],L=n("list",_);function H({view:a,onChange:t}){return e.jsx(r,{display:"flex",border:!0,radius:"none",overflow:"hidden",children:["card","list"].map(i=>e.jsx(r,{as:"button",onClick:()=>t(i),padding:3,display:"flex",align:"center",justify:"center",minWidth:11,minHeight:11,border:i==="card"?"r":!1,className:p("transition-colors cursor-pointer",a===i?"bg-accent-navy text-bg shadow-inner":"bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors"),"aria-label":i==="card"?"Grid view":"List view","aria-pressed":a===i,children:i==="card"?e.jsx(C,{className:"w-5 h-5"}):e.jsx(L,{className:"w-5 h-5"})},i))})}function $(a){const t=(a||"").toLowerCase();return t.includes("tech")?M:t.includes("travel")||t.includes("wcs")?u:t.includes("gear")?k:t.includes("lifestyle")?N:w}function G({category:a,size:t="lg"}){const i={sm:"md",md:"xl",lg:void 0},o=$(a);return e.jsx(r,{width:"full",height:"full",display:"flex",align:"center",justify:"center",className:"text-accent",children:e.jsx(g,{icon:o,size:i[t],className:t==="lg"?"w-24 h-24 opacity-10":"",strokeWidth:2})})}function S({slug:a,title:t,category:i,excerpt:o,date:c,basePath:d,content:h}){const l=y(h,o);return e.jsxs(r,{as:m,to:`${d}/${a}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(r,{width:1,shrink:0,self:"stretch",opacity:0,className:"bg-accent group-hover:opacity-100 transition-opacity"}),e.jsx(r,{width:12,height:12,margin:4,shrink:0,radius:"md",overflow:"hidden",display:"flex",align:"center",justify:"center",border:!0,className:"bg-surface-alt/30 border-line/30",children:e.jsx(G,{category:i,size:"md"})}),e.jsxs(x,{gap:1,flex:!0,paddingY:3,className:"min-w-0",children:[e.jsxs(r,{display:"flex",align:"center",gap:3,children:[e.jsx(s,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:i}),e.jsx(s,{variant:"mono",size:"micro",color:"dim",children:c})]}),e.jsx(s,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-1",children:t}),e.jsx(s,{variant:"body",size:"xs",color:"dim",className:"truncate",children:o})]}),e.jsxs(r,{display:"flex",align:"center",gap:3,padding:4,shrink:0,children:[e.jsxs(s,{variant:"mono",size:"micro",color:"dim",children:[l," min"]}),e.jsx(f,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity text-text-dim"})]})]})}export{G as C,S as L,H as V};
