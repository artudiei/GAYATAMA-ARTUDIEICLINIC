import { Language } from './useTranslation';

// Profession translations map
const PROFESSION_MAP: Record<string, string> = {
  'Siswa SMA Tingkat Akhir': 'Senior High School Student',
  'Mahasiswa Baru': 'Freshman College Student',
  'Ketua Kelompok Tugas Kampus': 'Campus Group Project Leader',
  'Anak Sulung yang Menanggung Ekspektasi Keluarga': 'Eldest Child Bearing Family Expectations',
  'Siswa yang Sedang Ujian Kelulusan': 'Student Taking Final Exams',
  'Mahasiswa yang Sedang Magang Pertama Kali': 'First-Time Intern Student',
  'Remaja Pecinta Game & Hobi Seni': 'Gamer & Creative Arts Hobbyist'
};

// Dialogue phrases & seed translations dictionary
const DIALOGUE_MAP: Record<string, string> = {
  // --- Avd / Avoidant (Rian's Case) ---
  "Aku nggak tahu harus cerita apa, Kak. Hidupku ya biasa aja... datar. Kalau ada yang nanya kabarku, aku selalu jawab 'baik-baik aja kok'. Tiap kali ada masalah di sekolah atau rumah, aku langsung lari ke kamar, matiin lampu, dan main game 10 jam nonstop sampai mataku perih. Di dalam game nggak ada yang bisa nyakitin aku.":
    "I don't know what to talk about, Counselor. My life is just plain... flat. Whenever someone asks how I am, I always reply 'I'm fine'. Whenever there's a problem at school or home, I run to my room, turn off the lights, and play games for 10 hours straight until my eyes sting. Inside the game, nobody can hurt me.",

  "Menatap lantai, suara monoton dan pelan, kedua tangan dimasukkan ke saku jaket bertudung.":
    "Staring at the floor, monotone and quiet voice, both hands stuffed into hooded jacket pockets.",

  "Percuma cerita ke orang lain, paling cuma disuruh banyak bersyukur atau dianggap lebay.":
    "Pointless opening up to others; they'll just tell me to be grateful or call me dramatic.",

  "🌱 Menghargai Ruang Perlindungan Game (Empathetic Sanctuary)":
    "🌱 Validating Game Sanctuary (Empathetic Sanctuary)",

  "Game menjadi tempat perlindungan yang sangat aman bagi dirimu saat dunia luar terasa terlalu bising dan menyakitkan ya. Terima kasih sudah mau datang ke sini hari ini.":
    "Gaming becomes a very safe sanctuary for you when the outside world feels too noisy and painful. Thank you for being willing to come here today.",

  "Memvalidasi game sebagai tempat pelarian adaptif tanpa langsung menceramahi bahaya kecanduan game membuat klien avoidant merasa aman.":
    "Validating games as an adaptive refuge without lecturing about addiction makes avoidant clients feel safe.",

  "Iya, Kak... di dunia game aku yang pegang kendali, nggak ada yang ngecewain atau ngekhianatin aku.":
    "Yeah, Counselor... in the game world I'm in control, nobody disappoints or betrays me.",

  "🔍 Memeriksa Perasaan Saat Game Dimatikan (Reality Check)":
    "🔍 Checking Feelings When Screen is Off (Reality Check)",

  "Setelah 10 jam bermain dan layar monitor dimatikan, apakah rasa hampa di dadamu benar-benar hilang, atau justru terasa semakin berat?":
    "After 10 hours of playing and the monitor screen is turned off, does the void in your chest truly disappear, or does it feel even heavier?",

  "Mengevaluasi efektivitas jangka panjang dari penghindaran emosional (Experiential Avoidance).":
    "Evaluating the long-term effectiveness of Experiential Avoidance.",

  "Malah makin kosong dan sepi, Kak... pas layar mati dan kamar gelap, masalahku ternyata masih utuh di sana.":
    "It feels even emptier and lonely, Counselor... when the screen goes dark, my problems are still right there.",

  "🤝 Membuka Tudung Jaket Perlahan (Gentle Pacing)":
    "🤝 Gently Lowering the Hood (Gentle Pacing)",

  "Di ruangan ini tidak ada tuntutan apa pun. Kamu boleh bicara sekehendak hatimu, dan jika mau, kamu boleh menurunkan tudung jaketmu sedikit agar lebih lega.":
    "There are no demands whatsoever in this room. You may speak as you wish, and if you like, you may lower your hood slightly to feel more at ease.",

  "Pemberian otonomi penuh atas batasan fisik/proksemik menurunkan alarm ancaman sosial pada klien avoidant.":
    "Granting full autonomy over physical boundaries reduces social threat alarms for avoidant clients.",

  "*Menurunkan tudung jaket perlahan dan menarik napas pelan* ... Ruangan ini suasananya tenang ya, Kak.":
    "*Slowly lowers hood and takes a soft breath* ... The atmosphere in this room feels peaceful, Counselor.",

  "Dulu waktu SMP aku pernah cerita rahasia terdalamku ke orang yang kupercaya, tapi malah dibocorin ke grup kelas dan jadi bahan tertawaan satu angkatan. Sejak hari itu, sekring emosiku mati total. Dinding ini memang bikin aku kesepian, tapi setidaknya nggak ada yang bisa ngehancurin aku lagi.":
    "Back in middle school I confided my deepest secret to someone I trusted, but they leaked it to the class group chat and I became a laughingstock. Since that day, my emotional fuses blew completely out. This wall makes me lonely, but at least nobody can crush me again.",

  "Jemari tangannya gemetar pelan saat mengingat trauma pengkhianatan itu, matanya menatap kosong ke lantai.":
    "Fingers trembling softly as they recall the betrayal trauma, eyes staring blankly at the floor.",

  "Menutup diri itu sepi, tapi terluka lagi itu jauh lebih mematikan.":
    "Closing off is lonely, but getting hurt again is far more lethal.",

  "🌱 Menghormati Luka Pengkhianatan (Trauma Validation)":
    "🌱 Validating Betrayal Trauma (Trauma Validation)",

  "Dikhianati oleh orang yang kita percaya adalah luka yang teramat dalam. Sangat wajar jika kamu membangun benteng setinggi ini untuk menjaga nyawa batinmu.":
    "Being betrayed by someone we trust is a deeply painful wound. It is completely natural that you built a fortress this high to protect your inner soul.",

  "Validasi luka pengkhianatan masa lalu menyentuh inti pemicu attachment avoidant klien.":
    "Validating past betrayal trauma touches the core trigger of the client's avoidant attachment.",

  "Sakit banget rasanya waktu itu, Kak... seisi kelas ngeliatin aku sambil bisik-bisik.":
    "It hurt so badly back then, Counselor... the whole class stared and whispered behind my back.",

  "🔍 Metafora 'Pintu Berlubang Intip' (Window vs Wall)":
    "🔍 'Peephole Door' Metaphor (Window vs Wall)",

  "Bagaimana jika bentengmu tidak perlu dirobohkan total, melainkan cukup dipasangi 'Pintu Kecil Berlubang Intip' yang kendalinya ada 100% di tanganmu?":
    "What if your fortress doesn't need to be demolished, but simply fitted with a 'Peephole Door' whose control stays 100% in your hands?",

  "Metafora terapeutik memberikan opsi perantara yang aman tanpa memaksa klien langsung rentan di depan semua orang.":
    "Therapeutic metaphors offer a safe middle ground without forcing immediate vulnerability before everyone.",

  "Pintu berlubang intip ya... jadi aku bisa intip dulu orangnya aman atau nggak sebelum buka pintu.":
    "A peephole door... so I can peek first to see if a person is safe before opening the door.",

  "🤝 Latihan Berbagi 1 Hal Kecil (Micro-Vulnerability)":
    "🤝 Micro-Vulnerability Practice (Micro-Vulnerability)",

  "Yuk kita latih: kamu yang pegang kuncinya. Coba ceritakan satu hal kecil yang kamu sukai selain game tanpa rasa takut dinilai.":
    "Let's practice: you hold the key. Try sharing one small thing you enjoy besides games without fear of judgment.",

  "Latihan keterbukaan mikro (Graded Exposure to Vulnerability) membuktikan bahwa interaksi sosial bisa aman dan memuaskan.":
    "Micro-vulnerability practice (Graded Exposure) proves that social interactions can be safe and fulfilling.",

  "Sebenarnya... aku suka nulis cerita fiksi dan bikin ilustrasi karakter, tapi nggak pernah berani kutunjukin ke siapa-siapa.":
    "Actually... I like writing fiction stories and illustrating characters, but I never dared to show anyone.",

  // --- Anxious (Dinda / Nadia / Zahra's Cases) ---
  "Kak... tadi pagi di kelas pas guru mau tunjuk murid ngerjain soal di papan tulis, rasanya jantungku mau copot. Tanganku langsung dingin basah dan aku nunduk sedalam-dalamnya biar nggak kelihatan. Aku takut banget kalau sampai salah jawab terus diketawain satu kelas.":
    "Counselor... this morning in class when the teacher was about to call on someone at the board, I felt like my heart would jump out. My hands went cold and sweaty, and I ducked down so I wouldn't be seen. I was terrified of answering wrong and being laughed at.",

  "Bicara dengan tempo cepat, meremas ujung seragamnya erat-erat, napasnya tampak pendek dan dangkal.":
    "Speaking rapidly, clutching uniform edges tightly, breath noticeably short and shallow.",

  "Takut banget kalau semua orang langsung ngecap aku bodoh kalau aku nggak bisa jawab.":
    "Terrified everyone will label me stupid if I can't answer.",

  "🌱 Validasi Respon Tubuh (Body Awareness)":
    "🌱 Body Response Validation (Body Awareness)",

  "Pasti melelahkan sekali ya menahan sensasi tegang itu sendirian di kelas. Saat rasa takut itu memuncak tadi, bagian tubuh mana selain tangan yang terasa paling berat atau terkunci?":
    "It must be exhausting holding all that tension alone in class. When the fear peaked, which part of your body felt heaviest or locked up?",

  "Validasi somatis membantu klien mengidentifikasi sinyal bahaya biologis tanpa merasa bersalah atas respon otomatis tubuhnya.":
    "Somatic validation helps clients identify biological alarm signals without guilt over automatic body responses.",

  "Dadaku rasanya kayak dihimpit balok semen, Kak... tenggorokanku juga tercekat sampai susah nelan ludah.":
    "My chest felt like it was pressed under a concrete block... my throat tightened up so hard I could barely swallow.",

  "🔍 Uji Bukti Realitas (Reality Testing)":
    "🔍 Examining Evidence (Reality Testing)",

  "Coba kita ingat bersama, pernahkah ada teman sekelasmu yang salah saat maju ke papan tulis? Apakah kamu dan seluruh kelas langsung menertawakan dan membencinya?":
    "Let's recall together: has a classmate ever made a mistake at the board? Did you and the class immediately laugh at and hate them?",

  "Pertanyaan Sokrates mengajak klien memeriksa bukti objektif untuk menguji distorsi 'Mind Reading' dan 'Catastrophizing'.":
    "Socratic questioning invites clients to examine objective evidence against 'Mind Reading' and 'Catastrophizing' distortions.",

  "Enggak sih... minggu lalu temanku salah rumus, kami sekelas cuma bantu benerin bareng-bareng. Nggak ada yang ngejek.":
    "Not really... last week a friend used the wrong formula, and we just helped correct it together. Nobody mocked them.",

  "🤝 Regulasi Bersama (Co-Regulation Napas)":
    "🤝 Co-Regulation Exercise (Co-Regulation Breathing)",

  "Di ruangan ini kamu sepenuhnya aman. Yuk kita taruh kedua telapak kaki rata di lantai, dan bersama saya tarik napas perlahan dalam 4 hitungan... lalu hembuskan lembut.":
    "You are completely safe in this room. Let's place both feet flat on the floor, inhale slowly with me for 4 counts... then exhale gently.",

  "Teknik Co-regulation berbasis Polyvagal menstimulasi saraf vagus (parasimpatis) yang secara biologis menurunkan lonjakan denyut jantung.":
    "Polyvagal-based Co-regulation stimulates the vagus nerve (parasympathetic), biologically reducing heart rate spikes.",

  "*Menarik napas panjang bersama Anda dan menghembuskannya perlahan* ... Huft... rasanya ada udara segar yang masuk ke kepalaku, Kak.":
    "*Takes a deep breath with you and exhales slowly* ... Phew... it feels like fresh air is entering my head, Counselor.",

  // --- Phase 3 & Session Report Translations ---
  "Rasanya jauh lebih plong sekarang, Kak. Aku baru sadar kalau selama ini musuh terbesarku bukan guru atau teman-teman, tapi ekspektasi kejam di kepalaku sendiri. Aku pengen bawa rasa tenang ini pas besok masuk kelas.":
    "It feels so much lighter now, Counselor. I just realized my biggest enemy all along wasn't my teachers or classmates, but the cruel expectations inside my own head. I want to bring this calm with me to class tomorrow.",

  "Pundaknya yang tadi tegang kini melorot rileks, tersenyum hangat, kontak mata mantap.":
    "Shoulders that were tense now relax completely, smiling warmly with steady eye contact.",

  "Ternyata aku punya hak untuk bernapas dan manusiawi tanpa harus jadi sempurna.":
    "Turns out I have the right to breathe and be human without having to be perfect.",

  "🌱 Mengukuhkan Kekuatan Diri (Self-Efficacy)":
    "🌱 Anchoring Inner Strength (Self-Efficacy)",

  "Luar biasa sekali kesadaran itu. Dari seluruh proses obrolan kita hari ini, apa temuan terpenting yang ingin kamu simpan erat-erat di hatimu?":
    "What an incredible realization. From our conversation today, what is the single most important insight you want to keep close to your heart?",

  "Menguatkan efikasi diri (Self-Efficacy) memastikan klien menyadari perannya sendiri dalam proses pemulihan emosinya.":
    "Strengthening self-efficacy ensures the client recognizes their own role in their emotional healing.",

  "Bahwa deg-degan itu wajar, dan aku selalu bisa mengembalikan ketenangan lewat napas pelan.":
    "That feeling nervous is normal, and I can always regain calm through slow breathing.",

  "🔍 Mengukur Skala Beban (Emotion Scaling)":
    "🔍 Scaling Emotional Load (Emotion Scaling)",

  "Jika dibandingkan dengan angka 10 saat kamu baru datang tadi, di angka berapa tingkat ketegangan dadamu sekarang?":
    "Compared to the 10 when you first arrived, at what number is your chest tension right now?",

  "Teknik Scaling memberikan bukti metrik kuantitatif kepada otak klien bahwa emosi buruk bersifat dinamis dan dapat diturunkan.":
    "Scaling technique provides quantitative evidence to the client's brain that distress is dynamic and can be reduced.",

  "Tadi pas datang rasanya di angka 9 atau 10, Kak. Sekarang udah turun banget ke angka 2. Ringan sekali.":
    "When I arrived it felt like a 9 or 10, Counselor. Now it has dropped way down to a 2. So light.",

  "🤝 Ritual Napas 'Anchor 4-7-8' di Kelas (Grounding Ritual)":
    "🤝 'Anchor 4-7-8' Breath Ritual in Class (Grounding Ritual)",

  "Yuk kita rancang ritual rahasiamu: tiap kali merasa panik di kelas, taruh ibu jari di dalam telapak tangan lalu ditarik napas 4 hitungan.":
    "Let's design your secret ritual: whenever panic rises in class, fold your thumb into your palm and inhale for 4 counts.",

  "Merumuskan ritual jangkar somatis konkret (Somatic Anchor) memberikan pertolongan pertama mandiri di situasi nyata.":
    "Formulating a concrete somatic anchor ritual provides self-administered emotional first aid in real-world situations.",

  "Siap Kak! Aku bakal jadiin ini tombol 'pause' rahasia tiap kali mulai ngerasa panik.":
    "Got it, Counselor! I'll use this as my secret 'pause' button whenever panic begins.",

  "Rasanya kayak ada batu besar yang diangkat dari dadaku, Kak. Aku suka metafora 'Pintu Berlubang Intip' tadi. Aku nggak harus mengunci diri selamanya di kegelapan cuma gara-gara satu orang jahat di masa lalu.":
    "Feels like a massive weight lifted off my chest, Counselor. I really liked that 'Peephole Door' metaphor. I don't have to lock myself in the dark forever just because of one bad person in the past.",

  "Tersenyum tipis tapi sangat tulus dan hangat, rona wajahnya tampak jauh lebih segar dan hidup.":
    "Smiling softly with genuine warmth, facial tone noticeably fresher and more alive.",

  "Ternyata ada orang di dunia nyata yang mau mendengarkan tanpa menghakimi atau membocorkan ceritaku.":
    "Turns out there are people in the real world willing to listen without judging or leaking my story.",

  "🌱 Mengakui Kehangatan Koneksi Manusia (Connection Worth)":
    "🌱 Validating Human Connection (Connection Worth)",

  "Sebuah keberanian luar biasa untuk mulai membuka jendela itu lagi. Kamu layak mendapatkan persahabatan yang tulus dan menghargai keindahan ceritamu.":
    "Extraordinary courage to begin opening that window again. You deserve genuine friendship that respects the beauty of your story.",

  "Penguatan nilai koneksi manusiawi merestrukturisasi keyakinan isolatif klien avoidant.":
    "Reinforcing human connection values restructures isolating beliefs in avoidant clients.",

  "Terima kasih sudah mau jadi orang pertama yang mendengarkan tanpa menghakimi, Kak.":
    "Thank you for being the first person to listen without judging, Counselor.",

  "🔍 Membedakan Orang Masa Lalu vs Masa Kini (Discrimination)":
    "🔍 Differentiating Past vs Present People (Discrimination)",

  "Apakah semua orang di sekolah atau kampusmu saat ini sama dengan orang yang menyakitimu waktu SMP dulu?":
    "Are all people in your school or campus currently identical to the person who hurt you back in middle school?",

  "Diskriminasi stimulus mematahkan generalisasi berlebihan (Overgeneralization) bahwa 'semua orang pasti menusuk dari belakang'.":
    "Stimulus discrimination breaks overgeneralization that 'everyone will stab me in the back'.",

  "Beda orangnya, Kak... ada beberapa teman sekelas yang baik dan sering nawarin bantuan tapi selama ini kuhindari.":
    "They're different people, Counselor... a few classmates are nice and offer help, but I've been avoiding them until now.",

  "🤝 Satu Langkah Kecil di Dunia Nyata (Social Re-engagement)":
    "🤝 One Small Step in Real Life (Social Re-engagement)",

  "Mari pilih langkah kecil minggu ini: balas sapaan teman sekelasmu dengan senyuman atau ajak satu teman makan siang bersama.":
    "Let's pick a micro-step this week: reply to a classmate's greeting with a smile or invite one friend for lunch.",

  "Formulasi rencana aksi konkret (Behavioral Activation) memberikan pengalaman sukses mikro di dunia nyata.":
    "Behavioral activation planning provides micro-success experiences in real life.",

  "Oke Kak, besok di kantin aku mau coba duduk bareng temanku dan tunjukin sedikit hasil gambar ceritaku.":
    "Okay Counselor, tomorrow at the cafeteria I'll try sitting with a friend and show a bit of my character art.",

  "Bener juga ya, Kak... pesan 'Oke' itu cuma huruf di layar. Temanku punya hak untuk lelah atau sibuk, dan itu bukan berarti dia benci aku. Aku merasa jauh lebih merdeka sekarang.":
    "You're right, Counselor... that 'OK' text is just letters on a screen. My friend has every right to be tired or busy, and it doesn't mean they hate me. I feel so much freer now.",

  "Wajahnya tampak berseri-seri, senyum ceria yang tulus merekah di bibirnya.":
    "Face glowing brightly, a genuine cheerful smile blossoming on their lips.",

  "Aku nggak perlu panik lagi setiap kali ada jeda waktu dalam obrolan.":
    "I don't need to panic anymore whenever there's a pause in conversation.",

  "🌱 Merayakan Kebebasan Batin (Insight Consolidation)":
    "🌱 Celebrating Inner Freedom (Insight Consolidation)",

  "Perubahan cara pandang yang sangat indah! Bagaimana rasanya melepaskan beban yang selama ini kamu pikul sendiri itu?":
    "A beautiful shift in perspective! How does it feel to lay down the burden you've carried alone for so long?",

  "Konsolidasi wawasan memperkuat jalur saraf adaptif baru yang dibentuk selama sesi konseling.":
    "Insight consolidation reinforces new adaptive neural pathways formed during counseling.",

  "Rasanya kayak bernapas dengan paru-paru penuh untuk pertama kalinya, Kak.":
    "Feels like taking a full breath of air for the very first time, Counselor.",

  "🔍 Antisipasi Fluktuasi (Relapse Prevention)":
    "🔍 Anticipating Fluctuations (Relapse Prevention)",

  "Jika nanti malam rasa cemas itu sempat mengetuk pikiranmu lagi, apa hal pertama yang akan kamu ingatkan pada dirimu?":
    "If anxiety knocks on your mind again tonight, what is the first thing you will remind yourself of?",

  "Pencegahan relaps kognitif mempersiapkan klien menghadapi pemicu nyata tanpa panik.":
    "Cognitive relapse prevention prepares the client to face real triggers without panic.",

  "Aku bakal bilang ke diriku: 'Ini cuma tebakan otakku, bukan fakta. Sahabatku tetap sahabatku.'":
    "I'll tell myself: 'This is just a brain guess, not a fact. My best friend is still my friend.'",

  "🤝 Aturan Jeda 15 Menit (Delayed Reaction Rule)":
    "🤝 15-Minute Pause Rule (Delayed Reaction Rule)",

  "Yuk kita sepakati aturan praktis minggu ini: jika ada chat yang belum dibalas, beri waktu jeda 15 menit untuk melakukan aktivitas fisik sebelum mengecek ulang.":
    "Let's agree on a practical rule this week: if a message goes unreplied, grant a 15-minute pause for physical activity before checking back.",

  "Formulasi aturan jeda respon (Stimulus Control) melatih toleransi distres emosional.":
    "Formulating a response delay rule (Stimulus Control) trains emotional distress tolerance.",

  "Oke Kak! Tiap nunggu balasan, aku mau jalan-jalan bentar atau minum air putih dingin.":
    "Got it, Counselor! Whenever I wait for a reply, I'll go for a short walk or drink cold water.",

  "Aku sadar sekarang, jalanku sama jalan anak tetangga itu beda. Aku mau fokus sama apa yang bisa kuperjuangkan hari ini tanpa harus merasa kerdil lagi.":
    "I realize now, my path and the neighbor's kid's path are completely different. I want to focus on what I can strive for today without feeling small.",

  "Menarik napas panjang yang sangat lega dan tersenyum hangat dengan mata berbinar tekad.":
    "Takes a long relieved breath and smiles warmly with eyes beaming with determination.",

  "Aku berharga bukan hanya karena piala atau pujian, tapi karena aku ada.":
    "I am worthy not just because of trophies or praise, but simply because I exist.",

  "🌱 Mengapresiasi Keberanian Tumbuh (Growth Recognition)":
    "🌱 Appreciating Courage to Grow (Growth Recognition)",

  "Sebuah langkah kedewasaan emosional yang sangat mengagumkan. Bagaimana rasanya berdiri tegak di atas nilai hidupmu sendiri?":
    "A truly admirable step of emotional maturity. How does it feel to stand tall on your own personal values?",

  "Penguatan keberanian bertumbuh menanamkan pondasi rasa percaya diri yang kokoh.":
    "Reinforcing growth courage instills a firm foundation of self-confidence.",

  "Rasanya dadaku lapang sekali, Kak. Nggak ada lagi beban batu yang menindih.":
    "My chest feels wide open, Counselor. No more heavy stones pressing down.",

  "🔍 Mengidentifikasi Sisi Unik Diri (Strength Spotting)":
    "🔍 Spotting Unique Personal Strengths (Strength Spotting)",

  "Selain prestasi akademik, apa saja kebaikan, empati, atau ketekunan yang kamu miliki yang membuatmu bangga menjadi dirimu hari ini?":
    "Besides academic achievements, what kindness, empathy, or perseverance do you possess that makes you proud of who you are today?",

  "Strength Spotting mengalihkan fokus dari defisit kekurangan ke modalitas kekuatan kepribadian.":
    "Strength Spotting shifts focus from deficits to personality strength modalities.",

  "Aku orang yang setia kawan, suka bantu teman yang kesulitan, dan nggak gampang nyerah.":
    "I am a loyal friend, love helping peers in trouble, and don't give up easily.",

  "Rasanya kayak beban ransel berisi batu 20 kilo diturunkan dari pundakku, Kak. Aku mau belajar lebih ramah sama diriku sendiri dan ngerjain revisi bab 2 sore ini dengan target 'selesai', bukan 'sempurna'.":
    "Feels like a 20-kg backpack filled with rocks was taken off my shoulders, Counselor. I want to learn to be kinder to myself and work on my chapter 2 revision this afternoon aiming for 'done', not 'perfect'.",

  "Meletakkan pulpennya santai di meja, bersandar nyaman di sofa sambil tersenyum rileks.":
    "Places their pen down relaxed on the table, leaning back comfortably on the sofa with a relaxed smile.",

  "Aku manusia, bukan mesin yang harus selalu sempurna.":
    "I am a human being, not a machine that must be flawless at all times.",

  "🌱 Menghargai Nilai Kemanusiaan Diri (Human Worth)":
    "🌱 Validating Human Worth (Human Worth)",

  "Sangat membahagiakan mendengar kelegaan itu. Kamu berhak beristirahat dan menjadi manusia yang terus bertumbuh tanpa harus tersiksa.":
    "It brings immense joy to hear that relief. You have every right to rest and grow as a human without suffering.",

  "Penguatan nilai kemanusiaan (Common Humanity) memulihkan keseimbangan hidup klien.":
    "Reinforcing common humanity restores life balance for the client.",

  "Makasih banyak, Kak... sudah lama banget aku nggak ngerasa se-damai ini sama diriku sendiri.":
    "Thank you so much, Counselor... it's been a long time since I felt this peaceful with myself.",

  "🔍 Membedakan Istirahat vs Kemalasan (Rest as Fuel)":
    "🔍 Differentiating Rest vs Laziness (Rest as Fuel)",

  "Kini setelah melihat lebih jernih, menurutmu apakah istirahat 30 menit itu bentuk kemalasan, atau bensin penting agar otakmu bisa berpikir jernih?":
    "Now seeing more clearly, do you think a 30-minute break is laziness, or essential fuel for your brain to think clearly?",

  "Reframing istirahat sebagai bahan bakar biologis (Biological Fuel) melenyapkan rasa bersalah saat rehat.":
    "Reframing rest as biological fuel eliminates guilt during downtime.",

  "Itu bensin otak, Kak. Kalau mesin dipaksa jalan tanpa bensin ya pasti mogok total.":
    "It's brain fuel, Counselor. If an engine is forced to run without fuel, it completely breaks down.",

  "Ternyata manusia berhak berbuat salah dan tetap layak dihargai ya, Kak. Aku ada di tempat magang itu karena kerja kerasku, bukan karena kebetulan. Rasanya energiku kembali lagi.":
    "Turns out humans have the right to make mistakes and still be valued, Counselor. I earned my internship spot through hard work, not coincidence. My energy feels restored.",

  "Tersenyum cerah, wajahnya memancarkan optimisme yang hidup.":
    "Smiling brightly, face radiating vibrant optimism.",

  "Aku punya hak untuk belajar dan berkembang tanpa harus takut dihakimi terus-menerus.":
    "I have the right to learn and grow without constant fear of judgment.",

  "🌱 Mengakui Identitas Profesional Baru (Identity Integration)":
    "🌱 Embracing New Professional Identity (Identity Integration)",

  "Sebuah transformasi pemikiran yang sangat berharga! Kamu layak berada di tempat itu dan karyamu memberikan dampak nyata.":
    "A deeply valuable transformation of perspective! You deserve to be in that place and your work has real impact.",

  "Pengintegrasian identitas profesional menepis sindrom penipu secara berkelanjutan.":
    "Integrating professional identity continuously dispels imposter syndrome.",

  "Terima kasih banyak, Kak... aku merasa jauh lebih kokoh sekarang.":
    "Thank you so much, Counselor... I feel much more grounded now.",

  "🔍 Memetakan Jurnal Apresiasi Diri (Win Log)":
    "🔍 Mapping Self-Appreciation Journal (Win Log)",

  "Bagaimana kalau kamu membuat satu catatan kecil 'Daftar Kemenangan Nyata' untuk mencatat pencapaianmu tiap akhir pekan?":
    "What if you create a small 'Win Log' note to record your actual achievements every weekend?",

  "Pencatatan bukti empiris (Win Log) menyediakan data tandingan konkret saat imposter syndrome mencoba kambuh.":
    "Recording empirical evidence (Win Log) provides concrete counter-data whenever imposter syndrome flares up.",

  "Ide bagus! Aku bakal tulis semua proyek yang berhasil ku-handle di notes HP.":
    "Great idea! I'll write down every project I successfully handle in my phone notes.",

  "Makasih banyak ya, Kak, udah mau dengerin ceritaku tanpa langsung ngecap aku anak nakal atau pemarah. Aku baru paham kalau tegas itu nggak harus pakai urat dan amarah. Hati rasanya jauh lebih enteng.":
    "Thank you so much, Counselor, for listening without immediately labeling me a bad or angry kid. I realize now that being firm doesn't require rage or shouting. My heart feels so much lighter.",

  "Tersenyum tulus, postur tubuh terbuka, tatapan mata hangat dan bersahabat.":
    "Smiling genuinely, open body posture, warm and friendly gaze.",

  "Ternyata aku bisa didengarkan tanpa harus berteriak.":
    "Turns out I can be heard without having to scream.",

  "🌱 Meneguhkan Keaslian Diri (Authentic Strength)":
    "🌱 Anchoring Authentic Strength (Authentic Strength)",

  "Ketegasan dan kejujuranmu adalah kekuatan besar yang sangat berharga jika diarahkan dengan cara yang tenang dan bijak.":
    "Your firmness and honesty are valuable strengths when channeled calmly and wisely.",

  "Penguatan kekuatan karakter (Character Strength Reframing) mengubah stigma negatif menjadi aset kepemimpinan.":
    "Character strength reframing turns negative stigma into a leadership asset.",

  "Aku bangga punya sifat tegas ini, dan sekarang aku tahu cara menggunakannya dengan baik.":
    "I'm proud of this firm trait, and now I know how to use it constructively.",

  "🔍 Mengingat Pembeda Tegas vs Marah (Firmness vs Anger)":
    "🔍 Remembering Firmness vs Anger Difference (Firmness vs Anger)",

  "Apa perbedaan paling mendasar antara 'menegakkan batas dengan tegas' versus 'meledakkan amarah karena dendam'?":
    "What is the most fundamental difference between 'firmly enforcing boundaries' versus 'exploding in anger out of resentment'?",

  "Diferensiation kognitif antara asertivitas sehat dengan agresivitas emosional.":
    "Cognitive differentiation between healthy assertiveness and emotional aggressiveness.",

  "Tegas itu fokus pada solusi tugas, sedangkan marah cuma buang-buang energi dan nyakitin orang lain.":
    "Firmness focuses on task solutions, while anger just wastes energy and hurts others.",

  // --- Ending Screen / Session Report Titles & Insights ---
  "Maestro Aliansi Terapeutik (Master Clinician)":
    "Therapeutic Alliance Maestro (Master Clinician)",

  "Konselor Empatik & Terampil (Skilled Practitioner)":
    "Empathetic & Skilled Counselor (Skilled Practitioner)",

  "Praktisi Berkemampuan Baik (Competent Helper)":
    "Competent Helper Practitioner",

  "Konselor yang Sedang Berkembang (Developing Counselor)":
    "Developing Counselor",

  "Perlu Pendampingan Lanjutan (Supervised Practice)":
    "Requires Supervised Practice",

  "Luar biasa! Pendekatan Anda sangat hangat, empatik, dan tepat sasaran. Anda berhasil menurunkan rasa terancam klien hingga mencapai titik tenang (homeostasis), membongkar asumsi keliru tanpa menceramahi, dan merumuskan langkah nyata yang langsung bisa ia terapkan di sekolah/kehidupan sehari-harinya.":
    "Outstanding! Your approach was warm, empathetic, and highly targeted. You successfully lowered the client's threat response to reach calm (homeostasis), deconstructed mistaken assumptions without lecturing, and formulated concrete steps they can immediately apply in school/daily life.",

  "Sangat baik! Anda berhasil menciptakan rasa aman yang tulus. Klien merasa didengarkan seutuhnya dan mulai menyadari bahwa beban pikiran yang selama ini dipendamnya bisa diurai secara logis dan tenang.":
    "Very good! You created a genuine sense of safety. The client feels fully heard and begins to realize that the mental burdens bottled up inside can be untangled logically and calmly.",

  "Cukup baik. Klien menunjukkan penurunan ketegangan yang positif, meskipun ada beberapa respon yang sedikit memicu keraguan atau kurang menyentuh akar masalah utamanya.":
    "Good progress. The client shows positive tension reduction, though a few responses slightly triggered doubt or missed the core root issue.",

  "Masih ada sedikit ketegangan yang tersisa. Klien butuh validasi perasaan lebih dalam sebelum diajak mengevaluasi kenyataan atau merancang cara baru.":
    "Some tension remains. The client needs deeper emotional validation before evaluating reality or crafting new approaches.",

  "Klien masih merasa terancam atau belum siap membuka diri. Ingat prinsip dasar: jangan menasihati sebelum rasa aman dan kepercayaan (rapport) terbentuk kokoh.":
    "The client still feels threatened or unready to open up. Remember the core principle: refrain from advising until safety and rapport are firmly established.",

  "Gunakan pendekatan mendengarkan dan latihan napas di awal agar klien merasa aman lebih cepat.":
    "Use active listening and breathing exercises early so the client feels safe faster.",

  "Ajak klien merumuskan kebiasaan atau langkah kecil baru agar punya bekal saat pulang.":
    "Encourage the client to formulate new habits or small steps so they leave with practical tools.",

  "Kepercayaan terbentuk sangat kuat! Klien siap menerapkan langkah perubahan secara mandiri.":
    "Rapport established strongly! The client is ready to apply change steps independently.",

  "Dengarkan perasaannya dengan tulus sebelum mengajak memeriksa kenyataan.":
    "Listen to their feelings genuinely before inviting reality testing.",

  // --- Seed 2: anx_pertemanan_chat ---
  "Kemarin aku chat sahabatku panjang lebar cerita hariku, tapi dia cuma balas 'Oke' setelah 4 jam. Sejak saat itu aku nggak bisa fokus belajar sama sekali, Kak. Aku terus scroll chat lama kami, mikir apa aku kemarin bikin salah kata yang bikin dia muak sama aku?":
    "Yesterday I texted my best friend a long message about my day, but they only replied 'OK' after 4 hours. Ever since then I can't focus on studying at all, Counselor. I keep scrolling through our old chats, wondering if I said something wrong yesterday that made them sick of me?",

  "Mengusap layar ponselnya berulang-ulang tanpa tujuan, tatapan matanya gelisah dan memelas.":
    "Fidgeting and scrolling their phone screen repeatedly without aim, eyes restless and pleading.",

  "Gimana kalau sahabatku diam-diam udah capek temenan sama aku dan mau ngejauh?":
    "What if my best friend is secretly tired of being friends with me and wants to distance themselves?",

  "🌱 Validasi Rasa Sepi (Empathic Reflection)":
    "🌱 Validating Loneliness (Empathic Reflection)",

  "Mendapat balasan singkat saat kita sedang ingin berbagi memang bisa terasa sangat membingungkan dan menyesakkan. Rasanya seperti ada jarak yang tiba-tiba muncul ya?":
    "Getting a short reply when wanting to connect can indeed feel confusing and painful. It feels like sudden distance appeared, doesn't it?",

  "Validasi empatik memenuhi kebutuhan klien untuk dimengerti tanpa buru-buru menyangkal kekhawatirannya.":
    "Empathic validation fulfills the client's need to be understood without prematurely dismissing their worry.",

  "Iya bener banget, Kak! Aku ngerasa kayak diabaikan padahal aku anggap dia orang paling dekat.":
    "Yes exactly, Counselor! I felt ignored even though I consider them my closest person.",

  "🔍 Menguji Hipotesis Alternatif (Alternative Explanations)":
    "🔍 Testing Alternative Hypotheses (Alternative Explanations)",

  "Selain kemungkinan dia marah padamu, hal apa saja yang mungkin sedang terjadi dalam hidup temanmu saat dia membalas singkat itu?":
    "Besides the possibility of them being mad at you, what else might have been going on in your friend's life when they sent that brief reply?",

  "Mengembangkan hipotesis alternatif mematahkan kecenderungan 'Personalization' (menganggap semua hal adalah akibat kesalahan diri sendiri).":
    "Developing alternative hypotheses breaks the 'Personalization' bias (assuming everything is one's own fault).",

  "Mungkin dia lagi di jalan, lagi dimarahin orang tuanya, atau kuotanya mau habis... belum tentu karena aku ya.":
    "Maybe they were on the road, getting scolded by parents, or running out of data... not necessarily because of me.",

  "🤝 Latihan Detoks Layar & Bernapas (Stimulus Control)":
    "🤝 Screen Detox & Breathing Practice (Stimulus Control)",

  "Coba taruh ponselmu sejenak di atas meja dengan layar menghadap ke bawah. Rasakan kedua tanganmu yang bebas, dan tarik napas dalam bersama saya.":
    "Try placing your phone face down on the desk for a moment. Feel your free hands, and take a deep breath with me.",

  "Teknik Stimulus Control memutus lingkaran kecanduan memeriksa notifikasi (Reassurance Seeking) yang memperparah kecemasan.":
    "Stimulus Control techniques break the cycle of compulsive notification checking (Reassurance Seeking) that worsens anxiety.",

  "*Menaruh ponsel dan menarik napas lega* ... Ternyata nggak memegang HP selama 2 menit bikin dadaku nggak terlalu berdebar.":
    "*Places phone down and inhales deeply* ... Turns out not holding my phone for 2 minutes keeps my chest from pounding as hard.",

  "Aku selalu ngerasa harus jadi orang yang menyenangkan 24 jam, Kak. Kalau ada teman yang mukanya cemberut atau bad mood di dekatku, aku langsung panik merasa itu salahku. Aku capek banget harus terus baca gelagat orang.":
    "I always feel I must be a people-pleaser 24/7, Counselor. If a friend looks grumpy or bad-tempered near me, I panic thinking it's my fault. I'm exhausted constantly reading people's moods.",

  "Bahu terangkat tegang ke atas, menghela napas panjang tanda kelelahan mental yang kronis.":
    "Shoulders hunched up tight, exhaling a long breath signaling chronic mental fatigue.",

  "Aku takut kalau aku berhenti menyenangkan orang lain, aku bakal sendirian dan nggak punya teman.":
    "I'm terrified that if I stop pleasing everyone, I'll end up completely alone with no friends.",

  "🌱 Mengidentifikasi Batasan Emosi (Boundary Awareness)":
    "🌱 Identifying Emotional Boundaries (Boundary Awareness)",

  "Kamu memikul tanggung jawab yang sangat berat selama ini. Sejak kapan kamu merasa bahwa suasana hati orang lain di sekitarmu adalah tugasmu untuk memperbaikinya?":
    "You've been carrying a very heavy burden. Since when did you feel that other people's moods around you were your duty to fix?",

  "Membantu klien mengenali difusi batasan diri (Ego Boundary Confusion) di mana ia menyerap emosi orang lain sebagai bebannya sendiri.":
    "Helping the client recognize ego boundary confusion where they absorb others' emotions as their own burden.",

  "Sejak kecil di rumah kalau orang tuaku berantem, aku selalu berusaha melucu biar mereka baikan. Akhirnya kebawa sampai ke teman-teman.":
    "Since I was little at home when my parents fought, I always tried to be funny to fix their mood. It carried over to my friends.",

  "🔍 Menimbang Biaya People-Pleasing (Cost-Benefit)":
    "🔍 Weighing the Cost of People-Pleasing (Cost-Benefit)",

  "Apakah kebiasaan selalu menyenangkan orang lain ini benar-benar menjamin persahabatan yang tulus, atau justru membuatmu kehilangan dirimu sendiri?":
    "Does constantly pleasing others truly guarantee genuine friendship, or does it cause you to lose your own self?",

  "Evaluasi biaya-manfaat (Cost-Benefit Analysis) membuka ruang kognitif bagi klien untuk berani menerapkan batasan sehat.":
    "Cost-Benefit Analysis opens cognitive space for the client to courageously set healthy boundaries.",

  "Malah bikin aku capek dan palsu, Kak. Teman-temanku kenal versi sempurnaku, bukan diriku yang sebenarnya.":
    "It actually makes me exhausted and fake, Counselor. My friends only know my perfect version, not the real me.",

  "🤝 Deklarasi Batasan Sehat (Healthy Boundary Contract)":
    "🤝 Healthy Boundary Declaration (Healthy Boundary Contract)",

  "Mari kita buat deklarasi baru: 'Emosi orang lain adalah milik mereka, dan aku bertanggung jawab penuh atas kedamaian batin diriku sendiri.'":
    "Let's craft a new declaration: 'Other people's emotions belong to them, and I am fully responsible for my own inner peace.'",

  "Restrukturisasi batas emosional melepaskan beban ketergantungan persetujuan (Approval Addiction).":
    "Emotional boundary restructuring releases the burden of approval addiction.",

  "Kalimat itu rasanya kayak mencabut duri yang nancep di dadaku bertahun-tahun, Kak.":
    "That phrase feels like pulling out a thorn that was stuck in my chest for years, Counselor.",

  // --- Seed 3: anx_keluarga_ekspektasi ---
  "Tadi malam orang tuaku ngobrolin anak tetangga yang dapat beasiswa luar negeri. Mereka nggak marahin aku sih, tapi tatapan matanya kayak bilang 'kapan ya kamu bisa sehebat itu?'. Dadaku langsung sesak dan aku nangis sendirian di kamar sampai subuh.":
    "Last night my parents were talking about the neighbor's kid who got an overseas scholarship. They didn't scold me, but their gaze felt like saying 'when will you be as great as that?'. My chest tightened and I cried alone in my room until dawn.",

  "Menahan napas beberapa detik, mata berkaca-kaca menahan bulir air mata, memilin jemari tangannya.":
    "Holding breath for a few seconds, eyes teary holding back tears, twisting fingers tightly.",

  "Aku takut jadi anak yang gagal dan bikin malu seluruh keluarga besar.":
    "I'm afraid of being a failure of a child and embarrassing the whole extended family.",

  "🌱 Validasi Rasa Tertekan (Unconditional Warmth)":
    "🌱 Validating Pressure (Unconditional Warmth)",

  "Merasakan tatapan harapan yang begitu berat pasti sangat melelahkan dan menyakitkan. Kamu tidak sendirian di sini, tumpahkan saja apa yang terasa paling menyesakkan di dadamu.":
    "Feeling such a heavy gaze of expectation must be exhausting and painful. You are not alone here; pour out whatever feels most suffocating.",

  "Penerimaan tanpa syarat (Unconditional Positive Regard) menghadirkan ruang aman bagi klien yang terbiasa dinilai berdasarkan prestasi.":
    "Unconditional Positive Regard provides a safe space for clients accustomed to being evaluated solely by achievement.",

  "Aku ngerasa nggak pernah cukup baik di mata mereka, Kak... apapun yang kubikin selalu ada kurangnya.":
    "I feel like I'm never good enough in their eyes, Counselor... whatever I do always falls short.",

  "🔍 Memisahkan Nilai Diri dari Prestasi (Core Value)":
    "🔍 Separating Self-Worth from Achievement (Core Value)",

  "Mari kita renungkan: Apakah keberhargaan dirimu sebagai manusia hanya diukur dari selembar beasiswa atau piagam penghargaan?":
    "Let's reflect: Is your worth as a human being measured solely by a scholarship paper or award certificate?",

  "Menantang fusi antara keberhargaan diri intrinsik (Human Worth) dengan pencapaian eksternal (Achievement).":
    "Challenging the fusion between intrinsic human worth and external achievements.",

  "Harusnya enggak ya, Kak... tapi dari kecil aku diajarin kalau nggak juara kelas berarti nggak berguna.":
    "Shouldn't be, Counselor... but since childhood I was taught that if I'm not top of the class, I'm useless.",

  "🤝 Latihan Meletakkan Tangan di Dada (Soothing Touch)":
    "🤝 Soothing Touch Practice (Soothing Touch)",

  "Coba letakkan satu telapak tanganmu dengan lembut di atas dada kirimu. Rasakan kehangatan telapak tanganmu dan tarik napas perlahan... kamu aman dan berharga.":
    "Try gently placing one palm on your left chest. Feel the warmth of your hand and take a slow breath... you are safe and worthy.",

  "Sentuhan welas asih diri (Soothing Touch) memicu pelepasan hormon oksitosin yang menurunkan kortisol dan ketegangan kardiovaskular.":
    "Soothing self-touch triggers oxytocin release, lowering cortisol and cardiovascular tension.",

  "*Meletakkan tangan di dada dan menarik napas dalam* ... Rasanya hangat banget, Kak. Sudah lama nggak ada yang bilang aku berharga.":
    "*Places hand on chest and takes a deep breath* ... It feels so warm, Counselor. It's been a long time since anyone told me I was worthy.",

  "Aku sampai takut pulang ke rumah, Kak. Tiap kali pegang gagang pintu rumah, rasanya kayak mau masuk ke ruang sidang pengadilan di mana aku terdakwanya.":
    "I'm even terrified of going home, Counselor. Every time I touch the doorknob, it feels like walking into a courtroom where I'm the defendant.",

  "Duduk menyilangkan kaki rapat-rapat, memeluk tas ranselnya sebagai perisai perlindungan.":
    "Sitting with legs crossed tightly, hugging backpack as a protective shield.",

  "Rumah yang harusnya jadi tempat istirahat malah jadi tempat paling menegangkan di dunia.":
    "The home that should be a resting place has become the most stressful place in the world.",

  "🌱 Mengakui Kebutuhan Ruang Aman (Safety Needs)":
    "🌱 Acknowledging Safety Needs (Safety Needs)",

  "Sangat wajar jika kamu merasa ingin menghindar ketika rumah terasa seperti panggung evaluasi. Betapa kamu merindukan tempat di mana kamu bisa diterima apa adanya.":
    "It's completely natural to want to avoid home when it feels like an evaluation stage. How you long for a place where you are accepted as you are.",

  "Memvalidasi kebutuhan dasar akan rasa aman (Safety and Belongingness) mempererat aliansi terapeutik.":
    "Validating basic safety and belongingness needs strengthens the therapeutic alliance.",

  "Iya, Kak... aku cuma pengen bisa duduk makan tanpa ditanya ranking atau nilai IPK.":
    "Yes, Counselor... I just want to sit and eat without being questioned about ranks or GPA.",

  "🔍 Memahami Perspektif Orang Tua Tanpa Menyerap Bebannya":
    "🔍 Understanding Parents' Perspective Without Absorbing Burden",

  "Kira-kira apa ketakutan terdalam orang tuamu saat mereka membandingkanmu? Mungkinkah itu cerminan kecemasan masa lalu mereka sendiri?":
    "What might be your parents' deepest fear when they compare you? Could it be a reflection of their own past anxieties?",

  "Membantu klien melihat kecemasan orang tua secara objektif tanpa harus menginternalisasinya sebagai kegagalan diri.":
    "Helping the client view parental anxiety objectively without internalizing it as self-failure.",

  "Mungkin mereka dulu hidup susah dan takut aku nggak bisa bertahan... jadi kecemasan mereka yang bikin mereka nuntut.":
    "Maybe they had a hard life before and fear I won't survive... so their anxiety makes them demand so much.",

  "🤝 Memisahkan Lintasan Hidup (Differentiation of Self)":
    "🤝 Differentiating Life Trajectory (Differentiation of Self)",

  "Mari kita buat batasan batin yang sehat: kamu menghormati orang tuamu, tetapi jalan hidup dan definisi suksesmu adalah milikmu sendiri untuk kamu tulis.":
    "Let's establish a healthy inner boundary: you respect your parents, but your life path and definition of success are yours alone to write.",

  "Diferensiasi Diri (Differentiation of Self) membangun otonomi psikologis yang matang.":
    "Differentiation of Self builds mature psychological autonomy.",

  "Aku mengerti sekarang. Aku nggak harus menjalani hidup orang lain demi membuktikan nilaiku.":
    "I understand now. I don't have to live someone else's life just to prove my worth.",

  "🤝 Kalimat Penenang Pulang ke Rumah (Compassionate Mantra)":
    "🤝 Homecoming Calming Mantra (Compassionate Mantra)",

  "Mari kita siapkan satu mantra saat membuka pintu rumah nanti sore: 'Aku pulang untuk beristirahat, nilaiku utuh dan aku aman.'":
    "Let's prepare a mantra when turning the doorknob this afternoon: 'I come home to rest; my worth is intact and I am safe.'",

  "Mantra somatis terarah memberikan perlindungan psikologis aktif saat memasuki lingkungan pemicu stres.":
    "Targeted somatic mantras provide active psychological defense when entering stressful environments.",

  "Akan kuingat kalimat itu pas putar kunci pintu nanti sore. Terima kasih banyak, Kak!":
    "I'll remember that line when turning the door key this afternoon. Thank you so much, Counselor!",

  // --- Seed 4: perf_kampus_skripsi ---
  "Tugas kelompokku kemarin dapat nilai 85 dan teman-temanku pada pesta senang. Tapi aku malah nggak bisa tidur semalaman, Kak. Rasanya andai aku begadang dan periksa lagi tiap komanya, pasti bisa dapat 100. Sekarang pas dosen minta revisi bab 2, aku malah menunda ngerjainnya berhari-hari karena takut hasilnya jelek lagi.":
    "My group project got a grade of 85 yesterday and my teammates were celebrating. But I couldn't sleep all night, Counselor. I felt that if I stayed up checking every comma, we could've gotten 100. Now when the professor asks for chapter 2 revisions, I keep procrastinating for days fearing a bad result.",

  "Duduk sangat tegak kaku, membawa binder tebal penuh catatan bertinta warna-warni yang sangat rapi, jemarinya mengetuk meja tegang.":
    "Sitting stiffly upright, holding a thick binder full of neat color-coded notes, fingers tapping nervously on the desk.",

  "Kalau aku nggak bisa bikin yang sempurna, mending nggak usah kukumpulin sekalian daripada bikin malu.":
    "If I can't make it 100% perfect, I'd rather not submit it at all than embarrass myself.",

  "🌱 Mengakui Beban Menuntut Sempurna (Empathic Reflection)":
    "🌱 Validating Perfectionist Burden (Empathic Reflection)",

  "Pasti melelahkan sekali ya hidup dengan tuntutan standar yang begitu tinggi, di mana nilai 85 yang bagus pun tetap terasa seperti kegagalan bagi batinmu.":
    "It must be exhausting living with such high demands, where even a good score of 85 still feels like a failure to your inner self.",

  "Validasi empatik terhadap beban perfeksionisme membantu klien merasa dipahami tanpa merasa dihakimi atas standarnya.":
    "Empathic validation of perfectionist burden helps the client feel understood without feeling judged for their high standards.",

  "Iya, Kak... teman-temanku bilang aku lebay, tapi di kepalaku rasanya beneran gagal total kalau cuma 85.":
    "Yes, Counselor... my friends say I'm dramatic, but in my head it really feels like a total failure if it's just 85.",

  "🔍 Memeriksa Definisi 'Gagal' (Cognitive Reappraisal)":
    "🔍 Examining the Definition of Failure (Cognitive Reappraisal)",

  "Secara objektif di dunia akademik, apakah nilai 85 itu digolongkan sebagai gagal? Dari mana standar 'harus selalu 100' itu pertama kali kamu tetapkan?":
    "Objectively in academia, is a score of 85 classified as a failure? Where did that 'must always be 100' standard first originate?",

  "Menantang distorsi All-or-Nothing / Dikotomi membuka kesadaran akan spektrum pencapaian yang sehat.":
    "Challenging All-or-Nothing distortions opens awareness of a healthy spectrum of achievement.",

  "85 itu sebenarnya dapat A- di kampusku... cuma egoku yang selalu nuntut 100 tanpa toleransi.":
    "85 actually gets an A- on my campus... it's just my ego demanding 100 without tolerance.",

  "🤝 Melepaskan Ketegangan Fisik (Progressive Relaxation)":
    "🤝 Releasing Physical Tension (Progressive Relaxation)",

  "Coba turunkan bahumu yang kaku itu 2 sentimeter ke bawah, sandarkan punggungmu ke sofa, dan hembuskan napas panjang bersama saya.":
    "Try lowering your stiff shoulders 2 centimeters down, lean your back against the sofa, and exhale deeply with me.",

  "Klien perfeksionis sering menahan ketegangan otot kronis di bahu dan leher. Relaksasi somatis menginduksi ketenangan fisik.":
    "Perfectionist clients often hold chronic muscle tension in shoulders and neck. Somatic relaxation induces physical calm.",

  "*Menurunkan bahu dan bersandar di sofa* ... Astaga, baru sadar bahuku tadi kencang banget kayak papan kayu.":
    "*Lowers shoulders and leans back on sofa* ... Goodness, I just realized my shoulders were stiff as a wooden board.",

  "Aku nggak bisa santai sedetik pun, Kak. Kalau aku nonton film 30 menit aja, suara di kepalaku langsung teriak: 'Harusnya kamu lagi revisi bab 2! Kamu pemalas banget!' Rasanya kalau aku istirahat, duniaku bakal runtuh dan aku bakal tertinggal selamanya.":
    "I can't relax for even a second, Counselor. If I watch a movie for 30 minutes, the voice in my head screams: 'You should be revising chapter 2! You lazy bum!' It feels like if I rest, my world will collapse and I'll fall behind forever.",

  "Mengusap keningnya berulang-ulang, napas terengah-engah menahan kejenuhan batin (burnout).":
    "Rubbing their forehead repeatedly, breathing heavily holding back inner burnout.",

  "Aku takut kalau berhenti sejenak, semua orang bakal melampaui aku dan menganggapku tidak kompeten.":
    "I fear that if I stop for a moment, everyone will surpass me and deem me incompetent.",

  "🌱 Mengidentifikasi Suara 'Kritikus Batin' (Inner Critic)":
    "🌱 Identifying the 'Inner Critic' Voice (Inner Critic)",

  "Suara di kepalamu terdengar sangat keras dan tidak memberi ampun. Menurutmu, apakah suara itu sahabat bijakmu, atau sekadar alarm ketakutan masa lalu?":
    "The voice in your head sounds loud and unforgiving. Do you think that voice is a wise friend, or simply a fear alarm from the past?",

  "Personifikasi 'Inner Critic' membantu klien mengambil jarak observasional (Metacognitive Awareness) dari kritik diri otomatisnya.":
    "Personifying the 'Inner Critic' helps the client gain metacognitive distance from automatic self-criticism.",

  "Itu suara ketakutanku, Kak. Waktu kecil kalau nilai rankingku turun, semua fasilitas belajarku disita.":
    "That's the voice of my fear, Counselor. When I was young, if my rank dropped, all my study privileges were confiscated.",

  "🔍 Menguji Paradoks Prokrastinasi (Paradox of Perfectionism)":
    "🔍 Testing the Perfectionism Paradox (Paradox of Perfectionism)",

  "Mari kita amati faktanya: apakah menuntut sempurna membuat tugas bab 2 selesai lebih cepat, atau justru membuatmu menunda dan semakin tertekan?":
    "Let's observe the facts: does demanding perfection get chapter 2 finished faster, or does it cause procrastination and deeper stress?",

  "Membongkar paradoks bahwa tuntutan sempurna adalah pemicu utama penundaan (Procrastination by Perfectionism).":
    "Exposing the paradox that demanding perfection is the primary driver of procrastination.",

  "Malah bikin tertunda seminggu penuh, Kak... andai aku kerjain seadanya kemarin pasti udah beres sekarang.":
    "It actually delayed it for a whole week, Counselor... if I had just done it good enough yesterday it'd be done now.",

  "🤝 Konsep 'Cukup Bagus di 85%' (Good Enough Standard)":
    "🤝 The 'Good Enough at 85%' Concept (Good Enough Standard)",

  "Bagaimana kalau kita tetapkan target baru: 'Selesai tepat waktu di angka 85% jauh lebih berharga daripada skripsi 100% sempurna tapi tidak pernah dikumpulkan'?":
    "What if we set a new target: 'Finished on time at 85% is far more valuable than a 100% perfect thesis that is never submitted'?",

  "Pemberian izin target 'Good Enough' melonggarkan rigiditas kognitif dan memicu kembalinya daya produktivitas adaptif.":
    "Granting permission for a 'Good Enough' target eases cognitive rigidity and restores adaptive productivity.",

  "Konsep 85% itu rasanya kayak ngasih oksigen baru ke otakku. Aku nggak harus bikin mahakarya tiap paragraf.":
    "The 85% concept feels like breathing new oxygen into my brain. I don't have to write a masterpiece in every paragraph.",

  "🤝 Metode Pomodoro 25 Menit (Micro-Commitment)":
    "🤝 25-Minute Pomodoro Technique (Micro-Commitment)",

  "Mari kita sepakati aksi nyata sore ini: nyalakan timer 25 menit untuk menulis revisi tanpa edit, lalu nikmati 5 menit istirahat tanpa rasa bersalah.":
    "Let's agree on a practical action this afternoon: set a 25-minute timer to write without editing, then enjoy a guilt-free 5-minute break.",

  "Struktur Pomodoro terukur memecah tugas besar menjadi langkah mikro yang aman dari jebakan evaluasi berlebihan.":
    "Structured Pomodoro breaks large tasks into micro-steps safe from over-evaluation traps.",

  "Siap! 25 menit fokus ngetik, 5 menit ngopi santai. Aku bakal langsung lakuin nanti di perpus. Makasih ya, Kak!":
    "Ready! 25 minutes focused typing, 5 minutes coffee break. I'll do it right away at the library. Thank you, Counselor!",

  // --- Seed 5: perf_magang_imposter ---
  "Kemarin waktu presentasi mingguan magang, atasanku muji hasil laporan analisaku di depan seluruh divisi. Bukannya senang, Kak, aku malah gemetar ketakutan... Aku takut besok-besok mereka sadar kalau aku sebenarnya cuma beruntung dan aslinya nggak sepintar itu.":
    "Yesterday during the weekly internship presentation, my supervisor praised my analytical report in front of the whole division. Instead of being happy, Counselor, I was trembling in fear... I'm afraid tomorrow they'll realize I was just lucky and not actually that smart.",

  "Bicara dengan volume pelan, tatapan waspada, kedua tangan saling menggenggam erat di pangkuan.":
    "Speaking in a quiet tone, guarded gaze, holding hands tightly together in their lap.",

  "Aku merasa seperti penipu yang tinggal menunggu waktu buat ketahuan boroknya.":
    "I feel like an imposter just waiting for the moment to be exposed.",

  "🌱 Validasi Ketakutan Imposter (Safe Identification)":
    "🌱 Validating Imposter Fear (Safe Identification)",

  "Sensasi merasa seperti 'penipu' itu pasti sangat menakutkan dan menguras energi. Sangat banyak profesional hebat yang merasakan hal serupa di awal karier mereka.":
    "Feeling like an 'imposter' is indeed frightening and draining. So many brilliant professionals feel the exact same way early in their careers.",

  "Normalisasi fenomena imposter meredakan isolasi emosional yang dialami klien berprestasi tinggi.":
    "Normalizing imposter feelings alleviates emotional isolation in high-achieving clients.",

  "Beneran ada orang lain yang ngerasa kayak gitu juga, Kak? Aku kira cuma aku yang selemah ini.":
    "Do other people really feel like that too, Counselor? I thought I was the only weak one.",

  "🔍 Mengaudit Bukti Kerja Keras (Competence Audit)":
    "🔍 Auditing Evidence of Hard Work (Competence Audit)",

  "Berapa jam riset dan data yang kamu kumpulkan untuk membuat laporan itu? Apakah semua data grafik yang dipuji atasanmu itu muncul begitu saja karena sulap?":
    "How many hours of research and data did you gather to create that report? Did all those chart figures praised by your boss appear magically?",

  "Menghubungkan hasil positif dengan usaha nyata memutus bias atribusi eksternal.":
    "Linking positive outcomes to real effort breaks external attribution bias.",

  "Aku riset sampai 3 hari, olah ribuan baris data... iya sih, bukan karena sulap atau kebetulan.":
    "I researched for 3 days, processed thousands of data rows... yeah, it wasn't magic or coincidence.",

  "🤝 Latihan Postur Berdiri Tegak (Embodied Grounding)":
    "🤝 Upright Posture Grounding (Embodied Grounding)",

  "Coba letakkan kedua tanganmu di paha, tegakkan tulang belakangmu dengan rileks, dan rasakan kekuatan ragamu yang telah berjuang sejauh ini.":
    "Try placing both hands on your thighs, straighten your spine relaxed, and feel the physical strength of your body that fought this far.",

  "Postur tubuh terbuka dan grounded memodulasi neurokimia ketenangan dan rasa percaya diri.":
    "Open grounded posture modulates neurochemistry for calm and self-confidence.",

  "*Menegakkan punggung dan bernapas dalam* ... Terasa lebih mantap dan nggak loyo lagi, Kak.":
    "*Straightens back and takes a deep breath* ... Feels much steadier and no longer sluggish, Counselor.",

  "Aku selalu periksa email kerjaan sampai 10 kali sebelum klik tombol kirim. Satu salah ketik titik koma aja bisa bikin aku panik seharian dan mikir 'pasti besok aku langsung dipecat'.":
    "I always check work emails up to 10 times before clicking send. A single typo or comma error panics me all day thinking 'I'll get fired tomorrow'.",

  "Menghela napas panjang kelelahan, memegang pelipisnya yang berdenyut.":
    "Sighing deeply with fatigue, touching throbbing temples.",

  "Kenapa aku nggak pernah bisa merasa aman dengan pekerjaanku sendiri?":
    "Why can I never feel safe with my own work performance?",

  "🌱 Menggali Ketakutan Ditolak (Rejection Fear)":
    "🌱 Uncovering Fear of Rejection (Rejection Fear)",

  "Tampaknya ketakutan akan salah ketik itu bukan sekadar soal email, melainkan ketakutan mendalam akan penolakan dan kehilangan pengakuan ya?":
    "It seems the fear of a typo isn't just about the email, but a deep fear of rejection and losing recognition, right?",

  "Menghubungkan perilaku kompulsi email dengan ketakutan inti (Core Fear) di baliknya.":
    "Connecting email compulsion behavior to the underlying core fear.",

  "Iya, Kak... aku takut banget dianggap nggak profesional atau diabaikan.":
    "Yes, Counselor... I'm terrified of being seen as unprofessional or ignored.",

  "🔍 Menguji Konsekuensi Riil Typo (Catastrophizing Test)":
    "🔍 Testing Real Consequences of Typos (Catastrophizing Test)",

  "Pernahkah kamu melihat atasanmu atau manajer senior melakukan typo kecil di email? Apakah mereka langsung dipecat hari itu juga?":
    "Have you ever seen your supervisor or senior manager make a small typo in an email? Were they fired that very day?",

  "Uji katastropik menyadarkan klien bahwa kesalahan minor adalah bagian normal dinamika kerja manusiawi.":
    "Decatastrophizing shows the client that minor errors are a normal part of human work dynamics.",

  "Sering banget bosku typo di WhatsApp atau email... dan nggak ada yang mempermasalahkan sama sekali.":
    "My boss makes typos in WhatsApp or emails all the time... and nobody makes a big deal out of it.",

  "🤝 Aturan 'Maksimal 2 Kali Periksa' (Exposure Rule)":
    "🤝 'Max 2 Checks' Rule (Exposure Rule)",

  "Mari kita sepakati latihan desensitisasi: untuk email harian biasa, batasi pemeriksaan maksimal 2 kali saja sebelum tombol kirim ditekan.":
    "Let's agree on a desensitization exercise: for regular daily emails, limit checks to maximum 2 times before clicking send.",

  "Teknik Exposure with Response Prevention melatih otak mentoleransi sedikit ketidakpastian tanpa panik.":
    "Exposure with Response Prevention trains the brain to tolerate minor uncertainty without panic.",

  "Agak menantang sih, tapi aku mau coba! Dua kali periksa cukup, lalu klik kirim.":
    "A bit challenging, but I want to try! Check twice, then hit send.",

  "🤝 Komitmen Welas Asih Mingguan (Self-Kindness Pact)":
    "🤝 Weekly Self-Compassion Commitment (Self-Kindness Pact)",

  "Mari buat kesepakatan: jika kamu melakukan kesalahan kecil minggu ini, perlakukan dirimu seperti kamu menyemangati rekan magang terbaikmu.":
    "Let's make a pact: if you make a small mistake this week, treat yourself as you would encourage your best intern peer.",

  "Transfer perspektif welas asih diri menggantikan kritik kejam internal.":
    "Self-compassion perspective transfer replaces cruel internal criticism.",

  "Siap, Kak! Aku bakal jadi sahabat terbaik untuk diriku sendiri mulai hari ini. Terima kasih!":
    "Ready, Counselor! I'll be my own best friend starting today. Thank you!",

  // --- Seed 6: def_sekolah_tugas_kelompok ---
  "Aku ke sini malas sebenarnya, cuma disuruh wali kelas karena dibilang bikin ribut di kelompok. Padahal teman-temanku aja yang kerjanya lelet dan numpang nama! Pas aku tegur baik-baik malah mereka yang ngadu ke guru dan bilang aku tukang ngegas!":
    "I was reluctant coming here, but the homeroom teacher sent me saying I caused trouble in group work. But my teammates were just slow and freeloading! When I confronted them nicely, they reported me to the teacher calling me aggressive!",

  "Menyilangkan tangan erat di dada, nada bicara tinggi menantang, tatapan mata tajam mencari konfirmasi apakah Anda akan memusuhinya.":
    "Crossing arms tightly across chest, challenging loud tone, sharp gaze checking if you'll side against them.",

  "Pasti psikolog ini juga bakal belain mereka dan nyalahin aku kayak guru-guru lain.":
    "This psychologist will probably side with them and blame me just like the other teachers.",

  "🌱 Validasi Rasa Frustrasi (Non-Judgmental Alignment)":
    "🌱 Validating Frustration (Non-Judgmental Alignment)",

  "Pasti menyebalkan dan melelahkan sekali saat kamu sudah berjuang keras mengerjakan tugas, tapi justru kamu yang disalahkan dan dicap negatif.":
    "It must be frustrating and exhausting when you worked hard on the task, but end up blamed and labeled negatively.",

  "Menolak menjadi hakim dan memvalidasi keadilan usahanya langsung melucuti rasa terancam pada klien defensif.":
    "Refusing to act as judge and validating effort fairness immediately disarms threat alarms in defensive clients.",

  "Iya bener kan, Kak! Akhirnya ada yang paham kalau aku itu bukan sengaja mau cari ribut!":
    "Right?! Finally someone understands I'm not intentionally looking for trouble!",

  "🔍 Membedakan Niat vs Dampak Komunikasi (Intent vs Impact)":
    "🔍 Differentiating Communication Intent vs Impact (Intent vs Impact)",

  "Tujuanmu menegur mereka sebenarnya sangat baik agar tugas selesai. Menurutmu, mengapa pesan baikmu itu justru ditangkap sebagai kemarahan oleh mereka?":
    "Your intent in confronting them was good—to get the work done. Why do you think your good intent was perceived as anger by them?",

  "Mengajak mengevaluasi dampak gaya komunikasi tanpa menyalahkan niat baik di baliknya.":
    "Inviting evaluation of communication impact without blaming the underlying good intention.",

  "Mungkin nada bicaraku kemarin agak tinggi karena aku udah capek banget begadang ngerjain bagian mereka.":
    "Maybe my tone was a bit high yesterday because I was exhausted staying up doing their part.",

  "🤝 Menurunkan Ketegangan Bahu (De-escalation Posture)":
    "🤝 Relaxing Shoulder Tension (De-escalation Posture)",

  "Di ruangan ini tidak ada yang sedang menuduhmu. Yuk letakkan tanganmu santai di atas lutut dan kita hembuskan napas tegang tadi bersama-sama.":
    "Nobody in this room is accusing you. Let me invite you to rest your hands on your knees and exhale that tension together.",

  "Mengajak merelaksasikan tangan yang menyilang memecah postur tubuh defensif secara neurobiologis.":
    "Inviting uncrossing of arms neurobiologically breaks defensive physical posture.",

  "*Membuka lipatan tangan di dada dan menghela napas* ... Huft... rasanya capek juga harus terus pasang muka galak.":
    "*Uncrosses arms and exhales* ... Phew... it's exhausting always having to put up a tough face.",

  "Dari dulu kalau aku lembek atau diam, orang-orang bakal seenaknya nginjak atau manfaatin aku, Kak. Dulu tugas prakaryaku pernah diakui temanku sendiri dan aku cuma bisa nangis. Makanya sekarang aku mending pasang duri duluan biar mereka nggak berani macam-macam!":
    "Ever since I was young, if I was soft or quiet, people walked all over me or used me, Counselor. My craft project was once stolen by a classmate and I just cried. That's why now I put up thorns first so nobody messes with me!",

  "Suaranya sedikit bergetar emosional saat mengingat kejadian masa lalu, raut wajahnya mulai melunak dari galak menjadi sedih.":
    "Voice trembling with emotion remembering past trauma, facial expression softening from fierce to sad.",

  "Duri ini satu-satunya cara biar aku nggak disakiti lagi.":
    "These thorns are the only way to keep me from getting hurt again.",

  "🌱 Mengapresiasi Fungsi 'Duri Pelindung' (Protective Shield)":
    "🌱 Appreciating the 'Protective Thorns' Function (Protective Shield)",

  "Duri yang kamu pasang itu dulunya adalah penyelamatmu agar kamu tidak terluka lagi ya. Betapa berjasanya caramu melindungi dirimu di masa lalu.":
    "The thorns you put up were your savior back then to prevent further hurt. How valuable your self-protection was in the past.",

  "Menghormati fungsi proteksi masa lalu (Protective Part) melahirkan rasa aman emosional yang mendalam.":
    "Respecting past protective parts fosters deep emotional security.",

  "Iya, Kak... kalau aku nggak galak, nggak ada yang bakal belain aku.":
    "Yes, Counselor... if I'm not tough, nobody will stand up for me.",

  "🔍 Menilai Efektivitas Tameng Saat Ini (Shield Assessment)":
    "🔍 Assessing Current Shield Efficacy (Shield Assessment)",

  "Duri itu melindungimu dari orang jahat, tapi apakah duri yang sama juga membuat teman-teman baik yang ingin dekat jadi takut dan menjauh?":
    "Those thorns protected you from bad people, but do the same thorns make good friends who want to get close feel scared and back away?",

  "Membantu klien menyadari efek samping isolasi sosial dari respon defensif yang berlebihan.":
    "Helping the client realize social isolation side-effects from over-defensive responses.",

  "Bener juga ya... teman yang sebenarnya berniat baik pun jadi ikutan segan dan takut ngajak aku ngobrol.":
    "That's true... even well-meaning peers end up hesitant and scared to talk to me.",

  "🤝 Latihan Komunikasi Asertif Tenang (Assertive Communication)":
    "🤝 Calm Assertive Communication Practice (Assertive Communication)",

  "Bagaimana kalau kita coba teknik baru: kamu tetap tegas menjaga hakmu, tapi menggunakan nada tenang 'Aku-Pesan' (I-Message) tanpa harus meledak?":
    "What if we try a new technique: you stay firm on your rights, but use a calm 'I-Message' tone without exploding?",

  "Pelatihan asertivitas (DEAR MAN dari DBT) memberikan instrumen praktis untuk tetap tegas tanpa memicu konflik.":
    "Assertiveness training (DBT DEAR MAN) provides practical tools to stay firm without triggering conflict.",

  "Bisa diajarin caranya, Kak? Aku pengen tetap tegas tapi nggak dicap pemarah lagi.":
    "Can you teach me how, Counselor? I want to stay firm without being labeled short-tempered.",

  "🤝 Kalimat Pembuka di Kelas Besok (Action Script)":
    "🤝 Tomorrow's Class Opener Script (Action Script)",

  "Mari kita sepakati kalimat pembuka besok ke teman kelompokmu: 'Guys, yuk kita bagi tugas sesuai deadline biar kita semua dapat nilai bagus bareng.'":
    "Let's agree on tomorrow's opening script to your group: 'Guys, let's divide tasks according to deadline so we all get good grades together.'",

  "Scripting dialog yang konkret memberikan panduan perilaku nyata yang siap dieksekusi di sekolah.":
    "Concrete dialogue scripting provides actionable behavior guidelines for school.",

  "Keren kalimatnya! Aku bakal sampaikan itu besok pas jam istirahat. Makasih banyak ya, Kak!":
    "Cool phrasing! I'll say that tomorrow during break time. Thank you so much, Counselor!",

  // --- Scientific Mechanism Explanations & Theory Connections ---
  "Kecemasan saat ditunjuk di depan kelas memicu aktivasi sistem saraf simpatis (Fight or Flight) akibat amigdala yang menafsirkan tatapan teman sekelas sebagai ancaman penilaian sosial negatif (Catastrophizing). Melalui validasi empatik dan latihan napas berirama (Co-regulation), saraf vagus ventral teraktivasi sehingga detak jantung menurun dan korteks prefrontal dapat kembali berpikir logis.":
    "Anxiety when called upon in front of the class triggers sympathetic nervous system activation (Fight or Flight) due to the amygdala interpreting classmates' gazes as a threat of negative social evaluation (Catastrophizing). Through empathetic validation and rhythmic breathing exercises (Co-regulation), the ventral vagus nerve is activated, lowering heart rate and allowing the prefrontal cortex to regain logical thinking.",

  "Distorsi kognitif Mind Reading (menebak pikiran orang lain secara negatif) dan Catastrophizing membuat klien menafsirkan keterlambatan pesan sebagai tanda penolakan sosial atau ancaman ditinggalkan (Abandonment Schema). Restrukturisasi kognitif membantu memisahkan ambiguitas stimulus dari narasi kecemasan internal.":
    "Cognitive distortions of Mind Reading (negatively guessing others' thoughts) and Catastrophizing lead the client to interpret delayed messages as a sign of social rejection or abandonment threat (Abandonment Schema). Cognitive restructuring helps separate stimulus ambiguity from internal anxiety narratives.",

  "Penerimaan bersyarat di keluarga menanamkan \"Conditions of Worth\" di mana klien merasa hanya berharga jika berhasil membanggakan orang lain. Menghidupkan Unconditional Positive Regard dan Self-Compassion memulihkan harga diri intrinsik klien.":
    "Conditional acceptance within the family instills \"Conditions of Worth\" where the client feels valuable only when pleasing others. Activating Unconditional Positive Regard and Self-Compassion restores the client's intrinsic self-worth.",

  "Perfeksionisme klinis memicu distorsi All-or-Nothing (\"Jika tidak 100% sempurna, berarti gagal total\") yang berujung pada Prokrastinasi akibat ketakutan menghadapi evaluasi negatif (Fear of Failure). Pendekatan \"Good Enough Standard (85%)\" dan welas asih diri memutus siklus kelumpuhan analisis (Analysis Paralysis).":
    "Clinical perfectionism triggers All-or-Nothing distortion (\"If it's not 100% perfect, it's a total failure\"), leading to Procrastination driven by Fear of Failure. The \"Good Enough Standard (85%)\" approach and self-compassion break the cycle of analysis paralysis.",

  "Klien dengan Imposter Syndrome mengatribusikan kesuksesan pada faktor eksternal (keberuntungan, bantuan orang lain) dan kegagalan pada faktor internal (ketidakmampuan pribadi). Mengajak mengumpulkan bukti kompetensi empiris memulihkan atribusi kausal yang sehat.":
    "Clients with Imposter Syndrome attribute success to external factors (luck, help from others) and failure to internal factors (personal incompetence). Encouraging the gathering of empirical competency evidence restores healthy causal attributions.",

  "Perilaku defensif dan kemarahan sering kali merupakan emosi sekunder (Secondary Emotion) yang berfungsi melindungi emosi primer yang rapuh (Primary Emotion) seperti rasa sakit hati karena diabaikan atau takut dimanfaatkan. Validasi tanpa konfrontasi memicu penurunan defensif alami.":
    "Defensive behavior and anger are often secondary emotions that protect fragile primary emotions, such as hurt from being ignored or fear of being taken advantage of. Validation without confrontation triggers a natural decrease in defensiveness.",

  "Kebiasaan Expressive Suppression (memendam dan menekan emosi) serta pelarian ke dunia virtual merupakan strategi defensif attachment menghindari rasa sakit penolakan. Menggunakan metafora bertahap (Titrated Exposure) membantu membuka gerbang komunikasi tanpa memicu overwhelm.":
    "The habit of Expressive Suppression (bottling up and suppressing emotions) and escaping into virtual worlds are defensive attachment strategies to avoid the pain of rejection. Using gradual metaphors (Titrated Exposure) helps open communication channels without triggering overwhelm.",

  "Respon cemas berlebihan saat ditunjuk di kelas atau menunggu chat merupakan aktivasi sistem saraf simpatis (Fight or Flight) akibat amigdala yang menafsirkan rasa malu sosial sebagai ancaman fisik. Teknik Grounding somatis (napas lambat dan orientasi fisik) mengaktifkan saraf vagus (parasimpatis) untuk menenangkan detak jantung, sementara validasi kognitif memutus siklus overthinking (rumination).":
    "Excessive anxiety response when called upon in class or waiting for a text is an activation of the sympathetic nervous system (Fight or Flight) due to the amygdala interpreting social embarrassment as a physical threat. Somatic Grounding techniques (slow breathing and physical orientation) activate the vagus nerve (parasympathetic) to calm the heart rate, while cognitive validation breaks the cycle of overthinking (rumination).",

  "Perfeksionisme maladaptif berakar pada keyakinan irasional bahwa harga diri seseorang (self-worth) setara dengan performa tanpa cela (flawless achievement). Klien terjebak distorsi 'All-or-Nothing' di mana nilai 85 dianggap sebagai kegagalan total. Pendekatan Self-Compassion dan 'Good-Enough Manifesto' memisahkan identitas diri dari hasil pekerjaan, menurunkan stres tanpa mengorbankan kualitas.":
    "Maladaptive perfectionism is rooted in the irrational belief that one's self-worth equals flawless achievement. The client is trapped in 'All-or-Nothing' distortion where a score of 85 is viewed as a total failure. The Self-Compassion approach and 'Good-Enough Manifesto' separate personal identity from work output, reducing stress without sacrificing quality.",

  "Sikap defensif dan mudah tersinggung merupakan mekanisme pertahanan ego (proyeksi dan reaktivitas) untuk menutupi rasa takut dianggap tidak kompeten atau ditolak. Ketika terapis tidak membalas dengan penghakiman melainkan memberikan Unconditional Positive Regard (penerimaan tanpa syarat), rasa terancam pada amygdala menurun drastis sehingga klien bersedia membuka diri.":
    "Defensive attitudes and irritability are ego defense mechanisms (projection and reactivity) to cover up the fear of being seen as incompetent or rejected. When the therapist responds without judgment and provides Unconditional Positive Regard, the threat level in the amygdala drops drastically, allowing the client to open up.",

  "Menghindar dan menekan emosi (expressive suppression) adalah strategi koping untuk melindungi diri dari luka penolakan relasional di masa lampau. Pendekatan hangat tanpa desakan waktu (non-demanding safe space) secara bertahap memulihkan Secure Attachment dan mengurangi beban anhedonia.":
    "Avoidance and expressive suppression are coping strategies to protect oneself from past relational rejection wounds. A warm approach without time pressure (non-demanding safe space) gradually restores Secure Attachment and reduces the burden of anhedonia.",

  // --- Diagnostic Insights & Achievements ---
  "Pengurai Kecemasan Akut": "Acute Anxiety Disentangler",
  "Navigator Relasi Sosial": "Social Relation Navigator",
  "Pemulih Harga Diri Intrinsik": "Restorer of Intrinsic Self-Worth",
  "Master Restrukturisasi Kognitif": "Master of Cognitive Restructuring",
  "Arsitek Kepercayaan Diri": "Architect of Self-Confidence",
  "Penjelajah Emosi Primer": "Explorer of Primary Emotions",
  "Pembangun Ruang Aman Relasional": "Builder of Relational Safe Space",

  "Intervensi berhasil menstabilkan regulasi emosi spontan dan memutus distorsi catastrophizing.":
    "Intervention successfully stabilized spontaneous emotional regulation and broke catastrophizing distortions.",
  "Konseling berhasil mengurai asumsi kecemasan sosial dan penolakan impulsif.":
    "Counseling successfully unraveled social anxiety assumptions and impulsive rejection fear.",
  "Sesi berhasil meredakan tekanan ekspektasi eksternal dan memvalidasi emosi mendalam klien.":
    "Session successfully relieved external expectation pressure and validated the client's deep emotions.",
  "Psikolog berhasil memutus siklus kelumpuhan analisis dan membangun standar realistic achievement.":
    "Psychologist successfully broke the cycle of analysis paralysis and established realistic achievement standards.",
  "Intervensi berhasil menantang atribusi keberuntungan dan menanamkan pengakuan atas kompetensi pribadi.":
    "Intervention successfully challenged luck attributions and instilled recognition of personal competence.",
  "Pendekatan non-konfrontatif berhasil menembus benteng defensif dan menyentuh emosi primer.":
    "Non-confrontational approach successfully bypassed defensive walls and accessed primary emotions.",
  "Sesi berhasil menjembatani rasa takut akan keterbukaan relasional dengan melonggarkan pertahanan penghindaran.":
    "Session successfully bridged the fear of relational vulnerability by softening avoidance defenses.",

  // --- Practical Recommendations ---
  "Gunakan latihan relaksasi pernapasan ritmis 4-7-8 sebelum menghadapi situasi ujian.":
    "Use 4-7-8 rhythmic breathing relaxation exercises before facing exam situations.",
  "Terapkan jurnal restrukturisasi pikiran negatif secara berkala.":
    "Apply regular negative thought restructuring journal practice.",
  "Lakukan konseling lanjutan untuk memperkuat self-efficacy dalam interaksi kelas.":
    "Conduct follow-up counseling to strengthen self-efficacy in classroom interactions.",

  "Lakukan pengujian realitas (reality testing) terhadap persepsi keterlambatan pesan.":
    "Conduct reality testing on the perception of message response delays.",
  "Latih komunikasi asertif untuk mengungkapkan perasaan tanpa prasangka.":
    "Practice assertive communication to express feelings without prejudice.",
  "Gunakan teknik desensitisasi bertahap untuk mengurangi kecemasan relasional.":
    "Use systematic desensitization techniques to reduce relational anxiety.",

  "Fasilitasi dialog eksplorasi minat pribadi yang terpisah dari ekspektasi keluarga.":
    "Facilitate exploration dialogue of personal interests separate from family expectations.",
  "Gunakan teknik penulisan reflektif untuk memproses perasaan bersalah.":
    "Use reflective writing techniques to process feelings of guilt.",
  "Pertimbangkan sesi mediasi keluarga secara suportif bila diperlukan.":
    "Consider supportive family mediation sessions if necessary.",

  "Terapkan teknik micro-stepping (membagi penulisan skripsi menjadi bagian 15 menit).":
    "Apply micro-stepping techniques (breaking thesis writing into 15-minute chunks).",
  "Beri izin pada diri sendiri untuk membuat draf awal yang tidak sempurna (Good-Enough Draft).":
    "Give self-permission to create imperfect first drafts (Good-Enough Draft).",
  "Jadwalkan sesi bimbingan dengan fokus pada progres kecil yang telah dicapai.":
    "Schedule supervision sessions focusing on small incremental progress made.",

  "Buat \"Bukti Kompetensi\" tertulis berisi pencapaian objektif dan umpan balik positif.":
    "Create a written \"Competency Evidence\" log of objective achievements and positive feedback.",
  "Latih penghentian pikiran (thought stopping) saat suara \"imposter\" muncul.":
    "Practice thought-stopping when the \"imposter\" inner voice arises.",
  "Diskusikan ekspektasi tempat kerja bersama mentor secara terbuka.":
    "Discuss workplace expectations openly with a mentor.",

  "Latih pengenalan tanda fisik kemarahan sebelum terjadi ketegangan emosional.":
    "Practice recognizing physical anger signs before emotional escalation occurs.",
  "Gunakan pesan \"Saya\" (I-message) untuk menyampaikan kekecewaan secara sehat.":
    "Use \"I-statements\" (I-messages) to express disappointment constructively.",
  "Bangun ruang aman dalam kelompok melalui pembagian peran yang transparan.":
    "Build a safe space within the group through transparent role distribution.",

  "Gunakan metafora permainan untuk mengeksplorasi perasaan secara aman.":
    "Use gaming metaphors to explore emotions in a safe setting.",
  "Tetapkan batas waktu penggunaan gim sebagai strategi koping sementara yang sehat.":
    "Establish time boundaries for gaming as a healthy temporary coping mechanism.",
  "Tingkatkan interaksi tatap muka secara bertahap dalam lingkungan rendah tekanan.":
    "Gradually increase face-to-face interactions in low-pressure environments.",

  // --- Framework Titles ---
  "Cognitive Restructuring & Grounding Somatis": "Cognitive Restructuring & Somatic Grounding",
  "Cognitive Restructuring & Self-Compassion": "Cognitive Restructuring & Self-Compassion",
  "Unconditional Positive Regard & Akses Emosi Primer": "Unconditional Positive Regard & Primary Emotion Access",
  "Titrated Exposure & Safe Relational Space": "Titrated Exposure & Safe Relational Space",

  // --- Follow-Up Client Phone Chat Messages ---
  "Halo Kak Konselor! Maaf mengganggu waktunya... Saya mau kasih kabar, tadi pagi saat mau mulai presentasi, saya mempraktikkan teknik pernapasan 4-7-8 yang Kakak ajarkan. Dada saya yang biasanya berdebar kencang sekarang jauh lebih terkendali. Dosen penguji juga mengapresiasi cara penyampaian saya. Terima kasih banyak ya Kak!":
    "Hello Counselor! Sorry to bother you... I wanted to share an update. This morning before my presentation, I practiced the 4-7-8 breathing technique you taught me. My chest, which usually pounds fast, is now much more controlled. The examiner also appreciated my presentation. Thank you so much, Counselor!",
  "Halo Kak... Saya baru saja mencoba mengerjakan tugas kelompok. Kadang rasa cemasnya masih muncul saat ada yang tidak sependapat, tapi saya ingat catatan sesi kemarin untuk tidak langsung panik. Saya akan coba terus ya Kak.":
    "Hello Counselor... I just tried working on a group assignment. Sometimes the anxiety still comes up when someone disagrees, but I remembered our session notes not to panic right away. I will keep trying, Counselor.",
  "Apresiasi & Validasi Kemajuan": "Appreciate & Validate Progress",
  "Luar biasa! Kemajuan kecil ini adalah bukti ketahanan mentalmu. Ingat bahwa rasa cemas adalah hal wajar, yang terpenting adalah responmu.":
    "Awesome! This small progress proves your mental resilience. Remember that feeling anxious is normal; what matters most is your response.",
  "Terima kasih banyak Kak! Kata-kata Kakak sangat menenangkan saya. Sampai jumpa di sesi berikutnya ya!":
    "Thank you so much Counselor! Your words are so comforting. See you at the next session!",
  "Dorongan Konsistensi Teknik": "Encourage Consistency of Technique",
  "Bagus sekali! Tetap jadwalkan latihan pernapasan ini secara rutin 5 menit setiap pagi agar menjadi refleks alami.":
    "Great job! Keep scheduling this 5-minute breathing practice every morning so it becomes a natural reflex.",
  "Siap Kak! Sudah saya pasang pengingat alarm di HP. Terima kasih banyak bimbingannya!":
    "Will do Counselor! I set an alarm reminder on my phone. Thank you so much for the guidance!",

  "Selamat sore Kak! Saya mau cerita, tadi saya berhasil mengumpulkan draf proposal meskipun formatnya belum \"100% sempurna\" menurut standar lama saya. Rasanya aneh tapi melegakan sekali tidak harus begadang sampai jam 3 pagi lagi. Terima kasih sudah membuka perspektif saya tentang prinsip \"Cukup Baik\" (Good Enough)!":
    "Good afternoon Counselor! I wanted to share that I successfully submitted my proposal draft today even though it wasn't \"100% perfect\" by my old standards. It feels strange yet so relieving not having to stay up until 3 AM anymore. Thank you for broadening my perspective on the \"Good Enough\" principle!",
  "Halo Kak. Hari ini saya sempat merasa bersalah saat ada satu revisi kecil dari atasan. Tapi saya coba tahan dorongan untuk membongkar seluruh proyek dari awal dan fokus menyelesaikan poin yang diminta saja.":
    "Hello Counselor. Today I briefly felt guilty when there was a minor revision from my manager. But I managed to hold back the urge to rewrite the whole project from scratch and focused only on resolving the requested points.",
  "Kuatkan Mindset \"Good Enough\"": "Reinforce \"Good Enough\" Mindset",
  "Pencapaian hebat! Menerima ketidaksempurnaan adalah keberanian terbesar seorang perfeksionis. Kamu sudah menyelamatkan energimu.":
    "Great achievement! Accepting imperfection is the greatest courage of a perfectionist. You saved your energy.",
  "Betul sekali Kak... Rasanya beban di pundak saya berkurang drastis hari ini. Makasih ya Kak!":
    "So true Counselor... The weight on my shoulders feels drastically lighter today. Thank you!",
  "Apresiasi Self-Compassion": "Appreciate Self-Compassion",
  "Hebat, kamu sudah mulai belajar menyayangi dirimu sendiri. Terus rayakan kemajuan proses, bukan hanya hasil akhir.":
    "Wonderful, you are learning to treat yourself with kindness. Keep celebrating process progress, not just the final result.",
  "Iya Kak, saya mulai belajar tidak terlalu keras pada diri sendiri. Sangat bersyukur bisa konseling kemarin.":
    "Yes Counselor, I am learning not to be too hard on myself. So grateful for yesterday's counseling.",

  "Halo Kak Konselor. Awalnya saya sempat merasa defensif dan ragu waktu pertama datang ke klinik. Tapi setelah saya renungkan di rumah, saran Kakak untuk mendengarkan tanpa langsung menyanggah ternyata berhasil memperbaiki obrolan dengan rekan kerja saya. Terima kasih sudah sabar menghadapi saya kemarin.":
    "Hello Counselor. At first I felt defensive and hesitant when I came to the clinic. But after reflecting at home, your advice to listen without immediately rebutting helped improve conversations with my colleagues. Thank you for being patient with me yesterday.",
  "Halo Kak. Tadi ada situasi yang memicu emosi saya di kantor. Saya hampir membentak, tapi saya tahan dan minum air dulu seperti yang kita bicarakan. Masih sulit, tapi saya sedang membiasakannya.":
    "Hello Counselor. There was a triggering situation at work today. I almost yelled, but I paused and drank some water first like we discussed. It's still hard, but I'm getting used to it.",
  "Hargai Keterbukaan & Kerentanan": "Value Openness & Vulnerability",
  "Terima kasih atas kejujuranmu. Dibutuhkan kedewasaan besar untuk berani menurunkan pertahanan diri dan mencoba cara baru.":
    "Thank you for your honesty. It takes immense maturity to lower your defense walls and try a new way.",
  "Iya Kak, saya sadar defensif cuma bikin saya lelah sendiri. Terima kasih sudah tidak menghakimi saya.":
    "Yes Counselor, I realized defensiveness only leaves me exhausted. Thank you for not judging me.",
  "Validasi Emosi & Refleksi": "Emotion Validation & Reflection",
  "Menahan reaksi pertama adalah langkah awal yang sangat berharga. Terus latih jeda sejenak sebelum merespon situasi sulit.":
    "Holding back your initial reaction is a priceless first step. Keep practicing that pause before responding to tough situations.",
  "Siap Kak. Jeda 5 detik kemarin benar-benar menyelamatkan hubungan kerja saya. Makasih banyak!":
    "Will do Counselor. That 5-second pause literally saved my working relationship yesterday. Thanks a lot!",

  "Halo Kak... Kemarin setelah sesi, akhirnya saya memberanikan diri menelepon keluarga untuk membicarakan hal yang selama ini saya hindari. Ternyata respon mereka tidak seburuk yang saya bayangkan di kepala. Rasanya plong sekali akhirnya keluar dari persembunyian.":
    "Hello Counselor... Yesterday after our session, I finally plucked up the courage to call my family about what I had been avoiding. Turns out their reaction wasn't as bad as I pictured in my head. It feels like a huge relief to step out of hiding.",
  "Halo Kak. Saya mulai mencatat hal-hal yang membuat saya ingin menghindar di buku catatan kecil. Setidaknya sekarang saya tidak langsung kabur atau scrolling medsos seharian saat ada masalah.":
    "Hello Counselor. I started writing down things that make me want to avoid in a small notebook. At least now I don't immediately run away or scroll social media all day when a problem pops up.",
  "Puji Keberanian Konfrontasi Sehat": "Praise Healthy Confrontation Courage",
  "Langkah yang sangat berani! Menghadapi masalah secara langsung seringkali jauh lebih ringan daripada beban mengantisipasinya.":
    "A very brave step! Facing a problem directly is often much lighter than the burden of anticipating it.",
  "Benar sekali Kak! Bayangan ketakutan saya ternyata jauh lebih besar daripada kenyataannya. Terima kasih banyak!":
    "So true Counselor! My fearful imagination was much bigger than reality. Thank you so much!",
  "Dukungan Langkah Bertahap": "Support Gradual Steps",
  "Menyadari dorongan untuk kabur adalah separuh dari kemenangan. Ambil satu langkah kecil setiap hari, kamu tidak sendirian.":
    "Becoming aware of the urge to run away is half the victory. Take one small step each day; you are not alone.",
  "Terima kasih Kak, saya akan pelan-pelan hadapi satu per satu tanpa terburu-buru lagi.":
    "Thank you Counselor, I will take things slowly step by step without rushing anymore."
};

/**
 * Translates dialogue strings to English if language is 'en'
 */
export function tDialogue(text: string | undefined | null, lang: Language): string {
  if (!text) return '';
  if (lang === 'id') return text;

  // Direct dictionary lookup
  if (DIALOGUE_MAP[text]) {
    return DIALOGUE_MAP[text];
  }

  // Fallback regex / phrase replacements for procedural text
  let translated = text;

  // Replace common Indonesian words in dialogue prose
  translated = translated
    .replace(/\bKak\b/g, 'Counselor')
    .replace(/\bKakak\b/g, 'Counselor')
    .replace(/\bth\b/g, 'yo')
    .replace(/\btahun\b/g, 'years old')
    .replace(/\bSiswa SMA\b/g, 'High School Student')
    .replace(/\bMahasiswa\b/g, 'College Student');

  return translated;
}

/**
 * Translates profession string
 */
export function tProfession(prof: string | undefined | null, lang: Language): string {
  if (!prof) return '';
  if (lang === 'id') return prof;
  return PROFESSION_MAP[prof] || prof;
}
