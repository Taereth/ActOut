(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"148d":function(t,o,e){},"487a":function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("ion-page",[e("ion-header",[e("ion-toolbar",{attrs:{color:"actoutprimary"}},[e("ion-title",{staticClass:"ion-text-center"},[t._v("ActOut")])],1)],1),e("ion-content",{attrs:{padding:""}},[e("ion-list",[e("ion-item",[e("ion-label",{staticStyle:{color:"#E13700"},attrs:{position:"stacked",color:"actoutprimary"}},[t._v("Email")]),e("ion-input",{attrs:{required:"",value:t.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off",color:"actoutblack"},on:{input:function(o){t.user.email=o.target.value}}})],1),e("ion-item",[e("ion-label",{staticStyle:{color:"#E13700"},attrs:{position:"stacked",color:"actoutprimary"}},[t._v("Password")]),e("ion-input",{attrs:{required:"",value:t.user.password,name:"password",type:"password",color:"actoutblack"},on:{input:function(o){t.user.password=o.target.value}}})],1)],1),e("ion-button",{attrs:{color:"actoutprimary"},on:{click:t.login}},[t._v(" LogIn ")]),e("br"),e("ion-button",{attrs:{color:"actoutsecondary"},on:{click:function(o){return t.$router.push({name:"signup"})}}},[t._v(" Sign Up ")]),e("br")],1)],1)},a=[],i=(e("d3b7"),e("ff79")),r=e("e601");Object(r["a"])({"ios-add":i["a"].ios,"md-add":i["a"].md});var s={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{login:function(){var t=this;fetch("/checklogin",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(this.user)}).then((function(t){if(200==t.status)return t.json();console.log("Access Denied.")})).then((function(o){o=JSON.stringify(o.user),sessionStorage.setItem("User",o),t.$router.push({name:"dashboard"})}))}}},c=s,u=(e("8d6e"),e("2877")),l=Object(u["a"])(c,n,a,!1,null,"3e3155f9",null);o["default"]=l.exports},"8d6e":function(t,o,e){"use strict";var n=e("148d"),a=e.n(n);a.a}}]);
//# sourceMappingURL=home.4489366c.js.map