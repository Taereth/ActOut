<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">
        <ion-title class="ion-text-center" >ActOut</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-list>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Email</ion-label>
          <ion-input required
          @input="user.email=$event.target.value"
          :value="user.email"
          name="email"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          color="actoutblack"
          ></ion-input>
          </ion-item>
          <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Password</ion-label>
          <ion-input required
          @input="user.password = $event.target.value"
          :value="user.password"
          name="password"
          type="password"
          color="actoutblack"></ion-input>
        </ion-item>
        <ion-item style="align-items: center;justify-content: center;" color="actoutsecondary" @click="login">
          <ion-text class="ion-text-center" >LogIn</ion-text>
        </ion-item>
        <ion-item style="align-items: center;justify-content: center;" color="actouttertiary" @click="$router.push({name: 'signup'})">
          <ion-text class="ion-text-center" >SignUp</ion-text>
        </ion-item>
      </ion-list>

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

    //LogIn Function, sends request to server, server returns email and password from mongodb, then this function compares passwords
    //and if successful allows entry

    login: function(){
      fetch("/checklogin", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.user),
      }).then(response=>{
        if(response.status==200){
        return response.json();}
        else{
          console.log("Access Denied.")
        }
      }).then((data)=>{

        data = JSON.stringify(data.user);
        sessionStorage.setItem("User",data);
        this.$router.push({ name: 'dashboard' });


      })

    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
