(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"487a":function(o,n,t){"use strict";t.r(n);var e=function(){var o=this,n=o.$createElement,t=o._self._c||n;return t("ion-page",[t("ion-header",[t("ion-toolbar",{attrs:{color:"primary"}},[t("ion-title",{staticClass:"ion-text-center"},[o._v("ActOut REEEE")])],1)],1),t("ion-content",{attrs:{padding:""}},[t("ion-list",[t("ion-item",[t("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Email")]),t("ion-input",{attrs:{required:"",value:o.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off"},on:{input:function(n){o.user.email=n.target.value}}})],1),t("ion-item",[t("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Password")]),t("ion-input",{attrs:{required:"",value:o.user.password,name:"password",type:"password"},on:{input:function(n){o.user.password=n.target.value}}})],1)],1),t("ion-button",{on:{click:o.login}},[o._v(" LogIn ")]),t("br"),t("ion-button",{on:{click:function(n){return o.$router.push({name:"signup"})}}},[o._v(" Sign Up ")]),t("br"),t("ion-button",{on:{click:o.hash}},[o._v("Hash")]),t("ion-fab",{attrs:{slot:"fixed",vertical:"bottom",horizontal:"end"},slot:"fixed"},[t("ion-fab-button",{on:{click:o.test}},[t("ion-icon",{attrs:{name:"add"}})],1)],1)],1)],1)},a=[],s=(t("d3b7"),t("ff79")),i=t("e601"),r=t("279c");Object(i["a"])({"ios-add":s["a"].ios,"md-add":s["a"].md});var l={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{login:function(){var o=this;fetch("/checklogin",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(this.user)}).then((function(o){return o.json()})).then((function(n){console.log(n.password),console.log(o.user.password),r.compare(o.user.password,n.password,(function(t,e){t?console.log(t):e&&n.email==o.user.email&&null!=o.user.password&&null!=o.user.email?o.$router.push({name:"dashboard"}):console.log(n)}))}))},hash:function(){console.log("hash function");var o=this.user.password,n=10;r.hash(o,n,(function(o,n){o?console.log(o):r.compare("Ok",n,(function(o,n){o?console.error(o):console.log(n)}))}))}}},c=l,u=t("2877"),p=Object(u["a"])(c,e,a,!1,null,"15326670",null);n["default"]=p.exports}}]);
//# sourceMappingURL=home.ed4557a4.js.map