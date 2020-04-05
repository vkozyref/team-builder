import { Component, OnInit } from '@angular/core';
import { CardMetadata } from '../model/card-metadata';

@Component({
  selector: 'tb-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  cards: CardMetadata[]; 

  constructor() {
    this.cards = [];
   }

  ngOnInit(): void {
  }

  addCard(card: CardMetadata):void {
    this.cards.push(card);
  }

}
