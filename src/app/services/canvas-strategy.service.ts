import { Injectable } from '@angular/core';
import { CanvasEvent, CanvasEventType, CardAddedEvent } from '../model/canvas-event';
import { CardService } from './card.service';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CanvasStrategyService {

  constructor(private cardService: CardService) { }

  execute(event: CanvasEvent) {
    switch(event.canvasEventType) {
      case CanvasEventType.Click:
      case CanvasEventType.RightClick:
        this.cardService.setEditable();
        break;
      case CanvasEventType.AddCard:
        this.cardService.add({
          text: '',
          position: {...(<CardAddedEvent>event).position},
          id: uuid(),
          editable: false
        });
        break;
    }
  }
}
