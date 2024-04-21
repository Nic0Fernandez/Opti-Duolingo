<script setup>
import { onMounted } from 'vue'
import '../styles/imagePage.css'

const props = defineProps({
  imagePath: String,
  onReturnHome: Function
})

function returnToHomePage() {
  props.onReturnHome() // Appeler la fonction passée lors du clic
}

onMounted(() => {
  console.log(props.imagePath)
})

</script>

<template>
  <div class="image">
    <img :src="imagePath" alt="Image" />
    <button @click="returnToHomePage">Retourner à l'accueil</button>
  </div>
</template>
