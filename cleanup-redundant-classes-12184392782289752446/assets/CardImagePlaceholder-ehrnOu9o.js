import{i as l,j as s,B as r,R as d,S as h,T as u}from"./index-BxWjIoBN.js";import{C as f}from"./camera-DEn3ykr-.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],m=l("circle-question-mark",p);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],y=l("cpu",g);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],x=l("globe",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],b=l("heart",w);function o(a){const e=(a||"").toLowerCase();return e.includes("tech")?y:e.includes("travel")||e.includes("wcs")?x:e.includes("gear")?f:e.includes("lifestyle")?b:m}function M({category:a,size:e="lg"}){const c=(a||"").toLowerCase();let t="muted";c.includes("tech")?t="brand":c.includes("travel")||c.includes("wcs")?t="accent":c.includes("gear")?t="warning":c.includes("lifestyle")&&(t="danger");const i={sm:"w-5 h-5",md:"w-8 h-8",lg:"w-24 h-24 opacity-10"},n=o(a);return s.jsx(r,{surface:t,width:"full",height:"full",display:"flex",align:"center",justify:"center",children:d.createElement(n,{className:i[e],strokeWidth:1.5})})}function C({image:a,category:e,title:c}){const t=(e||"").toLowerCase();let i="muted";return t.includes("tech")?i="brand":t.includes("travel")||t.includes("wcs")?i="accent":t.includes("gear")?i="warning":t.includes("lifestyle")&&(i="danger"),s.jsxs(r,{shrink:!1,aspect:"video",maxHeight:"cardImage",width:"full",border:"b",position:"relative",overflow:"hidden",className:"bg-bg",children:[a?s.jsx("img",{src:a,alt:c,loading:"lazy",decoding:"async",className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"}):s.jsxs(h,{height:"full",width:"full",gap:0,children:[s.jsx(r,{height:4,width:"full",surface:i}),s.jsx(r,{flex:1,display:"flex",align:"center",justify:"center",className:"bg-muted/5",children:s.jsx(M,{category:e,size:"lg"})})]}),s.jsx(r,{position:"absolute",className:"top-4 left-4",children:s.jsxs(r,{border:!0,display:"flex",align:"center",gap:2,paddingX:3,paddingY:1,radius:"sm",shadow:"sm",className:"bg-surface/95 backdrop-blur-md",children:[(()=>{const n=o(e);return d.createElement(n,{className:"w-3.5 h-3.5 text-accent",strokeWidth:2.5})})(),s.jsx(u,{variant:"mono",size:"micro",weight:"font-bold",uppercase:!0,tracking:"wider",color:"brand",children:e})]})})]})}export{C,M as a};
