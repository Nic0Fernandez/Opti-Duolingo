<script setup>
import '../styles/testPage.css'
import { ref } from 'vue'

const props = defineProps({
  expressionFr: String,
  expressionEn: String,
  showCorrection: Function,
  increaseScore: Function
})

const userAnswer = ref('')
const feedback = ref('')

function checkAnswer() {
  if (userAnswer.value.toLowerCase() === props.expressionEn.toLowerCase()) {
    feedback.value = 'Bonne réponse'
    props.increaseScore()
  } else {
    feedback.value = `Mauvaise réponse, la bonne réponse était : ${props.expressionEn}`
  }
  props.showCorrection()
}
</script>

<template>
  <div class="test-page">
    <section class="section-1">
      <div class="text-block text-left">{{ expressionFr }}</div>
    </section>
    <section class="section2">
      <input
        id=answer
        v-model="userAnswer"
        type="text"
        class="text-input text-center"
        placeholder="Veuillez entrez la traduction anglaise"
      />
    </section>
    <section class="section">
      <button class="buttonTest" @click="checkAnswer">Valider</button>
      <p>{{ feedback }}</p>
    </section>
  </div>
</template>
