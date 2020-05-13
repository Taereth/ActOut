<template>


  <div>

    <ion-menu side="start" menu-id="first" content-id="main" id="firstmenu">
      <ion-header>
        <ion-toolbar color="actoutprimary">
          <ion-title @click="Home">Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item><ion-button color="actoutprimary" @click="Home">Dashboard</ion-button></ion-item>
          <ion-item><ion-button color="actoutprimary" @click="EditProfile">Profil bearbeiten</ion-button></ion-item>
          <ion-item><ion-button color="actoutprimary" @click="Projects">Projekte verwalten</ion-button></ion-item>
          <ion-item><ion-button color="actoutprimary" @click="Friends">Freunde</ion-button></ion-item>
          <ion-item><ion-button color="actoutprimary" @click="Chats">Chats</ion-button></ion-item>
          <ion-item><ion-button color="actoutprimary" @click="Logout">Logout</ion-button></ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <div id="main">
      <ion-toolbar color="actoutprimary">
        <ion-buttons slot="start">
          <ion-icon @click="openFirst" slot="icon-only" name="menu"/>
        </ion-buttons>
        <ion-avatar style="padding:8px" @click="EditProfile" slot="end">
          <ion-img decoding="sync" :src="profileImg"/>
        </ion-avatar>
        <ion-title class="ion-text-center"> Actout </ion-title>
      </ion-toolbar>
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
      currentuser: "",
      profileImg: "../assets/noImage.png",
    }
  },
  beforeMount: function(){
      this.currentuser=JSON.parse(sessionStorage.getItem("User"));
      this.downloadUserImage();
  },
  methods: {
    openFirst: function() {
      document.querySelector('ion-menu-controller').enable('first')
      document.querySelector('ion-menu-controller').open('first')
    },
    Logout: function() {
      sessionStorage.setItem("User",null);
      this.$router.push({ name: 'home' });
    },
    EditProfile: function() {
      this.$router.push({ name: 'editProfile', params: { id: this.currentuser.id }});
    },
    Friends: function() {
      this.$router.push({ name: 'friends', params: { id: this.currentuser.id }});
    },
    Projects: function() {
      this.$router.push({ name: 'projects', params: { id: this.currentuser.id }});
    },
    Chats: function() {
      this.$router.push({ name: 'chats' });
    },
    Home: function() {
      this.$router.push({ name: 'dashboard' });
    },
    downloadUserImage: function(){

      var data = {
        filename : this.currentuser.imageName
      }

      //Download File from AWS
      fetch("/filedownload", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      }).then(response=>{
        return response.json();
      }).then(data=>{

        //transform incoming buffer into Base64 String and make img source
        var b64encoded = btoa(new Uint8Array(data.data).reduce(function (encoded, byte) {
      return encoded + String.fromCharCode(byte);
    }, ''));
        var datajpg = "data:image/jpg;base64," + b64encoded;
        this.profileImg = datajpg;
      })

  },
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
