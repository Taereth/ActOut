<template>
  <ion-page>
    <NavBar/>

    <ion-content padding>
      <popover name="info">
        Durchforste {{profileData.vorname}}s Profil.
        Swipe für mehr Inhalt.
      </popover>

      <ion-grid>

      <ion-row>

        <ion-img :src="profileImg"/>


      </ion-row>
      <ion-row>
        <ion-col style="align-items: center;justify-content: center;">
          <ion-item>
            <ion-button color="actoutblack" v-if="isFriend == false" @click="addFriend"> Follow </ion-button>
            <ion-button color="actoutblack" v-if="isFriend == true" @click="removeFriend"> Unfollow </ion-button>
          </ion-item>
        </ion-col>
        <ion-col style="align-items: center;justify-content: center;">
          <ion-item>
            <ion-button color="actoutblack" @click="chat(profileData.id, profileData.vorname, profileData.nachname)">Chat</ion-button>
          </ion-item>
        </ion-col>
      </ion-row>

    </ion-grid>

  <ion-slides pager="true" :options="slideOpts" slidesPerView="1">
    <ion-slide>

      <ion-list>



        <ion-item style="align-items: center;justify-content: center;" color="actoutsecondary">
          <ion-text class="ion-text-center" color="actoutblack">{{profileData.vorname}} {{profileData.nachname}}</ion-text>
        </ion-item>

        <ion-item style="align-items: center;justify-content: center;" color="actouttertiary">
          <ion-text class="ion-text-center" color="actoutblack">{{profileData.job}}</ion-text>
        </ion-item>


        <ion-item style="align-items: center;justify-content: center;" color="actouttertiary">
          <ion-text class="ion-text-center" color="actoutblack">{{profileData.email}}</ion-text>
        </ion-item>



        <ion-item v-if="profileData.website!=''" style="align-items: center;justify-content: center;" color="actoutsecondary">
          <ion-text class="ion-text-center" color="actoutblack" >{{profileData.website}}</ion-text>
        </ion-item>



        <ion-item v-if="profileData.agentur!=''" style="align-items: center;justify-content: center;" color="actouttertiary">
          <ion-text class="ion-text-center" color="actoutblack">{{profileData.agentur}}</ion-text>
        </ion-item>


    </ion-list>

    </ion-slide>
    <ion-slide>
      <ion-list style="align-items: center;justify-content: center; height: 40vh; overflow-y:auto;">
        <ion-item style="align-items: center;justify-content: center;" color="actoutsecondary" v-for="update in updates" :key="update">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">{{update[1]}}</ion-label>
          <ion-text color="actoutblack">{{update[0]}}</ion-text>
        </ion-item>
      </ion-list>
    </ion-slide>
    <ion-slide>
      <ion-grid>
        <ion-row v-if="profileData.gender!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Geschlecht</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.gender}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.age!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Spielalter</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.age}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.groesse!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Grösse</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.groesse}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.augenfarbe!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Augenfarbe</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.augenfarbe}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.haarfarbe!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Haarfarbe</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.haarfarbe}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.sprachen!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Sprachen</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.sprachen}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.fahrausweis!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Fahrausweis</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.fahrausweis}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.specialskills!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Spezielle Fähigkeiten</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.specialskills}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="profileData.hobbies!=''">
          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Hobbies</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item color="actouttertiary" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack">{{profileData.hobbies}}</ion-text>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-slide>
    <ion-slide>

      <ion-grid>

        <ion-row>

          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Ausbildung</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-list>
            <ion-item color="actouttertiary" v-if="profileData.ausbildung[0]==null" >
              <ion-text> Keine Ausbildung </ion-text>
            </ion-item>
            <ion-item color="actouttertiary" v-for="ausbildung in profileData.ausbildung" :key="ausbildung" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack" >{{ausbildung[0]}} {{ausbildung[1]}}</ion-text>
            </ion-item>
            </ion-list>
          </ion-col>

        </ion-row>

        <ion-row>

          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Film</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-list>
              <ion-item color="actouttertiary" v-if="profileData.film[0]==null" >
                <ion-text> Keine Filmerfahrung </ion-text>
              </ion-item>
            <ion-item color="actouttertiary" v-for="film in profileData.film" :key="film" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack" >{{film[0]}}({{film[1]}}) als {{film[2]}}</ion-text>
            </ion-item>
          </ion-list>
          </ion-col>

        </ion-row>

        <ion-row>

          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Theater</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-list>
              <ion-item color="actouttertiary" v-if="profileData.theater[0]==null" >
                <ion-text> Keine Theatererfahrung </ion-text>
              </ion-item>
            <ion-item color="actouttertiary" v-for="theater in profileData.theater" :key="theater" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack" >{{theater[0]}}({{theater[1]}}) als {{theater[2]}}</ion-text>
            </ion-item>
          </ion-list>
          </ion-col>

        </ion-row>

        <ion-row>

          <ion-col>
            <ion-item color="actoutsecondary">
              <ion-text color="actoutblack">Anderes</ion-text>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-list>
              <ion-item color="actouttertiary" v-if="profileData.anderes[0]==null" >
                <ion-text> Keine andere Erfahrung </ion-text>
              </ion-item>
            <ion-item color="actouttertiary" v-for="anderes in profileData.anderes" :key="anderes" style="align-items: right;justify-content: flex-end;">
              <ion-text color="actoutblack" >{{anderes[0]}}({{anderes[1]}}) als {{anderes[2]}}\n</ion-text>
            </ion-item>
          </ion-list>
          </ion-col>

        </ion-row>

      </ion-grid>




    </ion-slide>
  </ion-slides>

  <ion-text color="actoutwhite">Swipe um mehr zu entdecken</ion-text>




    </ion-content>
  </ion-page>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue';
