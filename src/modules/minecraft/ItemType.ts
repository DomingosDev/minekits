import Model from "../../utils/Model";
import Enchantment from "./Enchantment";

export default class ItemType extends Model{
    static tableName: string = 'types';

    public id: Number = 0;
    public name: String = '';
    public enchants: Array<Number> = [];

    getEnchantments(){
        return Enchantment.find(`id in ${this.enchants.join(',')}`)
    }
}