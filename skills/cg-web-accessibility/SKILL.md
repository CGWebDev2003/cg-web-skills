---
name: cg-web-accessibility
description: Implementiert und remediatiert Website-Barrierefreiheit direkt im bestehenden Codebase. Erstellt eine native, site-connected Accessibility-Komponente mit dauerhaft auffindbarem Button und zugänglichem Einstellungsmenü und behebt zugleich die zugrunde liegenden WCAG-2.2-AA-Barrieren in HTML, CSS, JavaScript und Content. Trigger bei Anfragen wie Website Accessibility, Barrierefreiheit, WCAG, BFSG, EN 301 549, Accessibility Widget/Toolbar, Screenreader-Unterstützung, Kontrast, Textvergrößerung, Keyboard Accessibility oder wenn eine Accessibility-Komponente auf einer Website eingebaut werden soll.
when_to_use: >
  Wenn eine bestehende Website barrierefrei(er) gemacht werden soll.
  Wenn ein Accessibility-Button mit einem Menü ähnlich einer Accessibility-Toolbar gewünscht ist.
  Wenn WCAG-2.2-AA, EN 301 549 oder BFSG als technische Zielbasis genannt werden.
  Wenn Accessibility-Probleme im bestehenden Frontend geprüft, behoben und anschließend verifiziert werden sollen.
argument-hint: "[scope-or-focus]"
metadata:
  version: "1.0.0"
---

# cg-web-accessibility

## Mission

Du bist für dieses Projekt der Accessibility-Engineer.

Dein Auftrag besteht aus **zwei zwingend zusammengehörenden Ebenen**:

1. **Native Barrierefreiheit im Produkt:** Behebe die tatsächlichen Barrieren in HTML, CSS, JavaScript/TypeScript, Komponenten, Navigation, Formularen, Medien, Interaktionen und Content.
2. **Accessibility-Komponente:** Baue eine dauerhaft erreichbare, mit der Website verbundene Accessibility-Toolbar ein, über die Besucher ihre Darstellung und Interaktion anpassen können.

Die Toolbar ist eine **zusätzliche Präferenz- und Bedienebene**. Sie ist niemals der Ersatz für zugänglichen Quellcode, semantisches HTML, Tastaturbedienbarkeit oder Tests mit Assistive Technology. Behaupte niemals, dass die Toolbar allein WCAG-, EN-301-549- oder BFSG-Konformität herstellt.

Zielstandard für die technische Umsetzung ist grundsätzlich **WCAG 2.2 Level AA**. Wo eine Funktion sinnvoll ist, dürfen zusätzliche AAA-orientierte Verbesserungen angeboten werden, aber niemals auf Kosten von A/AA-Anforderungen.

---

# 1. Evidenzbasis und Grundsätze

## 1.1 Normative Basis

Arbeite primär auf Basis dieser Quellen:

- WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 Understanding: https://www.w3.org/WAI/WCAG22/Understanding/
- WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
- WAI-ARIA Overview: https://www.w3.org/WAI/standards-guidelines/aria/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- MDN Accessibility / semantic HTML: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML
- EN 301 549: https://www.etsi.org/standards-search#page=1&q=301%20549
- Germany BFSG: https://www.gesetze-im-internet.de/bfsg/
- Germany BFSGV: https://www.gesetze-im-internet.de/bfsgv/
- Bundesfachstelle Barrierefreiheit, E-Commerce/BFSG: https://www.bundesfachstelle-barrierefreiheit.de/DE/Barrierefreiheitsstaerkungsgesetz/E-Commerce/online-shops_node
- European Accessibility Act / Directive (EU) 2019/882: https://eur-lex.europa.eu/eli/dir/2019/882/oj

### Aktueller Stand zum Zeitpunkt der Skill-Erstellung

- WCAG 2.2 ist eine W3C Recommendation. Die aktuelle W3C-Veröffentlichung ist vom 12. Dezember 2024; die W3C-Errata-Seite wurde zuletzt im September 2026 aktualisiert. Entwickle nach WCAG 2.2.
- WCAG 2.2 fügt gegenüber 2.1 neun Success Criteria hinzu, darunter Focus Not Obscured, Dragging Movements, Target Size, Consistent Help, Redundant Entry und Accessible Authentication.
- EN 301 549 v3.2.1 ist die etablierte harmonisierte Fassung, auf die die EU-Kommission für die Web Accessibility Directive verweist. ETSI hat inzwischen EN 301 549 v4.1.0 veröffentlicht; für rechtliche Aussagen darfst du aber niemals einfach voraussetzen, dass eine neuere ETSI-Fassung bereits harmonisiert ist. Prüfe den aktuellen Rechts-/Harmonisierungsstand separat.
- In Deutschland gilt das Barrierefreiheitsstärkungsgesetz seit dem 28. Juni 2025 für die vom Gesetz erfassten Produkte und Dienstleistungen. § 3 Abs. 3 BFSG nimmt Kleinstunternehmen, die Dienstleistungen anbieten oder erbringen, vom Anwendungsbereich des Absatzes 1 aus. Online-Shops und andere Dienstleistungen im elektronischen Geschäftsverkehr gehören zu den ausdrücklich relevanten Bereichen.
- Für eine konkrete rechtliche Einordnung eines Unternehmens oder Angebots ist diese Skill-Implementierung keine Rechtsberatung. Prüfe Scope, Ausnahmen, Übergangsregeln, Zuständigkeiten und konkrete Dienstleistung bei Bedarf separat.

## 1.2 Was Barrierefreiheit technisch bedeutet

Denke in den vier WCAG-Prinzipien:

- **Perceivable / Wahrnehmbar:** Informationen und UI müssen auf mehreren Wahrnehmungswegen zugänglich sein.
- **Operable / Bedienbar:** Tastatur, Pointer, Touch, Sprache und andere Eingabemethoden dürfen nicht unnötig ausgeschlossen werden.
- **Understandable / Verständlich:** Navigation, Labels, Formulare, Zustände und Fehlermeldungen müssen vorhersehbar und verständlich sein.
- **Robust:** Semantik, States und dynamische Veränderungen müssen mit Browsern und Assistive Technology interoperieren.

Bevorzugte Reihenfolge:

1. Native HTML-Semantik.
2. Browser-/OS-Funktionen.
3. CSS für visuelle Anpassung.
4. ARIA nur dort, wo native Semantik nicht ausreicht.
5. JavaScript für echte Interaktion.
6. User-facing Accessibility Preferences als zusätzliche Ebene.
7. Tests mit echten Browsern und Assistive Technology.

**No ARIA is better than bad ARIA.** Verwende ARIA niemals, um ein falsches natives Element zu kaschieren.

Beispiele:
- `<button>` statt `<div role="button">`.
- `<a href>` statt klickbarem `<div>`.
- `<label>` + `<input>` statt rein visueller Feldbeschriftung.
- `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>` statt generischer Container, wenn die Semantik passt.
- `<dialog>` bzw. ein etabliertes Dialog-Pattern statt eigener, unzugänglicher Modal-Logik.

---

# 2. Wichtigste Erkenntnis: Toolbar ≠ Konformität

Baue die Accessibility-Komponente **nicht als Overlay-Compliance-Versprechen**.

Eine Toolbar kann sinnvolle Nutzerpräferenzen bereitstellen:

- größere Schrift,
- mehr Textabstand,
- höherer Kontrast,
- weniger Bewegung,
- größere Cursor,
- Links hervorheben,
- Bilder visuell ausblenden,
- Leseschrift,
- Vorlesen,
- Seitenstruktur,
- Lesefokus.

Sie kann aber nicht zuverlässig automatisch entscheiden:

- welcher Alt-Text semantisch korrekt ist,
- ob die Fokusreihenfolge sinnvoll ist,
- ob ein Button wirklich die richtige Rolle trägt,
- ob ein komplexes Widget korrekt mit NVDA/JAWS/VoiceOver/TalkBack funktioniert,
- ob Captions inhaltlich korrekt sind,
- ob Formulare verständlich sind,
- ob Fehlermeldungen wirklich helfen,
- ob ein Geschäftsprozess zugänglich ist.

Deshalb:

> **Accessibility by source + Accessibility preferences on top.**

