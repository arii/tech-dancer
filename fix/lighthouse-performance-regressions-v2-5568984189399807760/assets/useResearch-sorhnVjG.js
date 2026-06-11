import{c as n,j as a,B as r,T as c}from"./index-BzZlWR_s.js";import{u}from"./useQuery-2bq0e4qV.js";import{f as o}from"./content-BtO63sVw.js";import{R as i}from"./research-tools-Cjy9Tcvn.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],x=n("activity",d),S=({label:t})=>t?a.jsx(r,{surface:"accent",paddingX:2,paddingY:.5,className:"bg-accent/10",children:a.jsx(c,{variant:"mono",size:"xs",color:"accent",weight:"font-bold",children:t.toUpperCase()})}):null;function h(){const{data:t=[]}=u({queryKey:["studies"],queryFn:o,initialData:o});return{studies:t,tools:i,getTool:e=>i.find(s=>s.id===e),getStudy:e=>t.find(s=>s.slug===e)}}export{x as A,S,h as u};
