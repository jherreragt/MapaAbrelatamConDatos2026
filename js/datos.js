/*
 * DATOS DEL MAPA · Abrelatam / ConDatos 2026
 * ------------------------------------------------------------
 * Edita este archivo para cambiar textos, indicaciones o fotos.
 *
 * Cada sala tiene:
 *   id      → identificador para enlaces directos (…/#tikal)
 *   n       → número que aparece en el mapa
 *   level   → 'n1' (primer nivel), 'n2' (segundo nivel) o 'ext' (exteriores)
 *   type    → estilo: 'sala1', 'sala2', 'common', 'ext' o 'main'
 *   name, where, how, facts, tags → textos de la ficha y del buscador
 *   foto    → ruta de la imagen de referencia (img/salas/…)
 *   x,y,w,h o d → forma de la sala en el plano (lienzo de 1000 × 1100)
 *   lines, lx, ly, kicker, size, subFrom → etiqueta dentro del plano
 *   bx, by  → posición del número
 */

const LEVELS = [
  {id:'n1', name:'Primer nivel', short:'Nivel 1', color:'var(--n1)',
   note:'Entras desde la <b>Plaza Principal</b> (abajo) al lobby de la Gran Sala. Las salas están en las alas <b>izquierda</b> y <b>derecha</b> del lobby.'},
  {id:'n2', name:'Segundo nivel', short:'Nivel 2', color:'var(--n2)',
   note:'Costado izquierdo, en orden: <b>Jaguar</b>, <b>Quetzal</b> (Tras Bastidores) y <b>Orquídea</b> (Salón Dorado), a la par de la Gran Sala.'},
  {id:'ext', name:'Exteriores', short:'Exteriores', color:'var(--ext)',
   note:'Entradas por la <b>21 calle</b> (abajo, Plaza Principal) y la <b>24 calle</b> (arriba, Plaza Sur). El Gran Comedor está detrás de la Gran Sala.'},
];

