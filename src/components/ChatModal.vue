

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="actoutblack">
        <ion-buttons slot="start">
            <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>

      <ion-list style="overflow-y:auto;" v-ref="chatwindow" ref="chatwindow">
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




    </ion-content>

    <ion-footer style="background-color:#49274A;">
      <ion-item ion-fixed color="actoutwhite" style="align-items: center;justify-content: center;">
      <ion-input
      @input="chatmessage = $event.target.value"
      :value="chatmessage"
      name="chatmessage"
      type="text"/>
      </ion-item>
      <ion-row ion-fixed style="align-items: center;justify-content: center;background-color:#49274A;">
        <ion-button color="actoutprimary" @click="writeMessage">Senden</ion-button>
      </ion-row>

    </ion-footer>

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
      chatting: "",
      scrolled: false
    }
  },
  mounted: function() {

    //Set up
    this.currentuser=JSON.parse(sessionStorage.getItem("User"));
    this.chatSetup();

    this.$nextTick(function() {

      var element = this.$refs.chatwindow;
      element.scrollTop = -element.scrollHeight;

    this.$refs.chatwindow.addEventListener("click", function(){
      this.scrolled = true;
      console.log("clicked");
    })

  })


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
    setColor: function(user){

      if(user==this.currentuser.vorname + " " + this.currentuser.nachname){
        console.log("yo");
        return "actoutsecondary"
      }else{
        return "actouttertiary"
      }

    },
    setStyle: function(user){

      if(user==this.currentuser.vorname + " " + this.currentuser.nachname){
        return "align-items: right;justify-content: flex-end;"
      }else{
        return "align-items: left;justify-content: flex-start;"
      }

    },
    writeMessage: function() {

      var now = new Date();

      if(this.messagesList.length >= 20){
        this.messagesList.splice(0,1);
      }

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

        if(!this.scrolled){

          this.$nextTick(function(){
            var element = this.$refs.chatwindow;

            console.log(element.scrollTop);
            console.log(element.scrollHeight);
            element.scrollTop = element.scrollHeight;
            console.log(element.scrollTop);         
          })
        }


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
