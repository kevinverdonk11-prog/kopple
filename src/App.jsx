import { useState } from "react";

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function KoppleLogo({ height = 28, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "inline-flex", alignItems: "baseline", cursor: onClick ? "pointer" : "default", userSelect: "none", lineHeight: 1 }}>
      <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: height, letterSpacing: "-0.5px", color: "#111", lineHeight: 1 }}>kopple</span>
      <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: height, color: "#111", lineHeight: 1 }}>.</span>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ecosystems = [
  { id: "homekit", name: "Apple HomeKit", icon: "🍎", tagline: "Het slimste huis voor Apple-gebruikers", description: "Apple HomeKit is het smart home platform van Apple. Via de Woning-app op je iPhone, iPad of Mac bedien je al je slimme apparaten op één plek. HomeKit werkt naadloos samen met Siri. Beveiliging staat centraal: alle communicatie is versleuteld en data wordt lokaal verwerkt.", pros: ["Werkt met iPhone, iPad en Mac", "Siri-integratie", "Hoge privacy & beveiliging", "Eenvoudige setup via QR-code", "HomePod als hub"], suitable: "Ideaal als je al diep in het Apple-ecosysteem zit." },
  { id: "hue", name: "Philips Hue", icon: "💡", tagline: "De standaard in slimme verlichting", description: "Philips Hue is het populairste smart lighting-platform ter wereld. Met de Hue Bridge verbind je tot 50 lampen en accessoires. Via de Hue-app stel je sferen in, maak je automations en koppel je met andere platforms.", pros: ["Werkt met alle grote platforms", "Enorm productaanbod", "Stabiele Zigbee-verbinding", "Uitgebreide app met scenes", "Eenvoudig uitbreidbaar"], suitable: "Ideaal als je wilt beginnen met verlichting of meerdere platforms wilt ondersteunen." },
  { id: "both", name: "HomeKit + Hue", icon: "✦", tagline: "Het beste van beide werelden", description: "Combineer Apple HomeKit met Philips Hue voor een complete smart home-ervaring. Hue-lampen zijn volledig HomeKit-compatibel via de Hue Bridge. Bedien verlichting via de Woning-app én Siri.", pros: ["Volledige HomeKit-integratie", "Breed verlichtingsaanbod van Hue", "Siri-bediening voor alles", "Maximale uitbreidbaarheid", "Eén app voor alles"], suitable: "Ideaal voor wie een compleet slim huis wil met verlichting als basis." },
];

