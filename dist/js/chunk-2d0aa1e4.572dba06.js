(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa1e4"],{"103b":function(e,i,t){"use strict";t.r(i),t.d(i,"ion_split_pane",(function(){return l}));var n=t("5e31"),s=(t("b948"),"split-pane-main"),o="split-pane-side",a={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",never:""},l=function(){function e(e){Object(n["l"])(this,e),this.visible=!1,this.disabled=!1,this.when=a["lg"],this.ionSplitPaneVisible=Object(n["d"])(this,"ionSplitPaneVisible",7)}return e.prototype.visibleChanged=function(e){var i={visible:e,isPane:this.isPane.bind(this)};this.ionSplitPaneVisible.emit(i)},e.prototype.connectedCallback=function(){this.styleChildren(),this.updateState()},e.prototype.disconnectedCallback=function(){this.rmL&&(this.rmL(),this.rmL=void 0)},e.prototype.componentWillLoad=function(){void 0===this.contentId&&console.warn('[DEPRECATED][ion-split-pane] Using the [main] attribute is deprecated, please use the "contentId" property instead:\nBEFORE:\n  <ion-split-pane>\n    ...\n    <div main>...</div>\n  </ion-split-pane>\n\nAFTER:\n  <ion-split-pane contentId="main-content">\n    ...\n    <div id="main-content">...</div>\n  </ion-split-pane>\n')},e.prototype.updateState=function(){var e=this;if(this.rmL&&(this.rmL(),this.rmL=void 0),this.disabled)this.visible=!1;else{var i=this.when;if("boolean"!==typeof i){var t=a[i]||i;if(0!==t.length){if(window.matchMedia){var n=function(i){e.visible=i.matches},s=window.matchMedia(t);s.addListener(n),this.rmL=function(){return s.removeListener(n)},this.visible=s.matches}}else this.visible=!1}else this.visible=i}},e.prototype.isPane=function(e){return!!this.visible&&(e.parentElement===this.el&&e.classList.contains(o))},e.prototype.styleChildren=function(){for(var e=this.contentId,i=this.el.children,t=this.el.childElementCount,n=!1,s=0;s<t;s++){var o=i[s],a=void 0!==e?o.id===e:o.hasAttribute("main");if(a){if(n)return void console.warn("split pane cannot have more than one main node");n=!0}r(o,a)}n||console.warn("split pane does not have a specified main node")},e.prototype.render=function(){var e,i=Object(n["e"])(this);return Object(n["i"])(n["a"],{class:(e={},e[i]=!0,e["split-pane-"+i]=!0,e["split-pane-visible"]=this.visible,e)})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(n["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{visible:["visibleChanged"],disabled:["updateState"],when:["updateState"]}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-split-pane{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}.split-pane-visible>.split-pane-main,.split-pane-visible>.split-pane-side{left:0;right:0;top:0;bottom:0;position:relative;-ms-flex:1;flex:1;-webkit-box-shadow:none!important;box-shadow:none!important;z-index:0}.split-pane-visible>.split-pane-side:not(ion-menu),.split-pane-visible>ion-menu.split-pane-side.menu-enabled{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}.split-pane-side:not(ion-menu){display:none}.split-pane-visible>.split-pane-side{-ms-flex-order:-1;order:-1}.split-pane-visible>.split-pane-side[side=end]{-ms-flex-order:1;order:1}.split-pane-ios{--border:0.55px solid var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-250,#c8c7cc)))}.split-pane-ios.split-pane-visible>.split-pane-side{min-width:270px;max-width:28%;border-right:var(--border);border-left:0}.split-pane-ios.split-pane-visible>.split-pane-side[side=end]{min-width:270px;max-width:28%;border-right:0;border-left:var(--border)}"},enumerable:!0,configurable:!0}),e}(),r=function(e,i){var t,n;i?(t=s,n=o):(t=o,n=s);var a=e.classList;a.add(t),a.remove(n)}}}]);
//# sourceMappingURL=chunk-2d0aa1e4.572dba06.js.map