Für rechtliche oder Compliance-Aussagen gilt dieselbe Vorsicht. Die US Federal Trade Commission hat 2025 gegen accessiBe einen finalen Consent Order wegen irreführender Aussagen über eine automatisierte WCAG-Konformität eines solchen Produkts erlassen. Das ist kein deutsches oder EU-Rechtsurteil, aber ein konkretes Signal dafür, warum dieses Projekt niemals mit Aussagen wie „ein Widget macht jede Website automatisch WCAG-konform“ arbeiten darf.

---

# 3. Arbeitsmodus: Erst verstehen, dann ändern

Arbeite nicht blind.

## Phase A – Codebase Audit

Untersuche zuerst:

- `CLAUDE.md` und vorhandene Projektregeln.
- Framework und Runtime.
- `package.json` / `pnpm-lock` / `yarn.lock` / `package-lock`.
- App-/Routing-Struktur.
- Root Layout / App Shell.
- globale Styles und Design Tokens.
- Komponentenbibliothek.
- Header, Navigation, Footer.
- vorhandene Modal-/Dialog-Komponenten.
- vorhandene Theme-/Preferences-Logik.
- Cookie-/Consent-System.
- Analytics/Tracking.
- Chat-/Support-/Accessibility-Widgets von Drittanbietern.
- CSP/Security Header.
- CMS- oder Content-Struktur.
- Bild-/Media-Komponenten.
- Form-Komponenten.
- Tests und CI.

Ermittle außerdem:

- Sind die Texte in `px`, `rem`, `em`, `clamp()` oder Design Tokens definiert?
- Gibt es harte Höhen (`height`) und `overflow: hidden`, die bei größerem Text Inhalte abschneiden?
- Werden Buttons/Links nativ verwendet?
- Existieren bereits Focus Styles?
- Gibt es `tabIndex`-Manipulationen?
- Werden Headings logisch genutzt?
- Gibt es eine skip-to-content-Navigation?
- Gibt es `lang` am `<html>`?
- Sind Medien automatisch abgespielt?
- Gibt es sticky/fixed Elemente, die Fokus verdecken?
- Gibt es horizontales Overflow?
- Sind Interaktionen ausschließlich per Hover bedienbar?
- Gibt es Carousels, Tabs, Accordions, Menüs, Dialoge, Tooltips, Slidern, Drag-and-drop?
- Gibt es Third-Party-Iframes oder Zahlungs-/Booking-Komponenten?

## Phase B – Baseline

Führe vor größeren Änderungen die vorhandenen Checks aus:

- Lint.
- Typecheck, falls vorhanden.
- Unit-/Integrationstests, falls vorhanden.
- Build.
- Browser-/E2E-Tests, falls vorhanden.
- Accessibility-Scan mit vorhandener Toolchain.

Wenn `axe-core`, `@axe-core/playwright`, Lighthouse, pa11y oder vergleichbare Werkzeuge bereits installiert sind, nutze sie.

Falls kein Browser-Test vorhanden ist, prüfe, welche Browser-/E2E-Infrastruktur das Projekt nutzt. Installiere nicht ungefragt ein großes Test-Framework, wenn eine bestehende Infrastruktur ausreicht.

---

# 4. Architektur der Accessibility-Komponente

## 4.1 Ein einziger globaler Mount Point

Die Komponente muss site-wide funktionieren.

Nutze:

- eine zentrale `AccessibilityProvider` / `AccessibilityContext`-Struktur bei React,
- oder das entsprechende zentrale App-/Layout-Pattern des Frameworks.

Die Komponente darf nicht nur auf einer einzelnen Landingpage eingebaut werden.

Bei Next.js:

- App Router: Integration nahe Root Layout/App Shell.
- Pages Router: Integration in `_app` bzw. zentrale App Shell.
- Client-only State darf nicht zu SSR-/Hydration-Fehlern führen.
- Route Changes dürfen die Preferences nicht verlieren.

Bei anderen Frameworks:

- Vue/Nuxt: App/Layout Level.
- Svelte/SvelteKit: Layout.
- Plain HTML/JS: globaler DOM Mount Point.
- Kein Framework-Wechsel nur wegen dieser Funktion.

Folge immer dem vorhandenen Architektur- und Styling-System des Projekts.

## 4.2 Komponentenstruktur

Eine sinnvolle Struktur ist beispielsweise:

```text
AccessibilityProvider
├── AccessibilityTrigger
├── AccessibilityDialog
│   ├── Header
│   ├── ProfilePresets
│   ├── VisionAndTextControls
│   ├── MotionAndInteractionControls
│   ├── NavigationAndReadingControls
│   ├── AdvancedControls
│   ├── Reset
│   ├── AccessibilityStatementLink
│   └── FeedbackLink
└── AccessibilityAnnouncer
```

Passe die tatsächlichen Namen an die Codebase an.

## 4.3 State

Preferences müssen zentral und deterministisch sein.

Beispiel:

```ts
type AccessibilitySettings = {
  fontScale: 1 | 1.15 | 1.25 | 1.5 | 2;
  textSpacing: boolean;
  lineHeight: 1 | 1.5 | 2;
  letterSpacing: 0 | 0.12;
  wordSpacing: 0 | 0.16;
  contrast: "default" | "high" | "dark" | "light";
  grayscale: boolean;
  saturation: "normal" | "low" | "high";
  readableFont: boolean;
  highlightLinks: boolean;
  hideImages: boolean;
  pauseAnimations: boolean;
  largerCursor: boolean;
  focusHighlight: boolean;
  leftAlignText: boolean;
  showPageStructure: boolean;
  readAloud: boolean;
  voiceNavigation: boolean;
};
```

Das ist ein Richtwert. Verwende nur den State, den das tatsächliche UI benötigt.

Regeln:

- Defaults müssen neutral sein.
- Preferences nur lokal speichern.
- Keine personenbezogenen Daten speichern.
- Keine Telemetrie über Accessibility-Einstellungen ohne explizite Produkt-/Consent-Konzeption.
- Kein externer Accessibility-Service als technische Voraussetzung.
- Bei Storage-/Consent-Systemen des Projekts bestehende Datenschutzarchitektur berücksichtigen.
- `reset` muss alle eigenen Änderungen sauber entfernen.
- Preferences müssen pro Route erhalten bleiben.
- Bei SSR niemals von `window`, `localStorage`, `matchMedia` oder `SpeechSynthesis` während des Server-Renderings ausgehen.

---

# 5. Accessibility Trigger / Button

Der Trigger ist **auf jeder öffentlichen Seite vorhanden und erreichbar**.

## Anforderungen

- echtes `<button type="button">`.
- programmatisch verständlicher Name, z. B. „Barrierefreiheit öffnen“.
- `aria-expanded`.
- `aria-controls`.
- sichtbarer Focus.
- mindestens 24×24 CSS px gemäß WCAG 2.2; für den realen UX-Komfort besser ca. 44–48 px Hit Area verwenden.
- kontraststark.
- nicht ausschließlich über Farbe erkennbar.
- kein Hover-only-Verhalten.
- per Tastatur erreichbar.
- `Escape` darf das Menü wieder schließen.
- mobile Safe Area beachten.
- Button darf nicht mit Cookie-Banner, Chat, Back-to-top, WhatsApp-Button o. ä. kollidieren.

### Position

Die Position muss nicht exakt wie bei UserWay kopiert werden.

Bevorzugt:

- Desktop: fixe Position in einer freien unteren Ecke.
- Mobile: fixe Position mit `env(safe-area-inset-bottom)`.
- Bei vorhandenen Floating-Widgets Position dynamisch bzw. konfigurierbar verschieben.
- Der Trigger darf nicht wichtige Inhalte überdecken.
- Das Menü muss bei kleinem Viewport vollständig benutzbar bleiben.

### Visual Direction

Nutze die beigefügten Referenzen nur als UX-Inspiration:

- klar erkennbares Accessibility-Symbol,
- rund oder kompakt,
- stark sichtbarer Button,
- kleine schwebende Toolbar,
- klarer Panel Header,
- Kachel-/Grid-Aufbau.

Nicht kopieren:

- UserWay Logo.
- UserWay Branding.
- proprietäre Icons.
- identische Texte/Produktbezeichnungen.
- pixelgenaue UI.

Die fertige Komponente muss wie ein eigenständiges Produktbestandteil der betreffenden Website aussehen.

---

# 6. Dialog / Menü

