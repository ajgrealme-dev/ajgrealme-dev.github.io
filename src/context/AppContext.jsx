import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const translations = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', experience: 'Pengalaman', contact: 'Kontak' },
    hero: {
      greeting: 'Halo, saya',
      name: 'Aziz Maulana',
      role: 'Warehouse & Operations Administrator',
      sub: 'Automation-Enabled · Ciruas, Serang',
      cta: 'Lihat Portfolio',
      cv: 'Unduh CV',
    },
    about: {
      title: 'Tentang Saya',
      p1: 'Lulusan Pondok Pesantren dengan disiplin dan integritas tinggi, yang saat ini menempuh pendidikan S1 Manajemen di Universitas Pamulang.',
      p2: 'Memiliki minat besar dalam efisiensi operasional dan administrasi. Mampu mengombinasikan ketelitian administratif dengan solusi otomasi digital (Node.js & AI) untuk mempercepat proses input data.',
      p3: 'Pribadi yang patuh pada aturan, jujur, dan siap berkontribusi menjaga akurasi catatan data di lingkungan industri.',
      stats: [
        { label: 'Proyek Selesai', value: '1+' },
        { label: 'Tahun Belajar', value: '2+' },
        { label: 'Keahlian', value: '10+' },
      ],
    },
    skills: {
      title: 'Keahlian',
      cats: [
        { name: 'Administratif', items: ['Data Entry', 'Microsoft Excel', 'Microsoft Word', 'Laporan Harian', 'Pencatatan Dokumen'] },
        { name: 'IT & Otomasi', items: ['Node.js', 'JavaScript', 'SQL / SQLite', 'Gemini AI API', 'Telegram Bot'] },
        { name: 'Karakter', items: ['Disiplin Tinggi', 'Ketelitian Data', 'Kemauan Belajar', 'Patuh Aturan', 'Integritas'] },
      ],
    },
    projects: {
      title: 'Proyek Mandiri',
      items: [
        {
          title: 'AgentFlow Bot',
          icon: '📦',
          period: 'Maret 2026 – Sekarang',
          tag: 'Node.js · SQLite · Gemini AI',
          desc: 'Sistem administrasi pergudangan digital berbasis Telegram Bot yang mampu membaca dokumen otomatis via AI dan melakukan rekonsiliasi laporan harian.',
          points: [
            'Telegram Bot (Node.js + SQLite) untuk sistem pergudangan paperless',
            'Integrasi Gemini AI API untuk input data otomatis dari foto bon',
            'Sistem rekonsiliasi otomatis untuk audit pembukuan harian',
            'Alur persetujuan cuti 3-tingkat digital (Shift → Bagian → Divisi)',
          ],
        },
        {
          title: 'Robot Sakti (Otomasi Trading AI Hedge Fund)',
          icon: '📈',
          period: 'Desember 2025 – Sekarang',
          tag: 'Python · MetaTrader 5 · TensorFlow · Stable-Baselines3 · LightGBM · Gemini AI',
          desc: 'Sistem trading multi-asset otomatis (Gold, Bitcoin, Forex) yang mengintegrasikan kecerdasan buatan (Machine Learning, Reinforcement Learning, & NLP) dengan execution engine MetaTrader 5.',
          points: [
            'Mengintegrasikan MetaTrader 5 API untuk eksekusi order otomatis secara real-time',
            'Model prediksi arah tren menggunakan LightGBM & ekstraksi fitur dengan Autoencoder',
            'Portofolio manajemen & optimasi order menggunakan Deep Reinforcement Learning (Stable-Baselines3)',
            'Veto sinyal teknikal secara cerdas menggunakan Gemini AI NLP untuk analisis berita & makro'
          ]
        },
        {
          title: 'Kicaw Mania (Game Kamera Interaktif OpenCV)',
          icon: '🐦',
          period: 'Februari 2026 – Maret 2026',
          tag: 'Python · OpenCV · MediaPipe · NumPy',
          desc: 'Game kamera interaktif berbasis Computer Vision untuk tren viral TikTok (Touch Your Nose Detection) yang mendeteksi sentuhan jari pada hidung secara real-time dan menampilkan efek partikel fisik dinamis.',
          points: [
            'Menggunakan MediaPipe Hands & Face Mesh untuk mendeteksi koordinat spasial 3D secara presisi',
            'Pengolahan video feed webcam real-time berlatensi rendah dengan library OpenCV',
            'Simulasi Sistem Partikel Fisika kustom (gravitasi, pudar, warna acak) sebagai visual feedback sentuhan',
            'Dilengkapi fitur gameplay interaktif: penghitung skor (score tracker), reset skor, dan visualizer FPS'
          ]
        }
      ],
    },
    experience: {
      title: 'Pengalaman',
      items: [
        { title: 'Asisten Chief Dapur', company: 'SPPG', period: 'Jan 2026 – Sekarang', points: ['Menyusun menu harian bersama Chief', 'Memastikan persiapan bahan sesuai SOP'] },
        { title: 'Guru Matematika', company: 'MTSs As-Salam', period: 'Nov 2025 – Jan 2026', points: ['Mengajar matematika dasar', 'Input & pengelolaan nilai siswa', 'Menyusun laporan raport'] },
        { title: 'Guru Diniyah', company: 'TPQ Al-Islah', period: 'Sep 2025 – Nov 2025', points: ['Mengajar materi keagamaan dasar', 'Mencatat nilai perkembangan mengaji', 'Menyusun laporan raport santri'] },
      ],
    },
    contact: {
      title: 'Hubungi Saya',
      sub: 'Tertarik bekerja sama? Kirimkan pesan!',
      name: 'Nama Anda',
      email: 'Email Anda',
      message: 'Pesan Anda',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      success: 'Pesan terkirim! Terima kasih.',
      error: 'Gagal mengirim. Coba lagi.',
    },
    education: {
      title: 'Pendidikan',
      items: [
        { school: 'Universitas Pamulang', major: 'S1 Manajemen', year: 'Sedang Berjalan' },
        { school: 'Daar Al-Ilmi Boarding School', major: 'Jurusan IPS', year: 'Lulus 2025' },
      ],
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Aziz Maulana',
      role: 'Warehouse & Operations Administrator',
      sub: 'Automation-Enabled · Ciruas, Serang',
      cta: 'View Portfolio',
      cv: 'Download CV',
    },
    about: {
      title: 'About Me',
      p1: 'A boarding school graduate with high discipline and integrity, currently pursuing a Bachelor of Management at Universitas Pamulang.',
      p2: 'Passionate about operational efficiency and administration. Able to combine administrative precision with digital automation solutions (Node.js & AI) to accelerate data entry processes.',
      p3: 'A rule-abiding, honest individual ready to contribute to maintaining data record accuracy in an industrial environment.',
      stats: [
        { label: 'Projects Done', value: '1+' },
        { label: 'Years Learning', value: '2+' },
        { label: 'Skills', value: '10+' },
      ],
    },
    skills: {
      title: 'Skills',
      cats: [
        { name: 'Administrative', items: ['Data Entry', 'Microsoft Excel', 'Microsoft Word', 'Daily Reports', 'Document Recording'] },
        { name: 'IT & Automation', items: ['Node.js', 'JavaScript', 'SQL / SQLite', 'Gemini AI API', 'Telegram Bot'] },
        { name: 'Character', items: ['High Discipline', 'Data Accuracy', 'Eagerness to Learn', 'Rule Compliance', 'Integrity'] },
      ],
    },
    projects: {
      title: 'Personal Projects',
      items: [
        {
          title: 'AgentFlow Bot',
          icon: '📦',
          period: 'March 2026 – Present',
          tag: 'Node.js · SQLite · Gemini AI',
          desc: 'Digital warehouse administration system based on Telegram Bot, capable of auto-reading documents via AI and reconciling daily reports.',
          points: [
            'Telegram Bot (Node.js + SQLite) for paperless warehouse system',
            'Gemini AI API integration for automated data input from receipt photos',
            'Auto-reconciliation system for daily bookkeeping audit',
            '3-level digital leave approval flow (Shift → Department → Division)',
          ],
        },
        {
          title: 'Robot Sakti (AI Hedge Fund Automated Trading)',
          icon: '📈',
          period: 'December 2025 – Present',
          tag: 'Python · MetaTrader 5 · TensorFlow · Stable-Baselines3 · LightGBM · Gemini AI',
          desc: 'Automated multi-asset trading system (Gold, Bitcoin, Forex) integrating machine learning, reinforcement learning, and LLM NLP with MetaTrader 5 execution engine.',
          points: [
            'Integrated MetaTrader 5 API for real-time automated order execution',
            'Trend direction prediction model using LightGBM and feature extraction via Autoencoder',
            'Portfolio management and order optimization using Deep Reinforcement Learning (Stable-Baselines3)',
            'Intelligent trade signal verification using Gemini AI NLP for macro and news sentiment analysis'
          ]
        },
        {
          title: 'Kicaw Mania (OpenCV Interactive Camera Game)',
          icon: '🐦',
          period: 'February 2026 – March 2026',
          tag: 'Python · OpenCV · MediaPipe · NumPy',
          desc: 'An interactive Computer Vision game built for a viral TikTok trend (Touch Your Nose Detection), detecting finger-to-nose touches in real-time and rendering dynamic physical particle effects.',
          points: [
            'Utilized MediaPipe Hands and Face Mesh to track 3D spatial hand and face landmarks precisely',
            'Processed real-time webcam video feeds with low latency using the OpenCV library',
            'Simulated custom Physics Particle Systems (gravity, alpha-decay, random colors) for visual touch feedback',
            'Features interactive gameplay: touch score tracking, score reset hotkey, and FPS visualizer'
          ]
        }
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        { title: 'Kitchen Chief Assistant', company: 'SPPG', period: 'Jan 2026 – Present', points: ['Composed daily menus with the Chief', 'Ensured ingredient preparation per SOP'] },
        { title: 'Math Teacher', company: 'MTSs As-Salam', period: 'Nov 2025 – Jan 2026', points: ['Taught basic mathematics', 'Managed student grade records', 'Compiled report cards'] },
        { title: 'Religious Teacher', company: 'TPQ Al-Islah', period: 'Sep 2025 – Nov 2025', points: ['Taught basic religious subjects', 'Recorded student Quran progress', 'Compiled student report cards'] },
      ],
    },
    contact: {
      title: 'Get In Touch',
      sub: 'Interested in working together? Send a message!',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent! Thank you.',
      error: 'Failed to send. Try again.',
    },
    education: {
      title: 'Education',
      items: [
        { school: 'Universitas Pamulang', major: 'Bachelor of Management', year: 'In Progress' },
        { school: 'Daar Al-Ilmi Boarding School', major: 'Social Sciences', year: 'Graduated 2025' },
      ],
    },
  },
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('id');

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(l => (l === 'id' ? 'en' : 'id'));
  const t = translations[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
