/*
 * adivina.js — Juego "¿De quién es este outfit?"
 * Web Component autocontenido: <adivina-outfit></adivina-outfit>
 * Sin dependencias. Ver LEEME.md para integrarlo en otra página.
 */
(function () {
  const PUNTOS_SIN_OPCIONES = 3;
  const PUNTOS_CON_OPCIONES = 1;
  const CANT_OPCIONES = 4;

  const normalizar = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const mezclar = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const CSS = `
    :host{
      /* Paleta PilaTV x Emedemai */
      --adv-bg:#007b3c;        /* verde Mai */
      --adv-card:#fff4f9;      /* crema rosado */
      --adv-text:#111;
      --adv-muted:#6b5560;
      --adv-rosa:#e7639c;      /* rosa Mai */
      --adv-rosa-claro:#ff8fbf;
      --adv-magenta:#fe6fff;   /* fondo Pila */
      --adv-lima:#01e74f;      /* verde Pila */
      --adv-borde:#111;
      --adv-ok:#01e74f; --adv-bad:#ff4d4d;
      --adv-radius:24px;
      --adv-font:"Fredoka",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
      --adv-font-titulo:"Anton","Impact","Arial Narrow",sans-serif;
      --adv-foto-alto:52vh;
      display:block; font-family:var(--adv-font); color:var(--adv-text);
    }
    *{box-sizing:border-box}
    .app{background:var(--adv-bg); border-radius:var(--adv-radius); padding:20px; max-width:900px; margin:0 auto}
    header{display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:18px; text-align:center}
    .logos{display:flex; align-items:center; justify-content:center; gap:14px}
    .logos img{height:64px; width:auto; display:block}
    .logos .pila{border-radius:16px; border:3px solid var(--adv-borde)}
    .logos .x{font-family:var(--adv-font); font-weight:700; font-size:1.8rem; color:#fff}
    h1{margin:0; font-family:var(--adv-font-titulo); font-weight:400; text-transform:uppercase;
       font-size:clamp(1.6rem,5vw,2.6rem); line-height:1.05; letter-spacing:.02em; color:var(--adv-rosa-claro);
       text-shadow:-2px -2px 0 #111,2px -2px 0 #111,-2px 2px 0 #111,2px 2px 0 #111,4px 4px 0 #111}
    .stats{display:flex; gap:10px; font-weight:700; flex-wrap:wrap; justify-content:center}
    .pill{background:#fff; border:3px solid var(--adv-borde); padding:4px 14px; border-radius:999px; font-size:1rem}
    .pill span{color:var(--adv-rosa)}
    .escena{background:var(--adv-card); border:3px solid var(--adv-borde); box-shadow:6px 6px 0 var(--adv-borde);
            border-radius:var(--adv-radius); padding:18px; display:flex; flex-direction:column; align-items:center; gap:14px}
    .deporte{font-family:var(--adv-font-titulo); font-size:1rem; text-transform:uppercase; letter-spacing:.08em;
             background:var(--adv-magenta); border:3px solid var(--adv-borde); border-radius:999px; padding:2px 14px}
    .foto{position:relative; display:inline-block; max-width:100%; line-height:0}
    .foto img{display:block; max-width:100%; max-height:var(--adv-foto-alto); border-radius:16px; border:3px solid var(--adv-borde)}
    .tapa{position:absolute; border-radius:50%; display:flex; align-items:center; justify-content:center;
          background:var(--adv-rosa); color:#fff; font-weight:700; border:3px solid var(--adv-borde);
          transition:opacity .5s, transform .5s; line-height:1}
    .tapa.fuera{opacity:0; transform:scale(1.4); pointer-events:none}
    .pista{color:var(--adv-muted); font-style:italic; text-align:center; min-height:1.2em; margin:0}
    form{display:flex; gap:8px; width:100%; max-width:520px}
    input{flex:1; min-width:0; padding:12px 18px; border-radius:999px; border:3px solid var(--adv-borde); background:#fff; color:var(--adv-text); font:inherit; font-size:1.05rem}
    input:focus{outline:none; box-shadow:0 0 0 4px var(--adv-rosa-claro)}
    button{font:inherit; font-weight:700; font-size:1.05rem; border:3px solid var(--adv-borde); border-radius:999px; padding:10px 20px;
           cursor:pointer; color:var(--adv-text); background:var(--adv-lima); box-shadow:3px 3px 0 var(--adv-borde); transition:transform .08s, box-shadow .08s, opacity .2s}
    button:active{transform:translate(3px,3px); box-shadow:0 0 0 var(--adv-borde)}
    button:disabled{cursor:default}
    .sec{background:var(--adv-magenta)}
    .acciones{display:flex; gap:10px; flex-wrap:wrap; justify-content:center}
    .opciones{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; width:100%; max-width:520px}
    .opciones button{background:#fff}
    .opciones button:disabled{opacity:.5}
    .opciones button.ok{background:var(--adv-ok); opacity:1}
    .opciones button.mal{background:var(--adv-bad); color:#fff; opacity:1}
    .resultado{font-family:var(--adv-font-titulo); text-transform:uppercase; font-size:1.6rem; text-align:center; min-height:1.3em; margin:0}
    .resultado.ok{color:var(--adv-bg)} .resultado.mal{color:var(--adv-bad)}
    .fin{text-align:center; padding:36px 10px; font-size:1.2rem}
    .fin .grande{font-family:var(--adv-font-titulo); font-size:4rem; color:var(--adv-rosa)}
    .vacio{text-align:center; color:var(--adv-muted); padding:40px 10px}
    @keyframes sacudir{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
    .sacudir{animation:sacudir .3s}
    @media (max-width:480px){ .opciones{grid-template-columns:1fr} form{flex-direction:column} .logos img{height:48px} }
  `;

  // Tipografías (se registran en el documento; si no hay internet, usa las de respaldo)
  if (!document.querySelector("link[data-adivina-fonts]")) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Anton&family=Fredoka:wght@500;700&display=swap";
    l.dataset.adivinaFonts = "";
    document.head.appendChild(l);
  }

  class AdivinaOutfit extends HTMLElement {
    static get observedAttributes() { return ["titulo", "logo-izq", "logo-der"]; }

    constructor() {
      super();
      this.root = this.attachShadow({ mode: "open" });
      this.jugadores = [];
      this.reset(false);
    }

    connectedCallback() {
      if (!this.jugadores.length) {
        const src = this.getAttribute("src");
        if (src) {
          fetch(src).then((r) => r.json()).then((d) => this.setData(d)).catch((e) => {
            console.error("[adivina-outfit] No se pudo cargar", src, e);
            this.render();
          });
          return;
        }
        if (Array.isArray(window.ADIVINA_JUGADORES)) return this.setData(window.ADIVINA_JUGADORES);
      }
      this.render();
    }

    attributeChangedCallback() { if (this.isConnected) this.render(); }

    /* ---------- API pública ---------- */
    setData(lista) {
      this.jugadores = (lista || []).filter((j) => j && j.nombre && j.imagen);
      this.reset();
    }

    reset(render = true) {
      const orden = this.getAttribute && this.getAttribute("orden");
      this.mazo = orden === "fijo" ? (this.jugadores || []).slice() : mezclar(this.jugadores || []);
      this.indice = 0;
      this.puntaje = 0;
      this.aciertos = 0;
      this.nuevaRonda();
      if (render) this.render();
    }

    siguiente() {
      this.indice++;
      this.nuevaRonda();
      this.render();
    }

    revelar() {
      if (this.ronda.terminada) return;
      this.terminar(false, 0, "Era " + this.actual.nombre);
    }

    mostrarOpciones() {
      if (this.ronda.terminada || this.ronda.opciones) return;
      const j = this.actual;
      let distractores = Array.isArray(j.opciones) && j.opciones.length ? j.opciones.slice() : null;
      if (!distractores) {
        const otros = this.jugadores.filter((o) => o.nombre !== j.nombre);
        const mismoDeporte = mezclar(otros.filter((o) => o.deporte && o.deporte === j.deporte));
        const resto = mezclar(otros.filter((o) => !(o.deporte && o.deporte === j.deporte)));
        distractores = [...mismoDeporte, ...resto].map((o) => o.nombre);
      }
      distractores = [...new Set(distractores.filter((n) => normalizar(n) !== normalizar(j.nombre)))];
      this.ronda.opciones = mezclar([j.nombre, ...distractores.slice(0, CANT_OPCIONES - 1)]);
      this.render();
    }

    /* ---------- lógica ---------- */
    get actual() { return this.mazo[this.indice]; }

    nuevaRonda() {
      const j = this.mazo && this.mazo[this.indice];
      if (j && j.imagenRevelada) { const pre = new Image(); pre.src = j.imagenRevelada; }
      this.ronda = { terminada: false, opciones: null, elegida: null, mensaje: "", correcto: null };
    }

    esCorrecta(texto) {
      const j = this.actual;
      const t = normalizar(texto);
      if (!t) return false;
      const validas = [j.nombre, ...(j.alias || [])].map(normalizar);
      return validas.includes(t);
    }

    responder(texto, desdeOpcion) {
      if (this.ronda.terminada) return;
      const ok = this.esCorrecta(texto);
      if (desdeOpcion) this.ronda.elegida = texto;
      if (ok) {
        const pts = this.ronda.opciones ? PUNTOS_CON_OPCIONES : PUNTOS_SIN_OPCIONES;
        this.terminar(true, pts, `¡Correcto! +${pts} — ${this.actual.nombre}`);
      } else if (desdeOpcion) {
        this.terminar(false, 0, "No… era " + this.actual.nombre);
      } else {
        this.ronda.mensaje = "Nop, probá de nuevo";
        this.render();
        const f = this.root.querySelector("form");
        if (f) { f.classList.remove("sacudir"); void f.offsetWidth; f.classList.add("sacudir"); }
        const i = this.root.querySelector("input");
        if (i) { i.value = ""; i.focus(); }
        return;
      }
    }

    terminar(correcto, puntos, mensaje) {
      Object.assign(this.ronda, { terminada: true, correcto, mensaje });
      this.puntaje += puntos;
      if (correcto) this.aciertos++;
      this.render();
      this.dispatchEvent(new CustomEvent("adivina-respuesta", {
        bubbles: true, composed: true,
        detail: { jugador: this.actual, correcto, puntos, puntaje: this.puntaje, usoOpciones: !!this.ronda.opciones },
      }));
      if (this.indice === this.mazo.length - 1) {
        this.dispatchEvent(new CustomEvent("adivina-fin", {
          bubbles: true, composed: true,
          detail: { puntaje: this.puntaje, aciertos: this.aciertos, total: this.mazo.length },
        }));
      }
    }

    /* ---------- render ---------- */
    render() {
      const titulo = this.getAttribute("titulo") || "¿De quién es este outfit?";
      const total = this.mazo.length;
      const li = this.getAttribute("logo-izq"), ld = this.getAttribute("logo-der");
      const logos = li || ld
        ? `<div class="logos">${li ? `<img class="pila" src="${esc(li)}" alt="">` : ""}${li && ld ? `<span class="x">x</span>` : ""}${ld ? `<img src="${esc(ld)}" alt="">` : ""}</div>`
        : "";
      const head = `
        <header>
          ${logos}
          <h1>${esc(titulo)}</h1>
          <div class="stats">
            <div class="pill">Ronda <span>${Math.min(this.indice + 1, total)}/${total}</span></div>
            <div class="pill">Puntos <span>${this.puntaje}</span></div>
          </div>
        </header>`;

      let body;
      if (!total) {
        body = `<div class="vacio">No hay jugadores cargados. Revisá <code>data/jugadores.js</code>.</div>`;
      } else if (this.indice >= total) {
        body = `<div class="escena fin">
            <div>¡Terminó el juego!</div>
            <div class="grande">${this.puntaje} pts</div>
            <div>${this.aciertos} de ${total} acertados</div>
            <div class="acciones" style="margin-top:16px"><button data-accion="reiniciar">Jugar de nuevo</button></div>
          </div>`;
      } else {
        const j = this.actual;
        const r = this.ronda;
        const c = j.cara;
        const tamFuente = c ? `font-size:clamp(1.2rem, ${Math.max(2, c.w * 0.5)}vmin, 6rem);` : "";
        const tapa = c
          ? `<div class="tapa ${r.terminada ? "fuera" : ""}" style="left:${c.x}%;top:${c.y}%;width:${c.w}%;height:${c.h}%;${tamFuente}">?</div>`
          : "";
        const opciones = r.opciones
          ? `<div class="opciones">${r.opciones.map((n) => {
              let cls = "";
              if (r.terminada) {
                if (normalizar(n) === normalizar(j.nombre)) cls = "ok";
                else if (r.elegida === n) cls = "mal";
              }
              return `<button data-opcion="${esc(n)}" class="${cls}" ${r.terminada ? "disabled" : ""}>${esc(n)}</button>`;
            }).join("")}</div>`
          : "";
        const ultima = this.indice === total - 1;
        body = `
          <div class="escena">
            ${j.deporte ? `<div class="deporte">${esc(j.deporte)}</div>` : ""}
            <div class="foto"><img src="${esc(r.terminada && j.imagenRevelada ? j.imagenRevelada : j.imagen)}" alt="Outfit misterioso">${tapa}</div>
            <p class="pista">${j.pista && !r.terminada ? "Pista: " + esc(j.pista) : ""}</p>
            ${!r.terminada && !r.opciones ? `
              <form>
                <input type="text" placeholder="¿Quién es?" autocomplete="off" aria-label="Tu respuesta">
                <button type="submit">Adivinar</button>
              </form>` : ""}
            ${opciones}
            <p class="resultado ${r.correcto === true ? "ok" : r.terminada ? "mal" : ""}">${esc(r.mensaje)}</p>
            <div class="acciones">
              ${!r.terminada && !r.opciones ? `<button class="sec" data-accion="opciones">Mostrar opciones (vale ${PUNTOS_CON_OPCIONES})</button>` : ""}
              ${!r.terminada ? `<button class="sec" data-accion="revelar">Revelar</button>` : ""}
              ${r.terminada ? `<button data-accion="siguiente">${ultima ? "Ver resultado" : "Siguiente →"}</button>` : ""}
            </div>
          </div>`;
      }

      this.root.innerHTML = `<style>${CSS}</style><div class="app">${head}${body}</div>`;
      this.bind();
    }

    bind() {
      const form = this.root.querySelector("form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          this.responder(form.querySelector("input").value, false);
        });
      }
      this.root.querySelectorAll("[data-opcion]").forEach((b) =>
        b.addEventListener("click", () => this.responder(b.dataset.opcion, true)));
      this.root.querySelectorAll("[data-accion]").forEach((b) =>
        b.addEventListener("click", () => {
          const a = b.dataset.accion;
          if (a === "opciones") this.mostrarOpciones();
          else if (a === "revelar") this.revelar();
          else if (a === "siguiente") this.siguiente();
          else if (a === "reiniciar") this.reset();
        }));
    }
  }

  if (!customElements.get("adivina-outfit")) customElements.define("adivina-outfit", AdivinaOutfit);
})();