Bevorzugt native Semantik:

```html
<dialog aria-labelledby="cg-a11y-title">
  ...
</dialog>
```

oder das etablierte zugängliche Dialog-Pattern des bestehenden UI-Systems.

## Verhalten

Beim Öffnen:

1. Dialog sichtbar machen.
2. sinnvollen initialen Fokus setzen.
3. Fokus darf nicht hinter dem Panel landen.
4. Panel muss selbst scrollbar sein.
5. Escape schließt.
6. Schließen gibt Fokus auf den Trigger zurück.
7. Screenreader erhält Namen und Zustand.
8. keine Fokusfalle, aus der Nutzer nicht herauskommen.
9. keine unerwarteten Navigationen.

Wenn das Framework kein nativer Dialog ist, implementiere das WAI-ARIA-Dialog-Pattern korrekt und nur so viel Focus Management wie benötigt.

### Responsives Verhalten

Desktop:

- seitliches Panel oder kompakte Card.
- ca. 340–440 px Breite als Ausgangspunkt.
- klare Sektionen.
- 2–3 Spalten für Controls.

Mobile:

- Bottom Sheet oder nahezu vollbreites Panel.
- ausreichend große Touch Targets.
- keine horizontale Überladung.
- alle Controls mit Textlabel.
- Panel-Inhalt muss bei 200 % Textgröße weiterhin lesbar sein.

---

# 7. Empfohlenes Feature Set

Die Toolbar soll nicht nur eine Dummy-Sammlung von Toggles sein. Jedes Feature muss tatsächlich funktionieren.

## 7.1 Profil-Presets

Optional, aber empfehlenswert.

Beispiele:

- **Sehen erleichtern**
  - größere Schrift
  - hoher Kontrast
  - Links hervorheben
  - größerer Cursor
  - Focus Highlight

- **Lesefokus**
  - größere Schrift
  - höherer Zeilenabstand
  - erhöhter Zeichen-/Wortabstand
  - lesefreundliche Schrift
  - reduzierte Bewegung

- **Bewegung reduzieren**
  - Animationen stoppen
  - Transitions deaktivieren
  - Medien pausieren

Profiles dürfen keine medizinischen Diagnosen, Behinderungslabels oder Nutzerkategorien erfassen. Es sind reine UI-Presets.

---

# 8. Einzelne Funktionen

## 8.1 Bigger Text

Ziel:

- nutzersteuerbare Textvergrößerung.
- mindestens 200 % ohne Verlust von Content/Funktionalität.

Regeln:

- nicht einfach `transform: scale()` auf den gesamten Body legen.
- keine UI-Überlappung erzeugen.
- keine abgeschnittenen Texte.
- keine fixen Containerhöhen, die Text abschneiden.
- Layout muss reflowen.
- Typografie bevorzugt mit `rem`, `em`, `clamp()` und Design Tokens aufbauen.
- bestehende `px`-Textgrößen bei Bedarf systematisch auf skalierbare Einheiten umbauen.
- Buttons, Formlabels und Controls ebenfalls berücksichtigen.
- `white-space: nowrap` kritisch prüfen.

Präferenzstufen z. B.:

```text
100 %
115 %
125 %
150 %
200 %
```

200 % ist der wichtige technische Checkpoint.

---

## 8.2 Text Spacing

Ein Accessibility-Modus darf mindestens die WCAG-Textabstandsanforderungen verkraften:

- line-height ≥ 1.5 × font-size
- paragraph spacing ≥ 2 × font-size
- letter-spacing ≥ 0.12 × font-size
- word-spacing ≥ 0.16 × font-size

Der Nutzer muss die Seite danach weiterhin bedienen können.

Teste besonders:

- Buttons.
- Cards.
- Navigation.
- Formulare.
- Tabellen.
- Badges.
- Dialoge.
- Headings.
- lange Wörter/URLs.

---

## 8.3 Line Height

Eigener Control:

- normal.
- 1.5.
- optional 2.

Nicht pauschal jede technische UI-Komponente verändern, wenn dies Funktionalität oder Lesbarkeit verschlechtert. Dokumenttext ist primär.

---

## 8.4 Letter / Word Spacing

Mindestens einen Modus bereitstellen, der WCAG 1.4.12 toleriert.

Nicht:

- Icon-Schriften.
- Logos.
- technische Codes.
- Bestandteile, deren Funktion bei erzwungener Textformatierung kaputtgeht.

---

## 8.5 High Contrast

WCAG Zielwerte:

- normaler Text: mindestens 4.5:1.
- großer Text: mindestens 3:1.
- UI-Komponenten und wichtige grafische Informationen: mindestens 3:1 gegen angrenzende Farben.

Wichtig:

- Kontrast nie nur durch `filter: contrast()` herstellen.
- UI muss semantisch konsistente Farben verwenden.
- Focus, hover, selected, checked und disabled States prüfen.
- Brandfarben dürfen angepasst werden, wenn sie im Accessibility-Modus nicht ausreichend kontrastieren.
- `forced-colors: active` respektieren und nicht blockieren.

Empfohlen:

```css
@media (forced-colors: active) {
  /* native forced-colors semantics respektieren */
}
```

Erzeuge einen echten Theme-/Token-Modus, keinen rein visuellen Filter.

---

# 9. Invert / Dark / Light Contrast

Kann als zusätzliche User Preference angeboten werden.

Regeln:

- nicht mit globalem `filter: invert(1)` als Standardlösung.
- Bilder/Logos können dadurch kaputtgehen.
- Token-basierte Farbänderungen bevorzugen.
- Dark/Light Preset muss Links, Icons, Borders, Form Controls und Focus Styles mitändern.

---

# 10. Saturation / Grayscale

Diese Funktionen sind Komfortfunktionen, keine pauschale WCAG-Anforderung.

Optionen:

- normal.
- reduziert / Grayscale.
- hohe Sättigung.

Implementierung kann über `filter: grayscale()` oder `saturate()` erfolgen, sofern keine kritischen Informationen verloren gehen.

Nicht behaupten, dass eine bestimmte Sättigungsstufe eine bestimmte Farbsehschwäche „behebt“.

Wichtige Informationen dürfen nicht ausschließlich durch Farbe kommuniziert werden.

---

# 11. Hide Images

„Bilder ausblenden“ ist ein Nutzerpräferenz-Modus.

Technische Priorität:

- Layout nicht zerstören.
- alt-Text nicht unnötig aus dem Accessibility Tree entfernen.
- Bildfläche kann visuell ausgeblendet werden, ohne semantische Information zu vernichten.
- Hintergrundbilder deaktivieren.
- `display: none` mit Vorsicht, weil das Element dadurch aus dem Accessibility Tree verschwinden kann.

Für sichtbares Ausblenden bevorzugt je nach Kontext z. B.:

```css
img[data-cg-a11y-image] {
  opacity: 0 !important;
}
```

Dabei muss geprüft werden, ob dekorative / informative Bilder unterschiedlich behandelt werden müssen.

Keine automatische Entfernung des `alt`-Attributs.

---

# 12. Pause Animations / Reduce Motion

Immer auch systemweite Präferenz berücksichtigen:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Der Accessibility-Modus muss:

- CSS-Animationen beenden.
- unnötige Transitions entfernen.
- smooth scrolling deaktivieren.
- Autoplay-Medien pausieren, soweit programmatisch möglich.
- Carousel-Autoplay stoppen.
- parallaxartige Effekte deaktivieren.

Zusätzlich per JavaScript:

```js
document.querySelectorAll("video, audio").forEach((media) => {
  media.pause();
  media.autoplay = false;
});
```

Fehlerfälle behandeln.

Bei GIFs kann echtes Pausieren nicht einfach mit CSS garantiert werden. Nicht behaupten, dass jedes animierte GIF technisch gestoppt wurde. Falls notwendig visuelle Bewegung für den Modus minimieren oder den Inhalt ausblenden.

---

# 13. Link Highlight

Alle Links müssen als Links erkennbar sein.

Accessibility-Modus:

- sichtbare Unterstreichung.
- stärkerer Kontrast.
- optional Hintergrundmarkierung.

Aber:

- nicht nur Farbe.
- hover allein reicht nicht.
- Focus nicht überschreiben.
- externe Linkindikatoren nur ergänzen, nicht als einziges Signal.

---

# 14. Focus Highlight

