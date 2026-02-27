// ═══════════════════════════════════════════════════════════
// 📚 StudyDeck — BİYOKİMYA 2 (Genişletilmiş Soru Seti)
// ═══════════════════════════════════════════════════════════

const SUBJECTS = [
  {
    id: "biyokimya_pro",
    title: "Biyokimya: Karbonhidratlar",
    icon: "🧪",
    color: "#e67e22",
    description: "Monosakkaritlerden Glikobiyolojiye Kapsamlı Test",
    questions: [
      {
        id: "q1",
        question: "Yeryüzünde en çok bulunan biyomoleküller aşağıdakilerden hangisidir?",
        options: ["Proteinler", "Lipitler", "Karbonhidratlar", "Nükleik asitler"],
        correct: 2,
        explanation: "Karbonhidratlar yeryüzünde en bol bulunan biyomoleküllerdir[cite: 1, 2, 3]."
      },
      {
        id: "q2",
        question: "Eklemlerde kayganlaştırıcı olarak görev yapan karbonhidrat türü nedir?",
        options: ["Monosakkaritler", "Glikanlar (Polimerler)", "Aldozlar", "Triozlar"],
        correct: 1,
        explanation: "Karbonhidrat polimerleri (glikanlar) eklemlerde kayganlaştırıcı görev görür[cite: 7, 9]."
      },
      {
        id: "q3",
        question: "Karbonil grubu zincirin sonundaysa bu şeker hangi sınıfa girer?",
        options: ["Ketoz", "Aldoz", "Heksoz", "Pentoz"],
        correct: 1,
        explanation: "Karbonil grubu zincirin sonundaysa aldehit grubudur ve bu şekerlere aldoz denir[cite: 22]."
      },
      {
        id: "q4",
        question: "Aşağıdakilerden hangisi bir 'ketotrioz' örneğidir?",
        options: ["Gliseraldehit", "Riboz", "Fruktoz", "Dihidroksiaseton"],
        correct: 3,
        explanation: "Dihidroksiaseton, 3 karbonlu en basit ketozdur[cite: 30, 68]."
      },
      {
        id: "q5",
        question: "D-Glukoz ve D-Mannoz arasındaki yapısal fark sadece C-2 atomunda ise bu iki şeker birbirinin nesidir?",
        options: ["Anomeri", "Epimeri", "Enantiyomeri", "İzomeri"],
        correct: 1,
        explanation: "Sadece bir karbon atomu etrafındaki düzenlenişi farklı olan şekerlere epimer denir[cite: 96, 98]."
      },
      {
        id: "q6",
        question: "Hangi monosakkarit asimetrik karbon atomu içermediği için optik olarak aktif değildir?",
        options: ["D-Gliseraldehit", "Dihidroksiaseton", "D-Riboz", "D-Eritroz"],
        correct: 1,
        explanation: "Dihidroksiaseton hariç tüm monosakkaritler asimetrik karbona sahiptir ve optik aktiftir[cite: 65]."
      },
      {
        id: "q7",
        question: "Halkalı yapı oluşturan karbon atomuna ne ad verilir?",
        options: ["Epimerik merkez", "Kiral merkez", "Anomerik merkez", "Referans karbon"],
        correct: 2,
        explanation: "Halkalı yapı oluşumunda kovalent bağ kuran karbona anomerik merkez denir[cite: 107, 164]."
      },
      {
        id: "q8",
        question: "Altı üyeli halkalı şeker yapılarına ne ad verilir?",
        options: ["Furanoz", "Piranoz", "Trioz", "Pentoz"],
        correct: 1,
        explanation: "6 üyeli halkalı bileşiklere piranoz denir[cite: 136]."
      },
      {
        id: "q9",
        question: "Sulu çözeltide alfa ve beta izomerlerinin birbirine dönüşmesine ne ad verilir?",
        options: ["Kondenzasyon", "Hidroliz", "Mutarotasyon", "Yükseltgenme"],
        correct: 2,
        explanation: "Alfa ve beta izomerlerinin sulu çözeltide birbirine dönüşmesine mutarotasyon denir[cite: 166]."
      },
      {
        id: "q10",
        question: "Bakteriyel hücre duvarı yapısında bulunan amino şeker türevi hangisidir?",
        options: ["N-asetil glukozamin", "D-Galaktozamin", "D-Mannozamin", "Glukonik asit"],
        correct: 0,
        explanation: "N-asetil glukozamin bakteriyel hücre duvarı yapısında yer alır[cite: 176]."
      },
      {
        id: "q11",
        question: "Glukozun anomerik karbonu karboksile yükseltgenirse hangi asit oluşur?",
        options: ["Glukuronik asit", "Glukonik asit", "Aldarik asit", "Muramik asit"],
        correct: 1,
        explanation: "Glukozun karbonil karbonu yükseltgenirse glukonik asit oluşur[cite: 179, 199]."
      },
      {
        id: "q12",
        question: "Hücrede şekerlerin fosforillenmesinin temel amacı nedir?",
        options: ["Şekeri parçalamak", "Şekeri yükseltgemek", "Şekeri hücre içinde tutmak", "Şekeri tatlandırmak"],
        correct: 2,
        explanation: "Şeker fosforillenmesi şekerleri aktifleştirir ve negatif yük nedeniyle hücrede tutar[cite: 200, 201]."
      },
      {
        id: "q13",
        question: "İndirgen bir şekerin varlığını test etmek için hangi iyon kullanılır?",
        options: ["Fe2+", "Cu2+", "Mg2+", "Zn2+"],
        correct: 1,
        explanation: "Monosakkaritler Cu2+ ve Fe3+ gibi ajanları indirgeyebilirler[cite: 202, 205]."
      },
      {
        id: "q14",
        question: "Sükroz (çay şekeri) hangi iki birimden oluşur?",
        options: ["Glukoz + Glukoz", "Glukoz + Galaktoz", "Glukoz + Fruktoz", "Galaktoz + Fruktoz"],
        correct: 2,
        explanation: "Sükroz, glukoz ve fruktozun birleşmesiyle oluşur[cite: 312, 313]."
      },
      {
        id: "q15",
        question: "Hangisi 'indirgen olmayan' bir şekerdir?",
        options: ["Maltoz", "Laktoz", "Sükroz", "Galaktoz"],
        correct: 2,
        explanation: "Sükrozda serbest anomerik karbon bulunmadığı için indirgen değildir[cite: 263]."
      },
      {
        id: "q16",
        question: "Nişastanın dallanmamış, alfa(1-4) bağları içeren polimeri hangisidir?",
        options: ["Amilopektin", "Amiloz", "Glikojen", "Selüloz"],
        correct: 1,
        explanation: "Amiloz, D-glukoz birimlerinin alfa(1-4) bağlarıyla bağlandığı uzun ve dallanmamış bir zincirdir[cite: 325]."
      },
      {
        id: "q17",
        question: "Hayvan hücrelerinin ana depo polisakkariti hangisidir?",
        options: ["Nişasta", "Selüloz", "Glikojen", "Kitin"],
        correct: 2,
        explanation: "Glikojen, hayvan hücrelerinin ana depo polisakkaritidir[cite: 321, 330]."
      },
      {
        id: "q18",
        question: "Glikojende dallanma noktaları hangi bağ ile kurulur?",
        options: ["alfa(1-4)", "beta(1-4)", "alfa(1-6)", "beta(1-6)"],
        correct: 2,
        explanation: "Glikojende dallanma noktaları alfa(1-6) glikozit bağlarıdır[cite: 330]."
      },
      {
        id: "q19",
        question: "Selülozda bulunan bağ tipi aşağıdakilerden hangisidir?",
        options: ["alfa(1-4)", "beta(1-4)", "alfa(1-6)", "beta(1-3)"],
        correct: 1,
        explanation: "Selüloz, beta(1-4) glikozit bağları içeren düz zincirli bir polimerdir[cite: 335]."
      },
      {
        id: "q20",
        question: "Eklem bacaklıların dış kabuğunu oluşturan homopolisakkarit hangisidir?",
        options: ["Dekstran", "Agar", "Kitin", "Glikojen"],
        correct: 2,
        explanation: "Kitin, eklem bacaklıların sert dış kabuklarının bileşenidir[cite: 344, 345]."
      },
      {
        id: "q21",
        question: "Göz yaşında bulunup bakteriyel enfeksiyona karşı koruyan enzim hangisidir?",
        options: ["Amilaz", "Selülaz", "Lizozim", "Hiyaluronidaz"],
        correct: 2,
        explanation: "Lizozim göz yaşında bulunur ve bakteri hücre duvarını parçalayarak savunma yapar[cite: 361]."
      },
      {
        id: "q22",
        explanation: "Agarozun en yaygın laboratuvar kullanımı hangisidir?",
        question: "Agaroz ne amaçla kullanılır?",
        options: ["Enerji depolama", "Hücre duvarı yapımı", "Elektroforez ve besi yeri", "Hormon sentezi"],
        correct: 2,
        explanation: "Agaroz yüksek jelleşme özelliği nedeniyle elektroforez ve besi yerlerinde kullanılır[cite: 365]."
      },
      {
        id: "q23",
        question: "Hücre dışı matrisin (ECM) temel heteropolisakkaritlerine ne ad verilir?",
        options: ["Glikozaminoglikanlar", "Homoglikanlar", "Triozlar", "Dekstranlar"],
        correct: 0,
        explanation: "ECM'deki heteropolisakkaritlere glikozaminoglikanlar denir[cite: 366, 369]."
      },
      {
        id: "q24",
        question: "Pıhtılaşmayı baskılamak için kullanılan en yüksek negatif yüklü biyomolekül hangisidir?",
        options: ["Hiyaluronan", "Heparin", "Dermatan Sülfat", "Keratan Sülfat"],
        correct: 1,
        explanation: "Heparin, pıhtılaşmayı baskılar ve biyolojik makromoleküller arasında en yüksek negatif yük yoğunluğuna sahiptir[cite: 383, 384]."
      },
      {
        id: "q25",
        question: "Karbonhidrat bağlayan spesifik proteinlere ne ad verilir?",
        options: ["Glikolipidler", "Selektinler", "Lektinler", "Müsinler"],
        correct: 2,
        explanation: "Lektinler şeker kodunu okuyan ve karbonhidratlara özgül bağlanan proteinlerdir[cite: 414, 415]."
      },
      {
        id: "q26",
        question: "D-Glukoz'un C-4 epimeri olan şeker hangisidir?",
        options: ["D-Mannoz", "D-Galaktoz", "D-Riboz", "D-Fruktoz"],
        correct: 1,
        explanation: "D-Galaktoz, glukozun C-4 epimeridir[cite: 98]."
      },
      {
        id: "q27",
        question: "Hücre zarındaki oligosakkaritlerin oluşturduğu 'bilgi taşıma' tabakasına ne ad verilir?",
        options: ["Glikokaliks", "Peptidoglikan", "Amiloplast", "Kapsül"],
        correct: 0,
        explanation: "Hücre yüzeyindeki karbonhidrat yapısına glikokaliks denir[cite: 391]."
      },
      {
        id: "q28",
        question: "Hangisi beş karbonlu bir aldozdur (aldopentoz)?",
        options: ["Eritroz", "Riboz", "Glukoz", "Dihidroksiaseton"],
        correct: 1,
        explanation: "Riboz 5 karbonlu bir aldozdur[cite: 89]."
      },
      {
        id: "q29",
        question: "Glikoproteinlerde karbonhidrat hangi atoma 'N-bağlı' olabilir?",
        options: ["Serin oksijeni", "Amit azotu", "Tirozin oksijeni", "Karboksil karbonu"],
        correct: 1,
        explanation: "Karbonhidratlar amit azotuna glikozit bağıyla N-bağlı olabilir[cite: 403]."
      },
      {
        id: "q30",
        question: "Gram negatif bakterilerin zarında bulunan endotoksin yapısı hangisidir?",
        options: ["Glikolipit", "Proteoglikan", "Lipopolisakkarit", "Glikokaliks"],
        correct: 2,
        explanation: "Lipopolisakkaritler gram negatif bakterilerin zarında bulunur ve endotoksin görevi görür[cite: 407]."
      },
      {
        id: "q31",
        question: "Amilopectin ve Glikojen arasındaki temel fark nedir?",
        options: ["Bağ tipleri", "Monomerleri", "Dallanma sıklığı", "Molekül ağırlığı"],
        correct: 2,
        explanation: "Glikojen, amilopectine göre çok daha sık (her 8-12 kalıntıda bir) dallanmıştır[cite: 330]."
      },
      {
        id: "q32",
        question: "Enantiyomerlerin (D ve L formları) belirlenmesinde hangi karbon referans alınır?",
        options: ["Karbonil karbonu", "En uçtaki kiral karbon", "C-1 karbonu", "Anomerik karbon"],
        correct: 1,
        explanation: "Karbonil grubundan en uzak kiral merkezin düzenlenmesine göre belirlenir[cite: 71, 72]."
      },
      {
        id: "q33",
        question: "Beş üyeli halkalı şeker yapılarına ne ad verilir?",
        options: ["Piranoz", "Furanoz", "Pentoz", "Ketoz"],
        correct: 1,
        explanation: "5 üyeli halkalı yapılara furanoz denir[cite: 150]."
      },
      {
        id: "q34",
        question: "Glukozun C-6 karbonu karboksile yükseltgenirse ne ad verilir?",
        options: ["Glukonik asit", "Glukuronik asit", "Aldonik asit", "Askorbik asit"],
        correct: 1,
        explanation: "Zincirin diğer ucundaki (C-6) karbon yükseltgenirse uronik asitler (örn: glucuronik) oluşur[cite: 186, 187]."
      },
      {
        id: "q35",
        question: "İmmün hücrelerin enfeksiyon bölgesine geçişine aracılık eden lektin ailesi hangisidir?",
        options: ["Müsinler", "Selektinler", "Glikolipidler", "Heparinler"],
        correct: 1,
        explanation: "Selektinler, hücre-hücre tanımasında ve adezyonuna aracılık eden bir lektin ailesidir[cite: 419]."
      },
      {
        id: "q36",
        question: "Bir şekerin -OH grubu ile diğerinin anomerik karbonu arasındaki bağa ne ad verilir?",
        options: ["Peptit bağı", "Fosfodiester bağı", "O-glikozit bağı", "Hidrojen bağı"],
        correct: 2,
        explanation: "Bir şekerin -OH grubu ile diğerinin anomerik karbonu arasında O-glikozit bağı oluşur[cite: 208]."
      },
      {
        id: "q37",
        question: "Maltoz hangi iki birimden oluşur?",
        options: ["Glukoz + Glukoz", "Glukoz + Galaktoz", "Glukoz + Fruktoz", "Mannoz + Galaktoz"],
        correct: 0,
        explanation: "Maltoz iki glukoz biriminden oluşur[cite: 237, 285]."
      },
      {
        id: "q38",
        question: "Laktoz (süt şekeri) hangi iki birimden oluşur?",
        options: ["Glukoz + Fruktoz", "Galaktoz + Fruktoz", "D-galaktoz + D-glukoz", "D-mannoz + D-glukoz"],
        correct: 2,
        explanation: "Laktoz, D-galaktoz ve D-glukozun birleşmesiyle oluşur[cite: 260]."
      },
      {
        id: "q39",
        question: "D-Riboz ve 2-deoksi-D-riboz arasındaki fark nedir?",
        options: ["Karbon sayısı", "C-2'deki oksijen eksikliği", "Aldoz/Ketoz farkı", "Halka yapısı"],
        correct: 1,
        explanation: "Deoksiribozda C-2 konumundaki -OH grubu yerine H bulunur[cite: 42, 61]."
      },
      {
        id: "q40",
        question: "Nişasta taneciklerinde amiloz ve amilopektin birlikte hangi yapıyı oluşturur?",
        options: ["Üçlü sarmal", "Çift sarmal", "Beta kırmalı sayfa", "Düz levha"],
        correct: 1,
        explanation: "Amilopektin ve amiloz dizileri birlikte çift sarmal yapısı oluşturur[cite: 328, 329]."
      },
      {
        id: "q41",
        question: "Keratan sülfat nerede bulunur?",
        options: ["Eklemler", "Kıkırdak", "Saç, tırnak, pençe", "Bağırsaklar"],
        correct: 2,
        explanation: "Keratan sülfatlar saç, toynak, tırnak gibi ölü hücre yapılarında bulunur[cite: 381]."
      },
      {
        id: "q42",
        question: "Dermatan sülfatın biyolojik görevi nedir?",
        options: ["Pıhtılaşma", "Deri esnekliği ve kalp kapakçıkları", "Gözyaşı üretimi", "Kemik yapımı"],
        correct: 1,
        explanation: "Dermatan sülfat deri esnekliği, kan damarları ve kalp kapakçıklarında görev alır[cite: 380]."
      },
      {
        id: "q43",
        question: "Trehaloz ile Maltoz arasındaki fark nedir?",
        options: ["Monomer sayıları", "Bağlandıkları karbonlar", "Heksoz türleri", "Ketoz olmaları"],
        correct: 1,
        explanation: "Her ikisi de glukozdan oluşur ancak trehalozda bağ alfa(1-1) iken maltozda alfa(1-4)'tür[cite: 297, 298]."
      },
      {
        id: "q44",
        question: "Sandalye konformasyonuna geçiş için ne gereklidir?",
        options: ["Bağ kırılması", "Sadece bağ açılarının dönmesi", "Su katılması", "Enzim etkisi"],
        correct: 1,
        explanation: "Sandalye konformasyonuna geçmek için bağ kırılmasına gerek yoktur, sadece konformasyonel değişimdir[cite: 168]."
      },
      {
        id: "q45",
        question: "Glikozit bağı aşağıdakilerden hangisine dirençlidir?",
        options: ["Sıcak asit", "Bazlar", "Enzimler", "Su"],
        correct: 1,
        explanation: "Glikozit bağları asitle kolayca hidroliz olurken baza dirençlidir[cite: 210]."
      }
    ]
  }
];

