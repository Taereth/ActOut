<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-list>
        <ion-item v-for="project in myprojects" :key="project">
          <ion-button v-if="checkemail!=project.creator" @click="openProjectPage(project.id)">{{ project.name }}</ion-button>
        </ion-item>
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
      myprojects: "No projects",
      newPendingMembers: false,
      checkemail: ""
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
      console.log(data);
      this.myprojects = data;
    })

  },
  openProjectPage: function(projectid){
    this.$router.push({ name: 'project', params: { id: projectid }});
  },
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
