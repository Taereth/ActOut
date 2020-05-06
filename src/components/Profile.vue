<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      {{profileData.vorname}} haha
      <ion-img :src="profileImg"/>
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
      profileData: {},
      profileImg: ""
    }
  },
  mounted: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.getProfileData();



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
    this.$router.push({ name: 'profiles', params: { id: userid },
    beforeEnter: (to, from, next) => {
         /*
          todo check if to === from
          Warning!: location.reload()  completely destroy all vuejs stored states
          */
          window.location.reload()
          return next()
       }});
    this.$router.go();
  },
    getProfileData: function(){


      fetch("/getDBEntrybyId", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify( { "id" : this.$route.params.id } ),
      }).then(response=>{
        if(response.status==200){
        return response.json();}
        else{
          console.log("Access Denied.")
        }
      }).then((data)=>{

        this.profileData = data;
        this.downloadUserImage();
        this.$forceUpdate();


      })
    },
    downloadUserImage: function(){

      var data = {
        filename : this.profileData.imageName
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
        this.$forceUpdate;
      })

    }
  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