Ein robustes Focus-System ist Pflicht, unabhängig vom Toolbar-Feature.

Default:

```css
:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

An projektspezifische Design Tokens anpassen.

Wichtig:

- nicht `outline: none` ohne gleichwertige Alternative.
- Focus sichtbar.
- Focus-Indikator ausreichend kontrastreich.
- keine Zeitbegrenzung.
- sticky Header/Footer/Toolbar dürfen Fokus nicht vollständig verdecken.
- `scroll-margin-top` / `scroll-padding-top` nutzen, wo nötig.

WCAG 2.2 verschärft insbesondere das Thema „Focus Not Obscured“.

---

# 15. Larger Cursor

Optional.

Bevorzugt:

- echte Hit Area vergrößern.
- anschließend Cursor grafisch anpassen.

Eine CSS-Custom-Cursor-Lösung muss:

- auf Hover nicht die UI blockieren.
- weiterhin einen sichtbaren normalen Cursorzustand besitzen.
- Focus/Keyboard Users nicht benachteiligen.
- Touch nicht berücksichtigen, da dort kein Mauszeiger existiert.

---

# 16. Readable Font / Dyslexia Friendly

„Dyslexia Friendly“ nicht als medizinische Wirksamkeitsbehauptung darstellen.

Nutze stattdessen einen neutralen Begriff wie:

- „Lesefreundliche Schrift“
- „Reading-friendly font“

Bevorzugt:

- klare Sans-Serif oder vorhandene systemnahe Schrift.
- ausreichend große Buchstabenformen.
- normaler Font Weight.
- keine verspielte Display-Schrift für Fließtext.
- Textabstände entsprechend Nutzerpräferenz.

Keine spezielle Schrift als angeblich universell wirksame Dyslexie-Lösung verkaufen.

---

# 17. Text Alignment

Ermögliche mindestens:

- Standard.
- linksbündig für LTR.

Rechts-/zentrierte Ausrichtung nur optional.

Vermeide automatisches Blocksatz-Forcing. Blocksatz kann unvorteilhafte Wortabstände erzeugen.

Bei RTL-Seiten nicht blind „left“ setzen; `text-align: start` kann geeigneter sein.

---

# 18. Page Structure / Headings Navigator

Sehr nützliches Werkzeug.

Scanne den aktuellen DOM:

```js
document.querySelectorAll(
  "h1, h2, h3, h4, h5, h6, main, nav, header, footer, aside"
);
```

Zeige:

- Überschriftenhierarchie.
- Landmarks.
- klickbare Sprungziele.

Sprunglinks müssen:

- echte Fokus-/Scroll-Ziele haben.
- keine unerwarteten Layoutverschiebungen verursachen.
- durch `scroll-margin-top` mit Sticky Headers funktionieren.

Wenn die Seite keine sinnvollen Headings hat, **erstelle nicht automatisch falsche Struktur nur für das Widget**. Die eigentliche Headings-Struktur ist am Quellcode zu beheben.

---

# 19. Vorlesen / Read Aloud

Kein „Screen Reader“-Fake.

Native Screenreader sind Assistive Technologies des Systems und müssen durch zugängliche Semantik unterstützt werden.

Optional kann die Toolbar eine zusätzliche **Vorlesen-/Read-Aloud-Funktion** anbieten, z. B. über `window.speechSynthesis`.

Anforderungen:

- nur nach ausdrücklicher Nutzeraktion starten.
- Play / Pause / Stop.
- aktuelle Sprache aus `document.documentElement.lang` oder geeigneter Content-Locale übernehmen.
- keine permanenten Mikrofon-/Audio-Verbindungen.
- Browser-Support prüfen.
- nicht behaupten, dies ersetze NVDA, JAWS, VoiceOver, TalkBack oder einen anderen Screenreader.
- bei fehlendem Support freundlich „In diesem Browser nicht verfügbar“ anzeigen.

---

# 20. Voice Navigation

Nur als optionale Erweiterung.

Browser-Spracherkennung ist nicht überall gleich verfügbar und kann Datenschutz-/Browserunterschiede aufweisen.

Regeln:

- Mikrofon niemals automatisch aktivieren.
- erst nach explicit user action.
- klarer Status „Sprachsteuerung aktiv/inaktiv“.
- klare Stop-Funktion.
- keine Audioübertragung an einen Drittanbieter ohne explizite Produktentscheidung und Datenschutzkonzept.
- Capability Detection statt User-Agent-Hacks.
- bei fehlender API keine gebrochene UI anzeigen.

Sinnvolle lokale Befehle können sein:

- „Nach oben“
- „Nach unten“
- „Zum Anfang“
- „Zum Ende“
- „Accessibility öffnen“
- „Vorlesen starten“
- „Vorlesen stoppen“

Keine freie KI-Sprachsteuerung bauen, wenn sie für die Aufgabe nicht erforderlich ist.

---

# 21. Tooltips

Wenn Tooltips angeboten werden:

- accessible name nicht vom Tooltip abhängig machen.
- Tastaturfokus muss Tooltip ebenfalls auslösen, wenn vorgesehen.
- Tooltip muss dismissible, hoverable und persistent sein, soweit WCAG 1.4.13 zutrifft.
- keine „blink and disappear“-Tooltips.
- kein `title`-Attribut als einzige Accessibility-Lösung.
- Tooltip darf nicht permanent wichtige Inhalte verdecken.

---

# 22. Dictionary / Begrifferklärungen

Optionales Feature.

Nicht automatisch jedes Wort analysieren.

Bessere Architektur:

- Content kann gezielt Definitionen hinterlegen, z. B.:

```html
<span
  data-cg-definition="Ein einfacher Begriff, der hier erklärt wird."
>
  Fachbegriff
</span>
```

oder über das vorhandene CMS.

Dann:

- Begriff optisch erkennbar.
- Erklärung keyboard-accessible.
- Popover/tooltip zugänglich.
- verständlicher Close-/Dismiss-Mechanismus.

Keinen externen Wörterbuchdienst ohne Projektfreigabe anbinden.

---

# 23. Accessibility Profiles

Presets sind nur Shortcuts.

Bei manueller Änderung muss die aktive Profile-Auswahl zurückgesetzt oder als „Benutzerdefiniert“ gekennzeichnet werden.

Beispiel:

```text
Standard

Sehen erleichtern
+ Text größer
+ Kontrast
+ Links markieren
+ Cursor größer

Lesefokus
+ Text größer
+ Textabstand
+ Zeilenhöhe
+ Lesefreundliche Schrift
+ Animationen reduzieren

Ruhemodus
+ Animationen aus
+ Autoplay aus
+ reduzierte Übergänge
```

Keine Nutzerprofil-Daten speichern.

---

# 24. Language

Wenn das UI mehrsprachig ist:

- Sprache aus Website-Locale übernehmen.
- UI-Texte zentral aus Übersetzungsdaten laden.
- `<html lang="...">` korrekt setzen bzw. nicht eigenmächtig ändern.
- „Language“ im Widget darf nicht automatisch die gesamte Website übersetzen.
- Bei fehlender Übersetzung auf eine verfügbare Fallback-Sprache wechseln.

Bei einer rein deutschsprachigen Website reicht Deutsch, solange keine Mehrsprachigkeit vorhanden ist.

---

# 25. Reset

Es braucht immer:

**„Alle Einstellungen zurücksetzen“**

Dabei:

- alle CSS-Klassen entfernen.
- CSS Custom Properties auf Default.
- laufende SpeechSynthesis stoppen.
- Voice Navigation deaktivieren.
- Medien nicht dauerhaft pausiert lassen, sofern die Seite zuvor nicht bereits pausiert war.
- `localStorage`-Eintrag für Accessibility Preferences entfernen.
- UI-Zustände aktualisieren.
- Screenreader-Statusmeldung ausgeben.

Nicht einfach die Seite reloaden, wenn dadurch Nutzerzustand verloren geht.

---

# 26. Accessibility-Announcer

Für wichtige dynamische Änderungen kann eine visuell versteckte Statusregion verwendet werden:

```html
<div
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
>
  ...
