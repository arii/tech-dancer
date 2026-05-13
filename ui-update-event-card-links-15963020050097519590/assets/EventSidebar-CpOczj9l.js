import{f as c,r as m,j as e,B as a,S as n,T as t,F as u,C as f,H as h}from"./index-C2dRuHC7.js";import{P as j}from"./plane-Dd2hLaHa.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],b=c("chevron-down",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],w=c("chevron-up",v);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],C=c("hotel",M);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],N=c("shield-alert",z);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],E=c("users",S);function q({author:s}){return e.jsx(n,{gap:6,marginTop:6,children:e.jsxs(n,{direction:"row",align:"center",gap:2,color:"dim",children:[e.jsx(a,{width:8,height:8,radius:"full",surface:"muted"}),e.jsx(t,{variant:"mono",size:"xs",children:s})]})})}function B(){return null}function H({event:s,startDate:l,earlyBirdDate:d,hotelCutoffDate:r}){const[i,p]=m.useState(!1),x=s?.startDate||l,y=s?.earlyBirdDate||d,g=s?.hotelCutoffDate||r;return e.jsx(a,{as:"aside",children:e.jsxs(n,{gap:8,className:"sticky top-24",children:[s&&e.jsx(a,{border:!0,radius:"lg",padding:6,surface:"surface-alt",children:e.jsxs(n,{gap:6,children:[e.jsxs(a,{display:"flex",align:"center",justify:"between",as:"button",onClick:()=>p(!i),width:"full",className:"lg:pointer-events-none","aria-expanded":i,"aria-controls":"quick-intelligence-content",children:[e.jsx(t,{variant:"mono",size:"micro",color:"accent",weight:"font-bold",uppercase:!0,tracking:"widest",children:"Quick Intelligence"}),e.jsx(a,{display:{base:"block",lg:"none"},children:i?e.jsx(w,{className:"w-4 h-4 text-accent"}):e.jsx(b,{className:"w-4 h-4 text-accent"})})]}),e.jsx(a,{id:"quick-intelligence-content",display:{base:i?"block":"none",lg:"block"},children:e.jsxs(n,{gap:4,children:[e.jsxs(a,{children:[e.jsx(t,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Category"}),e.jsx(t,{variant:"body",size:"sm",children:s.category})]}),e.jsxs(a,{children:[e.jsx(t,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Registry Status"}),e.jsx(t,{variant:"body",size:"sm",children:"WSDC Verified"})]})]})})]})}),x&&e.jsxs(n,{gap:4,children:[e.jsx(t,{variant:"mono",size:"tiny",weight:"font-bold",color:"dim",uppercase:!0,className:"tracking-widest border-b border-line",paddingBottom:2,children:"Travel Reminders"}),e.jsx(n,{gap:4,children:_(x,y,g).map(o=>e.jsx(a,{border:!0,padding:4,surface:"muted",className:"hover:border-accent transition-colors",children:e.jsxs(n,{gap:2,children:[e.jsxs(a,{display:"flex",align:"center",gap:2,color:"brand",children:[e.jsx(o.icon,{className:"w-4 h-4"}),e.jsx(t,{variant:"mono",size:"xs",weight:"font-bold",children:o.label.toUpperCase()})]}),e.jsxs(t,{variant:"mono",size:"tiny",color:"dim",children:["Target: ",o.date.toLocaleDateString()]}),e.jsx(t,{variant:"body",size:"xs",color:"dim",children:o.description})]})},o.label))})]})]})})}function _(s,l,d){const r=u(s);return[{label:"Flight Tracking",date:h(r,-90),icon:j,description:"Book flights ~90 days out for best rates."},{label:"Early Bird",date:l?h(u(l),-2):null,icon:f,description:"Register before early bird rates expire."},{label:"Hotel Cutoff",date:d?u(d):null,icon:C,description:"Room block availability deadline."},{label:"Comp Signups",date:h(r,-14),icon:E,description:"Registration for competitions typically closes 14 days prior."},{label:"Cancel Safety",date:h(r,-5),icon:N,description:"Last chance to cancel without full penalty."}].filter(i=>i.date!==null).sort((i,p)=>i.date.getTime()-p.date.getTime())}export{H as E,C as H,B as a,q as b};
