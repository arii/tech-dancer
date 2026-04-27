import{e as n,j as e,B as t,T as o,c as d}from"./index-BWcmPeky.js";import{C as h}from"./camera-B3p5ygLl.js";/**
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
 */const k=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],g=n("heart",k);function j({image:i,category:l,date:s,title:c}){const a=(l||"").toLowerCase();let r="muted";return a.includes("tech")?r="brand":a.includes("travel")||a.includes("wcs")?r="accent":a.includes("gear")?r="warning":a.includes("lifestyle")&&(r="danger"),i?e.jsxs(t,{className:"relative w-full aspect-video max-h-[160px] overflow-hidden border-b border-line bg-bg",children:[e.jsx("img",{src:i,alt:c,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}),e.jsx(t,{className:"absolute top-3 left-3",children:e.jsx(t,{surface:r,className:"px-2 py-0.5 border border-line/20 backdrop-blur-sm bg-opacity-90",children:e.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,className:"tracking-wider",children:l})})})]}):e.jsx(t,{surface:r,className:d("w-full h-10 flex items-center px-4 border-b border-line/10","bg-opacity-10"),children:e.jsxs(t,{display:"flex",align:"center",gap:2,children:[e.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,className:"tracking-widest opacity-80",children:l}),s&&e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"w-1 h-1 rounded-full bg-current opacity-30"}),e.jsx(o,{variant:"mono",size:"micro",uppercase:!0,className:"tracking-widest opacity-60",children:s})]})]})})}function v({category:i,size:l="lg"}){const s=(i||"").toLowerCase();let c=p,a="muted";s.includes("tech")?(c=f,a="brand"):s.includes("travel")||s.includes("wcs")?(c=x,a="accent"):s.includes("gear")?(c=h,a="warning"):s.includes("lifestyle")&&(c=g,a="danger");const r={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return e.jsx(t,{surface:a,className:"w-full h-full flex items-center justify-center",children:e.jsx(c,{className:r[l],strokeWidth:1.5})})}export{v as C,j as a};
