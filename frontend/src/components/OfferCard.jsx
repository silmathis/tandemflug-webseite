export default function OfferCard({ image, title, description, price, details, onBook }) {
  return (
    <article className="offer-card">
      <div className="offer-card__image-wrap">
        <img className="offer-card__image" src={image} alt={title} />
      </div>
      <div className="offer-card__body">
        <div className="offer-card__header">
          <h3>{title}</h3>
          <span className="offer-card__price">{price}</span>
        </div>
        <p>{description}</p>
        <dl className="offer-card__details">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <button type="button" className="button button--secondary button--full" onClick={onBook}>
          Flug buchen
        </button>
      </div>
    </article>
  );
}