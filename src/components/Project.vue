<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      {{thisproject}}
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
      userIsLoggedIn: false,
      thisproject: {}
    }
  },
  beforeMount: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.getProject();


  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods:{
    getProject: function(){
      fetch("/getDBEntry", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify( { "id" : this.$route.params.id } ),
      }).then(response=>{
        if(response.status==200){
        return response.json();}
        else{
          console.log("Access Denied.")
        }
      }).then((data)=>{

        this.thisproject=data;


      })
    }
  }

};




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
