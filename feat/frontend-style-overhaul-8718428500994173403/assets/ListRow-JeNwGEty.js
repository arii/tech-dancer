import{e as c,j as e,B as n,R as p,n as y,N as m,S as u,T as r}from"./index-DyXraYeb.js";import{C as f}from"./camera-DwumotoV.js";import{C as x}from"./chevron-right-BidavqUB.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],k=c("circle-question-mark",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],j=c("cpu",v);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],M=c("globe",w);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],C=c("heart",N);function b(i){const s=(i||"").toLowerCase();return s.includes("tech")?j:s.includes("travel")||s.includes("wcs")?M:s.includes("gear")?f:s.includes("lifestyle")?C:k}function z({category:i,size:s="lg"}){const a=(i||"").toLowerCase();let t="muted";a.includes("tech")?t="brand":a.includes("travel")||a.includes("wcs")?t="accent":a.includes("gear")?t="warning":a.includes("lifestyle")&&(t="danger");const o={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-24 h-24 opacity-10"},l=b(i);return e.jsx(n,{surface:t,width:"full",height:"full",display:"flex",align:"center",justify:"center",children:p.createElement(l,{className:o[s],strokeWidth:1.5})})}function $({slug:i,title:s,category:a,excerpt:t,date:o,basePath:l,content:d}){const h=y(d,t);return e.jsxs(n,{as:m,to:`${l}/${i}`,display:"flex",align:"center",border:"b",className:"group hover:bg-surface/50 transition-colors",children:[e.jsx(n,{className:"w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsx(n,{width:12,height:12,margin:3,shrink:0,radius:"none",overflow:"hidden",display:"flex",align:"center",justify:"center",children:e.jsx(z,{category:a,size:"md"})}),e.jsxs(u,{gap:1,flex:!0,className:"py-3 min-w-0",children:[e.jsxs(n,{display:"flex",align:"center",gap:3,children:[e.jsx(r,{variant:"mono",size:"micro",color:"brand",className:"uppercase shrink-0",children:a}),e.jsx(r,{variant:"mono",size:"micro",color:"dim",children:o})]}),e.jsx(r,{variant:"display",size:"sm",weight:"font-bold",className:"line-clamp-1",children:s}),e.jsx(r,{variant:"body",size:"xs",color:"dim",className:"truncate",children:t})]}),e.jsxs(n,{display:"flex",align:"center",gap:3,padding:4,className:"shrink-0 text-text-dim",children:[e.jsxs(r,{variant:"mono",size:"micro",children:[h," min"]}),e.jsx(x,{className:"w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity"})]})]})}export{$ as L};
