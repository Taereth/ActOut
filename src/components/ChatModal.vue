

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutprimary">
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

      <ion-item style="align-items: center;justify-content: center;">
      <ion-input
      @input="chatmessage = $event.target.value"
      :value="chatmessage"
      name="chatmessage"
      type="text"/>
      <ion-button color="actoutprimary" @click="writeMessage">Senden</ion-button>
      </ion-item>

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

        this.messagesList = data.messages
        this.chatID = data.ChatID
        this.version = data.version

        if(this.JSONArrayContainsString(this.currentuser.activeChats,this.friendsid) == false){
          this.currentuser.activeChats.push(this.friendsid);
          sessionStorage.setItem("User",this.currentuser);
          fetch("/updateDBbyID", {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-type" : "application/json"
            },
            method: "POST",
            body: JSON.stringify( { "payload" : this.currentuser} ),
          })

        }


        fetch("/getDBEntrybyID", {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type" : "application/json"
          },
          method: "POST",
          body: JSON.stringify( { "id" : this.friendsid } ),
        }).then(response=>{
          return response.json()
        }).then(data=>{



          if(this.JSONArrayContainsString(data.activeChats,this.currentuser.id) == false){
            data.activeChats.push(this.currentuser.id);
            fetch("/updateDBbyID", {
              headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-type" : "application/json"
              },
              method: "POST",
              body: JSON.stringify( { "payload" : data} ),
            })

          }




        })


      })


    },
    JSONArrayContainsString: function(arr, string){
      //Check whether JSON array contains a string




      for(var i=0; i<arr.length; i++){
        if(arr[i]==string){
          return true;
        }
      }

      return false;

    }

  }
}
</script>
