<script setup>
import '../styles/correctionPage.css'

const props = defineProps({
  origine: String,
  imagePath: String
})
</script>

<template>
  <div class="correction-page">
    <div class="images">
      <img :src="imagePath" alt="Image" />
    </div>
    <section class="section">
      <div class="text-block text-center">Origine</div>
    </section>
    <section class="section">
      <p class="paragraph">{{ origine }}</p>
    </section>
    <section class="section">
      <button @click="nextQuestion">Question suivante</button>
    </section>
  </div>
</template>
