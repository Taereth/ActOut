<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutprimary">
        <ion-title class="ion-text-center" >ActOut</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>

      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="actoutprimary" style="color:#E13700;">Email</ion-label>
          <ion-input required
          @input="user.email=$event.target.value"
          :value="user.email"
          name="email"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          color="actoutprimary"
          ></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="actoutprimary" style="color:#E13700;">Password</ion-label>
          <ion-input required
          @input="user.password = $event.target.value"
          :value="user.password"
          name="password"
          color="actoutprimary"
          type="password"></ion-input>
        </ion-item>
      </ion-list>
    <ion-button color="actoutprimary" @click="login"> LogIn </ion-button><br/>
    <ion-button color="actoutprimary" @click="$router.push({name: 'signup'})"> Sign Up </ion-button><br/>

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

ion-item{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

ion-label{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

item-label-stacked{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
  color:#E13700;
}



</style>
