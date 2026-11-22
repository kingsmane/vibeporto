export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'manufacturing' | 'web';
  categoryLabel: string;
  categoryColor: 'primary' | 'secondary';
  shortDescription: string;
  imageUrl: string;
  imageAlt: string;
  techStack: string[];
  clientIndustry: string;
  completionDate: string;
  role: string;
  problemStatement: string;
  engineeringSolution: string;
  architectureHighlights: string[];
  metricsImpact: { label: string; value: string; detail: string }[];
  liveDemoUrl: string;
  repoUrl: string;
  slides: {
    title: string;
    caption: string;
    type: 'dashboard' | 'architecture' | 'telemetry';
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  company: string;
  isCurrent?: boolean;
  companyColor?: 'primary' | 'secondary' | 'neutral';
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  period: string;
  institution: string;
  gpa?: string;
  focus?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
}

export interface TechnicalNoteItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: {
    challenge: string;
    approach: string[];
    codeSnippet: string;
    benchmarkResult: string;
  };
}

export const PROFILE_DATA = {
  name: 'Herman Sadi',
  title: 'Full-Stack Developer',
  statusText: 'Tersedia untuk Peluang Penuh & Konsultasi IT (Open to Work)',
  headerStatus: 'Available for ERP & Full-Stack Projects',
  heroKicker: 'Portofolio Profesional Herman Sadi',
  rotatingRoles: [
    'Full-Stack Web Developer',
    'ERP & Manufacturing System Developer',
    'HRIS & Workflow Approval Developer',
    'Database (MySQL & PostgreSQL) Specialist',
  ],
  heroBadges: [
    { icon: 'code', label: 'Full-Stack Developer', filterTarget: 'web' as const },
    { icon: 'precision_manufacturing', label: 'ERP & Manufacturing Systems', filterTarget: 'manufacturing' as const },
    { icon: 'groups', label: 'HRIS & Workflow Approval', filterTarget: 'web' as const },
    { icon: 'dns', label: 'Database & Linux Server', filterTarget: 'all' as const },
  ],
  location: 'Indonesia (Remote / On-Site)',
  experienceYears: 'Sejak 2021 (Full-Stack Developer)',
  availability: 'Rekrutmen & Konsultasi',
  email: 'herman.sadi@gmail.com',
  phone: '+62 812-89540814',
  whatsappUrl: 'https://wa.me/6281289540814',
  githubUrl: '',
  linkedinUrl: '',
  cvFileName: 'CV_HermanSadi_FullStackDeveloper.pdf',
  copyrightYear: '2026',
};

