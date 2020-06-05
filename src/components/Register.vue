<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
          <ion-back-button default-href="/">Back</ion-back-button>
        </ion-buttons>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Email<ion-text v-if="emailcheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
          <ion-input required
          @input="user.email=$event.target.value.toLowerCase()"
          :value="user.email"
          name="email"
          type="email"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
        </ion-item>
        <ion-item color="actouttertiary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Password<ion-text v-if="passwordcheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
          <ion-input required
          @input="user.password = $event.target.value"
          :value="user.password"
          name="password"
          type="password"></ion-input>
        </ion-item>
        <ion-item color="actouttertiary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Password wiederholen<ion-text v-if="passworddoublecheck==true" slot="end" color="danger"> Achtung! </ion-text></ion-label>
          <ion-input required
          @input="secondpassword = $event.target.value"
          :value="secondpassword"
          name="secondpassword"
          type="password"></ion-input>
        </ion-item>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Vorname<ion-text v-if="vornamecheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
          <ion-input required
          @input="user.vorname=$event.target.value"
          :value="user.vorname"
          name="vorname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actouttertiary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Nachname<ion-text v-if="nachnamecheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
          <ion-input required
          @input="user.nachname=$event.target.value"
          :value="user.nachname"
          name="nachname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Geschlecht<ion-text v-if="gendercheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
          <ion-select required
          @ionChange="user.gender=$event.target.value"
          :value="user.gender"
          placeholder="">
          <ion-select-option value="Männlich">Männlich</ion-select-option>
          <ion-select-option value="Weiblich">Weiblich</ion-select-option>
          <ion-select-option value="Anderes">Anderes</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item color="actouttertiary">
        <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Wohnort<ion-text v-if="wohnortcheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
        <ion-input required
        @input="user.wohnort=$event.target.value"
        :value="user.wohnort"
        name="wohnort"
        type="text"
        spellcheck="false"
        autocapitalize="on"></ion-input>
      </ion-item>
      <ion-item color="actoutsecondary">
        <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Bezeichnung<ion-text v-if="jobcheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
        <ion-select required multiple="true" cancel-text="Zurück" ok-text="Okay"
        @ionChange="user.job=$event.target.value"
        :value="user.job" >
        <ion-select-option value="actor">Schauspieler/in</ion-select-option>
        <ion-select-option value="producer">Produzent/in</ion-select-option>
        <ion-select-option value="crew">Crewmitglied</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item color="actouttertiary">
      <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Profilbild<ion-text v-if="imagecheck==true" slot="end" color="danger"> fehlt.</ion-text></ion-label>
      <input
      type="file"
      id="imageupload"
      name="imageupload"
      accept="image/png, image/jpg"
      ref="fileinput"
      >
    </ion-item>
  </ion-list>


  <!-- Insert ReCaptcha here -->

  <ion-button color="actoutblack" @click="newuser"> Registrieren </ion-button><br/>

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
      user: {"email": null, //user data to create a new user
      "password:": null,
      "vorname": null,
      "nachname": null,
      "gender": null,
      "wohnort": null,
      "job": null},
      userimage: "", //image of new user
      emailcheck: false, //whether email field has been filled
      passwordcheck: false, //whether password field has been filled
      vornamecheck: false, //whether vorname field has been filled
      nachnamecheck: false, //whether nachname field has been filled
      wohnortcheck: false, //whether wohnort field has been filled
      gendercheck: false, //whether gender field has been filled
      imagecheck: false, //whether image field has been filled
      jobcheck: false, //whether jobs field has been filled
      passworddoublecheck: false, //whether password and second password are identical
      secondpassword: "" //password repetition input
    }
    ;
  },
  methods: {
    //check whether password and password repetition are identical
    checksecondPassword: function(){
      if(this.user.password != this.secondpassword){
        this.passworddoublecheck = true;
      }else{
        this.passworddoublecheck = false;
      }
    },
    //create a new user, add static information, update DB and navigate to Homepage
    //Also checks information, so that no two identical users exist, email field is actually an email and whether all checks have been passed
    newuser: function(){

      this.checksecondPassword();
      if(this.passworddoublecheck == true){
        this.presentAlert('Passwörter stimmen nicht überein.');
        return
      }

      //Assign user a unique id
      this.user.id = Date.now().toString();
      this.user.friends = [];
      this.user.projects = [];
      this.user.updates = [];
      this.user.activeChats = [];
      this.user.age = "";
      this.user.augenfarbe = "";
      this.user.haarfarbe = "";
      this.user.groesse = "";
      this.user.sprachen = "";
      this.user.fahrausweis = false;
      this.user.website = "";
      this.user.showreel = "";
      this.user.agentur = "";
      this.user.hobbies = "";
      this.user.specialskills = "";
      this.user.ausbildung = [];
      this.user.actoutprojects = [];
      this.user.theater = [];
      this.user.film = [];
      this.user.anderes = [];
      this.user.description = "";



      if(this.user.email == null || this.user.password == null || this.user.vorname == null || this.user.nachname == null || this.user.gender == null || this.user.wohnort == null || this.user.job == null || this.$refs.fileinput.files[0] === undefined){

        if(this.user.email == null){
          this.emailcheck = true;
        }
        if(this.user.password == null){
          this.passwordcheck = true;
        }
        if(this.user.vorname == null){
          this.vornamecheck = true;
        }
        if(this.user.nachname == null){
          this.nachnamecheck = true;
        }
        if(this.user.gender == null){
          this.gendercheck = true;
        }
        if(this.user.wohnort == null){
          this.wohnortcheck = true;
        }
        if(this.user.job == null){
          this.jobcheck = true;
        }
        if(this.$refs.fileinput.files[0] === undefined){
          this.imagecheck = true;
        }

        this.presentAlert('Bitte fülle die fehlenden Felder aus.');


      }else{

        if(this.validateEmail(this.user.email) == true){

          fetch("/getUserEntrybyEmail", {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-type" : "application/json"
            },
            method: "POST",
            body: JSON.stringify( { "email" : this.user.email } ),
          }).then(response=>{
            return response.json();
          }).then(data=>{

            if(data == '{"status":"No Id Found"}'){

              let data = new FormData();
              data.append("file", this.$refs.fileinput.files[0]);
              fetch("/fileupload", {
                method: "POST",
                body: data
              }).then(response=>{

                return response.json();
              }).then(data=>{

                this.user.imageName = data.ImgName;

                fetch('/newuser', {
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Content-type" : "application/json"
                  },
                  method: 'POST',
                  body: JSON.stringify(this.user)
                })


              })

              this.$router.push({name:'home'})

            }
            else{

              this.presentAlert('Diese Emailadresse wird schon benutzt.');

            }

          })


        }else{
          this.presentAlert('Bitte benutze eine gültige Emailadresse.');
        }




      }








    },
    //Upload Image File to AWS
    uploadUserImage: function(){

      let data = new FormData();
      data.append("file", this.$refs.fileinput.files[0]);
      fetch("/fileupload", {
        method: "POST",
        body: data
      }).then(response=>{

        return response.json();
      }).then(data=>{

        this.user.imageName = data.ImgName;
      })

    },

    //Used to present an alert with a message-> used to alert user to fill form out correctly
    presentAlert: function(displaymessage){
      return this.$ionic.alertController
      .create({
        cssClass: 'alertDanger',
        header: 'Fehler',
        message: displaymessage,
        buttons: ['OK'],
      })
      .then(a => a.present())
    },
    //checks whether email matches email format
    validateEmail: function(inputText){



      var mailformat = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if(mailformat.test(inputText)==true)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

alertDanger{
  background-color: white;
  color: red;
  button{
    color: red;
  }
}


</style>
