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

  @Input() listTitle!:string;
  cards!: Card[];

  showAddCardButton: boolean = true;
  
  cardForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl()
  });
  
  constructor(private cardsService: CardsService ) { 
    console.log('constructor CARD LIST');
  }

  ngOnInit(): void {
    console.log('onInit CARD LIST')
    console.log(`listTitle ${this.listTitle}`)

    this.cardsService.getCards().subscribe((data:Card[])=>{
      this.cards = data;
    });

    this.cardsService.cardListChanged.subscribe(()=>{
      this.cardsService.getCards().subscribe((data:Card[])=>{
        console.log('updating cards - CARD LIST');
        this.cards = data;
        console.log('subscribe data');
        console.log(data);
      });
    })
  }

  toggleAddCardButton(){
    this.showAddCardButton = !this.showAddCardButton;
  }

  createCard(){
    console.log('create card - CARD LIST');
    console.log(this.cardForm.value.title);
    this.cardsService.createCard(this.cardForm.value.title, this.cardForm.value.description).subscribe(()=>{
      this.cardsService.getCards().subscribe((data: Card[])=>{
        this.cards = data;
      });
    })
    this.toggleAddCardButton();
  }
}
