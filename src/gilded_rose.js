function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

this.items = [];

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';
        var isBackstage = item.name === 'Backstage passes to a TAFKAL80ETC concert';
        var isAgedBrie = item.name === 'Aged Brie';

        if(isSulfuras) {
            continue;
        }

        item.sell_in = item.sell_in - 1;

        if (isAgedBrie) {
            if (item.quality < 50) {
                item.quality = item.quality + 1;
            }

            if (item.sell_in < 0) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
            }

            continue;
        }

        if (isBackstage) {
            if (item.quality < 50) {
                item.quality = item.quality + 1;
                if (item.sell_in < 10) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
                if (item.sell_in < 5) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
            }

            if (item.sell_in < 0) {
                item.quality = 0;
            }

            continue;
        }


        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }

        if (item.sell_in < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1;
            }
        }
    }
}

exports.update_quality = update_quality;
exports.Item = Item;
