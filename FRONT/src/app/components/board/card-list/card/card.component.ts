import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Card } from '../../../../models/card-list.model';
import { CardsService} from '../../../../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() currentList!:string;
  @Input() card!: Card;
  @Input() editMode: boolean = false;

  cardlists: string[] = ["todo", "doing", "done"];

  cardEditForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null)
  });

  constructor(
    private cardsService: CardsService,
    ) {
      console.log('-----------------------------------------------'); 
      console.log(`>> on card constructor`);
      // console.log(this.card) --> undefined
    }

  ngOnInit(): void {
    console.log('-----------------------------------------------');
    console.log('>>> on card ngOnInit');
    console.log(`>>>> currentCard ${this.card.title}`);
    console.log(`>>>> currentList ${this.card.list}`);
  }

  ngOnDestroy(){
    console.log('-----------------------------------------------');
    console.log(`>> ${this.card.title} onDestroy`);
  }

  toggleEditMode(){
    console.log('-----------------------------------------------');
    console.log(`on toggleEditMode`);
    this.editMode = !this.editMode;
  }

  editCard(){
    console.log('-----------------------------------------------');
    console.log(`>> on card editCard ${this.card.title}`);
    this.cardsService.editCard(
      this.card.id, 
      this.cardEditForm.value.title, 
      this.cardEditForm.value.description, 
      this.card.list).subscribe((c)=>{
        this.cardsService.cardListChanged.next(c);
    });
  }

  deleteCard(){
    console.log('-----------------------------------------------');
    console.log('>> on card deletCard');
    console.log('>>>> calling deleteCard from service');
    this.cardsService.deleteCard(this.card.id).subscribe((c)=>{
      this.cardsService.cardListChanged.next(c);
    });
  }

  changeList(move:string){
    console.log('-----------------------------------------------');
    console.log('>> on card changeList');
    console.log(`>>>> moving card from ${this.card.list} to ${move} list`);

    if(move === "next"){
      this.card.list = this.cardlists[(this.cardlists.indexOf(this.card.list))+1];
    }else{
      this.card.list = this.cardlists[(this.cardlists.indexOf(this.card.list))-1];
    }
    console.log(`the new list is ${this.card.list}`);

    this.cardsService.editCard(
      this.card.id, 
      this.card.title, 
      this.card.description, 
      this.card.list).subscribe((card)=>{
        console.log('subscribe c');
        console.log(card);
        this.cardsService.cardListChanged.next(card);
    });
    window.location.reload();
  }
 
}
