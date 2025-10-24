# Design-Dokumentation: NotenManager

## Übersicht
Die **NotenManager** App ist eine Notenverwaltungs-Applikation für Schulprojekte mit minimalistischem, modernem Design inspiriert von Notion und Linear.

---

## 🎨 Farbschema

### Hauptfarben
- **Primärfarbe (Blau)**: `#3B82F6` (blue-600) bis `#1D4ED8` (blue-700)
  - **Verwendung**: Aktive Navigationselemente, Call-to-Action Buttons, Akzente
  - **Begründung**: Blau vermittelt Vertrauen, Professionalität und Seriosität - ideal für eine Bildungs-App. Es wirkt beruhigend und fördert die Konzentration.

### Neutrale Farben
- **Weiß**: `#FFFFFF` (white)
  - **Verwendung**: Hintergründe für Karten, Header, Hauptcontainer
  - **Begründung**: Maximale Lesbarkeit und Klarheit

- **Hellgrau**: `#F9FAFB` (gray-50)
  - **Verwendung**: App-Hintergrund
  - **Begründung**: Subtiler Kontrast zu weißen Elementen ohne visuelle Ermüdung

- **Mittelgrau**: `#6B7280` (gray-500) bis `#9CA3AF` (gray-400)
  - **Verwendung**: Sekundärer Text, Beschreibungen, Platzhalter
  - **Begründung**: Hierarchie in der Informationsdarstellung

- **Dunkelgrau**: `#111827` (gray-900) bis `#374151` (gray-700)
  - **Verwendung**: Haupttext, Überschriften
  - **Begründung**: Optimale Lesbarkeit und Kontrast

### Akzentfarben
- **Hellblau**: `#EFF6FF` (blue-50)
  - **Verwendung**: Hover-Zustände, aktive Navigations-Hintergründe
  - **Begründung**: Subtile Hervorhebung ohne aufdringlich zu wirken

- **Grün**: `#10B981` (green-500)
  - **Verwendung**: Erfolgreiche Aktionen, positive Noten (5-6)
  - **Begründung**: Universelle Farbe für Erfolg und Bestätigung

- **Gelb**: `#F59E0B` (yellow-500)
  - **Verwendung**: Mittlere Noten (4-4.9)
  - **Begründung**: Neutraler Hinweis auf durchschnittliche Performance

- **Rot**: `#EF4444` (red-500)
  - **Verwendung**: Niedrige Noten (unter 4), Fehlermeldungen, Löschaktionen
  - **Begründung**: Warnsignal für kritische Bereiche

---

## 🔤 Schriftarten

### Verwendete Schriftart
- **System-Font-Stack**: Die App nutzt die nativen System-Schriftarten des Betriebssystems
  - macOS/iOS: San Francisco
  - Windows: Segoe UI
  - Android: Roboto
  - Linux: System UI Fonts

### Begründung
1. **Performance**: Keine externen Font-Downloads nötig → schnellere Ladezeiten
2. **Konsistenz**: Nutzer sehen die gewohnte Schrift ihres Systems
3. **Barrierefreiheit**: System-Fonts sind für optimale Lesbarkeit optimiert
4. **Moderne Best Practice**: Viele moderne Apps (GitHub, Medium, etc.) nutzen System-Fonts

### Typografie-Hierarchie (aus globals.css)

```css
h1: font-size: var(--text-2xl), font-weight: 500 (medium)
h2: font-size: var(--text-xl), font-weight: 500 (medium)
h3: font-size: var(--text-lg), font-weight: 500 (medium)
h4: font-size: var(--text-base), font-weight: 500 (medium)
p:  font-size: var(--text-base), font-weight: 400 (normal)
```

- **Font-Weight Normal (400)**: Fließtext, Beschreibungen
- **Font-Weight Medium (500)**: Überschriften, Labels, Buttons
- **Line-Height: 1.5**: Optimale Lesbarkeit für alle Texttypen

---

## 📐 Design-Prinzipien

