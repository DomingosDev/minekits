import Model from "../../utils/Model";
import ItemType from "./ItemType";

export default class Item extends Model{
    static tableName: string = 'items';

    public id: Number = 0;;
    public name: String = '';
    public type: Number = 0;
    public icon: String = '';

    getType(){
        return ItemType.findOne(`id = ${this.type}`)
    }
}