<template>
  <!-- Navigation Tool, inserted in Edit Area-->
  <ion-toolbar color="actoutblack">
    <ion-row>
      <ion-col>
        <ion-item @click="Personal" color="actoutsecondary">
          Persönliches
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item @click="Skills" color="actouttertiary">
          Du
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item @click="Previous" color="actoutsecondary">
          Erfahrungen
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item @click="Description" color="actouttertiary">
          Beschreibung
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-toolbar>


</template>
<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: "" //active User
    }
  },
  beforeMount: function(){
    this.currentuser = sessionStorage.getItem("User");

  },
  mounted: function(){

  },
  components: {

  },
  methods: {
    //Opens editProfile page
    Personal: function(){
      this.$router.push({ name: 'editProfile'});
    },
    //Opens Skills page
    Skills: function(){
      this.$router.push({ name: 'skills'});
    },
    //Opens Experiences page
    Previous: function(){
      this.$router.push({ name: 'previousexperiences'});
    },
    //Opens Description page
    Description: function(){
      this.$router.push({ name: 'description'});
    }

  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
