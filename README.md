# Mapa de salas · Abrelatam / ConDatos 2026

Mapa interactivo para que las personas asistentes encuentren su sala en el **Centro Cultural Miguel Ángel Asturias**.

- Croquis digital en SVG con tres vistas: **Nivel 1**, **Nivel 2** y **Exteriores**
- Ficha de cada sala con foto de referencia, indicaciones para llegar y capacidad
- Buscador, zoom y arrastre (también con los dedos en el celular)
- Enlaces directos a cada sala (`#tikal`, `#orquidea`…)
- Se puede insertar en cualquier sitio web. Es HTML, CSS y JavaScript sin dependencias ni paso de compilación.

---

## 1. Publicarlo en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `mapa-salas-abrelatam`.
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio, incluido el archivo `.nojekyll`.
   - Desde la web: *Add file → Upload files* y arrastra los archivos y las carpetas.
   - O desde la terminal:
     ```bash
     git init
     git add .
     git commit -m "Mapa de salas Abrelatam ConDatos 2026"
     git branch -M main
     git remote add origin https://github.com/USUARIO/mapa-salas-abrelatam.git
     git push -u origin main
     ```
3. En el repositorio entra a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`, y guarda.
4. En uno o dos minutos el mapa estará disponible en:
   `https://USUARIO.github.io/mapa-salas-abrelatam/`

---

## 2. Insertarlo en la página del evento

### Opción A · Con ajuste automático de altura (recomendada)

```html
<div class="mapa-salas" data-height="760"></div>
<script src="https://USUARIO.github.io/mapa-salas-abrelatam/embed.js" async></script>
```

- En escritorio el mapa usa la altura de `data-height` (760 px por defecto).
- En el celular el iframe crece solo para mostrar el mapa y la lista completa, sin barras de desplazamiento dobles.
- Los enlaces de tu propia página abren el mapa en la sala indicada:
  `https://tusitio.org/mapa#sala=tikal` o `https://tusitio.org/mapa?sala=tikal`
- Para abrir una sala por defecto: `<div class="mapa-salas" data-sala="gran-sala"></div>`
- Para seleccionar una sala desde tu propio JavaScript: `MapaSalas.seleccionar('comedor')`

En `ejemplo-embed.html` hay una página de prueba.

### Opción B · iframe simple (WordPress, Wix, Squarespace, Google Sites…)

```html
<iframe src="https://USUARIO.github.io/mapa-salas-abrelatam/"
        style="width:100%;height:780px;border:0;border-radius:14px"
        title="Mapa de salas Abrelatam ConDatos 2026"
        loading="lazy" allow="clipboard-write"></iframe>
```

Para abrir una sala concreta, añade el identificador al final: `…/mapa-salas-abrelatam/#tikal`

### Identificadores de las salas

| Nivel | Sala | `id` |
|---|---|---|
| 1 | Registro | `registro` |
| 1 | Lobby Central | `lobby-central` |
| 1 | Gran Sala Efraín Recinos | `gran-sala` |
| 1 | Sala Tikal | `tikal` |
| 1 | Zona de Patrocinadores | `patrocinadores` |
| 1 | Sala Atitlán | `atitlan` |
| 2 | Lobby Central · 2.º nivel | `lobby-2` |
| 2 | Sala Jaguar | `jaguar` |
| 2 | Sala Quetzal (Salón Tras Bastidores) | `quetzal` |
| 2 | Sala Orquídea (Salón Dorado) | `orquidea` |
| 2 | Sala Acatenango | `acatenango` |
| 2 | Sala Barrilete (Salón Terrazas) | `barrilete` |
| Ext. | Plaza Principal | `plaza` |
| Ext. | Gran Comedor | `comedor` |

En la agenda del evento puedes enlazar cada charla a su sala, por ejemplo `https://tusitio.org/mapa#sala=jaguar`.

---

## 3. Editar el contenido

| Quiero cambiar… | Archivo |
|---|---|
| Nombres, indicaciones, capacidad, palabras de búsqueda | `js/datos.js` |
| Fotos de referencia | `img/salas/<id>.jpg` (mismo nombre de archivo) |
| Posición o tamaño de una sala en el croquis | `js/datos.js` (`x`, `y`, `w`, `h`; lienzo de 1000 × 1100) |
| Textos de ayuda de cada nivel | `LEVELS` en `js/datos.js` |
| Colores y tipografía | variables en `:root` de `css/mapa.css` |
| Dibujo de muros, plaza, árboles, etc. | `SHAPES`, `drawBuilding()` y `drawExterior()` en `js/mapa.js` |

Después de editar, haz *commit* y GitHub Pages se actualiza solo.

Para probarlo en tu computadora, abre una terminal en esta carpeta y ejecuta `python3 -m http.server 8000`. Luego entra a <http://localhost:8000>.

---

## Estructura

```
├── index.html          # el mapa
├── embed.js            # script para insertarlo con altura automática
├── ejemplo-embed.html  # página de prueba de la inserción
├── css/mapa.css
├── js/datos.js         # salas y textos (editable)
├── js/mapa.js          # dibujo e interacción
├── img/salas/*.jpg     # fotos de referencia
└── .nojekyll           # GitHub Pages sirve los archivos tal cual
```

> **Nota:** el croquis es orientativo y no está a escala. Las ubicaciones combinan el documento de montaje del evento con la descripción oficial de los espacios del Centro Cultural:
> - Salón Dorado y Tras Bastidores: costado izquierdo del segundo nivel del lobby de la Gran Sala.
> - Cubo Escénico / Plaza Sur: parte posterior externa de la Gran Sala.
> - Plaza Principal: colinda con la Gran Sala, la Plaza Mujeres y el Teatro al Aire Libre (lado norte).
> - Teatro de Cámara: debajo de la Gran Sala, con acceso por la 24 calle.
> - Museo Efraín Recinos: costado derecho, bajando las gradas del lobby.
>
> El mapa está orientado como lo ve quien llega (entrada abajo), así que el norte queda hacia abajo.
