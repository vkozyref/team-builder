import { Injectable } from '@angular/core';
import { CardEvent, CardEventType, CardTextChangeEvent } from '../model/card-event';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class CardStrategyService {

  constructor(private cardService: CardService) { }

  execute(event: CardEvent) {
    switch(event.cardEventType) {
      case CardEventType.Click:
        this.cardService.setEditable(event.cardId);
        break;
      case CardEventType.TextChange:
        this.cardService.setText(event.cardId, (<CardTextChangeEvent>event).text);
        break;
    }
  }
}
