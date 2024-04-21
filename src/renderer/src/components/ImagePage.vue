<script setup>
import { onMounted, computed } from 'vue'
import '../styles/imagePage.css'

const props = defineProps({
  imagePath: String
})

onMounted(() => {
  console.log(props.imagePath)
})
</script>

<template>
  <div class="image">
    <img :src="imagePath" alt="Image" />
    <button>Retourner à l'accueil</button>
  </div>
</template>
