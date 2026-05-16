# Soru Üretme Promptu

Aşağıdaki promptu kopyala ve Claude'a yapıştır. Köşeli parantez içindeki alanları doldurmayı unutma.

---

## PROMPT

```
Aşağıdaki kurallara göre JSON formatında soru seti üret.

### Konu bilgileri
- subject (ders/alan adı):  [örn. Physics]
- topic (alt konu):         [örn. Thermodynamics]
- Soru sayısı (test):       [örn. 8 soru — 3 multiple_choice, 2 true_false, 2 fill_in_the_blank, 1 matching]
- Soru sayısı (flashcard):  [örn. 4 flashcard]
- Kaynak/referans:          [örn. Atkins Physical Chemistry Ch.3]
- Zorluk seviyesi:          [Kolay / Orta / Zor]
- Dil:                      [Türkçe / İngilizce]

### Çıktı formatı
Yanıtını SADECE geçerli JSON olarak ver. Markdown kod bloğu, açıklama veya ön söz ekleme.

Döndüreceğin yapı tam olarak şu olmalı:

[
  {
    "subject": "...",
    "topic": "...",
    "category": "test",
    "questions": [
      {
        "type": "multiple_choice",
        "questionText": "...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "hint": "...",
        "source": "..."
      },
      {
        "type": "true_false",
        "questionText": "...",
        "correctAnswer": true,
        "hint": "...",
        "source": "..."
      },
      {
        "type": "fill_in_the_blank",
        "questionText": "Cevabın geldiği yere ___ yaz.",
        "correctAnswer": "tek_kelime_veya_kısa_ifade",
        "hint": "...",
        "source": "..."
      },
      {
        "type": "matching",
        "questionText": "Sol ile sağı eşleştir.",
        "pairs": [
          { "left": "...", "right": "..." },
          { "left": "...", "right": "..." },
          { "left": "...", "right": "..." },
          { "left": "...", "right": "..." }
        ],
        "correctAnswer": { "0": 0, "1": 1, "2": 2, "3": 3 },
        "hint": "...",
        "source": "..."
      }
    ]
  },
  {
    "subject": "...",
    "topic": "...",
    "category": "flashcard",
    "questions": [
      {
        "type": "flashcard",
        "front": "...",
        "back": "...",
        "hint": "...",
        "source": "..."
      }
    ]
  }
]

### Kurallar
1. correctAnswer için multiple_choice'da 0-based index (sayı) kullan.
2. fill_in_the_blank'ta correctAnswer boşluksuz veya tek kelime olmalı;
   çok kelimeli ise alt çizgi kullan: "ideal_gas_law"
3. matching'de pairs dizisi 4 elemanlı olmalı ve correctAnswer her zaman
   { "0":0, "1":1, "2":2, "3":3 } gibi index → index eşlemesi olmalı
   (yani sağ tarafı karıştırıyorsan correctAnswer'ı buna göre güncelle).
4. Hint kısa ve yönlendirici olsun — cevabı doğrudan verme.
5. source alanında "Konu Adı Ch.N" ya da "Kaynak Adı s.NN" formatını kullan.
6. Yanıtta sadece JSON döndür, başka hiçbir şey ekleme.
```

---

## KULLANIM ADIMLARI

1. Promptu kopyala.
2. Köşeli parantez alanları doldurup Claude'a gönder.
3. Dönen JSON'u `public/questions/` klasörüne yeni bir dosya olarak kaydet.
   - Dosya adı formatı: `{subject_küçük}_{topic_küçük}.json`
   - Örnek: `physics_thermodynamics.json`
4. `public/questions/index.json` dosyasına yeni dosyanın yolunu ekle:
   ```json
   {
     "files": [
       "questions/physics_thermodynamics.json",
       "questions/math_calculus.json",
       "questions/yeni_konu.json"    ← buraya ekle
     ]
   }
   ```
5. Bitti! Uygulama bir sonraki yüklemede yeni soruları otomatik çeker.

---

## ÖRNEK DOLU PROMPT

```
subject: Physics
topic: Waves and Optics
Soru sayısı (test): 6 soru — 3 multiple_choice, 2 true_false, 1 fill_in_the_blank
Soru sayısı (flashcard): 3 flashcard
Kaynak: University Physics Ch.16
Zorluk: Orta
Dil: İngilizce
```
