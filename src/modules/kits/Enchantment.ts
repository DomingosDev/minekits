import Model from "../../utils/Model";
import { default as MCEnchantment } from "../minecraft/Enchantment";


export class Enchantment extends Model{
    static tableName: string = 'kit_item_enchantment';

    public id: number = 0;
    public itemId: number = 0;
    public enchantmentId: number = 0;
    public level: number = 0;

    get enchantment(){
        return MCEnchantment.findOne(`id = ${this.enchantmentId}`)
    }

    get name(){
        return this.enchantment.name
    }

    get group(){
        return this.enchantment.group
    }

    get max(){
        return this.enchantment.max
    }

    get multiplier(){
        return this.enchantment.multiplier
    }

    get cost(){
        return this.level * this.multiplier
    }
}