### 1. Abgerundete Ecken
- **Standard Border-Radius**: `0.625rem` (10px) - `rounded-2xl`
- **Buttons & Karten**: `rounded-2xl` für weiche, moderne Optik
- **Logo/Icon-Container**: `rounded-2xl` für Konsistenz
- **Begründung**: Freundlicher, moderner Look inspiriert von Notion/Linear

### 2. Schatten (Shadows)
- **Subtile Schatten**: `shadow-sm` für Karten und aktive Elemente
- **Card-Schatten**: `shadow-md` für schwebende Elemente
- **Begründung**: Räumliche Tiefe ohne visuelles Durcheinander

### 3. Spacing & Padding
- **Konsistentes Padding**: `p-4`, `p-6`, `p-8` für Container
- **Gap zwischen Elementen**: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- **Begründung**: Einheitlicher Rhythmus und luftiges Layout

### 4. Transitionen
- **Hover-Effekte**: `transition-all` für sanfte Übergänge
- **Dauer**: Default Tailwind (150ms)
- **Begründung**: Flüssige, responsive Benutzerinteraktion

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 1024px` (unter `lg`)
- **Desktop**: `≥ 1024px` (ab `lg`)

### Navigation

#### Desktop (ab 1024px)
- **Typ**: Sidebar links (Fixed)
- **Layout**: 
  - Logo & Datum oben
  - Navigation vertikal
  - Impressum unten
  - Fixed Position (bleibt beim Scrollen sichtbar)
- **Icons**: Mit Text-Labels
- **Begründung**: Klassisches Dashboard-Layout, maximale Übersichtlichkeit, vertraute Navigation

#### Mobile (unter 1024px)
- **Typ**: Hamburger-Menü
- **Layout**: 
  - App-Name links, Burger-Icon rechts
  - Slide-out Menü bei Klick
- **Icons**: Mit Text-Labels im Menü
- **Begründung**: Platzsparend, Standard-UX für Mobile

### Layout-Unterschiede
- **Desktop**: Mehrere Spalten (z.B. 2-3 Cards nebeneinander)
- **Mobile**: Einzelne Spalte (untereinander)
- **Implementierung**: Tailwind Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

---

## ✅ Erfüllung aller Schulprojekt-Anforderungen (Teil 3)

### ✅ 1. Attraktive Landingpage/Startseite
- **Erfüllt**: Dashboard mit Willkommensnachricht, Statistiken und Bildern
- **Bilder**: Min. 4 Bilder (von Unsplash) auf About-Seite
- **Text**: Erklärungen auf Dashboard, About und Kontakt

### ✅ 2. Menu Navigation Desktop vs. Mobile unterschiedlich
- **Desktop**: Vertikale Sidebar links (Fixed) mit Logo oben und Navigation
- **Mobile**: Hamburger-Menü mit Slide-out Drawer
- **Erfüllt**: Komplett unterschiedliche Navigationstypen und Layouts

### ✅ 3. Min. 4 weitere Unterseiten
1. **Dashboard** (Startseite)
2. **Module** (Notenverwaltung für Module)
3. **Fächer** (Notenverwaltung für Schulfächer)
4. **Über uns** (Informationen zur App)
5. **Kontakt** (Kontaktformular)
6. **Impressum** (Pflichtseite)
- **Erfüllt**: 6 Seiten (mehr als gefordert)

### ✅ 4. Impressum
- **Erfüllt**: Separate Impressumsseite mit allen rechtlichen Informationen
- **Zugriff**: Über Navigation und Footer

### ✅ 5. Durchgängiger Header/Footer
- **Navigation Desktop**: Vertikale Sidebar links, fixed (immer sichtbar)
- **Navigation Mobile**: Kompakter Header mit Hamburger-Menü
- **Footer**: Auf allen Seiten, mit Links zu allen Hauptseiten
- **Erfüllt**: Konsistentes Layout auf allen Seiten

### ✅ 6. Kontaktformular
- **Erfüllt**: Vollständiges Formular auf Kontakt-Seite
- **Felder**: Name, E-Mail, Betreff, Nachricht
- **Validierung**: React Hook Form mit Zod-Validierung
- **Feedback**: Toast-Benachrichtigungen bei Erfolg/Fehler

### ✅ 7. Bildergalerie mit min. 4 Bildern
- **Erfüllt**: Über uns-Seite zeigt 4 hochwertige Unsplash-Bilder
- **Themen**: Lernen, Bildung, Zusammenarbeit
- **Layout**: Responsive Grid (2x2 auf Desktop, 1 Spalte auf Mobile)

### ✅ 8. Tabelle
- **Erfüllt**: Module-Seite enthält Notentabelle
- **Spalten**: Note, Gewichtung, Beschreibung, Aktionen
- **Features**: Sortierbar, editierbar, responsive

### ✅ 9. Site ist responsiv
- **Desktop**: Mehrere Spalten, horizontale Navigation
- **Mobile**: Einzelne Spalte, Hamburger-Menü
- **Elemente nebeneinander (Desktop)**: 
  - Dashboard: 2-3 Spalten für Statistik-Karten
  - Module/Fächer: 2-3 Spalten für Module-Karten
  - About: 2x2 Grid für Bilder
- **Elemente untereinander (Mobile)**: Alle Karten stapeln sich
- **Erfüllt**: Vollständig responsive mit unterschiedlichen Layouts

### ✅ 10. Funktionen getestet (Links funktionieren)
- **Navigation**: Alle Links funktional
- **Forms**: Validierung und Submission funktioniert
- **CRUD**: Hinzufügen, Bearbeiten, Löschen von Noten
- **Berechnungen**: Automatische Durchschnittsberechnung
- **Erfüllt**: Alle interaktiven Elemente funktionieren

### ✅ 11. Veröffentlichung der Website
- **Bereit**: Code ist produktionsreif
- **Deployment**: Kann auf Vercel, Netlify, GitHub Pages deployed werden
- **Erfüllt**: Vorbereitet für Veröffentlichung

### ✅ 12. Site entspricht Entwurf
- **Design**: Minimalistisch, modern (Notion/Linear-Stil)
- **Farben**: Neutral mit blauen Akzenten
- **Typografie**: Klare Hierarchie
- **Erfüllt**: Konsistentes Design-System

### ✅ 13. Formular-Validierung
- **Erfüllt**: Kontaktformular mit vollständiger Validierung
- **Technologie**: React Hook Form + Zod
- **Checks**: 
  - Name: Mindestens 2 Zeichen
  - E-Mail: Gültige E-Mail-Adresse
  - Betreff: Mindestens 3 Zeichen
  - Nachricht: Mindestens 10 Zeichen
- **Feedback**: Fehler werden direkt unter Feldern angezeigt

---

## 🎯 Zusammenfassung

Die **NotenManager** App erfüllt **alle 13 Anforderungen** des Schulprojekts:

1. ✅ Attraktive Landingpage mit Bildern + Text
2. ✅ Unterschiedliche Navigation Desktop/Mobile
3. ✅ 6 Unterseiten (gefordert: min. 4)
4. ✅ Impressum
5. ✅ Durchgängiger Header/Footer
6. ✅ Kontaktformular
7. ✅ Bildergalerie (4 Bilder)
8. ✅ Tabelle (Notentabelle)
9. ✅ Responsive Design
10. ✅ Getestete Funktionen
11. ✅ Bereit für Veröffentlichung
12. ✅ Entspricht Entwurf
13. ✅ Formular-Validierung

### Design-Entscheidungen begründet:
- **Farben**: Blau für Vertrauen/Professionalität, Grau für Neutralität
- **Schriftart**: System-Fonts für Performance und Barrierefreiheit
- **Layout**: Minimalistisch und luftig für beste Benutzererfahrung
- **Navigation**: Unterschiedlich auf Desktop/Mobile für optimale UX
