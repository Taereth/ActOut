<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/">Back</ion-back-button>
        </ion-buttons>
        <ion-title>Register</ion-title>
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
          <ion-item>
          <ion-label position="stacked" color="primary">Vorname</ion-label>
          <ion-input required
          @input="user.vorname=$event.target.value"
          :value="user.vorname"
          name="vorname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Nachname</ion-label>
          <ion-input required
          @input="user.nachname=$event.target.value"
          :value="user.nachname"
          name="nachname"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Geschlecht</ion-label>
          <ion-select required
          @ionChange="user.gender=$event.target.value"
          :value="user.gender"
          placeholder="">
            <ion-select-option value="m">Männlich</ion-select-option>
            <ion-select-option value="f">Weiblich</ion-select-option>
            <ion-select-option value="o">Anderes</ion-select-option>
          </ion-select>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Wohnort</ion-label>
          <ion-input required
          @input="user.wohnort=$event.target.value"
          :value="user.wohnort"
          name="wohnort"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Du bist ein/e</ion-label>
          <ion-select required multiple="true" cancel-text="Nah" ok-text="Okay!"
          @ionChange="user.job=$event.target.value"
          :value="user.job" >
           <ion-select-option value="actor">Schauspieler/in</ion-select-option>
           <ion-select-option value="producer">Produzent/in</ion-select-option>
           <ion-select-option value="crew">Crewmitglied</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked" color="primary">Profilbild</ion-label>
          <input
        type="file"
        id="imageupload"
        name="imageupload"
        accept="image/png, image/jpg"
        ref="fileinput"
        >
        </ion-item>
      </ion-list>
      <ion-button @click="newuser"> Registrieren </ion-button><br/>
      <ion-button @click="uploadUserImage">Image</ion-button>
      <ion-button @click="downloadUserImage">Image</ion-button>
      <ion-img :src="testimg"/>
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
      user: {},
      userimage: "",
      testimg: ""
    }
    ;
  },
  methods: {
    newuser: function(){
      //Assign user a unique id
      this.user.id = Date.now().toString();
      this.user.friends = [];
      this.user.projects = [];

      //Upload Image to AWS, then save Imagename in User and update MongoDB with the new user

      let data = new FormData();
        data.append("file", this.$refs.fileinput.files[0]);
        fetch("/fileupload", {
          method: "POST",
          body: data
        }).then(response=>{
          console.log(response);
          return response.json();
        }).then(data=>{
          console.log(data);
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






  },
  checkimage: function(){
    console.log(this.userimage);
  },
  //Upload File to AWS
  uploadUserImage: function(){

    let data = new FormData();
      data.append("file", this.$refs.fileinput.files[0]);
      fetch("/fileupload", {
        method: "POST",
        body: data
      }).then(response=>{
        console.log(response);
        return response.json();
      }).then(data=>{
        console.log(data);
        this.user.imageName = data.ImgName;
      })

  },
  downloadUserImage: function(){

    var data = {
      filename : this.user.imageName
    }

    //Download File from AWS
    fetch("/filedownload", {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then(response=>{
      return response.json();
    }).then(data=>{

      //transform incoming buffer into Base64 String and make img source
      console.log(data.data);
      var b64encoded = btoa(new Uint8Array(data.data).reduce(function (encoded, byte) {
    return encoded + String.fromCharCode(byte);
}, ''));
      var datajpg = "data:image/jpg;base64," + b64encoded;
      this.testimg = datajpg;
      this.$forceUpdate;
    })

  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
