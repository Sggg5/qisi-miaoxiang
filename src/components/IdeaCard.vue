<template>
  <div class="card">
    <p class="content">{{ idea.content }}</p>
    <div class="meta">
      <span class="status" :class="idea.status">
        {{ STATUS_LABELS[idea.status] }}
        <template v-if="idea.status === 'cooling'">
          · {{ store.remainingDays(idea) }} 天后可处理
        </template>
      </span>
    </div>
    <div class="actions" v-if="idea.status === 'ready'">
      <button class="btn btn-sm btn-ghost" @click="store.updateStatus(idea.id, 'archived')">归档</button>
      <button class="btn btn-sm" @click="store.updateStatus(idea.id, 'released')">释放</button>
    </div>
    <div class="actions archived-actions" v-if="idea.status === 'released'">
      <span class="done-label">已释放</span>
      <button class="btn btn-sm btn-ghost" @click="store.updateStatus(idea.id, 'archived')">归档</button>
    </div>
  </div>
</template>

<script>
import { useIdeaStore, STATUS_LABELS } from '../stores/ideas'
export default {
  name: 'IdeaCard',
  props: { idea: { type: Object, required: true } },
  setup() { return { store: useIdeaStore(), STATUS_LABELS } }
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
}

.content {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #222;
  margin-bottom: 10px;
}

.meta {
  font-size: 0.8rem;
  color: #bbb;
  margin-bottom: 8px;
}

.status { display: inline-flex; align-items: center; gap: 4px; }
.status.cooling { color: #999; }
.status.ready { color: #222; font-weight: 500; }
.status.released { color: #bbb; }
.status.archived { color: #ccc; }

.actions { display: flex; gap: 6px; }

.done-label { font-size: 0.78rem; color: #bbb; line-height: 1.8; margin-right: auto; }

.archived-actions { justify-content: space-between; }

@media (max-width: 600px) {
  .card { padding: 14px 16px; }
  .content { font-size: 0.9rem; }
}
</style>
