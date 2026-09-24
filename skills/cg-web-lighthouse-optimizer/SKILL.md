---
name: cg-web-lighthouse-optimizer
description: >-
  Analysiert Lighthouse-JSON-Ergebnisse für Mobile und Desktop, normalisiert
  versionsabhängige Audit-Strukturen und verbessert die betroffene Website
  direkt im Code. Priorisiert echte Performance-, Accessibility-, Best-Practice-,
  SEO- und optional Agentic-Browsing-Probleme, validiert Änderungen und vermeidet
  Score-Gaming oder funktionale Regressionen.
version: 1.0.0
---

# cg-web-lighthouse-optimizer

## Zweck

Dieser Skill nimmt Lighthouse-Testergebnisse als JSON entgegen und verwendet sie als evidenzbasierte Ausgangslage, um die betreffende Website im Repository tatsächlich zu verbessern.

Der Skill arbeitet auf zwei Ebenen:

1. **Messwertorientiert:** Er identifiziert die größten tatsächlichen Engpässe aus Scores, Metriken, Opportunities, Insights, Diagnostics und Audit-Details.
2. **Codeorientiert:** Er verfolgt diese Probleme bis zur konkreten Ursache im Projekt und behebt sie direkt im Code, in Assets, Konfigurationen oder Infrastruktur-Konfigurationen.

Der Skill optimiert nicht auf einen künstlich hohen Lighthouse-Score. Ziel ist eine technisch saubere Website mit besserer realer Nutzererfahrung, bei der Lighthouse als reproduzierbares Labormessinstrument dient.

---

# 1. Grundregeln

## 1.1 Mobile und Desktop sind getrennte Testbedingungen

Mobile und Desktop müssen unabhängig analysiert werden. Niemals darf ein Desktop-Ergebnis als Ersatz für Mobile interpretiert werden.

Bei widersprüchlichen Optimierungen:

- Verbesserung auf beiden Geräten bevorzugen.
- Bei rein mobilem Problem die mobile Ursache behandeln, ohne Desktop unnötig zu verschlechtern.
- Bei Desktop-spezifischem Problem analog verfahren.
- Keine pauschale Aussage treffen, dass eine Variante „besser“ ist; stattdessen konkrete Metrik- und Audit-Differenzen dokumentieren.

## 1.2 Lighthouse Score ≠ reale Nutzererfahrung

Lighthouse ist ein Labortest. Core Web Vitals werden für die reale Nutzung über Feld-/RUM-Daten bewertet, typischerweise am 75. Perzentil und nach Gerätetyp getrennt.

Deshalb:

- Lighthouse-Metriken als Diagnose- und Iterationssignal verwenden.
- Vorhandene Feld-/RUM-/CrUX-Daten nicht ignorieren.
- Laborwerte und Feldwerte nicht als identisch behandeln.
- Einen Lighthouse-Score von 100 nicht als notwendiges Ziel behandeln.

## 1.3 Score-Gaming ist verboten

Keine Änderung darf ausschließlich deshalb vorgenommen werden, weil sie einen Lighthouse-Score erhöht.

Insbesondere verboten:

- sichtbaren Content entfernen, obwohl er fachlich benötigt wird;
- Inhalte nur verstecken, damit Lighthouse sie nicht prüft;
- LCP-Bilder künstlich aus dem Dokument entfernen;
- wichtige Bilder pauschal lazy-loaden;
- alle Ressourcen pauschal preloaden;
- `display:none`, `visibility:hidden`, 0x0-Flächen oder ähnliche Tricks für Audit-Umgehung verwenden;
- Accessibility durch Entfernen interaktiver Elemente „verbessern“;
- SEO durch Keyword-Stuffing, manipulierte Metadaten oder irrelevante Inhalte beeinflussen;
- sinnvolle Drittanbieter-Funktionen nur für den Score entfernen, ohne deren Business-Zweck zu prüfen.

## 1.4 Funktionalität und Design erhalten

Die Website muss nach Änderungen weiterhin:

- funktional korrekt,
- responsive,
- visuell konsistent,
- semantisch korrekt,
- barrierearm,
- SEO-fähig

bleiben.

Vorhandene Brand- und Designentscheidungen dürfen nicht ohne technische Notwendigkeit verändert werden.

## 1.5 Versionsrobust arbeiten

Lighthouse-Audit-IDs verändern sich über Major-Releases. Besonders seit Lighthouse 13 wurden zahlreiche ältere Performance-Audits in gemeinsame Performance Insights konsolidiert.

Deshalb gilt:

- niemals ausschließlich nach einem einzelnen Audit-Namen entscheiden;
- `lighthouseVersion` aus dem JSON auslesen;
- `categories.*.auditRefs` und die vorhandenen `audits` dynamisch verwenden;
- bei älteren und neueren Audit-IDs fachlich äquivalente Problembereiche erkennen;
- Audit-IDs, die im aktuellen Report nicht existieren, nicht künstlich „reparieren“.

---

# 2. Erwarteter Input

Der Input ist grundsätzlich ein Lighthouse Result Object (LHR) als JSON.

Der Skill muss mindestens folgende Formen robust akzeptieren:

### Form A – einzelner LHR

```json
{
  "lighthouseVersion": "13.x.x",
  "configSettings": {"formFactor": "mobile"},
  "categories": {},
  "audits": {}
}
```

### Form B – Desktop + Mobile

```json
{
  "mobile": { "lighthouseVersion": "13.x.x", "categories": {}, "audits": {} },
  "desktop": { "lighthouseVersion": "13.x.x", "categories": {}, "audits": {} }
}
```

### Form C – Array

```json
[
  { "configSettings": {"formFactor": "mobile"}, "categories": {}, "audits": {} },
  { "configSettings": {"formFactor": "desktop"}, "categories": {}, "audits": {} }
]
```

### Form D – PageSpeed-Wrapper

Wenn ein Objekt `lighthouseResult` enthält, ist dieses Objekt ebenfalls zu berücksichtigen.

### Form E – JSON-String in Codeblock

Wenn der Nutzer JSON als Text, Markdown-Codeblock oder eingebetteten String übergibt, zuerst parsen und normalisieren.

---

# 3. LHR-Normalisierung

Zuerst eine interne Normalform bilden:

```text
ReportSet
├── mobile?: NormalizedReport
├── desktop?: NormalizedReport
└── unknown?: NormalizedReport[]

NormalizedReport
├── url
├── requestedUrl
├── finalDisplayedUrl
├── lighthouseVersion
├── fetchTime
├── formFactor
├── screenEmulation
├── throttling
├── categories
├── audits
├── runtimeError
└── runWarnings
```

