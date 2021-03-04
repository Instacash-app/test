# Gilded Rose Requirements Specification
(added some decisions after the rules to make it easier in case someone still needs to read them for review)
## What we need?

- Refactor the terrible code: `app/gilded-rose.ts`
- Don't change the test.

## Rules and new requirement

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:
- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	
    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.

## Decisions
Besides the refactoring itself to make the code cleaner, avoid duplicate if statements, and adding abstract 'factories' (not quite a factory as it isnt creating a new item), I made the following choices regarding functionality:

### Allowed for future legendary items and backstage passes to also be taken into account
As is, only 'Sulfuras, the hand of Ragnaros' is a legendary item, and the code tried to detect it by name.  I first made a legendary_items list that could have other legendary items added to it so the isLegendary(item) function could detect others besides Sulfuras.  This wasn't good enough as the list still required manual input to add the new legendary items.  Finally, I decided to have isLegendary(item) check if the item's quality equals 80, as, quoting the rules, "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters". Meaning legendary items should have a permanent 80 quality.

For backstage passes I simply check if the item's name starts with 'Backstage passes to '.  This might not be all-encompassing, but still would allow for some format of new backstage passes to be created.

Aged Brie I decided to leave as is, checking the name for detection.  I suppose eventually (if such is the criteria), a similar change to the one for backstage passes could be added to detect Aged items.

### For normal and conjured items
Generic (as in, no special case) items are the only ones currently affected by the 'Conjured' typing.  Aged Brie doesnt decrease in quality, backstage passes increase until it turns 0, legendary items never change.  However I assumed that in the future, we could have new types (e.g.: Rare but not quite legendary) that do have a decrease in quality and are therefore affected by the 'Conjured' word, and decided against making Conjured items its own type, rather a possible characterisitic of any time that could be affected by it, which again, its only Generic ones for now.
