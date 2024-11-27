import Name from "~/types/enums/Name";
import Rank from "~/types/enums/Rank";
import Suit from "~/types/enums/Suit";
import type { Card } from "~/types/interface/Card";
import type { Cases } from "~/types/interface/Cases";

export const DeckRepository = () => {
    const deck = useDeckState().value;

    const initDeck = () => {
        const RankMap: { [key in Name]: Rank } = {
            [Name.Ace]: Rank.Ace,
            [Name.Two]: Rank.Two,
            [Name.Three]: Rank.Three,
            [Name.Four]: Rank.Four,
            [Name.Five]: Rank.Five,
            [Name.Six]: Rank.Six,
            [Name.Seven]: Rank.Seven,
            [Name.Eight]: Rank.Eight,
            [Name.Nine]: Rank.Nine,
            [Name.Ten]: Rank.Ten,
            [Name.Jack]: Rank.Jack,
            [Name.Queen]: Rank.Queen,
            [Name.King]: Rank.King,
        };

        const deckInit: Card[] = [];

        for (const suit of Object.values(Suit)) {
            for (const name of Object.values(Name)) {
                deckInit.push({
                    name: name as Name,
                    rank: RankMap[name as Name],
                    suit: suit as Suit,
                });
            }
        }

        deck.cards = deckInit;
        deck.playerCards = [];
        deck.openedCards = [];

        return deckInit;
    };

    const countPlayerPoint = (): number => {
        let totalPoints = 0;

        for (const card of deck.playerCards) {
            totalPoints += card.rank;
        }
        return totalPoints;
    };

    const pickRandomCard = () => {
        if (deck.cards.length === 0) return;

        if (countPlayerPoint() >= 21) return;

        const randomIndex = Math.floor(Math.random() * deck.cards.length);
        const [pickedCard] = deck.cards.splice(randomIndex, 1);
        deck.playerCards.push(pickedCard);
    };

    const countCases = (): Cases => {
        let cases: Cases = {
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
        };

        if (countPlayerPoint() >= 22) {
            cases[22] = 100;
            console.log(cases);
            return cases;
        }

        for (const card of deck.cards) {
            let cardValue = card.rank;
            let newPoints = countPlayerPoint() + cardValue;

            if (newPoints > 21) {
                cases[22] += 1;
            } else if (newPoints >= 16 && newPoints <= 21) {
                cases[newPoints as keyof Cases] += 1;
            }
        }

        const remainingCards = deck.cards.length;

        // Calculate percentages for each case
        for (const key in cases) {
            cases[key as unknown as keyof Cases] = parseFloat(
                (
                    (cases[key as unknown as keyof Cases] / remainingCards) *
                    100
                ).toFixed(0)
            );
        }

        return cases;
    };

    const addACard = (card: Card) => {
        if (countPlayerPoint() >= 22) {
            return;
        }

        deck.playerCards.push(card);
        const index = deck.cards.findIndex(
            (c) => c.name === card.name && c.suit === card.suit
        );
        if (index > -1) {
            deck.cards.splice(index, 1);
        }
    };

    const removeACard = (card: Card) => {
        if (countPlayerPoint() >= 22) {
            return;
        }

        deck.openedCards.push(card);
        const index = deck.cards.findIndex(
            (c) => c.name === card.name && c.suit === card.suit
        );
        if (index > -1) {
            deck.cards.splice(index, 1);
        }
    };

    return {
        initDeck,
        countPlayerPoint,
        pickRandomCard,
        countCases,
        addACard,
        removeACard,
    };
};
