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

  @Input() listTitle!:string;
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
      console.log('constructor card');
    }

  ngOnInit(): void {
    console.log(`currentList${this.listTitle}`);
  }

  ngOnDestroy(){
    console.log('task item onDestroy');
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  editCard(){
    console.log('edit card - CARD');
    this.cardsService.editCard(
      this.card.id, 
      this.cardEditForm.value.title, 
      this.cardEditForm.value.description, 
      this.card.list).subscribe((c)=>{
        this.cardsService.cardListChanged.next(c);
    });
  }

  deleteCard(){
    this.cardsService.deleteCard(this.card.id).subscribe((c)=>{
      this.cardsService.cardListChanged.next(c);
    });
  }

  changeList(move:string){
    console.log('change list - CARD');
    console.log(`the old list is ${this.card.list}`);
    console.log(`moving to ${move} list`);

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
