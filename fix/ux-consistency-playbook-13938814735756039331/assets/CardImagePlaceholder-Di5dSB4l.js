import{e as i,j as s,B as l,l as d,T as o}from"./index-CVOv2V9O.js";import{C as h}from"./camera-GgQxZYp9.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],f=i("circle-question-mark",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],p=i("cpu",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],x=i("globe",y);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],k=i("heart",g);function w({category:r,size:c="lg"}){const t=(r||"").toLowerCase();let a=f,e="muted";t.includes("tech")?(a=p,e="brand"):t.includes("travel")||t.includes("wcs")?(a=x,e="accent"):t.includes("gear")?(a=h,e="warning"):t.includes("lifestyle")&&(a=k,e="danger");const n={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return s.jsx(l,{surface:e,className:"w-full h-full flex items-center justify-center",children:s.jsx(a,{className:n[c],strokeWidth:1.5})})}function M({image:r,category:c,title:t}){const a=(c||"").toLowerCase();let e="muted";return a.includes("tech")?e="brand":a.includes("travel")||a.includes("wcs")?e="accent":a.includes("gear")?e="warning":a.includes("lifestyle")&&(e="danger"),s.jsxs(l,{aspect:"video",maxHeight:d.cardImage.maxHeight,overflow:"hidden",border:"b",className:"relative w-full bg-bg",children:[r?s.jsx("img",{src:r,alt:t,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}):s.jsxs(l,{className:"w-full h-full flex flex-col",children:[s.jsx(l,{height:4,width:"full",surface:e}),s.jsx(l,{flex:1,display:"flex",align:"center",justify:"center",className:"bg-muted/10",children:s.jsx(w,{category:c,size:"md"})})]}),s.jsx(l,{className:"absolute top-3 left-3",children:s.jsx(l,{surface:e,paddingX:2,paddingY:.5,border:!0,radius:"none",className:"border-line/20 backdrop-blur-sm bg-opacity-90",children:s.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"wider",children:c})})})]})}export{M as C,w as a};
