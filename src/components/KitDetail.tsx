import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'

import Calculator from '../modules/calculator/Calculator'
import { Enchantment } from '../modules/kits/Enchantment'
import { Item } from '../modules/kits/Item'
import { Kit } from '../modules/kits/Kit'
import Server from '../modules/server/Server';
import Costs from '../modules/server/Costs';
import Performance from '../modules/server/Performance';

import ItemDetail from './ItemDetail'
import NewItem from './NewItem'
import KitResume from './KitResume'
import Servers from './Servers'
import { default as CostsElement} from './Costs'
import { default as PerformanceElement} from './Performance'

export default function KitDetail(props: any) {
    const {isCosts, isNewItem, isItemDetail, isServers, isPerformance} = props
    const navigate = useNavigate();
    let { kitId,itemId,name } = useParams()
    let kit = Kit.findOne(`id = ${kitId}`)
    let [item, setItem] = useState((itemId)? kit.getItem(itemId) : '')
    let calc = new Calculator();
    let [server, setServer] = useState(Server.current);

    let _perf = Performance.findOne(`serverId = ${server.id}`)
    let [performance, setPerformance] = useState(_perf)

    let _costs = Costs.findOne(`serverId = ${server.id}`);
    let [costs, setCosts] = useState(_costs);

    let items = kit.items;

    if(!performance || !performance.id){
        let newPerf = new Performance()
        newPerf.serverId = server.id
        newPerf.save()
        setPerformance(newPerf);
    }
    if( performance.id != _perf.id ){
        setPerformance(_perf)
    }

    if(!costs || !costs.id){
        let newCosts = new Costs()
        newCosts.serverId = server.id
        newCosts.save()
        setCosts(newCosts)
    }

    if(costs.id != _costs.id){
        setCosts(_costs)
    }

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
                                        to={ (itemId == item.id)? `/kit/${kitId}/${kit.name}` : `/kit/${kit.id}/item/${item.id}/${item.name}`} 
                                        className={"detail_item ".concat((itemId == item.id)? 'is-selected' : '')} 
                                        key={item.id}
                                    >
                                        <i className={'sprite '.concat(getClassesByItemName(item.name))}></i>
                                    </Link>
                                )
                            }) 
                        }

                        <Link to={`/kit/${kitId}/item/new`} className="detail_item is-new" key="new"></Link>
                    </div>
                </div>

                <KitResume kit={kit} item={item} calc={calc} server={server} costs={costs} performance={performance}/>
            </div>

            {(isItemDetail)? <ItemDetail item={item} calc={calc} setItem={setItem} kit={kit} /> : '' }
            {(isNewItem)? <NewItem setItem={setItem} kit={kit} /> : '' }
            {(isCosts) ? <CostsElement kit={kit} costs={costs} setCosts={setCosts} /> : ''}
            {(isServers) ? <Servers kit={kit} server={server} setServer={setServer} /> : ''}
            {(isPerformance) ? <PerformanceElement kit={kit} performance={performance} setPerformance={setPerformance} /> : ''}

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
