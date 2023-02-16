import Model from "../../utils/Model";

export default class Enchantment extends Model{
    static tableName: string = 'enchants';

    public id: number = 0
    public name: string = ''
    public group: number = 0
    public max: number = 0
    public multiplier: number = 1

}