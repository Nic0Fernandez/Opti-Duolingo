<script setup>
import { onMounted } from 'vue'
import '../styles/correctionPage.css'

const props = defineProps({
  origine: String,
  imagePath: String,
  onNextQuestion: Function
})

onMounted(() => {
  console.log(props.imagePath)
})

function getNextQuestion() {
  props.onNextQuestion()
}
</script>

<template>
  <div class="correction-page">
    <img :src="props.imagePath" alt="Image de l'expression" />
    <div>{{ props.origine }}</div>
    <button class="buttonCorrect" @click="getNextQuestion">Question suivante</button>
  </div>
</template>
