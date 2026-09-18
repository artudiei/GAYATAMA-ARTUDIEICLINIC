import { ClientProfile, EvaluationResult, ClientChatMessage, ChatReplyOption } from '../types/game';

interface ArchetypeStoryTemplate {
  positiveStory: string;
  neutralStory: string;
  replyChoices: {
    label: string;
    counselorText: string;
    clientFeedback: string;
  }[];
}

const ARCHETYPE_FOLLOWUPS: Record<string, ArchetypeStoryTemplate> = {
  anxious: {
    positiveStory: 'Halo Kak Konselor! Maaf mengganggu waktunya... Saya mau kasih kabar, tadi pagi saat mau mulai presentasi, saya mempraktikkan teknik pernapasan 4-7-8 yang Kakak ajarkan. Dada saya yang biasanya berdebar kencang sekarang jauh lebih terkendali. Dosen penguji juga mengapresiasi cara penyampaian saya. Terima kasih banyak ya Kak!',
    neutralStory: 'Halo Kak... Saya baru saja mencoba mengerjakan tugas kelompok. Kadang rasa cemasnya masih muncul saat ada yang tidak sependapat, tapi saya ingat catatan sesi kemarin untuk tidak langsung panik. Saya akan coba terus ya Kak.',
    replyChoices: [
      {
        label: 'Apresiasi & Validasi Kemajuan',
        counselorText: 'Luar biasa! Kemajuan kecil ini adalah bukti ketahanan mentalmu. Ingat bahwa rasa cemas adalah hal wajar, yang terpenting adalah responmu.',
        clientFeedback: 'Terima kasih banyak Kak! Kata-kata Kakak sangat menenangkan saya. Sampai jumpa di sesi berikutnya ya!'
      },
      {
        label: 'Dorongan Konsistensi Teknik',
        counselorText: 'Bagus sekali! Tetap jadwalkan latihan pernapasan ini secara rutin 5 menit setiap pagi agar menjadi refleks alami.',
        clientFeedback: 'Siap Kak! Sudah saya pasang pengingat alarm di HP. Terima kasih banyak bimbingannya!'
      }
    ]
  },
  perfectionist: {
    positiveStory: 'Selamat sore Kak! Saya mau cerita, tadi saya berhasil mengumpulkan draf proposal meskipun formatnya belum "100% sempurna" menurut standar lama saya. Rasanya aneh tapi melegakan sekali tidak harus begadang sampai jam 3 pagi lagi. Terima kasih sudah membuka perspektif saya tentang prinsip "Cukup Baik" (Good Enough)!',
    neutralStory: 'Halo Kak. Hari ini saya sempat merasa bersalah saat ada satu revisi kecil dari atasan. Tapi saya coba tahan dorongan untuk membongkar seluruh proyek dari awal dan fokus menyelesaikan poin yang diminta saja.',
    replyChoices: [
      {
        label: 'Kuatkan Mindset "Good Enough"',
        counselorText: 'Pencapaian hebat! Menerima ketidaksempurnaan adalah keberanian terbesar seorang perfeksionis. Kamu sudah menyelamatkan energimu.',
        clientFeedback: 'Betul sekali Kak... Rasanya beban di pundak saya berkurang drastis hari ini. Makasih ya Kak!'
      },
      {
        label: 'Apresiasi Self-Compassion',
        counselorText: 'Hebat, kamu sudah mulai belajar menyayangi dirimu sendiri. Terus rayakan kemajuan proses, bukan hanya hasil akhir.',
        clientFeedback: 'Iya Kak, saya mulai belajar tidak terlalu keras pada diri sendiri. Sangat bersyukur bisa konseling kemarin.'
      }
    ]
  },
  defensive: {
    positiveStory: 'Halo Kak Konselor. Awalnya saya sempat merasa defensif dan ragu waktu pertama datang ke klinik. Tapi setelah saya renungkan di rumah, saran Kakak untuk mendengarkan tanpa langsung menyanggah ternyata berhasil memperbaiki obrolan dengan rekan kerja saya. Terima kasih sudah sabar menghadapi saya kemarin.',
    neutralStory: 'Halo Kak. Tadi ada situasi yang memicu emosi saya di kantor. Saya hampir membentak, tapi saya tahan dan minum air dulu seperti yang kita bicarakan. Masih sulit, tapi saya sedang membiasakannya.',
    replyChoices: [
      {
        label: 'Hargai Keterbukaan & Kerentanan',
        counselorText: 'Terima kasih atas kejujuranmu. Dibutuhkan kedewasaan besar untuk berani menurunkan pertahanan diri dan mencoba cara baru.',
        clientFeedback: 'Iya Kak, saya sadar defensif cuma bikin saya lelah sendiri. Terima kasih sudah tidak menghakimi saya.'
      },
      {
        label: 'Validasi Emosi & Refleksi',
        counselorText: 'Menahan reaksi pertama adalah langkah awal yang sangat berharga. Terus latih jeda sejenak sebelum merespon situasi sulit.',
        clientFeedback: 'Siap Kak. Jeda 5 detik kemarin benar-benar menyelamatkan hubungan kerja saya. Makasih banyak!'
      }
    ]
  },
  avoidant: {
    positiveStory: 'Halo Kak... Kemarin setelah sesi, akhirnya saya memberanikan diri menelepon keluarga untuk membicarakan hal yang selama ini saya hindari. Ternyata respon mereka tidak seburuk yang saya bayangkan di kepala. Rasanya plong sekali akhirnya keluar dari persembunyian.',
    neutralStory: 'Halo Kak. Saya mulai mencatat hal-hal yang membuat saya ingin menghindar di buku catatan kecil. Setidaknya sekarang saya tidak langsung kabur atau scrolling medsos seharian saat ada masalah.',
    replyChoices: [
      {
        label: 'Puji Keberanian Konfrontasi Sehat',
        counselorText: 'Langkah yang sangat berani! Menghadapi masalah secara langsung seringkali jauh lebih ringan daripada beban mengantisipasinya.',
        clientFeedback: 'Benar sekali Kak! Bayangan ketakutan saya ternyata jauh lebih besar daripada kenyataannya. Terima kasih banyak!'
      },
      {
        label: 'Dukungan Langkah Bertahap',
        counselorText: 'Menyadari dorongan untuk kabur adalah separuh dari kemenangan. Ambil satu langkah kecil setiap hari, kamu tidak sendirian.',
        clientFeedback: 'Terima kasih Kak, saya akan pelan-pelan hadapi satu per satu tanpa terburu-buru lagi.'
      }
    ]
  }
};

