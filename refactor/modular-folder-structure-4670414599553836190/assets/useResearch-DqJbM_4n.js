import{f as d,j as o,B as r,T as c,I as u,a as g}from"./index-GtFqBzbG.js";import{u as n}from"./useQuery-Cn96yl5r.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],x=d("file-text",l),m=({label:e})=>o.jsx(r,{surface:"accent",paddingX:2,paddingY:.5,className:"bg-accent/10",children:o.jsx(c,{variant:"mono",size:"xs",color:"brand",weight:"font-bold",children:e.toUpperCase()})});function b(){const{data:e=[]}=n({queryKey:["studies"],queryFn:u}),{data:i}=n({queryKey:["site-config"],queryFn:g}),a=i?.labTools||[];return{studies:e,tools:a,getTool:t=>a.find(s=>s.id===t),getStudy:t=>e.find(s=>s.slug===t)}}export{x as F,m as S,b as u};
