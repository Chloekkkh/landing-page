import { useRef, useState } from 'react'
import {
  BookOpen, Briefcase, ChartBar, ChatCircle, Coffee, FileText,
  GraduationCap, PencilSimple, Target, Users, SpeakerHigh,
} from '@phosphor-icons/react'
import { useI18n } from '../i18n.jsx'
import useCourseMotion from '../useCourseMotion.js'

const COURSES = [
  { img: '/assets/academic-tutor.webp', alt: 'svc1.alt', title: 'svc1.title', sub: 'svc1.sub', who: 'svc1.who', icon: GraduationCap, theme: 'lilac',
    items: [['svc1.li1b', 'svc1.li1s', PencilSimple], ['svc1.li2b', 'svc1.li2s', FileText], ['svc1.li3b', 'svc1.li3s', ChartBar]] },
  { img: '/assets/carousel/svc2.png', alt: 'svc2.alt', title: 'svc2.title', sub: 'svc2.sub', who: 'svc2.who', icon: BookOpen, theme: 'lime',
    items: [['svc2.li1b', 'svc2.li1s', Target], ['svc2.li2b', 'svc2.li2s', BookOpen], ['svc2.li3b', 'svc2.li3s', SpeakerHigh]] },
  { img: '/assets/carousel/svc3.png', alt: 'svc3.alt', title: 'svc3.title', sub: 'svc3.sub', who: 'svc3.who', icon: ChatCircle, theme: 'yellow',
    items: [['svc3.li1b', 'svc3.li1s', ChatCircle], ['svc3.li2b', 'svc3.li2s', BookOpen]] },
  { img: '/assets/carousel/svc4.png', alt: 'svc4.alt', title: 'svc4.title', sub: 'svc4.sub', who: 'svc4.who', icon: Briefcase, theme: 'lilac',
    items: [['svc4.li1b', 'svc4.li1s', Briefcase], ['svc4.li2b', 'svc4.li2s', FileText]] },
  { img: '/assets/carousel/svc5.png', alt: 'act.alt', title: 'act.h3', sub: 'act.tag', icon: Coffee, theme: 'lime',
    items: [['act.scenesLabel', 'act.scenes', Coffee], ['act.gainsLabel', 'act.gains', Users]] },
]

export default function Services() {
  const { t, lang } = useI18n()
  const [current, setCurrent] = useState(0)
  const tabsRef = useRef([])
  const course = COURSES[current]
  const { stageRef, photoRef, onImageLoad } = useCourseMotion(current, lang)

  const onTabKeyDown = (event, index) => {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % COURSES.length
    if (event.key === 'ArrowLeft') next = (index - 1 + COURSES.length) % COURSES.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = COURSES.length - 1
    if (next === undefined) return
    event.preventDefault()
    setCurrent(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <section id="services" className="courses-section">
      <div className="page-wrap">
        <div className="section-heading">
          <span className="kicker">{t('svc.kicker')}</span>
          <h2>{t('svc.h2')}</h2>
        </div>
        <div className="course-tabs" role="tablist" aria-label={t('svc.kicker')}>
          {COURSES.map(({ title, icon: Icon, theme }, index) => (
            <button key={title} ref={(node) => { tabsRef.current[index] = node }}
              id={'course-tab-' + index} type="button" role="tab" data-course-theme={theme}
              aria-selected={current === index} aria-controls={'course-panel-' + index}
              tabIndex={current === index ? 0 : -1}
              className={'course-tab' + (current === index ? ' active' : '')}
              onClick={() => setCurrent(index)} onKeyDown={(event) => onTabKeyDown(event, index)}>
              <Icon size={44} weight="light" aria-hidden="true" />
              <span>{t(title)}</span>
            </button>
          ))}
        </div>
        <div className="course-stage" ref={stageRef}>
          {COURSES.map((item, index) => (
          <article key={item.title} id={'course-panel-' + index} role="tabpanel"
            aria-labelledby={'course-tab-' + index} hidden={current !== index}
            tabIndex={0} className="course-panel" data-course={index + 1} data-course-theme={item.theme}>
            {current === index && <>
              <div className="course-copy">
                <span className="course-number">{String(current + 1).padStart(2, '0')} / 05</span>
                <h3>{t(course.title)}</h3>
                <p className="course-subtitle">{t(course.sub)}</p>
                {course.who && <p className="course-audience">{t(course.who)}</p>}
                <ul className="course-features">
                  {course.items.map(([heading, body, Icon]) => (
                    <li key={heading}>
                      <Icon size={44} weight="light" aria-hidden="true" />
                      <div><h4>{t(heading)}</h4><p>{t(body)}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <img ref={photoRef} className="course-photo" src={course.img} alt={t(course.alt)} width="900" height="1020" loading="lazy" onLoad={onImageLoad} />
            </>}
          </article>
          ))}
        </div>
      </div>
    </section>
  )
}
