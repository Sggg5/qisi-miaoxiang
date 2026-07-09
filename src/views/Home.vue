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
        rows="2"
        @keydown.ctrl.enter="submitIdea"
        @keydown.meta.enter="submitIdea"
      ></textarea>
      <div class="input-actions">
        <span class="char-count" v-if="inputText.length > 0">{{ inputText.length }}</span>
        <button class="btn btn-primary" @click="submitIdea" :disabled="!inputText.trim()">收起来</button>
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
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 20px 80px;
}

.header {
  margin-bottom: 32px;
}

.title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.subtitle {
  font-size: 0.9rem;
  color: #999;
}

.input-area {
  margin-bottom: 32px;
}

.input-area textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #222;
  font-size: 0.92rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.15s;
}

.input-area textarea:focus {
  border-color: #aaa;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.char-count {
  font-size: 0.75rem;
  color: #bbb;
}

.empty {
  text-align: center;
  padding: 48px 0;
  color: #bbb;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .app { padding: 28px 16px 60px; }
  .title { font-size: 1.4rem; }
  .header { margin-bottom: 24px; }
  .input-area { margin-bottom: 24px; }
}
</style>
