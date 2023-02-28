import { useState } from 'react';
import mermaid from "mermaid";
import Item from '../modules/minecraft/Item';
import { Item as KitItem } from '../modules/kits/Item';
import Enchantment from '../modules/minecraft/Enchantment';
import { useNavigate } from "react-router-dom";

export default function ItemDetail(props:any) {
    const navigate = useNavigate();
    let {item, calc, setItem, kit} = props;

    let itemGroups = item.groups;
    let [selectorMenuIsOpen, setSelector] = useState(false);
    let itemSelectorList = Item.all().map((item: Item) => (<i key={item.id.toString()} onClick={selectItem.bind(null, item)} className={"sprite ".concat(getClassesByItemName(item.name.toString()))}></i>))

    mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
        fontFamily: "Montserrat"
    });

    return (
        <div className="detail_sidebar">
            <div className="detail_header">
                <i onClick={setSelector.bind(null, !selectorMenuIsOpen)} className={"sprite is-menu ".concat(getClassesByItemName(item.name))}></i>
                {item.name}
                <span className="delete-button" onClick={deleteItem}>delete</span>
                <div className={"item-selector ".concat((selectorMenuIsOpen)? 'is-active' : '')}>
                    {itemSelectorList}
                </div>
            </div>
            <div className="item_detail">
                <i className="sprite is-xp"></i>{calc.calculateItem(item)} experience levels
                <i className="sprite is-flow" onClick={updateMermaid}></i>
            </div>
            <div className="item_enchantments">
                {
                    item.enchantmentsOptions().map((enchantment: any) => {
                        let disabled = (itemGroups & enchantment.group) > 0 && !enchantment.selectedLevel;
                        return (
                            <div className={"item_enchantment ".concat(( disabled )? 'is-disabled' :'')} key={enchantment.id}>
                                {enchantment.name}
                                <span className="item_levels ">
                                    {getEnchantmentLevels(enchantment, disabled)}
                                </span>
                            </div>

                        )
                    })
                }
            </div>
            <div className="mermaid-graph" onClick={closeMermaid}> </div>
        </div>
    )

    function generateMermaidChart(enchantPath: Array<any>){
        let allSteps = enchantPath.reduce((result:Array<any>, item: Array<any>) => result.concat(item), []).filter((item: any) => item.id )
        let last = enchantPath.pop();

        if(!last) return '';

        let item = last[0];
        let enchantment = last[1];

        if(!item.isItem){
            item = last[1]
            enchantment = last[0]
        }

        allSteps.push(
            {
                isItem: true, 
                name: `${item.name},${enchantment.name}`, 
                id: "LAST", 
                left: item.id, 
                right: enchantment.id,
            }
        )

        return "flowchart LR\n" + allSteps.map((item: any)=>{
            let fragment = `  A${item.id}[${item.name.split(',').join('\\n')}]`;

            if( item.left ){
                fragment += `\n  A${item.left} --> A${item.id}`
            }
            if( item.right ){
                fragment += `\n  A${item.right} --> A${item.id}`
            }

            return fragment;
        }).join("\n") 
    }

    function updateMermaid(){
          let insertSvg = function (svgCode: string, bindFunctions: any) {
            let graph = document.querySelector('.mermaid-graph');
            
            if( !graph ) return;

            graph.innerHTML = svgCode;
            graph.classList.add('is-active')
          };
          let graphDefinition = generateMermaidChart(calc.getItemEnchantPath(item));
          mermaid.mermaidAPI.render('graphDiv', graphDefinition, insertSvg);
    }

    function selectLevel(enchantment: any, level: number){
        item.addEnchantment(enchantment, level);
        setItem(kit.getItem(item.id));
    }

    function getEnchantmentLevels(enchantment: any, disabled: boolean){
        let levels = [];
        for(let i=0; i<enchantment.max; i++){
            let selected = enchantment.selectedLevel === i+1
            levels.push(<span key={i} onClick={()=>{  !disabled && selectLevel( enchantment, (selected)? 0 : i+1 )  }} className={"item_level ".concat( (selected)? 'is-selected' : '')}>{i+1}</span>)
        }
        return levels;
    }

    function getClassesByItemName(name: string){
        return name.split(' ')
                .map( (slice: string) => 'is-'.concat(slice.toLocaleLowerCase()) )
                .join(' ')
    }

    function closeMermaid(){
        let graph = document.querySelector('.mermaid-graph');
        if( !graph ) return;

        graph.classList.remove('is-active')
    }

    function selectItem(selected:Item){
        if(item.type !== selected.type){
            item.enchantments.forEach((enchantment: Enchantment) => enchantment.delete() );
        }

        item.itemId = selected.id;
        item.save();
        setSelector(false)

        navigate(`/kit/${kit.id}/item/${item.id}/${selected.name}`);
        setItem(KitItem.findOne(`id = ${item.id}`));
    }

    function deleteItem(){
        if( !window.confirm(`You really want to delete '${item.name}'?`) ) return;
        item.enchantments.forEach((enchantment: Enchantment) => enchantment.delete() )
        item.delete()
        navigate(`/kit/${kit.id}/${kit.name}`)
    }

}