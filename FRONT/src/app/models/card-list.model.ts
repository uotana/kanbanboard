export class Card {
    public id!: number;
    public list!: string;
    public title!: string;
    public description!: string;

    constructor(id: number, list: string , title: string, desc: string) {
        this.id = id;
        this.list = list;   
        this.title = title;
        this.description = desc;
    }
}