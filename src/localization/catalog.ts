import { en } from "./en";

type Dictionary = typeof en;
type Overrides = {
  [Section in keyof Dictionary]?: Partial<Record<keyof Dictionary[Section], string>>;
};

function make(overrides: Overrides): Dictionary {
  return Object.fromEntries(
    Object.entries(en).map(([section, values]) => [
      section,
      { ...values, ...(overrides[section as keyof Dictionary] ?? {}) },
    ]),
  ) as unknown as Dictionary;
}

export const it = make({
  states: {
    disconnected: "Nessun veicolo", unavailable: "Non disponibile", charging: "In carica",
    complete: "Ricarica completata", timer: "Ricarica programmata", updating: "Aggiornamento",
    control_pilot: "Errore Control Pilot", load_balancing: "Errore Load Balancing",
    error: "Errore del caricatore", waiting_power: "Veicolo collegato",
    wifi_connected: "Wi-Fi connesso", wifi_connecting: "Connessione Wi-Fi",
  },
  details: {
    disconnected: "Trydan pronto", unavailable: "Controlla l'entità principale",
    charging: "Energia verso il veicolo", complete: "Puoi scollegare il veicolo",
    timer: "Il timer è attivo", updating: "Non scollegare il caricatore",
    control_pilot: "Controlla la comunicazione con il veicolo",
    load_balancing: "Controlla il bilanciamento locale", error: "Controlla la diagnostica",
    waiting_power: "In attesa dell'avvio o della potenza", wifi_connected: "Connessione ripristinata",
    wifi_connecting: "Tentativo di connessione",
  },
  badges: { paused: "In pausa", locked: "Bloccato", timer: "Timer", waiting_power: "In attesa di potenza" },
  labels: {
    now: "ora", session: "Sessione", energy: "Energia", time: "Tempo",
    intensity: "Corrente di ricarica", advanced: "Impostazioni Trydan", chargingControls: "Ricarica",
    energyControls: "Energia dinamica", lightControls: "Illuminazione",
    unavailableEntity: "Entità non disponibile", actionPending: "Modifica in corso",
    actionDone: "Modifica confermata", actionFailed: "Impossibile applicare la modifica",
    additionalStatus: "Stato aggiuntivo",
  },
  actions: {
    pause: "Pausa", resume: "Riprendi", lock: "Blocca EVSE", unlock: "Sblocca EVSE",
    timer: "Timer", dynamic: "Modulazione dinamica", pauseDynamic: "Pausa controllo dinamico",
    logoLed: "LED logo", lightLed: "Luce caricatore", chargeMode: "Modalità di ricarica",
    confirmLock: "Bloccare il caricatore V2C?",
  },
  flows: {
    solar: "Solare", grid: "Rete", home: "Casa", battery: "Batteria", charger: "Auto",
    import: "Importazione", export: "Esportazione", charge: "Ricarica", discharge: "Scarica",
    consume: "Consumo", produce: "Produzione", idle: "Inattivo", unknown: "Nessun dato",
  },
  editor: {
    entity: "Entità V2C principale", name: "Nome", location: "Posizione", language: "Lingua",
    theme: "Tema", displayMode: "Dimensione scheda", themeAuto: "Sistema / Home Assistant",
    themeLight: "Chiaro", themeDark: "Scuro", modeStandard: "Standard", modeCompact: "Compatto",
    modeUltra: "Ultra compatto", showEnergyFlow: "Flusso di energia",
    showControls: "Controlli di ricarica", showAdvanced: "Controlli avanzati",
    showCharger: "Illustrazione Trydan",
  },
});

