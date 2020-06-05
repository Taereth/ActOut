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
        Suche nach Projekten.
        Entwicklernotiz: Bis jetzt nur nach Name suchbar.
        Geplant ist, nach Suchkriterien filtern zu können.
      </popover>
      <ion-item color="actoutwhite">
        <ion-input @input="searchbar = $event.target.value"
        :value="searchbar"
        name="searchinput"
        type="text"/>
        <ion-button color="actoutblack" @click="search">Suchen</ion-button>
      </ion-item>
      <ion-list style="height:80vh; overflow-y:auto">
        <div v-for="(project,index) in activeProjects" :key="project.name">
          <ion-item :color="setColor(index)" v-if="checkemail!=project.creator">

            <ion-text color="actoutblack">{{project.name}}</ion-text>

            <ion-button color="actoutblack" @click="openProjectPage(project.id)">Projektseite besuchen</ion-button>
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
      currentuser: {}, //Active User
      myprojects: [], //all Projects
      checkemail: "", //The current users email to check against project creator email
      searchinput: "", //String to check against projects when pressing search button
      searchbar: "" //Searchbar Content
    }
  },
  computed: {
    activeProjects: function() {
      return this.myprojects.filter(this.isinSearch); //returns all projects that match search function
    }
  },
  beforeMount: function(){



    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.checkemail=this.currentuser.email;

    //get all project data
    this.allprojects();



  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods: {
    // returns true if project matches search function
    isinSearch: function(project){
      return project.name.includes(this.searchinput);
    },
    //defines item style
    setColor: function(index){
      if(index%2==0){
        return "actoutsecondary"
      }else {
        return "actouttertiary"
      }
    },
    //fetches all project data from the DB
    allprojects: function(){

      fetch('/allprojects', {
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
            if(data[i].creator != this.currentuser.email){
              this.myprojects.push(data[i]);
            }
          }

        })

      },
      //opens project page with corresponding ID
      openProjectPage: function(projectid){
        this.$router.push({ name: 'project', params: { id: projectid }});
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
