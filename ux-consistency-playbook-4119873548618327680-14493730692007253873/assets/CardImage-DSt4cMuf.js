import{j as t}from"./vendor-markdown-DJqeimj_.js";import{c as o,B as r,T as n}from"./index-CdzSW5zX.js";import"./vendor-react-Ch6pmYmO.js";import{C as d}from"./camera-Jao5ZPyG.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],p=o("circle-question-mark",h);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],y=o("cpu",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],f=o("globe",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],x=o("heart",k);function g({category:c,size:i="lg"}){const e=(c||"").toLowerCase();let a=p,s="muted";e.includes("tech")?(a=y,s="brand"):e.includes("travel")||e.includes("wcs")?(a=f,s="accent"):e.includes("gear")?(a=d,s="warning"):e.includes("lifestyle")&&(a=x,s="danger");const l={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return t.jsx(r,{surface:s,className:"w-full h-full flex items-center justify-center",children:t.jsx(a,{className:l[i],strokeWidth:1.5})})}function w({image:c,title:i,category:e,aspect:a="video",children:s}){return t.jsxs(r,{position:"relative",overflow:"hidden",border:"b",surface:"bg",className:"border-line group",aspect:a,children:[c?t.jsx(r,{as:"img",src:c,alt:i,width:"full",height:"full",className:"object-cover group-hover:scale-105 transition-transform duration-700"}):t.jsx(g,{category:e}),t.jsx(r,{position:"absolute",className:"top-4 left-4",children:t.jsx(r,{paddingX:3,paddingY:1,surface:"default",opacity:90,border:!0,radius:"none",className:"backdrop-blur-sm",children:t.jsx(n,{variant:"mono",size:"micro",weight:"font-bold",color:"brand",tracking:"wider",children:e})})}),s]})}export{w as C,g as a};
