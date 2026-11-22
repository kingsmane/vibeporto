export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'manufacturing' | 'web' | 'iot';
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
  gpa: string;
  focus: string;
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
  title: 'Full-Stack Developer & Manufacturing IT Specialist',
  statusText: 'Tersedia untuk Peluang Penuh & Konsultasi IT (Open to Work)',
  headerStatus: 'Available for MES & Full-Stack Projects',
  heroKicker: 'Portofolio Profesional Herman Sadi',
  rotatingRoles: [
    'Full-Stack Web Developer',
    'Manufacturing & PPIC System Specialist',
    'Database & Linux Server Admin',
    'High-Availability Architecture Engineer',
  ],
  heroBadges: [
    { icon: 'code', label: 'Full-Stack Developer', filterTarget: 'web' as const },
    { icon: 'precision_manufacturing', label: 'Manufacturing & PPIC Specialist', filterTarget: 'manufacturing' as const },
    { icon: 'dns', label: 'Database & Linux Server Admin', filterTarget: 'all' as const },
    { icon: 'network_check', label: 'High-Availability Architecture', filterTarget: 'iot' as const },
  ],
  location: 'Indonesia (Remote / On-Site)',
  experienceYears: '8+ Tahun Manufaktur & IT',
  availability: 'Rekrutmen & Konsultasi',
  email: 'kontak@portfolio-tech.id',
  phone: '+62 812-3456-7890',
  whatsappUrl: 'https://wa.me/6281234567890',
  githubUrl: 'https://github.com/argapratama-dev',
  linkedinUrl: 'https://linkedin.com/in/arga-pratama-skom',
  cvFileName: 'CV_ArgaPratama_FullStackDeveloper.pdf',
  copyrightYear: '2026',
};

