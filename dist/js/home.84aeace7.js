(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"487a":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ion-page",[i("ion-header",[i("ion-toolbar",{attrs:{color:"actoutblack"}},[i("img",{attrs:{src:o("e411")}})])],1),i("ion-content",[i("ion-list",[i("ion-item",{attrs:{color:"actoutwhite"}},[i("ion-label",{staticStyle:{color:"#49274A"},attrs:{position:"stacked",color:"actoutblack"}},[t._v("Email")]),i("ion-input",{attrs:{required:"",value:t.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off",color:"actoutblack"},on:{input:function(e){t.user.email=e.target.value}}})],1),i("ion-item",{attrs:{color:"actoutwhite"}},[i("ion-label",{staticStyle:{color:"#49274A"},attrs:{position:"stacked",color:"actoutblack"}},[t._v("Password")]),i("ion-input",{attrs:{required:"",value:t.user.password,name:"password",type:"password",color:"actoutblack"},on:{input:function(e){t.user.password=e.target.value}}})],1),i("ion-item",{staticStyle:{"align-items":"center","justify-content":"center"},attrs:{color:"actoutsecondary"},on:{click:t.login}},[i("ion-text",{staticClass:"ion-text-center"},[t._v("LogIn")])],1),i("ion-item",{staticStyle:{"align-items":"center","justify-content":"center"},attrs:{color:"actouttertiary"},on:{click:function(e){return t.$router.push({name:"signup"})}}},[i("ion-text",{staticClass:"ion-text-center"},[t._v("SignUp")])],1)],1),0==t.isMobile?i("ion-text",{attrs:{color:"actoutwhite"}},[t._v("Developer Anmerkung: "),i("br"),t._v(" Diese Anwendung befindet sich in Entwicklung und ist zurzeit primär für Mobilebenutzer gedacht.")]):t._e()],1)],1)},n=[],a=(o("45fc"),o("d3b7"),o("ac1f"),o("466d"),o("ff79")),r=o("e601");Object(r["a"])({"ios-add":a["a"].ios,"md-add":a["a"].md});var s={name:"HomePage",props:{msg:String},data:function(){return{user:{},isMobile:!1}},beforeMount:function(){1==this.mobileCheck()&&(this.isMobile=!0)},methods:{login:function(){var t=this;fetch("/checklogin",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(this.user)}).then((function(t){if(200==t.status)return t.json();console.log("Access Denied.")})).then((function(e){e=JSON.stringify(e.user),sessionStorage.setItem("User",e),t.$router.push({name:"dashboard"})}))},mobileCheck:function(){var t=[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i];return t.some((function(t){return console.log(navigator.userAgent),navigator.userAgent.match(t)}))}}},c=s,l=o("2877"),u=Object(l["a"])(c,i,n,!1,null,"57707cd4",null);e["default"]=u.exports}}]);
//# sourceMappingURL=home.84aeace7.js.map