"use strict";(self["webpackChunkvue3_data_pulse"]=self["webpackChunkvue3_data_pulse"]||[]).push([[700],{4049:function(e,t){t.A=(e,t)=>{const o=e.__vccOpts||e;for(const[a,n]of t)o[a]=n;return o}},5703:function(e,t,o){o.d(t,{M:function(){return s},y:function(){return u}});var a=o(3113),n=o(4421);const u="WEBAPP-CAT",s=()=>(window.addEventListener("beforeunload",(()=>{const e=(0,n.pick)(a.A.state,["userFavorites","user"]);localStorage.setItem(`${u}-DATA`,JSON.stringify(e))})),(0,n.throttle)((()=>{const e=localStorage.getItem(`${u}-DATA`);e&&a.A.commit("loadLocalData",JSON.parse(e))}),5e3)())},6700:function(e,t,o){o.r(t),o.d(t,{default:function(){return k}});var a=o(1806),n=o(5703),u=o(3113),s=o(2013),r=(o(9138),o(8447)),c=o(5414),l=o(9214);const i=["onClick"];var v={__name:"BottomBar",setup(e){const t=["icon-home-fill","icon-more-fill","icon-like-fill","icon-me"],o=(0,c.KR)(u.A.state.tabState),n={0:"/user/home",1:"/user/categories",2:"/user/favorites",3:"/user/profile"};function s(e){o.value=e,l.A.push(n[e])}return l.A.beforeEach(((e,t,a)=>{e.meta.saveTabState&&u.A.commit("setTabState",o.value);const n=+e.meta.tabState;n>=0&&(o.value=n),a()})),(e,n)=>((0,a.uX)(),(0,a.Wv)(a.PR,null,[(0,a.Lk)("nav",null,[((0,a.uX)(),(0,a.CE)(a.FK,null,(0,a.pI)(t,((e,t)=>(0,a.Lk)("i",{key:t,class:(0,r.C4)(`iconfont ${e} ${o.value===t?"active":""}`),onClick:e=>s(t)},null,10,i))),64))])],1024))}},f=o(4049);const m=(0,f.A)(v,[["__scopeId","data-v-4cc73e71"]]);var p=m,A={__name:"WebUser",setup(e){const t=(0,s.G)();return t.setCookie(`${n.y.toLocaleLowerCase()}-user`,u.A.state.user),(e,t)=>{const o=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.CE)("main",null,[(0,a.bF)(o,null,{default:(0,a.k6)((({Component:e})=>[((0,a.uX)(),(0,a.Wv)(a.PR,{include:["UserHome","UserCategories"]},[((0,a.uX)(),(0,a.Wv)((0,a.$y)(e)))],1024))])),_:1}),e.$route.meta.noBottomBar?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.Wv)(p,{key:0,class:"bottomNav"}))])}}};const d=A;var k=d}}]);
//# sourceMappingURL=700.92b56a0b.js.map