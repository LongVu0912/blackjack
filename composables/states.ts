import type { GameDeck } from "~/types/interface/GameDeck";

export const useDeckState = () => {
    return useState<GameDeck>("deckState", () => {
        return {
            cards: [],
            playerCards: [],
            openedCards: [],
        };
    });
};
