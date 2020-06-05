<template>
  <!-- Dynamic user page'-->
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
        <ion-slide v-if="updates[0]!=null">
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
      currentuser: {}, //active user
      profileData: {"updates":["placeholder",1], //data of this dynamic user page
      "showreel":""},
      profileImg: "", //profile Image of this dynamic user page
      isFriend: false //whether active user is following this dynamic user page
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
      return this.profileData.updates //returns this dynamic user pages update array
    }
  },
  methods: {

    //fetch this dynamic user page data
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
          //download this dynamic user pages profile Image
          this.downloadUserImage();
          this.checkFriendstatus();




        })
      },
      //download this dynamic user page profile Image from AWS
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
      //add this dynamic user page to active users friends
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
      //remove this dynamic user page from active users friends
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
      //checks whether this active user is friends with this dynamic user page
      checkFriendstatus: function(){



        var friends=JSON.stringify(this.currentuser.friends)
        if(friends.includes(JSON.stringify(this.profileData.email))){
          this.isFriend=true;
        }

      },
      //opens chat modal between active user and this dynamic user page
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
