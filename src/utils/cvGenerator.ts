import {
  CERTIFICATES_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PORTFOLIO_PROJECTS,
  PROFILE_DATA,
  SKILLS_PROGRESS_DATA,
} from '../data/portfolioData';

/**
 * Escapes characters for PDF string literals
 */
function escapePdfText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/—/g, '-')
    .replace(/•/g, '*');
}

/**
 * Generates a valid, multi-section standard PDF binary (PDF-1.4) in memory
 * and triggers an instant browser download as `CV_HermanSadi_FullStackDeveloper.pdf`.
 */
export function downloadCompleteCvPdf(): void {
  const lines: { text: string; size: number; bold?: boolean; indent?: number; gapBefore?: number }[] = [
    { text: 'HERMAN SADI', size: 16, bold: true },
    { text: PROFILE_DATA.title, size: 11, bold: true, gapBefore: 4 },
    {
      text: `Domisili: ${PROFILE_DATA.location}  |  Email: ${PROFILE_DATA.email}  |  Telp/WA: ${PROFILE_DATA.phone}`,
      size: 9,
      gapBefore: 4,
    },
    {
      text: '----------------------------------------------------------------------------------------------------------------',
      size: 9,
      gapBefore: 6,
    },
    { text: 'RINGKASAN EKSEKUTIF', size: 11, bold: true, gapBefore: 8 },
    {
      text: 'Full-Stack Developer yang membangun aplikasi web end-to-end, mulai dari perancangan arsitektur dan',
      size: 9.5,
      gapBefore: 4,
    },
    {
      text: 'basis data, pengembangan API di backend, hingga antarmuka yang responsif dan mudah dipakai.',
      size: 9.5,
    },
    {
      text: 'Menguasai PHP (Laravel / CodeIgniter), Node.js (Express), React, serta basis data PostgreSQL dan MySQL.',
      size: 9.5,
    },
    {
      text: 'Terbiasa menangani sistem skala enterprise: ERP, HRIS, monitoring produksi, dan sistem berbasis',
      size: 9.5,
    },
    {
      text: 'role/permission. Mampu menerjemahkan kebutuhan bisnis menjadi solusi teknis yang andal dan mudah dirawat.',
      size: 9.5,
    },
    { text: 'RIWAYAT PENGALAMAN KERJA', size: 11, bold: true, gapBefore: 12 },
  ];

  EXPERIENCE_DATA.forEach((exp) => {
    lines.push({
      text: `${exp.role}  (${exp.period})`,
      size: 10,
      bold: true,
      gapBefore: 6,
    });
    lines.push({
      text: `${exp.company}  |  Tech: ${exp.techUsed.join(', ')}`,
      size: 9,
      bold: true,
    });
    exp.achievements.forEach((ach) => {
      lines.push({
        text: `* ${ach}`,
        size: 8.8,
        indent: 10,
      });
    });
  });

  lines.push({ text: 'KEAHLIAN TEKNIS & TINGKAT PENGUASAAN', size: 11, bold: true, gapBefore: 12 });
  SKILLS_PROGRESS_DATA.forEach((skill) => {
    lines.push({
      text: `* ${skill.label}: ${skill.percentage}%`,
      size: 9,
      indent: 8,
    });
  });

  lines.push({ text: '* Database (MySQL & PostgreSQL)', size: 9, indent: 8 });

  lines.push({ text: 'PROYEK UNGGULAN & STUDI KASUS', size: 11, bold: true, gapBefore: 12 });
  PORTFOLIO_PROJECTS.forEach((proj) => {
    lines.push({
      text: `${proj.title} [${proj.categoryLabel}] - Stack: ${proj.techStack.join(', ')}`,
      size: 9.5,
      bold: true,
      gapBefore: 4,
    });
    lines.push({
      text: `  ${proj.shortDescription}`,
      size: 8.8,
      indent: 8,
    });
  });

  lines.push({ text: 'PENDIDIKAN & SERTIFIKASI PROFESIONAL', size: 11, bold: true, gapBefore: 12 });
  EDUCATION_DATA.forEach((edu) => {
    lines.push({
      text: `${edu.degree} - ${edu.institution} (${edu.period})${edu.gpa ? ` | ${edu.gpa}` : ''}`,
      size: 9.2,
      bold: true,
      gapBefore: 4,
    });
  });
  CERTIFICATES_DATA.forEach((cert) => {
    lines.push({
      text: `* ${cert.title} (${cert.subtitle}) - ID: ${cert.credentialId} (${cert.issueDate})`,
      size: 8.8,
      indent: 8,
    });
  });

  // Build PDF content stream
  let y = 795;
  const streamCommands: string[] = [];

  lines.forEach((line) => {
    if (line.gapBefore) {
      y -= line.gapBefore;
    }
    const fontKey = line.bold ? '/F2' : '/F1';
    const x = 45 + (line.indent || 0);
    streamCommands.push(`BT ${fontKey} ${line.size} Tf ${x} ${y} Td (${escapePdfText(line.text)}) Tj ET`);
    y -= line.size + 4.5;
  });

  const contentStream = streamCommands.join('\n');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj',
    `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj',
  ];

  let pdfBody = '%PDF-1.4\n';
  const offsets: number[] = [0];

  objects.forEach((obj) => {
    offsets.push(pdfBody.length);
    pdfBody += obj + '\n';
  });

  const xrefStart = pdfBody.length;
  pdfBody += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdfBody += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdfBody += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdfBody], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = PROFILE_DATA.cvFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}
