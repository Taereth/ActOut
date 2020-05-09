<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-input @input="searchbar = $event.target.value"
      :value="searchbar"
      name="searchinput"
      type="text"/>
      <ion-button @click="search">Search</ion-button>
      <ion-list>
        <div v-for="project in activeProjects" :key="project.name">
          <ion-item v-if="checkemail!=project.creator">
            {{project.name}}<ion-button @click="openProjectPage(project.id)">Projektseite besuchen</ion-button>
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
      currentuser: {},
      user: {},
      myprojects: [],
      newPendingMembers: false,
      checkemail: "",
      searchinput: "",
      searchbar: ""
    }
  },
  computed: {
    activeProjects: function() {
      return this.myprojects.filter(this.isinSearch);
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
    isinSearch: function(project){
      return project.name.includes(this.searchinput);
    },
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
        if(data.creator != this.currentuser.email){
          this.myprojects.push(data[i]);
        }
      }

    })

  },
  openProjectPage: function(projectid){
    this.$router.push({ name: 'project', params: { id: projectid }});
  },
  search: function(){

    this.searchinput = this.searchbar


  }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
