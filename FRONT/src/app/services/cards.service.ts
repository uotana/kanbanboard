import {EventEmitter, Injectable} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card-list.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CardsService{

    private baseUrl = "http://localhost:3000/cards";

    cardListChanged = new Subject();

    constructor(private http: HttpClient){}

    getCards(){
        return this.http.get<Card[]>(this.baseUrl);
    }

    createCard(title: string, description: string){
        console.log('create card - SERVICE');
        return this.http.post<Card>(this.baseUrl, {title: title, description: description, list: "todo"});
    }

    editCard(id: number, title:string, description:string, list:string){
        console.log('edit card - SERVICE');
        console.log(`id: ${id}`);
        console.log(`title: ${title}`);
        console.log(`description: ${description}`);
        console.log(`list: ${list}`);
        return this.http.put<Card>(`${this.baseUrl}/${id}`,{title, description, list});
    }

    deleteCard(id: number){
        console.log('delete card - SERVICE');
        return this.http.delete<Card>(`${this.baseUrl}/${id}`);
    }
}