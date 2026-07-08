<template>
  <div class="idea-card" :class="[`level-${idea.dangerLevel}`, `status-${idea.status}`]">
    <div class="card-header">
      <span class="card-type">{{ TYPE_LABELS[idea.type] }}</span>
      <span class="card-level">{{ '⚠'.repeat(idea.dangerLevel) }}</span>
    </div>

    <div class="card-body">
      <p class="card-content">{{ idea.content }}</p>
    </div>

    <div class="card-meta">
      <div class="meta-row">
        <span class="meta-label">收容时间</span>
        <span class="meta-value">{{ formatDate(idea.createdAt) }}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">释放日期</span>
        <span class="meta-value" :class="{ overdue: idea.status === 'releasable' }">
          {{ formatDate(idea.releasedAt) }}
        </span>
      </div>
      <div class="meta-row">
        <span class="meta-label">状态</span>
        <span class="meta-value status-badge" :class="`badge-${idea.status}`">
          {{ STATUS_LABELS[idea.status] }}
        </span>
      </div>
    </div>

    <div class="card-suggestion" v-if="idea.systemSuggestion">
      <span class="suggestion-label">系统建议</span>
      <p class="suggestion-text">{{ idea.systemSuggestion }}</p>
    </div>

    <div class="card-actions" v-if="idea.status === 'releasable'">
      <button class="btn btn-sm btn-action" @click="handleAction('release')" title="释放成项目">🚀 释放</button>
      <button class="btn btn-sm btn-action" @click="handleAction('extend')" title="继续观察 +3天">⏳ 继续观察</button>
      <button class="btn btn-sm btn-action" @click="handleAction('archive')" title="归档为废案">📦 归档</button>
      <button class="btn btn-sm btn-action" @click="showMergeInput = !showMergeInput" title="合并到旧项目">🔗 合并</button>
    </div>

    <div class="merge-input" v-if="showMergeInput">
      <input v-model="mergeTarget" placeholder="输入旧项目名称……" @keyup.enter="doMerge" />
      <button class="btn btn-sm btn-action" @click="doMerge">确认合并</button>
    </div>

    <div class="card-merged" v-if="idea.status === 'merged' && idea.mergedTo">
      已合并至 <strong>{{ idea.mergedTo }}</strong>
    </div>

    <div class="card-footer">
      <span class="footer-id">#{{ idea.id.slice(0, 10) }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIdeaStore, TYPE_LABELS, STATUS_LABELS } from '../stores/ideas'

export default {
  name: 'IdeaCard',
  props: {
    idea: { type: Object, required: true }
  },
  setup(props) {
    const store = useIdeaStore()
    const showMergeInput = ref(false)
    const mergeTarget = ref('')

    function formatDate(ts) {
      const d = new Date(ts)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    function handleAction(action) {
      if (action === 'release') {
        store.updateStatus(props.idea.id, 'released')
      } else if (action === 'extend') {
        store.extendObserving(props.idea.id)
      } else if (action === 'archive') {
        store.updateStatus(props.idea.id, 'archived')
      }
    }

    function doMerge() {
      if (mergeTarget.value.trim()) {
        store.updateStatus(props.idea.id, 'merged', mergeTarget.value.trim())
        showMergeInput.value = false
        mergeTarget.value = ''
      }
    }

    return { TYPE_LABELS, STATUS_LABELS, formatDate, handleAction, showMergeInput, mergeTarget, doMerge }
  }
}
</script>

<style scoped>
.idea-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px 18px;
  margin-bottom: 16px;
  position: relative;
  transition: border-color 0.2s;
}

.idea-card:hover {
  border-color: var(--accent-dim);
}

.idea-card.level-4,
.idea-card.level-5 {
  border-left: 3px solid var(--accent);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.78rem;
  letter-spacing: 1px;
}

.card-type {
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
}

.card-level {
  color: var(--accent-dim);
  font-size: 0.7rem;
}

.card-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 14px;
}

.card-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px dotted var(--border);
}

.meta-label {
  color: var(--gray);
}

.meta-value {
  color: var(--text);
}

.overdue {
  color: var(--accent) !important;
  font-weight: 600;
}

.status-badge {
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
}

.badge-observing { color: var(--gray); border: 1px solid var(--gray); }
.badge-releasable { color: var(--accent); border: 1px solid var(--accent); }
.badge-released { color: #4caf50; border: 1px solid #4caf50; }
.badge-archived { color: #666; border: 1px solid #444; }
.badge-merged { color: #64b5f6; border: 1px solid #64b5f6; }

.card-suggestion {
  background: rgba(255, 255, 255, 0.04);
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 0 4px 4px 0;
}

.suggestion-label {
  font-size: 0.7rem;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 4px;
}

.suggestion-text {
  font-size: 0.8rem;
  color: var(--gray);
  margin: 0;
  line-height: 1.5;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.btn-action {
  font-size: 0.75rem !important;
  padding: 4px 10px !important;
}

.merge-input {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.merge-input input {
  flex: 1;
  background: #222;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  outline: none;
}

.merge-input input:focus {
  border-color: var(--accent-dim);
}

.card-merged {
  font-size: 0.8rem;
  color: #64b5f6;
  margin-bottom: 8px;
}

.card-footer {
  margin-top: 10px;
  font-size: 0.65rem;
  color: #444;
  text-align: right;
}

@media (max-width: 600px) {
  .idea-card {
    padding: 12px 14px;
    margin-bottom: 12px;
  }
  .card-meta {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .card-content {
    font-size: 0.9rem;
  }
}
</style>


