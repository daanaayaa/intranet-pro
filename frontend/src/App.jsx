import { useState, useEffect, useRef } from 'react'
import './index.css'

import { ContentProvider, useContent } from './context/ContentContext'
import { AuthProvider, useAuth } from './context/AuthContext'

import { TopBar } from './components/TopBar'
import { NavBar } from './components/NavBar'
import { BackToTop } from './components/BackToTop'
import { Footer } from './components/Footer'

import { Hero } from './components/Home/Hero'
import { StatsBar } from './components/Home/StatsBar'
import { QuickNav } from './components/Home/QuickNav'
import { Announcement } from './components/Home/Announcement'
import { DigitalServices } from './components/Home/DigitalServices'
import { DigitalServicePage } from './components/Home/DigitalServicePage'
import { AnnouncementTreePage } from './components/Home/AnnouncementTreePage'
import { NSystem } from './components/Home/NSystem'
import { OnCall } from './components/Home/OnCall'
import { Promo } from './components/Home/Promo'
import { ContactCard } from './components/Home/ContactCard'
import { QualityCenter } from './components/Home/QualityCenter'
import { QualityDetailPage } from './components/Home/QualityDetailPage'
import { PartnerList } from './components/Home/PartnerList'
import { PartnerDetailPage } from './components/Home/Partnerdetailpage'
import { ExpandableCards } from './components/Home/ExpandableCards'
import { GenericListSection } from './components/Home/GenericListSection'
import { GenericGridSection } from './components/Home/GenericGridSection'
import { GenericExpandableSection } from './components/Home/GenericExpandableSection'
import { DivisionGrid } from './components/Division/DivisionGrid'
import { ReportGrid } from './components/Report/Reportgrid'
import { DoctorSchedulePage } from './components/Home/DoctorSchedulePage'
import { RequestGrid } from './components/Online/Requestgrid'
import { AdminLayout } from './components/Admin/AdminLayout'
import { SetupPasswordPage } from './components/Auth/SetupPasswordPage'

const STORAGE_KEY = 'intranet:last-page'

function loadStoredPage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        page: 'home',
        selectedDivisionId: null,
        selectedReportId: null,
        selectedPartnerName: null,
        selectedServiceLabel: null,
        selectedQualityLabel: null,
        selectedNewsTitle: null,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      page: parsed.page || 'home',
      selectedDivisionId: parsed.selectedDivisionId ?? null,
      selectedReportId: parsed.selectedReportId ?? null,
      selectedPartnerName: parsed.selectedPartnerName ?? null,
      selectedServiceLabel: parsed.selectedServiceLabel ?? null,
      selectedQualityLabel: parsed.selectedQualityLabel ?? null,
      selectedNewsTitle: parsed.selectedNewsTitle ?? null,
    }
  } catch {
    return {
      page: 'home',
      selectedDivisionId: null,
      selectedReportId: null,
      selectedPartnerName: null,
      selectedServiceLabel: null,
      selectedQualityLabel: null,
      selectedNewsTitle: null,
    }
  }
}

function renderCustomSection(s) {
  if (s.template === 'grid') return <GenericGridSection section={s} />
  if (s.template === 'expandable') return <GenericExpandableSection section={s} />
  return <GenericListSection section={s} />
}

// ------------------------------------------------------------------
// LoadingScreen
// แสดงระหว่างรอโหลดข้อมูลจริงจาก Neon (ContentContext: isLoading)
// กันไม่ให้ค่าเริ่มต้น (DEFAULT_CONTENT ซึ่งมีรูป asset เก่าฝังอยู่)
// โผล่ขึ้นมาก่อนแล้วค่อยถูกสลับเป็นข้อมูลจริงทีหลัง (อาการ "กระพริบ")
// ------------------------------------------------------------------
function LoadingScreen() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-paper">
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-navy-900/15 border-t-navy-900" />
      <p className="text-[12.5px] font-semibold text-ink-soft">กำลังโหลดข้อมูล...</p>
    </div>
  )
}

const scrollToSectionRef = { current: () => {} }

