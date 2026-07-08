<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-panel">
      <div class="modal-header">
        <h2>收容新想法</h2>
        <button class="btn-close" @click="$emit('close')">✕</button>
      </div>

      <form @submit.prevent="submitIdea" class="idea-form">
        <div class="form-group">
          <label>想法内容</label>
          <textarea
            v-model="form.content"
            placeholder="记录你突然冒出来的想法……"
            rows="4"
            required
            class="form-input"
          ></textarea>
        </div>

        <div class="form-group">
          <label>想法类型</label>
          <select v-model="form.type" required class="form-input">
            <option value="" disabled>选择类型</option>
            <option v-for="(label, key) in TYPE_LABELS" :key="key" :value="key">{{ label }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>危险等级</label>
          <div class="danger-selector">
            <button
              v-for="dl in DANGER_LEVELS"
              :key="dl.level"
              type="button"
              class="danger-btn"
              :class="{ active: form.dangerLevel === dl.level }"
              @click="form.dangerLevel = dl.level"
            >
              {{ dl.label }}
            </button>
          </div>
        </div>

        <div class="form-info" v-if="form.type && form.dangerLevel">
          <div class="info-row">
            <span class="info-label">冷却时间</span>
            <span class="info-value">{{ getCoolingDays() }} 天</span>
          </div>
          <div class="info-row">
            <span class="info-label">系统建议</span>
            <span class="info-value">{{ TYPE_SUGGESTIONS[form.type] }}</span>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-ghost" @click="$emit('close')">取消</button>
          <button type="submit" class="btn btn-primary" :disabled="!isValid">收容</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useIdeaStore, TYPE_LABELS, DANGER_LEVELS, TYPE_SUGGESTIONS } from '../stores/ideas'

export default {
  name: 'IdeaForm',
  emits: ['close'],
  setup(props, { emit }) {
    const store = useIdeaStore()

    const form = reactive({
      content: '',
      type: '',
      dangerLevel: 0
    })

    const isValid = computed(() => {
      return form.content.trim() && form.type && form.dangerLevel > 0
    })

    function getCoolingDays() {
      const level = DANGER_LEVELS.find(d => d.level === form.dangerLevel)
      return level ? level.days : 0
    }

    function submitIdea() {
      if (!isValid.value) return
      store.addIdea({
        content: form.content.trim(),
        type: form.type,
        dangerLevel: form.dangerLevel
      })
      emit('close')
    }

    return { form, isValid, TYPE_LABELS, DANGER_LEVELS, TYPE_SUGGESTIONS, getCoolingDays, submitIdea }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--accent);
  letter-spacing: 2px;
}

.btn-close {
  background: none;
  border: none;
  color: var(--gray);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-close:hover {
  color: var(--text);
}

.idea-form {
  padding: 20px 22px 22px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  color: var(--gray);
  margin-bottom: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.form-input {
  width: 100%;
  box-sizing: border-box;
  background: #1a1a1a;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 10px 12px;
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--accent-dim);
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

select.form-input {
  cursor: pointer;
}

select.form-input option {
  background: #1a1a1a;
  color: var(--text);
}

.danger-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.danger-btn {
  background: #1a1a1a;
  border: 1px solid var(--border);
  color: var(--gray);
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}

.danger-btn:hover {
  border-color: var(--accent-dim);
  color: var(--text);
}

.danger-btn.active {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(255, 255, 255, 0.08);
}

.form-info {
  background: rgba(255, 255, 255, 0.04);
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  padding: 12px;
  margin-bottom: 18px;
  border-radius: 0 4px 4px 0;
}

.info-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 0.82rem;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  color: var(--gray);
  white-space: nowrap;
  min-width: 60px;
}

.info-value {
  color: var(--text);
  line-height: 1.5;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 12px;
    align-items: flex-end;
  }
  .modal-panel {
    max-height: 85vh;
    border-radius: 8px 8px 0 0;
  }
  .danger-selector {
    grid-template-columns: 1fr;
  }
}
</style>


