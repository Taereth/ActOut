

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
            <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
          <ion-item>
          <ion-label position="stacked" color="primary">Projektname</ion-label>
          <ion-input required
          @input="project.name=$event.target.value"
          :value="project.name"
          name="name"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Details</ion-label>
          <ion-input required
          @input="project.details=$event.target.value"
          :value="project.details"
          name="details"
          type="text"
          spellcheck="false"
          autocapitalize="on"></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Paid</ion-label>
            <ion-toggle required
            @ionChange="togglePaid"
            :value="project.paid"
            name="paid"
            placeholder=""
            checked=false>
          </ion-toggle>
          </ion-item>
              <ion-item v-for="role in roles" :key="role">
                <ion-input
                @input="role[0]=$event.target.value"
                :value="role[0]"
                name="role">
              </ion-input><br/>
            <ion-button @click="removeRole(role)">Remove Role</ion-button>
               </ion-item>
            <ion-button @click="addRole">Add Role</ion-button>
      </ion-list>
      <ion-button @click="newproject"> Neues Projekt hinzufügen </ion-button><br/>
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
      project: {"roles": ["test",1]},
      currentuser: "",
    }
  },
  computed: {
    //Compute Roles to be displayed
    roles: function(){
      console.log(this.project.roles);
      return this.project.roles
    }
  },
  mounted: function() {

    //Set up
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.project.paid = false;
    this.project.roles = [];
    this.project.roles.push(["Creator", this.currentuser.email]);
    console.log(this.project.roles);
  },
  methods: {
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

      console.log(this.project);

      fetch('/newproject', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify(this.project)
    }).then(response=>{
      console.log(response);
      response.json();
    }).then(data=>{
      console.log(data);
    })
    this.currentuser.projects.push(this.project.id);

    console.log(this.currentuser);

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

  },
  //sets project paid variable
  togglePaid: function(){
    console.log(this.project.paid)
    if (this.project.paid == false){
      this.project.paid = true;
    }else if(this.project.paid == true){
      this.project.paid = false;
    }
  },
  //Add a new role to the project and the template
  addRole: function(){
    this.project.roles.push(["New Role", "Not set"]);
    console.log(this.project.roles);
  },
  //Remove role from project and template
  removeRole: function(role){

    for(var i=0; i<this.project.roles.length; i++){
      if(this.project.roles[i] == role){
        this.project.roles.splice(i,1);
        break
      }
    }

  }
  }
}
</script>
