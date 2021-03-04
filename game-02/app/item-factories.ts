import {Item} from "./gilded-rose"
import * as itemOperation from "./item-operations"

/**
*Abstract class for ItemType(s)
*defined that all types must have an updateItem(item: Item) method
*/
export abstract class ItemType {
    abstract updateItem(item: Item): Item
}

/**
*Class for Legendary Items
*/
class LegendaryItem implements ItemType {
    public updateItem(item: Item): Item {
            return item;
    }
}

/**
*Class for Aged Brie
*/
class AgedBrie implements ItemType {
    public updateItem(item: Item): Item {
        item = itemOperation.raiseQuality(item);
        item.sellIn -= 1;
        return item;
    }
}

/**
*Class for Backstage Passes
*/
class BackstagePass implements ItemType {
    public updateItem(item: Item): Item{
        var amount: number = Math.ceil((10.1 - item.sellIn) / 5)
        amount = amount > 0 && amount < 3 ? amount : 0
        item = itemOperation.raiseQuality(item, amount+1);
        item.sellIn -= 1;
        if(item.sellIn <= 0){
            item.quality = 0;
        }
        return item;
    }
}

/**
*Class for normal items (those that dont fall on any category)
*/
class NormalItem implements ItemType {
    public updateItem(item: Item): Item {
        var degraded: number = itemOperation.isDegraded(item) ?  2 :  1; //if degraded, twice as fast down
        var conjured: number = itemOperation.isConjured(item) ? 2 : 1;   //if conjured, twice as fast down
        item = itemOperation.decreaseQuality(item, degraded * conjured);
        item.sellIn -= 1;
        return item;
    }
}
/**
*Gets the right type for the input item
*@param {Item} item - checks type of this item
*@return {ItemType} returns an object of the class corresponding to the itemtype
*/
export function getItemType(item: Item): ItemType {
    if(itemOperation.isAgedBrie(item)){
        return new AgedBrie()

    } else if(itemOperation.isBackstagePass(item)){
        return new BackstagePass()

    } else if(itemOperation.isLegendary(item)){
        return new LegendaryItem()

    } else {
        return new NormalItem()
    }
}
