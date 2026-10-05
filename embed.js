/*!
 * embed.js · Mapa de salas Abrelatam / ConDatos 2026
 * Inserta el mapa en cualquier página y ajusta la altura del iframe automáticamente.
 *
 * Uso:
 *   <div class="mapa-salas" data-height="760"></div>
 *   <script src="https://USUARIO.github.io/REPOSITORIO/embed.js" async></script>
 *
 * Atributos opcionales del <div>:
 *   data-height  altura en escritorio (px). Por defecto 760.
 *   data-sala    sala seleccionada al cargar (ej. "tikal").
 *   data-src     URL del mapa, si es distinta de la carpeta donde está este script.
 *
 * Enlaces directos desde tu página: https://tusitio.org/mapa#sala=tikal  (o ?sala=tikal)
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var base = script ? script.src.replace(/embed\.js(\?.*)?$/, '') : '';
  var ORIGIN_OK = function (o) { try { return new URL(base || location.href).origin === o; } catch (e) { return true; } };

  function salaDeLaUrl() {
    var q = new URLSearchParams(location.search).get('sala');
    var h = (location.hash.match(/sala=([\w-]+)/) || [])[1];
    return h || q || null;
  }

  function montar(box) {
    if (box.dataset.montado) return;
    box.dataset.montado = '1';
    var alto = parseInt(box.dataset.height, 10) || 760;
    var src = box.dataset.src || base;
    var sala = salaDeLaUrl() || box.dataset.sala;
    var iframe = document.createElement('iframe');
    iframe.src = src + (sala ? '#' + encodeURIComponent(sala) : '');
    iframe.title = 'Mapa interactivo de salas · Abrelatam ConDatos 2026';
    iframe.loading = 'lazy';
    iframe.setAttribute('allow', 'clipboard-write');
    iframe.style.cssText = 'display:block;width:100%;border:0;border-radius:14px;overflow:hidden;height:' + alto + 'px';
    box.appendChild(iframe);

    window.addEventListener('message', function (e) {
      if (e.source !== iframe.contentWindow || !ORIGIN_OK(e.origin)) return;
      var m = e.data || {};
      if (m.type === 'mapa-salas:ready') {
        iframe.contentWindow.postMessage({ type: 'mapa-salas:parent', url: location.href, sala: salaDeLaUrl() }, '*');
      }
      if (m.type === 'mapa-salas:height') {
        iframe.style.height = (m.h ? m.h : alto) + 'px';
      }
    });

    // Permite seleccionar una sala desde tu propia página: MapaSalas.seleccionar('tikal')
    window.MapaSalas = {
      seleccionar: function (id) { iframe.contentWindow.postMessage({ type: 'mapa-salas:select', id: id }, '*'); }
    };
    window.addEventListener('hashchange', function () {
      var s = salaDeLaUrl(); if (s) window.MapaSalas.seleccionar(s);
    });
  }

  function iniciar() { document.querySelectorAll('.mapa-salas').forEach(montar); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
