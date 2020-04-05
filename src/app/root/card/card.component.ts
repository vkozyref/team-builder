import { Component, OnInit, Input } from '@angular/core';
import { CardMetadata } from 'src/app/model/card-metadata';

@Component({
  selector: 'tb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  metadata: CardMetadata;

  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  enterEditMode(): void {
    this.editMode = true;
  }

}
