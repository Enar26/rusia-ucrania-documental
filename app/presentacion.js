(() => {
  const get = (id) => document.getElementById(id);
  const stage = get("stage"),
    dialog = get("dialog"),
    player = get("player");
  const documental = capitulos.flatMap((cap) =>
    cap.escenas
      .filter((s) => s.tipo !== "quiz" || s.preguntas.length)
      .map((s) => ({ ...s, capitulo: cap.titulo })),
  );
  const escenas = documental;
  const pasos = (s) =>
    s.tipo === "quiz" ? s.preguntas.length * 2 : s.pasos.length;
  const opciones = new Map();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let escena = 0,
    pasoActual = 0,
    visible = null,
    animaciones = [],
    pausa = false;
  const actual = () => escenas[escena];
  const nota = () =>
    actual().pasos?.[pasoActual]?.nota ??
    "Invita al público a responder. Revela la explicación cuando concluya la discusión.";
  function limpiarMovimiento() {
    for (const a of animaciones) a.cancel();
    animaciones = [];
    stage.querySelectorAll("[data-salida]").forEach((e) => e.remove());
  }
  function mover(el, frames, ms) {
    const a = el.animate(frames, {
      duration: ms,
      easing: "cubic-bezier(.22,.68,.22,1)",
      fill: "backwards",
    });
    animaciones.push(a);
    if (pausa) a.pause();
    return a;
  }
  // Los centros y amplitudes coinciden con las vistas geográficas de generar_mapas.py.
  // Reproyectar ambas vistas conserva el punto de anclaje durante el acercamiento.
  const camaras = [
    [31.4, 49, 38],
    [31.7, 49, 25],
    [34, 45.9, 14],
    [37.4, 48.8, 12],
  ];
  function encuadre(desde, hacia) {
    const [x, y, ancho] = desde,
      [cx, cy, rango] = hacia;
    const cos = (lat) => Math.cos((lat * Math.PI) / 180);
    const dx = ((x - cx) / rango) * 100,
      dy = ((((cy - y) / rango) * 860) / 560 / cos(cy)) * 100;
    return `translate(${dx}%,${dy}%) scale(${ancho / rango},${(ancho * cos(y)) / (rango * cos(cy))})`;
  }
  function moverMapa(chart, anterior, indicePrevio) {
    const previo = camaras[indicePrevio],
      nuevo = camaras[pasoActual];
    const capa = anterior.cloneNode();
    capa.alt = "";
    capa.classList.add("superpuesta");
    capa.dataset.salida = "";
    chart.parentNode.append(capa);
    mover(
      chart,
      [{ transform: encuadre(nuevo, previo) }, { transform: "none" }],
      920,
    );
    mover(
      capa,
      [
        { transform: "none", opacity: 1 },
        { transform: encuadre(previo, nuevo), opacity: 0 },
      ],
      920,
    )
      .finished.then(() => capa.remove())
      .catch(() => {});
  }
  function dibujar(direccion = 0) {
    limpiarMovimiento();
    const s = actual(),
      p = s.pasos?.[pasoActual] ?? {};
    const antes = visible,
      compartido = antes?.querySelector("[data-shared]");
    const cambia = antes?.dataset.escena !== s.id;
    const durante =
      cambia &&
      !reduce.matches &&
      direccion &&
      compartido?.getBoundingClientRect();
    const nuevo = document.createElement("section");
    nuevo.dataset.escena = s.id;
    nuevo.dataset.paso = pasoActual;
    nuevo.className = "scene " + s.tipo;
    nuevo.setAttribute("aria-label", s.titulo);
    nuevo.innerHTML = vistas[s.tipo](s, p, pasoActual, opciones);
    stage.append(nuevo);
    visible = nuevo;
    if (antes) {
      antes.inert = true;
      antes.setAttribute("aria-hidden", "true");
      if (reduce.matches || !direccion) {
        antes.remove();
      } else if (cambia) {
        antes.dataset.salida = "";
        const dest = nuevo.querySelector("[data-shared]");
        const vuelo = durante && dest && dest.dataset.shared === compartido.dataset.shared;
        const comercio = vuelo && dest.dataset.shared === "comercio";
        const fade = mover(
          nuevo,
          [{ opacity: 0 }, { opacity: 1 }],
          comercio ? 1900 : vuelo ? 1400 : 550,
        );
        fade.finished.then(() => antes.remove()).catch(() => {});
        if (vuelo) {
          const fin = dest.getBoundingClientRect();
          const imagen = dest.cloneNode();
          imagen.removeAttribute("data-shared");
          const rect = stage.getBoundingClientRect();
          Object.assign(imagen.style, {
            position: "absolute",
            left: fin.left - rect.left + "px",
            top: fin.top - rect.top + "px",
            width: fin.width + "px",
            height: fin.height + "px",
            objectFit: "cover",
            transformOrigin: "top left",
            zIndex: 3,
            pointerEvents: "none",
          });
          imagen.className = "flight";
          imagen.dataset.salida = "";
          imagen.alt = "";
          stage.append(imagen);
          const transform = `translate(${durante.left - fin.left}px,${durante.top - fin.top}px) scale(${durante.width / fin.width},${durante.height / fin.height})`;
          const franja = (box) => ({
            left: box.left - rect.left + "px", top: box.top - rect.top + "px",
            width: box.width + "px", height: box.height + "px",
          });
          if (comercio) {
            compartido.style.visibility = "hidden";
            mover(dest, [
              { opacity: 0 }, { opacity: 0, offset: .76 },
              { opacity: 1, offset: .8 }, { opacity: 1 },
            ], 2050);
            imagen.style.objectPosition = "50% 45%";
            imagen.style.filter = "sepia(.23) contrast(1.05)";
          }
          mover(
            imagen,
            comercio ? [
              { ...franja(durante), opacity: 1 },
              { ...franja(fin), opacity: 1, offset: .78 },
              { ...franja(fin), opacity: 0 },
            ] : [
              { transform, opacity: 0.9 },
              { transform: "none", opacity: 0.75, offset: 0.8 },
              { transform: "none", opacity: 0 },
            ],
            2050,
          )
            .finished.then(() => imagen.remove())
            .catch(() => {});
        }
      } else {
        const changedCard =
          s.tipo === "paneles" &&
          nuevo.querySelectorAll(".card")[
            direccion > 0 ? pasoActual - 1 : pasoActual
          ];
        if (changedCard) {
          mover(
            changedCard,
            [
              { filter: direccion > 0 ? "brightness(.5)" : "brightness(1.1)" },
              { filter: "none" },
            ],
            680,
          );
        } else if (s.tipo === "independencia") {
          const lamina = nuevo.querySelector(".acta-hoja, .mapa-soberano, .budapest-texto");
          const final = getComputedStyle(lamina).transform;
          const entrada = pasoActual === 1 ? "scale(1.18)" :
            pasoActual === 0 ? "translateY(6%) rotate(-3deg)" : "translateX(4%)";
          mover(lamina, [{ transform: entrada, opacity: .45 }, { transform: final, opacity: 1 }], 1300);
          // La hoja sale por el mismo borde cuando se vuelve del mapa.
          antes.dataset.salida = "";
          mover(antes, [
            { clipPath: "inset(0 0 0 0)" },
            { clipPath: direccion > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
          ], 820).finished.then(() => antes.remove()).catch(() => {});
          antes.style.zIndex = "1";
        } else if (s.tipo !== "quiz") {
          const chart = nuevo.querySelector(".chart");
          const oldChart = antes.querySelector(".chart");
          if (
            chart &&
            oldChart &&
            chart.getAttribute("src") !== oldChart.getAttribute("src")
          ) {
            if (s.tipo === "geografia")
              moverMapa(chart, oldChart, Number(antes.dataset.paso));
            else {
              const transforms = {
                atlas: "translateX(2%)",
                imperios: "translateY(3%)",
                archivo: "scale(1.04)",
              };
              mover(
                chart,
                [
                  { opacity: 0.35, transform: transforms[s.tipo] },
                  { opacity: 1, transform: "none" },
                ],
                700,
              );
            }
          }
          const rail = nuevo.querySelector(".rail");
          if (rail) {
            const distance = (Number(antes.dataset.paso) - pasoActual) * -21;
            mover(rail, [{translate: distance + "cqw 0"}, {translate: "0 0"}], 950);
          }
          const foco = nuevo.querySelector(".foco-img, .eco-palabra, .nodo-activo");
          if (foco) mover(foco, [{opacity:.25, transform:"scale(1.08)"},{opacity:1,transform:"none"}], 900);
          const title = nuevo.querySelector("h2");
          if (title)
            mover(
              title,
              [
                { opacity: 0.4, transform: "translateY(5px)" },
                { opacity: 1, transform: "none" },
              ],
              360,
            );
        }
        if (!antes.hasAttribute("data-salida")) antes.remove();
      }
    }
    get("number").textContent =
      String(escena + 1).padStart(2, "0") +
      " / " +
      String(escenas.length).padStart(2, "0");
    get("step-count").textContent =
      pasos(s) > 1 ? pasoActual + 1 + " / " + pasos(s) + " pasos" : "";
    get("section").textContent = s.tipo === "portada" ? "Portada" : s.titulo;
    get("meter").innerHTML = escenas
      .map((_, i) => '<i class="' + (i <= escena ? "done" : "") + '"></i>')
      .join("");
    get("prev").disabled = escena === 0 && pasoActual === 0;
    const ultimo = escena === escenas.length - 1 && pasoActual === pasos(s) - 1;
    get("next").disabled = ultimo;
    get("next").querySelector("span").textContent = ultimo
      ? "Fin"
      : s.tipo === "regreso"
        ? "Abrir Economía"
        : escena === 0
        ? "Comenzar"
        : s.tipo === "quiz" && pasoActual % 2 === 0
          ? "Revelar"
          : "Siguiente";
    get("announce").textContent =
      s.titulo + ". Paso " + (pasoActual + 1) + " de " + pasos(s) + ".";
  }
  function avanzar(dir) {
    const siguiente = pasoActual + dir;
    if (siguiente >= 0 && siguiente < pasos(actual())) pasoActual = siguiente;
    else if (escenas[escena + dir]) {
      escena += dir;
      pasoActual = dir > 0 ? 0 : pasos(actual()) - 1;
    } else return;
    dibujar(dir);
  }
  function mostrar(tipo) {
    const titulos = {
      notas: "Notas del expositor",
      fuentes: "Fuentes y créditos",
      indice: "Índice de la presentación",
    };
    get("dialog-title").textContent = titulos[tipo];
    const s = actual();
    if (tipo === "notas") {
      get("dialog-body").innerHTML =
        `<small>${esc(s.capitulo)} · Paso ${pasoActual + 1} de ${pasos(s)}</small><h3>${esc(s.pasos?.[pasoActual]?.titulo || s.titulo)}</h3><p>${esc(nota())}</p>`;
    } else if (tipo === "fuentes") {
      get("dialog-body").innerHTML =
        "<small>Recursos de esta escena</small>" +
        s.fuentes
          .map((id) => {
            const [nombre, url, desc] = fuentes[id];
            return (
              "<article><h3>" +
              (url
                ? '<a target="_blank" rel="noreferrer" href="' +
                  esc(url) +
                  '">' +
                  esc(nombre) +
                  "</a>"
                : esc(nombre)) +
              "</h3><p>" +
              esc(desc) +
              "</p></article>"
            );
          })
          .join("") +
        `<a href="${recursoLocal("fuentes.csv")}" download="fuentes.csv">Descargar el catálogo completo (CSV)</a>`;
    } else {
      get("dialog-body").innerHTML =
        escenas
          .map(
            (e, i) =>
              `<button data-ir="${i}" class="index-row" ${i === escena ? 'aria-current="step"' : ""}><span>${String(i + 1).padStart(2, "0")}</span>${esc(e.titulo)}</button>`,
          )
          .join("") +
        '<p class="help">Clic, →, espacio o Av Pág para avanzar. ← o Re Pág para volver. F alterna la pantalla completa, H los controles y P la pausa del movimiento.</p>';
    }
    if (!dialog.open) dialog.showModal();
    get("close").focus();
  }
  function controles() {
    const oculto = player.classList.toggle("quiet");
    get("restore").hidden = !oculto;
    (oculto ? get("restore") : get("next")).focus();
  }
  async function pantalla() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await player.requestFullscreen();
    } catch {
      get("announce").textContent =
        "El navegador no permite pantalla completa en esta ventana.";
    }
  }
  get("next").onclick = () => avanzar(1);
  get("prev").onclick = () => avanzar(-1);
  get("full").onclick = pantalla;
  document.addEventListener("fullscreenchange", () =>
    get("full").setAttribute(
      "aria-pressed",
      String(!!document.fullscreenElement),
    ),
  );
  get("restore").onclick = controles;
  document
    .querySelectorAll("[data-panel]")
    .forEach((b) => (b.onclick = () => mostrar(b.dataset.panel)));
  get("close").onclick = () => dialog.close();
  dialog.onclick = (e) => {
    if (e.target === dialog) {
      dialog.close();
      return;
    }
    const b = e.target.closest("[data-ir]");
    if (b) {
      escena = Number(b.dataset.ir);
      pasoActual = 0;
      dialog.close();
      dibujar();
    }
  };
  stage.onclick = (e) => {
    const opcion = e.target.closest("[data-option]");
    if (opcion) {
      opciones.set(
        actual().id + ":" + Math.floor(pasoActual / 2),
        Number(opcion.dataset.option),
      );
      visible
        .querySelectorAll("[data-option]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === opcion)));
      return;
    }
    if (e.target.closest("[data-reveal]")) {
      avanzar(1);
      return;
    }
    if (
      !e.target.closest("button,a,input,textarea,select") &&
      actual().tipo !== "quiz"
    )
      avanzar(1);
  };
  document.addEventListener("keydown", (e) => {
    if (
      dialog.open ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.target.closest("input,textarea,select,[contenteditable=true]")
    )
      return;
    if (e.repeat) {
      if (
        [
          "Enter",
          " ",
          "PageUp",
          "PageDown",
          "ArrowRight",
          "ArrowLeft",
        ].includes(e.key)
      )
        e.preventDefault();
      return;
    }
    if (e.target.closest("button,a") && ["Enter", " "].includes(e.key)) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) {
      e.preventDefault();
      avanzar(1);
    } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      avanzar(-1);
    } else if (e.key.toLowerCase() === "f") pantalla();
    else if (e.key.toLowerCase() === "h") controles();
    else if (e.key.toLowerCase() === "p") {
      pausa = !pausa;
      for (const a of animaciones) {
        if (pausa && a.playState === "running") a.pause();
        else if (!pausa && a.playState === "paused") a.play();
      }
      get("announce").textContent = pausa
        ? "Movimiento en pausa"
        : "Movimiento activado";
    }
  });
  reduce.addEventListener("change", () => dibujar());
  function abrirRecorrido() {
    const destino = location.hash === "#revision-economia" ? "#regreso" : location.hash;
    escena = Math.max(0, escenas.findIndex(s => "#" + s.id === destino));
    pasoActual = 0;
    if (dialog.open) dialog.close();
    dibujar();
  }
  window.addEventListener("hashchange", abrirRecorrido);
  abrirRecorrido();
})();