function AppInner() {
  const { content, customSections, isLoading } = useContent()
  const { isAuthenticated } = useAuth()

  const initial = loadStoredPage()
  const [page, setPage] = useState(initial.page) // 'home' | 'division' | 'report' | 'doctor' | 'online' | 'partner' | 'quality' | 'admin'
  const [activeSection, setActiveSection] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDivisionId, setSelectedDivisionId] = useState(initial.selectedDivisionId)
  const [selectedReportId, setSelectedReportId] = useState(initial.selectedReportId)
  const [selectedPartnerName, setSelectedPartnerName] = useState(initial.selectedPartnerName)
  const [selectedServiceLabel, setSelectedServiceLabel] = useState(initial.selectedServiceLabel)
  const [selectedNewsTitle, setSelectedNewsTitle] = useState(initial.selectedNewsTitle)
  const [selectedQualityLabel, setSelectedQualityLabel] = useState(initial.selectedQualityLabel)
  const [pendingScrollId, setPendingScrollId] = useState(null)
  const quicknavRef = useRef(null)

  // จำหน้าล่าสุดไว้ใน sessionStorage เผื่อรีเฟรชหน้า (ยกเว้นหน้า admin จะไม่จำไว้
  // เพื่อไม่ให้ค้างอยู่หน้า admin ถ้า session การ login หมดอายุไปแล้วตอนรีเฟรช)
  // สำคัญ: ต้องจำ selectedServiceLabel / selectedQualityLabel / selectedNewsTitle ไว้ด้วย
  // ไม่งั้นรีเฟรชหน้า service/quality/news แล้ว page จะถูกต้อง แต่ id ของหัวข้อที่เปิดอยู่หาย
  // ทำให้ content.QUALITY.find(...) หรือเทียบเท่าหาไม่เจอ กลายเป็นหน้า "ไม่พบเนื้อหานี้"
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          page: page === 'admin' ? 'home' : page,
          selectedDivisionId,
          selectedReportId,
          selectedPartnerName,
          selectedServiceLabel,
          selectedQualityLabel,
          selectedNewsTitle,
        })
      )
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [
    page,
    selectedDivisionId,
    selectedReportId,
    selectedPartnerName,
    selectedServiceLabel,
    selectedQualityLabel,
    selectedNewsTitle,
  ])

  // กันไม่ให้เข้าหน้า admin ได้ถ้ายังไม่ login (กันไว้เผื่อ state หลุด เช่น logout จากแท็บอื่น)
  useEffect(() => {
    if (page === 'admin' && !isAuthenticated) {
      setPage('home')
    }
  }, [page, isAuthenticated])

  useEffect(() => {
    if (page !== 'home') return
    const allSections = [...content.SECTIONS, ...customSections]
    const onScroll = () => {
      const offset = (quicknavRef.current?.offsetHeight || 0) + 20
      let current = ''
      for (const s of allSections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= offset) current = s.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [page, content.SECTIONS, customSections])

  const handleQuickNavClick = (e) => {
    const link = e.target.closest('.qn-btn') || e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const offset = (quicknavRef.current?.offsetHeight || 0) + 8
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    const focusEl = target.closest('[data-card]') || target
    focusEl.classList.add('section-focus')
    setTimeout(() => focusEl.classList.remove('section-focus'), 2000)
  }

  // target: 'home' | 'division' | 'report' | 'doctor' | 'online' | 'partner' | 'quality' | 'admin'
  // payload: id/name ของ division/report/partner/quality ที่ถูกเลือก (optional)
  const goTo = (target, payload) => {
    setPage(target)
    if (target === 'division') {
      setSelectedDivisionId(payload || null)
    }
    if (target === 'report') {
      setSelectedReportId(payload || null)
    }
    if (target === 'partner') {
      setSelectedPartnerName(payload || null)
    }
    if (target === 'service') {
      setSelectedServiceLabel(payload || null)
    }
    if (target === 'quality') {
      setSelectedQualityLabel(payload || null)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (target === 'news') {
      setSelectedNewsTitle(payload || null)
    }
  }

  useEffect(() => {
    if (page === 'home' && pendingScrollId) {
      const t = setTimeout(() => {
        scrollToSectionRef.current(pendingScrollId)
        setPendingScrollId(null)
      }, 60)
      return () => clearTimeout(t)
    }
  }, [page, pendingScrollId])

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    const offset = (quicknavRef.current?.offsetHeight || 0) + 8
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    const focusEl = target.closest('[data-card]') || target
    focusEl.classList.add('section-focus')
    setTimeout(() => focusEl.classList.remove('section-focus'), 2000)
  }
  scrollToSectionRef.current = scrollToSection

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query) return

    const q = query.toLowerCase()

    // 1) หัวข้อในหน้า Home (Announcement, ตารางเวร, โปรโมชัน ฯลฯ)
    const sectionMatch = content.SECTIONS.find((s) => (s.label || '').toLowerCase().includes(q))
    if (sectionMatch) {
      if (page === 'home') {
        scrollToSection(sectionMatch.id)
      } else {
        setPendingScrollId(sectionMatch.id)
        goTo('home')
      }
      return
    }

    // 2) ชื่อฝ่ายงาน (Division)
    const divisionMatch = content.DIVISIONS.find((d) => (d.name || '').toLowerCase().includes(q))
    if (divisionMatch) {
      goTo('division', divisionMatch.id)
      return
    }

    // 3) ชื่อระบบรายงาน (Report)
    const reportMatch = content.REPORTS.find((r) => (r.name || '').toLowerCase().includes(q))
    if (reportMatch) {
      goTo('report')
      return
    }

    // 4) รายการในระบบ Online (Request & Services)
    const hasOnlineMatch = (content.REQUEST_CATEGORIES || []).some((c) =>
      (c.items || []).some((i) => (i.name || '').toLowerCase().includes(q))
    )
    if (hasOnlineMatch) {
      goTo('online')
      return
    }
  }

  // -----------------------------------------------------------
  // สำคัญ: รอข้อมูลจริงจาก Neon โหลดเสร็จก่อน ค่อย render เนื้อหา
  // ถ้าไม่กันตรงนี้ หน้าเว็บจะ render ด้วย DEFAULT_CONTENT (รูป asset
  // เก่าที่ import ไว้ใน data.js) ไปก่อนชั่วขณะ แล้วค่อยสลับเป็นข้อมูล
  // จริงทีหลัง ทำให้เห็นรูปเก่ากระพริบก่อนรูปที่อัปโหลดจริงจะขึ้น
  // -----------------------------------------------------------
  if (isLoading) {
    return <LoadingScreen />
  }

  if (page === 'admin' && isAuthenticated) {
    return <AdminLayout onExit={() => goTo('home')} />
  }

  return (
    <>
      <TopBar />
      <NavBar page={page} onNavigate={goTo} onSearch={handleSearch} />
      <Hero onLoginSuccess={() => goTo('admin')} />
      <StatsBar />

      {page === 'home' && (
        <>
          <QuickNav ref={quicknavRef} active={activeSection} onNavClick={handleQuickNavClick} />

          <div className="mx-auto max-w-[1680px] px-8 pt-[22px] pb-[60px]">
            <div className="grid grid-cols-[1.65fr_1fr] gap-[18px] max-[1100px]:grid-cols-1">
              <div className="flex flex-col gap-4">
                <Announcement onOpenNews={(n) => goTo('news', n.title)} />
                <NSystem />
                <OnCall />
                <Promo />
                {customSections.filter((s) => (s.column || 'left') === 'left').map((s) => (
                  <div key={s.id} id={s.id}>
                    {renderCustomSection(s)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3.5">
                <DigitalServices onOpenService={(s) => goTo('service', s.label)} />
                <ContactCard />
                <button
                  id="sec-doctor"
                  data-card
                  onClick={() => goTo('doctor')}
                  className="flex w-full items-center justify-center gap-[9px] rounded-lg border-none bg-navy-900 p-4 text-[13.5px] font-bold text-white"
                >
                  <i className="ti ti-stethoscope text-[17px]" />ตารางแพทย์
                </button>
                <QualityCenter onOpenQuality={(q) => goTo('quality', q.label)} />
                <PartnerList onOpenPartner={(p) => goTo('partner', p.name)} />
                <ExpandableCards />

                {customSections.filter((s) => s.column === 'right').map((s) => (
                  <div key={s.id} id={s.id}>
                    {renderCustomSection(s)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {page === 'division' && (
        <DivisionGrid searchQuery={searchQuery} initialActiveId={selectedDivisionId} />
      )}

      {page === 'doctor' && <DoctorSchedulePage onBack={() => goTo('home')} />}

      {page === 'report' && (
        <ReportGrid searchQuery={searchQuery} initialActiveId={selectedReportId} />
      )}

      {page === 'online' && <RequestGrid searchQuery={searchQuery} />}

      {page === 'partner' && (
        <PartnerDetailPage
          partner={content.PARTNERS.find((p) => p.name === selectedPartnerName)}
          onBack={() => goTo('home')}
        />
      )}

      {page === 'service' && (
        <DigitalServicePage
          service={content.DIGITAL_SERVICES.find((s) => s.label === selectedServiceLabel)}
          onBack={() => goTo('home')}
        />
      )}

      {page === 'news' && (
        <AnnouncementTreePage
          news={content.ANN_NEWS.find((n) => n.title === selectedNewsTitle)}
          onBack={() => goTo('home')}
        />
      )}

      {page === 'quality' && (
        <QualityDetailPage
          quality={content.QUALITY.find((q) => q.label === selectedQualityLabel)}
          onBack={() => goTo('home')}
        />
      )}

      <Footer />

      <BackToTop />
    </>
  )
}

export default function App() {
  // เช็ค URL path แบบง่ายๆ (ไม่ใช้ router library เพราะแอปนี้ยังไม่มี)
  // /setup-password/xxxxx แยกออกไปแสดงหน้าตั้งรหัสผ่านเลย ไม่ต้องผ่าน ContentProvider/AuthProvider
  // ใช้ regex ที่ไม่สนใจว่าจะมี base path (เช่น /intranet/) นำหน้าอยู่หรือไม่
  const path = window.location.pathname
  const setupMatch = path.match(/\/setup-password\/([^/]+)\/?$/)
  if (setupMatch) {
    return <SetupPasswordPage token={setupMatch[1]} />
  }

  return (
    <ContentProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ContentProvider>
  )
}