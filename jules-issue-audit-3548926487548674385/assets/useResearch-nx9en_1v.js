import{c as i,j as a,B as c,T as r,Z as o}from"./index-CAtQXA3A.js";import{u}from"./useQuery-BtX2xqMj.js";import{R as n}from"./research-tools-CnOWbbXx.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],y=i("activity",d),x=({label:t})=>t?a.jsx(c,{surface:"accent",paddingX:2,paddingY:.5,className:"bg-accent/10",children:a.jsx(r,{variant:"mono",size:"xs",color:"accent",weight:"font-bold",children:t.toUpperCase()})}):null;function S(){const{data:t=[]}=u({queryKey:["studies"],queryFn:o,initialData:o});return{studies:t,tools:n,getTool:e=>n.find(s=>s.id===e),getStudy:e=>t.find(s=>s.slug===e)}}export{y as A,x as S,S as u};