const ROOMS = [
  {
    "id": "registro",
    "n": 1,
    "level": "n1",
    "type": "common",
    "name": "Registro",
    "where": "Ingreso al lobby de la Gran Sala",
    "how": "Es lo primero que encuentras al entrar desde la Plaza Principal. <b>Día 1:</b> mesas de registro en el ante lobby. <b>Día 2:</b> en la entrada del lobby de la Gran Sala, junto a los arcos de seguridad.",
    "x": 400,
    "y": 800,
    "w": 200,
    "h": 50,
    "lines": [
      "Registro"
    ],
    "size": 19,
    "lx": 515,
    "ly": 826,
    "bx": 424,
    "by": 825,
    "facts": [
      "Mesas de registro",
      "Pantallas interactivas"
    ],
    "tags": "entrada acreditacion gafete ingreso",
    "foto": "img/salas/registro.jpg"
  },
  {
    "id": "lobby-central",
    "n": 2,
    "level": "n1",
    "type": "common",
    "name": "Lobby Central",
    "where": "Lobby de la Gran Sala Efraín Recinos",
    "how": "Pasando el registro estás en el lobby, bajo la gran lámpara de 999 focos. Aquí está la exposición de arte y la pantalla LED. Las alas izquierda y derecha llevan a las salas; las puertas del fondo, a la Gran Sala.",
    "x": 345,
    "y": 606,
    "w": 310,
    "h": 184,
    "lines": [
      "Lobby Central",
      "Exposición de arte · pantalla LED"
    ],
    "subFrom": 1,
    "size": 20,
    "lx": 500,
    "ly": 728,
    "bx": 370,
    "by": 630,
    "decoKey": "lobby",
    "facts": [
      "Exposición de arte",
      "Pantalla LED",
      "Lámpara de 999 focos"
    ],
    "tags": "arte exposicion lampara",
    "foto": "img/salas/lobby-central.jpg"
  },
  {
    "id": "gran-sala",
    "n": 3,
    "level": "n1",
    "type": "main",
    "name": "Gran Sala Efraín Recinos",
    "where": "Se entra desde el Lobby Central",
    "how": "Desde el Lobby Central, entra por las puertas del fondo. Aquí son la inauguración y las charlas principales.",
    "d": "M312 78 H688 Q700 78 700 90 V250 H670 L712 520 Q500 594 288 520 L330 250 H300 V90 Q300 78 312 78 Z",
    "lines": [
      "Gran Sala",
      "Efraín Recinos"
    ],
    "size": 30,
    "lx": 500,
    "ly": 430,
    "bx": 328,
    "by": 104,
    "decoKey": "seats",
    "kicker": "INAUGURACIÓN · PLENARIAS",
    "facts": [
      "Inauguración",
      "Charlas principales",
      "2,048 butacas"
    ],
    "tags": "inauguracion plenaria principal teatro",
    "foto": "img/salas/gran-sala.jpg"
  },
  {
    "id": "tikal",
    "n": 4,
    "level": "n1",
    "type": "sala1",
    "name": "Sala Tikal",
    "where": "Ala izquierda del lobby · primer nivel",
    "how": "Entra al lobby y, de espaldas a la Plaza Principal, gira a la <b>izquierda</b>. Está en el ala izquierda de la planta baja.",
    "x": 110,
    "y": 592,
    "w": 220,
    "h": 140,
    "lines": [
      "Tikal"
    ],
    "kicker": "SALA",
    "size": 26,
    "lx": 192,
    "ly": 680,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "",
    "bx": 134,
    "by": 616,
    "foto": "img/salas/tikal.jpg"
  },
  {
    "id": "patrocinadores",
    "n": 5,
    "level": "n1",
    "type": "common",
    "name": "Zona de Patrocinadores",
    "where": "Ala izquierda del lobby · primer nivel",
    "how": "En el ala izquierda de la planta baja, junto a la Sala Tikal. Aquí están los stands de patrocinadores, aliados e INGUAT.",
    "x": 110,
    "y": 744,
    "w": 220,
    "h": 86,
    "lines": [
      "Patrocinadores"
    ],
    "size": 16,
    "lx": 180,
    "ly": 806,
    "bx": 134,
    "by": 768,
    "decoKey": "stands",
    "dashed": true,
    "facts": [
      "Stands",
      "Aliados"
    ],
    "tags": "stands sponsors inguat",
    "foto": "img/salas/patrocinadores.jpg"
  },
  {
    "id": "atitlan",
    "n": 6,
    "level": "n1",
    "type": "sala1",
    "name": "Sala Atitlán",
    "where": "Ala derecha del lobby · primer nivel",
    "how": "Entra al lobby y, de espaldas a la Plaza Principal, gira a la <b>derecha</b>. Está en el ala derecha de la planta baja.",
    "x": 670,
    "y": 592,
    "w": 220,
    "h": 140,
    "lines": [
      "Atitlán"
    ],
    "kicker": "SALA",
    "size": 26,
    "lx": 752,
    "ly": 680,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "",
    "bx": 694,
    "by": 616,
    "foto": "img/salas/atitlan.jpg"
  },
  {
    "id": "lobby-2",
    "n": 7,
    "level": "n2",
    "type": "common",
    "name": "Lobby Central · 2.º nivel",
    "where": "Segundo nivel del lobby, alrededor del vacío",
    "how": "Sube al segundo nivel del lobby. Alrededor del vacío de la lámpara está el panel para armar la agenda de Abrelatam/ConDatos; lleva tus ideas en post-its.",
    "d": "M361 592 H639 Q655 592 655 608 V834 Q655 850 639 850 H361 Q345 850 345 834 V608 Q345 592 361 592 Z M402 628 H598 Q618 628 618 648 V758 Q618 778 598 778 H402 Q382 778 382 758 V648 Q382 628 402 628 Z",
    "lines": [
      "Lobby Central · 2.º nivel",
      "Agenda colaborativa"
    ],
    "subFrom": 1,
    "size": 16,
    "lx": 500,
    "ly": 812,
    "bx": 370,
    "by": 612,
    "decoKey": "postits",
    "facts": [
      "Agenda colaborativa",
      "Post-its"
    ],
    "tags": "agenda desconferencia postit",
    "foto": "img/salas/lobby-2.jpg"
  },
  {
    "id": "jaguar",
    "n": 8,
    "level": "n2",
    "type": "sala2",
    "name": "Sala Jaguar",
    "where": "Costado izquierdo · 2.º nivel · primera sala",
    "how": "Sube al segundo nivel del lobby y gira a la <b>izquierda</b> (de espaldas a la entrada). Jaguar es la <b>primera</b> sala del costado izquierdo.",
    "x": 110,
    "y": 724,
    "w": 220,
    "h": 108,
    "lines": [
      "Jaguar"
    ],
    "kicker": "SALA",
    "size": 26,
    "lx": 192,
    "ly": 790,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "",
    "bx": 134,
    "by": 748,
    "foto": "img/salas/jaguar.jpg"
  },
  {
    "id": "quetzal",
    "n": 9,
    "level": "n2",
    "type": "sala2",
    "name": "Sala Quetzal",
    "where": "Salón Tras Bastidores · costado izquierdo, 2.º nivel · segunda sala",
    "how": "Sube al segundo nivel del lobby y sigue por el <b>costado izquierdo</b>: Quetzal (Tras Bastidores) es la <b>segunda</b> sala, después de Jaguar.",
    "x": 110,
    "y": 592,
    "w": 220,
    "h": 120,
    "lines": [
      "Quetzal",
      "Tras Bastidores"
    ],
    "subFrom": 1,
    "kicker": "SALA",
    "size": 24,
    "lx": 180,
    "ly": 664,
    "bx": 134,
    "by": 614,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "tras bastidores bar",
    "foto": "img/salas/quetzal.jpg"
  },
  {
    "id": "orquidea",
    "n": 10,
    "level": "n2",
    "type": "sala2",
    "name": "Sala Orquídea",
    "where": "Salón Dorado · costado izquierdo, 2.º nivel · a la par de la Gran Sala",
    "how": "Sube al segundo nivel del lobby y sigue por el <b>costado izquierdo</b> hasta el fondo: el Salón Dorado es la <b>última</b> sala, después de Jaguar y Quetzal, a la par de la Gran Sala.",
    "x": 95,
    "y": 400,
    "w": 175,
    "h": 163,
    "lines": [
      "Orquídea",
      "Salón Dorado"
    ],
    "subFrom": 1,
    "kicker": "SALA",
    "size": 23,
    "lx": 170,
    "ly": 500,
    "bx": 118,
    "by": 424,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 100 personas"
    ],
    "tags": "salon dorado",
    "foto": "img/salas/orquidea.jpg"
  },
  {
    "id": "acatenango",
    "n": 11,
    "level": "n2",
    "type": "sala2",
    "name": "Sala Acatenango",
    "where": "Ala derecha · segundo nivel del lobby",
    "how": "Sube al segundo nivel del lobby y gira a la <b>derecha</b> (de espaldas a la entrada).",
    "x": 670,
    "y": 592,
    "w": 220,
    "h": 120,
    "lines": [
      "Acatenango"
    ],
    "kicker": "SALA",
    "size": 23,
    "lx": 752,
    "ly": 668,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "",
    "bx": 694,
    "by": 616,
    "foto": "img/salas/acatenango.jpg"
  },
  {
    "id": "barrilete",
    "n": 12,
    "level": "n2",
    "type": "sala2",
    "name": "Sala Barrilete",
    "where": "Salón Terrazas · costado derecho, 2.º nivel",
    "how": "Sube al segundo nivel del lobby y sigue por el <b>costado derecho</b> hacia el fondo, hasta el Salón Terrazas.",
    "x": 730,
    "y": 400,
    "w": 175,
    "h": 163,
    "lines": [
      "Barrilete",
      "Salón Terrazas"
    ],
    "subFrom": 1,
    "kicker": "SALA",
    "size": 23,
    "lx": 805,
    "ly": 500,
    "bx": 753,
    "by": 424,
    "decoKey": "sala",
    "facts": [
      "Charlas",
      "≈ 40 personas"
    ],
    "tags": "terrazas",
    "foto": "img/salas/barrilete.jpg"
  },
  {
    "id": "plaza",
    "n": 13,
    "level": "ext",
    "type": "ext",
    "name": "Plaza Principal",
    "where": "Frente al lobby de la Gran Sala",
    "how": "Es la plaza por la que ingresas al Centro Cultural. Colinda con la Gran Sala, la Plaza Mujeres y el Teatro al Aire Libre. Aquí están la estación de primeros auxilios de CONRED y el stand de degustación de INGUAT.",
    "x": 300,
    "y": 672,
    "w": 400,
    "h": 220,
    "lines": [
      "Plaza Principal",
      "Primeros auxilios · INGUAT"
    ],
    "subFrom": 1,
    "size": 22,
    "lx": 500,
    "ly": 712,
    "bx": 326,
    "by": 698,
    "decoKey": "plaza",
    "facts": [
      "Primeros auxilios CONRED",
      "Stand INGUAT"
    ],
    "tags": "conred primeros auxilios emergencia inguat ingreso",
    "foto": "img/salas/plaza.jpg"
  },
  {
    "id": "comedor",
    "n": 14,
    "level": "ext",
    "type": "ext",
    "name": "Gran Comedor",
    "where": "Plaza Sur · Cubo Escénico, detrás de la Gran Sala",
    "how": "Sal a la Plaza Principal y rodea el edificio de la Gran Sala hasta su parte trasera: la Plaza Sur, junto al Cubo Escénico (el muro de mosaicos azules de 29 m). El comedor está bajo toldos.",
    "x": 320,
    "y": 70,
    "w": 360,
    "h": 120,
    "lines": [
      "Gran Comedor · Plaza Sur"
    ],
    "size": 19,
    "lx": 512,
    "ly": 100,
    "bx": 344,
    "by": 96,
    "decoKey": "tents",
    "facts": [
      "Alimentos",
      "Marimba"
    ],
    "tags": "comida almuerzo refaccion plaza sur",
    "foto": "img/salas/comedor.jpg"
  },
  {
    "id": "entrada-21",
    "n": 15,
    "level": "ext",
    "type": "ext",
    "name": "Entrada por la 21 calle",
    "where": "Acceso del lado de la Plaza Principal",
    "how": "Al entrar por la 21 calle llegas directamente a la <b>Plaza Principal</b>. Sigue de frente hacia el lobby de la Gran Sala, donde está el registro.",
    "x": 405,
    "y": 1000,
    "w": 190,
    "h": 44,
    "rx": 22,
    "lines": [
      "Entrada 21 calle"
    ],
    "size": 16,
    "lx": 518,
    "ly": 1023,
    "bx": 428,
    "by": 1022,
    "facts": [
      "Acceso al evento"
    ],
    "tags": "entrada ingreso acceso 21 calle puerta"
  },
  {
    "id": "entrada-24",
    "n": 16,
    "level": "ext",
    "type": "ext",
    "name": "Entrada por la 24 calle",
    "where": "Acceso del lado de la Plaza Sur y el Teatro de Cámara",
    "how": "Al entrar por la 24 calle quedas del lado trasero de la Gran Sala, cerca del <b>Gran Comedor</b> (Plaza Sur) y del Teatro de Cámara. Para llegar al registro, rodea la Gran Sala hasta la <b>Plaza Principal</b> y entra al lobby.",
    "x": 700,
    "y": 8,
    "w": 190,
    "h": 44,
    "rx": 22,
    "lines": [
      "Entrada 24 calle"
    ],
    "size": 16,
    "lx": 813,
    "ly": 31,
    "bx": 723,
    "by": 30,
    "facts": [
      "Acceso al evento"
    ],
    "tags": "entrada ingreso acceso 24 calle puerta"
  }
];
