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
        Editier hier dein Profil.
      </popover>
      <ion-list>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" >Vorname</ion-label>
          <ion-input required
          @input="user.vorname=$event.target.value"
          :value="user.vorname"
          name="vorname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" >Nachname</ion-label>
          <ion-input required
          @input="user.nachname=$event.target.value"
          :value="user.nachname"
          name="nachname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" >Geschlecht</ion-label>
          <ion-select required
          @ionChange="user.gender=$event.target.value"
          :value="user.gender"
          placeholder="">
          <ion-select-option value="m">Männlich</ion-select-option>
          <ion-select-option value="f">Weiblich</ion-select-option>
          <ion-select-option value="o">Anderes</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item color="actoutwhite">
        <ion-label position="stacked" color="actoutblack" >Wohnort</ion-label>
        <ion-input required
        @input="user.wohnort=$event.target.value"
        :value="user.wohnort"
        name="wohnort"
        type="text"
        spellcheck="false"
        autocapitalize="on"></ion-input>
      </ion-item>
      <ion-item color="actoutwhite">
        <ion-label position="stacked" color="actoutprimary" >Du bist ein/e</ion-label>
        <ion-select required multiple="true" cancel-text="Nah" ok-text="Okay!"
        @ionChange="user.job=$event.target.value"
        :value="user.job" >
        <ion-select-option value="actor">Schauspieler/in</ion-select-option>
        <ion-select-option value="producer">Produzent/in</ion-select-option>
        <ion-select-option value="crew">Crewmitglied</ion-select-option>
      </ion-select>
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
  components: {
    NavBar,
    EditTabs //Tabs
  },
  methods: {
    //Update DB with user data then navibate to Skills page
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
      this.$router.push({ name: 'skills' });

    }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
