(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["new-item"],{"0c7c":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-page",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-buttons",{attrs:{slot:"end"},slot:"end"},[n("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Logout")])],1),n("ion-title",[t._v("Dashboard")])],1)],1),n("ion-content",{attrs:{padding:""}},[t._v(" EMPTY ")])],1)},a=[],r=n("ff79"),i=n("e601");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var s={name:"HomePage",props:{msg:String}},u=s,l=n("2877"),c=Object(l["a"])(u,o,a,!1,null,"57fc7aaa",null);e["default"]=c.exports},"1feb":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-page",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Back")])],1),n("ion-title",[t._v("Register")])],1)],1),n("ion-content",{attrs:{padding:""}},[n("ion-list",[n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Email")]),n("ion-input",{attrs:{required:"",value:t.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off"},on:{input:function(e){t.user.email=e.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Password")]),n("ion-input",{attrs:{required:"",value:t.user.password,name:"password",type:"password"},on:{input:function(e){t.user.password=e.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Vorname")]),n("ion-input",{attrs:{required:"",value:t.user.vorname,name:"vorname",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.vorname=e.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Nachname")]),n("ion-input",{attrs:{required:"",value:t.user.nachname,name:"nachname",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.nachname=e.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Geschlecht")]),n("ion-select",{attrs:{required:"",value:t.user.gender,placeholder:""},on:{ionChange:function(e){t.user.gender=e.target.value}}},[n("ion-select-option",{attrs:{value:"m"}},[t._v("Männlich")]),n("ion-select-option",{attrs:{value:"f"}},[t._v("Weiblich")]),n("ion-select-option",{attrs:{value:"o"}},[t._v("Anderes")])],1)],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Wohnort")]),n("ion-input",{attrs:{required:"",value:t.user.wohnort,name:"wohnort",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.wohnort=e.target.value}}})],1),n("ion-item",[n("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Du bist ein/e")]),n("ion-select",{attrs:{required:"",multiple:"true","cancel-text":"Nah","ok-text":"Okay!",value:t.user.job},on:{ionChange:function(e){t.user.job=e.target.value}}},[n("ion-select-option",{attrs:{value:"actor"}},[t._v("Schauspieler/in")]),n("ion-select-option",{attrs:{value:"producer"}},[t._v("Produzent/in")]),n("ion-select-option",{attrs:{value:"crew"}},[t._v("Crewmitglied")])],1)],1)],1),n("ion-button",{on:{click:t.newuser}},[t._v(" Registrieren ")]),n("br")],1)],1)},a=[],r=(n("d3b7"),n("25f0"),n("ff79")),i=n("e601"),s=n("279c");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var u={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{newuser:function(){var t=this,e=this.user.password,n=10;this.user.id=Date.now().toString(),s.hash(e,n,(function(e,n){e?console.log(e):(t.user.password=n,fetch("/newuser",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(t.user)}))}))}}},l=u,c=n("2877"),p=Object(c["a"])(l,o,a,!1,null,"2a98cc46",null);e["default"]=p.exports},"25f0":function(t,e,n){"use strict";var o=n("6eeb"),a=n("825a"),r=n("d039"),i=n("ad6d"),s="toString",u=RegExp.prototype,l=u[s],c=r((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),p=l.name!=s;(c||p)&&o(RegExp.prototype,s,(function(){var t=a(this),e=String(t.source),n=t.flags,o=String(void 0===n&&t instanceof RegExp&&!("flags"in u)?i.call(t):n);return"/"+e+"/"+o}),{unsafe:!0})},"66aa":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-page",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-buttons",{attrs:{slot:"end"},slot:"end"},[n("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Logout")])],1),n("ion-title",[t._v("User "+t._s(t.$route.params.id))])],1)],1),n("ion-content",{attrs:{padding:""}},[t._v(" EMPTY "+t._s(t.currentusername)+" ")])],1)},a=[],r=(n("d3b7"),n("ff79")),i=n("e601");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var s={name:"HomePage",data:function(){return{cookie:"empty cookie",currentuser:{},currentusername:"ERROR"}},mounted:function(){var t=this;this.cookie=this.$cookies.get("user");var e=window.location.href;e=e.substr(e.length-13);var n={id:e};fetch("/currentuser",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(n)}).then((function(t){return t.json()})).then((function(e){console.log(e),t.currentuser=e,console.log(t.currentuser),t.currentusername=e.nachname,console.log(t.currentusername)}))}},u=s,l=n("2877"),c=Object(l["a"])(u,o,a,!1,null,"0033956e",null);e["default"]=c.exports},"97c4":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-page",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Back")])],1),n("ion-title",[t._v("New Item")])],1)],1),n("ion-content",{attrs:{padding:""}})],1)},a=[],r={name:"NewItemPage"},i=r,s=n("2877"),u=Object(s["a"])(i,o,a,!1,null,"99eb307c",null);e["default"]=u.exports},ad6d:function(t,e,n){"use strict";var o=n("825a");t.exports=function(){var t=o(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}}}]);
//# sourceMappingURL=new-item.d004add5.js.map