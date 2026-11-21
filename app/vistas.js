// Las vistas reciben el estado completo para que avanzar y retroceder sean simétricos.
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const recursoLocal = (ruta) =>
  globalThis.recursosIntegrados?.[ruta] ?? "./" + ruta;
const archivo = (nombre) => recursoLocal("assets/archivo/" + nombre + ".webp");
const mapa = (nombre) => recursoLocal("assets/mapas/" + nombre + ".svg");
const fig = (texto, marca = "") =>
  `<div class="caption"><span class="tick"></span><span>${esc(texto)}</span>${marca ? "<b>" + esc(marca) + "</b>" : ""}</div>`;
const tag = (s) => `<div class="eyeline"><i></i>${esc(s)}</div>`;
const paneles = [
  ["Historia", "Origen y evolución", "atlas", "Mar Negro · ed. 1911"],
  [
    "Economía",
    "Intercambios y recursos",
    "comercio",
    "Cámara de Comercio, Odesa · ed. 1911",
  ],
  [
    "Humanidad",
    "Vida civil y paz",
    "odesa-plaza",
    "Plaza Turemnaja, Odesa · ed. 1909",
  ],
];
const cartela = (num, fecha) =>
  `<div class="plate-tag"><span>Lámina ${num}</span><i></i>${esc(fecha)}</div>`;
const ilustracion = (recurso, alt, clase = "") =>
  `<img class="${clase}" width="860" height="560" src="${mapa(recurso)}" alt="${esc(alt)}">`;