export const generateFollowUpMessage = (
  client: ClientProfile,
  evalResult: EvaluationResult
): ClientChatMessage => {
  const isHighGrade = evalResult.grade === 'S' || evalResult.grade === 'A';
  const template = ARCHETYPE_FOLLOWUPS[client.archetypeId] || ARCHETYPE_FOLLOWUPS.anxious;

  const messageText = isHighGrade ? template.positiveStory : template.neutralStory;

  const replyOptions: ChatReplyOption[] = template.replyChoices.map(c => ({
    text: c.label,
    counselorReply: c.counselorText,
    clientFeedback: c.clientFeedback,
    xpReward: 15
  }));

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return {
    id: `msg_${client.id}_${Date.now()}`,
    clientId: client.id,
    clientName: client.name,
    clientProfession: client.profession,
    archetypeId: client.archetypeId,
    archetypeName: client.archetypeName,
    gender: client.gender,
    hairstyle: client.hairstyle,
    accessoryType: client.accessoryType,
    hairColor: client.hairColor,
    shirtColor: client.shirtColor,
    pantsColor: client.pantsColor,
    timestamp: `Hari ini, ${timeStr}`,
    sessionGrade: evalResult.grade,
    messageText,
    replyOptions,
    isRead: false,
    xpClaimed: false
  };
};
