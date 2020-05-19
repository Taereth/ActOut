<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-list>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Alter</ion-label>
          <ion-input required
          @input="user.age=$event.target.value"
          :value="user.age"
          name="age"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Augenfarbe</ion-label>
          <ion-input required
          @input="user.augenfarbe=$event.target.value"
          :value="user.augenfarbe"
          name="augenfarbe"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Haarfarbe</ion-label>
          <ion-input required
          @input="user.haarfarbe=$event.target.value"
          :value="user.haarfarbe"
          name="haarfarbe"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Fahrzeugausweis</ion-label>
          <ion-select required
          @ionChange="user.fahrausweis=$event.target.value"
          :value="user.fahrausweis"
          placeholder="">
            <ion-select-option value="Ja">Ja</ion-select-option>
            <ion-select-option value="Nein">Nein</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Agentur</ion-label>
          <ion-input required
          @input="user.agentur=$event.target.value"
          :value="user.agentur"
          name="hobbies"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Webseite</ion-label>
          <ion-input required
          @input="user.website=$event.target.value"
          :value="user.website"
          name="website"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Link zum Showreel</ion-label>
          <ion-input required
          @input="user.showreel=$event.target.value"
          :value="user.showreel"
          name="hobbies"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Hobbies</ion-label>
          <ion-input required
          @input="user.hobbies=$event.target.value"
          :value="user.hobbies"
          name="hobbies"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Sprachen</ion-label>
          <ion-input required
          @input="user.sprachen=$event.target.value"
          :value="user.sprachen"
          name="sprachen"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Spezielle Fähigkeiten</ion-label>
          <ion-input required
          @input="user.specialskills=$event.target.value"
          :value="user.specialskills"
          name="specialskills"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
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
      currentuser: {},
      userIsLoggedIn: true,
      user: {}
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
    EditTabs
  },
  methods: {
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

    }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
