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
        console.log('-----------------------------------------------');
        console.log(`on service getCards`);
        return this.http.get<Card[]>(this.baseUrl);
    }

    createCard(title: string, description: string){
        console.log('-----------------------------------------------');
        console.log('on service createCard');
        console.log(`>>>> card data: ${title}, ${description}`)
        return this.http.post<Card>(this.baseUrl, {title: title, description: description, list: "todo"});
    }

    editCard(id: number, title:string, description:string, list:string){
        console.log('-----------------------------------------------');
        console.log('on service editCard');
        console.log(`>>>>id: ${id}`);
        console.log(`>>>>title: ${title}`);
        console.log(`>>>>description: ${description}`);
        console.log(`>>>>list: ${list}`);
        return this.http.put<Card>(`${this.baseUrl}/${id}`,{title, description, list});
    }

    deleteCard(id: number){
        console.log('-----------------------------------------------');
        console.log('on service deleteCard');
        return this.http.delete<Card>(`${this.baseUrl}/${id}`);
    }
}