<template>
  <!-- Dynamic project page -->
  <ion-page v-if="loaded">
    <NavBar/>

    <ion-content v-if="this.userisMember==false">
      <popover name="info" style="
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        border-bottom-left-radius:0px;
        border-bottom-right-radius:5px;
        left:0px;
        top:0px;
      ">
        Gefällt dir dieses Projekt? Dann bewirb dich!
        Swipe für mehr Inhalt.
      </popover>

      <div>


        <ion-slides pager="true" slidesPerView="1">

          <ion-slide v-if="updates[0] != null">
            <ion-list style="height: 70vh; overflow-y:auto;">
              <ion-item color="actoutwhite" v-for="(update,index) in updates" :key="update">
                <ion-label position="stacked">{{update[2]}} um {{update[1]}}</ion-label>
                <br/>
                <ion-text>{{update[0]}}</ion-text>
                <ion-button @click="removeUpdate(index)" v-if="userisMember==true">Update entfernen</ion-button>
              </ion-item>
            </ion-list>
          </ion-slide>

          <ion-slide>

            <ion-list>

              <ion-item color="actouttertiary">
                <ion-label position="stacked">{{this.thisproject.name}}</ion-label>
                <br/>
                <ion-text>{{thisproject.details}}</ion-text>
              </ion-item>

              <ion-item color="actoutsecondary">

                <ion-grid>
                  <div v-for="role in roles" :key="role">
                    <ion-row >
                      <ion-col color="actoutsecondary">
                        <ion-text>{{role[0]}}</ion-text>
                      </ion-col>
                      <ion-col color="actouttertiary">
                        <ion-text>{{role[1]}}</ion-text>
                      </ion-col>
                    </ion-row>
                  </div>
                </ion-grid>

              </ion-item>

            </ion-list>

          </ion-slide>

          <ion-slide>


            <ion-list>

              <ion-item color="actoutsecondary">
                <ion-label position="stacked">Bewerbung</ion-label>
                <br/>
                <ion-text color="actoutblack">Rolle:</ion-text>
                <ion-select required
                @ionChange="applicationrole = $event.target.value"
                :value=thisproject.roles[0][0]
                placeholder="">
                <ion-select-option v-for="role in roles" :key="role" :value="role[0]" >{{role[0]}}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item color="actoutsecondary">
              <div v-if="this.userisMember==false && this.userispendingMember==false && this.userisBanned == false"><ion-button color="actoutblack" @click="ApplyForProject">Für Projekt bewerben</ion-button></div>
              <ion-label v-if="this.userisBanned" > You have been banned from applying to this project.</ion-label>
              <div v-if="this.userispendingMember==true && this.userisMember==false"><ion-button color="actoutblack" @click="RetractFromProject">Projektbewerbung zurückziehen</ion-button></div>
            </ion-item>

          </ion-list>

        </ion-slide>


      </ion-slides>

      <ion-text color="actoutwhite">Swipe um mehr zu entdecken</ion-text>

    </div>

  </ion-content>
  <ion-content v-if="this.userisMember==true">
    <popover name="info" style="
      border-top-left-radius:0px;
      border-top-right-radius:0px;
      border-bottom-left-radius:0px;
      border-bottom-right-radius:5px;
      left:0px;
      top:0px;
    ">
      Verwalte dein Projekt, gibe Statusupdates und weise Rollen zu.
      Swipe für mehr Inhalt.
    </popover>

    <div v-if="this.userisMember==true">

      <ion-text color="actoutwhite">{{this.thisproject.name}}</ion-text>

      <ion-slides pager="true" slidesPerView="1">

        <ion-slide>
          <ion-list>
            <ion-item color="actouttertiary">
              <ion-title>{{this.thisproject.name}}</ion-title>
            </ion-item>
            <ion-item color="actoutsecondary">
              <ion-text>{{thisproject.details}}</ion-text>
            </ion-item>
          </ion-list>
        </ion-slide>

        <ion-slide>

          <ion-list style="height: 70vh; overflow-y:auto;">

            <ion-item color="actoutsecondary">
              <ion-label position="stacked">Update hinzufügen</ion-label>
              <ion-input @input="update = $event.target.value"
              :value="update"
              name="update"
              type="text"/>
              <ion-button color="actoutblack" @click="manualUpdate">Update</ion-button>

            </ion-item>


            <ion-item color="actoutwhite" v-for="(update,index) in updates" :key="update">
              <ion-label position="stacked">{{update[2]}} um {{update[1]}}</ion-label>
              <br/>
              <ion-text>{{update[0]}}</ion-text>
              <ion-button color="actoutblack" @click="removeUpdate(index)" v-if="userisMember==true">Update entfernen</ion-button>
            </ion-item>


          </ion-list>

          <br/>



        </ion-slide>

        <ion-slide>


          <ion-list>
            <ion-text position="stacked">Rollenzuweisung</ion-text>
            <ion-item color="actoutwhite" v-for="(role,index) in roles" :key="role">
              {{role[0]}}
              <ion-select required
              @ionChange="assignRole(index, role[0], $event.target.value)"
              :value="role[1]"
              placeholder="">
              <ion-select-option value="Not set" >Not set</ion-select-option>
              <ion-select-option v-for="member in members" :key="member" :value="member" >{{member}}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

      </ion-slide>

      <ion-slide>

        <ion-label position="stacked">Bewerbungen</ion-label> <br/>

        <ion-list>
          <ion-item v-if="this.thisproject.pendingmembers[0]==null" color="actoutsecondary">
            <ion-text>
              Keine Bewerbungen
            </ion-text>
          </ion-item>
          <ion-item color="actoutsecondary" v-for="pendingmember in this.thisproject.pendingmembers" :key="pendingmember">
            <ion-grid>
              <ion-row>
                <ion-button color="actoutblack" @click="openUserPage(pendingmember[0])">{{pendingmember[0]}}</ion-button>
                <br/>
                <ion-text> bewirbt sich für {{pendingmember[3]}}</ion-text>
              </ion-row>
              <br/>
              <ion-row>
                <ion-button color="actoutblack" v-if="JSONArrayContainsCurrentUser(pendingmember[1]) == false || JSONArrayContainsCurrentUser(pendingmember[2]) == true" @click="ApproveMember(pendingmember)">Approve Member</ion-button>
              </ion-row>
              <ion-row>
                <ion-button color="actoutblack" v-if="JSONArrayContainsCurrentUser(pendingmember[2]) == false || JSONArrayContainsCurrentUser(pendingmember[1]) == true" @click="DisapproveMember(pendingmember)">Disapprove Member</ion-button>
              </ion-row>
              <ion-row style="align-items: center;justify-content: center;">
                <ion-text>{{pendingmember[1].length}} Votes</ion-text>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>

      </ion-slide>


      <ion-slide>

        <ion-list>
          <ion-item color="actouttertiary">
            <ion-title>Mitglieder</ion-title>
          </ion-item>
          <ion-item color="actoutsecondary" v-for="member in this.thisproject.members" :key="member">
            <ion-button color="actoutblack" @click="openUserPage(member)">{{member}}</ion-button>
          </ion-item>

        </ion-list>

      </ion-slide>


    </ion-slides>

    <ion-text color="actoutwhite">Swipe um mehr zu entdecken</ion-text>


  </div>



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
      currentuser: {}, //active User
      thisproject: { //project data of this dynamic project page
        "roles":["test",1],
        "members":["placeholder"],
        "updates":["placeholder",1]
      },
      userisMember: false, //whether active Member is a member of this project
      userispendingMember: false, //Whether active Member is a pending member of this project
      userisBanned: false, //Whether user is banned from applying to this project
      update: "", //Member update input content
      applicationrole: "", //role that applying member wants to fulfill in the project
      loaded: false //checks whether everything is loaded -> needed for Ionic Slides
    }
  },
  computed: {
    roles: function(){
      return this.thisproject.roles //returns all roles of this project
    },
    members: function(){
      return this.thisproject.members //returns all members of this project
    },
    updates: function(){
      return this.thisproject.updates //returns all updates of this project
    }
  },
  beforeMount: function(){

    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
    this.getProject();

  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods:{
    //get this projects data
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

          this.thisproject=data;

          //check whether active user is a member
          this.checkUserMembership();
          //check whether active user is banned from applying to this project
          this.checkBannedUser();

          this.loaded = true

        })
      },
      // Check whether current user is a member or pending member of the project
      checkUserMembership: function(){


        var members=JSON.stringify(this.thisproject.members)
        var pendingmembers=JSON.stringify(this.thisproject.pendingmembers)
        if(members.includes(JSON.stringify(this.currentuser.email))){
          this.userisMember=true;
        }
        if(pendingmembers.includes(JSON.stringify(this.currentuser.email))){
          this.userispendingMember=true;
        }

      },
      // Check whether current user is banned from applying to this project
      checkBannedUser: function(){

        var bannedmembers=JSON.stringify(this.thisproject.bannedmembers)
        if(bannedmembers.includes(JSON.stringify(this.currentuser.email))){
          this.userisBanned=true;
        }

      },
      //Push active User into pending members of the project
      ApplyForProject: function(){

        this.thisproject.pendingmembers==this.thisproject.pendingmembers.push([this.currentuser.email, [], [], this.applicationrole]);
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
      //Upon Approval, add 1 Vote to the Pending Member. If Votes > half the amount of members in the project, add pending member to members
      //if statement is to stop multiple votes from the same user
      ApproveMember: function(pendingmember){

        if(this.JSONArrayContainsCurrentUser(pendingmember[1],this.currentuser.email) == false && this.JSONArrayContainsCurrentUser(pendingmember[2],this.currentuser.email) == false){
          for(var i=0; i<this.thisproject.pendingmembers.length; i++){
            if(this.thisproject.pendingmembers[i][0] == pendingmember[0]){
              this.thisproject.pendingmembers[i][1].push(this.currentuser.email);
              if(this.thisproject.pendingmembers[i][1].length>this.thisproject.members.length/2){
                this.thisproject.pendingmembers.splice(i,1);
                this.thisproject.members.push(pendingmember[0]);

                //If approved add projec to user
                this.addProjecttoUser(pendingmember[0]);
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

        }else if(this.JSONArrayContainsCurrentUser(pendingmember[1],this.currentuser.email) == false && this.JSONArrayContainsCurrentUser(pendingmember[2],this.currentuser.email) == true){
          for(var y=0; y<this.thisproject.pendingmembers.length; y++){
            if(this.thisproject.pendingmembers[y][0] == pendingmember[0]){

              //Take out Current User out of Disapproval list and put it in Approval list instead
              for(var j=0; j<this.thisproject.pendingmembers[y][2].length; j++){
                if(this.thisproject.pendingmembers[y][2][j] == this.currentuser.email){
                  this.thisproject.pendingmembers[y][2].splice(j,1);
                }
              }

              this.thisproject.pendingmembers[y][1].push(this.currentuser.email);
              if(this.thisproject.pendingmembers[y][1].length>this.thisproject.members.length/2){
                this.thisproject.pendingmembers.splice(y,1);
                this.thisproject.members.push(pendingmember[0]);
                //If approved add project to user
                this.addProjecttoUser(pendingmember[0]);
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




      },
      //Upon Approval, add 1 Vote to the Pending Member. If Votes > half the amount of members in the project, add pending member to members
      //if statement is to stop multiple votes from the same user
      DisapproveMember: function(pendingmember){


        if(this.JSONArrayContainsCurrentUser(pendingmember[2],this.currentuser.email) == false && this.JSONArrayContainsCurrentUser(pendingmember[1],this.currentuser.email) == false){
          for(var i=0; i<this.thisproject.pendingmembers.length; i++){
            if(this.thisproject.pendingmembers[i][0] == pendingmember[0]){
              this.thisproject.pendingmembers[i][2].push(this.currentuser.email);
              if(this.thisproject.pendingmembers[i][2].length>this.thisproject.members.length/2){
                this.thisproject.bannedmembers.push(pendingmember[0]);
                this.thisproject.pendingmembers.splice(i,1);
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



        }else if(this.JSONArrayContainsCurrentUser(pendingmember[2],this.currentuser.email) == false && this.JSONArrayContainsCurrentUser(pendingmember[1],this.currentuser.email) == true){
          for(var y=0; y<this.thisproject.pendingmembers.length; y++){
            if(this.thisproject.pendingmembers[y][0] == pendingmember[0]){

              //Take out Current User out of Approval list and put it in Disapproval list instead

              for(var j=0; j<this.thisproject.pendingmembers[y][1].length; j++){

                if(this.thisproject.pendingmembers[y][1][j] == this.currentuser.email){
                  this.thisproject.pendingmembers[y][1].splice(j,1);
                }
              }


              this.thisproject.pendingmembers[y][2].push(this.currentuser.email);
              if(this.thisproject.pendingmembers[y][2].length>this.thisproject.members.length/2){
                this.thisproject.bannedmembers.push(pendingmember[0]);
                this.thisproject.pendingmembers.splice(y,1);
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



      },
      //Removes active User from this projects pending members list
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
      //open User page of corresponding email
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
      //Check whether JSON array contains the active user
      JSONArrayContainsCurrentUser: function(arr){

        var string = this.currentuser.email;



        for(var i=0; i<arr.length; i++){
          if(arr[i]==string){
            return true;
          }
        }

        return false;

      },
      //adds project to users projects
      addProjecttoUser: function(useremail){
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

          data.projects.push(this.thisproject.id)



          fetch('/updateDB', {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-type" : "application/json"
            },
            method: 'POST',
            body: JSON.stringify({"id": data._id, "payload": data})
          })



        })
      },
      //assign Role to a member and adds automatic update to updates array, updates DB
      assignRole: function(index, rolename, member){

        this.thisproject.roles[index][1]=member;
        var now = new Date();

        this.thisproject.updates.push([member + " ist " + rolename + ".", now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + now.getMinutes(), this.currentuser.email])


        fetch('/updateDB', {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type" : "application/json"
          },
          method: 'POST',
          body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
        })


      },
      //remove Update from project update array
      removeUpdate: function(index){
        this.thisproject.updates.splice(index,1);
        fetch('/updateDB', {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type" : "application/json"
          },
          method: 'POST',
          body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
        })
      },
      //adds update bar content to project update array, updates DB and clears input
      manualUpdate: function(){


        var now = new Date();

        this.thisproject.updates.push([this.update, now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + ":" + now.getMinutes(), this.currentuser.email])


        fetch('/updateDB', {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type" : "application/json"
          },
          method: 'POST',
          body: JSON.stringify({"id": this.thisproject._id, "payload": this.thisproject})
        })

        this.update=""


      }
    }

  };




  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  ion-slide{
    display: block;
  }
  </style>
