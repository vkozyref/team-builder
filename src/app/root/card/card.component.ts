import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DragRef, CdkDragMove } from '@angular/cdk/drag-drop';
import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { CardMetadata } from 'src/app/model/card-metadata';
import { CardEventType, CardEvent } from 'src/app/model/card-event';


@Component({
  selector: 'tb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  metadata: CardMetadata;

  @Input()
  positionFunction;

  @Output()
  onCardOperation = new EventEmitter<CardEvent>();

  @ViewChild("textInput") inputElement: ElementRef;

  constructor(public ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.metadata.editable) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      });
    }
  }

  cardClickHandler(event: MouseEvent): void {
    event.stopPropagation();
    this.onCardOperation.emit({
      cardId: this.metadata.id,
      cardEventType: CardEventType.Click
    });
  }

  textChangeHandler(event: string) : void {
    this.onCardOperation.emit(<CardEvent>{
      cardId: this.metadata.id,
      cardEventType: CardEventType.TextChange,
      text: event
    });
  }

  // moved(event: CdkDragMove) {
  //   console.log('event.pointerPosition', event.pointerPosition);

  //   const modelPosition = this.positionFunction({
  //     x: event.pointerPosition.x,
  //     y: event.pointerPosition.y
  //   });

  //   // event.pointerPosition.x = modelPosition.x;
  //   // event.pointerPosition.y = modelPosition.y;

  //   console.log('modelPosition', modelPosition);

  //   this.metadata.position.x = modelPosition.x + 'px';
  //   this.metadata.position.y = modelPosition.y + 'px';
  //   this.ref.detectChanges();

  //   // this.metadata.position.x = offsetLeft + x;
  //   // this.metadata.position.y = offsetTop + y;
  // }

  constrainPosition(point: Point, dragRef: DragRef): Point {
    console.log('point', point);
    console.log('this.metadata.position', this.metadata.position);

    const modelPosition = this.positionFunction({
      x: point.x,
      y: point.y
    });

    console.log('modelPosition', modelPosition);
    // this.metadata.position = {
    //   x: modelPosition.x,
    //   y: modelPosition.y
    // };

    console.log('this.metadata.position', this.metadata.position);
    return modelPosition as Point;
  }
}


