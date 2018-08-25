var gilded_rose = require('../src/gilded_rose.js');

var update_quality=gilded_rose.update_quality;
var Item=gilded_rose.Item;

describe("Gilded Rose", function() {

    it("should foo", function() {
        items = [ new Item("foo", 0, 0) ];
        update_quality();
        expect(items[0].name).toBe("foo");
    });
});
