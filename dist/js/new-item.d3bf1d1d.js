(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["new-item"],{"0c7c":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ion-page",[a("ion-header",[a("ion-toolbar",{attrs:{color:"primary"}},[a("ion-buttons",{attrs:{slot:"end"},slot:"end"},[a("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Logout")])],1),a("ion-title",[t._v("Dashboard")])],1)],1),a("ion-content",{attrs:{padding:""}},[t._v(" EMPTY ")])],1)},n=[],r=a("ff79"),i=a("e601");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var s={name:"HomePage",props:{msg:String}},l=s,u=a("2877"),c=Object(u["a"])(l,o,n,!1,null,"57fc7aaa",null);e["default"]=c.exports},"1feb":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ion-page",[a("ion-header",[a("ion-toolbar",{attrs:{color:"primary"}},[a("ion-buttons",{attrs:{slot:"start"},slot:"start"},[a("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Back")])],1),a("ion-title",[t._v("Register")])],1)],1),a("ion-content",{attrs:{padding:""}},[a("ion-list",[a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Email")]),a("ion-input",{attrs:{required:"",value:t.user.email,name:"email",type:"text",spellcheck:"false",autocapitalize:"off"},on:{input:function(e){t.user.email=e.target.value}}})],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Password")]),a("ion-input",{attrs:{required:"",value:t.user.password,name:"password",type:"password"},on:{input:function(e){t.user.password=e.target.value}}})],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Vorname")]),a("ion-input",{attrs:{required:"",value:t.user.vorname,name:"vorname",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.vorname=e.target.value}}})],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Nachname")]),a("ion-input",{attrs:{required:"",value:t.user.nachname,name:"nachname",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.nachname=e.target.value}}})],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Geschlecht")]),a("ion-select",{attrs:{required:"",value:t.user.gender,placeholder:""},on:{ionChange:function(e){t.user.gender=e.target.value}}},[a("ion-select-option",{attrs:{value:"m"}},[t._v("Männlich")]),a("ion-select-option",{attrs:{value:"f"}},[t._v("Weiblich")]),a("ion-select-option",{attrs:{value:"o"}},[t._v("Anderes")])],1)],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Wohnort")]),a("ion-input",{attrs:{required:"",value:t.user.wohnort,name:"wohnort",type:"text",spellcheck:"false",autocapitalize:"on"},on:{input:function(e){t.user.wohnort=e.target.value}}})],1),a("ion-item",[a("ion-label",{attrs:{position:"stacked",color:"primary"}},[t._v("Du bist ein/e")]),a("ion-select",{attrs:{required:"",multiple:"true","cancel-text":"Nah","ok-text":"Okay!",value:t.user.job},on:{ionChange:function(e){t.user.job=e.target.value}}},[a("ion-select-option",{attrs:{value:"actor"}},[t._v("Schauspieler/in")]),a("ion-select-option",{attrs:{value:"producer"}},[t._v("Produzent/in")]),a("ion-select-option",{attrs:{value:"crew"}},[t._v("Crewmitglied")])],1)],1)],1),a("ion-button",{on:{click:t.newuser}},[t._v(" Registrieren ")]),a("br")],1)],1)},n=[],r=(a("d3b7"),a("ff79")),i=a("e601"),s=a("279c");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var l={name:"HomePage",props:{msg:String},data:function(){return{user:{}}},methods:{newuser:function(){var t=this,e=this.user.password,a=10;s.hash(e,a,(function(e,a){e?console.log(e):(t.user.password=a,fetch("/newuser",{headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},method:"POST",body:JSON.stringify(t.user)}))}))}}},u=l,c=a("2877"),p=Object(c["a"])(u,o,n,!1,null,"02b21a2b",null);e["default"]=p.exports},"66aa":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ion-page",[a("ion-header",[a("ion-toolbar",{attrs:{color:"primary"}},[a("ion-buttons",{attrs:{slot:"end"},slot:"end"},[a("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Logout")])],1),a("ion-title",[t._v("User "+t._s(t.$route.params.id))])],1)],1),a("ion-content",{attrs:{padding:""}},[t._v(" EMPTY ")])],1)},n=[],r=a("ff79"),i=a("e601");Object(i["a"])({"ios-add":r["a"].ios,"md-add":r["a"].md});var s={name:"HomePage",props:{msg:String}},l=s,u=a("2877"),c=Object(u["a"])(l,o,n,!1,null,"66677d2f",null);e["default"]=c.exports},"97c4":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ion-page",[a("ion-header",[a("ion-toolbar",{attrs:{color:"primary"}},[a("ion-buttons",{attrs:{slot:"start"},slot:"start"},[a("ion-back-button",{attrs:{"default-href":"/"}},[t._v("Back")])],1),a("ion-title",[t._v("New Item")])],1)],1),a("ion-content",{attrs:{padding:""}})],1)},n=[],r={name:"NewItemPage"},i=r,s=a("2877"),l=Object(s["a"])(i,o,n,!1,null,"99eb307c",null);e["default"]=l.exports}}]);
//# sourceMappingURL=new-item.d3bf1d1d.js.map