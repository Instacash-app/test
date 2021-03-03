import {Item} from "./gilded-rose"
/**
*@fileoverview Performs several operations related to Item objects
*@author https://github.com/hmontoyag/
*/


/**
*Returns true if item is Legendary
* **** contains a variable legendary_list     ****
* **** it  contains the known legendary items ****
*
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
export function isLegendary(item: Item){
    //---- LEGENDARY ITEM LIST (name) ----
    var legendary_list: String[] = [
        'Sulfuras, Hand of Ragnaros'
    ];
    if(legendary_list.indexOf(item.name) > -1){
        return true;
    }
    return false;
}

/**
*Checks if item is a Backstage Pass
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
function isBackstagePass(item: Item){
    if(item.name.indexOf("Backstage passes to ") > -1){
        return true;
    }
    return false;
}

/**
*Checks if item is Aged Brie
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
function isAgedBrie(item: Item){
    if(item.name == 'Aged Brie'){
        return true;
    }
    return false;
}

/**
*Checks if item is conjured
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
function isConjured(item: Item){
    if(item.name.indexOf('Conjured') == 0){
        return true;
    }
    return false;
}

/**
*Checks if item is degraded (quality below 0)
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
function isDegraded(item: Item){
    if(item.sellIn <= 0){
        return true;
    }
    return false;
}

/**
*updates an item's quality and sellIn date
*@param {Item} item - item to update
*@return {Item} the modified item
*/
export function updateItem(item: Item){
    if(isAgedBrie(item)){
        item = raiseQuality(item);
        item.sellIn -= 1;

    } else if(isBackstagePass(item)){
        /**amount - gets the amount to increase quality, dependant on proximity to sellIn**/
        var amount: number = Math.ceil((10.1 - item.sellIn) / 5)
        amount = amount > 0 && amount < 3 ? amount : 0
        item = raiseQuality(item, amount+1);
        item.sellIn -= 1;
        if(item.sellIn <= 0){
            item.quality = 0;
        }

    }else{ /**no special case - could still be conjured **/
        var degraded: number = isDegraded(item) ?  2 :  1; //if degraded, twice as fast down
        var conjured: number = isConjured(item) ? 2 : 1;   //if conjured, twice as fast down
        item = decreaseQuality(item, degraded * conjured);
        item.sellIn -= 1;

    }

    return item
}

/**
* raises the quality of an item, cant go past 50
*@param {Item} item - item which quality will be raised
*@param {number} value - value to add, default to 1
*@return {Item} the modified item
*/
function raiseQuality(item: Item, value: number = 1){
    item.quality += value;
    if(item.quality > 50){
        item.quality = 50;
    }
    return item
}

/**
* decreases the quality of an item, cant go under 0
*@param {Item} item - item which quality will be decrease
*@param {number} value - value to substract, default to 1
*@return {Item} the modified item
*/
function decreaseQuality(item: Item, value: number = 1){
    item.quality -= value;
    if(item.quality < 0){
        item.quality = 0;
    }
    return item
}
