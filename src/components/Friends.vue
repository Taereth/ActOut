<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      {{allusers}}
    </ion-content>
  </ion-page>
</template>
<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'

addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {},
      user: {},
      allusers: "empty users"
    }
  },
  beforeMount: function(){

    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.user=this.currentuser;

    //get all userdata
    this.getallusers();


  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods: {
    getallusers: function(){

      fetch('/allusers', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'GET'
    }).then(response=>
    {
      return response.json();
    }).then(data=>{
      console.log(data);
    })

    }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
