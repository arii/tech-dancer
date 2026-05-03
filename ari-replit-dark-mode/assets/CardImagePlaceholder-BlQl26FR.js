import{c as i,j as t,B as l,R as d,S as h,T as u}from"./index-CeamA7ar.js";import{C as f}from"./camera-DGBbxzVu.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],g=i("circle-question-mark",p);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],y=i("cpu",m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],k=i("globe",x);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],b=i("heart",w);function o(s){const e=(s||"").toLowerCase();return e.includes("tech")?y:e.includes("travel")||e.includes("wcs")?k:e.includes("gear")?f:e.includes("lifestyle")?b:g}function v({category:s,size:e="lg"}){const r=(s||"").toLowerCase();let a="muted";r.includes("tech")?a="brand":r.includes("travel")||r.includes("wcs")?a="accent":r.includes("gear")?a="warning":r.includes("lifestyle")&&(a="danger");const c={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-24 h-24 opacity-10"},n=o(s);return t.jsx(l,{surface:a,width:"full",height:"full",display:"flex",align:"center",justify:"center",children:d.createElement(n,{className:c[e],strokeWidth:1.5})})}function N({image:s,category:e,title:r}){const a=(e||"").toLowerCase();let c="muted";return a.includes("tech")?c="brand":a.includes("travel")||a.includes("wcs")?c="accent":a.includes("gear")?c="warning":(a.includes("lifestyle")||a.includes("white"))&&(c="danger"),t.jsxs(l,{shrink:!1,aspect:"video",maxHeight:"cardImage",width:"full",className:"relative overflow-hidden border-b border-line bg-[#05050d]",children:[s?t.jsx("img",{src:s,alt:r,loading:"lazy",decoding:"async",className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}):t.jsxs(h,{height:"full",width:"full",gap:0,className:"bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))]",children:[t.jsx(l,{height:2,width:"full",surface:c,className:"opacity-90"}),t.jsx(l,{flex:1,display:"flex",align:"center",justify:"center",className:"bg-transparent",children:t.jsx(v,{category:e,size:"lg",className:"opacity-90 scale-105"})})]}),t.jsx(l,{className:"absolute top-4 left-4",children:t.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-[#090914]/92 backdrop-blur-md border border-line/80 rounded-full shadow-[0_0_16px_rgba(0,229,255,.12)]",children:[(()=>{const n=o(e);return d.createElement(n,{className:"w-3.5 h-3.5 text-accent",strokeWidth:2.5})})(),t.jsx(u,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"wider",className:"text-white",children:e})]})})]})}export{N as C,v as a};
