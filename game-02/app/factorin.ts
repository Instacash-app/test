import {Item} from "./gilded-rose"
import * as itemOperation from "./item-operations"

export abstract class ItemFactory {
    abstract updateItem(item: Item): Item
}

class LegendaryItemFactory implements ItemFactory {
    public updateItem(item: Item): Item {
            return item;
    }
}

class AgedBrieFactory implements ItemFactory {
    public updateItem(item: Item): Item {
        item = itemOperation.raiseQuality(item);
        item.sellIn -= 1;
        return item;
    }
}

class BackstagePassFactory implements ItemFactory {
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

class NormalItemFactory implements ItemFactory {
    public updateItem(item: Item): Item {
        var degraded: number = itemOperation.isDegraded(item) ?  2 :  1; //if degraded, twice as fast down
        var conjured: number = itemOperation.isConjured(item) ? 2 : 1;   //if conjured, twice as fast down
        item = itemOperation.decreaseQuality(item, degraded * conjured);
        item.sellIn -= 1;
        return item;
    }
}

export function getItemFactory(item: Item): ItemFactory {
    if(itemOperation.isAgedBrie(item)){
        return new AgedBrieFactory()

    } else if(itemOperation.isBackstagePass(item)){
        return new BackstagePassFactory()

    } else if(itemOperation.isLegendary(item)){
        return new LegendaryItemFactory()

    } else {
        return new NormalItemFactory()
    }
}
