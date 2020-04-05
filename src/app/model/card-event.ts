export interface CardEvent {
    cardId: string;
    cardEventType: CardEventType
  }
  
  export enum CardEventType {
    Click = 1,
    TextChange
  }

  export interface CardTextChangeEvent extends CardEvent {
      text: string;
  }