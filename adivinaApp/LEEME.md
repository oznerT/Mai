# adivinaApp — ¿De quién es este outfit?

Juego para adivinar a un deportista por su outfit, con la cara tapada. No tiene dependencias ni build y funciona abriendo `index.html` directamente (también con `file://`).

## Archivos

| Archivo | Qué es |
|---|---|
| `adivina.js` | El juego completo. Es un Web Component `<adivina-outfit>` con Shadow DOM, así que su CSS no choca con la página que lo contenga. |
| `data/jugadores.js` | La lista de jugadores (`window.ADIVINA_JUGADORES`). |
| `imagenes/` | Las fotos: `x.jpg` con la cabeza tapada y `x_revelado.jpg` con la original (generadas a partir de `news/`). |
| `calibrar.html` | Herramienta para marcar la cara en cada foto y generar el código de `jugadores.js`. |
| `index.html` | Página de demo. |

## Cómo se juega

1. Se muestra la foto con la cara tapada.
2. Se escribe el nombre: acertar **sin opciones vale 3 puntos**. No importan mayúsculas ni tildes, y se aceptan los `alias`.
3. **Mostrar opciones** muestra 4 nombres, y acertar así **vale 1 punto**.
4. **Revelar** muestra la cara y el nombre, y no suma puntos.
5. Al final se muestra el puntaje total.

## Cargar jugadores

1. Poner las fotos en `imagenes/`.
2. Abrir `calibrar.html`, elegir cada foto, arrastrar un recuadro sobre la cara y completar nombre, alias y deporte.
3. Copiar el código generado a `data/jugadores.js`.

Si la foto ya viene editada sin cara, usar `cara: null`.

## Integración en otra página (para otra IA / dev)

```html
<script src="adivinaApp/data/jugadores.js"></script>
<script src="adivinaApp/adivina.js"></script>
<adivina-outfit titulo="PilaTV x Emedemai"></adivina-outfit>
```

- Las rutas de `imagen` son relativas a la **página que incluye el componente**, no a `adivina.js`. Si se integra desde otra carpeta, hay que ajustarlas (por ejemplo `adivinaApp/imagenes/x.jpg`).
- Alternativa con JSON (requiere servidor, no funciona en `file://`): `<adivina-outfit src="jugadores.json">`.
- Alternativa por JS: `document.querySelector("adivina-outfit").setData([...])`.

### Atributos
- `titulo`: texto del encabezado.
- `logo-izq` / `logo-der`: URLs de los logos (PilaTV y Emedemai en `imagenes/`).
- `src`: URL de un JSON con el mismo formato que `ADIVINA_JUGADORES`.
- `orden="fijo"`: respeta el orden de la lista. Por defecto las rondas se mezclan.

### Métodos
`setData(lista)`, `reset()`, `siguiente()`, `revelar()`, `mostrarOpciones()`.

### Eventos (burbujean hasta `document`)
- `adivina-respuesta` → `detail: { jugador, correcto, puntos, puntaje, usoOpciones }`
- `adivina-fin` → `detail: { puntaje, aciertos, total }`

### Estilos
La estética mezcla PilaTV (magenta, verde lima y bordes negros en forma de "pill") con Emedemai (rosa, verde y títulos en mayúscula condensada). Tipografías: Fredoka y Anton, desde Google Fonts. Todo se puede cambiar con variables CSS:
```css
adivina-outfit {
  --adv-bg:#007b3c; --adv-card:#fff4f9; --adv-text:#111; --adv-muted:#6b5560;
  --adv-rosa:#e7639c; --adv-rosa-claro:#ff8fbf; --adv-magenta:#fe6fff; --adv-lima:#01e74f;
  --adv-borde:#111; --adv-ok:#01e74f; --adv-bad:#ff4d4d; --adv-radius:24px; --adv-foto-alto:52vh;
}
```

### Formato de un jugador
```js
{
  nombre: "Nombre Apellido",          // obligatorio
  imagen: "imagenes/archivo.jpg",     // obligatorio
  cara: { x: 35, y: 7, w: 30, h: 20 },// % de la foto; null si ya está editada
  imagenRevelada: "imagenes/archivo_revelado.jpg", // se muestra al terminar la ronda
  alias: ["apellido", "apodo"],
  deporte: "Fútbol",
  pista: "Texto opcional",
  opciones: ["Distractor 1", "Distractor 2", "Distractor 3"] // si falta, usa otros jugadores (prioriza el mismo deporte)
}
```
