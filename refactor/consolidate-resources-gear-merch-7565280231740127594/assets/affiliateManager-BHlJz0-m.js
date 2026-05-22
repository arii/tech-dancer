import{A as i}from"./affiliateGear-cevIpx-D.js";/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */const t=Object.fromEntries(i.map(r=>[r.id,r])),m={getLink:r=>t[r],resolveUrl:(r,a)=>{const o=t[r];if(!o)return"#";const e=new URL(o.url);return a&&Object.entries(a).forEach(([n,s])=>{e.searchParams.append(n,s)}),e.searchParams.append("utm_source","boomtick-blog"),e.searchParams.append("utm_medium","portfolio"),e.toString()}};export{m as a};
