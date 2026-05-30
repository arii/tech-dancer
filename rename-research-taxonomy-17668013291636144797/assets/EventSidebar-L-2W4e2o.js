import{c as i,r as o,j as e,B as s,S as r,T as n}from"./index-CpxyO9wf.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],l=i("chevron-down",d);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],x=i("chevron-up",h);function p({author:t}){return e.jsx(r,{gap:6,marginTop:6,children:e.jsxs(r,{direction:"row",align:"center",gap:2,color:"dim",children:[e.jsx(s,{width:8,height:8,radius:"full",surface:"muted"}),e.jsx(n,{variant:"mono",size:"xs",children:t})]})})}function j(){return null}function m({event:t}){const[a,c]=o.useState(!1);return e.jsx(s,{as:"aside",children:e.jsx(r,{gap:8,className:"sticky top-24",children:t&&e.jsx(s,{border:!0,radius:"lg",padding:6,surface:"surface-alt",children:e.jsxs(r,{gap:6,children:[e.jsxs(s,{display:"flex",align:"center",justify:"between",as:"button",onClick:()=>c(!a),width:"full",className:"lg:pointer-events-none","aria-expanded":a,"aria-controls":"event-insights-content",children:[e.jsx(n,{variant:"mono",size:"micro",color:"accent",weight:"font-bold",uppercase:!0,tracking:"widest",children:"Event Insights"}),e.jsx(s,{display:{base:"block",lg:"none"},children:a?e.jsx(x,{className:"w-4 h-4 text-accent"}):e.jsx(l,{className:"w-4 h-4 text-accent"})})]}),e.jsx(s,{id:"event-insights-content",display:{base:a?"block":"none",lg:"block"},children:e.jsxs(r,{gap:4,children:[e.jsxs(s,{children:[e.jsx(n,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Category"}),e.jsx(n,{variant:"body",size:"sm",children:t.category})]}),e.jsxs(s,{children:[e.jsx(n,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Registry Status"}),e.jsx(n,{variant:"body",size:"sm",children:"WSDC Verified"})]})]})})]})})})})}export{m as E,j as a,p as b};
