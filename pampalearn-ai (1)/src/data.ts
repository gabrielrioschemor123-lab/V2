import { Book, Course } from "./types";

export const initialBooks: Book[] = [
  {
    id: "tracy-camino-riqueza",
    title: "El camino hacia la riqueza",
    author: "Brian Tracy",
    driveId: "1-MfbOFN7C37rQ0NDsFxjI1FPbJ9NGLFv",
    coverUrl: "https://i.postimg.cc/0yP7HfJM/mini-magick20190112-14892-iz50xb.png",
    cover_url: "https://i.postimg.cc/0yP7HfJM/mini-magick20190112-14892-iz50xb.png",
    category: "Brian Tracy",
    description: "Estrategias invaluables sobre la mentalidad empresarial, acumulación de capital y toma de decisiones financieras eficientes para la autonomía profesional.",
    pages: 120
  },
  {
    id: "tracy-emprende-negocio",
    title: "Emprende tu propio negocio",
    author: "Brian Tracy",
    driveId: "1W-fE8uY5HSje4g_2QTJxRhRuHOG9zHM1",
    coverUrl: "https://i.postimg.cc/mDvH3NsP/images.png",
    cover_url: "https://i.postimg.cc/mDvH3NsP/images.png",
    category: "Brian Tracy",
    description: "La guía definitiva de planificación, análisis de viabilidad, marketing estratégico e incremento de ventas de forma acelerada.",
    pages: 164
  },
  {
    id: "tracy-leyes-suerte",
    title: "Las leyes de la suerte",
    author: "Brian Tracy",
    driveId: "1UtUHM2k3iqHHcN5tXSGNJudWEBJOzkGa",
    coverUrl: "https://i.postimg.cc/zXjy31VY/718998-f6038f1dc5698bafd217275731889535-640-0.webp",
    cover_url: "https://i.postimg.cc/zXjy31VY/718998-f6038f1dc5698bafd217275731889535-640-0.webp",
    category: "Brian Tracy",
    description: "Cómo reprogramar tus hábitos cotidianos y tu visión mental para atraer abundancia y sincronizar oportunidades ideales.",
    pages: 145
  },
  {
    id: "tracy-pasos-gigante",
    title: "Pasos de gigante",
    author: "Brian Tracy",
    driveId: "17Rb2UJg4BsHyz5Y4crjFxDz0s3opq7nC",
    coverUrl: "https://i.postimg.cc/5NntbqR4/9781404119406.jpg",
    cover_url: "https://i.postimg.cc/5NntbqR4/9781404119406.jpg",
    category: "Brian Tracy",
    description: "21 Claves prácticas de desarrollo personal para construir disciplina férrea, optimizar el tiempo laboral y desbloquear el éxito constante.",
    pages: 138
  },
  {
    id: "disney-libro-1",
    title: "101 Dálmatas",
    author: "Walt Disney",
    driveId: "1NKPE24RmP4Wj3b0svKnRDC6xD0YqjOhP",
    coverUrl: "https://i.postimg.cc/tCRdCk2V/1.webp",
    cover_url: "https://i.postimg.cc/tCRdCk2V/1.webp",
    category: "Disney",
    description: "Acompaña a Pongo, Perdita y sus tiernos cachorros en esta emocionante y divertida odisea clásica para escapar de las garras de la icónica Cruella de Vil.",
    pages: 142
  },
  {
    id: "disney-libro-2",
    title: "Bambi",
    author: "Walt Disney",
    driveId: "1J7J9_tSSvzOqoLaluiNqNgcPE3_rY5Zp",
    coverUrl: "https://i.postimg.cc/DZgW9kVD/download.jpg",
    cover_url: "https://i.postimg.cc/DZgW9kVD/download.jpg",
    category: "Disney",
    description: "Sigue la tierna historia de crecimiento del joven príncipe del bosque Bambi, junto a sus fieles compañeros Tambor y Flor, en un viaje lleno de aprendizaje y emotividad.",
    pages: 158
  },
  {
    id: "disney-libro-3",
    title: "Alicia en el País de las Maravillas",
    author: "Walt Disney",
    driveId: "122BxgTe8fvhqyuwQmOPmsJ4WPTNEBLlt",
    coverUrl: "https://i.postimg.cc/yxxN2DyB/1.webp",
    cover_url: "https://i.postimg.cc/yxxN2DyB/1.webp",
    category: "Disney",
    description: "Sumérgete con Alicia a través de la madriguera del conejo para explorar un mundo extraordinario y disparatado, repleto de acertijos, magia y sombreros peculiares.",
    pages: 116
  },
  {
    id: "grey-libro-1",
    title: "Cincuenta sombras de Grey",
    author: "E. L. James",
    driveId: "1bPLm4g9HC1yrp2Vm28FhwfVTyQFcqyXf",
    coverUrl: "https://i.postimg.cc/sgdV46q5/cincuenta-sombras-de-grey-cincuenta-sombras-1.webp",
    cover_url: "https://i.postimg.cc/sgdV46q5/cincuenta-sombras-de-grey-cincuenta-sombras-1.webp",
    category: "50 Sombras",
    description: "Descubre el apasionante inicio de la trilogía que revolucionó el romance contemporáneo, narrando la intensa y apasionada atracción entre la inocente universitaria Anastasia Steele y el misterioso magnate Christian Grey.",
    pages: 540
  },
  {
    id: "grey-libro-2",
    title: "Cincuenta sombras liberadas",
    author: "E. L. James",
    driveId: "1knFRiE2fmcSkkjx1istfEi99xjiAt42R",
    coverUrl: "https://i.postimg.cc/wvGzy0Dj/81rf-C62qof-L-UF1000-1000-QL80.jpg",
    cover_url: "https://i.postimg.cc/wvGzy0Dj/81rf-C62qof-L-UF1000-1000-QL80.jpg",
    category: "50 Sombras",
    description: "La esperada y suntuosa conclusión de la historia de amor que une a Anastasia y Christian. Al comprometerse bajo un lazo inquebrantable, resurgen fantasmas del pasado con el potencial de destruirlo todo.",
    pages: 650
  },
  {
    id: "grey-libro-3",
    title: "Cincuenta sombras oscuras",
    author: "E. L. James",
    driveId: "1G4r40vCt4VF20aYEtcHilAsJk3c2w_OF",
    coverUrl: "https://i.postimg.cc/vZs4ZZQj/unnamed.jpg",
    cover_url: "https://i.postimg.cc/vZs4ZZQj/unnamed.jpg",
    category: "50 Sombras",
    description: "Anastasia intenta cortar lazos definitivos con el enigmático magnate e iniciar una career editorial estructurada, pero el implacable Christian Grey regresa a su vida con una nueva propuesta irresistible.",
    pages: 590
  },
  {
    id: "hp-libro-1",
    title: "Harry Potter y la piedra filosofal",
    author: "J. K. Rowling",
    driveId: "1tTffJTVsn6O9N71suvR4CafesR47oaW9",
    coverUrl: "https://i.postimg.cc/W15scNt7/633251A3-C8FD-4FB3-A190-95E07EA18B30-IMG400.jpg",
    cover_url: "https://i.postimg.cc/W15scNt7/633251A3-C8FD-4FB3-A190-95E07EA18B30-IMG400.jpg",
    category: "Harry Potter",
    description: "El inicio de las legendarias aventuras del joven mago Harry Potter cuando descubre su verdadera herencia mágica al cumplir once años de edad y asiste a su primer año en el Colegio Hogwarts.",
    pages: 254
  },
  {
    id: "hp-libro-2",
    title: "Harry Potter y la cámara secreta",
    author: "J. K. Rowling",
    driveId: "1bgSWi-bUUIH1bfUkYZNgl4RMgr3VNbOt",
    coverUrl: "https://i.postimg.cc/W1BX3rDR/harry-potter-y-la-camara-secreta.jpg",
    cover_url: "https://i.postimg.cc/W1BX3rDR/harry-potter-y-la-camara-secreta.jpg",
    category: "Harry Potter",
    description: "En su segundo año en Hogwarts, Harry y sus fieles compañeros investigan misteriosos ataques petrificantes vinculados a la mítica leyenda de la Cámara Secreta y el heredero de Slytherin.",
    pages: 286
  },
  {
    id: "hp-libro-3",
    title: "Harry Potter y el prisionero de Azkaban",
    author: "J. K. Rowling",
    driveId: "1TSByUPtO_fy-cJpmABxPoDmu9kolh63v",
    coverUrl: "https://i.postimg.cc/Y0Dxwmcz/cuantas-palabras-tiene-el-libro-de-harry-potter-y-el-prisionero-de-azkaban.webp",
    cover_url: "https://i.postimg.cc/Y0Dxwmcz/cuantas-palabras-tiene-el-libro-de-harry-potter-y-el-prisionero-de-azkaban.webp",
    category: "Harry Potter",
    description: "Harry descubre que un peligroso prisionero, Sirius Black, ha escapado de la fortaleza mágica de Azkaban y aparentemente lo busca desatando grandes revelaciones sobre su pasado.",
    pages: 360
  },
  {
    id: "hp-libro-4",
    title: "Harry Potter y el cáliz de fuego",
    author: "J. K. Rowling",
    driveId: "12JvUDhfRWMUOCo3hrLWLUYJcCPcV_18L",
    coverUrl: "https://i.postimg.cc/vBqn1FPm/9789878000213.jpg",
    cover_url: "https://i.postimg.cc/vBqn1FPm/9789878000213.jpg",
    category: "Harry Potter",
    description: "Elegido inexplicablemente para competir en el peligroso Torneo de los Tres Magos de Hogwarts, Harry debe superar duras pruebas mientras un mal ancestral resurge en las sombras.",
    pages: 636
  },
  {
    id: "terror-reflejo-bruja",
    title: "El reflejo de la bruja",
    author: "Adaptación de Terror",
    driveId: "1wtHNI6YGHhhrQHDZ0gh-Qr1Ep3xGDo30",
    coverUrl: "https://i.postimg.cc/j2vJVVf5/63018776.jpg",
    cover_url: "https://i.postimg.cc/j2vJVVf5/63018776.jpg",
    category: "Terror",
    description: "Un relato tenso y místico donde un antiguo espejo desata visiones sombrías y condenas sobrenaturales.",
    pages: 95
  },
  {
    id: "terror-queridos-monstruos",
    title: "Queridos Monstruos",
    author: "Elsa Bornemann",
    driveId: "1F1zALLu77YC8QB-p4FCmJjusrByg_c4P",
    coverUrl: "https://i.postimg.cc/cHFs0dFc/360-9789504643500.jpg",
    cover_url: "https://i.postimg.cc/cHFs0dFc/360-9789504643500.jpg",
    category: "Terror",
    description: "Una recopilación de relatos clásicos de terror habitados por criaturas inolvidables, monstruos legendarios y misterios escalofriantes.",
    pages: 140
  },
  {
    id: "terror-cuentos-fantasticos",
    title: "Cuentos fantásticos terroríficos",
    author: "Colección Antológica",
    driveId: "1lYiKbhpkasUAd3yMxgRPCxJq5dI10NKN",
    coverUrl: "https://i.postimg.cc/ZqZZNW2Y/p-6BMWT-m-Xt43S5d5DYi-C1x2q-WU.webp",
    cover_url: "https://i.postimg.cc/ZqZZNW2Y/p-6BMWT-m-Xt43S5d5DYi-C1x2q-WU.webp",
    category: "Terror",
    description: "Historias extraordinarias que cruzan los límites de la realidad y se adentran en pesadillas inconcebibles.",
    pages: 210
  },
  {
    id: "terror-cuentos-terror",
    title: "Cuentos para leer con la luz prendida",
    author: "Varios Autores",
    driveId: "1LwNze89eztgZXjRpRGr2p65f2UBfQZ0t",
    coverUrl: "https://i.postimg.cc/SQXskMp7/Cuentosparaleerconlaluzprendida-1-320.webp",
    cover_url: "https://i.postimg.cc/SQXskMp7/Cuentosparaleerconlaluzprendida-1-320.webp",
    category: "Terror",
    description: "Una selecta antología de narraciones espeluznantes y atmósferas oscuras diseñadas para desafiar tu temple en cada página.",
    pages: 180
  },
  {
    id: "bridgerton-1",
    title: "El duque y yo",
    author: "Julia Quinn",
    driveId: "1_4BAZs-j2DDvs4KfNfHlISoosfdOEEcs",
    coverUrl: "https://i.postimg.cc/R0KchDfv/el-duque-y-yo-bridgerton-1.jpg",
    cover_url: "https://i.postimg.cc/R0KchDfv/el-duque-y-yo-bridgerton-1.jpg",
    category: "Bridgerton",
    description: "Daphne Bridgerton y el rebelde duque de Hastings trazan un pacto de mutua conveniencia: simular un noviazgo ficticio para alejar a pretendientes indeseados y pretensiones familiares.",
    pages: 320
  },
  {
    id: "bridgerton-2",
    title: "El vizconde que me amó",
    author: "Julia Quinn",
    driveId: "1CKsihUItwy6xKAFxxIN8O6uw1WwhxE0s",
    coverUrl: "https://i.postimg.cc/2j2n1vqV/images.jpg",
    cover_url: "https://i.postimg.cc/2j2n1vqV/images.jpg",
    category: "Bridgerton",
    description: "Anthony Bridgerton, el soltero más codiciado de Londres, decide casarse, pero la obstinada hermana de su elegida, Kate Sheffield, está decidida a sabotear los planes por desconfianza.",
    pages: 352
  },
  {
    id: "bridgerton-3",
    title: "Te doy mi corazón",
    author: "Julia Quinn",
    driveId: "1OYKu_T8Hl1-b2ixVijLYmNto6b1Z76Bq",
    coverUrl: "https://i.postimg.cc/Y09G6n4v/c43df965e34844da96219d1b320581a0.jpg",
    cover_url: "https://i.postimg.cc/Y09G6n4v/c43df965e34844da96219d1b320581a0.jpg",
    category: "Bridgerton",
    description: "Sophie Beckett, hija ilegítima de un conde, asiste de incógnito a un suntuoso baile de máscaras donde conoce al carismático Benedict Bridgerton, desatando una búsqueda apasionada.",
    pages: 384
  },
  {
    id: "bridgerton-4",
    title: "Seduciendo a Mr. Bridgerton",
    author: "Julia Quinn",
    driveId: "1wMW0YKsCzSJ1MEh2JcyfWjLCGEJ5B5ey",
    coverUrl: "https://i.postimg.cc/0jbjMz3w/7f590f289bd0df7e13386a93cd5485bb.jpg",
    cover_url: "https://i.postimg.cc/0jbjMz3w/7f590f289bd0df7e13386a93cd5485bb.jpg",
    category: "Bridgerton",
    description: "Penelope Featherington ha amado en secreto a Colin Bridgerton durante años. Cuando Colin regresa de sus viajes, descubre secretos que cambiarán para siempre su percepción sobre ella.",
    pages: 380
  },
  {
    id: "bridgerton-5",
    title: "A Sir Phillip, con amor",
    author: "Julia Quinn",
    driveId: "1sEdUCge1Eh999qoaNojVmoUV5pPpBmxh",
    coverUrl: "https://i.postimg.cc/VNgkK9Pb/b250a004501f13338ecec921aeea6552.jpg",
    cover_url: "https://i.postimg.cc/VNgkK9Pb/b250a004501f13338ecec921aeea6552.jpg",
    category: "Bridgerton",
    description: "Tras meses de correspondencia, Eloise Bridgerton toma una decisión impulsiva: escaparse para conocer a Sir Phillip Crane, un viudo solitario que necesita desesperadamente de su alegría.",
    pages: 336
  },
  {
    id: "bridgerton-6",
    title: "El corazón de una Bridgerton",
    author: "Julia Quinn",
    driveId: "1DwDfhqWYJr6qIoHvYcVbtA_41aaqasN-",
    coverUrl: "https://i.postimg.cc/g0zYLwLr/39017c0cb7bdc064ca67cf6920c5a241.webp",
    cover_url: "https://i.postimg.cc/g0zYLwLr/39017c0cb7bdc064ca67cf6920c5a241.webp",
    category: "Bridgerton",
    description: "Francesca Bridgerton halla consuelo tras una dolorosa pérdida en Michael Stirling, el primo de su difunto esposo, quien esconde un amor devorador y prohibido por ella.",
    pages: 340
  },
  {
    id: "bridgerton-7",
    title: "Por un beso",
    author: "Julia Quinn",
    driveId: "1xviJJSJyM9RTXlg1GTefQZbsp0JsmCtR",
    coverUrl: "https://i.postimg.cc/3r4Dx6HL/porunbeso.jpg",
    cover_url: "https://i.postimg.cc/3r4Dx6HL/porunbeso.jpg",
    category: "Bridgerton",
    description: "Gareth St. Clair se ve envuelto en una herencia incierta y encuentra en Hyacinth Bridgerton, la menor e ingeniosa de la familia, a la aliada perfecta para traducir un diario misterioso.",
    pages: 330
  },
  {
    id: "bridgerton-8",
    title: "Buscando esposa",
    author: "Julia Quinn",
    driveId: "1PC-_61SMnvIxvuiqJe3-HuALi_bJKj0j",
    coverUrl: "https://i.postimg.cc/HxJjjJFt/209af909a4ebe48b4ebd5a1f21a9cab1.jpg",
    cover_url: "https://i.postimg.cc/HxJjjJFt/209af909a4ebe48b4ebd5a1f21a9cab1.jpg",
    category: "Bridgerton",
    description: "Gregory Bridgerton es un romántico incorregible que cree en el verdadero amor. Cuando pide ayuda a la inteligente Lucy Abernathy para conquistar a otra dama, el destino tiene otros planes.",
    pages: 360
  },
  {
    id: "crepusculo-1",
    title: "Crepúsculo",
    author: "Stephenie Meyer",
    driveId: "1Ugr3qN74fPdFuNNdHPkgmZ1t_cwPsUGz",
    coverUrl: "https://i.postimg.cc/bJYH5RD8/Crepusculo.jpg",
    cover_url: "https://i.postimg.cc/bJYH5RD8/Crepusculo.jpg",
    category: "Crepúsculo",
    description: "Bella Swan se muda a Forks y se siente intrigada por Edward Cullen, un misterioso compañero de clase que esconde un secreto ancestral: es un vampiro.",
    pages: 512
  },
  {
    id: "crepusculo-2",
    title: "Luna nueva",
    author: "Stephenie Meyer",
    driveId: "1Od5qT6D8gy2nwkZkHr8z8qLFM1XTzFir",
    coverUrl: "https://i.postimg.cc/J4H3S0nN/3204159-RS500x500.jpg",
    cover_url: "https://i.postimg.cc/J4H3S0nN/3204159-RS500x500.jpg",
    category: "Crepúsculo",
    description: "Tras la partida de Edward para protegerla, Bella cae en una profunda depresión y halla consuelo en su leal amigo Jacob Black, quien guarda su propio secreto sobrenatural.",
    pages: 576
  },
  {
    id: "crepusculo-3",
    title: "Eclipse",
    author: "Stephenie Meyer",
    driveId: "15Gg_I8hIoMgAOflbOpXKBYmKXclSW8k1",
    coverUrl: "https://i.postimg.cc/SN98DPTc/19451545.jpg",
    cover_url: "https://i.postimg.cc/SN98DPTc/19451545.jpg",
    category: "Crepúsculo",
    description: "Seattle es asolada por una ola de misteriosos asesinatos. Bella debe elegir entre su amor por Edward y su amistad con Jacob, mientras vampiros y hombres lobo pactan una tregua.",
    pages: 624
  },
  {
    id: "crepusculo-4",
    title: "Amanecer",
    author: "Stephenie Meyer",
    driveId: "11Rw_AN3KKsS-raLOtFzkfeLQQM1p2kc2",
    coverUrl: "https://i.postimg.cc/B6tPD7Px/la-saga-crepusculo-amanecer-parte-1.jpg",
    cover_url: "https://i.postimg.cc/B6tPD7Px/la-saga-crepusculo-amanecer-parte-1.jpg",
    category: "Crepúsculo",
    description: "El matrimonio de Bella y Edward desencadena una serie de acontecimientos inesperados que culminan en una amenaza inminente de los Vóluri sobre su extraordinaria hija.",
    pages: 752
  },
  {
    id: "crepusculo-5",
    title: "Sol de medianoche",
    author: "Stephenie Meyer",
    driveId: "1iPzqLR87293oYpdfBOWdimqEUYIASwEu",
    coverUrl: "https://i.postimg.cc/sfQT7sWH/D-NQ-NP-2X-959595-MLM49684084582-042022-F.webp",
    cover_url: "https://i.postimg.cc/sfQT7sWH/D-NQ-NP-2X-959595-MLM49684084582-042022-F.webp",
    category: "Crepúsculo",
    description: "La célebre historia de amor es narrada por primera vez desde la perspectiva de Edward Cullen, revelando su tormento interno y la intensidad de su fascinación por Bella.",
    pages: 800
  }
];