export const de = make({
  states: {
    disconnected: "Kein Fahrzeug", unavailable: "Nicht verfügbar", charging: "Laden",
    complete: "Ladevorgang abgeschlossen", timer: "Geplantes Laden", updating: "Aktualisierung",
    control_pilot: "Control-Pilot-Fehler", load_balancing: "Lastverteilungsfehler",
    error: "Ladegerätfehler", waiting_power: "Fahrzeug verbunden",
    wifi_connected: "WLAN verbunden", wifi_connecting: "WLAN wird verbunden",
  },
  details: {
    disconnected: "Trydan bereit", unavailable: "Hauptentität prüfen", charging: "Energie fließt zum Fahrzeug",
    complete: "Fahrzeug kann getrennt werden", timer: "Timer ist aktiv",
    updating: "Ladegerät nicht trennen", control_pilot: "Fahrzeugkommunikation prüfen",
    load_balancing: "Lokale Lastverteilung prüfen", error: "Diagnose prüfen",
    waiting_power: "Warten auf Start oder Leistung", wifi_connected: "Verbindung wiederhergestellt",
    wifi_connecting: "Verbindungsversuch läuft",
  },
  badges: { paused: "Pausiert", locked: "Gesperrt", timer: "Timer", waiting_power: "Wartet auf Leistung" },
  labels: {
    now: "jetzt", session: "Sitzung", energy: "Energie", time: "Zeit", intensity: "Ladestrom",
    advanced: "Trydan-Einstellungen", chargingControls: "Laden", energyControls: "Dynamische Energie",
    lightControls: "Beleuchtung", unavailableEntity: "Entität nicht verfügbar",
    actionPending: "Änderung wird angewendet", actionDone: "Änderung bestätigt",
    actionFailed: "Änderung konnte nicht angewendet werden", additionalStatus: "Zusätzlicher Status",
  },
  actions: {
    pause: "Pausieren", resume: "Fortsetzen", lock: "EVSE sperren", unlock: "EVSE entsperren",
    timer: "Timer", dynamic: "Dynamische Regelung", pauseDynamic: "Dynamische Regelung pausieren",
    logoLed: "Logo-LED", lightLed: "Ladegerätlicht", chargeMode: "Lademodus",
    confirmLock: "V2C-Ladegerät sperren?",
  },
  flows: {
    solar: "Solar", grid: "Netz", home: "Haus", battery: "Batterie", charger: "Auto",
    import: "Bezug", export: "Einspeisung", charge: "Lädt", discharge: "Entlädt",
    consume: "Verbrauch", produce: "Erzeugung", idle: "Leerlauf", unknown: "Keine Daten",
  },
  editor: {
    entity: "Haupt-V2C-Entität", name: "Name", location: "Standort", language: "Sprache", theme: "Design",
    displayMode: "Kartengröße", themeAuto: "System / Home Assistant", themeLight: "Hell", themeDark: "Dunkel",
    modeStandard: "Standard", modeCompact: "Kompakt", modeUltra: "Ultrakompakt",
    showEnergyFlow: "Energiefluss", showControls: "Ladesteuerung", showAdvanced: "Erweiterte Steuerung",
    showCharger: "Trydan-Abbildung",
  },
});

export const fr = make({
  states: {
    disconnected: "Aucun véhicule", unavailable: "Indisponible", charging: "En charge",
    complete: "Charge terminée", timer: "Charge programmée", updating: "Mise à jour",
    control_pilot: "Erreur Control Pilot", load_balancing: "Erreur d'équilibrage de charge",
    error: "Erreur du chargeur", waiting_power: "Véhicule connecté",
    wifi_connected: "Wi-Fi connecté", wifi_connecting: "Connexion Wi-Fi",
  },
  details: {
    disconnected: "Trydan prêt", unavailable: "Vérifiez l'entité principale",
    charging: "Énergie vers le véhicule", complete: "Vous pouvez débrancher le véhicule",
    timer: "Le minuteur est actif", updating: "Ne débranchez pas le chargeur",
    control_pilot: "Vérifiez la communication avec le véhicule",
    load_balancing: "Vérifiez l'équilibrage local", error: "Vérifiez le diagnostic",
    waiting_power: "En attente du démarrage ou de puissance", wifi_connected: "Connexion rétablie",
    wifi_connecting: "Tentative de connexion",
  },
  badges: { paused: "En pause", locked: "Verrouillé", timer: "Minuteur", waiting_power: "En attente de puissance" },
  labels: {
    now: "maintenant", session: "Session", energy: "Énergie", time: "Temps", intensity: "Courant de charge",
    advanced: "Réglages Trydan", chargingControls: "Charge", energyControls: "Énergie dynamique",
    lightControls: "Éclairage", unavailableEntity: "Entité indisponible",
    actionPending: "Modification en cours", actionDone: "Modification confirmée",
    actionFailed: "Impossible d'appliquer la modification", additionalStatus: "État supplémentaire",
  },
  actions: {
    pause: "Mettre en pause", resume: "Reprendre", lock: "Verrouiller l'EVSE", unlock: "Déverrouiller l'EVSE",
    timer: "Minuteur", dynamic: "Modulation dynamique", pauseDynamic: "Suspendre le contrôle dynamique",
    logoLed: "LED du logo", lightLed: "Éclairage du chargeur", chargeMode: "Mode de charge",
    confirmLock: "Verrouiller le chargeur V2C ?",
  },
  flows: {
    solar: "Solaire", grid: "Réseau", home: "Maison", battery: "Batterie", charger: "Voiture",
    import: "Importation", export: "Exportation", charge: "Charge", discharge: "Décharge",
    consume: "Consommation", produce: "Production", idle: "Au repos", unknown: "Aucune donnée",
  },
  editor: {
    entity: "Entité V2C principale", name: "Nom", location: "Emplacement", language: "Langue", theme: "Thème",
    displayMode: "Taille de la carte", themeAuto: "Système / Home Assistant", themeLight: "Clair", themeDark: "Sombre",
    modeStandard: "Standard", modeCompact: "Compact", modeUltra: "Ultra compact",
    showEnergyFlow: "Flux d'énergie", showControls: "Commandes de charge", showAdvanced: "Commandes avancées",
    showCharger: "Illustration Trydan",
  },
});

