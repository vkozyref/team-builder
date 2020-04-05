import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { CardMetadata } from 'src/app/model/card-metadata';
import { MatMenuTrigger } from '@angular/material/menu';
import { PanZoomConfig } from 'ng2-panzoom';


@Component({
  selector: 'tb-card-canvas',
  templateUrl: './card-canvas.component.html',
  styleUrls: ['./card-canvas.component.scss']
})
export class CardCanvasComponent implements OnInit, OnDestroy {
  @Input()
  cards: CardMetadata[];

  @Output()
  onCardAdded = new EventEmitter<CardMetadata>(); 


  @ViewChild(MatMenuTrigger)
  contextMenuTrigger: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };
  panZoomConfig = this.GetConfig();

  constructor() { }

  ngOnInit(): void {
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
    this.onCardAdded.emit({
      text: '',
      position: {...this.contextMenuPosition}
    });
  }

  canvasRightClickHandler(event: MouseEvent) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

  ngOnDestroy(): void {
  }

  private GetConfig() {
    const config = new PanZoomConfig();
    config.zoomLevels = 10;
    config.zoomToFitZoomLevelFactor = 0.65;
    return config;
  }
}
