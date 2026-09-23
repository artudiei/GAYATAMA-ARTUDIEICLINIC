export type Language = 'id' | 'en';

export interface Translations {
  common: {
    appName: string;
    appSubtitle: string;
    close: string;
    back: string;
    continue: string;
    cancel: string;
    confirm: string;
    open: string;
    buy: string;
    equip: string;
    unequip: string;
    equipped: string;
    owned: string;
    xp: string;
    score: string;
    grade: string;
    level: string;
    tension: string;
    rapport: string;
    active: string;
    off: string;
    on: string;
    send: string;
    reply: string;
    yearsOld: string;
    language: string;
  };
  ranks: {
    intern: { full: string; short: string };
    developing: { full: string; short: string };
    skilled: { full: string; short: string };
    master: { full: string; short: string };
    maestro: { full: string; short: string };
  };
  nav: {
    phone: string;
    phoneShort: string;
    shop: string;
    musicOn: string;
    musicOff: string;
    musicPlaying: string;
    musicStopped: string;
    theory: string;
    newCase: string;
    help: string;
    menu: string;
    phoneTitle: string;
    shopTitle: string;
    musicPlayTitle: string;
    musicStopTitle: string;
    theoryTitle: string;
    newCaseTitle: string;
    helpTitle: string;
    openMenuTitle: string;
  };
  mobileDrawer: {
    title: string;
    close: string;
    counselorRank: string;
    currentClient: string;
    gameModules: string;
    shopTitle: string;
    shopDesc: string;
    musicTitle: string;
    musicPlayingDesc: string;
    musicOffDesc: string;
    theoryTitle: string;
    theoryDesc: string;
    newCaseTitle: string;
    newCaseDesc: string;
    helpTitle: string;
    helpDesc: string;
    languageSelect: string;
    version: string;
  };
  povBanner: {
    title: string;
    close: string;
    desc: string;
    tip: string;
  };
  returnNotif: {
    subtitle: string;
    waiting: string;
    dismiss: string;
    button: string;
  };
  sessionBar: {
    finished: string;
    finishedSuffix: string;
    grade: string;
    openReport: string;
    newCase: string;
  };
  helpModal: {
    header: string;
    roleTitle: string;
    roleDesc: string;
    navTitle: string;
    navDesktop: string;
    navMobile: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
    button: string;
  };
  interactionPrompt: {
    talk: string;
    bookshelf: string;
    tea: string;
    plant: string;
    radioOn: string;
    radioOff: string;
    actionBtn: string;
  };
  dialogueOverlay: {
    phase: string;
    tensionLabel: string;
    rapportLabel: string;
    counselorResponseTitle: string;
    clientThought: string;
    strategyCardsTitle: string;
    educationalRationale: string;
    scientificExplanation: string;
    nextPhaseBtn: string;
    finishSessionBtn: string;
    cooldown: string;
    turns: string;
    cardActive: string;
    clientResponding: string;
    chooseHint: string;
    source: string;
    pauseMenu: string;
    resume: string;
    leaveSession: string;
    exitConfirm: string;
  };
  endingScreen: {
    title: string;
    subtitle: string;
    gradeLabel: string;
    scoreLabel: string;
    tensionReduction: string;
    finalRapport: string;
    diagnosticInsightTitle: string;
    hotsDistribution: string;
    c4Analysis: string;
    c5Evaluation: string;
    c6Creation: string;
    recommendedIntervention: string;
    journalCitation: string;
    newClientBtn: string;
    reviewRoomBtn: string;
  };
  counselorPhone: {
    header: string;
    online: string;
    typing: string;
    selectChatHint: string;
    noMessages: string;
    replyPlaceholder: string;
    sendReply: string;
    replySent: string;
    clientList: string;
  };
  decorationShop: {
    title: string;
    tabAll: string;
    tabOwned: string;
    tabUnowned: string;
    xpBalance: string;
    clinicalBenefit: string;
    passiveEffect: string;
    emptyCategoryTitle: string;
    emptyCategoryDesc: string;
    buyItem: string;
    equipItem: string;
    unequipItem: string;
    insufficientXP: string;
    ownedBadge: string;
    equippedBadge: string;
    confirmTitle: string;
    confirmText: string;
    purchaseSuccess: string;
    items?: Record<string, {
      name: string;
      description: string;
      clinicalBenefit: string;
      passiveBonusText: string;
    }>;
  };
  relaxationModal: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    readyDesc: string;
    startBtn: string;
    finishBtn: string;
    cycle: string;
    seconds: string;
  };
  levelUpModal: {
    title: string;
    desc: string;
    prevRank: string;
    newRank: string;
    reward: string;
    continueBtn: string;
  };
  referenceBoard: {
    title: string;
    subtitle: string;
    tabTheories: string;
    tabClientProfile: string;
    tabHotsRubric: string;
    theoryFrameworks: string;
    peerReviewed: string;
    doiReference: string;
    noActiveClient: string;
    caseHistory: string;
    historyPhase: string;
    historyChoice: string;
    rubricTitle: string;
    rubricDesc: string;
    theoristLabel: string;
    coreConceptLabel: string;
    practicalAppLabel: string;
    openDoiBtn: string;
    fullTextBtn: string;
    clientComplaintLabel: string;
    backgroundStoryLabel: string;
    personalityDynamicsLabel: string;
    relatedFrameworkLabel: string;
    citationLabel: string;
    openOfficialDoiBtn: string;
    scientificArchiveBtn: string;
    effectiveApproachLabel: string;
    aversionApproachLabel: string;
    hotsRubricHeader: string;
    hotsRubricIntro: string;
    c4Title: string;
    c4Desc: string;
    c5Title: string;
    c5Desc: string;
    c6Title: string;
    c6Desc: string;
    theories?: Record<string, {
      name: string;
      coreConcept: string;
      clinicalApplication: string;
    }>;
  };
  archetypes?: Record<string, {
    name: string;
    description: string;
  }>;
}