export const initialCourses: Course[] = [
  {
    id: "carpinteria-moderna",
    title: "Carpintería Moderna y Oficios en Madera",
    headline: "Domina el diseño, corte, armado e instalación de muebles de melamina y madera maciza como un profesional.",
    instructor: "Maestro Carlos Varela",
    difficulty: "Principiante",
    description: "Un recorrido paso a paso diseñado desde los fundamentos de la medición comercial e identificación de maderas, armado de ensambles perfectos, hasta el diseño digital de planificados tridimensionales y acabados finos.",
    price: 49.99,
    thumbnail: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?auto=format&fit=crop&w=800&q=80",
    category: "Oficios",
    total_lessons: 5,
    syllabus: [
      {
        id: "cap-1-seguridad",
        title: "Módulo 1: Seguridad, Herramientas y Fundamentos",
        lessons: [
          {
            id: "les-1-1",
            title: "1.1 Introducción a la Seguridad y EPP Obligatorio",
            order: 1,
            video_drive_url: "https://www.youtube.com/embed/6iAt2T3R_O8", // Educational Woodworking safety
            type: "video",
            duration: "12 mins",
          },
          {
            id: "les-1-2",
            title: "1.2 Herramientas Manuales Clave y Medición Comercial",
            order: 2,
            video_drive_url: "https://www.youtube.com/embed/Psh9794Xf1E", // Measurement tools
            type: "video",
            duration: "18 mins",
          }
        ]
      },
      {
        id: "cap-2-ensamble",
        title: "Módulo 2: Técnicas de Corte y Ensamble estructural",
        lessons: [
          {
            id: "les-2-1",
            title: "2.1 Tipos de Maderas y Melaminas en el mercado",
            order: 3,
            video_drive_url: "https://www.youtube.com/embed/U3lYj_b77U8", // Wood types
            type: "video",
            duration: "22 mins",
          },
          {
            id: "les-2-2",
            title: "2.2 Armado de Ensambles con Soportes Ocultos (Pocket Holes)",
            order: 4,
            video_drive_url: "https://www.youtube.com/embed/gH_N7V4vpxk", // pocket holes
            type: "video",
            duration: "15 mins",
          },
          {
            id: "les-2-3",
            title: "2.3 Guas de Corte Recto y Uso Inteligente de la Sierra Circular",
            order: 5,
            video_drive_url: "https://www.youtube.com/embed/D3_NizX8w6E", // Circular saw tips
            type: "video",
            duration: "25 mins",
          }
        ]
      }
    ]
  },
  {
    id: "desarrollo-web-ia",
    title: "Desarrollo Web & Integración de Inteligencia Artificial",
    headline: "Domina React, Tailwind CSS, Node.js y la conexión con APIs generativas para crear software inteligente.",
    instructor: "Ing. Esteban Ferraro",
    difficulty: "Intermedio",
    description: "Comprende la arquitectura full-stack moderna de aplicaciones web. Diseña interfaces de alto impacto adaptativas, maneja bases de datos relacionales y no relacionales, y consume APIs inteligentes para automatizar flujos de trabajo.",
    price: 39.99,
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    category: "Oficios",
    total_lessons: 4,
    syllabus: [
      {
        id: "web-1-react",
        title: "Módulo 1: Fundamentos de React & Tailwind",
        lessons: [
          {
            id: "les-web-1-1",
            title: "1.1 Arquitectura de Componentes y Estado Local",
            order: 1,
            video_drive_url: "https://www.youtube.com/embed/6iAt2T3R_O8",
            type: "video",
            duration: "14 mins",
          },
          {
            id: "les-web-1-2",
            title: "1.2 Maquetación Profesional Responsiva con Tailwind CSS",
            order: 2,
            video_drive_url: "https://www.youtube.com/embed/Psh9794Xf1E",
            type: "video",
            duration: "20 mins",
          }
        ]
      },
      {
        id: "web-2-api",
        title: "Módulo 2: Integraciones Inteligentes con Gemini API",
        lessons: [
          {
            id: "les-web-2-1",
            title: "2.1 Consumo del SDK de Google Gen AI en Servidores Express",
            order: 3,
            video_drive_url: "https://www.youtube.com/embed/U3lYj_b77U8",
            type: "video",
            duration: "16 mins",
          },
          {
            id: "les-web-2-2",
            title: "2.2 Manejo de Mensajes Inteligentes y Despliegues Seguros",
            order: 4,
            video_drive_url: "https://www.youtube.com/embed/gH_N7V4vpxk",
            type: "video",
            duration: "19 mins",
          }
        ]
      }
    ]
  },
  {
    id: "instagram-masterclass",
    title: "Masterclass de Instagram: Crecimiento Viral y Conversión",
    headline: "Domina el algoritmo, posiciona tu marca personal e implementa embudos de conversión de seguidores a leads cualificados.",
    instructor: "Gabriel Ríos",
    difficulty: "Intermedio",
    description: "Aprende el sistema paso a paso que utilizan las principales marcas personales del mundo para crear ganchos de alta retención, videos virales de TikTok/Reels, y automatizaciones vía DM para vender de forma constante.",
    price: 19.99,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    category: "Oficios",
    total_lessons: 1,
    syllabus: [
      {
        id: "ig-m1",
        title: "Módulo Principal: Algoritmo y Embudos Automatizados",
        lessons: [
          {
            id: "les-ig-1",
            title: "1.1 Estrategia de Contenido Viral y Embudos de Conversión por DM",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1xFUqejFG2NPVlAZejifXLzJb2Cv2B4xA/preview",
            type: "video",
            duration: "35 mins",
          }
        ]
      }
    ]
  },
  {
    id: "facebook-ads-2025",
    title: "Facebook Ads 2025: Dominando el ROI",
    headline: "Domina la inteligencia artificial de Meta, optimiza tus presupuestos en escala y maximiza el retorno de tus campañas pautadas.",
    instructor: "Carlos Baez (Performance Analyst)",
    difficulty: "Avanzado",
    description: "Aprende las estrategias de pauta publicitaria para el 2025. Configuración de campañas, segmentación avanzada con IA de Meta, y optimización de presupuestos para maximizar ventas.",
    price: 24.99,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Marketing Digital / Ventas",
    total_lessons: 1,
    syllabus: [
      {
        id: "fb-m1",
        title: "Módulo Principal: Pauta Avanzada de Alto Rendimiento",
        lessons: [
          {
            id: "les-fb-1",
            title: "1.1 Estrategia de Pauta Digital y Optimización del ROI",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1O75hYKIR2JjLP5-02SZCXrFM0-ybGWfe/preview",
            type: "video",
            duration: "42 mins",
          }
        ]
      }
    ]
  },
  {
    id: "virtual-dj-basics",
    title: "Virtual DJ para Principiantes: Las Bases",
    headline: "Domina el arte de la mezcla desde cero. Aprende a manejar decks, ecualización básica, beatmatching y efectos esenciales en Virtual DJ.",
    instructor: "Dj Club Pro (Audio Resident)",
    difficulty: "Principiante",
    description: "Iníciate en la mezcla digital. Aprende de manera interactiva a controlar la ganancia, el ecualizador de 3 bandas, sincronización de BPMs y técnicas de loops en vivo.",
    price: 14.99,
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    category: "Música / DJing",
    total_lessons: 1,
    syllabus: [
      {
        id: "vdj-m1",
        title: "Módulo Principal: Decks y Mezcla Esencial",
        lessons: [
          {
            id: "les-vdj-1",
            title: "1.1 Virtual DJ: Conceptos y Primeras Mezclas",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1BBKdCtzEPEsPSLwESogmxcgr3Bo-h_IB/view?usp=drive_link",
            type: "video",
            duration: "45 mins",
          }
        ]
      }
    ]
  },
  {
    id: "mecanica-motos",
    title: "Mecánica de Motos: Formación Técnica",
    headline: "Domina el funcionamiento, desarme, diagnóstico y mantenimiento de motores y sistemas de motocicletas desde cero.",
    instructor: "Taller Mecánico Senior (Master Mechanic)",
    difficulty: "Principiante",
    description: "Aprende el funcionamiento, desarme, diagnóstico y mantenimiento de motores y sistemas de motocicletas de forma práctica.",
    price: 29.99,
    thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    category: "Mecánica",
    total_lessons: 2,
    syllabus: [
      {
        id: "motos-m1",
        title: "Módulo Central: Práctica de Taller",
        lessons: [
          {
            id: "p1",
            title: "Parte 1: El Corazón Mecánico y Motor",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1Lp7wUgQTC-6nmtr_f3jRVc3aWdEE9oab/view?usp=drive_link",
            type: "video",
            duration: "25 mins"
          },
          {
            id: "p2",
            title: "Parte 2: Sistemas Eléctricos y Chasis",
            order: 2,
            video_drive_url: "https://drive.google.com/file/d/1dhLROci5FfWKXkhPspudSkVdg-8j14Is/view?usp=drive_link",
            type: "video",
            duration: "30 mins"
          }
        ]
      }
    ]
  },
  {
    id: "frances-desde-cero",
    title: "Francés desde Cero: Inmersión Lingüística",
    headline: "Aprende el idioma del amor y los negocios desde las bases. Fonética, gramática esencial y conversación fluida en 3 niveles detallados.",
    instructor: "Jean-Pierre (Native Educator)",
    difficulty: "Principiante",
    description: "Aprende el idioma del amor y los negocios desde las bases. Fonética, gramática esencial y conversación fluida en 3 niveles detallados.",
    price: 34.99,
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    category: "Idiomas",
    total_lessons: 3,
    syllabus: [
      {
        id: "frances-m1",
        title: "Inmersión Completa",
        lessons: [
          {
            id: "p1",
            title: "Parte 1: Fonética y Saludos Iniciales",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1y2R-YgEuSJOx1yxAAxIituZHA7-5Cqq6/view?usp=drive_link",
            type: "video",
            duration: "20 mins"
          },
          {
            id: "p2",
            title: "Parte 2: Gramática y Estructura",
            order: 2,
            video_drive_url: "https://drive.google.com/file/d/1lefAkoL_Xfjuow8SydYcsdZcvfid4YqQ/view?usp=drive_link",
            type: "video",
            duration: "25 mins"
          },
          {
            id: "p3",
            title: "Parte 3: Conversación y Situaciones Reales",
            order: 3,
            video_drive_url: "https://drive.google.com/file/d/1GjSC3UNSz7tbRqvmaQa6Uwyi5U1GJh5k/view?usp=drive_link",
            type: "video",
            duration: "30 mins"
          }
        ]
      }
    ]
  },
  {
    id: "portugues-principiantes",
    title: "Portugués para Principiantes: Tudo Bem?",
    headline: "Iníciate en el idioma más alegre del mundo y aprende fonética, saludos y verbos básicos.",
    instructor: "Thiago Silva (Native Instructor)",
    difficulty: "Principiante",
    description: "Iníciate en el idioma más alegre del mundo. Aprende fonética, saludos, verbos básicos y evita las trampas del portuñol en una sola Masterclass.",
    price: 19.99,
    thumbnail: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80",
    category: "Idiomas",
    total_lessons: 1,
    syllabus: [
      {
        id: "portugues-m1",
        title: "Inmersión Rápida",
        lessons: [
          {
            id: "p1",
            title: "Parte 1: Pronunciación y Vocabulario Esencial",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/15fuymagrM41jhpzOeRmgl7povwdLqw_a/view?usp=drive_link",
            type: "video",
            duration: "40 mins"
          }
        ]
      }
    ]
  },
  {
    id: "ingles-desde-cero",
    title: "Inglés desde Cero: Dominio Global",
    headline: "El curso definitivo para hablar inglés. Desde los sonidos básicos hasta conversaciones fluidas. Aprende gramática, listening y speaking con soporte de IA.",
    instructor: "Sarah Jenkins (Global Educator)",
    difficulty: "Principiante",
    description: "El curso definitivo para hablar inglés. Desde los sonidos básicos hasta conversaciones fluidas. Aprende gramática, listening y speaking con soporte de IA.",
    price: 29.99,
    thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    category: "Idiomas",
    total_lessons: 2,
    syllabus: [
      {
        id: "ingles-m1",
        title: "Dominio Global",
        lessons: [
          {
            id: "p1",
            title: "Parte 1: Fundamentos y Estructura",
            order: 1,
            video_drive_url: "https://drive.google.com/file/d/1fGXkoYanCsRkc-mejMkJC5sWU7Fqs_lC/view?usp=drive_link",
            type: "video",
            duration: "35 mins"
          },
          {
            id: "p2",
            title: "Parte 2: Conversación y Fluidez",
            order: 2,
            video_drive_url: "https://drive.google.com/file/d/12KfyrtrlkvnGv2qiuR3s7Dov1kea8mtG/view?usp=drive_link",
            type: "video",
            duration: "45 mins"
          }
        ]
      }
    ]
  }
];
