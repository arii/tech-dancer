import{f as c,j as e,B as s,S as i,T as a,F as y,C as x,H as h}from"./index-DuSYyZm-.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],f=c("hotel",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],S=c("info",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]],j=c("plane",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],v=c("shield-alert",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],w=c("users",M);function _({author:t}){return e.jsx(i,{gap:6,marginTop:6,children:e.jsxs(i,{direction:"row",align:"center",gap:2,color:"dim",children:[e.jsx(s,{width:8,height:8,radius:"full",surface:"muted"}),e.jsx(a,{variant:"mono",size:"xs",children:t})]})})}function E(){return null}function N({event:t,startDate:d,earlyBirdDate:l,hotelCutoffDate:o}){const r=t?.startDate||d,p=t?.earlyBirdDate||l,u=t?.hotelCutoffDate||o;return e.jsx(s,{as:"aside",children:e.jsxs(i,{gap:8,className:"sticky top-24",children:[t&&e.jsx(s,{border:!0,radius:"lg",padding:6,surface:"surface-alt",children:e.jsxs(i,{gap:6,children:[e.jsx(a,{variant:"mono",size:"micro",color:"accent",weight:"font-bold",uppercase:!0,tracking:"widest",children:"Quick Intelligence"}),e.jsxs(i,{gap:4,children:[e.jsxs(s,{children:[e.jsx(a,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Category"}),e.jsx(a,{variant:"body",size:"sm",children:t.category})]}),e.jsxs(s,{children:[e.jsx(a,{variant:"mono",size:"micro",color:"dim",uppercase:!0,children:"Registry Status"}),e.jsx(a,{variant:"body",size:"sm",children:"WSDC Verified"})]})]})]})}),r&&e.jsxs(i,{gap:4,children:[e.jsx(a,{variant:"mono",size:"tiny",weight:"font-bold",color:"dim",uppercase:!0,className:"tracking-widest border-b border-line",paddingBottom:2,children:"Travel Reminders"}),e.jsx(i,{gap:4,children:z(r,p,u).map(n=>e.jsx(s,{border:!0,padding:4,surface:"muted",className:"hover:border-accent transition-colors",children:e.jsxs(i,{gap:2,children:[e.jsxs(s,{display:"flex",align:"center",gap:2,color:"brand",children:[e.jsx(n.icon,{className:"w-4 h-4"}),e.jsx(a,{variant:"mono",size:"xs",weight:"font-bold",children:n.label.toUpperCase()})]}),e.jsxs(a,{variant:"mono",size:"tiny",color:"dim",children:["Target: ",n.date.toLocaleDateString()]}),e.jsx(a,{variant:"body",size:"xs",color:"dim",children:n.description})]})},n.label))})]})]})})}function z(t,d,l){const o=y(t);return[{label:"Flight Tracking",date:h(o,-90),icon:j,description:"Book flights ~90 days out for best rates."},{label:"Early Bird",date:d?h(y(d),-2):null,icon:x,description:"Register before early bird rates expire."},{label:"Hotel Cutoff",date:l?y(l):null,icon:f,description:"Room block availability deadline."},{label:"Comp Signups",date:h(o,-14),icon:w,description:"Registration for competitions typically closes 14 days prior."},{label:"Cancel Safety",date:h(o,-5),icon:v,description:"Last chance to cancel without full penalty."}].filter(r=>r.date!==null).sort((r,p)=>r.date.getTime()-p.date.getTime())}export{N as E,f as H,S as I,j as P,E as a,_ as b};
