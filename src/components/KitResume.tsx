import { useNavigate, BrowserRouter, Link, Route, Routes, useParams} from 'react-router-dom';
import { Item } from '../modules/kits/Item';

export default function KitResume(props:any) {
    const navigate = useNavigate();
    let {kit, calc, server, costs, performance} = props;

    let itemsToCalculate: Array<any> = [];
    kit.items.forEach((item: Item) => {
        itemsToCalculate.push(item)
        itemsToCalculate = itemsToCalculate.concat(item.enchantments)
    });

    let emeraldCosts = costs.calculateEmeralds(itemsToCalculate)
    let moneyCosts = costs.calculateMoney(itemsToCalculate)
    let experienceCosts = calc.calculateKit(kit);
    let emerald: any, money: any;

    if(emeraldCosts > 0){
        emerald = (
            <div className="kit-resume_line">
                <i className="sprite is-emerald"></i>{emeraldCosts} emeralds <small>{performance.calcTime('emerald', emeraldCosts)}</small>
            </div>
        )
    }

    if( moneyCosts> 0 ){
        money =  (
            <div className="kit-resume_line">
                <i className="sprite is-coin"></i>${moneyCosts} <small>{performance.calcTime('money', moneyCosts)}</small>
            </div>
        )
    }

    let totalFarming = performance.calcAllTime({ emerald: emeraldCosts, experience:experienceCosts, money:moneyCosts})
    let farming = (!totalFarming)? '' : (
        <div className="kit-resume_line">
            <i className="sprite is-clock"></i>{totalFarming}
        </div>
    )

    return ( 
        <div className="kit-resume">
            <div className="kit-resume_title">{server.name}</div>
            <div className="kit-resume_line">
                <i className="sprite is-xp"></i>{experienceCosts} experience levels  <small>{performance.calcTime('experience', experienceCosts)}</small>
            </div>
            
            {emerald}
            {money}
            {farming}
           
            <div className="kit-resume_line is-footer">
                Need more metrics?<br/>
                <Link to={`/kit/${kit.id}/server`}>set server</Link>
                <Link to={`/kit/${kit.id}/costs`} >add item costs</Link>
                <Link to={`/kit/${kit.id}/farming`}>set farming performance</Link>
            </div>
        </div>
  ) ;
}