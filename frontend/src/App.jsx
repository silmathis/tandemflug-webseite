import { useRef, useState } from 'react';

import BookingForm from './components/BookingForm';
import ContactCard from './components/ContactCard';
import OfferCard from './components/OfferCard';
import SectionHeading from './components/SectionHeading';

const heroImage = new URL('../../Bilder/Start.jpg', import.meta.url).href;
const flightImages = {
  panorama: new URL('../../Bilder/Landing.jpg', import.meta.url).href,
  thermal: new URL('../../Bilder/During_Flight.jpg', import.meta.url).href,
  adventure: new URL('../../Bilder/Wingovers.jpg', import.meta.url).href,
  voucher: new URL('../../Bilder/Start.jpg', import.meta.url).href,
};

const flightOffers = [
  {
    key: 'Panorama',
    image: flightImages.panorama,
    title: 'Panorama Flight',
    description: 'A calm scenic experience with wide views over the Swiss Alps and valley lakes.',
    price: 'CHF 180',
    details: [
      { label: 'Duration', value: '15–20 min' },
      { label: 'Altitude difference', value: '900–1,200 m' },
      { label: 'Price', value: 'CHF 180' },
      { label: 'Description', value: 'Perfect for first-time flyers and landscape lovers.' },
    ],
  },
  {
    key: 'Thermal',
    image: flightImages.thermal,
    title: 'Thermal Flight',
    description: 'A longer flight that uses thermals for more airtime, more height, and more alpine freedom.',
    price: 'CHF 220',
    details: [
      { label: 'Duration', value: '25–35 min' },
      { label: 'Altitude difference', value: '1,100–1,500 m' },
      { label: 'Price', value: 'CHF 220' },
      { label: 'Description', value: 'For guests who want more air time and a richer mountain experience.' },
    ],
  },
  {
    key: 'Adventure',
    image: flightImages.adventure,
    title: 'Adventure Flight',
    description: 'The dynamic choice with playful manoeuvres and a more sporty tandem flight profile.',
    price: 'CHF 240',
    details: [
      { label: 'Duration', value: '20–30 min' },
      { label: 'Altitude difference', value: '1,000–1,400 m' },
      { label: 'Price', value: 'CHF 240' },
      { label: 'Description', value: 'Great for guests who want a more active and energetic ride.' },
    ],
  },
  {
    key: 'Gift Voucher',
    image: flightImages.voucher,
    title: 'Gift Voucher',
    description: 'A flexible present for birthdays, anniversaries, and special alpine surprises.',
    price: 'From CHF 180',
    details: [
      { label: 'Price', value: 'From CHF 180' },
      { label: 'Description', value: 'A thoughtful gift for adventure seekers.' },
    ],
  },
];

const contactItems = [
  {
    label: 'Phone',
    value: '+41 79 000 00 00',
    href: 'tel:+41790000000',
    description: 'Call for booking questions and weather updates.',
  },
  {
    label: 'Email',
    value: 'hello@tandemflug.ch',
    href: 'mailto:hello@tandemflug.ch',
    description: 'Send booking details or special requests by email.',
  },
  {
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: 'https://wa.me/41790000000',
    description: 'Quick messaging for same-day coordination.',
  },
  {
    label: 'Instagram',
    value: '@tandemflug.ch',
    href: 'https://instagram.com',
    description: 'See flight photos, weather highlights, and mountain scenes.',
  },
  {
    label: 'Location',
    value: 'Interlaken, Switzerland',
    href: 'https://maps.google.com',
    description: 'Meeting point near the Alpine launch areas.',
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
          <span className="site-logo__mark">TF</span>
          <span>
            <strong>Tandem Flight</strong>
            <small>Swiss Alps Booking</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#offers">Offers</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__content">
            <span className="hero__eyebrow">Paragliding. Mountains. Freedom.</span>
            <h1>Experience the Swiss Alps from Above</h1>
            <p>
              Book your tandem flight with a professional pilot and send a manual booking request that is reviewed for weather,
              safety, and availability.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#booking">
                Book a Flight
              </a>
              <a className="button button--ghost" href="#offers">
                Learn More
              </a>
            </div>
            <div className="hero__stats" aria-label="Booking highlights">
              <div>
                <strong>100%</strong>
                <span>Manual review</span>
              </div>
              <div>
                <strong>4 flight types</strong>
                <span>From calm to adventurous</span>
              </div>
              <div>
                <strong>Swiss Alps</strong>
                <span>Alpine launch areas</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <img src={heroImage} alt="Paragliding above the Swiss Alps" />
            <div className="hero__card">
              <span>Booking flow</span>
              <strong>Request → Review → Confirm</strong>
              <p>Bookings are only confirmed after the pilot checks weather and flight conditions.</p>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <SectionHeading
            eyebrow="About"
            title="Professional Tandem Pilot"
            description="Reliable, experienced, and focused on safe mountain flights with a clear communication process."
          />
          <div className="about__grid">
            <article className="about-card about-card--photo">
              <div className="about-card__photo">
                <img src={flightImages.thermal} alt="Pilot portrait placeholder" />
              </div>
            </article>
            <article className="about-card">
              <h3>Pilot Profile</h3>
              <p>
                The pilot flies regularly in the Alpine region and works with conservative safety standards, checked launch windows,
                and a calm passenger briefing before take-off.
              </p>
              <ul>
                <li>Certified tandem operations</li>
                <li>Weather-aware scheduling</li>
                <li>Clear passenger briefing</li>
                <li>Safety first decision-making</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section offers" id="offers">
          <SectionHeading
            eyebrow="Flight Offers"
            title="Choose Your Flight Style"
            description="Each offer is presented as a booking request card so customers can pick the experience that fits them best."
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
            eyebrow="Booking Request"
            title="Send a Manual Booking Request"
            description="Customers submit requests through the form below. The pilot reviews them before any confirmation is sent."
          />
          <BookingForm flightTypePreset={selectedFlightType} onSubmitted={() => setSelectedFlightType('')} />
        </section>

        <section className="section contact" id="contact">
          <SectionHeading
            eyebrow="Contact"
            title="Stay in Touch"
            description="Use the contact options below for questions, availability checks, and social updates."
          />
          <div className="contact__grid">
            {contactItems.map((contactItem) => (
              <ContactCard key={contactItem.label} {...contactItem} />
            ))}
          </div>
          <div className="social-links">
            <a className="button button--ghost" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="button button--ghost" href="https://wa.me/41790000000" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="button button--ghost" href="mailto:hello@tandemflug.ch">
              Email
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Copyright 2026 Tandem Flight Booking. All rights reserved.</p>
        <nav aria-label="Legal">
          <a href="#home">Privacy Policy</a>
          <a href="#home">Terms and Conditions</a>
          <a href="#home">Imprint</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;