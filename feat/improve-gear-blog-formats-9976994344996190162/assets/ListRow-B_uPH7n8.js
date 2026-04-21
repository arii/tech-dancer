import{c as o,j as e,l as x,d as m,B as s,N as p,T as i,S as y}from"./index-DxRy2U2z.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],u=o("chevron-right",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],b=o("layout-grid",j);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],N=o("list",k);function f({view:t,onChange:n}){return e.jsx("div",{className:"flex border border-line rounded-none overflow-hidden",children:["card","list"].map(a=>e.jsx("button",{onClick:()=>n(a),className:x("p-2 transition-colors",a==="card"?"border-r border-line":"",t===a?"bg-surface text-text-main":"bg-bg text-text-dim hover:text-text-main"),"aria-label":a==="card"?"Card view":"List view","aria-pressed":t===a,children:a==="card"?e.jsx(b,{className:"w-4 h-4"}):e.jsx(N,{className:"w-4 h-4"})},a))})}function v({slug:t,title:n,category:a,excerpt:r,date:d,basePath:h,content:c}){const l=c?m(c):Math.max(1,Math.round(((r==null?void 0:r.split(" ").length)??0)/3));return e.jsxs(s,{as:p,to:`${h}/${t}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(s,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(s,{className:"w-12 h-12 m-3 shrink-0 rounded overflow-hidden bg-accent-navy/10 flex items-center justify-center",children:e.jsx(i,{variant:"mono",size:"micro",className:"opacity-20 text-center leading-none",children:a.slice(0,4).toUpperCase()})}),e.jsxs(y,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(s,{display:"flex",align:"center",gap:3,children:[e.jsx(i,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:a}),e.jsx(i,{variant:"mono",size:"micro",color:"dim",children:d})]}),e.jsx(i,{variant:"display",size:"sm",weight:"font-bold",className:"truncate",children:n}),e.jsx(i,{variant:"body",size:"xs",color:"dim",className:"truncate",children:r})]}),e.jsxs(s,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(i,{variant:"mono",size:"micro",children:[l," min"]}),e.jsx(u,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{v as L,f as V};
