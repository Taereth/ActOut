<template>
  <ion-page>
    <NavBar/>
    <ion-content padding>
      <ion-input @input="searchbar = $event.target.value"
      :value="searchbar"
      name="searchinput"
      type="text"/>
      <ion-button @click="search">Search</ion-button>
      <ion-list>
        <div v-for="user in activeUsers" :key="user">
            {{user.vorname}} {{user.nachname}}<ion-button @click="openUserPage(user.id)">Profil besuchen</ion-button>
      </div>
      </ion-list>
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
      user: {},
      userList: [],
      searchinput: "",
      searchbar: ""
    }
  },
  computed: {
    activeUsers: function() {
      return this.userList.filter(this.isinSearch);
    }
  },
  beforeMount: function(){



    this.currentuser=JSON.parse(sessionStorage.getItem("User"));

    //get all user data
    this.allusers();



  },
  mounted: function(){

  },
  components: {
    NavBar
  },
  methods: {
    isinSearch: function(user){
      return user.vorname.includes(this.searchinput) || user.nachname.includes(this.searchinput);
    },
    allusers: function(){

      fetch('/allusers', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type" : "application/json"
      },
      method: 'POST',
      body: JSON.stringify({ "email" : this.currentuser.email })
    }).then(response=>
    {
      return response.json();
    }).then(data=>{

      console.log(data);

      console.log("Email Comparison: " + data.email + this.currentuser.email)


      for(var i = 0; i<data.length; i++){
        if(data[i].email != this.currentuser.email){
          this.userList.push(data[i]);
        }
      }

      console.log(this.userList)

    })

  },
  openUserPage: function(id){
    this.$router.push({ name: 'profiles', params: { id: id }});
  },
  search: function(){

    this.searchinput = this.searchbar


  }
  }

};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
