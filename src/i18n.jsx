import { createContext, useContext, useLayoutEffect, useState } from 'react'

// 双语字典：文案唯一来源（React 渲染直接取用，不再有 HTML 兜底 + 字典两处维护）
export const I18N = {
  'meta.title': { zh: '言传中文 · 在华留学生一对一中文辅导', en: 'MandarinBridge | Online Mandarin Tutoring for Students in China' },
  'meta.description': { zh: '言传中文面向在华留学生，提供学业辅导、HSK 备考、日常交际、职场中文与文化体验课程。预约免费需求沟通，1 个工作日内联系。', en: 'Academic, HSK, everyday, workplace and cultural Mandarin courses for international students in China. Free consultation; reply within one business day.' },

  'nav.home': { zh: '首页', en: 'Home' },
  'nav.services': { zh: '课程服务', en: 'Courses' },
  'nav.why': { zh: '师资与教学', en: 'Our Teachers' },
  'nav.process': { zh: '服务流程', en: 'How It Works' },
  'nav.faq': { zh: '常见问题', en: 'FAQ' },
  'nav.menu': { zh: '菜单', en: 'Menu' },
  'nav.label': { zh: '主导航', en: 'Main navigation' },
  'nav.language': { zh: '网站语言', en: 'Website language' },
  'nav.consultation': { zh: '免费需求沟通', en: 'Free Consultation' },

  'hero.brand': { zh: '言传中文', en: 'MandarinBridge' },
  'hero.tagline': { zh: '从课堂到生活，中文学习都有支持', en: 'Mandarin support for your studies and life in China.' },
  'hero.description': { zh: '为在华留学生提供一对一线上辅导，围绕课业、HSK 与日常交流，安排适合你的学习内容。', en: 'One-to-one online lessons for international students in China, tailored to coursework, HSK preparation and everyday conversations.' },
  'hero.cta1': { zh: '预约免费需求沟通', en: 'Book a Free Consultation' },
  'hero.cta2': { zh: '了解课程服务', en: 'Explore Our Courses' },
  'hero.response': { zh: '我们会在 1 个工作日内联系你。', en: 'Contact within one business day.' },
  'hero.photoAlt': { zh: '中文老师与国际留学生在校园中交流学习', en: 'A Mandarin tutor and international university students learning together on campus' },
  'hero.wavePause': { zh: '暂停声波动画', en: 'Pause wave animation' },
  'hero.wavePlay': { zh: '继续声波动画', en: 'Resume wave animation' },
  'hero.waveStatic': { zh: '静态声波', en: 'Static waveform' },

  'svc.kicker': { zh: '课程服务', en: 'Our Courses' },
  'svc.h2': { zh: '找到你现在需要的中文课', en: 'Find the Mandarin course you need now' },

  'svc1.title': { zh: '学业辅导课程', en: 'Academic Support' },
  'svc1.alt': { zh: '学业辅导课程 · 老师通过线上课堂讲解学习内容', en: 'Academic support: a Mandarin tutor reviewing coursework during an online lesson' },
  'svc1.sub': { zh: '写清自己的想法，弄懂课堂里的难点', en: 'Clearer writing. A stronger grasp of your coursework.' },
  'svc1.who': { zh: '适合：高校在读留学生', en: 'For international university students' },
  'svc1.li1b': { zh: '作文辅导', en: 'Writing support' },
  'svc1.li1s': { zh: '从选题构思到文字润色，拓展话题、补充文化素材，帮你把想法写清楚', en: 'Plan your topic, explore cultural examples and polish your writing so your ideas come through clearly' },
  'svc1.li2b': { zh: '作业答疑', en: 'Homework guidance' },
  'svc1.li2s': { zh: '结合你的作业回顾课堂内容，逐题讲清疑问与错误，巩固没学扎实的知识点', en: 'Bring your assignments. Work through questions, review recent lessons and strengthen the basics' },
  'svc1.li3b': { zh: '测验辅导', en: 'Test preparation' },
  'svc1.li3s': { zh: '针对薄弱题型安排系列练习，边练边讲，把解题思路和易错点弄明白', en: 'Practise the question types you find difficult, with clear explanations of methods and common mistakes' },

  'svc2.title': { zh: 'HSK备考课程', en: 'HSK Preparation' },
  'svc2.alt': { zh: 'HSK备考课程 · 词汇讲解与模拟练习', en: 'HSK preparation: vocabulary guidance and practice tasks' },
  'svc2.sub': { zh: '找准复习重点，练习更有方向', en: 'Know what to work on. Prepare with a plan.' },
  'svc2.who': { zh: '适合：备考 HSK 1–6 级的学习者', en: 'For learners preparing for HSK levels 1–6' },
  'svc2.li1b': { zh: '能力诊断', en: 'Skills review' },
  'svc2.li1s': { zh: '结合目标考试，找出听、读、写、说中需要加强的部分，明确复习重点', en: 'Review listening, reading, writing and speaking to identify what to focus on for your exam' },
  'svc2.li2b': { zh: '仿真训练', en: 'Exam-style practice' },
  'svc2.li2s': { zh: '使用内部题库，按目标考试的题型与难度做专项练习和模拟，熟悉答题节奏', en: 'Use our question bank for targeted drills and mock tests matched to your exam format and level' },
  'svc2.li3b': { zh: '人工批改', en: 'Teacher feedback' },
  'svc2.li3s': { zh: '纠正发音与声调，逐篇批改写作，结合答题框架与示例讲清改进方法', en: 'Get detailed pronunciation feedback, corrections on each essay and guidance on structuring answers' },

  'svc3.title': { zh: '日常交际课程', en: 'Everyday Communication' },
  'svc3.alt': { zh: '日常交际课程 · 课堂文化话题交流', en: 'Everyday communication: learners discussing Chinese culture in class' },
  'svc3.sub': { zh: '学会日常表达，了解中国文化', en: 'Useful Mandarin for life and conversation.' },
  'svc3.who': { zh: '适合：想更自在地在中国生活，或对中国文化感兴趣的你', en: 'For learners interested in everyday life and culture in China' },
  'svc3.li1b': { zh: '在华生活讲解', en: 'Everyday life in China' },
  'svc3.li1s': { zh: '出行、就医、办证、租房，常用表达、办事流程和 App 操作一起学', en: 'Learn what to say and how things work, from transport and renting to medical visits, paperwork and local apps' },
  'svc3.li2b': { zh: '中华文化讲解', en: 'Understanding Chinese culture' },
  'svc3.li2s': { zh: '聊节日习俗、日常礼仪和饮食典故，了解文化背景，也为日常交流积累话题', en: 'Explore festivals, etiquette and food stories, and build cultural understanding and conversation topics' },

  'svc4.title': { zh: '职场中文课程', en: 'Workplace Mandarin' },
  'svc4.alt': { zh: '职场中文课程 · 会议情景对话练习', en: 'Workplace Mandarin: practising conversations in a meeting setting' },
  'svc4.sub': { zh: '把工作说清楚，把优势表达出来', en: 'Communicate at work. Show your strengths.' },
  'svc4.who': { zh: '适合：准备在华求职、实习或工作的学习者', en: 'For learners looking for a job, interning or working in China' },
  'svc4.li1b': { zh: '办公沟通', en: 'Workplace communication' },
  'svc4.li1s': { zh: '会议、汇报、邮件、客户对接，结合实际场景练习，把事情说清楚、说得体', en: 'Practise clear, appropriate Mandarin for meetings, presentations, emails and client conversations' },
  'svc4.li2b': { zh: '中文简历辅导', en: 'Chinese CV support' },
  'svc4.li2s': { zh: '梳理经历、提炼优势，调整中文简历的结构与措辞，让你的能力更容易被看见', en: 'Shape your experience into a clear Chinese CV, with structure and wording that highlight your strengths' },

  'act.h3': { zh: '文化体验课程', en: 'Cultural Experiences' },
  'act.alt': { zh: '文化体验课程 · 茶艺与传统美食体验', en: 'Cultural experiences: exploring tea and traditional food' },
  'act.tag': { zh: '一起体验文化，自然聊起中文', en: 'Explore culture. Connect through Mandarin.' },
  'act.scenesLabel': { zh: '体验场景', en: 'What you can explore' },
  'act.scenes': { zh: '茶艺、书法、美食、麻将、象棋；在线汉语角还可以一起玩游戏、聊电影', en: 'Tea, calligraphy, food, mahjong and Chinese chess, plus online Mandarin corners with games and film discussions' },
  'act.gainsLabel': { zh: '你的收获', en: 'What you take away' },
  'act.gains': { zh: '一边体验、一边交流，了解文化、积累地道表达，也认识有共同兴趣的新朋友', en: 'Discover culture hands-on, practise natural Mandarin and meet people who share your interests' },

  'why.cap': { zh: '师资力量', en: 'Our Teachers' },
  'why.h2': { zh: '围绕你的目标<br>安排每一节中文课', en: 'Your goals shape<br>every Mandarin lesson' },

  'why1.h3': { zh: '专业背景 · 教学经验', en: 'Specialist teaching experience' },
  'why1.l1s': { zh: '硕士及以上学历，专业背景涵盖国际中文教育、汉语言文学及语言学', en: 'Master\'s and doctoral qualifications in Chinese language education, Chinese language and literature, and linguistics' },
  'why1.l2s': { zh: '熟悉留学生在语法、表达与学术中文方面的常见难点', en: 'Experience supporting international students with grammar, communication and academic Mandarin' },
  'why1.l3s': { zh: '团队包含拥有孔子学院及国家公派教学经历的教师', en: 'The team includes teachers with Confucius Institute and state-sponsored teaching experience' },

  'why2.h3': { zh: '结合教材 · 针对难点', en: 'Lessons built around your needs' },
  'why2.l1': { zh: '结合你的教材、作业和学习目标准备课程内容', en: 'Lessons draw on your course materials, assignments and learning goals' },
  'why2.l2': { zh: '讲清难点，安排重点练习，把时间用在需要提升的地方', en: 'Clear explanations and focused practice help you work on what matters most' },

  'why3.h3': { zh: '持续反馈 · 调整节奏', en: 'A pace that adapts' },
  'why3.l1': { zh: '根据课堂表现与课后反馈，调整课程内容和练习重点', en: 'Your progress and feedback help shape upcoming lessons and practice' },
  'why3.l2': { zh: '结合课业与时间安排，讨论适合你的学习节奏', en: 'Agree a learning pace that fits your studies and schedule' },

  'proc.kicker': { zh: '服务流程', en: 'How It Works' },
  'proc.h2': { zh: '从需求沟通到一对一上课', en: 'A clear path to your first lesson' },
  'proc.s1h': { zh: '提交学习需求', en: 'Share your goals' },
  'proc.s1p': { zh: '留下联系方式，我们会在 1 个工作日内联系你。', en: 'Leave your contact details. We\'ll get in touch within one business day.' },
  'proc.s2h': { zh: '免费沟通，讨论方案', en: 'Talk through your needs' },
  'proc.s2p': { zh: '了解当前水平、学习目标与时间安排，讨论适合的课程。', en: 'Discuss your current level, learning goals and availability in a free consultation.' },
  'proc.s3h': { zh: '确认安排，开始上课', en: 'Agree a plan and start learning' },
  'proc.s3p': { zh: '确认后续课程与授课时间，再开始一对一线上学习。', en: 'Confirm your course and lesson times, then begin learning one to one online.' },

  'voices.kicker': { zh: '学员反馈', en: 'Student Voices' },
  'voices.h2': { zh: '看看学员经历了哪些进步', en: 'Progress in our students’ own words' },

  'v1.q': { zh: '“期中中文考试之前报了 10 节课，老师帮我划了重点，还出了很多模拟题，最后考了 <b>85 分</b>，比上次高了 20 分！老师讲得很细，语法点讲得特别明白。”', en: '“I booked 10 lessons before my midterm Chinese exam. My teacher highlighted key points and gave me lots of practice tests. I scored <b>85</b>, 20 points higher than last time! The teaching was detailed and grammar was explained clearly.”' },
  'v1.n': { zh: '金同学', en: 'Jin' },
  'v1.s': { zh: '吉林大学 · 韩国留学生', en: 'Jilin University · Korean student' },

  'v2.q': { zh: '“HSK4 级考了两次都没过，阅读总错。老师帮我分析了错题原因，教了很多做题技巧，练了一个月，最后阅读考了<b>满分</b>！真的很感谢老师。”', en: '“I failed HSK 4 twice, always missing reading questions. My teacher analyzed my mistakes and taught me many strategies. After a month of practice, I got a <b>perfect</b> reading score! Truly thankful.”' },
  'v2.n': { zh: 'Anna', en: 'Anna' },
  'v2.s': { zh: '南京师范大学 · 俄罗斯留学生', en: 'Nanjing Normal University · Russian student' },

  'v3.q': { zh: '“每次写课程论文都头疼，老师逐句帮我改逻辑和表达，还教我学术用语怎么用。现在写作业快多了，老师也说我的作文<b>进步很大</b>。”', en: '“Writing course papers used to give me a headache. My teacher revised my logic and expression sentence by sentence and taught me academic vocabulary. I write much faster now, and my teacher says my essays have <b>improved a lot</b>.”' },
  'v3.n': { zh: '田中同学', en: 'Tanaka' },
  'v3.s': { zh: '南京大学 · 日本留学生', en: 'Nanjing University · Japanese student' },

  'faq.kicker': { zh: '常见问题', en: 'FAQ' },
  'faq.h2': { zh: '开始之前，你可能想了解', en: 'Your questions, answered' },
  'faq.q1': { zh: '课程在哪里进行？', en: 'Where do lessons take place?' },
  'faq.a1': { zh: '课程通过 Zoom 在线进行，电脑或手机均可参加。', en: 'Lessons take place online via Zoom. You can join from a computer or phone.' },
  'faq.q2': { zh: '需要每天上课吗？', en: 'Do I need to take lessons every day?' },
  'faq.a2': { zh: '不需要。你可以结合课业或工作安排预约课程，具体时间与频率在需求沟通时商定。', en: 'No. Lesson times and frequency are agreed during the consultation to fit your studies or work schedule.' },
  'faq.q3': { zh: '零基础可以报名吗？', en: 'Can complete beginners join?' },
  'faq.a3': { zh: '可以。课程可以从拼音、基础词汇和日常对话开始，再结合你的学习目标安排后续内容。', en: 'Yes. Lessons can start with pinyin, essential vocabulary and everyday conversations, then build towards your goals.' },
  'faq.q4': { zh: '老师有哪些教学背景？', en: 'What teaching backgrounds do your teachers have?' },
  'faq.a4': { zh: '教师具有国际中文教育、汉语言文学、语言学等相关专业背景，并有留学生和国际成人教学经验。课程会结合你的水平与目标安排。', en: 'Our teachers have backgrounds in Chinese language education, Chinese language and literature, or linguistics, with experience teaching international students and adult learners.' },
  'faq.q5': { zh: '不在中国，也可以上课吗？', en: 'Can I take lessons from outside China?' },
  'faq.a5': { zh: '可以。课程在线进行，海外学员也可报名。请在沟通时说明所在时区，以便确认双方适合的上课时间。', en: 'Yes. Our online lessons are also available to learners outside China. Share your time zone during the consultation so we can agree suitable lesson times.' },
  'faq.q6': { zh: '首次免费沟通包含什么？', en: 'What does the free consultation include?' },
  'faq.a6': { zh: '首次沟通用于了解你的学习目标、当前水平与时间安排，并讨论后续课程。提交预约后，我们会在 1 个工作日内联系你。', en: 'The free consultation is a conversation about your goals, current Mandarin level and availability, followed by a discussion of suitable lessons. We\'ll contact you within one business day of your request.' },

  'book.ctaH2': { zh: '聊聊你的目标，找到适合的中文课', en: 'Let\'s find the Mandarin lessons that fit you' },
  'book.ctaP': { zh: '提交后，我们会在 1 个工作日内联系你，了解学习目标与当前水平。', en: 'We\'ll contact you within one business day to discuss your learning goals and current Mandarin level.' },
  'book.ctaBtn': { zh: '预约免费需求沟通', en: 'Book a Free Consultation' },
  'book.kicker': { zh: '免费需求沟通', en: 'Free Consultation' },
  'book.h2': { zh: '告诉我们你的学习目标<br>一起安排下一步', en: 'Tell us your learning goals.<br>Let\'s plan your next step.' },
  'book.intro': { zh: '首次沟通免费，用于了解需求并讨论后续课程安排。', en: 'The initial consultation is free. We\'ll discuss your needs and explain the next steps for lessons.' },

  'f.name': { zh: '姓名', en: 'Name' },
  'f.school': { zh: '学校 / 工作单位', en: 'School / Company' },
  'f.contact': { zh: '联系方式（微信 / 电话 / 邮箱）', en: 'Contact (WeChat / phone / email)' },
  'f.level': { zh: '中文水平', en: 'Mandarin level' },
  'f.need': { zh: '主要学习目标', en: 'Main learning goal' },
  'f.note': { zh: '补充说明（选填）', en: 'Notes (optional)' },
  'f.submit': { zh: '提交预约', en: 'Request a Free Consultation' },
  'f.okB': { zh: '预约已收到', en: 'Your request has been received' },
  'f.okP': { zh: '我们会在 1 个工作日内，通过你留下的联系方式与你沟通学习需求。', en: 'We\'ll contact you within one business day using the details you provided to discuss your learning needs.' },
  'f.sending': { zh: '提交中…', en: 'Sending…' },
  'f.err': { zh: '提交失败，请稍后重试，或直接添加微信 MandarinBridge001', en: 'Submission failed — please try again, or add us on WeChat: MandarinBridge001' },

  'ph.name': { zh: '你的姓名', en: 'Your name' },
  'ph.school': { zh: '填写学校或工作单位名称', en: 'Your university or workplace' },
  'ph.contact': { zh: '微信 / 电话 / 邮箱', en: 'WeChat / phone / email' },
  'ph.note': { zh: '例如：目前遇到的难点、目标或方便上课的时间', en: 'For example: current challenges, goals or preferred lesson times' },

  'lv.0': { zh: '零基础', en: 'Beginner' },
  'lv.1': { zh: '初级', en: 'Elementary' },
  'lv.2': { zh: '中级', en: 'Intermediate' },
  'lv.3': { zh: '高级', en: 'Advanced' },
  'lv.4': { zh: '不确定', en: 'Not sure' },

  'nd.0': { zh: '学业辅导', en: 'Academic support' },
  'nd.1': { zh: 'HSK 备考', en: 'HSK preparation' },
  'nd.2': { zh: '日常交际', en: 'Everyday communication' },
  'nd.3': { zh: '职场中文 / 简历辅导', en: 'Workplace Mandarin / CV support' },
  'nd.4': { zh: '文化体验', en: 'Cultural experiences' },
  'nd.5': { zh: '其他', en: 'Other' },

  'foot.p': { zh: '为在华留学生提供一对一线上中文辅导，支持课业、考试与日常交流。', en: 'One-to-one online Mandarin lessons for international students in China, with support for coursework, exams and everyday conversations.' },
  'foot.srv': { zh: '服务', en: 'Services' },
  'foot.s1': { zh: '学业辅导课程', en: 'Academic Support' },
  'foot.s2': { zh: 'HSK备考课程', en: 'HSK Preparation' },
  'foot.s3': { zh: '日常交际课程', en: 'Everyday Communication' },
  'foot.s4': { zh: '职场中文课程', en: 'Workplace Mandarin' },
  'foot.s5': { zh: '文化体验课程', en: 'Cultural Experiences' },
  'foot.nav': { zh: '快速导航', en: 'Quick Links' },
  'foot.contact': { zh: '联系我们', en: 'Contact Us' },
  'foot.copy': { zh: '© 2026 言传中文 MandarinBridge · 保留所有权利', en: '© 2026 MandarinBridge · All rights reserved' },
  'foot.wechat': { zh: '微信：MandarinBridge001', en: 'WeChat: MandarinBridge001' },
  'foot.email': { zh: '邮箱：hello@mandarinbridge.cn', en: 'Email: hello@mandarinbridge.cn' }
}

const I18nContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k })

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('mb_lang')
      return saved === 'zh' || saved === 'en' ? saved : 'en'
    } catch { return 'en' }
  })

  const setLang = (l) => {
    setLangState(l)
    try { localStorage.setItem('mb_lang', l) } catch (e) {}
  }

  useLayoutEffect(() => {
    document.documentElement.lang = (lang === 'en' ? 'en' : 'zh-CN')
    const language = lang === 'en' ? 'en' : 'zh'
    document.title = I18N['meta.title'][language]
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = I18N['meta.description'][language]
  }, [lang])

  const t = (k) => (I18N[k] ? I18N[k][lang] : k)

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
