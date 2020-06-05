<template>
  <ion-page>
    <NavBar/>

    <ion-content>
      <popover name="info" style="
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        border-bottom-left-radius:0px;
        border-bottom-right-radius:5px;
        left:0px;
        top:0px;
      ">
        Hier kannst du all deine Statusupdates verwalten.
        Achtung! Jedes Mitglied kann sehen was du schreibst.
      </popover>
      <ion-grid>
        <ion-row>


          <ion-list style="overflow-y:auto;">
            <ion-item color="actoutsecondary" v-for="(update,index) in updates" :key="update">
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-label color="actoutprimary">{{update[1]}}</ion-label>
                    <ion-text>{{update[0]}}</ion-text>
                  </ion-col>
                  <ion-col>
                    <ion-button color="actouttertiary" @click="removeUpdate(index)" >Update entfernen</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-list>

        </ion-row>
      </ion-grid>

    </ion-content>


    <ion-footer>
      <ion-toolbar style="background-color:#49274A;" color="actoutblack">
        <ion-item ion-fixed color="actoutwhite" style="align-items: center;justify-content: center;">
          <ion-input @input="update = $event.target.value"
          :value="update"
          name="update"
          type="text"/>
        </ion-item>
        <ion-row ion-fixed style="align-items: center;justify-content: center;background-color:#49274A;">
          <ion-button color="actoutprimary" @click="manualUpdate">Update</ion-button>
        </ion-row>
      </ion-toolbar>
    </ion-footer>

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
      currentuser: {"updates":["placeholder",1]}, //active User
      update: "" //Update bar input
    }
  },
  computed: {
    updates: function(){
      return this.currentuser.updates //returns active users update array
    }
  },
  beforeMount: function(){
    this.currentuser = JSON.parse(sessionStorage.getItem("User"));
  },
  mounted: function(){


  },
  components: {
    NavBar
  },

  methods: {
    //Pushed new update into active users update array and updates DB
    manualUpdate: function(){


      var now = new Date();

      this.currentuser.updates.push([this.update, now.getDate() + "." + now.getMonth() + "." + now.getFullYear().toString().slice(-2) + " um " + now.getHours() + ":" + now.getMinutes()])


      fetch('/updateDB', {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-type" : "application/json"
        },
        method: 'POST',
        body: JSON.stringify({"id": this.currentuser._id, "payload": this.currentuser})
      })

      this.update=""
      var data = JSON.stringify(this.currentuser);
      sessionStorage.setItem("User",data);


    },
    //Removes Update from update array and updates DB
    removeUpdate: function(index){
      this.currentuser.updates.splice(index,1);
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

  }

};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


ion-item{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

</style>
