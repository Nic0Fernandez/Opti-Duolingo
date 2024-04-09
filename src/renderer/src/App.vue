<script setup lang="ts">
import './styles/base.css'
import './styles/flipbook.css'
import { onMounted } from 'vue'

onMounted(() => {
  $('#flipbook').turn({
    width: 800,²
    height: 600,
    autoCenter: true
  })
})
</script>

<template>
  <div id="flipbook">
    <div class="hard">Turn.js</div>
    <div class="hard"></div>
    <div class="page">Page 1</div>
    <div class="page">Page 2</div>
    <div class="page">Page 3</div>
    <div class="page">Page 4</div>
    <div class="hard"></div>
    <div class="hard"></div>
  </div>
  <Versions />
</template>
