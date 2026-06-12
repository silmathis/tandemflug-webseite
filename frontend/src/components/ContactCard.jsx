export default function ContactCard({ label, value, href, description }) {
  return (
    <article className="contact-card">
      <span className="contact-card__label">{label}</span>
      <a className="contact-card__value" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {value}
      </a>
      <p>{description}</p>
    </article>
  );
}