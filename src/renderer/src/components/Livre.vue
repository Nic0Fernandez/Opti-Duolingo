<script setup>
import { onMounted, onUnmounted, ref, nextTick, createApp } from 'vue'
import { parseCSV } from '../assets/parseCSV.js'
import '../styles/flipbook.css'
import PageAccueil from './PageAccueil.vue'
import LearningPage from './LearningPage.vue'

const props = defineProps({
  csvUrl: String
})

const pages = ref([])

onMounted(() => {
  nextTick().then(() => {
    $('#flipbook')
      .turn({
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
    function resizeBook() {
      const maxWidth = window.innerWidth * 0.8
      const maxHeight = window.innerHeight

      const aspectRatio = 4 / 3
      let width = maxWidth
      let height = maxWidth / aspectRatio

      if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
      }
      $('#flipbook').turn('size', width, height)
    }
    window.addEventListener('resize', resizeBook)
    resizeBook()
  })
})

onUnmounted(() => {
  // Nettoyer l'écouteur d'événements lors de la destruction du composant
  window.removeEventListener('resize', resizeBook)
})

function addLearningPages() {
  parseCSV(props.csvUrl).then((loadedPages) => {
    pages.value = loadedPages
    loadedPages.forEach((page) => {
      const container = document.createElement('div')
      container.className = 'page'

      // Créer une instance de l'application Vue pour le composant LearningPage
      const app = createApp(LearningPage, {
        expressionFr: page.expressionFr,
        expressionEn: page.expressionEn,
        origine: page.origine
      })

      // Monter l'instance sur le conteneur créé
      app.mount(container)
      $('#flipbook').turn('addPage', container, $('#flipbook').turn('pages') + 1)
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
