import{R as s,a as p}from"./index-3984b6ad.js";function d(u){const{data:e,columns:t,tableState:a}=u,c=s.useCallback(()=>t.map((r,n)=>r.header({data:e,item:e[0],rowIndex:0,columnIndex:n,tableState:a})),[e,t,a]),o=s.useCallback(()=>e.map((r,n)=>t.map((m,l)=>p(s.Fragment,{children:m.cell({data:e,item:r,rowIndex:n,columnIndex:l,tableState:a})},l))),[e,t,a]);return{getHeaders:c,getCells:o}}export{d as u};
//# sourceMappingURL=use-table-4435abed.js.map
