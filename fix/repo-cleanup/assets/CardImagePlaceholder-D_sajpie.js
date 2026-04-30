import{d as i,j as s,B as c,S as d,T as o}from"./index-BdtdnkIl.js";import{C as h}from"./camera-DsftDvWX.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],f=i("circle-question-mark",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],y=i("cpu",p);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],g=i("globe",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],x=i("heart",k);function w({category:r,size:l="lg"}){const t=(r||"").toLowerCase();let e=f,a="muted";t.includes("tech")?(e=y,a="brand"):t.includes("travel")||t.includes("wcs")?(e=g,a="accent"):t.includes("gear")?(e=h,a="warning"):t.includes("lifestyle")&&(e=x,a="danger");const n={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-16 h-16 opacity-50"};return s.jsx(c,{surface:a,width:"full",height:"full",display:"flex",align:"center",justify:"center",children:s.jsx(e,{className:n[l],strokeWidth:1.5})})}function M({image:r,category:l,title:t}){const e=(l||"").toLowerCase();let a="muted";return e.includes("tech")?a="brand":e.includes("travel")||e.includes("wcs")?a="accent":e.includes("gear")?a="warning":e.includes("lifestyle")&&(a="danger"),s.jsxs(c,{shrink:!1,aspect:"video",maxHeight:"cardImage",width:"full",className:"relative overflow-hidden border-b border-line bg-bg",children:[r?s.jsx("img",{src:r,alt:t,loading:"lazy",decoding:"async",className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}):s.jsxs(d,{height:"full",width:"full",gap:0,children:[s.jsx(c,{height:4,width:"full",surface:a}),s.jsx(c,{flex:1,display:"flex",align:"center",justify:"center",className:"bg-muted/10",children:s.jsx(w,{category:l,size:"md"})})]}),s.jsx(c,{className:"absolute top-4 left-4",children:s.jsx(c,{className:"px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-sm",children:s.jsx(o,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"wider",className:"text-accent-navy",children:l})})})]})}export{M as C,w as a};