export const translations: Record<Language, Translations> = {
  id: {
    common: {
      appName: 'ARTUDIEI CLINIC',
      appSubtitle: 'KLINIK PSIKOLOGI & TERAPI KOGNITIF',
      close: 'Tutup',
      back: 'Kembali',
      continue: 'Lanjutkan',
      cancel: 'Batal',
      confirm: 'Konfirmasi',
      open: 'Buka',
      buy: 'Beli',
      equip: 'Pasang',
      unequip: 'Lepas',
      equipped: 'Terpasang',
      owned: 'Dimiliki',
      xp: 'XP',
      score: 'Skor',
      grade: 'Predikat',
      level: 'Level',
      tension: 'Ketegangan',
      rapport: 'Aliansi',
      active: 'Aktif',
      off: 'Mati',
      on: 'Nyala',
      send: 'Kirim',
      reply: 'Balas',
      yearsOld: 'tahun',
      language: 'Bahasa'
    },
    ranks: {
      intern: {
        full: 'Konselor Magang (Junior Apprentice)',
        short: 'Konselor Magang'
      },
      developing: {
        full: 'Praktisi Berkembang (Associate Counselor)',
        short: 'Praktisi Berkembang'
      },
      skilled: {
        full: 'Konselor Terampil (Skilled Helper)',
        short: 'Konselor Terampil'
      },
      master: {
        full: 'Klinisi Mahir (Master Practitioner)',
        short: 'Klinisi Mahir'
      },
      maestro: {
        full: 'Psikolog Maestro (Senior Supervisor)',
        short: 'Psikolog Maestro'
      }
    },
    nav: {
      phone: 'HP Klien',
      phoneShort: 'HP',
      shop: 'Toko',
      musicOn: 'Musik: ON',
      musicOff: 'Musik: OFF',
      musicPlaying: 'PLAYING',
      musicStopped: 'OFF',
      theory: 'Teori',
      newCase: 'Kasus Baru',
      help: 'Petunjuk',
      menu: 'Navigasi',
      phoneTitle: 'HP Konselor & Pesan Klien',
      shopTitle: 'Toko Renovasi & Dekorasi Klinik (XP)',
      musicPlayTitle: 'Putar Musik',
      musicStopTitle: 'Matikan Musik',
      theoryTitle: 'Buku Referensi Teori Psikologi',
      newCaseTitle: 'Kasus Klien Baru',
      helpTitle: 'Petunjuk & Kontrol',
      openMenuTitle: 'Buka Menu Navigasi'
    },
    mobileDrawer: {
      title: 'NAVIGASI KLINIK',
      close: 'Tutup Menu',
      counselorRank: 'Gelar / Pangkat Psikolog',
      currentClient: 'Klien Sekarang',
      gameModules: 'Aksi & Modul Game',
      shopTitle: 'Toko Renovasi & Dekorasi',
      shopDesc: 'Hiasi ruangan & upgrade klinik',
      musicTitle: 'Musik Lofi BGM',
      musicPlayingDesc: 'Audio sedang berputar',
      musicOffDesc: 'Audio dimatikan',
      theoryTitle: 'Buku Teori Psikologi',
      theoryDesc: 'Panduan intervensi & diagnosa',
      newCaseTitle: 'Kasus Klien Baru',
      newCaseDesc: 'Ganti dengan klien acak baru',
      helpTitle: 'Panduan Bermain',
      helpDesc: 'Kontrol & penjelasan peran POV',
      languageSelect: 'Pilih Bahasa Tampilan',
      version: 'ARTUDIEI CLINIC • Mobile Navigation Drawer'
    },
    povBanner: {
      title: 'SUDUT PANDANG (POV): ANDA SEBAGAI PSIKOLOG',
      close: 'Tutup banner',
      desc: 'Karakter yang Anda gerakkan adalah seorang Psikolog Konseling di Klinik ARTUDIEI. Klien di sofa memiliki aura gelap/suram lembut yang menandakan beban pikiran & kecemasan yang sedang dialaminya. Tugas Anda adalah menyimak secara aktif dan meredakan ketegangan klien melalui respon komunikasi yang tepat.',
      tip: '💡 Dekati klien lalu tekan [E] atau tombol Bicara.'
    },
    returnNotif: {
      subtitle: 'Sesi belum selesai',
      waiting: 'menunggu...',
      dismiss: 'Tutup notifikasi',
      button: 'Kembali ke Sesi'
    },
    sessionBar: {
      finished: 'Sesi',
      finishedSuffix: 'selesai',
      grade: 'Predikat',
      openReport: 'Buka Laporan',
      newCase: 'Kasus Baru'
    },
    helpModal: {
      header: 'PANDUAN PERAN PSIKOLOG & CARA BERMAIN',
      roleTitle: 'Peran Anda: Psikolog Konseling (Point of View)',
      roleDesc: 'Dalam simulasi ini, Anda berperan langsung sebagai Psikolog / Terapis Konseling. Klien datang dengan masalah emosional dan dinamika batin yang tergambar dari aura suram/gelap tipis di sekelilingnya. Tugas Anda adalah menciptakan ruang aman (safe space), menyimak secara aktif, dan meredakan ketegangan klien melalui respon komunikasi yang tepat.',
      navTitle: '🎮 Navigasi & Eksplorasi:',
      navDesktop: 'Gunakan W, A, S, D atau tombol Panah. Tekan [E] atau [SPASI] untuk bicara dengan klien, membaca rak buku, menyeduh teh, atau menyetel radio lofi di meja.',
      navMobile: 'Gunakan Virtual Joystick di kiri bawah dan tombol AKSI di kanan bawah.',
      tipsTitle: '🌱 Prinsip Komunikasi Terapeutik:',
      tip1: 'Pahami dulu cerita dan beban klien sebelum buru-buru menyuruhnya berubah.',
      tip2: 'Pilih dari 3 kartu pendekatan (Mendengarkan, Memeriksa Fakta, Solusi Bersama) yang paling pas untuk situasi klien.',
      tip3: 'Gunakan Kartu Strategi di bar bawah jika ingin memberikan dorongan empati atau pernapasan ekstra.',
      tip4: 'Ketika kepercayaan klien naik dan ketegangannya turun, aura suram di sekelilingnya akan berangsur sirna menjadi cahaya hangat yang menenangkan.',
      button: 'Mengerti, Lanjutkan Praktik Konseling!'
    },
    interactionPrompt: {
      talk: 'Bicara dengan Klien',
      bookshelf: 'Rak Buku Teori Psikologi',
      tea: 'Seduh Teh Herbal Relaksasi',
      plant: 'Sirami Tanaman',
      radioOn: 'Setel Radio Lo-Fi (Putar)',
      radioOff: 'Matikan Radio Lo-Fi',
      actionBtn: 'AKSI'
    },
    dialogueOverlay: {
      phase: 'Fase',
      tensionLabel: 'Ketegangan Klien',
      rapportLabel: 'Aliansi & Kepercayaan',
      counselorResponseTitle: 'PILIH RESPON TERAPEUTIK TERBAIK',
      clientThought: 'Dinamika Batin Klien:',
      strategyCardsTitle: 'KARTU STRATEGI KLINIS (HOTS)',
      educationalRationale: 'Rasional Klinis & Umpan Balik Edukatif:',
      scientificExplanation: 'Koneksi Teori & Jurnal Ilmiah:',
      nextPhaseBtn: 'Lanjut ke Pertanyaan Berikutnya',
      finishSessionBtn: 'Selesaikan Sesi Konseling',
      cooldown: 'Cooldown:',
      turns: 'putaran',
      cardActive: 'Kartu Digunakan!',
      clientResponding: 'Klien sedang berbicara...',
      chooseHint: 'Pilih pendekatan yang paling menghormati kondisi emosional klien:',
      source: 'Sumber Ilmiah:',
      pauseMenu: 'Menu Jeda Sesi',
      resume: 'Lanjutkan Sesi',
      leaveSession: 'Keluar ke Ruangan Eksplorasi',
      exitConfirm: 'Sesi saat ini akan tersimpan. Anda dapat kembali berbicara dengan klien kapan saja.'
    },
    endingScreen: {
      title: 'LAPORAN HASIL EVALUASI SESI KONSELING',
      subtitle: 'ARTUDIEI CLINICAL PERFORMANCE & HOTS METRICS',
      gradeLabel: 'Predikat Capaian:',
      scoreLabel: 'Skor Efektivitas Konseling:',
      tensionReduction: 'Reduksi Ketegangan:',
      finalRapport: 'Aliansi Terapeutik Akhir:',
      diagnosticInsightTitle: 'Analisis Dinamika & Insight Klinis:',
      hotsDistribution: 'Distribusi Tingkat Kognitif HOTS:',
      c4Analysis: 'C4: Analisis Distorsi Kognitif & Emosi',
      c5Evaluation: 'C5: Evaluasi Validitas & Logika Berpikir',
      c6Creation: 'C6: Kreasi Solusi Adaptif & Reframing',
      recommendedIntervention: 'Rekomendasi Intervensi Lanjutan:',
      journalCitation: 'Rujukan Ilmiah & Landasan Riset:',
      newClientBtn: 'Terima Klien Berikutnya (+XP)',
      reviewRoomBtn: 'Kembali ke Ruang Klinik'
    },
    counselorPhone: {
      header: 'HP KONSELOR • CHAT KLIEN',
      online: 'Online',
      typing: 'sedang mengetik...',
      selectChatHint: 'Pilih salah satu pesan klien di samping untuk membaca perkembangan dan membalas pesan.',
      noMessages: 'Belum ada pesan follow-up dari klien. Selesaikan sesi konseling untuk menerima kabar dari klien Anda!',
      replyPlaceholder: 'Pilih respon konselor...',
      sendReply: 'Kirim Balasan',
      replySent: 'Balasan terkirim',
      clientList: 'Daftar Klien'
    },
    decorationShop: {
      title: 'TOKO RENOVASI & DEKORASI KLINIK',
      tabAll: 'Semua Furnitur',
      tabOwned: 'Sudah Dimiliki',
      tabUnowned: 'Tersedia di Katalog',
      xpBalance: 'Sisa Reputasi XP:',
      clinicalBenefit: 'Manfaat Klinis & Terapi Lingkungan (Environmental Psychology)',
      passiveEffect: 'Efek Visual di Ruangan',
      emptyCategoryTitle: 'Tidak ada barang di kategori ini.',
      emptyCategoryDesc: 'Pilih tab "Semua Koleksi" untuk melihat dekorasi lainnya.',
      buyItem: 'Beli Furnitur',
      equipItem: 'Pasang di Ruangan',
      unequipItem: 'Lepas dari Ruangan',
      insufficientXP: 'XP Tidak Cukup',
      ownedBadge: 'DIMILIKI',
      equippedBadge: 'TERPASANG',
      confirmTitle: 'Konfirmasi Pembelian',
      confirmText: 'Apakah Anda yakin ingin membeli item ini seharga',
      purchaseSuccess: 'Item berhasil dibeli dan ditambahkan ke inventaris!',
      items: {
        himalayan_lamp: {
          name: 'Lampu Garam Himalaya',
          description: 'Bongkahan kristal garam pink alami dengan pendaran cahaya hangat amber yang menenangkan.',
          clinicalBenefit: 'Pencahayaan warm tone (2200K) terbukti menurunkan kortisol dan membantu desensitisasi respon stres klien.',
          passiveBonusText: 'Pendaran cahaya hangat di meja konseling'
        },
        aquarium_wall: {
          name: 'Akuarium Mini Neon Tetra',
          description: 'Akuarium kaca terpasang rapi dengan ikan Neon Tetra & Guppy bercahaya yang berenang lembut.',
          clinicalBenefit: 'Observasi gerak ritmis biota air (Aquarium Therapy) memicu stimulasi saraf parasimpatis dan relaksasi alami.',
          passiveBonusText: 'Ikan animasi berenang di dinding atas klinik'
        },
        lavender_pot: {
          name: 'Tanaman Aromatik Lavender',
          description: 'Pot tanaman Lavandula angustifolia dengan bunga ungu mekar dan kelopak aromaterapi.',
          clinicalBenefit: 'Senyawa Linalool pada lavender memodulasi reseptor GABA untuk meredakan gelisah tanpa efek sedatif berlebih.',
          passiveBonusText: 'Tanaman lavender ungu di sudut ruangan'
        },
        persian_rug: {
          name: 'Karpet Sutra Emerald Geometris',
          description: 'Karpet tenun lembut berpola geometris heksagonal dengan rona zamrud dan aksen emas.',
          clinicalBenefit: 'Tekstur alas kaki yang lembut dan simetri visual memberikan rasa stabil (Grounding Effect) bagi klien.',
          passiveBonusText: 'Desain lantai karpet zamrud mewah di area konseling'
        },
        zen_mountain_art: {
          name: 'Lukisan Kanvas Zen Pegunungan',
          description: 'Karya seni pemandangan pegunungan berkabut bernuansa minimalis Jepang dengan matahari terbit lembut.',
          clinicalBenefit: 'Visual alam terbuka (Biophilic Art) memperluas ruang persepsi kognitif dan meredakan ketegangan mental.',
          passiveBonusText: 'Lukisan seni lanskap pegunungan di dinding tengah'
        },
        emerald_sofa: {
          name: 'Sofa Beludru Royal Emerald',
          description: 'Sofa konseling berlapis beludru hijau zamrud dengan sandaran busa memori ergonomis.',
          clinicalBenefit: 'Postur duduk rileks yang ditopang penuh menurunkan tekanan otot punggung bawah saat klien membuka diri.',
          passiveBonusText: 'Upgrade visual sofa klien menjadi warna zamrud elegan'
        },
        diffuser_station: {
          name: 'Diffuser Aromaterapi Ultrasonik',
          description: 'Diffuser kayu minimalis yang mengembuskan uap mikro chamomile dan sweet orange.',
          clinicalBenefit: 'Stimulasi olfaktori langsung menuju amigdala untuk mereduksi reaktivitas emosional seketika.',
          passiveBonusText: 'Efek uap aromatik di area tea station'
        }
      }
    },
    relaxationModal: {
      title: 'LATIHAN RELAKSASI PERNAPASAN 4-7-8',
      subtitle: 'Teknik regulasi sistem saraf parasimpatis untuk meredakan ketegangan',
      step1: 'Tarik Napas Lewat Hidung (4 Detik)',
      step2: 'Tahan Napas (7 Detik)',
      step3: 'Hembuskan Perlahan Lewat Mulut (8 Detik)',
      readyDesc: 'Duduk tegak, rilekskan bahu, dan ikuti panduan lingkaran napas.',
      startBtn: 'Mulai Latihan Pernapasan',
      finishBtn: 'Selesai & Kembali ke Ruangan',
      cycle: 'Siklus ke-',
      seconds: 'detik'
    },
    levelUpModal: {
      title: 'SELAMAT! PANGKAT PSIKOLOG MENINGKAT',
      desc: 'Dedikasi Anda dalam mendengarkan dan membantu klien telah meningkatkan reputasi klinik!',
      prevRank: 'Pangkat Sebelumnya:',
      newRank: 'Pangkat Baru:',
      reward: 'Bonus: Item Dekorasi Baru Terbuka di Toko!',
      continueBtn: 'Lanjutkan Praktik Terbaik'
    },
    referenceBoard: {
      title: 'Buku Referensi & Teori Klinis Psikologi',
      subtitle: 'ARTUDIEI PSYCHOLOGY ARCHIVE & PEER-REVIEWED JOURNAL SOURCES',
      tabTheories: 'Teori Terapi & Link Jurnal Ilmiah',
      tabClientProfile: 'Profil & Riwayat Klien Aktif',
      tabHotsRubric: 'Rubrik Penilaian HOTS Klinis',
      theoryFrameworks: 'Kerangka Teori Psikologi & Intervensi',
      peerReviewed: 'Koneksi Jurnal Ilmiah & Rujukan Peer-Reviewed',
      doiReference: 'Buka Dokumen / DOI Ilmiah',
      noActiveClient: 'Belum ada klien aktif yang dipilih. Dekati klien di sofa atau buat kasus baru.',
      caseHistory: 'Riwayat Sesi Dialog dengan Klien Ini:',
      historyPhase: 'Tahap:',
      historyChoice: 'Respon Dipilih:',
      rubricTitle: 'Rubrik Taksonomi Bloom HOTS (Higher-Order Thinking Skills) dalam Konseling:',
      rubricDesc: 'Evaluasi respon konselor didasarkan pada kedalaman kognitif dan ketepatan empatik.',
      theoristLabel: 'Tokoh:',
      coreConceptLabel: 'Konsep Inti:',
      practicalAppLabel: 'Penerapan Praktis:',
      openDoiBtn: 'Buka Jurnal / DOI Asli ↗',
      fullTextBtn: 'Arsip Naskah Lengkap ↗',
      clientComplaintLabel: 'Keluhan:',
      backgroundStoryLabel: 'Cerita Latar Belakang:',
      personalityDynamicsLabel: 'Dinamika Kepribadian',
      relatedFrameworkLabel: 'Kerangka Teori Ilmiah Terkait:',
      citationLabel: 'Rujukan:',
      openOfficialDoiBtn: 'Buka Jurnal Resmi (DOI) ↗',
      scientificArchiveBtn: 'Arsip Naskah Ilmiah (PubMed / PMC) ↗',
      effectiveApproachLabel: '✅ Pendekatan Terapeutik yang Efektif:',
      aversionApproachLabel: '⚠️ Pendekatan yang Rentan Memicu Defensif:',
      hotsRubricHeader: 'Taksonomi Bloom HOTS (Higher-Order Thinking Skills) dalam Konseling',
      hotsRubricIntro: 'Dalam ARTUDIEI Clinic, pengambilan keputusan klinis dievaluasi berdasarkan tiga tingkat kognisi tingkat tinggi:',
      c4Title: 'C4: ANALYZING (Mengurai Pola)',
      c4Desc: 'Membantu klien mengurai pemicu emosional, sensasi somatis, dan pola perlindungan diri masa lalu tanpa menghakimi.',
      c5Title: 'C5: EVALUATING (Uji Realitas)',
      c5Desc: 'Mengajak klien memeriksa bukti objektif dan menimbang biaya energi dari distorsi kognitif yang selama ini diyakininya.',
      c6Title: 'C6: CREATING (Rencana Adaptif)',
      c6Desc: 'Merumuskan komitmen mikro yang realistis (jangkar somatis, aturan jeda, atau kebiasaan baru) untuk dipraktikkan di dunia nyata.',
      theories: {
        person_centered: {
          name: 'Person-Centered Therapy & Aliansi Terapeutik',
          coreConcept: 'Tiga pilar utama dalam pemulihan psikologis: Empathy (memahami sudut pandang klien seolah-olah mengalaminya sendiri), Unconditional Positive Regard (penerimaan tanpa syarat tanpa menghakimi), dan Congruence (keaslian sikap penolong).',
          clinicalApplication: 'Di dalam simulasi tadi, saat Anda tidak buru-buru menyalahkan atau menceramahi klien yang defensif/tertutup, sistem sarafnya berhenti menganggap Anda sebagai "musuh" sehingga perisai pertahanannya luluh secara alami.'
        },
        cbt_beck: {
          name: 'Cognitive Behavioral Therapy (CBT) & Restrukturisasi Kognitif',
          coreConcept: 'Bukan situasi yang membuat kita stres, melainkan cara kita menafsirkan situasi tersebut (Pikiran Otomatis / Cognitive Distortions seperti All-or-Nothing, Catastrophizing, dan Mind Reading).',
          clinicalApplication: 'Di dalam simulasi tadi, saat Anda menanyakan "Apakah nilai 85 itu benar-benar kegagalan di mata dunia?", Anda sedang mengajak klien menguji bukti empiris (Reality Testing) untuk membedakan antara fakta nyata dengan tebakan cemas di kepalanya.'
        },
        polyvagal_somatic: {
          name: 'Polyvagal Theory & Co-Regulation Somatis',
          coreConcept: 'Saat merasa panik atau cemas (seperti takut ditunjuk guru di kelas), tubuh masuk ke mode "Fight or Flight" yang mematikan logika berpikir. Tubuh harus ditenangkan lebih dulu melalui napas lambat (aktivasi saraf vagus parasimpatis) sebelum otak bisa diajak berpikir logis.',
          clinicalApplication: 'Di dalam simulasi tadi, latihan napas bersama (Co-regulation) dan meletakkan kaki di lantai langsung menurunkan detak jantung dan sesak napas klien secara biologis.'
        },
        attachment_gross: {
          name: 'Process Model of Emotion Regulation & Attachment',
          coreConcept: 'Kebiasaan menghindar, memendam masalah sendiri, atau bersikap galak saat dikritik sering kali berakar dari trauma masa lalu di mana keterbukaan berujung pada penolakan atau ejekan (Expressive Suppression vs Cognitive Reappraisal).',
          clinicalApplication: 'Di dalam simulasi tadi, metafora "Pintu Kecil Berlubang Intip" membantu klien merasa punya kendali penuh atas batasan pribadinya tanpa harus mengisolasi diri selamanya.'
        },
        act_hayes: {
          name: 'Acceptance and Commitment Therapy (ACT) & Fleksibilitas Psikologis',
          coreConcept: 'Bukan berjuang melenyapkan pikiran cemas atau menolak rasa takut, melainkan belajar menerima kehadiran emosi tersebut (Defusion & Acceptance) sambil tetap melangkah melakukan tindakan yang selaras dengan nilai hidup pribadi (Committed Action).',
          clinicalApplication: 'Membantu klien perfeksionis dan overthinker melepaskan fusi pikiran ("Aku bukan pikiran cemas ini, aku adalah pengamat dari pikiran ini") sehingga mereka bisa tetap berkarya tanpa dihantui rasa takut salah.'
        },
        schema_therapy_young: {
          name: 'Schema Therapy & Skema Maladaptif Awal (Early Maladaptive Schemas)',
          coreConcept: 'Skema Unrelenting Standards (Tuntutan Sempurna Tanpa Henti) dan Mistrust/Abuse (Ketidakpercayaan pada Orang Lain) terbentuk di masa kecil saat penerimaan bersyarat. Klien mengembangkan mode koping Protektor Menghindar atau Menyerang Balik.',
          clinicalApplication: 'Mengidentifikasi kapan klien pertama kali memasang "duri" atau "perisai baja" membantunya berdialog dengan batin terdalamnya (Vulnerable Child) dengan penuh kelembutan (Limited Reparenting).'
        },
        solution_focused_shazer: {
          name: 'Solution-Focused Brief Therapy (SFBT) & Pertanyaan Keajaiban',
          coreConcept: 'Fokus bukan pada membedah luka lama tanpa akhir, melainkan pada pengecualian (Exception Finding) saat masalah tidak terjadi, serta membangun gambaran konkrit tentang masa depan yang diinginkan (Miracle Question).',
          clinicalApplication: 'Membimbing klien melihat bahwa ia sudah memiliki sumber daya internal (Resilience) dan keberhasilan kecil yang pernah dicapainya sebelumnya.'
        },
        self_compassion_neff: {
          name: 'Mindful Self-Compassion vs. Self-Criticism Kronis',
          coreConcept: 'Mengganti kritik diri internal yang kejam dengan tiga komponen welas asih diri: Self-Kindness (kebaikan pada diri sendiri), Common Humanity (menyadari bahwa berbuat salah adalah bagian dari pengalaman universal manusia), dan Mindfulness.',
          clinicalApplication: 'Memberikan izin resmi bagi klien untuk menetapkan batas "Cukup Bagus di 85%" dan memperlakukan diri sendiri seperti sahabat baik yang sedang kesulitan.'
        },
        hots_taxonomy: {
          name: 'Taksonomi Bloom HOTS dalam Pengambilan Keputusan Klinis',
          coreConcept: 'Tiga tingkatan berpikir tingkat tinggi: C4 Analyzing (mengurai pola & akar pemicu), C5 Evaluating (menguji efektivitas koping & membandingkan fakta), dan C6 Creating (merumuskan rencana aksi, kebiasaan, dan ritual adaptif baru).',
          clinicalApplication: 'Kombinasi berimbang antara C4, C5, dan C6 memastikan klien tidak hanya merasa lega sesaat, melainkan memperoleh pemahaman diri mendalam dan bekal kebiasaan baru saat kembali ke sekolah/kampus.'
        }
      }
    },
    archetypes: {
      avoidant: {
        name: 'Si Pendiam & Pemendam Masalah',
        description: 'Sangat tertutup dan cenderung menarik diri (experiential avoidance), menggunakan game atau kesendirian sebagai benteng pertahanan emosional.'
      },
      anxious: {
        name: 'Si Pencemas & Overthinker',
        description: 'Sering membayangkan skenario terburuk dari hal-hal kecil, seperti takut ditunjuk guru di kelas, panik jika chat grup belum dibalas, atau takut ditertawakan teman.'
      },
      perfectionist: {
        name: 'Si Perfeksionis & Takut Gagal',
        description: 'Merasa semua hasil harus 100% sempurna tanpa cela. Keterlambatan atau nilai 85 dianggap sebagai kegagalan total.'
      },
      defensive: {
        name: 'Si Tertutup & Guarded',
        description: 'Sangat skeptis terhadap bantuan orang lain, memasang perisai emosional yang kuat untuk melindungi luka masa lalu.'
      },
      closed_defensive: {
        name: 'Si Tertutup & Guarded',
        description: 'Sangat skeptis terhadap bantuan orang lain, memasang perisai emosional yang kuat untuk melindungi luka masa lalu.'
      }
    }
  },

  en: {
    common: {
      appName: 'ARTUDIEI CLINIC',
      appSubtitle: 'PSYCHOLOGY & COGNITIVE THERAPY CLINIC',
      close: 'Close',
      back: 'Back',
      continue: 'Continue',
      cancel: 'Cancel',
      confirm: 'Confirm',
      open: 'Open',
      buy: 'Purchase',
      equip: 'Equip',
      unequip: 'Unequip',
      equipped: 'Equipped',
      owned: 'Owned',
      xp: 'XP',
      score: 'Score',
      grade: 'Grade',
      level: 'Level',
      tension: 'Tension',
      rapport: 'Rapport',
      active: 'Active',
      off: 'Off',
      on: 'On',
      send: 'Send',
      reply: 'Reply',
      yearsOld: 'years old',
      language: 'Language'
    },
    ranks: {
      intern: {
        full: 'Junior Apprentice Counselor',
        short: 'Junior Apprentice'
      },
      developing: {
        full: 'Developing Counselor Practitioner',
        short: 'Developing Counselor'
      },
      skilled: {
        full: 'Skilled Helper Counselor',
        short: 'Skilled Helper'
      },
      master: {
        full: 'Master Clinical Practitioner',
        short: 'Master Clinician'
      },
      maestro: {
        full: 'Senior Psychology Supervisor',
        short: 'Senior Supervisor'
      }
    },
    nav: {
      phone: 'Client Phone',
      phoneShort: 'Phone',
      shop: 'Shop',
      musicOn: 'Music: ON',
      musicOff: 'Music: OFF',
      musicPlaying: 'PLAYING',
      musicStopped: 'OFF',
      theory: 'Theory',
      newCase: 'New Case',
      help: 'Guide',
      menu: 'Navigation',
      phoneTitle: 'Counselor Phone & Client Messages',
      shopTitle: 'Clinic Renovation & Decoration Shop (XP)',
      musicPlayTitle: 'Play Music',
      musicStopTitle: 'Stop Music',
      theoryTitle: 'Psychological Theory Reference Archive',
      newCaseTitle: 'New Client Case',
      helpTitle: 'Guide & Controls',
      openMenuTitle: 'Open Navigation Menu'
    },
    mobileDrawer: {
      title: 'CLINIC NAVIGATION',
      close: 'Close Menu',
      counselorRank: 'Counselor Title / Rank',
      currentClient: 'Current Client',
      gameModules: 'Game Actions & Modules',
      shopTitle: 'Renovation & Decoration Shop',
      shopDesc: 'Furnish rooms & upgrade clinic',
      musicTitle: 'Lo-Fi BGM Radio',
      musicPlayingDesc: 'Background audio playing',
      musicOffDesc: 'Background audio muted',
      theoryTitle: 'Psychology Theory Book',
      theoryDesc: 'Interventions & diagnostic reference',
      newCaseTitle: 'New Client Case',
      newCaseDesc: 'Generate a new randomized client',
      helpTitle: 'How to Play Guide',
      helpDesc: 'Controls & psychologist role overview',
      languageSelect: 'Select Display Language',
      version: 'ARTUDIEI CLINIC • Mobile Navigation Drawer'
    },
    povBanner: {
      title: 'POINT OF VIEW (POV): YOU AS THE PSYCHOLOGIST',
      close: 'Close banner',
      desc: 'The character you control is a Counseling Psychologist at ARTUDIEI Clinic. The client on the couch carries a subtle dark/gloomy aura reflecting their emotional distress and anxiety. Your role is to practice active listening and alleviate their tension through therapeutic dialogue.',
      tip: '💡 Approach the client and press [E] or the Talk button.'
    },
    returnNotif: {
      subtitle: 'Session in progress',
      waiting: 'is waiting...',
      dismiss: 'Dismiss notification',
      button: 'Return to Session'
    },
    sessionBar: {
      finished: 'Session with',
      finishedSuffix: 'completed',
      grade: 'Grade',
      openReport: 'View Report',
      newCase: 'New Case'
    },
    helpModal: {
      header: 'COUNSELOR ROLE GUIDE & HOW TO PLAY',
      roleTitle: 'Your Role: Counseling Psychologist (Point of View)',
      roleDesc: 'In this simulation, you act directly as a Counseling Psychologist / Clinical Therapist. Clients arrive with emotional distress visually depicted by a subtle gloomy aura. Your goal is to establish a psychological safe space, listen actively, and de-escalate tension through evidence-based communication.',
      navTitle: '🎮 Navigation & Exploration:',
      navDesktop: 'Use W, A, S, D or Arrow keys. Press [E] or [SPACE] to talk with clients, inspect the bookshelf, brew tea, or tune the lofi desk radio.',
      navMobile: 'Use the Virtual Joystick on the bottom-left and the ACTION button on the bottom-right.',
      tipsTitle: '🌱 Principles of Therapeutic Communication:',
      tip1: 'Understand the emotional core and burden before jumping to solutions or giving advice.',
      tip2: 'Select from 3 response strategies (Empathetic Listening, Cognitive Reframing, Collaborative Inquiry) tailored to the situation.',
      tip3: 'Use Clinical Strategy Cards at the bottom bar to provide focused empathy or grounding interventions.',
      tip4: 'As client trust increases and tension dissolves, their gloomy aura transforms into a warm, serene glow.',
      button: 'Understood, Let’s Begin Counseling!'
    },
    interactionPrompt: {
      talk: 'Talk with Client',
      bookshelf: 'Psychology Reference Bookshelf',
      tea: 'Brew Relaxing Herbal Tea',
      plant: 'Water the Plant',
      radioOn: 'Play Music',
      radioOff: 'Turn Off Music',
      actionBtn: 'ACTION'
    },
    dialogueOverlay: {
      phase: 'Phase',
      tensionLabel: 'Client Tension',
      rapportLabel: 'Alliance & Trust',
      counselorResponseTitle: 'SELECT THE BEST THERAPEUTIC RESPONSE',
      clientThought: 'Client Inner State:',
      strategyCardsTitle: 'CLINICAL STRATEGY CARDS (HOTS)',
      educationalRationale: 'Clinical Rationale & Educational Feedback:',
      scientificExplanation: 'Theory Connection & Scientific Literature:',
      nextPhaseBtn: 'Proceed to Next Dialogue',
      finishSessionBtn: 'Conclude Counseling Session',
      cooldown: 'Cooldown:',
      turns: 'turns',
      cardActive: 'Card Applied!',
      clientResponding: 'Client is responding...',
      chooseHint: 'Choose the intervention that best validates the client’s emotional distress:',
      source: 'Scientific Source:',
      pauseMenu: 'Session Pause Menu',
      resume: 'Resume Session',
      leaveSession: 'Exit to Room Exploration',
      exitConfirm: 'Current session progress will be preserved. You can talk to the client again anytime.'
    },
    endingScreen: {
      title: 'COUNSELING SESSION EVALUATION REPORT',
      subtitle: 'ARTUDIEI CLINICAL PERFORMANCE & HOTS METRICS',
      gradeLabel: 'Achieved Grade:',
      scoreLabel: 'Counseling Effectiveness Score:',
      tensionReduction: 'Tension De-escalated:',
      finalRapport: 'Final Therapeutic Rapport:',
      diagnosticInsightTitle: 'Clinical Dynamics & Insight Analysis:',
      hotsDistribution: 'HOTS Cognitive Level Breakdown:',
      c4Analysis: 'C4: Cognitive Distortion & Emotion Analysis',
      c5Evaluation: 'C5: Evaluating Validity & Thought Logic',
      c6Creation: 'C6: Creating Adaptive Solutions & Reframing',
      recommendedIntervention: 'Recommended Follow-Up Interventions:',
      journalCitation: 'Scientific References & Evidence Base:',
      newClientBtn: 'Accept Next Client (+XP)',
      reviewRoomBtn: 'Return to Clinic Room'
    },
    counselorPhone: {
      header: 'COUNSELOR PHONE • CLIENT CHAT',
      online: 'Online',
      typing: 'is typing...',
      selectChatHint: 'Select a client conversation from the list to view their progress and reply.',
      noMessages: 'No client follow-up messages yet. Complete a counseling session to receive updates!',
      replyPlaceholder: 'Select counselor reply...',
      sendReply: 'Send Reply',
      replySent: 'Reply sent',
      clientList: 'Client List'
    },
    decorationShop: {
      title: 'CLINIC RENOVATION & DECORATION SHOP',
      tabAll: 'All Items',
      tabOwned: 'Owned Items',
      tabUnowned: 'Catalog Items',
      xpBalance: 'Reputation XP Balance:',
      clinicalBenefit: 'Clinical & Environmental Psychology Benefit',
      passiveEffect: 'In-Room Visual Effect',
      emptyCategoryTitle: 'No items in this category.',
      emptyCategoryDesc: 'Select the "All Items" tab to view other decorations.',
      buyItem: 'Purchase Furniture',
      equipItem: 'Equip in Room',
      unequipItem: 'Unequip from Room',
      insufficientXP: 'Insufficient XP',
      ownedBadge: 'OWNED',
      equippedBadge: 'EQUIPPED',
      confirmTitle: 'Confirm Purchase',
      confirmText: 'Are you sure you want to purchase this item for',
      purchaseSuccess: 'Item successfully purchased and added to your inventory!',
      items: {
        himalayan_lamp: {
          name: 'Himalayan Salt Lamp',
          description: 'Natural pink salt crystal chunk emitting a calming warm amber glow.',
          clinicalBenefit: 'Warm tone lighting (2200K) is proven to reduce cortisol and assist in client stress response desensitization.',
          passiveBonusText: 'Warm light glow on counseling desk'
        },
        aquarium_wall: {
          name: 'Neon Tetra Mini Aquarium',
          description: 'Neatly wall-mounted glass aquarium with glowing Neon Tetras & Guppies swimming gently.',
          clinicalBenefit: 'Observing rhythmic movement of aquatic life (Aquarium Therapy) triggers parasympathetic nerve stimulation and natural relaxation.',
          passiveBonusText: 'Animated fish swimming on clinic top wall'
        },
        lavender_pot: {
          name: 'Lavender Aromatic Plant',
          description: 'Potted Lavandula angustifolia plant with blooming purple flowers and aromatherapy petals.',
          clinicalBenefit: 'Linalool compounds in lavender modulate GABA receptors to relieve anxiety without excessive sedative effects.',
          passiveBonusText: 'Purple lavender plant in room corner'
        },
        persian_rug: {
          name: 'Geometric Emerald Silk Rug',
          description: 'Soft woven rug with hexagonal geometric patterns featuring emerald hue and gold accents.',
          clinicalBenefit: 'Soft underfoot texture and visual symmetry provide a stabilizing Grounding Effect for clients.',
          passiveBonusText: 'Luxury emerald carpet floor design in counseling area'
        },
        zen_mountain_art: {
          name: 'Zen Mountain Canvas Painting',
          description: 'Minimalist Japanese-inspired misty mountain landscape art with a gentle sunrise.',
          clinicalBenefit: 'Open nature visuals (Biophilic Art) expand cognitive perception space and soothe mental tension.',
          passiveBonusText: 'Mountain landscape art painting on middle wall'
        },
        emerald_sofa: {
          name: 'Royal Emerald Velvet Sofa',
          description: 'Counseling sofa upholstered in emerald green velvet with ergonomic memory foam support.',
          clinicalBenefit: 'Fully supported relaxed seating posture reduces lower back muscular pressure as clients open up.',
          passiveBonusText: 'Visual upgrade of client sofa to elegant emerald'
        },
        diffuser_station: {
          name: 'Ultrasonic Aromatherapy Diffuser',
          description: 'Minimalist wooden diffuser emitting micro-mist of chamomile and sweet orange essential oils.',
          clinicalBenefit: 'Direct olfactory stimulation to the amygdala to instantly reduce emotional reactivity.',
          passiveBonusText: 'Aromatic mist effect at tea station area'
        }
      }
    },
    relaxationModal: {
      title: '4-7-8 RELAXATION BREATHING EXERCISE',
      subtitle: 'Parasympathetic nervous system regulation technique to reduce tension',
      step1: 'Inhale Through Nose (4 Seconds)',
      step2: 'Hold Breath (7 Seconds)',
      step3: 'Exhale Slowly Through Mouth (8 Seconds)',
      readyDesc: 'Sit upright, relax your shoulders, and sync your breath with the expanding circle.',
      startBtn: 'Begin Breathing Exercise',
      finishBtn: 'Finish & Return to Room',
      cycle: 'Cycle',
      seconds: 'seconds'
    },
    levelUpModal: {
      title: 'CONGRATULATIONS! COUNSELOR RANK ELEVATED',
      desc: 'Your therapeutic empathy and counseling excellence have elevated the clinic’s standing!',
      prevRank: 'Previous Rank:',
      newRank: 'New Rank:',
      reward: 'Bonus: New Decoration Items Unlocked in the Shop!',
      continueBtn: 'Continue Practice'
    },
    referenceBoard: {
      title: 'Psychology Clinical Theory & Reference Archive',
      subtitle: 'ARTUDIEI PSYCHOLOGY ARCHIVE & PEER-REVIEWED JOURNAL SOURCES',
      tabTheories: 'Therapy Theories & Scientific Journal Links',
      tabClientProfile: 'Active Client Profile & History',
      tabHotsRubric: 'Clinical HOTS Rubric',
      theoryFrameworks: 'Psychological Theory Frameworks & Interventions',
      peerReviewed: 'Peer-Reviewed Journal Citations & Evidence',
      doiReference: 'Open Scientific DOI / Document',
      noActiveClient: 'No active client selected. Approach the sofa or start a new case.',
      caseHistory: 'Dialogue Session History with this Client:',
      historyPhase: 'Phase:',
      historyChoice: 'Chosen Response:',
      rubricTitle: 'Bloom’s HOTS (Higher-Order Thinking Skills) Taxonomy in Counseling:',
      rubricDesc: 'Counselor response scoring is evaluated based on cognitive depth and empathetic precision.',
      theoristLabel: 'Author / Theorist:',
      coreConceptLabel: 'Core Concept:',
      practicalAppLabel: 'Practical Clinical Application:',
      openDoiBtn: 'Open Journal / Original DOI ↗',
      fullTextBtn: 'Full Text Manuscript Archive ↗',
      clientComplaintLabel: 'Complaint:',
      backgroundStoryLabel: 'Background Story:',
      personalityDynamicsLabel: 'Personality Dynamics',
      relatedFrameworkLabel: 'Related Scientific Framework:',
      citationLabel: 'Reference Citation:',
      openOfficialDoiBtn: 'Open Official Journal (DOI) ↗',
      scientificArchiveBtn: 'Scientific Manuscript Archive (PubMed / PMC) ↗',
      effectiveApproachLabel: '✅ Effective Therapeutic Approaches:',
      aversionApproachLabel: '⚠️ Approaches Prone to Triggering Defensiveness:',
      hotsRubricHeader: 'Bloom’s Taxonomy HOTS (Higher-Order Thinking Skills) in Counseling',
      hotsRubricIntro: 'In ARTUDIEI Clinic, clinical decision-making is evaluated based on three higher-order cognitive levels:',
      c4Title: 'C4: ANALYZING (Pattern Deconstruction)',
      c4Desc: 'Helping clients deconstruct emotional triggers, somatic sensations, and past self-protection patterns without judgment.',
      c5Title: 'C5: EVALUATING (Reality Testing)',
      c5Desc: 'Inviting clients to examine objective evidence and weigh the energetic cost of long-held cognitive distortions.',
      c6Title: 'C6: CREATING (Adaptive Action Plan)',
      c6Desc: 'Formulating realistic micro-commitments (somatic anchors, pause rules, or new habits) to practice in the real world.',
      theories: {
        person_centered: {
          name: 'Person-Centered Therapy & Therapeutic Alliance',
          coreConcept: 'Three primary pillars of psychological healing: Empathy (understanding the client’s perspective as if experiencing it oneself), Unconditional Positive Regard (non-judgmental acceptance), and Congruence (genuineness of the helper).',
          clinicalApplication: 'In the simulation, when you refrained from rushing to judge or lecture a defensive client, their nervous system stopped perceiving you as an "enemy", causing their defense shields to melt away naturally.'
        },
        cbt_beck: {
          name: 'Cognitive Behavioral Therapy (CBT) & Cognitive Restructuring',
          coreConcept: 'It is not situations themselves that cause distress, but how we interpret them (Automatic Thoughts / Cognitive Distortions such as All-or-Nothing thinking, Catastrophizing, and Mind Reading).',
          clinicalApplication: 'In the simulation, when asking "Is a score of 85 truly a failure in the eyes of the world?", you invited the client to test empirical evidence (Reality Testing) to distinguish objective facts from anxious assumptions.'
        },
        polyvagal_somatic: {
          name: 'Polyvagal Theory & Somatic Co-Regulation',
          coreConcept: 'During panic or intense anxiety, the body enters a "Fight or Flight" state that shuts down logical cognition. The body must first be soothed via slow breathing (parasympathetic vagal activation) before the brain can engage logically.',
          clinicalApplication: 'In the simulation, co-regulation breathing exercises and grounding feet on the floor directly lowered heart rate and breathlessness biologically.'
        },
        attachment_gross: {
          name: 'Process Model of Emotion Regulation & Attachment',
          coreConcept: 'Avoidance habits, internalizing problems, or hostility toward criticism often stem from past attachment trauma where openness led to rejection or ridicule (Expressive Suppression vs Cognitive Reappraisal).',
          clinicalApplication: 'In the simulation, the "Peephole Door" metaphor helped the client feel in full control of personal boundaries without permanently isolating themselves.'
        },
        act_hayes: {
          name: 'Acceptance and Commitment Therapy (ACT) & Psychological Flexibility',
          coreConcept: 'Rather than struggling to eliminate anxious thoughts or rejecting fear, ACT teaches accepting emotional presence (Defusion & Acceptance) while taking actions aligned with core personal values (Committed Action).',
          clinicalApplication: 'Helps perfectionist and overthinking clients unhook from thought fusion ("I am not this anxious thought, I am the observer of this thought") so they can take action without fear of error.'
        },
        schema_therapy_young: {
          name: 'Schema Therapy & Early Maladaptive Schemas',
          coreConcept: 'Unrelenting Standards and Mistrust/Abuse schemas form in childhood under conditional acceptance. Clients develop coping modes such as Avoidant Protector or Overcompensator.',
          clinicalApplication: 'Identifying when the client first erected "steel shields" allows gentle dialogue with their Vulnerable Child mode (Limited Reparenting).'
        },
        solution_focused_shazer: {
          name: 'Solution-Focused Brief Therapy (SFBT) & Exception Finding',
          coreConcept: 'Focuses not on endlessly dissecting past trauma, but on finding exceptions when the problem was absent, and building concrete visions of a preferred future (Miracle Question).',
          clinicalApplication: 'Guides clients to recognize their existing internal resilience and small past successes to foster hope.'
        },
        self_compassion_neff: {
          name: 'Mindful Self-Compassion vs. Chronic Self-Criticism',
          coreConcept: 'Replacing harsh internal self-criticism with three components of self-compassion: Self-Kindness, Common Humanity (recognizing that mistakes are part of the universal human experience), and Mindfulness.',
          clinicalApplication: 'Granting official permission for clients to set a "Good Enough at 85%" boundary and treat themselves as they would a dear friend in distress.'
        },
        hots_taxonomy: {
          name: 'Bloom’s HOTS Taxonomy in Clinical Decision-Making',
          coreConcept: 'Three higher-order thinking levels: C4 Analyzing (deconstructing patterns & root triggers), C5 Evaluating (testing coping efficacy & comparing facts), and C6 Creating (formulating adaptive action plans & new habits).',
          clinicalApplication: 'A balanced combination of C4, C5, and C6 ensures clients experience more than momentary relief, gaining deep self-awareness and sustainable habits.'
        }
      }
    },
    archetypes: {
      avoidant: {
        name: 'The Quiet & Bottled-Up',
        description: 'Highly reserved and prone to experiential avoidance, using games or solitude as an emotional fortress.'
      },
      anxious: {
        name: 'Anxious & Overthinker Archetype',
        description: 'Frequently imagines worst-case scenarios over minor events, such as fear of being called on in class, panic over unreplied group messages, or fear of being ridiculed.'
      },
      perfectionist: {
        name: 'Perfectionist & Fear of Failure Archetype',
        description: 'Feels that every outcome must be 100% flawless. Delays or a score of 85 are perceived as total failure.'
      },
      defensive: {
        name: 'Guarded & Defensive Archetype',
        description: 'Highly skeptical of help from others, putting up a strong emotional shield to protect past wounds.'
      },
      closed_defensive: {
        name: 'Guarded & Defensive Archetype',
        description: 'Highly skeptical of help from others, putting up a strong emotional shield to protect past wounds.'
      }
    }
  }
};
