import{f as c,ap as t,aq as a}from"./index-Dj0qKaVc.js";import{S as u}from"./shield-check-DeZaBnZu.js";import{T as g}from"./trophy-BZnzQy1Z.js";import{B as m}from"./briefcase-BxsaPWOR.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],f=c("circle-check",y);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],D=c("hotel",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]],M=c("plane",C),w=(e,n={})=>{const o=t(e.startDate),d=e.earlyBirdDate?t(e.earlyBirdDate):null,s=e.registrationDeadline?t(e.registrationDeadline):null,h=e.hotelCutoffDate?t(e.hotelCutoffDate):null,p=e.packingReminderDate?t(e.packingReminderDate):null,i=[{id:"flight-track",date:a(o,-90),label:"Start Flight Tracking",description:"Set United/Delta price alerts. Book Main Cabin to preserve credit flexibility.",icon:M,badge:"Logistics"},{id:"comp-window",date:a(o,-14),label:"Competition Signups",description:"Finalize Jack & Jill entries. Note: Competition fees are usually non-refundable.",icon:f,badge:"Action"},{id:"cancel-safety",date:a(o,-5),label:"Cancel Safety Check",description:"Execute final 'Go/No-Go' decision. Cancel or transfer hotel rooms to avoid penalties.",icon:u,badge:"Safety"}];d&&i.push({id:"early-bird",date:a(d,-2),label:"Early Bird Deadline",description:`Register for ${e.title} now. Secures maximum discount.`,icon:g,badge:"Money"}),s&&i.push({id:"registration-deadline",date:s,label:"Registration Deadline",description:`Final call for online registration for ${e.title}.`,icon:f,badge:"Required"}),h&&i.push({id:"hotel-block",date:h,label:"Hotel Block Cutoff",description:"Book within the discounted block before it sells out.",icon:D,badge:"Logistics"}),p&&i.push({id:"packing-reminder",date:p,label:"Packing Reminder",description:"Finalize outfits and check theme requirements.",icon:m,badge:"Prep"});let l=i;return n.filterIds&&(l=l.filter(r=>n.filterIds.includes(r.id))),l.sort((r,k)=>r.date.getTime()-k.date.getTime())},x=["early-bird","registration-deadline","hotel-block","packing-reminder"],_=e=>w(e,{filterIds:x});export{f as C,M as P,w as a,_ as c};
