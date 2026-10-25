import { useLayoutEffect, useRef } from 'react'
import { animateElement, useReducedMotion } from './motion.js'

export default function useCourseMotion(current, lang) {
  const reduced = useReducedMotion()
  const stageRef = useRef(null)
  const photoRef = useRef(null)
  const previousCourse = useRef(null)
  const previousHeight = useRef(null)
  const heightAnimation = useRef(null)
  const contentAnimations = useRef([])
  const animatedImages = useRef(new WeakSet())

  const revealImage = (image) => {
    if (reduced || !image || image !== photoRef.current || !image.complete || !image.naturalWidth || animatedImages.current.has(image)) return
    animatedImages.current.add(image)
    const animation = animateElement(image, [{ opacity: 0.92 }, { opacity: 1 }], { duration: 140 })
    if (animation) contentAnimations.current.push(animation)
  }

  useLayoutEffect(() => {
    const stage = stageRef.current
    const panel = stage?.querySelector('.course-panel:not([hidden])')
    if (!panel) return
    const targetHeight = panel.getBoundingClientRect().height
    const fromHeight = previousHeight.current ?? targetHeight
    const changed = previousCourse.current !== null && previousCourse.current !== current
    previousCourse.current = current
    previousHeight.current = targetHeight

    if (changed && !reduced) {
      if (Math.abs(targetHeight - fromHeight) > 1) {
        const resize = animateElement(stage, [{ height: fromHeight + 'px' }, { height: targetHeight + 'px' }], { duration: 240 })
        if (resize) {
          heightAnimation.current = resize
          stage.dataset.resizing = 'true'
          resize.onfinish = () => {
            if (heightAnimation.current !== resize) return
            heightAnimation.current = null
            delete stage.dataset.resizing
          }
        }
      }
      revealImage(photoRef.current)
    }

    // Update the next transition's starting height after a viewport or content resize.
    const resize = () => {
      const height = panel.getBoundingClientRect().height
      if (Math.abs(height - previousHeight.current) <= 1) return
      heightAnimation.current?.cancel()
      heightAnimation.current = null
      delete stage.dataset.resizing
      previousHeight.current = height
    }
    let observer
    if (window.ResizeObserver) {
      observer = new ResizeObserver(resize)
      observer.observe(panel)
    } else {
      window.addEventListener('resize', resize)
    }

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      if (heightAnimation.current) previousHeight.current = stage.getBoundingClientRect().height
      heightAnimation.current?.cancel()
      heightAnimation.current = null
      delete stage.dataset.resizing
      contentAnimations.current.forEach((animation) => animation.cancel())
      contentAnimations.current = []
    }
  }, [current, lang, reduced])

  return { stageRef, photoRef, onImageLoad: (event) => revealImage(event.currentTarget) }
}
