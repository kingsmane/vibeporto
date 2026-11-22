/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { ProjectThumbnail } from "./components/ProjectVisual";
import { TechNoteModal } from "./components/TechNoteModal";
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
} from "./data/portfolioData";
import { downloadCompleteCvPdf } from "./utils/cvGenerator";

type NavSectionId =
  | "home"
  | "about-me"
  | "resume"
  | "portfolio"
  | "blog"
  | "contact";
type PortfolioCategory = "all" | "manufacturing" | "web";

const NAV_ITEMS: { id: NavSectionId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about-me", label: "About Me", icon: "person" },
  { id: "resume", label: "Resume", icon: "school" },
  { id: "portfolio", label: "Portfolio", icon: "work" },
  { id: "blog", label: "Technical Notes", icon: "menu_book" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const NAV_ICON_PATHS: Record<NavSectionId, string[]> = {
  home: [
    "M6 32 L32 8 L58 32",
    "M46 21 V12 H52 V26",
    "M14 28 V55 H27 V40 H37 V55 H50 V28",
  ],
  "about-me": [
    "M32 8 a11 11 0 1 0 0.01 0 Z",
    "M10 55 C10 44 20 38 32 38 C44 38 54 44 54 55 Z",
  ],
  resume: [
    "M32 14 L60 26 L32 38 L4 26 Z",
    "M16 33 V44 C22 51 42 51 48 44 V33",
    "M56 28 V44",
    "M54 44 H58 V51 H54 Z",
  ],
  portfolio: [
    "M6 20 H58 V54 H6 Z",
    "M24 20 V13 H40 V20",
    "M6 38 H26 M38 38 H58",
    "M26 34 H38 V42 H26 Z",
  ],
  blog: [
    "M14 52 V10 Q14 6 18 6 H50 V48 H18 Q14 48 14 52 Z",
    "M18 48 Q14 48 14 52 Q14 58 18 58 H50 V48",
  ],
  contact: [
    "M4 14 H60 V50 H4 Z",
    "M4 16 L32 38 L60 16",
    "M4 48 L24 30 M60 48 L40 30",
  ],
};

function NavIcon({ id, size }: { id: NavSectionId; size: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {NAV_ICON_PATHS[id].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");
  const [portfolioFilter, setPortfolioFilter] =
    useState<PortfolioCategory>("all");
  const [selectedProject, setSelectedProject] =
    useState<ProjectCaseStudy | null>(null);
  const [selectedNote, setSelectedNote] = useState<TechnicalNoteItem | null>(
    null,
  );
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light",
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cvDownloadedToast, setCvDownloadedToast] = useState(false);
  const [selectedDomainTag, setSelectedDomainTag] = useState<string>(
    "PPIC & Material Planning",
  );
  const [showEducationInResume, setShowEducationInResume] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
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
      const hash = window.location.hash.replace("#", "") as NavSectionId;
      if (NAV_ITEMS.some((item) => item.id === hash)) {
        setActiveSection(hash);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Theme switch (light / dark), persisted
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // Each section is a "page": reset scroll when switching
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [activeSection]);

  const navigateToSection = (id: NavSectionId) => {
    setActiveSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const activeIndex = NAV_ITEMS.findIndex((i) => i.id === activeSection);
  const goRelative = (delta: number) => {
    const next =
      (activeIndex + delta + NAV_ITEMS.length) % NAV_ITEMS.length;
    navigateToSection(NAV_ITEMS[next].id);
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
      `Halo Herman, saya tertarik mendiskusikan implementasi sistem serupa dengan "${projectTitle}" untuk kebutuhan perusahaan kami.`,
    );
    setFormSubmitted(false);
    navigateToSection("contact");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formName.trim() ||
      !formEmail.trim() ||
      !formSubject.trim() ||
      !formMessage.trim()
    ) {
      return;
    }
    setFormSubmitted(true);
    setSubmittedMessagesCount((c) => c + 1);
  };

  const handleResetContactForm = () => {
    setFormName("");
    setFormEmail("");
    setFormSubject("");
    setFormMessage("");
    setFormSubmitted(false);
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((project) =>
    portfolioFilter === "all" ? true : project.category === portfolioFilter,
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--page-bg)] font-body-md text-text-primary antialiased transition-colors duration-300 selection:bg-primary-container selection:text-white">
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-12 top-6 hidden h-[170px] w-[140px] md:block"
          style={{
            backgroundImage:
              "radial-gradient(var(--page-dot) 2.5px, transparent 3px)",
            backgroundSize: "23.5px 23.5px",
          }}
        />
        <div className="absolute -top-56 right-[6%] h-[640px] w-[640px] rounded-full bg-[var(--page-deco)]" />
        <div className="absolute left-[7%] top-[48%] hidden h-9 w-9 rounded-full bg-[var(--page-deco)] lg:block" />
        <div className="absolute left-[4%] top-[72%] hidden h-5 w-5 rounded-full bg-[var(--page-deco)] lg:block" />
        <div className="absolute right-[5%] top-[64%] hidden h-5 w-5 rounded-full bg-[var(--page-deco)] lg:block" />
        <div className="absolute right-[8%] top-[2%] hidden h-12 w-12 rotate-12 bg-[var(--page-deco)] lg:block" />
        <div className="absolute -left-20 top-[20%] hidden h-[140%] w-40 rotate-[40deg] bg-[var(--page-deco)] lg:block" />
      </div>

      {/* Colour theme switch (2 options) */}
      <div
        role="group"
        aria-label="Pilihan warna tema"
        className="fixed right-3 top-3 z-50 flex items-center gap-1 rounded-full bg-[var(--nav-bg)] p-1 shadow-lg lg:bottom-5 lg:left-5 lg:right-auto lg:top-auto"
      >
        {(
          [
            { id: "light", icon: "light_mode", label: "Tema terang" },
            { id: "dark", icon: "dark_mode", label: "Tema gelap" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={theme === opt.id}
            onClick={() => setTheme(opt.id)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
              theme === opt.id
                ? "bg-primary-container text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {opt.icon}
            </span>
          </button>
        ))}
      </div>

      <div className="relative lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative w-full lg:h-[min(760px,calc(100vh-4rem))] lg:w-[calc(100%-14rem)] lg:max-w-[1280px]">
          {/* Profile panel (left) */}
          <aside className={`${activeSection === "home" ? "flex" : "hidden lg:flex"} relative z-0 flex-col items-center rounded-b-[28px] bg-[var(--sidebar-bg)] px-6 pb-8 pt-14 text-center text-white shadow-[var(--card-shadow)] transition-colors duration-300 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[420px] lg:rounded-[30px] lg:pb-6 lg:pl-0 lg:pr-[40px] lg:pt-[70px]`}>
            <div className="relative lg:w-[380px] lg:pl-0">
              <div className="relative mx-auto h-[170px] w-[170px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white">
                  <span
                    className="material-symbols-outlined text-[110px] text-[var(--sidebar-bg)]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
                  >
                    person
                  </span>
                </div>
              </div>

              <h1 className="mt-6 text-[27px] font-semibold leading-tight tracking-tight">
                {PROFILE_DATA.name}
              </h1>
              <p className="mx-auto mt-1 max-w-[300px] text-[15px] font-light leading-snug text-white/80">
                {PROFILE_DATA.title}
              </p>

              <div className="mt-5 flex items-center justify-center gap-5">
                {[
                  {
                    label: "GitHub",
                    href: PROFILE_DATA.githubUrl,
                    icon: "terminal",
                  },
                  {
                    label: "LinkedIn",
                    href: PROFILE_DATA.linkedinUrl,
                    icon: "hub",
                  },
                  {
                    label: "WhatsApp",
                    href: PROFILE_DATA.whatsappUrl,
                    icon: "chat",
                  },
                ]
                  .filter((s) => s.href)
                  .map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    title={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                  >
                    <span className="material-symbols-outlined text-[21px]">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={handleDownloadCv}
                className="mx-auto mt-9 flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white px-7 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white hover:text-[var(--sidebar-bg)]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                <span>Download CV</span>
              </button>
              {cvDownloadedToast && (
                <div className="mx-auto mt-3 max-w-[280px] rounded-lg bg-white/15 px-3 py-1.5 font-mono text-[11px] text-white">
                  {PROFILE_DATA.cvFileName} terunduh
                </div>
              )}
            </div>

            <p className="mt-8 text-[11px] text-white/80 lg:absolute lg:bottom-5 lg:left-0 lg:mt-0 lg:w-[380px]">
              © {PROFILE_DATA.copyrightYear} Herman Sadi. All rights reserved.
            </p>
          </aside>

          {/* Content panel (right) */}
          <main
            className={`${activeSection === "home" ? "mt-4" : "mt-16"} relative z-10 mx-3 rounded-[28px] bg-surface-base shadow-[var(--card-shadow)] transition-colors duration-300 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:w-[calc(100%-380px)] lg:rounded-[30px]`}
          >
            <div
              ref={contentRef}
              className="px-5 pb-28 pt-8 sm:px-8 lg:h-full lg:overflow-y-auto lg:px-12 lg:pb-12 lg:pt-12"
            >
              <div className="@container mx-auto w-full max-w-5xl space-y-12 break-words">
                {/* HOME */}
                {activeSection === "home" && (
                  <section
                    className="page-enter flex min-h-[420px] flex-col items-center justify-center py-8 text-center lg:min-h-[calc(min(760px,100vh-4rem)-6rem)]"
                    id="home"
                  >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-4 py-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span className="text-[12px] font-medium text-text-secondary">
                        {PROFILE_DATA.statusText}
                      </span>
                    </div>
                    <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-text-primary">
                      {PROFILE_DATA.name}
                    </h2>
                    <p
                      key={roleIndex}
                      className="role-fade mt-3 min-h-[1.75rem] text-lg font-light text-text-muted"
                      aria-live="polite"
                    >
                      {PROFILE_DATA.rotatingRoles[roleIndex]}
                    </p>
                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                      Membangun Ekosistem Digital{" "}
                      <span className="font-semibold text-primary">
                        Manufaktur Cerdas
                      </span>{" "}
                      &amp; Web Skala Enterprise.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      {PROFILE_DATA.heroBadges.map((badge) => (
                        <button
                          key={badge.label}
                          type="button"
                          onClick={() => {
                            setPortfolioFilter(badge.filterTarget);
                            navigateToSection("portfolio");
                          }}
                          className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-surface-base px-3.5 py-1.5 transition-colors hover:border-primary-container"
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
                  </section>
                )}

              {/* SECTION 2: TENTANG SAYA (#about-me) */}
              {activeSection === "about-me" && (
              <div className="page-enter space-y-12">
              <section className="relative" id="about-me">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined hidden shrink-0 text-primary text-[28px] @xl:inline-block">
                    badge
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Tentang Saya
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-space-lg">
                  {/* Left: Executive Summary & 2-Column Metadata */}
                  <div className="@3xl:col-span-7 flex flex-col justify-between bg-surface-base p-space-lg rounded-xl border border-border-subtle shadow-md">
                    <div className="space-y-space-md">
                      <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">
                          verified
                        </span>
                        <span>Ringkasan Eksekutif</span>
                      </div>
                      <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                        Full-Stack Developer yang membangun aplikasi web end-to-end,
                        mulai dari perancangan arsitektur dan basis data,
                        pengembangan API di backend, hingga antarmuka yang
                        responsif dan mudah dipakai. Terbiasa menangani sistem
                        skala enterprise seperti{" "}
                        <strong className="text-text-primary">
                          ERP, HRIS, monitoring produksi, dan sistem berbasis
                          role/permission
                        </strong>
                        .
                      </p>
                      <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                        Menguasai PHP (Laravel / CodeIgniter), Node.js (Express), React,
                        serta basis data relasional PostgreSQL dan MySQL.
                        Mampu menerjemahkan kebutuhan bisnis menjadi solusi
                        teknis yang andal, terukur, dan mudah dirawat.
                      </p>
                    </div>

                    {/* Metadata 2-Column Info Grid */}
                    <div className="grid grid-cols-1 @xl:grid-cols-2 gap-space-md mt-space-lg pt-space-md border-t border-border-subtle">
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
                  <div className="@3xl:col-span-5 flex flex-col gap-space-md">
                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">
                          inventory_2
                        </span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-text-primary tabular-nums">
                          4 Plant
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          ERP Terintegrasi
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Arsitektur ERP di 4 plant produksi
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">
                          history_edu
                        </span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-text-primary tabular-nums">
                          2021+
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          Full-Stack Developer
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          HRIS, workflow approval, ERP
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/50 transition-all flex items-center gap-space-md group">
                      <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <span className="material-symbols-outlined text-[32px]">
                          bolt
                        </span>
                      </div>
                      <div>
                        <div className="font-display-hero text-headline-lg font-extrabold text-primary tabular-nums">
                          99.8%
                        </div>
                        <div className="font-headline-sm text-headline-sm text-text-secondary mt-0.5">
                          Uptime Sistem ERP
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Ketersediaan sistem produksi
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
                  <p className="font-body-md text-body-md text-text-muted max-w-md text-right hidden @xl:block">
                    Solusi terintegrasi menggabungkan software modern dengan
                    kebutuhan nyata shop floor manufaktur.
                  </p>
                </div>

                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-space-lg">
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
              </div>
              )}

              {/* SECTION 3: PENGALAMAN KERJA & RESUME (#resume) */}
              {activeSection === "resume" && (
              <section className="page-enter relative" id="resume">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined hidden shrink-0 text-primary text-[28px] @xl:inline-block">
                    work_history
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Riwayat Profesional &amp; Kemampuan Teknis
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-space-xl">
                  {/* Left Column: Timeline & Credentials */}
                  <div className="@3xl:col-span-7 flex flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-md">
                      <h4 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          business_center
                        </span>
                        <span>Pengalaman Kerja</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setShowEducationInResume((prev) => !prev)
                        }
                        className="text-xs font-mono text-primary hover:underline cursor-pointer"
                      >
                        {showEducationInResume
                          ? "Sembunyikan Detail Pendidikan"
                          : "+ Tampilkan Pendidikan Formal"}
                      </button>
                    </div>

                    <div className="relative pl-6 space-y-space-lg before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-elevated">
                      {EXPERIENCE_DATA.map((exp) => (
                        <div key={exp.id} className="relative group">
                          <div
                            className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-base border-2 transition-transform ${
                              exp.isCurrent
                                ? "border-primary-container group-hover:scale-125 shadow-[0_0_8px_#04b4e0]"
                                : "border-outline-variant group-hover:border-primary-container"
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
                                    ? "bg-primary-container/10 text-primary border border-primary-container/20"
                                    : "bg-surface-elevated text-text-muted"
                                }`}
                              >
                                {exp.period}
                              </span>
                            </div>
                            <p
                              className={`font-label-md text-label-md font-medium mb-space-xs ${
                                exp.companyColor === "primary"
                                  ? "text-primary"
                                  : exp.companyColor === "secondary"
                                    ? "text-secondary"
                                    : "text-text-secondary"
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
                              <span className="font-mono text-xs text-primary">
                                {edu.period}
                              </span>
                            </div>
                            <div className="text-xs text-secondary font-medium mt-0.5">
                              {edu.institution}{edu.gpa ? ` · ${edu.gpa}` : ""}
                            </div>
                            {edu.focus && (
                              <p className="text-body-sm text-text-muted mt-1">
                                {edu.focus}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sertifikasi Profesional Section Below Timeline */}
                    {CERTIFICATES_DATA.length > 0 && (
<div className="mt-space-lg pt-space-md border-t border-border-subtle">
                      <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          verified
                        </span>
                        <span>Sertifikasi Profesional</span>
                      </h4>
                      <div className="grid grid-cols-1 @xl:grid-cols-2 gap-space-sm">
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
)}
                  </div>

                  {/* Right Column: Skills Progress Bars & Domain Tag Cloud */}
                  <div className="@3xl:col-span-5 flex flex-col space-y-space-lg">
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
                                className="h-full bg-primary-container rounded-full shadow-[0_0_8px_#04b4e0]"
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
                                  ? "border-primary/40 text-primary"
                                  : "border-border-subtle text-text-secondary hover:border-primary/50"
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
              )}

              {/* SECTION 4: KARYA REKAYASA & STUDI KASUS (#portfolio) */}
              {activeSection === "portfolio" && (
              <section className="page-enter relative" id="portfolio">
                <div className="flex flex-col @2xl:flex-row @2xl:items-end justify-between gap-space-md mb-space-lg">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                      Portofolio Pilihan
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                      Karya Rekayasa &amp; Studi Kasus
                    </h3>
                  </div>

                  {/* Interactive Filter Tabs */}
                  <div className="flex max-w-full flex-wrap items-center gap-1 p-1 bg-surface-card rounded-3xl border border-border-subtle self-start">
                    {[
                      { id: "all" as const, label: "Semua" },
                      {
                        id: "manufacturing" as const,
                        label: "Enterprise & PPIC",
                      },
                      { id: "web" as const, label: "Web Applications" },
                                          ].map((tab) => {
                      const active = portfolioFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPortfolioFilter(tab.id)}
                          className={`px-4 py-1.5 rounded-full text-label-sm font-label-md transition-all cursor-pointer whitespace-nowrap ${
                            active
                              ? "bg-primary-container text-surface-base shadow-[0_0_12px_rgba(4,180,224,0.3)]"
                              : "text-text-muted hover:text-text-primary"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Column Project Grid */}
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-space-lg">
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
              )}

              {/* SECTION 5: CATATAN TEKNIS / TECHNICAL NOTES (#blog — PRD Section 3.5) */}
              {activeSection === "blog" && (
              <section className="page-enter relative" id="blog">
                <div className="flex items-center justify-between mb-space-lg">
                  <div className="flex items-center gap-space-sm flex-1">
                    <span className="material-symbols-outlined hidden shrink-0 text-primary text-[28px] @xl:inline-block">
                      article
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-text-primary">
                      Catatan Teknis &amp; Arsitektur
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-space-lg">
                  {TECHNICAL_NOTES_DATA.map((note) => (
                    <article
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className="bg-surface-card p-space-lg rounded-xl border border-border-subtle hover:border-primary/60 transition-all group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-primary mb-2">
                          <span>{note.category}</span>
                          <span className="text-text-muted">·</span>
                          <span className="text-text-muted">{note.date}</span>
                          <span className="text-text-muted">·</span>
                          <span className="text-text-muted">
                            {note.readTime}
                          </span>
                        </div>
                        <h4 className="font-headline-md text-headline-sm text-text-primary group-hover:text-primary transition-colors mb-2">
                          {note.title}
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed mb-space-md">
                          {note.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border-subtle/60">
                        <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-text-muted">
                          {note.tags.slice(0, 3).map((t, i) => (
                            <React.Fragment key={t}>
                              <span className="whitespace-nowrap">{t}</span>
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
              )}

              {/* SECTION 6: MULAI KOLABORASI PROFESIONAL (#contact) */}
              {activeSection === "contact" && (
              <section className="page-enter relative" id="contact">
                <div className="flex items-center gap-space-sm mb-space-lg">
                  <span className="material-symbols-outlined hidden shrink-0 text-primary text-[28px] @xl:inline-block">
                    contact_mail
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">
                    Mulai Kolaborasi Profesional
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border-subtle to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-space-xl">
                  {/* Left: Quick Info Cards */}
                  <div className="@3xl:col-span-5 flex flex-col justify-between space-y-space-md">
                    <div className="space-y-space-md">
                      <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                        Tertarik mendiskusikan kebutuhan arsitektur sistem
                        enterprise, konsultasi digitalisasi manufaktur, atau
                        peluang rekrutmen engineering? Silakan hubungi saya
                        melalui form atau saluran langsung berikut.
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
                            <span className="material-symbols-outlined text-[24px]">
                              call
                            </span>
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
                            <span className="material-symbols-outlined text-[24px]">
                              mail
                            </span>
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
                      <span className="material-symbols-outlined hidden shrink-0 text-primary text-[28px] @xl:inline-block">
                        schedule
                      </span>
                      <div className="font-body-sm text-body-sm text-text-muted">
                        Respons rata-rata dalam{" "}
                        <strong className="text-text-primary">1x24 jam</strong>{" "}
                        kerja untuk diskusi teknis &amp; proposal arsitektur.
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Contact Form */}
                  <div className="@3xl:col-span-7 bg-surface-card p-space-xl rounded-xl border border-border-subtle shadow-xl">
                    <form
                      className="space-y-space-md"
                      onSubmit={handleContactSubmit}
                    >
                      <div className="grid grid-cols-1 @xl:grid-cols-2 gap-space-md">
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
                        className="w-full py-3.5 px-space-lg rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-label-md flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(4,180,224,0.35)] hover:bg-primary transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {formSubmitted ? "done" : "send"}
                        </span>
                        <span>
                          {formSubmitted
                            ? "Pesan Terkirim"
                            : "Kirim Pesan Langsung"}
                        </span>
                      </button>

                      {formSubmitted && (
                        <div className="p-3.5 rounded-lg bg-primary-container/10 border border-primary-container/30 text-primary font-label-md text-label-md flex flex-col @xl:flex-row @xl:items-center justify-between gap-2">
                          <span>
                            Terima kasih, <strong>{formName}</strong>! Pesan
                            mengenai &ldquo;
                            {formSubject}&rdquo; telah diterima dan akan
                            direspons ke{" "}
                            <span className="underline">{formEmail}</span> dalam
                            1x24 jam.
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
              )}
              </div>
            </div>
          </main>

          {/* Right icon navigation (desktop) */}
          <nav
            aria-label="Navigasi Seksi Utama"
            className="absolute -right-[94px] top-0 hidden w-[70px] flex-col items-center gap-1 rounded-full bg-[var(--nav-bg)] py-4 shadow-[var(--card-shadow)] transition-colors duration-300 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  title={item.label}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id);
                  }}
                  className={`group relative flex h-[50px] w-full items-center justify-center transition-colors ${
                    isActive
                      ? "text-[#04b4e0]"
                      : "text-text-muted hover:text-[#04b4e0]"
                  }`}
                >
                  <NavIcon id={item.id} size={34} />
                  <span className="pointer-events-none absolute right-[76px] origin-right scale-0 whitespace-nowrap rounded-full bg-[var(--nav-bg)] px-3 py-1 text-[12px] font-medium text-text-primary shadow-lg transition-transform group-hover:scale-100">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Prev / next arrows (desktop) */}
          <div className="absolute -right-[84px] bottom-0 hidden w-[60px] flex-col items-center rounded-full bg-[var(--nav-bg)] py-2 shadow-[var(--card-shadow)] transition-colors duration-300 lg:flex">
            <button
              type="button"
              aria-label="Halaman berikutnya"
              onClick={() => goRelative(1)}
              className="flex h-12 w-full cursor-pointer items-center justify-center text-text-muted transition-colors hover:text-[#04b4e0]"
            >
              <span className="material-symbols-outlined icon-thin text-[34px]">
                chevron_right
              </span>
            </button>
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              onClick={() => goRelative(-1)}
              className="flex h-12 w-full cursor-pointer items-center justify-center text-text-muted transition-colors hover:text-[#04b4e0]"
            >
              <span className="material-symbols-outlined icon-thin text-[34px]">
                chevron_left
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom navigation (mobile / tablet) */}
      <nav
        aria-label="Navigasi Seksi Utama"
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-full bg-[var(--nav-bg)] px-2 py-1 shadow-[var(--card-shadow)] lg:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigateToSection(item.id);
              }}
              className={`flex h-12 w-12 items-center justify-center transition-colors ${
                isActive ? "text-[#04b4e0]" : "text-text-muted"
              }`}
            >
              <NavIcon id={item.id} size={28} />
            </a>
          );
        })}
      </nav>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={handleInquireProject}
      />

      {/* Technical Note Reader Modal */}
      <TechNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />
    </div>
  );
}
