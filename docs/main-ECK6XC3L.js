import{$ as d,J as m,V as l,aa as f,ba as u,ca as h,da as g,ea as s,ha as M,ia as y,k as a,l as r,o as p,q as c,r as i}from"./chunk-KFIBRPIR.js";var N=[{path:"",loadChildren:()=>import("./chunk-D7QQIHYQ.js").then(t=>t.VuelosModule)},{path:"**",redirectTo:"/"}],j=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=r({imports:[s.forRoot(N),s]})}}return t})();var C=(()=>{class t{constructor(){this.title="SpaceAir"}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=c({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(o,R){o&1&&m(0,"router-outlet")},dependencies:[g]})}}return t})();var v=(()=>{class t{constructor(){this.http=p(d)}getTranslation(e){return this.http.get(`assets/i18n/${e}.json`)}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var b=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=r({providers:[y({config:{availableLangs:["en","es","fr","ca"," ru","zh","ja"],defaultLang:"ca",fallbackLang:"ca",reRenderOnLangChange:!0,prodMode:!l(),missingHandler:{logMissingKey:!0}},loader:v})],imports:[M]})}}return t})();var A=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t,bootstrap:[C]})}static{this.\u0275inj=r({imports:[h,j,f,b]})}}return t})();u().bootstrapModule(A).catch(t=>console.error(t));
