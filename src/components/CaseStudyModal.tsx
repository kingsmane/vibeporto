import React, { useEffect, useState } from 'react';
import { ProjectCaseStudy } from '../data/portfolioData';
import { FallbackIndustrialCanvas } from './ProjectVisual';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [showLiveSimulation, setShowLiveSimulation] = useState(false);

  useEffect(() => {
    setActiveSlide(0);
    setImgFailed(false);
    setShowLiveSimulation(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentSlide = project.slides[activeSlide] || project.slides[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-study-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-card border border-border-subtle rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-base border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-primary text-[22px]">
              precision_manufacturing
            </span>
            <div className="truncate">
              <div className="text-xs font-mono text-primary">
                {project.categoryLabel} · {project.completionDate}
              </div>
              <h3
                id="modal-case-study-title"
                className="font-headline-sm text-headline-sm text-text-primary truncate"
              >
                {project.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal studi kasus"
            className="w-10 h-10 rounded-full bg-surface-elevated text-text-secondary hover:text-primary hover:bg-surface-bright transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Interactive Carousel / Visual Viewer */}
          <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface-base">
            <div className="relative h-64 sm:h-80 w-full bg-surface-elevated overflow-hidden">
              {activeSlide === 0 && !imgFailed && !showLiveSimulation ? (
                <>
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </>
              ) : (
                <FallbackIndustrialCanvas
                  project={project}
                  mode={showLiveSimulation ? 'telemetry' : currentSlide.type}
                />
              )}

              {/* Carousel Prev / Next Controls */}
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev - 1 + project.slides.length) % project.slides.length)
                }
                aria-label="Slide sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-base/85 border border-border-subtle text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % project.slides.length)}
                aria-label="Slide berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-base/85 border border-border-subtle text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>

              {/* Slide Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-primary">
                    SLIDE 0{activeSlide + 1} / 0{project.slides.length} — {currentSlide.title}
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5 max-w-2xl">
                    {currentSlide.caption}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.slides.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setShowLiveSimulation(false);
                        setActiveSlide(idx);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        activeSlide === idx && !showLiveSimulation
                          ? 'bg-primary-container text-on-primary-fixed font-semibold'
                          : 'bg-surface-card/90 text-text-muted hover:text-text-primary'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Quantitative Results Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metricsImpact.map((metric, idx) => (
              <div
                key={idx}
                className="bg-surface-base p-4 rounded-xl border border-border-subtle flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-text-muted">{metric.label}</span>
                <span className="text-2xl font-bold font-mono text-primary tabular-nums my-1">
                  {metric.value}
                </span>
                <span className="text-xs text-text-secondary">{metric.detail}</span>
              </div>
            ))}
          </div>

          {/* Problem & Engineering Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-base p-5 rounded-xl border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-text-primary font-headline-sm text-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  report_problem
                </span>
                <span>Tantangan & Masalah Bisnis</span>
              </div>
              <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="bg-surface-base p-5 rounded-xl border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-text-primary font-headline-sm text-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  architecture
                </span>
                <span>Solusi Rekayasa & Arsitektur</span>
              </div>
              <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                {project.engineeringSolution}
              </p>
            </div>
          </div>

          {/* Architecture Highlights & Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-surface-base p-5 rounded-xl border border-border-subtle space-y-3">
              <h4 className="font-headline-sm text-sm text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  verified_user
                </span>
                <span>Spesifikasi Teknis & Implementasi Inti</span>
              </h4>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                {project.architectureHighlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 bg-surface-base p-5 rounded-xl border border-border-subtle flex flex-col justify-between space-y-4">
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-text-muted block">Peran Utama</span>
                  <span className="text-text-primary font-semibold">{project.role}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Sektor Industri</span>
                  <span className="text-text-primary font-semibold">{project.clientIndustry}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Waktu Rilis Produksi</span>
                  <span className="text-text-primary font-semibold">{project.completionDate}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-text-muted block mb-2">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs text-primary">
                  {project.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < project.techStack.length - 1 && (
                        <span className="text-text-muted">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-base border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowLiveSimulation((prev) => !prev)}
              className="px-4 py-2 rounded-lg bg-surface-elevated text-text-primary hover:text-primary border border-border-subtle hover:border-primary transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">monitoring</span>
              <span>{showLiveSimulation ? 'Tampilkan Screenshot UI' : 'Simulasi Live Telemetry'}</span>
            </button>
            {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-primary border border-border-subtle transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Dokumentasi & Arsitektur</span>
            </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onInquireProject(project.title);
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-fixed font-headline-sm text-xs flex items-center gap-1.5 shadow-[0_0_14px_rgba(4,180,224,0.3)] hover:bg-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Diskusikan Sistem Serupa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
