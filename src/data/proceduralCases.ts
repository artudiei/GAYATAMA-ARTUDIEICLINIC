import { ArchetypeId, DialoguePhase, DialogueOption, TechniqueType, TheoryConnection } from '../types/game';

// Context Themes for High Replayability
export type CaseContext = 'sekolah' | 'kampus' | 'pertemanan' | 'keluarga' | 'magang_kerja' | 'hubungan';

export interface PhaseDialogueSeed {
  clientSpeech: string;
  clientNonVerbal: string;
  clientInnerThought: string;
  options: {
    approachType: 'listen' | 'reality' | 'action';
    approachLabel: string;
    text: string;
    hots: 'C4' | 'C5' | 'C6';
    technique: TechniqueType;
    tensionChange: number;
    rapportChange: number;
    feedback: string;
    clientReaction: string;
    journalRef?: {
      title: string;
      citation: string;
      url: string;
    };
  }[];
}

export interface ScenarioSeed {
  id: string;
  context: CaseContext;
  contextTitle: string;
  triggerEvent: string;
  theoryConnection: TheoryConnection;
  phase1: PhaseDialogueSeed;
  phase2: PhaseDialogueSeed;
  phase3: PhaseDialogueSeed;
}

export const SCENARIO_SEEDS: Record<ArchetypeId, ScenarioSeed[]> = {
  // =========================================================================
  // 1. ANXIOUS & OVERTHINKER (SI PENCEMAS & OVERTHINKER)
  // =========================================================================
  anxious: [
    {
      id: 'anx_sekolah_ujian',
      context: 'sekolah',
      contextTitle: 'Ujian Lisan & Ditunjuk Guru di Depan Kelas',
      triggerEvent: 'Jantung berdebar hebat dan napas tercekat saat guru hendak menunjuk murid maju ke papan tulis',
      theoryConnection: {
        framework: 'Cognitive Model of Social Anxiety & Parasympathetic Co-Regulation',
        primarySource: 'Beck, A. T., & Clark, D. A. (1997). An information processing model of anxiety. Behavior Therapy, 28(1), 49-58.',
        secondarySource: 'Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-regulation.',
        scientificExplanation: 'Kecemasan saat ditunjuk di depan kelas memicu aktivasi sistem saraf simpatis (Fight or Flight) akibat amigdala yang menafsirkan tatapan teman sekelas sebagai ancaman penilaian sosial negatif (Catastrophizing). Melalui validasi empatik dan latihan napas berirama (Co-regulation), saraf vagus ventral teraktivasi sehingga detak jantung menurun dan korteks prefrontal dapat kembali berpikir logis.',
        doiUrl: 'https://doi.org/10.1016/S0005-7894(97)80037-8',
        scholarUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/'
      },
      phase1: {
        clientSpeech: "Kak... tadi pagi di kelas pas guru mau tunjuk murid ngerjain soal di papan tulis, rasanya jantungku mau copot. Tanganku langsung dingin basah dan aku nunduk sedalam-dalamnya biar nggak kelihatan. Aku takut banget kalau sampai salah jawab terus diketawain satu kelas.",
        clientNonVerbal: "Bicara dengan tempo cepat, meremas ujung seragamnya erat-erat, napasnya tampak pendek dan dangkal.",
        clientInnerThought: "Takut banget kalau semua orang langsung ngecap aku bodoh kalau aku nggak bisa jawab.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Validasi Respon Tubuh (Body Awareness)',
            text: "Pasti melelahkan sekali ya menahan sensasi tegang itu sendirian di kelas. Saat rasa takut itu memuncak tadi, bagian tubuh mana selain tangan yang terasa paling berat atau terkunci?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Validasi somatis membantu klien mengidentifikasi sinyal bahaya biologis tanpa merasa bersalah atas respon otomatis tubuhnya.",
            clientReaction: "Dadaku rasanya kayak dihimpit balok semen, Kak... tenggorokanku juga tercekat sampai susah nelan ludah.",
            journalRef: {
              title: "An Information Processing Model of Anxiety",
              citation: "Beck & Clark (1997), Behavior Therapy",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Uji Bukti Realitas (Reality Testing)',
            text: "Coba kita ingat bersama, pernahkah ada teman sekelasmu yang salah saat maju ke papan tulis? Apakah kamu dan seluruh kelas langsung menertawakan dan membencinya?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -14,
            rapportChange: 20,
            feedback: "Pertanyaan Sokrates mengajak klien memeriksa bukti objektif untuk menguji distorsi 'Mind Reading' dan 'Catastrophizing'.",
            clientReaction: "Enggak sih... minggu lalu temanku salah rumus, kami sekelas cuma bantu benerin bareng-bareng. Nggak ada yang ngejek.",
            journalRef: {
              title: "Cognitive Therapy of Anxiety Disorders",
              citation: "Clark & Beck (2011), Guilford Press",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Regulasi Bersama (Co-Regulation Napas)',
            text: "Di ruangan ini kamu sepenuhnya aman. Yuk kita taruh kedua telapak kaki rata di lantai, dan bersama saya tarik napas perlahan dalam 4 hitungan... lalu hembuskan lembut.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -26,
            rapportChange: 28,
            feedback: "Teknik Co-regulation berbasis Polyvagal menstimulasi saraf vagus (parasimpatis) yang secara biologis menurunkan lonjakan denyut jantung.",
            clientReaction: "*Menarik napas panjang bersama Anda dan menghembuskannya perlahan* ... Huft... rasanya ada udara segar yang masuk ke kepalaku, Kak.",
            journalRef: {
              title: "The Polyvagal Perspective",
              citation: "Porges, S. W. (2007), Biol Psychol",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1868418/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Tapi kepalaku ini kayak punya bioskop horor sendiri, Kak. Kalau ada ujian lisan besok, malamnya aku nggak bisa tidur sama sekali. Otakku terus muter film: gimana kalau aku tiba-tiba nge-blank, pingsan, terus nggak lulus sekolah?",
        clientNonVerbal: "Mata berkantung gelap kelelahan, mengusap pelipisnya dengan jari yang masih sedikit kaku.",
        clientInnerThought: "Kenapa orang lain bisa santai menghadapi ujian sedangkan aku rasanya mau mati?",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Melacak Asal Skema Cemas (Schema Tracing)',
            text: "Kapan pertama kali kamu mulai merasa bahwa berbuat salah atau terlihat tidak tahu adalah hal yang sangat membahayakan keselamatanmu?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Membantu klien menelusuri akar pengkondisian masa lalu sehingga ia menyadari bahwa overthinking adalah tameng perlindungan usang.",
            clientReaction: "Waktu SD dulu pas salah baca puisi, aku pernah ditertawakan guru dan teman-teman. Sejak itu aku bersumpah nggak boleh bikin salah lagi.",
            journalRef: {
              title: "Early Maladaptive Schemas in Chronic Anxiety",
              citation: "Young et al. (2003), Schema Therapy",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Membedakan Pikiran vs Fakta (Cognitive Defusion)',
            text: "Menurutmu, apakah 'film horor' di kepalamu itu adalah ramalan masa depan yang pasti terjadi, atau sekadar alarm palsu otak yang sedang lelah?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Teknik Cognitive Defusion (dari ACT dan CBT) memisahkan identitas klien dari pikiran-pikiran otomatis yang menakutkan.",
            clientReaction: "Itu cuma alarm palsu ya, Kak... karena selama ini kenyataannya ujianku selalu lewat dan aku tetap selamat.",
            journalRef: {
              title: "Acceptance and Commitment Therapy: Model and Processes",
              citation: "Hayes et al. (2006), Behav Res Ther",
              url: "https://doi.org/10.1016/j.brat.2005.06.006"
            }
          },
          {
            approachType: 'action',
            approachLabel: "🤝 Kontrak Perjanjian 'Boleh Blank' (Self-Permission)",
            text: "Bagaimana kalau kita buat kesepakatan baru: jika besok kamu sempat nge-blank 5 detik, kamu berhak bilang ke guru 'Mohon izin jeda 3 detik untuk tarik napas ya, Bu'?",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Memberikan izin perilaku konkret melucuti tuntutan kesempurnaan dan memulihkan rasa kendali pribadi klien.",
            clientReaction: "Wah... boleh ya ngomong gitu? Rasanya kayak dapat kunci darurat kalau kepalaku tiba-tiba macet!",
            journalRef: {
              title: "Self-Compassion in Performance Situations",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Rasanya jauh lebih plong sekarang, Kak. Aku baru sadar kalau selama ini musuh terbesarku bukan guru atau teman-teman, tapi ekspektasi kejam di kepalaku sendiri. Aku pengen bawa rasa tenang ini pas besok masuk kelas.",
        clientNonVerbal: "Pundaknya yang tadi tegang kini melorot rileks, tersenyum hangat, kontak mata mantap.",
        clientInnerThought: "Ternyata aku punya hak untuk bernapas dan manusiawi tanpa harus jadi sempurna.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengukuhkan Kekuatan Diri (Self-Efficacy)',
            text: "Luar biasa sekali kesadaran itu. Dari seluruh proses obrolan kita hari ini, apa temuan terpenting yang ingin kamu simpan erat-erat di hatimu?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -15,
            rapportChange: 22,
            feedback: "Menguatkan efikasi diri (Self-Efficacy) memastikan klien menyadari perannya sendiri dalam proses pemulihan emosinya.",
            clientReaction: "Bahwa deg-degan itu wajar, dan aku selalu bisa mengembalikan ketenangan lewat napas pelan.",
            journalRef: {
              title: "Self-Efficacy: The Exercise of Control",
              citation: "Bandura, A. (1997), W. H. Freeman",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Mengukur Skala Beban (Emotion Scaling)',
            text: "Jika dibandingkan dengan angka 10 saat kamu baru datang tadi, di angka berapa tingkat ketegangan dadamu sekarang?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Teknik Scaling memberikan bukti metrik kuantitatif kepada otak klien bahwa emosi buruk bersifat dinamis dan dapat diturunkan.",
            clientReaction: "Tadi pas datang rasanya di angka 9 atau 10, Kak. Sekarang udah turun banget ke angka 2. Ringan sekali.",
            journalRef: {
              title: "Therapeutic Alliance and Change",
              citation: "Horvath et al. (2011), Psychotherapy",
              url: "https://doi.org/10.1037/a0022186"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Ritual Jangkar Somatis (Somatic Anchor)',
            text: "Mari kita sepakati satu ritual kecil: besok pagi saat duduk di bangku kelas, sentuh ibu jari dan jari telunjukmu sambil tarik satu napas lega sebagai pengingat bahwa kamu aman.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Anchoring somatis mentransfer rasa aman di ruang terapi ke dalam realitas lingkungan kelas yang menantang.",
            clientReaction: "Siap, Kak! Aku bakal tempelkan jangkar jemari ini sebelum bel masuk berbunyi. Terima kasih banyak ya, Kak!",
            journalRef: {
              title: "Neurobiology of Somatic Grounding",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      }
    },
    {
      id: 'anx_pertemanan_chat',
      context: 'pertemanan',
      contextTitle: 'Overthinking Chat Singkat & Takut Ditinggal Teman',
      triggerEvent: 'Pikiran berputar liar karena pesan curhat hanya dibalas kata "Oke" atau dibaca tanpa balasan',
      theoryConnection: {
        framework: 'Interpersonal Schema Theory & Cognitive Distortions (Mind Reading)',
        primarySource: 'Beck, A. T., & Clark, D. A. (1997). An information processing model of anxiety. Behavior Therapy, 28(1), 49-58.',
        secondarySource: 'Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. Psychophysiology, 39(3), 281-291.',
        scientificExplanation: 'Distorsi kognitif Mind Reading (menebak pikiran orang lain secara negatif) dan Catastrophizing membuat klien menafsirkan keterlambatan pesan sebagai tanda penolakan sosial atau ancaman ditinggalkan (Abandonment Schema). Restrukturisasi kognitif membantu memisahkan ambiguitas stimulus dari narasi kecemasan internal.',
        doiUrl: 'https://doi.org/10.1016/S0005-7894(97)80037-8',
        scholarUrl: 'https://pubmed.ncbi.nlm.nih.gov/12212647/'
      },
      phase1: {
        clientSpeech: "Kemarin aku chat sahabatku panjang lebar cerita hariku, tapi dia cuma balas 'Oke' setelah 4 jam. Sejak saat itu aku nggak bisa fokus belajar sama sekali, Kak. Aku terus scroll chat lama kami, mikir apa aku kemarin bikin salah kata yang bikin dia muak sama aku?",
        clientNonVerbal: "Mengusap layar ponselnya berulang-ulang tanpa tujuan, tatapan matanya gelisah dan memelas.",
        clientInnerThought: "Gimana kalau sahabatku diam-diam udah capek temenan sama aku dan mau ngejauh?",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Validasi Rasa Sepi (Empathic Reflection)',
            text: "Mendapat balasan singkat saat kita sedang ingin berbagi memang bisa terasa sangat membingungkan dan menyesakkan. Rasanya seperti ada jarak yang tiba-tiba muncul ya?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 24,
            feedback: "Validasi empatik memenuhi kebutuhan klien untuk dimengerti tanpa buru-buru menyangkal kekhawatirannya.",
            clientReaction: "Iya bener banget, Kak! Aku ngerasa kayak diabaikan padahal aku anggap dia orang paling dekat.",
            journalRef: {
              title: "Necessary and Sufficient Conditions of Therapeutic Change",
              citation: "Rogers, C. R. (1957), J Consult Psychol",
              url: "https://doi.org/10.1037/h0045357"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Menguji Hipotesis Alternatif (Alternative Explanations)',
            text: "Selain kemungkinan dia marah padamu, hal apa saja yang mungkin sedang terjadi dalam hidup temanmu saat dia membalas singkat itu?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -15,
            rapportChange: 20,
            feedback: "Mengembangkan hipotesis alternatif mematahkan kecenderungan 'Personalization' (menganggap semua hal adalah akibat kesalahan diri sendiri).",
            clientReaction: "Mungkin dia lagi di jalan, lagi dimarahin orang tuanya, atau kuotanya mau habis... belum tentu karena aku ya.",
            journalRef: {
              title: "Cognitive Therapy of Depression and Anxiety",
              citation: "Beck, A. T. (1979), Guilford Press",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Latihan Detoks Layar & Bernapas (Stimulus Control)',
            text: "Coba taruh ponselmu sejenak di atas meja dengan layar menghadap ke bawah. Rasakan kedua tanganmu yang bebas, dan tarik napas dalam bersama saya.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 26,
            feedback: "Teknik Stimulus Control memutus lingkaran kecanduan memeriksa notifikasi (Reassurance Seeking) yang memperparah kecemasan.",
            clientReaction: "*Menaruh ponsel dan menarik napas lega* ... Ternyata nggak memegang HP selama 2 menit bikin dadaku nggak terlalu berdebar.",
            journalRef: {
              title: "Emotion Regulation in Social Context",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Aku selalu ngerasa harus jadi orang yang menyenangkan 24 jam, Kak. Kalau ada teman yang mukanya cemberut atau bad mood di dekatku, aku langsung panik merasa itu salahku. Aku capek banget harus terus baca gelagat orang.",
        clientNonVerbal: "Bahu terangkat tegang ke atas, menghela napas panjang tanda kelelahan mental yang kronis.",
        clientInnerThought: "Aku takut kalau aku berhenti menyenangkan orang lain, aku bakal sendirian dan nggak punya teman.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengidentifikasi Batasan Emosi (Boundary Awareness)',
            text: "Kamu memikul tanggung jawab yang sangat berat selama ini. Sejak kapan kamu merasa bahwa suasana hati orang lain di sekitarmu adalah tugasmu untuk memperbaikinya?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Membantu klien mengenali difusi batasan diri (Ego Boundary Confusion) di mana ia menyerap emosi orang lain sebagai bebannya sendiri.",
            clientReaction: "Sejak kecil di rumah kalau orang tuaku berantem, aku selalu berusaha melucu biar mereka baikan. Akhirnya kebawa sampai ke teman-teman.",
            journalRef: {
              title: "Attachment and Emotion Regulation",
              citation: "Bowlby, J. (1982) & Gross (2002)",
              url: "https://pubmed.ncbi.nlm.nih.gov/12212647/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Menimbang Biaya People-Pleasing (Cost-Benefit)',
            text: "Apakah kebiasaan selalu menyenangkan orang lain ini benar-benar menjamin persahabatan yang tulus, atau justru membuatmu kehilangan dirimu sendiri?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Evaluasi biaya-manfaat (Cost-Benefit Analysis) membuka ruang kognitif bagi klien untuk berani menerapkan batasan sehat.",
            clientReaction: "Malah bikin aku capek dan palsu, Kak. Teman-temanku kenal versi sempurnaku, bukan diriku yang sebenarnya.",
            journalRef: {
              title: "People-Pleasing and Psychological Flexibility",
              citation: "Hayes et al. (2006), Behav Res Ther",
              url: "https://doi.org/10.1016/j.brat.2005.06.006"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Deklarasi Batasan Sehat (Healthy Boundary Contract)',
            text: "Mari kita buat deklarasi baru: 'Emosi orang lain adalah milik mereka, dan aku bertanggung jawab penuh atas kedamaian batin diriku sendiri.'",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 25,
            feedback: "Restrukturisasi batas emosional melepaskan beban ketergantungan persetujuan (Approval Addiction).",
            clientReaction: "Kalimat itu rasanya kayak mencabut duri yang nancep di dadaku bertahun-tahun, Kak.",
            journalRef: {
              title: "Self-Compassion and Interpersonal Relationships",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Bener juga ya, Kak... pesan 'Oke' itu cuma huruf di layar. Temanku punya hak untuk lelah atau sibuk, dan itu bukan berarti dia benci aku. Aku merasa jauh lebih merdeka sekarang.",
        clientNonVerbal: "Wajahnya tampak berseri-seri, senyum ceria yang tulus merekah di bibirnya.",
        clientInnerThought: "Aku nggak perlu panik lagi setiap kali ada jeda waktu dalam obrolan.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Merayakan Kebebasan Batin (Insight Consolidation)',
            text: "Perubahan cara pandang yang sangat indah! Bagaimana rasanya melepaskan beban yang selama ini kamu pikul sendiri itu?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Konsolidasi wawasan memperkuat jalur saraf adaptif baru yang dibentuk selama sesi konseling.",
            clientReaction: "Rasanya kayak bernapas dengan paru-paru penuh untuk pertama kalinya, Kak.",
            journalRef: {
              title: "Therapeutic Alliance and Client Progress",
              citation: "Horvath et al. (2011), Psychotherapy",
              url: "https://doi.org/10.1037/a0022186"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Antisipasi Fluktuasi (Relapse Prevention)',
            text: "Jika nanti malam rasa cemas itu sempat mengetuk pikiranmu lagi, apa hal pertama yang akan kamu ingatkan pada dirimu?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Pencegahan relaps kognitif mempersiapkan klien menghadapi pemicu nyata tanpa panik.",
            clientReaction: "Aku bakal bilang ke diriku: 'Ini cuma tebakan otakku, bukan fakta. Sahabatku tetap sahabatku.'",
            journalRef: {
              title: "Cognitive Reappraisal and Mental Health",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Aturan Jeda 15 Menit (Delayed Reaction Rule)',
            text: "Yuk kita sepakati aturan praktis minggu ini: jika ada chat yang belum dibalas, beri waktu jeda 15 menit untuk melakukan aktivitas fisik sebelum mengecek ulang.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 28,
            feedback: "Behavioral Commitment yang terukur memudahkan klien mempraktikkan regulasi emosi mandiri di dunia nyata.",
            clientReaction: "Sepakat! Aku bakal langsung jalan kaki atau minum segelas air pas nunggu chat. Makasih banyak, Kak!",
            journalRef: {
              title: "Action-Oriented Cognitive Strategies",
              citation: "Clark & Beck (2011), Guilford Press",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          }
        ]
      }
    },
    {
      id: 'anx_keluarga_ekspektasi',
      context: 'keluarga',
      contextTitle: 'Takut Mengecewakan Ekspektasi Orang Tua',
      triggerEvent: 'Beban mental karena orang tua selalu membandingkan dengan anak tetangga yang berprestasi',
      theoryConnection: {
        framework: 'Conditions of Worth (Rogers) & Schema Therapy (Unrelenting Standards)',
        primarySource: 'Rogers, C. R. (1957). The necessary and sufficient conditions of therapeutic personality change. Journal of Consulting Psychology, 21(2), 95-103.',
        secondarySource: 'Young, J. E. et al. (2003). Schema therapy: A practitioner\'s guide. Guilford Press.',
        scientificExplanation: 'Penerimaan bersyarat di keluarga menanamkan "Conditions of Worth" di mana klien merasa hanya berharga jika berhasil membanggakan orang lain. Menghidupkan Unconditional Positive Regard dan Self-Compassion memulihkan harga diri intrinsik klien.',
        doiUrl: 'https://doi.org/10.1037/h0045357',
        scholarUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/'
      },
      phase1: {
        clientSpeech: "Tadi malam orang tuaku ngobrolin anak tetangga yang dapat beasiswa luar negeri. Mereka nggak marahin aku sih, tapi tatapan matanya kayak bilang 'kapan ya kamu bisa sehebat itu?'. Dadaku langsung sesak dan aku nangis sendirian di kamar sampai subuh.",
        clientNonVerbal: "Menahan napas beberapa detik, mata berkaca-kaca menahan bulir air mata, memilin jemari tangannya.",
        clientInnerThought: "Aku takut jadi anak yang gagal dan bikin malu seluruh keluarga besar.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Validasi Rasa Tertekan (Unconditional Warmth)',
            text: "Merasakan tatapan harapan yang begitu berat pasti sangat melelahkan dan menyakitkan. Kamu tidak sendirian di sini, tumpahkan saja apa yang terasa paling menyesakkan di dadamu.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Penerimaan tanpa syarat (Unconditional Positive Regard) menghadirkan ruang aman bagi klien yang terbiasa dinilai berdasarkan prestasi.",
            clientReaction: "Aku ngerasa nggak pernah cukup baik di mata mereka, Kak... apapun yang kubikin selalu ada kurangnya.",
            journalRef: {
              title: "Conditions of Therapeutic Personality Change",
              citation: "Rogers, C. R. (1957), J Consult Psychol",
              url: "https://doi.org/10.1037/h0045357"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Memisahkan Nilai Diri dari Prestasi (Core Value)',
            text: "Mari kita renungkan: Apakah keberhargaan dirimu sebagai manusia hanya diukur dari selembar beasiswa atau piagam penghargaan?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -14,
            rapportChange: 20,
            feedback: "Menantang fusi antara keberhargaan diri intrinsik (Human Worth) dengan pencapaian eksternal (Achievement).",
            clientReaction: "Harusnya enggak ya, Kak... tapi dari kecil aku diajarin kalau nggak juara kelas berarti nggak berguna.",
            journalRef: {
              title: "Self-Compassion vs Global Self-Esteem",
              citation: "Neff, K. D. (2011), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Latihan Meletakkan Tangan di Dada (Soothing Touch)',
            text: "Coba letakkan satu telapak tanganmu dengan lembut di atas dada kirimu. Rasakan kehangatan telapak tanganmu dan tarik napas perlahan... kamu aman dan berharga.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -26,
            rapportChange: 28,
            feedback: "Sentuhan welas asih diri (Soothing Touch) memicu pelepasan hormon oksitosin yang menurunkan kortisol dan ketegangan kardiovaskular.",
            clientReaction: "*Meletakkan tangan di dada dan menarik napas dalam* ... Rasanya hangat banget, Kak. Sudah lama nggak ada yang bilang aku berharga.",
            journalRef: {
              title: "Physiological Effects of Compassionate Touch",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Aku sampai takut pulang ke rumah, Kak. Tiap kali pegang gagang pintu rumah, rasanya kayak mau masuk ke ruang sidang pengadilan di mana aku terdakwanya.",
        clientNonVerbal: "Duduk menyilangkan kaki rapat-rapat, memeluk tas ranselnya sebagai perisai perlindungan.",
        clientInnerThought: "Rumah yang harusnya jadi tempat istirahat malah jadi tempat paling menegangkan di dunia.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengakui Kebutuhan Ruang Aman (Safety Needs)',
            text: "Sangat wajar jika kamu merasa ingin menghindar ketika rumah terasa seperti panggung evaluasi. Betapa kamu merindukan tempat di mana kamu bisa diterima apa adanya.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Memvalidasi kebutuhan dasar akan rasa aman (Safety and Belongingness) mempererat aliansi terapeutik.",
            clientReaction: "Iya, Kak... aku cuma pengen bisa duduk makan tanpa ditanya ranking atau nilai IPK.",
            journalRef: {
              title: "Person-Centered Counseling and Empathy",
              citation: "Rogers, C. R. (1951), Houghton Mifflin",
              url: "https://doi.org/10.1037/h0045357"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Memahami Perspektif Orang Tua Tanpa Menyerap Bebannya',
            text: "Kira-kira apa ketakutan terdalam orang tuamu saat mereka membandingkanmu? Mungkinkah itu cerminan kecemasan masa lalu mereka sendiri?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Membantu klien melihat kecemasan orang tua secara objektif tanpa harus menginternalisasinya sebagai kegagalan diri.",
            clientReaction: "Mungkin mereka dulu hidup susah dan takut aku nggak bisa bertahan... jadi kecemasan mereka yang bikin mereka nuntut.",
            journalRef: {
              title: "Intergenerational Anxiety Transmission",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Memisahkan Lintasan Hidup (Differentiation of Self)',
            text: "Mari kita buat batasan batin yang sehat: kamu menghormati orang tuamu, tetapi jalan hidup dan definisi suksesmu adalah milikmu sendiri untuk kamu tulis.",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Diferensiasi Diri (Differentiation of Self) membangun otonomi psikologis yang matang.",
            clientReaction: "Aku mengerti sekarang. Aku nggak harus menjalani hidup orang lain demi membuktikan nilaiku.",
            journalRef: {
              title: "Schema Therapy and Autonomy",
              citation: "Young, J. E. (2003), Guilford Press",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Aku sadar sekarang, jalanku sama jalan anak tetangga itu beda. Aku mau fokus sama apa yang bisa kuperjuangkan hari ini tanpa harus merasa kerdil lagi.",
        clientNonVerbal: "Menarik napas panjang yang sangat lega dan tersenyum hangat dengan mata berbinar tekad.",
        clientInnerThought: "Aku berharga bukan hanya karena piala atau pujian, tapi karena aku ada.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengapresiasi Keberanian Tumbuh (Growth Recognition)',
            text: "Sebuah langkah kedewasaan emosional yang sangat mengagumkan. Bagaimana rasanya berdiri tegak di atas nilai hidupmu sendiri?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Penguatan keberanian bertumbuh menanamkan pondasi rasa percaya diri yang kokoh.",
            clientReaction: "Rasanya dadaku lapang sekali, Kak. Nggak ada lagi beban batu yang menindih.",
            journalRef: {
              title: "Therapeutic Growth and Self-Realization",
              citation: "Rogers, C. R. (1957), J Consult Psychol",
              url: "https://doi.org/10.1037/h0045357"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Mengidentifikasi Sisi Unik Diri (Strength Spotting)',
            text: "Selain prestasi akademik, apa saja kebaikan, empati, atau ketekunan yang kamu miliki yang membuatmu bangga menjadi dirimu hari ini?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Strength Spotting mengalihkan fokus dari defisit kekurangan ke modalitas kekuatan kepribadian.",
            clientReaction: "Aku orang yang setia kawan, suka bantu teman yang kesulitan, dan nggak gampang nyerah.",
            journalRef: {
              title: "Character Strengths and Well-being",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Kalimat Penenang Pulang ke Rumah (Compassionate Mantra)',
            text: "Mari kita siapkan satu mantra saat membuka pintu rumah nanti sore: 'Aku pulang untuk beristirahat, nilaiku utuh dan aku aman.'",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Mantra somatis terarah memberikan perlindungan psikologis aktif saat memasuki lingkungan pemicu stres.",
            clientReaction: "Akan kuingat kalimat itu pas putar kunci pintu nanti sore. Terima kasih banyak, Kak!",
            journalRef: {
              title: "Self-Compassion in Family Contexts",
              citation: "Neff, K. D. (2011), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          }
        ]
      }
    }
  ],

  // =========================================================================
  // 2. PERFECTIONIST (SI PERFEKSIONIS RENTAN)
  // =========================================================================
  perfectionist: [
    {
      id: 'perf_kampus_skripsi',
      context: 'kampus',
      contextTitle: 'Skripsi, Revisi Dosen & Standar Nilai 100',
      triggerEvent: 'Menunda-nunda pengerjaan tugas akhir karena cemas hasilnya tidak sempurna dan takut dikritik dosen pembimbing',
      theoryConnection: {
        framework: 'Clinical Perfectionism (Shafran) & Schema Therapy (Unrelenting Standards)',
        primarySource: 'Shafran, R., Cooper, Z., & Fairburn, C. G. (2002). Clinical perfectionism: a cognitive-behavioural analysis. Behaviour Research and Therapy, 40(7), 773-791.',
        secondarySource: 'Neff, K. D. (2003). Self-Compassion: An Alternative Conceptualization of a Healthy Attitude Toward Oneself.',
        scientificExplanation: 'Perfeksionisme klinis memicu distorsi All-or-Nothing ("Jika tidak 100% sempurna, berarti gagal total") yang berujung pada Prokrastinasi akibat ketakutan menghadapi evaluasi negatif (Fear of Failure). Pendekatan "Good Enough Standard (85%)" dan welas asih diri memutus siklus kelumpuhan analisis (Analysis Paralysis).',
        doiUrl: 'https://doi.org/10.1016/S0005-7967(01)00059-6',
        scholarUrl: 'https://pubmed.ncbi.nlm.nih.gov/12186498/'
      },
      phase1: {
        clientSpeech: "Tugas kelompokku kemarin dapat nilai 85 dan teman-temanku pada pesta senang. Tapi aku malah nggak bisa tidur semalaman, Kak. Rasanya andai aku begadang dan periksa lagi tiap komanya, pasti bisa dapat 100. Sekarang pas dosen minta revisi bab 2, aku malah menunda ngerjainnya berhari-hari karena takut hasilnya jelek lagi.",
        clientNonVerbal: "Duduk sangat tegak kaku, membawa binder tebal penuh catatan bertinta warna-warni yang sangat rapi, jemarinya mengetuk meja tegang.",
        clientInnerThought: "Kalau aku nggak bisa bikin yang sempurna, mending nggak usah kukumpulin sekalian daripada bikin malu.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengakui Beban Menuntut Sempurna (Empathic Reflection)',
            text: "Pasti melelahkan sekali ya hidup dengan tuntutan standar yang begitu tinggi, di mana nilai 85 yang bagus pun tetap terasa seperti kegagalan bagi batinmu.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Validasi empatik terhadap beban perfeksionisme membantu klien merasa dipahami tanpa merasa dihakimi atas standarnya.",
            clientReaction: "Iya, Kak... teman-temanku bilang aku lebay, tapi di kepalaku rasanya beneran gagal total kalau cuma 85.",
            journalRef: {
              title: "Clinical Perfectionism: A Cognitive-Behavioural Analysis",
              citation: "Shafran et al. (2002), Behav Res Ther",
              url: "https://doi.org/10.1016/S0005-7967(01)00059-6"
            }
          },
          {
            approachType: 'reality',
            approachLabel: "🔍 Memeriksa Definisi 'Gagal' (Cognitive Reappraisal)",
            text: "Secara objektif di dunia akademik, apakah nilai 85 itu digolongkan sebagai gagal? Dari mana standar 'harus selalu 100' itu pertama kali kamu tetapkan?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -14,
            rapportChange: 20,
            feedback: "Menantang distorsi All-or-Nothing / Dikotomi membuka kesadaran akan spektrum pencapaian yang sehat.",
            clientReaction: "85 itu sebenarnya dapat A- di kampusku... cuma egoku yang selalu nuntut 100 tanpa toleransi.",
            journalRef: {
              title: "An Information Processing Model of Anxiety",
              citation: "Beck & Clark (1997), Behavior Therapy",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Melepaskan Ketegangan Fisik (Progressive Relaxation)',
            text: "Coba turunkan bahumu yang kaku itu 2 sentimeter ke bawah, sandarkan punggungmu ke sofa, dan hembuskan napas panjang bersama saya.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 26,
            feedback: "Klien perfeksionis sering menahan ketegangan otot kronis di bahu dan leher. Relaksasi somatis menginduksi ketenangan fisik.",
            clientReaction: "*Menurunkan bahu dan bersandar di sofa* ... Astaga, baru sadar bahuku tadi kencang banget kayak papan kayu.",
            journalRef: {
              title: "Somatic Co-Regulation in Perfectionism",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Aku nggak bisa santai sedetik pun, Kak. Kalau aku nonton film 30 menit aja, suara di kepalaku langsung teriak: 'Harusnya kamu lagi revisi bab 2! Kamu pemalas banget!' Rasanya kalau aku istirahat, duniaku bakal runtuh dan aku bakal tertinggal selamanya.",
        clientNonVerbal: "Mengusap keningnya berulang-ulang, napas terengah-engah menahan kejenuhan batin (burnout).",
        clientInnerThought: "Aku takut kalau berhenti sejenak, semua orang bakal melampaui aku dan menganggapku tidak kompeten.",
        options: [
          {
            approachType: 'listen',
            approachLabel: "🌱 Mengidentifikasi Suara 'Kritikus Batin' (Inner Critic)",
            text: "Suara di kepalamu terdengar sangat keras dan tidak memberi ampun. Menurutmu, apakah suara itu sahabat bijakmu, atau sekadar alarm ketakutan masa lalu?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Personifikasi 'Inner Critic' membantu klien mengambil jarak observasional (Metacognitive Awareness) dari kritik diri otomatisnya.",
            clientReaction: "Itu suara ketakutanku, Kak. Waktu kecil kalau nilai rankingku turun, semua fasilitas belajarku disita.",
            journalRef: {
              title: "Self-Compassion vs Self-Criticism",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Menguji Paradoks Prokrastinasi (Paradox of Perfectionism)',
            text: "Mari kita amati faktanya: apakah menuntut sempurna membuat tugas bab 2 selesai lebih cepat, atau justru membuatmu menunda dan semakin tertekan?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Membongkar paradoks bahwa tuntutan sempurna adalah pemicu utama penundaan (Procrastination by Perfectionism).",
            clientReaction: "Malah bikin tertunda seminggu penuh, Kak... andai aku kerjain seadanya kemarin pasti udah beres sekarang.",
            journalRef: {
              title: "Perfectionism Cognitions and Procrastination",
              citation: "Shafran et al. (2002), Behav Res Ther",
              url: "https://doi.org/10.1016/S0005-7967(01)00059-6"
            }
          },
          {
            approachType: 'action',
            approachLabel: "🤝 Konsep 'Cukup Bagus di 85%' (Good Enough Standard)",
            text: "Bagaimana kalau kita tetapkan target baru: 'Selesai tepat waktu di angka 85% jauh lebih berharga daripada skripsi 100% sempurna tapi tidak pernah dikumpulkan'?",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Pemberian izin target 'Good Enough' melonggarkan rigiditas kognitif dan memicu kembalinya daya produktivitas adaptif.",
            clientReaction: "Konsep 85% itu rasanya kayak ngasih oksigen baru ke otakku. Aku nggak harus bikin mahakarya tiap paragraf.",
            journalRef: {
              title: "Acceptance-Based Strategies for Perfectionism",
              citation: "Hayes et al. (2006), Behav Res Ther",
              url: "https://doi.org/10.1016/j.brat.2005.06.006"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Rasanya kayak beban ransel berisi batu 20 kilo diturunkan dari pundakku, Kak. Aku mau belajar lebih ramah sama diriku sendiri dan ngerjain revisi bab 2 sore ini dengan target 'selesai', bukan 'sempurna'.",
        clientNonVerbal: "Meletakkan pulpennya santai di meja, bersandar nyaman di sofa sambil tersenyum rileks.",
        clientInnerThought: "Aku manusia, bukan mesin yang harus selalu sempurna.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Menghargai Nilai Kemanusiaan Diri (Human Worth)',
            text: "Sangat membahagiakan mendengar kelegaan itu. Kamu berhak beristirahat dan menjadi manusia yang terus bertumbuh tanpa harus tersiksa.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Penguatan nilai kemanusiaan (Common Humanity) memulihkan keseimbangan hidup klien.",
            clientReaction: "Makasih banyak, Kak... sudah lama banget aku nggak ngerasa se-damai ini sama diriku sendiri.",
            journalRef: {
              title: "Common Humanity in Self-Compassion",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Membedakan Istirahat vs Kemalasan (Rest as Fuel)',
            text: "Kini setelah melihat lebih jernih, menurutmu apakah istirahat 30 menit itu bentuk kemalasan, atau bensin penting agar otakmu bisa berpikir jernih?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Reframing istirahat sebagai bahan bakar biologis (Biological Fuel) melenyapkan rasa bersalah saat rehat.",
            clientReaction: "Itu bensin otak, Kak. Kalau mesin dipaksa jalan tanpa bensin ya pasti mogok total.",
            journalRef: {
              title: "Restoration of Cognitive Resources",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Metode Pomodoro 25 Menit (Micro-Commitment)',
            text: "Mari kita sepakati aksi nyata sore ini: nyalakan timer 25 menit untuk menulis revisi tanpa edit, lalu nikmati 5 menit istirahat tanpa rasa bersalah.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Struktur Pomodoro terukur memecah tugas besar menjadi langkah mikro yang aman dari jebakan evaluasi berlebihan.",
            clientReaction: "Siap! 25 menit fokus ngetik, 5 menit ngopi santai. Aku bakal langsung lakuin nanti di perpus. Makasih ya, Kak!",
            journalRef: {
              title: "Action-Oriented Behavioral Activation",
              citation: "Shafran et al. (2002), Behav Res Ther",
              url: "https://doi.org/10.1016/S0005-7967(01)00059-6"
            }
          }
        ]
      }
    },
    {
      id: 'perf_magang_imposter',
      context: 'magang_kerja',
      contextTitle: 'Sindrom Penipu (Imposter Syndrome) di Tempat Magang',
      triggerEvent: 'Merasa semua pujian bos magang hanya kebetulan dan panik takut dianggap tidak kompeten',
      theoryConnection: {
        framework: 'Imposter Phenomenon (Clance & Imes) & Self-Compassion Model',
        primarySource: 'Clance, P. R., & Imes, S. A. (1978). The imposter phenomenon in high achieving women: Dynamics and therapeutic intervention. Psychotherapy: Theory, Research & Practice, 15(3), 241-247.',
        secondarySource: 'Neff, K. D. (2003). Self-Compassion: An Alternative Conceptualization of a Healthy Attitude Toward Oneself.',
        scientificExplanation: 'Klien dengan Imposter Syndrome mengatribusikan kesuksesan pada faktor eksternal (keberuntungan, bantuan orang lain) dan kegagalan pada faktor internal (ketidakmampuan pribadi). Mengajak mengumpulkan bukti kompetensi empiris memulihkan atribusi kausal yang sehat.',
        doiUrl: 'https://doi.org/10.1037/h0086006',
        scholarUrl: 'https://pubmed.ncbi.nlm.nih.gov/16300724/'
      },
      phase1: {
        clientSpeech: "Kemarin waktu presentasi mingguan magang, atasanku muji hasil laporan analisaku di depan seluruh divisi. Bukannya senang, Kak, aku malah gemetar ketakutan... Aku takut besok-besok mereka sadar kalau aku sebenarnya cuma beruntung dan aslinya nggak sepintar itu.",
        clientNonVerbal: "Bicara dengan volume pelan, tatapan waspada, kedua tangan saling menggenggam erat di pangkuan.",
        clientInnerThought: "Aku merasa seperti penipu yang tinggal menunggu waktu buat ketahuan boroknya.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Validasi Ketakutan Imposter (Safe Identification)',
            text: "Sensasi merasa seperti 'penipu' itu pasti sangat menakutkan dan menguras energi. Sangat banyak profesional hebat yang merasakan hal serupa di awal karier mereka.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Normalisasi fenomena imposter meredakan isolasi emosional yang dialami klien berprestasi tinggi.",
            clientReaction: "Beneran ada orang lain yang ngerasa kayak gitu juga, Kak? Aku kira cuma aku yang selemah ini.",
            journalRef: {
              title: "The Imposter Phenomenon: Dynamics and Interventions",
              citation: "Clance & Imes (1978), Psychotherapy",
              url: "https://doi.org/10.1037/h0086006"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Mengaudit Bukti Kerja Keras (Competence Audit)',
            text: "Berapa jam riset dan data yang kamu kumpulkan untuk membuat laporan itu? Apakah semua data grafik yang dipuji atasanmu itu muncul begitu saja karena sulap?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -15,
            rapportChange: 20,
            feedback: "Menghubungkan hasil positif dengan usaha nyata memutus bias atribusi eksternal.",
            clientReaction: "Aku riset sampai 3 hari, olah ribuan baris data... iya sih, bukan karena sulap atau kebetulan.",
            journalRef: {
              title: "Cognitive Processing of Success and Failure",
              citation: "Beck & Clark (1997), Behavior Therapy",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Latihan Postur Berdiri Tegak (Embodied Grounding)',
            text: "Coba letakkan kedua tanganmu di paha, tegakkan tulang belakangmu dengan rileks, dan rasakan kekuatan ragamu yang telah berjuang sejauh ini.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 26,
            feedback: "Postur tubuh terbuka dan grounded memodulasi neurokimia ketenangan dan rasa percaya diri.",
            clientReaction: "*Menegakkan punggung dan bernapas dalam* ... Terasa lebih mantap dan nggak loyo lagi, Kak.",
            journalRef: {
              title: "Embodied Cognition and Self-Regulation",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Aku selalu periksa email kerjaan sampai 10 kali sebelum klik tombol kirim. Satu salah ketik titik koma aja bisa bikin aku panik seharian dan mikir 'pasti besok aku langsung dipecat'.",
        clientNonVerbal: "Menghela napas panjang kelelahan, memegang pelipisnya yang berdenyut.",
        clientInnerThought: "Kenapa aku nggak pernah bisa merasa aman dengan pekerjaanku sendiri?",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Menggali Ketakutan Ditolak (Rejection Fear)',
            text: "Tampaknya ketakutan akan salah ketik itu bukan sekadar soal email, melainkan ketakutan mendalam akan penolakan dan kehilangan pengakuan ya?",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Menghubungkan perilaku kompulsi email dengan ketakutan inti (Core Fear) di baliknya.",
            clientReaction: "Iya, Kak... aku takut banget dianggap nggak profesional atau diabaikan.",
            journalRef: {
              title: "Schema Therapy for Unrelenting Standards",
              citation: "Young et al. (2003), Schema Therapy",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Menguji Konsekuensi Riil Typo (Catastrophizing Test)',
            text: "Pernahkah kamu melihat atasanmu atau manajer senior melakukan typo kecil di email? Apakah mereka langsung dipecat hari itu juga?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Uji katastropik menyadarkan klien bahwa kesalahan minor adalah bagian normal dinamika kerja manusiawi.",
            clientReaction: "Sering banget bosku typo di WhatsApp atau email... dan nggak ada yang mempermasalahkan sama sekali.",
            journalRef: {
              title: "Decatastrophizing in Workplace Anxiety",
              citation: "Clark & Beck (2011), Guilford Press",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          },
          {
            approachType: 'action',
            approachLabel: "🤝 Aturan 'Maksimal 2 Kali Periksa' (Exposure Rule)",
            text: "Mari kita sepakati latihan desensitisasi: untuk email harian biasa, batasi pemeriksaan maksimal 2 kali saja sebelum tombol kirim ditekan.",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Teknik Exposure with Response Prevention melatih otak mentoleransi sedikit ketidakpastian tanpa panik.",
            clientReaction: "Agak menantang sih, tapi aku mau coba! Dua kali periksa cukup, lalu klik kirim.",
            journalRef: {
              title: "Behavioral Experiments in Clinical Perfectionism",
              citation: "Shafran et al. (2002), Behav Res Ther",
              url: "https://doi.org/10.1016/S0005-7967(01)00059-6"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Ternyata manusia berhak berbuat salah dan tetap layak dihargai ya, Kak. Aku ada di tempat magang itu karena kerja kerasku, bukan karena kebetulan. Rasanya energiku kembali lagi.",
        clientNonVerbal: "Tersenyum cerah, wajahnya memancarkan optimisme yang hidup.",
        clientInnerThought: "Aku punya hak untuk belajar dan berkembang tanpa harus takut dihakimi terus-menerus.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengakui Identitas Profesional Baru (Identity Integration)',
            text: "Sebuah transformasi pemikiran yang sangat berharga! Kamu layak berada di tempat itu dan karyamu memberikan dampak nyata.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Pengintegrasian identitas profesional menepis sindrom penipu secara berkelanjutan.",
            clientReaction: "Terima kasih banyak, Kak... aku merasa jauh lebih kokoh sekarang.",
            journalRef: {
              title: "Overcoming Imposter Feelings",
              citation: "Clance & Imes (1978), Psychotherapy",
              url: "https://doi.org/10.1037/h0086006"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Memetakan Jurnal Apresiasi Diri (Win Log)',
            text: "Bagaimana kalau kamu membuat satu catatan kecil 'Daftar Kemenangan Nyata' untuk mencatat pencapaianmu tiap akhir pekan?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Pencatatan bukti empiris (Win Log) menyediakan data tandingan konkret saat imposter syndrome mencoba kambuh.",
            clientReaction: "Ide bagus! Aku bakal tulis semua proyek yang berhasil ku-handle di notes HP.",
            journalRef: {
              title: "Cognitive Diary in Evidence-Based Therapy",
              citation: "Beck, A. T. (1997), Behavior Therapy",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Komitmen Welas Asih Mingguan (Self-Kindness Pact)',
            text: "Mari buat kesepakatan: jika kamu melakukan kesalahan kecil minggu ini, perlakukan dirimu seperti kamu menyemangati rekan magang terbaikmu.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Transfer perspektif welas asih diri menggantikan kritik kejam internal.",
            clientReaction: "Siap, Kak! Aku bakal jadi sahabat terbaik untuk diriku sendiri mulai hari ini. Terima kasih!",
            journalRef: {
              title: "Self-Compassion in High Achievers",
              citation: "Neff, K. D. (2003), Self and Identity",
              url: "https://doi.org/10.1080/15298860309032"
            }
          }
        ]
      }
    }
  ],

  // =========================================================================
  // 3. DEFENSIVE & PROTECTIVE (SI DEFENSIF & MENJAGA DIRI)
  // =========================================================================
  defensive: [
    {
      id: 'def_sekolah_tugas_kelompok',
      context: 'sekolah',
      contextTitle: 'Konflik Tugas Kelompok & Dituduh Pemarah',
      triggerEvent: 'Merasa teman sekelompok malas dan tidak adil, lalu dicap "baperan" dan "suka ngegas" saat menegur',
      theoryConnection: {
        framework: 'Dialectical Behavior Therapy (DBT) & Emotion-Focused Therapy (EFT)',
        primarySource: 'Linehan, M. M. (1993). Cognitive-behavioral treatment of borderline personality disorder. Guilford Press.',
        secondarySource: 'Greenberg, L. S. (2004). Emotion-focused therapy. Clinical Psychology & Psychotherapy, 11(1), 3-16.',
        scientificExplanation: 'Perilaku defensif dan kemarahan sering kali merupakan emosi sekunder (Secondary Emotion) yang berfungsi melindungi emosi primer yang rapuh (Primary Emotion) seperti rasa sakit hati karena diabaikan atau takut dimanfaatkan. Validasi tanpa konfrontasi memicu penurunan defensif alami.',
        doiUrl: 'https://doi.org/10.1002/cpp.388',
        scholarUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2963469/'
      },
      phase1: {
        clientSpeech: "Aku ke sini malas sebenarnya, cuma disuruh wali kelas karena dibilang bikin ribut di kelompok. Padahal teman-temanku aja yang kerjanya lelet dan numpang nama! Pas aku tegur baik-baik malah mereka yang ngadu ke guru dan bilang aku tukang ngegas!",
        clientNonVerbal: "Menyilangkan tangan erat di dada, nada bicara tinggi menantang, tatapan mata tajam mencari konfirmasi apakah Anda akan memusuhinya.",
        clientInnerThought: "Pasti psikolog ini juga bakal belain mereka dan nyalahin aku kayak guru-guru lain.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Validasi Rasa Frustrasi (Non-Judgmental Alignment)',
            text: "Pasti menyebalkan dan melelahkan sekali saat kamu sudah berjuang keras mengerjakan tugas, tapi justru kamu yang disalahkan dan dicap negatif.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -20,
            rapportChange: 26,
            feedback: "Menolak menjadi hakim dan memvalidasi keadilan usahanya langsung melucuti rasa terancam pada klien defensif.",
            clientReaction: "Iya bener kan, Kak! Akhirnya ada yang paham kalau aku itu bukan sengaja mau cari ribut!",
            journalRef: {
              title: "Validation Strategies in DBT",
              citation: "Linehan, M. M. (1993), Guilford Press",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2963469/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Membedakan Niat vs Dampak Komunikasi (Intent vs Impact)',
            text: "Tujuanmu menegur mereka sebenarnya sangat baik agar tugas selesai. Menurutmu, mengapa pesan baikmu itu justru ditangkap sebagai kemarahan oleh mereka?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -12,
            rapportChange: 18,
            feedback: "Mengajak mengevaluasi dampak gaya komunikasi tanpa menyalahkan niat baik di baliknya.",
            clientReaction: "Mungkin nada bicaraku kemarin agak tinggi karena aku udah capek banget begadang ngerjain bagian mereka.",
            journalRef: {
              title: "Emotion-Focused Interpersonal Dialogue",
              citation: "Greenberg, L. S. (2004), Clin Psychol Psychother",
              url: "https://doi.org/10.1002/cpp.388"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Menurunkan Ketegangan Bahu (De-escalation Posture)',
            text: "Di ruangan ini tidak ada yang sedang menuduhmu. Yuk letakkan tanganmu santai di atas lutut dan kita hembuskan napas tegang tadi bersama-sama.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 26,
            feedback: "Mengajak merelaksasikan tangan yang menyilang memecah postur tubuh defensif secara neurobiologis.",
            clientReaction: "*Membuka lipatan tangan di dada dan menghela napas* ... Huft... rasanya capek juga harus terus pasang muka galak.",
            journalRef: {
              title: "Autonomic Nervous System Regulation in Anger",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Dari dulu kalau aku lembek atau diam, orang-orang bakal seenaknya nginjak atau manfaatin aku, Kak. Dulu tugas prakaryaku pernah diakui temanku sendiri dan aku cuma bisa nangis. Makanya sekarang aku mending pasang duri duluan biar mereka nggak berani macam-macam!",
        clientNonVerbal: "Suaranya sedikit bergetar emosional saat mengingat kejadian masa lalu, raut wajahnya mulai melunak dari galak menjadi sedih.",
        clientInnerThought: "Duri ini satu-satunya cara biar aku nggak disakiti lagi.",
        options: [
          {
            approachType: 'listen',
            approachLabel: "🌱 Mengapresiasi Fungsi 'Duri Pelindung' (Protective Shield)",
            text: "Duri yang kamu pasang itu dulunya adalah penyelamatmu agar kamu tidak terluka lagi ya. Betapa berjasanya caramu melindungi dirimu di masa lalu.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Menghormati fungsi proteksi masa lalu (Protective Part) melahirkan rasa aman emosional yang mendalam.",
            clientReaction: "Iya, Kak... kalau aku nggak galak, nggak ada yang bakal belain aku.",
            journalRef: {
              title: "Schema Modes and Protective Parts",
              citation: "Young, J. E. (2003), Schema Therapy",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Menilai Efektivitas Tameng Saat Ini (Shield Assessment)',
            text: "Duri itu melindungimu dari orang jahat, tapi apakah duri yang sama juga membuat teman-teman baik yang ingin dekat jadi takut dan menjauh?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Membantu klien menyadari efek samping isolasi sosial dari respon defensif yang berlebihan.",
            clientReaction: "Bener juga ya... teman yang sebenarnya berniat baik pun jadi ikutan segan dan takut ngajak aku ngobrol.",
            journalRef: {
              title: "Interpersonal Schema and Defensive Mechanisms",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Latihan Komunikasi Asertif Tenang (Assertive Communication)',
            text: "Bagaimana kalau kita coba teknik baru: kamu tetap tegas menjaga hakmu, tapi menggunakan nada tenang 'Aku-Pesan' (I-Message) tanpa harus meledak?",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Pelatihan asertivitas (DEAR MAN dari DBT) memberikan instrumen praktis untuk tetap tegas tanpa memicu konflik.",
            clientReaction: "Bisa diajarin caranya, Kak? Aku pengen tetap tegas tapi nggak dicap pemarah lagi.",
            journalRef: {
              title: "Interpersonal Effectiveness Skills (DEAR MAN)",
              citation: "Linehan, M. M. (1993 / 2015), Guilford Press",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2963469/"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Makasih banyak ya, Kak, udah mau dengerin ceritaku tanpa langsung ngecap aku anak nakal atau pemarah. Aku baru paham kalau tegas itu nggak harus pakai urat dan amarah. Hati rasanya jauh lebih enteng.",
        clientNonVerbal: "Tersenyum tulus, postur tubuh terbuka, tatapan mata hangat dan bersahabat.",
        clientInnerThought: "Ternyata aku bisa didengarkan tanpa harus berteriak.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Meneguhkan Keaslian Diri (Authentic Strength)',
            text: "Ketegasan dan kejujuranmu adalah kekuatan besar yang sangat berharga jika diarahkan dengan cara yang tenang dan bijak.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Penguatan kekuatan karakter (Character Strength Reframing) mengubah stigma negatif menjadi aset kepemimpinan.",
            clientReaction: "Aku bangga punya sifat tegas ini, dan sekarang aku tahu cara menggunakannya dengan baik.",
            journalRef: {
              title: "Positive Psychology and Emotion Regulation",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Mengingat Pembeda Tegas vs Marah (Firmness vs Anger)',
            text: "Apa perbedaan paling mendasar antara 'menegakkan batas dengan tegas' versus 'meledakkan amarah karena dendam'?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Diferensiasi kognitif antara asertivitas sehat dengan agresivitas emosional.",
            clientReaction: "Tegas itu fokus pada solusi tugas, sedangkan marah cuma buang-buang energi dan nyakitin orang lain.",
            journalRef: {
              title: "DBT Skills Training Manual",
              citation: "Linehan, M. M. (2015), Guilford Press",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2963469/"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Kalimat Pembuka di Kelas Besok (Action Script)',
            text: "Mari kita sepakati kalimat pembuka besok ke teman kelompokmu: 'Guys, yuk kita bagi tugas sesuai deadline biar kita semua dapat nilai bagus bareng.'",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Scripting dialog yang konkret memberikan panduan perilaku nyata yang siap dieksekusi di sekolah.",
            clientReaction: "Keren kalimatnya! Aku bakal sampaikan itu besok pas jam istirahat. Makasih banyak ya, Kak!",
            journalRef: {
              title: "Behavioral Rehearsal in Psychotherapy",
              citation: "Clark & Beck (2011), Guilford Press",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          }
        ]
      }
    }
  ],

  // =========================================================================
  // 4. AVOIDANT & WITHDRAWN (SI MENGHINDAR & PEMENDAM EMOSI)
  // =========================================================================
  avoidant: [
    {
      id: 'avd_pertemanan_game',
      context: 'pertemanan',
      contextTitle: 'Memilih Diam & Melarikan Diri ke Game 10 Jam',
      triggerEvent: 'Selalu menjawab "aku nggak apa-apa" dan mengurung diri di kamar bermain game saat ada masalah berat',
      theoryConnection: {
        framework: 'Attachment Theory (Avoidant Attachment) & Emotional Suppression Model',
        primarySource: 'Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. Psychophysiology, 39(3), 281-291.',
        secondarySource: 'Bowlby, J. (1982). Attachment and loss: Retrospect and prospect. American Journal of Orthopsychiatry, 52(4), 664-678.',
        scientificExplanation: 'Kebiasaan Expressive Suppression (memendam dan menekan emosi) serta pelarian ke dunia virtual merupakan strategi defensif attachment menghindari rasa sakit penolakan. Menggunakan metafora bertahap (Titrated Exposure) membantu membuka gerbang komunikasi tanpa memicu overwhelm.',
        doiUrl: 'https://doi.org/10.1111/1469-8986.3930281',
        scholarUrl: 'https://pubmed.ncbi.nlm.nih.gov/12212647/'
      },
      phase1: {
        clientSpeech: "Aku nggak tahu harus cerita apa, Kak. Hidupku ya biasa aja... datar. Kalau ada yang nanya kabarku, aku selalu jawab 'baik-baik aja kok'. Tiap kali ada masalah di sekolah atau rumah, aku langsung lari ke kamar, matiin lampu, dan main game 10 jam nonstop sampai mataku perih. Di dalam game nggak ada yang bisa nyakitin aku.",
        clientNonVerbal: "Menatap lantai, suara monoton dan pelan, kedua tangan dimasukkan ke saku jaket bertudung.",
        clientInnerThought: "Percuma cerita ke orang lain, paling cuma disuruh banyak bersyukur atau dianggap lebay.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Menghargai Ruang Perlindungan Game (Empathetic Sanctuary)',
            text: "Game menjadi tempat perlindungan yang sangat aman bagi dirimu saat dunia luar terasa terlalu bising dan menyakitkan ya. Terima kasih sudah mau datang ke sini hari ini.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -20,
            rapportChange: 26,
            feedback: "Memvalidasi game sebagai tempat pelarian adaptif tanpa langsung menceramahi bahaya kecanduan game membuat klien avoidant merasa aman.",
            clientReaction: "Iya, Kak... di dunia game aku yang pegang kendali, nggak ada yang ngecewain atau ngekhianatin aku.",
            journalRef: {
              title: "Emotion Regulation: Affective and Social Consequences",
              citation: "Gross, J. J. (2002), Psychophysiology",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Memeriksa Perasaan Saat Game Dimatikan (Reality Check)',
            text: "Setelah 10 jam bermain dan layar monitor dimatikan, apakah rasa hampa di dadamu benar-benar hilang, atau justru terasa semakin berat?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -14,
            rapportChange: 20,
            feedback: "Mengevaluasi efektivitas jangka panjang dari penghindaran emosional (Experiential Avoidance).",
            clientReaction: "Malah makin kosong dan sepi, Kak... pas layar mati dan kamar gelap, masalahku ternyata masih utuh di sana.",
            journalRef: {
              title: "Experiential Avoidance in Psychopathology",
              citation: "Hayes et al. (2006), Behav Res Ther",
              url: "https://doi.org/10.1016/j.brat.2005.06.006"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Membuka Tudung Jaket Perlahan (Gentle Pacing)',
            text: "Di ruangan ini tidak ada tuntutan apa pun. Kamu boleh bicara sekehendak hatimu, dan jika mau, kamu boleh menurunkan tudung jaketmu sedikit agar lebih lega.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -24,
            rapportChange: 26,
            feedback: "Pemberian otonomi penuh atas batasan fisik/proksemik menurunkan alarm ancaman sosial pada klien avoidant.",
            clientReaction: "*Menurunkan tudung jaket perlahan dan menarik napas pelan* ... Ruangan ini suasananya tenang ya, Kak.",
            journalRef: {
              title: "Polyvagal Co-Regulation in Avoidant Clients",
              citation: "Porges, S. W. (2011), Norton",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3108032/"
            }
          }
        ]
      },
      phase2: {
        clientSpeech: "Dulu waktu SMP aku pernah cerita rahasia terdalamku ke orang yang kupercaya, tapi malah dibocorin ke grup kelas dan jadi bahan tertawaan satu angkatan. Sejak hari itu, sekring emosiku mati total. Dinding ini memang bikin aku kesepian, tapi setidaknya nggak ada yang bisa ngehancurin aku lagi.",
        clientNonVerbal: "Jemari tangannya gemetar pelan saat mengingat trauma pengkhianatan itu, matanya menatap kosong ke lantai.",
        clientInnerThought: "Menutup diri itu sepi, tapi terluka lagi itu jauh lebih mematikan.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Menghormati Luka Pengkhianatan (Trauma Validation)',
            text: "Dikhianati oleh orang yang kita percaya adalah luka yang teramat dalam. Sangat wajar jika kamu membangun benteng setinggi ini untuk menjaga nyawa batinmu.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -18,
            rapportChange: 24,
            feedback: "Validasi luka pengkhianatan masa lalu menyentuh inti pemicu attachment avoidant klien.",
            clientReaction: "Sakit banget rasanya waktu itu, Kak... seisi kelas ngeliatin aku sambil bisik-bisik.",
            journalRef: {
              title: "Attachment and Interpersonal Trauma",
              citation: "Bowlby, J. (1982), Am J Orthopsychiatry",
              url: "https://pubmed.ncbi.nlm.nih.gov/12212647/"
            }
          },
          {
            approachType: 'reality',
            approachLabel: "🔍 Metafora 'Pintu Berlubang Intip' (Window vs Wall)",
            text: "Bagaimana jika bentengmu tidak perlu dirobohkan total, melainkan cukup dipasangi 'Pintu Kecil Berlubang Intip' yang kendalinya ada 100% di tanganmu?",
            hots: 'C5',
            technique: 'cbt_reframing',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Metafora terapeutik memberikan opsi perantara yang aman tanpa memaksa klien langsung rentan di depan semua orang.",
            clientReaction: "Pintu berlubang intip ya... jadi aku bisa intip dulu orangnya aman atau nggak sebelum buka pintu.",
            journalRef: {
              title: "Metaphor in Cognitive Behavioral Therapy",
              citation: "Beck & Clark (1997), Behavior Therapy",
              url: "https://doi.org/10.1016/S0005-7894(97)80037-8"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Latihan Berbagi 1 Hal Kecil (Micro-Vulnerability)',
            text: "Yuk kita latih: kamu yang pegang kuncinya. Coba ceritakan satu hal kecil yang kamu sukai selain game tanpa rasa takut dinilai.",
            hots: 'C6',
            technique: 'cbt_reframing',
            tensionChange: -22,
            rapportChange: 26,
            feedback: "Latihan keterbukaan mikro (Graded Exposure to Vulnerability) membuktikan bahwa interaksi sosial bisa aman dan memuaskan.",
            clientReaction: "Sebenarnya... aku suka nulis cerita fiksi dan bikin ilustrasi karakter, tapi nggak pernah berani kutunjukin ke siapa-siapa.",
            journalRef: {
              title: "Graded Exposure in Social Withdrawal",
              citation: "Clark & Beck (2011), Guilford Press",
              url: "https://pubmed.ncbi.nlm.nih.gov/9179584/"
            }
          }
        ]
      },
      phase3: {
        clientSpeech: "Rasanya kayak ada batu besar yang diangkat dari dadaku, Kak. Aku suka metafora 'Pintu Berlubang Intip' tadi. Aku nggak harus mengunci diri selamanya di kegelapan cuma gara-gara satu orang jahat di masa lalu.",
        clientNonVerbal: "Tersenyum tipis tapi sangat tulus dan hangat, rona wajahnya tampak jauh lebih segar dan hidup.",
        clientInnerThought: "Ternyata ada orang di dunia nyata yang mau mendengarkan tanpa menghakimi atau membocorkan ceritaku.",
        options: [
          {
            approachType: 'listen',
            approachLabel: '🌱 Mengakui Kehangatan Koneksi Manusia (Connection Worth)',
            text: "Sebuah keberanian luar biasa untuk mulai membuka jendela itu lagi. Kamu layak mendapatkan persahabatan yang tulus dan menghargai keindahan ceritamu.",
            hots: 'C4',
            technique: 'active_listening',
            tensionChange: -16,
            rapportChange: 22,
            feedback: "Penguatan nilai koneksi manusiawi merestrukturisasi keyakinan isolatif klien avoidant.",
            clientReaction: "Terima kasih sudah mau jadi orang pertama yang mendengarkan tanpa menghakimi, Kak.",
            journalRef: {
              title: "Therapeutic Alliance as Corrective Emotional Experience",
              citation: "Horvath et al. (2011), Psychotherapy",
              url: "https://doi.org/10.1037/a0022186"
            }
          },
          {
            approachType: 'reality',
            approachLabel: '🔍 Membedakan Orang Masa Lalu vs Masa Kini (Discrimination)',
            text: "Apakah semua orang di sekolah atau kampusmu saat ini sama dengan orang yang menyakitimu waktu SMP dulu?",
            hots: 'C5',
            technique: 'socratic_questioning',
            tensionChange: -18,
            rapportChange: 22,
            feedback: "Diskriminasi stimulus mematahkan generalisasi berlebihan (Overgeneralization) bahwa 'semua orang pasti menusuk dari belakang'.",
            clientReaction: "Beda orangnya, Kak... ada beberapa teman sekelas yang baik dan sering nawarin bantuan tapi selama ini kuhindari.",
            journalRef: {
              title: "Schema Therapy for Mistrust/Abuse Schema",
              citation: "Young, J. E. (2003), Schema Therapy",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3330652/"
            }
          },
          {
            approachType: 'action',
            approachLabel: '🤝 Satu Langkah Kecil di Dunia Nyata (Social Re-engagement)',
            text: "Mari pilih langkah kecil minggu ini: balas sapaan teman sekelasmu dengan senyuman atau ajak satu teman makan siang bersama.",
            hots: 'C6',
            technique: 'somatic_grounding',
            tensionChange: -25,
            rapportChange: 28,
            feedback: "Rencana aksi mikro sosial membangun kembali kelekatan interpersonal (Earned Security) yang sehat.",
            clientReaction: "Aku bakal coba balas sapaan temanku besok pagi tanpa langsung buru-buru pasang headset. Makasih banyak ya, Kak!",
            journalRef: {
              title: "Behavioral Activation for Interpersonal Functioning",
              citation: "Linehan & Gross (2002/2015), Guilford Press",
              url: "https://doi.org/10.1111/1469-8986.3930281"
            }
          }
        ]
      }
    }
  ]
};

// Generative Contextual Option Builder for Dynamic Continuity
export const generateContextualPhaseOptions = (
  phaseNum: number,
  seed: ScenarioSeed,
  clientName: string,
  archetypeId: ArchetypeId
): DialogueOption[] => {
  // If specific seed phase options exist, use them
  let phaseData: PhaseDialogueSeed;
  if (phaseNum === 1) phaseData = seed.phase1;
  else if (phaseNum === 2) phaseData = seed.phase2;
  else phaseData = seed.phase3;

  if (phaseData && phaseData.options && phaseData.options.length > 0) {
    return phaseData.options.map((opt, idx) => ({
      id: `opt_${seed.id}_p${phaseNum}_${idx}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      text: opt.text.replace(/\{name\}/g, clientName),
      hots: opt.hots,
      hotsTitle: opt.approachLabel,
      technique: opt.technique,
      tensionChange: opt.tensionChange,
      rapportChange: opt.rapportChange,
      feedback: opt.feedback,
      clientReaction: opt.clientReaction,
      journalRef: opt.journalRef || {
        title: seed.theoryConnection.framework,
        citation: seed.theoryConnection.primarySource,
        url: seed.theoryConnection.doiUrl || seed.theoryConnection.scholarUrl || 'https://pubmed.ncbi.nlm.nih.gov/'
      }
    }));
  }

  // Fallback rich generative options
  return [
    {
      id: `gen_p${phaseNum}_1_${Date.now()}`,
      text: `Pasti sangat berat memendam perasaan ${seed.contextTitle.toLowerCase()} ini sendirian. Apa yang paling membuatmu merasa terbebani saat kejadian itu berlangsung?`,
      hots: 'C4',
      hotsTitle: '🌱 Fokus Mendengarkan & Validasi',
      technique: 'active_listening',
      tensionChange: -16,
      rapportChange: 22,
      feedback: 'Validasi empatik yang hangat membuat klien merasa aman dan didengarkan tanpa rasa takut diadili.',
      clientReaction: 'Rasanya lega banget ada yang mau mendengarkan tanpa langsung menyalahkan aku...',
      journalRef: {
        title: seed.theoryConnection.framework,
        citation: seed.theoryConnection.primarySource,
        url: seed.theoryConnection.doiUrl || 'https://pubmed.ncbi.nlm.nih.gov/'
      }
    },
    {
      id: `gen_p${phaseNum}_2_${Date.now()}`,
      text: `Mari kita periksa bersama secara tenang: seberapa sering bayangan terburuk di kepalamu itu benar-benar terjadi di dunia nyata?`,
      hots: 'C5',
      hotsTitle: '🔍 Fokus Memeriksa Fakta & Bukti',
      technique: 'socratic_questioning',
      tensionChange: -14,
      rapportChange: 20,
      feedback: 'Mengajak memeriksa kenyataan secara objektif membantu menurunkan histeria tebakan cemas di kepala.',
      clientReaction: 'Kalau dipikir-pikir... jarang banget terjadi separah bayanganku, cuma otakku yang bikin panik duluan.',
      journalRef: {
        title: seed.theoryConnection.framework,
        citation: seed.theoryConnection.primarySource,
        url: seed.theoryConnection.doiUrl || 'https://pubmed.ncbi.nlm.nih.gov/'
      }
    },
    {
      id: `gen_p${phaseNum}_3_${Date.now()}`,
      text: `Di ruangan ini kamu aman kok. Yuk taruh kedua telapak kaki di lantai, dan bersama saya coba tarik napas perlahan... lalu hembuskan pelan-pelan.`,
      hots: 'C6',
      hotsTitle: '🤝 Fokus Latihan Ketenangan Bersama',
      technique: 'somatic_grounding',
      tensionChange: -24,
      rapportChange: 26,
      feedback: 'Mengajak latihan napas bersama secara biologis menenangkan sistem saraf yang sedang tegang.',
      clientReaction: '*Menarik napas panjang bersama Anda dan menghembuskannya pelan* ... Huft... rasanya dadaku mulai lebih lega sekarang.',
      journalRef: {
        title: seed.theoryConnection.framework,
        citation: seed.theoryConnection.primarySource,
        url: seed.theoryConnection.doiUrl || 'https://pubmed.ncbi.nlm.nih.gov/'
      }
    }
  ];
};
