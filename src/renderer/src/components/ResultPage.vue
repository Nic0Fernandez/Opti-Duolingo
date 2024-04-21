<script setup>
import '../styles/resultPage.css'

const props = defineProps({
  score: String,
  onReturnHome: Function
})

function returnToHomePage() {
  props.onReturnHome()
}
</script>

<template>
  <div class="result-page">
    <!--<img :src="props.imagePath" alt="Image de l'expression" />-->
    <div>{{ score }}</div>
    <button @click="returnToHomePage">Retourner à l'accueil</button>
  </div>
</template>
