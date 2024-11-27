import type { Card } from "./Card";

export interface GameDeck {
    cards: Card[];
    playerCards: Card[];
    openedCards: Card[];
}
