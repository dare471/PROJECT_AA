import{E as b,O as t,aL as E,$ as d,aM as j,D as f,aN as z,aO as C,J as g,s as u,R as D,j as c,a as n,T as l,x as p}from"./index-3984b6ad.js";import{D as W}from"./chunk-HFJCK6H7-c0677b16.js";import{A as _}from"./chunk-VJ54TX72-7a23418a.js";import{S as x}from"./ui-1da0a997.js";import{S as a}from"./chunk-O5CRURSQ-1491cac4.js";import{C as U,a as w}from"./chunk-S432VF2S-0bb7f0e6.js";import{B as $}from"./chunk-NAA7TEES-d1065a5b.js";import"./chunk-QODHG6BI-a3dc6b43.js";import"./chunk-G72KV6MB-8fe2283c.js";function B(){const e=b([]),s=b(!1),i=t({effect:E,source:d,mapParams:(o,r)=>{if(!r)throw new Error("session is null");return{userId:r.id}}});return s.on(i.pending,(o,r)=>r),e.on(i.doneData,(o,r)=>r),{getUserSubscribesRegionsFx:i,$userRegions:e,$userRegionsPending:s}}function M(){const e=b([]),s=b(!1),i=t({effect:j,source:d,mapParams:(o,r)=>{if(!r)throw new Error("session is null");return{userId:r.id}}});return s.on(i.pending,(o,r)=>r),e.on(i.doneData,(o,r)=>r),{getUserUnSubscribesRegionsFx:i,$userRegions:e,$userRegionsPending:s}}const P=f(),v=f(),F=f(),I=f(),m=B(),S=M(),h=t({effect:m.getUserSubscribesRegionsFx,source:d,mapParams:(e,s)=>{if(!s)throw new Error("Session is not defined");return{userId:s.id}}}),R=t({effect:S.getUserUnSubscribesRegionsFx,source:d,mapParams:(e,s)=>{if(!s)throw new Error("Session is not defined");return{userId:s.id}}}),k=t({effect:z}),y=t({effect:C});g({clock:P,source:d,filter:e=>e!==null,fn:e=>({userId:e.id}),target:[h,R]});g({clock:F,fn:e=>({regionIds:[e]}),target:k});g({clock:k.done,target:[h,R]});g({clock:I,fn:e=>({regionIds:[e]}),target:y});g({clock:y.done,target:[h,R]});function V(){const[e,s]=u([P,v]);return D.useEffect(()=>(e(),()=>s()),[]),c(a,{children:[c(a,{minH:"md",shadow:"md",px:"6",py:"4",children:[n(l,{fontSize:"2xl",fontWeight:"bold",mb:"2",children:"Подписанные регионы"}),n(A,{})]}),c(a,{minH:"md",shadow:"md",px:"6",py:"4",children:[n(l,{fontSize:"2xl",fontWeight:"bold",mb:"2",children:"Отписанные регионы"}),n(H,{})]})]})}function A(){const[e,s]=u([m.$userRegions,m.$userRegionsPending]),[i]=u([I]);return s?n(x,{}):n(p,{children:e.map((o,r)=>n(U,{variant:"filled",children:n(w,{children:c(a,{direction:"row",justify:"space-between",align:"center",children:[n(l,{fontSize:"md",fontWeight:"bold",children:o.name}),n($,{colorScheme:"red",onClick:()=>i(o.regionId),children:n(W,{})})]})})},r))})}function H(){const[e,s]=u([S.$userRegions,S.$userRegionsPending]),[i]=u([F]);return s?n(x,{}):n(p,{children:e.map((o,r)=>n(U,{variant:"filled",children:n(w,{children:c(a,{direction:"row",justify:"space-between",align:"center",children:[n(l,{fontSize:"md",fontWeight:"bold",children:o.name}),n($,{colorScheme:"blue",onClick:()=>i(o.regionId),children:n(_,{})})]})})},r))})}export{V as SettingsSubscribesRegionsPage};
//# sourceMappingURL=index-f940356a.js.map
