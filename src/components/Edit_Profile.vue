<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      PROFILE EDIT of user {{currentuser.id}}
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
    this.currentuser=this.$cookies.get('user');
  },
  mounted: function(){

  },
  components: {
    NavBar,
    TestComponent
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
