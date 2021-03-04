import {modifyItem} from "./item-catalogue"
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
            item = modifyItem(item)
        }
        return this.items;
    }
}
