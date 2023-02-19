import { useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import { Kit } from '../modules/kits/Kit';
import { Item } from '../modules/kits/Item';
import Calculator from '../modules/calculator/Calculator';
import ItemDetail from './ItemDetail';

export default function KitDetail() {
    let { kitId,itemId,name } = useParams();
    let kit = Kit.findOne(`id = ${kitId}`);
    let [item, setItem] = useState((itemId)? kit.getItem(itemId) : '');
    let calc = new Calculator();

    Kit.current = kit;

    return ( 
        <div className="detail">
            <div className="detail_body">
                <div className="detail_main">
                    <div className="detail_header">
                        <i className="sprite is-shulker-box"></i>
                        {kit.name}
                    </div>
                    <div className="detail_item-list">
                        { 
                            kit.items.map((item: any) => {
                                return (
                                    <Link onClick={()=>{setItem(kit.getItem(item.id));}} to={'/item/'.concat(kit.id, '/', item.id, '/', item.name)} className={"detail_item ".concat((itemId == item.id)? 'is-selected' : '')} key={item.id}>
                                        <i className={'sprite '.concat(getClassesByItemName(item.name))}></i>
                                    </Link>
                                )
                            }) 
                        }

                        <Link to={'/item/new'} className="detail_item is-new" key="new"></Link>
                    </div>
                </div>
            </div>

            {(item)? <ItemDetail item={item} calc={calc} setItem={setItem} kit={kit} /> : '' }


        </div>
    );

    function getClassesByItemName(name: string){
        return name.split(' ')
                .map( (slice: string) => 'is-'.concat(slice.toLocaleLowerCase()) )
                .join(' ')
    }

}
