

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
          <ion-button @click="closeModal">Schliessen</ion-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Projektname</ion-label>
          <ion-input required
          @input="project.name=$event.target.value"
          :value="project.name"
          name="name"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
        </ion-item>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Details</ion-label>
          <ion-textarea
          rows="15"
          @input="project.details=$event.target.value"
          :value="project.details"
          name="details"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-textarea>
        </ion-item>
        <ion-item color="actoutsecondary">
          <ion-label position="stacked" color="actoutblack" style="color:#49274A;">Bezahlt</ion-label>
          <ion-toggle required
          @ionChange="togglePaid"
          :value="project.paid"
          name="paid"
          placeholder=""
          checked=false>
        </ion-toggle>
      </ion-item>
      <ion-item color="actouttertiary" v-for="role in roles" :key="role">
        <ion-input
        @input="role[0]=$event.target.value"
        :value="role[0]"
        name="role">
      </ion-input><br/>
      <ion-button color="actoutblack" @click="removeRole(role)">Rolle entfernen</ion-button>
    </ion-item>
    <ion-button color="actouttertiary" @click="addRole">Rolle hinzufügen</ion-button>
  </ion-list>
  <ion-button color="actoutblack" @click="newproject"> Neues Projekt hinzufügen </ion-button><br/>
</ion-content>
</ion-page>
</template>

<script>


export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Add new Project' },
  },
  data() {
    return {
      project: {"roles": ["test",1]}, //project data to be sent to the server
      currentuser: "", //active user
    }
  },
  computed: {
    //Compute Roles to be displayed
    roles: function(){
      return this.project.roles
    }
  },
  mounted: function() {

    //Set up
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.project.paid = false;
    this.project.roles = [];
    this.project.roles.push(["Neue Rolle", "Nicht zugewiesen"]);
  },
  methods: {
    //close this modal
    closeModal: function() {
      this.$ionic.modalController.dismiss();
    },
    //Adds static properties to the project  and then adds it to the DB
    newproject: function() {
      this.project.creator = JSON.parse(sessionStorage.getItem("User")).email;
      this.project.id = "P"+Date.now().toString();
      this.project.members = [this.project.creator];
      this.project.pendingmembers = [];
      this.project.bannedmembers = [];
      this.project.updates = [];



      fetch('/newproject', {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: 'POST',
        body: JSON.stringify(this.project)
      }).then(response=>{

        response.json();
      }).then(data=>{
        console.log(data);
        this.currentuser.projects.push(this.project.id);


        fetch('/updateDB', {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type" : "application/json"
          },
          method: 'POST',
          body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
        })


        var dataupdate = JSON.stringify(this.currentuser);
        sessionStorage.setItem("User",dataupdate);

        this.closeModal();
      })






    },
    //sets project paid variable
    togglePaid: function(){

      if (this.project.paid == false){
        this.project.paid = true;
      }else if(this.project.paid == true){
        this.project.paid = false;
      }
    },
    //Add a new role to the project and the template
    addRole: function(){
      this.project.roles.push(["Neue Rolle", "Nicht zugewiesen"]);

    },
    //Remove role from project and template
    removeRole: function(role){

      for(var i=0; i<this.project.roles.length; i++){
        if(this.project.roles[i] == role){
          this.project.roles.splice(i,1);
          break
        }
      }

    },
  }
}
</script>
