document.addEventListener("DOMContentLoaded", () => {

    const studioLogo = document.getElementById('sintux-logo');
    const loadingText = document.getElementById('loading-msg');
    const sparksContainer = document.getElementById('logo-sparks');
    const firefliesField = document.getElementById('fireflies-field');

    function initSparks() {
        if (!sparksContainer || sparksContainer.childElementCount > 0) return;

        const svgNS = "http://www.w3.org/2000/svg";
        const rays = [
            { top: "24%", left: "22%", angle: "-142deg", len: "68px", dur: "2.1s", delay: "0.1s", pts: "0,11 16,5 28,15 46,6 68,12" },
            { top: "22%", left: "78%", angle: "-36deg",  len: "70px", dur: "2.4s", delay: "0.75s", pts: "0,11 18,16 32,5 50,14 70,8" },
            { top: "50%", left: "16%", angle: "180deg",  len: "66px", dur: "2.0s", delay: "1.3s", pts: "0,11 15,6 30,16 48,7 66,11" },
            { top: "50%", left: "84%", angle: "0deg",    len: "66px", dur: "2.3s", delay: "0.4s", pts: "0,11 17,16 33,6 50,15 66,10" },
            { top: "74%", left: "24%", angle: "145deg",  len: "62px", dur: "2.5s", delay: "1.65s", pts: "0,11 15,15 29,6 45,14 62,9" },
            { top: "74%", left: "76%", angle: "35deg",   len: "62px", dur: "2.15s", delay: "1.0s", pts: "0,11 16,6 31,15 47,7 62,12" },
            { top: "14%", left: "50%", angle: "-90deg",  len: "56px", dur: "2.6s", delay: "1.9s", pts: "0,11 14,6 28,15 42,7 56,11" }
        ];

        rays.forEach(r => {
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("class", "spark-bolt-svg");
            svg.setAttribute("viewBox", "0 0 70 22");
            svg.style.setProperty("--top", r.top);
            svg.style.setProperty("--left", r.left);
            svg.style.setProperty("--angle", r.angle);
            svg.style.setProperty("--len", r.len);
            svg.style.setProperty("--dur", r.dur);
            svg.style.setProperty("--delay", r.delay);

            const outer = document.createElementNS(svgNS, "polyline");
            outer.setAttribute("points", r.pts);

            const core = document.createElementNS(svgNS, "polyline");
            core.setAttribute("class", "bolt-core");
            core.setAttribute("points", r.pts);

            svg.appendChild(outer);
            svg.appendChild(core);
            sparksContainer.appendChild(svg);
        });
    }

    function initFireflies() {
        if (!firefliesField || firefliesField.childElementCount > 0) return;

        const palette = ["#40d7ea", "#40d7ea", "#7ce8f5", "#2ed589"];
        const total = 24;

        for (let i = 0; i < total; i++) {
            const fly = document.createElement("span");
            fly.className = "firefly";

            const leftPos = (4 + (i * (92 / (total - 1))) + (Math.sin(i * 2.3) * 2.5)).toFixed(1) + "%";
            const bottomStart = (5 + ((i * 19) % 55)) + "%";
            const size = (4 + (i % 4) * 1.5).toFixed(1) + "px";
            const color = palette[i % palette.length];

            const dx1 = ((i % 2 === 0 ? 1 : -1) * (12 + (i % 5) * 4)) + "px";
            const dy1 = (-10 - (i % 4) * 6) + "px";
            const dx2 = ((i % 3 === 0 ? -1 : 1) * (14 + (i % 4) * 5)) + "px";
            const dy2 = (-22 - (i % 5) * 5) + "px";
            const dx3 = ((i % 2 === 0 ? -1 : 1) * (9 + (i % 3) * 4)) + "px";
            const dy3 = (-8 - (i % 3) * 5) + "px";

            fly.style.setProperty("--left-pos", leftPos);
            fly.style.setProperty("--bottom-start", bottomStart);
            fly.style.setProperty("--size", size);
            fly.style.setProperty("--firefly-color", color);
            fly.style.setProperty("--drift-x1", dx1);
            fly.style.setProperty("--drift-y1", dy1);
            fly.style.setProperty("--drift-x2", dx2);
            fly.style.setProperty("--drift-y2", dy2);
            fly.style.setProperty("--drift-x3", dx3);
            fly.style.setProperty("--drift-y3", dy3);
            fly.style.setProperty("--drift-dur", (6 + (i % 5) * 1.4) + "s");
            fly.style.setProperty("--glow-dur", (2.2 + (i % 4) * 0.7) + "s");
            fly.style.setProperty("--delay", ((i * 0.35) % 4.5).toFixed(2) + "s");

            firefliesField.appendChild(fly);
        }
    }

    initFireflies();

    function showLogo() {
        if (loadingText) loadingText.style.display = 'none';
        if (studioLogo) studioLogo.classList.add('visible');
        initSparks();
    }

    if (studioLogo) {
        if (studioLogo.complete) {
            showLogo();
        } else {
            studioLogo.onload = showLogo;
        }
    }

    function createXpOrbSVG(isClosed) {
        const outer = isClosed ? "#c93b3b" : "#4f9e3d";
        const mid = isClosed ? "#ff5252" : "#64c94b";
        const core = isClosed ? "#ff8a8a" : "#80ff20";

        return `
            <svg class="xp-orb-svg" viewBox="0 0 12 12" aria-hidden="true">
                <rect x="4" y="1" width="4" height="1" fill="${outer}"/>
                <rect x="2" y="2" width="2" height="1" fill="${outer}"/>
                <rect x="4" y="2" width="4" height="1" fill="${mid}"/>
                <rect x="8" y="2" width="2" height="1" fill="${outer}"/>
                <rect x="2" y="3" width="1" height="1" fill="${outer}"/>
                <rect x="3" y="3" width="6" height="1" fill="${mid}"/>
                <rect x="9" y="3" width="1" height="1" fill="${outer}"/>
                <rect x="1" y="4" width="1" height="4" fill="${outer}"/>
                <rect x="2" y="4" width="2" height="4" fill="${mid}"/>
                <rect x="4" y="4" width="4" height="1" fill="${mid}"/>
                <rect x="4" y="5" width="4" height="2" fill="${core}"/>
                <rect x="4" y="7" width="4" height="1" fill="${mid}"/>
                <rect x="8" y="4" width="2" height="4" fill="${mid}"/>
                <rect x="10" y="4" width="1" height="4" fill="${outer}"/>
                <rect x="2" y="8" width="1" height="1" fill="${outer}"/>
                <rect x="3" y="8" width="6" height="1" fill="${mid}"/>
                <rect x="9" y="8" width="1" height="1" fill="${outer}"/>
                <rect x="2" y="9" width="2" height="1" fill="${outer}"/>
                <rect x="4" y="9" width="4" height="1" fill="${mid}"/>
                <rect x="8" y="9" width="2" height="1" fill="${outer}"/>
                <rect x="4" y="10" width="4" height="1" fill="${outer}"/>
            </svg>
        `;
    }

    const modalidadesContainer = document.getElementById('modalidades-container');
    const modalidadesData = [
        { nombre: "Survival Custom", fecha: "10 abr 2026", version: "1.21", estado: "Cerrado", conectados: 0, img: "sc.png" },
        { nombre: "Kbffa", fecha: "próximamente", version: "1.8", estado: "Cerrado", conectados: 0, img: "kb.png" },
        { nombre: "Skywars", fecha: "próximamente", version: "1.8", estado: "Cerrado", conectados: 0, img: "sw.png" },
        { nombre: "Bedwars", fecha: "próximamente", version: "1.8", estado: "Cerrado", conectados: 0, img: "bw.png" },
        { nombre: "Arena PvP", fecha: "próximamente", version: "1.21", estado: "Cerrado", conectados: 0, img: "pvp.png" },
        { nombre: "???", fecha: "próximamente", version: "próximamente", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" },
        { nombre: "???", fecha: "próximamente", version: "x.x", estado: "Cerrado", conectados: 0, img: "???.png" }
    ];

    if (modalidadesContainer) {
        const porSlide = 6;
        let slidesHTML = "";

        for (let i = 0; i < modalidadesData.length; i += porSlide) {
            const grupo = modalidadesData.slice(i, i + porSlide);
            const cardsHTML = grupo.map(m => {
                const esAbierto = (m.estado || '').trim().toLowerCase() === 'abierto';
                const estadoClase = esAbierto ? 'is-abierto' : 'is-cerrado';
                const conectados = Number(m.conectados) || 0;

                return `
                    <div class="modalidad-card">
                        <img src="Modalidades/${m.img}" alt="${m.nombre}">
                        <div class="card-info">
                            <div class="card-main">
                                <h3>${m.nombre}</h3>
                                <div class="mod-stats-box ${estadoClase}" aria-label="Jugadores conectados">
                                    <span class="mod-xp-badge">
                                        ${createXpOrbSVG(!esAbierto)}
                                        <span>${conectados}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="card-meta">
                                <p>${m.fecha}</p>
                                <p class="card-version">${m.version}</p>
                                <p class="card-estado ${estadoClase}">${m.estado}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            slidesHTML += `<div class="slide${i === 0 ? ' active' : ''}">${cardsHTML}</div>`;
        }

        modalidadesContainer.innerHTML = slidesHTML;
    }

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    if (prevBtn) {
        prevBtn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 6-6 6 6 6 1.5-1.5L8 12l4.5-4.5L11 6zm7 0-6 6 6 6 1.5-1.5L15 12l4.5-4.5L18 6z"/></svg>`;
    }
    if (nextBtn) {
        nextBtn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 6 6-6 6 1.5 1.5L13.5 12 7.5 6 6 6zm7 0 6 6-6 6 1.5 1.5L20.5 12l-6-6L13 6z"/></svg>`;
    }

    function updateCarouselButtons() {
        const isFirst = currentSlide <= 0;
        const isLast = currentSlide >= slides.length - 1;

        if (prevBtn) {
            prevBtn.classList.toggle('visible', !isFirst);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('hidden', isLast);
        }
    }

    updateCarouselButtons();

    window.moveSlide = function(direction) {
        if (slides.length === 0) return;

        const targetIndex = currentSlide + direction;
        if (targetIndex < 0 || targetIndex >= slides.length) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = targetIndex;
        slides[currentSlide].classList.add('active');

        updateCarouselButtons();
    };

    const equipoGrid = document.querySelector('.equipo-grid');
    const equipoData = [
        {
            nombre: "scorpion741",
            skin: "scorpion741",
            rol: "OWNER",
            claseRango: "rango-owner",
            descripcion: "Fundador del proyecto, encargado del desarrollo técnico y sistemas."
        },
        {
            nombre: "SrTakavic_",
            skin: "SrTakavic_",
            rol: "ADMIN",
            claseRango: "rango-admin",
            descripcion: "Gestor de la comunidad, eventos y resolución de conflictos."
        },
        {
            nombre: "Guillermito",
            skin: "dracor",
            rol: "DEV",
            claseRango: "rango-dev",
            descripcion: "Programador y optimizador del servidor."
        },
        {
            nombre: "ILoperPv",
            skin: "apex",
            rol: "MANAGER",
            claseRango: "rango-manager",
            descripcion: "Gestión del staff, administración y experiencia de la comunidad."
        },
        {
            nombre: "SoyLugox",
            skin: "SoyLugox",
            rol: "BUILDER",
            claseRango: "rango-builder",
            descripcion: "Diseñador de construcciones del servidor."
        }
    ];

    if (equipoGrid) {
        equipoGrid.innerHTML = equipoData.map(m => `
            <div class="miembro-card ${m.claseRango}">
                <img src="https://minotar.net/helm/${m.skin}/128.png" class="player-head" alt="${m.nombre}">
                <h3>${m.nombre}</h3>
                <span class="role">${m.rol}</span>
                <p>${m.descripcion}</p>
            </div>
        `).join("");
    }

    const puntosTbody = document.getElementById('puntos-tbody');
    const buscarJugadorInput = document.getElementById('buscar-jugador');

    const puntosData = [
        { jugador: "scorpion741", skin: "scorpion741", puntos: 0 },
        { jugador: "SrTakavic_", skin: "SrTakavic_", puntos: 0 },
        { jugador: "guillermito", skin: "dracor", puntos: 0 },
        { jugador: "Iloperv", skin: "apex", puntos: 0 },
        { jugador: "SoyLugox", skin: "SoyLugox", puntos: 0 },
        { jugador: "mr_tocino", skin: "mr_tocino", puntos: 0 },
        { jugador: "INddestable", skin: "INddestable", puntos: 0 },
        { jugador: "Panzi01", skin: "Panzi01", puntos: 0 },
        { jugador: "OMARzMOURE", skin: "OMARzMOURE", puntos: 0 },
        { jugador: "ManuEV", skin: "ManuEV", puntos: 0 },
        { jugador: "Kelpek", skin: "kelpek", puntos: 0 },
        { jugador: "adrian8072", skin: "adrian8072", puntos: 0 },
        { jugador: "chiazu08", skin: "chiazu08", puntos: 0 },
        { jugador: "PrimaTakavic", skin: "SrTakavic_", puntos: 0 },
        { jugador: "MadreTakavic", skin: "SrTakavic_", puntos: 0 },
        { jugador: "HrmanaTakavic", skin: "SrTakavic_", puntos: 0 },
        { jugador: "Peperlog", skin: "Peperlog", puntos: 0 },
        { jugador: "trilce01", skin: "trilce01", puntos: 0 },
        { jugador: "mrkaguana", skin: "mrkaguana", puntos: 0 },
        { jugador: "sanchi1", skin: "sanchi1", puntos: 0 }
    ];

    function renderTablaPuntos() {
        if (!puntosTbody) return;

        const ordenados = [...puntosData].sort((a, b) => (Number(b.puntos) || 0) - (Number(a.puntos) || 0));

        puntosTbody.innerHTML = ordenados.map((item, index) => {
            const pts = Number(item.puntos) || 0;
            let rankClass = "";
            if (index === 0) rankClass = "rank-top-1";
            else if (index === 1) rankClass = "rank-top-2";
            else if (index === 2) rankClass = "rank-top-3";

            return `
                <tr data-puntos="${pts}">
                    <td class="col-pos"><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td class="jugador-col">
                        <img src="https://minotar.net/helm/${item.skin}/128.png" class="skin-mini" alt="${item.jugador}">
                        <span class="player-name">${item.jugador}</span>
                    </td>
                    <td class="col-pts"><span class="pts-pill">${pts.toLocaleString('es-ES')}</span></td>
                </tr>
            `;
        }).join("");
    }

    renderTablaPuntos();

    if (buscarJugadorInput && puntosTbody) {
        buscarJugadorInput.addEventListener('input', (e) => {
            const termino = e.target.value.trim().toLowerCase();
            const filas = Array.from(puntosTbody.querySelectorAll('tr[data-puntos]'));
            let visibles = 0;

            filas.forEach(fila => {
                const nombre = (fila.querySelector('.player-name')?.textContent || '').toLowerCase();
                const coincide = nombre.includes(termino);
                fila.style.display = coincide ? '' : 'none';
                if (coincide) visibles++;
            });

            let emptyRow = document.getElementById('puntos-sin-resultados');
            if (visibles === 0) {
                if (!emptyRow) {
                    emptyRow = document.createElement('tr');
                    emptyRow.id = 'puntos-sin-resultados';
                    emptyRow.innerHTML = `<td colspan="3" class="puntos-empty">No se encontraron jugadores con ese nombre.</td>`;
                    puntosTbody.appendChild(emptyRow);
                }
            } else if (emptyRow) {
                emptyRow.remove();
            }
        });
    }

    const grid = document.querySelector('.medias-grid');
    const colaboradores = [
        { slug: "panzi01", nombre: "Panzi01", img: "media1.png", color: "purple" },
        { slug: "inddestable", nombre: "INddestable", img: "media2.png", color: "pink" },
        { slug: "mrtocinin", nombre: "mrTocinin", img: "media3.png", color: "pink-light" },
        { slug: "mrcreepers08", nombre: "MrCreepers08", img: "media4.png", color: "green" },
        { slug: "evamorgelio", nombre: "evamorgelio", img: "media5.png", color: "purple-dark" }
    ];

    if (grid) {
        grid.innerHTML = colaboradores.map(c => `
            <a href="Medias/Perfil/${encodeURIComponent(c.slug)}.html" class="profile-card border-${c.color}">
                <div class="profile-image" style="background-image: url('Medias/LMedias/${c.img}');">
                    <div class="profile-info">
                        <p class="profile-name">${c.nombre}</p>
                        <p class="profile-desc">Sintux Medias</p>
                    </div>
                </div>
            </a>
        `).join("");
    }

    window.copyIp = function() {
        const ipText = document.getElementById('ip-address').innerText;
        const ipBar = document.getElementById('server-ip-bar');
        const btnCopy = document.getElementById('btn-copy-action');

        navigator.clipboard.writeText(ipText).then(() => {
            if (ipBar) ipBar.classList.add('copied-active');
            if (btnCopy) btnCopy.innerText = "COPIADO";
            setTimeout(() => {
                if (ipBar) ipBar.classList.remove('copied-active');
                if (btnCopy) btnCopy.innerText = "COPIAR";
            }, 2000);
        });
    };

    window.setActiveNav = (selectedElement) => {
        document.querySelectorAll('#main-nav a').forEach(link => link.classList.remove('active'));
        selectedElement.classList.add('active');
    };
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('#main-nav a');
    let currentId = '';

    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - 200)) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
});