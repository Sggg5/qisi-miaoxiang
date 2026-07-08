# 数据结构文档

## 概述

所有数据存储在浏览器 `localStorage` 中，键名为 `qisi-miaoxiang-ideas`，值为 JSON 字符串数组。

## Idea（想法）对象

```typescript
interface Idea {
  /** 唯一标识，格式：idea_{时间戳}_{随机字符串} */
  id: string

  /** 想法内容 */
  content: string

  /** 想法类型 */
  type: IdeaType

  /** 危险等级 1～5 */
  dangerLevel: 1 | 2 | 3 | 4 | 5

  /** 当前状态 */
  status: IdeaStatus

  /** 收容时间（创建时间），Unix 毫秒时间戳 */
  createdAt: number

  /** 释放日期，Unix 毫秒时间戳 */
  releasedAt: number

  /** 系统建议 */
  systemSuggestion: string

  /** 合并目标名称（仅当 status 为 merged 时有值） */
  mergedTo: string
}
```

## IdeaType（想法类型）

| 枚举值 | 中文标签 | 说明 |
|--------|----------|------|
| `new-project` | 新项目冲动 | 想做新项目的冲动 |
| `buying` | 买东西冲动 | 消费冲动 |
| `learning` | 学习冲动 | 想学新东西 |
| `refactor` | 重构冲动 | 想重构现有代码 |
| `research` | 查资料冲动 | 想查某类资料 |
| `redirect` | 换方向冲动 | 想换个方向 |
| `creative` | 创意灵感 | 纯创意类 |
| `review` | 待复盘问题 | 需要回顾的问题 |

## IdeaStatus（状态）

| 枚举值 | 中文标签 | 说明 |
|--------|----------|------|
| `observing` | 观察中 | 刚收录，正在冷却 |
| `releasable` | 可释放 | 冷却期结束，可操作 |
| `released` | 已释放 | 释放成项目 |
| `archived` | 已归档 | 归档为废案 |
| `merged` | 已合并 | 合并到已有项目 |

## DangerLevel（危险等级）与冷却时间

| 等级 | 标签 | 冷却时间 |
|------|------|----------|
| 1 | 小冲动 | 1 天 |
| 2 | 有点想 | 2 天 |
| 3 | 认真考虑 | 3 天 |
| 4 | 非常想 | 7 天 |
| 5 | 立刻行动！ | 14 天 |

## 系统建议映射

每种类型有对应的系统建议文案，存储在 `TYPE_SUGGESTIONS` 常量中。后续可接入 AI 根据内容动态生成建议。

## 预设示例

首次启动时如果 localStorage 为空，会自动写入 5 条预设示例想法，方便用户快速体验。预设 ID 以 `preset_` 为前缀。
