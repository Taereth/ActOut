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
        Beschreib hier deine Erfahrungen und Ausbildungen.
      </popover>
      <ion-list>

        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Ausbildung</ion-label>
          <ion-input required
          @input="ausbildunginput=$event.target.value"
          :value="ausbildunginput"
          name="ausbildung"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Zeitraum</ion-label>
          <ion-input required
          @input="ausbildungzeitraum=$event.target.value"
          :value="ausbildungzeitraum"
          name="ausbildungzeitraum"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-button @click="AddAusbildung" color="actoutblack"> Ausbildung hinzufügen </ion-button>
        </ion-item>

        <ion-list style="overflow-y:auto; height:30vh">
          <ion-item color="actoutsecondary" v-for="(ausbildung,index) in ausbildungsliste" :key="ausbildung">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-text>{{ausbildung[0]}} {{ausbildung[1]}}</ion-text>
                </ion-col>
                <ion-col>
                  <ion-button color="actouttertiary" @click="removeAusbildung(index)" >Ausbildung entfernen</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>


        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Theater</ion-label>
          <ion-input required
          @input="theaterinput=$event.target.value"
          :value="theaterinput"
          name="theater"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Zeitraum</ion-label>
          <ion-input required
          @input="theaterzeitraum=$event.target.value"
          :value="theaterzeitraum"
          name="theaterzeitraum"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Rolle</ion-label>
          <ion-input required
          @input="theaterrolle=$event.target.value"
          :value="theaterrolle"
          name="theaterrolle"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>

          <ion-button @click="AddTheater" color="actoutblack"> Theater hinzufügen </ion-button>
        </ion-item>

        <ion-list style="overflow-y:auto; height:30vh">
          <ion-item color="actoutsecondary" v-for="(theater,index) in theaterliste" :key="theater">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-text>{{theater[0]}}({{theater[1]}}) als {{theater[2]}}</ion-text>
                </ion-col>
                <ion-col>
                  <ion-button color="actouttertiary" @click="removeTheater(index)" >Theater entfernen</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>


        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Film</ion-label>
          <ion-input required
          @input="filminput=$event.target.value"
          :value="filminput"
          name="film"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Zeitraum</ion-label>
          <ion-input required
          @input="filmzeitraum=$event.target.value"
          :value="filmzeitraum"
          name="filmzeitraum"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Rolle</ion-label>
          <ion-input required
          @input="filmrolle=$event.target.value"
          :value="filmrolle"
          name="filmrolle"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>

          <ion-button @click="AddFilm" color="actoutblack"> Film hinzufügen </ion-button>
        </ion-item>

        <ion-list style="overflow-y:auto; height:30vh">
          <ion-item color="actoutsecondary" v-for="(film,index) in filmliste" :key="film">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-text>{{film[0]}}({{film[1]}}) als {{film[2]}}</ion-text>
                </ion-col>
                <ion-col>
                  <ion-button color="actouttertiary" @click="removeFilm(index)" >Film entfernen</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>

        <ion-item color="actoutwhite">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Anderes</ion-label>
          <ion-input required
          @input="anderesinput=$event.target.value"
          :value="anderesinput"
          name="anderes"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Zeitraum</ion-label>
          <ion-input required
          @input="andereszeitraum=$event.target.value"
          :value="andereszeitraum"
          name="andereszeitraum"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Rolle</ion-label>
          <ion-input required
          @input="anderesrolle=$event.target.value"
          :value="anderesrolle"
          name="anderesrolle"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          ></ion-input>

          <ion-button @click="AddAnderes" color="actoutblack"> Anderes hinzufügen </ion-button>
        </ion-item>

        <ion-list style="overflow-y:auto; height:30vh">
          <ion-item color="actoutsecondary" v-for="(anderes,index) in anderesliste" :key="anderes">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-text>{{anderes[0]}}({{anderes[1]}}) als {{anderes[2]}}</ion-text>
                </ion-col>
                <ion-col>
                  <ion-button color="actouttertiary" @click="removeAnderes(index)" >Anderes entfernen</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>

      </ion-list>
      <ion-row style="align-items: center;justify-content: center;">
        <ion-button color="actoutblack" @click="gotoNext"> Update </ion-button><br/>
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
      user: {"ausbildung":["",""],  //user Data to be sent to the DB
      "film":["",""],
      "anderes":["",""],
      "theater":["",""]
    },
    ausbildunginput: "", //name of new education
    ausbildungzeitraum: "", //period of new education
    filminput: "", //name of new film
    filmzeitraum: "", //period of new film
    filmrolle: "", //role in new film
    anderesinput: "", //name of new other thing
    andereszeitraum: "", //period of new other thing
    anderesrolle: "",//role in new other thing
    theaterinput: "",//name of new theater
    theaterzeitraum: "",//period of new theater
    theaterrolle: ""//role in new theater
  }
},
computed: {
  ausbildungsliste: function(){
    return this.user.ausbildung //returns active users education array
  },
  filmliste: function(){
    return this.user.film //returns active users film array
  },
  anderesliste: function(){
    return this.user.anderes //returns active users other thing array
  },
  theaterliste: function(){
    return this.user.theater //returns active users theater array
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
  //send all user data to the DB
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

  },
  //opens Description page
  gotoNext: function(){
    this.$router.push({ name: 'description' });
  },
  //adds new education to this users education array, updates DB and clears inputs
  AddAusbildung: function(){
    var newAusbildung = [this.ausbildunginput, this.ausbildungzeitraum];
    this.user.ausbildung.push(newAusbildung);
    this.ausbildunginput = "";
    this.ausbildungzeitraum = "";
    this.update();
  },
  //adds new film to this users education array, updates DB and clears inputs
  AddFilm: function(){
    var newFilm = [this.filminput, this.filmzeitraum, this.filmrolle];
    this.user.film.push(newFilm);
    this.filminput = "";
    this.filmzeitraum = "";
    this.filmrolle = "";
    this.update();
  },
  //adds new theater to this users education array, updates DB and clears inputs
  AddTheater: function(){
    var newTheater = [this.theaterinput, this.theaterzeitraum, this.theaterrolle];
    this.user.theater.push(newTheater);
    this.theaterinput = "";
    this.theaterzeitraum = "";
    this.theaterrolle = "";
    this.update();
  },
  //adds new other thing to this users education array, updates DB and clears inputs
  AddAnderes: function(){
    var newAnderes = [this.anderesinput, this.andereszeitraum, this.anderesrolle];
    this.user.anderes.push(newAnderes);
    this.anderesinput = "";
    this.andereszeitraum = "";
    this.anderesrolle = "";
    this.update();
  },

  //remove education from this users education array and updates DB
  removeAusbildung: function(index){

    this.user.ausbildung.splice(index,1);
    this.update();

  },
  //remove film from this users education array and updates DB
  removeFilm: function(index){

    this.user.film.splice(index,1);
    this.update();

  },
  //remove theater from this users education array and updates DB
  removeTheater: function(index){

    this.user.theater.splice(index,1);
    this.update();

  },
  //remove other thing from this users education array and updates DB
  removeAnderes: function(index){

    this.user.anderes.splice(index,1);
    this.update();

  }
}

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
