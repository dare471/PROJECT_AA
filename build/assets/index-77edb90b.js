import{f as b,az as p,a as T,c as h,e as j,D as s,E as R,J as m,aA as C,aB as O,aC as $,aD as z}from"./index-3984b6ad.js";var B=b((r,o)=>{const a=p();return T(h.thead,{...r,ref:o,__css:a.thead})}),D=b((r,o)=>{var a;const{overflow:n,overflowX:d,className:u,...w}=r;return T(h.div,{ref:o,className:j("chakra-table__container",u),...w,__css:{display:"block",whiteSpace:"nowrap",WebkitOverflowScrolling:"touch",overflowX:(a=n??d)!=null?a:"auto",overflowY:"hidden",maxWidth:"100%"}})}),N=b(({isNumeric:r,...o},a)=>{const n=p();return T(h.th,{...o,ref:a,__css:n.th,"data-is-numeric":r})});function W(r){const{data:o,tableState:a,tableGenerateCb:n,defaultState:d,isSelect:u=!1,isExtend:w=!1}=r,f=s(),v=i(),E=s(),x=i(),_=s(),k=s(),g=R(d||{}),c=a||g,y=R(null);c.on(o,(e,t)=>n(t)),y.on(f,(e,t)=>t),u&&(c.on(v,(e,{rowIndex:t})=>({...e,rowSelect:{...e.rowSelect,[t]:e.rowSelect[t]?!e.rowSelect[t]:!0}})),c.on(E,(e,{value:t})=>({...e,rowSelect:Object.keys(e.rowSelect).reduce((l,S)=>(l[S]=t,l),{})}))),w&&(c.on(x,(e,{rowIndex:t})=>({...e,rowExtend:{...e.rowExtend,[t]:!e.rowExtend[t]}})),c.on(_,(e,{value:t})=>({...e,rowExtend:Object.keys(e.rowExtend).reduce((l,S)=>(l[S]=t,l),{})}))),m({clock:k,source:o,fn:e=>n(e),target:c});function i(){const e=s();return m({clock:e,fn:({rowIndex:t})=>t,target:f}),e}return{createRowEvent:i,currentRowSettled:f,rowSelected:v,allRowSelected:E,rowExtended:x,allRowExtended:_,tableReset:k,$tableState:c,$currentRow:y}}const A={Table:C,TableContainer:D,TBody:O,Td:$,Th:N,THead:B,Tr:z,createTable:W};export{A as T};
//# sourceMappingURL=index-77edb90b.js.map
