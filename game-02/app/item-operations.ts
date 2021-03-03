import {Item} from "./gilded-rose"

//returns true if item is listed here as legendary
export function isLegendary(item: Item){
    //---- LEGENDARY ITEM LIST (name) ----
    var legendary_list: String[] = [
        'Sulfuras, Hand of Ragnaros'
    ]
    if(legendary_list.indexOf(item.name) > -1){
        return true
    }
    return false
}

//returns true if item is a backstage pass to X
function isBackstagePass(item: Item){
    if(item.name.indexOf("Backstage passes to ") > -1){
        return true
    }
    return false
}

//returns true if item is Aged Brie
function isAgedBrie(item: Item){
    if(item.name == 'Aged Brie'){
        return true
    }
    return false
}

//returns the item with modified quality and sellIn
export function updateItem(item: Item){
    if(isAgedBrie(item)){
        item = raiseQuality(item)
        item.sellIn -= 1
        //Aged Brie doesnt care about aging past sellIn, so no check for sellIn <= 0
    } else if(isBackstagePass(item)){
        if(item.sellIn <= 10){
            item = raiseQuality(item)
        }
        if(item.sellIn <= 5){
            item = raiseQuality(item)
        }
        item = raiseQuality(item)
        item.sellIn -= 1
        if(item.sellIn <= 0){
            item.quality = 0
        }
    }else{ //normie item
        item.quality -= (isDegraged(item) * isConjured(item))
        item.sellIn -= 1

    }

    return item
}

function raiseQuality(item: Item){
    item.quality += 1
    if(item.quality > 50){
        item.quality = 50
    }
    return item
}

//returns 2 if item is Conjured (this allows decrease to be easily doubled or not)
function isConjured(item: Item){
    if(item.name.indexOf('Conjured') == 0){
        return 2
    }
    return 1
}

//same as before, returns 2 so that you can easily decrease twice as fast after sellin date
function isDegraged(item: Item){
    if(item.sellIn <= 0){
        return 2
    }
    return 1
}
