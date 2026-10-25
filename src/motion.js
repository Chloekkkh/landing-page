import { useSyncExternalStore } from 'react'

const query = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null

const subscribe = (listener) => {
  query?.addEventListener('change', listener)
  return () => query?.removeEventListener('change', listener)
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => query?.matches ?? true, () => true)
}

export const motionEase = 'cubic-bezier(.22, .61, .36, 1)'

// Native animations are progressive enhancement: failed setup leaves the content visible.
export function animateElement(element, frames, options) {
  if (!element?.animate) return null
  try {
    return element.animate(frames, { easing: motionEase, ...options })
  } catch {
    return null
  }
}

export const enterFrames = (distance = 12) => [
  { opacity: 0, transform: 'translateY(' + distance + 'px)' },
  { opacity: 1, transform: 'translateY(0)' },
]
