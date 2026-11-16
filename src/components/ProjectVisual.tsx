import React, { useState } from 'react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectThumbnailProps {
  project: ProjectCaseStudy;
}

export const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-surface-elevated">
      {!imageError ? (
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <FallbackIndustrialCanvas project={project} mode="dashboard" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-80 pointer-events-none" />
      <div
        className={`absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm border ${
          project.categoryColor === 'secondary'
            ? 'text-secondary border-secondary/20'
            : 'text-primary border-primary/20'
        }`}
      >
        {project.categoryLabel}
      </div>
    </div>
  );
};

interface FallbackCanvasProps {
  project: ProjectCaseStudy;
  mode: 'dashboard' | 'architecture' | 'telemetry';
}

export const FallbackIndustrialCanvas: React.FC<FallbackCanvasProps> = ({ project, mode }) => {
  if (mode === 'architecture') {
    return (
      <div className="w-full h-full bg-[#151819] p-4 flex flex-col justify-between relative overflow-hidden select-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(#00d2d3 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative z-10 flex items-center justify-between border-b border-border-subtle pb-2">
          <span className="font-mono text-[11px] text-primary">
            SYSTEM_TOPOLOGY :: {project.id.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-text-muted">HIGH-AVAILABILITY 99.8%</span>
        </div>

        <div className="relative z-10 my-auto grid grid-cols-3 gap-2 items-center py-2">
          <div className="bg-surface-card border border-primary/30 rounded-lg p-2.5 text-center">
            <div className="text-[10px] font-mono text-primary">EDGE / CLIENT</div>
            <div className="text-xs font-semibold text-text-primary mt-0.5">{project.techStack[2] || 'Terminal'}</div>
            <div className="text-[10px] text-text-muted mt-0.5">QR / Sensor Input</div>
          </div>
          <div className="bg-surface-card border border-secondary/40 rounded-lg p-2.5 text-center relative">
            <div className="text-[10px] font-mono text-secondary">CORE ENGINE</div>
            <div className="text-xs font-semibold text-text-primary mt-0.5">{project.techStack[0]}</div>
            <div className="text-[10px] text-text-muted mt-0.5">Worker & API Bus</div>
          </div>
          <div className="bg-surface-card border border-primary/30 rounded-lg p-2.5 text-center">
            <div className="text-[10px] font-mono text-primary">DATA STORE</div>
            <div className="text-xs font-semibold text-text-primary mt-0.5">{project.techStack[1]}</div>
            <div className="text-[10px] text-text-muted mt-0.5">Indexed Storage</div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border-subtle pt-1.5">
          <span>DOCKER SWARM CLUSTER</span>
          <span className="text-primary">LATENCY &lt; 25ms</span>
        </div>
      </div>
    );
  }

  if (mode === 'telemetry') {
    return (
      <div className="w-full h-full bg-[#14171a] p-4 flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-border-subtle pb-2">
          <span className="font-mono text-[11px] text-primary">LIVE TELEMETRY STREAM</span>
          <span className="font-mono text-[10px] text-secondary">OEE: 86.4% | RUN</span>
        </div>
        <div className="grid grid-cols-3 gap-2 my-auto py-2">
          {project.metricsImpact.map((m, idx) => (
            <div key={idx} className="bg-surface-card/90 border border-border-subtle rounded-lg p-2.5">
              <div className="font-mono text-sm font-bold text-primary tabular-nums">{m.value}</div>
              <div className="text-[10px] text-text-secondary font-medium mt-0.5 line-clamp-1">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1.5 h-10 pt-1">
          {[48, 72, 65, 88, 92, 78, 95, 84, 91, 96, 89, 94].map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-primary-container/40 border-t-2 border-primary rounded-t"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#172224] via-[#1b1b1b] to-[#141d24] p-4 flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary/80 uppercase tracking-wider">
          {project.categoryLabel}
        </span>
        <span className="font-mono text-[10px] text-text-muted">{project.completionDate}</span>
      </div>
      <div className="my-auto space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {project.metricsImpact.map((m, idx) => (
            <div key={idx} className="bg-surface-base/80 border border-border-subtle rounded p-2">
              <div className="font-mono text-xs font-bold text-primary tabular-nums">{m.value}</div>
              <div className="text-[10px] text-text-muted truncate">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {project.techStack.map((t) => (
          <span key={t} className="text-[10px] font-mono text-text-secondary bg-surface-base/90 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
