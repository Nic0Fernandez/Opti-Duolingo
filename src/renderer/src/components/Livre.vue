<script setup>
import { onMounted, ref } from 'vue'
import { parseCSV } from '../assets/parseCSV.js'
import '../styles/flipbook.css'

const props = defineProps({
  csvUrl: String
})

const pages = ref([])

onMounted(async () => {
  try {
    pages.value = await parseCSV(props.csvUrl)
    console.log('Pages chargées:', pages.value)
    $('#flipbook').turn({
      width: 800,
      height: 600,
      autoCenter: true
    })
  } catch (error) {
    console.error('Erreur lors du chargement du CSV:', error.message)
  }
})
</script>

<template>
  <div id="flipbook">
    <div class="hard">Couverture avant</div>
    <div class="hard"></div>
    <div v-for="page in pages" :key="page.id" class="page">
      {{ page.ExpressionAnglaise }} - {{ page.ExpressionFrançaise }}
    </div>
    <div class="hard"></div>
    <div class="hard">Couverture arrière</div>
  </div>
</template>
