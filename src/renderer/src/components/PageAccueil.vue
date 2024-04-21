<script setup>
const emit = defineEmits(['learning', 'test']);

function handleLearning() {
  emit('learning')
}

function handleTest() {
  emit('test')
}
</script>

<template>
  <div class="home-page">
    <button @click="handleLearning">Apprentissage</button>
    <button @click="handleTest">Test</button>
  </div>
</template>
