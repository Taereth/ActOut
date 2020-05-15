<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-list>
        <div v-for="(friend,index) in Friendsdata" :key="friend">
          <ion-item :color="setColor(index)">
            <ion-grid>
            <ion-row>
              <ion-text color="actoutblack"> {{friend.vorname}} {{friend.nachname}} </ion-text>
            </ion-row>
            <ion-row>
              <ion-button color="actoutblack" @click="openUserPage(friend.id)">Visit Profile</ion-button>
              <ion-button color="actoutblack" @click="chat(friend.id, friend.vorname, friend.nachname)">Chat</ion-button>
            </ion-row>
          </ion-grid>
          </ion-item>
        </div>
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
    setColor: function(index){
      if(index%2==0){
        return "actoutsecondary"
      }else {
        return "actouttertiary"
      }
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
