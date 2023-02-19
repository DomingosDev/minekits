import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { Kit } from '../modules/kits/Kit';
import { useState } from 'react';

export default function KitList() {

    let [list, setList] = useState(Kit.all());

    return ( 
        <div className="kit-list">
            {list.map((kit : any) => {
                return (
                    <Link to={'/kit/'.concat(kit.id, '/', kit.name)} className="kit" key={kit.id}>
                        <i className="sprite is-shulker-box"></i>
                        <div className="kit_name">{kit.name}</div>
                    </Link>
                )
            })}
            <div className="kit is-plus" onClick={newKit}></div>
        </div>
  ) ;

  function newKit(){
    let kit = new Kit();
    let name = prompt('What is the kit name?')??""
    if(!name) return;    
    kit.name = name.toString();
    kit.save();
    setList(Kit.all())
  }
}