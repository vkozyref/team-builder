import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { CardMetadata } from 'src/app/model/card-metadata';
import { MatMenuTrigger } from '@angular/material/menu';
import { PanZoomConfig, PanZoomAPI } from 'ng2-panzoom';
import { CardEvent } from 'src/app/model/card-event';
import { CanvasEvent, CanvasEventType, CardAddedEvent } from 'src/app/model/canvas-event';

@Component({
  selector: 'tb-card-canvas',
  templateUrl: './card-canvas.component.html',
  styleUrls: ['./card-canvas.component.scss']
})
export class CardCanvasComponent implements OnInit, OnDestroy {
  @Input()
  cards: CardMetadata[];

  @Output()
  onCardEvent = new EventEmitter<CardEvent>();

  @Output()
  onCanvasEvent = new EventEmitter<CanvasEvent>();


  @ViewChild(MatMenuTrigger)
  contextMenuTrigger: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };
  cardPosition = { x: '0px', y: '0px' };
  panZoomConfig = this.GetConfig();
  panZoomAPI: PanZoomAPI;

  constructor() { }

  ngOnInit(): void {
    this.panZoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);

    window.addEventListener('contextmenu', (evt: MouseEvent) => {
      event.preventDefault();
      console.log('from window');
      if (this.contextMenuTrigger.menuOpen) {
        this.contextMenuTrigger.closeMenu();
        setTimeout(() => {
          this.canvasRightClickHandler(evt);
        }, 200);
      }
    });
  }

  addCard() {
    console.log('card', this.cardPosition);
   
    this.onCanvasEvent.emit(<CardAddedEvent>{
      canvasEventType: CanvasEventType.AddCard,
      position: {...this.cardPosition}
      // position: {...this.contextMenuPosition}
    });
  }

  canvasRightClickHandler(event: MouseEvent) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.onCanvasEvent.emit(<CanvasEvent>{canvasEventType: CanvasEventType.RightClick, event});
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';

    const modelPosition = this.panZoomAPI.getModelPosition({
      x: event.clientX - 50,
      y: event.clientY - 100
    });
    console.log('modelPosition', modelPosition);

    this.cardPosition.x = modelPosition.x + 'px';
    this.cardPosition.y = modelPosition.y + 'px';
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

  cardHandler(cardEvent: CardEvent) {
    this.onCardEvent.emit(cardEvent);
  }

  canvasClickHandler(event: MouseEvent) {
    this.onCanvasEvent.emit(<CanvasEvent>{canvasEventType: CanvasEventType.Click, event});
  }

  ngOnDestroy(): void {
  }

  private GetConfig() {
    const config = new PanZoomConfig();
    config.freeMouseWheelFactor = 0.001;
    return config;
  }
}
