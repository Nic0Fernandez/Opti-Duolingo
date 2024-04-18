<script setup>
import { onMounted, ref } from 'vue'
import { parseCSV } from './assets/parseCSV.js'

const props = defineProps({
  csvData: String
})

const pages = ref([])

onMounted(async () => {
  pages.value = await parseCSV(props.csvData)
  $('#flipbook').turn({
    width: 800,
    height: 600,
    autoCenter: true
  })
})
</script>

<template>
  <div id="flipbook">
    <div class="hard">Couverture avant</div>
    <div class="hard"></div>
    <div v-for="page in pages" :key="page.id" class="page">{{ page.content }}</div>
    <div class="hard"></div>
    <div class="hard">Couverture arrière</div>
  </div>
</template>
