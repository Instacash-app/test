import * as itemOperation from "./item-operations"

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
            if(!itemOperation.isLegendary(item)){
                item = itemOperation.updateItem(item);
            }
        }
        return this.items;
    }
}