export const nl = make({
  states: {
    disconnected: "Geen voertuig", unavailable: "Niet beschikbaar", charging: "Bezig met laden",
    complete: "Laden voltooid", timer: "Gepland laden", updating: "Bijwerken",
    control_pilot: "Control Pilot-fout", load_balancing: "Load Balancing-fout",
    error: "Laderfout", waiting_power: "Voertuig verbonden",
    wifi_connected: "Wi-Fi verbonden", wifi_connecting: "Wi-Fi verbinden",
  },
  details: {
    disconnected: "Trydan gereed", unavailable: "Controleer de hoofdentiteit", charging: "Energie naar het voertuig",
    complete: "Je kunt het voertuig loskoppelen", timer: "De timer is actief",
    updating: "Koppel de lader niet los", control_pilot: "Controleer de voertuigcommunicatie",
    load_balancing: "Controleer lokale load balancing", error: "Controleer de diagnose",
    waiting_power: "Wachten op start of vermogen", wifi_connected: "Verbinding hersteld",
    wifi_connecting: "Verbinding wordt geprobeerd",
  },
  badges: { paused: "Gepauzeerd", locked: "Vergrendeld", timer: "Timer", waiting_power: "Wacht op vermogen" },
  labels: {
    now: "nu", session: "Sessie", energy: "Energie", time: "Tijd", intensity: "Laadstroom",
    advanced: "Trydan-instellingen", chargingControls: "Laden", energyControls: "Dynamische energie",
    lightControls: "Verlichting", unavailableEntity: "Entiteit niet beschikbaar",
    actionPending: "Wijziging toepassen", actionDone: "Wijziging bevestigd",
    actionFailed: "Wijziging kon niet worden toegepast", additionalStatus: "Aanvullende status",
  },
  actions: {
    pause: "Pauzeren", resume: "Hervatten", lock: "EVSE vergrendelen", unlock: "EVSE ontgrendelen",
    timer: "Timer", dynamic: "Dynamische modulatie", pauseDynamic: "Dynamische regeling pauzeren",
    logoLed: "Logo-led", lightLed: "Laderverlichting", chargeMode: "Laadmodus",
    confirmLock: "V2C-lader vergrendelen?",
  },
  flows: {
    solar: "Zon", grid: "Net", home: "Huis", battery: "Batterij", charger: "Auto",
    import: "Import", export: "Export", charge: "Laden", discharge: "Ontladen",
    consume: "Verbruik", produce: "Productie", idle: "In rust", unknown: "Geen gegevens",
  },
  editor: {
    entity: "Hoofd-V2C-entiteit", name: "Naam", location: "Locatie", language: "Taal", theme: "Thema",
    displayMode: "Kaartgrootte", themeAuto: "Systeem / Home Assistant", themeLight: "Licht", themeDark: "Donker",
    modeStandard: "Standaard", modeCompact: "Compact", modeUltra: "Ultracompact",
    showEnergyFlow: "Energiestroom", showControls: "Laadbediening", showAdvanced: "Geavanceerde bediening",
    showCharger: "Trydan-afbeelding",
  },
});

