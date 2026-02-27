// ═══════════════════════════════════════════════════════════
// 📚 StudyDeck — BİYOKİMYA 2 (Temizlenmiş ve Kapsamlı Set)
// ═══════════════════════════════════════════════════════════

const SUBJECTS = [
  {
    id: "biyokimya_final",
    title: "Biyokimya: Karbonhidratlar",
    icon: "🧪",
    color: "#e67e22",
    description: "50 Soruluk Kapsamlı Bilgi Testi",
    questions: [
      {
        id: "q1",
        question: "Yeryüzünde en bol bulunan biyomolekül sınıfı hangisidir?",
        options: ["Nükleik asitler", "Proteinler", "Karbonhidratlar", "Lipitler"],
        correct: 2,
        explanation: "Karbonhidratlar yeryüzündeki en yaygın biyomoleküllerdir[cite: 1, 3]."
      },
      {
        id: "q2",
        question: "Eklemlerde kayganlaştırıcı, hücre duvarında ise koruyucu eleman olarak görev yapan yapı hangisidir?",
        options: ["Karbonhidrat polimerleri", "Basit şekerler", "Amino asitler", "Serbest radikaller"],
        correct: 0,
        explanation: "Glikanlar olarak da bilinen polimerler eklemlerde kayganlaştırıcı ve hücre duvarlarında yapısal koruyucudur[cite: 7, 8, 9]."
      },
      {
        id: "q3",
        question: "Karbonil grubu zincirin sonunda bulunan şekerlere ne ad verilir?",
        options: ["Ketoz", "Trioz", "Aldoz", "Heksoz"],
        correct: 2,
        explanation: "Karbonil grubu zincir sonundaysa aldehit grubunu oluşturur ve bu şekerlere aldoz denir[cite: 22]."
      },
      {
        id: "q4",
        question: "En basit monosakkarit olan 3 karbonlu 'ketotrioz' aşağıdakilerden hangisidir?",
        options: ["Gliseraldehit", "Eritroz", "Riboz", "Dihidroksiaseton"],
        correct: 3,
        explanation: "Dihidroksiaseton 3 karbonlu en basit ketozdur[cite: 30, 68]."
      },
      {
        id: "q5",
        question: "D-Gliseraldehit ve L-Gliseraldehit arasındaki farkı belirleyen temel kriter nedir?",
        options: ["Karbon sayısı", "Referans karbonun kiral merkezi", "Halka yapısı", "Fosfat grubu"],
        correct: 1,
        explanation: "Referans kiral merkezin düzenlenişine göre D veya L izomerliği belirlenir[cite: 72, 77]."
      },
      {
        id: "q6",
        question: "Sadece tek bir karbon atomu etrafındaki düzenlenişi farklı olan şekerlere ne ad verilir?",
        options: ["Anomer", "Enantiyomer", "Epimer", "Diastereomer"],
        correct: 2,
        explanation: "Sadece bir karbon etrafındaki konfigürasyonu farklı olan şekerler epimerdir[cite: 96]."
      },
      {
        id: "q7",
        question: "D-Glukoz'un C-2 epimeri aşağıdakilerden hangisidir?",
        options: ["D-Mannoz", "D-Galaktoz", "D-Riboz", "D-Fruktoz"],
        correct: 0,
        explanation: "D-Mannoz, glukozun C-2 konumundaki epimeridir[cite: 98]."
      },
      {
        id: "q8",
        question: "D-Glukoz'un C-4 epimeri olan şeker hangisidir?",
        options: ["D-Riboz", "D-Galaktoz", "D-Mannoz", "D-Ksiloz"],
        correct: 1,
        explanation: "D-Galaktoz, glukozun C-4 konumundaki epimeridir[cite: 98]."
      },
      {
        id: "q9",
        question: "Karbonhidratlarda halkalı yapı oluşturan karbon atomuna ne ad verilir?",
        options: ["Anomerik merkez", "Kiral merkez", "Merkezi karbon", "Uç karbon"],
        correct: 0,
        explanation: "Halkalı yapı oluşturan karbona anomerik merkez denir[cite: 107]."
      },
      {
        id: "q10",
        question: "Altı üyeli halkalı şeker yapıları hangi genel isimle anılır?",
        options: ["Furanoz", "Heptoz", "Piranoz", "Tetroz"],
        correct: 2,
        explanation: "Altı üyeli halkalı bileşiklere piranoz denir[cite: 136]."
      },
      {
        id: "q11",
        question: "Sulu çözeltide alfa ve beta anomerlerinin birbirine dönüşmesi olayına ne denir?",
        options: ["Hidroliz", "Mutarotasyon", "Kondenzasyon", "Yükseltgenme"],
        correct: 1,
        explanation: "Alfa ve beta formlarının çözeltide birbirine dönüşmesine mutarotasyon denir[cite: 166]."
      },
      {
        id: "q12",
        question: "Glukozun C-2 konumundaki -OH grubu amino grubu ile yer değiştirirse hangi molekül oluşur?",
        options: ["Glukuronik asit", "Glukonik asit", "Glukozamin", "Muramik asit"],
        correct: 2,
        explanation: "OH grubu amino grubu ile yer değiştirdiğinde glukozamin oluşur[cite: 176]."
      },
      {
        id: "q13",
        question: "Glukozun karbonil karbonu (C-1) karboksil grubuna yükseltgenirse ne oluşur?",
        options: ["Glukuronik asit", "Glukonik asit", "Muramik asit", "Sorbitol"],
        correct: 1,
        explanation: "Karbonil karbonu yükseltgenirse aldonik asit (glukoz için glukonik asit) oluşur[cite: 179, 180]."
      },
      {
        id: "q14",
        question: "Glukozun C-6 karbonu karboksil grubuna yükseltgenirse hangi yapı meydana gelir?",
        options: ["Glukonik asit", "Glukoz-6-fosfat", "Glukuronik asit", "Glukarik asit"],
        correct: 2,
        explanation: "Zincirin diğer ucundaki C-6 karbonu yükseltgenirse uronik asitler oluşur[cite: 186, 187]."
      },
      {
        id: "q15",
        question: "Şekerlerin hücre içinde tutulmasını ve kimyasal olarak aktifleştirilmesini sağlayan modifikasyon nedir?",
        options: ["Yükseltgenme", "Fosforillenme", "Amino grup eklenmesi", "Deoksijenasyon"],
        correct: 1,
        explanation: "Fosforillenme şekerleri negatif yüklü yapar ve hücrede tutar[cite: 200, 201]."
      },
      {
        id: "q16",
        question: "Sükroz (çay şekeri) neden indirgen bir şeker değildir?",
        options: ["Çok büyük olduğu için", "Suda çözünmediği için", "Serbest anomerik karbonu bulunmadığı için", "Fruktoz içerdiği için"],
        correct: 2,
        explanation: "Sükrozda her iki anomerik karbon da bağa katıldığı için indirgen özellik gösteremez[cite: 263, 314]."
      },
      {
        id: "q17",
        question: "Süt şekeri olarak bilinen ve galaktoz ile glukozdan oluşan disakkarit hangisidir?",
        options: ["Maltoz", "Sükroz", "Laktoz", "Trehaloz"],
        correct: 2,
        explanation: "Laktoz, D-galaktoz ve D-glukozdan oluşur[cite: 259, 260]."
      },
      {
        id: "q18",
        question: "Bitkilerde enerji depolama formu olan nişasta hangi iki polimerden oluşur?",
        options: ["Selüloz ve Kitin", "Amiloz ve Amilopektin", "Glikojen ve Amiloz", "Dekstran ve Agaroz"],
        correct: 1,
        explanation: "Nişasta, amiloz ve amilopektin birleşiminden oluşur[cite: 324]."
      },
      {
        id: "q19",
        question: "Nişastanın dallanmamış ve alfa 1-4 bağları içeren yapısı hangisidir?",
        options: ["Amilopektin", "Glikojen", "Amiloz", "Selüloz"],
        correct: 2,
        explanation: "Amiloz, uzun ve dallanmamış bir alfa 1-4 glukoz polimeridir[cite: 325]."
      },
      {
        id: "q20",
        question: "Glikojenin amilopektinden temel farkı nedir?",
        options: ["Bağ tiplerinin farklı olması", "Daha az dallanmış olması", "Daha sık dallanmış olması", "Sadece bitkilerde bulunması"],
        correct: 2,
        explanation: "Glikojen, nişastadan daha sık dallanmış bir yapıya sahiptir[cite: 330]."
      },
      {
        id: "q21",
        question: "Selülozun insanlar tarafından sindirilememesinin nedeni nedir?",
        options: ["Alfa 1-4 bağlarını kıramamak", "Beta 1-4 bağlarını kıramamak", "Çok yüksek molekül ağırlığı", "Suda çözünmemesi"],
        correct: 1,
        explanation: "İnsanlarda beta 1-4 bağlarını parçalayacak selülaz enzimi yoktur[cite: 335, 337, 340]."
      },
      {
        id: "q22",
        question: "Eklem bacaklıların dış kabuğunda bulunan N-asetilglukozamin homopolimeri hangisidir?",
        options: ["Selüloz", "Dekstran", "Kitin", "Glikojen"],
        correct: 2,
        explanation: "Kitin, eklem bacaklıların sert dış kabuğunu oluşturur[cite: 344, 345]."
      },
      {
        id: "q23",
        question: "Nişasta ve glikojen için en kararlı yapı aşağıdakilerden hangisidir?",
        options: ["Düz zincir", "Sıkı katlanmış sarmal", "Beta kırmalı sayfa", "Kavisli halka"],
        correct: 1,
        explanation: "Alfa 1-4 bağları için en kararlı yapı sıkı katlanmış sarmaldır[cite: 349]."
      },
      {
        id: "q24",
        question: "Bakteri hücre duvarında bulunan peptidoglikan hangi iki şeker türevini içerir?",
        options: ["Glukoz ve Fruktoz", "N-asetilglukozamin ve N-asetilmuramik asit", "Galaktoz ve Mannoz", "Riboz ve Deoksiriboz"],
        correct: 1,
        explanation: "Peptidoglikan tabakası GlcNAc ve Mur2Ac birimlerinden oluşur[cite: 360]."
      },
      {
        id: "q25",
        question: "Hücre dışı matrisin (ECM) temel bileşeni olan heteropolisakkarit grubu hangisidir?",
        options: ["Glikozaminoglikanlar", "Homoglikanlar", "Triozlar", "Lektinler"],
        correct: 0,
        explanation: "ECM boşluğunu dolduran matris maddeleri glikozaminoglikanlardır[cite: 366, 369]."
      },
      {
        id: "q26",
        question: "Biyolojik makromoleküller arasında en yüksek negatif yük yoğunluğuna sahip olan hangisidir?",
        options: ["Hiyaluronan", "Heparin", "Nişasta", "Keratan sülfat"],
        correct: 1,
        explanation: "Heparin, biyolojik sistemlerdeki en yüksek negatif yük yoğunluğuna sahip moleküldür[cite: 384]."
      },
      {
        id: "q27",
        question: "Karbonhidratlara yüksek özgüllükle bağlanan ve 'şeker kodunu' okuyan proteinler hangisidir?",
        options: ["Müsinler", "Selektinler", "Lektinler", "Glikolipitler"],
        correct: 2,
        explanation: "Lektinler şeker kodunu okuyan ve biyolojik işlemlere aracılık eden proteinlerdir[cite: 415, 416]."
      },
      {
        id: "q28",
        question: "Enflamatuar yanıtlarda lökositlerin damar duvarına yapışmasını sağlayan lektin ailesi hangisidir?",
        options: ["Selektinler", "İmmünoglobulinler", "İnsülinler", "Glikokaliksler"],
        correct: 0,
        explanation: "Selektinler hücre-hücre tanıması ve adezyonuna aracılık eder[cite: 419]."
      },
      {
        id: "q29",
        question: "D-Riboz şekerinin 2. karbonundan bir oksijen atomu ayrılırsa ne oluşur?",
        options: ["D-Arabinoz", "2-deoksi-D-riboz", "D-Ksiloz", "D-Liksoz"],
        correct: 1,
        explanation: "Ribozun 2. karbonunda oksijen eksilmesi deoksiribozu oluşturur[cite: 42]."
      },
      {
        id: "q30",
        question: "Hangi polisakkarit türü enzimlerin etkisiyle belirli bir noktada durmaksızın 'kalıpsız' sentezlenir?",
        options: ["Proteinler", "DNA", "Polisakkariitler", "RNA"],
        correct: 2,
        explanation: "Polisakkariitlerin proteinlerden farkı, belirli bir molekül ağırlıklarının olmaması ve kalıpsız sentezlenmeleridir[cite: 319]."
      },
      {
        id: "q31",
        question: "Sıvı tutma kapasitesi yüksek olan ve eklem sıvısında bulunan glikozaminoglikan hangisidir?",
        options: ["Dermatan sülfat", "Hiyaluronan", "Heparin", "Kitin"],
        correct: 1,
        explanation: "Hiyaluronan eklem sıvısında kayganlaştırıcı olarak görev yapar[cite: 376]."
      },
      {
        id: "q32",
        question: "Hangisi indirgen bir disakkarit örneğidir?",
        options: ["Sükroz", "Maltoz", "Trehaloz", "Nişasta"],
        correct: 1,
        explanation: "Maltoz, serbest bir anomerik karbona sahip olduğu için indirgendir[cite: 253, 285]."
      },
      {
        id: "q33",
        question: "Bakteri ve mayalarda bulunan, alfa 1-6 bağlı glukoz polimerleri hangisidir?",
        options: ["Glikojen", "Dekstranlar", "Selüloz", "Amiloz"],
        correct: 1,
        explanation: "Dekstranlar bakteri ve maya polisakkaritleridir[cite: 332]."
      },
      {
        id: "q34",
        question: "Keratan sülfat vücudun hangi yapılarında bolca bulunur?",
        options: ["Eklem sıvısı", "Kıkırdak", "Saç, tırnak ve boynuzumsu yapılar", "Kan plazması"],
        correct: 2,
        explanation: "Keratan sülfatlar saç, toynak ve tırnak gibi yapılarda bulunur[cite: 381]."
      },
      {
        id: "q35",
        question: "Glikozidik bağların parçalanması için hangi işlem gereklidir?",
        options: ["Asitle kaynatma", "Bazla nötralizasyon", "Dondurma", "Sadece su ekleme"],
        correct: 0,
        explanation: "Glikozit bağı asitle kolayca hidroliz olur ancak baza dirençlidir[cite: 210]."
      },
      {
        id: "q36",
        question: "Hangisi beş karbonlu bir ketoz (ketopentoz) örneğidir?",
        options: ["Riboz", "Ribuloz", "Fruktoz", "Glukoz"],
        correct: 1,
        explanation: "Ribuloz, 5 karbonlu bir ketozdur[cite: 92, 94]."
      },
      {
        id: "q37",
        question: "D-Glukoz ve L-Glukoz arasındaki ilişki nedir?",
        options: ["Epimer", "Anomer", "Enantiyomer", "İzotop"],
        correct: 2,
        explanation: "Birbirinin ayna görüntüsü olan D ve L formları enantiyomerdir[cite: 14]."
      },
      {
        id: "q38",
        question: "Beş üyeli halkalı yapı oluşturan şekerlere ne ad verilir?",
        options: ["Piranoz", "Furanoz", "Heksoz", "Heptoz"],
        correct: 1,
        explanation: "Beş üyeli halkalara furanoz denir[cite: 150]."
      },
      {
        id: "q39",
        question: "D-Glukoz sulu çözeltide en çok hangi formda bulunur?",
        options: ["Çizgisel yapı", "Halkalı yapı", "Ketoz yapı", "Dallanmış yapı"],
        correct: 1,
        explanation: "5 karbonlu ve daha büyük şekerler çözeltide çoğunlukla halkalı formdadır[cite: 100]."
      },
      {
        id: "q40",
        question: "Proteoglikanların glikoproteinlerden temel farkı nedir?",
        options: ["Daha kısa olmaları", "Glikozaminoglikan zinciri içermeleri", "Sadece lipit içermeleri", "Hücre içinde bulunmamaları"],
        correct: 1,
        explanation: "Proteoglikanlar uzun glikozaminoglikan zincirlerinin bir proteine bağlanmasıyla oluşur[cite: 393, 400]."
      },
      {
        id: "q41",
        question: "Hücre zarının stabilitesini ve hücresel tanınmayı sağlayan karbonhidrat-lipit bileşikleri hangisidir?",
        options: ["Glikolipitler", "Glikoproteinler", "Serebrositler", "Fosfolipitler"],
        correct: 0,
        explanation: "Glikolipitler hücre zarında tanıma ve stabilite görevleri üstlenir[cite: 405]."
      },
      {
        id: "q42",
        question: "Gram negatif bakterilerin dış zarında bulunan ve endotoksin olarak davranan yapı hangisidir?",
        options: ["Peptidoglikan", "Lipopolisakkarit", "Glikokaliks", "Müsin"],
        correct: 1,
        explanation: "Lipopolisakkaritler gram negatif bakterilerin zar parçasıdır ve toksik etki yapabilir[cite: 407]."
      },
      {
        id: "q43",
        question: "Şekerlerin asimetrik merkezlerinin sayısını ne belirler?",
        options: ["Karbon sayısı", "Hidrojen sayısı", "Oksijen sayısı", "Halka büyüklüğü"],
        correct: 0,
        explanation: "Monosakkaritler karbon sayılarına bağlı olarak bir veya daha fazla asimetrik merkeze sahiptir[cite: 52, 65]."
      },
      {
        id: "q44",
        question: "Dört karbonlu aldoz şekerlere ne ad verilir?",
        options: ["Aldotrioz", "Aldotetroz", "Aldopentoz", "Aldoheksoz"],
        correct: 1,
        explanation: "4 karbonlu şekerler tetroz, aldehit grubu taşıyanlar ise aldotetroz olarak adlandırılır[cite: 35, 100]."
      },
      {
        id: "q45",
        question: "Alfa ve beta anomerlerini birbirinden ayıran temel özellik nedir?",
        options: ["Karbon sayıları", "Anomerik karbondaki -OH grubunun yönü", "Halkadaki atom sayısı", "Suda çözünürlükleri"],
        correct: 1,
        explanation: "Anomerik karbonun -OH grubunun konumu alfa veya beta formunu belirler[cite: 107, 120, 141]."
      },
      {
        id: "q46",
        question: "Bitki hücre duvarının temel yapısal bileşeni hangisidir?",
        options: ["Nişasta", "Selüloz", "Glikojen", "Agaroz"],
        correct: 1,
        explanation: "Selüloz bitkilerin hücre duvarı ve odunsu kısımlarının ana bileşenidir[cite: 334]."
      },
      {
        id: "q47",
        question: "Sandalye konformasyonu ile ilgili hangisi doğrudur?",
        options: ["Bağ kırılması gerekir", "Bağ kırılmasına gerek yoktur", "Sadece ketozlarda görülür", "Sadece suda oluşur"],
        correct: 1,
        explanation: "Sandalye konformasyonuna geçiş için bağların kırılmasına gerek yoktur[cite: 168]."
      },
      {
        id: "q48",
        question: "Maltozda glukoz birimleri arasındaki bağ tipi nedir?",
        options: ["Alfa 1-4", "Beta 1-4", "Alfa 1-6", "Alfa 1-1"],
        correct: 0,
        explanation: "Maltoz, iki glukoz biriminin alfa 1-4 bağıyla bağlanmasıyla oluşur[cite: 248, 285]."
      },
      {
        id: "q49",
        question: "Bir polimerin 'indirgen ucu' neyi ifade eder?",
        options: ["En son eklenen şekeri", "Bağa katılmayan serbest anomerik karbonu", "Dallanma noktasını", "En yüksek enerjili bağı"],
        correct: 1,
        explanation: "Bağa katılmayan serbest anomerik karbon içeren uç indirgen uçtur[cite: 253]."
      },
      {
        id: "q50",
        question: "D-Fruktoz'un halkalı yapısı genellikle hangi formdadır?",
        options: ["Piranoz", "Furanoz", "Heptoz", "Düz zincir"],
        correct: 1,
        explanation: "Yaygın fruktoz anomeri beta-D-fruktofuranozdur[cite: 160, 167]."
      }
    ]
  }
];
// ═══════════════════════════════════════════════════════════
// 📚 StudyDeck — BİYOKİMYA 2 (Genişletilmiş Flash Card Seti)
// ═══════════════════════════════════════════════════════════

