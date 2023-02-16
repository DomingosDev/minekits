import Model from "../../utils/Model";
import Item from "../minecraft/Item";
import {Item as KitItem} from './Item';

export class Kit extends Model{
    public id: Number = 0;
    public name: String = '';

    static tableName: string = 'kits';

    addItem(item: Item){
        this.save();

        let kitItem = new KitItem();
        /*
            public item_id: Number = 0;
            public kit_id: Number = 0;
        */

        kitItem.itemId  = item.id;
        kitItem.kitId   = this.id;
        kitItem.save();
    }

    items(){
        return KitItem.find(`kitId = ${this.id}`)
    }
}