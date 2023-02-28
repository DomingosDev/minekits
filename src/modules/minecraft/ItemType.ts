import Model from "../../utils/Model";
import Enchantment from "./Enchantment";

export default class ItemType extends Model{
    static tableName: string = 'types';

    public id: Number = 0;
    public name: String = '';
    public enchants: Array<Number> = [];

    getEnchantments(){
        let enchantments = Enchantment.find(`id in ${this.enchants.join(',')}`);
        
        enchantments.sort((a: Enchantment, b: Enchantment)=>{
            if( a.group !== b.group ){
                return a.group - b.group
            }

            if(a.max !== b.max){
                return a.max - b.max
            }

            return a.name.localeCompare(b.name);
        });

        return enchantments;
    }
}