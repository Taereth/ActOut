<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center" >ActOut REEEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>

      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="primary">Email</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Password</ion-label>
          <ion-input></ion-input>
        </ion-item>
      </ion-list>
    <ion-button @click="$router.push({ name: 'dashboard'})"> LogIn </ion-button><br/>
    <ion-button @click="$router.push({ name: 'register'})"> Sign Up </ion-button>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="test">
          <ion-icon name="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
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
  props: {
    msg: String
  },
  methods: {
      test: function(){
        console.log("here");
      fetch("/test", {
        method: "GET"
      }).then(response=>{
        console.log(response);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
