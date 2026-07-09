<template>
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab.key" class="tab" :class="{ active: store.filter === tab.key }" @click="store.filter = tab.key">
      {{ tab.label }}
      <span class="count" v-if="store.counts[tab.key] > 0">{{ store.counts[tab.key] }}</span>
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
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 18px;
  border-bottom: 1px solid #e8e2d8;
}

.tab {
  all: unset;
  cursor: pointer;
  padding: 7px 18px 7px 0;
  font-size: 14px;
  color: #bbb;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.tab:hover { color: #888; }

.tab.active {
  color: #222;
  border-bottom-color: #222;
}

.count {
  font-size: 11px;
  color: #ccc;
  background: #f0ece5;
  padding: 0 6px;
  border-radius: 8px;
  line-height: 1.6;
}

.tab.active .count {
  color: #aaa;
  background: #e8e2d8;
}

@media (max-width: 600px) {
  .tab { font-size: 13px; padding: 6px 14px 6px 0; }
}
</style>
