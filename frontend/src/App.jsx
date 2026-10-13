import { useRef, useState } from 'react';

import BookingForm from './components/BookingForm';
import ContactCard from './components/ContactCard';
import OfferCard from './components/OfferCard';
import SectionHeading from './components/SectionHeading';

const heroImage = new URL('../../Bilder/Wingovers.jpg', import.meta.url).href;
const pilotImage = new URL('../../Bilder/Profilbild.jpeg', import.meta.url).href;
const flightImages = {
  panorama: new URL('../../Bilder/Landing.jpg', import.meta.url).href,
  thermal: new URL('../../Bilder/During_Flight.jpg', import.meta.url).href,
  adventure: new URL('../../Bilder/Wingovers.jpg', import.meta.url).href,
  voucher: new URL('../../Bilder/Start.jpg', import.meta.url).href,
};

const flightOffers = [
  {
    key: 'Panoramaflug',
    image: flightImages.panorama,
    title: 'Panoramaflug',
    description: 'Ein ruhiger, aussichtsreicher Flug mit weitem Blick über die Alpen und die Täler.',
    price: 'CHF 180',
    details: [
      { label: 'Dauer', value: '15–20 Min.' },
      { label: 'Höhenunterschied', value: '900–1.200 m' },
      { label: 'Preis', value: 'CHF 180' },
      { label: 'Beschreibung', value: 'Ideal für Erstflieger und alle, die die Landschaft genießen möchten.' },
    ],
  },
  {
    key: 'Thermikflug',
    image: flightImages.thermal,
    title: 'Thermikflug',
    description: 'Ein längerer Flug mit Thermik für mehr Flugzeit, mehr Höhe und mehr Freiheit.',
    price: 'CHF 220',
    details: [
      { label: 'Dauer', value: '25–35 Min.' },
      { label: 'Höhenunterschied', value: '1.100–1.500 m' },
      { label: 'Preis', value: 'CHF 220' },
      { label: 'Beschreibung', value: 'Für Gäste, die mehr Flugzeit und ein intensiveres Bergerlebnis möchten.' },
    ],
  },
  {
    key: 'Abenteuerflug',
    image: flightImages.adventure,
    title: 'Abenteuerflug',
    description: 'Die dynamische Wahl mit spielerischen Manövern und einem sportlicheren Flugprofil.',
    price: 'CHF 240',
    details: [
      { label: 'Dauer', value: '20–30 Min.' },
      { label: 'Höhenunterschied', value: '1.000–1.400 m' },
      { label: 'Preis', value: 'CHF 240' },
      { label: 'Beschreibung', value: 'Perfekt für Gäste, die es aktiver und lebendiger mögen.' },
    ],
  },
  {
    key: 'Geschenkgutschein',
    image: flightImages.voucher,
    title: 'Geschenkgutschein',
    description: 'Ein flexibles Geschenk für Geburtstage, Jubiläen und besondere Überraschungen.',
    price: 'Ab CHF 180',
    details: [
      { label: 'Preis', value: 'Ab CHF 180' },
      { label: 'Beschreibung', value: 'Ein passendes Geschenk für alle Abenteuerfans.' },
    ],
  },
];

const contactItems = [
  {
    label: 'Telefon',
    value: '+41 79 278 05 57',
    href: 'tel:+41792780557',
    description: 'Für Buchungsfragen und Wetter-Updates anrufen.',
  },
  {
    label: 'E-Mail',
    value: 'silas.mathis@bluewin.ch',
    href: 'mailto:silas.mathis@bluewin.ch',
    description: 'Buchungsdetails oder Sonderwünsche per E-Mail senden.',
  },
  {
    label: 'Instagram',
    value: '@mathis.silas',
    href: 'https://www.instagram.com/mathis.silas/',
    description: 'Flugbilder, Wetter-Highlights und Bergimpressionen ansehen.',
  },
  {
    label: 'Standorte',
    value: 'Davos, Klosters, Sargans, Flums, Fanas',
    href: 'https://maps.google.com',
    description: 'Treffpunkte in Graubünden und im Sarganserland.',
  },
];