import Modal from '@/components/ChatModal.vue'


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
      profileData: {"updates":["placeholder",1],
                    "showreel":""},
      profileImg: "",
      isFriend: false
    }
  },
  beforeMount: function(){
    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.getProfileData();
  },
  components: {
    NavBar
  },
  computed: {
    updates: function(){
      return this.profileData.updates
    }
  },
  methods: {
    openUserPage: function(userid){
    console.log(userid)
    this.$router.push({ name: 'profiles', params: { id: userid },
    beforeEnter: (to, from, next) => {
         /*
          todo check if to === from
          Warning!: location.reload()  completely destroy all vuejs stored states
          */
          window.location.reload()
          return next()
       }});
    this.$router.go();
  },
    getProfileData: function(){


      fetch("/getDBEntrybyId", {
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

        this.profileData = data;
        this.downloadUserImage();
        this.checkFriendstatus();
        console.log(this.profileData);



      })
    },
    downloadUserImage: function(){

      var data = {
        filename : this.profileData.imageName
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
        var b64encoded = btoa(new Uint8Array(data.data).reduce(function (encoded, byte) {
      return encoded + String.fromCharCode(byte);
  }, ''));
        var datajpg = "data:image/jpg;base64," + b64encoded;
        this.profileImg = datajpg;
        this.$forceUpdate;
      })

    },
    addFriend: function(){
      this.currentuser.friends.push(this.profileData.email);

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
    })

    var data = JSON.stringify(this.currentuser);
    sessionStorage.setItem("User",data);
    this.isFriend = true;

    },
    removeFriend: function(){

      for(var j=0; j<this.currentuser.friends.length; j++){
        if(this.currentuser.friends[j] == this.profileData.email){
          this.currentuser.friends.splice(j,1);
        }
      }

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
    })

    var data = JSON.stringify(this.currentuser);
    sessionStorage.setItem("User",data);
    this.isFriend = false;

  },
  checkFriendstatus: function(){

    console.log(this.profileData.email);
    console.log(this.currentuser.email);

    var friends=JSON.stringify(this.currentuser.friends)
    if(friends.includes(JSON.stringify(this.profileData.email))){
      this.isFriend=true;
    }

  },
  chat: function(id, vorname, nachname){
    return this.$ionic.modalController
    .create({
      component: Modal,
      componentProps:{
        propsData: {
          title: vorname + " " + nachname
        },
        data: {
          friendsid: id
        }
      }
    })
    .then(m=>m.present())

  },
  JSONArrayContainsCurrentProfile: function(arr){
    //Check whether JSON array contains a string

    var string = this.profileData.email;



    for(var i=0; i<arr.length; i++){
      if(arr[i]==string){
        return true;
      }
    }

    return false;

  }
  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


ion-col{
  --ion-grid-column-padding:0px;
}

ion-slide{
  display: block;
}

</style>
