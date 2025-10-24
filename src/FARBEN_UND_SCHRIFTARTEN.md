# Farben & Schriftarten - NotenManager

## 🎨 Farbpalette

### Primärfarben

| Farbe | Hex-Code | Tailwind | Verwendung | Begründung |
|-------|----------|----------|------------|------------|
| **Blau (Primär)** | `#3B82F6` | `blue-600` | Aktive Navigation, CTA-Buttons, Links | Blau vermittelt Vertrauen und Professionalität. Perfekt für Bildungs-Apps, da es Konzentration fördert und beruhigend wirkt. |
| **Dunkelblau** | `#1D4ED8` | `blue-700` | Hover-Zustände, Buttons | Stärkerer Kontrast für interaktive Elemente. |
| **Hellblau (Akzent)** | `#EFF6FF` | `blue-50` | Hintergründe für aktive Elemente, Hover | Subtile Hervorhebung ohne aufdringlich zu wirken. Harmoniert mit Primärfarbe. |

### Neutrale Farben (Grautöne)

| Farbe | Hex-Code | Tailwind | Verwendung | Begründung |
|-------|----------|----------|------------|------------|
| **Weiß** | `#FFFFFF` | `white` | Haupthintergrund, Karten, Header | Maximale Lesbarkeit, sauberer Look, zeitlos modern. |
| **Hellgrau** | `#F9FAFB` | `gray-50` | App-Hintergrund, Container | Subtiler Kontrast zu Weiß ohne visuelle Ermüdung. Wirkt luftig und modern. |
| **Mittelgrau Hell** | `#F3F4F6` | `gray-100` | Input-Hintergründe, Hover-Zustände | Dezente Abgrenzung für Eingabefelder. |
| **Rahmen Grau** | `#E5E7EB` | `gray-200` | Borders, Trennlinien, Cards | Klare Abgrenzung ohne harte Kontraste. |
| **Sekundärtext Grau** | `#9CA3AF` | `gray-400` | Platzhalter, Icons (inaktiv) | Hierarchie in der Informationsdarstellung. |
| **Text Grau** | `#6B7280` | `gray-500` | Sekundärer Text, Beschreibungen | Gute Lesbarkeit für weniger wichtige Informationen. |
| **Text Mittelgrau** | `#4B5563` | `gray-600` | Labels, Zwischenüberschriften | Klare Abgrenzung zu Haupttext. |
| **Text Dunkelgrau** | `#374151` | `gray-700` | Haupttext (leicht) | Weicher als reines Schwarz, aber gut lesbar. |
| **Text Schwarz** | `#111827` | `gray-900` | Überschriften, wichtiger Text | Maximaler Kontrast für wichtigste Inhalte. |

### Statusfarben (Notenbewertung & Feedback)

| Farbe | Hex-Code | Tailwind | Verwendung | Begründung |
|-------|----------|----------|------------|------------|
| **Grün** | `#10B981` | `green-500` | Gute Noten (5.0-6.0), Erfolg | Universal verständliche Farbe für Erfolg und positive Ergebnisse. |
| **Grün Hell** | `#D1FAE5` | `green-100` | Hintergrund für gute Noten | Subtile positive Hervorhebung. |
| **Gelb/Orange** | `#F59E0B` | `yellow-500` | Mittlere Noten (4.0-4.9), Warnung | Signalisiert "OK" bzw. "Achtung" ohne Alarm zu schlagen. |
| **Gelb Hell** | `#FEF3C7` | `yellow-100` | Hintergrund für mittlere Noten | Neutrale Hervorhebung. |
| **Rot** | `#EF4444` | `red-500` | Niedrige Noten (<4.0), Fehler, Löschen | Universelle Warnfarbe. Zieht Aufmerksamkeit auf kritische Bereiche. |
| **Rot Hell** | `#FEE2E2` | `red-100` | Hintergrund für niedrige Noten | Dezente Warnung ohne zu alarmieren. |

---

## 🔤 Schriftarten

### Verwendete Schriftfamilie

**System Font Stack (Native Betriebssystem-Schriften)**

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

| Betriebssystem | Schriftart | Eigenschaften |
|----------------|------------|---------------|
| **macOS / iOS** | San Francisco | Modern, gut lesbar, speziell für Apple-Geräte optimiert |
| **Windows** | Segoe UI | Klare, professionelle Schrift von Microsoft |
| **Android** | Roboto | Google's Material Design Schrift, sehr lesbar |
| **Linux** | System UI Fonts | Verschiedene System-Fonts je nach Distribution |

### Begründung für System-Fonts

| Vorteil | Erklärung |
|---------|-----------|
| **Performance** | Keine externen Font-Downloads nötig → 0 Ladezeit für Schriften |
| **Konsistenz** | Nutzer sehen die gewohnte Schrift ihres Systems → vertraute Optik |
| **Barrierefreiheit** | System-Fonts sind für optimale Lesbarkeit am jeweiligen Gerät optimiert |
| **Dateigröße** | Keine zusätzlichen Font-Dateien → kleinere App-Größe |
| **Best Practice** | Moderne Apps wie GitHub, Medium, Slack nutzen System-Fonts |
| **Plattformübergreifend** | Funktioniert auf allen Geräten ohne Konfiguration |

---

## 📏 Typografie-Hierarchie

### Schriftgrößen

