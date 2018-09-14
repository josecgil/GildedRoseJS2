function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

class DefaultItem extends Item {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }

    spendOneDay () {
        this.sell_in = this.sell_in - 1;

        if (this.quality > 0) {
            this.quality = this.quality - 1;
        }

        if (this.sell_in < 0) {
            if (this.quality > 0) {
                this.quality = this.quality - 1;
            }
        }
    }
}

class Sulfuras extends DefaultItem {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }
    spendOneDay () {}
}

class AgedBrie extends DefaultItem {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }
    spendOneDay () {
        this.sell_in = this.sell_in - 1;
        if (this.quality < 50) {
            this.quality = this.quality + 1;
        }

        if (this.sell_in < 0) {
            if (this.quality < 50) {
                this.quality = this.quality + 1;
            }
        }
    }
}

class BackStage extends DefaultItem {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }
    spendOneDay () {
        this.sell_in = this.sell_in - 1;
        if (this.quality < 50) {
            this.quality = this.quality + 1;
            if (this.sell_in < 10) {
                if (this.quality < 50) {
                    this.quality = this.quality + 1;
                }
            }
            if (this.sell_in < 5) {
                if (this.quality < 50) {
                    this.quality = this.quality + 1;
                }
            }
        }

        if (this.sell_in < 0) {
            this.quality = 0;
        }
    }
}

function createItem(item) {
    switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
            return new Sulfuras(item.name,item.sell_in,item.quality);
        case 'Backstage passes to a TAFKAL80ETC concert':
            return new BackStage(item.name,item.sell_in,item.quality);
        case 'Aged Brie':
            return new AgedBrie(item.name,item.sell_in,item.quality);
    }

    return new DefaultItem(item.name,item.sell_in,item.quality);
}

this.items = [];

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        var item = createItem(items[i]);
        item.spendOneDay();
        items[i] = item;
    }
}

exports.update_quality = update_quality;
exports.Item = Item;
