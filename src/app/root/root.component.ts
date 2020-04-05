import { Component, OnInit } from '@angular/core';
import { CardMetadata } from '../model/card-metadata';
import { CardEvent } from '../model/card-event';
import { Observable } from 'rxjs';
import { CanvasEvent } from '../model/canvas-event';
import { CardService } from '../services/card.service';
import { CardStrategyService } from '../services/card-strategy.service';
import { CanvasStrategyService } from '../services/canvas-strategy.service';

@Component({
  selector: 'tb-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  cards$: Observable<CardMetadata[]>;

  constructor(private cardService: CardService,
              private cardStrategyService: CardStrategyService,
              private canvasStrategyService: CanvasStrategyService) {}

  ngOnInit(): void {
    this.cards$ = this.cardService.cards$;
  }

  canvasHandler(event: CanvasEvent) {
    this.canvasStrategyService.execute(event);
  }

  cardHandler(event: CardEvent) {
    this.cardStrategyService.execute(event);
  }

}

