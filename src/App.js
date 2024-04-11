import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import WrongChoice from "./components/sounds/wrongchoice.wav"
import RightChoice from "./components/sounds/rightchoice.wav"

const cardImages = [
  { src: "/img/01.jpg", matched: false },
  { src: "/img/02.jpg", matched: false },
  { src: "/img/03.jpg", matched: false },
  { src: "/img/04.jpg", matched: false },
  { src: "/img/05.jpg", matched: false },
  { src: "/img/06.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const wrongMove = new Audio(WrongChoice);
  const rightMove = new Audio(RightChoice);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index, matched: false }));

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if(disabled) return;
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src || card.src === cardTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        rightMove.play();
        resetTurn(() => resetTurn(), 1000);
      } else {
        wrongMove.play();
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Mario Bros Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
