<template>
  <ion-page>
    <NavBar />
    <ion-content>
      <popover name="info" style="
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        border-bottom-left-radius:0px;
        border-bottom-right-radius:5px;
        left:0px;
        top:0px;
      ">
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


addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {"updates":["placeholder",1]}, //Active user
      update: "", //update input content
    }
  },
  computed: {
    updates: function(){
      return this.currentuser.updates //returns this active users updates
    }
  },
  beforeMount: function(){
    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
  },
  components: {
    NavBar
  },

  methods: {
    //open User page of corresponding id
    openUserPage: function(userid){

      this.$router.push({ name: 'profiles', params: { id: userid }});
    },
    //open Projectsearch page
    openProjectSearch: function(){
      this.$router.push({ name: 'searchprojects'});
    },
    //open Usersearch page
    openUserSearch: function(){
      this.$router.push({ name: 'searchusers'});
    },
    //open Friends page
    openFriends: function(){
      this.$router.push({ name: 'friends'});
    },
    //open ProjectSummary page
    openProjects: function(){
      this.$router.push({ name: 'projects'});
    },

    //Adds update bar content to this users updates and adds date to it
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
