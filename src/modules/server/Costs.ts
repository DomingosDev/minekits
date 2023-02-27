import Model from "../../utils/Model";

type Item = {
    fullName: string;
};

export default class Costs extends Model{
    static tableName: string = 'costs';

    public id: number = 0
    public serverId: number = 0
    public data: any = { emerald: {}, money: {} }

    calculateEmeralds(items: Array<Item>){
        return items.reduce((sum: number, item: Item) => sum + parseInt(this.data.emerald[item.fullName]??0), 0 )
    }

    calculateMoney(items: Array<Item>){
        return items.reduce((sum: number, item: Item) => sum + parseInt(this.data.money[item.fullName]??0), 0 )
    }

    setCost(item: Item, cost: number, type: string){
        if(!cost){
            delete this.data[type][item.fullName]
            this.save()
            return Costs.findOne(`id = ${this.id}`);
        }

        this.data[type][item.fullName] = cost
        this.save()
        return Costs.findOne(`id = ${this.id}`);
    }
}