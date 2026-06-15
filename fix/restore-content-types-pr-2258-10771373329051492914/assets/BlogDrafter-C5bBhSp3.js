import{m as S,r as m,j as e,B as o,S as u,T as c,G as $,a2 as j,c as C,z as M,a4 as B,b as J}from"./index-DufVi416.js";import{P as U}from"./PageHeader-BkdoQ1Ii.js";import{M as R}from"./MarkdownRenderer-DvavGjSY.js";import{E as _,a as F}from"./EditorialHeader-BdnGnzx6.js";import{r as H}from"./content-DEXrMpt-.js";import{T as Y}from"./trash-2-CmHiKC6G.js";import{C as L}from"./check-B-aCI9wI.js";import{F as G}from"./file-text-g1YSM-CD.js";import{G as W}from"./github-B6CEq9Fm.js";import{E as V}from"./external-link-BP5xVC9R.js";import"./BaseCard-ZxkCBxrY.js";import"./affiliateManager-CdZq2stu.js";import"./Icon-CbA-Ompy.js";/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const q=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],K=S("eye",q);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const X=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],Q=S("history",X);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Z=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],ee=S("info",Z);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const te=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],ae=S("rotate-ccw",te);/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const re=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],ne=S("save",re),oe=[{id:"Lifestyle",label:"Lifestyle",description:"Personal stories, travel, and routines."},{id:"Tech",label:"Tech",description:"Robotics, software engineering, and AI."},{id:"Gear",label:"Tools",description:"Hardware reviews and DIY modifications."},{id:"Travel",label:"Travel",description:"WCS event logistics and travel tips."}],A={author:"Ariel Anders, PhD",repo:{owner:"arii",name:"tech-dancer"}},P="tech-dancer-blog-draft",z="tech-dancer-blog-history",se=1e3,ie=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,11)}`,E={type:"post",title:"",category:"Lifestyle",excerpt:"",author:A.author,date:new Date().toISOString().split("T")[0],affiliateLink:"",commentary:"",location:"",city:"",schedule:"",description:"",affiliateIds:[],tags:[],verdict:"",priceCategory:"",updatedDate:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}),heading:"",content:""};function ce(){const[t,g]=m.useState(()=>{try{const i=localStorage.getItem(P);if(i){const h=JSON.parse(i);return{...E,...h}}}catch{}return E}),[l,x]=m.useState(()=>{try{const i=localStorage.getItem(z);if(i)return JSON.parse(i)}catch{}return[]}),f=m.useRef(null),y=m.useCallback(i=>{f.current&&clearTimeout(f.current),f.current=setTimeout(()=>{try{localStorage.setItem(P,JSON.stringify(i))}catch{}},se)},[]);m.useEffect(()=>{y(t)},[t,y]),m.useEffect(()=>{try{localStorage.setItem(z,JSON.stringify(l))}catch{}},[l]);const b=m.useCallback(()=>{const i={id:ie(),timestamp:Date.now(),data:{...t}};x(h=>[i,...h].slice(0,10))},[t]),T=i=>{g(i.data)},I=i=>{x(h=>h.filter(r=>r.id!==i))},w=m.useMemo(()=>t.type==="event"?`---
type: event
title: "${t.title||"Untitled Event"}"
date: "${t.date}"
author: "${t.author}"
category: "${t.category}"
excerpt: "${t.excerpt||""}"
location: "${t.location||""}"
city: "${t.city||""}"
schedule: "${t.schedule||""}"
description: "${t.description||""}"
---
# ${t.title||""}
${t.excerpt||""}
`:t.type==="resource"?`type: resource
title: "${t.title||""}"
date: "${t.date}"
author: "${t.author}"
category: "${t.category}"
excerpt: "${t.excerpt||""}"
affiliateIds: ${JSON.stringify(t.affiliateIds??[])}
tags: ${JSON.stringify(t.tags??[])}
verdict: "${t.verdict||""}"
priceCategory: "${t.priceCategory||""}"
updatedDate: "${t.updatedDate||""}"
${t.heading||""}
${t.content||""}
`:`---
type: post
title: "${t.title||"Untitled Post"}"
date: "${t.date}"
author: "${t.author}"
category: "${t.category}"
excerpt: "${t.excerpt||""}"
---

${t.commentary||"[Your commentary/content goes here]"}

${t.affiliateLink?`
[Buy on Amazon](${t.affiliateLink})`:""}
`,[t]),v=m.useMemo(()=>{const i=A.repo.owner,h=A.repo.name,d=`Draft [${t.type.toUpperCase()}]: ${t.title||"New Item"}`,n=`### New ${t.type} Submission