## FormFactor-Ermittlung

Priorität:

1. `configSettings.formFactor`
2. explizite Wrapper-Bezeichnung (`mobile`, `desktop`)
3. vorhandene Screen-/User-Agent-Hinweise
4. sonst `unknown`

Keine Geräteklasse erraten, wenn die JSON-Struktur widersprüchlich ist.

## Report-Gültigkeit

Vor der Analyse prüfen:

- `runtimeError` vorhanden?
- `runWarnings` vorhanden?
- `categories` vorhanden?
- `audits` vorhanden?
- Report eventuell unvollständig?
- unterschiedliche Lighthouse-Versionen zwischen Mobile/Desktop?
- unterschiedliche URLs?

Bei gravierenden Laufzeitfehlern den Report nicht als verlässliche Basis für konkrete Optimierungsentscheidungen behandeln.

---

# 4. Lighthouse-Datenmodell verstehen

Ein Lighthouse Result Object enthält insbesondere:

- `lighthouseVersion`
- `fetchTime`
- `requestedUrl`
- `mainDocumentUrl`
- `finalDisplayedUrl`
- `audits`
- `configSettings`
- `timing`
- `categories`
- `categoryGroups`
- `runtimeError`
- `runWarnings`

Ein Audit kann insbesondere enthalten:

- `id`
- `title`
- `description`
- `explanation`
- `score`
- `scoreDisplayMode`
- `numericValue`
- `displayValue`
- `details`
- `warnings`
- `errorMessage`

Wichtig:

- `score = null` bedeutet nicht automatisch „Fehler“.
- Bei `manual`, `informative`, `notApplicable` oder `error` ist der Score nicht wie ein normaler 0–1-Auditwert zu behandeln.
- `details` können tabellarische, node-, opportunity-, metric-, debug- oder treemapartige Informationen enthalten.
- Ein Audit mit hohem Einsparpotenzial ist nicht automatisch wichtiger als ein Core-Metric-Problem.

---

# 5. Aktuelle Lighthouse-Systematik

Der Skill muss grundsätzlich mit der aktuellen Lighthouse-Konfiguration arbeiten und historische Unterschiede erkennen.

In der aktuellen Lighthouse-Hauptkonfiguration besteht der Performance-Score aus:

| Metrik | Gewicht |
|---|---:|
| First Contentful Paint (FCP) | 10 % |
| Largest Contentful Paint (LCP) | 25 % |
| Total Blocking Time (TBT) | 30 % |
| Cumulative Layout Shift (CLS) | 25 % |
| Speed Index (SI) | 10 % |
| Interaction to Next Paint (INP) | 0 % Score-Gewicht, aber diagnostisch relevant |

Nie alte Lighthouse-Gewichtungen auf einen neueren Report anwenden.

Wenn `categories.performance.auditRefs` im Report vorhanden ist, haben diese Gewichte Vorrang vor hart codierten historischen Tabellen.

---

# 6. Core Web Vitals und technische Zielgrößen

Für reale Core Web Vitals gelten als „gut“ am 75. Perzentil:

- LCP ≤ 2,5 s
- INP ≤ 200 ms
- CLS ≤ 0,1

Als „schlecht“ gelten:

- LCP > 4,0 s
- INP > 500 ms
- CLS > 0,25

Der Skill darf diese Feldgrenzen nicht mit den geräteabhängigen Lighthouse-Lab-Schwellen gleichsetzen.

Für Lighthouse selbst können Desktop und Mobile unterschiedliche Score-Kurven und Interpretationen verwenden.

Beispiele aus der etablierten Lighthouse-Semantik:

- Mobile LCP: ca. ≤ 2,5 s gut, > 4 s schlecht.
- Desktop LCP: Lighthouse verwendet eine strengere Laboreinordnung.
- Mobile TBT: ca. 0–200 ms grün, 200–600 ms orange, > 600 ms rot.
- Desktop TBT: ca. 0–150 ms grün, 150–350 ms orange, > 350 ms rot.

Bei der konkreten Optimierung immer die Werte des tatsächlichen Reports priorisieren und nicht nur Grenzwerte betrachten.

---

# 7. Priorisierungsmodell

Der Skill erstellt aus allen relevanten Audit- und Metrikbefunden eine Prioritätenliste.

## 7.1 Primäre Faktoren

Jede mögliche Maßnahme wird nach folgenden Dimensionen bewertet:

1. **Metrik-Relevanz**
   - LCP
   - TBT
   - CLS
   - FCP
   - SI
   - INP

2. **Score-Gewicht**
   - tatsächliches `auditRef.weight` verwenden, wenn vorhanden;
   - ansonsten fachliche Relevanz berücksichtigen.

3. **Konkrete Verschwendung / Einsparpotenzial**
   - `numericValue`
   - `details.overallSavingsMs`
   - `details.overallSavingsBytes`
   - `wastedBytes`
   - `wastedMs`
   - Anzahl betroffener Ressourcen oder Nodes.

4. **Gerätebreite**
   - nur Mobile
   - nur Desktop
   - beide

5. **Root-Cause-Reichweite**
   - ein lokaler Fix;
   - ein globaler Fix für viele Seiten/Komponenten;
   - Architektur-/Build-/Serverproblem.

6. **Umsetzungsrisiko**
   - niedrig: klarer, lokaler, reversibler Fix;
   - mittel: mehrere Abhängigkeiten;
   - hoch: Architektur, Rendering, Hosting, Datenzugriff oder Business-Funktionalität.

## 7.2 Prioritätsformel

Intern kann ein Prioritätssignal verwendet werden:

```text
priority =
  metric_impact
  × audit_weight
  × savings_signal
  × device_breadth
  × root_cause_leverage
  ÷ implementation_risk
```

Das ist ein internes Arbeitsmodell, kein veröffentlichter Lighthouse-Score und darf nicht als offizieller Lighthouse-Wert dargestellt werden.

## 7.3 Reihenfolge der Umsetzung

Typischerweise:

1. Laufzeit-/Build-Blocker und offensichtliche Regressionen
2. LCP-Blocker
3. TBT-/Main-Thread-/JS-Probleme
4. CLS-Ursachen
5. FCP/SI/Render-Blocking
6. Bild-/Font-/Caching-/Payload-Optimierungen
7. Drittanbieter-Ressourcen
8. Accessibility-Fehler
9. Best Practices / Security / Browser-Kompatibilität
10. SEO-Basisprobleme
11. Low-impact Optimierungen

Die Reihenfolge darf durch konkrete Reportdaten überschrieben werden.

---

# 8. Performance-Analyse

## 8.1 LCP

Wenn LCP schlecht ist, zuerst das tatsächliche LCP-Element bestimmen.

