<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { parseCSV } from '../assets/parseCSV.js'
import '../styles/flipbook.css'
import PageAccueil from './PageAccueil.vue'

const props = defineProps({
  csvUrl: String
})

const pages = ref([])

onMounted(() => {
  nextTick().then(() => {
    $('#flipbook')
      .turn({
        width: 800,
        height: 600,
        autoCenter: true
      })
      .on('turning', function (event, page, view) {
        if (page === 3 && $('#flipbook').turn('page') > 3) {
          event.preventDefault()
        }
      })
      .bind('start', function (event, pageObject, corner) {
        //Récup la page actuelle
        var currentPage = $(this).turn('page')

        //Désactiver l'effet de hover quand tu mets la souris sur un coin
        if (currentPage > 3 && pageObject.next === 3 && (corner === 'tl' || corner === 'bl')) {
          event.preventDefault() // Empêcher le retour à la page accueil
        }
      })
  })
})

function addLearningPages() {
  parseCSV(props.csvUrl).then((loadedPages) => {
    pages.value = loadedPages
    loadedPages.forEach((page) => {
      $('#flipbook').turn(
        'addPage',
        `<div class='page'>${page.expressionEn} - ${page.expressionFr}</div>`,
        $('#flipbook').turn('pages') + 1
      )
    })
    $('#flipbook').turn('next')
  })
}

function goToTestPage() {
  $('#flipbook').turn(
    'addPage',
    "<div class='page'>Test Page - Content Goes Here</div>",
    $('#flipbook').turn('pages') + 1
  )
  $('#flipbook').turn('next')
}
</script>

<template>
  <div id="flipbook">
    <div class="hard">Couverture avant</div>
    <div class="hard"></div>
    <PageAccueil @learning="addLearningPages" @test="goToTestPage" />
  </div>
</template>
