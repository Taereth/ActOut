

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
      project: {}
    }
  },
  methods: {
    closeModal: function() {
      this.$ionic.modalController.dismiss();
    },
    newproject: function() {
      this.project.creator = JSON.parse(sessionStorage.getItem("User")).email;
      this.project.id = "P"+Date.now().toString();
      this.project.members = [this.project.creator];
      this.project.pendingmembers = [];
      this.project.bannedmembers = [];

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

    }
  }
}
</script>
