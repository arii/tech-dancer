import{e as n,j as t,B as i,c as o,d as c}from"./index-quQOjmvr.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],h=n("layout-grid",d);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],x=n("list",l);function u({view:r,onChange:a}){return t.jsx(i,{display:"flex",border:!0,radius:"none",overflow:"hidden",children:["card","list"].map(e=>t.jsx("button",{onClick:()=>a(e),className:o("p-2 transition-colors cursor-pointer",e==="card"?"border-r border-line":"",r===e?"bg-accent-navy text-white shadow-inner":"bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors"),"aria-label":e==="card"?"Card view":"List view","aria-pressed":r===e,children:e==="card"?t.jsx(h,{className:"w-4 h-4"}):t.jsx(x,{className:"w-4 h-4"})},e))})}function g({value:r,onChange:a,placeholder:e="Search articles, guides, or gear...",maxWidth:s="2xl"}){return t.jsxs(i,{display:"flex",align:"center",position:"relative",surface:"default",border:!0,paddingX:4,paddingY:2,maxWidth:s,flex:1,minHeight:"44px",radius:"lg",className:"focus-within:ring-2 focus-within:ring-accent transition-all",children:[t.jsx(c,{size:18,className:"text-text-dim absolute left-4 pointer-events-none"}),t.jsx(i,{as:"input",type:"text",placeholder:e,variant:"mono",size:"sm",className:"bg-transparent border-none outline-none pl-10 w-full focus:ring-0",value:r,onChange:a})]})}export{g as S,u as V};
