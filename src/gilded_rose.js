function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

class DefaultItem extends Item {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }

    ramon () {
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
    ramon () {}
}

class AgedBrie extends DefaultItem {
    constructor (name, sell_in, quality) {
        super(name, sell_in, quality);
    }
    ramon () {
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
    ramon () {
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



this.items = [];

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        var item = new DefaultItem(items[i].name,items[i].sell_in,items[i].quality);
        try{
            var isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';
            var isBackstage = item.name === 'Backstage passes to a TAFKAL80ETC concert';
            var isAgedBrie = item.name === 'Aged Brie';

            if(isSulfuras) {
                item = new Sulfuras(item.name,item.sell_in,item.quality);
            }

            if (isAgedBrie) {
                item = new AgedBrie(item.name,item.sell_in,item.quality);
            }

            if (isBackstage) {
                item = new BackStage(item.name,item.sell_in,item.quality);
            }
            item.ramon();

        }finally {
            items[i] = item;
        }

    }
}

exports.update_quality = update_quality;
exports.Item = Item;
