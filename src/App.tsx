/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectThumbnail } from './components/ProjectVisual';
import { TechNoteModal } from './components/TechNoteModal';
import {
  CERTIFICATES_DATA,
  DOMAIN_TAGS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PORTFOLIO_PROJECTS,
  PROFILE_DATA,
  ProjectCaseStudy,
  SERVICES_DATA,
  SKILLS_PROGRESS_DATA,
  TECHNICAL_NOTES_DATA,
  TechnicalNoteItem,
} from './data/portfolioData';
import { downloadCompleteCvPdf } from './utils/cvGenerator';

type NavSectionId = 'home' | 'about-me' | 'resume' | 'portfolio' | 'blog' | 'contact';
type PortfolioCategory = 'all' | 'manufacturing' | 'web' | 'iot';

const NAV_ITEMS: { id: NavSectionId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about-me', label: 'About Me', icon: 'person' },
  { id: 'resume', label: 'Resume', icon: 'description' },
  { id: 'portfolio', label: 'Portfolio', icon: 'precision_manufacturing' },
  { id: 'blog', label: 'Technical Notes', icon: 'article' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [portfolioFilter, setPortfolioFilter] = useState<PortfolioCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [selectedNote, setSelectedNote] = useState<TechnicalNoteItem | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cvDownloadedToast, setCvDownloadedToast] = useState(false);
  const [selectedDomainTag, setSelectedDomainTag] = useState<string>('PPIC & Material Planning');
  const [showEducationInResume, setShowEducationInResume] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedMessagesCount, setSubmittedMessagesCount] = useState(0);

  // Text Rotator every 3 seconds (PRD Section 3.1)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE_DATA.rotatingRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll spy & hash sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavSectionId;
      if (NAV_ITEMS.some((item) => item.id === hash)) {
        setActiveSection(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as NavSectionId;
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigateToSection = (id: NavSectionId) => {
    setActiveSection(id);
    setMobileDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const handleDownloadCv = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    downloadCompleteCvPdf();
    setCvDownloadedToast(true);
    setTimeout(() => setCvDownloadedToast(false), 4000);
  };

  const handleInquireProject = (projectTitle: string) => {
    setFormSubject(`Diskusi Proyek: ${projectTitle}`);
    setFormMessage(
      `Halo Arga, saya tertarik mendiskusikan implementasi sistem serupa dengan "${projectTitle}" untuk kebutuhan perusahaan kami.`
    );
    setFormSubmitted(false);
    navigateToSection('contact');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formSubject.trim() || !formMessage.trim()) {
      return;
    }
    setFormSubmitted(true);
    setSubmittedMessagesCount((c) => c + 1);
  };

  const handleResetContactForm = () => {
    setFormName('');
    setFormEmail('');
    setFormSubject('');
    setFormMessage('');
    setFormSubmitted(false);
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((project) =>
    portfolioFilter === 'all' ? true : project.category === portfolioFilter
  );

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-fixed">
      {/* Left Fixed Identity Sidebar (Desktop >= 1024px) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-80 bg-surface-base shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-border-subtle/50 z-40 flex-col justify-between p-space-lg overflow-y-auto">
        <div className="flex flex-col items-center text-center">
          {/* Avatar Circle */}
          <div className="relative mb-space-md">
            <div className="w-28 h-28 rounded-full bg-surface-elevated p-1 ring-2 ring-primary-container/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-surface-card flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary text-[54px]">person</span>
              </div>
            </div>
            <div
              className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-primary-container ring-2 ring-surface-base"
              title="Open to Work"
            />
          </div>

          <h1 className="font-headline-sm text-headline-sm text-text-primary tracking-tight">
            {PROFILE_DATA.name}
          </h1>
          <p className="mt-space-xs font-label-md text-label-md text-primary font-medium tracking-wide">
            {PROFILE_DATA.title}
          </p>

          {/* Social / Direct Links */}
          <div className="flex items-center gap-space-sm mt-space-lg">
            <a
              aria-label="Code Repository (GitHub)"
              title="GitHub Repository"
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-on-surface-variant hover:bg-surface-elevated hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </a>
            <a
              aria-label="Professional Network (LinkedIn)"
              title="LinkedIn Profile"
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-on-surface-variant hover:bg-surface-elevated hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </a>
            <a
              aria-label="Direct Communication (WhatsApp)"
              title="WhatsApp Direct"
              href={PROFILE_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-on-surface-variant hover:bg-surface-elevated hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </a>
            <a
              aria-label="Email Inquiry"
              title="Kirim Pesan Kontak"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('contact');
              }}
              className="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-on-surface-variant hover:bg-surface-elevated hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>

          {/* Quick Sidebar Summary Info */}
          <div className="w-full mt-space-lg pt-space-md border-t border-border-subtle/70 text-left space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Pengalaman</span>
              <span className="font-mono text-text-primary font-semibold tabular-nums">8+ Tahun</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Sistem Produksi</span>
              <span className="font-mono text-primary font-semibold tabular-nums">14+ Terdeploy</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Domisili</span>
              <span className="text-text-secondary">Indonesia (Remote/On-Site)</span>
            </div>
          </div>
        </div>

        {/* Bottom Primary CTA & Copyright */}
        <div className="flex flex-col gap-space-md mt-space-lg">
          <button
            type="button"
            onClick={handleDownloadCv}
            className="w-full py-3 px-space-md rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-label-md flex items-center justify-center gap-space-xs shadow-[0_0_16px_rgba(0,210,211,0.35)] hover:bg-primary transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh CV Lengkap (PDF)</span>
          </button>
          {cvDownloadedToast && (
            <div className="text-center py-1.5 px-3 rounded-lg bg-primary-container/15 border border-primary-container/30 text-primary text-xs font-mono">
              CV_ArgaPratama_FullStackDeveloper.pdf terunduh
            </div>
          )}
          <div className="text-center">
            <p className="font-body-sm text-body-sm text-text-muted">
              © {PROFILE_DATA.copyrightYear} Arga Pratama. All rights reserved.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Slide-Out Drawer Menu (< 1024px) */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-sm flex"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] h-full bg-surface-base border-r border-border-subtle p-space-lg flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-space-md border-b border-border-subtle">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                  Profil & Navigasi
                </span>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Tutup menu"
                  className="w-9 h-9 rounded-full bg-surface-card text-text-secondary flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col items-center text-center mt-space-md">
                <div className="w-20 h-20 rounded-full bg-surface-elevated p-1 ring-2 ring-primary-container/30 flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-full bg-surface-card flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[40px]">
                      person
                    </span>
                  </div>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  {PROFILE_DATA.name}
                </h2>
                <p className="text-xs text-primary mt-1">{PROFILE_DATA.title}</p>
              </div>

              <nav className="mt-space-lg space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToSection(item.id);
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-label-md text-label-md transition-colors ${
                        isActive
                          ? 'bg-primary-container text-on-primary-fixed font-semibold'
                          : 'text-text-secondary hover:bg-surface-card hover:text-text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-space-md border-t border-border-subtle space-y-3">
              <button
                type="button"
                onClick={handleDownloadCv}
                className="w-full py-3 px-4 rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-xs flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,210,211,0.35)]"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh CV Lengkap (PDF)</span>
              </button>
              <p className="text-center font-body-sm text-body-sm text-text-muted">
                © {PROFILE_DATA.copyrightYear} Arga Pratama
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Right Floating Icon Navigation (Desktop >= 1024px) */}
      <nav
        aria-label="Navigasi Seksi Utama"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-space-sm bg-surface-card/90 backdrop-blur-xl p-space-xs rounded-full shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] border border-border-subtle/60"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              title={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigateToSection(item.id);
              }}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_16px_rgba(0,210,211,0.35)]'
                  : 'text-on-surface-variant hover:bg-surface-elevated hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all origin-right bg-surface-elevated text-text-primary font-label-sm text-label-sm py-1 px-3 rounded-full shadow-lg pointer-events-none whitespace-nowrap border border-border-subtle">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Main Content Area Wrapper */}
      <div className="lg:pl-80 lg:pr-24">
        {/* Top Bar Header */}
        <header className="fixed top-0 left-0 lg:left-80 right-0 h-16 bg-surface-base/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-border-subtle/50 z-30 flex items-center justify-between px-space-lg lg:px-space-xl gap-space-md">
          {/* Left Zone: Brand on Mobile / Quick Navigation Breadcrumb on Desktop */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Buka menu navigasi"
              className="lg:hidden w-10 h-10 rounded-lg bg-surface-card border border-border-subtle flex items-center justify-center text-text-primary"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('home');
              }}
              className="font-headline-sm text-sm text-text-primary tracking-tight whitespace-nowrap shrink-0 lg:hidden"
            >
              Arga Pratama, S.Kom.
            </a>
            <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-text-muted">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id);
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 ${
                    activeSection === item.id
                      ? 'text-primary font-semibold'
                      : 'hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Zone: Status & Quick Action */}
          <div className="flex items-center gap-space-md shrink-0">
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-text-muted whitespace-nowrap">
              {PROFILE_DATA.headerStatus}
            </span>
            <button
              type="button"
              onClick={() => navigateToSection('contact')}
              title="Mulai Kolaborasi"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
          </div>
        </header>

        {/* Main Scrollable Canvas */}
        <main className="w-full pt-16 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            <div className="relative w-full max-w-6xl mx-auto px-space-lg pb-space-2xl space-y-space-2xl">
              {/* SECTION 1: HERO / HOME (#home) */}
              <section className="relative pt-space-xl pb-space-lg overflow-hidden" id="home">
                <div className="absolute -top-12 -left-12 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-start gap-space-md">
                  {/* Availability Banner */}
                  <div className="inline-flex items-center gap-space-sm px-4 py-1.5 rounded-full bg-surface-card border border-border-subtle shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      verified
                    </span>
                    <span className="font-label-md text-label-md text-text-primary tracking-wide">
                      {PROFILE_DATA.statusText}
                    </span>
                  </div>

                  <div className="space-y-space-xs max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                        {PROFILE_DATA.heroKicker}
                      </p>
                      <span className="text-text-muted text-xs">·</span>
                      <span
                        className="font-mono text-xs text-secondary transition-opacity duration-300"
                        aria-live="polite"
                      >
                        {PROFILE_DATA.rotatingRoles[roleIndex]}
                      </span>
                    </div>
                    <h2 className="font-display-hero text-display-hero text-text-primary tracking-tight leading-tight">
                      Membangun Ekosistem Digital{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-container">
                        Manufaktur Cerdas
                      </span>{' '}
                      &amp; Web Skala Enterprise
                    </h2>
                  </div>

                  {/* Interactive Skill Filter Badges */}
                  <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                    {PROFILE_DATA.heroBadges.map((badge) => (
                      <button
                        key={badge.label}
                        type="button"
                        onClick={() => {
                          setPortfolioFilter(badge.filterTarget);
                          navigateToSection('portfolio');
                        }}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-base border border-border-subtle hover:border-primary-container transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          {badge.icon}
                        </span>
                        <span className="font-label-md text-label-md text-text-secondary">
                          {badge.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 2: TENTANG SAYA (#about-me) */}
              <section className="relative scroll-mt-24" id="about-me">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined text-primary text-[28px]">badge</span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Tentang Saya
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-12 gap-space-lg">
                  {/* Left: Executive Summary & 2-Column Metadata */}
                  <div className="col-span-12 lg:col-span-7 flex flex-col justify-between bg-surface-base p-space-lg rounded-xl border border-border-subtle shadow-md">
                    <div className="space-y-space-md">
                      <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Ringkasan Eksekutif</span>
                      </div>
                      <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                        Profesional rekayasa perangkat lunak dengan pengalaman{' '}
                        <strong className="text-text-primary">8+ tahun</strong> memimpin
                        transformasi digital sektor manufaktur, otomasi pabrik, dan sistem
                        enterprise terdistribusi. Berfokus pada digitalisasi lini produksi
                        shop-floor, sistem PPIC terintegrasi, pelacakan WIP real-time, reduksi
                        cycle time, hingga implementasi telemetri OEE industri.
                      </p>
                      <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                        Menguasai arsitektur backend berkinerja tinggi, perancangan ERD kompleks
                        berkecepatan tinggi, container orchestration Docker, serta hardening
                        infrastruktur Linux Server dengan reliabilitas tinggi untuk operasional 24/7
                        tanpa henti.
                      </p>
                    </div>

                    {/* Metadata 2-Column Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-lg pt-space-md border-t border-border-subtle">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                          Domisili
                        </span>
                        <span className="font-headline-sm text-headline-sm text-text-primary mt-1">
                          {PROFILE_DATA.location}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                          Pengalaman
                        </span>
                        <span className="font-headline-sm text-headline-sm text-text-primary mt-1">
                          {PROFILE_DATA.experienceYears}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                          Status Ketersediaan
                        </span>
                        <span className="font-headline-sm text-headline-sm text-primary mt-1">
                          {PROFILE_DATA.availability}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                          Email Resmi
                        </span>
                        <span className="font-headline-sm text-headline-sm text-text-primary mt-1">
                          {PROFILE_DATA.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: 3 Metric Cards */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col gap-space-md">
                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">inventory_2</span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-text-primary tabular-nums">
                          14+
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          Sistem ERP &amp; Manufaktur
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Digitalisasi proses hulu ke hilir
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">history_edu</span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-text-primary tabular-nums">
                          8+ Tahun
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          Pengalaman Praktikal
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Desain sistem &amp; kepemimpinan tim
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">bolt</span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-primary tabular-nums">
                          99.8%
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          Uptime Layanan Kritis
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Infrastruktur produksi bebas hambatan
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* LAYANAN & KEAHLIAN INTI (WHAT I DO) */}
              <section className="relative">
                <div className="flex items-center justify-between mb-space-lg">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                      Kapabilitas Spesialis
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                      Layanan &amp; Keahlian Inti
                    </h3>
                  </div>
                  <p className="font-body-md text-body-md text-text-muted max-w-md text-right hidden sm:block">
                    Solusi terintegrasi menggabungkan software modern dengan kebutuhan nyata shop
                    floor manufaktur.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                  {SERVICES_DATA.map((service) => (
                    <div
                      key={service.id}
                      className="bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary-container/60 hover:-translate-y-1 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-surface-base transition-colors">
                          <span className="material-symbols-outlined text-[26px]">
                            {service.icon}
                          </span>
                        </div>
                        <h4 className="font-headline-md text-headline-md text-text-primary mb-space-xs">
                          {service.title}
                        </h4>
                        <p className="font-body-md text-body-md text-text-secondary mb-space-md leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle/60">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-surface-base text-label-sm font-label-sm text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3: PENGALAMAN KERJA & RESUME (#resume) */}
              <section className="relative scroll-mt-24" id="resume">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    work_history
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Riwayat Profesional &amp; Kemampuan Teknis
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-12 gap-space-xl">
                  {/* Left Column: Timeline & Credentials */}
                  <div className="col-span-12 lg:col-span-7 flex flex-col">
                    <div className="flex items-center justify-between mb-space-md">
                      <h4 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          business_center
                        </span>
                        <span>Pengalaman Kerja</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowEducationInResume((prev) => !prev)}
                        className="text-xs font-mono text-primary hover:underline cursor-pointer"
                      >
                        {showEducationInResume
                          ? 'Sembunyikan Detail Pendidikan'
                          : '+ Tampilkan Pendidikan Formal'}
                      </button>
                    </div>

                    <div className="relative pl-6 space-y-space-lg before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-elevated">
                      {EXPERIENCE_DATA.map((exp) => (
                        <div key={exp.id} className="relative group">
                          <div
                            className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-base border-2 transition-transform ${
                              exp.isCurrent
                                ? 'border-primary-container group-hover:scale-125 shadow-[0_0_8px_#00d2d3]'
                                : 'border-outline-variant group-hover:border-primary-container'
                            }`}
                          />
                          <div className="bg-surface-card p-space-md rounded-xl border border-border-subtle hover:border-primary-container/50 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                              <span className="font-headline-sm text-headline-sm text-text-primary">
                                {exp.role}
                              </span>
                              <span
                                className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full ${
                                  exp.isCurrent
                                    ? 'bg-primary-container/10 text-primary border border-primary-container/20'
                                    : 'bg-surface-elevated text-text-muted'
                                }`}
                              >
                                {exp.period}
                              </span>
                            </div>
                            <p
                              className={`font-label-md text-label-md font-medium mb-space-xs ${
                                exp.companyColor === 'primary'
                                  ? 'text-primary'
                                  : exp.companyColor === 'secondary'
                                  ? 'text-secondary'
                                  : 'text-text-secondary'
                              }`}
                            >
                              {exp.company}
                            </p>
                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Education Timeline (from PRD Section 3.3) */}
                    {showEducationInResume && (
                      <div className="mt-space-lg pt-space-md border-t border-border-subtle">
                        <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-sm flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            school
                          </span>
                          <span>Pendidikan Formal</span>
                        </h4>
                        {EDUCATION_DATA.map((edu) => (
                          <div
                            key={edu.id}
                            className="p-space-md rounded-xl bg-surface-card border border-border-subtle"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-headline-sm text-sm text-text-primary">
                                {edu.degree}
                              </span>
                              <span className="font-mono text-xs text-primary">{edu.period}</span>
                            </div>
                            <div className="text-xs text-secondary font-medium mt-0.5">
                              {edu.institution} · {edu.gpa}
                            </div>
                            <p className="text-body-sm text-text-muted mt-1">{edu.focus}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sertifikasi Profesional Section Below Timeline */}
                    <div className="mt-space-lg pt-space-md border-t border-border-subtle">
                      <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          verified
                        </span>
                        <span>Sertifikasi Profesional</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                        {CERTIFICATES_DATA.slice(0, 2).map((cert) => (
                          <div
                            key={cert.id}
                            className="p-space-sm rounded-lg bg-surface-base border border-border-subtle flex items-start gap-3"
                          >
                            <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">
                              workspace_premium
                            </span>
                            <div>
                              <div className="font-headline-sm text-body-md font-semibold text-text-primary">
                                {cert.title}
                              </div>
                              <div className="font-label-sm text-label-sm text-text-muted">
                                {cert.subtitle}
                              </div>
                              <div className="font-mono text-[10px] text-primary/80 mt-0.5">
                                ID: {cert.credentialId} · {cert.issueDate}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Skills Progress Bars & Domain Tag Cloud */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col space-y-space-lg">
                    <div>
                      <h4 className="font-headline-md text-headline-md text-text-primary mb-space-md flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          analytics
                        </span>
                        <span>Tingkat Penguasaan</span>
                      </h4>
                      <div className="space-y-space-md bg-surface-card p-space-lg rounded-xl border border-border-subtle">
                        {SKILLS_PROGRESS_DATA.map((skill) => (
                          <div key={skill.label}>
                            <div className="flex justify-between text-body-md mb-1.5">
                              <span className="font-headline-sm text-label-md text-text-primary">
                                {skill.label}
                              </span>
                              <span className="font-label-md text-label-md text-primary font-mono tabular-nums">
                                {skill.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface-elevated overflow-hidden">
                              <div
                                className="h-full bg-primary-container rounded-full shadow-[0_0_8px_#00d2d3]"
                                style={{ width: `${skill.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Domain Knowledge & Tech Stack */}
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-sm">
                        Domain Knowledge &amp; Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {DOMAIN_TAGS_DATA.map((tag) => {
                          const isSelected = selectedDomainTag === tag.label;
                          return (
                            <button
                              key={tag.label}
                              type="button"
                              onClick={() => setSelectedDomainTag(tag.label)}
                              className={`px-3 py-1.5 rounded-full bg-surface-card border font-label-md text-label-sm transition-colors cursor-pointer ${
                                isSelected || tag.highlighted
                                  ? 'border-primary/40 text-primary'
                                  : 'border-border-subtle text-text-secondary hover:border-primary/50'
                              }`}
                            >
                              {tag.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: KARYA REKAYASA & STUDI KASUS (#portfolio) */}
              <section className="relative scroll-mt-24" id="portfolio">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                      Portofolio Pilihan
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                      Karya Rekayasa &amp; Studi Kasus
                    </h3>
                  </div>

                  {/* Interactive Filter Tabs */}
                  <div className="flex items-center gap-2 p-1 bg-surface-card rounded-full border border-border-subtle self-start md:self-auto overflow-x-auto">
                    {[
                      { id: 'all' as const, label: 'Semua' },
                      { id: 'manufacturing' as const, label: 'Enterprise & PPIC' },
                      { id: 'web' as const, label: 'Web Applications' },
                      { id: 'iot' as const, label: 'Otomasi & IoT' },
                    ].map((tab) => {
                      const active = portfolioFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPortfolioFilter(tab.id)}
                          className={`px-4 py-1.5 rounded-full text-label-sm font-label-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-primary-container text-surface-base shadow-[0_0_12px_rgba(0,210,211,0.3)]'
                              : 'text-text-muted hover:text-text-primary'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Column Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="portfolio-card bg-surface-card rounded-xl border border-border-subtle overflow-hidden flex flex-col hover:border-primary hover:-translate-y-1 transition-all group cursor-pointer"
                    >
                      <ProjectThumbnail project={project} />

                      <div className="p-space-md flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-headline-md text-headline-sm text-text-primary group-hover:text-primary transition-colors mb-2">
                            {project.title}
                          </h4>
                          <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed mb-space-md">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-space-md">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded bg-surface-base text-label-sm font-mono text-text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-secondary-fixed transition-colors cursor-pointer"
                          >
                            <span>Lihat Studi Kasus</span>
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: CATATAN TEKNIS / TECHNICAL NOTES (#blog — PRD Section 3.5) */}
              <section className="relative scroll-mt-24" id="blog">
                <div className="flex items-center justify-between mb-space-lg">
                  <div className="flex items-center gap-space-sm flex-1">
                    <span className="material-symbols-outlined text-primary text-[28px]">
                      article
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-text-primary">
                      Catatan Teknis &amp; Arsitektur
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                  {TECHNICAL_NOTES_DATA.map((note) => (
                    <article
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className="bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/60 transition-all group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-primary mb-2">
                          <span>{note.category}</span>
                          <span className="text-text-muted">·</span>
                          <span className="text-text-muted">{note.date}</span>
                          <span className="text-text-muted">·</span>
                          <span className="text-text-muted">{note.readTime}</span>
                        </div>
                        <h4 className="font-headline-md text-headline-sm text-text-primary group-hover:text-primary transition-colors mb-2">
                          {note.title}
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed mb-space-md">
                          {note.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border-subtle/60">
                        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                          {note.tags.slice(0, 3).map((t, i) => (
                            <React.Fragment key={t}>
                              <span>{t}</span>
                              {i < 2 && <span>·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform whitespace-nowrap">
                          <span>Baca Dokumentasi</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* SECTION 6: MULAI KOLABORASI PROFESIONAL (#contact) */}
              <section className="relative scroll-mt-24" id="contact">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    contact_mail
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Mulai Kolaborasi Profesional
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-12 gap-space-xl">
                  {/* Left: Quick Info Cards */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col justify-between space-y-space-md">
                    <div className="space-y-space-md">
                      <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                        Tertarik mendiskusikan kebutuhan arsitektur sistem enterprise, konsultasi
                        digitalisasi manufaktur, atau peluang rekrutmen engineering? Silakan hubungi
                        saya melalui form atau saluran langsung berikut.
                      </p>

                      <div className="space-y-space-sm pt-space-xs">
                        <div className="flex items-center gap-4 p-space-md rounded-xl bg-surface-card border border-border-subtle hover:border-primary/50 transition-colors">
                          <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-[24px]">
                              location_on
                            </span>
                          </div>
                          <div>
                            <div className="font-label-sm text-label-sm text-text-muted uppercase">
                              Lokasi &amp; Domisili
                            </div>
                            <div className="font-headline-sm text-headline-sm text-text-primary">
                              Indonesia (Remote / Hybrid)
                            </div>
                          </div>
                        </div>

                        <a
                          href={PROFILE_DATA.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-space-md rounded-xl bg-surface-card border border-border-subtle hover:border-primary/50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-[24px]">call</span>
                          </div>
                          <div>
                            <div className="font-label-sm text-label-sm text-text-muted uppercase">
                              WhatsApp / Telepon
                            </div>
                            <div className="font-headline-sm text-headline-sm text-text-primary tabular-nums">
                              {PROFILE_DATA.phone}
                            </div>
                          </div>
                        </a>

                        <a
                          href={`mailto:${PROFILE_DATA.email}`}
                          className="flex items-center gap-4 p-space-md rounded-xl bg-surface-card border border-border-subtle hover:border-primary/50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-[24px]">mail</span>
                          </div>
                          <div>
                            <div className="font-label-sm text-label-sm text-text-muted uppercase">
                              Email Resmi
                            </div>
                            <div className="font-headline-sm text-headline-sm text-text-primary">
                              {PROFILE_DATA.email}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-card/60 border border-primary-container/20 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px]">
                        schedule
                      </span>
                      <div className="font-body-sm text-body-sm text-text-muted">
                        Respons rata-rata dalam <strong className="text-text-primary">1x24 jam</strong>{' '}
                        kerja untuk diskusi teknis &amp; proposal arsitektur.
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Contact Form */}
                  <div className="col-span-12 lg:col-span-7 bg-surface-card p-space-xl rounded-xl border border-border-subtle shadow-xl">
                    <form className="space-y-space-md" onSubmit={handleContactSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="space-y-1.5">
                          <label
                            className="font-label-md text-label-md text-text-secondary block"
                            htmlFor="nama"
                          >
                            Nama Lengkap
                          </label>
                          <input
                            id="nama"
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => {
                              setFormName(e.target.value);
                              if (formSubmitted) setFormSubmitted(false);
                            }}
                            placeholder="Contoh: Budi Santoso"
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-border-subtle text-text-primary font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            className="font-label-md text-label-md text-text-secondary block"
                            htmlFor="email"
                          >
                            Email Perusahaan / Pribadi
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => {
                              setFormEmail(e.target.value);
                              if (formSubmitted) setFormSubmitted(false);
                            }}
                            placeholder="budi@perusahaan.co.id"
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-border-subtle text-text-primary font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="font-label-md text-label-md text-text-secondary block"
                          htmlFor="subjek"
                        >
                          Subjek Diskusi
                        </label>
                        <input
                          id="subjek"
                          type="text"
                          required
                          value={formSubject}
                          onChange={(e) => {
                            setFormSubject(e.target.value);
                            if (formSubmitted) setFormSubmitted(false);
                          }}
                          placeholder="Misal: Proyek Sistem PPIC & Tracking Lantai Pabrik"
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-border-subtle text-text-primary font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="font-label-md text-label-md text-text-secondary block"
                          htmlFor="pesan"
                        >
                          Uraian Kebutuhan Proyek / Pesan
                        </label>
                        <textarea
                          id="pesan"
                          rows={5}
                          required
                          value={formMessage}
                          onChange={(e) => {
                            setFormMessage(e.target.value);
                            if (formSubmitted) setFormSubmitted(false);
                          }}
                          placeholder="Tuliskan gambaran proses bisnis, ruang lingkup implementasi, atau detail penawaran kerja sama..."
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-border-subtle text-text-primary font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-space-lg rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-label-md flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,210,211,0.35)] hover:bg-primary transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {formSubmitted ? 'done' : 'send'}
                        </span>
                        <span>
                          {formSubmitted ? 'Pesan Terkirim' : 'Kirim Pesan Langsung'}
                        </span>
                      </button>

                      {formSubmitted && (
                        <div className="p-3.5 rounded-lg bg-primary-container/10 border border-primary-container/30 text-primary font-label-md text-label-md flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span>
                            Terima kasih, <strong>{formName}</strong>! Pesan mengenai &ldquo;
                            {formSubject}&rdquo; telah diterima dan akan direspons ke{' '}
                            <span className="underline">{formEmail}</span> dalam 1x24 jam.
                          </span>
                          <button
                            type="button"
                            onClick={handleResetContactForm}
                            className="text-xs font-mono text-text-primary hover:text-primary underline shrink-0 cursor-pointer"
                          >
                            Kirim Pesan Baru ({submittedMessagesCount})
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={handleInquireProject}
      />

      {/* Technical Note Reader Modal */}
      <TechNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
    </div>
  );
}