export const SERVICES_DATA = [
  {
    id: 'enterprise-web',
    icon: 'terminal',
    title: 'Enterprise Web Applications',
    description:
      'Perancangan arsitektur, pengembangan API di backend, hingga antarmuka yang responsif dan mudah dipakai, dengan logika bisnis kompleks dan sistem berbasis role/permission.',
    tags: ['Laravel', 'CodeIgniter', 'Node.js / Express', 'React.js', 'RESTful API'],
  },
  {
    id: 'manufacturing-erp',
    icon: 'precision_manufacturing',
    title: 'ERP & Manufacturing Systems',
    description:
      'Arsitektur ERP terintegrasi untuk beberapa plant produksi, pelacakan WIP real-time melalui integrasi sensor machine press, serta kebutuhan material produksi secara real-time.',
    tags: ['ERP', 'WIP Real-Time Tracking', 'Sensor Machine Press', 'Material Planning'],
  },
  {
    id: 'hris-workflow',
    icon: 'groups',
    title: 'HRIS & Workflow Systems',
    description:
      'Human Resources Information System, workflow approval digital, tools management system, dan one gate system untuk kebutuhan operasional perusahaan.',
    tags: ['HRIS', 'Workflow Approval Digital', 'Tools Management', 'One Gate System'],
  },
  {
    id: 'database-server',
    icon: 'database',
    title: 'Database & Server',
    description:
      'Desain skema dan optimasi query pada basis data relasional MySQL dan PostgreSQL, serta konfigurasi web server Nginx dan pemeliharaan server Linux Ubuntu.',
    tags: ['MySQL', 'PostgreSQL', 'Nginx', 'Linux Ubuntu Server'],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Project ERP',
    period: '2025 — Sekarang',
    company: 'PT GMSI',
    isCurrent: true,
    companyColor: 'primary',
    description:
      'Memimpin proyek ERP (Enterprise Resource Planning) terintegrasi di 4 plant produksi dengan 99.8% uptime, termasuk pelacakan WIP real-time dan kebutuhan material produksi.',
    achievements: [
      'Merancang ulang arsitektur ERP (Enterprise Resource Planning) terintegrasi di 4 plant produksi dengan 99.8% uptime.',
      'Mengimplementasikan pelacakan WIP real-time menggunakan integrasi sensor machine press.',
      'Realtime kebutuhan material produksi.',
    ],
    techUsed: ['React.js', 'Express.js', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'exp-2',
    role: 'Senior Full-Stack Developer',
    period: '2021 — Sekarang',
    company: 'PT TSRT',
    isCurrent: true,
    companyColor: 'secondary',
    description:
      'Membangun sistem internal perusahaan: Human Resources Information System, workflow approval digital, tools management system, dan one gate system.',
    achievements: [
      'Human Resources Information System.',
      'Workflow Approval Digital.',
      'Tools Management System.',
      'One Gate System.',
    ],
    techUsed: ['CodeIgniter', 'Laravel', 'RESTful API', 'MySQL'],
  },
  {
    id: 'exp-3',
    role: 'Systems Analyst & Web Developer',
    period: '2024 — Sekarang',
    company: 'PT HITEK',
    isCurrent: true,
    companyColor: 'neutral',
    description:
      'Menganalisis kebutuhan dan mengembangkan sistem ERP, HRIS, serta modul integrasi sensor mesin untuk proses produksi real-time.',
    achievements: [
      'ERP System.',
      'Human Resources Information System.',
      'Mengembangkan modul integrasi sensor machine realtime production process.',
    ],
    techUsed: ['PHP', 'MySQL', 'PostgreSQL', 'RESTful API', 'React.js', 'Express.js', 'Linux Ubuntu Server'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Diploma — Manajemen Informatika',
    period: '2005 — 2008',
    institution: 'STMI Bani Saleh',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [];

export const SKILLS_PROGRESS_DATA = [
  { label: 'Backend (PHP/Laravel, Node.js, REST API)', percentage: 95 },
  { label: 'Manufacturing & PPIC Workflows', percentage: 94 },
  { label: 'Database Architecture & Index Tuning', percentage: 92 },
  { label: 'Frontend (React.js, Tailwind CSS, TypeScript)', percentage: 88 },
];

export const DOMAIN_TAGS_DATA = [
  { label: 'ERP', highlighted: true },
  { label: 'HRIS', highlighted: false },
  { label: 'Workflow Approval Digital', highlighted: false },
  { label: 'WIP Real-Time Tracking', highlighted: false },
  { label: 'Sensor Machine Press', highlighted: false },
  { label: 'RESTful API', highlighted: false },
  { label: 'MySQL & PostgreSQL', highlighted: false },
  { label: 'Nginx', highlighted: false },
  { label: 'Linux Ubuntu Server', highlighted: false },
  { label: 'React.js', highlighted: false },
];

const IMG_PPIC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBvwEoZtRX2aDjqAGpaAMyQoOgq8TNxA2ZxsvID0uCQokqgFu9jEwL0gDBrmlFPlkKByFOmKfHXIVKLBfOy8ix_zCBkME8xVes6BCHr3g-3BDt1VLSI4SywyMJdFuluYzW5suWJwjVt-8YS8NnRJ5QPjxefT_jXeH3Ccrm1siFttirVoUd2Haau2VefXPF2oscXuLDvNsFUP5ryVlJ52tu8nI0m40ekuLkTqQvyysCF';
const IMG_ERP =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBv9hg8nnsESXkrbMRBKr5ybLZ5Hv9H6fqxcCBWe9KGsaG9Bi6y6sZef5KHOpTHv5pIbwFGU7R5ZvSPNxkr0Y00ghEhw0srkRl_9zFncmMVImxyWRnqosPCxVbqjfBuNYP9f6x_qK6rrAqO4cYQZ_ORWa_LZeUMQ_Eefiz4aq6dL8leFM-1g3VgsKvZgu9RlkRXawE98Ro3cnUc32E-iojMPMEZCOI8-qw7W35__WkN';

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'ppic-wip-tracking',
    title: 'Sistem Informasi PPIC & Tracking WIP Manufaktur',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing Core',
    categoryColor: 'primary',
    shortDescription:
      'Platform digitalisasi live monitoring terintegrasi sensor untuk progress produksi, serta manajemen PPIC.',
    imageUrl: IMG_PPIC,
    imageAlt: 'Antarmuka monitoring produksi dan pelacakan WIP real-time di lantai pabrik.',
    techStack: ['Express.js', 'PostgreSQL', 'React.js', 'Tailwind'],
    clientIndustry: 'Manufaktur',
    completionDate: '2025',
    role: 'Lead Project ERP',
    problemStatement:
      'Progres produksi dan kebutuhan material di lantai produksi perlu dipantau secara langsung, tanpa menunggu rekapitulasi manual.',
    engineeringSolution:
      'Membangun platform live monitoring yang terintegrasi dengan sensor machine press untuk memantau progres produksi dan WIP secara real-time, serta mengelola PPIC dan kebutuhan material produksi.',
    architectureHighlights: [
      'Integrasi sensor machine press untuk pelacakan WIP real-time.',
      'Perhitungan kebutuhan material produksi secara real-time.',
      'Backend Express.js dengan PostgreSQL dan frontend React.js.',
    ],
    metricsImpact: [
      { label: 'Pelacakan WIP', value: 'Real-Time', detail: 'Terintegrasi dengan sensor machine press' },
      { label: 'Kebutuhan Material', value: 'Real-Time', detail: 'Kebutuhan material produksi dipantau langsung' },
      { label: 'Jangkauan', value: '4 Plant', detail: 'Arsitektur terintegrasi di 4 plant produksi' },
    ],
    liveDemoUrl: '',
    repoUrl: '',
    slides: [
      {
        title: 'Live Monitoring Progress Produksi',
        caption: 'Pemantauan progres produksi dan WIP secara real-time dari data sensor machine press.',
        type: 'telemetry',
      },
      {
        title: 'Manajemen PPIC & Material Produksi',
        caption: 'Perencanaan produksi dan kebutuhan material produksi secara real-time.',
        type: 'dashboard',
      },
    ],
  },
  {
    id: 'erp-multi-branch',
    title: 'Enterprise Resource Planning (ERP) Multi-Cabang',
    category: 'web',
    categoryLabel: 'Web Enterprise',
    categoryColor: 'secondary',
    shortDescription:
      'Sistem ERP terintegrasi untuk beberapa plant produksi dengan 99.8% uptime.',
    imageUrl: IMG_ERP,
    imageAlt: 'Dashboard aplikasi web ERP dengan data tabel dan grafik.',
    techStack: ['React.js', 'Express.js', 'PostgreSQL', 'Nginx'],
    clientIndustry: 'Manufaktur Multi-Plant',
    completionDate: '2025',
    role: 'Lead Project ERP',
    problemStatement:
      'Operasional di beberapa plant produksi membutuhkan satu sistem terpadu yang andal dan selalu tersedia.',
    engineeringSolution:
      'Merancang ulang arsitektur ERP terintegrasi di 4 plant produksi menggunakan React.js, Express.js, dan PostgreSQL, dengan Nginx di sisi server.',
    architectureHighlights: [
      'Arsitektur ERP terintegrasi untuk 4 plant produksi.',
      'Frontend React.js dan backend Express.js dengan database PostgreSQL.',
      'Nginx sebagai web server / reverse proxy.',
    ],
    metricsImpact: [
      { label: 'Uptime', value: '99.8%', detail: 'Ketersediaan sistem ERP' },
      { label: 'Plant Terintegrasi', value: '4 Plant', detail: 'Plant produksi dalam satu sistem' },
      { label: 'Stack', value: 'React + Express', detail: 'Dengan PostgreSQL dan Nginx' },
    ],
    liveDemoUrl: '',
    repoUrl: '',
    slides: [
      {
        title: 'Dashboard ERP Multi-Plant',
        caption: 'Ringkasan operasional dari seluruh plant produksi dalam satu tampilan.',
        type: 'dashboard',
      },
      {
        title: 'Arsitektur React + Express + PostgreSQL',
        caption: 'Struktur aplikasi dengan Nginx sebagai web server.',
        type: 'architecture',
      },
    ],
  },
  {
    id: 'hris',
    title: 'Human Resources Information System (HRIS)',
    category: 'web',
    categoryLabel: 'Web Enterprise',
    categoryColor: 'secondary',
    shortDescription:
      'Sistem informasi sumber daya manusia beserta workflow approval digital, tools management, dan one gate system.',
    imageUrl: IMG_ERP,
    imageAlt: 'Aplikasi web HRIS dengan data karyawan dan alur persetujuan.',
    techStack: ['CodeIgniter', 'Laravel', 'MySQL', 'RESTful API'],
    clientIndustry: 'Korporasi',
    completionDate: '2021 — Sekarang',
    role: 'Senior Full-Stack Developer',
    problemStatement:
      'Proses SDM dan persetujuan internal membutuhkan sistem digital terpusat dengan hak akses berbasis role.',
    engineeringSolution:
      'Mengembangkan HRIS, workflow approval digital, tools management system, dan one gate system menggunakan CodeIgniter dan Laravel dengan database MySQL dan RESTful API.',
    architectureHighlights: [
      'Sistem berbasis role/permission.',
      'Workflow approval digital.',
      'Backend CodeIgniter / Laravel dengan RESTful API dan MySQL.',
    ],
    metricsImpact: [
      { label: 'Modul', value: '4 Sistem', detail: 'HRIS, Workflow Approval, Tools Mgmt, One Gate' },
      { label: 'Backend', value: 'Laravel / CI', detail: 'Dengan RESTful API' },
      { label: 'Database', value: 'MySQL', detail: 'Basis data relasional' },
    ],
    liveDemoUrl: '',
    repoUrl: '',
    slides: [
      {
        title: 'Human Resources Information System',
        caption: 'Pengelolaan data dan proses sumber daya manusia.',
        type: 'dashboard',
      },
      {
        title: 'Workflow Approval Digital',
        caption: 'Alur persetujuan digital dengan hak akses berbasis role.',
        type: 'architecture',
      },
    ],
  },
];

export const TECHNICAL_NOTES_DATA: TechnicalNoteItem[] = [
  {
    id: 'note-1',
    title: 'Optimasi Query PostgreSQL pada Tabel Transaksi WIP 50+ Juta Baris di Lini Produksi',
    category: 'Database Architecture',
    date: '12 Oktober 2026',
    readTime: '6 menit baca',
    summary:
      'Studi kasus pemangkasan waktu eksekusi query pelacakan histori lot produksi dan BOM explosion dari 11.4 detik menjadi 18 milidetik menggunakan Partitioning bulanan, Partial BrIn/B-Tree Index, dan Recursive CTE.',
    tags: ['PostgreSQL', 'Query Tuning', 'Manufacturing MES', 'ERD Design'],
    content: {
      challenge:
        'Pada pabrik yang beroperasi 3 shift (24/7) dengan ribuan scan barcode per jam, tabel wip_scan_events tumbuh melampaui 50 juta baris. Query dashboard untuk menampilkan posisi terakhir setiap Work Order mulai mengalami sequential scan berat yang menghambat respon terminal scanner di shop-floor.',
      approach: [
        'Menerapkan Declarative Range Partitioning berdasarkan bulan produksi (scanned_at) sehingga query operasional harian hanya memindai partisi aktif.',
        'Mendesain Covering Partial Index khusus untuk Work Order berstatus IN_PROGRESS (CREATE INDEX idx_wip_active ON wip_logs (work_order_id, station_id) INCLUDE (qty_good, updated_at) WHERE status = \'ACTIVE\').',
        'Memisahkan tabel transaksi panas (Hot Operational Store) dari agregasi pelaporan historis menggunakan Materialized Views yang di-refresh secara konkurensi.',
      ],
      codeSnippet: `-- Covering Partial Index untuk Work Order Aktif di Lantai Produksi
CREATE INDEX CONCURRENTLY idx_wip_active_station
ON shopfloor_wip_events (work_order_id, work_center_id, scanned_at DESC)
INCLUDE (lot_number, qty_ok, qty_ng, cycle_time_sec)
WHERE lot_status IN ('IN_QUEUE', 'PROCESSING');`,
      benchmarkResult:
        'Execution time pada EXPLAIN ANALYZE turun dari 11,420 ms menjadi 14.6 ms (99.8% peningkatan kecepatan) dengan penurunan beban CPU database server dari 78% menjadi 12%.',
    },
  },
  {
    id: 'note-2',
    title: 'Arsitektur High-Availability MQTT & WebSocket untuk Telemetri OEE 120 Mesin CNC',
    category: 'Industrial IoT & DevOps',
    date: '28 September 2026',
    readTime: '5 menit baca',
    summary:
      'Pola perancangan jaringan lokal pabrik (On-Premise Linux Server) yang tahan terhadap putus koneksi sementara (network partitioning) dengan local ring-buffer dan Docker Swarm.',
    tags: ['MQTT', 'WebSockets', 'Docker Swarm', 'Linux Nginx', 'OEE'],
    content: {
      challenge:
        'Lingkungan lantai pabrik memiliki interferensi elektromagnetik tinggi yang sesekali memutus koneksi Wi-Fi edge gateway selama beberapa detik. Tanpa mekanisme buffering dan QoS yang tepat, data counter stroke mesin dapat hilang dan menyebabkan perhitungan Performance & Availability OEE menjadi tidak akurat.',
      approach: [
        'Menggunakan MQTT QoS Level 1 dengan Persistent Session pada broker Mosquitto yang di-cluster di balik Nginx Stream Load Balancer.',
        'Menambahkan SQLite ring-buffer lokal pada setiap node IoT Edge sehingga saat jaringan terputus, payload sensor tetap tersimpan dengan timestamp presisi milidetik dan dikirim ulang secara berurutan (FIFO) saat koneksi pulih.',
        'Memanfaatkan Redis Pub/Sub sebagai message bus menuju server WebSocket untuk menyiarkan perubahan status mesin ke puluhan layar TV Andon secara serentak.',
      ],
      codeSnippet: `# Konfigurasi Worker Konsumer Telemetri dengan Idempotent Deduplication
async def process_machine_pulse(payload: dict):
    event_key = f"plc:{payload['machine_id']}:{payload['seq_id']}"
    if await redis.set(event_key, 1, nx=True, ex=3600):
        await timescaledb.insert_telemetry(payload)
        await websocket_hub.broadcast_channel("andon_live", payload)`,
      benchmarkResult:
        '0% kehilangan paket data (Zero Data Loss) selama simulasi pemutusan jaringan 15 menit, dengan rata-rata latensi end-to-end 145ms pada 120 mesin aktif.',
    },
  },
];
