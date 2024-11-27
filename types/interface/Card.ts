import type Name from "../enums/Name";
import type Rank from "../enums/Rank";
import type Suit from "../enums/Suit";

export interface Card {
    name: Name;
    rank: Rank;
    suit: Suit;
}