| Element | Größe | Font-Weight | Line-Height | Verwendung |
|---------|-------|-------------|-------------|------------|
| **h1** | `2xl` (~24px) | 500 (Medium) | 1.5 | Seitentitel, Hauptüberschriften |
| **h2** | `xl` (~20px) | 500 (Medium) | 1.5 | Sektionsüberschriften |
| **h3** | `lg` (~18px) | 500 (Medium) | 1.5 | Unterüberschriften, Card-Titel |
| **h4** | `base` (~16px) | 500 (Medium) | 1.5 | Kleinere Überschriften |
| **p** | `base` (~16px) | 400 (Normal) | 1.5 | Fließtext, Beschreibungen |
| **small** | `sm` (~14px) | 400 (Normal) | 1.5 | Kleintext, Metadaten |
| **label** | `base` (~16px) | 500 (Medium) | 1.5 | Formular-Labels |
| **button** | `base` (~16px) | 500 (Medium) | 1.5 | Button-Text |

### Font-Weights (Schriftstärke)

| Gewicht | Wert | Tailwind | Verwendung | Begründung |
|---------|------|----------|------------|------------|
| **Normal** | 400 | `font-normal` | Fließtext, Beschreibungen, Input-Text | Standard-Lesbarkeit für längere Texte |
| **Medium** | 500 | `font-medium` | Überschriften, Labels, Buttons, Navigation | Hebt wichtige Elemente hervor ohne zu aufdringlich zu sein |
| **Semibold** | 600 | `font-semibold` | Wichtige CTAs, Statistiken | (Optional) Für besondere Betonung |
| **Bold** | 700 | `font-bold` | (Nicht verwendet) | Zu stark für das minimalistische Design |

### Line-Height (Zeilenhöhe)

**Einheitlich: `1.5` (150% der Schriftgröße)**

**Begründung:**
- Optimale Lesbarkeit für alle Textarten
- Genug Abstand zwischen Zeilen für komfortables Lesen
- Standard für barrierefreie Webseiten (WCAG-konform)
- Verhindert, dass Text "gequetscht" aussieht

---

## 🎯 Design-Prinzipien

### Border-Radius (Abgerundete Ecken)

| Größe | Wert | Tailwind | Verwendung |
|-------|------|----------|------------|
| **Standard** | `10px` | `rounded-2xl` | Buttons, Karten, Navigation, Container |
| **Groß** | `12px` | `rounded-3xl` | Große Cards, Hero-Elemente |
| **Klein** | `8px` | `rounded-xl` | Kleinere Elemente, Badges |

**Begründung:** Weiche, abgerundete Ecken erzeugen einen modernen, freundlichen Look (inspiriert von Notion/Linear).

### Schatten (Shadows)

| Größe | Tailwind | Verwendung | Begründung |
|-------|----------|------------|------------|
| **Klein** | `shadow-sm` | Aktive Navigation, leichte Erhebung | Subtile räumliche Tiefe |
| **Mittel** | `shadow-md` | Cards, schwebende Elemente | Klarere Abgrenzung vom Hintergrund |
| **Groß** | `shadow-lg` | Dialoge, Modals | Starke Hervorhebung wichtiger Overlays |

### Spacing (Abstände)

| Größe | Wert | Tailwind | Verwendung |
|-------|------|----------|------------|
| **XS** | `8px` | `2` | Enge Abstände (Icons zu Text) |
| **S** | `12px` | `3` | Kleine Abstände (Button-Padding) |
| **M** | `16px` | `4` | Standard-Abstände (Card-Padding) |
| **L** | `24px` | `6` | Große Abstände (Container-Padding) |
| **XL** | `32px` | `8` | Sehr große Abstände (Sektionen) |

**Begründung:** Konsistentes Spacing-System sorgt für visuellen Rhythmus und professionelles Erscheinungsbild.

---

## 📱 Responsive Breakpoints

| Breakpoint | Größe | Tailwind | Geräte |
|------------|-------|----------|--------|
| **Mobile** | `< 1024px` | `< lg` | Smartphones, Tablets |
| **Desktop** | `≥ 1024px` | `lg:` | Laptops, Desktop-PCs |

**Begründung:** Ein einziger Breakpoint vereinfacht die Entwicklung und deckt die zwei Hauptnutzungsszenarien ab.

---

## ✨ Zusammenfassung

### Warum diese Farbpalette?

1. **Blau als Primärfarbe**: Vertrauenswürdig, beruhigend, ideal für Bildung
2. **Neutrale Grautöne**: Minimalistisch, lenkt nicht ab, zeitlos modern
3. **Ampelfarben (Grün/Gelb/Rot)**: Universal verständlich für Notenbewertungen
4. **Hoher Kontrast**: Barrierefreiheit und beste Lesbarkeit

### Warum System-Fonts?

1. **0ms Ladezeit** für Schriften
2. **Vertraute Optik** für den Nutzer
3. **Optimale Lesbarkeit** auf jedem Gerät
4. **Moderne Best Practice** (GitHub, Medium, Notion verwenden es)

### Warum diese Typografie?

1. **Medium (500) für Überschriften**: Klar erkennbar, nicht zu bold
2. **Normal (400) für Text**: Angenehm zu lesen
3. **Line-Height 1.5**: WCAG-konform, optimale Lesbarkeit
4. **Konsistentes System**: Vorhersagbar und wartbar
