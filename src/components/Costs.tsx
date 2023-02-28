import Item from '../modules/minecraft/Item';
import { Item as KitItem } from '../modules/kits/Item';
import { Enchantment as KitEnchantment } from '../modules/kits/Enchantment';

export default function Costs(props:any) {
    let {kit, costs, setCosts} = props;
    
    let itemsIds = Object.keys(
        kit.items.reduce(
            (index:any, item: KitItem)=>{
                index[item.itemId.toString()] = true
                return index
            }, 
            {}
        )
    );

    let enchantments = Object.values(
        kit.items.reduce(
            (index:any, item: KitItem)=>{
                item.enchantments.forEach(
                    (enchantment:KitEnchantment)=>{
                        index[enchantment.fullName] = enchantment
                    }
                )
                return index
            }, 
            {}
        )
    )

    let items = Item.find(`id in ${itemsIds.join(',')}`);
    let enchantmentsList = enchantments.map((item: any, index: number) => (
        <div className="cost_item" key={item.enchantment.id}>
            <div className="cost_item-name">
                <i className="sprite is-book"></i> {item.fullName}
            </div>
            <div className="cost_item-price"><input type="text" placeholder={(!index)? 'emerald': ''} value={costs.data.emerald[item.fullName]??'' } onChange={saveValue.bind(null, 'emerald', item)} /><i className="sprite is-emerald"></i></div>
            <div className="cost_item-price"><input type="text" placeholder={(!index)? 'money': ''}  value={costs.data.money[item.fullName]??'' }  onChange={saveValue.bind(null, 'money', item)} /><i className="sprite is-coin"></i></div>
        </div>
    ))

    let itemList = items.map((item: any) => (
        <div className="cost_item" key={item.id}>
            <div className="cost_item-name">
                <i className={`sprite ${getClassesByItemName(item.fullName)}`}></i> {item.fullName}
            </div>
            <div className="cost_item-price"><input type="text"  value={costs.data.emerald[item.fullName]??'' }  onChange={saveValue.bind(null, 'emerald', item)} /><i className="sprite is-emerald"></i></div>
            <div className="cost_item-price"><input type="text" value={costs.data.money[item.fullName]??'' }  onChange={saveValue.bind(null, 'money', item)}  /><i className="sprite is-coin"></i></div>
        </div>
    ))

    return (
        <div className="detail_sidebar">
            <div className="detail_header is-new-item">
                Setup itens costs
            </div>
            <div className="cost_list">
                {enchantmentsList}
                {itemList}
            </div>
        </div>
    )

    function saveValue(type: string, item:Item, event:any){
        setCosts(costs.setCost(item, event.target.value, type))
    }

    function getClassesByItemName(name: string){
        return name.split(' ')
                .map( (slice: string) => 'is-'.concat(slice.toLocaleLowerCase()) )
                .join(' ')
    }
}