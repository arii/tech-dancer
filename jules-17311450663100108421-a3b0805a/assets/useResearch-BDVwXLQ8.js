import{a as r,j as a,B as d,T as u,d as l}from"./index-DiguZcip.js";import{u as m}from"./useQuery-DJiCZiR0.js";import{b as n}from"./content-vBC_kk62.js";import{R as c}from"./research-tools-BTPs7T3D.js";/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const p=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],x=r("activity",p),S=({label:e,className:o})=>{if(!e)return null;const i=e.toLowerCase(),t=i.includes("active")||i.includes("complete")||i.includes("published"),s=t?"accent":"muted";return a.jsx(d,{display:"inline-flex",align:"center",paddingX:2,paddingY:.5,radius:"full",surface:s,className:l("border border-white/5",o),children:a.jsx(u,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"widest",color:t?"accent":"dim",children:e})})};function w(){const{data:e=[]}=m({queryKey:["studies"],queryFn:n,initialData:n});return{studies:e,tools:c,getTool:t=>c.find(s=>s.id===t),getStudy:t=>e.find(s=>s.slug===t)}}export{x as A,S,w as u};
