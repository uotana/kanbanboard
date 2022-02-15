import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Card } from '../../../models/card-list.model';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  providers: [CardsService]
})

export class CardListComponent implements OnInit {

  @Input() taskListTitle!:string;
  cards!: Card[];

  showAddCardButton: boolean = true;
  
  cardForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl()
  });
  
  constructor(private cardsService: CardsService ) { 
    console.log('-----------------------------------------------');
    console.log(`>> card-list ${this.taskListTitle} constructor`);
  }

  ngOnInit(): void {
    console.log('-----------------------------------------------');
    console.log(`>> card-list ${this.taskListTitle} onInit`)

    this.cardsService.getCards().subscribe((data:Card[])=>{
      this.cards = data;
    });

    this.cardsService.cardListChanged.subscribe(()=>{
      this.cardsService.getCards().subscribe((data:Card[])=>{
        console.log('>> updating cards');
        this.cards = data;
        console.log('subscribe data');
        console.log(data);
      });
    })
  }

  toggleAddCardButton(){
    console.log('-----------------------------------------------');
    console.log(`>> on toggleAddCardButton`);
    this.showAddCardButton = !this.showAddCardButton;
  }

  createCard(){
    console.log('-----------------------------------------------');
    console.log(`>> on card-list createCard ${this.cardForm.value.title}`);
    this.cardsService.createCard(this.cardForm.value.title, this.cardForm.value.description).subscribe(()=>{
      this.cardsService.getCards().subscribe((data: Card[])=>{
        this.cards = data;
      });
    })
    this.toggleAddCardButton();
  }
}
