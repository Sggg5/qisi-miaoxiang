import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'qisi-miaoxiang-ideas'

const COOLING_DAYS = 7

export const STATUS_LABELS = {
  cooling: '冷却中',
  ready: '可处理',
  released: '已释放',
  archived: '已归档'
}

export const useIdeaStore = defineStore('ideas', () => {
  const ideas = ref([])
  const filter = ref('all')
  const showForm = ref(false)

  const filteredIdeas = computed(() => {
    if (filter.value === 'all') return ideas.value
    return ideas.value.filter(i => i.status === filter.value)
  })

  const counts = computed(() => ({
    all: ideas.value.length,
    cooling: ideas.value.filter(i => i.status === 'cooling').length,
    ready: ideas.value.filter(i => i.status === 'ready').length,
    archived: ideas.value.filter(i => i.status === 'archived').length
  }))

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) ideas.value = JSON.parse(saved)
    } catch (e) { console.error(e) }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas.value))
  }

  function add(content) {
    if (!content.trim()) return
    const now = Date.now()
    ideas.value.unshift({
      id: 'idea_' + now,
      content: content.trim(),
      status: 'cooling',
      createdAt: now,
      releasedAt: now + COOLING_DAYS * 24 * 60 * 60 * 1000
    })
    save()
  }

  function updateStatus(id, status) {
    const idea = ideas.value.find(i => i.id === id)
    if (idea) { idea.status = status; save() }
  }

  function refresh() {
    const now = Date.now()
    let changed = false
    for (const idea of ideas.value) {
      if (idea.status === 'cooling' && now >= idea.releasedAt) {
        idea.status = 'ready'
        changed = true
      }
    }
    if (changed) save()
  }

  function remainingDays(idea) {
    if (idea.status !== 'cooling') return 0
    const diff = idea.releasedAt - Date.now()
    if (diff <= 0) return 0
    return Math.ceil(diff / (24 * 60 * 60 * 1000))
  }

  return { ideas, filter, showForm, filteredIdeas, counts, load, save, add, updateStatus, refresh, remainingDays }
})