export const sv = make({
  states: {
    disconnected: "Inget fordon", unavailable: "Inte tillgänglig", charging: "Laddar",
    complete: "Laddning klar", timer: "Schemalagd laddning", updating: "Uppdaterar",
    control_pilot: "Control Pilot-fel", load_balancing: "Lastbalanseringsfel",
    error: "Laddarfel", waiting_power: "Fordon anslutet",
    wifi_connected: "Wi-Fi anslutet", wifi_connecting: "Ansluter Wi-Fi",
  },
  details: {
    disconnected: "Trydan redo", unavailable: "Kontrollera huvudenheten", charging: "Energi till fordonet",
    complete: "Du kan koppla från fordonet", timer: "Timern är aktiv", updating: "Koppla inte från laddaren",
    control_pilot: "Kontrollera fordonskommunikationen", load_balancing: "Kontrollera lokal lastbalansering",
    error: "Kontrollera diagnostiken", waiting_power: "Väntar på start eller effekt",
    wifi_connected: "Anslutning återställd", wifi_connecting: "Försöker ansluta",
  },
  badges: { paused: "Pausad", locked: "Låst", timer: "Timer", waiting_power: "Väntar på effekt" },
  labels: {
    now: "nu", session: "Session", energy: "Energi", time: "Tid", intensity: "Laddström",
    advanced: "Trydan-inställningar", chargingControls: "Laddning", energyControls: "Dynamisk energi",
    lightControls: "Belysning", unavailableEntity: "Entiteten är inte tillgänglig",
    actionPending: "Tillämpar ändring", actionDone: "Ändring bekräftad",
    actionFailed: "Ändringen kunde inte tillämpas", additionalStatus: "Ytterligare status",
  },
  actions: {
    pause: "Pausa", resume: "Fortsätt", lock: "Lås EVSE", unlock: "Lås upp EVSE", timer: "Timer",
    dynamic: "Dynamisk modulering", pauseDynamic: "Pausa dynamisk styrning", logoLed: "Logotyp-LED",
    lightLed: "Laddarbelysning", chargeMode: "Laddningsläge", confirmLock: "Låsa V2C-laddaren?",
  },
  flows: {
    solar: "Sol", grid: "Elnät", home: "Hem", battery: "Batteri", charger: "Bil",
    import: "Import", export: "Export", charge: "Laddar", discharge: "Urladdning",
    consume: "Förbrukning", produce: "Produktion", idle: "Viloläge", unknown: "Ingen data",
  },
  editor: {
    entity: "Primär V2C-entitet", name: "Namn", location: "Plats", language: "Språk", theme: "Tema",
    displayMode: "Kortstorlek", themeAuto: "System / Home Assistant", themeLight: "Ljust", themeDark: "Mörkt",
    modeStandard: "Standard", modeCompact: "Kompakt", modeUltra: "Ultrakompakt",
    showEnergyFlow: "Energiflöde", showControls: "Laddningskontroller", showAdvanced: "Avancerade kontroller",
    showCharger: "Trydan-illustration",
  },
});

