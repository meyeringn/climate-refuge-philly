window.CRF_CONFIG = {
  defaultCenter: [39.9526, -75.1652],
  defaultZoom: 12,
  defaultDistanceMiles: 5,
  reportFormUrl: "report.html",

  statusLabels: {
    confirmed: "Confirmed",
    reported: "Reported",
    unknown: "Unknown"
  },

  featureLabels: {
    stepFree: "Step-free entrance",
    restroom: "Accessible restroom",
    seating: "Indoor seating",
    quiet: "Quieter space",
    airConditioning: "Air conditioning",
    cleanAir: "Enhanced air filtration",
    water: "Drinking water",
    power: "Power outlets"
  },

  i18n: {
    en: {
      lang: "en",
      langLabel: "Español",
      langAriaLabel: "Cambiar a español",

      prototypeNotice: "Prototype: sample locations only",
      highContrast: "High contrast",
      standardContrast: "Standard contrast",

      navFind: "Find a refuge",
      navHow: "How it works",
      navAbout: "About",

      heroEyebrow: "Heat, smoke, outages, and severe weather",
      heroHeading: "Find a safer place in Philly.",
      heroCopy: "Search for accessible places to cool down, breathe cleaner air, sit, drink water, use a restroom, or charge essential equipment.",
      heroCta: "Find a climate refuge",
      heroLocation: "Use my location",
      trustNote: "Accessibility details show what is confirmed, reported, or still unknown.",

      alertStrong: "In immediate danger?",
      alertText: "Call 911. This prototype does not replace emergency services or official City alerts.",

      finderEyebrow: "Refuge finder",
      finderHeading: "What do you need today?",
      finderDescription: "Choose only the features that matter to you. Unknown information will stay visible instead of being treated as a \u201cno.\u201d",

      searchLabel: "Neighborhood, ZIP code, or place",
      searchPlaceholder: "Try 19147 or West Philly",

      legendAccessibility: "Accessibility and comfort",
      legendClimate: "Climate refuge features",

      filterStepFree: "Step-free entrance",
      filterRestroom: "Accessible restroom",
      filterSeating: "Indoor seating",
      filterQuiet: "Quieter space",
      filterAC: "Air conditioning",
      filterCleanAir: "Enhanced air filtration",
      filterWater: "Drinking water",
      filterPower: "Power outlets",

      distanceLabel: "Maximum travel distance",
      distance2: "2 miles",
      distance5: "5 miles",
      distance10: "10 miles",
      distanceAll: "Show all",

      clearFilters: "Clear filters",
      viewList: "List",
      viewMap: "Map",
      mapNote: "Map tiles \u00a9 OpenStreetMap contributors. Locations are demonstration data.",

      resultCount: function (n) {
        return "Showing " + n + " " + (n === 1 ? "location" : "locations");
      },

      howEyebrow: "Built for trust",
      howHeading: "No mystery scores. No fake certainty.",
      principle1Title: "Verified details",
      principle1Text: "We separate official information from community reports and unknowns.",
      principle2Title: "Your priorities",
      principle2Text: "A refuge is only useful when it works for your body, equipment, and travel needs.",
      principle3Title: "Philadelphia first",
      principle3Text: "Neighborhood context, SEPTA access, and local climate risks shape every recommendation.",

      aboutEyebrow: "About the project",
      aboutHeading: "A civic tool for a hotter, less predictable city.",
      aboutP1: "Climate Refuge Philly is an independent prototype designed at the intersection of disability access, public transit, and climate resilience. The data model \u2014 confirmed, reported, unknown \u2014 is built to be honest about what we know and what we don\u2019t.",
      aboutP2: "This tool is designed to be forked and adapted. Every city has heat-vulnerable neighborhoods, under-resourced cooling infrastructure, and Disabled residents who need better information. The code, the data schema, and the verification system are open source and ready for your city.",

      footerTitle: "Climate Refuge Philly",
      footerSubtitle: "Independent civic technology prototype.",
      footerNote: "Made with care for Disabled Philadelphians, neighbors, caregivers, and anyone trying to stay safe.",
      dataVerified: "Data last verified: November 2026",
      a11yStatement: "Accessibility statement",

      cardTransit: "Nearby transit:",
      cardReport: "Report an update",
      cardLastChecked: "Last checked:",
      cardWebsite: "Official website",
      emptyHeading: "Nothing nearby checks every box yet.",
      emptyText: "Try a larger travel distance, remove one filter, or search another neighborhood.",

      locationFinding: "Finding you\u2026",
      locationAdded: "Location added",
      locationUnavailable: "Location unavailable",
      locationFailed: "Could not use location",
      locationYou: "Your approximate location",

      statusConfirmed: "Confirmed",
      statusReported: "Reported",
      statusUnknown: "Unknown",

      featureStepFree: "Step-free entrance",
      featureRestroom: "Accessible restroom",
      featureSeating: "Indoor seating",
      featureQuiet: "Quieter space",
      featureAC: "Air conditioning",
      featureCleanAir: "Enhanced air filtration",
      featureWater: "Drinking water",
      featurePower: "Power outlets"
    },

    es: {
      lang: "es",
      langLabel: "English",
      langAriaLabel: "Switch to English",

      prototypeNotice: "Prototipo: solo ubicaciones de muestra",
      highContrast: "Alto contraste",
      standardContrast: "Contraste normal",

      navFind: "Buscar un refugio",
      navHow: "C\u00f3mo funciona",
      navAbout: "Acerca de",

      heroEyebrow: "Calor, humo, apagones y clima severo",
      heroHeading: "Encuentra un lugar m\u00e1s seguro en Filadelfia.",
      heroCopy: "Busca lugares accesibles para refrescarte, respirar aire m\u00e1s limpio, sentarte, tomar agua, usar un ba\u00f1o o cargar equipos esenciales.",
      heroCta: "Buscar un refugio clim\u00e1tico",
      heroLocation: "Usar mi ubicaci\u00f3n",
      trustNote: "Los detalles de accesibilidad indican qu\u00e9 est\u00e1 confirmado, reportado o a\u00fan desconocido.",

      alertStrong: "\u00bfEn peligro inmediato?",
      alertText: "Llame al 911. Este prototipo no reemplaza los servicios de emergencia ni las alertas oficiales de la Ciudad.",

      finderEyebrow: "Buscador de refugios",
      finderHeading: "\u00bfQu\u00e9 necesitas hoy?",
      finderDescription: "Elige solo las caracter\u00edsticas que te importan. La informaci\u00f3n desconocida seguir\u00e1 visible en lugar de tratarse como un \u201cno.\u201d",

      searchLabel: "Vecindario, c\u00f3digo postal o lugar",
      searchPlaceholder: "Prueba 19147 o West Philly",

      legendAccessibility: "Accesibilidad y comodidad",
      legendClimate: "Caracter\u00edsticas del refugio clim\u00e1tico",

      filterStepFree: "Entrada sin escalones",
      filterRestroom: "Ba\u00f1o accesible",
      filterSeating: "Asientos interiores",
      filterQuiet: "Espacio m\u00e1s tranquilo",
      filterAC: "Aire acondicionado",
      filterCleanAir: "Filtraci\u00f3n de aire mejorada",
      filterWater: "Agua potable",
      filterPower: "Tomas de corriente",

      distanceLabel: "Distancia m\u00e1xima de viaje",
      distance2: "2 millas",
      distance5: "5 millas",
      distance10: "10 millas",
      distanceAll: "Mostrar todos",

      clearFilters: "Borrar filtros",
      viewList: "Lista",
      viewMap: "Mapa",
      mapNote: "Mosaicos de mapa \u00a9 colaboradores de OpenStreetMap. Las ubicaciones son datos de demostraci\u00f3n.",

      resultCount: function (n) {
        return "Mostrando " + n + " " + (n === 1 ? "ubicaci\u00f3n" : "ubicaciones");
      },

      howEyebrow: "Dise\u00f1ado para la confianza",
      howHeading: "Sin puntajes misteriosos. Sin certeza falsa.",
      principle1Title: "Detalles verificados",
      principle1Text: "Separamos la informaci\u00f3n oficial de los reportes comunitarios y lo desconocido.",
      principle2Title: "Tus prioridades",
      principle2Text: "Un refugio solo es \u00fatil cuando funciona para tu cuerpo, tu equipo y tus necesidades de transporte.",
      principle3Title: "Filadelfia primero",
      principle3Text: "El contexto del vecindario, el acceso a SEPTA y los riesgos clim\u00e1ticos locales dan forma a cada recomendaci\u00f3n.",

      aboutEyebrow: "Acerca del proyecto",
      aboutHeading: "Una herramienta c\u00edvica para una ciudad m\u00e1s caliente e impredecible.",
      aboutP1: "Climate Refuge Philly es un prototipo independiente dise\u00f1ado en la intersecci\u00f3n del acceso para personas discapacitadas, el transporte p\u00fablico y la resiliencia clim\u00e1tica. El modelo de datos \u2014 confirmado, reportado, desconocido \u2014 est\u00e1 construido para ser honesto sobre lo que sabemos y lo que no.",
      aboutP2: "Esta herramienta est\u00e1 dise\u00f1ada para ser adaptada. Cada ciudad tiene vecindarios vulnerables al calor, infraestructura de enfriamiento insuficiente y residentes discapacitados que necesitan mejor informaci\u00f3n. El c\u00f3digo, el esquema de datos y el sistema de verificaci\u00f3n son de c\u00f3digo abierto y est\u00e1n listos para tu ciudad.",

      footerTitle: "Climate Refuge Philly",
      footerSubtitle: "Prototipo de tecnolog\u00eda c\u00edvica independiente.",
      footerNote: "Hecho con cuidado para personas discapacitadas de Filadelfia, vecinos, cuidadores y cualquiera que intente mantenerse a salvo.",
      dataVerified: "Datos verificados por última vez: noviembre de 2026",
      a11yStatement: "Declaración de accesibilidad",

      cardTransit: "Transporte cercano:",
      cardReport: "Reportar una actualizaci\u00f3n",
      cardLastChecked: "\u00daltima verificaci\u00f3n:",
      cardWebsite: "Sitio web oficial",
      emptyHeading: "Ning\u00fan lugar cercano cumple todos los filtros a\u00fan.",
      emptyText: "Intenta una distancia mayor, quita un filtro o busca en otro vecindario.",

      locationFinding: "Busc\u00e1ndote\u2026",
      locationAdded: "Ubicaci\u00f3n agregada",
      locationUnavailable: "Ubicaci\u00f3n no disponible",
      locationFailed: "No se pudo obtener la ubicaci\u00f3n",
      locationYou: "Tu ubicaci\u00f3n aproximada",

      statusConfirmed: "Confirmado",
      statusReported: "Reportado",
      statusUnknown: "Desconocido",

      featureStepFree: "Entrada sin escalones",
      featureRestroom: "Ba\u00f1o accesible",
      featureSeating: "Asientos interiores",
      featureQuiet: "Espacio m\u00e1s tranquilo",
      featureAC: "Aire acondicionado",
      featureCleanAir: "Filtraci\u00f3n de aire mejorada",
      featureWater: "Agua potable",
      featurePower: "Tomas de corriente"
    }
  }};
