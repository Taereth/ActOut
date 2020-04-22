<template>


  <div>

    <ion-menu side="start" menu-id="first" content-id="main" id="firstmenu">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <div id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon @click="openFirst" v-if="userIsLoggedIn" slot="icon-only" name="menu"/>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-back-button default-href="/">Logout</ion-back-button>
        </ion-buttons>
        <ion-title> Actout </ion-title>
      </ion-toolbar>
    </ion-header>
  </div>

    <ion-menu-controller></ion-menu-controller>
  </div>


</template>

<script>
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default{
  data: function(){
    return{
      cookie: "",
      userIsLoggedIn: false
    }
  },
  beforeMount: function(){
    //get cookie of currently logged in user
    this.cookie = this.$cookies.get('user');
    if(this.cookie!=null){
      this.userIsLoggedIn=true;
    }
  },
  methods: {
    openFirst: function() {
      console.log("click");
      console.log(this);
      document.querySelector('ion-menu-controller').enable('first')
      document.querySelector('ion-menu-controller').open('first')
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
