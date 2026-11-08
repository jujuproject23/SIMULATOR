import { Chapter, RepairTool, SafetyChecklistItem, ExamQuestion } from '../types';

export const REPAIR_TOOLS: RepairTool[] = [
  {
    id: 'heat-pad',
    name: 'Controlled Heat Pad / Mat',
    indonesianName: 'Pemanas Suhu Terkontrol (Heat Pad)',
    category: 'opening',
    icon: 'Flame',
    functionText: 'Melunakkan perekat struktural (adhesive) pada penutup belakang (back cover) atau layar smartphone dengan suhu aman terkontrol.',
    correctUsage: 'Atur suhu pada kisaran 70°C – 80°C selama 3–5 menit. Pastikan permukaan ponsel diletakkan merata di atas matras pemanas.',
    commonMistakes: 'Menggunakan suhu >90°C yang dapat merusak panel OLED atau memanaskan baterai secara langsung terlalu lama.',
    safetyPrecautions: 'Gunakan sarung tangan anti panas jika bodi ponsel terasa sangat hangat. Jangan pernah memanaskan baterai yang sudah kembung (swollen).'
  },
  {
    id: 'suction-cup',
    name: 'Heavy-Duty Suction Cup',
    indonesianName: 'Kop Penghisap (Suction Cup)',
    category: 'opening',
    icon: 'CircleDot',
    functionText: 'Menciptakan gaya tarik vakum untuk mengangkat kaca penutup belakang atau layar guna membuka celah sempit bagi alat pembuka plastik.',
    correctUsage: 'Tempelkan kuat pada bagian bawah kaca belakang yang telah dipanaskan, tarik perlahan ke atas sambil mengamati celah yang terbuka.',
    commonMistakes: 'Menarik terlalu kencang dan mendadak hingga merobek kabel fleksibel sensor sidik jari atau kamera yang terhubung di bawahnya.',
    safetyPrecautions: 'Bila kaca retak, lapisi permukaan kaca dengan lakban bening terlebih dahulu agar kop vakum dapat melekat sempurna.'
  },
  {
    id: 'opening-pick',
    name: 'Ultra-Thin Plastic Opening Pick',
    indonesianName: 'Plat Pembuka Plastik (Opening Pick)',
    category: 'opening',
    icon: 'Layers',
    functionText: 'Menyusup ke dalam celah antara frame dan penutup belakang untuk memotong jalur lem perekat tanpa menggores rangka atau melukai komponen.',
    correctUsage: 'Masukkan pick tidak lebih dari 3–4 mm ke dalam bodi, geser perlahan sepanjang tepi untuk memutus lem perekat.',
    commonMistakes: 'Memasukkan pick terlalu dalam (>5 mm) yang berisiko menusuk baterai lithium atau memotong kabel fleksibel antena/layar.',
    safetyPrecautions: 'HANYA gunakan pick berbahan plastik lunak atau polimer. Jangan gunakan silet logam untuk menyisir lem di sekitar baterai!'
  },
  {
    id: 'precision-screwdriver',
    name: 'Precision Screwdriver (Phillips/Torx)',
    indonesianName: 'Obeng Presisi (Phillips #00 / Torx)',
    category: 'precision',
    icon: 'Wrench',
    functionText: 'Membuka dan memasang sekrup mikro penahan pelindung logam (shield bracket) motherboard dan konektor baterai.',
    correctUsage: 'Gunakan mata obeng yang pas presisi (misal Phillips PH000 atau Torx T3/T4). Berikan tekanan vertikal stabil agar kepala sekrup tidak slek (stripped).',
    commonMistakes: 'Menggunakan ukuran mata obeng yang salah atau menukar posisi sekrup yang berbeda panjangnya saat perakitan (dapat merusak jalur PCB).',
    safetyPrecautions: 'Simpan sekrup pada matras magnetik berpetak sesuai posisi aslinya (screw mapping mat).'
  },
  {
    id: 'nylon-spudger',
    name: 'ESD-Safe Nylon Spudger',
    indonesianName: 'Spudger Plastik Anti-Statis (ESD)',
    category: 'prying',
    icon: 'Minus',
    functionText: 'Melepaskan konektor fleksibel baterai, display, dan kamera dari soket PCB tanpa menimbulkan hubungan arus pendek (short circuit).',
    correctUsage: 'Gunakan ujung pipih atau runcing spudger non-konduktif untuk mencungkil tepi konektor secara perlahan ke atas tegak lurus.',
    commonMistakes: 'Menggunakan pinset logam atau obeng untuk melepas konektor baterai yang seketika dapat memicu percikan api dan korsleting komponen induk.',
    safetyPrecautions: 'Pastikan spudger berlabel ESD-safe dan bebas dari kotoran berminyak atau serat logam.'
  },
  {
    id: 'curved-tweezers',
    name: 'Curved Anti-Static Tweezers',
    indonesianName: 'Pinset Presisi Melengkung (ESD)',
    category: 'precision',
    icon: 'Scissors',
    functionText: 'Memegang pelat pelindung kecil, mencapit ujung strip perekat baterai (pull-tabs), dan memposisikan komponen kecil.',
    correctUsage: 'Jepit ujung strip perekat baterai secara horizontal dan putar perlahan untuk menarik lem keluar dari bawah baterai.',
    commonMistakes: 'Menggunakan ujung pinset yang tajam untuk mencongkel bodi baterai lithium. Jika tertusuk, baterai dapat berasap dan terbakar!',
    safetyPrecautions: 'Hindari kontak ujung logam pinset dengan pin konektor aktif pada motherboard.'
  },
  {
    id: 'battery-adhesive',
    name: 'Stretch-Release Battery Adhesive Strips',
    indonesianName: 'Perekat Khusus Baterai (Pull-Tab Adhesive)',
    category: 'consumable',
    icon: 'Sparkles',
    functionText: 'Merekatkan baterai baru ke kompartemen bodi ponsel secara kokoh namun mudah dilepas kembali di masa mendatang tanpa merusak sel baterai.',
    correctUsage: 'Tempelkan strip pada bagian belakang baterai baru dengan menyisakan lidah penarik (pull-tab) yang terlihat di bagian atas/bawah.',
    commonMistakes: 'Menggunakan lem cair B-7000/T-8000 atau double tape busa tebal yang menyulitkan pelepasan baterai berikutnya dan menimbulkan panas terperangkap.',
    safetyPrecautions: 'Jangan biarkan perekat menutupi lubang ventilasi atau kabel fleksibel yang melintas di bawah baterai.'
  },
  {
    id: 'replacement-battery',
    name: 'Certified OEM/OBL Replacement Battery',
    indonesianName: 'Baterai Pengganti Tersertifikasi (OEM/Grade A)',
    category: 'consumable',
    icon: 'BatteryMedium',
    functionText: 'Unit baterai lithium-ion/polimer baru dengan kapasitas dan spesifikasi voltase resmi yang sesuai dengan model smartphone.',
    correctUsage: 'Periksa fisik sebelum dipasang: segel utuh, kabel flex fleksibel tanpa tekukan tajam, dan voltase nominal terbaca aman pada multimeter (3.7V - 3.85V).',
    commonMistakes: 'Memaksa membengkokkan baterai agar pas ke tempatnya, atau menggunakan baterai non-sertifikasi berkapasitas palsu.',
    safetyPrecautions: 'Simpan baterai baru di tempat sejuk dan kering, jauh dari benda tajam, panas, dan bahan mudah terbakar.'
  },
  {
    id: 'ipa-alcohol',
    name: '99% Isopropyl Alcohol (IPA)',
    indonesianName: 'Alkohol Isopropil 99% Elektronik (IPA)',
    category: 'consumable',
    icon: 'Droplets',
    functionText: 'Membantu melarutkan sisa perekat baterai yang putus atau membandel di kompartemen tanpa meninggalkan residu konduktif.',
    correctUsage: 'Teteskan 1–2 tetes kecil di tepi baterai yang perekatnya putus dan diamkan 1 menit agar lem melunak sebelum diangkat perlahan.',
    commonMistakes: 'Menuangkan terlalu banyak cairan alkohol hingga merembes ke panel layar belakang (backlight LCD) yang menyebabkan bercak noda permanen.',
    safetyPrecautions: 'IPA mudah menguap dan mudah terbakar. Jauhkan dari sumber api dan pastikan ventilasi ruangan memadai.'
  }
];

