import { useState, useEffect, useRef } from 'react'

// テスト用: 毎回アニメーションを表示
export function useFirstVisit() {
  return { isFirstVisit: true, isLoading: false }
} 