<script setup>
import '../styles/testPage.css'

const props = defineProps({
  expressionFr: String,
  expressionEn: String
})
</script>

<template>
  <div class="test-page">
    <section class="section-1">
      <div class="text-block text-left">{{ expressionFr }}</div>
    </section>
    <section class="section">
      <input
        type="text"
        class="text-block text-center"
        placeholder="Veuillez entrez la traduction anglaise"
      />
    </section>
    <section class="section">
      <div class="input">{{ expressionEn }}</div>
    </section>
    <section class="section">
      <button @click="checkAnswer">Valider</button>
    </section>
  </div>
</template>
