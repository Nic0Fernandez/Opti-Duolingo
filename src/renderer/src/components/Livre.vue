<script setup>
import { onMounted, onUnmounted, ref, nextTick, createApp } from 'vue'
import { parseCSV } from '../assets/parseCSV.js'
import '../styles/flipbook.css'
import PageAccueil from './PageAccueil.vue'
import LearningPage from './LearningPage.vue'
import ImagePage from './ImagePage.vue'
import TestPage from './TestPage.vue'
import CorrectionPage from './CorrectionPage.vue'
import ResultPage from './ResultPage.vue'

const props = defineProps({
  csvUrl: String
})

const pages = ref([])
let compteur = 1
let score = 0

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

function getRandomItem(set) {
  let items = Array.from(set)
  return items[Math.floor(Math.random() * items.length)]
}

function addLearningPages() {
  parseCSV(props.csvUrl).then((loadedPages) => {
    pages.value = loadedPages
    loadedPages.forEach((page) => {
      const container = document.createElement('div')
      container.className = 'page'
      // eslint-disable-next-line vue/one-component-per-file
      const app = createApp(LearningPage, {
        expressionFr: page.expressionFr,
        expressionEn: page.expressionEn,
        origine: page.origine
      })
      app.mount(container)
      $('#flipbook').turn('addPage', container, $('#flipbook').turn('pages') + 1)

      const imageContainer = document.createElement('div')
      imageContainer.classname = 'page'
      // eslint-disable-next-line vue/one-component-per-file
      const imageApp = createApp(ImagePage, {
        imagePath: `https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/${page.imagePath}`,
        onReturnHome: () => handleReturnHome()
      })
      imageApp.mount(imageContainer)
      $('#flipbook').turn('addPage', imageContainer, $('#flipbook').turn('pages') + 1)
    })
    $('#flipbook').turn('next')
  })
}

function handleReturnHome() {
  compteur = 1
  score = 0
  $('#flipbook').turn('page', 3)
  const totalPages = $('#flipbook').turn('pages')
  for (let i = totalPages; i > 3; i--) {
    $('#flipbook').turn('removePage', i)
  }
}

function goToTestPage() {
  parseCSV(props.csvUrl).then((loadedPages) => {
    pages.value = loadedPages
    const randomPage = getRandomItem(pages.value)
    console.log(randomPage)
    const testContainer = document.createElement('div')
    testContainer.className = 'page'

    // eslint-disable-next-line vue/one-component-per-file
    const testApp = createApp(TestPage, {
      expressionFr: randomPage.expressionFr,
      expressionEn: randomPage.expressionEn,
      showCorrection: () => handleShowingCorrection(randomPage.imagePath, randomPage.origine),
      increaseScore: () => {
        score++
      }
    })
    testApp.mount(testContainer)
    $('#flipbook').turn('addPage', testContainer, $('#flipbook').turn('pages') + 1)

    const emptyContainer = document.createElement('div')
    emptyContainer.classname = 'page'
    $('#flipbook').turn('addPage', emptyContainer, $('#flipbook').turn('pages') + 1)
    $('#flipbook').turn('next')
  })
}

function handleShowingCorrection(path, origine) {
  // eslint-disable-next-line vue/one-component-per-file
  const correctionApp = createApp(CorrectionPage, {
    origine: origine,
    imagePath: `https://raw.githubusercontent.com/Nic0Fernandez/Opti-Duolingo/main/src/renderer/src/assets/images/${path}`,
    onNextQuestion: () => handleNextQuestion()
  })
  const correctionContainer = document.createElement('div')
  correctionContainer.classname = 'page correction-page'
  correctionApp.mount(correctionContainer)
  $('#flipbook').turn('addPage', correctionContainer, $('#flipbook').turn('pages'))
}

function handleNextQuestion() {
  if (compteur < 4) {
    compteur++
    $('#flipbook').turn('page', 3)
    const totalPages = $('#flipbook').turn('pages')
    for (let i = totalPages; i > 3; i--) {
      $('#flipbook').turn('removePage', i)
    }
    goToTestPage()
  } else {
    displayResult()
  }
}

function displayResult() {
  // eslint-disable-next-line vue/one-component-per-file
  const scoreApp = createApp(ResultPage, {
    score: score,
    onReturnHome: () => handleReturnHome()
  })
  const scoreContainer = document.createElement('div')
  scoreContainer.classname = 'page score-page'
  scoreApp.mount(scoreContainer)
  $('#flipbook').turn('addPage', scoreContainer, $('#flipbook').turn('pages'))
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