export const da = make({
  states: {
    disconnected: "Intet køretøj", unavailable: "Ikke tilgængelig", charging: "Oplader",
    complete: "Opladning fuldført", timer: "Planlagt opladning", updating: "Opdaterer",
    control_pilot: "Control Pilot-fejl", load_balancing: "Belastningsbalanceringsfejl",
    error: "Opladerfejl", waiting_power: "Køretøj tilsluttet",
    wifi_connected: "Wi-Fi tilsluttet", wifi_connecting: "Tilslutter Wi-Fi",
  },
  details: {
    disconnected: "Trydan klar", unavailable: "Kontrollér hovedenheden", charging: "Energi til køretøjet",
    complete: "Du kan frakoble køretøjet", timer: "Timeren er aktiv", updating: "Frakobl ikke opladeren",
    control_pilot: "Kontrollér kommunikationen med køretøjet", load_balancing: "Kontrollér lokal belastningsbalancering",
    error: "Kontrollér diagnosticeringen", waiting_power: "Venter på start eller effekt",
    wifi_connected: "Forbindelse genoprettet", wifi_connecting: "Forsøger at oprette forbindelse",
  },
  badges: { paused: "Sat på pause", locked: "Låst", timer: "Timer", waiting_power: "Venter på effekt" },
  labels: {
    now: "nu", session: "Session", energy: "Energi", time: "Tid", intensity: "Ladestrøm",
    advanced: "Trydan-indstillinger", chargingControls: "Opladning", energyControls: "Dynamisk energi",
    lightControls: "Belysning", unavailableEntity: "Enheden er ikke tilgængelig",
    actionPending: "Anvender ændring", actionDone: "Ændring bekræftet",
    actionFailed: "Ændringen kunne ikke anvendes", additionalStatus: "Ekstra status",
  },
  actions: {
    pause: "Pause", resume: "Fortsæt", lock: "Lås EVSE", unlock: "Lås EVSE op", timer: "Timer",
    dynamic: "Dynamisk modulering", pauseDynamic: "Sæt dynamisk styring på pause", logoLed: "Logo-LED",
    lightLed: "Opladerlys", chargeMode: "Opladningstilstand", confirmLock: "Lås V2C-opladeren?",
  },
  flows: {
    solar: "Sol", grid: "Elnet", home: "Hjem", battery: "Batteri", charger: "Bil",
    import: "Import", export: "Eksport", charge: "Oplader", discharge: "Aflader",
    consume: "Forbrug", produce: "Produktion", idle: "Inaktiv", unknown: "Ingen data",
  },
  editor: {
    entity: "Primær V2C-enhed", name: "Navn", location: "Placering", language: "Sprog", theme: "Tema",
    displayMode: "Kortstørrelse", themeAuto: "System / Home Assistant", themeLight: "Lys", themeDark: "Mørk",
    modeStandard: "Standard", modeCompact: "Kompakt", modeUltra: "Ultrakompakt",
    showEnergyFlow: "Energiflow", showControls: "Opladningskontroller", showAdvanced: "Avancerede kontroller",
    showCharger: "Trydan-illustration",
  },
});

export const no = make({
  states: {
    disconnected: "Ingen bil", unavailable: "Ikke tilgjengelig", charging: "Lader",
    complete: "Lading fullført", timer: "Planlagt lading", updating: "Oppdaterer",
    control_pilot: "Control Pilot-feil", load_balancing: "Lastbalanseringsfeil",
    error: "Laderfeil", waiting_power: "Bil tilkoblet",
    wifi_connected: "Wi-Fi tilkoblet", wifi_connecting: "Kobler til Wi-Fi",
  },
  details: {
    disconnected: "Trydan klar", unavailable: "Kontroller hovedenheten", charging: "Energi til bilen",
    complete: "Du kan koble fra bilen", timer: "Timeren er aktiv", updating: "Ikke koble fra laderen",
    control_pilot: "Kontroller kommunikasjonen med bilen", load_balancing: "Kontroller lokal lastbalansering",
    error: "Kontroller diagnostikken", waiting_power: "Venter på start eller effekt",
    wifi_connected: "Tilkobling gjenopprettet", wifi_connecting: "Prøver å koble til",
  },
  badges: { paused: "Pauset", locked: "Låst", timer: "Timer", waiting_power: "Venter på effekt" },
  labels: {
    now: "nå", session: "Økt", energy: "Energi", time: "Tid", intensity: "Ladestrøm",
    advanced: "Trydan-innstillinger", chargingControls: "Lading", energyControls: "Dynamisk energi",
    lightControls: "Belysning", unavailableEntity: "Enheten er ikke tilgjengelig",
    actionPending: "Bruker endring", actionDone: "Endring bekreftet",
    actionFailed: "Kunne ikke bruke endringen", additionalStatus: "Ekstra status",
  },
  actions: {
    pause: "Pause", resume: "Fortsett", lock: "Lås EVSE", unlock: "Lås opp EVSE", timer: "Timer",
    dynamic: "Dynamisk modulering", pauseDynamic: "Sett dynamisk styring på pause", logoLed: "Logo-LED",
    lightLed: "Laderlys", chargeMode: "Lademodus", confirmLock: "Låse V2C-laderen?",
  },
  flows: {
    solar: "Sol", grid: "Strømnett", home: "Hjem", battery: "Batteri", charger: "Bil",
    import: "Import", export: "Eksport", charge: "Lader", discharge: "Lader ut",
    consume: "Forbruk", produce: "Produksjon", idle: "Inaktiv", unknown: "Ingen data",
  },
  editor: {
    entity: "Primær V2C-enhet", name: "Navn", location: "Plassering", language: "Språk", theme: "Tema",
    displayMode: "Kortstørrelse", themeAuto: "System / Home Assistant", themeLight: "Lys", themeDark: "Mørk",
    modeStandard: "Standard", modeCompact: "Kompakt", modeUltra: "Ultrakompakt",
    showEnergyFlow: "Energiflyt", showControls: "Ladekontroller", showAdvanced: "Avanserte kontroller",
    showCharger: "Trydan-illustrasjon",
  },
});

