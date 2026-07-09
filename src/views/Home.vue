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

    <div class="footer-tools">
      <button class="tool-link" @click="exportData">导出数据</button>
      <label class="tool-link" @click="$refs.fileInput.click()">导入数据
        <input ref="fileInput" type="file" accept=".json" hidden @change="importData" />
      </label>
    </div>
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
    const fileInput = ref(null)

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

    function exportData() {
      const blob = new Blob([JSON.stringify(store.ideas, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qisi-miaoxiang-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    function importData(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result)
          if (Array.isArray(data)) {
            store.ideas = data
            store.save()
            store.refresh()
            alert(`导入成功，共 ${data.length} 条想法`)
          } else {
            alert('数据格式不对，请选择导出的 JSON 文件')
          }
        } catch {
          alert('文件解析失败')
        }
      }
      reader.readAsText(file)
      e.target.value = ''
    }

    return { store, initialized, inputText, submitIdea, exportData, importData, fileInput }
  }
}
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 20px 60px;
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

.footer-tools {
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.tool-link {
  all: unset;
  cursor: pointer;
  font-size: 12px;
  color: #bbb;
  transition: color 0.15s;
}

.tool-link:hover {
  color: #555;
}

@media (max-width: 600px) {
  .app { padding: 20px 16px 40px; }
  .title { font-size: 1.35rem; }
  .header { margin-bottom: 18px; }
  .input-area { margin-bottom: 22px; }
}
</style>
