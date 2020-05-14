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

.ion-color-actoutprimary {
  --ion-color-base: var(--ion-color-primary, #E13700) !important;
  --ion-color-base-rgb: var(--ion-color-primary-rgb, 225,55,0) !important;
  --ion-color-contrast: var(--ion-color-primary-contrast, #ffffff) !important;
  --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-primary-shade, #c63000) !important;
  --ion-color-tint: var(--ion-color-primary-tint, #e44b1a) !important;
}

.ion-color-actoutblack {
  --ion-color-base: var(--ion-color-primary, #000103) !important;
  --ion-color-base-rgb: var(--ion-color-primary-rgb, 0,1,3) !important;
  --ion-color-contrast: var(--ion-color-primary-contrast, #ffffff) !important;
  --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;
  --ion-color-shade: var(--ion-color-primary-shade, #000103) !important;
  --ion-color-tint: var(--ion-color-primary-tint, #1a1a1c) !important;
}

.ion-color-actoutsecondary {
  --ion-color-base: var(--ion-color-primary, #F7CB15) !important;
  --ion-color-base-rgb: var(--ion-color-primary-rgb, 247,203,21) !important;
  --ion-color-contrast: var(--ion-color-primary-contrast, #000000) !important;
  --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 0,0,0) !important;
  --ion-color-shade: var(--ion-color-primary-shade, #d9b312) !important;
  --ion-color-tint: var(--ion-color-primary-tint, #f8d02c) !important;
}

</style>
