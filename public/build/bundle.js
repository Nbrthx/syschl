var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function l(){return f(" ")}function a(){return f("")}function d(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function p(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function m(t,n){t.value=null==n?"":n}let h;function $(t){h=t}const g=[],b=[],x=[],y=[],_=Promise.resolve();let w=!1;function v(t){x.push(t)}const k=new Set;let C=0;function E(){const t=h;do{for(;C<g.length;){const t=g[C];C++,$(t),j(t.$$)}for($(null),g.length=0,C=0;b.length;)b.pop()();for(let t=0;t<x.length;t+=1){const n=x[t];k.has(n)||(k.add(n),n())}x.length=0}while(g.length);for(;y.length;)y.pop()();w=!1,k.clear(),$(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(v)}}const A=new Set;function N(t,n){t&&t.i&&(A.delete(t),t.i(n))}function I(t,n,e,o){if(t&&t.o){if(A.has(t))return;A.add(t),undefined.c.push((()=>{A.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function S(t){t&&t.c()}function T(t,e,c,u){const{fragment:i,on_mount:s,on_destroy:f,after_update:l}=t.$$;i&&i.m(e,c),u||v((()=>{const e=s.map(n).filter(r);f?f.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(v)}function L(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function O(t,n){-1===t.$$.dirty[0]&&(g.push(t),w||(w=!0,_.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function P(n,r,c,u,s,f,l,a=[-1]){const d=h;$(n);const p=n.$$={fragment:null,ctx:null,props:f,update:t,not_equal:s,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:e(),dirty:a,skip_bound:!1,root:r.target||d.$$.root};l&&l(p.root);let m=!1;if(p.ctx=c?c(n,r.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return p.ctx&&s(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&O(n,t)),e})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!u&&u(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(i)}else p.fragment&&p.fragment.c();r.intro&&N(n.$$.fragment),T(n,r.target,r.anchor,r.customElement),E()}$(d)}class U{$destroy(){L(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const q=t=>{const n=document.cookie;return(n?n.split("; ").map((t=>t.split("="))).reduce(((t,n)=>(t[decodeURIComponent(n[0].trim())]=decodeURIComponent(n[1].trim()),t)),{}):{})[t]},R=(t,n)=>{document.cookie=null!=n?t+"="+n:t+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"};function B(n){let e;return{c(){e=s("h1"),e.textContent=`Hello ${H}!`},m(t,n){u(t,e,n)},p:t,d(t){t&&i(e)}}}function F(n){let e;let o=B(n);return{c(){o.c(),e=a()},m(t,n){o.m(t,n),u(t,e,n)},p(t,[n]){o.p(t,n)},i:t,o:t,d(t){o.d(t),t&&i(e)}}}let H="ɐpɐʇʞƎ";class J extends U{constructor(t){super(),P(this,t,null,F,c,{})}}function M(n){let e;return{c(){e=s("script"),e.textContent='location.href = "/"'},m(t,n){u(t,e,n)},p:t,d(t){t&&i(e)}}}function z(t){let n,e,r,c,a,h,$,g,b,x,y,_,w,v,k,C,E,j,A,N,I;return{c(){n=s("h1"),n.textContent="Login",e=l(),r=s("strong"),c=f(t[2]),a=s("br"),h=l(),$=s("strong"),$.textContent="Name",g=s("br"),b=l(),x=s("input"),y=s("br"),_=l(),w=s("strong"),w.textContent="Password",v=s("br"),k=l(),C=s("input"),E=s("br"),j=l(),A=s("button"),A.textContent="Submit",p(x,"type","text"),p(C,"type","password")},m(o,i){u(o,n,i),u(o,e,i),u(o,r,i),function(t,n){t.appendChild(n)}(r,c),u(o,a,i),u(o,h,i),u(o,$,i),u(o,g,i),u(o,b,i),u(o,x,i),m(x,t[0]),u(o,y,i),u(o,_,i),u(o,w,i),u(o,v,i),u(o,k,i),u(o,C,i),m(C,t[1]),u(o,E,i),u(o,j,i),u(o,A,i),N||(I=[d(x,"input",t[5]),d(C,"input",t[6]),d(A,"click",t[4])],N=!0)},p(t,n){4&n&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(c,t[2]),1&n&&x.value!==t[0]&&m(x,t[0]),2&n&&C.value!==t[1]&&m(C,t[1])},d(t){t&&i(n),t&&i(e),t&&i(r),t&&i(a),t&&i(h),t&&i($),t&&i(g),t&&i(b),t&&i(x),t&&i(y),t&&i(_),t&&i(w),t&&i(v),t&&i(k),t&&i(C),t&&i(E),t&&i(j),t&&i(A),N=!1,o(I)}}}function D(n){let e;let o=function(t,n){return t[3]?M:z}(n),r=o(n);return{c(){r.c(),e=a()},m(t,n){r.m(t,n),u(t,e,n)},p(t,[n]){r.p(t,n)},i:t,o:t,d(t){r.d(t),t&&i(e)}}}function G(t,n,e){const o=require("cryptojs");let r=q("user"),c="",u="",i="";return[c,u,i,r,function(){fetch("/api?for=login&&user="+c+"&&pw=").then((t=>t.json())).then((t=>function(t){let n=o.AES.encrypt(u,"justlnh");c&&u?u.length<8?e(2,i="Password musd be more 8 character"):c!=t.id&&n!=t.password?e(2,i="Input incorrect"):(R("user",c),location.href="/"):e(2,i="Input must be filled")}(t))).catch((t=>{throw t}))},function(){c=this.value,e(0,c)},function(){u=this.value,e(1,u)}]}class K extends U{constructor(t){super(),P(this,t,G,D,c,{})}}function Q(n){let e;return{c(){e=f("Error 404 Not Found")},m(t,n){u(t,e,n)},i:t,o:t,d(t){t&&i(e)}}}function V(t){let n,e;return n=new K({}),{c(){S(n.$$.fragment)},m(t,o){T(n,t,o),e=!0},i(t){e||(N(n.$$.fragment,t),e=!0)},o(t){I(n.$$.fragment,t),e=!1},d(t){L(n,t)}}}function W(t){let n,e;return n=new J({}),{c(){S(n.$$.fragment)},m(t,o){T(n,t,o),e=!0},i(t){e||(N(n.$$.fragment,t),e=!0)},o(t){I(n.$$.fragment,t),e=!1},d(t){L(n,t)}}}function X(n){let e,o,r,c;const s=[W,V,Q],f=[];return e=function(t,n){return"/"===t[0]?0:"/login"===t[0]?1:2}(n),o=f[e]=s[e](n),{c(){o.c(),r=a()},m(t,n){f[e].m(t,n),u(t,r,n),c=!0},p:t,i(t){c||(N(o),c=!0)},o(t){I(o),c=!1},d(t){f[e].d(t),t&&i(r)}}}function Y(t){return[location.pathname]}return new class extends U{constructor(t){super(),P(this,t,Y,X,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map