export const ro = make({
  states: {
    disconnected: "Niciun vehicul", unavailable: "Indisponibil", charging: "Se încarcă",
    complete: "Încărcare finalizată", timer: "Încărcare programată", updating: "Se actualizează",
    control_pilot: "Eroare Control Pilot", load_balancing: "Eroare de echilibrare a sarcinii",
    error: "Eroare încărcător", waiting_power: "Vehicul conectat",
    wifi_connected: "Wi-Fi conectat", wifi_connecting: "Conectare Wi-Fi",
  },
  details: {
    disconnected: "Trydan pregătit", unavailable: "Verifică entitatea principală", charging: "Energie către vehicul",
    complete: "Poți deconecta vehiculul", timer: "Temporizatorul este activ",
    updating: "Nu deconecta încărcătorul", control_pilot: "Verifică comunicarea cu vehiculul",
    load_balancing: "Verifică echilibrarea locală", error: "Verifică diagnosticul",
    waiting_power: "Se așteaptă pornirea sau puterea", wifi_connected: "Conexiune restabilită",
    wifi_connecting: "Se încearcă conectarea",
  },
  badges: { paused: "În pauză", locked: "Blocat", timer: "Temporizator", waiting_power: "Așteaptă putere" },
  labels: {
    now: "acum", session: "Sesiune", energy: "Energie", time: "Timp", intensity: "Curent de încărcare",
    advanced: "Setări Trydan", chargingControls: "Încărcare", energyControls: "Energie dinamică",
    lightControls: "Iluminare", unavailableEntity: "Entitate indisponibilă",
    actionPending: "Se aplică modificarea", actionDone: "Modificare confirmată",
    actionFailed: "Modificarea nu a putut fi aplicată", additionalStatus: "Stare suplimentară",
  },
  actions: {
    pause: "Pauză", resume: "Continuă", lock: "Blochează EVSE", unlock: "Deblochează EVSE",
    timer: "Temporizator", dynamic: "Modulare dinamică", pauseDynamic: "Întrerupe controlul dinamic",
    logoLed: "LED siglă", lightLed: "Lumină încărcător", chargeMode: "Mod de încărcare",
    confirmLock: "Blochezi încărcătorul V2C?",
  },
  flows: {
    solar: "Solar", grid: "Rețea", home: "Casă", battery: "Baterie", charger: "Mașină",
    import: "Import", export: "Export", charge: "Încărcare", discharge: "Descărcare",
    consume: "Consum", produce: "Producție", idle: "Repaus", unknown: "Fără date",
  },
  editor: {
    entity: "Entitate V2C principală", name: "Nume", location: "Locație", language: "Limbă", theme: "Temă",
    displayMode: "Dimensiunea cardului", themeAuto: "Sistem / Home Assistant", themeLight: "Luminos", themeDark: "Întunecat",
    modeStandard: "Standard", modeCompact: "Compact", modeUltra: "Ultracompact",
    showEnergyFlow: "Flux de energie", showControls: "Comenzi de încărcare", showAdvanced: "Comenzi avansate",
    showCharger: "Ilustrație Trydan",
  },
});