Nutze bevorzugt:

- `largest-contentful-paint`
- `largest-contentful-paint-element`
- `lcp-breakdown-insight`
- `lcp-discovery-insight`
- `prioritize-lcp-image` bei älteren Reports, falls vorhanden
- `details`-Informationen zum LCP-Node

Untersuche die vier LCP-Phasen, soweit der Report sie liefert:

1. TTFB / Server Response
2. Resource Load Delay
3. Resource Load Duration
4. Element Render Delay

### Typische LCP-Ursachen

- Hero-Bild zu groß
- Hero-Bild in modernem Format fehlt
- LCP-Bild wird fälschlicherweise lazy geladen
- LCP-Bild hat niedrige Fetch Priority
- LCP-Ressource wird erst spät im DOM/CSS entdeckt
- render-blockierendes CSS/JS
- langsame Serverantwort
- unnötige Redirects
- schwere Client-Hydration
- Webfont blockiert sichtbaren Text
- LCP-Element entsteht erst durch JavaScript

### Maßnahmen

Je nach tatsächlicher Ursache:

```html
<img
  src="/hero.webp"
  width="1600"
  height="900"
  fetchpriority="high"
  alt="..."
/>
```

Bei React/Next.js das Framework-Äquivalent verwenden, sofern vorhanden.

LCP-Bilder grundsätzlich nicht automatisch `loading="lazy"` geben.

Preload nur dann nutzen, wenn die Ressource tatsächlich kritisch ist und früh benötigt wird.

Nicht mehrere Hero-Bilder, Fonts und Scripts pauschal preloaden.

---

## 8.2 FCP

FCP misst, wann erstmals relevanter sichtbarer Content gerendert wird.

Typische Hebel:

- Render-Blocking CSS reduzieren
- nicht notwendiges JS aus dem Critical Path entfernen
- Serverantwort beschleunigen
- unnötige Redirects vermeiden
- Critical CSS sinnvoll strukturieren
- Fonts richtig laden
- HTML-Payload klein halten
- überdimensionierte Above-the-Fold-Ressourcen vermeiden

---

## 8.3 TBT / Main Thread

TBT ist in aktuellen Lighthouse-Performance-Scores stark gewichtet. Deshalb besonders ernst nehmen.

Analysiere:

- `total-blocking-time`
- `bootup-time`
- `mainthread-work-breakdown`
- `main-thread-tasks`
- `long-tasks`
- `unused-javascript`
- `duplicated-javascript`
- `legacy-javascript`
- `third-party-summary`
- `script-treemap-data`

### Typische Ursachen

- große JS-Bundles
- unnötige Client Components
- schwere Bibliotheken
- unnötige Polyfills
- Third-Party Scripts
- große Hydration
- lange Event Handler
- große JSON-Verarbeitung auf dem Main Thread
- komplexe DOM-Manipulation
- synchrones Initialisieren nicht-kritischer Features

### Maßnahmen

- Code Splitting
- Dynamic Imports
- Tree Shaking
- Server Rendering statt unnötigem Client Rendering
- Third-Party Scripts verzögern
- Event Handler vereinfachen
- lange Tasks aufteilen
- schwere Berechnungen in Worker verschieben, falls fachlich sinnvoll
- unnötige Libraries entfernen
- polyfill-last vermeiden
- große Interaktive Module erst bei Bedarf laden

Nicht blind jedes Script `async` setzen. Abhängigkeiten und Ausführungsreihenfolge prüfen.

---

# 9. INP

INP wird im modernen Lighthouse-Stack separat gemessen und ist trotz Score-Gewicht 0 ein wichtiger UX-Messwert.

Analysiere:

- `interaction-to-next-paint`
- `work-during-interaction`
- `inp-breakdown-insight`
- Long Tasks
- Event Handler
- Rendering/Painting

INP besteht fachlich aus:

1. Input Delay
2. Processing Duration
3. Presentation Delay

Optimierungsstrategien:

- weniger Arbeit im Event Handler;
- nicht kritische Arbeit verschieben;
- lange Tasks aufteilen;
- DOM-Größe und komplexe Layout-/Style-Neuberechnungen reduzieren;
- schwere Berechnungen an Worker auslagern;
- Rendering nach dem UI-kritischen Teil ermöglichen;
- keine unnötige Synchronisierung mehrerer UI-Updates.

Nicht nur auf „JS reduzieren“ fokussieren: Auch Layout/Paint kann Interaktionen verlangsamen.

---

# 10. CLS

Analysiere:

- `cumulative-layout-shift`
- `layout-shifts`
- `cls-culprits-insight`
- `unsized-images`
- `image-aspect-ratio`
- dynamisch injizierte Inhalte
- Fonts

### Häufige Ursachen

- Bilder ohne feste Dimensionen
- Videos/iframes ohne reservierten Platz
- dynamisch eingefügte Banner
- Cookie-Banner / Consent UI ohne Layout-Strategie
- Webfonts ändern Textdimensionen
- nachträglich geladene Komponenten
- Animationen, die Layout-Properties verändern

### Maßnahmen

Bilder und Videos immer mit deterministischer Größe bzw. `aspect-ratio` versehen.

```css
.media {
  aspect-ratio: 16 / 9;
}
```

Oder bei Bildern echte `width`/`height`-Informationen ausgeben.

Keine sichtbaren Bereiche nach dem Initial Layout unvermittelt in ihrer Größe ändern.

Animationen bevorzugt mit `transform` und `opacity` statt `top`, `left`, `width`, `height`, wenn das Ergebnis fachlich passt.

---

# 11. Bilder

Bilder sind ein zentraler Performance-Hebel.

Prüfen:

- korrekte Dimensionen
- responsive Varianten
- moderne Formate
- Kompression
- Lazy Loading nur unterhalb des initialen Viewports
- LCP-Priorisierung
- unnötige Originalgrößen
- CSS Background Images vs. `<img>`/`<picture>`
- Art Direction, wenn Desktop und Mobile unterschiedliche Motive benötigen

### Moderne Formate

Bevorzugt:

- AVIF, wenn Browser-/Pipeline-Support passt;
- WebP als breit unterstützte Alternative;
- SVG für geeignete Vektor-Grafiken;
- JPEG/PNG als sinnvolle Fallbacks.

Nicht jede Grafik blind nach AVIF konvertieren. Qualität, Transparenz, Dekodierzeit, Browser-Kompatibilität und tatsächlichen Bytegewinn prüfen.

### Responsive Images

Typisches Muster:

```html
<img
  src="/image-1080.webp"
  srcset="/image-480.webp 480w, /image-800.webp 800w, /image-1080.webp 1080w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1080"
  height="720"
  alt="..."
/>
```