const FLASHCARDS = [
  {
    id: "fc1",
    subject: "Biyokimya",
    question: "Şeker Kodu (Sugar Code) nedir?",
    answer: "Hücrelerin bilgi şifrelemek ve iletmek için kullandığı özgül oligosakkarit dizileri ve bunların 3 boyutlu yapılarıdır[cite: 408, 414]."
  },
  {
    id: "fc2",
    subject: "Biyokimya",
    question: "Epimer ve Anomer farkı nedir?",
    answer: "Epimer, herhangi bir karbon atomunda konfigürasyon farkı gösterirken [cite: 96]; anomer, sadece halkalaşma sırasında oluşan karbonil karbonundaki (anomerik karbon) farklılığı ifade eder[cite: 163, 164]."
  },
  {
    id: "fc3",
    subject: "Biyokimya",
    question: "Neden selülozu sindiremeyiz?",
    answer: "İnsanlarda beta 1-4 glikozit bağlarını koparacak selülaz enzimi bulunmaz; bu enzim sadece bazı mantar ve bakterilerde vardır[cite: 337, 340]."
  },
  {
    id: "fc4",
    subject: "Biyokimya",
    question: "Amilopektin ve Glikojen dallanma farkı?",
    answer: "Glikojen daha sık dallanmıştır (her 8-12 kalıntıda bir)[cite: 330]. Amilopektin ise daha seyrek dallanmıştır (her 24-30 kalıntıda bir)[cite: 326]."
  },
  {
    id: "fc5",
    subject: "Biyokimya",
    question: "Lektinlerin ana görevi nedir?",
    answer: "Karbonhidratları yüksek özgüllükle tanıyıp bağlayarak hücre-hücre tanıması, sinyalleşme ve adezyonu sağlamaktır[cite: 396, 416]."
  },
  {
    id: "fc6",
    subject: "Biyokimya",
    question: "Mutarotasyon nedir?",
    answer: "Glukozun alfa ve beta izomerlerinin sulu çözeltide birbirine dönüşerek dengeye gelmesi olayıdır[cite: 166]."
  },
  {
    id: "fc7",
    subject: "Biyokimya",
    question: "Hangi monosakkarit optik olarak aktif değildir?",
    answer: "Dihidroksiaseton; çünkü kiral (asimetrik) karbon atomu içermeyen tek monosakkarittir[cite: 65, 68]."
  },
  {
    id: "fc8",
    subject: "Biyokimya",
    question: "Glikozaminoglikanlar (GAG) bitkilerde bulunur mu?",
    answer: "Hayır, glikozaminoglikanlar hayvanlara ve bakterilere özgüdür; bitkilerde bulunmazlar[cite: 369]."
  },
  {
    id: "fc9",
    subject: "Biyokimya",
    question: "Heparin molekülünün tıbbi önemi nedir?",
    answer: "En yüksek negatif yük yoğunluğuna sahip moleküldür ve kan pıhtılaşmasını baskılamak (antitrombin etkileşimi) için kullanılır[cite: 383, 384]."
  },
  {
    id: "fc10",
    subject: "Biyokimya",
    question: "Müsinlerin (Mucins) temel özelliği nedir?",
    answer: "Genellikle salgılarda bulunan ve yoğun karbonhidrat içeren bir çeşit zar glikoproteinidir[cite: 404]."
  },
  {
    id: "fc11",
    subject: "Biyokimya",
    question: "Aldonik asit ve Uronik asit farkı?",
    answer: "Aldonik asitte karbonil karbonu (C-1) yükseltgenir[cite: 180]. Uronik asitte ise zincirin diğer ucundaki (C-6) karbon yükseltgenir[cite: 186]."
  },
  {
    id: "fc12",
    subject: "Biyokimya",
    question: "Lizozim enzimi bakteri duvarında nereyi parçalar?",
    answer: "N-asetilglukozamin ile N-asetilmuramik asit arasındaki beta 1-4 glikozit bağlarını hidroliz eder[cite: 360, 361]."
  },
  {
    id: "fc13",
    subject: "Biyokimya",
    question: "Hiyaluronan (Hiyaluronik asit) nerede bulunur?",
    answer: "Eklem sinovial sıvısında kayganlaştırıcı olarak, kıkırdak ve tendonlarda ise ECM bileşeni olarak bulunur[cite: 376, 377]."
  },
  {
    id: "fc14",
    subject: "Biyokimya",
    question: "Şekerlerin fosforillenmesi hücreye ne sağlar?",
    answer: "Negatif yük kazandırarak şekerin hücre içinde kalmasını sağlar ve sonraki kimyasal dönüşümler için onu aktifleştirir[cite: 200, 201]."
  },
  {
    id: "fc15",
    subject: "Biyokimya",
    question: "Homopolisakkarit ve Heteropolisakkarit farkı?",
    answer: "Homopolisakkarit tek tip monomer içerirken (Örn: Nişasta) [cite: 317], heteropolisakkarit iki veya daha fazla farklı tip monomer içerir (Örn: Peptidoglikan)[cite: 317, 360]."
  },
  {
    id: "fc16",
    subject: "Biyokimya",
    question: "Kitin (Chitin) molekülünün selülozdan farkı nedir?",
    answer: "Selülozda C-2'de -OH grubu varken, kitinde bu grupta asetillenmiş bir amino grubu bulunur[cite: 343]."
  },
  {
    id: "fc17",
    subject: "Biyokimya",
    question: "Sükroz neden indirgen değildir?",
    answer: "Çünkü hem glukozun hem de fruktozun anomerik karbonları glikozit bağına katılmıştır; serbest anomerik uç yoktur[cite: 263, 314]."
  },
  {
    id: "fc18",
    subject: "Biyokimya",
    question: "D ve L izomerliği neye göre belirlenir?",
    answer: "Karbonil grubuna en uzak olan kiral merkezin (referans karbon) düzenlenişine göre belirlenir[cite: 71, 72]."
  },
  {
    id: "fc19",
    subject: "Biyokimya",
    question: "Peptidoglikan hangi canlı grubuna özgüdür?",
    answer: "Bakterilere özgüdür ve hücre duvarının yapısal dayanıklılığını sağlar[cite: 358, 360]."
  },
  {
    id: "fc20",
    subject: "Biyokimya",
    question: "Selektinlerin (Selectins) görevi nedir?",
    answer: "Plazma zarında bulunan bu lektinler, bağışıklık hücrelerinin kan damarlarından dokulara geçişine (adezyon) aracılık eder[cite: 419, 420]."
  }
];