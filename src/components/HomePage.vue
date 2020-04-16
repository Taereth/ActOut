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
          <ion-input required
          @input="user.email=$event.target.value"
          :value="user.email"
          name="email"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Password</ion-label>
          <ion-input required
          @input="user.password = $event.target.value"
          :value="user.password"
          name="password"
          type="password"></ion-input>
        </ion-item>
      </ion-list>
    <ion-button @click="login"> LogIn </ion-button><br/>
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
  data() {
    return {
      user: {}
    }
  },
  methods: {
      test: function(){
        console.log("here");
      fetch("/test", {
        method: "GET"
      }).then(response=>{
        return response.json();
      }).then((data)=>{
        console.log(data);
      })
    },
    login: function(){
      fetch("/checklogin", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.user),
      }).then(response=>{
        return response.json();
      }).then((data)=>{

        console.log(data.password);
        console.log(this.user.password);

        if(data.password==this.user.password && data.email==this.user.email && this.user.password != null && this.user.email != null){
          this.$router.push({ name: 'dashboard'});
        }
        else{
          console.log(data);
        }
      })

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
