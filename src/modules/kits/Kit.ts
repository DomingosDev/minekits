import Model from "../../utils/Model";
import Item from "../minecraft/Item";
import {Item as KitItem} from './Item';

export class Kit extends Model{
    public id: Number = 0;
    public name: String = '';

    static tableName: string = 'kits';
    static _current: Kit;

    static set current(value: Kit){
        Kit._current = value;
    }
    
    static get current(){
        return Kit._current;
    }

    getItem(id: number){
        return KitItem.findOne(`id = ${id}`)
    }

    addItem(item: Item){
        this.save();

        let kitItem = new KitItem();
        kitItem.itemId  = item.id;
        kitItem.kitId   = this.id;
        kitItem.save();
    }

    get items(): Array<KitItem>{
        return KitItem.find(`kitId = ${this.id}`)
    }
}