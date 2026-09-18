# ARTUDIEI CLINIC
## Comprehensive Project Documentation, Product Description & User Guide Specification

> **Dokumen Master Proyek:** Berisi rangkuman arsitektur, landasan teori psikologi, mekanik game, panduan pengguna (*User Guide*), dan deskripsi produk (*Product Description*) untuk **Artudiei Clinic**.

---

## 1. Analisis & Evaluasi Judul Proyek

### Judul yang Diajukan:
> **"Artudiei Clinic – Psychology Role Play Web Based Game Learning Media"**

### Apakah judul ini sudah cocok?
**JAWABAN: SANGAT COCOK, AKURAT, DAN KOMPREHENSIF.**

#### Analisis Elemen Judul:
1. **Artudiei Clinic** (*Brand / Identitas Utama*): Menetapkan nama entitas dan latar tempat klinik simulasi konseling dengan kuat dan mudah diingat.
2. **Psychology Role Play** (*Genre & Mekanik Inti*): Sangat tepat karena pemain secara aktif mengambil peran (*role-play*) sebagai konselor/psikolog yang menghadapi berbagai klien dengan dinamika psikologis nyata.
3. **Web Based Game** (*Platform & Format*): Sangat tepat karena aplikasi ini berjalan sepenuhnya di browser (*client-side web*), menggunakan *canvas 2D engine* pixel art yang interaktif, responsif, dan ringan tanpa perlu instalasi aplikasi berat.
4. **Learning Media** (*Tujuan & Fungsionalitas*): Sangat tepat karena game ini bukan sekadar hiburan (*casual game*), melainkan media pembelajaran (*educational serious game*) yang dilengkapi taksonomi kognitif HOTS (C4–C6), jurnal ilmiah terindeks (DOI), rasional klinis, evaluasi diagnostik, dan materi psikoedukasi terstruktur.

#### Alternatif Format Penulisan (Sesuai Kebutuhan Konteks):
* **Untuk Publikasi Internasional / Portofolio / GitHub:**  
  `Artudiei Clinic: A Web-Based Psychology Role-Playing Game for Counseling Learning Media`
* **Untuk Judul Skripsi / Tugas Akhir / Jurnal Nasional:**  
  `Pengembangan Artudiei Clinic: Media Pembelajaran Interaktif Simulasi Konseling Psikologi Berbasis Web Role-Playing Game`
* **Untuk Tagline / Landing Page:**  
  `Artudiei Clinic – Asah Keterampilan Konseling dan Empati Melalui Simulasi Role-Play Interaktif Berbasis Bukti Ilmiah`

---

## 2. Ringkasan Eksekutif & Deskripsi Produk (Product Description)

### 2.1. Elevator Pitch (Deskripsi Singkat - 30 Detik)
**Artudiei Clinic** adalah media pembelajaran interaktif berbasis *web game role-playing* yang mensimulasikan praktik konseling psikologis nyata. Pemain berperan sebagai seorang konselor yang berinteraksi langsung dengan berbagai karakter klien dalam lingkungan klinik bergaya *pixel art* yang hangat. Dengan memadukan teori psikologi klinis berbasis bukti (*Evidence-Based Practice*) seperti CBT, REBT, Terapi Berpusat pada Klien (*Person-Centered*), serta regulasi sistem saraf (Teori Polivagal), pemain dilatih untuk berpikir kritis tingkat tinggi (*Higher Order Thinking Skills - HOTS*) dalam memilih respons empati, meredakan resistensi/ketegangan klien, dan membangun aliansi terapeutik yang kokoh.

### 2.2. Value Proposition (Nilai Tambah Utama)
* **Jembatan Teori ke Praktik:** Mengubah teori psikologi abstrak di buku teks menjadi pengalaman simulasi interaktif yang dinamis dan berkonsekuensi langsung.
* **Umpan Balik Edukasi Instan:** Setiap pilihan dialog dilengkapi rasional ilmiah, dampak ketegangan (*tension*) dan kepercayaan (*rapport*), serta rujukan sitasi jurnal bereputasi.
* **Lingkungan Aman untuk Belajar (*Safe Failure Environment*):** Mahasiswa/pelajar dapat bereksperimen dengan berbagai teknik komunikasi tanpa risiko membahayakan klien sungguhan.
* **Gamifikasi & Replayability Tinggi:** Dilengkapi sistem *Career Rank*, XP Konselor, Toko Dekorasi Klinik Biofilik, Simulasi *Smartphone Follow-Up Chat*, dan *Radio Lofi Relaxation Station*.

