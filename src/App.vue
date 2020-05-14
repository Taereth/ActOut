<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
      <ion-menu-controller></ion-menu-controller>
      <ion-modal-controller></ion-modal-controller>
    </ion-app>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>

ion-content{
  --ion-background-color:#ffd68a;
}

ion-item{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

ion-label{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
}

item-label-stacked{
  --highlight-color-focused:#E13700;
  --highlight-background:#E13700;
  --color-activated:#E13700;
  color:#E13700;
}

</style>
