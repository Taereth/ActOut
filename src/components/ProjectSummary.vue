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
        Hier findest du alle Projekte zu denen du gehörst.
      </popover>
      <ion-list>
        <div v-for="(project,index) in myprojects" :key="project">
          <ion-item :color="setColor(index)" @click="openProjectPage(project.id)">
            <ion-text color="actoutblack">{{ project.name }}</ion-text>
            <ion-badge slot="end" color="danger" v-if="checkNewPendingMembers(project)">{{ project.pendingmembers.length }}</ion-badge>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button color="actoutblack" @click="openProjectModal">
        <img src="../assets/add.svg"/>
      </ion-fab-button>
    </ion-fab>



  </ion-page>
</template>
<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'
import Modal from '@/components/ProjectModal.vue'

addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {}, //active user
      user: {}, //user Data
      myprojects: "No projects", //all projects that active user is part of
    }
  },
  computed: {
    projectlist: function(){
      return this.myprojects; //lazily returns all projects that active user is part of
    }
  },
  beforeMount: function(){

    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.user=this.currentuser;

    //get all userdata
    this.userprojects();



  },
  mounted: function(){

  },
  components: {
    NavBar,
  },
  methods: {
    //gets all project IDs that active user is part of
    userprojects: function(){

      fetch('/userprojects', {
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

          this.myprojects = data;
        })

      },
      //defines item style
      setColor: function(index){
        if(index%2==0){
          return "actoutsecondary"
        }else {
          return "actouttertiary"
        }
      },
      //open modal to create a new project
      openProjectModal: async function(){

        var modal = await this.$ionic.modalController
        .create({
          component: Modal
        })

        await modal.present();

        await modal.onDidDismiss();

        await this.userprojects();



      },
      //open project page of corresponding id
      openProjectPage: function(projectid){
        this.$router.push({ name: 'project', params: { id: projectid }});
      },
      //check whether project has new pending members
      checkNewPendingMembers: function(project){

        if(project.pendingmembers != null){
          if(project.pendingmembers[0] != null){
            return true;
          }

        }

      }
    }

  };



  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
