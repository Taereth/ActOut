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

/* Styles to be used, ion-colors to be used*/

.titleicon {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    text-align:center;
}



ion-item{
  --highlight-color-focused:#49274A;
  --highlight-background:#49274A;
  --color-activated:#49274A;
}

ion-label{
  --highlight-color-focused:#49274A;
  --highlight-background:#49274A;
  --color-activated:#49274A;
  color:#49274A;
}

item-label-stacked{
  --highlight-color-focused:#49274A;
  --highlight-background:#49274A;
  --color-activated:#49274A;
  color:#49274A;
}


ion-content{
  background: rgb(148,97,142);
  background: linear-gradient(0deg, rgba(148,97,142,1) 0%, rgba(223,178,218,1) 100%);
  --ion-background-color: linear-gradient(0deg, rgba(148,97,142,1) 0%, rgba(223,178,218,1) 100%);
}

:root {
  --ion-color-actoutprimary: linear-gradient(0deg, rgba(148,97,142,1) 0%, rgba(223,178,218,1) 100%);
  --ion-color-actoutprimary-rgb: 148,97,142;
  --ion-color-actoutprimary-contrast: #ffffff;
  --ion-color-actoutprimary-contrast-rgb: 255,255,255;
  --ion-color-actoutprimary-shade: #82557d;
  --ion-color-actoutprimary-tint: #9f7199;
}

.ion-color-actoutprimary {
  --ion-color-base: var(--ion-color-actoutprimary);
  --ion-color-base-rgb: var(--ion-color-actoutprimary-rgb);
  --ion-color-contrast: var(--ion-color-actoutprimary-contrast);
  --ion-color-contrast-rgb: var(--ion-color-actoutprimary-contrast-rgb);
  --ion-color-shade: var(--ion-color-actoutprimary-shade);
  --ion-color-tint: var(--ion-color-actoutprimary-tint);
}

:root {
  --ion-color-actoutsecondary: linear-gradient(0deg, rgba(244,222,203,1) 0%, rgba(255,246,239,1) 100%);
  --ion-color-actoutsecondary-rgb: 244,222,203;
  --ion-color-actoutsecondary-contrast: #000000;
  --ion-color-actoutsecondary-contrast-rgb: 0,0,0;
  --ion-color-actoutsecondary-shade: #d7c3b3;
  --ion-color-actoutsecondary-tint: #f5e1d0;
}

.ion-color-actoutsecondary {
  --ion-color-base: var(--ion-color-actoutsecondary);
  --ion-color-base-rgb: var(--ion-color-actoutsecondary-rgb);
  --ion-color-contrast: var(--ion-color-actoutsecondary-contrast);
  --ion-color-contrast-rgb: var(--ion-color-actoutsecondary-contrast-rgb);
  --ion-color-shade: var(--ion-color-actoutsecondary-shade);
  --ion-color-tint: var(--ion-color-actoutsecondary-tint);
}

:root {
  --ion-color-actouttertiary: linear-gradient(0deg, rgba(248,238,231,1) 0%, rgba(255,255,255,1) 100%);
  --ion-color-actouttertiary-rgb: 248,238,231;
  --ion-color-actouttertiary-contrast: #000000;
  --ion-color-actouttertiary-contrast-rgb: 0,0,0;
  --ion-color-actouttertiary-shade: #dad1cb;
  --ion-color-actouttertiary-tint: #f9f0e9;
}

.ion-color-actouttertiary {
  --ion-color-base: var(--ion-color-actouttertiary);
  --ion-color-base-rgb: var(--ion-color-actouttertiary-rgb);
  --ion-color-contrast: var(--ion-color-actouttertiary-contrast);
  --ion-color-contrast-rgb: var(--ion-color-actouttertiary-contrast-rgb);
  --ion-color-shade: var(--ion-color-actouttertiary-shade);
  --ion-color-tint: var(--ion-color-actouttertiary-tint);
}

:root {
  --ion-color-actoutblack: linear-gradient(0deg, rgba(73,39,74,1) 0%, rgba(145,90,147,1) 100%);
  --ion-color-actoutblack-rgb: 73,39,74;
  --ion-color-actoutblack-contrast: #ffffff;
  --ion-color-actoutblack-contrast-rgb: 255,255,255;
  --ion-color-actoutblack-shade: #402241;
  --ion-color-actoutblack-tint: #5b3d5c;
}

.ion-color-actoutblack {
  --ion-color-base: var(--ion-color-actoutblack);
  --ion-color-base-rgb: var(--ion-color-actoutblack-rgb);
  --ion-color-contrast: var(--ion-color-actoutblack-contrast);
  --ion-color-contrast-rgb: var(--ion-color-actoutblack-contrast-rgb);
  --ion-color-shade: var(--ion-color-actoutblack-shade);
  --ion-color-tint: var(--ion-color-actoutblack-tint);
}

:root {
  --ion-color-actoutwhite: #FFFCF2;
  --ion-color-actoutwhite-rgb: 255,252,242;
  --ion-color-actoutwhite-contrast: #000000;
  --ion-color-actoutwhite-contrast-rgb: 0,0,0;
  --ion-color-actoutwhite-shade: #e0ded5;
  --ion-color-actoutwhite-tint: #fffcf3;
}

.ion-color-actoutwhite {
  --ion-color-base: var(--ion-color-actoutwhite);
  --ion-color-base-rgb: var(--ion-color-actoutwhite-rgb);
  --ion-color-contrast: var(--ion-color-actoutwhite-contrast);
  --ion-color-contrast-rgb: var(--ion-color-actoutwhite-contrast-rgb);
  --ion-color-shade: var(--ion-color-actoutwhite-shade);
  --ion-color-tint: var(--ion-color-actoutwhite-tint);
}

custom-add{

    mask-size: contain;
    mask-position: 50% 50%;
    mask-repeat: no-repeat;
    background: currentColor;
    width: 1em;
    height: 1em;
    mask-image: url(/assets/add.svg);

}

</style>