function App() {
  const bookingSectionRef = useRef(null);
  const [selectedFlightType, setSelectedFlightType] = useState('');

  function scrollToBooking(flightType) {
    setSelectedFlightType(flightType);
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="site-logo" href="#home">
          Mathis Tandemflights
        </a>
        <nav className="site-nav" aria-label="Hauptnavigation">
          <a href="#about">Über mich</a>
          <a href="#offers">Angebote</a>
          <a href="#booking">Buchung</a>
          <a href="#contact">Kontakt</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__content">
            <span className="hero__eyebrow">Gleitschirm. Berge. Freiheit.</span>
            <h1>Die Alpen von oben erleben</h1>
            <p>
              Buche deinen Tandemflug mit einem professionellen Piloten und sende eine Buchungsanfrage, die manuell auf Wetter,
              Sicherheit und Verfügbarkeit geprüft wird.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#booking">
                Flug buchen
              </a>
              <a className="button button--ghost" href="#offers">
                Mehr erfahren
              </a>
            </div>
            <div className="hero__stats" aria-label="Buchungsübersicht">
              <div>
                <strong>100%</strong>
                <span>Manuelle Prüfung</span>
              </div>
              <div>
                <strong>4 Flugarten</strong>
                <span>Von ruhig bis sportlich</span>
              </div>
              <div>
                <strong>Alpenregion</strong>
                <span>Startplätze in den Bergen</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <img src={heroImage} alt="Gleitschirmflug über den Alpen" />
            <div className="hero__card">
              <span>Buchungsablauf</span>
              <strong>Anfrage → Prüfung → Bestätigung</strong>
              <p>Buchungen werden erst bestätigt, wenn der Pilot Wetter und Flugbedingungen geprüft hat.</p>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <SectionHeading
            eyebrow="Über mich"
            title="Professioneller Tandempilot"
            description="Zuverlässig, erfahren und mit Fokus auf sichere Flüge und klare Kommunikation."
          />
          <div className="about__grid">
            <article className="about-card about-card--photo">
              <div className="about-card__photo">
                <img src={pilotImage} alt="Silas Mathis - Tandempilot" />
              </div>
            </article>
            <article className="about-card">
              <h3>Silas Mathis</h3>
              <p>
                Selbstständiger Gleitschirm-Tandempilot mit Leidenschaft für sichere und unvergessliche Flüge in den Alpen.
                Student an der ETH Zürich für Erd- und Klimawissenschaften und ausgebildeter Gebirgsspezialist.
              </p>
              <ul>
                <li>Diplomierter Tandempilot seit 2025</li>
                <li>ETH-Student (Erd- und Klimawissenschaften)</li>
                <li>Gebirgsausbildung Andermatt (2023–2024)</li>
                <li>Cambridge English C1</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section offers" id="offers">
          <SectionHeading
            eyebrow="Angebote"
            title="Wähle deinen Flugstil"
            description="Jedes Angebot ist als Buchungskarte aufgebaut, damit du das passende Erlebnis auswählen kannst."
          />
          <div className="offers__grid">
            {flightOffers.map((offer) => (
              <OfferCard
                key={offer.key}
                image={offer.image}
                title={offer.title}
                description={offer.description}
                price={offer.price}
                details={offer.details}
                onBook={() => scrollToBooking(offer.key)}
              />
            ))}
          </div>
        </section>

        <section className="section booking" id="booking" ref={bookingSectionRef}>
          <SectionHeading
            eyebrow="Buchung"
            title="Sende eine Buchungsanfrage"
            description="Über das Formular unten wird eine Anfrage gesendet. Der Pilot prüft sie vor jeder Bestätigung."
          />
          <BookingForm flightTypePreset={selectedFlightType} onSubmitted={() => setSelectedFlightType('')} />
        </section>

        <section className="section contact" id="contact">
          <SectionHeading
            eyebrow="Kontakt"
            title="In Kontakt bleiben"
            description="Nutze die Kontaktmöglichkeiten unten für Fragen, Verfügbarkeit und Social-Media-Updates."
          />
          <div className="contact__grid">
            {contactItems.map((contactItem) => (
              <ContactCard key={contactItem.label} {...contactItem} />
            ))}
          </div>
          <div className="social-links">
            <a className="button button--ghost" href="https://www.instagram.com/mathis.silas/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="button button--ghost" href="mailto:silas.mathis@bluewin.ch">
              E-Mail
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Copyright 2026 Mathis Tandemflights. Alle Rechte vorbehalten.</p>
        <nav aria-label="Rechtliches">
          <a href="#home">Datenschutz</a>
          <a href="#home">AGB</a>
          <a href="#home">Impressum</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;