Bei einem Framework dessen Image-Pipeline responsive Varianten automatisch erzeugt, diese bevorzugen.

### Lazy Loading

- Above-the-fold und LCP: nicht lazy laden.
- Offscreen-Bilder: `loading="lazy"` erwägen.
- Keine globale Regel anwenden, die das LCP-Bild ebenfalls lazy macht.

---

# 12. Fonts

Fonts können FCP, LCP, CLS und visuelle Stabilität beeinflussen.

Prüfen:

- Anzahl der Fonts
- Varianten / Weights
- woff2 statt älterer Formate
- Subsetting
- `font-display`
- Fallback-Font
- `size-adjust`
- `ascent-override`
- `descent-override`
- `line-gap-override`
- Preload nur für tatsächlich kritische Fonts
- Cache-Control

Keine Font-Preloads für 6 oder 10 Varianten hinzufügen, wenn nur ein Schnitt initial benötigt wird.

Bei systemnahen Designs ist ein Systemfont gegebenenfalls schneller als eine externe Webfont.

---

# 13. Render-Blocking Resources

Analysiere:

- `render-blocking-resources`
- `render-blocking-insight`
- CSS im `<head>`
- Sync-Scripts im `<head>`

Strategien:

- nicht kritisches JS `defer` / framework-konformes Deferred Loading;
- nicht notwendiges CSS reduzieren oder später laden;
- kritisches, kleines CSS gegebenenfalls inline;
- unnötige Stylesheets entfernen;
- media-spezifische Styles nur bei echtem Bedarf laden.

Inlining ist eine fortgeschrittene Technik und nicht automatisch besser.

---

# 14. Server, TTFB und Caching

Analysiere:

- `server-response-time`
- `document-latency-insight`
- `network-server-latency`
- `redirects`
- `uses-long-cache-ttl` / `cache-insight`
- Hosting-/CDN-Konfiguration

Typische Ursachen für schlechten TTFB:

- langsame Serverlogik
- Datenbankabfragen
- fehlendes Caching
- unnötige Middleware
- Serverless Cold Starts
- weit entfernter Origin
- Redirect-Ketten
- fehlendes CDN

Für statische versionierte Assets:

```http
Cache-Control: public, max-age=31536000, immutable
```

Nur verwenden, wenn die URL versioniert/fingerprinted ist und Inhalte tatsächlich unveränderlich unter dieser URL sind.

HTML und personalisierte Inhalte nicht blind mit einjährigem Cache versehen.

---

# 15. Kompression und Payload

Prüfen:

- Brotli / gzip / zstd je nach Infrastruktur und Support
- HTML/JS/CSS Kompression
- große JSON-Responses
- unnötige Fonts
- Bilder
- Videos
- große Third-Party Ressourcen

Lighthouse-„Bytes“ immer differenziert betrachten:

- transfer size
- uncompressed execution cost
- CPU cost
- parse/compile cost

Eine kleine komprimierte JS-Datei kann nach Dekompression trotzdem hohe CPU-Kosten verursachen.

---

# 16. Drittanbieter

Third-Party Ressourcen separat analysieren:

- Analytics
- Tag Manager
- Maps
- Chat
- Videos
- Social Embeds
- Consent Management
- Tracking
- A/B Testing
- externe Fonts

Für jeden Drittanbieter prüfen:

1. Business-/Funktionszweck
2. tatsächlicher Performancebeitrag
3. ob initial notwendig
4. ob nach Consent geladen werden kann
5. ob lazy/interaction-triggered geladen werden kann
6. ob es einen leichteren Anbieter oder eine native Alternative gibt

Nicht einfach löschen, wenn das Feature geschäftlich erforderlich ist.

---

# 17. Accessibility

Lighthouse Accessibility basiert auf automatisierten Prüfungen, deckt aber nicht die gesamte Barrierefreiheit ab.

Deshalb:

- automatische Fehler beheben;
- `manual` Audits als manuelle Prüfaufträge markieren;
- keine Aussage treffen, die Website sei vollständig barrierefrei, nur weil Lighthouse 100 meldet.

Typische Bereiche:

- zugängliche Namen von Buttons/Links
- `alt`-Texte
- Form Labels
- Heading-Struktur
- `lang`
- Kontrast
- Tastaturbedienung
- Fokuszustände
- Skip Link
- ARIA-Semantik
- Touch Target Size
- Dialog-/Modal-Fokus
- echte semantische HTML-Elemente

Bevorzugt:

```html
<button type="button">Menü öffnen</button>
```

statt eines klickbaren `<div>` mit nachgebautem Verhalten.

ARIA nur verwenden, wenn native Semantik nicht ausreicht.

---

# 18. Best Practices / Security

Je nach Lighthouse-Version können Audits variieren.

Besonders beachten:

- HTTPS
- Redirect-Probleme
- Console Errors
- Inspector Issues
- veraltete APIs
- Third-Party Cookies
- CSP
- HSTS
- Clickjacking-Mitigation
- Origin Isolation, wenn fachlich sinnvoll
- Trusted Types, wenn fachlich sinnvoll
- Doctype
- Charset
- Browser-Kompatibilität
- Bilddimensionen

Security-Hardening darf nicht blind in einer Weise erfolgen, die bestehende Funktionalität bricht.

Bei Header-/CSP-/Cookie-Änderungen immer Abhängigkeiten identifizieren.

---

# 19. SEO

Lighthouse SEO ist eine Basisprüfung, keine vollständige SEO-Prüfung.

Typische Lighthouse-Bereiche:

- Crawlability
- document title
- meta description
- HTTP status
- crawlable anchors
- link text
- robots.txt
- hreflang
- canonical
- image alt
- mobile-freundliche Darstellung

Zusätzlich prüfen, sofern das Repository dies erlaubt:

- Sitemap
- robots.txt
- Canonicals
- OpenGraph / social metadata
- strukturierte Daten
- saubere URLs
- interne Verlinkung
- semantische HTML-Struktur
- Indexierbarkeit von Rendering/JS

Structured Data nicht mit dem Lighthouse SEO-Score verwechseln: Die entsprechende Prüfung kann manuell bzw. außerhalb der Score-Berechnung stattfinden.

---

# 20. Agentic Browsing / aktuelle Lighthouse-Erweiterungen

Neuere Lighthouse-Versionen enthalten eine Kategorie für Agentic Browsing. Eine frühere PWA-Kategorie ist dagegen nicht mehr als aktuelle Standardkategorie zu behandeln.

Wenn im JSON vorhanden:

- `agentic-browsing`
- `agent-accessibility-tree`
- `llms-txt`
- `ard-schema`
- WebMCP-Audits

