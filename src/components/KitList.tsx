import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { Kit } from '../modules/kits/Kit';

export default function KitList() {
    return ( 
        <div className="kit-list">
            {Kit.all().map((kit : any) => {
                return (
                    <Link to={'/kit/'.concat(kit.id, '/', kit.name)} className="kit" key={kit.id}>
                        <i className="sprite is-shulker-box"></i>
                        <div className="kit_name">{kit.name}</div>
                    </Link>
                )
            })}
            <div className="kit is-plus"></div>
        </div>
  ) ;
}