export const SERVICES_DATA = [
  {
    id: 'enterprise-web',
    icon: 'terminal',
    title: 'Enterprise Web Applications',
    description:
      'Arsitektur modular, microservices, dan RESTful API high performance menggunakan framework modern. Mengutamakan performa loading cepat, data validation ketat, dan keamanan level enterprise.',
    tags: ['Laravel', 'Node.js', 'REST API High-Throughput', 'Vue.js'],
  },
  {
    id: 'manufacturing-ppic',
    icon: 'precision_manufacturing',
    title: 'Manufacturing & PPIC Systems',
    description:
      'Digitalisasi lini produksi dari peramalan, Bill of Materials (BOM), pelacakan Work-in-Progress (WIP), perhitungan cycle time standar, hingga integrasi barcode/QR scanner di shop-floor.',
    tags: ['BOM Management', 'Shop Floor Control', 'Cycle Time Reduction', 'Barcode Scanner'],
  },
  {
    id: 'realtime-monitoring',
    icon: 'monitoring',
    title: 'Real-Time Monitoring & Automation',
    description:
      'Dashboard analitik OEE (Overall Equipment Effectiveness) dengan telemetri live, sistem alarm downtime mesin otomatis, dan integrasi logistik internal pabrik berbasis protokol MQTT & WebSocket.',
    tags: ['OEE Analytics', 'IoT Telemetry', 'WebSocket Live Data', 'MQTT Protocol'],
  },
  {
    id: 'database-server',
    icon: 'database',
    title: 'Database Architecture & Server Deployment',
    description:
      'Perancangan skema relasional kompleks (ERD), optimasi query jutaan row (PostgreSQL/MySQL), containerization Docker, serta konfigurasi reverse proxy Nginx dan pemeliharaan server Linux lokal.',
    tags: ['PostgreSQL & MySQL', 'Docker & Swarm', 'Linux Server & Nginx', 'Query Index Tuning'],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Manufacturing Systems Engineer',
    period: '2021 — Sekarang',
    company: 'PT Industri Manufaktur Presisi Nasional',
    isCurrent: true,
    companyColor: 'primary',
    description:
      'Memimpin tim beranggotakan 6 engineer untuk mengembangkan sistem PPIC, WIP Tracking, dan integrasi mesin sensor IoT. Mengurangi bottleneck inventaris WIP hingga 32% dan memangkas waktu input laporan harian sebesar 70%.',
    achievements: [
      'Merancang ulang arsitektur MES (Manufacturing Execution System) terintegrasi di 4 plant produksi dengan 99.8% uptime.',
      'Mengimplementasikan pelacakan WIP real-time menggunakan QR/Barcode terminal dan WebSocket di 45 work-center.',
      'Menurunkan selisih stok material gudang-ke-lini produksi dari 4.8% menjadi di bawah 0.4% melalui validasi BOM multi-level.',
    ],
    techUsed: ['Laravel', 'Vue.js', 'PostgreSQL', 'MQTT', 'Docker', 'Nginx'],
  },
  {
    id: 'exp-2',
    role: 'Senior Full-Stack Developer',
    period: '2018 — 2021',
    company: 'PT Integrasi Solusi Solusindo',
    isCurrent: false,
    companyColor: 'secondary',
    description:
      'Merancang dan membangun lebih dari 9 aplikasi web enterprise B2B berbasis Laravel dan Vue.js. Mengimplementasikan CI/CD pipelines, containerization Docker, serta arsitektur database multi-cabang.',
    achievements: [
      'Membangun sistem ERP Multi-Cabang dengan sinkronisasi inventori real-time untuk 8 gudang distribusi regional.',
      'Memangkas waktu eksekusi laporan rekapitulasi finansial bulanan dari 14 menit menjadi 1.8 detik melalui composite indexing & Redis caching.',
      'Menstandarkan pipeline deployment otomatis GitLab CI/CD dengan Docker Swarm untuk 12 layanan mikro.',
    ],
    techUsed: ['Node.js', 'Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'exp-3',
    role: 'Systems Analyst & Web Developer',
    period: '2016 — 2018',
    company: 'Cipta Piranti Teknologi',
    isCurrent: false,
    companyColor: 'neutral',
    description:
      'Menjalankan requirement gathering, pemodelan database relational, serta pengembangan portal internal berbasis REST API untuk operasional logistik dan inventaris pergudangan.',
    achievements: [
      'Menyusun spesifikasi teknis & skema ERD ternormalisasi (3NF) untuk 5 sistem manajemen gudang (WMS).',
      'Mengembangkan modul integrasi barcode scanner genggam berbasis web progresif untuk mempercepat proses stock opname hingga 3x lipat.',
    ],
    techUsed: ['PHP', 'MySQL', 'RESTful API', 'JavaScript', 'Linux Ubuntu Server'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Sarjana Komputer (S.Kom.) — Teknik Informatika',
    period: '2012 — 2016',
    institution: 'Universitas Teknologi Nasional Bandung',
    gpa: 'IPK 3.82 / 4.00 (Cum Laude)',
    focus: 'Rekayasa Perangkat Lunak Enterprise, Arsitektur Basis Data Relasional & Sistem Terdistribusi',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Certified Solutions Architect',
    subtitle: 'Enterprise Cloud & Distributed Systems',
    issuer: 'Cloud Native Architecture Board',
    issueDate: 'Agustus 2023',
    credentialId: 'CSA-ID-2023-8841',
  },
  {
    id: 'cert-2',
    title: 'Enterprise Database Specialist',
    subtitle: 'High-Scale PostgreSQL Administration',
    issuer: 'PostgreSQL Professional Certification',
    issueDate: 'November 2022',
    credentialId: 'EDS-PG-2022-4190',
  },
  {
    id: 'cert-3',
    title: 'Smart Manufacturing & MES Architect',
    subtitle: 'ISA-95 Shop Floor & IIoT Telemetry',
    issuer: 'Industrial Automation Institute',
    issueDate: 'Maret 2024',
    credentialId: 'MES-IIOT-2024-1102',
  },
  {
    id: 'cert-4',
    title: 'Linux Server & Container Hardening',
    subtitle: 'Docker Swarm, Nginx & High-Availability',
    issuer: 'Linux Enterprise Foundation',
    issueDate: 'Mei 2021',
    credentialId: 'LFCS-ID-2021-7734',
  },
];

export const SKILLS_PROGRESS_DATA = [
  { label: 'Backend (PHP/Laravel, Node.js, REST API)', percentage: 95 },
  { label: 'Manufacturing IT & PPIC Workflows', percentage: 94 },
  { label: 'Database Architecture & Index Tuning', percentage: 92 },
  { label: 'Frontend (Vue.js, Tailwind CSS, TypeScript)', percentage: 88 },
  { label: 'DevOps, Docker & Linux Server Admin', percentage: 86 },
];

export const DOMAIN_TAGS_DATA = [
  { label: 'PPIC & Material Planning', highlighted: true },
  { label: 'WIP Real-Time Tracking', highlighted: false },
  { label: 'Standard Cycle Time', highlighted: false },
  { label: 'BOM Multi-Level', highlighted: false },
  { label: 'ERD High-Complexity', highlighted: false },
  { label: 'RESTful Microservices', highlighted: false },
  { label: 'Docker Containers', highlighted: false },
  { label: 'Nginx Reverse Proxy', highlighted: false },
  { label: 'Redis In-Memory Caching', highlighted: false },
  { label: 'Git CI/CD Workflows', highlighted: false },
];

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'ppic-wip-tracking',
    title: 'Sistem Informasi PPIC & Tracking WIP Manufaktur',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing Core',
    categoryColor: 'primary',
    shortDescription:
      'Platform digitalisasi lantai pabrik terintegrasi untuk pelacakan alur material, penentuan cycle time standar, serta manajemen Bill of Materials (BOM) multi-layer.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvwEoZtRX2aDjqAGpaAMyQoOgq8TNxA2ZxsvID0uCQokqgFu9jEwL0gDBrmlFPlkKByFOmKfHXIVKLBfOy8ix_zCBkME8xVes6BCHr3g-3BDt1VLSI4SywyMJdFuluYzW5suWJwjVt-8YS8NnRJ5QPjxefT_jXeH3Ccrm1siFttirVoUd2Haau2VefXPF2oscXuLDvNsFUP5ryVlJ52tu8nI0m40ekuLkTqQvyysCF',
    imageAlt:
      'High-tech manufacturing shop-floor tablet interface displaying real-time PPIC production line tracking with WIP indicators, barcode scan status, dark sleek UI with neon cyan and amber metrics on industrial factory floor with machine components.',
    techStack: ['Laravel', 'PostgreSQL', 'Vue.js', 'Tailwind'],
    clientIndustry: 'Manufaktur Komponen Otomotif & Presisi Logam',
    completionDate: 'Oktober 2024',
    role: 'Lead Systems Architect & Full-Stack Engineer',
    problemStatement:
      'Pencatatan Work-in-Progress (WIP) di 38 stasiun kerja sebelumnya dilakukan secara manual menggunakan kartu kanban fisik dan spreadsheet terpisah. Hal ini memicu keterlambatan visibilitas stok WIP hingga 16 jam, bottleneck penjadwalan mesin, serta deviasi perhitungan kebutuhan material (MRP) terhadap Bill of Materials (BOM) multi-level.',
    engineeringSolution:
      'Membangun platform MES & PPIC terpusat berbasis Laravel, Vue.js, dan PostgreSQL dengan integrasi pemindaian QR/Barcode di setiap stasiun kerja shop-floor. Setiap perpindahan lot produksi memperbarui status WIP secara real-time, memvalidasi kuota material terhadap struktur BOM 5-level, dan menghitung Standard Cycle Time secara otomatis.',
    architectureHighlights: [
      'Desain skema ERD PostgreSQL dengan Recursive CTE untuk penelusuran pohon BOM 5-level dalam waktu < 15ms.',
      'Integrasi terminal scanner industri di lantai produksi dengan sinkronisasi event-driven WebSocket.',
      'Algoritma kalkulasi kapasitas lini produksi (Rough-Cut Capacity Planning) berdasarkan historis cycle time aktual.',
    ],
    metricsImpact: [
      { label: 'Reduksi Bottleneck WIP', value: '-32%', detail: 'Penurunan penumpukan barang setengah jadi di lini perakitan' },
      { label: 'Efisiensi Laporan Harian', value: '70% Lebih Cepat', detail: 'Otomasi rekapitulasi hasil produksi shift 1, 2, dan 3' },
      { label: 'Akurasi Inventori BOM', value: '99.6%', detail: 'Sinkronisasi real-time antara gudang bahan baku & shop-floor' },
    ],
    liveDemoUrl: '#demo-ppic-mes',
    repoUrl: 'https://github.com/argapratama-dev/mes-ppic-wip-suite',
    slides: [
      {
        title: 'Shop-Floor WIP Tracking & Kanban Terminal',
        caption: 'Antarmuka operator lini produksi untuk scan QR Work Order, pelacakan kuantitas OK/NG, dan indikator Standard Cycle Time.',
        type: 'dashboard',
      },
      {
        title: 'Multi-Level BOM & MRP Explosion Engine',
        caption: 'Struktur relasional PostgreSQL Recursive CTE yang mengurai ribuan sub-assembly komponen beserta lead-time pengadaan.',
        type: 'architecture',
      },
      {
        title: 'Analitik Real-Time Output vs Target PPIC',
        caption: 'Pemantauan live pencapaian jadwal induk produksi (MPS) per stasiun kerja dengan deteksi deviasi cycle time.',
        type: 'telemetry',
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
      'Sistem ERP terpusat untuk sinkronisasi inventori antar 8 gudang regional, modul procurement terintegrasi, dan reporting keuangan otomatis dengan audit trail ketat.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBv9hg8nnsESXkrbMRBKr5ybLZ5Hv9H6fqxcCBWe9KGsaG9Bi6y6sZef5KHOpTHv5pIbwFGU7R5ZvSPNxkr0Y00ghEhw0srkRl_9zFncmMVImxyWRnqosPCxVbqjfBuNYP9f6x_qK6rrAqO4cYQZ_ORWa_LZeUMQ_Eefiz4aq6dL8leFM-1g3VgsKvZgu9RlkRXawE98Ro3cnUc32E-iojMPMEZCOI8-qw7W35__WkN',
    imageAlt:
      'Modern dark-mode enterprise resource planning ERP web application dashboard on a high resolution screen showing multi-branch inventory logistics data tables, charts, dark theme UI with glowing cyan charts.',
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    clientIndustry: 'Distribusi Industri & Logistik Nasional',
    completionDate: 'Mei 2024',
    role: 'Senior Full-Stack & Database Architect',
    problemStatement:
      'Perusahaan dengan 8 gudang distribusi regional mengalami selisih stok antar-cabang, duplikasi Purchase Order (PO), dan proses tutup buku bulanan yang memakan waktu 5 hari kerja karena sistem masih terpisah di masing-masing cabang.',
    engineeringSolution:
      'Merancang sistem ERP berbasis layanan terdistribusi menggunakan Node.js, PostgreSQL, dan Redis In-Memory Caching yang dideploy di atas klaster Docker. Menerapkan transaksi ACID ketat dengan row-level locking untuk mutasi stok antar-cabang serta pencatatan immutable audit log untuk seluruh persetujuan procurement dan jurnal akuntansi.',
    architectureHighlights: [
      'Arsitektur Multi-Tenant & Multi-Warehouse dengan mekanisme Optimistic/Pessimistic Locking pada transaksi stok paralel.',
      'Caching agresif terdistribusi menggunakan Redis untuk katalog 120.000+ SKU dan matriks harga bertingkat.',
      'Automated Financial Ledger Generator yang memetakan Goods Receipt & Invoice langsung ke jurnal buku besar.',
    ],
    metricsImpact: [
      { label: 'Waktu Rekap Finansial', value: '1.8 Detik', detail: 'Turun dari 14 menit melalui tuning composite index PostgreSQL' },
      { label: 'Sinkronisasi Gudang', value: '8 Regional', detail: 'Zero data-drift antar cabang dengan replikasi real-time' },
      { label: 'Throughput Transaksi', value: '2,400 req/dtk', detail: 'Diuji pada beban puncak penutupan kuartal' },
    ],
    liveDemoUrl: '#demo-erp-enterprise',
    repoUrl: 'https://github.com/argapratama-dev/enterprise-erp-multibranch',
    slides: [
      {
        title: 'Multi-Warehouse Inventory & Logistics Control',
        caption: 'Dashboard kendali stok lintas 8 cabang regional dengan matriks reorder point otomatis dan status pengiriman.',
        type: 'dashboard',
      },
      {
        title: 'Distributed Node.js + Redis + PostgreSQL Cluster',
        caption: 'Topologi deployment Docker Swarm dengan Nginx Load Balancer dan Redis Cache invalidation pipeline.',
        type: 'architecture',
      },
      {
        title: 'Procurement Approval & Immutable Audit Trail',
        caption: 'Pelacakan alur Purchase Request (PR) hingga Purchase Order (PO) dan 3-way matching invoice secara otomatis.',
        type: 'telemetry',
      },
    ],
  },
  {
    id: 'oee-machine-monitoring',
    title: 'Dashboard Pemantauan Mesin & Analitik OEE',
    category: 'iot',
    categoryLabel: 'Otomasi Pabrik & IoT',
    categoryColor: 'primary',
    shortDescription:
      'Sistem analitik efisiensi mesin secara live berbasis transmisi MQTT & WebSocket. Mendeteksi anomaly vibrasi serta downtime mesin dengan notifikasi seketika.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBE5-PM5QEmRd38D2xDEf0w8SHZz12r1543SbSB-PLc8_PjhkT5tMqhAEv0jCpdn-6VDH_35XV1gDZcK1QiZkmX7WNK2nHtQjxae32RX5ck5nZ4tObeY7S0eFh1HvV_H2esZTxcgwvHD8rpwX8A8nhAe788gtNSrA_SzQmOxCQu_PtBS4XFyk9HujV0brLaB9nF_zB48RqF9y6jSfDKgu2u0C7QxWay4k6CFCyplTD',
    imageAlt:
      'Industrial IoT dashboard visual showing machine sensor readings, Overall Equipment Effectiveness OEE telemetry gauges, live status alerts in a futuristic control room with cyan data visuals and dark minimalist background.',
    techStack: ['Python', 'MQTT', 'WebSockets', 'TimescaleDB'],
    clientIndustry: 'Pabrik Injeksi Plastik & Stamping Presisi',
    completionDate: 'Januari 2025',
    role: 'IIoT Backend & Telemetry Lead',
    problemStatement:
      'Tim maintenance dan manajemen produksi tidak memiliki visibilitas seketika saat mesin CNC/Injeksi mengalami micro-stoppage atau penurunan kecepatan siklus. Perhitungan OEE (Availability, Performance, Quality) baru diketahui keesokan harinya sehingga respon perbaikan terlambat.',
    engineeringSolution:
      'Membangun pipeline telemetri IIoT yang mengakuisisi sinyal PLC mesin melalui broker MQTT menuju worker Python, menyimpannya ke dalam TimescaleDB (hypertable time-series), serta menyiarkan metrik OEE dan peringatan anomali vibrasi/suhu secara real-time (< 200ms latency) ke layar Andon dan dashboard manajemen melalui WebSockets.',
    architectureHighlights: [
      'Ingesti 5,000+ pesan sensor per detik menggunakan Mosquitto MQTT Broker & async Python consumers.',
      'Penyimpanan time-series menggunakan TimescaleDB Continuous Aggregates untuk kompresi data historis hingga 90%.',
      'Sistem eskalasi Andon otomatis via WhatsApp/Telegram API ketika mesin berhenti lebih dari 180 detik.',
    ],
    metricsImpact: [
      { label: 'Peningkatan Skor OEE', value: '+14.5%', detail: 'Rata-rata OEE naik dari 68.2% menjadi 82.7% dalam 4 bulan' },
      { label: 'Respon Downtime (MTTR)', value: '-45%', detail: 'Notifikasi Andon instan langsung ke teknisi maintenance' },
      { label: 'Latensi Telemetri', value: '< 180ms', detail: 'Streaming live dari sensor PLC ke browser ruang kontrol' },
    ],
    liveDemoUrl: '#demo-oee-telemetry',
    repoUrl: 'https://github.com/argapratama-dev/iiot-oee-telemetry-engine',
    slides: [
      {
        title: 'Live OEE Command Center (Availability, Performance, Quality)',
        caption: 'Tampilan ruang kontrol real-time untuk 64 mesin produksi lengkap dengan indikator status Run, Idle, Setup, dan Breakdown.',
        type: 'telemetry',
      },
      {
        title: 'MQTT Broker to TimescaleDB High-Throughput Pipeline',
        caption: 'Arsitektur edge gateway PLC -> MQTT -> Python Async Worker -> TimescaleDB & WebSocket Broadcaster.',
        type: 'architecture',
      },
      {
        title: 'Predictive Vibration & Downtime Root-Cause Matrix',
        caption: 'Analisis Pareto penyebab downtime (Six Big Losses) dan grafik spektrum temperatur/getaran spindle.',
        type: 'dashboard',
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
