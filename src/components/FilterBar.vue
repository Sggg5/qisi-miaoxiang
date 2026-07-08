<template>
  <div class="filter-bar">
    <div class="filter-row">
      <div class="filter-group">
        <label>类型</label>
        <select v-model="local.type" @change="applyFilter">
          <option value="">全部类型</option>
          <option v-for="(label, key) in TYPE_LABELS" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>状态</label>
        <select v-model="local.status" @change="applyFilter">
          <option value="">全部状态</option>
          <option v-for="(label, key) in STATUS_LABELS" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>危险等级</label>
        <select v-model="local.dangerLevel" @change="applyFilter">
          <option :value="0">全部等级</option>
          <option v-for="dl in DANGER_LEVELS" :key="dl.level" :value="dl.level">{{ dl.label }}</option>
        </select>
      </div>
    </div>

    <div class="search-row">
      <input
        v-model="local.keyword"
        @input="applyFilter"
        placeholder="🔍 搜索想法内容……"
        class="search-input"
      />
      <button v-if="hasFilter" class="btn btn-ghost btn-sm" @click="clearFilters">清除筛选</button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useIdeaStore, TYPE_LABELS, STATUS_LABELS, DANGER_LEVELS } from '../stores/ideas'

export default {
  name: 'FilterBar',
  setup() {
    const store = useIdeaStore()

    const local = reactive({
      type: store.filter.type,
      status: store.filter.status,
      dangerLevel: store.filter.dangerLevel,
      keyword: store.filter.keyword
    })

    const hasFilter = computed(() => {
      return local.type || local.status || local.dangerLevel || local.keyword
    })

    function applyFilter() {
      store.setFilter({ ...local })
    }

    function clearFilters() {
      local.type = ''
      local.status = ''
      local.dangerLevel = 0
      local.keyword = ''
      store.clearFilter()
    }

    return { local, hasFilter, TYPE_LABELS, STATUS_LABELS, DANGER_LEVELS, applyFilter, clearFilters }
  }
}
</script>

<style scoped>
.filter-bar {
  margin-bottom: 20px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 140px;
}

.filter-group label {
  display: block;
  font-size: 0.7rem;
  color: var(--gray);
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.filter-group select {
  width: 100%;
  background: #1a1a1a;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 0.82rem;
  outline: none;
  cursor: pointer;
}

.filter-group select:focus {
  border-color: var(--accent-dim);
}

.filter-group select option {
  background: #1a1a1a;
  color: var(--text);
}

.search-row {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  background: #1a1a1a;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  outline: none;
}

.search-input:focus {
  border-color: var(--accent-dim);
}

@media (max-width: 600px) {
  .filter-row {
    flex-direction: column;
    gap: 8px;
  }
  .filter-group {
    min-width: auto;
  }
}
</style>