</div>
```

Nutze dies für:

- „Textgröße auf 150 % gesetzt.“
- „Hoher Kontrast aktiviert.“
- „Animationen pausiert.“
- „Barrierefreiheitsmenü geschlossen.“

Nicht jede Mikrointeraktion ansagen. Übermäßig laute Live Regions stören.

Für statusartige Meldungen kann WCAG 4.1.3 relevant sein.

---

# 27. Skip Link

Die Website braucht einen sichtbaren Skip Link bei Tastaturfokus:

```html
<a href="#main-content" class="skip-link">
  Zum Inhalt springen
</a>
```

Anforderungen:

- erster sinnvoller Tab-Stopp.
- nur bei Fokus sichtbar.
- Ziel hat `id`.
- Ziel ist fokussierbar oder sinnvoll anspringbar.
- bei Sticky Headern `scroll-margin-top` berücksichtigen.

---

# 28. Semantische HTML-Basis

Prüfe und repariere:

## Navigation

- echte `<nav>`.
- `aria-label`, wenn mehrere Navs vorhanden sind.
- echte Links.
- Dropdown-Menüs per Tastatur bedienbar.

## Main

- genau ein klarer Hauptinhalt.
- `<main id="main-content">`.

## Headings

- eine klare H1 pro Seite als Zielbild.
- logische Hierarchie.
- keine Überschriften nur wegen Font Styling.

## Lists

- echte `<ul>`, `<ol>`, `<dl>` statt künstlicher Listen.

## Buttons

- Aktionen = `<button>`.
- Navigation = `<a href>`.

## Images

- informativ: sinnvolles `alt`.
- dekorativ: `alt=""`.
- keine `alt`-Texte wie „Bild von“, wenn die Information dadurch nicht besser wird.
- komplexe Grafiken erhalten passende längere Beschreibung, wenn notwendig.

## SVG

- dekorativ: `aria-hidden="true"`, sofern angemessen.
- informative SVGs: zugänglicher Name/Role korrekt.
- keine reine Icon-Kommunikation ohne Namen.

---

# 29. Forms

Prüfe jedes Formular.

Pflichtpunkte:

- sichtbare Labels.
- eindeutige Zuordnung.
- Fehlermeldungen am Feld und in einer verständlichen Zusammenfassung, wenn sinnvoll.
- Hilfetexte über `aria-describedby`.
- required state korrekt.
- Eingabezweck mit `autocomplete` identifizieren, wo sinnvoll.
- keine placeholder-only labels.
- Fokus nach Validierungsfehlern nachvollziehbar.
- Fehlermeldungen in Text, nicht nur Farbe.
- konkrete Fehlerkorrekturhinweise.
- Erfolgs-/Statusmeldungen assistive-technology-kompatibel.

---

# 30. Links

Jeder Link muss seinen Zweck erkennen lassen.

Nicht:

```text
Mehr
Hier
Klick
```

wenn der Kontext nicht ausreicht.

Bevorzugt:

```text
Mehr über unsere Leistungen
```

Für Icon-only Links:

- sichtbares Icon.
- accessible name via content/ARIA, wenn wirklich nötig.
- Tooltip darf nicht die einzige Benennung sein.

---

# 31. Keyboard Accessibility

Alles mit Funktion muss mit Tastatur bedienbar sein.

Testsequenz:

```text
Tab
Shift+Tab
Enter
Space
Arrow keys, falls Pattern erforderlich
Escape
Home/End, falls sinnvoll
```

Prüfe:

- Navigation.
- Dropdowns.
- Mega Menus.
- Buttons.
- Accordions.
- Tabs.
- Dialoge.
- Carousels.
- Slider.
- Filter.
- Search.
- Cookie Banner.
- Consent.
- Formularfehler.
- Checkout.
- Booking.

Keine Keyboard Traps.

Vermeide unnötige positive `tabIndex`-Werte.

---

# 32. Focus Order

Focus Order muss der visuellen/logischen Reihenfolge entsprechen.

Vermeide:

```css
order: 10;
order: -1;
```

als Workaround für semantische oder DOM-Probleme.

Wenn visuell die Reihenfolge geändert wird, muss die DOM-/Accessibility-Reihenfolge weiterhin sinnvoll bleiben.

---

# 33. Pointer, Touch und Target Size

WCAG 2.2:

- Pointer target minimum: 24×24 CSS px, mit definierten Ausnahmen.
- Für reale UX ist eine größere Hit Area häufig sinnvoll.
- kleine Icons dürfen eine größere unsichtbare Hit Area besitzen.
- Controls nicht dicht nebeneinander quetschen.

Bei Dragging:

- alternative Single-Pointer-Operation anbieten.
- nicht nur Tastaturalternative hinzufügen.

---

# 34. Hover/Fokus Content

Dropdowns, Tooltips und Popovers dürfen nicht nur bei Hover funktionieren.

Bei zusätzlichen Hover-/Focus-Inhalten:

- dismissible.
- hoverable.
- persistent.

Nie Tooltip/Dropdown so bauen, dass es verschwindet, sobald der Nutzer versucht, mit der Maus darauf zu fahren.

---

# 35. Motion / Seizure Safety

Prüfe:

- blinkende Inhalte.
- Video.
- animierte Backgrounds.
- Parallax.
- Scroll animations.
- Auto-rotating carousels.

Drei schnelle Blitze pro Sekunde oder mehr können problematisch sein.

Unnötige Animationen reduzieren und `prefers-reduced-motion` respektieren.

---

# 36. Responsive / Reflow

Accessibility bedeutet auch bei:

- Zoom 200 %.
- Reflow bis 400 % in der WCAG-Prüfung, soweit das jeweilige Kriterium Anwendung findet.
- schmalem Viewport.
- großer Schrift.
- hoher Text-/Wort-/Letter-Spacings.

Kein:

- unnötiges horizontales Scrolling.
- abgeschnittener Text.
- `overflow: hidden` als generische Problemlösung.
- feste Panelhöhen, die Inhalt abschneiden.

Ausnahmen wie komplexe Daten-Tabellen, Karten oder zweidimensionale Inhalte können besondere Behandlung benötigen.

---

# 37. Images and Media

## Images

Prüfe jede sinntragende Grafik.

## Video

Wenn relevant:

- Untertitel.
- Audio Description oder passende Alternative.
- Player keyboard accessible.
- Play/Pause.
- keine problematische Auto-Start-Logik.

## Audio

- Lautstärke kontrollierbar.
- Autoplay vermeiden.
- automatische Audioausgabe nicht länger als notwendig.

---

# 38. Color and Visual Information

Farbe darf niemals der einzige Informationskanal sein.

Beispiele:

Nicht:

- „Fehler = rot“
- „Erfolg = grün“

ohne zusätzliches:

- Icon,
- Text,
- State,
- Border,
- Pattern.

---

# 39. Typography

Ziel:

- skalierbare Schrift.
- ausreichende Zeilenhöhe.
- keine Mikrotexte.
- keine langen Großbuchstaben-Blöcke für Fließtext.
- Text muss bei 200 % noch sinnvoll umbrechen.
- Buttons müssen mit großem Text funktionieren.

Nicht alle absoluten Mindestwerte als Designziel behandeln. Gute Barrierefreiheit ist mehr als gerade so bestehen.

---

# 40. Page Language / Language of Parts

Prüfe:

```html
<html lang="de">
```

oder die tatsächliche Sprache.

Bei einzelnen Fremdsprachenteilen ggf.:

```html
<span lang="en">...</span>
```

Das ist besonders relevant für Screenreader-Aussprache.

---

# 41. Page Title

Jede Seite muss einen sinnvollen `<title>` besitzen.

Beispiel:

```text
Leistungen | Firma Beispiel
```

statt:

```text
Home
```

für jede Unterseite.

---

# 42. Multiple Ways / Findability

Nutzer müssen Informationen auf geeignete Weise finden können.

Je nach Website:

- Hauptnavigation.
- Search.
- Sitemap.
- Breadcrumbs.

Nicht jeder einzelne Mechanismus muss auf jeder Website vorhanden sein, aber die WCAG-Anforderung für mehrere Wege ist je nach Seitentyp zu prüfen.

---

# 43. Consistent Navigation / Consistent Identification

Wiederkehrende Navigation und wiederkehrende Controls müssen konsistent benannt und angeordnet sein, sofern Nutzer keine Änderung auslösen.

Nicht:

- Kontakt einmal als „Kontakt“, einmal als „Loslegen“, einmal als „Anfrage“ ohne sachlichen Grund.

Icons allein nicht ständig anders verwenden.

---

# 44. Consistent Help

Wenn Support-Mechanismen vorhanden sind:

- dieselbe relative Position über Seiten hinweg.
- konsistente Kontakt-/Hilfemöglichkeiten.

Die Accessibility-Komponente selbst ist davon nicht ausgenommen.

---

# 45. Accessible Authentication

Bei Login/Checkout:

- keine unnötigen kognitiven Tests.
- Passwortmanager nicht blockieren.
- Copy/Paste nicht unnötig verbieten.
- alternative Authentifizierungswege berücksichtigen.

WCAG 2.2 Accessible Authentication (Minimum) beachten.

---

# 46. Redundant Entry

Wenn Informationen im selben Prozess bereits vorhanden sind:

- nicht unnötig erneut abfragen.
- Nutzerinformationen korrekt wiederverwenden, wo die WCAG-Ausnahmen nicht greifen.

Besonders wichtig für:

- Checkout.
- Booking.
- Form-Wizards.
- Registrierungen.

---

# 47. Status Messages

Dynamische Zustände müssen für Assistive Technology nachvollziehbar sein:

- Cart updated.
- Search results loaded.
- Form saved.
- Filter applied.
- Success message.
- Error message.

Nicht bei jeder Änderung den Fokus zwanghaft verschieben.

---

# 48. Vollständige WCAG-2.2-A/AA-Abdeckung als Audit-Matrix

Bei einem Accessibility-Task muss Claude mindestens prüfen, welche der folgenden Success Criteria auf die konkrete Website/Komponente zutreffen.

## 1 Perceivable

### Level A

- 1.1.1 Non-text Content
- 1.2.1 Audio-only and Video-only (Prerecorded)
- 1.2.2 Captions (Prerecorded)
- 1.2.3 Audio Description or Media Alternative (Prerecorded)
- 1.3.1 Info and Relationships
- 1.3.2 Meaningful Sequence
- 1.3.3 Sensory Characteristics
- 1.4.1 Use of Color
- 1.4.2 Audio Control

### Level AA

- 1.2.4 Captions (Live)
- 1.2.5 Audio Description (Prerecorded)
- 1.3.4 Orientation
- 1.3.5 Identify Input Purpose
- 1.3.6 Identify Purpose
- 1.4.3 Contrast (Minimum)
- 1.4.4 Resize Text
- 1.4.5 Images of Text
- 1.4.10 Reflow
- 1.4.11 Non-text Contrast
- 1.4.12 Text Spacing
- 1.4.13 Content on Hover or Focus

## 2 Operable

### Level A

- 2.1.1 Keyboard
- 2.1.2 No Keyboard Trap
- 2.1.4 Character Key Shortcuts
- 2.2.1 Timing Adjustable
- 2.2.2 Pause, Stop, Hide
- 2.2.5 Re-authenticating
- 2.3.1 Three Flashes or Below Threshold
- 2.4.1 Bypass Blocks
- 2.4.2 Page Titled
- 2.4.3 Focus Order
- 2.4.4 Link Purpose (In Context)
- 2.5.1 Pointer Gestures
- 2.5.2 Pointer Cancellation
- 2.5.3 Label in Name
- 2.5.4 Motion Actuation

### Level AA

- 2.4.5 Multiple Ways
- 2.4.6 Headings and Labels
- 2.4.7 Focus Visible
- 2.4.11 Focus Not Obscured (Minimum)
- 2.5.7 Dragging Movements
- 2.5.8 Target Size (Minimum)
- 2.5.6 Concurrent Input Mechanisms
- 2.2.6 Timeouts

## 3 Understandable

### Level A

- 3.1.1 Language of Page
- 3.2.1 On Focus
- 3.2.2 On Input
- 3.3.1 Error Identification
- 3.3.2 Labels or Instructions

### Level AA

- 3.1.2 Language of Parts
- 3.2.3 Consistent Navigation
- 3.2.4 Consistent Identification
- 3.2.6 Consistent Help
- 3.3.3 Error Suggestion
- 3.3.4 Error Prevention (Legal, Financial, Data)
- 3.3.7 Redundant Entry
- 3.3.8 Accessible Authentication (Minimum)

## 4 Robust

### Level A

- 4.1.2 Name, Role, Value

### Level AA

- 4.1.3 Status Messages

**Wichtig:** Das ist eine Audit-Matrix, kein Versprechen, dass jede Website alle Punkte durch die Toolbar automatisch erfüllen kann. Viele Kriterien sind Source-Code-/Content-/Business-Process-Themen.

---

# 49. ARIA-Regeln

Vor Verwendung von ARIA:

1. Prüfe, ob natives HTML die Aufgabe bereits löst.
2. Wenn ja, kein unnötiges ARIA.
3. Wenn nein, APG-Pattern verwenden.
4. Role, name, state, value und keyboard interaction zusammen denken.
5. Tests mit Assistive Technology einplanen.

Typische States:

- `aria-expanded`
- `aria-controls`
- `aria-pressed`
- `aria-current`
- `aria-selected`
- `aria-checked`
- `aria-describedby`
- `aria-labelledby`
- `aria-live`
- `aria-hidden`

Nicht wahllos `aria-label` auf generische Elemente setzen.

---

# 50. CSS-Architektur der Toolbar

Verwende namespaced Klassen und Properties, z. B.:

```text
.cg-a11y-trigger
.cg-a11y-dialog
.cg-a11y-section
.cg-a11y-control
.cg-a11y-control--active
.cg-a11y-profile
.cg-a11y-announcer
```

CSS Custom Properties:

```text
--cg-a11y-font-scale
--cg-a11y-line-height
--cg-a11y-letter-spacing
--cg-a11y-word-spacing
--cg-a11y-focus-color
--cg-a11y-panel-width
```

Keine unpräfixierten globalen Utility-Namen erzeugen.

Accessibility-Modi können über Root-Klassen aktiviert werden:

```text
html.cg-a11y-font-lg
html.cg-a11y-spacing
html.cg-a11y-high-contrast
html.cg-a11y-reduced-motion
html.cg-a11y-links
html.cg-a11y-images-hidden
```

Nur wenn die Codebase eine andere, bessere Architektur verwendet, davon abweichen.

---

# 51. Widget darf Website nicht zerstören

Nach Aktivierung jedes Modus testen:

- Header.
- Hero.
- Navigation.
- Dropdown.
- Cards.
- Forms.
- Footer.
- Sticky elements.
- Modals.
- Cookie banner.
- Third-party widgets.
- Tables.
- Mobile layout.

Besonders kritisch:

- 200 % Text.
- Text spacing.
- high contrast.
- animation pause.
- images hidden.
- large cursor.
- page structure.
- route changes.

Ein Accessibility-Modus, der die Seite unbenutzbar macht, ist kein erfolgreicher Accessibility-Modus.

---

# 52. Third-Party Content

Prüfe:

- Maps.
- YouTube/Vimeo.
- Booking systems.
- Calendars.
- Payment providers.
- Social embeds.
- chat widgets.
- cookie managers.

Third-party content nicht stillschweigend als konform deklarieren.

Wenn eine Komponente außerhalb deiner Kontrolle liegt:

- dokumentieren.
- wenn möglich alternative zugängliche Bedienung anbieten.
- Fokus-/Keyboard-Probleme im umgebenden UI beheben.

---

# 53. Security / Privacy

Die Toolbar soll grundsätzlich ohne externe Netzwerkabhängigkeit funktionieren.

Nicht ungefragt:

- externe Accessibility-CDNs einbauen.
- Nutzerprofile an Server senden.
- Sprachdaten an externe APIs senden.
- Tracking auf Toggle-Klicks aktivieren.
- Fingerprinting betreiben.

Bevorzugt:

```text
localStorage
↓
Accessibility preferences
↓
DOM/CSS changes
```

Keine personenbezogenen Daten.

Bestehende CSP beachten.

---

# 54. Framework-spezifische Leitplanken

## React / Next.js

- Client State in einer isolierten Client-Komponente.
- Provider nahe App Shell.
- keine unnötige Clientifizierung des gesamten Layouts.
- `useEffect` für browser-only APIs.
- Event Listener sauber entfernen.
- `SpeechSynthesis` nur im Client.
- `localStorage` nur im Client.
- bei Navigation den Accessibility State erhalten.

## Vue / Nuxt

- composable/store verwenden.
- App/Layout-Level Integration.
- browser-only APIs clientseitig initialisieren.

## Plain HTML / JS

- ein globales Modul.
- keine globalen Variablen, wenn vermeidbar.
- Event Delegation und cleanup.

## TypeScript

Wenn das Projekt TypeScript verwendet:

- Settings typisieren.
- keine `any`-Abkürzungen für Accessibility State.
- DOM APIs sauber null-checken.

## JavaScript

Wenn das Projekt JavaScript verwendet:

- nicht ungefragt auf TypeScript migrieren.

---

# 55. Testing Strategy

Accessibility muss mit einer Kombination aus automatisierten und manuellen Verfahren geprüft werden.

## Automatisiert

Nutze vorhandene Tools:

- axe-core.
- Playwright + axe, wenn vorhanden.
- Lighthouse.
- pa11y.
- Browser Accessibility Tree / DevTools.

Automatisierte Tests prüfen z. B.:

- fehlende Labels.
- Kontrast-Findings, soweit algorithmisch bestimmbar.
- fehlende Names.
- ARIA-Fehler.
- Heading-/Landmark-Probleme.
- Keyboard-relevante Strukturprobleme.

Sie können menschliche Beurteilung nicht ersetzen.

## Manuell

### Keyboard Pass

Mit Maus vollständig ausloggen:

1. Seite laden.
2. Tab von Anfang bis Ende.
3. Shift+Tab zurück.
4. Enter/Space verwenden.
5. Escape testen.
6. alle interaktiven Komponenten testen.
7. Fokus sichtbar?
8. Fokus logisch?
9. Fokus durch Sticky UI verdeckt?
10. keine Falle?

### Screen Reader Pass

Mindestens abhängig vom Entwicklungsumfeld:

- macOS: VoiceOver + Safari.
- Windows: NVDA + Chrome oder Firefox.
- mobile: TalkBack + Chrome bzw. VoiceOver + Safari.

Prüfe:

- page title.
- language.
- landmarks.
- heading hierarchy.
- link names.
- button names.
- dialog name/role/state.
- form labels.
- error messages.
- dynamic status.
- hidden content.
- live regions.

Nicht jede Kombination muss in jeder kleinen Website vollständig durchgeführt werden, aber bei ernsthaftem Accessibility-Release muss mindestens eine reale Screenreader-Umgebung getestet werden.

---

# 56. Regression Tests für die Toolbar

Belege mindestens:

## Trigger

- `[ ]` keyboard reachable
- `[ ]` accessible name
- `[ ]` expanded state
- `[ ]` visible focus
- `[ ]` mobile safe area
- `[ ]` no overlap

## Dialog

- `[ ]` accessible name
- `[ ]` initial focus
- `[ ]` close button
- `[ ]` Escape
- `[ ]` focus return
- `[ ]` scrollable
- `[ ]` no keyboard trap
- `[ ]` responsive

## Settings

- `[ ]` each toggle changes the page
- `[ ]` state reflected by `aria-pressed` / equivalent
- `[ ]` state persists after route change
- `[ ]` state can reset
- `[ ]` no console errors

## Visual modes

- `[ ]` font size
- `[ ]` spacing
- `[ ]` line height
- `[ ]` contrast
- `[ ]` grayscale/saturation
- `[ ]` readable font
- `[ ]` link highlight
- `[ ]` images hidden
- `[ ]` animations paused
- `[ ]` cursor
- `[ ]` focus highlight
- `[ ]` page structure
- `[ ]` read aloud, if enabled
- `[ ]` voice navigation, if enabled

---

# 57. Browser / Device Verification

Mindestens:

- Chrome desktop.
- Firefox desktop.
- Safari desktop, wenn Mac/iOS relevant.
- mobile Chromium.
- iOS Safari, wenn iOS relevant.

Prüfe:

- 100 % zoom.
- 200 % zoom.
- kleine mobile width.
- große Textgröße.
- reduced motion.
- forced colors/high contrast, wenn Testplattform vorhanden.

---

# 58. Build Verification

Nach Änderungen:

1. Lint.
2. Typecheck.
3. Tests.
4. Build.
5. App starten.
6. reale Route öffnen.
7. Toolbar bedienen.
8. Browser DevTools Console auf neue Errors prüfen.
9. Accessibility Scan erneut durchführen.

Wenn ein bestehender Check bereits vor dem Task fehlschlägt:

- baseline dokumentieren.
- eigene Regressionen von bestehenden Problemen unterscheiden.

---

# 59. Definition of Done

Der Task ist erst fertig, wenn:

### Architektur

- `[ ]` Toolbar global eingebaut.
- `[ ]` keine Drittanbieter-Accessibility-Abhängigkeit notwendig.
- `[ ]` bestehende Architektur respektiert.
- `[ ]` State zentral.

### Trigger

- `[ ]` auf allen relevanten Seiten vorhanden.
- `[ ]` keyboard accessible.
- `[ ]` accessible name/state.
- `[ ]` ausreichend große Hit Area.
- `[ ]` keine UI-Kollision.

### Panel

- `[ ]` Dialog/Popover semantisch korrekt.
- `[ ]` Focus Management korrekt.
- `[ ]` Escape funktioniert.
- `[ ]` Focus kehrt zurück.
- `[ ]` mobile/desktop responsive.

### Präferenzen

- `[ ]` Bigger Text.
- `[ ]` Text Spacing.
- `[ ]` Line Height.
- `[ ]` Contrast.
- `[ ]` Link Highlight.
- `[ ]` Pause/Reduce Motion.
- `[ ]` Hide Images.
- `[ ]` Readable Font.
- `[ ]` Larger Cursor.
- `[ ]` Focus Highlight.
- `[ ]` Page Structure.
- `[ ]` Reset.
- `[ ]` optionale Advanced Features nur, wenn sinnvoll und zuverlässig.

### Source Accessibility

- `[ ]` semantic HTML.
- `[ ]` headings.
- `[ ]` landmarks.
- `[ ]` alt text.
- `[ ]` links.
- `[ ]` forms.
- `[ ]` focus.
- `[ ]` keyboard.
- `[ ]` contrast.
- `[ ]` reflow.
- `[ ]` media.
- `[ ]` status messages.
- `[ ]` error handling.
- `[ ]` dialogs/popovers.
- `[ ]` third-party barriers documented.

### Verification

- `[ ]` lint.
- `[ ]` typecheck.
- `[ ]` tests.
- `[ ]` build.
- `[ ]` automated accessibility scan.
- `[ ]` keyboard pass.
- `[ ]` mindestens ein echter Screenreader-Test.
- `[ ]` mobile pass.
- `[ ]` 200 % text size pass.

---

# 60. Accessibility Statement

Wenn die Website bereits eine Accessibility Statement Page besitzt:

- verlinken.
- nicht automatisch überschreiben.

Wenn sie noch keine hat und die Website rechtlich/publizistisch eine solche Erklärung benötigt:

- eine passende Seite bzw. Sektion anlegen.
- tatsächlichen Status ehrlich darstellen.
- Datum der letzten Prüfung nennen.
- bekannte Einschränkungen nennen.
- Kontaktmöglichkeit für Accessibility-Feedback nennen.

Keine Aussagen wie:

```text
100% WCAG Compliant
BFSG sicher
Barrierefrei garantiert
```

nur weil diese Skill installiert wurde.

Eine ehrliche Formulierung ist wichtiger als ein Compliance-Badge.

---

# 61. Rechtliche Guardrails für Deutschland / EU

Bei einem deutschen Projekt mit möglicher BFSG-Relevanz:

- Prüfe zuerst, ob das konkrete Unternehmen/Dienstleistungsangebot überhaupt in den Anwendungsbereich fällt.
- Prüfe Kleinstunternehmens-Ausnahmen.
- Prüfe Übergangsbestimmungen.
- Prüfe, ob es E-Commerce bzw. eine vom Gesetz erfasste elektronische Dienstleistung ist.
- Prüfe die technischen Anforderungen einschließlich barrierefreier Identifizierung, Authentifizierung und Zahlung, sofern relevant.
- Eine reine Informationswebsite ist nicht automatisch mit einem Online-Shop gleichzusetzen.
- Nicht aus dem Vorhandensein eines Accessibility-Buttons ableiten, dass das BFSG erfüllt ist.

Für eine rechtliche Aussage immer Primärquellen verwenden, insbesondere:

- BFSG.
- BFSGV.
- EUR-Lex.
- aktuelle Veröffentlichungen der Bundesfachstelle Barrierefreiheit.

---

# 62. Häufige Fehler / Gotchas

## Gotcha 1 — „Wir haben jetzt ein Accessibility Widget, also sind wir barrierefrei.“

Falsch.

Die Toolbar ist eine zusätzliche Präferenzebene.

## Gotcha 2 — `div onclick`

Nicht als Ersatz für Buttons verwenden.

## Gotcha 3 — `outline: none`

Ohne gleichwertigen Focus-Indikator vermeiden.

## Gotcha 4 — Nur Farbe

Information nicht nur über Rot/Grün/Blau kommunizieren.

## Gotcha 5 — Text skalieren mit `transform: scale`

Erzeugt schnell visuelle und semantische Layoutprobleme. Besser Typography/Layout systematisch skalierbar machen.

## Gotcha 6 — `overflow: hidden`

Oft Ursache für abgeschnittene Inhalte bei großer Schrift oder Textabstand.

## Gotcha 7 — fake screen reader

Ein Text-to-Speech-Button ist kein Screenreader.

## Gotcha 8 — automatische ARIA-Reparatur

Nicht massenhaft `aria-label`/roles injizieren, ohne Bedeutung zu kennen.

## Gotcha 9 — Tooltips nur per Hover

Tastatur und Dismissibility berücksichtigen.

## Gotcha 10 — Focus hinter Sticky Header

Mit `scroll-padding` / `scroll-margin` arbeiten.

## Gotcha 11 — Mobile only

Accessibility muss auf allen relevanten Breakpoints funktionieren.

## Gotcha 12 — automatisierter Scan als Endabnahme

Automatisierte Tools können nur einen Teil der Barrieren erfassen. Manuelle Prüfung ist erforderlich.

## Gotcha 13 — externe Accessibility-CDN

Nicht nötig. Eine native, projektinterne Komponente ist robuster, privater und besser mit dem Design verbunden.

## Gotcha 14 — Brand über Accessibility

Wenn Brandfarben nicht ausreichend kontrastieren, muss der Accessibility-Modus eine alternative Darstellung schaffen. Die eigentliche Website sollte nach Möglichkeit bereits WCAG-konforme Farben verwenden.

## Gotcha 15 — Accessibility-Toolbar selbst ist unzugänglich

Das ist besonders gravierend.

Der Trigger und das Menü müssen selbst alle wesentlichen Accessibility-Grundlagen erfüllen.

---

# 63. Umsetzungsreihenfolge

Nutze diese Priorität, wenn der Task groß ist:

### P0 — echte Barrieren

1. semantisches HTML.
2. keyboard accessibility.
3. accessible names.
4. focus visibility/order.
5. forms/errors.
6. contrast.
7. headings/landmarks.
8. images/alt.
9. responsive/reflow.
10. dialogs/menus.
11. motion.
12. status messages.

### P1 — Accessibility Toolbar Core

1. globaler Trigger.
2. accessible dialog.
3. text size.
4. text spacing.
5. contrast.
6. pause animations.
7. highlight links.
8. hide images.
9. readable font.
10. focus highlight.
11. reset.
12. page structure.

### P2 — Enhancement

1. profiles.
2. larger cursor.
3. grayscale/saturation.
4. read aloud.
5. voice navigation.
6. tooltips.
7. dictionary.

P2 nur umsetzen, wenn die Funktion zuverlässig und wartbar ist.

---

# 64. Erwartetes Ergebnis / UX

Das fertige Ergebnis soll sich wie ein integrierter Bestandteil der Website anfühlen.

Beispiel Desktop:

```text
                         ┌───────────────────────────────┐
                         │ Barrierefreiheit          ×  │
                         ├───────────────────────────────┤
                         │ Profile / Sprache / Reset     │
                         ├────────────┬────────────┬─────┤
                         │ Größerer   │ Textabstand│ Kon-│
                         │ Text       │            │ trast
                         ├────────────┼────────────┼─────┤
                         │ Animation  │ Links      │ Bild│
                         │ stoppen    │ markieren  │ aus │
                         ├────────────┼────────────┼─────┤
                         │ Zeilenhöhe │ Lesefreund- │     │
                         │            │ liche Schrift    │
                         ├───────────────────────────────┤
                         │ Seitenstruktur / Vorlesen    │
                         ├───────────────────────────────┤
                         │ Alle Einstellungen zurücksetzen│
                         │ Barrierefreiheitserklärung    │
                         └───────────────────────────────┘

                    (Accessibility Button)
