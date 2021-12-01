import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card} from '../../models/card-list.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit {

  allListTitles = ["todo", "doing", "done"];
  cards!: Card[];

  constructor(private cardsService: CardsService) { 
    console.log('construtor do board');
    console.log(`all list titles ${this.allListTitles}`)
  }

  ngOnInit(): void {}

}
