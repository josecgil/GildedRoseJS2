var gilded_rose = require('../src/gilded_rose.js');
var using = require('jasmine-data-provider');

var update_quality=gilded_rose.update_quality;
var Item=gilded_rose.Item;
var AGED_BRIE_NAME = 'Aged Brie';
var BACKSTAGE_NAME = "Backstage passes to a TAFKAL80ETC concert";
var SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';

describe("Generic", function() {
    it("should reduced quality by 2 when there are no remaining days", function() {
        var NAME = 'name';
        var SELL_IN_NO_REMAINING_DAYS = 0;
        var QUALITY_GREAT_THAN_1 = 3;
        items = [ new Item(NAME, SELL_IN_NO_REMAINING_DAYS, QUALITY_GREAT_THAN_1) ];
        update_quality();
        expect(items[0].quality).toBe(QUALITY_GREAT_THAN_1 - 2);
    });

    it("should reduced quality by 1 when there are 1 remaining days", function() {
        var NAME = 'name';
        var SELL_IN_HAS_REMAINING_DAYS = 1;
        var WITH_QUALITY = 2;
        items = [ new Item(NAME, SELL_IN_HAS_REMAINING_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].quality).toBe(WITH_QUALITY - 1);
    });

    it("should not reduce quality less than 0", function() {
        var NAME = 'name';
        var SELL_IN_NO_REMAINING_DAYS = 0;
        var WITH_QUALITY = 0;
        items = [ new Item(NAME, SELL_IN_NO_REMAINING_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].quality).toBe(WITH_QUALITY);
    });

    it("should not has quality greater than 50", function() {
        var NAME = AGED_BRIE_NAME;
        var SELL_IN_ANY_DAYS = 0;
        var WITH_QUALITY = 50;
        items = [ new Item(NAME, SELL_IN_ANY_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].quality).toBe(WITH_QUALITY);
    });

    it("should reduce sell in by one", function() {
        var NAME = 'name';
        var SELL_IN_ANY_DAYS = 5;
        var ANY_QUALITY = 50;
        items = [ new Item(NAME, SELL_IN_ANY_DAYS, ANY_QUALITY) ];
        update_quality();
        expect(items[0].sell_in).toBe(SELL_IN_ANY_DAYS - 1);
    });

    it("should never change the name", function() {
        var NAME = 'name';
        var SELL_IN_ANY_DAYS = 5;
        var ANY_QUALITY = 50;
        items = [ new Item(NAME, SELL_IN_ANY_DAYS, ANY_QUALITY) ];
        update_quality();
        expect(items[0].name).toBe(NAME);
    });

    it("should work with empty items", function() {
        items = [];
        update_quality();
        expect(items.length).toBe(0);
    });


    it("should throw an exception with items is not an array", function() {
        expect(
            function(){
                items = undefined;
                update_quality();
            }
        ).toThrow(
             new TypeError("Cannot read property 'length' of undefined")
        );
  });
});

describe("Backstage", function() {
    it("should increase by 1 the quality when there are > 10 days remaining", function() {
        var SELL_IN_GREATER_THAN_10 = 11;
        var QUALITY_LESS_THAN_50 = 48;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_GREATER_THAN_10, QUALITY_LESS_THAN_50) ];
        update_quality();
        expect(items[0].quality).toBe(QUALITY_LESS_THAN_50 + 1);
    });

    using([6,7,8,9,10], function (sell_in) {
        it("should increase by 2 the quality when there are <= 10 days remaining", function() {
            var QUALITY_LESS_THAN_50 = 47;
            items = [ new Item(BACKSTAGE_NAME, sell_in, QUALITY_LESS_THAN_50) ];
            update_quality();
            expect(items[0].quality).toBe(QUALITY_LESS_THAN_50 + 2);
        });
    });

    it("should increase by 3 the quality when there are <= 5 days remaining", function() {
        var SELL_IN_LESS_THAN_6 = 5;
        var QUALITY_LESS_THAN_50 = 47;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_LESS_THAN_6, QUALITY_LESS_THAN_50) ];
        update_quality();
        expect(items[0].quality).toBe(QUALITY_LESS_THAN_50 + 3);
    });

    it("should drop quality to 0 after the concert", function() {
        var SELL_IN_REMAIN_DAYS_TO_CONCERT = 0;
        var QUALITY_GREAT_THAN_0 = 10;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_REMAIN_DAYS_TO_CONCERT, QUALITY_GREAT_THAN_0) ];
        update_quality();
        expect(items[0].quality).toBe(0);
    });

    it("should not increase quality beyond 50", function() {
        var SELL_IN_REMAIN_DAYS_TO_CONCERT = 1;
        var QUALITY_MAX_LIMIT = 50;
        var QUALITY_NEAR_MAX_LIMIT = QUALITY_MAX_LIMIT - 1;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_REMAIN_DAYS_TO_CONCERT, QUALITY_NEAR_MAX_LIMIT) ];
        update_quality();
        expect(items[0].quality).toBe(QUALITY_NEAR_MAX_LIMIT + 1);
    });
});

describe("Sulfuras", function() {
    it("should never change", function() {
        var SELL_IN_ANY_DAYS = -1;
        var QUALITY_FIXED = 80;
        items = [ new Item(SULFURAS_NAME, SELL_IN_ANY_DAYS, QUALITY_FIXED) ];
        update_quality();
        expect(items[0].sell_in).toBe(SELL_IN_ANY_DAYS);
        expect(items[0].quality).toBe(QUALITY_FIXED);
    });
});

describe('Aged Brie', function(){
    it("should increase quality", function() {
        var NAME = AGED_BRIE_NAME;
        var SELL_IN_ANY_DAYS = 5;
        var WITH_QUALITY = 40;
        items = [ new Item(NAME, SELL_IN_ANY_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].quality).toBe(WITH_QUALITY + 1);
    });

    it("should increase quality by 2 when sell in days < 0", function() {
        var NAME = AGED_BRIE_NAME;
        var DAYS_TO_EXPIRE = 0;
        var WITH_QUALITY = 40;
        items = [ new Item(NAME, DAYS_TO_EXPIRE, WITH_QUALITY) ];
        update_quality();
        expect(items[0].quality).toBe(WITH_QUALITY + 2);
    });
});
