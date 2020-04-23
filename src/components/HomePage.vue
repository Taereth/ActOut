<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center" >ActOut</ion-title>
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
    <ion-button @click="$router.push({name: 'signup'})"> Sign Up </ion-button><br/>
    <ion-button @click="hash">Hash</ion-button>

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

//Password hashing library
const bcrypt = require('bcryptjs');

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
        return response.json();
      }).then((data)=>{



        //Check Password hashing

        bcrypt.compare(this.user.password,data.user.password,(err,res)=>{
          if (err) {
            console.log(err)
            return
          }
          if(res && data.user.email==this.user.email && this.user.password != null && this.user.email != null){

            this.$cookies.set('user',data.user);
            this.$router.push({ name: 'profiles', params: { id: data.user.id }});
          }
          else{
            console.log(data);
          }
        })



      })

    },
    hash: function(){
      console.log("hash function");

      var pass = this.user.password;
      var rounds = 10;
      bcrypt.hash(pass, rounds, (err,hash)=>{
        if (err) {
          console.log(err);
          return
        }
        bcrypt.compare("Ok", hash, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(res) //true or false
  })
      })





    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
