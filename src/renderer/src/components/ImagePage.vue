<script setup>
import { onMounted } from 'vue'
import '../styles/imagePage.css'

const props = defineProps({
  imagePath: String,
  onReturnHome: Function
})

function returnToHomePage() {
  props.onReturnHome()
}

onMounted(() => {
  console.log(props.imagePath)
})
</script>

<template>
  <div class="image">
    <img class="ancient-style-border" :src="imagePath" alt="Image" />
    <button class="button-style" @click="returnToHomePage">Retourner à l'accueil</button>
  </div>
</template>
