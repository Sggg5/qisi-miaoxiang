<template>
  <div class="card">
    <p class="content">{{ idea.content }}</p>

    <p class="status-line">
      <template v-if="idea.status === 'cooling'">
        冷却中 · {{ store.remainingDays(idea) }}天后可处理
      </template>
      <template v-else-if="idea.status === 'ready'">
        可处理 · 可以决定去留
      </template>
      <template v-else>
        {{ STATUS_LABELS[idea.status] }}
      </template>
    </p>

    <div class="actions" v-if="idea.status === 'ready'">
      <button class="btn-link" @click="store.updateStatus(idea.id, 'archived')">归档</button>
      <button class="btn-link btn-release" @click="store.updateStatus(idea.id, 'released')">释放</button>
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
  border: 1px solid #e8e2d8;
  border-radius: 8px;
  padding: 18px 20px;
  margin-bottom: 12px;
}

.content {
  font-size: 16px;
  line-height: 1.55;
  color: #222;
  margin: 0 0 10px;
}

.status-line {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 10px;
}

.actions {
  display: flex;
  gap: 12px;
}

.btn-link {
  all: unset;
  cursor: pointer;
  font-size: 13px;
  color: #999;
  transition: color 0.15s;
}

.btn-link:hover {
  color: #222;
}

.btn-release {
  color: #222;
  font-weight: 500;
}

.btn-release:hover {
  color: #000;
}

@media (max-width: 600px) {
  .card { padding: 16px 16px; margin-bottom: 10px; }
}
</style>
