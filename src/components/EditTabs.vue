<template>



        <ion-toolbar color="actoutblack">
          <ion-row>
            <ion-col>
              <ion-item @click="Personal" color="actoutsecondary">
                Persönliches
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item @click="Skills" color="actouttertiary">
                Skills
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item @click="Previous" color="actoutsecondary">
                Erfahrungen
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
      currentuser: ""
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
    Personal: function(){
      console.log("hello");
      this.$router.push({ name: 'editProfile'});
    },
    Skills: function(){
      this.$router.push({ name: 'skills'});
    },
    Previous: function(){
      this.$router.push({ name: 'previousexperiences'});
    }

  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
