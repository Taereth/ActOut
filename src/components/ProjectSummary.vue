<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-list>
        <ion-item v-for="project in myprojects" :key="project"><ion-button @click="openProjectPage(project.id)">{{ project.name }}</ion-button></ion-item>
      </ion-list>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="openProjectModal">
        <ion-icon name="add" />
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
      myprojects: "No projects"
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
    NavBar
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
  openProjectModal: function(){
    return this.$ionic.modalController
    .create({
      component: Modal
    })
    .then(m=>m.present())

  },
  openProjectPage: function(projectid){
    this.$router.push({ name: 'project', params: { id: projectid }});
  }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