nicht ignorieren.

Diese Kategorie ist versionsabhängig und befindet sich im Wandel.

Der Skill muss sie deshalb dynamisch analysieren und darf nicht davon ausgehen, dass alle Projekte diese Anforderungen benötigen.

Wenn Probleme vorhanden sind, konkrete technische Ursachen beheben, z. B.:

- zugängliche semantische DOM-Struktur;
- maschinenlesbare Inhalte;
- korrekte deklarative Form-/Tool-Strukturen;
- vorhandene und konsistente Discovery-Dateien, falls bewusst eingesetzt;
- gültige WebMCP-Integration, falls das Projekt WebMCP verwendet.

---

# 21. Framework-Erkennung

Vor Änderungen Stack erkennen.

Prüfen mindestens:

- `package.json`
- Lockfile
- Framework-Konfiguration
- Build-Konfiguration
- Routing
- Components
- Asset-Pipeline
- Deployment-/Hosting-Konfiguration

Erkennen u. a.:

- Next.js
- React / Vite
- Astro
- SvelteKit
- Nuxt / Vue
- WordPress / PHP
- statisches HTML/CSS/JS
- andere Frameworks

Keine Framework-Konvention erfinden.

---

# 22. Next.js-spezifische Strategien

Wenn Next.js erkannt wird, bevorzugt die nativen Mechanismen nutzen.

Prüfen:

- Server Components vs. Client Components
- unnötiges `"use client"`
- `next/image`
- `next/font`
- dynamische Imports
- `next/script`-Ladestrategien
- Metadata API
- route-level code splitting
- Static Generation / ISR / Cache
- `headers()` / Cache-Control
- Middleware
- große Client Bundles
- Hydration
- externe Libraries

Typische Fixes:

- interaktive Inseln kleiner machen;
- Client Components weiter nach unten verschieben;
- schwere Module dynamisch laden;
- Third-Party Scripts nicht im Critical Path laden;
- Hero-Bild über `priority`/passende Fetch-Priority-Mechanismen priorisieren, wenn das verwendete Next.js-Release dies verlangt;
- `sizes` korrekt setzen;
- Fonts über `next/font` statt externe Runtime-Requests, sofern möglich;
- Metadaten serverseitig ausgeben.

Die genaue API an die installierte Next.js-Version anpassen.

---

# 23. Vite/React-spezifische Strategien

Prüfen:

- Bundle Analyzer
- dynamic imports
- route-level splitting
- manual chunks nur mit Begründung
- Tree Shaking
- CommonJS-Abhängigkeiten
- große Utility-Libraries
- globale Client-State-Libraries
- eager Imports

Keine aggressive Chunk-Konfiguration hinzufügen, ohne Build-Output zu prüfen.

---

# 24. Asset- und Medienanalyse

Bei Performance-Problemen Dateisystem nach folgenden Mustern untersuchen:

```text
*.png
*.jpg
*.jpeg
*.webp
*.avif
*.gif
*.svg
*.woff
*.woff2
*.mp4
*.webm
```

Für große Assets:

- Dateigröße
- reale Darstellungsgröße
- Einsatzort
- Above-the-fold oder Offscreen
- wiederverwendbar oder einmalig
- Format
- Kompression
- responsive Varianten

Nicht pauschal jedes Video ersetzen. Prüfen, ob das Video UX-kritisch ist und welche Lade-/Poster-Strategie sinnvoll ist.

---

# 25. Umgang mit Lighthouse-Details

Audit-Details sind häufig wichtiger als der Audit-Titel.

Wenn vorhanden, extrahiere insbesondere:

- `overallSavingsMs`
- `overallSavingsBytes`
- `wastedMs`
- `wastedBytes`
- `items`
- `headings`
- `nodes`
- `url`
- `source`
- `entity`
- `timing`
- `debugData`
- `summary`

Bei Tabellen-/Node-Audits konkrete betroffene Dateien/URLs/Elemente identifizieren.

Beispiel:

```json
{
  "details": {
    "type": "table",
    "items": [
      {
        "url": "https://example.com/app.js",
        "wastedBytes": 120000
      }
    ]
  }
}
```

Daraus nicht nur „JavaScript reduzieren“ ableiten, sondern im Repository die konkrete Abhängigkeit bzw. den Bundle-Verursacher finden.

---

# 26. Stale Audit IDs und Lighthouse 13+

Wenn ein neuer Report z. B. Insights wie folgende enthält, fachlich darauf reagieren:

- `render-blocking-insight`
- `lcp-discovery-insight`
- `lcp-breakdown-insight`
- `image-delivery-insight`
- `network-dependency-tree-insight`
- `third-parties-insight`
- `cache-insight`
- `font-display-insight`
- `work-during-interaction`

Bei älteren Reports können stattdessen auditbasierte IDs auftauchen.

Beispielsweise wurden seit Lighthouse 13 mehrere ältere Performance-Audits in gemeinsame Insights überführt. Der Skill muss semantisch mappen, nicht blind nach String-Matches arbeiten.

---

# 27. Semantische Audit-Mapping-Tabelle

Diese Tabelle dient als Fallback, wenn der Report unterschiedliche Lighthouse-Versionen verwendet.

| Themenbereich | Historische / ältere Audit-ID(s) | Lighthouse-13+-Hinweis / neue Zuordnung |
|---|---|---|
| Render Blocking | `render-blocking-resources`, `render-blocking-insight` | aktueller Kernhinweis rund um Render-Blocking; Report-Struktur prüfen |
| LCP Discovery / Priority | `lcp-discovery-insight` | `prioritize-lcp-image` |
| LCP Lazy Loading | `lcp-lazy-loaded` | in die neuere LCP-/Image-Priorisierungslogik konsolidiert |
| LCP Phasen / Element | `lcp-phases-insight` | `largest-contentful-paint-element` |
| Image Delivery | `image-delivery-insight`, `uses-optimized-images`, `uses-responsive-images`, `efficient-animated-content` | `modern-image-formats` sowie aktuelle Image-Delivery-Struktur |
| Preconnect | `uses-rel-preconnect` | in neuere Netzwerk-/Dependency-Insights integriert |
| Third Party | `third-party-summary` | `third-parties-insight` |
| Cache | `uses-long-cache-ttl`, `use-cache-insight` | `cache-insight` / `uses-long-cache-ttl` je nach Reportversion |
| Network Dependency | `critical-request-chains` | `network-dependency-tree-insight` |
| Legacy JS | `legacy-javascript` | `legacy-javascript-insight` |
| Font | `font-display` | `font-display-insight` |
| CLS | `layout-shifts` | `cls-culprits-insight` plus Layout-Shift-Details |
| INP | `interaction-to-next-paint-insight` | `work-during-interaction` plus `inp-breakdown-insight` |
| Viewport | `viewport-insight` | `viewport` |

