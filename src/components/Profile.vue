<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      {{currentuser}} haha
    </ion-content>
    <TestComponent/>
  </ion-page>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'
import TestComponent from '@/components/TestComponent.vue'

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
      userIsLoggedIn: false
    }
  },
  beforeMount: function(){
    //get cookie of currently logged in user
    this.cookie = this.$cookies.get('user');
    if(this.cookie!=null){
      this.userIsLoggedIn=true;
    }
    //get data of current profile
    currentuser(this);
  },
  mounted: function(){

  },
  components: {
    NavBar,
    TestComponent
  }

};

function currentuser(self){

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

    self.currentuser = data;



  })



}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
