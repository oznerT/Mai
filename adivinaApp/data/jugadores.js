/*
 * LISTA DE JUGADORES
 * Reemplazá los ejemplos por deportistas reales.
 *
 * Campos:
 *  nombre   (obligatorio) Respuesta correcta, tal como se muestra.
 *  imagen   (obligatorio) Ruta a la foto (ej: "imagenes/messi.jpg").
 *  cara     (opcional)    Recuadro que tapa la cara, en % de la foto: { x, y, w, h }.
 *                         Sacalo con calibrar.html. Si la foto ya viene sin cara, poné null.
 *  alias    (opcional)    Otras respuestas válidas: ["messi", "leo", "la pulga"].
 *                         No importan mayúsculas ni tildes.
 *  deporte  (opcional)    Se muestra arriba de la foto y ayuda a elegir opciones parecidas.
 *  pista    (opcional)    Texto de ayuda que se muestra debajo de la foto.
 *  imagenRevelada (opcional) Foto original, se muestra al terminar la ronda.
 *  opciones (opcional)    Opciones incorrectas fijas. Si no se ponen, se toman otros jugadores de la lista.
 */
window.ADIVINA_JUGADORES = [
  {
    "nombre": "Cristiano Ronaldo",
    "alias": [
      "cristiano",
      "ronaldo",
      "cr7",
      "el bicho"
    ],
    "deporte": "Fútbol",
    "imagen": "imagenes/cr.jpg",
    "imagenRevelada": "imagenes/cr_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Lionel Messi",
    "alias": [
      "messi",
      "leo messi",
      "leo",
      "la pulga",
      "lio messi"
    ],
    "deporte": "Fútbol",
    "imagen": "imagenes/messi.jpg",
    "imagenRevelada": "imagenes/messi_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Roger Federer",
    "alias": [
      "federer",
      "roger"
    ],
    "deporte": "Tenis",
    "imagen": "imagenes/federer.jpg",
    "imagenRevelada": "imagenes/federer_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Rafael Nadal",
    "alias": [
      "nadal",
      "rafa nadal",
      "rafa"
    ],
    "deporte": "Tenis",
    "imagen": "imagenes/nadal.jpg",
    "imagenRevelada": "imagenes/nadal_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Franco Colapinto",
    "alias": [
      "colapinto",
      "franco",
      "colapa"
    ],
    "deporte": "Fórmula 1",
    "imagen": "imagenes/colapinto.jpg",
    "imagenRevelada": "imagenes/colapinto_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Charles Leclerc",
    "alias": [
      "leclerc",
      "charles"
    ],
    "deporte": "Fórmula 1",
    "imagen": "imagenes/leclerc.jpg",
    "imagenRevelada": "imagenes/leclerc_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Naomi Osaka",
    "alias": [
      "osaka",
      "naomi"
    ],
    "deporte": "Tenis",
    "imagen": "imagenes/osaka.jpg",
    "imagenRevelada": "imagenes/osaka_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Serena Williams",
    "alias": [
      "serena",
      "williams"
    ],
    "deporte": "Tenis",
    "imagen": "imagenes/serena.jpg",
    "imagenRevelada": "imagenes/serena_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Rodrigo De Paul",
    "alias": [
      "de paul",
      "depaul",
      "rodri de paul",
      "rodrigo depaul",
      "motorcito"
    ],
    "deporte": "Fútbol",
    "imagen": "imagenes/depaul.jpg",
    "imagenRevelada": "imagenes/depaul_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Jules Koundé",
    "alias": [
      "kounde",
      "jules kounde",
      "kunde",
      "jules"
    ],
    "deporte": "Fútbol",
    "imagen": "imagenes/kounde.jpg",
    "imagenRevelada": "imagenes/kounde_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Stephen Curry",
    "alias": [
      "curry",
      "steph curry",
      "steph",
      "stephen curry"
    ],
    "deporte": "Básquet",
    "imagen": "imagenes/curry.jpg",
    "imagenRevelada": "imagenes/curry_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Allen Iverson",
    "alias": [
      "iverson",
      "ai",
      "the answer"
    ],
    "deporte": "Básquet",
    "imagen": "imagenes/iverson.jpg",
    "imagenRevelada": "imagenes/iverson_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Luciana Aymar",
    "alias": [
      "aymar",
      "aimar",
      "lucha aymar",
      "lucha aimar",
      "lucha",
      "luciana aimar",
      "la lucha"
    ],
    "deporte": "Hockey",
    "imagen": "imagenes/aymar.jpg",
    "imagenRevelada": "imagenes/aymar_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Juan Manuel Fangio",
    "alias": [
      "fangio",
      "el chueco",
      "chueco fangio"
    ],
    "deporte": "Automovilismo",
    "imagen": "imagenes/fangio.jpg",
    "imagenRevelada": "imagenes/fangio_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Yuki Tsunoda",
    "alias": [
      "tsunoda",
      "yuki"
    ],
    "deporte": "Fórmula 1",
    "imagen": "imagenes/tsunoda.jpg",
    "imagenRevelada": "imagenes/tsunoda_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Gabriela Sabatini",
    "alias": [
      "sabatini",
      "gaby sabatini",
      "gabi sabatini",
      "gaby"
    ],
    "deporte": "Tenis",
    "imagen": "imagenes/sabatini.jpg",
    "imagenRevelada": "imagenes/sabatini_revelado.jpg",
    "cara": null
  },
  {
    "nombre": "Paula Pareto",
    "alias": [
      "pareto",
      "paretto",
      "peque pareto",
      "peque paretto",
      "la peque",
      "paula paretto"
    ],
    "deporte": "Judo",
    "imagen": "imagenes/paretto.jpg",
    "imagenRevelada": "imagenes/paretto_revelado.jpg",
    "cara": null
  }
];