### 2.3. Target Pengguna (Target Audience)
1. **Mahasiswa Psikologi, Bimbingan Konseling (BK), & Kedokteran Jiwa:** Sebagai sarana praktikum mikro-konseling sebelum terjun ke klien klinis nyata.
2. **Guru BK & Pendidik:** Sebagai media ajar interaktif untuk materi komunikasi terapeutik, empati, dan manajemen emosi siswa.
3. **Peminat Psikologi & Praktisi Pemula:** Siapapun yang ingin melatih *active listening*, empati, dan resolusi konflik interpersonal.

---

## 3. Landasan Teori Psikologi & Kerangka Edukasi

Game ini dibangun di atas pondasi teori psikologi terkemuka dunia dengan referensi akademik yang valid:

```
+-------------------------------------------------------------------------------+
|                             ARTUDIEI CLINIC ENGINE                           |
+---------------------------------------+---------------------------------------+
|          TEORI PSIKOLOGIS             |          TAKSONOMI KOGNITIF           |
+---------------------------------------+---------------------------------------+
| 1. Person-Centered (Carl Rogers)      | C4 (Menganalisis / Analyzing)         |
| 2. Cognitive Behavioral Therapy (Beck)| C5 (Mengevaluasi / Evaluating)        |
| 3. Rational Emotive Behavior (Ellis)  | C6 (Menciptakan / Creating)           |
| 4. Polyvagal & Somatic (Porges/Levine)|                                       |
| 5. Dialectical Behavior / DBT(Linehan)|                                       |
+---------------------------------------+---------------------------------------+
```

### 3.1. Empat Arketipe Klien Klinis
Setiap klien dalam Artudiei Clinic memiliki profil kepribadian, pemicu stres, dan mekanisme pertahanan (*defense mechanism*) yang khas:

1. **Si Pencemas & Overthinker (*Anxious / Hypervigilant*)**
   * *Karakteristik:* Dominan pikiran bencana (*catastrophizing*), takut dihakimi sosial, sensasi fisik tegang (jantung berdebar, napas pendek).
   * *Teknik Terbaik:* *Somatic Grounding* (koregulasi napas), *Active Listening*, CBT *Reality Testing*.
   * *Teknik yang Dihindari:* Konfrontasi langsung yang agresif.
2. **Si Perfeksionis Rentan (*Vulnerable Perfectionist*)**
   * *Karakteristik:* Distorsi *All-or-Nothing*, sindrom penipu (*imposter syndrome*), *self-worth* terikat mutlak pada prestasi luar.
   * *Teknik Terbaik:* REBT *De-catastrophizing*, *Cognitive Reframing*, Eksplorasi Nilai Diri.
   * *Teknik yang Dihindari:* Pujian kosong yang dangkal atau meremehkan usahanya.
3. **Si Defensif & Skeptis (*Defensive / Guarded*)**
   * *Karakteristik:* Menolak bantuan, nada bicara sinis/menyerang (*projection*), takut terlihat lemah atau disalahkan.
   * *Teknik Terbaik:* *Radical Empathy*, Validasi Emosi Tanpa Syarat (*Unconditional Positive Regard*), *Gentle Reframing*.
   * *Teknik yang Dihindari:* Peringatan moralis, instruksi kaku, atau menceramahi.
4. **Si Menghindar & Tertutup (*Avoidant / Detached*)**
   * *Karakteristik:* Penyangkalan masalah (*denial*), respon satu kata, penarikan diri sosial (*social withdrawal*).
   * *Teknik Terbaik:* Kehadiran yang sabar (*Pacing & Silence*), Pancingan Minat Personal, Pertanyaan Eksploratif Bertahap.
   * *Teknik yang Dihindari:* Memaksa bercerita secara frontal di awal sesi.

### 3.2. Integrasi Taksonomi HOTS (Higher-Order Thinking Skills)
Setiap pilihan respon konselor diklasifikasikan ke dalam level kognitif Bloom Revisi:
* **C4 (Analyzing - Menganalisis):** Mengidentifikasi distorsi kognitif, mengurai sensasi somatis tubuh, dan membedakan asumsi subjektif vs fakta objektif.
* **C5 (Evaluating - Mengevaluasi):** Menguji bukti (*evidence testing*), menantang keyakinan irasional secara logis, dan menilai dampak pola pikir destruktif.
* **C6 (Creating - Menciptakan):** Merumuskan rencana tindakan adaptif bersama klien, merancang strategi koping mandiri, dan melakukan koregulasi relaksasi aktif.

