<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/">Back</ion-back-button>
        </ion-buttons>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="primary">Email</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Password</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Vorname</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Nachname</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Geschlecht</ion-label>
          <ion-select placeholder="">
            <ion-select-option value="f">Männlich</ion-select-option>
            <ion-select-option value="m">Weiblich</ion-select-option>
            <ion-select-option value="o">Anderes</ion-select-option>
          </ion-select>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Wohnort</ion-label>
          <ion-input></ion-input>
          </ion-item>
          <ion-item>
          <ion-label position="stacked" color="primary">Du bist ein/e</ion-label>
          <ion-select multiple="true" cancel-text="Nah" ok-text="Okay!">
           <ion-select-option value="actor">Schauspieler/in</ion-select-option>
           <ion-select-option value="producer">Produzent/in</ion-select-option>
           <ion-select-option value="crew">Crewmitglied</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button @click="$router.push({ name: 'home'})"> Registrieren </ion-button><br/>
    </ion-content>
  </ion-page>
</template>

<script>
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
