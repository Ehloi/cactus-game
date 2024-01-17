export interface Card {
  value: CardValue;
  color: CardColor;
}
export enum CardColor {
  SPADE = "spade",
  HEART = "heart",
  DIAMOND = "diamond",
  CLUB = "club",
}
export enum CardValue {
  KING = 0,
  ACE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
}
