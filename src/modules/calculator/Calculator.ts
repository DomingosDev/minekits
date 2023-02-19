import { Enchantment } from "../kits/Enchantment";
import { Item } from "../kits/Item";
import { Kit } from "../kits/Kit";

export default class Calculator{
    calculateKit(kit: Kit = Kit.current){
        return kit.items.reduce((result:number, item:Item) => {
            return result + this.calculateItem(item);
        }, 0);
    }

    calculateItem(item: Item){
        return this.calculateTotal(this.getItemEnchantPath(item));
    }

    calculateTotal(path: Array<any>){
        return path.reduce( (result:number, item: any) => {
            result += item[2];
            return result;
        }, 0)
    };

    /**
     * reference https://minecraft.fandom.com/wiki/Anvil_mechanics
     * Experience cost = 
            [Value of sacrificed (right placed) item] + 
            [Work Penalty of target (left placed) item] + 
            [Work Penalty of sacrificed (right placed) item]

        New value = 
            [Value of target (left placed) item] + 
            [Value of sacrificed (right placed) item]. 
     */
    getItemEnchantPath(item: Item){
        let path: any[] = [];
        let steps = [];
        let enchantments = item.enchantments;
        let isBow = item.type.name === 'Bow';
        let hasInfinity = enchantments.filter((item: Enchantment) => item.name === 'Infinity').length;

        enchantments.sort((a: Enchantment, b: Enchantment) => a.cost - b.cost)

        steps = enchantments.map((enchantment: Enchantment, index: number)=>{
            return {
                isItem: false,
                name: enchantment.name,
                value: enchantment.cost,
                anvilUses: 0,
                id: Math.pow(2, index+1)
            };
        });
        
        steps.unshift({
            isItem: true,
            name: item.item.name,
            value: 0,
            anvilUses: 0,
            cost: 0,
            id: Math.pow(2, 0)
        });

        // mergin books and first merge of item
        steps = calculateSteps(steps);

        // lower work penalty is better
        if( isBow && hasInfinity ){
            while(steps.length > 1){
                calculateSteps(steps);
            }

            return path;
        }

        // lower experience is better
        let itemStep = steps.filter((item: any) => item.isItem).pop();
        steps = steps.filter((item: any) => !item.isItem);

        while(steps.length){
            let next = steps.shift();
            let workPenalty = calculateWorkPenalty(next.anvilUses) + calculateWorkPenalty(itemStep.anvilUses);
            path.push([itemStep, next, workPenalty + next.value]);
            itemStep = {
                name: `${itemStep.name},${next.name}`,
                value: itemStep.value + next.value,
                wp: workPenalty,
                isItem: true,
                anvilUses: Math.max.apply(null,[itemStep.anvilUses, next.anvilUses]) + 1,
                cost: workPenalty + itemStep.value,
                id: itemStep.id | next.id,
                left: itemStep.id,
                right: next.id
            };
        }
        
        return path;


        function calculateSteps(steps: Array<any>){
            let next: Array<any> = [];

            while(steps.length > 1){
                let higher = steps.pop();
                let lower = steps.shift();
                let workPenalty = calculateWorkPenalty(higher.anvilUses) + calculateWorkPenalty(lower.anvilUses);
                let value = (lower.isItem)? higher.value : lower.value;
                let name = (lower.isItem)? `${lower.name},${higher.name}` : `${higher.name},${lower.name}`;
                let left = (lower.isItem)? lower.id : higher.id;
                let right = (lower.isItem)? higher.id : lower.id;

                path.push([lower, higher, workPenalty + value]);
            
                next.push({
                    isItem: higher.isItem || lower.isItem,
                    name: name,
                    value: higher.value + lower.value,
                    wp: workPenalty,
                    anvilUses: Math.max.apply(null,[higher.anvilUses, lower.anvilUses]) + 1,
                    cost: workPenalty + value,
                    id: higher.id | lower.id,
                    left: left,
                    right: right
                });
            }

            if(steps.length){
                next.push(steps.shift())
            }

            next.sort((a: any, b: any) => a.value - b.value)
            return next;
        }

        function calculateWorkPenalty(anvilUses: number){
            let penalty = (Math.pow(2, anvilUses) ) - 1;
            return (penalty > 0)? penalty : 0;
        }
    }
}