import{f as c,j as e,B as r,S as i,T as t,C as y}from"./index-CS13cNkb.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],u=c("hotel",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],z=c("info",x);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]],f=c("plane",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],j=c("shield-alert",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],v=c("users",b);function D({author:a}){return e.jsx(i,{gap:6,marginTop:6,children:e.jsxs(i,{direction:"row",align:"center",gap:2,color:"dim",children:[e.jsx(r,{width:8,height:8,radius:"full",surface:"muted"}),e.jsx(t,{variant:"mono",size:"xs",children:a})]})})}function C(){return null}function T({event:a,startDate:d,earlyBirdDate:l,hotelCutoffDate:o}){const s=a?.startDate||d,h=a?.earlyBirdDate||l,p=a?.hotelCutoffDate||o;return e.jsx(r,{as:"aside",children:e.jsxs(i,{gap:8,className:"sticky top-24",children:[a&&e.jsx(r,{border:!0,radius:"lg",padding:6,surface:"surface-alt",children:e.jsxs(i,{gap:6,children:[e.jsx(t,{variant:"mono",size:"micro",color:"accent",weight:"font-bold",uppercase:!0,tracking:"widest",children:"Quick Intelligence"}),e.jsxs(i,{gap:4,children:[e.jsxs(r,{children:[e.jsx(t,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Category"}),e.jsx(t,{variant:"body",size:"sm",children:a.category})]}),e.jsxs(r,{children:[e.jsx(t,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Registry Status"}),e.jsx(t,{variant:"body",size:"sm",children:"WSDC Verified"})]})]})]})}),s&&e.jsxs(i,{gap:4,children:[e.jsx(t,{variant:"mono",size:"tiny",weight:"font-bold",color:"dim",uppercase:!0,className:"tracking-widest border-b border-line",paddingBottom:2,children:"Travel Reminders"}),e.jsx(i,{gap:4,children:w(s,h,p).map(n=>e.jsx(r,{border:!0,padding:4,surface:"muted",className:"hover:border-accent transition-colors",children:e.jsxs(i,{gap:2,children:[e.jsxs(r,{display:"flex",align:"center",gap:2,color:"brand",children:[e.jsx(n.icon,{className:"w-4 h-4"}),e.jsx(t,{variant:"mono",size:"xs",weight:"font-bold",children:n.label.toUpperCase()})]}),e.jsxs(t,{variant:"mono",size:"tiny",color:"dim",children:["Target: ",n.date.toLocaleDateString()]}),e.jsx(t,{variant:"body",size:"xs",color:"dim",children:n.description})]})},n.label))})]})]})})}function w(a,d,l){const o=new Date(a);return[{label:"Flight Tracking",date:new Date(o.getTime()-2160*60*60*1e3),icon:f,description:"Book flights ~90 days out for best rates."},{label:"Early Bird",date:d?new Date(new Date(d).getTime()-2880*60*1e3):null,icon:y,description:"Register before early bird rates expire."},{label:"Hotel Cutoff",date:l?new Date(l):null,icon:u,description:"Room block availability deadline."},{label:"Comp Signups",date:new Date(o.getTime()-336*60*60*1e3),icon:v,description:"Registration for competitions typically closes 14 days prior."},{label:"Cancel Safety",date:new Date(o.getTime()-7200*60*1e3),icon:j,description:"Last chance to cancel without full penalty."}].filter(s=>s.date!==null).sort((s,h)=>s.date.getTime()-h.date.getTime())}export{T as E,u as H,z as I,f as P,C as a,D as b};
