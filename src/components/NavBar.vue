<template>
  <!-- Navigation Tool, inserted in all pages after user is logged in-->

  <div>

    <ion-menu side="start" menu-id="first" content-id="main" id="firstmenu">
      <ion-header>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item color="actoutsecondary" @click="Home">Dashboard</ion-item>
          <ion-item color="actoutsecondary" @click="EditProfile">Profil bearbeiten</ion-item>
          <ion-item color="actoutsecondary" @click="Projects">Projekte verwalten</ion-item>
          <ion-item color="actoutsecondary" @click="Friends">Freunde</ion-item>
          <ion-item color="actoutsecondary" @click="Chats">Chats</ion-item>
          <ion-item color="actoutsecondary" @click="Updates">Updates verwalten</ion-item>
          <ion-item color="actoutsecondary" @click="Logout">Logout</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <div id="main">
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
          <ion-icon @click="openFirst" slot="icon-only" name="menu"/>
        </ion-buttons>
        <div class="titleicon">
          <img src="../assets/ActoutLogo.svg" width="60px" />
        </div>

        <!-- Helper Item, on click opens popover. Content is defined on respective sites-->
        <ion-item id="helpbox" style="--inner-padding-bottom: 0px;
        --inner-padding-end: 0px;
        --min-width: 0px;
        --min-height: 0px;
        --padding-top: 0px;
        --padding-bottom: 0px;
        --padding-start: 0px;
        width: fit-content;
        --padding-end: 0px;
        --background: transparent;
        height: fit-content;
        --color: transparent;" lines="none" color="transparent" v-popover:info.right>
        <img width="30px" src="../assets/help-circle-outline.svg"/>
      </ion-item>

      <ion-avatar style="padding:8px" @click="EditProfile" slot="end">
        <ion-img v-if="profileImg!='../assets/noImage.png'" decoding="sync" :src="profileImg"/>
      </ion-avatar>

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
      currentuser: "", //active User
      profileImg: "../assets/noImage.png", //active Users profile Image
    }
  },
  beforeMount: function(){
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));


    if(this.currentuser.profileImg){
      this.profileImg=this.currentuser.profileImg;
    }
    if(this.profileImg=="../assets/noImage.png"){
      this.downloadUserImage();
    }

  },
  methods: {
    //open hamburger Menu
    openFirst: function() {
      document.querySelector('ion-menu-controller').enable('first')
      document.querySelector('ion-menu-controller').open('first')
    },
    //Logout from this session
    Logout: function() {
      sessionStorage.setItem("User",null);
      this.$router.push({ name: 'home' });
    },
    //Open EditProfile Page
    EditProfile: function() {
      this.$router.push({ name: 'editProfile'});
    },
    //Open Friends page
    Friends: function() {
      this.$router.push({ name: 'friends', params: { id: this.currentuser.id }});
    },
    //Open Projects page
    Projects: function() {
      this.$router.push({ name: 'projects', params: { id: this.currentuser.id }});
    },
    //Open Chats page
    Chats: function() {
      this.$router.push({ name: 'chats' });
    },
    //Open Updates page
    Updates: function() {
      this.$router.push({ name: 'updates' });
    },
    //Open Dashboard page
    Home: function() {
      this.$router.push({ name: 'dashboard' });
    },
    //Download User Image from AWS
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