Die Tabelle ist bewusst nicht vollständig. Der Report selbst ist die Quelle der Wahrheit.

---

# 28. Änderungskette

Für jeden priorisierten Befund diese Kette durchlaufen:

```text
Lighthouse JSON
    ↓
Audit / Metric
    ↓
Concrete evidence
    ↓
Likely root cause
    ↓
Repository file/component/config
    ↓
Minimal robust fix
    ↓
Static verification
    ↓
Build/Test/Lint
    ↓
Re-run Lighthouse if available
    ↓
Compare before/after
```

---

# 29. Vor der Implementierung

Vor Änderungen zwingend prüfen:

1. Repository-Struktur
2. Framework
3. Package Manager
4. Build-/Dev-Scripts
5. relevante Dateien
6. Assets
7. Routing
8. bestehende Performance-Optimierungen
9. Hosting-/Deployment-Konfiguration, falls relevant
10. Tests/Lint/Typecheck

Nicht blind eine gesamte Codebasis refactoren.

---

# 30. Minimal-Change-Prinzip

Pro Root Cause den kleinsten sinnvollen Fix anwenden.

Beispiele:

- einzelnes LCP-Bild → konkrete Bild-/Priority-Korrektur;
- einzelne schwere Library → gezielt ersetzen oder lazy laden;
- globale Font-Konfiguration → zentral optimieren;
- fehlende Image-Dimensionen → wiederverwendbare Komponente verbessern;
- zu viel Client JS → Rendering-Grenze sinnvoll verschieben.

Nicht aus einem Lighthouse-Hinweis einen unkontrollierten Architekturumbau machen.

---

# 31. Iteratives Vorgehen

Wenn Lighthouse erneut ausführbar ist:

1. Baseline speichern.
2. Eine zusammenhängende Root-Cause-Gruppe ändern.
3. Build/Lint/Test ausführen.
4. Lighthouse erneut ausführen.
5. Mobile und Desktop erneut vergleichen.
6. Regressionen suchen.
7. Erst dann nächsten Block ändern.

Nicht zehn unabhängige Optimierungen gleichzeitig durchführen, wenn danach keine Ursache-Wirkungs-Beziehung mehr nachvollziehbar ist.

---

# 32. Verifikation

## 32.1 Code-Verifikation

Je nach Projekt:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

Nur Befehle ausführen, die im Projekt tatsächlich existieren.

Bei fehlenden Scripts keine erfundenen Commands verwenden.

## 32.2 Lighthouse-Verifikation

Wenn CLI oder andere lokale Mittel vorhanden sind, bevorzugt echte Re-Tests durchführen.

Beispiel CLI:

```bash
lighthouse https://example.com \
  --output=json \
  --output-path=./artifacts/lighthouse-mobile.json
```

Desktop entsprechend über die vorhandene Desktop-Konfiguration/Preset-Strategie ausführen.

Wichtig: Testkonfiguration und Report-Konfiguration vergleichen. Unterschiedliche Throttling-, Device- oder Storage-Einstellungen können Werte verändern.

## 32.3 Keine falsche Präzision

Wenn kein neuer Lighthouse-Lauf möglich ist, darf der Skill nicht behaupten, die Scores seien verbessert worden.

Dann nur feststellen:

- welche Änderungen implementiert wurden;
- warum sie die betroffene Metrik wahrscheinlich verbessern;
- welche Verifikation statisch möglich war;
- dass ein erneuter Lighthouse-Lauf offen bleibt.

---

# 33. Mobile/Desktop-Differenzanalyse

Für jede zentrale Metrik eine Matrix erstellen:

| Metrik | Mobile | Desktop | Differenz | Interpretation |
|---|---:|---:|---:|---|
| FCP | … | … | … | … |
| LCP | … | … | … | … |
| TBT | … | … | … | … |
| CLS | … | … | … | … |
| SI | … | … | … | … |
| INP | … | … | … | … |

Zusätzlich Kategorien:

| Kategorie | Mobile | Desktop |
|---|---:|---:|
| Performance | … | … |
| Accessibility | … | … |
| Best Practices | … | … |
| SEO | … | … |
| Agentic Browsing | … | … |

Nur tatsächlich vorhandene Kategorien anzeigen.

---

# 34. Häufige Interpretationsfehler vermeiden

## Fehler: „TBT ist schlecht, also einfach JS löschen."

Richtig:

- zuerst Long Tasks und konkrete Verursacher identifizieren;
- notwendige Interaktivität erhalten;
- Code Splitting, Deferred Loading und Architektur prüfen.

## Fehler: „LCP-Bild lazy loaden, damit weniger Bytes geladen werden."

Richtig:

- LCP ist Teil der kritischen Nutzererfahrung;
- Above-the-fold-LCP nicht lazy laden;
- stattdessen Größe/Format/Priorisierung/Entdeckung optimieren.

## Fehler: „Preload alles Kritische."

Richtig:

- Preload konkurriert um frühe Bandbreite;
- nur wirklich kritische Ressourcen preloaden.

## Fehler: „Lighthouse 100 = perfekt."

Richtig:

- Labortest ist eine Momentaufnahme;
- reale Nutzer können andere Bedingungen erleben;
- Accessibility- und SEO-Automation decken nicht alles ab.

## Fehler: „Ein Audit-Titel bestimmt die Lösung."

Richtig:

- konkrete `details` analysieren;
- Ursache im Code finden.

## Fehler: „Ein Desktop-Fix funktioniert automatisch Mobile."

Richtig:

- beide Reportsets nach jedem wesentlichen Fix prüfen.

---

# 35. Browser-/Netzwerk-/Testvariabilität

Lighthouse-Ergebnisse können schwanken, u. a. durch:

- A/B-Tests
- Ads
- CDN-/Routing-Unterschiede
- Geräteleistung
- Browser-Erweiterungen
- Serverlast
- Cache-Zustand
- externe Drittanbieter

Deshalb:

- Testbedingungen dokumentieren;
- nicht aus einer kleinen Score-Abweichung eine harte Ursache ableiten;
- bei kleinen Differenzen mehrfach testen, wenn der Kontext es erlaubt.

---

# 36. Third-Party- und Consent-Sonderfall

Wenn Cookie-Consent-/Analytics-Software die Performance beeinflusst:

- prüfen, wann das Script geladen wird;
- prüfen, ob es vor Consent wirklich notwendig ist;
- prüfen, ob Consent UI selbst CLS verursacht;
- keine Datenschutzfunktion deaktivieren, nur um den Score zu erhöhen.

