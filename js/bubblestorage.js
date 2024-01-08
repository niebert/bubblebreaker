function BubbleStorage() {

    this.storage = {};

    this.toKey = function (bubble) {
        //return JSON.stringify({x: bubble.x, y: bubble.y});
        //console.log("js/bubblestorage.js:7 key="+"'x"+bubble.x + "y" + bubble.y+"b'");
        return "x"+bubble.x + "y" + bubble.y+"b";
    };

    this.size = function () {
        return Object.keys(this.storage).length;
    };

    this.isEmpty = function () {
        return this.size() < 1;
    };

    this.add = function (bubble) {
        this.storage[this.toKey(bubble)] = bubble;
    };

    this.contains = function (bubble) {
        return this.toKey(bubble) in this.storage;
    };

    this.getBubble = function (pos) {
        return this.storage[this.toKey(pos)];
    };

    this.getAll = function (pName) {
        pName = pName || "BubbleStorage";
        var result = Object.keys(this.storage);
        var bubbleArray = []
        var i = 0;
        for (i = 0; i < result.length; i++) {
            bubbleArray.push(this.storage[result[i]]);
        }
        //alert(pName+".bubbleArray="+jst(bubbleArray));
        return bubbleArray;
    };

    this.remove = function (bubble) {
        if (bubble) {
          delete this.storage[this.toKey(bubble)];
        }
    };

    this.clear = function () {
        for (var key in this.storage) {
          this.remove(this.storage[key])
        }
        this.storage = {};
    };

}
