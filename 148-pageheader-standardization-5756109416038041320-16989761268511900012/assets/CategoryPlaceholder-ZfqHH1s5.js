import{j as e}from"./vendor-markdown-DJqeimj_.js";import{c as n,B as c,T as o,r as d}from"./index-h5riQVIU.js";import"./vendor-react-Ch6pmYmO.js";import{C as h}from"./camera-Dy2mNGnf.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],p=n("circle-question-mark",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],f=n("cpu",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],x=n("globe",y);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],g=n("heart",k);function M({image:l,category:i,date:r,title:t}){const a=(i||"").toLowerCase();let s="muted";return a.includes("tech")?s="brand":a.includes("travel")||a.includes("wcs")?s="accent":a.includes("gear")?s="warning":a.includes("lifestyle")&&(s="danger"),l?e.jsxs(c,{className:"relative w-full aspect-video max-h-[160px] overflow-hidden border-b border-line bg-bg",children:[e.jsx("img",{src:l,alt:t,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}),e.jsx(c,{className:"absolute top-3 left-3",children:e.jsx(c,{surface:s,className:"px-2 py-0.5 border border-line/20 backdrop-blur-sm bg-opacity-90",children:e.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"wider",children:i})})})]}):e.jsx(c,{surface:s,className:d("w-full h-10 flex items-center px-4 border-b border-line/10","bg-opacity-10"),children:e.jsxs(c,{display:"flex",align:"center",gap:2,children:[e.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"widest",className:"opacity-80",children:i}),r&&e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"w-1 h-1 rounded-full bg-current opacity-30"}),e.jsx(o,{variant:"mono",size:"micro",uppercase:!0,tracking:"widest",className:"opacity-60",children:r})]})]})})}function N({category:l,size:i="lg"}){const r=(l||"").toLowerCase();let t=p,a="muted";r.includes("tech")?(t=f,a="brand"):r.includes("travel")||r.includes("wcs")?(t=x,a="accent"):r.includes("gear")?(t=h,a="warning"):r.includes("lifestyle")&&(t=g,a="danger");const s={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return e.jsx(c,{surface:a,className:"w-full h-full flex items-center justify-center",children:e.jsx(t,{className:s[i],strokeWidth:1.5})})}export{M as C,N as a};
