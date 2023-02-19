import { useState } from 'react';
import { Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import Calculator from '../modules/calculator/Calculator';
import ItemDetail from './ItemDetail';
import NewItem from './NewItem';
import { Item } from '../modules/kits/Item';
import { Kit } from '../modules/kits/Kit';
import { Enchantment } from '../modules/kits/Enchantment';


export default function KitDetail() {
    const navigate = useNavigate();
    let { kitId,itemId,name } = useParams()
    let kit = Kit.findOne(`id = ${kitId}`)
    let newItem = useLocation().pathname == `/item/${kit.id}/new`
    let [item, setItem] = useState((itemId)? kit.getItem(itemId) : '')
    let calc = new Calculator();
    let items = kit.items;

    items.sort((a:any, b:any) => a.id - b.id);
    Kit.current = kit;

    return ( 
        <div className="detail">
            <div className="detail_body">
                <div className="detail_main">
                    <div className="detail_header">
                        <i className="sprite is-shulker-box"></i>
                        {kit.name}
                        <span className="delete-button" onClick={deleteKit} >delete</span>
                    </div>
                    <div className="detail_item-list">
                        { 
                            items.map((item: any) => {
                                return (
                                    <Link 
                                        onClick={()=>{setItem(kit.getItem(item.id));}} 
                                        to={ (itemId == item.id)? `/kit/${kitId}/${kit.name}` : `/item/${kit.id}/${item.id}/${item.name}`} 
                                        className={"detail_item ".concat((itemId == item.id)? 'is-selected' : '')} 
                                        key={item.id}
                                    >
                                        <i className={'sprite '.concat(getClassesByItemName(item.name))}></i>
                                    </Link>
                                )
                            }) 
                        }

                        <Link to={`/item/${kitId}/new`} className="detail_item is-new" key="new"></Link>
                    </div>
                </div>
            </div>

            {(itemId)? <ItemDetail item={item} calc={calc} setItem={setItem} kit={kit} /> : '' }
            {(newItem)? <NewItem setItem={setItem} kit={kit} /> : '' }

        </div>
    );

    function getClassesByItemName(name: string){
        return name.split(' ')
                .map( (slice: string) => 'is-'.concat(slice.toLocaleLowerCase()) )
                .join(' ')
    }

    function deleteKit(){
        if( !window.confirm(`You really want to delete '${kit.name}' kit?`) ) return;
        items.forEach((item: Item)=>{
            item.enchantments.forEach((enchantment: Enchantment) => enchantment.delete() )
            item.delete()
        });
        kit.delete()
        navigate("/")
    }

}
