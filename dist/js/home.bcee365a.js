(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"487a":function(o,n,e){"use strict";e.r(n);var t=function(){var o=this,n=o.$createElement,e=o._self._c||n;return e("ion-page",[e("ion-header",[e("ion-toolbar",{attrs:{color:"primary"}},[e("ion-title",{staticClass:"ion-text-center"},[o._v("ActOut REEEE")])],1)],1),e("ion-content",{attrs:{padding:""}},[e("ion-list",[e("ion-item",[e("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Email")]),e("ion-input",{attrs:{required:"",value:o.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off"},on:{input:function(n){o.user.email=n.target.value}}})],1),e("ion-item",[e("ion-label",{attrs:{position:"stacked",color:"primary"}},[o._v("Password")]),e("ion-input",{attrs:{required:"",value:o.user.password,name:"password",type:"password"},on:{input:function(n){o.user.password=n.target.value}}})],1)],1),e("ion-button",{on:{click:o.login}},[o._v(" LogIn ")]),e("br"),e("ion-button",{on:{click:function(n){return o.$router.push({name:"signup"})}}},[o._v(" Sign Up ")]),e("br"),e("ion-button",{on:{click:o.hash}},[o._v("Hash")]),e("ion-fab",{attrs:{slot:"fixed",vertical:"bottom",horizontal:"end"},slot:"fixed"},[e("ion-fab-button",{on:{click:o.test}},[e("ion-icon",{attrs:{name:"add"}})],1)],1)],1)],1)},a=[],s=(e("d3b7"),e("ff79")),i=e("e601"),r=e("279c");Object(i["a"])({"ios-add":s["a"].ios,"md-add":s["a"].md});var l={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{login:function(){var o=this;fetch("/checklogin",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(this.user)}).then((function(o){return o.json()})).then((function(n){console.log(n.password),console.log(o.user.password),r.compare(o.user.password,n.password,(function(e,t){e?console.log(e):t&&n.email==o.user.email&&null!=o.user.password&&null!=o.user.email?(console.log(n.vorname),console.log(n.nachname),o.$router.push({name:"profiles",params:{id:n.vorname+"."+n.nachname}})):console.log(n)}))}))},hash:function(){console.log("hash function");var o=this.user.password,n=10;r.hash(o,n,(function(o,n){o?console.log(o):r.compare("Ok",n,(function(o,n){o?console.error(o):console.log(n)}))}))}}},c=l,u=e("2877"),p=Object(u["a"])(c,t,a,!1,null,"be1c4b62",null);n["default"]=p.exports}}]);
//# sourceMappingURL=home.bcee365a.js.map