const PRESET_IDEAS = [
  {
    id: 'preset_01',
    content: '想做一个用键盘敲击声生成音乐的 Chrome 插件，每次打字都是一段旋律。',
    type: 'new-project',
    dangerLevel: 3,
    status: 'observing',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() + 1 * 24 * 60 * 60 * 1000,
    systemSuggestion: '新项目冲动通常源于对现状的不满。冷静几天，看看这个想法是否仍然迷人。',
    mergedTo: ''
  },
  {
    id: 'preset_02',
    content: '想买一把 HHKB Professional Hybrid 静电容键盘，虽然现在的键盘还能用。',
    type: 'buying',
    dangerLevel: 2,
    status: 'observing',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    systemSuggestion: '消费冲动是大脑的多巴胺陷阱。冷却期过后，问问自己是否真的需要。',
    mergedTo: ''
  },
  {
    id: 'preset_03',
    content: '想学 Rust 写操作系统，虽然目前连 Rust 的所有权系统都没搞明白。',
    type: 'learning',
    dangerLevel: 4,
    status: 'observing',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() + 6 * 24 * 60 * 60 * 1000,
    systemSuggestion: '学习是好事，但贪多嚼不烂。确认这个技能是否和当前方向一致。',
    mergedTo: ''
  },
  {
    id: 'preset_04',
    content: '把记账 App 从 Vue 2 重构成 Vue 3 + TS + Pinia，顺便把 UI 换成 glassmorphism。',
    type: 'refactor',
    dangerLevel: 3,
    status: 'observing',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now(),
    systemSuggestion: '重构冲动是程序员的浪漫。记住：能工作的代码不一定需要重写。',
    mergedTo: ''
  },
  {
    id: 'preset_05',
    content: '为什么最近总是分心？是不是应该尝试一下番茄工作法 + 冥想结合的节奏？',
    type: 'review',
    dangerLevel: 1,
    status: 'observing',
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    systemSuggestion: '需要复盘的问题往往很重要。不要让它在忙碌中被遗忘。',
    mergedTo: ''
  }
]

export default PRESET_IDEAS
