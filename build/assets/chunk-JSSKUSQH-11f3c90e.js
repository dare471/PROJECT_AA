import{i as _,f as H,l as A,o as M,e as q,a as p,c as S,d,g as C,L as P,k as I}from"./index-3984b6ad.js";import{m as T}from"./chunk-G72KV6MB-8fe2283c.js";var[j,E]=_({name:"FormControlStylesContext",errorMessage:`useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `}),[L,O]=_({strict:!1,name:"FormControlContext"});function z(n){const{id:s,isRequired:t,isInvalid:l,isDisabled:e,isReadOnly:r,...u}=n,m=d.useId(),a=s||`field-${m}`,b=`${a}-label`,f=`${a}-feedback`,F=`${a}-helptext`,[y,h]=d.useState(!1),[R,x]=d.useState(!1),[c,g]=d.useState(!1),D=d.useCallback((o={},i=null)=>({id:F,...o,ref:T(i,v=>{v&&x(!0)})}),[F]),N=d.useCallback((o={},i=null)=>{var v,k;return{...o,ref:i,"data-focus":C(c),"data-disabled":C(e),"data-invalid":C(l),"data-readonly":C(r),id:(v=o.id)!=null?v:b,htmlFor:(k=o.htmlFor)!=null?k:a}},[a,e,c,l,r,b]),B=d.useCallback((o={},i=null)=>({id:f,...o,ref:T(i,v=>{v&&h(!0)}),"aria-live":"polite"}),[f]),$=d.useCallback((o={},i=null)=>({...o,...u,ref:i,role:"group"}),[u]),w=d.useCallback((o={},i=null)=>({...o,ref:i,role:"presentation","aria-hidden":!0,children:o.children||"*"}),[]);return{isRequired:!!t,isInvalid:!!l,isReadOnly:!!r,isDisabled:!!e,isFocused:!!c,onFocus:()=>g(!0),onBlur:()=>g(!1),hasFeedbackText:y,setHasFeedbackText:h,hasHelpText:R,setHasHelpText:x,id:a,labelId:b,feedbackId:f,helpTextId:F,htmlProps:u,getHelpTextProps:D,getErrorMessageProps:B,getRootProps:$,getLabelProps:N,getRequiredIndicatorProps:w}}var G=H(function(s,t){const l=A("Form",s),e=M(s),{getRootProps:r,htmlProps:u,...m}=z(e),a=q("chakra-form-control",s.className);return p(L,{value:m,children:p(j,{value:l,children:p(S.div,{...r({},t),className:a,__css:l.container})})})});G.displayName="FormControl";var J=H(function(s,t){const l=O(),e=E(),r=q("chakra-form__helper-text",s.className);return p(S.div,{...l==null?void 0:l.getHelpTextProps(s,t),__css:e.helperText,className:r})});J.displayName="FormHelperText";function V(n){const{isDisabled:s,isInvalid:t,isReadOnly:l,isRequired:e,...r}=K(n);return{...r,disabled:s,readOnly:l,required:e,"aria-invalid":P(t),"aria-required":P(e),"aria-readonly":P(l)}}function K(n){var s,t,l;const e=O(),{id:r,disabled:u,readOnly:m,required:a,isRequired:b,isInvalid:f,isReadOnly:F,isDisabled:y,onFocus:h,onBlur:R,...x}=n,c=n["aria-describedby"]?[n["aria-describedby"]]:[];return e!=null&&e.hasFeedbackText&&(e!=null&&e.isInvalid)&&c.push(e.feedbackId),e!=null&&e.hasHelpText&&c.push(e.helpTextId),{...x,"aria-describedby":c.join(" ")||void 0,id:r??(e==null?void 0:e.id),isDisabled:(s=u??y)!=null?s:e==null?void 0:e.isDisabled,isReadOnly:(t=m??F)!=null?t:e==null?void 0:e.isReadOnly,isRequired:(l=a??b)!=null?l:e==null?void 0:e.isRequired,isInvalid:f??(e==null?void 0:e.isInvalid),onFocus:I(e==null?void 0:e.onFocus,h),onBlur:I(e==null?void 0:e.onBlur,R)}}export{K as a,V as u};
//# sourceMappingURL=chunk-JSSKUSQH-11f3c90e.js.map
