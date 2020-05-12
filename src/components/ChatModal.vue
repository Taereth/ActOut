

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
        <ion-item v-for="message in messages" :key="message">
          <ion-label>{{message[0]}} um {{message[1]}}</ion-label>
          {{message[2]}}
        </ion-item>
      </ion-list>


      <ion-label>Nachricht schreiben</ion-label>
      <ion-input @input="chatmessage = $event.target.value"
      :value="chatmessage"
      name="chatmessage"
      type="text"/>
      <ion-button @click="writeMessage">Senden</ion-button>

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
      currentuser: "",
      friendsid: "",
      chatID: "",
      messagesList: ["placeholder", "placholder", "placeholder"],
      chatmessage: "",
      version: "",
      chatting: ""
    }
  },
  mounted: function() {

    //Set up
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.chatSetup();

    this.chatting = setInterval(() => {
        this.chat();
    }, 5000);


  },
  computed: {
    messages: function(){
      return this.messagesList
    }
  },
  methods: {
    closeModal: function() {
      clearInterval(this.chatting);
      this.$ionic.modalController.dismiss();
    },
    writeMessage: function() {

      var now = new Date();

      this.messagesList.push([this.currentuser.vorname + " " + this.currentuser.nachname, now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + ":" + now.getMinutes(), this.chatmessage])

      this.version++;

      var payload = {
        "id": this.chatID,
        "payload" : this.messagesList,
        "version": this.version
      }

      console.log(payload);

      fetch('/updateChatDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })

    this.chatmessage=""

    },
    chat: function(){

      console.log(this.chatID);
      console.log(this.version);

      var payload = {
        "id": this.chatID,
        "version": this.version,
        "messages": this.messages
      }

      fetch("/chat", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload),
      }).then(response=>{
        return response.json()
      }).then(data=>{

        console.log(data);
        this.messagesList = data.messages
        this.chatID = data.ChatID
        this.version = data.version
      })


    },
    chatSetup: function(){

      fetch("/chatSetup", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify( { "user1" : this.friendsid, "user2" : this.currentuser.id } ),
      }).then(response=>{
        return response.json()
      }).then(data=>{

        console.log(data);
        this.messagesList = data.messages
        this.chatID = data.ChatID
        this.version = data.version
      })


    },

  }
}
</script>
