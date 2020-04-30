<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      This project: {{thisproject}} <br/>
      <div v-if="this.currentuser.email==this.thisproject.creator">Pending Members: <br/>

        <ion-list>
          <ion-item v-for="pendingmember in this.thisproject.pendingmembers" :key="pendingmember">
            {{pendingmember}}
            <br/>
            <ion-button @click="ApproveMember(pendingmember)">Approve Member</ion-button>
          </ion-item>
        </ion-list>
      </div>
      <br/>
      <div v-if="this.userisMember==false"><ion-button @click="ApplyForProject">Apply for Project</ion-button></div>
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
      userisMember: false
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
      var members=JSON.stringify(this.thisproject.members)
      if(members.includes(JSON.stringify(this.currentuser.email))){
        this.userisMember=true;
      }

    },
    ApplyForProject: function(){

      this.thisproject.pendingmembers==this.thisproject.pendingmembers.push(this.currentuser.email);

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
      this.thisproject.pendingmembers.pop(pendingmember);
      this.thisproject.members.push(pendingmember);
      fetch('/updateDB', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
    })
  },
  }

};




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
