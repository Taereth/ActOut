<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>


      <ion-list>
        <ion-item v-for="update in updates" :key="update">
          <ion-label>{{update[1]}}</ion-label>
          {{update[0]}}
        </ion-item>
      </ion-list>

      <ion-img :src="profileImg"/>
      <ion-button v-if="isFriend == false" @click="addFriend"> Follow </ion-button>
      <ion-button v-if="isFriend == true" @click="removeFriend"> Unfollow </ion-button>
      <ion-button @click="chat(profileData.id, profileData.vorname, profileData.nachname)">Chat</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue';
import Modal from '@/components/ChatModal.vue'


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
      profileData: {"updates":["placeholder",1]},
      profileImg: "",
      isFriend: false
    }
  },
  beforeMount: function(){
    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.getProfileData();
  },
  components: {
    NavBar
  },
  computed: {
    updates: function(){
      return this.profileData.updates
    }
  },
  methods: {
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
        this.checkFriendstatus();
        console.log(this.profileData);


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

    },
    addFriend: function(){
      this.currentuser.friends.push(this.profileData.email);

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
    })

    var data = JSON.stringify(this.currentuser);
    sessionStorage.setItem("User",data);
    this.isFriend = true;

    },
    removeFriend: function(){

      for(var j=0; j<this.currentuser.friends.length; j++){
        if(this.currentuser.friends[j] == this.profileData.email){
          this.currentuser.friends.splice(j,1);
        }
      }

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
    })

    var data = JSON.stringify(this.currentuser);
    sessionStorage.setItem("User",data);
    this.isFriend = false;

  },
  checkFriendstatus: function(){

    console.log(this.profileData.email);
    console.log(this.currentuser.email);

    var friends=JSON.stringify(this.currentuser.friends)
    if(friends.includes(JSON.stringify(this.profileData.email))){
      this.isFriend=true;
    }

  },
  chat: function(id, vorname, nachname){
    return this.$ionic.modalController
    .create({
      component: Modal,
      componentProps:{
        propsData: {
          title: vorname + " " + nachname
        },
        data: {
          friendsid: id
        }
      }
    })
    .then(m=>m.present())

  },
  JSONArrayContainsCurrentProfile: function(arr){
    //Check whether JSON array contains a string

    var string = this.profileData.email;



    for(var i=0; i<arr.length; i++){
      if(arr[i]==string){
        return true;
      }
    }

    return false;

  }
  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
