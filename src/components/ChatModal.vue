

<template>
  <!-- Dynamic modal -->
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding ref="container">

      <div @click="scroll()">
        <ion-list>
          <div v-for="message in messages" :key="message" >
            <ion-row :style="setStyle(message[0])">
              <ion-item :color="setColor(message[0])" style="border-radius: 20px !important;
              padding-left: 10px;
              padding-right: 10px;
              padding-bottom: 5px;
              padding-top: 5px;">
              <ion-text> {{message[2]}} </ion-text>
              <ion-label position="stacked" color="actoutprimary" style="color:#49274A; justify-content: flex-end;" :style="setStyle(message[0])" >{{message[1]}}</ion-label>
            </ion-item>
          </ion-row>
        </div>
      </ion-list>
    </div>



  </ion-content>

  <ion-footer style="background-color:#49274A;">
    <ion-item ion-fixed color="actoutwhite" style="align-items: center;justify-content: center;">
      <ion-input
      @input="chatmessage = $event.target.value"
      :value="chatmessage"
      name="chatmessage"
      v-on:keyup.enter="writeMessage"
      type="text"/>
    </ion-item>
    <ion-row ion-fixed style="align-items: center;justify-content: center;background-color:#49274A;">
      <ion-button color="actoutprimary" @click="writeMessage">Senden</ion-button>
    </ion-row>

  </ion-footer>

</ion-page>
</template>

<script>

//Chat is programmed with a workaround. This needs to be turned into livechat function via Webhooks. Currently it works by requesting data from the server in regular intervalls

export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Add new Project' },
  },
  data() {
    return {
      currentuser: "", //active user
      friendsid: "", //ID of chat partner
      chatID: "", //ID of this chat
      messagesList: ["placeholder", "placholder", "placeholder"], //Array that holds all messages: [Sender, Message, Date/Time]
      chatmessage: "", //Chatbar content
      version: "", //Current Version of chat
      chatting: "", //gets turned into repeating function that updates every few seconds -> this is to fetch new messages from the DB
      scrolled: false //checks whether chat window has been scrolled.
    }
  },
  mounted: function() {

    //Set up
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.chatSetup();


    //automatically scroll to  bottom of chat window
    setTimeout(()=> {
      var element = this.$refs.container;
      element.scrollToBottom();
    },50)


    //update chat every few seconds.
    this.chatting = setInterval(() => {
      this.chat();
    }, 5000);


  },
  computed: {
    messages: function(){
      return this.messagesList //currently displayed messages
    }
  },
  methods: {
    //if window gets scrolled, set scrolled boolean to true
    scroll: function(){
      this.scrolled = true;
    },
    //close Modal and stop interval
    closeModal: function() {
      clearInterval(this.chatting);
      this.$ionic.modalController.dismiss();
    },
    //sets Item Style
    setColor: function(user){

      if(user==this.currentuser.vorname + " " + this.currentuser.nachname){

        return "actoutsecondary"
      }else{
        return "actouttertiary"
      }

    },
    //sets Item Style
    setStyle: function(user){

      if(user==this.currentuser.vorname + " " + this.currentuser.nachname){
        return "align-items: right;justify-content: flex-end;"
      }else{
        return "align-items: left;justify-content: flex-start;"
      }

    },
    //Send a new message, update DB
    writeMessage: function() {

      var now = new Date();

      //Only keep the last 20 messages
      if(this.messagesList.length >= 20){
        this.messagesList.splice(0,1);
      }

      this.messagesList.push([this.currentuser.vorname + " " + this.currentuser.nachname, now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + ":" + now.getMinutes(), this.chatmessage])

      //Increase Version number
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

      //clear chatbar
      this.chatmessage=""

    },

    //Regularly run function that updates the messagelist
    chat: function(){

      var payload = {
        "id": this.chatID,
        "version": this.version,
        "messages": this.messages
      }

      //get Data from DB
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
        //Only adjust list when data differs
        if(this.messagesList != data.messages){
          this.messagesList = data.messages
        }

        //Set ID and Version to the one fetched
        this.chatID = data.ChatID
        this.version = data.version

        //As long as chatwindow has not been scrolled, automatically scroll to bottom
        if(!this.scrolled){

          setTimeout(()=>{
            var element = this.$refs.container;
            element.scrollToBottom();
          },50)

        }


      })


    },
    //Run once, get initial messageslist or add chat to DB if it doesnt already exist
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


        //If User has no active chat with this friendid, add chat to active chats and update DB
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

        //If friend has no active chat with current user, add chat to friends active chats and update DB
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
    //Check whether JSON array contains a string
    JSONArrayContainsString: function(arr, string){

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
