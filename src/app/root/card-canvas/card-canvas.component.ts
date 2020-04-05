import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { CardMetadata } from 'src/app/model/card-metadata';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'tb-card-canvas',
  templateUrl: './card-canvas.component.html',
  styleUrls: ['./card-canvas.component.scss']
})
export class CardCanvasComponent implements OnInit, OnDestroy {

  @Input()
  cards: CardMetadata[];
  contextMenuPosition = { x: '0px', y: '0px' };

  @ViewChild(MatMenuTrigger) contextMenuTrigger: MatMenuTrigger;

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    window.addEventListener('contextmenu', (evt: MouseEvent) => {
      event.preventDefault();
      console.log('from window');
      if(this.contextMenuTrigger.menuOpen) {
        this.contextMenuTrigger.closeMenu();
        setTimeout(() => {
          this.canvasRightClickHandler(evt);
        }, 200);
      }
    })
  }

  canvasRightClickHandler(event: MouseEvent) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    //this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

}
