import Model from "../../utils/Model";
import { Enchantment } from "./Enchantment";
import { default as MCItem } from "../minecraft/Item";
import { default as MCEnchantment } from "../minecraft/Enchantment";


export class Item extends Model{
    static tableName: string = 'kit_items';

    public id: Number = 0;
    public itemId: Number = 0;
    public kitId: Number = 0;

    get item(){
        return MCItem.findOne(`id = ${this.itemId}`)
    }

    get enchantments(){
        return Enchantment.find(`itemId = ${this.id}`)
    }

    get name(){
        return this.item.name
    }

    get type(){
        return this.item.type
    }

    enchantmentsOptions(){
        let selected = this.enchantments
            .reduce((result: any, enchantment: Enchantment) => {
                result[enchantment.enchantmentId.toString()] = enchantment;
                return result;
            }, {});

        return this.item.getType().getEnchantments().map((enchantment: MCEnchantment) => {
            let level = selected[enchantment.id] ? selected[enchantment.id].level : 0
            return Object.assign({ selectedLevel:level  }, enchantment)
        });
    }

    addEnchantment(enchantment: any, level: number){
        let current = this.enchantments.filter((enchant: Enchantment) => enchant.enchantmentId === enchantment.id ).shift();

        if(!current){
            current = Object.assign( new Enchantment(), { itemId: this.id, enchantmentId: enchantment.id });
        }
        
        if( !level ){
            return current.delete()
        }

        current.level = level;
        current.save();
    }
}