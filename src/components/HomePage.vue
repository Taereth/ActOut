<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">

         <img src="../assets/ActoutLogo.svg" style="height: 50vh;" />

      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-list>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Email</ion-label>
          <ion-input required
          @input="user.email=$event.target.value.toLowerCase()"
          :value="user.email"
          name="email"
          type="email"
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
          v-on:keyup.enter="login"
          color="actoutblack"></ion-input>
        </ion-item>
        <ion-item style="align-items: center;justify-content: center;" color="actoutsecondary" @click="login">
          <ion-text class="ion-text-center" >LogIn</ion-text>
        </ion-item>
        <ion-item style="align-items: center;justify-content: center;" color="actoutsecondary" @click="forgottenpassword">
          <ion-text class="ion-text-center" >Passwort vergessen</ion-text>
        </ion-item>
        <ion-item style="align-items: center;justify-content: center;" color="actouttertiary" @click="signup">
          <ion-text class="ion-text-center" >SignUp</ion-text>
        </ion-item>
      </ion-list>

      <ion-text v-if="isMobile == false" color="actoutwhite">Developer Anmerkung: <br/> Diese Anwendung befindet sich in Entwicklung und ist zurzeit primär für Mobilebenutzer gedacht.</ion-text>

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
      user: {},
      isMobile: false
    }
  },
  beforeMount: function(){
    if(this.mobileCheck()==true){
      this.isMobile = true;
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

          throw new Error('Access Denied.');
        }
      }).then((data)=>{

        data = JSON.stringify(data.user);
        sessionStorage.setItem("User",data);
        this.$router.push({ name: 'dashboard' });

      }).catch(error=>{
        console.log(error.message);
        this.wrongpassword();
      })

    },
    forgottenpassword: function(){
      return this.$ionic.alertController
        .create({
          cssClass: 'alertDanger',
          header: 'Passwort vergessen',
          message: 'Diese Funktion ist noch nicht implementiert.',
          buttons: ['OK'],
        })
        .then(a => a.present())
    },
    wrongpassword: function(){
      return this.$ionic.alertController
        .create({
          cssClass: 'alertDanger',
          header: 'Falsches Passwort',
          message: 'Diese Emailadresse oder das Passwort sind inkorrekt.',
          buttons: ['OK'],
        })
        .then(a => a.present())
    },
    signup: function(){
      this.$router.push({name: 'signup'});
    },
    mobileCheck: function(){
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {

        console.log(navigator.userAgent);
        return navigator.userAgent.match(toMatchItem);
    });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
