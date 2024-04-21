<script setup>
import '../styles/learningPage.css'

const props = defineProps({
  expressionFr: String,
  expressionEn: String,
  origine: String
})
</script>

<template>
  <div class="learning-page">
    <section class="section-1">
      <div class="text-block text-left">{{ expressionFr }}</div>
    </section>
    <section class="section">
      <div class="text-block text-right">{{ expressionEn }}</div>
    </section>
    <section class="section">
      <div class="text-block text-center">Origine</div>
    </section>
    <section class="section">
      <p class="paragraph">{{ origine }}</p>
    </section>
  </div>
</template>
