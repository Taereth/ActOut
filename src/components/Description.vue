<template>
  <ion-page>
    <NavBar/>

    <ion-content padding>
      <popover name="info" style="
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        border-bottom-left-radius:0px;
        border-bottom-right-radius:5px;
        left:0px;
        top:0px;
      ">
        Beschreib dich hier völlig frei.
      </popover>
      <ion-row style="align-items: center;justify-content: center;">

        <ion-text color="actoutsecondary">Beschreibe dich hier.</ion-text>

      </ion-row>
      <ion-list>
        <ion-item color="actoutwhite">
          <ion-textarea
          rows="20"
          @input="user.description=$event.target.value"
          :value="user.description"></ion-textarea>
        </ion-item>
      </ion-list>
      <ion-row style="align-items: center;justify-content: center;">
        <ion-button color="actoutblack" @click="update"> Update </ion-button><br/>
      </ion-row>
    </ion-content>
    <ion-footer>
      <EditTabs/>
    </ion-footer>
  </ion-page>
</template>
<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'
import EditTabs from '@/components/EditTabs.vue'

addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {}, //active User
      user: {} //user data to be sent to the server
    }
  },
  beforeMount: function(){

    //get data of current profile
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.user=this.currentuser;
  },
  mounted: function(){

  },
  components: {
    NavBar,
    EditTabs //Tabs
  },
  methods: {
    //Update DB with user data, then navibate to editProfile page
    update: function(){
      fetch('/updateDB', {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: 'POST',
        body: JSON.stringify({"id": this.currentuser._id, "payload": this.user})
      })

      this.currentuser=this.user;
      sessionStorage.setItem("User",JSON.stringify(this.currentuser));
      this.$forceUpdate();
      this.$router.push({ name: 'editProfile' });

    }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
