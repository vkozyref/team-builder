import { Injectable } from '@angular/core';
import { CardMetadata } from '../model/card-metadata';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards$ = new BehaviorSubject<CardMetadata[]>([]);

  constructor() {
  }

  add(card: CardMetadata) {
    this.cards$.next([...this.cards$.getValue(), card]);
  }

  setEditable(cardId?: string) {
    this.cards$.next(this.cards$.getValue().map((card: CardMetadata) => {
      return {...card, editable: !!cardId && card.id === cardId };
    }));
  }

  setText(cardId: string, text: string) {
    this.cards$.next(this.cards$.getValue().map((card: CardMetadata) => {
      if(card.id === cardId)
        return {...card, text};

      return card;
    }));
  }

}
