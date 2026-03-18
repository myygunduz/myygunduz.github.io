// ═══════════════════════════════════════════════════════════
// 📚 StudyDeck — BİYOKİMYA 2 (Temizlenmiş ve Kapsamlı Set)
// ═══════════════════════════════════════════════════════════

const SUBJECTS = [
  {
    id: "biyokimya_karbonhidratlar",
    title: "Biyokimya: Karbonhidratlar",
    icon: "🍞",
    color: "#e67e22",
    description: "50 Soruluk Kapsamlı Bilgi Testi - Karbonhidratlar",
    questions: [
      {
        id: "k1",
        question:
          "Yeryüzünde en çok bulunan biyomoleküller aşağıdakilerden hangisidir?",
        options: [
          "Proteinler",
          "Lipitler",
          "Karbonhidratlar",
          "Nükleik asitler",
        ],
        correct: 2,
        explanation:
          "Karbonhidratlar ve glikobiyoloji yeryüzünde en çok bulunan biyomoleküllerdir[cite: 1, 2, 3].",
      },
      {
        id: "k2",
        question:
          "Karbonhidrat polimerleri (glikanlar) eklemlerde hangi görevi üstlenir?",
        options: [
          "Enerji üretimi",
          "Kayganlaştırıcı",
          "Isı yalıtımı",
          "Sinyal iletimi",
        ],
        correct: 1,
        explanation:
          "Karbonhidrat polimerleri eklemlerde kayganlaştırıcıdır[cite: 7, 9].",
      },
      {
        id: "k3",
        question:
          "Protein ve lipitlere kovalent bağlanarak hücredeki yeri belirleyen sinyaller olarak davranan moleküller hangisidir?",
        options: [
          "Glikokonjugatlar",
          "Monosakkaritler",
          "Ketozlar",
          "Aldozlar",
        ],
        correct: 0,
        explanation:
          "Glikokonjugatlar (karmaşık karbonhidrat polimerleri) protein ve lipitlere kovalent bağlanır ve sinyaller olarak davranır[cite: 11, 12].",
      },
      {
        id: "k4",
        question:
          "Karbonil grubu zincirin sonunda yer alan şekerlere ne ad verilir?",
        options: ["Ketoz", "Trioz", "Aldoz", "Pentoz"],
        correct: 2,
        explanation:
          "Karbonil grubu zincirin sonundaysa aldehit grubunda aldoz olarak adlandırılır[cite: 22].",
      },
      {
        id: "k5",
        question:
          "En basit monosakkarit olan ketotrioz aşağıdakilerden hangisidir?",
        options: ["Gliseraldehit", "Dihidroksiaseton", "Eritroz", "Riboz"],
        correct: 1,
        explanation:
          "En basit monosakkaritler 3 karbonludur ve ketotrioz örneği dihidroksiasetondur[cite: 24, 30].",
      },
      {
        id: "k6",
        question:
          "Hangi monosakkarit asimetrik karbon atomu içermediği için optik olarak aktif değildir?",
        options: [
          "D-Gliseraldehit",
          "D-Riboz",
          "Dihidroksiaseton",
          "D-Fruktoz",
        ],
        correct: 2,
        explanation:
          "Dihidroksiaseton hariç tüm monosakkaritlerin bir veya birden fazla asimetrik karbon atomu vardır ve optikçe aktiftir[cite: 65].",
      },
      {
        id: "k7",
        question:
          "D ve L izomerliği hangi karbon atomunun düzenlenmesine göre belirlenir?",
        options: [
          "Karbonil karbonu",
          "Anomerik karbon",
          "En uzaktaki kiral merkez",
          "C-2 karbonu",
        ],
        correct: 2,
        explanation:
          "Monosakkaritlerin stereoizomerleri, karbonil grubundan en uzaktaki kiral merkezin düzenlenmesine göre belirlenir[cite: 71, 72, 73].",
      },
      {
        id: "k8",
        question:
          "Sadece tek bir karbon atomu etrafındaki düzenlenişi farklı olan şekerlere ne denir?",
        options: ["Anomer", "Enantiyomer", "Epimer", "İzotop"],
        correct: 2,
        explanation:
          "Sadece 1 C atomu etrafındaki düzenlenişi farklı 2 şeker epimer olarak adlandırılır[cite: 96].",
      },
      {
        id: "k9",
        question: "D-Glukoz ve D-Mannoz birbirinin nesidir?",
        options: ["C-4 epimeri", "C-2 epimeri", "Anomeri", "Enantiyomeri"],
        correct: 1,
        explanation: "D-Mannoz, D-Glukozun C-2'de epimeridir[cite: 98].",
      },
      {
        id: "k10",
        question: "Halkalı yapı oluşturan karbon atomuna ne ad verilir?",
        options: [
          "Kiral karbon",
          "Merkezi karbon",
          "Anomerik merkez",
          "Epimerik merkez",
        ],
        correct: 2,
        explanation:
          "Halkalı yapı oluşturan karbona anomerik merkez denir[cite: 107].",
      },
      {
        id: "k11",
        question: "Altı üyeli halkalı bileşiklere ne ad verilir?",
        options: ["Furanoz", "Piranoz", "Heksoz", "Heptoz"],
        correct: 1,
        explanation:
          "6 üyeli halkalı bileşikler piranoz olarak adlandırılır[cite: 136].",
      },
      {
        id: "k12",
        question: "Beş üyeli halkalı bileşiklere ne ad verilir?",
        options: ["Piranoz", "Furanoz", "Pentoz", "Ketoz"],
        correct: 1,
        explanation: "5 üyeli halka yapılarına furanozlar denir[cite: 150].",
      },
      {
        id: "k13",
        question:
          "Sadece yarı asetal veya yarı ketal karbonundaki düzenlenişi farklı olan izomerlere ne denir?",
        options: ["Anomer", "Epimer", "Enantiyomer", "Diastereomer"],
        correct: 0,
        explanation:
          "Sadece yarı asetal veya yarı ketal karbonundaki düzenlenişi farklı olan monosakkaritlerin izomerlerine anomer denir[cite: 163].",
      },
      {
        id: "k14",
        question:
          "Glukozun a ve b izomerlerinin sulu çözeltide birbirine dönüşmesine ne denir?",
        options: ["Hidroliz", "Mutarotasyon", "Kondenzasyon", "Deaminasyon"],
        correct: 1,
        explanation:
          "Glukozun a ve B izomerleri sulu çözeltide mutarotasyon ile birbirine dönüşür[cite: 166].",
      },
      {
        id: "k15",
        question:
          "Glukozun karbonil karbonu karboksile yükseltgenirse hangi asit oluşur?",
        options: [
          "Glukuronik asit",
          "Glukonik asit",
          "Muramik asit",
          "Sorbitol",
        ],
        correct: 1,
        explanation:
          "Glukozun karbonil C, karboksile yükseltgenirse glukonik asit oluşur[cite: 179].",
      },
      {
        id: "k16",
        question:
          "Glukozun C-6 karbonu yükseltgenirse hangi asit grubu oluşur?",
        options: ["Glukonik asit", "Uronik asit", "Aldonik asit", "Amino asit"],
        correct: 1,
        explanation:
          "Zincirin diğer ucundaki C yükseltgenirse uronik asitler oluşur[cite: 186].",
      },
      {
        id: "k17",
        question:
          "Hücrede şekerlerin tutulmasını ve aktifleştirilmesini sağlayan modifikasyon nedir?",
        options: ["Fosforillenme", "Oksidasyon", "Deaminasyon", "Asetilasyon"],
        correct: 0,
        explanation:
          "Şeker fosforillenmesi, şekeri hücrede tutar ve sonraki dönüşümler için aktifleştirir[cite: 200, 201].",
      },
      {
        id: "k18",
        question:
          "Bir şekerin -OH grubu ile diğerinin anomerik karbonu arasındaki kovalent bağın adı nedir?",
        options: [
          "Peptit bağı",
          "Fosfodiester bağı",
          "O-glikozit bağı",
          "Hidrojen bağı",
        ],
        correct: 2,
        explanation:
          "Bir şekerin -OH grubu ile diğerinin anomerik C rxn ile O-glikozit bağı oluşur[cite: 208].",
      },
      {
        id: "k19",
        question: "Glikozit bağı hangi kimyasal maddeye karşı dirençlidir?",
        options: ["Sıcak asit", "Seyreltik asit", "Baz", "Su"],
        correct: 2,
        explanation:
          "Glikozit bağı asitle kolayca hidroliz olur, baza dirençlidir[cite: 210].",
      },
      {
        id: "k20",
        question:
          "Serbest anomerik karbon içermediği için indirgen olmayan disakkarit hangisidir?",
        options: ["Maltoz", "Laktoz", "Sükroz", "Selobiyoz"],
        correct: 2,
        explanation:
          "Sukroz (çay şekeri) serbest anomerik C yok, indirgen değil[cite: 262, 263].",
      },
      {
        id: "k21",
        question: "Laktoz hangi iki monosakkaritten oluşur?",
        options: [
          "Glukoz ve Fruktoz",
          "D-galaktoz ve D-glukoz",
          "Glukoz ve Glukoz",
          "Galaktoz ve Fruktoz",
        ],
        correct: 1,
        explanation:
          "Laktoz (süt şekeri) hidroliz edildiğinde D-galaktoz + D-glukoz oluşur[cite: 259, 260].",
      },
      {
        id: "k22",
        question:
          "Her iki anomerik karbonun da bağa katıldığı Glukoz+Glukoz disakkariti hangisidir?",
        options: ["Maltoz", "Trehaloz", "Laktoz", "Sükroz"],
        correct: 1,
        explanation:
          "Trehaloz glukoz + glukozdan oluşur ancak her 2 anomerik C da bağa katıldığı için maltoz değildir[cite: 297, 314].",
      },
      {
        id: "k23",
        question:
          "Polisakkaritlerin (glikanlar) proteinlerden temel farkı nedir?",
        options: [
          "Daha küçük olmaları",
          "Belli bir molekül ağırlığının olmaması",
          "Suda çok iyi çözünmeleri",
          "Sadece bitkilerde bulunmaları",
        ],
        correct: 1,
        explanation:
          "Polisakkaritlerin proteinlerden farklı olarak belli molekül ağırlığı yok, kalıpsız sentezlenir[cite: 319].",
      },
      {
        id: "k24",
        question:
          "Nişastayı oluşturan uzun, dallanmamış glukoz polimeri hangisidir?",
        options: ["Amilopektin", "Glikojen", "Amiloz", "Selüloz"],
        correct: 2,
        explanation:
          "Amiloz, uzun ve dallanmamış alfa(1-4) glikozit bağı içeren D-glukoz zinciridir[cite: 325].",
      },
      {
        id: "k25",
        question:
          "Nişastada alfa(1-6) bağlarıyla dallanma yapan polimer hangisidir?",
        options: ["Amiloz", "Amilopektin", "Dekstran", "Kitin"],
        correct: 1,
        explanation:
          "Amilopektin, alfa(1-6) dallanma noktaları içeren çok dallanmış bir D-glukoz polimeridir[cite: 326].",
      },
      {
        id: "k26",
        question: "Hayvan hücrelerinin ana depo polisakkariti hangisidir?",
        options: ["Nişasta", "Selüloz", "Glikojen", "Dekstran"],
        correct: 2,
        explanation:
          "Glikojen hayvan hücrelerinin ana depo polisakkaritidir[cite: 330].",
      },
      {
        id: "k27",
        question: "Glikojenin amilopektinden temel farkı nedir?",
        options: [
          "Bağ tipleri",
          "Daha seyrek dallanması",
          "Daha sık dallanmış olması",
          "Bitkilerde bulunması",
        ],
        correct: 2,
        explanation:
          "Glikojen nişastadan daha çok dallanmıştır; her 8-12 kalıntıda dallanma yapar[cite: 330].",
      },
      {
        id: "k28",
        question:
          "Bakteri ve mayalarda bulunan alfa(1-6) bağlı glukoz polimeri hangisidir?",
        options: ["Selüloz", "Dekstranlar", "Glikojen", "Kitin"],
        correct: 1,
        explanation:
          "Dekstranlar bakteri ve maya polisakkaritleri olup alfa(1-6) bağlı poli-D-glukozdur[cite: 332].",
      },
      {
        id: "k29",
        question:
          "Bitkilerin hücre duvarı ve odunsu kısımlarını oluşturan homopolisakkarit hangisidir?",
        options: ["Nişasta", "Glikojen", "Selüloz", "Agar"],
        correct: 2,
        explanation:
          "Selüloz bitkilerin hücre duvarı, bütün odunsu kısımlarını oluşturan polisakkarittir[cite: 334].",
      },
      {
        id: "k30",
        question: "İnsanlarda selülozun sindirilememesinin temel nedeni nedir?",
        options: [
          "Molekülün çok büyük olması",
          "Beta(1-4) bağlarını parçalayacak selülaz enziminin olmaması",
          "Suda çözünmemesi",
          "Sadece alfa(1-4) bağlarını içermesi",
        ],
        correct: 1,
        explanation:
          "Hayvanlarda beta(1-4) bağlarını parçalayacak selülaz enzimi yoktur ve selüloz sindirilemez[cite: 337, 338, 340].",
      },
      {
        id: "k31",
        question:
          "Eklem bacaklıların sert dış kabuğunu oluşturan yapı hangisidir?",
        options: ["Selüloz", "Dekstran", "Kitin", "Peptidoglikan"],
        correct: 2,
        explanation:
          "Kitin, eklem bacaklıların sert dış kabuklarının bileşeni olan homopolisakkarittir[cite: 344, 345].",
      },
      {
        id: "k32",
        question: "Kitin homopolisakkaritinin selülozdan farkı nedir?",
        options: [
          "Daha kısa olması",
          "C-2'deki -OH yerine asetillenmiş amino grubu içermesi",
          "Alfa bağları içermesi",
          "Dallanmış olması",
        ],
        correct: 1,
        explanation:
          "Selülozdan farkı C-2'deki -OH yerine asetillenmiş amino grubu olmasıdır[cite: 343].",
      },
      {
        id: "k33",
        question:
          "Bakteri hücre duvarında yer alan heteropolisakkarit tabakasının adı nedir?",
        options: [
          "Peptidoglikan",
          "Glikozaminoglikan",
          "Amilopektin",
          "Dekstran",
        ],
        correct: 0,
        explanation:
          "Bakteri hücre duvarı peptidoglikan heteropolisakkarit içerir[cite: 360].",
      },
      {
        id: "k34",
        question:
          "Göz yaşında bulunup bakteriyel hücre duvarını parçalayan enzim hangisidir?",
        options: ["Amilaz", "Selülaz", "Lizozim", "Hiyaluronidaz"],
        correct: 2,
        explanation:
          "Lizozim göz yaşında bakteriyel enfeksiyona karşı savunma yapar[cite: 361].",
      },
      {
        id: "k35",
        question:
          "Elektroforez ve laboratuvar besi yerlerinde kullanılan agar bileşeni hangisidir?",
        options: ["Peptidoglikan", "Kitin", "Agaroz", "Müsin"],
        correct: 2,
        explanation:
          "Agaroz yüksek jelleşme, elektroforez ve besi yeri olan agar bileşenidir[cite: 364, 365].",
      },
      {
        id: "k36",
        question:
          "Hücre dışı matrisin (ECM) boşluğunu dolduran heteropolisakkarit ailesi hangisidir?",
        options: [
          "Homoglikanlar",
          "Dekstranlar",
          "Glikozaminoglikanlar",
          "Lektinler",
        ],
        correct: 2,
        explanation:
          "Glikozaminoglikanlar hücre dışı matrisin heteropolisakkaritleridir[cite: 366].",
      },
      {
        id: "k37",
        question: "Glikozaminoglikanlar (GAG) bitkilerde bulunur mu?",
        options: [
          "Evet, hücre duvarında",
          "Evet, kloroplastlarda",
          "Hayır, hayvan ve bakterilere özgüdür",
          "Hayır, sadece virüslerde bulunur",
        ],
        correct: 2,
        explanation:
          "Glikozaminoglikanlar hayvan ve bakterilere özgüdür, bitkilerde yoktur[cite: 369].",
      },
      {
        id: "k38",
        question:
          "Eklem sıvısında kayganlaştırıcı olarak görev yapan GAG hangisidir?",
        options: [
          "Kondroitin sülfat",
          "Hiyaluronan",
          "Heparin",
          "Dermatan sülfat",
        ],
        correct: 1,
        explanation:
          "Hiyaluronan (hiyaluronik asit) eklem sinovial sıvısında kayganlaştırıcıdır[cite: 376].",
      },
      {
        id: "k39",
        question:
          "Saç, toynak, tırnak gibi ölü hücre yapılarında bolca bulunan GAG hangisidir?",
        options: [
          "Keratan sülfat",
          "Hiyaluronan",
          "Dermatan sülfat",
          "Heparan sülfat",
        ],
        correct: 0,
        explanation:
          "Keratan sülfatlar saç, toynak, tırnak, pençe gibi yapılarda bulunur[cite: 381].",
      },
      {
        id: "k40",
        question:
          "Kan pıhtılaşmasını baskılamak için kullanılan ve en yüksek negatif yüke sahip biyomolekül hangisidir?",
        options: ["Hiyaluronan", "Keratan sülfat", "Heparin", "Müsin"],
        correct: 2,
        explanation:
          "Heparin pıhtılaşmanın baskılanması tedavisinde kullanılır ve en yüksek (-) yük yoğunluğuna sahiptir[cite: 383, 384].",
      },
      {
        id: "k41",
        question:
          "Hücre yüzeyinin ve dış matrisinin makromolekülü olan, GAG zincirlerinin proteine bağlanmasıyla oluşan yapı nedir?",
        options: ["Glikolipit", "Proteoglikan", "Lektin", "Kitin"],
        correct: 1,
        explanation:
          "Glikozaminoglikan zincirinin bir proteine kovalent bağlanmasıyla proteoglikanlar oluşur[cite: 393].",
      },
      {
        id: "k42",
        question: "Salgılarda bulunan bir çeşit zar glikoproteini hangisidir?",
        options: ["Müsinler", "Lektinler", "Selektinler", "Endotoksinler"],
        correct: 0,
        explanation:
          "Müsinler genelde salgılarda bulunan bir çeşit zar glikoproteinidir[cite: 404].",
      },
      {
        id: "k43",
        question:
          "Gram negatif bakterilerin zarında bulunan ve endotoksin olarak davranan lipit bileşeni hangisidir?",
        options: [
          "Glikokaliks",
          "Lipopolisakkarit",
          "Serebrosit",
          "Glikozaminoglikan",
        ],
        correct: 1,
        explanation:
          "Lipopolisakkaritler Gram negatif bakterilerin zarının parçasıdır ve endotoksin görevi görür[cite: 407].",
      },
      {
        id: "k44",
        question:
          "Hücrelerin birbirini tanımasını sağlayan, karbonhidratları yüksek özgüllükle bağlayan proteinlere ne denir?",
        options: ["Müsinler", "Lektinler", "Enzimler", "Glikolipitler"],
        correct: 1,
        explanation:
          "Lektinler şeker kodunu okuyan, karbonhidratları yüksek özgüllükle bağlayan proteinlerdir[cite: 415, 416].",
      },
      {
        id: "k45",
        question:
          "İmmün hücrelerinin kan damarlarından dokulara geçişine (adezyon) aracılık eden lektin ailesi hangisidir?",
        options: [
          "Selektinler",
          "Müsinler",
          "Peptidoglikanlar",
          "Fibrinojenler",
        ],
        correct: 0,
        explanation:
          "Selektinler immün hücrelerinin kandan dokulara geçişine (adezyonuna) aracılık eden plazma zar lektinleri ailesidir[cite: 419, 420].",
      },
      {
        id: "k46",
        question: "D-Riboz hangi sınıf şekere örnektir?",
        options: ["Aldotetroz", "Ketopentoz", "Aldopentoz", "Aldoheksoz"],
        correct: 2,
        explanation: "D-Riboz bir aldopentozdur[cite: 42].",
      },
      {
        id: "k47",
        question:
          "Glikoproteinlerde karbonhidrat kısmı proteine hangi atomlar üzerinden bağlanabilir?",
        options: [
          "Oksijen veya Azot",
          "Kükürt veya Karbon",
          "Fosfor veya Sodyum",
          "Klor veya Demir",
        ],
        correct: 0,
        explanation:
          "Karbonhidrat anomerik C üzerinden -OH grubuna O-bağlı veya amit azotuna N-bağlı olabilir[cite: 403].",
      },
      {
        id: "k48",
        question: "Hangi disakkarit Cu2+ iyonlarını indirgeyebilir?",
        options: ["Trehaloz", "Sükroz", "Maltoz", "Nişasta"],
        correct: 2,
        explanation:
          "Maltoz serbest anomerik karbon içerdiği için Cu2+ iyonlarını indirgeyebilir (indirgen şekerdir)[cite: 205, 253, 285].",
      },
      {
        id: "k49",
        question: "D-Galaktoz, Glukozun kaçıncı karbonunda epimeridir?",
        options: ["C-1", "C-2", "C-3", "C-4"],
        correct: 3,
        explanation: "D-Galaktoz, D-Glukozun C-4'te epimeridir[cite: 98].",
      },
      {
        id: "k50",
        question: "Şeker kodu (sugar code) hücrede ne işe yarar?",
        options: [
          "Sadece enerji üretimi",
          "Bilgilerin şifrelenmesi ve tanınma",
          "Suyun tutulması",
          "Zarın akışkanlığını sağlama",
        ],
        correct: 1,
        explanation:
          "Hücreler bilgilerin şifrelenmesinde özgül oligosakkaritleri (şeker kodunu) kullanır[cite: 408, 414].",
      },
    ],
  },
  {
    id: "biyokimya_nukleik_asitler",
    title: "Biyokimya: Nükleik Asitler",
    icon: "🧬",
    color: "#3498db",
    description:
      "50 Soruluk Kapsamlı Bilgi Testi - Nükleotidler ve Nükleik Asitler",
    questions: [
      {
        id: "n1",
        question:
          "Nükleotidlerin hücre metabolizmasındaki görevlerinden biri DEĞİLDİR?",
        options: [
          "Enerji birimi olmak",
          "Hücre zarı iskeletini oluşturmak",
          "Enzim kofaktörü olmak",
          "Genetik bilginin kaynağı olmak",
        ],
        correct: 1,
        explanation:
          "Nükleotidler enerji birimi, kofaktör ve genetik bilgi deposudur ancak hücre zarı iskeleti lipitlerden oluşur[cite: 429, 430, 432].",
      },
      {
        id: "n2",
        question:
          "DNA molekülünün işlevsel bir biyolojik ürün (protein veya RNA) sentezi için bilgi içeren bölümüne ne ad verilir?",
        options: ["Gen", "Kromozom", "Nükleozit", "Sistron"],
        correct: 0,
        explanation:
          "DNA'nın işlevsel bir ürün sentezi için gereken bilgiyi içeren bölümüne gen denir[cite: 436, 437].",
      },
      {
        id: "n3",
        question:
          "Protein sentezinin gerçekleştiği ribozomların parçası olan RNA türü hangisidir?",
        options: ["mRNA", "tRNA", "rRNA", "snRNA"],
        correct: 2,
        explanation:
          "Ribozomal RNA'lar (rRNA) protein sentezinin gerçekleştiği ribozomların parçalarıdır[cite: 440].",
      },
      {
        id: "n4",
        question:
          "İlgili proteinlerin sentezlenebilmesi için genetik bilgiyi DNA'dan ribozoma taşıyan ara molekül hangisidir?",
        options: ["tRNA", "mRNA", "rRNA", "miRNA"],
        correct: 1,
        explanation:
          "Mesajcı RNA'lar (mRNA) genetik bilgiyi ribozoma taşıyan ara moleküllerdir[cite: 441].",
      },
      {
        id: "n5",
        question:
          "mRNA'daki bilgileri özgün bir amino asit dizisine dönüştüren aracı molekül hangisidir?",
        options: ["tRNA", "rRNA", "mRNA", "DNA"],
        correct: 0,
        explanation:
          "Taşıyıcı RNA'lar (tRNA) bilgileri amino asit dizisine dönüştüren aracı moleküllerdir[cite: 442].",
      },
      {
        id: "n6",
        question: "Nükleotitler hangi 3 tipik bileşenden oluşur?",
        options: [
          "Azotlu baz, heksoz, sülfat",
          "Pürin, pirimidin, amino asit",
          "Azotlu baz, pentoz, fosfat",
          "Yağ asidi, gliserol, baz",
        ],
        correct: 2,
        explanation:
          "Nükleotitler azot içeren bir baz, bir pentoz ve bir fosfattan oluşurlar[cite: 443].",
      },
      {
        id: "n7",
        question:
          "DNA ve RNA'da bulunan iki ana pürin bazı aşağıdakilerden hangisidir?",
        options: [
          "Sitozin ve Timin",
          "Adenin ve Guanin",
          "Urasil ve Adenin",
          "Guanin ve Sitozin",
        ],
        correct: 1,
        explanation:
          "DNA ve RNA, 2 ana pürin olan adenin ve guaninden oluşur[cite: 460].",
      },
      {
        id: "n8",
        question: "RNA'da timin yerine bulunan pirimidin bazı hangisidir?",
        options: ["Sitozin", "Urasil", "Adenin", "Guanin"],
        correct: 1,
        explanation:
          "Hem DNA hem RNA sitozin içerir; ancak DNA'da timin bulunurken RNA'da urasil bulunur[cite: 461, 462].",
      },
      {
        id: "n9",
        question:
          "Sadece baz ve şekerden oluşan, fosfat grubu içermeyen yapıya ne denir?",
        options: ["Nükleotit", "Nükleik asit", "Nükleozit", "Polinükleotit"],
        correct: 2,
        explanation: "Nükleozit sadece baz ve şekerden oluşur[cite: 465].",
      },
      {
        id: "n10",
        question: "DNA'nın yapısında bulunan pentoz şekerinin tam adı nedir?",
        options: ["D-riboz", "2'-deoksi-D-riboz", "D-glukoz", "D-fruktoz"],
        correct: 1,
        explanation:
          "DNA'nın birimlerinde pentoz olarak 2'-deoksi-D-riboz bulunur[cite: 469].",
      },
      {
        id: "n11",
        question:
          "Ardışık nükleotitleri birbirine bağlayan kovalent bağın adı nedir?",
        options: [
          "Peptit bağı",
          "N-glikozil bağı",
          "Fosfodiester bağı",
          "Hidrojen bağı",
        ],
        correct: 2,
        explanation:
          "Bir nükleotidin 5'-fosfat grubu diğerinin 3'-hidroksiline bağlanarak fosfodiester bağını oluşturur[cite: 521, 522].",
      },
      {
        id: "n12",
        question: "Nükleik asit omurgalarının pH 7'deki durumu nasıldır?",
        options: [
          "Hidrofobik ve pozitif yüklü",
          "Hidrofilik ve tümüyle iyonlaşmış (negatif yüklü)",
          "Nötr ve çözünmez",
          "Sadece kovalent bağlı",
        ],
        correct: 1,
        explanation:
          "Omurgalar hidrofiliktir ve pH 7'de fosfat grupları tümüyle iyonlaşmış biçimdedir[cite: 524, 525].",
      },
      {
        id: "n13",
        question: "Nükleik asit dizileri yazılırken yönelim nasıldır?",
        options: [
          "3' ucu solda, 5' ucu sağda",
          "5' ucu solda, 3' ucu sağda",
          "Yönelim rastgeledir",
          "Sadece 5' ucu yazılır",
        ],
        correct: 1,
        explanation:
          "Bir nükleik asitin dizisi her zaman 5' ucu solda ve 3' ucu sağda olacak şekilde gösterilir[cite: 549, 561].",
      },
      {
        id: "n14",
        question:
          "Tüm nükleotitlerin en kuvvetli ışık soğurması yaptığı dalga boyu kaçtır?",
        options: ["200 nm", "260 nm", "280 nm", "340 nm"],
        correct: 1,
        explanation:
          "Tüm nükleotitler rezonans yapıları sonucunda yaklaşık 260 nm dalga boyunda kuvvetli soğurma yaparlar[cite: 568, 569, 571, 572].",
      },
      {
        id: "n15",
        question:
          "DNA çift sarmalının kararlılığına en büyük katkıyı sağlayan etkileşim hangisidir?",
        options: [
          "Hidrojen bağları",
          "Fosfodiester bağları",
          "Baz istiflenme etkileşimleri",
          "Disülfit köprüleri",
        ],
        correct: 2,
        explanation:
          "Baz istiflenme etkileşimleri, özgül olmayan etkileşimler olup çift sarmalın kararlılığına en büyük katkıyı sağlar[cite: 603].",
      },
      {
        id: "n16",
        question: "DNA molekülündeki pürin ve pirimidin eşleşmeleri nasıldır?",
        options: ["A=G, T=C", "A=T, G=C", "A=C, G=T", "A=U, G=C"],
        correct: 1,
        explanation:
          "A'nın T ile ve G'nin C ile bağlandığı hidrojen bağı kurma kalıbı görülür[cite: 579, 597].",
      },
      {
        id: "n17",
        question: "Chargaff yasalarına göre hangi eşitlik doğrudur?",
        options: ["A + T = G + C", "A = G", "A + G = T + C", "T = C"],
        correct: 2,
        explanation:
          "Hücre DNA'sında A=T ve G=C'dir. Buradan A+G = T+C eşitliği çıkartılabilir[cite: 587, 588].",
      },
      {
        id: "n18",
        question:
          "Watson ve Crick modeline göre DNA ipliklerinin yönelimi nasıldır?",
        options: ["Paralel", "Antiparalel", "Dikey", "Karmaşık"],
        correct: 1,
        explanation:
          "Hidrojen bağı ile bağlı baz çiftleri ve zincirler antiparaleldir[cite: 597].",
      },
      {
        id: "n19",
        question: "DNA replikasyonu sırasında mevcut zincirlerin görevi nedir?",
        options: [
          "Parçalanıp yok olmak",
          "Yeni zincirlere kalıp olarak görev görmek",
          "Sadece enerji sağlamak",
          "Urasil üretmek",
        ],
        correct: 1,
        explanation:
          "Mevcut zincirler, yeni oluşan zincirler için kalıp olarak görev görür[cite: 605].",
      },
      {
        id: "n20",
        question: "DNA kalıbından mRNA oluşturulması olayına ne ad verilir?",
        options: ["Replikasyon", "Translasyon", "Transkripsiyon", "Mutasyon"],
        correct: 2,
        explanation:
          "DNA kalıbından mRNA oluşturulması transkripsiyondur[cite: 609].",
      },
      {
        id: "n21",
        question:
          "Bakteri ve arkelerde birden fazla polipeptit kodlayan mRNA'lara ne denir?",
        options: [
          "Monosistronik",
          "Polisistronik",
          "Ribozomal",
          "Oligonükleotit",
        ],
        correct: 1,
        explanation:
          "Birden çok polipeptit kodluyorsa polisistronik mRNA denir[cite: 610, 612].",
      },
      {
        id: "n22",
        question:
          "'Sistron' kelimesi genetik terminolojide hangi anlama gelir?",
        options: ["Protein", "Gen", "Şeker", "Fosfat"],
        correct: 1,
        explanation: "Sistron gen anlamındadır[cite: 615].",
      },
      {
        id: "n23",
        question:
          "DNA'nın ısı veya pH etkisiyle ipliklerinin birbirinden ayrılmasına ne denir?",
        options: [
          "Renatürasyon",
          "Replikasyon",
          "Denatürasyon (erime)",
          "Polimerizasyon",
        ],
        correct: 2,
        explanation:
          "Sıcaklık ve pH değerleri DNA'nın denatürasyonuna veya erimesine neden olur ve iki iplik ayrılır[cite: 630, 631].",
      },
      {
        id: "n24",
        question: "DNA'nın denatürasyonu sırasında hangi bağlar kopar?",
        options: [
          "Kovalent bağlar",
          "Peptit bağları",
          "Glikozit bağları",
          "Hidrojen bağları",
        ],
        correct: 3,
        explanation:
          "Eşleşmiş bazlar arasındaki H bağları kopar, kovalent bağlar kırılmaz![cite: 631, 632].",
      },
      {
        id: "n25",
        question:
          "Çift sarmallı DNA'nın tek sarmallı haline göre UV ışığını daha az soğurmasına ne denir?",
        options: [
          "Renatürasyon",
          "Hipokromik etki",
          "Hiperkromik etki",
          "Hibridizasyon",
        ],
        correct: 1,
        explanation:
          "DNA çift sarmalı doğal halindeyken ışığı daha az soğurmasına hipokromik etki denir[cite: 639].",
      },
      {
        id: "n26",
        question:
          "DNA'nın erime sıcaklığı (Tm) hangi baz çiftinin artmasıyla yükselir?",
        options: ["A-T", "G-C", "A-U", "T-C"],
        correct: 1,
        explanation:
          "G-C miktarı arttıkça erime sıcaklığı artar, çünkü G-C arasındaki 3 H bağını ayırmak için daha fazla ısı gerekir[cite: 642, 643].",
      },
      {
        id: "n27",
        question:
          "İki farklı türün DNA ipliklerinin eşleşerek çift sarmal oluşturabilme yeteneği neyi gösterir?",
        options: [
          "Sadece mutasyonu",
          "Ortak evrimsel kalıtımın varlığını (yakınlığı)",
          "Aynı yaşta olduklarını",
          "Tamamen aynı genoma sahip olduklarını",
        ],
        correct: 1,
        explanation:
          "Farklı türlerin melez oluşturması ortak evrimsel kalıtımın varlığını gösterir, yakınlık arttıkça hibridleşme artar[cite: 646, 647].",
      },
      {
        id: "n28",
        question:
          "Sitozinin amino grubunu kaybederek urasile dönüşmesine ne ad verilir?",
        options: ["Oksidasyon", "Alkilleme", "Deaminasyon", "Fosforilasyon"],
        correct: 2,
        explanation:
          "Sitozin deaminasyonu sonucu amino grubunu kaybeder ve ürünü urasildir[cite: 650, 651].",
      },
      {
        id: "n29",
        question:
          "DNA'nın urasil yerine timin içermesinin evrimsel avantajı nedir?",
        options: [
          "Daha güçlü bağ yapması",
          "Sitozin deaminasyonundan kaynaklı hataların (yabancı urasilin) tanınmasını sağlaması",
          "Daha kolay kopyalanması",
          "Işık soğurmasını engellemesi",
        ],
        correct: 1,
        explanation:
          "DNA'da timin olması urasilin yabancı madde olarak tanınıp uzaklaştırılmasını sağlar, bu da bilginin korunmasına katkı yapar[cite: 651, 652, 653, 654].",
      },
      {
        id: "n30",
        question:
          "UV ışınlarının (güneş ışığı) DNA üzerinde neden olduğu en yaygın hasar hangisidir?",
        options: [
          "AP lezyonu",
          "Siklobütan pirimidin dimeri",
          "Omurga kırılması",
          "Deaminasyon",
        ],
        correct: 1,
        explanation:
          "UV ışını bitişik pirimidin bazları arasında siklobütan pirimidin dimeri oluşturur[cite: 657, 658].",
      },
      {
        id: "n31",
        question:
          "İyonlaştırıcı ışınlar (X-ışınları) DNA üzerinde nasıl bir hasara neden olur?",
        options: [
          "Sadece ısınma",
          "Halka açılması ve kovalent iskelet kırılması",
          "Fosfat eklenmesi",
          "Dimer oluşumu",
        ],
        correct: 1,
        explanation:
          "İyonlaşmış ışınlar halka açılmasına, baz parçalanmasına ve NA kovalent iskeletinde kırılmaya neden olur[cite: 659].",
      },
      {
        id: "n32",
        question: "Nitröz asit (HNO2) DNA'ya nasıl zarar verir?",
        options: [
          "Alkilleme yaparak",
          "Bazların deaminasyonunu hızlandırarak",
          "Dimer oluşturarak",
          "Fosfatı yok ederek",
        ],
        correct: 1,
        explanation:
          "Nitröz asit bazların deaminasyonunu hızlandırır[cite: 665].",
      },
      {
        id: "n33",
        question:
          "DNA'daki mutajenik değişimlerin en önemli kaynağı aşağıdakilerden hangisidir?",
        options: [
          "Düşük pH",
          "Yüksek basınç",
          "Oksidatif hasar (hidroksil radikalleri)",
          "Deaminasyon edici asitler",
        ],
        correct: 2,
        explanation:
          "DNA'daki mutajenik değişimlerin en önemli kaynağı oksidatif hasardır (OH radikalleri vb.)[cite: 667, 668].",
      },
      {
        id: "n34",
        question:
          "Biyokimyasal onarım sistemlerinden yararlanan tek makromolekül hangisidir?",
        options: ["Protein", "RNA", "DNA", "Glikojen"],
        correct: 2,
        explanation:
          "DNA biyokimyasal onarım sistemlerinden yararlanan tek makromoleküldür[cite: 672].",
      },
      {
        id: "n35",
        question:
          "Genetik bilginin DNA'dan RNA'ya ve oradan proteine aktarımı sırasına ne denir?",
        options: [
          "Mutasyon",
          "Santral dogma (Bilgi Akışı)",
          "Denatürasyon",
          "Hibridizasyon",
        ],
        correct: 1,
        explanation:
          "Genetik bilginin akışı: DNA -> RNA -> Protein sırasını takip eder[cite: 675, 678].",
      },
      {
        id: "n36",
        question: "DNA replikasyonunun yöntemi nasıldır?",
        options: [
          "Tam korunumlu",
          "Rastgele korunumlu",
          "Semi-konservatif (yarı-korunumlu)",
          "Kalıpsız",
        ],
        correct: 2,
        explanation: "DNA replikasyonu semi-konservatifdir[cite: 681].",
      },
      {
        id: "n37",
        question: "Adenin ve Timin arasında kaç adet hidrojen bağı bulunur?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "A-T arasında 2 H bağı bulunur[cite: 642, 643].",
      },
      {
        id: "n38",
        question:
          "DNA çift sarmalında hidrofilik şeker-fosfat iskeleti nerede yer alır?",
        options: [
          "Sarmalın içinde",
          "Dış kısımda (suya doğru)",
          "Sadece uçlarda",
          "Merkezde istiflenmiş",
        ],
        correct: 1,
        explanation:
          "Hidrofilik deoksiriboz ve fosfat iskeleti çevreleyen suya doğru dış kısımda yer alır[cite: 593].",
      },
      {
        id: "n39",
        question: "Kanserojen bileşikler etkilerini hücrede nasıl gösterirler?",
        options: [
          "Enerji üretimini durdurarak",
          "Proteinleri parçalayarak",
          "DNA bazlarını değiştirerek",
          "RNA sentezini artırarak",
        ],
        correct: 2,
        explanation:
          "Karsinojenik bileşikler kanser yapıcı etkilerini DNA bazlarını değiştirerek gösterirler[cite: 669, 670].",
      },
      {
        id: "n40",
        question: "Pürin bazları DNA omurgasına hangi bağ ile bağlanır?",
        options: [
          "N-B-glikozil bağı",
          "Fosfodiester bağı",
          "Peptit bağı",
          "Hidrojen bağı",
        ],
        correct: 0,
        explanation:
          "Bir nükleotidin bazı pentozun 1 C'a N-B-glikozil bağıyla bağlanır[cite: 457, 458].",
      },
      {
        id: "n41",
        question:
          "Kısa nükleik asit zincirlerine (genelde 50 nükleotide kadar) ne ad verilir?",
        options: ["Polinükleotit", "Oligonükleotit", "Ribozom", "Kromozom"],
        correct: 1,
        explanation:
          "Kısa nükleik asit (<= 50 nükleotid) oligonükleotid olarak adlandırılır[cite: 566].",
      },
      {
        id: "n42",
        question:
          "Daha uzun nükleik asit zincirlerine (>50 nükleotid) ne ad verilir?",
        options: ["Oligonükleotit", "Nükleozit", "Polinükleotit", "Pürin"],
        correct: 2,
        explanation:
          ">50 nükleotid polinükleotid olarak adlandırılır[cite: 567].",
      },
      {
        id: "n43",
        question:
          "DNA sarmalının tamamen ayrıldıktan sonra yeniden oluşması (renatürasyon) sürecindeki ilk basamak nasıldır?",
        options: [
          "Çok hızlıdır",
          "Enzim gerektirir",
          "Yavaştır ve rastgele buluşma içerir",
          "Sadece soğukta olur",
        ],
        correct: 2,
        explanation:
          "Renatürasyonun ilk basamağı ipliklerin rastgele birbirini bulduğu yavaş basamaktır[cite: 636, 637].",
      },
      {
        id: "n44",
        question: "Renatürasyon sürecinin ikinci basamağı nasıldır?",
        options: [
          "Fermuar gibi hızla kapanır",
          "Yavaşça hidrojen bağları kurulur",
          "Sadece kovalent bağlar oluşur",
          "Ribozomlar görev alır",
        ],
        correct: 0,
        explanation:
          "İkinci basamak eşleşmemiş bazların fermuar gibi kapandığı hızlı basamaktır[cite: 637, 638].",
      },
      {
        id: "n45",
        question: "AP lezyonu (apürinik/apirimidinik bölge) ne anlama gelir?",
        options: [
          "Şekerin kopması",
          "Fosfatın kopması",
          "Baz ile pentoz arasındaki N-B glikozit bağının kırılması (bazsız bölge)",
          "İskeletin tamamen ayrılması",
        ],
        correct: 2,
        explanation:
          "AP lezyonu baz ve pentoz arasındaki N-B glikozit bağının kırılmasıdır ve bazsız bölge oluşturur[cite: 655, 656].",
      },
      {
        id: "n46",
        question:
          "DNA yapısında pürinler ve pirimidinlerin hidrofobik etkileşimle üst üste dizilmesine ne denir?",
        options: [
          "Baz eşleşmesi",
          "Baz istiflenmesi",
          "Hibridizasyon",
          "Mutasyon",
        ],
        correct: 1,
        explanation:
          "Bazların halkaları aynı düzlemde olup hidrofobik etkileşimlerle üst üste istiflenmişlerdir[cite: 601, 603, 620].",
      },
      {
        id: "n47",
        question:
          "Sadece bir amino asit şifreleyen nükleotit dizisinin uzunluğu ne kadardır?",
        options: [
          "Bir nükleotit",
          "İki nükleotit",
          "Nükleotit üçlüsü",
          "On nükleotit",
        ],
        correct: 2,
        explanation:
          "Her amino asit bir nükleotit üçlüsü tarafından kodlanır[cite: 616].",
      },
      {
        id: "n48",
        question: "mRNA'da kodlamayan dizilerin görevi nedir?",
        options: [
          "Enerji üretmek",
          "Sadece yapıyı uzatmak",
          "Protein sentezini düzenlemek",
          "DNA'yı parçalamak",
        ],
        correct: 2,
        explanation:
          "Kodlamayan dizi (sekanslar) protein sentezini düzenlerler[cite: 616].",
      },
      {
        id: "n49",
        question:
          "Adenin nükleotidleri hücrede nükleik asit olmak dışında hangi yapının bileşenidir?",
        options: [
          "Zar proteinleri",
          "Birçok enzimin kofaktörü",
          "Glikojen polimerleri",
          "Lipit damlacıkları",
        ],
        correct: 1,
        explanation:
          "Adenin nükleotidleri pek çok enzim kofaktörünün bileşenidir[cite: 676, 677].",
      },
      {
        id: "n50",
        question:
          "DNA replikasyonunda 'Semi-konservatif' mekanizma neyi ifade eder?",
        options: [
          "DNA'nın yarısının parçalanmasını",
          "Ana sarmalın her ipliğinin bir yavru sarmal için tamamlayıcı vazifesi görmesini",
          "Sadece belli genlerin kopyalanmasını",
          "Hatasız mutasyon mekanizmasını",
        ],
        correct: 1,
        explanation:
          "Semi-konservatif replikasyonda ana sarmalın her ipliği yeni sarmal için tamamlayıcı kalıp vazifesi görür[cite: 681, 682].",
      },
    ],
  },
  {
    id: "biyokimya_lipitler",
    title: "Biyokimya: Lipitler",
    icon: "💧",
    color: "#f1c40f",
    description: "50 Soruluk Test ve 20 Bilgi Kartı - Lipitler",
    questions: [
      {
        id: "l1",
        question:
          "Lipitlerin en temel ve ortak belirleyici özelliği aşağıdakilerden hangisidir?",
        options: [
          "Suda çözünmemeleri",
          "Suda çözünmeleri",
          "Polimer yapıda olmaları",
          "Protein sentezini durdurmaları",
        ],
        correct: 0,
        explanation:
          "Lipitlerin ortak ve belirleyici özelliği hidrofobik olmaları, yani suda çözünmemeleridir.",
      },
      {
        id: "l2",
        question:
          "Doğada bulunan yağ asitlerinin karbon zincir uzunluğu genellikle hangi aralıktadır?",
        options: ["1-3", "4-36", "50-100", "100-200"],
        correct: 1,
        explanation:
          "Yağ asitleri genellikle uzunluğu 4-36 karbon olan hidrokarbon zincirine sahip karboksilik asitlerdir.",
      },
      {
        id: "l3",
        question:
          "Doğal doymamış yağ asitlerindeki çift bağlar neredeyse her zaman hangi konfigürasyondadır?",
        options: ["Trans", "Düz zincir", "Cis", "Çapraz"],
        correct: 2,
        explanation:
          "Neredeyse tüm doğal doymamış yağ asitlerinde çift bağ cis düzenlenişindedir.",
      },
      {
        id: "l4",
        question:
          "İnsanlar için elzem (esansiyel) olan ve dışarıdan alınması gereken çoklu doymamış yağ asidi (PUFA) hangisidir?",
        options: [
          "Palmitik asit",
          "Linoleik asit",
          "Oleik asit",
          "Stearik asit",
        ],
        correct: 1,
        explanation:
          "Omega-6 PUFA'lardan olan linoleik asit insanlar için elzemdir, vücutta enzimatik olarak sentezlenemez.",
      },
      {
        id: "l5",
        question:
          "Sağlıklı bir insanda omega-6 / omega-3 PUFA oranı hangi aralıkta olmalıdır?",
        options: [
          "10:1 ile 20:1",
          "1:1 ile 1:4",
          "5:1 ile 10:1",
          "1:10 ile 1:20",
        ],
        correct: 1,
        explanation:
          "Omega-6/Omega-3 PUFA oranı 1:1 ile 1:4 arasında olmalıdır; oran artarsa kalp hastalığı ve felç riski artar.",
      },
      {
        id: "l6",
        question:
          "Yağ asitlerinde karbon zinciri uzadıkça ve çift bağ sayısı azaldıkça sudaki çözünürlük nasıl değişir?",
        options: ["Artar", "Değişmez", "Azalır", "Önce artar sonra azalır"],
        correct: 2,
        explanation:
          "Hidrokarbon zinciri uzadıkça ve çift bağ azaldıkça apolarlık artar, dolayısıyla çözünürlük düşer.",
      },
      {
        id: "l7",
        question:
          "Doymamış yağların (bitkisel yağlar) oda sıcaklığında sıvı olmasının temel nedeni nedir?",
        options: [
          "Kovalent bağ eksikliği",
          "Trans bağ içermeleri",
          "Cis çift bağların bükülme yaparak sıkı istiflenmeyi engellemesi",
          "Molekül ağırlıklarının çok düşük olması",
        ],
        correct: 2,
        explanation:
          "Cis çift bağlar zinciri büktüğü için moleküller arası zayıf etkileşim azalır ve sıkı istiflenemez, bu yüzden erime noktası düşüktür.",
      },
      {
        id: "l8",
        question: "Triasilgliserollerin (trigliserit) kimyasal yapısı nedir?",
        options: [
          "Gliserol ve fosfat",
          "Sfingozin ve 3 yağ asidi",
          "Kolesterol ve yağ asidi",
          "Gliserol ve 3 yağ asidi",
        ],
        correct: 3,
        explanation:
          "Triasilgliseroller gliserolün 3 yağ asidi ile yaptığı esterleşme ürünleridir.",
      },
      {
        id: "l9",
        question:
          "Adipositlerde depolanan trigliseritleri hidroliz ederek serbest yağ asidi açığa çıkaran enzim hangisidir?",
        options: ["Amilaz", "Lipaz", "Proteaz", "Nükleaz"],
        correct: 1,
        explanation:
          "Adipositlerde ve tohumlarda lipaz enzimi ile yağlar hidroliz olur.",
      },
      {
        id: "l10",
        question:
          "Yağların karbonhidratlara göre daha fazla enerji vermesinin (yaklaşık 2 kat) temel kimyasal sebebi nedir?",
        options: [
          "Daha fazla oksijen içermeleri",
          "Daha fazla indirgenmiş olmaları",
          "Daha fazla su tutmaları",
          "Hidrofilik olmaları",
        ],
        correct: 1,
        explanation:
          "Yağ asidi karbon atomları şekerlerin karbonlarından daha fazla indirgenmiştir, bu nedenle yükseltgenmeleri daha çok enerji verir.",
      },
      {
        id: "l11",
        question:
          "Triasilgliserollerin enerji deposu olarak glikojene göre avantajı nedir?",
        options: [
          "Hidrofobik olup su tutmamaları (hafif olmaları)",
          "Daha ağır olmaları",
          "Enzim gerektirmemeleri",
          "Daha hızlı sentezlenmeleri",
        ],
        correct: 0,
        explanation:
          "Yağlar hidrofobiktir ve su tutmazlar; bu da aynı ağırlıktaki şekere göre daha yoğun enerji depolamalarını sağlar.",
      },
      {
        id: "l12",
        question:
          "Yemek yağlarının raf ömrünü uzatmak için yapılan kısmi hidrojenlenme (margarinleşme) sonucunda ne oluşur?",
        options: [
          "Cis yağ asitleri",
          "Trans yağ asitleri",
          "Esansiyel yağlar",
          "Omega-3 yağ asitleri",
        ],
        correct: 1,
        explanation:
          "Kısmi hidrojenlenme çift bağların kırılmasını engeller ancak trans yağ asitlerinin üretimine yol açar.",
      },
      {
        id: "l13",
        question:
          "Trans yağ asitlerinin kandaki kolesterol seviyelerine etkisi nedir?",
        options: [
          "LDL azalır, HDL artar",
          "Her ikisi de azalır",
          "LDL artar, HDL azalır",
          "Her ikisi de artar",
        ],
        correct: 2,
        explanation:
          "Trans yağ asitleri kötü kolesterolü (LDL) artırıp, iyi kolesterolü (HDL) düşürerek kalp hastalığı riskini yükseltir.",
      },
      {
        id: "l14",
        question:
          "Biyolojik zar lipitlerinin hem hidrofilik hem de hidrofobik uç taşıması özelliğine ne ad verilir?",
        options: ["Amfoterik", "Amfipatik", "İzomerik", "Anabolik"],
        correct: 1,
        explanation:
          "Zar lipitleri amfipatiktir; bir ucu hidrofilik (suyu seven) diğer ucu hidrofobik (suyu sevmeyen) özelliktedir.",
      },
      {
        id: "l15",
        question:
          "Gliserofosfolipitlerin (fosfogliseritler) tüm alt türleri hangi temel molekülün türevidir?",
        options: [
          "Sfingozin",
          "Kolesterol",
          "Fosfatidik asit",
          "Araşidonik asit",
        ],
        correct: 2,
        explanation:
          "Gliserofosfolipitlerde ana bileşik fosfatidik asittir ve baş grubuna bağlanan alkole göre adlandırılır.",
      },
      {
        id: "l16",
        question:
          "Gliserofosfolipitlerde polar baş grubu gliserole hangi kovalent bağ ile bağlanır?",
        options: [
          "Peptit bağı",
          "Fosfodiester bağı",
          "Amit bağı",
          "Glikozit bağı",
        ],
        correct: 1,
        explanation:
          "Baş grubu gliserolün 3. karbonuna fosfodiester bağıyla bağlanır.",
      },
      {
        id: "l17",
        question:
          "Bitkilerde kloroplast zarlarında ağırlıklı olarak bulunan zar lipitleri hangileridir?",
        options: [
          "Sfingomiyelin",
          "Kolesterol",
          "Galaktolipitler ve sülfolipitler",
          "Gangliositler",
        ],
        correct: 2,
        explanation:
          "Kloroplastlar zar lipiti olarak ağırlıklı biçimde galaktolipitleri ve sülfolipitleri içerir.",
      },
      {
        id: "l18",
        question:
          "Arkelerin zorlu çevre şartlarında yaşamasını sağlayan hidrolize dayanıklı zar lipitleri hangisidir?",
        options: ["Sfingolipit", "Sterol", "Mum", "Tetraeter lipitleri"],
        correct: 3,
        explanation:
          "Arkeler eşsiz eter bağlarına sahip tetraeter lipitleri içerir; eter bağları hidrolize çok daha dayanıklıdır.",
      },
      {
        id: "l19",
        question:
          "Gliserol içermeyen, temelinde sfingozin omurgası bulunan zar lipitlerine ne ad verilir?",
        options: [
          "Fosfogliseritler",
          "Steroller",
          "Sfingolipitler",
          "Trigliseritler",
        ],
        correct: 2,
        explanation:
          "Sfingolipitler sfingozin türevleridir ve gliserol içermezler.",
      },
      {
        id: "l20",
        question:
          "Sfingolipitlerde yağ asidi sfingozine hangi bağ ile katılarak 'seramit' oluşturur?",
        options: ["Ester bağı", "Amit bağı", "Eter bağı", "Fosfodiester bağı"],
        correct: 1,
        explanation:
          "Bir yağ asidi sfingozinin C-2'sindeki amino grubuna amit bağıyla bağlanırsa seramit oluşur.",
      },
      {
        id: "l21",
        question:
          "Kan gruplarını belirleyen ve sfingolipitlerin en karmaşık alt türü olan moleküller hangisidir?",
        options: [
          "Seramitler",
          "Sfingomiyelinler",
          "Plazmalojenler",
          "Gangliositler",
        ],
        correct: 3,
        explanation:
          "En karmaşık sfingolipitler gangliositlerdir ve oligosakkarit kısımları kan gruplarını belirler.",
      },
      {
        id: "l22",
        question:
          "Sterollerin (örneğin kolesterolün) yapısal iskeleti aşağıdakilerden hangisidir?",
        options: [
          "Kaynaşmış dört karbon halkası",
          "Düz zincirli alkan",
          "İki halkalı pürin tabanı",
          "Altı karbonlu tek halka",
        ],
        correct: 0,
        explanation:
          "Steroller kaynaşmış dört karbon halkasına (steroid çekirdek) sahiptirler.",
      },
      {
        id: "l23",
        question:
          "Hayvansal dokulardaki zarlarda bulunan en önemli sterol hangisidir?",
        options: ["Ergosterol", "Stigmasterol", "Kolesterol", "Eikozanoit"],
        correct: 2,
        explanation:
          "Hayvansal dokulardaki en önemli yapısal sterol kolesteroldür.",
      },
      {
        id: "l24",
        question:
          "Sterol sentezleyemediği için mebranlarındaki sterolleri dışarıdan almak zorunda olan canlı grubu hangisidir?",
        options: ["İnsanlar", "Bakteriler", "Mantarlar", "Bitkiler"],
        correct: 1,
        explanation:
          "Bakteriler sterol sentezleyemez, zarlarındakiler dış kaynaklıdır.",
      },
      {
        id: "l25",
        question:
          "Kanda taşınarak hücre çekirdeğine giren ve gen ifadesini değiştirerek etki eden sinyal lipitleri hangisidir?",
        options: [
          "Eikozanoitler",
          "Steroid hormonlar",
          "Sfingomiyelinler",
          "Mumlar",
        ],
        correct: 1,
        explanation:
          "Steroid hormonlar endokrin mesajcılardır, çekirdeğe girerek gen ifadesini değiştirirler.",
      },
      {
        id: "l26",
        question:
          "Eikozanoitler (prostaglandinler, tromboksanlar) nasıl sinyal iletirler?",
        options: [
          "Sadece sinir hücrelerinde",
          "Sentezlendikleri dokunun etrafındaki komşu hücrelere etki ederek (parakrin)",
          "Kana karışıp tüm vücudu dolaşarak (endokrin)",
          "Çekirdeğe girerek",
        ],
        correct: 1,
        explanation:
          "Eikozanoitler parakrin hormonlardır; kanla taşınmazlar, sentezlendikleri doku etrafında etkilidirler.",
      },
      {
        id: "l27",
        question: "Eikozanoitler hangi 3 ana sınıfa ayrılır?",
        options: [
          "Seramit, Gangliosit, Sfingomiyelin",
          "A, D, E vitaminleri",
          "Kolesterol, Ergosterol, Stigmasterol",
          "Prostaglandin, Tromboksan, Lökotrien",
        ],
        correct: 3,
        explanation:
          "Eikozanoitlerin 3 sınıfı prostaglandinler, tromboksanlar ve lökotrienlerdir.",
      },
      {
        id: "l28",
        question:
          "Ateş, ağrı ve inflamasyon yanıtlarını oluşturan, NSAID'ler (Aspirin vb.) ile sentezi engellenen lipit grubu hangisidir?",
        options: [
          "Steroidler",
          "Prostaglandinler",
          "Lökotrienler",
          "Vitaminler",
        ],
        correct: 1,
        explanation:
          "Prostaglandinler ateş, inflamasyon ve ağrı yapar; NSAID'ler bunların sentezini bloke eder.",
      },
      {
        id: "l29",
        question:
          "Kan pıhtılaşmasını sağlayan ve trombositler tarafından sentezlenen eikozanoit hangisidir?",
        options: ["Prostaglandin", "Lökotrien", "Tromboksan", "Kolesterol"],
        correct: 2,
        explanation:
          "Tromboksanlar pıhtı oluşumu ve kan akışının azalmasını sağlarlar.",
      },
      {
        id: "l30",
        question:
          "Aşırı üretimi astım veya anafilaktik şoka neden olan ve NSAID'lerin etki etmediği eikozanoit hangisidir?",
        options: ["Tromboksan", "Prostaglandin", "Lökotrien", "Sterol"],
        correct: 2,
        explanation:
          "Lökotrienler akciğer düz kaslarının kasılmasında görev alır, aşırı üretimi astım yapar ve NSAID'ler burada etkili değildir.",
      },
      {
        id: "l31",
        question:
          "Hangi vitamin deride UV ışığı (güneş) etkisiyle 7-dehidrokolesterolden sentezlenir?",
        options: ["A vitamini", "E vitamini", "K vitamini", "D vitamini"],
        correct: 3,
        explanation:
          "Provitamin D3 (7-dehidrokolesterol) deride UV ile fotokimyasal tepkimeye girerek kolekalsiferole (D3) dönüşür.",
      },
      {
        id: "l32",
        question:
          "D vitamininin karaciğer ve böbrekte sentezlenen aktif hormon formu hangisidir?",
        options: [
          "Retinol",
          "Tokoferol",
          "Filokinon",
          "1,25-dihidroksikolekalsiferol",
        ],
        correct: 3,
        explanation:
          "D3 aktif değildir; böbrek ve karaciğer enzimleri ile 1,25-dihidroksikolekalsiferol (aktif hormon) oluşur.",
      },
      {
        id: "l33",
        question:
          "D vitamini eksikliğinde kalsiyum emilim bozukluğuna bağlı olarak hangi hastalık görülür?",
        options: ["Raşitizm", "Gece körlüğü", "Kanamalar", "Astım"],
        correct: 0,
        explanation:
          "D vitamini bağırsakta kalsiyum emilimini sağlar; eksikliği kemik zayıflığına yani raşitizme yol açar.",
      },
      {
        id: "l34",
        question:
          "Omurgalılarda hem görme pigmenti hem de epitel doku gelişimini sağlayan vitamin hangisidir?",
        options: ["A Vitamini", "D Vitamini", "E Vitamini", "K Vitamini"],
        correct: 0,
        explanation:
          "A vitamini (Retinol) görme pigmenti ve hormon işlevine sahiptir.",
      },
      {
        id: "l35",
        question:
          "Karanlıkta retinada bulunan ve ışık etkisiyle all-trans formuna izomerleşerek görme sinyalini başlatan molekül hangisidir?",
        options: [
          "Tokoferol",
          "11-cis retinal",
          "Ergosterol",
          "Kolekalsiferol",
        ],
        correct: 1,
        explanation:
          "Karanlıkta 11-cis retinal ışıkla etkileşime girerek all-trans retinale dönüşür ve görme başlar.",
      },
      {
        id: "l36",
        question:
          "Zar lipitlerindeki doymamış yağ asitlerini oksidasyondan koruyan biyolojik antioksidan vitamin hangisidir?",
        options: ["A", "D", "E", "K"],
        correct: 2,
        explanation:
          "E vitamini (Tokoferoller) hidrofobik biyolojik antioksidandır ve lipitlerin oksidatif bozunmasını önler.",
      },
      {
        id: "l37",
        question:
          "E vitamini eksikliğinde insanda görülen nadir belirti hangisidir?",
        options: [
          "Kırılgan eritrosit (alyuvar)",
          "Gece körlüğü",
          "Raşitizm",
          "Pıhtılaşmama",
        ],
        correct: 0,
        explanation:
          "E vitamini eksikliği nadirdir ve en temel belirtisi kırılgan eritrositlerdir.",
      },
      {
        id: "l38",
        question:
          "Protrombin oluşumunu sağlayarak kanın pıhtılaşmasında kritik rol oynayan vitamin hangisidir?",
        options: ["A", "D", "E", "K"],
        correct: 3,
        explanation:
          "K vitamini protrombin oluşumunda önemlidir ve kan pıhtılarının oluşmasını (fibrinojen -> fibrin) sağlar.",
      },
      {
        id: "l39",
        question:
          "K vitamininin etkisini sentetik olarak engelleyen ve antikoagülan (kan sulandırıcı) olarak kullanılan ilaç hangisidir?",
        options: ["Aspirin", "Varfarin", "İbuprofen", "Retinol"],
        correct: 1,
        explanation:
          "Varfarin sentetik bir antikoagülandır, protrombin oluşumunu (K vitaminini) engeller.",
      },
      {
        id: "l40",
        question:
          "ATP sentezi sırasında mitokondri zarında elektron taşıyıcı olarak görev yapan lipit hangisidir?",
        options: ["Kolesterol", "Mum", "Übikinon (Koenzim Q)", "Gangliosit"],
        correct: 2,
        explanation:
          "Übikinon (Koenzim Q), ATP sentezindeki yükseltgenme-indirgenme reaksiyonlarında görev alır.",
      },
      {
        id: "l41",
        question:
          "Doğal renk pigmentlerinin çoğunun kimyasal yapısını oluşturan lipit formu nedir?",
        options: ["Sfingolipitler", "Steroidler", "Eşlenik dienler", "Mumlar"],
        correct: 2,
        explanation:
          "Doğal pigmentlerin çoğu lipit yapılı eşlenik dienlerdir; tek ve çift bağların ardışık sıralanması renk oluşumunu sağlar.",
      },
      {
        id: "l42",
        question: "Omurgalılarda serbest yağ asitleri kanda nasıl taşınır?",
        options: [
          "Suda çözünerek",
          "Taşıyıcı proteinlere bağlanarak",
          "Glikozla birleşerek",
          "Serbest halde",
        ],
        correct: 1,
        explanation:
          "Yağ asitleri suda çözünmedikleri için kanda dolaşmak için taşıyıcı proteine ihtiyaç duyarlar.",
      },
      {
        id: "l43",
        question:
          "Doğada enerji depoları ve özellikle su iticiler (yalıtım) olarak görev yapan lipit sınıfı hangisidir?",
        options: [
          "Steroller",
          "Gliserofosfolipitler",
          "Eikozanoitler",
          "Mumlar",
        ],
        correct: 3,
        explanation:
          "Mumlar yüksek erime noktalı enerji depoları ve su iticiler olarak görev yaparlar.",
      },
      {
        id: "l44",
        question:
          "Gliserole bağlı açil zincirlerinden birinin ester yerine eter bağıyla bağlandığı lipitlere örnek hangisidir?",
        options: [
          "Trigliseritler",
          "Plazmalojenler",
          "Gangliositler",
          "Kolesterol",
        ],
        correct: 1,
        explanation:
          "Plazmalojenler eter lipitlerine örnektir ve eter bağı içerirler.",
      },
      {
        id: "l45",
        question:
          "Omurgalılarda trigliserit formunda yağ depolamak üzere özelleşmiş hücrelere ne ad verilir?",
        options: ["Adiposit", "Eritrosit", "Lökosit", "Astrosit"],
        correct: 0,
        explanation:
          "Omurgalılarda özelleşmiş yağ (trigliserit) hücrelerine adiposit denir.",
      },
      {
        id: "l46",
        question: "Safra asitlerinin bağırsaktaki temel görevi nedir?",
        options: [
          "Asitliği artırmak",
          "Karbonhidratları parçalamak",
          "Deterjan etkisiyle yağları çözerek lipaz erişimini kolaylaştırmak",
          "Vitamin üretmek",
        ],
        correct: 2,
        explanation:
          "Sterol türevi olan safra asitleri bağırsakta deterjan görevi görerek enzimlerin (lipaz) yağlara erişimini kolaylaştırır.",
      },
      {
        id: "l47",
        question:
          "Hücre zarının dış yüzeyinde yer alan sfingolipitlerin biyolojik amacı genellikle nedir?",
        options: [
          "ATP üretimi",
          "Enerji depolama",
          "Hücre içi iskelet yapımı",
          "Hücresel tanınma bölgeleri oluşturma",
        ],
        correct: 3,
        explanation:
          "Hücre yüzeyindeki sfingolipitler dış hücrelerin, moleküllerin ve kan gruplarının tanınma bölgeleridir.",
      },
      {
        id: "l48",
        question:
          "Hem bitkisel yağların kokusunda (polen çekici) hem de vitaminlerin (A, D, E, K) sentezinde temel yapı taşı olan birim nedir?",
        options: ["İzopren türevleri", "Sfingozin", "Gliserol", "Glikoz"],
        correct: 0,
        explanation:
          "Uçucu yağlar, pigmentler ve A, D, E, K vitaminleri izopren birimlerinin kondenzasyonundan türemiştir.",
      },
      {
        id: "l49",
        question:
          "Prostaglandinler (PG) ismini vücuttaki hangi organdan/yapıdan almıştır?",
        options: ["Pankreas", "Prostat bezi", "Karaciğer", "Mide"],
        correct: 1,
        explanation:
          "İlk kez izole edildikleri için prostaglandinler ismini prostat bezinden almıştır.",
      },
      {
        id: "l50",
        question:
          "Erkek ve dişi cinsiyet hormonları ile kortizol, lipitlerin hangi alt sınıfına aittir?",
        options: [
          "Steroid hormonlar",
          "Eikozanoitler",
          "Sfingolipitler",
          "Trigliseritler",
        ],
        correct: 0,
        explanation:
          "Cinsiyet hormonları ile adrenal korteksten salgılanan kortizol ve aldosteron steroid hormonlardır.",
      },
    ],
  },
];
// ═══════════════════════════════════════════════════════════
// 📚 StudyDeck — BİYOKİMYA 2 (Genişletilmiş Flash Card Seti)
// ═══════════════════════════════════════════════════════════

