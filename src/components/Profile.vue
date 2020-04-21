<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="end">
          <ion-back-button default-href="/">Logout</ion-back-button>
        </ion-buttons>
        <ion-title>User {{ $route.params.id }}</ion-title>

      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      EMPTY
      {{currentusername}}
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
  data: function(){
    return{
      cookie: "empty cookie",
      currentuser: {},
      currentusername: "ERROR"
    }
  },
  mounted: function(){
    this.cookie = this.$cookies.get('user');

    var currentprofileID = window.location.href;
    currentprofileID = currentprofileID.substr(currentprofileID.length - 13);

    var reqbody = {
      "id": currentprofileID
    }

    fetch("/currentuser", {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify(reqbody),
    }).then(response=>{
      return response.json();
    }).then((data)=>{

      console.log(data);
      this.currentuser = data;
      console.log(this.currentuser);
      this.currentusername = data.nachname;
      console.log(this.currentusername);


    })

  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