const productTiers = {
  "hk-lock":      { name: "Slimme Deurslot",     icon: "🔐", category: "Beveiliging", tiers: [
    { tier: "Essentieel", product: "Nuki Smart Lock 3.0",    price: 99,  description: "Eenvoudig, betrouwbaar en HomeKit-compatibel.", img: null, advantages: null },
    { tier: "Comfort",    product: "Yale Linus Smart Lock",  price: 179, description: "Stijlvol design, goede app en HomeKit-ondersteuning.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", advantages: ["Robuuster metalen behuizing vs. plastic","Ingebouwde alarmfunctie bij inbraakpoging","Betere integratie met Yale-app en deurklokken","Stijlvoller afwerking, geschikt voor premium deuren"] },
    { tier: "Signature",  product: "Level Lock+",            price: 329, description: "Onzichtbaar ingebouwd, volledig HomeKit native.", img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80", advantages: ["Volledig onzichtbaar — past in je bestaande cilinder","Native Thread-verbinding, geen bridge nodig","Werkt ook zonder wifi via Bluetooth","Accu gaat 12 maanden mee vs. 6 bij Comfort"] },
  ]},
  "hk-thermostat":{ name: "Slimme Thermostaat",  icon: "🌡️", category: "Klimaat",    tiers: [
    { tier: "Essentieel", product: "Tado Slimme Thermostaat V3+", price: 99,  description: "Eenvoudige installatie, werkt met HomeKit.", img: null, advantages: null },
    { tier: "Comfort",    product: "Ecobee SmartThermostat",      price: 199, description: "Ingebouwde Siri, spraakbesturing en energiebesparing.", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", advantages: ["Ingebouwde Siri — geen HomePod nodig","Meegeleverde kamersensor meet temperatuur per ruimte","Energierapportages met concrete besparingstips","Groter touchscreen met intuïtiever bediening"] },
    { tier: "Signature",  product: "Honeywell T9 + HomeKit",      price: 279, description: "Slimme kamersensoren, optimale klimaatregeling.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", advantages: ["Meerdere kamersensoren inbegrepen","Adaptatief leren — past schema aan jouw gedrag aan","Prioriteitsverwarming per kamer op aanvraag","Professioneel montagesysteem voor elk cv-type"] },
  ]},
  "hk-camera":    { name: "Beveiligingscamera",  icon: "📷", category: "Beveiliging", tiers: [
    { tier: "Essentieel", product: "Eve Cam",              price: 99,  description: "100% lokale opslag, privacyvriendelijk, HomeKit Secure Video.", img: null, advantages: null },
    { tier: "Comfort",    product: "Logitech Circle View", price: 149, description: "Breed gezichtsveld, weerbestendig, HomeKit native.", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80", advantages: ["160° gezichtsveld vs. 135° bij Essentieel","IP64 weerbestendig — ook buiten te gebruiken","Dag/nacht automatische overgangen","Magnetische houder voor eenvoudige herpositionering"] },
    { tier: "Signature",  product: "Arlo Pro 4",           price: 229, description: "4K beeld, kleurennachtzicht, HomeKit Secure Video.", img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=400&q=80", advantages: ["4K Ultra HD vs. 1080p bij Comfort","Kleurennachtzicht — ook in het donker scherp beeld","Volledig draadloos op accu, geen kabel nodig","Ingebouwde sirene en spotlight als afschrikmiddel"] },
  ]},
  "hk-plug":      { name: "Slimme Stekker",      icon: "🔌", category: "Energie",     tiers: [
    { tier: "Essentieel", product: "Meross Smart Plug", price: 15, description: "Betaalbaar, HomeKit-compatibel, energiemeting.", img: null, advantages: null },
    { tier: "Comfort",    product: "Eve Energy",        price: 39, description: "Lokale bediening, nauwkeurige energiemeting, Thread.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", advantages: ["Thread-verbinding: sneller en betrouwbaarder","Lokale verwerking — werkt zonder internet","Nauwkeuriger energiemeting (±1% vs. ±5%)","Compacter formaat, blokkeert geen tweede stopcontact"] },
    { tier: "Signature",  product: "Eve Energy Strip", price: 89, description: "3 uitgangen, Thread, volledige HomeKit-integratie.", img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80", advantages: ["3 afzonderlijk schakelbare outlets","Per outlet apart te meten en in te plannen","Overspanningsbeveiliging ingebouwd","Ideaal als hub voor meerdere apparaten op één plek"] },
  ]},
  "hk-sensor":    { name: "Raam/Deur Sensor",    icon: "🚪", category: "Beveiliging", tiers: [
    { tier: "Essentieel", product: "Aqara Door Sensor",    price: 19, description: "Compact, betrouwbaar, werkt met HomeKit via hub.", img: null, advantages: null },
    { tier: "Comfort",    product: "Eve Door & Window",    price: 39, description: "Lokale verwerking, Thread, geen hub nodig.", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", advantages: ["Geen hub nodig — direct HomeKit via Thread","Lokale verwerking voor snellere reactietijd","Strak Europees design in wit of zilver","Batterijduur 2 jaar vs. 1 jaar bij Essentieel"] },
    { tier: "Signature",  product: "Fibaro Door Sensor 2", price: 59, description: "Temperatuurmeting ingebouwd, hoge nauwkeurigheid.", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80", advantages: ["Ingebouwde temperatuursensor — twee sensoren in één","Kanteldetectie voor ramen die op een kier staan","IP52 spatwaterbestendig","Configureerbaar via kleurinstelbare LED"] },
  ]},
  "hk-speaker":   { name: "HomePod mini",         icon: "🔊", category: "Audio",       tiers: [
    { tier: "Essentieel", product: "HomePod mini",           price: 99,  description: "Compacte smart speaker, het hart van je HomeKit huis.", img: null, advantages: null },
    { tier: "Comfort",    product: "HomePod mini (2-pack)",  price: 198, description: "Stereogeluid, betere ruimtedekking voor automations.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", advantages: ["Stereopaar voor aanzienlijk rijker geluid","Betere ruimtedekking voor Siri en automations","Dubbele kans dat jouw stem wordt opgepikt","Ideaal voor grotere woonruimtes"] },
    { tier: "Signature",  product: "HomePod (2e generatie)", price: 329, description: "Volumgeluid, Spatial Audio, perfecte HomeKit hub.", img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=400&q=80", advantages: ["Spatial Audio met Dolby Atmos-ondersteuning","Veel krachtiger bas en breder geluidsprofiel","Betere Thread/hub-prestaties voor het hele huis","Temperatuur- en luchtvochtigheidsensor ingebouwd"] },
  ]},
  "hue-starter":  { name: "Hue Starter Kit",      icon: "💡", category: "Verlichting", tiers: [
    { tier: "Essentieel", product: "Hue White Starter Kit",           price: 59,  description: "2 lampen + bridge, warm tot koud wit licht.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue White & Color Starter Kit",   price: 119, description: "2 color lampen + bridge, 16 miljoen kleuren.", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80", advantages: ["16 miljoen kleuren vs. alleen wit tinten","Sfeermodi en dynamische lichtscènes","Synchroniseer met muziek en films","Betere startkit voor een volledig slim huis"] },
    { tier: "Signature",  product: "Hue Color Starter Kit (E27 x4)", price: 199, description: "4 color lampen + bridge, volledige kleurervaring.", img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80", advantages: ["4 color lampen vs. 2 bij Comfort","Direct twee ruimtes volledig verlichten","Hogere lichtopbrengst per lamp (800 lm)","Completer startpakket, minder snel uitbreiden nodig"] },
  ]},
  "hue-bridge":   { name: "Hue Bridge",           icon: "📡", category: "Hub",         tiers: [
    { tier: "Essentieel", product: "Hue Bridge (los)",             price: 59,  description: "Standaard bridge, verbindt tot 50 lampen.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue Bridge + Tap Dial Switch", price: 99,  description: "Bridge plus handige draadloze schakelaar.", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80", advantages: ["Tap Dial schakelaar inbegrepen (€49 waarde)","Bediening zonder app — draai voor dimmen","Magnetisch bevestigbaar op elke gewenste plek","Ideaal als fysieke schakelaar naast smart control"] },
    { tier: "Signature",  product: "Hue Bridge + Play Gradient",  price: 179, description: "Bridge plus premium gradient light bar voor sfeer.", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80", advantages: ["Play Gradient Lightbar inbegrepen (€89 waarde)","Meerdere kleuren tegelijk op één balk","Ideaal als achtergrondverlichting voor tv of bureau","Creëert direct een premium sfeer in elke ruimte"] },
  ]},
  "hue-strip":    { name: "LED Strip",             icon: "🌈", category: "Verlichting", tiers: [
    { tier: "Essentieel", product: "Hue White & Color Strip 2m", price: 69,  description: "2 meter ledstrip, volledige kleurondersteuning.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue Gradient Strip 2m",      price: 109, description: "Meerdere kleuren tegelijk per strip-segment.", img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80", advantages: ["Meerdere kleuren tegelijk zichtbaar op één strip","Vloeiende kleurovergang over de hele lengte","Uniek Gradient-effect niet mogelijk bij Essentieel","Ziet er aanzienlijk spectaculairder uit achter tv/bureau"] },
    { tier: "Signature",  product: "Hue Gradient Strip 3m",      price: 159, description: "3 meter gradient, maximale sfeer en kleurdiepte.", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80", advantages: ["3 meter vs. 2 meter — dekt grotere oppervlakken","Meer segmenten voor rijkere kleurgradiënten","Ideaal voor grote tv's (65\"+) of lange keukenkasten","Uitbreidbaar met extra strip-segmenten"] },
  ]},
  "hue-motion":   { name: "Bewegingssensor",      icon: "👁️", category: "Sensoren",   tiers: [
    { tier: "Essentieel", product: "Hue Motion Sensor (indoor)",  price: 39, description: "Werkt direct met bridge, activeert automations.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue Outdoor Motion Sensor",   price: 59, description: "Weerbestendig, ideaal voor tuin of oprit.", img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=400&q=80", advantages: ["IP54 weerbestendig — bruikbaar buiten","Bereik tot 12 meter vs. 8 meter indoor","Ingebouwde schemerschakelaar activeert alleen bij duisternis","Verhoogt veiligheid rondom het huis"] },
    { tier: "Signature",  product: "Hue Motion Sensor (2-pack)", price: 75, description: "Twee sensoren voor volledige ruimtedekking.", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80", advantages: ["Twee sensoren voor twee ruimtes tegelijk","Kostprijs per sensor lager dan losse aankoop","Volledige gang/woonkamer én keuken dekken","Direct klaar voor meerkamersinstallatie"] },
  ]},
  "hue-dimmer":   { name: "Dimmer Switch",         icon: "🎛️", category: "Bediening",  tiers: [
    { tier: "Essentieel", product: "Hue Dimmer Switch v2",   price: 25, description: "Eenvoudige aan/uit en dimmer, magneethouder.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue Tap Dial Switch",    price: 49, description: "Draaiknop + 4 knoppen, geen batterij nodig.", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80", advantages: ["Geen batterij nodig — werkt op kinetische energie","Draaiknop voor intuïtief dimmen","4 programmeerbare knoppen vs. 4 vaste functies","Modernere vormgeving, past beter in elk interieur"] },
    { tier: "Signature",  product: "Hue Wall Switch Module", price: 29, description: "Inbouw in bestaande schakelaar, geen batterij.", img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80", advantages: ["Onzichtbaar ingebouwd in bestaande wandschakelaar","Werkt op netspanning — nooit batterij vervangen","Behoudt uitstraling van klassieke schakelaar","Ideaal voor wie geen extra apparaatjes wil zien"] },
  ]},
  "hue-outdoor":  { name: "Buitenverlichting",    icon: "🌿", category: "Tuin",        tiers: [
    { tier: "Essentieel", product: "Hue Lily Spot (1-pack)", price: 79,  description: "Grondspot voor tuin, volledige kleurondersteuning.", img: null, advantages: null },
    { tier: "Comfort",    product: "Hue Lily Spot (3-pack)", price: 199, description: "Complete tuinset met drie grondspots.", img: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=400&q=80", advantages: ["3 spots voor een volledig verlichte tuin","Kostprijs per spot aanzienlijk lager","Direct professionele tuinverlichting zonder bijkopen","Creëert sfeervolle dieptewerking in het tuinontwerp"] },
    { tier: "Signature",  product: "Hue Appear Wandlamp",   price: 179, description: "Stijlvolle buitenwandlamp, gradient lichteffect.", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=80", advantages: ["Wandmontage — geen stroomkabel door de grond","Gradient lichteffect voor een premium buitenuitstraling","Verlicht zowel omhoog als omlaag voor maximale sfeer","Architecturaal ontwerp dat het huis opwaardeert"] },
  ]},
};

const productsByEco = {
  homekit: ["hk-lock","hk-thermostat","hk-camera","hk-plug","hk-sensor","hk-speaker"],
  hue:     ["hue-starter","hue-bridge","hue-strip","hue-motion","hue-dimmer","hue-outdoor"],
  both:    ["hk-lock","hk-thermostat","hue-starter","hue-bridge","hue-strip","hk-speaker","hue-motion","hk-camera"],
};

const INSTALL_PRICE = 99;

// ─── KEUZEHULP ────────────────────────────────────────────────────────────────

const keuzehulpVragen = [
  {
    id: "doel",
    vraag: "Wat is je belangrijkste doel?",
    meerdere: false,
    opties: [
      { id: "energie",       label: "Energie besparen",   icon: "⚡", omschrijving: "Minder verbruik, lagere rekening" },
      { id: "automatiseren", label: "Automatiseren",       icon: "🤖", omschrijving: "Huis werkt voor jou, zonder gedoe" },
      { id: "beveiliging",   label: "Beveiliging",         icon: "🔒", omschrijving: "Inzicht en controle over je veiligheid" },
      { id: "sfeer",         label: "Sfeer & verlichting", icon: "💡", omschrijving: "De perfecte sfeer in elk moment" },
      { id: "gemak",         label: "Gemak & comfort",     icon: "🛋️", omschrijving: "Alles makkelijker en comfortabeler" },
    ],
  },
  {
    id: "kamers_aantal",
    vraag: "Hoeveel kamers wil je automatiseren?",
    meerdere: false,
    opties: [
      { id: "1",   label: "1 kamer",    icon: "🚪", omschrijving: "Eén ruimte slim maken" },
      { id: "2-3", label: "2–3 kamers", icon: "🏠", omschrijving: "Een paar ruimtes aanpakken" },
      { id: "4+",  label: "4 of meer",  icon: "🏡", omschrijving: "Het hele huis slim maken" },
    ],
  },
  {
    id: "kamers",
    vraag: "Welke kamers wil je aanpakken?",
    meerdere: true,
    opties: [
      { id: "woonkamer",  label: "Woonkamer",   icon: "🛋️" },
      { id: "slaapkamer", label: "Slaapkamer",  icon: "🛏️" },
      { id: "keuken",     label: "Keuken",      icon: "🍳" },
      { id: "badkamer",   label: "Badkamer",    icon: "🚿" },
      { id: "tuin",       label: "Tuin",        icon: "🌿" },
      { id: "hal",        label: "Hal / entree",icon: "🚪" },
    ],
  },
  {
    id: "budget",
    vraag: "Wat is je budget?",
    meerdere: false,
    opties: [
      { id: "klein",     label: "Klein",     icon: "💶", omschrijving: "Tot €200 — starten met de basics" },
      { id: "gemiddeld", label: "Gemiddeld", icon: "💶", omschrijving: "€200–€600 — een goede basis" },
      { id: "ruim",      label: "Ruim",      icon: "💶", omschrijving: "€600+ — het beste van het beste" },
    ],
  },
];

function genereerAdvies(antwoorden) {
  const doel = antwoorden.doel;
  const budget = antwoorden.budget;
  const kamers = antwoorden.kamers || [];
  const aantalKamers = antwoorden.kamers_aantal;
  const tierIdx = budget === "klein" ? 0 : budget === "gemiddeld" ? 1 : 2;

  let eco = "homekit";
  let producten = [];
  let titel = "";
  let uitleg = "";

  if (doel === "energie") {
    titel = "Energie besparen";
    uitleg = "Op basis van jouw wensen adviseren we producten die direct inzicht geven in je verbruik en automatisch energie besparen.";
    eco = "homekit";
    producten = [
      { id: "hk-thermostat", tierIdx: Math.min(tierIdx, 2), qty: 1 },
      { id: "hk-plug",       tierIdx: Math.min(tierIdx, 2), qty: Math.max(kamers.length, 2) },
    ];
    if (kamers.includes("tuin")) producten.push({ id: "hue-outdoor", tierIdx: 0, qty: 1 });
  } else if (doel === "automatiseren") {
    titel = "Slim automatiseren";
    uitleg = "We raden producten aan die samen een slimme routine vormen — lichten die automatisch aangaan, verwarming die zich aanpast en meer.";
    eco = "homekit";
    producten = [
      { id: "hk-thermostat", tierIdx: Math.min(tierIdx, 2), qty: 1 },
      { id: "hk-speaker",    tierIdx: Math.min(tierIdx, 2), qty: aantalKamers === "4+" ? 2 : 1 },
      { id: "hue-motion",    tierIdx: Math.min(tierIdx, 2), qty: Math.min(Math.max(kamers.length, 1), 3) },
    ];
    if (kamers.includes("woonkamer") || kamers.includes("slaapkamer")) producten.push({ id: "hue-starter", tierIdx: Math.min(tierIdx, 2), qty: 1 });
  } else if (doel === "beveiliging") {
    titel = "Huis beveiligen";
    uitleg = "Een combinatie van sloten, cameras en sensoren die jou altijd inzicht en controle geeft over je veiligheid.";
    eco = "homekit";
    producten = [
      { id: "hk-lock",   tierIdx: Math.min(tierIdx, 2), qty: 1 },
      { id: "hk-camera", tierIdx: Math.min(tierIdx, 2), qty: kamers.includes("tuin") ? 2 : 1 },
      { id: "hk-sensor", tierIdx: Math.min(tierIdx, 2), qty: Math.min(Math.max(kamers.length, 2), 4) },
    ];
  } else if (doel === "sfeer") {
    titel = "Sfeer & verlichting";
    uitleg = "De juiste verlichting maakt het verschil. We adviseren producten die de sfeer in elke kamer perfect instellen.";
    eco = "hue";
    producten = [
      { id: "hue-starter", tierIdx: Math.min(tierIdx, 2), qty: Math.max(kamers.length, 1) },
      { id: "hue-bridge",  tierIdx: Math.min(tierIdx, 2), qty: 1 },
      { id: "hue-dimmer",  tierIdx: Math.min(tierIdx, 2), qty: Math.max(kamers.length, 1) },
    ];
    if (kamers.includes("woonkamer")) producten.push({ id: "hue-strip",   tierIdx: Math.min(tierIdx, 2), qty: 1 });
    if (kamers.includes("tuin"))      producten.push({ id: "hue-outdoor", tierIdx: Math.min(tierIdx, 2), qty: 1 });
  } else {
    titel = "Compleet slim huis";
    uitleg = "Op basis van jouw wensen stellen we een complete basisset samen die gemak, sfeer en controle combineert.";
    eco = "both";
    producten = [
      { id: "hk-thermostat", tierIdx: Math.min(tierIdx, 2), qty: 1 },
      { id: "hue-starter",   tierIdx: Math.min(tierIdx, 2), qty: Math.max(kamers.length, 1) },
      { id: "hk-plug",       tierIdx: Math.min(tierIdx, 2), qty: 2 },
    ];
    if (budget !== "klein") producten.push({ id: "hk-speaker", tierIdx: Math.min(tierIdx, 2), qty: 1 });
  }

  if (kamers.includes("hal") && doel !== "beveiliging") producten.push({ id: "hk-sensor", tierIdx: 0, qty: 1 });
  return { eco, producten, titel, uitleg };
}

function KeuzehulpPage({ setPage, onAdviesGeladen }) {
  const [stap, setStap] = useState(0);
  const [antwoorden, setAntwoorden] = useState({});
  const [advies, setAdvies] = useState(null);
  const vraag = keuzehulpVragen[stap];

  function kiesOptie(vraagId, optieId, meerdere) {
    if (meerdere) {
      setAntwoorden(prev => {
        const huidig = prev[vraagId] || [];
        if (huidig.includes(optieId)) return { ...prev, [vraagId]: huidig.filter(x => x !== optieId) };
        return { ...prev, [vraagId]: [...huidig, optieId] };
      });
    } else {
      setAntwoorden(prev => ({ ...prev, [vraagId]: optieId }));
    }
  }

  function volgende() {
    if (stap < keuzehulpVragen.length - 1) setStap(s => s + 1);
    else setAdvies(genereerAdvies(antwoorden));
  }

  function isGeselecteerd(vraagId, optieId, meerdere) {
    if (meerdere) return (antwoorden[vraagId] || []).includes(optieId);
    return antwoorden[vraagId] === optieId;
  }

  function kanVolgende() {
    if (vraag.meerdere) return (antwoorden[vraag.id] || []).length > 0;
    return !!antwoorden[vraag.id];
  }

  if (advies) {
    const ecoNaam = ecosystems.find(e => e.id === advies.eco)?.name || "";
    const totaal = advies.producten.reduce((s, p) => s + productTiers[p.id].tiers[p.tierIdx].price * p.qty, 0);
    return (
      <div className="page">
        <div className="eyebrow">Keuzehulp — Jouw advies</div>
        <div className="page-h1">{advies.titel}</div>
        <div className="page-lead">{advies.uitleg}</div>
        <div className="ov" style={{ marginBottom: 16 }}>
          <div className="ov-head">
            <div className="ov-head-t">Aanbevolen producten</div>
            <div className="ov-head-s">{ecoNaam}</div>
          </div>
          {advies.producten.map((p, i) => {
            const base = productTiers[p.id];
            const tier = base.tiers[p.tierIdx];
            return (
              <div key={i} className="ov-row">
                <div className="ov-ic">{base.icon}</div>
                <div className="ov-info">
                  <div className="ov-base">{base.name}</div>
                  <div className="ov-prod">{tier.product}{p.qty > 1 ? ` × ${p.qty}` : ""}</div>
                </div>
                <div className="ov-right">
                  <div className="ov-tier">{tier.tier}</div>
                  <div className="ov-price">€{tier.price * p.qty}</div>
                </div>
              </div>
            );
          })}
          <div style={{ padding: "10px 18px", borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#888" }}>Geschatte totaalprijs</span>
            <span style={{ fontSize: 15, fontWeight: 500 }}>€{totaal}</span>
          </div>
        </div>
        <div className="btn-col">
          <button className="btn btn-blk btn-full" onClick={() => { onAdviesGeladen(advies); setPage("config"); }}>Laad in configurator →</button>
          <button className="btn btn-wht btn-full" onClick={() => { setStap(0); setAntwoorden({}); setAdvies(null); }}>Opnieuw beginnen</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="eyebrow">Keuzehulp — Vraag {stap + 1} van {keuzehulpVragen.length}</div>
      <div className="page-h1">{vraag.vraag}</div>
      {vraag.meerdere && <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Je mag meerdere opties kiezen.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {vraag.opties.map(opt => {
          const sel = isGeselecteerd(vraag.id, opt.id, vraag.meerdere);
          return (
            <div key={opt.id} onClick={() => kiesOptie(vraag.id, opt.id, vraag.meerdere)}
              style={{ border: `1.5px solid ${sel ? "#111" : "#DCDCDC"}`, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, background: sel ? "#111" : "#fff", transition: "all 0.1s" }}>
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13, color: sel ? "#fff" : "#111" }}>{opt.label}</div>
                {opt.omschrijving && <div style={{ fontSize: 11, color: sel ? "rgba(255,255,255,0.55)" : "#888", marginTop: 2 }}>{opt.omschrijving}</div>}
              </div>
              <div style={{ width: 18, height: 18, border: `1.5px solid ${sel ? "#fff" : "#DCDCDC"}`, background: sel ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 500, color: "#111", flexShrink: 0 }}>{sel ? "✓" : ""}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 9 }}>
        {stap > 0 && <button className="btn btn-wht" style={{ flex: 1 }} onClick={() => setStap(s => s - 1)}>← Terug</button>}
        <button className="btn btn-blk" style={{ flex: 2 }} disabled={!kanVolgende()} onClick={volgende}>
          {stap < keuzehulpVragen.length - 1 ? "Volgende →" : "Bekijk advies →"}
        </button>
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 4 }}>
        {keuzehulpVragen.map((_, i) => (
          <div key={i} style={{ height: 3, flex: 1, background: i <= stap ? "#111" : "#E0E0E0", transition: "background 0.2s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function parseInstructions(text, selectedFull) {
  const sections = [];
  const blocks = text.split(/\n(?=##\s)/g).filter(Boolean);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const title = lines[0].replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
    const steps = []; let tip = "";
    for (const line of lines.slice(1)) {
      const m = line.match(/^(\d+)\.\s+(.+)/);
      if (m) steps.push(m[2].replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"));
      else if (/^(tip:|💡)/i.test(line.trim()))
        tip = line.replace(/^(tip:|💡)\s*/i, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    }
    if (steps.length > 0) {
      const matched = selectedFull.find(p =>
        title.toLowerCase().includes(p.product.toLowerCase().split(" ")[0]) ||
        title.toLowerCase().includes(p.baseName.toLowerCase().split(" ")[0])
      );
      sections.push({ title, steps, tip, icon: matched?.icon || "📦" });
    }
  }
  return sections;
}

function InfoPopup({ tier, onClose }) {
  if (!tier || !tier.advantages) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", border: "1.5px solid #111", borderRadius: 4, maxWidth: 400, width: "100%", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        {tier.img && <img src={tier.img} alt={tier.product} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />}
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 2, color: "#888", marginBottom: 4 }}>{tier.tier}</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{tier.product}</div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#999", lineHeight: 1, padding: 0, marginLeft: 12 }}>✕</button>
          </div>
          <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 2, color: "#888", marginBottom: 10 }}>Voordelen t.o.v. vorige klasse</div>
          {tier.advantages.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 9, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 9, fontWeight: 700, background: "#111", color: "#fff", padding: "2px 5px", borderRadius: 2, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 13, color: "#444", lineHeight: 1.55 }}>{a}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #EBEBEB", paddingTop: 14 }}>
            <span style={{ fontSize: 11, color: "#888" }}>Adviesprijs</span>
            <span style={{ fontSize: 18, fontWeight: 500 }}>€{tier.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ base, selectedTier, qty, onSelectTier, onQtyChange }) {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const isSelected = selectedTier !== undefined;
  const showPanel = open || isSelected;

  return (
    <>
      {popup && <InfoPopup tier={popup} onClose={() => setPopup(null)} />}
      <div>
        <div className={`ph ${showPanel ? "open" : ""}`} onClick={() => setOpen(v => !v)}>
          <div className="pi">{base.icon}</div>
          <div className="pinfo">
            <div className="pn2">{base.name}</div>
            {isSelected && <div className="psel">{base.tiers[selectedTier].product} · €{base.tiers[selectedTier].price * qty}</div>}
          </div>
          {isSelected && (
            <div style={{ display: "flex", alignItems: "center", marginRight: 8, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
              <button className="qty-btn" onClick={() => onQtyChange(Math.max(1, qty - 1))}>−</button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => onQtyChange(qty + 1)}>+</button>
            </div>
          )}
          <div className="pcat">{base.category}</div>
          <div className="pchev">▾</div>
        </div>
        {showPanel && (
          <div className="tpanel">
            {base.tiers.map((t, idx) => (
              <div key={idx} className={`tr ${selectedTier === idx ? "sel" : ""}`}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 11 }} onClick={() => { onSelectTier(idx); setOpen(false); }}>
                  <div className="tlbl">{t.tier}</div>
                  <div className="tinfo">
                    <div className="tprod">{t.product}</div>
                    <div className="tdesc">{t.description}</div>
                  </div>
                  <div className="tprice">€{t.price}</div>
                </div>
                {t.advantages && (
                  <button className={`info-btn ${selectedTier === idx ? "info-btn-sel" : ""}`} onClick={e => { e.stopPropagation(); setPopup(t); }}>i</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const css = `
@keyframes spin { to { transform: rotate(360deg); } }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #fff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; font-size: 14px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
nav { height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; border-bottom: 1.5px solid #111; position: sticky; top: 0; background: #fff; z-index: 100; }
.nav-links { display: flex; align-items: center; }
.nav-link { padding: 0 14px; height: 56px; display: flex; align-items: center; font-size: 13px; font-weight: 500; cursor: pointer; color: #111; border-left: 1px solid #E0E0E0; transition: background 0.1s; }
.nav-link:hover { background: #F5F5F5; }
.nav-link.active { background: #111; color: #fff; }
.page { max-width: 640px; margin: 0 auto; padding: 52px 28px 120px; }
.page-wide { max-width: 880px; margin: 0 auto; padding: 52px 28px 120px; }
.eyebrow { font-size: 10px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #888; margin-bottom: 10px; }
.page-h1 { font-size: 26px; font-weight: 500; letter-spacing: -0.5px; line-height: 1.15; margin-bottom: 10px; }
.page-lead { font-size: 14px; color: #555; line-height: 1.65; margin-bottom: 32px; }
.hero { border: 1.5px solid #111; border-radius: 3px; padding: 40px 36px; margin-bottom: 28px; }
.hero-tag { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; background: #111; color: #fff; padding: 4px 10px; margin-bottom: 16px; }
.hero-h1 { font-size: 30px; font-weight: 500; letter-spacing: -1px; line-height: 1.1; margin-bottom: 12px; }
.hero-p { font-size: 14px; color: #555; line-height: 1.7; max-width: 420px; margin-bottom: 24px; }
.hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.menu-card { border: 1.5px solid #111; padding: 22px 20px; cursor: pointer; transition: background 0.1s; display: flex; flex-direction: column; gap: 5px; }
.menu-card:hover { background: #F7F7F7; }
.menu-icon { font-size: 18px; }
.menu-title { font-size: 14px; font-weight: 500; }
.menu-sub { font-size: 12px; color: #666; line-height: 1.5; }
.menu-arrow { font-size: 14px; margin-top: 8px; }
.divider-lt { height: 1px; background: #EBEBEB; margin: 20px 0; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 11px 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; transition: all 0.1s; }
.btn-blk { background: #111; color: #fff; }
.btn-blk:hover { background: #333; border-color: #333; }
.btn-blk:disabled { background: #CCC; border-color: #CCC; color: #fff; cursor: not-allowed; }
.btn-wht { background: #fff; color: #111; }
.btn-wht:hover { background: #F5F5F5; }
.btn-full { width: 100%; }
.btn-col { display: flex; flex-direction: column; gap: 9px; margin-top: 20px; }
.qty-btn { width: 28px; height: 28px; border: 1.5px solid #DCDCDC; background: #fff; color: #111; font-size: 16px; font-weight: 400; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.1s; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1; }
.qty-btn:hover { border-color: #111; }
.qty-val { width: 28px; text-align: center; font-size: 13px; font-weight: 500; }
.progress { display: flex; align-items: center; gap: 5px; margin-bottom: 30px; flex-wrap: wrap; }
.ps { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500; color: #C0C0C0; white-space: nowrap; }
.ps.on { color: #111; }
.ps.dn { color: #111; }
.pn { width: 19px; height: 19px; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 500; flex-shrink: 0; }
.ps.on .pn, .ps.dn .pn { background: #111; color: #fff; border-color: #111; }
.pl { height: 1.5px; background: #E0E0E0; width: 14px; flex-shrink: 0; }
.pl.dn { background: #111; }
.plist { display: flex; flex-direction: column; gap: 6px; margin-bottom: 22px; }
.ph { border: 1.5px solid #DCDCDC; padding: 12px 14px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: border-color 0.1s; background: #fff; }
.ph:hover { border-color: #999; }
.ph.open { border-color: #111; border-bottom: none; background: #FAFAFA; }
.pi { font-size: 18px; flex-shrink: 0; }
.pinfo { flex: 1; min-width: 0; }
.pn2 { font-size: 13px; font-weight: 500; }
.psel { font-size: 11px; color: #666; margin-top: 1px; }
.pcat { font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; color: #666; background: #F0F0F0; padding: 2px 7px; flex-shrink: 0; }
.pchev { font-size: 10px; color: #AAA; flex-shrink: 0; transition: transform 0.15s; }
.ph.open .pchev { transform: rotate(180deg); }
.tpanel { border: 1.5px solid #111; border-top: none; overflow: hidden; }
.tr { display: flex; align-items: center; cursor: pointer; background: #fff; border-top: 1px solid #EBEBEB; transition: background 0.1s; }
.tr:first-child { border-top: none; }
.tr:hover { background: #F9F9F9; }
.tr.sel { background: #111; }
.tr > div:first-child { flex: 1; display: flex; align-items: center; gap: 11px; padding: 11px 14px; }
.tlbl { font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; padding: 2px 8px; border: 1.5px solid #DCDCDC; color: #555; background: #fff; flex-shrink: 0; min-width: 76px; text-align: center; }
.tr.sel .tlbl { border-color: #fff; color: #111; background: #fff; }
.tinfo { flex: 1; min-width: 0; }
.tprod { font-size: 12px; font-weight: 500; color: #111; }
.tr.sel .tprod { color: #fff; }
.tdesc { font-size: 11px; color: #888; line-height: 1.4; }
.tr.sel .tdesc { color: rgba(255,255,255,0.5); }
.tprice { font-size: 13px; font-weight: 500; color: #111; flex-shrink: 0; }
.tr.sel .tprice { color: #fff; }
.info-btn { width: 26px; height: 26px; flex-shrink: 0; border: 1.5px solid #DCDCDC; background: #fff; color: #555; font-size: 12px; font-style: italic; font-weight: 500; font-family: Georgia, serif; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-right: 12px; transition: all 0.1s; }
.info-btn:hover { border-color: #111; color: #111; }
.info-btn-sel { border-color: #555; background: rgba(255,255,255,0.15); color: #fff; }
.ov { border: 1.5px solid #111; overflow: hidden; margin-bottom: 14px; }
.ov-head { background: #111; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; }
.ov-head-t { font-size: 13px; font-weight: 500; color: #fff; }
.ov-head-s { font-size: 11px; color: #888; }
.ov-row { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid #F0F0F0; }
.ov-row:first-of-type { border-top: none; }
.ov-ic { font-size: 16px; flex-shrink: 0; }
.ov-info { flex: 1; min-width: 0; }
.ov-base { font-size: 10px; color: #AAA; font-weight: 500; text-transform: uppercase; letter-spacing: 0.8px; }
.ov-prod { font-size: 13px; font-weight: 500; }
.ov-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
.ov-tier { font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; padding: 2px 7px; border: 1.5px solid #DCDCDC; color: #666; }
.ov-price { font-size: 13px; font-weight: 500; }
.upg { border: 1.5px solid #DCDCDC; padding: 10px 13px; margin-bottom: 6px; display: flex; align-items: center; gap: 10px; background: #FAFAFA; }
.upg-ic { font-size: 14px; flex-shrink: 0; }
.upg-info { flex: 1; min-width: 0; }
.upg-t { font-size: 12px; font-weight: 500; margin-bottom: 1px; }
.upg-s { font-size: 11px; color: #888; }
.upg-btn { flex-shrink: 0; background: #111; color: #fff; border: none; padding: 6px 11px; font-size: 11px; font-weight: 500; cursor: pointer; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
.upg-btn:hover { background: #333; }
.inst-row { border: 1.5px solid #DCDCDC; padding: 12px 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: border-color 0.1s, background 0.1s; margin-bottom: 14px; background: #fff; }
.inst-row.on { border-color: #111; background: #FAFAFA; }
.inst-ic { font-size: 18px; flex-shrink: 0; }
.inst-info { flex: 1; }
.inst-t { font-size: 13px; font-weight: 500; margin-bottom: 1px; }
.inst-s { font-size: 11px; color: #888; }
.inst-p { font-size: 14px; font-weight: 500; flex-shrink: 0; }
.chk { width: 20px; height: 20px; border: 1.5px solid #DCDCDC; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; flex-shrink: 0; transition: all 0.12s; }
.inst-row.on .chk { background: #111; border-color: #111; }
.tot { border: 1.5px solid #111; overflow: hidden; margin-bottom: 10px; }
.tot-line { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-top: 1px solid #F0F0F0; font-size: 13px; }
.tot-line:first-child { border-top: none; }
.tot-line .l { color: #666; }
.tot-line .v { font-weight: 500; }
.tot-grand { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #111; }
.tot-grand .l { font-size: 13px; font-weight: 500; color: #fff; }
.tot-grand .v { font-size: 20px; font-weight: 500; color: #fff; letter-spacing: -0.5px; }
.disc { font-size: 11px; color: #BBBBBB; margin-bottom: 18px; line-height: 1.5; }
.ic { border: 1.5px solid #111; overflow: hidden; margin-bottom: 20px; }
.ic-head { background: #111; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; }
.ic-head-t { font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 2px; }
.ic-head-s { font-size: 11px; color: #888; }
.ic-badge { font-size: 10px; font-weight: 500; color: #fff; border: 1.5px solid #444; padding: 3px 10px; }
.ic-body { padding: 20px; }
.lw { display: flex; flex-direction: column; align-items: center; padding: 36px 0; gap: 11px; }
.sp { width: 24px; height: 24px; border: 2px solid #E0E0E0; border-top-color: #111; border-radius: 50%; animation: spin 0.75s linear infinite; }
.lt { font-size: 12px; color: #888; }
.ib { margin-bottom: 22px; }
.ib:last-child { margin-bottom: 0; }
.ib-head { display: flex; align-items: center; gap: 9px; padding-bottom: 9px; margin-bottom: 11px; border-bottom: 1px solid #EBEBEB; }
.ib-ic { width: 30px; height: 30px; background: #F5F5F5; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.ib-name { font-size: 13px; font-weight: 500; }
.srow { display: flex; gap: 9px; margin-bottom: 8px; align-items: flex-start; }
.snum { width: 19px; height: 19px; background: #111; color: #fff; font-size: 9px; font-weight: 500; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.stxt { font-size: 13px; color: #444; line-height: 1.6; }
.stxt strong { color: #111; font-weight: 500; }
.tip { background: #F7F7F7; border-left: 2px solid #111; padding: 9px 13px; font-size: 12px; color: #555; margin-top: 9px; line-height: 1.6; }
.iblock { border: 1.5px solid #111; padding: 20px; margin-bottom: 12px; }
.iblock-t { font-size: 14px; font-weight: 500; margin-bottom: 9px; }
.iblock p { font-size: 13px; color: #555; line-height: 1.7; margin-bottom: 9px; }
.iblock p:last-child { margin-bottom: 0; }
.prolist { display: flex; flex-direction: column; gap: 6px; margin-top: 9px; }
.proitem { display: flex; align-items: flex-start; gap: 7px; font-size: 13px; }
.prok { font-size: 9px; background: #111; color: #fff; padding: 1px 5px; flex-shrink: 0; margin-top: 2px; font-weight: 500; }
.hint { font-size: 12px; color: #555; background: #F5F5F5; padding: 8px 12px; margin-top: 10px; line-height: 1.6; }
.sv { display: flex; flex-direction: column; margin: 12px 0; }
.sv-row { display: flex; gap: 12px; }
.sv-left { display: flex; flex-direction: column; align-items: center; }
.sv-num { width: 24px; height: 24px; background: #111; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; flex-shrink: 0; }
.sv-line { flex: 1; width: 1.5px; background: #E0E0E0; margin: 3px 0; min-height: 18px; }
.sv-row:last-child .sv-line { display: none; }
.sv-c { padding-bottom: 16px; }
.sv-t { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
.sv-s { font-size: 12px; color: #777; line-height: 1.5; }
.cf { margin-bottom: 11px; }
.cl { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 5px; display: block; }
.ci { width: 100%; padding: 10px 12px; border: 1.5px solid #DCDCDC; font-size: 13px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; outline: none; transition: border-color 0.1s; }
.ci:focus { border-color: #111; }
.cta { resize: vertical; min-height: 80px; }
.smry { border: 1.5px solid #111; padding: 14px; margin-bottom: 16px; background: #FAFAFA; }
.smry-t { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px; color: #AAA; margin-bottom: 9px; }
.smry-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; color: #444; }
.smry-row.total { border-top: 1px solid #DCDCDC; padding-top: 8px; margin-top: 6px; font-weight: 500; font-size: 14px; color: #111; margin-bottom: 0; }
.prod-page-row { display: flex; align-items: center; gap: 9px; padding: 8px 0; border-top: 1px solid #F0F0F0; }
.prod-page-row:first-of-type { border-top: none; }
.float-btn { position: fixed; bottom: 28px; right: 28px; background: #111; color: #fff; border: none; padding: 13px 20px; font-size: 13px; font-weight: 500; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; cursor: pointer; z-index: 200; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.18); transition: background 0.1s; }
.float-btn:hover { background: #333; }
footer { border-top: 1.5px solid #111; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #999; }
`;

// ─── PAGES ───────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  return (
    <div className="page-wide">
      <div className="hero">
        <div className="hero-tag">Smart Home</div>
        <div className="hero-h1">Maak jouw huis slimmer.<br />Zonder gedoe.</div>
        <div className="hero-p">Kopple helpt je bij het kiezen, configureren en installeren van smart home producten. Van verlichting tot beveiliging — wij regelen het.</div>
        <div className="hero-btns">
          <button className="btn btn-blk" onClick={() => setPage("keuzehulp")}>Keuzehulp starten →</button>
          <button className="btn btn-wht" onClick={() => setPage("config")}>Naar configurator</button>
        </div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Navigeer naar</div>
      <div className="grid-2">
        {[
          { icon: "🤔", title: "Keuzehulp",    sub: "Weet je niet waar te beginnen? Beantwoord 4 vragen en krijg een persoonlijk advies.", page: "keuzehulp" },
          { icon: "⚙️", title: "Configurator", sub: "Stel jouw smart home samen en ontvang een installatiegids op maat.", page: "config" },
          { icon: "📦", title: "Producten",    sub: "Bekijk ons volledige aanbod en vergelijk kwaliteitsklassen.", page: "products" },
          { icon: "🔧", title: "Installatie",  sub: "Laat alles professioneel installeren door een Kopple-expert.", page: "installation" },
        ].map(m => (
          <div key={m.page} className="menu-card" onClick={() => setPage(m.page)}>
            <div className="menu-icon">{m.icon}</div>
            <div className="menu-title">{m.title}</div>
            <div className="menu-sub">{m.sub}</div>
            <div className="menu-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcosystemPage({ setPage }) {
  return (
    <div className="page">
      <div className="eyebrow">Uitleg</div>
      <div className="page-h1">Welk ecosysteem past bij jou?</div>
      <div className="page-lead">Een ecosysteem is het platform waarop jouw slimme apparaten samenwerken.</div>
      {ecosystems.map(eco => (
        <div key={eco.id} className="iblock">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{eco.icon}</span>
            <div className="iblock-t" style={{ marginBottom: 0 }}>{eco.name}</div>
          </div>
          <p style={{ fontStyle: "italic", color: "#777", marginBottom: 9 }}>{eco.tagline}</p>
          <p>{eco.description}</p>
          <div className="prolist">{eco.pros.map((p, i) => <div key={i} className="proitem"><span className="prok">✓</span><span>{p}</span></div>)}</div>
          <div className="hint">💡 {eco.suitable}</div>
        </div>
      ))}
      <button className="btn btn-blk btn-full" onClick={() => setPage("config")}>Naar de configurator →</button>
    </div>
  );
}

function ProductsPage() {
  const all = Object.entries(productTiers);
  const cats = [...new Set(all.map(([, v]) => v.category))];
  return (
    <div className="page">
      <div className="eyebrow">Aanbod</div>
      <div className="page-h1">Alle producten</div>
      <div className="page-lead">Ons volledige aanbod per categorie.</div>
      {cats.map(cat => (
        <div key={cat}>
          <div className="eyebrow">{cat}</div>
          {all.filter(([, v]) => v.category === cat).map(([id, base]) => (
            <div key={id} className="iblock" style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{base.icon}</span>
                <div className="iblock-t" style={{ marginBottom: 0 }}>{base.name}</div>
              </div>
              {base.tiers.map((t, i) => (
                <div key={i} className="prod-page-row">
                  <span style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, padding: "2px 7px", border: "1.5px solid #DCDCDC", color: "#555", minWidth: 72, textAlign: "center" }}>{t.tier}</span>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{t.product}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>€{t.price}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="divider-lt" />
        </div>
      ))}
    </div>
  );
}

function InstallationPage({ setPage }) {
  return (
    <div className="page">
      <div className="eyebrow">Service</div>
      <div className="page-h1">Professionele installatie</div>
      <div className="page-lead">Onze experts installeren alles bij jou thuis — snel, netjes en met garantie.</div>
      <div className="iblock" style={{ marginBottom: 12 }}>
        <div className="iblock-t">Hoe werkt het?</div>
        <div className="sv">
          {[
            { n: 1, t: "Configureer je producten", s: "Gebruik onze configurator om je producten te selecteren." },
            { n: 2, t: "Voeg installatie toe", s: "Selecteer professionele installatie voor €99 in het overzicht." },
            { n: 3, t: "Vul je contactgegevens in", s: "We plannen een afspraak op een moment dat jou uitkomt." },
            { n: 4, t: "Onze expert komt langs", s: "We installeren alles netjes en testen of alles werkt." },
          ].map(s => (
            <div key={s.n} className="sv-row">
              <div className="sv-left"><div className="sv-num">{s.n}</div><div className="sv-line" /></div>
              <div className="sv-c"><div className="sv-t">{s.t}</div><div className="sv-s">{s.s}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="iblock" style={{ marginBottom: 12 }}>
        <div className="iblock-t">Inbegrepen</div>
        <div className="prolist">
          {["Installatie van alle geselecteerde producten","Koppeling met jouw ecosysteem en app","Test van alle functies en automations","Persoonlijke uitleg over bediening","30 dagen garantie op de installatie"].map((p, i) => (
            <div key={i} className="proitem"><span className="prok">✓</span><span>{p}</span></div>
          ))}
        </div>
      </div>
      <div className="iblock" style={{ marginBottom: 24, background: "#FAFAFA" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div className="iblock-t" style={{ marginBottom: 3 }}>Vaste installatieprijs</div><div style={{ fontSize: 12, color: "#777" }}>Geen verrassingen achteraf</div></div>
          <div style={{ fontSize: 24, fontWeight: 500 }}>€99</div>
        </div>
      </div>
      <button className="btn btn-blk btn-full" onClick={() => setPage("config")}>Start configurator →</button>
    </div>
  );
}

function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <div className="page">
      <div className="eyebrow">Over ons</div>
      <div className="page-h1">Kopple</div>
      <div className="page-lead">Smart home voor iedereen — toegankelijk, eerlijk en persoonlijk.</div>
      <div className="iblock" style={{ marginBottom: 12 }}>
        <div className="iblock-t">Ons verhaal</div>
        <p>Kopple is opgericht met één doel: smart home toegankelijk maken voor iedereen. Niet alleen voor techneuten, maar voor gewone mensen die gewoon willen dat hun huis slimmer werkt.</p>
        <p>Via onze configurator stel je eenvoudig je eigen smart home samen. Je kiest je producten, je kwaliteitsklasse en of je het zelf wilt installeren of dat wij dat doen.</p>
      </div>
      <div className="iblock" style={{ marginBottom: 24 }}>
        <div className="iblock-t">Neem contact op</div>
        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>✓</div>
            <div style={{ fontWeight: 500, marginBottom: 5 }}>Bericht ontvangen</div>
            <div style={{ fontSize: 12, color: "#888" }}>We reageren binnen 2 werkdagen.</div>
          </div>
        ) : (
          <>
            {[{ key: "name", label: "Naam", type: "text", ph: "Jouw naam" }, { key: "email", label: "E-mailadres", type: "email", ph: "jouw@email.nl" }, { key: "phone", label: "Telefoon", type: "tel", ph: "+31 6 00000000" }].map(f => (
              <div key={f.key} className="cf">
                <label className="cl">{f.label}</label>
                <input className="ci" type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div className="cf">
              <label className="cl">Bericht</label>
              <textarea className="ci cta" placeholder="Hoe kunnen we je helpen?" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
            </div>
            <button className="btn btn-blk btn-full" onClick={() => { if (form.name && form.email) setSent(true); }}>Verstuur →</button>
          </>
        )}
      </div>
      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}><span style={{ fontWeight: 500, color: "#555" }}>kopple.</span><br />hallo@kopple.nl · kopple.nl</div>
    </div>
  );
}

// ─── CONFIGURATOR ─────────────────────────────────────────────────────────────

function Configurator({ setPage, voorgeladen }) {
  const [step, setStep] = useState(voorgeladen ? 2 : 1);
  const [selectedEco, setSelectedEco] = useState(voorgeladen?.eco || null);
  const [selections, setSelections] = useState(() => {
    if (!voorgeladen) return {};
    const s = {};
    voorgeladen.producten.forEach(p => { s[p.id] = p.tierIdx; });
    return s;
  });
  const [quantities, setQuantities] = useState(() => {
    if (!voorgeladen) return {};
    const q = {};
    voorgeladen.producten.forEach(p => { q[p.id] = p.qty; });
    return q;
  });
  const [withInstall, setWithInstall] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null);
  const [rawText, setRawText] = useState("");

  const availableIds = selectedEco ? productsByEco[selectedEco] : [];
  const ecoLabel = ecosystems.find(e => e.id === selectedEco)?.name || "";

  const selectedFull = Object.entries(selections).map(([id, tierIdx]) => {
    const base = productTiers[id];
    const tier = base.tiers[tierIdx];
    const qty = quantities[id] || 1;
    return { id, icon: base.icon, baseName: base.name, category: base.category, tierIndex: tierIdx, qty, ...tier };
  });

  const totalSelected = selectedFull.length;
  const productTotal = selectedFull.reduce((s, p) => s + p.price * p.qty, 0);
  const grandTotal = productTotal + (withInstall ? INSTALL_PRICE : 0);
  const upgradeable = selectedFull.filter(p => p.tierIndex < 2);

  function selectTier(id, idx) {
    setSelections(prev => {
      if (prev[id] === idx) {
        const n = { ...prev }; delete n[id];
        const q = { ...quantities }; delete q[id]; setQuantities(q);
        return n;
      }
      return { ...prev, [id]: idx };
    });
    setQuantities(prev => ({ ...prev, [id]: prev[id] || 1 }));
  }

  function setQty(id, qty) { setQuantities(prev => ({ ...prev, [id]: qty })); }
  function applyUpgrade(id, idx) { setSelections(prev => ({ ...prev, [id]: idx })); }

  async function generate() {
    setLoading(true);
    setStep(withInstall ? 5 : 4);
    const productList = selectedFull.map(p => `- ${p.baseName}: ${p.product} (${p.tier}, €${p.price}${p.qty > 1 ? ` × ${p.qty}` : ""})`).join("\n");
    const prompt = `Je bent een smart home installatie-expert voor Kopple. Genereer duidelijke, stapsgewijze werkinstructies in het Nederlands voor de volgende producten in een ${ecoLabel} ecosysteem:\n\n${productList}\n\nVoor elk product:\n1. Begin met ## gevolgd door de productnaam\n2. Geef 4-6 genummerde stappen die iemand zonder technische kennis kan volgen\n3. Markeer belangrijke termen met **bold**\n4. Sluit af met "Tip:" gevolgd door een praktische tip\n\nBegin direct met het eerste product.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      setRawText(text); setSections(parseInstructions(text, selectedFull));
    } catch { setRawText("Er ging iets mis."); setSections([]); }
    setLoading(false);
  }

  function reset() {
    setStep(1); setSelectedEco(null); setSelections({}); setQuantities({}); setWithInstall(false);
    setContact({ name: "", email: "", phone: "", address: "", note: "" });
    setSections(null); setRawText(""); setSubmitted(false);
  }

  const instrStep = withInstall ? 5 : 4;

  function ProgBar() {
    const steps = [{ n: 1, l: "Ecosysteem" }, { n: 2, l: "Producten" }, { n: 3, l: "Overzicht" }, ...(withInstall ? [{ n: 4, l: "Contact" }] : []), { n: instrStep, l: "Gids" }];
    return (
      <div className="progress">
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: "contents" }}>
            {i > 0 && <div className={`pl ${step > s.n - 1 ? "dn" : ""}`} />}
            <div className={`ps ${step === s.n ? "on" : step > s.n ? "dn" : ""}`}>
              <span className="pn">{step > s.n ? "✓" : s.n}</span>{s.l}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="eyebrow">Configurator</div>

      {step === 1 && (
        <>
          <div className="page-h1">Kies je ecosysteem</div>
          <div className="page-lead">Welk platform wil je als basis voor jouw smart home?</div>
          <ProgBar />
          <div className="plist">
            {ecosystems.map(eco => {
              const sel = selectedEco === eco.id;
              return (
                <div key={eco.id} style={{ border: `1.5px solid ${sel ? "#111" : "#DCDCDC"}`, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, background: sel ? "#111" : "#fff", transition: "all 0.1s" }} onClick={() => setSelectedEco(eco.id)}>
                  <span style={{ fontSize: 18 }}>{eco.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, color: sel ? "#fff" : "#111" }}>{eco.name}</div>
                    <div style={{ fontSize: 11, color: sel ? "rgba(255,255,255,0.55)" : "#888", marginTop: 1 }}>{eco.tagline}</div>
                  </div>
                  <div style={{ width: 18, height: 18, border: `1.5px solid ${sel ? "#fff" : "#DCDCDC"}`, background: sel ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 500, color: "#111" }}>{sel ? "✓" : ""}</div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-wht btn-full" style={{ marginBottom: 9 }} onClick={() => setPage("ecosystems")}>Ik weet het niet — wat zijn de verschillen?</button>
          <div className="btn-col" style={{ marginTop: 0 }}>
            <button className="btn btn-blk btn-full" disabled={!selectedEco} onClick={() => setStep(2)}>Volgende stap →</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="page-h1">Selecteer producten</div>
          <div className="page-lead">Kies per product de klasse en het aantal. Klik op <em>i</em> voor meer info.</div>
          {voorgeladen && <div style={{ fontSize: 12, color: "#888", background: "#F5F5F5", padding: "8px 12px", marginBottom: 16 }}>✓ Advies geladen vanuit keuzehulp — je kunt alles nog aanpassen.</div>}
          <ProgBar />
          {totalSelected > 0 && <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12 }}>✓ {totalSelected} product{totalSelected !== 1 ? "en" : ""} geselecteerd</div>}
          <div className="plist">
            {availableIds.map(id => (
              <ProductRow key={id} base={productTiers[id]} selectedTier={selections[id]} qty={quantities[id] || 1} onSelectTier={idx => selectTier(id, idx)} onQtyChange={qty => setQty(id, qty)} />
            ))}
          </div>
          <div className="btn-col">
            <button className="btn btn-blk btn-full" disabled={totalSelected === 0} onClick={() => setStep(3)}>Naar overzicht →</button>
            <button className="btn btn-wht btn-full" onClick={() => setStep(1)}>← Terug</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="page-h1">Overzicht</div>
          <div className="page-lead">Controleer je selectie en voeg optioneel installatie toe.</div>
          <ProgBar />
          <div className="ov">
            <div className="ov-head"><div className="ov-head-t">Geselecteerde producten</div><div className="ov-head-s">{ecoLabel}</div></div>
            {selectedFull.map((p, i) => (
              <div key={i} className="ov-row">
                <div className="ov-ic">{p.icon}</div>
                <div className="ov-info">
                  <div className="ov-base">{p.baseName}</div>
                  <div className="ov-prod">{p.product}{p.qty > 1 ? ` × ${p.qty}` : ""}</div>
                </div>
                <div className="ov-right">
                  <div className="ov-tier">{p.tier}</div>
                  <div className="ov-price">€{p.price * p.qty}</div>
                </div>
              </div>
            ))}
          </div>
          {upgradeable.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div className="eyebrow" style={{ marginBottom: 9 }}>Aanbevolen upgrades</div>
              {upgradeable.map(p => {
                const next = productTiers[p.id].tiers[p.tierIndex + 1];
                return (
                  <div key={p.id} className="upg">
                    <div className="upg-ic">{p.icon}</div>
                    <div className="upg-info"><div className="upg-t">Upgrade naar {next.tier}: {next.product}</div><div className="upg-s">{next.description}</div></div>
                    <button className="upg-btn" onClick={() => applyUpgrade(p.id, p.tierIndex + 1)}>+ €{next.price - p.price}</button>
                  </div>
                );
              })}
            </div>
          )}
          <div className={`inst-row ${withInstall ? "on" : ""}`} onClick={() => setWithInstall(v => !v)}>
            <div className="inst-ic">🔧</div>
            <div className="inst-info"><div className="inst-t">Professionele installatie toevoegen</div><div className="inst-s">Een Kopple-expert installeert alles bij jou thuis.</div></div>
            <div className="inst-p">€{INSTALL_PRICE}</div>
            <div className="chk">{withInstall ? "✓" : ""}</div>
          </div>
          <div className="tot">
            <div className="tot-line"><span className="l">Producten ({selectedFull.length})</span><span className="v">€{productTotal}</span></div>
            {withInstall && <div className="tot-line"><span className="l">Installatie</span><span className="v">€{INSTALL_PRICE}</span></div>}
            <div className="tot-grand"><span className="l">Totaal</span><span className="v">€{grandTotal}</span></div>
          </div>
          <div className="disc">* Richtprijzen. Installatiekosten kunnen variëren op basis van de situatie.</div>
          <div className="btn-col">
            <button className="btn btn-blk btn-full" onClick={() => withInstall ? setStep(4) : generate()}>{withInstall ? "Vul contactgegevens in →" : "Genereer installatiegids →"}</button>
            <button className="btn btn-wht btn-full" onClick={() => setStep(2)}>← Producten aanpassen</button>
          </div>
        </>
      )}

      {step === 4 && withInstall && (
        <>
          <div className="page-h1">Contactgegevens</div>
          <div className="page-lead">Vul je gegevens in zodat we een afspraak kunnen plannen.</div>
          <ProgBar />
          <div className="smry">
            <div className="smry-t">Jouw bestelling</div>
            {selectedFull.map((p, i) => <div key={i} className="smry-row"><span>{p.icon} {p.product}{p.qty > 1 ? ` × ${p.qty}` : ""}</span><span>€{p.price * p.qty}</span></div>)}
            <div className="smry-row"><span>🔧 Installatie</span><span>€{INSTALL_PRICE}</span></div>
            <div className="smry-row total"><span>Totaal</span><span>€{grandTotal}</span></div>
          </div>
          {submitted ? (
            <div className="iblock" style={{ textAlign: "center", padding: "28px 20px" }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>✓</div>
              <div style={{ fontWeight: 500, marginBottom: 5 }}>Aanvraag ontvangen</div>
              <div style={{ fontSize: 12, color: "#888" }}>Bedankt, {contact.name}. We nemen binnen 2 werkdagen contact op via {contact.email}.</div>
              <button className="btn btn-blk" style={{ marginTop: 18 }} onClick={generate}>Bekijk installatiegids →</button>
            </div>
          ) : (
            <>
              {[{ key: "name", label: "Naam", type: "text", ph: "Jouw naam", req: true }, { key: "email", label: "E-mailadres", type: "email", ph: "jouw@email.nl", req: true }, { key: "phone", label: "Telefoonnummer", type: "tel", ph: "+31 6 00000000" }, { key: "address", label: "Adres", type: "text", ph: "Straat, huisnummer, woonplaats" }].map(f => (
                <div key={f.key} className="cf">
                  <label className="cl">{f.label}{f.req ? " *" : ""}</label>
                  <input className="ci" type={f.type} placeholder={f.ph} value={contact[f.key]} onChange={e => setContact(c => ({ ...c, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div className="cf">
                <label className="cl">Opmerking</label>
                <textarea className="ci cta" placeholder="Eventuele opmerkingen..." value={contact.note} onChange={e => setContact(c => ({ ...c, note: e.target.value }))} />
              </div>
              <div className="btn-col">
                <button className="btn btn-blk btn-full" disabled={!contact.name || !contact.email} onClick={() => setSubmitted(true)}>Afspraak aanvragen →</button>
                <button className="btn btn-wht btn-full" onClick={() => setStep(3)}>← Terug</button>
              </div>
            </>
          )}
        </>
      )}

      {step === instrStep && (
        <>
          <div className="page-h1">Installatiegids</div>
          <ProgBar />
          <div className="ic">
            <div className="ic-head">
              <div><div className="ic-head-t">Jouw installatiegids</div><div className="ic-head-s">{selectedFull.length} product{selectedFull.length !== 1 ? "en" : ""} · {ecoLabel}{withInstall ? " · incl. installatie" : ""}</div></div>
              <div className="ic-badge">kopple.</div>
            </div>
            <div className="ic-body">
              {loading && <div className="lw"><div className="sp" /><div className="lt">Instructies worden opgesteld…</div></div>}
              {!loading && sections && sections.length > 0 && sections.map((sec, i) => (
                <div key={i} className="ib">
                  <div className="ib-head"><div className="ib-ic">{sec.icon}</div><div className="ib-name">{sec.title}</div></div>
                  {sec.steps.map((txt, j) => (
                    <div key={j} className="srow"><div className="snum">{j + 1}</div><p className="stxt" dangerouslySetInnerHTML={{ __html: txt }} /></div>
                  ))}
                  {sec.tip && <div className="tip"><strong>💡 Tip:</strong> <span dangerouslySetInnerHTML={{ __html: sec.tip }} /></div>}
                </div>
              ))}
              {!loading && rawText && (!sections || sections.length === 0) && <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{rawText}</p>}
            </div>
          </div>
          <div className="btn-col"><button className="btn btn-wht btn-full" onClick={reset}>← Opnieuw configureren</button></div>
        </>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [voorgeladen, setVoorgeladen] = useState(null);

  const navItems = [
    { id: "home",         label: "Home" },
    { id: "keuzehulp",   label: "Keuzehulp" },
    { id: "config",      label: "Configurator" },
    { id: "products",    label: "Producten" },
    { id: "installation",label: "Installatie" },
    { id: "about",       label: "Over ons" },
  ];

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <nav>
          <div style={{ cursor: "pointer" }} onClick={() => setPage("home")}><KoppleLogo height={22} /></div>
          <div className="nav-links">
            {navItems.map(item => (
              <div key={item.id} className={`nav-link ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>{item.label}</div>
            ))}
          </div>
        </nav>

        {page === "home"          && <HomePage setPage={setPage} />}
        {page === "keuzehulp"    && <KeuzehulpPage setPage={setPage} onAdviesGeladen={advies => { setVoorgeladen(advies); setPage("config"); }} />}
        {page === "config"       && <Configurator setPage={setPage} voorgeladen={voorgeladen} />}
        {page === "products"     && <ProductsPage />}
        {page === "installation" && <InstallationPage setPage={setPage} />}
        {page === "about"        && <AboutPage />}
        {page === "ecosystems"   && <EcosystemPage setPage={setPage} />}

        <footer>
          <KoppleLogo height={16} />
          <div>hallo@kopple.nl · kopple.nl</div>
        </footer>

        <button className="float-btn" onClick={() => setPage("about")}>
          🔧 Hulp van een expert
        </button>
      </div>
    </>
  );
}
