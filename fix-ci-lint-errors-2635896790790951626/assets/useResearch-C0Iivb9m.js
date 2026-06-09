import{c as r,j as o,B as c,T as a,Y as n}from"./index-MzskJNIN.js";import{u as d}from"./useQuery-BG-5O_tB.js";import{R as i}from"./research-tools-CnOWbbXx.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],x=r("activity",u),y=({label:t})=>t?o.jsxs(c,{surface:"accent",paddingX:2,paddingY:.5,className:"bg-accent/10",children:[o.jsx(a,{variant:"mono",size:"xs",color:"brand",weight:"font-bold",children:t.toUpperCase()}),"=======",o.jsx(a,{variant:"mono",size:"xs",color:"accent",weight:"font-bold",children:t.toUpperCase()})]}):null;function h(){const{data:t=[]}=d({queryKey:["studies"],queryFn:n,initialData:n});return{studies:t,tools:i,getTool:e=>i.find(s=>s.id===e),getStudy:e=>t.find(s=>s.slug===e)}}export{x as A,y as S,h as u};
