<script setup>
import '../styles/pageAccueil.css'

const emit = defineEmits(['learning', 'test'])

function handleLearning() {
  emit('learning')
}

function handleTest() {
  emit('test')
}
</script>

<template>
  <div class="home-page">
    <button class="buttonAccueil" @click="handleLearning">Apprentissage</button>
    <button class="buttonAccueil" @click="handleTest">Test</button>
  </div>
</template>
