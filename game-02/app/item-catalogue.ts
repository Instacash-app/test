import {Item} from "./gilded-rose"
import * as itemOperation from "./item-operations"
/**
*@fileoverview contains abstract class ItemType, and then a class for each item
*category/type, each implementing its own defined logic for updating an item in
*updateItem().
*@author https://github.com/hmontoyag/
*/

export abstract class ItemType {

    abstract updateItem(item: Item): Item;

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

        var amount: number = Math.ceil((10.1 - item.sellIn) / 5);
        amount = amount > 0 && amount < 3 ? amount : 0;
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
class GenericItem implements ItemType {
    public updateItem(item: Item): Item {

        item = itemOperation.decreaseQuality(item, 1);
        item.sellIn -= 1;
        return item;
    }
}
/**
*Gets the right type for the input item and applies the type's updateItem()
*@param {Item} item - checks type of this item
*@return {Item} returns the item modified according to its type
*/
export function modifyItem(item: Item): Item {
    var itemType: ItemType;
    //Aged Brie
    if(itemOperation.isAgedBrie(item)) {
        itemType =  new AgedBrie();

    //BackStage Passes
    } else if(itemOperation.isBackstagePass(item)) {
        itemType =  new BackstagePass();

    //Legendary Items
    } else if(itemOperation.isLegendary(item)) {
        itemType =  new LegendaryItem();

    //Generic Items
    } else {
        itemType  =  new GenericItem();
    }

    return itemType.updateItem(item);
}