Bei Cookie-Bannern insbesondere auf Layout Shift und Blocking achten.

---

# 37. Video / Animation / Motion

Wenn Animationen oder Videos Performance beeinflussen:

- GIFs gegen Video prüfen;
- `autoplay`, `muted`, `playsInline` sinnvoll einsetzen;
- Posterbild optimieren;
- nicht kritische Videos lazy laden;
- große Background-Videos nicht unkontrolliert in den Critical Path legen;
- reduzierte Motion für `prefers-reduced-motion` berücksichtigen;
- GPU-lastige Effekte sparsam einsetzen.

Nicht jede Animation entfernen: Business-/Brand-Intent erhalten.

---

# 38. DOM-Komplexität

Bei `dom-size` / DOM Size Insights:

Prüfen:

- extrem tiefe Verschachtelung
- unnötige Wrapper
- riesige Listen
- versteckte, aber gerenderte Inhalte
- unnötige duplicate nodes
- komplexe Komponentenstrukturen

Nicht einfach Inhalte entfernen. DOM vereinfachen, wo Semantik und UX erhalten bleiben.

---

# 39. CSS-Optimierung

Prüfen:

- ungenutztes CSS
- riesige globale Stylesheets
- doppelte Regeln
- unnötig komplexe Selektoren
- CSS-in-JS Runtime-Kosten
- kritische CSS-Pfade
- Animationen mit Layout-Neuberechnung

Keine pauschalen Purge-Tools einsetzen, wenn dynamische Klassen oder CMS-Inhalte dadurch brechen könnten.

---

# 40. JavaScript-Optimierung

Prüfen:

- bundle size
- transfer size
- execution time
- parse/compile
- duplicate code
- client-only dependencies
- third-party scripts
- dynamic imports
- event handlers
- long tasks

Typische Hebel:

- weniger JS senden;
- später JS laden;
- weniger JS ausführen;
- kleinere Libraries verwenden;
- serverseitig berechnen, wenn möglich;
- CSS/HTML statt JS verwenden, wenn es fachlich passt.

---

# 41. Link- und Navigation-Optimierung

Bei SEO-/Crawlability-Problemen prüfen:

- echte `<a href>` Links;
- verständliche Linktexte;
- keine reine `onClick`-Navigation ohne zugänglichen Link;
- interne Links korrekt;
- Redirects reduzieren;
- Canonical konsistent;
- HTTP Status korrekt.

---

# 42. Accessibility-Implementierungsregeln

Bei automatischen Fehlern bevorzugt folgende Reihenfolge:

1. native Semantik
2. korrektes Labeling
3. korrekte Struktur
4. ARIA nur ergänzend
5. Tastatur- und Fokusverhalten
6. visuelle Kontraste und Größen

Beispiel:

```html
<label for="email">E-Mail-Adresse</label>
<input id="email" name="email" type="email" autocomplete="email" />
```

Nicht:

```html
<input placeholder="E-Mail" />
```

wenn tatsächlich ein zugängliches Label erforderlich ist.

---

# 43. Output des Skills

Der Skill liefert nach Abschluss einen strukturierten Bericht.

## Format

```text
LIGHTHOUSE OPTIMIZATION RESULT

Reports
- Mobile: detected / missing
- Desktop: detected / missing
- Lighthouse versions: ...
- URLs: ...

Baseline
- Performance: mobile X / desktop Y
- Accessibility: mobile X / desktop Y
- Best Practices: mobile X / desktop Y
- SEO: mobile X / desktop Y

Critical findings
1. ...
2. ...
3. ...

Implemented changes
- file/path: change
- file/path: change

Validation
- Lint: pass/fail/not available
- Typecheck: pass/fail/not available
- Build: pass/fail/not available
- Lighthouse rerun: pass/fail/not available

Observed result after rerun
- Mobile: before → after
- Desktop: before → after

Remaining issues
- ...

Notes
- Lab data / field data caveats
- unresolved runtime/environment constraints
```

Keinen Gesamt-„Qualitätsscore“ erfinden.

---

# 44. Arbeitsmodus bei unvollständigem JSON

Wenn nur Scores vorhanden sind:

- Kategorie-Scores analysieren;
- Metriken analysieren, falls vorhanden;
- keine konkrete Root Cause erfinden;
- Repository nach naheliegenden technischen Ursachen untersuchen;
- nur Änderungen durchführen, die aus Code und Daten ausreichend belegt sind.

Wenn nur Audit-Titel ohne Details vorhanden sind:

- Audit semantisch interpretieren;
- vorsichtig priorisieren;
- keine angeblichen Einsparungen behaupten.

Wenn Mobile oder Desktop fehlt:

- die vorhandene Seite trotzdem optimieren;
- ausdrücklich markieren, welche Seite des Testsets fehlt;
- keinen Vergleichswert erfinden.

---

# 45. Umgang mit Widersprüchen

Wenn JSON und Code widersprechen:

Beispiel:

- Lighthouse sagt „Bild zu groß“;
- Repository verwendet bereits `next/image`.

Dann untersuchen:

- `sizes`
- tatsächliche CSS-Größe
- DPR
- URL-/Image-Loader-Konfiguration
- tatsächlich ausgelieferte Ressource

Nicht einfach `next/image` entfernen.

Ein Audit ist ein Hinweis, nicht automatisch die exakte Codeursache.

---

# 46. Infrastruktur-Fixes

Performanceprobleme können außerhalb des App-Codes liegen.

Prüfen, falls im Projekt verfügbar:

- `vercel.json`
- nginx
- Apache
- CDN-Konfiguration
- Hosting-Konfiguration
- HTTP Headers
- Compression
- Cache Rules
- Redirect Rules
- Image CDN

Nur Änderungen vornehmen, die zum tatsächlichen Deployment passen.

---

# 47. Source Maps und Production Build

Wenn Lighthouse während Production-Nutzung schlecht ist, nicht nur den Dev-Modus optimieren.

Immer unterscheiden:

- Development build
- Production build
- prerendered HTML
- runtime bundle

Performance-Bewertungen möglichst gegen den realen Production Build durchführen.

---

# 48. Security beim Optimieren

Keine Optimierung darf:

- Secrets ins Frontend bringen;
- CSP entschärfen, nur um Scripts zu erlauben;
- HTTPS abschalten;
- Authentifizierung entfernen;
- personenbezogene Daten anders exposen.

Wenn ein Security-Header mit Drittanbietern kollidiert, Ursache dokumentieren und eine minimalinvasive Lösung wählen.

---

# 49. Konkrete Entscheidungslogik

