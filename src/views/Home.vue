<template>
  <div class="app">
    <header class="header">
      <h1 class="title">奇思妙想</h1>
      <p class="subtitle">把突然冒出来的想法先放一放。</p>
    </header>

    <div class="input-area">
      <textarea
        v-model="inputText"
        placeholder="输入一个突然冒出来的想法……"
        @keydown.ctrl.enter="submitIdea"
        @keydown.meta.enter="submitIdea"
      ></textarea>
      <div class="input-actions">
        <button class="btn-submit" :disabled="!inputText.trim()" @click="submitIdea">收起来</button>
      </div>
    </div>

    <FilterBar />

    <main class="list" v-if="initialized">
      <div v-if="store.filteredIdeas.length === 0" class="empty">
        <p v-if="store.filter === 'all'">还没有想法，写一个试试。</p>
        <p v-else>这里什么都没有。</p>
      </div>
      <IdeaCard
        v-for="idea in store.filteredIdeas"
        :key="idea.id"
        :idea="idea"
      />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useIdeaStore } from '../stores/ideas'
import PRESET_IDEAS from '../data/presets'
import IdeaCard from '../components/IdeaCard.vue'
import FilterBar from '../components/FilterBar.vue'

export default {
  name: 'Home',
  components: { IdeaCard, FilterBar },
  setup() {
    const store = useIdeaStore()
    const initialized = ref(false)
    const inputText = ref('')

    onMounted(() => {
      store.load()
      if (store.ideas.length === 0) {
        for (const idea of PRESET_IDEAS) {
          store.ideas.push({ ...idea })
        }
        store.save()
      }
      store.refresh()
      initialized.value = true
    })

    function submitIdea() {
      if (!inputText.value.trim()) return
      store.add(inputText.value)
      inputText.value = ''
    }

    return { store, initialized, inputText, submitIdea }
  }
}
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 20px 80px;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.88rem;
  color: #aaa;
}

.input-area {
  margin-bottom: 28px;
}

.input-area textarea {
  width: 100%;
  height: 72px;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  color: #222;
  font-size: 0.92rem;
  line-height: 1.5;
  resize: none;
  transition: border-color 0.15s;
  display: block;
}

.input-area textarea:focus {
  border-color: #bbb;
}

.input-area textarea::placeholder {
  color: #bbb;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-submit {
  padding: 8px 22px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-submit:hover {
  background: #444;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: default;
}

.empty {
  text-align: center;
  padding: 48px 0;
  color: #bbb;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .app { padding: 20px 16px 60px; }
  .title { font-size: 1.35rem; }
  .header { margin-bottom: 18px; }
  .input-area { margin-bottom: 22px; }
}
</style>
