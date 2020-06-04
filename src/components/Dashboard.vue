<template>
  <ion-page>
    <NavBar />
    <ion-content>
      <popover name="info">
        Suche nach Projekten und bewirb dich oder finde neue Bekanntschaften. 
      </popover>

      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card color="actoutsecondary" @click="openProjectSearch">
              <img src="../assets/Projekt-suchen.png"/>
            </ion-card>
          </ion-col>

          <ion-col>
            <ion-card color="actoutsecondary" @click="openUserSearch">
              <img src="../assets/Benutzer-suchen.png"/>
            </ion-card>
          </ion-col>

        </ion-row>
        <ion-row>

          <ion-col>
            <ion-card color="actoutsecondary" @click="openProjects">
              <img src="../assets/Deine-Projekte.png"/>
            </ion-card>
          </ion-col>

          <ion-col>
            <ion-card color="actoutsecondary" @click="openFriends">
              <img src="../assets/Connections.png"/>
            </ion-card>
          </ion-col>

        </ion-row>
        <ion-row style="align-items: center;justify-content: center;">

            <ion-text color="actoutsecondary">Was gibts neues?</ion-text>

        </ion-row>
        <ion-row style="align-items: center;justify-content: center;">
          <ion-item color="actouttertiary">
            <ion-input @input="update = $event.target.value"
            :value="update"
            name="update"
            type="text" />
          </ion-item>
        </ion-row>
        <ion-row style="align-items: center;justify-content: center;">

            <ion-button color="actoutblack" @click="manualUpdate">Update</ion-button>

        </ion-row>
      </ion-grid>

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
      currentuser: {"updates":["placeholder",1]},
      userIsLoggedIn: false,
      Friendsdata: [{"email":"Loading"}],
      profileImg: "../assets/noImage.png",
      update: "",
    }
  },
  computed: {
    updates: function(){
        return this.currentuser.updates
    }
  },
  beforeMount: function(){
    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.downloadUserImage();
  },
  mounted: function(){


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
    openUserSearch: function(){
    this.$router.push({ name: 'searchusers'});
  },
    openFriends: function(){
    this.$router.push({ name: 'friends'});
  },
    openProjects: function(){
    this.$router.push({ name: 'projects'});
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

  manualUpdate: function(){


    var now = new Date();

    this.currentuser.updates.push([this.update, now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + ":" + now.getMinutes()])


    fetch('/updateDB', {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      "Content-type" : "application/json"
    },
    method: 'POST',
    body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
  })

  this.update=""
  var data = JSON.stringify(this.currentuser);
  sessionStorage.setItem("User",data);


},
  removeUpdate: function(index){
      this.currentuser.updates.splice(index,1);
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

  },

  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ion-item{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

</style>
