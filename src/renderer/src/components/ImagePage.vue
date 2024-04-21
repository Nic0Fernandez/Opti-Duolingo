<script setup>
import '../styles/imagePage.css'

const props = defineProps({
  imagePath: String
})
</script>

<template>
  <img src="{{ imagePath }}" alt="Image" />
  <button>Retourner à l'accueil</button>
</template>
