<script setup>
import '../styles/resultPage.css'
import { onMounted } from 'vue'

const props = defineProps({
  score: String,
  onReturnHome: Function
})

let img

onMounted(() => {
  displayImgResult()
})

function returnToHomePage() {
  props.onReturnHome()
}

function displayImgResult() {
  if (score<4) {
    img = "https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespeareProud.webp"
  }
  if (score<8) {
    img = "https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespeareProud.webp"
  }
  if (score<11) {
    img = "https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespeareProud.webp"
  }
}
</script>

<template>
  <div class="result-page">
    <img :src="img" alt="Résultat de votre test" />
    <div class="score">Votre score est de : {{ score }}/10</div>
    <button class="buttonResult" @click="returnToHomePage">Retourner à l'accueil</button>
  </div>
</template>
