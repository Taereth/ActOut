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
        Suche nach Usern.
        Entwicklernotiz: Bis jetzt nur nach Namen suchbar.
        Geplant ist, nach Suchkriterien filtern zu können.
      </popover>
      <ion-item color="actoutwhite">
        <ion-input @input="searchbar = $event.target.value"
        :value="searchbar"
        name="searchinput"
        type="text"/>
        <ion-button color="actoutblack" @click="search">Suchen</ion-button>
      </ion-item>
      <ion-list style="height:80vh;overflow-y:auto">
        <div v-for="(user,index) in activeUsers" :key="user">
          <ion-item :color="setColor(index)">

            <ion-text color="actoutblack"> {{user.vorname}} {{user.nachname}} </ion-text>

            <ion-button color="actoutblack" @click="openUserPage(user.id)">Profil besuchen</ion-button>
          </ion-item>
        </div>
      </ion-list>
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
      currentuser: {}, //active User
      user: {},
      userList: [], //all Users
      searchinput: "", //String to check against projects when pressing search button
      searchbar: "" //searchbar content
    }
  },
  computed: {
    activeUsers: function() {
      return this.userList.filter(this.isinSearch); //returns all users that match search function
    }
  },
  beforeMount: function(){



    this.currentuser=JSON.parse(sessionStorage.getItem("User"));

    //get all user data
    this.allusers();



  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods: {
    //returns true if user matches search function
    isinSearch: function(user){
      return user.vorname.includes(this.searchinput) || user.nachname.includes(this.searchinput);
    },
    //defines item style
    setColor: function(index){
      if(index%2==0){
        return "actoutsecondary"
      }else {
        return "actouttertiary"
      }
    },
    //fetches all user data
    allusers: function(){

      fetch('/allusers', {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ "email" : this.currentuser.email })
      }).then(response=>
        {
          return response.json();
        }).then(data=>{




          for(var i = 0; i<data.length; i++){
            if(data[i].email != this.currentuser.email){
              this.userList.push(data[i]);
            }
          }


        })

      },
      //opens user page with corresponding id
      openUserPage: function(id){
        this.$router.push({ name: 'profiles', params: { id: id }});
      },
      //checks search -> computed data
      search: function(){

        this.searchinput = this.searchbar


      }
    }

  };



  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
