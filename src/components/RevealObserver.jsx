import { useEffect } from 'react'
import { animateElement, enterFrames, useReducedMotion } from '../motion.js'

const seen = new WeakSet()
const selector = '.reveal, .section-heading, .book-heading, .faq-list, .form, .course-tabs, .course-stage'

function stagger(element) {
  if (element.classList.contains('course-tabs')) return 80
  if (element.classList.contains('course-stage')) return 160
  if (element.classList.contains('form')) return 80
  if (element.parentElement?.matches('.why-grid, .steps, .t-grid')) {
    return Math.min([...element.parentElement.children].indexOf(element), 2) * 80
  }
  return 0
}

export default function RevealObserver() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const elements = [...document.querySelectorAll(selector)]
    if (reduced || !window.IntersectionObserver) {
      elements.forEach((element) => {
        element.classList.remove('motion-pending')
        seen.add(element)
      })
      return
    }

    const animations = new Map()
    let observer
    const show = (element, animate = true) => {
      element.classList.remove('motion-pending')
      observer?.unobserve(element)
      if (seen.has(element)) return
      seen.add(element)
      if (!animate) return
      const animation = animateElement(element, enterFrames(), {
        duration: 400, delay: stagger(element), fill: 'backwards',
      })
      if (animation) {
        animations.set(element, animation)
        animation.onfinish = () => animations.delete(element)
      }
    }
    const focus = (event) => {
      const element = event.target.closest('.motion-pending')
      if (element) show(element, false)
      // A focused control must never wait behind an entrance animation.
      animations.forEach((animation, target) => {
        if (target.contains(event.target)) { animation.cancel(); animations.delete(target) }
      })
    }

    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) show(target) })
      }, { threshold: 0.1 })
      elements.forEach((element) => {
        if (seen.has(element)) return
        const rect = element.getBoundingClientRect()
        if (rect.top >= window.innerHeight || rect.bottom <= 0) element.classList.add('motion-pending')
        observer.observe(element)
      })
      document.addEventListener('focusin', focus)
    } catch {
      observer?.disconnect()
      elements.forEach((element) => element.classList.remove('motion-pending'))
    }

    return () => {
      observer?.disconnect()
      document.removeEventListener('focusin', focus)
      animations.forEach((animation) => animation.cancel())
      elements.forEach((element) => element.classList.remove('motion-pending'))
    }
  }, [reduced])

  return null
}
