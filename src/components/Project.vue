<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      This project: {{thisproject}} <br/>
      <div v-if="this.userisMember==true">Pending Members: <br/>

        <ion-list>
          <ion-item v-for="pendingmember in this.thisproject.pendingmembers" :key="pendingmember">
            <ion-button @click="openUserPage(pendingmember[0])">{{pendingmember[0]}}</ion-button>
            <br/>
            <ion-button v-if="JSONArrayContainsString(pendingmember[1]) == false" @click="ApproveMember(pendingmember)">Approve Member</ion-button>
          </ion-item>
        </ion-list>
      </div>
      <br/>
      <div v-if="this.userisMember==false && this.userispendingMember==false"><ion-button @click="ApplyForProject">Für Projekt bewerben</ion-button></div>
      <div v-if="this.userispendingMember==true && this.userisMember==false"><ion-button @click="RetractFromProject">Projektbewerbung zurückziehen</ion-button></div>
    </ion-content>
  </ion-page>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import NavBar from '@/components/NavBar.vue'

addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  data: function(){
    return{
      currentuser: {},
      userIsLoggedIn: false,
      thisproject: {},
      userisMember: false,
      userispendingMember: false
    }
  },
  beforeMount: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));

    console.log(this.$route.params.id);

    this.getProject();





  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods:{
    getProject: function(){
      fetch("/getDBEntrybyID", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify( { "id" : this.$route.params.id } ),
      }).then(response=>{
        if(response.status==200){
        return response.json();}
        else{
          console.log("Access Denied.")
        }
      }).then((data)=>{

        console.log(this.thisproject)
        this.thisproject=data;

        this.checkUserMembership();


      })
    },
    checkUserMembership: function(){

      // Check whether current user is a member or pending member of the project

      var members=JSON.stringify(this.thisproject.members)
      var pendingmembers=JSON.stringify(this.thisproject.pendingmembers)
      if(members.includes(JSON.stringify(this.currentuser.email))){
        this.userisMember=true;
      }
      if(pendingmembers.includes(JSON.stringify(this.currentuser.email))){
        this.userispendingMember=true;
      }

    },
    ApplyForProject: function(){

      //Push Current User into pending members of the project

      this.thisproject.pendingmembers==this.thisproject.pendingmembers.push([this.currentuser.email, []]);
      this.userispendingMember=true;

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
    })
  },
  ApproveMember: function(pendingmember){

    //Upon Approval, add 1 Vote to the Pending Member. If Votes > half the amount of members in the project, add pending member to members
    //if statement is to stop multiple votes

    if(this.JSONArrayContainsString(pendingmember[1],this.currentuser.email) == false){
      for(var i=0; i<this.thisproject.pendingmembers.length; i++){
        if(this.thisproject.pendingmembers[i][0] == pendingmember[0]){
          this.thisproject.pendingmembers[i][1].push(this.currentuser.email);
          if(this.thisproject.pendingmembers[i][1].length>this.thisproject.members.length/2){
            this.thisproject.pendingmembers.splice(i,1);
            this.thisproject.members.push(pendingmember[0]);
          }


        }
      }

      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
    })

    }


    this.$router.go();

  },
  RetractFromProject: function(){


    for(var i=0; i<this.thisproject.pendingmembers.length; i++){
      if(this.thisproject.pendingmembers[i][0] == this.currentuser.email){
        this.thisproject.pendingmembers.splice(i,1);
        i--;
      }
    }
    this.userispendingMember=false;

    fetch('/updateDB', {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      "Content-type" : "application/json"
    },
    method: 'POST',
    body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
  })
  },
    openUserPage: function(useremail){

      fetch('/getUserEntrybyEmail', {
        headers: {
          'Accept' : 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
      method: 'POST',
      body: JSON.stringify({"email" : useremail})
    }).then(response=>{
      return response.json()
    }).then(data=>{
      this.$router.push({ name: 'profiles', params: { id: data.id }});
    })

  },
    JSONArrayContainsString: function(arr){
      //Check whether JSON array contains a string

      var string = this.currentuser.email;

      console.log(arr + " " + string);

      for(var i=0; i<arr.length; i++){
        if(arr[i]==string){
          return true;
        }
      }

      return false;

    }
  }

};




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