export const SAFETY_CHECKLIST_ITEMS: SafetyChecklistItem[] = [
  {
    id: 'safe-1',
    ruleTitle: 'Matikan Daya Perangkat Sepenuhnya (Power Off)',
    description: 'Ponsel wajib dimatikan secara total melalui sistem sebelum alat apapun menyentuh sekrup atau bodi.',
    isCritical: true
  },
  {
    id: 'safe-2',
    ruleTitle: 'Lepaskan Kabel Charger & Baki SIM (SIM Tray)',
    description: 'Pastikan tidak ada arus listrik eksternal yang terhubung dan baki kartu SIM telah dikeluarkan agar tidak patah saat membuka rangka.',
    isCritical: true
  },
  {
    id: 'safe-3',
    ruleTitle: 'Gunakan Perlindungan Elektrostatik (ESD Wrist Strap & Mat)',
    description: 'Muatan statis tubuh manusia (>3000V) dapat merusak sirkuit mikro IC motherboard tanpa disadari teknisi.',
    isCritical: false
  },
  {
    id: 'safe-4',
    ruleTitle: 'Inspeksi Awal: Periksa Tanda Baterai Kembung / Bau Kimia',
    description: 'Bila baterai terlihat membengkak, bocor, atau berbau manis menusuk, JANGAN panaskan dan JANGAN tusuk. Segera ikuti prosedur isolasi darurat!',
    isCritical: true
  },
  {
    id: 'safe-5',
    ruleTitle: 'WAJIB: Putus Konektor Baterai Dulu Sebelum Komponen Lain',
    description: 'Begitu cover pelindung terbuka, konektor baterai harus menjadi sambungan pertama yang dicabut menggunakan spudger plastik!',
    isCritical: true
  },
  {
    id: 'safe-6',
    ruleTitle: 'DILARANG KERAS Menggunakan Alat Logam untuk Mencongkel Baterai',
    description: 'Haram menusuk, membengkokkan, atau mencongkel kantong baterai (pouch cell) dengan pinset, obeng, atau silet logam karena memicu ledakan termal.',
    isCritical: true
  },
  {
    id: 'safe-7',
    ruleTitle: 'Suhu Pemanasan Maksimal 80°C pada Back Cover',
    description: 'Jangan pernah mengarahkan heat gun dengan suhu tak terkontrol langsung ke baterai lithium karena baterai rentan meledak di atas 100°C.',
    isCritical: true
  },
  {
    id: 'safe-8',
    ruleTitle: 'Siapkan Pasir Pemadam / Kotak Isolasi Baterai Rusak (Fire Safety)',
    description: 'Kebakaran baterai lithium tidak bisa dipadamkan dengan air biasa. Selalu siapkan pasir kering atau wadah tahan api logam di area meja kerja.',
    isCritical: true
  }
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: '01',
    title: 'Pengenalan Baterai Smartphone',
    subtitle: 'Teknologi Sel Lithium, Spesifikasi & Karakteristik Kerusakan',
    durationMinutes: 15,
    description: 'Pahami teknologi sel baterai Lithium-Ion dan Lithium-Polymer yang digunakan pada smartphone modern, parameter mAh, voltase, serta cara mendiagnosis degradasi baterai secara akurat.',
    learningObjectives: [
      'Memahami fungsi utama dan prinsip kerja sel baterai lithium sekunder.',
      'Membedakan karakteristik sel Lithium-Ion (Li-ion) dan Lithium-Polymer (Li-Po).',
      'Mengidentifikasi anatomi internal kantong baterai (Anoda, Katoda, Separator, BMS PCB).',
      'Membaca spesifikasi teknis: Kapasitas (mAh), Voltase Nominal (V), dan Cut-off Voltage.',
      'Mengenali gejala degradasi baterai: Kembung (swelling), drop persentase mendadak, thermal runaway.'
    ],
    sections: [
      {
        title: '1. Teknologi Lithium-Ion vs Lithium-Polymer',
        content: [
          'Hampir seluruh smartphone modern menggunakan baterai sekunder berbasis Lithium. Jenis paling populer adalah Lithium-Polymer (Li-Po) dengan bentuk kantong lunak (pouch cell) karena bentuknya yang ramping dan fleksibel.',
          'Prinsip kerja: Ion lithium (Li+) berpindah dari katoda (Lithium Cobalt Oxide/NMC) melalui lapisan separator polimer mikropori menuju anoda grafit saat proses pengisian daya (charging), dan mengalir balik saat proses pemakaian daya (discharging).',
          'Kelebihan utama Li-Po adalah densitas energi yang sangat tinggi tanpa efek memori (memory effect), namun memiliki kelemahan kritis berupa sensitivitas tinggi terhadap deformasi mekanis, panas berlebih, dan overcharging.'
        ],
        technicalTip: 'Baterai pouch cell tidak memiliki tabung logam kaku di luarnya. Lapisan luarnya hanyalah laminasi aluminium tipis berketebalan kurang dari 0.1 mm yang sangat rentan bocor bila tergores ujung obeng!'
      },
      {
        title: '2. Anatomi & Sirkuit Pengaman Baterai (BMS)',
        content: [
          'Di dalam sebuah baterai smartphone tidak hanya terdapat sel kimia, melainkan juga unit sirkuit proteksi terpadu yang disebut BMS (Battery Management System) atau PCM (Protection Circuit Module).',
          'Komponen baterai meliputi:',
          '• Pouch Cell (Sel Kimia): Menyimpan muatan energi melalui reaksi elektrokimia elektrolit cair/gel.',
          '• BMS Board (PCB Pelindung): Berisi IC pengontrol over-voltage, under-voltage, over-current, dan sensor suhu termistor (NTC).',
          '• Flexible Flat Cable (FPC Ribbon): Menghubungkan output daya dan jalur data baterai (I2C/HDQ/SMBus) ke motherboard.',
          '• Gold-plated Contact Connector: Soket presisi tempat mengalirnya arus kerja tinggi ke sistem smartphone.'
        ],
        diagramType: 'battery-anatomy'
      },
      {
        title: '3. Parameter Spesifikasi: mAh, Wh, dan Voltase',
        content: [
          '• Kapasitas Muatan (Milliampere-Hour / mAh): Mengindikasikan seberapa banyak muatan arus yang dapat dialirkan baterai dalam satu jam sebelum mencapai tegangan batas bawah (misal: 4.500 mAh).',
          '• Voltase Nominal (Nominal Voltage): Tegangan rata-rata operasional sel, umumnya 3.85V hingga 3.87V untuk sel Li-ion modern.',
          '• Charging Limit Voltage (Tegangan Maksimal): Tegangan puncak saat baterai terisi penuh 100%, umumnya 4.40V – 4.45V.',
          '• Energi (Watt-Hour / Wh): Total energi tersimpan yang dihitung dari Rumus: Wh = (mAh × V) ÷ 1.000.'
        ],
        technicalTip: 'Bila baterai diuji dengan multimeter dan tegangannya berada di bawah 2.8V, baterai telah mengalami kondisi Over-Discharge. Sistem proteksi BMS akan mengunci baterai sehingga ponsel menolak mengisi daya.'
      },
      {
        title: '4. Gejala Kerusakan & Penurunan Kesehatan (Battery Degradation)',
        content: [
          'Baterai smartphone umumnya memiliki siklus hidup (cycle life) berkisar antara 500 hingga 800 siklus sebelum kapasitas aslinya turun di bawah 80%.',
          'Gejala umum baterai rusak yang membutuhkan penggantian:',
          '1. Battery Health Drop: Kapasitas efektif tersisa di bawah 75% atau ponsel tiba-tiba mati saat persentase masih menunjukkan 20% - 30%.',
          '2. Baterai Kembung (Swelling / Gassing): Terjadi pelepasan gas hidrogen/karbon dioksida akibat penguraian elektrolit karena usia atau panas berlebih. Menekan layar LCD hingga terangkat atau meretakkan back cover.',
          '3. Suhu Ponsel Sangat Tinggi (Overheating): Baterai terasa panas bahkan saat ponsel dalam kondisi idle.',
          '4. Ponsel Mengalami Bootloop / Restart Saat Membuka Kamera: Baterai internal resistance (IR) tinggi tidak sanggup menyuplai lonjakan arus sesaat (peak current draw).'
        ],
        safetyAlert: 'PERINGATAN KRITIS: Baterai kembung adalah BOM WAKTU! Jangan pernah menekan, menusuk, atau memanaskan baterai yang kembung. Baterai tersebut harus segera diganti dengan prosedur isolasi darurat.'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Komponen apakah pada baterai smartphone yang bertugas melindungi sel dari overcharge, over-discharge, dan korsleting arus?',
        options: [
          'Laminasi foil aluminium luar',
          'BMS (Battery Management System) / Sirkuit PCM',
          'Kop silikon penahan perekat',
          'Konektor layar display fleksibel'
        ],
        correctIndex: 1,
        explanation: 'BMS (Battery Management System) adalah papan sirkuit kecil ber-IC khusus yang memutus sirkuit bila terdeteksi tegangan abnormal, arus berlebih, atau panas ekstrem.'
      },
      {
        id: 'q1-2',
        question: 'Apa bahaya terbesar menusuk atau membengkokkan baterai Lithium-Polymer (Li-Po) dengan alat logam tajam?',
        options: [
          'Membuat baut motherboard menjadi berkarat',
          'Memicu hubungan arus pendek internal yang menyebabkan thermal runaway dan kebakaran',
          'Menghilangkan sinyal kartu SIM operator',
          'Mengubah resolusi kamera smartphone'
        ],
        correctIndex: 1,
        explanation: 'Menusuk sel baterai merusak lapisan separator mikropori, sehingga anoda dan katoda langsung bersentuhan, memicu korsleting internal instan berkekuatan tinggi (thermal runaway) yang membakar elektrolit.'
      }
    ],
    keyTakeaways: [
      'Baterai smartphone bertipe kantong lunak (pouch cell) tanpa casing besi luar sehingga sangat rentan tertusuk.',
      'BMS bertugas mengatur proteksi voltase, arus, dan transmisi data suhu ke prosesor ponsel.',
      'Kapasitas dinyatakan dalam mAh, sedangkan voltase nominal baterai modern adalah 3.85V – 3.87V.',
      'Baterai kembung melepaskan gas akibat elektrolit rusak dan harus ditangani dengan protokol isolasi tanpa pemanasan.'
    ]
  },
  {
    id: 'ch2',
    number: '02',
    title: 'Peralatan & Perlengkapan Reparasi',
    subtitle: 'Spesifikasi Toolset, Fungsi Teknis & Mitigasi Kesalahan Pemakaian',
    durationMinutes: 20,
    description: 'Pelajari seluruh perangkat wajib dalam proses penggantian baterai: obeng presisi, pick plastik, spudger ESD, kop penghisap, heat mat kontrol suhu, serta cairan pelarut isopropil alkohol 99%.',
    learningObjectives: [
      'Mengenali bentuk fisik dan material pembentuk setiap alat reparasi standar.',
      'Memilih alat yang tepat untuk setiap tahapan pembongkaran bodi dan pelepasan baterai.',
      'Memahami aturan baku penggunaan alat plastik vs alat logam di sekitar sel baterai.',
      'Mengetahui suhu optimal heat mat dan cara merawat ujung obeng presisi.',
      'Mencegah kesalahan fatal: seperti memakai silet tajam untuk mencungkil baterai.'
    ],
    sections: [
      {
        title: '1. Toolset Pembuka Cangkang Luar (Enclosure Opening Tools)',
        content: [
          'Untuk membuka penutup belakang kaca atau polikarbonat tanpa merusak cat bodi atau frame:',
          '• Controlled Heat Pad: Menggunakan elemen pemanas silikon dengan termostat digital presisi untuk melembutkan lem perekat pabrikan (biasanya poliuretan atau akrilik tahan air).',
          '• Heavy-Duty Suction Cup: Bekerja dengan menciptakan ruang hampa udara di atas permukaan kaca, memberikan titik tumpu tarikan vertikal.',
          '• Ultra-Thin Plastic Picks: Ketebalan 0.2 mm – 0.3 mm terbuat dari bahan nilon/delrin fleksibel yang tidak akan menggores cat bagian dalam kaca penutup.'
        ],
        diagramType: 'tools-grid'
      },
      {
        title: '2. Peralatan Pembongkaran Komponen Elektronik (Disassembly & Prying)',
        content: [
          '• ESD-Safe Spudger (Plastik): Alat paling penting bagi seorang teknisi. Ujung pipihnya digunakan untuk melepas konektor FPC, dan ujung runcingnya untuk merapikan jalur kabel.',
          '• Precision Screwdrivers: Menggunakan material baja S2 tahan aus. Ukuran yang paling sering digunakan pada smartphone adalah Phillips PH000, Torx T3, Torx T4, dan Pentalobe P2.',
          '• Curved ESD Tweezers: Pinset anti-statis berlapis cat isolator karbon untuk menangani strip lem perekat baterai dan baut mini.'
        ],
        technicalTip: 'HUKUM BESI TEKNISI SMARTPHONE: JANGAN PERNAH gunakan pinset atau obeng logam untuk mencungkil konektor baterai! Selalu gunakan spudger plastik non-konduktif!'
      },
      {
        title: '3. Perlengkapan Konsumabel & Kimia (Consumables & Solvents)',
        content: [
          '• Isopropyl Alcohol (IPA) 99%: Pelarut organik kemurnian tinggi tanpa kandungan air. Cepat menguap dan efektif melemahkan ikatan perekat karet tanpa menyebabkan korosi pada tembaga sirkuit.',
          '• Stretch-Release Adhesive Strips: Lem khusus bertipe karet silikon yang dirancang untuk memanjang saat ditarik mendatar, sehingga melepaskan ikatan lem seketika tanpa perlu dicungkil keras.',
          '• Anti-Static Wrist Strap: Gelang peredam muatan listrik tubuh yang dihubungkan ke grounding meja kerja.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Alat manakah yang PALING AMAN dan WAJIB digunakan untuk melepaskan soket konektor baterai dari motherboard?',
        options: [
          'Pinset presisi logam berujung lancip',
          'Spudger plastik nilon anti-statis (ESD-safe)',
          'Mata obeng minus plat logam kecil',
          'Kuku tangan tanpa sarung tangan'
        ],
        correctIndex: 1,
        explanation: 'Spudger plastik nilon adalah alat isolator non-konduktif sehingga tidak akan menimbulkan percikan api atau korsleting saat bersentuhan dengan pin baterai bertegangan.'
      },
      {
        id: 'q2-2',
        question: 'Mengapa teknisi TIDAK BOLEH memasukkan opening pick lebih dari 4 mm ke dalam bodi samping smartphone?',
        options: [
          'Karena pick plastik akan cepat tumpul',
          'Karena berisiko merobek kabel fleksibel LCD, sensor, atau menusuk kantong baterai di dalamnya',
          'Karena dapat mengubah frekuensi sinyal Wi-Fi',
          'Karena baterai akan otomatis terformat sistemnya'
        ],
        correctIndex: 1,
        explanation: 'Di balik celah penutup belakang terdapat kabel fleksibel layar, sensor volume/daya, dan dinding baterai yang hanya berjarak beberapa milimeter dari tepi luar frame.'
      }
    ],
    keyTakeaways: [
      'Pemanas suhu terkontrol disetel maksimal pada 70°C – 80°C.',
      'Hanya alat berbahan nilon plastik non-konduktif yang diizinkan untuk melepas soket konektor baterai.',
      'Lem perekat baterai jenis stretch-release harus ditarik mendatar pada sudut rendah (15°–30°).',
      'Cairan Isopropil Alkohol (IPA) 99% digunakan secara hemat (1–2 tetes) bila perekat putus.'
    ]
  },
  {
    id: 'ch3',
    number: '03',
    title: 'Prosedur Keselamatan Kerja & Mitigasi Risiko',
    subtitle: 'Standar K3 Reparasi Baterai Lithium & Protokol Penanganan Darurat',
    durationMinutes: 15,
    description: 'Modul ini adalah SYARAT MUTLAK sebelum memasuki simulator. Pelajari bahaya thermal runaway, pemadaman api baterai lithium, inspeksi fisik baterai berbahaya, dan perlindungan ESD.',
    learningObjectives: [
      'Menjelaskan mekanisme terjadinya thermal runaway pada baterai lithium-ion.',
      'Menerapkan 8 pilar keselamatan kerja bengkel reparasi smartphone.',
      'Melakukan inspeksi visual dan taktil sebelum memulai pembongkaran.',
      'Mengetahui tindakan isolasi darurat saat baterai mulai berasap atau mendesis.',
      'Menyelesaikan checklist keselamatan wajib untuk membuka akses simulator.'
    ],
    sections: [
      {
        title: '1. Fenomena Thermal Runaway pada Sel Baterai Lithium',
        content: [
          'Thermal runaway adalah reaksi berantai eksotermik di mana kenaikan suhu di dalam sel baterai memicu penguraian elektrolit, melepaskan oksigen dan panas secara eksponensial dalam hitungan detik.',
          'Pemicu utama pada meja reparasi:',
          '1. Tertusuknya separator akibat penggunaan pinset logam atau silet.',
          '2. Baterai tertekuk tajam (>15°) saat teknisi memaksakan mencungkil baterai yang lemnya belum lepas.',
          '3. Panas eksternal berlebihan (>100°C) dari heat gun yang diarahkan langsung ke sel baterai.',
          '4. Hubungan singkat (short circuit) pin baterai akibat perkakas logam.'
        ],
        safetyAlert: 'Baterai lithium TIDAK MEMERLUKAN OKSIGEN LUAR untuk terbakar karena katodanya melepaskan molekul oksigen saat terurai. Pemadam api CO2 atau air standar tidak efektif mendinginkan reaksi inti kimia baterai!'
      },
      {
        title: '2. Protokol Tanggap Darurat Kebakaran Baterai',
        content: [
          'Jika Anda melihat asap putih tebal, mendengar bunyi mendesis, atau tercium bau kimia manis menusuk dari baterai:',
          'LANGKAH 1: JANGAN PANIK, lepaskan alat dan mundur dari jangkauan percikan api.',
          'LANGKAH 2: Segera evakuasi perangkat menggunakan penjepit panjang ke dalam KOTAK LOGAM BERISI PASIR KERING (Sand Bucket / Fireproof LiPo Bag).',
          'LANGKAH 3: Jangan menghirup asap karena gas tersebut mengandung hidrogen fluorida (HF) yang sangat beracun bagi paru-paru.',
          'LANGKAH 4: Biarkan baterai mendingin minimal 60 menit di area luar berventilasi terbuka sebelum dibuang ke penampungan limbah B3 resmi.'
        ]
      },
      {
        title: '3. Aturan Emas Keselamatan (The Golden Rules of Battery Repair)',
        content: [
          '• Selalu lepaskan konektor baterai SEBELUM menyentuh modul kamera, layar, atau antena apapun.',
          '• Jangan pernah memakai cincin logam, jam tangan rantai besi, atau gelang konduktif saat bekerja di dekat motherboard aktif.',
          '• Jangan pernah mengisi daya baterai yang telah menunjukkan tanda fisik pembengkakan.',
          '• Bekerja pada meja kerja yang dilapisi matras silikon tahan panas dengan pembumian statis yang baik.'
        ],
        diagramType: 'safety-rules'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Media pemadam apakah yang PALING DISARANKAN untuk mengisolasi kebakaran sel baterai lithium di meja reparasi teknisi?',
        options: [
          'Air mineral botolan dalam jumlah sedikit',
          'Pasir kering khusus atau kantong tahan api (Fireproof LiPo Bag/Sand)',
          'Semprotan minyak pelumas WD-40',
          'Kain lap katun kering'
        ],
        correctIndex: 1,
        explanation: 'Pasir kering menimbun sel baterai yang terbakar, menahan lonjakan panas, dan mengurung percikan logam membara tanpa memicu reaksi kimia lanjutan.'
      },
      {
        id: 'q3-2',
        question: 'Jika baterai smartphone pelanggan sudah menggembung tebal hingga mendesak kaca belakang terbuka, apakah boleh dipanaskan di atas heat mat 80°C?',
        options: [
          'Boleh, asal dipanaskan selama 30 menit penuh',
          'TIDAK BOLEH SAMA SEKALI! Baterai kembung sudah rapuh dan pemanasan dapat memicu ledakan spontan',
          'Boleh, asalkan baterai ditusuk jarum terlebih dahulu untuk membuang gasnya',
          'Boleh, asalkan layar ponsel tetap menyala'
        ],
        correctIndex: 1,
        explanation: 'Pemanasan pada baterai yang telah kembung menaikkan tekanan gas internal secara drastis dan meluruhkan separator yang sudah menipis, memicu kebakaran spontan.'
      }
    ],
    keyTakeaways: [
      'Thermal runaway dapat terjadi dalam hitungan detik bila separator baterai tertusuk.',
      'Baterai kembung tidak boleh dipanaskan atau ditusuk dengan jarum!',
      'Gunakan pasir kering atau wadah isolasi logam bila terjadi kebakaran baterai.',
      'Konektor baterai harus selalu dilepas pertama kali setelah cover pelindung dibuka.'
    ]
  },
  {
    id: 'ch4',
    number: '04',
    title: 'Standar Operasional Prosedur (SOP) Penggantian Baterai',
    subtitle: 'Alur Kerja Terstandar 16 Langkah Pembongkaran Hingga Perakitan',
    durationMinutes: 25,
    description: 'Pelajari alur kerja resmi pembongkaran, pemetaan sekrup pelindung, teknik penarikan perekat pull-tabs yang benar, pemasangan baterai baru, dan perakitan kembali.',
    learningObjectives: [
      'Menguasai 16 tahapan kerja sistematis penggantian baterai smartphone.',
      'Melakukan pemetaan posisi sekrup mikro (Screw Mapping) agar tidak salah pasang.',
      'Menerapkan teknik penarikan lem tarik (Pull-Tab) sudut rendah 15°.',
      'Mengetahui tindakan tepat jika strip lem perekat putus di tengah jalan.',
      'Memastikan pemasangan baterai baru sejajar tanpa menekan kabel fleksibel.'
    ],
    sections: [
      {
        title: '1. Tahap 1 - 5: Persiapan & Pembukaan Cangkang Luar',
        content: [
          'Langkah 1: Bersihkan meja kerja, nyalakan exhaust fan/ventilasi, dan kenakan sarung tangan nitril antistatis.',
          'Langkah 2: Verifikasi model spesifik smartphone dan cek nomor part baterai pengganti yang kompatibel.',
          'Langkah 3: Matikan daya smartphone secara penuh (Power Off).',
          'Langkah 4: Lepaskan tempat kartu SIM (SIM Tray) menggunakan SIM ejector pin.',
          'Langkah 5: Letakkan bagian belakang ponsel di atas heat pad bersuhu 75°C selama 3–4 menit hingga lem melunak.'
        ]
      },
      {
        title: '2. Tahap 6 - 8: Pembukaan Back Cover & Pemutusan Sumber Tenaga',
        content: [
          'Langkah 6: Pasang suction cup di bagian bawah kaca belakang, tarik perlahan hingga terbentuk celah 0.5 mm, lalu selipkan opening pick plastik.',
          'Langkah 7: Geser pick plastik mengelilingi perimeter ponsel. Waspadai kabel fleksibel sensor sidik jari atau tombol power di sisi bodi!',
          'Langkah 8: Buka sekrup penahan pelat pelindung (shield bracket) motherboard. Petakan posisi masing-masing baut pada matras magnetik.',
          'Langkah 9: ANGKAT KONEKTOR BATERAI segera menggunakan ujung pipih spudger nilon. Dengan ini, seluruh sirkuit ponsel telah bebas dari tegangan listrik!'
        ],
        technicalTip: 'Setiap sekrup pada bracket smartphone memiliki panjang yang berbeda (misal 1.2 mm vs 1.8 mm). Memasang sekrup yang terlalu panjang dapat menembus sirkuit PCB motherboard (Long Screw Damage) yang menyebabkan ponsel mati total permanen!'
      },
      {
        title: '3. Tahap 9 - 12: Pelepasan Baterai Lama & Pemasangan Baterai Baru',
        content: [
          'Langkah 10: Cari ujung lidah perekat (pull-tabs) di ujung atas atau bawah baterai. Buka lipatan lidah perekat menggunakan pinset tumpul.',
          'Langkah 11: Tarik strip perekat secara perlahan, stabil, dan MENDATAR (sudut tarik 15°–20° terhadap bodi ponsel). Biarkan karet meregang hingga lepas sempurna. Jangan menarik ke atas!',
          'Langkah 12: Angkat baterai lama yang sudah bebas dari lem. Bersihkan sisa kotoran atau serpihan perekat lama di dalam kompartemen baterai.',
          'Langkah 13: Pasang strip perekat baterai baru (stretch-release adhesive) di bagian bawah baterai pengganti baru.',
          'Langkah 14: Tempatkan baterai baru ke dalam kompartemen. Tips: Pasang sementara soket konektor baterai ke motherboard SEBELUM menekan baterai ke lem, agar posisi kabel fleksibel pas dan tidak tegang.'
        ],
        diagramType: 'sop-steps'
      },
      {
        title: '4. Tahap 13 - 16: Perakitan Kembali & Pengecekan Awal',
        content: [
          'Langkah 15: Pasang kembali pelat pelindung logam (shield bracket) dan kencangkan sekrup sesuai peta posisi aslinya.',
          'Langkah 16: Pasang perekat baru pada frame back cover, rekatkan kembali penutup belakang, dan lakukan uji fungsionalitas dasar.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Bagaimana teknik terbaik menarik strip perekat baterai (pull-tabs) agar karet tidak mudah putus?',
        options: [
          'Ditarik tegak lurus 90° ke atas sekuat tenaga',
          'Ditarik mendatar perlahan dengan sudut rendah (sekitar 15° - 30°) mengikuti kontur bodi',
          'Dipanaskan dengan korek api lalu ditarik dengan tang kawat',
          'Ditusuk dari samping menggunakan pisau cutter'
        ],
        correctIndex: 1,
        explanation: 'Menarik mendatar pada sudut rendah memanfaatkan elastisitas perekat akrilik stretch-release, sehingga lem meregang dan lepas tanpa putus di bawah baterai.'
      },
      {
        id: 'q4-2',
        question: 'Mengapa teknisi disarankan memasang sementara konektor fleksibel baterai ke motherboard sebelum menekan baterai baru ke perekat di bodi?',
        options: [
          'Agar baterai langsung terisi daya secara nirkabel',
          'Untuk memastikan letak dan panjang kabel fleksibel baterai pas presisi sehingga tidak tertarik atau tertekuk tajam saat baterai menempel permanen',
          'Untuk menguji apakah sekrup berkarat',
          'Untuk mengunci bodi ponsel secara magnetik'
        ],
        correctIndex: 1,
        explanation: 'Jika baterai ditempelkan terlebih dahulu secara sembarangan, kabel fleksibel konektor bisa kurang panjang atau miring, memaksakan konektor masuk dalam kondisi tegang yang mudah lepas atau patah.'
      }
    ],
    keyTakeaways: [
      'Alur kerja harus berurutan: Matikan daya -> Lepas SIM tray -> Panaskan -> Buka cover -> Putus baterai.',
      'Petakan sekrup secara akurat untuk menghindari Long Screw Damage pada motherboard.',
      'Tarik perekat pull-tab mendatar dengan sudut 15°–20° secara perlahan.',
      'Posisikan konektor baterai sebelum merekatkan bodi baterai baru.'
    ]
  },
  {
    id: 'ch5',
    number: '05',
    title: 'Kontrol Kualitas Pasca-Reparasi (Quality Control)',
    subtitle: 'Verifikasi Daya, Pengisian Arus Nyata, Termal & Kalibrasi Baterai Baru',
    durationMinutes: 15,
    description: 'Pekerjaan teknisi belum selesai saat baut terakhir terpasang. Pelajari 7 pilar Quality Control wajib sebelum unit diserahkan kepada pelanggan.',
    learningObjectives: [
      'Melakukan inspeksi visual celah dan kerapatan back cover.',
      'Menguji daya hidup (Power-On Verification) dan deteksi persentase baterai oleh OS.',
      'Mengukur arus dan voltase charging aktual menggunakan USB Current Tester / Multimeter.',
      'Memverifikasi fungsi sensor suhu internal (Battery Temperature Sensor).',
      'Mengedukasi pelanggan tentang prosedur kalibrasi baterai siklus pertama.'
    ],
    sections: [
      {
        title: '1. Tujuh Titik Verifikasi QC Wajib (7 Mandatory QC Points)',
        content: [
          'Sebelum ponsel dikembalikan ke konsumen atau dinyatakan lulus perbaikan:',
          '1. Visual Inspection: Tidak ada goresan baru, celah back cover rapat merata tanpa sisa lem berlepotan, lensa kamera bersih dari debu/sidik jari.',
          '2. Power-On Boot Test: Ponsel menyala normal hingga home screen tanpa hambatan bootloop.',
          '3. Battery Detection: Sistem Operasi (Android Settings / iOS Battery Health) membaca nomor seri baterai dan persentase kapasitas dengan benar.',
          '4. Fast Charging & Current Draw Test: Sambungkan ponsel ke charger dengan USB Power Meter tester. Arus pengisian harus stabil (misal 5V/2A atau 9V/2A Fast Charge).',
          '5. Thermal Monitoring: Pantau suhu bodi ponsel selama 10 menit pengisian daya. Suhu tidak boleh melebihi 42°C.',
          '6. Functional Sub-System: Uji sensor sidik jari, kamera belakang, NFC, dan speaker yang posisinya berdekatan dengan area kerja cover belakang.',
          '7. Discharge Uniformity: Pastikan persentase baterai tidak drop drastis dari 80% ke 40% saat membuka aplikasi beban tinggi.'
        ],
        diagramType: 'qc-checklist'
      },
      {
        title: '2. Cara Mengetahui Baterai Pengganti Cacat (Defective Unit)',
        content: [
          'Tanda-tanda baterai baru bermasalah yang harus segera diretur:',
          '• Indikator baterai stuck di 50% atau tanda tanya (?) pada lambang baterai.',
          '• Muncul notifikasi "Battery temperature too low / too high, charging paused". Ini menunjukkan termistor NTC pada sirkuit BMS baterai mati atau tidak kompatibel.',
          '• Ponsel mati mendadak saat charger dicabut meski persentase menunjukkan 100%.'
        ],
        technicalTip: 'Gunakan aplikasi diagnostik hardware (seperti Ampere, AIDA64, atau AccuBattery) untuk membaca suhu real-time baterai dan arus miliampere (mA) masuk.'
      },
      {
        title: '3. Prosedur Kalibrasi Baterai untuk Pelanggan (Break-In Cycle)',
        content: [
          'Berikan instruksi tertulis kepada pemilik ponsel:',
          '1. Gunakan ponsel hingga kapasitas baterai mencapai kisaran 10% – 15% (jangan biarkan hingga mati total 0%).',
          '2. Hubungkan pengisi daya original hingga mencapai 100% secara kontinu tanpa dicabut-pasang.',
          '3. Biarkan tetap terhubung ke charger selama 30 menit tambahan setelah mencapai 100% agar BMS menyeimbangkan muatan sel (trickle charge).',
          '4. Ulangi siklus normal ini selama 2–3 hari pertama agar chip kalkulator kapasitas OS terkalibrasi akurat.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Jika setelah perbaikan baterai baru ponsel menampilkan peringatan "Charging paused. Battery temperature too low" padahal ponsel dalam suhu ruangan, apa penyebab teknisnya?',
        options: [
          'Layar LCD mengalami kerusakan backlight',
          'Sensor suhu termistor (NTC) pada BMS baterai baru putus atau nilai resistansinya tidak sesuai standar ponsel',
          'Kartu memori SD Card penuh',
          'Baut cover belakang dipasang terlalu kencang'
        ],
        correctIndex: 1,
        explanation: 'Jalur data baterai memuat sensor termistor NTC. Jika pin data tidak terhubung atau nilai resistor NTC salah, motherboard menganggap suhu berada di luar ambang batas aman dan menghentikan pengisian daya untuk pencegahan kebakaran.'
      },
      {
        id: 'q5-2',
        question: 'Berapakah suhu aman maksimal baterai smartphone saat sedang melakukan pengisian daya cepat (Fast Charging)?',
        options: [
          'Suhu tidak boleh melebihi sekitar 42°C – 45°C',
          'Suhu normal hingga 95°C',
          'Suhu wajib berada di bawah 0°C',
          'Suhu bebas tidak terbatas asalkan layar mati'
        ],
        correctIndex: 0,
        explanation: 'Suhu operasional aman saat fast charging berada di rentang 35°C – 42°C. Suhu di atas 45°C memicu degradasi kimia cepat dan bila melampaui 60°C sistem proteksi wajib memutus aliran listrik.'
      }
    ],
    keyTakeaways: [
      'QC mencakup 7 pilar: Visual, Power-On, Deteksi OS, Pengisian Daya, Suhu, Sub-sistem, dan Pelepasan daya stabil.',
      'Gunakan USB Power Meter untuk memverifikasi aliran arus dan tegangan nyata.',
      'Peringatan suhu palsu menandakan masalah pada pin data termistor NTC pada BMS baterai.',
      'Edukasi pelanggan mengenai kalibrasi baterai 100% pada 2–3 siklus awal.'
    ]
  }
];

export const EXAM_QUESTION_BANK: ExamQuestion[] = [
  {
    id: 'exam-01',
    chapterId: 'ch1',
    category: 'Teknologi Baterai',
    type: 'multiple-choice',
    question: 'Tipe baterai yang paling banyak digunakan pada smartphone modern berdesain tipis adalah...',
    options: [
      'Nikel-Kadmium (NiCd)',
      'Lithium-Polymer (Li-Po) Pouch Cell',
      'Lead-Acid Kering',
      'Nikel-Metal Hidrida (NiMH)'
    ],
    correctAnswers: [1],
    explanation: 'Lithium-Polymer (Li-Po) pouch cell menggunakan kemasan aluminium foil fleksibel yang sangat tipis dan ringan dengan densitas energi tinggi.'
  },
  {
    id: 'exam-02',
    chapterId: 'ch1',
    category: 'Teknologi Baterai',
    type: 'multiple-choice',
    question: 'Apakah fungsi utama dari sirkuit BMS (Battery Management System) pada modul baterai smartphone?',
    options: [
      'Menguatkan sinyal antena 5G',
      'Mencegah kondisi overcharge, over-discharge, arus berlebih, dan memantau suhu sel',
      'Mengurangi konsumsi RAM sistem operasi',
      'Mengatur kecerahan panel layar OLED'
    ],
    correctAnswers: [1],
    explanation: 'BMS adalah sirkuit elektronik proteksi pintar yang memutus arus jika tegangan sel melebihi 4.45V, turun di bawah 2.8V, atau mengalami lonjakan arus pendek.'
  },
  {
    id: 'exam-03',
    chapterId: 'ch1',
    category: 'Spesifikasi Baterai',
    type: 'multiple-choice',
    question: 'Jika sebuah baterai smartphone memiliki spesifikasi 4.000 mAh dan voltase nominal 3.85V, berapakah total energi tersimpannya dalam Watt-Hour (Wh)?',
    options: [
      '15.4 Wh',
      '7.7 Wh',
      '40.0 Wh',
      '1.54 Wh'
    ],
    correctAnswers: [0],
    explanation: 'Rumus: Wh = (mAh × V) ÷ 1.000 = (4.000 × 3.85) ÷ 1.000 = 15.4 Wh.'
  },
  {
    id: 'exam-04',
    chapterId: 'ch1',
    category: 'Gejala Kerusakan',
    type: 'multiple-choice',
    question: 'Kondisi pelepasan gas di dalam kantong baterai (gassing) yang menyebabkan baterai menggembung umumnya disebabkan oleh...',
    options: [
      'Ponsel sering dimatikan saat malam hari',
      'Penguraian elektrolit akibat usia pakai, panas berlebih, atau overcharging berkepanjangan',
      'Penggunaan wallpaper bertema terang',
      'Penyimpanan nomor kontak terlalu banyak'
    ],
    correctAnswers: [1],
    explanation: 'Ketika elektrolit terdegradasi karena panas tinggi atau reaksi kimia abnormal, gas mudah terbakar (seperti H2 dan CO2) terperangkap di dalam kantong tertutup sehingga mengembang tebal.'
  },
  {
    id: 'exam-05',
    chapterId: 'ch2',
    category: 'Peralatan Reparasi',
    type: 'multiple-choice',
    question: 'Mengapa teknisi dilarang keras menggunakan pinset logam untuk mencungkil soket baterai?',
    options: [
      'Karena pinset logam lebih mahal harganya',
      'Ujung logam bersifat konduktor listrik dan dapat seketika menimbulkan percikan api dan korsleting komponen motherboard',
      'Karena pinset logam membuat konektor menjadi kotor',
      'Karena pinset logam tidak memiliki magnet'
    ],
    correctAnswers: [1],
    explanation: 'Logam menghantarkan arus listrik. Menyentuh pin baterai aktif dengan logam menghubungkan kutub positif dan negatif secara langsung, merusak IC daya (PMIC).'
  },
  {
    id: 'exam-06',
    chapterId: 'ch2',
    category: 'Peralatan Reparasi',
    type: 'multiple-choice',
    question: 'Berapakah suhu aman yang direkomendasikan pada Controlled Heat Pad untuk melunakkan lem penutup belakang smartphone?',
    options: [
      '30°C – 40°C',
      '70°C – 80°C',
      '140°C – 160°C',
      '200°C – 250°C'
    ],
    correctAnswers: [1],
    explanation: 'Suhu 70°C – 80°C selama 3–5 menit sudah cukup melunakkan lem perekat struktural tanpa merusak panel display, cat bodi, atau komponen baterai.'
  },
  {
    id: 'exam-07',
    chapterId: 'ch2',
    category: 'Peralatan Reparasi',
    type: 'multiple-choice',
    question: 'Cairan kimia manakah yang paling aman digunakan teknisi untuk melarutkan sisa perekat baterai yang putus?',
    options: [
      'Air sabun deterjen cair',
      'Alkohol Isopropil (IPA) 99% murni',
      'Minyak goreng kelapa sawit',
      'Aseton pembersih cat kuku konsentrasi tinggi'
    ],
    correctAnswers: [1],
    explanation: 'IPA 99% cepat menguap, tidak meninggalkan residu korosif, dan tidak merusak jalur tembaga PCB jika digunakan secara terukur (1–2 tetes).'
  },
  {
    id: 'exam-08',
    chapterId: 'ch3',
    category: 'Prosedur Keselamatan',
    type: 'multiple-choice',
    question: 'Apa langkah pertama yang WAJIB diambil jika baterai yang sedang ditangani mulai mengeluarkan asap putih tebal dan mendesis di meja kerja?',
    options: [
      'Menyiram baterai dengan segelas air mineral',
      'Segera mundur, ambil penjepit panjang dan evakuasi baterai ke kotak logam berisi pasir kering',
      'Meniup asap sekuat tenaga dengan mulut',
      'Menutup baterai dengan buku tebal'
    ],
    correctAnswers: [1],
    explanation: 'Baterai yang mengalami thermal runaway harus segera diisolasi ke wadah tahan api logam/pasir kering agar percikan api tidak menyambar benda lain.'
  },
  {
    id: 'exam-09',
    chapterId: 'ch3',
    category: 'Prosedur Keselamatan',
    type: 'multiple-choice',
    question: 'Setelah penutup pelindung motherboard dibuka, komponen sambungan manakah yang WAJIB dilepas pertama kali?',
    options: [
      'Konektor kamera depan',
      'Konektor fleksibel baterai',
      'Kabel koaksial antena sinyal',
      'Konektor layar sentuh (touchscreen)'
    ],
    correctAnswers: [1],
    explanation: 'Memutuskan konektor baterai mematikan seluruh tegangan listrik aktif pada motherboard, mencegah korsleting saat komponen lain dilepas.'
  },
  {
    id: 'exam-10',
    chapterId: 'ch3',
    category: 'Prosedur Keselamatan',
    type: 'true-false',
    question: 'Benar atau Salah: Baterai yang sudah kembung parah boleh dipanaskan di atas heat mat 90°C asalkan layarnya dalam keadaan mati.',
    options: [
      'Benar',
      'Salah'
    ],
    correctAnswers: [1],
    explanation: 'SALAH BESAR. Baterai kembung tidak boleh dipanaskan karena peningkatan tekanan gas internal dapat memicu ledakan spontan seketika.'
  },
  {
    id: 'exam-11',
    chapterId: 'ch4',
    category: 'SOP Penggantian',
    type: 'multiple-choice',
    question: 'Apa akibat fatal dari kesalahan "Long Screw Damage" pada perakitan smartphone?',
    options: [
      'Membuat baterai lebih cepat penuh',
      'Sekrup yang terlalu panjang menembus lapisan jalur tembaga di dalam sirkuit PCB motherboard hingga putus jalur atau konslet',
      'Warna casing ponsel menjadi pudar',
      'Kapasitas RAM smartphone berkurang otomatis'
    ],
    correctAnswers: [1],
    explanation: 'Motherboard smartphone terdiri dari multi-layer PCB. Sekrup yang tertukar dan terlalu panjang akan mengebor menembus jalur tembaga halus di bawah lubang baut.'
  },
  {
    id: 'exam-12',
    chapterId: 'ch4',
    category: 'SOP Penggantian',
    type: 'multiple-choice',
    question: 'Sudut tarikan berapakah yang paling ideal saat menarik strip lem perekat baterai (pull-tab) agar tidak mudah putus?',
    options: [
      'Sudut vertikal 90° tegak lurus',
      'Sudut rendah mendatar berkisar 15° – 30° searah bodi',
      'Sudut terbalik 180° ke arah belakang ponsel',
      'Sudut acak melingkar'
    ],
    correctAnswers: [1],
    explanation: 'Sudut rendah 15°–30° mendistribusikan tegangan geser (shear tension) secara merata pada karet perekat stretch-release tanpa menyobeknya.'
  },
  {
    id: 'exam-13',
    chapterId: 'ch4',
    category: 'SOP Penggantian',
    type: 'multiple-choice',
    question: 'Sebelum menekan baterai baru ke dalam perekat bodi kompartemen, tindakan apakah yang dianjurkan untuk mencegah ketegangan fleksibel?',
    options: [
      'Menyolder kabel konektor baterai',
      'Memasang sementara soket konektor baterai ke motherboard untuk menetapkan posisi presisi',
      'Merendam baterai baru dalam alkohol 99%',
      'Mengikis pin emas konektor dengan amplas'
    ],
    correctAnswers: [1],
    explanation: 'Menghubungkan soket sementara memastikan kabel fleksibel baterai tidak tertarik kaku, miring, atau tertekuk tajam sebelum baterai terpasang permanen.'
  },
  {
    id: 'exam-14',
    chapterId: 'ch4',
    category: 'SOP Penggantian',
    type: 'multiple-choice',
    question: 'Bahan perekat apakah yang PALING TIDAK BOLEH digunakan untuk memasang baterai baru?',
    options: [
      'Strip perekat stretch-release khusus baterai OEM',
      'Lem cair jenis Super Glue (Cyanoacrylate / Lem Korea) atau lem bakar silikon tebal',
      'Pre-cut adhesive tape berbahan akrilik khusus reparasi',
      'Tape busa tipis berlabel aman elektronik'
    ],
    correctAnswers: [1],
    explanation: 'Lem super glue (sianoakrilat) mengeras kaku seperti batu, merusak sel baterai, melepaskan uap korosif, dan membuat baterai mustahil diganti di masa depan tanpa merusak ponsel.'
  },
  {
    id: 'exam-15',
    chapterId: 'ch5',
    category: 'Kontrol Kualitas (QC)',
    type: 'multiple-choice',
    question: 'Alat apakah yang paling akurat untuk menguji apakah arus pengisian daya smartphone mengalir normal sesuai standar fast charging?',
    options: [
      'Penggaris presisi',
      'USB Digital Power Meter / Current Voltage Tester',
      'Termometer inframerah ruangan',
      'Mikroskop optik stereoskopik'
    ],
    correctAnswers: [1],
    explanation: 'USB Digital Power Meter menampilkan nilai voltase (V), arus (A), daya (Watt), dan protokol fast charge yang sedang aktif secara real-time.'
  },
  {
    id: 'exam-16',
    chapterId: 'ch5',
    category: 'Kontrol Kualitas (QC)',
    type: 'multiple-choice',
    question: 'Muncul peringatan "Suhu baterai terlalu rendah, pengisian daya dihentikan" saat ponsel dicas. Bagian manakah pada baterai baru yang kemungkinan besar rusak atau bermasalah?',
    options: [
      'Plastik pembungkus luar baterai',
      'Jalur sensor termistor (NTC) pada sirkuit BMS baterai',
      'Pin antena GPS di pojok atas ponsel',
      'Baut pelindung kamera'
    ],
    correctAnswers: [1],
    explanation: 'Sensor NTC (Negative Temperature Coefficient) di papan BMS baterai bertugas melaporkan suhu ke prosesor. Jika sirkuitnya putus, nilai terbaca abnormal (suhu terlalu dingin/panas).'
  },
  {
    id: 'exam-17',
    chapterId: 'ch5',
    category: 'Kontrol Kualitas (QC)',
    type: 'true-false',
    question: 'Benar atau Salah: Pelanggan harus diinstruksikan untuk selalu mengosongkan baterai baru hingga mati total 0% setiap hari selama satu bulan penuh.',
    options: [
      'Benar',
      'Salah'
    ],
    correctAnswers: [1],
    explanation: 'SALAH. Menguras baterai lithium-ion hingga 0% secara berulang mempercepat degradasi sel dan memperpendek usia baterai. Siklus sehat adalah mengisi daya pada kisaran 15%–20%.'
  },
  {
    id: 'exam-18',
    chapterId: 'ch2',
    category: 'Peralatan Reparasi',
    type: 'multiple-choice',
    question: 'Alat apakah yang paling tepat untuk mengangkat kaca belakang smartphone setelah perekatnya dilunakkan dengan panas?',
    options: [
      'Tang jepit tang buaya',
      'Heavy-Duty Suction Cup (Kop Penghisap Vakum)',
      'Obeng flathead besar',
      'Cutter silet tajam'
    ],
    correctAnswers: [1],
    explanation: 'Suction cup menciptakan gaya tarik vakum tanpa merusak permukaan kaca dan memberikan ruang untuk menyelipkan pick plastik.'
  },
  {
    id: 'exam-19',
    chapterId: 'ch3',
    category: 'Prosedur Keselamatan',
    type: 'multiple-choice',
    question: 'Apa fungsi utama penggunaan gelang antistatis (ESD Wrist Strap) yang terhubung ke grounding pada meja teknisi?',
    options: [
      'Membuat tangan teknisi terasa lebih hangat',
      'Membuang akumulasi muatan listrik statis tubuh teknisi secara aman ke tanah agar tidak merusak sirkuit IC mikro',
      'Mengurangi getaran saat memasang sekrup',
      'Menjaga agar baut tidak terjatuh'
    ],
    correctAnswers: [1],
    explanation: 'Listrik elektrostatik pada tubuh manusia dapat mencapai ribuan volt yang sanggup merusak gerbang silikon pada IC motherboard smartphone tanpa terasa oleh teknisi.'
  },
  {
    id: 'exam-20',
    chapterId: 'ch4',
    category: 'SOP Penggantian',
    type: 'multiple-choice',
    question: 'Jika salah satu strip perekat baterai putus saat ditarik dan baterai masih menempel kuat, tindakan manakah yang BENAR dan AMAN?',
    options: [
      'Cungkil baterai dengan obeng logam sekuat tenaga sampai baterai tertekuk dua',
      'Teteskan 1–2 tetes Isopropil Alkohol (IPA) 99% di tepi baterai, tunggu 1 menit melunak, lalu gunakan flos gigi nilon atau spudger plastik pipih dari bawah sel',
      'Bakar bagian bawah ponsel dengan korek gas',
      'Pukul bodi smartphone dengan palu karet'
    ],
    correctAnswers: [1],
    explanation: 'IPA 99% melarutkan perekat secara kimiawi tanpa merusak komponen. Bersama benang nilon atau spudger tumpul, baterai dapat diangkat tanpa ditekuk atau ditusuk.'
  }
];