const FLASHCARDS = [
  {
    id: "fc1",
    subject: "Biyokimya",
    subjectColor: "#e67e22",
    question: "Şeker kodu (Sugar Code) nedir?",
    answer: "Hücrelerin bilgi şifrelemek için kullandığı eşsiz oligosakkarit dizileri ve 3-B görüntüleridir[cite: 408, 414]."
  },
  {
    id: "fc2",
    subject: "Biyokimya",
    subjectColor: "#e67e22",
    question: "Proteoglikan ve Glikoprotein farkı nedir?",
    answer: "Proteoglikanlar daha çok glikozaminoglikan içerir ve ECM bileşenidir; glikoproteinlerin karbonhidrat kısımları daha kısa ve daha dallanmıştır[cite: 393, 402]."
  },
  {
    id: "fc3",
    subject: "Biyokimya",
    subjectColor: "#e67e22",
    question: "Hangi disakkaritler indirgendir?",
    answer: "Maltoz ve Laktoz serbest anomerik karbon içerdiği için indirgendir. Sükroz ve Trehaloz değildir[cite: 261, 263, 283]."
  },
  {
    id: "fc4",
    subject: "Biyokimya",
    subjectColor: "#e67e22",
    question: "Müsinler nedir?",
    answer: "Genelde salgılarda bulunan, bir çeşit zar glikoproteinidir[cite: 404]."
  },
  {
    id: "fc5",
    subject: "Biyokimya",
    subjectColor: "#e67e22",
    question: "Heteropolisakkarit nedir?",
    answer: "Birden fazla farklı tip monosakkarit biriminin birleşmesiyle oluşan polimerdir (Örn: Peptidoglikan)[cite: 317, 358]."
  }
];