---

## 4. Mekanik & Fitur Game (Gameplay Mechanics)

```
                                  ALUR SESI LENGKAP
                                  
 [Animasi Masuk Pintu] ---> [Eksplorasi Klinik Pixel] ---> [Duduk di Sofa Konseling]
                                                                     |
                                                                     v
 [Follow-Up Chat di HP] <--- [Papan Evaluasi & Grade S-D] <--- [Dialog 3 Fase (HOTS)]
           |
           v
 [Toko Dekorasi Biofilik & Kenaikan Rank XP]
```

### 4.1. Navigasi & Eksplorasi Klinik (Pixel Canvas Engine)
* **Gerakan Karakter:** Bergerak mulus menggunakan keyboard (`WASD` / `Panah`) atau *Virtual Joystick* responsif di layar sentuh/mobile.
* **Visual Pixel Art Hangat:** Lingkungan interior klinik berpalet estetis *earthy tones* (kayu hangat, tanaman hijau, jendela berorientasi sinar matahari).
* **Objek Interaktif:**
  * **Sofa Klien:** Memulai sesi konseling formal dengan transisi *auto-walk* profesional.
  * **Meja Teh & Herbarium (Relaxation Station):** Fitur interaktif untuk menyeduh teh herbal chamomile/peppermint atau latihan *mindfulness* mengamati tanaman.
  * **Rak Buku Referensi (Reference Board):** Ensiklopedia digital teori konseling, glosarium teknik klinis, dan daftar kasus klien.
  * **Radio Mini Lo-Fi:** Menyalakan/mematikan musik latar *chill ambient* yang menenangkan.
  * **Toko Dekorasi Klinik:** Kustomisasi visual ruangan dengan furnitur biofilik.

### 4.2. Sistem Sesi Konseling 3 Fase
Setiap kasus klien disusun dalam alur terstruktur 3 fase:
1. **Fase 1: Membangun Rasa Aman & Aliansi Terapeutik (*Safety & Rapport Building*)**  
   Fokus pada mendengarkan aktif, mengidentifikasi sinyal non-verbal, dan menurunkan kecemasan awal klien.
2. **Fase 2: Eksplorasi Masalah & Restrukturisasi Kognitif (*Exploration & Reframing*)**  
   Mengurai akar distorsi kognitif, menelusuri pemicu stres, dan membongkar pola pikir maladaptif.
3. **Fase 3: Integrasi & Aksi Nyata Mandiri (*Action Planning & Termination*)**  
   Merumuskan langkah nyata yang aplikatif dalam kehidupan sehari-hari klien agar klien berdaya mandiri (*empowerment*).

### 4.3. Dua Parameter Utama: Tension & Rapport
* **Tension (Tingkat Ketegangan / Resistensi):** Ditampilkan dengan bilah status visual. Konselor bertugas menurunkan tension klien dari level tinggi ke zona tenang (*homeostasis*).
* **Rapport (Tingkat Kepercayaan & Aliansi):** Mengukur seberapa aman dan terhubung klien dengan konselor. Semakin tinggi rapport, semakin terbuka klien memberikan *insight*.

### 4.4. Evaluasi Diagnostik & Sistem Penilaian (Grading System)
Di akhir setiap sesi, algoritma menghitung skor akhir (0–100) berdasarkan rasio penurunan *tension*, peningkatan *rapport*, dan konsistensi teknik HOTS:
* **Grade S (Skor 85–100) - Maestro Aliansi Terapeutik (*Master Clinician*)**
* **Grade A (Skor 70–84) - Konselor Empatik & Terampil (*Skilled Practitioner*)**
* **Grade B (Skor 55–69) - Praktisi Berkemampuan Baik (*Competent Helper*)**
* **Grade C (Skor 40–54) - Konselor yang Sedang Berkembang (*Developing Counselor*)**
* **Grade D (Skor < 40) - Perlu Pendampingan Lanjutan (*Supervised Practice*)**

### 4.5. Fitur Smartphone Follow-Up Chat (Post-Session Continuity)
Setelah sesi konseling selesai, klien akan mengirimkan pesan teks WhatsApp-style ke ponsel konselor:
* Menceritakan perkembangan kondisi mereka di dunia nyata setelah menerapkan saran konseling.
* Konselor dapat memilih 2 opsi balasan lanjutan bernuansa terapeutik.
* Memberikan tambahan **Bonus Reputation XP** dan melatih komunikasi asinkronus konselor modern.

