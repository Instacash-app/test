import {Item} from "./gilded-rose"
/**
*@fileoverview Performs several operations related to Item objects
*@author https://github.com/hmontoyag/
*/

const MAX_QUALITY = 50
const LEGENDARY_QUALITY = 80
const MIN_QUALITY = 0
/**
*checks if item is legendary (quality == 80)
*
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
export function isLegendary(item: Item){
    //legendary items have quality 80 and it never alters, so we can use it
    if(item.quality == LEGENDARY_QUALITY){
        return true;
    }
    return false;
}

/**
*Checks if item is a Backstage Pass
*@param {Item} item - item to check
*@return {boolean} true if is, false if not
*/
export function isBackstagePass(item: Item){
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
export function isAgedBrie(item: Item){
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
export function isConjured(item: Item){
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
export function isDegraded(item: Item){
    if(item.sellIn <= MIN_QUALITY){
        return true;
    }
    return false;
}

/**
* raises the quality of an item, cant go past 50
*@param {Item} item - item which quality will be raised
*@param {number} value - value to add, default to 1
*@return {Item} the modified item
*/
export function raiseQuality(item: Item, value: number = 1){
    item.quality += value;
    if(item.quality > MAX_QUALITY){
        item.quality = MAX_QUALITY;
    }
    return item;
}

/**
* decreases the quality of an item, cant go under 0
*@param {Item} item - item which quality will be decrease
*@param {number} value - value to substract, default to 1
*@return {Item} the modified item
*/
export function decreaseQuality(item: Item, value: number = 1){
    item.quality -= value;
    if(item.quality < MIN_QUALITY){
        item.quality = MIN_QUALITY;
    }
    return item;
}