**JSON Data for Pipeline:**
\`\`\`json
${JSON.stringify(t,null,2)}
\`\`\`

**Markdown Preview:**
\`\`\`markdown
${w}
\`\`\``;return`https://github.com/${i}/${h}/issues/new?title=${encodeURIComponent(d)}&body=${encodeURIComponent(n)}`},[t,w]);return{data:t,history:l,updateField:(i,h)=>{g(r=>({...r,[i]:h}))},applyAIResponse:i=>{const r=(n=>{try{let p=n.trim();return p=p.replace(/^```(json)?\n?/,"").replace(/\n?```$/,""),p=p.trim(),JSON.parse(p)}catch{return null}})(i);if(!r)return!1;const d=(n,p=0)=>p>5?n:typeof n=="string"?n.replace(/\\n/g,`
`):Array.isArray(n)?n.map(a=>d(a,p+1)):n!==null&&typeof n=="object"?Object.fromEntries(Object.entries(n).map(([a,s])=>[a,d(s,p+1)])):n;return g(n=>{const p=r.type||n.type,a={title:d(r.title)||n.title,category:d(r.category)||n.category,excerpt:d(r.excerpt||r.description)||n.excerpt,affiliateLink:r.affiliateLink||(n.type==="post"?n.affiliateLink:""),commentary:d(r.commentary)||(n.type==="post"?n.commentary:""),author:d(r.author)||n.author,date:r.date||n.date};if(p==="resource"){const s=n.type==="resource"?n:{};return{...a,type:"resource",durability:r.durability??s.durability??0,value:r.value??s.value??0,priceCategory:r.priceCategory||s.priceCategory||"$$",verdict:d(r.verdict)||s.verdict||"",specs:d(r.specs)||s.specs||{},affiliateIds:r.affiliateIds||s.affiliateIds||[],tags:r.tags||s.tags||[],updatedDate:r.updatedDate||s.updatedDate||"",heading:r.heading||s.heading||"",content:r.content||s.content||""}}if(p==="event"){const s=n.type==="event"?n:{};return{...a,type:"event",location:d(r.location)||s.location||"",startDate:r.startDate||s.startDate||"",earlyBirdDate:r.earlyBirdDate||s.earlyBirdDate||"",hotelCutoffDate:r.hotelCutoffDate||s.hotelCutoffDate||"",url:r.url||s.url||"",city:r.city||s.city||"",schedule:r.schedule||s.schedule||"",description:r.description||s.description||""}}return{...a,type:"post",affiliateLink:a.affiliateLink,commentary:a.commentary}}),!0},clearForm:()=>{g(E)},saveToHistory:b,rollback:T,deleteHistoryEntry:I,markdownPreview:w,githubIssueUrl:v}}function le({post:t,onBack:g}){const l=`${H(t.content)} min read`;return e.jsx(_,{onBack:g,backLabel:"Exit Preview",header:e.jsx(F,{category:t.category,date:t.date,readTime:l,title:t.title,dek:t.excerpt,author:t.author,tags:t.tags}),children:e.jsx(o,{className:"prose-editorial",children:e.jsx(R,{content:t.content})})})}const N=({label:t,value:g,onChange:l,placeholder:x,type:f="text",...y})=>e.jsxs(u,{gap:2,children:[e.jsx(c,{variant:"mono",size:"micro",color:"dim",className:"tracking-wider uppercase font-bold",marginBottom:0,children:t}),f==="textarea"?e.jsx(o,{as:"textarea",value:g,onChange:b=>l(b.target.value),placeholder:x,height:40,className:"w-full bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none",...y}):e.jsx(o,{as:"input",type:f,value:g,onChange:b=>l(b.target.value),placeholder:x,className:"w-full bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed",...y})]});function Ne(){const{data:t,history:g,updateField:l,applyAIResponse:x,clearForm:f,saveToHistory:y,rollback:b,deleteHistoryEntry:T,markdownPreview:I,githubIssueUrl:w}=ce(),[v,O]=m.useState(!1),[k,D]=m.useState(""),[i,h]=m.useState(!1),[r,d]=m.useState("compact"),n=()=>{if(!k.trim())return;x(k)?(h(!0),D(""),setTimeout(()=>h(!1),3e3)):alert("Invalid JSON format. Please paste a valid JSON object.")},p=()=>{const s=`Objective: Expand the following ${t.type} draft JSON for Tech-Dancer.
Requirements:
1. Respond ONLY with a valid JSON object.
2. DO NOT include any explanatory text, commentary, or markdown markers outside or inside the JSON values.
3. Ensure the JSON strictly matches the keys: title, author, excerpt, affiliateLink, commentary.
4. Content should be rich markdown where appropriate.

Draft Data: ${JSON.stringify(t,null,2)}`;navigator.clipboard.writeText(s),O(!0),setTimeout(()=>O(!1),2e3)};return r==="full"?e.jsx(le,{post:t,onBack:()=>d("compact")}):e.jsxs(u,{gap:{base:6,md:10},height:"full",children:[e.jsxs(u,{gap:4,children:[e.jsxs(o,{display:"flex",align:"center",justify:"between",width:"full",children:[e.jsx(U,{label:"LABORATORY",title:"CONTENT PIPELINE",paddingBottom:0,border:"none"}),e.jsxs(o,{as:"button",onClick:()=>{window.confirm("Clear all draft data?")&&f()},display:"flex",align:"center",gap:2,className:"text-text-dim hover:text-accent transition-colors cursor-pointer",children:[e.jsx(ae,{className:"w-4 h-4"}),e.jsx(c,{variant:"mono",size:"micro",weight:"font-bold",children:"CLEAR FORM"})]})]}),e.jsx(o,{border:!0,padding:"compact",className:"bg-accent/5 border-accent/20",children:e.jsxs(u,{gap:2,display:"flex",align:"baseline",direction:"row",children:[e.jsx(o,{as:"span",className:"shrink-0",children:e.jsx(ee,{className:"w-4 h-4 text-accent"})}),e.jsxs(c,{variant:"body",size:"xs",children:["Drafting as ",e.jsx("strong",{children:t.type.toUpperCase()}),". Complete the form below to generate a pre-formatted GitHub Issue link."]})]})})]}),e.jsxs($,{cols:{base:1,lg:2},gap:{base:8,lg:12},children:[e.jsxs(u,{gap:8,children:[e.jsxs(o,{border:"b",paddingBottom:2,display:"flex",justify:"between",align:"center",children:[e.jsx(c,{variant:"mono",size:"micro",color:"brand",children:"Metadata"}),e.jsxs(o,{as:"button",onClick:y,display:"flex",align:"center",gap:2,className:"text-accent hover:opacity-high transition-all cursor-pointer",children:[e.jsx(ne,{className:"w-3 h-3"}),e.jsx(c,{variant:"mono",size:"micro",weight:"font-bold",children:"Save Snapshot"})]})]}),e.jsxs(u,{gap:6,children:[e.jsxs($,{cols:2,gap:4,children:[e.jsxs(u,{gap:2,children:[e.jsx(c,{variant:"mono",size:"micro",color:"dim",className:j.label,marginBottom:0,children:"Content Type"}),e.jsx(o,{as:"select",value:t.type,className:C(j.base,"appearance-none"),disabled:!0,children:e.jsx("option",{value:"post",children:"Blog Post"})})]}),e.jsxs(u,{gap:2,children:[e.jsx(c,{variant:"mono",size:"micro",color:"dim",className:j.label,marginBottom:0,children:"Category"}),e.jsx(o,{as:"select",value:t.category,onChange:a=>l("category",a.target.value),className:C(j.base,"appearance-none"),children:oe.map(a=>e.jsx("option",{value:a.id,children:a.label},a.id))})]})]}),e.jsx(N,{label:"Title",value:t.title,onChange:a=>l("title",a),placeholder:"The Future of WCS..."}),e.jsxs($,{cols:2,gap:4,children:[e.jsx(N,{label:"Publish Date",value:t.date,onChange:a=>l("date",a),type:"date"}),e.jsx(N,{label:"Author",value:t.author,onChange:a=>l("author",a)})]}),e.jsxs(u,{gap:2,children:[e.jsx(c,{variant:"mono",size:"micro",color:"dim",className:j.label,marginBottom:0,children:"Excerpt"}),e.jsx(o,{as:"textarea",value:t.excerpt,onChange:a=>l("excerpt",a.target.value),placeholder:"A brief overview of the content...",height:20,className:C(j.base,"resize-none")})]}),e.jsx(N,{label:"Amazon Link (Optional)",value:t.affiliateLink,onChange:a=>l("affiliateLink",a),type:"url",placeholder:"https://amazon.com/..."}),e.jsx(N,{label:"Content",value:t.commentary,onChange:a=>l("commentary",a),type:"textarea",placeholder:"Write your main content here..."})]}),g.length>0&&e.jsxs(u,{gap:4,marginTop:4,children:[e.jsxs(o,{border:"b",paddingBottom:2,display:"flex",align:"center",gap:2,children:[e.jsx(Q,{className:"w-3 h-3 text-accent"}),e.jsx(c,{variant:"mono",size:"micro",color:"brand",children:"VERSION_HISTORY"})]}),e.jsx(u,{gap:2,children:g.map(a=>e.jsxs(o,{border:!0,padding:3,surface:"muted",display:"flex",align:"center",justify:"between",className:"hover:border-accent/50 transition-colors",children:[e.jsxs(u,{gap:1,children:[e.jsxs(o,{display:"flex",align:"center",gap:2,children:[e.jsx(c,{variant:"mono",size:"xs",weight:"font-bold",children:a.data.title||"Untitled Snapshot"}),e.jsx(o,{paddingX:1,className:"bg-accent/20 rounded",children:e.jsx(c,{variant:"mono",size:"micro",color:"accent",children:a.data.type.toUpperCase()})})]}),e.jsx(c,{variant:"mono",size:"micro",color:"dim",children:new Date(a.timestamp).toLocaleString()})]}),e.jsxs(o,{display:"flex",gap:2,children:[e.jsx(o,{as:"button",onClick:()=>b(a),surface:"accent",paddingX:2,paddingY:1,className:"bg-accent/10 text-accent hover:bg-accent hover:text-bg transition-all cursor-pointer",children:e.jsx(c,{variant:"mono",size:"micro",weight:"font-bold",className:"text-inherit",children:"ROLLBACK"})}),e.jsx(o,{as:"button",onClick:()=>T(a.id),className:"text-dim hover:text-warning transition-colors cursor-pointer",children:e.jsx(Y,{className:"w-4 h-4"})})]})]},a.id))})]})]}),e.jsxs(u,{gap:8,children:[e.jsxs(o,{border:"b",paddingBottom:2,display:"flex",justify:"between",align:"center",children:[e.jsx(c,{variant:"mono",size:"micro",color:"brand",children:"AI Tools"}),i&&e.jsxs(o,{display:"flex",align:"center",gap:2,children:[e.jsx(L,{className:"w-3 h-3 text-accent"}),e.jsx(c,{variant:"mono",size:"micro",color:"brand",weight:"font-bold",children:"Applied Successfully"})]})]}),e.jsxs(u,{gap:4,children:[e.jsx(o,{as:"textarea",value:k,onChange:a=>D(a.target.value),placeholder:"Paste AI JSON response here...",height:32,className:C(j.base,"resize-none")}),e.jsxs(M,{onClick:n,gap:3,padding:4,children:[e.jsx(B,{className:"w-4 h-4"}),"Apply Draft"]})]}),e.jsxs(o,{border:"b",paddingBottom:2,display:"flex",justify:"between",align:"center",children:[e.jsxs(o,{display:"flex",align:"center",gap:2,children:[e.jsx(c,{variant:"mono",size:"micro",color:"brand",children:"Markdown Preview"}),e.jsxs(o,{as:"button",onClick:()=>d("full"),display:"flex",align:"center",gap:1,paddingLeft:4,className:"text-accent hover:opacity-high transition-all cursor-pointer",children:[e.jsx(K,{className:"w-3 h-3"}),e.jsx(c,{variant:"mono",size:"micro",weight:"font-bold",children:"FULL_PREVIEW"})]})]}),e.jsxs(o,{display:"flex",align:"center",gap:2,color:"dim",children:[e.jsx(G,{className:"w-3 h-3"}),e.jsx(c,{variant:"mono",size:"micro",children:"v1.4.0"})]})]}),e.jsx(o,{flex:!0,border:!0,surface:"muted",padding:6,overflow:"y-auto",maxHeight:"600px",className:"prose prose-sm prose-invert max-w-none bg-black/5",children:e.jsx(R,{content:I})}),e.jsxs($,{cols:2,gap:4,children:[e.jsxs(o,{as:"button",onClick:p,display:"flex",align:"center",justify:"center",gap:3,surface:v?"accent":"muted",border:!0,padding:4,className:`hover:bg-line transition-all cursor-pointer group ${v?"bg-accent/10 border-accent text-accent":""}`,children:[v?e.jsx(L,{className:"w-5 h-5"}):e.jsx(J,{className:"w-5 h-5"}),e.jsx(c,{variant:"mono",size:"xs",weight:"font-bold",children:v?"PROMPT COPIED ✓":"COPY AI PROMPT"})]}),e.jsxs(o,{as:"a",href:w,target:"_blank",rel:"noopener noreferrer",display:"flex",align:"center",justify:"center",gap:3,surface:"accent",padding:4,className:"bg-accent text-bg hover:bg-accent transition-all cursor-pointer group",children:[e.jsx(W,{className:"w-5 h-5"}),e.jsx(c,{variant:"display",size:"base",weight:"font-bold",color:"bg",children:"SUBMIT DRAFT"}),e.jsx(V,{className:"w-4 h-4 opacity-muted group-hover:opacity-full transition-opacity"})]})]})]})]})]})}export{Ne as BlogDrafter};
