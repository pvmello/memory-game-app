import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <>
      {!card.macthed ? (
        <div className={flipped ? "flipped" : ""}>
          <div className="card">
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img
                className="back"
                src="/img/cover.jpg"
                onClick={handleClick}
                alt="card back"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
