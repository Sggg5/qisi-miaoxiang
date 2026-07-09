<template>
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab.key" class="tab" :class="{ active: store.filter === tab.key }" @click="store.filter = tab.key">
      {{ tab.label }}
      <span class="count">{{ store.counts[tab.key] }}</span>
    </button>
  </div>
</template>

<script>
import { useIdeaStore } from '../stores/ideas'
export default {
  name: 'FilterBar',
  setup() {
    const store = useIdeaStore()
    const tabs = [
      { key: 'all', label: '全部' },
      { key: 'cooling', label: '冷却中' },
      { key: 'ready', label: '可处理' },
      { key: 'archived', label: '已归档' }
    ]
    return { store, tabs }
  }
}
</script>

<style scoped>
.tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid #e5e0d8; }
.tab { all: unset; cursor: pointer; padding: 8px 16px; font-size: 0.85rem; color: #999; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color 0.15s; display: flex; align-items: center; gap: 6px; }
.tab:hover { color: #555; }
.tab.active { color: #222; border-bottom-color: #222; }
.count { font-size: 0.72rem; color: #bbb; background: #f0ece5; padding: 0 6px; border-radius: 8px; line-height: 1.5; }
.tab.active .count { color: #999; background: #e5e0d8; }
@media (max-width: 600px) { .tab { padding: 6px 12px; font-size: 0.82rem; } }
</style>
