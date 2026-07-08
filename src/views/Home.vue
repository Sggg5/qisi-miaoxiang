<template>
  <div class="home">
    <header class="archive-header">
      <h1 class="site-title">奇思妙想</h1>
      <p class="site-subtitle">先把想法收起来，等它冷却后再决定。</p>
      <div class="header-actions">
        <button class="btn btn-primary" @click="store.showForm = true">+ 收容新想法</button>
      </div>
    </header>

    <FilterBar />

    <section class="idea-list" v-if="initialized">
      <div v-if="store.filteredIdeas.length === 0" class="empty-state">
        <div class="empty-icon">📂</div>
        <p>收容所里空空的……</p>
        <p class="empty-hint">试试调整筛选条件，或者收容一个新想法。</p>
      </div>
      <IdeaCard
        v-for="idea in store.filteredIdeas"
        :key="idea.id"
        :idea="idea"
      />
    </section>

    <section class="stats-bar" v-if="initialized">
      <span>收容总数：{{ store.ideas.length }}</span>
      <span>观察中：{{ store.ideas.filter(i => i.status === 'observing').length }}</span>
      <span>可释放：{{ store.ideas.filter(i => i.status === 'releasable').length }}</span>
    </section>

    <IdeaForm v-if="store.showForm" @close="store.showForm = false" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useIdeaStore, TYPE_LABELS, STATUS_LABELS, DANGER_LEVELS } from '../stores/ideas'
import PRESET_IDEAS from '../data/presets'
import IdeaCard from '../components/IdeaCard.vue'
import IdeaForm from '../components/IdeaForm.vue'
import FilterBar from '../components/FilterBar.vue'

export default {
  name: 'Home',
  components: { IdeaCard, IdeaForm, FilterBar },
  setup() {
    const store = useIdeaStore()
    const initialized = ref(false)

    onMounted(() => {
      store.loadIdeas()
      if (store.ideas.length === 0) {
        for (const idea of PRESET_IDEAS) {
          store.ideas.push({ ...idea })
        }
        store.saveIdeas()
      }
      store.refreshStatuses()
      initialized.value = true
    })

    return { store, initialized }
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 16px 100px;
}

.archive-header {
  text-align: center;
  padding: 40px 0 30px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.site-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 6px;
  margin: 0 0 8px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
}

.site-subtitle {
  color: var(--gray);
  font-size: 0.95rem;
  margin: 0 0 20px;
  letter-spacing: 2px;
}

.header-actions {
  margin-top: 16px;
}

.stats-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  padding: 10px 20px;
  display: flex;
  gap: 24px;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--gray);
  z-index: 10;
  backdrop-filter: blur(8px);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--gray);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-hint {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .site-title {
    font-size: 1.6rem;
    letter-spacing: 4px;
  }
  .home {
    padding: 16px 12px 80px;
  }
  .stats-bar {
    gap: 12px;
    font-size: 0.75rem;
    padding: 8px 12px;
  }
}
</style>


