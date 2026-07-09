const PRESET_IDEAS = [
  {
    id: 'preset_01',
    content: '想做一个用键盘敲击声生成音乐的 Chrome 插件，每次打字都是一段旋律。',
    status: 'ready',
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() - 3 * 24 * 60 * 60 * 1000
  },
  {
    id: 'preset_02',
    content: '想买一把 HHKB 静电容键盘，虽然现在的键盘还能用。',
    status: 'cooling',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() + 5 * 24 * 60 * 60 * 1000
  },
  {
    id: 'preset_03',
    content: '想学 Rust 写操作系统，虽然目前连所有权系统都没搞明白。',
    status: 'cooling',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() + 6 * 24 * 60 * 60 * 1000
  },
  {
    id: 'preset_04',
    content: '把记账 App 从 Vue 2 重构成 Vue 3 + TS，顺便换个 UI。',
    status: 'archived',
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() - 13 * 24 * 60 * 60 * 1000
  },
  {
    id: 'preset_05',
    content: '为什么最近总是分心？试试番茄工作法 + 冥想的组合。',
    status: 'released',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    releasedAt: Date.now() - 8 * 24 * 60 * 60 * 1000
  }
]

export default PRESET_IDEAS
