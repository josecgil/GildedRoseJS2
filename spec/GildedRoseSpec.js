var gilded_rose = require('../src/gilded_rose.js');

var update_quality=gilded_rose.update_quality;
var Item=gilded_rose.Item;

describe("Backstage", function() {
    var BACKSTAGE_NAME = "Backstage passes to a TAFKAL80ETC concert";

    it("should increase by 2 the quality when there are <= 10 days remaining", function() {
        var SELL_IN_BETWEEN_6_AND_10 = 10;
        var QUALITY_LESS_THAN_50 = 48;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_BETWEEN_6_AND_10, QUALITY_LESS_THAN_50) ];
        update_quality();
        expect(items[0].name).toBe(BACKSTAGE_NAME);
        expect(items[0].sell_in).toBe(9);
        expect(items[0].quality).toBe(50);
    });

    it("should increase by 3 the quality when there are <= 5 days remaining", function() {
        var SELL_IN_LESS_THAN_6 = 5;
        var QUALITY_LESS_THAN_50 = 47;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_LESS_THAN_6, QUALITY_LESS_THAN_50) ];
        update_quality();
        expect(items[0].name).toBe(BACKSTAGE_NAME);
        expect(items[0].sell_in).toBe(4);
        expect(items[0].quality).toBe(50);
    });

    it("should drop quality to 0 after the concert", function() {
        var SELL_IN_REMAIN_DAYS_TO_CONCERT = 0;
        var QUALITY_GREAT_THAN_0 = 10;
        items = [ new Item(BACKSTAGE_NAME, SELL_IN_REMAIN_DAYS_TO_CONCERT, QUALITY_GREAT_THAN_0) ];
        update_quality();
        expect(items[0].name).toBe(BACKSTAGE_NAME);
        expect(items[0].sell_in).toBe(-1);
        expect(items[0].quality).toBe(0);
    });
});

describe("NOT SPECIAL", function() {
    it("should reduced quality by 2 when there are no remaining days", function() {
        var NOT_SPECIAL_NAME = 'name';
        var SELL_IN_NO_REMAINING_DAYS = 0;
        var QUALITY_GREAT_THAN_1 = 2;
        items = [ new Item(NOT_SPECIAL_NAME, SELL_IN_NO_REMAINING_DAYS, QUALITY_GREAT_THAN_1) ];
        update_quality();
        expect(items[0].name).toBe(NOT_SPECIAL_NAME);
        expect(items[0].sell_in).toBe(SELL_IN_NO_REMAINING_DAYS - 1);
        expect(items[0].quality).toBe(QUALITY_GREAT_THAN_1 - 2);
    });

    it("should reduced quality by 1 when there are 1 remaining days", function() {
        var NOT_SPECIAL_NAME = 'name';
        var SELL_IN_HAS_REMAINING_DAYS = 1;
        var WITH_QUALITY = 1;
        items = [ new Item(NOT_SPECIAL_NAME, SELL_IN_HAS_REMAINING_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].name).toBe(NOT_SPECIAL_NAME);
        expect(items[0].sell_in).toBe(SELL_IN_HAS_REMAINING_DAYS - 1);
        expect(items[0].quality).toBe(WITH_QUALITY - 1);
    });

    it("should reduced quality by 1 when there are remaining days", function() {
        var NOT_SPECIAL_NAME = 'name';
        var SELL_IN_NO_REMAINING_DAYS = 0;
        var WITH_QUALITY = 1;
        items = [ new Item(NOT_SPECIAL_NAME, SELL_IN_NO_REMAINING_DAYS, WITH_QUALITY) ];
        update_quality();
        expect(items[0].name).toBe(NOT_SPECIAL_NAME);
        expect(items[0].sell_in).toBe(SELL_IN_NO_REMAINING_DAYS - 1);
        expect(items[0].quality).toBe(WITH_QUALITY - 1);
    });
});