```

Die tatsächliche UI soll zum bestehenden Brand Design passen.

---

# 65. Abschlussbericht nach der Implementierung

Antworte nach dem Coding-Task strukturiert:

## Implementiert

Kurze Liste der tatsächlich eingebauten Funktionen.

## Accessibility Remediation

Welche bestehenden Barrieren wurden direkt im Quellcode behoben?

## Geänderte Dateien

Liste der relevanten Dateien.

## Tests

- Build
- Lint
- Typecheck
- automatisierter Accessibility Scan
- Keyboard
- Screenreader
- Mobile

Nur tatsächlich ausgeführte Tests als „passed“ bezeichnen.

## Offene Punkte

Drittanbieter- oder Content-Probleme, die nicht sicher automatisch gelöst werden konnten.

## Compliance Hinweis

Keine rechtliche Konformitätsbehauptung ohne entsprechende Prüfung.

---

# 66. Quellen / Referenzbibliothek

## W3C

WCAG 2.2:
https://www.w3.org/TR/WCAG22/

WCAG 2.2 Understanding:
https://www.w3.org/WAI/WCAG22/Understanding/

WCAG Quick Reference:
https://www.w3.org/WAI/WCAG22/quickref/

What's New in WCAG 2.2:
https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

WAI-ARIA:
https://www.w3.org/WAI/standards-guidelines/aria/

ARIA Authoring Practices Guide:
https://www.w3.org/WAI/ARIA/apg/

Accessible Names and Descriptions:
https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

## MDN

HTML Accessibility:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML

## EU / Germany

BFSG:
https://www.gesetze-im-internet.de/bfsg/

BFSGV:
https://www.gesetze-im-internet.de/bfsgv/

BFSG § 3:
https://www.gesetze-im-internet.de/bfsg/__3.html

BFSG § 14:
https://www.gesetze-im-internet.de/bfsg/__14.html

BFSG § 28:
https://www.gesetze-im-internet.de/bfsg/__28.html

Anlage 3 BFSG:
https://www.gesetze-im-internet.de/bfsg/anlage_3.html

Bundesfachstelle Barrierefreiheit – E-Commerce:
https://www.bundesfachstelle-barrierefreiheit.de/DE/Barrierefreiheitsstaerkungsgesetz/E-Commerce/online-shops_node

European Accessibility Act:
https://eur-lex.europa.eu/eli/dir/2019/882/oj

EU Standards/Harmonisation:
https://digital-strategy.ec.europa.eu/en/policies/web-accessibility-directive-standards-and-harmonisation

## ETSI

EN 301 549:
https://www.etsi.org/standards-search#page=1&q=301%20549

Current ETSI EN 301 549 v4.1.0 publication:
https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_20/en_301549v040100ev.pdf

## Claude Skills

Claude Code Skills documentation:
https://code.claude.com/docs/en/skills

Anthropic – How we use Skills:
https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills

Anthropic – Complete guide to building Skills:
https://claude.com/blog/complete-guide-to-building-skills-for-claude

---

# Final operating rule

Bei jedem Aufruf von `cg-web-accessibility` gilt:

**Nicht nur ein Widget bauen. Die Website selbst barrierefrei machen.**

Die Toolbar soll Besuchern zusätzliche Kontrolle geben. Die eigentliche Accessibility muss im DOM, in den Styles, in den Interaktionen, in den Inhalten und in der gesamten User Journey leben.

Die technisch sauberste Lösung ist normalerweise:

```text
Accessible source code
        +
Accessible interaction patterns
        +
Accessible design system
        +
Accessibility testing
        +
User-controlled accessibility preferences
        =
robuste Website Accessibility
```
