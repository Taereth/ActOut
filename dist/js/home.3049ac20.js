(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"487a":function(o,t,n){"use strict";n.r(t);var e=function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("ion-page",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-title",{staticClass:"ion-text-center"},[o._v("ActOut")])],1)],1),n("ion-content",{attrs:{padding:""}},[n("ion-list",[n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Email")]),n("ion-input",{attrs:{required:"",value:o.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off"},on:{input:function(t){o.user.email=t.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Password")]),n("ion-input",{attrs:{required:"",value:o.user.password,name:"password",type:"password"},on:{input:function(t){o.user.password=t.target.value}}})],1)],1),n("ion-button",{on:{click:o.login}},[o._v(" LogIn ")]),n("br"),n("ion-button",{on:{click:function(t){return o.$router.push({name:"signup"})}}},[o._v(" Sign Up ")]),n("br"),n("ion-button",{on:{click:o.hash}},[o._v("Hash")]),n("ion-fab",{attrs:{slot:"fixed",vertical:"bottom",horizontal:"end"},slot:"fixed"},[n("ion-fab-button",{on:{click:o.test}},[n("ion-icon",{attrs:{name:"add"}})],1)],1)],1)],1)},i=[],s=(n("d3b7"),n("ff79")),a=n("e601"),r=n("279c");Object(a["a"])({"ios-add":s["a"].ios,"md-add":s["a"].md});var l={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{login:function(){var o=this;fetch("/checklogin",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(this.user)}).then((function(o){return o.json()})).then((function(t){r.compare(o.user.password,t.user.password,(function(n,e){n?console.log(n):e&&t.user.email==o.user.email&&null!=o.user.password&&null!=o.user.email?(o.$cookies.set("user",t.user),o.$router.push({name:"profiles",params:{id:t.user.id}})):console.log(t)}))}))},hash:function(){console.log("hash function");var o=this.user.password,t=10;r.hash(o,t,(function(o,t){o?console.log(o):r.compare("Ok",t,(function(o,t){o?console.error(o):console.log(t)}))}))}}},u=l,c=n("2877"),p=Object(c["a"])(u,e,i,!1,null,"779b7b9c",null);t["default"]=p.exports}}]);
//# sourceMappingURL=home.3049ac20.js.map