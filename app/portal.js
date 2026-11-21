function portadaSitio() {
  const mini = (nombre,imagen,estado,i) => `<div class="chapter-item"><img src="${archivo(imagen)}" alt=""><div><small>CAPÍTULO ${i}</small><h3>${nombre}</h3><span>${estado}</span></div></div>`;
  return `<main class="site-home"><section class="landing-hero"><img class="landing-photo" src="${archivo("kiev")}" alt="La Lavra de Kiev, edición de 1909"><div class="landing-shade"></div>
    <div class="landing-copy"><div class="site-kicker"><i></i> Documental interactivo</div><h1>RUSIA<br><em>Y</em> UCRANIA</h1><p>Conflicto, impacto económico y humanitario</p><button class="start-show" data-presentar><span aria-hidden="true">▶</span> Presentar</button></div>
    <div class="photo-credit"><span></span> La Lavra de Kiev <b>Ed. E. Singleton · 1909</b></div></section>
    <section class="programa"><div class="programa-head"><h2>Tres perspectivas, un conflicto</h2><span>Ciencias Sociales</span></div><div class="chapter-list">
    <a href="#estudio/capitulo/1">${mini("Historia","atlas","Ver guía del capítulo →","I")}</a>
    ${mini("Economía","comercio","Portada de relevo","II")}${mini("Humanidad","odesa-plaza","Próximamente","III")}</div></section></main>`;
}
function biblioteca(escenas,modo,s,i) {
  const estudio=modo==="estudio", n=s.tipo==="quiz"?6:s.pasos.length;
  const enlace=(id,p=1)=>"#"+modo+"/"+id+"/"+p;
  const grupos = new Map();
  escenas.forEach((e,j) => {
    if (!grupos.has(e.capitulo)) grupos.set(e.capitulo, []);
    grupos.get(e.capitulo).push(`<option value="${e.id}" ${e.id===s.id?"selected":""}>${j+1}. ${esc(e.titulo)}</option>`);
  });
  const opciones = Array.from(grupos, ([titulo, filas]) => `<optgroup label="${esc(titulo)}">${filas.join("")}</optgroup>`).join("");
  return `<main class="library"><div class="library-intro"><div class="site-kicker"><i></i> Ciencias Sociales · Capítulo I</div><h1>${estudio?"Zona del expositor":"Fuentes"}</h1></div><div class="library-grid"><aside><label for="scene-pick">Escena del documental</label><select id="scene-pick">${opciones}</select>
    <ol class="study-steps">${Array.from({length:n},(_,k)=>`<li><a href="${enlace(s.id,k+1)}" ${i===k?'aria-current="step"':""}>${esc(ficha(s,k).titulo)}${s.tipo==="quiz"?(k%2?" · explicación":" · pregunta"):""}</a></li>`).join("")}</ol><a class="switch-read" href="#${estudio?"fuentes":"estudio"}/${s.id}/${i+1}">${estudio?"Consultar fuentes":"Abrir guion oral"} →</a></aside>
    <section class="reading-pane">${lecturaEstudio(s,i,modo)}<div class="reader-actions"><button class="start-show" data-presentar="${s.id}/${i+1}">Presentar este paso →</button>${!estudio?`<a href="${recursoLocal("fuentes.csv")}" download="fuentes.csv">Catálogo completo (CSV)</a>`:""}</div></section></div></main>`;
}
