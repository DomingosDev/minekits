import { useState, useEffect } from 'react';
import Item from '../modules/minecraft/Item';
import { Item as KitItem } from '../modules/kits/Item';
import { useNavigate } from "react-router-dom";

export default function NewItem(props:any) {
    let {kit, setItem} = props;
    let item = new KitItem()
    let itemGroups = item.groups
    let itemSelectorList = Item.all().map((item: Item) => (<i key={item.id.toString()} onClick={selectItem.bind(null, item)} className={"sprite ".concat(getClassesByItemName(item.name.toString()))}></i>))
    let navigate = useNavigate();

    item.kitId = kit.id;
    item.itemId = 1;

    return (
        <div className="detail_sidebar">
            <div className="detail_header is-new-item">
                Select the item type
            </div>
            <div className={"item-selector is-active"}>
                {itemSelectorList}
            </div>
        </div>
    )

    function getClassesByItemName(name: string){
        return name.split(' ')
                .map( (slice: string) => 'is-'.concat(slice.toLocaleLowerCase()) )
                .join(' ')
    }

    function selectItem(selected:Item){
        item.itemId = selected.id;
        item.save();

        navigate(`/kit/${kit.id}/item/${item.id}/${selected.name}`);
        setItem(KitItem.findOne(`id = ${item.id}`));
    }

}