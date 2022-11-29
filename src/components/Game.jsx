import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";

/**
 * Game:
 *
 * Props:
 *
 * State:     isLoading - boolean
 *            deckId - string
 *            cards - list of objects, 
 *                like {
                          "code": "6H", 
                          "image": "https://deckofcardsapi.com/static/img/6H.png", 
                          "images": {
                                        "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
                                        "png": "https://deckofcardsapi.com/static/img/6H.png"
                                    }, 
                          "value": "6", 
                          "suit": "HEARTS"
                        }
              noCardsRemaining - boolean
 *
 *
 * App -> Game -> { Card, Button }
 */
function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [noCardsRemaining, setNoCardsRemaining] = useState(false);

  useEffect(() => {
    async function getDeck() {
      const { data } = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/"
      );
      setDeck(data);
      setIsLoading(false);
    }
    getDeck();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards[cards.length - 1].remaining === 0) {
      alert("No Cards Remaining");
      setNoCardsRemaining(true);
    }
  }, [cards]);

  /**Get a card, if no cards remaining don't draw, add to list of cards */
  async function getCard() {
    if (noCardsRemaining) return;
    const { data } = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    );
    setCards((prevCards) => [
      ...prevCards,
      { ...data.cards[0], rotation: Math.random() },
    ]);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="Game">
      <div>
        {cards.map((c) => (
          <Card
            key={c.code}
            code={c.code}
            image={c.image}
            rotation={c.rotation}
          />
        ))}
      </div>
      <div style={{ position: "absolute", left: "400px", top: "0" }}>
        <Button name="Draw" handleClick={getCard} />
      </div>
    </div>
  );
}
export default Game;
