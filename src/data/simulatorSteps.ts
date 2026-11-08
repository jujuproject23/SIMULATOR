import { SimulatorStep } from '../types';

export const SIMULATOR_STEPS: SimulatorStep[] = [
  {
    stepNumber: 1,
    id: 'step-inspection',
    title: 'Inspeksi Awal & Pemeriksaan Baterai',
    shortObjective: 'Periksa fisik bodi dan pastikan baterai tidak kembung.',
    detailedInstruction: 'Sebelum membongkar, amati bodi perangkat. Periksa apakah back cover terangkat akibat pembengkakan baterai (swelling), apakah ada bau kimia, atau keretakan pada bodi.',
    requiredToolId: 'inspection-check',
    actionType: 'test-power',
    targetComponentId: 'target-device-body',
    targetDescription: 'Klik pada bodi ponsel untuk memulai checklist visual inspeksi perangkat.',
    hint: 'Klik pada smartphone di meja kerja untuk melakukan pengecekan visual menyeluruh.',
    wrongToolResponses: {
      'precision-screwdriver': 'Jangan gunakan obeng saat inspeksi visual awal belum selesai.',
      'suction-cup': 'Belum saatnya menggunakan kop penghisap. Periksa dulu kelayakan fisik bodi.',
      'nylon-spudger': 'Alat belum diperlukan pada tahap inspeksi visual.'
    },
    successExplanation: 'Inspeksi visual selesai: Bodi dalam kondisi baik, tidak terdeteksi pembengkakan sel baterai abnormal, siap untuk diproses.'
  },
  {
    stepNumber: 2,
    id: 'step-power-off',
    title: 'Matikan Daya Perangkat Sepenuhnya',
    shortObjective: 'Pastikan smartphone dalam keadaan mati total (Power Off).',
    detailedInstruction: 'Kondisi listrik aktif saat pembongkaran dapat menyebabkan hubungan arus pendek fatal. Matikan daya sistem melalui tombol daya atau interaksi layar.',
    requiredToolId: 'power-button',
    actionType: 'test-power',
    targetComponentId: 'target-power-button',
    targetDescription: 'Klik tombol Power di sisi kanan bodi smartphone untuk mematikan daya.',
    hint: 'Klik tombol Power pada sisi kanan frame bodi ponsel untuk memunculkan konfirmasi Power Off.',
    safetyAlert: 'DILARANG membongkar ponsel dalam kondisi layar atau daya masih menyala!',
    wrongToolResponses: {
      'precision-screwdriver': 'Jangan gunakan alat perkakas logam untuk menekan tombol daya.',
      'heat-pad': 'Jangan panaskan ponsel sebelum dayanya dimatikan total!'
    },
    successExplanation: 'Smartphone telah dimatikan secara sempurna. Sirkuit CPU dan display telah masuk ke kondisi non-aktif aman.'
  },
  {
    stepNumber: 3,
    id: 'step-sim-tray',
    title: 'Pelepasan Baki Kartu SIM (SIM Tray)',
    shortObjective: 'Keluarkan slot baki kartu SIM menggunakan SIM Ejector.',
    detailedInstruction: 'Baki kartu SIM melintang antara frame luar dan motherboard. Jika tidak dilepas, pin baki SIM akan patah atau merusak rangka saat back cover/frame diangkat.',
    requiredToolId: 'sim-ejector',
    actionType: 'unscrew',
    targetComponentId: 'target-sim-hole',
    targetDescription: 'Arahkan SIM Ejector ke lubang jarum SIM tray di sisi kiri frame.',
    hint: 'Pilih alat SIM Ejector dan klik lubang pin SIM di sisi kiri bodi ponsel.',
    wrongToolResponses: {
      'precision-screwdriver': 'Ujung obeng terlalu besar dan dapat merusak lubang SIM ejector.',
      'nylon-spudger': 'Spudger plastik tidak dapat masuk ke lubang mikroskopik SIM tray.'
    },
    successExplanation: 'Baki kartu SIM berhasil dikeluarkan dan disimpan dengan aman di tray komponen.'
  },
  {
    stepNumber: 4,
    id: 'step-heat-pad',
    title: 'Pemanasan Lem Back Cover (Controlled Heat)',
    shortObjective: 'Panaskan penutup belakang pada suhu 75°C selama 3 menit.',
    detailedInstruction: 'Lem pabrikan pada kaca belakang sangat kuat. Pemanasan terkontrol pada suhu 70°C – 75°C akan melunakkan polimer perekat tanpa merusak modul kamera atau baterai.',
    requiredToolId: 'heat-pad',
    actionType: 'heat',
    targetComponentId: 'target-back-cover',
    targetDescription: 'Pilih Heat Pad dan klik bagian belakang ponsel untuk memulai proses pemanasan terstandar.',
    hint: 'Gunakan Heat Pad bersuhu 75°C untuk melunakkan lem perekat penutup belakang.',
    safetyAlert: 'Peringatan: Hindari suhu di atas 85°C yang dapat memicu degradasi termal pada baterai lithium.',
    wrongToolResponses: {
      'precision-screwdriver': 'Jangan mencungkil cover dengan obeng selagi lem masih beku dan keras!',
      'opening-pick': 'Mencoba menyelipkan pick sebelum dipanaskan akan memecahkan kaca penutup.'
    },
    successExplanation: 'Pemanasan 75°C stabil selama 3 menit berhasil melunakkan lapisan perekat karet akrilik bodi.'
  },
  {
    stepNumber: 5,
    id: 'step-suction-pick',
    title: 'Pengangkatan Celah & Pemotongan Lem',
    shortObjective: 'Gunakan Suction Cup untuk membuka celah, lalu selipkan Opening Pick.',
    detailedInstruction: 'Tempelkan Suction Cup di bagian bawah kaca belakang, tarik ke atas perlahan hingga terlihat celah 0.5 mm, lalu masukkan plat plastik pembuka (opening pick) tidak lebih dari 3 mm.',
    requiredToolId: 'suction-cup',
    actionType: 'suction',
    targetComponentId: 'target-lower-glass',
    targetDescription: 'Klik area bawah kaca penutup belakang dengan Suction Cup terpasang.',
    hint: 'Pilih Suction Cup, tempelkan di bagian bawah kaca penutup belakang untuk menciptakan celah.',
    wrongToolResponses: {
      'curved-tweezers': 'BAHAYA: Jangan gunakan pinset logam pada kaca belakang, kaca akan retak seketika!',
      'precision-screwdriver': 'Obeng logam akan merusak cat bodi dan meretakkan penutup belakang.'
    },
    successExplanation: 'Celah terbuka sempurna! Plat plastik disisirkan mengelilingi tepi dan penutup belakang terlepas dengan aman.'
  },
  {
    stepNumber: 6,
    id: 'step-remove-shield',
    title: 'Pelepasan Sekrup & Pelat Pelindung Motherboard',
    shortObjective: 'Buka sekrup pelindung logam menggunakan Obeng Presisi Phillips PH000.',
    detailedInstruction: 'Soket konektor baterai dilindungi oleh pelat logam (bracket) yang dikunci oleh sekrup mikro. Buka sekrup satu per satu dan simpan pada matras pemetaan sekrup.',
    requiredToolId: 'precision-screwdriver',
    actionType: 'unscrew',
    targetComponentId: 'target-shield-screws',
    targetDescription: 'Klik pada sekrup pelindung logam di atas soket konektor baterai.',
    hint: 'Pilih Obeng Presisi dan klik sekrup penahan pelindung logam motherboard.',
    wrongToolResponses: {
      'nylon-spudger': 'Spudger plastik tidak dapat membuka sekrup baja berulir presisi.',
      'curved-tweezers': 'Memutar sekrup dengan pinset akan membuat kepala sekrup rusak atau slek.'
    },
    successExplanation: 'Sekrup berhasil dilepas dan dipetakan. Pelat pelindung logam motherboard terangkat dengan rapi.'
  },
  {
    stepNumber: 7,
    id: 'step-disconnect-battery',
    title: 'Pemutusan Konektor Baterai (Safety Gate)',
    shortObjective: 'WAJIB: Lepaskan soket fleksibel baterai dengan Spudger Nilon Anti-Statis!',
    detailedInstruction: 'LANGKAH KRITIS KESELAMATAN: Seluruh daya motherboard harus diputus sebelum menyentuh baterai. Selipkan ujung pipih spudger nilon di bawah konektor baterai dan angkat perlahan tegak lurus.',
    requiredToolId: 'nylon-spudger',
    actionType: 'disconnect-connector',
    targetComponentId: 'target-battery-connector',
    targetDescription: 'Klik soket konektor baterai berwarna emas/hitam menggunakan Spudger Nilon.',
    hint: 'Gunakan Spudger Plastik ESD untuk mencungkil konektor baterai dari soketnya secara aman.',
    safetyAlert: 'HUKUM BESI: JANGAN PERNAH gunakan pinset atau perkakas logam di tahap ini! Risiko korsleting IC daya seketika.',
    wrongToolResponses: {
      'curved-tweezers': 'PELANGGARAN KESELAMATAN BERBAHAYA! Menggunakan pinset logam pada konektor baterai memicu korsleting fatal!',
      'precision-screwdriver': 'BAHAYA! Obeng logam adalah konduktor listrik aktif yang dapat merusak jalur tegangan PCB!'
    },
    successExplanation: 'Konektor baterai berhasil diputus dengan spudger non-konduktif! Motherboard kini sepenuhnya bebas tegangan listrik.'
  },
  {
    stepNumber: 8,
    id: 'step-pull-adhesive',
    title: 'Penarikan Lem Perekat Baterai (Stretch-Release Tabs)',
    shortObjective: 'Tarik lidah perekat mendatar dengan sudut 15° menggunakan Pinset Presisi.',
    detailedInstruction: 'Pegang ujung lidah perekat karet elastis. Tarik perlahan secara horizontal sejajar dengan kompartemen ponsel. Karet akan memanjang dan melepaskan ikatan perekat tanpa merusak sel baterai.',
    requiredToolId: 'curved-tweezers',
    actionType: 'pull-adhesive',
    targetComponentId: 'target-pull-tabs',
    targetDescription: 'Klik pada ujung strip hitam penarik perekat (pull-tabs) di bawah baterai.',
    hint: 'Gunakan Pinset Presisi untuk menjepit ujung lem tarik baterai, lalu tarik mendatar perlahan.',
    safetyAlert: 'DILARANG MENCONGKEL bodi baterai dari tengah dengan obeng! Baterai pouch cell akan tertusuk.',
    wrongToolResponses: {
      'precision-screwdriver': 'FATAL: Mencongkel baterai dengan obeng logam dapat menusuk kantong sel dan memicu semburan api!',
      'suction-cup': 'Suction cup tidak dapat menarik lem silikon di bawah baterai.'
    },
    successExplanation: 'Strip perekat stretch-release berhasil ditarik memanjang hingga lepas bersih tanpa putus!'
  },
  {
    stepNumber: 9,
    id: 'step-remove-old-battery',
    title: 'Pengangkatan Baterai Lama & Pembersihan Kompartemen',
    shortObjective: 'Angkat sel baterai lama dan periksa kebersihan kompartemen bodi.',
    detailedInstruction: 'Keluarkan baterai lama yang sudah bebas dari lem. Periksa kompartemen dasar bodi dari serpihan logam, kerikil, atau sisa perekat yang menonjol agar tidak menusuk baterai baru nantinya.',
    requiredToolId: 'nylon-spudger',
    actionType: 'remove-battery',
    targetComponentId: 'target-battery-bay',
    targetDescription: 'Klik pada baterai lama untuk mengangkatnya dari kompartemen perangkat.',
    hint: 'Gunakan spudger nilon untuk mengangkat baterai lama keluar dari kompartemen dengan hati-hati.',
    wrongToolResponses: {
      'precision-screwdriver': 'Jangan menusuk baterai lama dengan obeng bahkan setelah perekat terlepas!',
      'heat-pad': 'Tidak perlu memanaskan lagi setelah lem terlepas.'
    },
    successExplanation: 'Baterai lama diangkat dengan aman. Kompartemen ponsel bersih dan siap menerima unit baru.'
  },
  {
    stepNumber: 10,
    id: 'step-apply-adhesive',
    title: 'Pemasangan Strip Perekat Khusus Baterai Baru',
    shortObjective: 'Tempelkan perekat stretch-release baru pada kompartemen baterai.',
    detailedInstruction: 'Pasang strip lem khusus baterai dengan menyisakan lidah penarik (pull-tab). Jangan gunakan lem cair instan (Alteco/B7000) yang menyulitkan reparasi di masa depan.',
    requiredToolId: 'battery-adhesive',
    actionType: 'apply-adhesive',
    targetComponentId: 'target-adhesive-slots',
    targetDescription: 'Klik kompartemen dasar baterai untuk menempelkan lem perekat baru.',
    hint: 'Pilih Perekat Baterai Baru (Pull-Tab Adhesive) dan pasang pada dudukan kompartemen ponsel.',
    wrongToolResponses: {
      'precision-screwdriver': 'Alat salah. Pilih material perekat baterai baru dari panel peralatan.',
      'nylon-spudger': 'Pilih bahan perekat baterai terlebih dahulu sebelum meratakannya.'
    },
    successExplanation: 'Perekat baterai baru terpasang sempurna dengan lidah penarik tersusun rapi.'
  },
  {
    stepNumber: 11,
    id: 'step-install-new-battery',
    title: 'Pemasangan Baterai Pengganti Tersertifikasi',
    shortObjective: 'Posisikan baterai baru dan hubungkan konektor untuk memastikan kepresisian.',
    detailedInstruction: 'Letakkan baterai pengganti baru ke dalam kompartemen. Tips ahli: Tancapkan sementara konektor baterai ke motherboard SEBELUM menekan bodi baterai ke perekat agar posisi kabel pas sempurna.',
    requiredToolId: 'replacement-battery',
    actionType: 'insert-battery',
    targetComponentId: 'target-battery-bay',
    targetDescription: 'Klik area kompartemen baterai untuk memasukkan baterai pengganti baru.',
    hint: 'Pilih Baterai Pengganti Baru (Certified Replacement Battery) dan pasangkan ke posisinya.',
    wrongToolResponses: {
      'precision-screwdriver': 'Pilih unit baterai baru dari kotak peralatan.',
      'heat-pad': 'Jangan memanaskan baterai baru!'
    },
    successExplanation: 'Baterai baru terpasang presisi! Posisi kabel fleksibel sejajar tanpa tegangan tekuk.'
  },
  {
    stepNumber: 12,
    id: 'step-reassemble-shield',
    title: 'Pemasangan Konektor Baterai & Pelat Pelindung (Bracket)',
    shortObjective: 'Kancingkan konektor baterai dan pasang kembali sekrup pelindung motherboard.',
    detailedInstruction: 'Tekan konektor fleksibel baterai dengan spudger hingga terdengar bunyi "klik" presisi. Pasang kembali pelat pelindung logam dan kencangkan sekrup sesuai peta posisinya.',
    requiredToolId: 'precision-screwdriver',
    actionType: 'reconnect',
    targetComponentId: 'target-shield-screws',
    targetDescription: 'Klik pelat pelindung motherboard dengan obeng presisi untuk mengencangkan sekrup.',
    hint: 'Pilih Obeng Presisi untuk mengencangkan kembali baut pelat pelindung konektor.',
    wrongToolResponses: {
      'suction-cup': 'Alat salah untuk mengencangkan sekrup penahan pelindung logam.',
      'curved-tweezers': 'Gunakan obeng presisi dengan ukuran mata baut yang tepat.'
    },
    successExplanation: 'Konektor baterai terkunci mantap dan pelat pelindung logam terpasang kokoh!'
  },
  {
    stepNumber: 13,
    id: 'step-qc-test',
    title: 'Pemasangan Back Cover & Quality Control (QC Test)',
    shortObjective: 'Pasang kembali back cover, nyalakan ponsel, dan verifikasi fungsi pengisian daya.',
    detailedInstruction: 'Rapatkan kembali penutup belakang dengan perekat frame baru. Tekan tombol Power untuk menyalakan perangkat, periksa deteksi baterai pada sistem operasi, dan uji pengisian daya cepat.',
    requiredToolId: 'power-button',
    actionType: 'test-power',
    targetComponentId: 'target-power-button',
    targetDescription: 'Klik tombol Power untuk menyalakan smartphone dan menjalankan diagnostik QC otomatis.',
    hint: 'Klik tombol Power ponsel untuk menyalakan dan memverifikasi kesehatan baterai baru.',
    wrongToolResponses: {
      'precision-screwdriver': 'Jangan gunakan obeng untuk menekan tombol daya eksternal.',
      'heat-pad': 'Prosedur pemanasan sudah selesai.'
    },
    successExplanation: 'SEMPURNA! Smartphone menyala normal. OS mendeteksi Baterai Sehat 100%, arus pengisian terbaca stabil 5V/3A 15W!'
  }
];
