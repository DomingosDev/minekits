import Model from "../../utils/Model";

export class Enchantment extends Model{
    static tableName: string = 'kit_item_enchantment';

    public id: Number = 0;
    public itemId: Number = 0;
    public enchantmentId: Number = 0;
    public level: Number = 0;
}