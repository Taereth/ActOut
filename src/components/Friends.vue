<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>

      Friends:
      <ion-list>
        <ion-item v-for="friend in Friendsdata" :key="friend"> {{friend.vorname}} {{friend.nachname}} <br/>
          <ion-button @click="openUserPage(friend.id)">Visit Profile</ion-button>
          <ion-button @click="chat(friend.id, friend.vorname, friend.nachname)">Chat</ion-button>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>
<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'
import Vue from 'vue'
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
      Friendsdata: [],
    }
  },
  mounted: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));

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

    }


  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
