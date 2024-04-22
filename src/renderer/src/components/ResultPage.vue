<script setup>
import '../styles/resultPage.css'
import { onMounted, ref } from 'vue'

const props = defineProps({
  score: Number,
  onReturnHome: Function
})

let imgScore = ref('')

onMounted(() => {
  displayImgResult()
})

function returnToHomePage() {
  props.onReturnHome()
}

function displayImgResult() {
  if (props.score < 4) {
    imgScore.value =
      'https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespeareDisappointed.webp'
  }
  else if (props.score < 8) {
    imgScore.value =
      'https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespareMitigated.webp'
  }
  else {
    imgScore.value =
      'https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/shakespeareProud.webp'
  }
}
</script>

<template>
  <div class="result-page">
    <img class="shake" :src="imgScore" alt="Résultat de votre test" />
    <div class="score">Votre score est de : {{ score }}/10</div>
    <button class="buttonResult" @click="returnToHomePage">Retourner à l'accueil</button>
  </div>
</template>
