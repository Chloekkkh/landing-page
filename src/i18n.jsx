import { createContext, useContext, useLayoutEffect, useState } from 'react'

// 双语字典：文案唯一来源（React 渲染直接取用，不再有 HTML 兜底 + 字典两处维护）
export const I18N = {
  "nav.home":{zh:"首页",en:"Home"},
  "nav.services":{zh:"我们的服务",en:"Our Services"},
  "nav.why":{zh:"师资力量",en:"Our Teachers"},
  "nav.process":{zh:"服务流程",en:"How It Works"},
  "nav.faq":{zh:"常见问题",en:"FAQ"},

  "hero.brand":{zh:"言传中文",en:"MandarinBridge"},
  "hero.tagline":{zh:"专注在华留学生在线定制辅导",en:"1-on-1 custom online tutoring for international students in China"},
  "hero.cta1":{zh:"预约 1 对 1 需求测评",en:"Book a Free Assessment"},
  "hero.cta2":{zh:"了解我们的服务",en:"Explore Our Services"},

  "svc.kicker":{zh:"我们的服务",en:"Our Services"},
  "svc.h2":{zh:"你的每一个中文难题，都有对应解法",en:"Every Mandarin challenge you face has a solution"},
  "svc1.title":{zh:"学业通关辅导",en:"Academic Success"},
  "svc1.sub":{zh:"作业 + 期中期末专项",en:"Homework + Mid/Final Exams"},
  "svc1.who":{zh:"适合：高校在读留学生，作业 / 考试有困难",en:"For: enrolled students struggling with coursework or exams"},
  "svc1.li1b":{zh:"作业打磨",en:"Homework polishing"},
  "svc1.li1s":{zh:"逐句修改作文论文，讲透为什么这么改",en:"Line-by-line editing, explaining every change"},
  "svc1.li2b":{zh:"考点梳理",en:"Key-point review"},
  "svc1.li2s":{zh:"按教材划核心考点、高频词语、必考句型",en:"Core points, high-frequency words, must-know patterns"},
  "svc1.li3b":{zh:"专项刷题",en:"Targeted practice"},
  "svc1.li3s":{zh:"错题逐道讲解，练到完全掌握",en:"Mistake-by-mistake review until mastered"},
  "svc2.title":{zh:"HSK 专项冲刺课",en:"HSK Sprint Course"},
  "svc2.sub":{zh:"听说读写逐项突破",en:"Speaking, listening, reading & writing"},
  "svc2.who":{zh:"适合：备考 HSK 1–6 级，想一次性过级",en:"For: HSK 1–6 candidates aiming to pass first try"},
  "svc2.li1b":{zh:"模考诊断",en:"Diagnostic mock"},
  "svc2.li1s":{zh:"精准定位薄弱题型：阅读 / 听力 / 写作 / 口语",en:"Pinpoint weak sections: reading / listening / writing / speaking"},
  "svc2.li2b":{zh:"仿真训练",en:"Realistic drills"},
  "svc2.li2s":{zh:"内部题库，难度与真实考试完全一致",en:"Internal question bank, identical difficulty to the real exam"},
  "svc2.li3b":{zh:"批改模板",en:"Feedback & templates"},
  "svc2.li3s":{zh:"口语逐音纠正、写作逐篇批改 + 答题模板",en:"Phoneme-level speaking correction, essay-by-essay feedback + answer templates"},
  "svc3.title":{zh:"生活文化中文课",en:"Life & Culture Chinese"},
  "svc3.sub":{zh:"日常交流 + 传统文化浸润",en:"Daily talk + cultural immersion"},
  "svc3.who":{zh:"适合：想适应在华日常、对传统文化感兴趣",en:"For: those adapting to daily life in China or into traditional culture"},
  "svc3.li1b":{zh:"生活场景全覆盖",en:"Full daily coverage"},
  "svc3.li1s":{zh:"出行、就医、办证件、租房，连 APP 操作一起讲",en:"Travel, medical, documents, rent — even app usage"},
  "svc3.li2b":{zh:"传统文化浸润",en:"Cultural immersion"},
  "svc3.li2s":{zh:"节日习俗、礼仪常识、饮食文化典故",en:"Festivals, etiquette, food-culture stories"},
  "svc3.li3b":{zh:"沉浸式对话",en:"Immersive dialogue"},
  "svc3.li3s":{zh:"模拟真实场景，当场纠正发音语调",en:"Simulated real scenes, instant pronunciation correction"},
  "svc4.title":{zh:"商务职场中文课",en:"Business Chinese"},
  "svc4.sub":{zh:"实习工作专属定制",en:"Custom for internship & work"},
  "svc4.who":{zh:"适合：在华实习、工作，需用中文处理职场事务",en:"For: interns/workers in China handling workplace tasks in Chinese"},
  "svc4.li1b":{zh:"职场场景定制",en:"Workplace scenarios"},
  "svc4.li1s":{zh:"会议、汇报、邮件、谈判、客户对接",en:"Meetings, reports, emails, negotiation, client comms"},
  "svc4.li2b":{zh:"职场表达优化",en:"Expression polish"},
  "svc4.li2s":{zh:"口语措辞 + 书面文案 + 礼貌用语",en:"Spoken wording + written copy + polite phrasing"},
  "svc4.li3b":{zh:"全真模拟演练",en:"Full simulation"},
  "svc4.li3s":{zh:"提前适应工作中的沟通节奏",en:"Pre-adapt to workplace communication rhythm"},
  "act.h3":{zh:"月度文化体验活动",en:"Monthly Cultural Events"},
  "act.tag":{zh:"边玩边学交朋友",en:"Learn & make friends"},
  "act.p":{zh:"每月 1 次周末线下聚会：茶艺、书法、传统美食、节日体验。全程鼓励中文交流，老师带队引导，也可中英双语——边玩边学文化知识，积累地道表达，拓展同圈朋友。",en:"One weekend offline gathering each month: tea ceremony, calligraphy, traditional food, festival experiences. Chinese is encouraged with teacher guidance and bilingual support — learn culture, pick up authentic expressions, expand your circle."},
  "act.note":{zh:"正式课学员可优先报名 · 部分活动免费参与",en:"Enrolled students get priority · some events free"},

  "why.cap":{zh:"师资力量",en:"Our Teachers"},
  "why.h2":{zh:"不做流水线课件<br>做你的专属中文老师",en:"No cookie-cutter slides —<br>your personal Chinese teacher"},
  "why1.h3":{zh:"名校师资 · 专业对口",en:"Top-University Faculty · Degree-Matched Majors"},
  "why1.l1s":{zh:"985高校硕博（QS前100）及以上学历",en:"Master's/PhD from 985 universities (QS Top 100) and above"},
  "why1.l2s":{zh:"主修汉语言文学、国际中文教育、语言学等对口核心专业",en:"Chinese Language & Literature, International Chinese Language Education, Linguistics and related fields"},
  "why1.l3s":{zh:"涵盖孔子学院、国家公派等一线教学经验教师",en:"Front-line teachers incl. Confucius Institute and state-sponsored programs"},
  "why2.h3":{zh:"定制教学 · 高效提升",en:"Custom Teaching · Efficient Progress"},
  "why2.l1":{zh:"拒绝流水线式课程，一对一学情定制",en:"No cookie-cutter courses — 1-on-1 lessons tailored to your needs"},
  "why2.l2":{zh:"精准攻克薄弱环节、挖掘学习潜能，高效不费力。",en:"Pinpoint weaknesses and unlock potential — progress without the grind."},
  "why3.h3":{zh:"灵活跟进 · 专属节奏",en:"Flexible Follow-up · Your Own Pace"},
  "why3.l1":{zh:"及时接收反馈，灵活调整课程内容、授课节奏。",en:"Prompt feedback — course content and pace adjust flexibly."},
  "why3.l2":{zh:"让每一节课都适配你，学有所获、稳步进阶。",en:"Every lesson fits you — learn more, progress steadily."},

  "proc.kicker":{zh:"服务流程",en:"How It Works"},
  "proc.h2":{zh:"从预约到上课，只需要 3 步",en:"From booking to class in just 3 steps"},
  "proc.s1h":{zh:"提交预约，对接专属客服",en:"Submit booking — connect with your dedicated consultant"},
  "proc.s2h":{zh:"沟通学习需求，设计专属课程",en:"Discuss your needs — get a course designed for you"},
  "proc.s3h":{zh:"线上授课，达成学习目标",en:"Learn online — hit your learning goals"},

  "voices.kicker":{zh:"学员反馈",en:"Student Voices"},
  "voices.h2":{zh:"和你一样的留学生，都在这里提升",en:"International students like you are improving here"},
  "v1.q":{zh:"“期中中文考试之前报了 10 节课，老师帮我划了重点，还出了很多模拟题，最后考了 <b>85 分</b>，比上次高了 20 分！老师讲得很细，语法点讲得特别明白。”",en:"“I booked 10 lessons before my midterm Chinese exam. My teacher highlighted key points and gave me lots of practice tests. I scored <b>85</b>, 20 points higher than last time! The teaching was detailed and grammar was explained clearly.”"},
  "v1.n":{zh:"金同学",en:"Jin"},
  "v1.s":{zh:"吉林大学 · 韩国留学生",en:"Jilin University · Korean student"},
  "v2.q":{zh:"“HSK4 级考了两次都没过，阅读总错。老师帮我分析了错题原因，教了很多做题技巧，练了一个月，最后阅读考了<b>满分</b>！真的很感谢老师。”",en:"“I failed HSK 4 twice, always missing reading questions. My teacher analyzed my mistakes and taught me many strategies. After a month of practice, I got a <b>perfect</b> reading score! Truly thankful.”"},
  "v2.n":{zh:"Anna",en:"Anna"},
  "v2.s":{zh:"南京师范大学 · 俄罗斯留学生",en:"Nanjing Normal University · Russian student"},
  "v3.q":{zh:"“每次写课程论文都头疼，老师逐句帮我改逻辑和表达，还教我学术用语怎么用。现在写作业快多了，老师也说我的作文<b>进步很大</b>。”",en:"“Writing course papers used to give me a headache. My teacher revised my logic and expression sentence by sentence and taught me academic vocabulary. I write much faster now, and my teacher says my essays have <b>improved a lot</b>.”"},
  "v3.n":{zh:"田中同学",en:"Tanaka"},
  "v3.s":{zh:"南京大学 · 日本留学生",en:"Nanjing University · Japanese student"},

  "faq.kicker":{zh:"常见问题",en:"FAQ"},
  "faq.h2":{zh:"你关心的问题",en:"Questions you care about"},
  "faq.q1":{zh:"上课使用什么软件？是否需要额外下载软件？",en:"What software do we use for lessons? Do I need to download anything extra?"},
  "faq.a1":{zh:"我们采用主流专业的Zoom平台线上授课，设备适配性强、操作简单流畅，电脑、手机均可登录使用，无需复杂安装调试。",en:"We teach online via Zoom, a mainstream professional platform. It's highly compatible and simple to use — available on computers and phones alike, with no complicated installation or setup."},
  "faq.q2":{zh:"中文课程如何安排？需要每天上课吗？",en:"How are Chinese lessons scheduled? Do I need to attend every day?"},
  "faq.a2":{zh:"课程时间高度灵活，适配留学生课业节奏与海外学生时区作息。支持自主预约课时，无需固定每日上课。结合成人学习规律，推荐每周2-3次常态化授课，兼顾学习效率与吸收效果，稳步提升中文应用能力。",en:"Our schedule is highly flexible, fitting international students' study rhythms and overseas time zones. You can book lessons on your own schedule — no fixed daily classes required. Following how adults learn best, we recommend 2–3 regular lessons per week to balance learning efficiency and retention, steadily building your Chinese skills."},
  "faq.q3":{zh:"零基础国际学生可以报名中文课程吗？",en:"Can complete beginners enroll in the Chinese course?"},
  "faq.a3":{zh:"可以。我们专为零基础、非中文母语的国际成人学生定制入门课程，无需中文基础。课程循序渐进，从拼音、基础词汇、日常交际句式切入，贴合留学生生活、课业及社交场景，帮助零基础学员快速建立中文语感、夯实语言基础。",en:"Yes. We offer a beginner course designed specifically for international adult students with no Chinese background — no prior knowledge needed. The course progresses step by step, starting from pinyin, basic vocabulary, and everyday sentence patterns, grounded in daily-life, academic, and social scenarios. It helps absolute beginners quickly build a feel for Chinese and lay a solid foundation."},
  "faq.q4":{zh:"授课老师具备专业资质吗？",en:"Are the teachers professionally qualified?"},
  "faq.a4":{zh:"师资团队均为985高校硕士及以上科班师资，主修国际中文教育、汉语言文学等对口专业，持有专业对外汉语教学资质。老师拥有丰富的留学生、国际成人学生授课经验，熟悉外籍学生的学习难点、语言思维差异，可精准因材施教，适配不同基础、不同学习目标的成人学员。",en:"Our teachers all hold master's degrees or higher from Project 985 universities, majoring in fields such as Teaching Chinese as a Foreign Language and Chinese Language & Literature, with professional TCSL qualifications. They have extensive experience teaching international and adult students, understand the difficulties and linguistic differences foreign learners face, and tailor their teaching to each student's level and goals."},
  "faq.q5":{zh:"海外国际学生不在中国，可以报名学习吗？",en:"I'm an international student outside China — can I still enroll?"},
  "faq.a5":{zh:"完全支持全球跨境授课。无论你是在华在读留学生，还是身处海外的国际成人学生，均可报名学习。针对海外学员，我们会精准匹配时差适配的国内资深中文教师，规避时差冲突，提供专属适配的线上教学服务，全球各地均可无缝上课。",en:"Absolutely — we fully support cross-border teaching worldwide. Whether you're an international student currently in China or an adult learner overseas, you can enroll. For overseas students, we carefully match you with an experienced China-based teacher in a compatible time zone to avoid scheduling conflicts, providing tailored online instruction — seamless lessons from anywhere in the world."},

  "book.ctaH2":{zh:"现在预约，免费定制你的中文提升方案",en:"Book now — get a free customized Mandarin plan"},
  "book.ctaP":{zh:"留下你的信息，24 小时内专属老师联系你",en:"Leave your info and your dedicated teacher will reach you within 24h"},
  "book.ctaBtn":{zh:"填写预约表单",en:"Fill in the booking form"},
  "book.kicker":{zh:"立即预约",en:"Book Now"},
  "book.h2":{zh:"告诉我们你的情况<br>定制你的学习方案",en:"Tell us about yourself —<br>get a plan designed for you"},
  "f.name":{zh:"姓名",en:"Full name"},
  "f.school":{zh:"学校 / 工作单位",en:"School / Company"},
  "f.contact":{zh:"联系方式",en:"Contact (WeChat / phone / email)"},
  "f.level":{zh:"中文水平",en:"Mandarin level"},
  "f.need":{zh:"主要需求",en:"Main need"},
  "f.note":{zh:"备注",en:"Notes"},
  "f.submit":{zh:"提交预约，24 小时内回复",en:"Submit booking — reply within 24h"},
  "f.okB":{zh:"已收到你的预约",en:"Booking received"},
  "f.okP":{zh:"专属老师将在 24 小时内联系你，请留意微信 / 电话 / 邮箱。",en:"Your teacher will contact you within 24h. Please watch your WeChat / phone / email."},
  "f.sending":{zh:"提交中…",en:"Sending…"},
  "f.err":{zh:"提交失败，请稍后重试，或直接添加微信 MandarinBridge001",en:"Submission failed — please try again, or add us on WeChat: MandarinBridge001"},
  "ph.name":{zh:"请填写你的姓名",en:"Your name"},
  "ph.school":{zh:"XX大学 / XX公司",en:"XX University / XX Company"},
  "ph.contact":{zh:"微信 / 电话 / 邮箱",en:"WeChat / phone / email"},
  "ph.note":{zh:"可以写你的具体问题（选填）",en:"Anything else? (optional)"},
  "lv.0":{zh:"零基础",en:"Beginner"},"lv.1":{zh:"初级",en:"Elementary"},"lv.2":{zh:"中级",en:"Intermediate"},"lv.3":{zh:"高级",en:"Advanced"},"lv.4":{zh:"HSK 备考",en:"HSK Prep"},
  "nd.0":{zh:"作业辅导",en:"Homework help"},"nd.1":{zh:"期中期末考",en:"Mid & final exams"},"nd.2":{zh:"HSK 备考",en:"HSK prep"},"nd.3":{zh:"日常交流",en:"Daily conversation"},"nd.4":{zh:"其他",en:"Other"},

  "foot.p":{zh:"让每一位在华留学生，都能自信开口说中文。作业、考试、HSK、生活，一站式中文辅导。",en:"Helping every international student in China speak Mandarin with confidence — homework, exams, HSK, daily life, all in one place."},
  "foot.srv":{zh:"服务",en:"Services"},
  "foot.s1":{zh:"学业通关辅导",en:"Academic Success"},
  "foot.s2":{zh:"HSK 专项冲刺",en:"HSK Sprint"},
  "foot.s3":{zh:"生活文化中文",en:"Life & Culture"},
  "foot.s4":{zh:"商务职场中文",en:"Business Chinese"},
  "foot.nav":{zh:"快速导航",en:"Quick Links"},
  "foot.contact":{zh:"联系我们",en:"Contact Us"},
  "foot.addr":{zh:"办公地址：高校合作点（初期）",en:"Office: campus partnership points (early stage)"},
  "foot.copy":{zh:"© 2026 言传中文 MandarinBridge · 保留所有权利",en:"© 2026 MandarinBridge · All rights reserved"},
  "foot.wechat":{zh:"微信：MandarinBridge001",en:"WeChat: MandarinBridge001"},
  "foot.email":{zh:"邮箱：hello@mandarinbridge.cn",en:"Email: hello@mandarinbridge.cn"}
}

const I18nContext = createContext({ lang: 'zh', setLang: () => {}, t: (k) => k })

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('mb_lang') || 'zh' } catch (e) { return 'zh' }
  })

  const setLang = (l) => {
    setLangState(l)
    try { localStorage.setItem('mb_lang', l) } catch (e) {}
  }

  useLayoutEffect(() => {
    document.documentElement.lang = (lang === 'en' ? 'en' : 'zh-CN')
  }, [lang])

  const t = (k) => (I18N[k] ? I18N[k][lang] : k)

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