### 4.6. Toko Dekorasi Biofilik & Desain Ruangan (Clinic Decoration Shop)
Pemain dapat membelanjakan XP yang dikumpulkan untuk membeli dekorasi klinik berbasis prinsip *Biophilic Design & Sensory Therapy*:
1. **Lampu Garam Himalaya (Desk):** Efek pencahayaan warm tone 2200K pereda kortisol.
2. **Akuarium Mini Neon Tetra (Wall):** Terapi visual gerak ritmis biota air parasimpatis.
3. **Tanaman Aromatik Lavender (Plant):** Modulasi aroma relaksasi alami.
4. **Karpet Sutra Emerald Geometris (Rug):** Sensasi grounding stabil di lantai.
5. **Lukisan Kanvas Zen Pegunungan (Wall):** Seni alam terbuka pelega persepsi kognitif.
6. **Sofa Beludru Royal Emerald (Furniture):** Upgrade sofa klien ergonomis.
7. **Diffuser Aromaterapi Ultrasonik (Station):** Efek uap mikro chamomile aromatik.

Setiap item yang dipasang langsung mengubah tampilan grafis *canvas 2D* klinik secara *real-time*.

### 4.7. Jenjang Karir Konselor (Counselor Rank Progression)
Akumulasi XP membuka tingkatan gelar profesional konselor:
1. **Konselor Magang (*Junior Apprentice*)** — (0 - 99 XP)
2. **Praktisi Berkembang (*Associate Counselor*)** — (100 - 299 XP)
3. **Konselor Terampil (*Skilled Helper*)** — (300 - 599 XP)
4. **Klinisi Mahir (*Master Practitioner*)** — (600 - 999 XP)
5. **Psikolog Maestro (*Senior Supervisor*)** — (1000+ XP)

---

## 5. Panduan Pengguna (User Guide / How to Play)

### 5.1. Kontrol Dasar
| Aksi | Keyboard (Desktop) | Sentuhan Layar (Mobile/Tablet) |
| :--- | :--- | :--- |
| **Bergerak ke Atas** | Tombol `W` atau `Panah Atas` | Tarik Virtual Joystick ke Atas |
| **Bergerak ke Bawah** | Tombol `S` atau `Panah Bawah` | Tarik Virtual Joystick ke Bawah |
| **Bergerak ke Kiri** | Tombol `A` atau `Panah Kiri` | Tarik Virtual Joystick ke Kiri |
| **Bergerak ke Kanan** | Tombol `D` atau `Panah Kanan` | Tarik Virtual Joystick ke Kanan |
| **Interaksi Objek** | Dekati objek, lalu tekan Tombol Prompt di layar | Ketuk Tombol Aksi di layar |
| **Buka Ponsel Konselor** | Klik Ikon Ponsel di Top Bar | Ketuk Ikon Ponsel di Top Bar |
| **Buka Toko Dekorasi** | Klik Ikon Toko di Top Bar / Interaksi Pintu Toko | Ketuk Ikon Toko di Top Bar |
| **Buka Pustaka Referensi** | Klik Ikon Buku / Interaksi Rak Buku | Ketuk Ikon Buku di Top Bar |

### 5.2. Langkah-demi-Langkah Menjalankan Kasus Konseling
1. **Memulai Kasus Baru:**
   * Saat masuk ke klinik, perhatikan klien yang duduk di sofa ruang konseling.
   * Dekati sofa klien dan tekan tombol interaksi **"Mulai Sesi Konseling"** (atau konselor akan otomatis berjalan ke posisi duduk berhadapan).
2. **Membaca Profil & Keluhan Klien:**
   * Amati nama, usia, profesi, arketipe, bahasa tubuh non-verbal, dan pikiran batin (*inner distress*) klien di panel atas.
3. **Memilih Respons Dialog Terapeutik:**
   * Terdapat 3 opsi respon dengan penanda level HOTS (C4 / C5 / C6) dan nama teknik klinis.
   * Pilih respon yang paling sesuai dengan kondisi emosional klien saat itu.
4. **Menganalisis Umpan Balik Klinis:**
   * Setelah memilih, baca reaksi verbal klien, perubahan grafik *Tension/Rapport*, serta penjelasan edukasi (*clinical feedback*) mengapa respon tersebut efektif atau kurang tepat.
