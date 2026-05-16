// ─── STORE.JSX'İN SADECE DEĞİŞEN useEffect KISMI ────────────────
// Eski tek satırlık fetch yerine aşağıdakini kullan:

useEffect(() => {
  dispatch({ type: A.SET_UI, payload: { loading: true } })

  // 1. Önce index.json'u çek → dosya listesini al
  fetch(`${import.meta.env.BASE_URL}questions/index.json`)
    .then(r => r.json())
    .then(({ files }) => {
      // 2. Listedeki her JSON'u paralel çek
      return Promise.all(
        files.map(path =>
          fetch(`${import.meta.env.BASE_URL}${path}`).then(r => r.json())
        )
      )
    })
    .then(results => {
      // 3. Hepsini tek düz diziye birleştir (her dosya bir dizi döndürür)
      const merged = results.flat()
      dispatch({ type: A.SET_DATASET, payload: merged })
      dispatch({ type: A.SET_UI, payload: { loading: false } })
    })
    .catch(err =>
      dispatch({ type: A.SET_UI, payload: { loading: false, error: err.message } })
    )
}, [])

// ─── KLASÖR YAPISI ────────────────────────────────────────────────
// public/
// ├── questions/
// │   ├── index.json                  ← loader buraya bakıyor
// │   ├── physics_thermodynamics.json
// │   ├── math_calculus.json
// │   └── ... (yeni konu ekleyince buraya da ekle)
// └── access.json
