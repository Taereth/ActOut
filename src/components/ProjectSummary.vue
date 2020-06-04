<template>
  <ion-page>
    <NavBar/>

    <ion-content padding>
      <popover name="info">
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
      currentuser: {},
      user: {},
      myprojects: "No projects",
      newPendingMembers: false
    }
  },
  computed: {
    projectlist: function(){
      return this.myprojects;
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
      console.log(data);
      this.myprojects = data;
    })

  },
  setColor: function(index){
    if(index%2==0){
      return "actoutsecondary"
    }else {
      return "actouttertiary"
    }
  },
  openProjectModal: async function(){

    var modal = await this.$ionic.modalController
    .create({
      component: Modal
    })

    await modal.present();

    await modal.onDidDismiss();

    await this.userprojects();



  },
  openProjectPage: function(projectid){
    this.$router.push({ name: 'project', params: { id: projectid }});
  },
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