const FLASHCARDS = [
  {
    id: "fc1",
    subject: "Biyokimya",
    question: "Şeker Kodu (Sugar Code) nedir?",
    answer:
      "Hücrelerin bilgi şifrelemek ve iletmek için kullandığı özgül oligosakkarit dizileri ve bunların 3 boyutlu yapılarıdır[cite: 408, 414].",
  },
  {
    id: "fc2",
    subject: "Biyokimya",
    question: "Epimer ve Anomer farkı nedir?",
    answer:
      "Epimer, herhangi bir karbon atomunda konfigürasyon farkı gösterirken [cite: 96]; anomer, sadece halkalaşma sırasında oluşan karbonil karbonundaki (anomerik karbon) farklılığı ifade eder[cite: 163, 164].",
  },
  {
    id: "fc3",
    subject: "Biyokimya",
    question: "Neden selülozu sindiremeyiz?",
    answer:
      "İnsanlarda beta 1-4 glikozit bağlarını koparacak selülaz enzimi bulunmaz; bu enzim sadece bazı mantar ve bakterilerde vardır[cite: 337, 340].",
  },
  {
    id: "fc4",
    subject: "Biyokimya",
    question: "Amilopektin ve Glikojen dallanma farkı?",
    answer:
      "Glikojen daha sık dallanmıştır (her 8-12 kalıntıda bir)[cite: 330]. Amilopektin ise daha seyrek dallanmıştır (her 24-30 kalıntıda bir)[cite: 326].",
  },
  {
    id: "fc5",
    subject: "Biyokimya",
    question: "Lektinlerin ana görevi nedir?",
    answer:
      "Karbonhidratları yüksek özgüllükle tanıyıp bağlayarak hücre-hücre tanıması, sinyalleşme ve adezyonu sağlamaktır[cite: 396, 416].",
  },
  {
    id: "fc6",
    subject: "Biyokimya",
    question: "Mutarotasyon nedir?",
    answer:
      "Glukozun alfa ve beta izomerlerinin sulu çözeltide birbirine dönüşerek dengeye gelmesi olayıdır[cite: 166].",
  },
  {
    id: "fc7",
    subject: "Biyokimya",
    question: "Hangi monosakkarit optik olarak aktif değildir?",
    answer:
      "Dihidroksiaseton; çünkü kiral (asimetrik) karbon atomu içermeyen tek monosakkarittir[cite: 65, 68].",
  },
  {
    id: "fc8",
    subject: "Biyokimya",
    question: "Glikozaminoglikanlar (GAG) bitkilerde bulunur mu?",
    answer:
      "Hayır, glikozaminoglikanlar hayvanlara ve bakterilere özgüdür; bitkilerde bulunmazlar[cite: 369].",
  },
  {
    id: "fc9",
    subject: "Biyokimya",
    question: "Heparin molekülünün tıbbi önemi nedir?",
    answer:
      "En yüksek negatif yük yoğunluğuna sahip moleküldür ve kan pıhtılaşmasını baskılamak (antitrombin etkileşimi) için kullanılır[cite: 383, 384].",
  },
  {
    id: "fc10",
    subject: "Biyokimya",
    question: "Müsinlerin (Mucins) temel özelliği nedir?",
    answer:
      "Genellikle salgılarda bulunan ve yoğun karbonhidrat içeren bir çeşit zar glikoproteinidir[cite: 404].",
  },
  {
    id: "fc11",
    subject: "Biyokimya",
    question: "Aldonik asit ve Uronik asit farkı?",
    answer:
      "Aldonik asitte karbonil karbonu (C-1) yükseltgenir[cite: 180]. Uronik asitte ise zincirin diğer ucundaki (C-6) karbon yükseltgenir[cite: 186].",
  },
  {
    id: "fc12",
    subject: "Biyokimya",
    question: "Lizozim enzimi bakteri duvarında nereyi parçalar?",
    answer:
      "N-asetilglukozamin ile N-asetilmuramik asit arasındaki beta 1-4 glikozit bağlarını hidroliz eder[cite: 360, 361].",
  },
  {
    id: "fc13",
    subject: "Biyokimya",
    question: "Hiyaluronan (Hiyaluronik asit) nerede bulunur?",
    answer:
      "Eklem sinovial sıvısında kayganlaştırıcı olarak, kıkırdak ve tendonlarda ise ECM bileşeni olarak bulunur[cite: 376, 377].",
  },
  {
    id: "fc14",
    subject: "Biyokimya",
    question: "Şekerlerin fosforillenmesi hücreye ne sağlar?",
    answer:
      "Negatif yük kazandırarak şekerin hücre içinde kalmasını sağlar ve sonraki kimyasal dönüşümler için onu aktifleştirir[cite: 200, 201].",
  },
  {
    id: "fc15",
    subject: "Biyokimya",
    question: "Homopolisakkarit ve Heteropolisakkarit farkı?",
    answer:
      "Homopolisakkarit tek tip monomer içerirken (Örn: Nişasta) [cite: 317], heteropolisakkarit iki veya daha fazla farklı tip monomer içerir (Örn: Peptidoglikan)[cite: 317, 360].",
  },
  {
    id: "fc16",
    subject: "Biyokimya",
    question: "Kitin (Chitin) molekülünün selülozdan farkı nedir?",
    answer:
      "Selülozda C-2'de -OH grubu varken, kitinde bu grupta asetillenmiş bir amino grubu bulunur[cite: 343].",
  },
  {
    id: "fc17",
    subject: "Biyokimya",
    question: "Sükroz neden indirgen değildir?",
    answer:
      "Çünkü hem glukozun hem de fruktozun anomerik karbonları glikozit bağına katılmıştır; serbest anomerik uç yoktur[cite: 263, 314].",
  },
  {
    id: "fc18",
    subject: "Biyokimya",
    question: "D ve L izomerliği neye göre belirlenir?",
    answer:
      "Karbonil grubuna en uzak olan kiral merkezin (referans karbon) düzenlenişine göre belirlenir[cite: 71, 72].",
  },
  {
    id: "fc19",
    subject: "Biyokimya",
    question: "Peptidoglikan hangi canlı grubuna özgüdür?",
    answer:
      "Bakterilere özgüdür ve hücre duvarının yapısal dayanıklılığını sağlar[cite: 358, 360].",
  },
  {
    id: "fc20",
    subject: "Biyokimya",
    question: "Selektinlerin (Selectins) görevi nedir?",
    answer:
      "Plazma zarında bulunan bu lektinler, bağışıklık hücrelerinin kan damarlarından dokulara geçişine (adezyon) aracılık eder[cite: 419, 420].",
  },
  {
    id: "fcn1",
    subject: "Biyokimya",
    question: "Nükleozit ile Nükleotit farkı nedir?",
    answer:
      "Nükleozit baz ve şekerden oluşurken [cite: 465], nükleotit bu yapıya fosfat grubunun eklenmiş halidir[cite: 464].",
  },
  {
    id: "fcn2",
    subject: "Biyokimya",
    question: "Hipokromik etki nedir?",
    answer:
      "Çift sarmallı DNA'nın doğal halindeyken, tek sarmallı haline göre ışığı daha az soğurmasıdır[cite: 639].",
  },
  {
    id: "fcn3",
    subject: "Biyokimya",
    question: "Santral Dogma (Bilgi Akışı) sırası nasıldır?",
    answer:
      "DNA replikasyonu (DNA sentezi) -> Transkripsiyon (RNA sentezi) -> Translasyon (Protein sentezi) şeklinde ilerler[cite: 678, 680].",
  },
  {
    id: "fcn4",
    subject: "Biyokimya",
    question: "Chargaff kuralı nedir?",
    answer:
      "Hücre DNA'sında Adenin sayısının Timine (A=T) ve Guanin sayısının Sitozine (G=C) eşit olması kuralıdır[cite: 587, 588].",
  },
  {
    id: "fcn5",
    subject: "Biyokimya",
    question: "DNA'da neden urasil yerine timin vardır?",
    answer:
      "Sitozinin kendiliğinden urasile dönüşmesi (deaminasyon) hatasını yabancı madde olarak tanıyıp onarabilmek ve genetik bilgiyi uzun süreli koruyabilmek için[cite: 651, 652, 654].",
  },
  {
    id: "fcn6",
    subject: "Biyokimya",
    question: "Fosfodiester bağı hangi uçları birbirine bağlar?",
    answer:
      "Bir nükleotidin 5'-fosfat grubu ile diğer nükleotidin 3'-hidroksil grubunu bağlar[cite: 522].",
  },
  {
    id: "fcn7",
    subject: "Biyokimya",
    question: "mRNA'nın temel görevi nedir?",
    answer:
      "DNA'dan genetik mesajı çekirdekten sitoplazmaya taşıyarak, özgül amino asit dizilerine kalıplık etmektir[cite: 607, 608].",
  },
  {
    id: "fcn8",
    subject: "Biyokimya",
    question: "Tm (Erime Sıcaklığı) neye bağlıdır?",
    answer:
      "DNA'daki G-C baz çifti oranına bağlıdır; G-C oranı arttıkça (3 hidrojen bağı nedeniyle) koparmak için gereken ısı (Tm) artar[cite: 641, 642].",
  },
  {
    id: "fcn9",
    subject: "Biyokimya",
    question: "DNA replikasyonu nasıl bir mekanizma ile gerçekleşir?",
    answer:
      "Semi-konservatiftir; ana sarmalın her ipliği yeni (yavru) bir sarmal için tamamlayıcı kalıp vazifesi görür[cite: 681, 682].",
  },
  {
    id: "fcn10",
    subject: "Biyokimya",
    question: "tRNA'nın görevi nedir?",
    answer:
      "mRNA'daki bilgileri okuyarak, ribozomda ilgili amino asitleri doğru dizilimde eklenmek üzere taşıyan aracı moleküllerdir[cite: 442, 618].",
  },
  {
    id: "fcn11",
    subject: "Biyokimya",
    question: "DNA çift sarmalını stabilize eden en büyük kuvvet hangisidir?",
    answer:
      "Bazların üst üste istiflenmesi (stacking) etkileşimleri, çift sarmalın kararlılığına en büyük katkıyı sağlar[cite: 601, 603].",
  },
  {
    id: "fcn12",
    subject: "Biyokimya",
    question: "UV ışığının DNA üzerindeki tipik hasarı nedir?",
    answer:
      "Bitişik pirimidin bazları arasında kovalent bağ kurdurarak 'siklobütan pirimidin dimerleri' oluşturmasıdır[cite: 657, 658].",
  },
  {
    id: "fcn13",
    subject: "Biyokimya",
    question:
      "Nükleik asitler hangi dalga boyunda en yüksek ışık soğurmasını yapar?",
    answer:
      "Pürin ve pirimidinlerin rezonans yapıları sonucunda yaklaşık 260 nm dalga boyunda[cite: 571, 572].",
  },
  {
    id: "fcn14",
    subject: "Biyokimya",
    question: "Transkripsiyon nedir?",
    answer: "DNA kalıbından mRNA oluşturulması işlemidir[cite: 609].",
  },
  {
    id: "fcn15",
    subject: "Biyokimya",
    question: "Sitozinin deaminasyonu sonucunda hangi molekül oluşur?",
    answer: "Sitozinin amino grubunu kaybetmesiyle urasil oluşur[cite: 651].",
  },
  {
    id: "fcn16",
    subject: "Biyokimya",
    question: "Polisistronik mRNA ne demektir?",
    answer:
      "Özellikle bakteri ve arkelerde görülen, bir mRNA molekülünün birden fazla polipeptit zincirini (geni) kodlamasıdır[cite: 610, 612].",
  },
  {
    id: "fcn17",
    subject: "Biyokimya",
    question: "A-T ve G-C eşleşmesi kuralı nasıl gerçekleşir?",
    answer:
      "Adeninin özgül olarak timin ile, guaninin de sitozin ile aynı düzlemde hidrojen bağı kurmasıyla gerçekleşir[cite: 579, 597].",
  },
  {
    id: "fcn18",
    subject: "Biyokimya",
    question: "DNA iskeleti nerede yer alır ve nasıldır?",
    answer:
      "Hidrofilik deoksiriboz ve fosfat iskeleti, suyla H bağları kuracak şekilde dış kısımda (suya doğru) yer alır[cite: 524, 593].",
  },
  {
    id: "fcl1",
    subject: "Biyokimya - Lipitler",
    question: "Lipitlerin en temel ortak özelliği nedir?",
    answer:
      "Suda çözünmemeleri (hidrofobik olmaları) ve apolar organik çözücülerde çözünmeleridir.",
  },
  {
    id: "fcl2",
    subject: "Biyokimya - Lipitler",
    question:
      "Doymamış yağ asitleri (bitkisel yağlar) oda sıcaklığında neden sıvıdır?",
    answer:
      "İçerdikleri 'cis' konfigürasyonundaki çift bağlar hidrokarbon zincirini büker, bu da moleküllerin sıkıca istiflenmesini engelleyerek erime noktasını düşürür.",
  },
  {
    id: "fcl3",
    subject: "Biyokimya - Lipitler",
    question:
      "Trigliseritlerin enerji depolamada glikojene kıyasla avantajları nelerdir?",
    answer:
      "1) Daha fazla indirgenmiş oldukları için 2 kat fazla enerji verirler. 2) Hidrofobik oldukları için su tutmazlar, ekstra ağırlık yapmazlar.",
  },
  {
    id: "fcl4",
    subject: "Biyokimya - Lipitler",
    question: "Trans yağ asitleri nasıl oluşur ve zararı nedir?",
    answer:
      "Sıvı yağların raf ömrünü uzatmak için yapılan 'kısmi hidrojenlenme' işlemiyle oluşur. Kanda LDL'yi (kötü kolesterol) artırıp HDL'yi düşürerek kalp hastalığı riskini yükseltirler.",
  },
  {
    id: "fcl5",
    subject: "Biyokimya - Lipitler",
    question: "Zar lipitlerinin 'amfipatik' olması ne demektir?",
    answer:
      "Molekülün bir ucunun suyu seven (hidrofilik), diğer ucunun ise suyu sevmeyen (hidrofobik) özellikte olmasıdır.",
  },
  {
    id: "fcl6",
    subject: "Biyokimya - Lipitler",
    question:
      "Gliserofosfolipit ve Sfingolipit arasındaki temel yapısal fark nedir?",
    answer:
      "Gliserofosfolipitlerin omurgası gliserol iken, sfingolipitlerin omurgası gliserol içermeyen sfingozindir.",
  },
  {
    id: "fcl7",
    subject: "Biyokimya - Lipitler",
    question: "Gangliositlerin tıbbi ve biyolojik önemi nedir?",
    answer:
      "Sfingolipitlerin en karmaşık üyesidirler ve taşıdıkları oligosakkarit zincirleriyle hücrelerin dış yüzeyindeki tanınma (örneğin kan grupları) bölgelerini oluştururlar.",
  },
  {
    id: "fcl8",
    subject: "Biyokimya - Lipitler",
    question: "Kolesterol bitkilerde ve bakterilerde bulunur mu?",
    answer:
      "Hayır. Bitkilerde stigmasterol, mantarlarda ergosterol bulunur. Bakteriler ise hiçbir şekilde sterol sentezleyemezler.",
  },
  {
    id: "fcl9",
    subject: "Biyokimya - Lipitler",
    question: "Eikozanoitler nedir ve 3 ana alt sınıfı nelerdir?",
    answer:
      "Kanda taşınmayan, sadece sentezlendiği hücrenin etrafına etki eden parakrin sinyal lipitleridir. 3 sınıfı: Prostaglandinler, Tromboksanlar, Lökotrienlerdir.",
  },
  {
    id: "fcl10",
    subject: "Biyokimya - Lipitler",
    question: "Aspirin gibi NSAID ilaçlar ağrı ve ateşi nasıl düşürür?",
    answer:
      "Ağrı, ateş ve inflamasyona yol açan prostaglandinleri ve tromboksanları sentezleyen enzimlerin (COX) çalışmasını baskılayarak.",
  },
  {
    id: "fcl11",
    subject: "Biyokimya - Lipitler",
    question: "Lökotrienlerin aşırı üretimi hangi duruma yol açar?",
    answer:
      "Akciğer düz kaslarının şiddetli kasılmasına neden olarak astım ataklarına veya anafilaktik şoka yol açar. NSAID'ler lökotrienleri engelleyemez.",
  },
  {
    id: "fcl12",
    subject: "Biyokimya - Lipitler",
    question: "Steroid hormonların eikozanoitlerden çalışma farkı nedir?",
    answer:
      "Steroidler kanla tüm vücuda dağılan (endokrin) mesajcılardır ve hücre içine girip direkt olarak çekirdekteki gen ifadesini değiştirerek etki ederler.",
  },
  {
    id: "fcl13",
    subject: "Biyokimya - Lipitler",
    question: "D vitamini sentezi nasıl gerçekleşir?",
    answer:
      "Derideki 7-dehidrokolesterol, güneşten gelen UV ışığı ile kolekalsiferole (D3) dönüşür. Karaciğer ve böbrekte ise aktif hormona (1,25-dihidroksikolekalsiferol) çevrilir.",
  },
  {
    id: "fcl14",
    subject: "Biyokimya - Lipitler",
    question: "A vitamini (Retinal) görme olayında nasıl çalışır?",
    answer:
      "Karanlıkta '11-cis retinal' formunda bulunur, göze ışık gelince şekil değiştirerek 'all-trans retinal' formuna izomerleşir ve beyne elektrik sinyali gönderilir.",
  },
  {
    id: "fcl15",
    subject: "Biyokimya - Lipitler",
    question: "E vitamininin (Tokoferol) temel biyolojik görevi nedir?",
    answer:
      "Güçlü bir hidrofobik biyolojik antioksidandır. Hücre zarındaki doymamış lipitleri oksitlenmekten (bozunmaktan) korur.",
  },
  {
    id: "fcl16",
    subject: "Biyokimya - Lipitler",
    question: "K vitamini ve Varfarin ilacı arasındaki zıt ilişki nedir?",
    answer:
      "K vitamini, kanın pıhtılaşmasını sağlayan protrombin proteininin oluşumunu sağlar. Varfarin ise bunu engelleyen sentetik bir kan sulandırıcıdır (antikoagülandır).",
  },
  {
    id: "fcl17",
    subject: "Biyokimya - Lipitler",
    question: "Übikinon (Koenzim Q) hücrede ne işe yarar?",
    answer:
      "Mitokondri zarında ATP sentezlenirken gerçekleşen yükseltgenme-indirgenme reaksiyonlarında elektron taşıyan bir lipit türevidir.",
  },
  {
    id: "fcl18",
    subject: "Biyokimya - Lipitler",
    question: "Eşlenik dien nedir ve görevi nedir?",
    answer:
      "Tek ve çift bağların (C=C-C=C) peş peşe sıralandığı izopren zincirleridir. Düşük enerjili ışığı soğurarak doğadaki renk pigmentlerini oluştururlar.",
  },
  {
    id: "fcl19",
    subject: "Biyokimya - Lipitler",
    question: "Safra asitlerinin bağırsaktaki görevi nedir?",
    answer:
      "Kolesterolden türetilmişlerdir; bağırsakta deterjan görevi görerek büyük yağ damlacıklarını parçalar ve lipaz enziminin yağları sindirmesini kolaylaştırırlar.",
  },
  {
    id: "fcl20",
    subject: "Biyokimya - Lipitler",
    question: "Mumların (waxes) biyolojik görevi nedir?",
    answer:
      "Hayvan derilerinde, kuş tüylerinde ve bitki yapraklarında su kaybetmeyi önleyici (su itici) ve yüksek erime noktalı enerji deposu olarak görev yaparlar.",
  },
];
