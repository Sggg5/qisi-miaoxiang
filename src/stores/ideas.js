import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'qisi-miaoxiang-ideas'

const TYPE_LABELS = {
  'new-project': '新项目冲动',
  'buying': '买东西冲动',
  'learning': '学习冲动',
  'refactor': '重构冲动',
  'research': '查资料冲动',
  'redirect': '换方向冲动',
  'creative': '创意灵感',
  'review': '待复盘问题'
}

const STATUS_LABELS = {
  'observing': '观察中',
  'releasable': '可释放',
  'released': '已释放',
  'archived': '已归档',
  'merged': '已合并'
}

const DANGER_LEVELS = [
  { level: 1, label: '1级 - 小冲动', days: 1 },
  { level: 2, label: '2级 - 有点想', days: 2 },
  { level: 3, label: '3级 - 认真考虑', days: 3 },
  { level: 4, label: '4级 - 非常想', days: 7 },
  { level: 5, label: '5级 - 立刻行动!', days: 14 }
]

const TYPE_SUGGESTIONS = {
  'new-project': '新项目冲动通常源于对现状的不满。冷静几天，看看这个想法是否仍然迷人。',
  'buying': '消费冲动是大脑的多巴胺陷阱。冷却期过后，问问自己是否真的需要。',
  'learning': '学习是好事，但贪多嚼不烂。确认这个技能是否和当前方向一致。',
  'refactor': '重构冲动是程序员的浪漫。记住：能工作的代码不一定需要重写。',
  'research': '查资料的冲动往往伴随着 FOMO。先把手头的事做完再说。',
  'redirect': '换方向是最危险的冲动之一。冷却期请仔细思考沉没成本。',
  'creative': '灵感稍纵即逝，但大部分灵感其实没那么特别。先收着再说。',
  'review': '需要复盘的问题往往很重要。不要让它在忙碌中被遗忘。'
}

export const useIdeaStore = defineStore('ideas', () => {
  const ideas = ref([])
  const filter = ref({ type: '', status: '', dangerLevel: 0, keyword: '' })
  const showForm = ref(false)

  const filteredIdeas = computed(() => {
    return ideas.value.filter(idea => {
      if (filter.value.type && idea.type !== filter.value.type) return false
      if (filter.value.status && idea.status !== filter.value.status) return false
      if (filter.value.dangerLevel && idea.dangerLevel !== filter.value.dangerLevel) return false
      if (filter.value.keyword) {
        const kw = filter.value.keyword.toLowerCase()
        if (!idea.content.toLowerCase().includes(kw)) return false
      }
      return true
    })
  })

  function loadIdeas() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        ideas.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load ideas:', e)
    }
  }

  function saveIdeas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas.value))
  }

  function addIdea(ideaData) {
    const now = Date.now()
    const level = DANGER_LEVELS.find(d => d.level === ideaData.dangerLevel) || DANGER_LEVELS[0]
    const releasedAt = now + level.days * 24 * 60 * 60 * 1000

    const idea = {
      id: 'idea_' + now + '_' + Math.random().toString(36).slice(2, 8),
      content: ideaData.content,
      type: ideaData.type,
      dangerLevel: ideaData.dangerLevel,
      status: 'observing',
      createdAt: now,
      releasedAt: releasedAt,
      systemSuggestion: TYPE_SUGGESTIONS[ideaData.type] || '暂无建议，请自行判断。',
      mergedTo: ''
    }
    ideas.value.unshift(idea)
    saveIdeas()
  }

  function updateStatus(ideaId, newStatus, mergeTarget) {
    const idea = ideas.value.find(i => i.id === ideaId)
    if (!idea) return
    idea.status = newStatus
    if (newStatus === 'merged' && mergeTarget) {
      idea.mergedTo = mergeTarget
    }
    saveIdeas()
  }

  function extendObserving(ideaId) {
    const idea = ideas.value.find(i => i.id === ideaId)
    if (!idea) return
    idea.releasedAt = Date.now() + 3 * 24 * 60 * 60 * 1000
    idea.status = 'observing'
    saveIdeas()
  }

  function refreshStatuses() {
    const now = Date.now()
    let changed = false
    for (const idea of ideas.value) {
      if (idea.status === 'observing' && now >= idea.releasedAt) {
        idea.status = 'releasable'
        changed = true
      }
    }
    if (changed) saveIdeas()
  }

  function setFilter(newFilter) {
    Object.assign(filter.value, newFilter)
  }

  function clearFilter() {
    filter.value = { type: '', status: '', dangerLevel: 0, keyword: '' }
  }

  return {
    ideas,
    filter,
    showForm,
    filteredIdeas,
    loadIdeas,
    saveIdeas,
    addIdea,
    updateStatus,
    extendObserving,
    refreshStatuses,
    setFilter,
    clearFilter
  }
})

export { TYPE_LABELS, STATUS_LABELS, DANGER_LEVELS, TYPE_SUGGESTIONS }
