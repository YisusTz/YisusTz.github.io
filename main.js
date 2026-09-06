// NodoGamer — buscador y filtro por categoría (solo se usa en index.html)

const POSTS = [
  {
    title: "Los mejores mouse gamer de 2026 según tu presupuesto",
    url: "mejores-mouse-gamer-2026.html",
    cat: "Periféricos",
    excerpt: "Comparamos sensores, DPI real y peso en mouse desde S/ 60 hasta S/ 400, con opciones disponibles en tiendas de Lima.",
    date: "2026-08-12"
  },
  {
    title: "Teclados mecánicos: guía de switches para no arrepentirte de tu compra",
    url: "teclados-mecanicos-guia.html",
    cat: "Periféricos",
    excerpt: "Lineales, táctiles o clicky: qué switch elegir según si programas, juegas o compartes cuarto con alguien que duerme temprano.",
    date: "2026-08-05"
  },
  {
    title: "Sillas gamer en Lima: cuáles valen la pena y cuáles son solo diseño",
    url: "sillas-gamer-lima.html",
    cat: "Ergonomía",
    excerpt: "Revisamos reposabrazos, reclinación real y garantía en sillas de La Galería, Wilson y tiendas online peruanas.",
    date: "2026-07-29"
  },
  {
    title: "Monitores 144Hz: guía de compra para no pagar de más",
    url: "monitores-144hz-guia-compra.html",
    cat: "Componentes",
    excerpt: "Panel IPS o VA, tiempo de respuesta y qué tasa de refresco realmente necesitas según los juegos que corres.",
    date: "2026-07-20"
  },
  {
    title: "SSD NVMe vs SATA: cuándo vale la pena pagar la diferencia",
    url: "ssd-nvme-vs-sata.html",
    cat: "Componentes",
    excerpt: "Tiempos de carga reales en juegos, compatibilidad con tu placa madre y precios por gigabyte en soles.",
    date: "2026-07-10"
  },
  {
    title: "Audífonos gaming: por qué el micrófono importa más que el sonido envolvente",
    url: "audifonos-gaming-guia.html",
    cat: "Periféricos",
    excerpt: "Drivers, cancelación de ruido y por qué el micrófono suele ser el punto débil de los audífonos gamer baratos.",
    date: "2026-06-28"
  },
  {
    title: "Micrófonos para streaming y Discord: guía de compra",
    url: "microfonos-streaming-discord.html",
    cat: "Streaming",
    excerpt: "Condensador vs dinámico, patrón polar y por qué el brazo articulado también importa.",
    date: "2026-06-24"
  },
  {
    title: "Laptop gamer vs PC armada: qué conviene según tu situación",
    url: "laptop-gamer-vs-pc-armada.html",
    cat: "Guías",
    excerpt: "Ventajas reales y trade-offs entre comprar una laptop gamer o armar una PC de escritorio en Perú.",
    date: "2026-06-20"
  },
  {
    title: "Tarjetas gráficas gama media en Perú: qué esperar según tu presupuesto",
    url: "tarjetas-graficas-gama-media-peru.html",
    cat: "Componentes",
    excerpt: "Canal formal vs importación gris, VRAM y consumo eléctrico al elegir tarjeta gráfica.",
    date: "2026-06-13"
  },
  {
    title: "Refrigeración: aire vs líquida, cuál elegir para tu procesador",
    url: "refrigeracion-aire-vs-liquida.html",
    cat: "Componentes",
    excerpt: "Cuándo un disipador de aire es suficiente y cuándo conviene pasar a una AIO.",
    date: "2026-06-06"
  },
  {
    title: "Gabinetes: por qué el flujo de aire importa más que el diseño RGB",
    url: "gabinetes-flujo-aire.html",
    cat: "Componentes",
    excerpt: "Presión positiva, frente de malla vs vidrio, y filtros de polvo que sí conviene revisar.",
    date: "2026-05-30"
  },
  {
    title: "Routers gaming: ¿vale la pena pagar más por uno?",
    url: "routers-gaming-guia.html",
    cat: "Componentes",
    excerpt: "QoS, doble banda y por qué tu conexión a internet suele importar más que el router.",
    date: "2026-05-23"
  },
  {
    title: "Webcams para streaming: qué mirar antes de tu primera transmisión",
    url: "webcams-streaming-guia.html",
    cat: "Streaming",
    excerpt: "Resolución, FPS y apertura de lente: qué mirar en una webcam antes de empezar a transmitir.",
    date: "2026-05-16"
  },
  {
    title: "Mousepads gaming: por qué la superficie importa tanto como el mouse",
    url: "mousepads-guia.html",
    cat: "Periféricos",
    excerpt: "Control vs velocidad, tamaño y por qué no deberías comprar solo por el diseño RGB.",
    date: "2026-05-09"
  },
  {
    title: "Fuentes de poder: cuánto wattaje necesitas y por qué no debes ahorrar aquí",
    url: "fuentes-poder-guia.html",
    cat: "Componentes",
    excerpt: "Certificación 80 Plus, wattaje real y por qué una fuente barata puede dañar el resto de tu PC.",
    date: "2026-05-02"
  }
];

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

function renderList(filterCat, query) {
  const list = document.getElementById("article-list");
  const empty = document.getElementById("no-results");
  if (!list) return;

  const q = (query || "").trim().toLowerCase();

  const filtered = POSTS.filter(p => {
    const matchesCat = filterCat === "Todos" || p.cat === filterCat;
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  list.innerHTML = filtered.map(p => `
    <div class="article-row">
      <span class="cat-tag">${p.cat}</span>
      <div class="info">
        <h3><a href="${p.url}">${p.title}</a></h3>
        <p>${p.excerpt}</p>
      </div>
      <span class="date">${formatDate(p.date)}</span>
    </div>
  `).join("");

  empty.style.display = filtered.length === 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  const searchInput = document.getElementById("search-input");
  let activeCat = "Todos";

  renderList(activeCat, "");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeCat = chip.dataset.cat;
      renderList(activeCat, searchInput ? searchInput.value : "");
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderList(activeCat, searchInput.value);
    });
  }
});
