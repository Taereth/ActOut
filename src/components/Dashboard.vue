<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      {{currentuser.vorname}} haha
      <ion-img :src="profileImg"/>
      <br/>
      Friends:
      <ion-list>
        <ion-item v-for="friend in Friendsdata" :key="friend"> {{friend.vorname}} {{friend.nachname}} <br/> <ion-button @click="openUserPage(friend.id)">Visit Profile</ion-button></ion-item>
      </ion-list>
      <ion-button @click="openProjectSearch">Projekt suchen</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'
import Vue from 'vue'


addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {},
      userIsLoggedIn: false,
      Friendsdata: [{"email":"Loading"}],
      profileImg: ""
    }
  },
  mounted: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.downloadUserImage();

    for(var i = 0 ; i < this.currentuser.friends.length ; i++){
      console.log(this.currentuser.friends[i]);
      this.getUserData(this.currentuser.friends[i], i);
    }


  },
  components: {
    NavBar
  },

  methods: {
    getUserData: function(email, key){

      fetch("/getUserEntrybyEmail", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify( { "email" : email } ),
      }).then(response=>{
        if(response.status==200){
        return response.json();}
        else{
          console.log("Access Denied.")
        }
      }).then((data)=>{

        Vue.set(this.Friendsdata,key,data);
        console.log(this.Friendsdata);
        this.$forceUpdate();

      })

    },
    openUserPage: function(userid){
    console.log(userid)
    this.$router.push({ name: 'profiles', params: { id: userid }});
  },
    openProjectSearch: function(){
    this.$router.push({ name: 'searchprojects'});
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

  }

  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
