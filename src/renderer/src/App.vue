<script setup lang="ts">
import './styles/base.css'
import Livre from './components/Livre.vue'
</script>

<template>
  <div>
    <Livre
      csv-url="https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/data.csv"
    />
  </div>
</template>