Bei jedem Audit:

```text
IF audit.score is null:
    treat according to scoreDisplayMode

IF runtimeError exists:
    validate report before optimization

IF audit is manual/informative/notApplicable:
    do not count as normal scored failure

IF audit has concrete savings:
    extract savings

IF audit concerns Core Web Vital / high-weight metric:
    raise priority

IF mobile + desktop both fail:
    prefer shared root-cause fix

IF only mobile fails:
    investigate responsive asset / JS / device constraint / mobile layout

IF only desktop fails:
    investigate desktop-specific payload / layout / asset / configuration

IF audit is version-specific:
    map by semantic domain, not only ID

IF fix could change UX/functionality:
    inspect usage before modifying

AFTER change:
    run project validation

IF Lighthouse executable:
    rerun affected device profiles

IF scores regress materially:
    inspect cause and revert or redesign the fix
```

---

# 50. Empfohlene interne Ergebnisstruktur

Der Skill sollte intern möglichst folgende Datenstruktur erzeugen:

```json
{
  "reports": {
    "mobile": {},
    "desktop": {}
  },
  "baseline": {
    "categories": {},
    "metrics": {}
  },
  "findings": [
    {
      "domain": "performance",
      "metric": "LCP",
      "auditIds": [],
      "devices": ["mobile", "desktop"],
      "evidence": [],
      "rootCauseHypothesis": "",
      "priority": "critical",
      "implementationRisk": "low"
    }
  ],
  "changes": [],
  "validation": {},
  "remainingIssues": []
}
```

---

# 51. Definition of Done

Der Skill gilt als erfolgreich abgeschlossen, wenn:

- der Lighthouse-Input korrekt normalisiert wurde;
- Mobile/Desktop sauber getrennt wurden;
- Lighthouse-Version und Testbedingungen berücksichtigt wurden;
- Score-relevante Metriken identifiziert wurden;
- Root Causes aus Audit-Details und Code abgeleitet wurden;
- konkrete Änderungen umgesetzt wurden;
- Funktionalität und Design erhalten wurden;
- Lint/Typecheck/Build/Tests soweit verfügbar geprüft wurden;
- Lighthouse erneut ausgeführt wurde, wenn technisch möglich;
- keine Verbesserung erfunden wurde;
- verbleibende Unsicherheiten transparent dokumentiert wurden.

---

# 52. Forschung / technische Referenzen

Diese Referenzen bilden die fachliche Grundlage für den Skill und sollen bei zukünftigen Updates erneut geprüft werden.

## Offizielle Lighthouse-Dokumentation

- Lighthouse – Understanding Results / LHR:
  https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md
- Lighthouse Configuration:
  https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
- Lighthouse Performance Scoring:
  https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- Lighthouse CLI / Repository:
  https://github.com/GoogleChrome/lighthouse
- Lighthouse current default config:
  https://github.com/GoogleChrome/lighthouse/blob/main/core/config/default-config.js
- Lighthouse current mobile config:
  https://github.com/GoogleChrome/lighthouse/blob/main/core/config/lr-mobile-config.js
- Lighthouse current desktop config:
  https://github.com/GoogleChrome/lighthouse/blob/main/core/config/lr-desktop-config.js
- Lighthouse 13 release notes:
  https://developer.chrome.com/blog/lighthouse-13-0
- Lighthouse releases:
  https://github.com/GoogleChrome/lighthouse/releases

## Core Web Vitals / Web Performance

- Web Vitals:
  https://web.dev/articles/vitals
- Defining Core Web Vitals thresholds:
  https://web.dev/articles/defining-core-web-vitals-thresholds
- Optimize LCP:
  https://web.dev/articles/optimize-lcp
- Optimize INP:
  https://web.dev/articles/optimize-inp
- Optimize CLS:
  https://web.dev/articles/optimize-cls
- Optimize TTFB:
  https://web.dev/articles/optimize-ttfb
- Fetch Priority:
  https://web.dev/articles/fetch-priority
- Responsive images:
  https://web.dev/articles/serve-responsive-images
- Image performance:
  https://web.dev/learn/performance/image-performance
- Browser-level image lazy loading:
  https://web.dev/articles/browser-level-image-lazy-loading
- Third-party JavaScript:
  https://web.dev/articles/third-party-javascript
- JavaScript code splitting:
  https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
- Webfont loading:
  https://web.dev/articles/optimize-webfont-loading

## Accessibility

- axe-core:
  https://github.com/dequelabs/axe-core
- axe rule descriptions:
  https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md

---

# 53. Research Notes / Validated Principles

## Lighthouse is a diagnostic loop

Der zentrale Workflow ist:

```text
measure → identify → hypothesize → change → validate → measure again
```

Nicht:

```text
score → hack → score
```

## Opportunities/Diagnostics sind indirekt scorewirksam

Viele Opportunities und Diagnostics fließen nicht direkt in den Performance-Score ein. Sie zeigen Ursachen auf, deren Behebung wiederum die eigentlichen Performance-Metriken verbessert.

Deshalb niemals nur die Größe eines „Savings“-Wertes betrachten.

## Performance ist multidimensional

Eine Website kann gleichzeitig:

- schnell FCP haben,
- schlechten LCP,
- guten CLS,
- schlechten TBT

haben. Ein einzelner Score erklärt nicht die Ursache.

## Mobile ist nicht „Desktop kleiner"

Mobile unterscheidet sich durch:

- Viewport
- User Agent
- CPU-/Netzwerkbedingungen
- Ressourcenpriorisierung
- Layout
- responsive Images
- Touch Interactions

Deshalb mobile und desktop immer separat untersuchen.

## Real User Data bleibt wichtig

Labordaten sind extrem nützlich für reproduzierbares Debugging. Feld-/RUM-Daten sind jedoch notwendig, um zu verstehen, was reale Nutzer erleben.

---

# 54. Verhalten bei Folgeaufträgen

Wenn nach einer ersten Optimierungsrunde neue Lighthouse-JSON-Dateien geliefert werden:

1. nicht von null anfangen;
2. vorherige Änderungen überprüfen;
3. neue Reports gegen vorherige Baseline vergleichen;
4. neue Regressionen priorisieren;
5. bereits behobene Probleme nicht erneut „optimieren“;
6. neue Lighthouse-Versionen erkennen;
7. Änderungen erneut verifizieren.

Wenn der Nutzer explizit „optimieren“, „fixen“, „beheben“ oder „Lighthouse verbessern“ verlangt, nicht bei einer reinen Analyse stehen bleiben. Die relevante Änderung direkt im Repository durchführen, sofern die benötigten Dateien und Tools verfügbar sind.