5. **Menyelesaikan 3 Fase:**
   * Lanjutkan proses dari Fase 1 hingga Fase 3 hingga sesi berakhir.
6. **Menerima Laporan Evaluasi:**
   * Pelajari perolehan *Grade*, ringkasan diagnostik, rujukan teori jurnal (dengan tombol tautan DOI), dan rekomendasi tindak lanjut.
7. **Membalas Pesan Follow-Up:**
   * Buka aplikasi ponsel konselor untuk membalas kabar klien dan klaim bonus XP untuk meng-upgrade klinik di toko dekorasi.

### 5.3. Tips Meraih Grade S (Master Clinician Tips)
* 💡 **Validasi Sebelum Solusi:** Jangan buru-buru memberi nasihat di Fase 1. Klien butuh merasa dipahami dan diterima terlebih dahulu sebelum siap berpikir rasional.
* 💡 **Gunakan Pertanyaan Sokratik:** Di Fase 2, daripada mendikte apa yang salah, ajak klien menemukan celah logika dari pikiran cemasnya melalui pertanyaan pemantik.
* 💡 **Koregulasi Somatis:** Jika ketegangan (*tension*) klien sangat tinggi di atas 80%, pilih teknik *Somatic Grounding* untuk menenangkan sistem saraf fisiologisnya terlebih dahulu.

---

## 6. Spesifikasi Teknis & Arsitektur Perangkat Lunak

### 6.1. Tech Stack
* **Frontend Framework:** React 18 (TypeScript) + Vite (Super-fast HMR & Build)
* **Styling & Design System:** Tailwind CSS + Custom Pixel Art Component Library
* **State Management:** Zustand (dengan pemisahan *shallow selectors* untuk performa 60 FPS)
* **Canvas Engine:** Native HTML5 2D Context API (Custom Grid Matrix Rendering, Depth Sorting, Particle & Lighting Systems)
* **Animation Library:** Framer Motion (Transisi modal, dialog popup, drawer ponsel)
* **Iconography:** Lucide React
* **Audio:** HTML5 Audio API (Lo-Fi radio stream & ambient sfx)

### 6.2. Struktur Direktori Proyek
```
GAYATAMA/
├── public/                     # Asset statis, favicon, audio
├── src/
│   ├── assets/                 # Gambar & ikon pendukung
│   ├── components/
│   │   ├── canvas/             # GameCanvas.tsx, MapGrid.ts, SpriteRenderer.ts (2D Engine)
│   │   ├── controls/           # VirtualJoystick.tsx, InteractionPrompt.tsx
│   │   ├── game/               # DialogueOverlay, CounselorPhoneModal, DecorationShopModal,
│   │   │                       # ReferenceBoard, EndingScreen, RelaxationModal, LevelUpModal
│   │   └── ui/                 # PixelButton, PixelBadge, PixelCard (Custom UI Components)
│   ├── data/
│   │   ├── archetypes.json     # Data kepribadian, keluhan, respon, dan teori jurnal
│   │   ├── proceduralCases.ts  # Generator skenario kontekstual dan HOTS options
│   │   ├── decorations.ts      # Data item toko dekorasi & rasional biofilik
│   │   ├── followUpMessages.ts # Generator pesan asinkronus chat ponsel
│   │   └── endings.json        # Matriks grading S-D dan pustaka referensi Rogers/Beck/Ellis
│   ├── store/
│   │   └── useGameStore.ts     # Pusat state aplikasi (Zustand store lengkap)
│   ├── types/
│   │   └── game.ts             # TypeScript interface, types, dan data models
│   ├── App.tsx                 # Root component & state orchestrator
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Global styles & pixel font definitions
├── index.html                  # HTML5 boilerplate & font loader
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Skema warna earthy, font pixel, dan shadow tokens
└── vite.config.ts              # Konfigurasi bundler Vite
```

---

## 7. Kesimpulan & Penutup

**Artudiei Clinic** menggabungkan estetika *retro pixel art* yang ramah dengan ketelitian ilmiah psikologi klinis. Melalui struktur data yang kaya, pendekatan HOTS, dan gamifikasi bertingkat, media ini siap digunakan sebagai media pembelajaran resmi, produk komersial *edutech*, materi publikasi ilmiah, maupun portofolio aplikasi web interaktif kelas industri.

---
*Dokumen ini disusun sebagai panduan resmi pengembangan, penyusunan User Guide, dan materi Product Description untuk Artudiei Clinic.*
