import { useState } from 'react'

// 菜单展开收缩
export function useCollapsed (value = false) {
  return useState(value)
}
