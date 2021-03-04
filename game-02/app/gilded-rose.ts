import {getItemType, ItemType} from "./item-factories"
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /**
    *updates the quality of the item list in GildedRose object
    */
    updateQuality() {
        for (var item of this.items){

            var type: ItemType = getItemType(item)
            item = type.updateItem(item)

        }
        return this.items;
    }
}