const mapaFechas = {
  1100: "hacia 1100",
  1200: "hacia 1200",
  1500: "hacia 1500",
  1650: "hacia 1650",
  1783: "1783",
};
function vistaPerspectivas(pasoPanel, regreso) {
  const tarjetas = paneles.map(([name, title, img, credit], n) => {
    const on = regreso ? n === 1 : n < pasoPanel;
    const status = regreso ? ["Capítulo I · Completado", "Capítulo II · A continuación", "Capítulo III"][n] : "Expositor " + (n + 1);
    const shared = n === (regreso ? 1 : 0) ? `data-shared="${img}"` : "";
    return `<article class="card ${on ? "lit" : ""}"><img ${shared} src="${archivo(img)}" alt="${esc(credit)}"><div class="card-shade"></div><div class="card-text"><span>${status}</span><h3>${name}</h3><p>${title}</p></div><small>${credit}</small></article>`;
  });
  return `<div class="panels-head">${tag(regreso ? "Cambio de capítulo" : "Apertura")}<h2>Tres perspectivas, un conflicto</h2></div><div class="cards">${tarjetas.join("")}</div>
    ${fig("Curtis, 1911 · Singleton, 1909", "Archivo fotográfico y cartográfico")}`;
}
const vistas = {
  portada() {
    return `<img class="cover-photo" src="${archivo("kiev")}" alt="Cúpulas y fachadas de la Lavra de Kiev en una fotografía de archivo">
    <div class="cover-wash"></div><div class="frame"></div>
    <div class="cover-content">${tag("Historia · Economía · Humanidad")}
    <h1>RUSIA <em>Y</em><br>UCRANIA</h1><p>Conflicto, impacto económico<br>y humanitario</p></div>
    ${fig("La Lavra de Kiev · edición de 1909", "Archivo E. Singleton")}`;
  },
  paneles(s, p, i) {
    return vistaPerspectivas(i, false);
  },
  regreso() {
    return vistaPerspectivas(0, true);
  },
  portadaEconomia() {
    return `<img class="economia-photo" data-shared="comercio" src="${archivo("comercio")}" alt="Fachada de la Cámara de Comercio de Odesa, publicada en 1911"><div class="economia-velo"></div>
      <div class="economia-titulo">${tag("Capítulo II")}<h2>Consecuencias<br><em>económicas</em></h2></div>
      ${fig("Cámara de Comercio de Odesa · edición de 1911", "W. E. Curtis")}`;
  },
  capitulo() {
    return `<img class="chapter-map" data-shared="atlas" src="${archivo("atlas")}" alt="Detalle del mapa del mar Negro publicado en 1911"><div class="chapter-shade"></div>
    <div class="chapter-title">${tag("Capítulo I · Historia y evolución")}<h2>El origen de<br>un conflicto</h2><p>Una historia que precede a 2014.</p></div>${fig("El mar Negro · mapa de archivo, ed. 1911", "W. E. Curtis")}`;
  },
  geografia(s, p, i) {
    const leyenda =
      i === 3
        ? "Áreas claras · provincias del Donbás"
        : "Ocre · Ucrania y sus fronteras reconocidas";
    return `<div class="geo-copy">${tag("Capítulo I · Geografía")}<div class="geo-divider"></div><small>${esc(p.fecha)}</small><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div>
    <figure class="geo-map"><div class="geo-window">${ilustracion(p.recurso, p.texto, "chart")}</div><figcaption>${leyenda}</figcaption></figure>
    ${fig("Base Natural Earth · lectura jurídica ONU 68/262", "Orientación geográfica · 2026")}`;
  },
  atlas(s, p, i) {
    const year = mapaFechas[p.recurso];
    return `<div class="folio-copy">${tag("Capítulo I · Atlas medieval")}<div class="folio-year">${esc(p.fecha)}</div><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div>
    <figure class="paper-map ${i === 2 ? "memory" : ""}">${cartela(i ? "II" : "I", year)}${i === 2 ? `<div class="river-photo"><img src="${archivo("dnieper")}" alt="El Dniéper en Kiev, fotografía publicada en 1909"><span>El Dniéper en Kiev · ed. Singleton, 1909</span></div>` : ""}${ilustracion(p.recurso, "Reconstrucción cartográfica " + year + ". " + p.texto, "chart")}<figcaption>${i ? "Ocre · selección de principados" : "Ocre · ámbito aproximado de la Rus"}</figcaption></figure>
    ${fig("Historical Basemaps · A. Ourednik y colaboradores · GPL-3.0", "Límites aproximados")}`;
  },
  imperios(s, p, i) {
    return `<div class="imperial-head">${tag("Capítulo I · Territorios e imperios")}<div class="date-track">${["1500", "1654", "1783"].map((t, k) => `<span class="${k === [0, 1, 1, 2][i] ? "current" : ""}">${t}</span>`).join("")}</div></div>
    <div class="imperial-grid"><figure class="imperial-map">${ilustracion(p.recurso, "Mapa de contexto " + mapaFechas[p.recurso], "chart")}<figcaption>Mapa de contexto · ${mapaFechas[p.recurso]} · límites aproximados</figcaption></figure>
    <div class="imperial-copy"><small>${esc(p.fecha)}</small><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div></div>
    ${fig("Cartografía de A. Ourednik y colaboradores · GPL-3.0", "Atlas histórico")}`;
  },
  archivo(s, p, i) {
    const dates = ["1917–1921", "1922", "1944", "1954"];
    const detail = [
      "Kiev · sede de la Rada Central",
      "1922 · capitales de las cuatro entidades fundadoras",
      "Origen de la deportación · península de Crimea",
      "Localización de la península · región transferida en 1954",
    ][i];
    const lamina =
      i === 0
        ? `<div class="document"><small>Telegrama 2094</small><h3>Petrogrado</h3><time>12 de diciembre de 1917</time><hr><blockquote lang="en">“the central provisional Rada of Ukraine which has proclaimed in Ukraine a democratic republic”</blockquote><p>La Rada provisional central de Ucrania había proclamado una república democrática.</p><small>Traducción propia · FRUS, doc. 771</small></div>`
        : i === 2
          ? `<img class="archive-photo" src="${archivo("balaklava")}" alt="Viviendas junto al puerto de Balaklava, Crimea, en una fotografía publicada en 1911"><figcaption>Balaklava, Crimea · vida local anterior a la deportación. Ed. Curtis, 1911.</figcaption>`
          : ilustracion(p.recurso, detail, "chart") +
            "<figcaption>" +
            esc(detail) +
            "</figcaption>";
    return `<div class="archive-head">${tag(i < 2 ? "Cuadro I · Proyectos de Estado" : "Cuadro II · Crimea soviética")}<div class="chrono">${dates.map((d, k) => `<span class="${k === i ? "current" : ""}">${d}</span>`).join("")}</div></div>
    <div class="archive-grid"><div class="archive-copy"><strong>${esc(p.fecha)}</strong><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div>
    <figure class="archive-map">${lamina}${i === 3 ? '<div class="transfer"><abbr title="República Socialista Federativa Soviética de Rusia">RSFS de Rusia</abbr> <b aria-label="pasa a">→</b> <abbr title="República Socialista Soviética de Ucrania">RSS de Ucrania</abbr></div>' : ""}</figure></div>
    ${fig(i === 0 ? "Archivo diplomático · Foreign Relations of the United States" : i === 2 ? "Fotografía de archivo · Around the Black Sea" : "Localizador físico · Natural Earth, dominio público", i === 0 ? "Documento 771 · transcripción parcial" : i === 2 ? "W. E. Curtis, 1911" : "Sin fronteras políticas de época")}`;
  },
  independencia(s, p, i) {
    if (i === 0) {
      return `<div class="acta-mesa"><article class="acta-hoja">
        <div class="acta-cabecera"><span>Ucrania</span><time>1991</time></div>
        <h2>${esc(p.titulo)}<em>.</em></h2>
        <div class="acta-fechas"><div><time>24 agosto</time><span>El Parlamento declara la independencia.</span></div><div><time>1 diciembre</time><span>La ciudadanía la ratifica en referéndum.</span></div></div>
        <blockquote><span lang="uk">«схваленим 1 грудня 1991 року всенародним голосуванням»</span><p>«aprobada el 1 de diciembre de 1991 por votación popular»</p></blockquote>
        <div class="acta-pie">Constitución de Ucrania, preámbulo · 1996</div>
      </article></div>${fig("Lectura del documento · fragmento y traducción propia", "Verjovna Rada")}`;
    }
    if (i === 1) {
      return `<img class="mapa-soberano" src="${mapa(p.recurso)}" alt="Ucrania y Crimea en ocre. Kiev se sitúa al norte y la península de Crimea al sur, en el mar Negro.">
        <div class="soberania-velo"></div><div class="soberania-titulo">${tag(p.fecha)}<h2>Fronteras de<br><em>un Estado</em></h2><p>${esc(p.texto)}</p></div>
        <div class="soberania-clave"><i></i>Fronteras reconocidas de Ucrania</div>
        ${fig("Base y relieve físico · Natural Earth", "Soberanía territorial · 1991")}`;
    }
    return `<div class="budapest-cab">${tag("Memorándum de Budapest")}<time>5 diciembre 1994</time></div>
      <div class="budapest-texto"><span class="marca-cita" aria-hidden="true">“</span><h2>Respetar la independencia,<br>la soberanía y las <em>fronteras<br>existentes</em> de Ucrania.</h2>
        <p lang="uk">«поважати незалежність і суверенітет та існуючі кордони України»</p></div>
      <div class="budapest-firma"><b>§ 1</b><p>Compromiso reafirmado por Rusia, Estados Unidos y el Reino Unido.</p></div>
      ${fig("Texto ucraniano · traducción propia del fragmento", "Documento 998_158 · 1994")}`;
  },
  quiz(s, p, i, selecciones) {
    const n = Math.floor(i / 2),
      q = s.preguntas[n],
      respuestaVisible = i % 2 === 1;
    return `<div class="quiz">${tag("Repaso del capítulo")}<h2>${esc(q.pregunta)}</h2><div class="options" role="group" aria-label="Opciones">${q.opciones.map((o, k) => `<button data-option="${k}" aria-pressed="${selecciones.get(s.id + ":" + n) === k}" ${respuestaVisible ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
    ${respuestaVisible ? `<p><b>${esc(q.opciones[q.correcta])}</b> · ${esc(q.explicacion)}</p><small>${esc(q.fuente)}</small>` : "<button data-reveal>Revelar respuesta</button>"}</div>`;
  },
};
