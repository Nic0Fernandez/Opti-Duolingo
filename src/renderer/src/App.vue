<script setup lang="ts">
import './styles/base.css'
import './styles/flipbook.css'
import Livre from './components/Livre.vue'
import { ref, onMounted } from 'vue'

const csvData = ref('')

onMounted(() => {
  fetch('/pathToCsv')
    .then((response) => response.text())
    .then((data) => {
      csvData.value = data
    })
})
</script>

<template>
  <Livre :csv-data="csvData" />
</template>
