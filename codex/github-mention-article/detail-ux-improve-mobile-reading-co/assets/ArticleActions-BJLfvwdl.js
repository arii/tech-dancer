import{p as l,r as x,j as e,S as d,C as y,T as p}from"./index-Bqxk1fLY.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],k=l("link",w);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],g=l("share-2",u);function s({label:c,icon:o,onClick:a,className:t}){return e.jsxs(d,{as:"button",direction:"row",onClick:a,align:"center",gap:2,paddingX:3,paddingY:1.5,radius:"sm",className:t,children:[o,e.jsx(p,{variant:"mono",size:"xs",weight:"font-bold",children:c})]})}function f({title:c,description:o}){const[a,t]=x.useState(!1),n=typeof navigator<"u"&&!!navigator.share,r=async()=>{try{await navigator.clipboard.writeText(window.location.href),t(!0),window.setTimeout(()=>t(!1),1800)}catch(i){console.error("Failed to copy article URL",i)}},h=async()=>{if(n){try{await navigator.share({title:c,text:o,url:window.location.href})}catch(i){console.error("Share failed; falling back to copy link",i),await r()}return}await r()};return e.jsxs(d,{direction:"row",gap:2,wrap:!0,children:[e.jsx(s,{label:"SHARE",icon:e.jsx(g,{className:"w-4 h-4"}),onClick:()=>void h(),className:"text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"}),!n&&e.jsx(s,{label:a?"COPIED":"COPY LINK",icon:a?e.jsx(y,{className:"w-4 h-4"}):e.jsx(k,{className:"w-4 h-4"}),onClick:()=>void r(),className:"text-text-dim hover:text-accent hover:bg-accent/10 transition-all active:scale-95 cursor-pointer"})]})}export{f as A};
