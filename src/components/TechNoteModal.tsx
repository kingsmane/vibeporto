import React, { useEffect } from 'react';
import { TechnicalNoteItem } from '../data/portfolioData';

interface TechNoteModalProps {
  note: TechnicalNoteItem | null;
  onClose: () => void;
}

export const TechNoteModal: React.FC<TechNoteModalProps> = ({ note, onClose }) => {
  useEffect(() => {
    if (!note) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [note, onClose]);

  if (!note) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tech-note-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-card border border-border-subtle rounded-xl shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-surface-base border-b border-border-subtle shrink-0">
          <div className="min-w-0 pr-4">
            <div className="text-xs font-mono text-primary">
              {note.category} · {note.date} · {note.readTime}
            </div>
            <h3
              id="modal-tech-note-title"
              className="font-headline-sm text-headline-sm text-text-primary mt-0.5"
            >
              {note.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup catatan teknis"
            className="w-10 h-10 rounded-full bg-surface-elevated text-text-secondary hover:text-primary transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-surface-base p-4 rounded-xl border border-border-subtle">
            <h4 className="font-headline-sm text-sm text-text-primary mb-1.5">
              Latar Belakang Teknis & Permasalahan
            </h4>
            <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
              {note.content.challenge}
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-headline-sm text-sm text-text-primary">
              Pendekatan Arsitektur & Langkah Optimasi
            </h4>
            <ul className="space-y-2 text-body-md text-text-secondary">
              {note.content.approach.map((step, idx) => (
                <li
                  key={idx}
                  className="bg-surface-base p-3.5 rounded-lg border border-border-subtle flex items-start gap-3"
                >
                  <span className="font-mono text-xs text-primary font-bold mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-headline-sm text-sm text-text-primary">
              Implementasi Konfigurasi / Query
            </h4>
            <pre className="p-4 rounded-xl bg-[#0e1112] border border-border-subtle font-mono text-xs text-primary overflow-x-auto leading-relaxed">
              <code>{note.content.codeSnippet}</code>
            </pre>
          </div>

          <div className="bg-surface-base p-4 rounded-xl border border-primary/30">
            <div className="text-xs font-mono text-primary mb-1">HASIL BENCHMARK PRODUKSI</div>
            <p className="font-body-md text-body-md text-text-primary">
              {note.content.benchmarkResult}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
