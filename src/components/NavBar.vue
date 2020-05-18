<template>


  <div>

    <ion-menu side="start" menu-id="first" content-id="main" id="firstmenu">
      <ion-header>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item color="actouttertiary" @click="Home">Dashboard</ion-item>
          <ion-item color="actoutsecondary" @click="EditProfile">Profil bearbeiten</ion-item>
          <ion-item color="actouttertiary" @click="Projects">Projekte verwalten</ion-item>
          <ion-item color="actoutsecondary" @click="Friends">Freunde</ion-item>
          <ion-item color="actouttertiary" @click="Chats">Chats</ion-item>
          <ion-item color="actoutsecondary" @click="Updates">Updates verwalten</ion-item>
          <ion-item color="actouttertiary" @click="Logout">Logout</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <div id="main">
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
          <ion-icon @click="openFirst" slot="icon-only" name="menu"/>
        </ion-buttons>
        <ion-avatar  style="padding:8px" @click="EditProfile" slot="end">
          <ion-img v-if="profileImg!='../assets/noImage.png'" decoding="sync" :src="profileImg"/>
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

      console.log()

      if(this.currentuser.profileImg){
        this.profileImg=this.currentuser.profileImg;
      }
      if(this.profileImg=="../assets/noImage.png"){
        this.downloadUserImage();
      }

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
    Updates: function() {
      this.$router.push({ name: 'updates' });
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
        this.currentuser.profileImg = datajpg;
        sessionStorage.setItem("User",JSON.stringify(this.currentuser))
      })

  },
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
