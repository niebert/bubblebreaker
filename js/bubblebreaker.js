
function BubbleBreaker (canvas, scoreInfo, scoreSelect , options ) {

 /*
 ******************************************************************************

    default config

 ******************************************************************************
*/
    options = options || {};
    if (!canvas) {
      console.error("js/bubblebreaker.js:12 - Canvas does not exist!")
    } else {
      //canvas.width  = 200; // in pixels
      //canvas.height = 100;
      this.canvas = canvas;
      console.log("js/bubblebreaker.js:17 - Canvas exists  width=" + this.canvas.width + " height="+this.canvas.height+"!")
      //alert("js/bubblebreaker.js:18 - Canvas exists  width=" + this.canvas.width + " height="+this.canvas.height+"!")
    }
    this.playerName = '';
    this.score = 0;
    this.scoreInfo = scoreInfo;
    this.scoreSelect = scoreSelect;
    this.difficulty = 5;
    this.columns = 240;
    this.rows = 50;
    this.margin = 0; // board margin right in pixels e.g. 5px
    this.ctx = this.canvas.getContext('2d');
    this.theme = {
        bubbles: ['red', 'yellow', 'lime', 'cyan', 'blue', 'magenta'],
        //background: 'lavender',
        background: '#CACACA',
        highlight: 'rgba(0, 0, 0, 0.2)',
        cell: {
            size: 36,
            padding: 2,
        }
    };
    this.boardMarginTop  = options.boardMarginTop || 100;
    this.boardMarginBottom = options.boardMarginBottom || 80;
    // Points for Selection
    this.score4selection = 0;
    this.gamestatus = {
      "gameOver": false,
      "bonus": 0
    }

/*
 ******************************************************************************

    init

 ******************************************************************************
*/

    this.bubbles = new BubbleStorage();

    this.selection = new BubbleStorage();

    this.getBoardSize = function () {
        console.log("js/bubblebreaker.js:123 - CALL: getBoardSize()");
        var w =  640;
        var h =  480;
        if (window) {
          w = window.innerWidth;
          h = window.innerHeight;
          console.log("js/bubblebreaker.js:131 - CALL: getBoardSize() w="+w+" h="+h);
          if (this.boardMarginTop) {
            h = h - this.boardMarginTop;
            console.log("js/bubblebreaker.js:135 -window.innerWidth="+window.innerWidth+" this.boardMarginTop="+this.boardMarginTop+" h="+h);
          } else {
            console.error("this.boardMarginTop does not exist - pass as  parameter 'options.boardMarginTop' to BubbleBreaker class");
          }
          if (this.boardMarginBottom) {
            //alert("footer.offsetHeight="+footerDOM.offsetHeight);
            h = h - this.boardMarginBottom;
            console.log("js/bubblebreaker.js:138 -window.innerWidth="+window.innerWidth+" this.boardMarginBottom="+this.boardMarginBottom+" h="+h);
          } else {
           console.error("this.boardMarginBottom does not exist - pass as parameter 'options.boardMarginBottom' to BubbleBreaker class");
         }
       } else {
          alert("window is not defined")
      }
      return {
          "width": w,
          "height": h
        }
    }

    this.drawSelectedBackground = function () {
        var bubble = null;
        var x = 0;
        var y = 0;
        var i = 0;
        var bubbleArray = this.selection.getAll("Selection");
        this.ctx.fillStyle = this.theme.highlight;
        for (i = 0; i < bubbleArray.length; i++) {
            this.ctx.fillRect(
                bubbleArray[i].x,
                bubbleArray[i].y,
                this.theme.cell.size,
                this.theme.cell.size
            );
        }
    };

    this.drawBubble = function (bubble) {
        var x = bubble.x + this.theme.cell.size / 2;
        var y = bubble.y + this.theme.cell.size / 2;
        var r = this.theme.cell.size / 2 - this.theme.cell.padding;
        var e = 0.4 * r;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.ctx.createRadialGradient(
            x - e, y - e, 0 * r,
            x - e, y - e, 4 * r
        );
        this.ctx.fillStyle.addColorStop(0, 'white');
        this.ctx.fillStyle.addColorStop(0.05, bubble.color);
        this.ctx.fillStyle.addColorStop(0.75, 'black');
        this.ctx.fill();
    };

    this.draw = function () {
        var i = 0;
        var bubbleArray = null;

        // draw background
        this.ctx.fillStyle = this.theme.background;
        //this.ctx.fillStyle = "#C0C0C0";
        this.ctx.fillRect(
            0,
            0,
            this.columns * this.theme.cell.size,
            this.rows * this.theme.cell.size
        );
        //alert("js/BubbleBreaker.js:92 - theme.background="+this.theme.background);
        console.log("js/BubbleBreaker.js:92 - theme.background="+this.theme.background);

        // draw all bubbles
        bubbleArray = this.bubbles.getAll();
        //alert("bubbleArray.length="+bubbleArray.length+" bubbleArray="+jst(bubbleArray));
        for (i = 0; i < bubbleArray.length; i++) {
            this.drawBubble(bubbleArray[i]);
        }

        // highlight selected positions
        this.drawSelectedBackground();

        this.scoreInfo.innerHTML = this.score;
    };

    this.calcGridSize = function () {
        var cellSize = this.theme.cell.size;
        var size = {
          "columns": this.columns,
          "rows": this.rows
        }
        var bs = this.getBoardSize();
        size.rows    = Math.floor(bs.height/cellSize);
        size.columns = Math.floor(bs.width/cellSize) - 2;
        //alert("bubblebreaker.js:118 - rows="+size.rows+" ("+h+"px) cols="+size.columns+" ("+w+"px)");
        console.log("bubblebreaker.js:118 - rows="+size.rows+" ("+bs.height+"px) cols="+size.columns+" ("+bs.width+"px)");
        this.columns = size.columns;
        this.rows = size.rows;

        return size
    }

    this.newGame = function() {
        var size = this.calcGridSize();
        var pos = {x: 0, y: 0};
        var width = size.columns * this.theme.cell.size;
        var height = size.rows   * this.theme.cell.size;
        //alert("js/bubblebreaker:js:133 - width["+size.columns+"]="+width+" height["+size.rows+"]="+height);
        console.log("js/bubblebreaker:js:133 - width["+size.columns+"]="+width+" height["+size.rows+"]="+height);
        //var width = this.columns * this.theme.cell.size;
        //var height = this.rows * this.theme.cell.size;
        //width = this.columns * this.theme.cell.size;
        //height = this.rows * this.theme.cell.size;
        canvas.width = width + this.margin;
        canvas.height = height + this.margin;

        this.score = 0;
        this.selection.clear();
        this.bubbles.clear();
        for (pos.x = 0; pos.x < width; pos.x += this.theme.cell.size) {
            for (pos.y = 0; pos.y < height; pos.y += this.theme.cell.size) {
                this.bubbles.add({
                    x: pos.x,
                    y: pos.y,
                    color: this.theme.bubbles[
                        Math.floor(Math.random() * this.difficulty)
                    ]
                    // random number is between 0 and 1
                    // diificulty sets the number of different colors
                });
            }
        }
        this.draw();
    };

    this.checkGameOver = function () {
        var result = {gameOver: false, bonus: 0};
        var bubbles = this.bubbles.getAll();
        var bubbleCount = bubbles.length;
        var i = 0;
        for (i = 0; i < bubbleCount; i++) {
            this.select(bubbles[i]);
            if (this.selection.size() > 1) {
                this.selection.clear();
                return result;
            }
            this.selection.clear();
        }
        result.gameOver = true;
        result.bonus = 1024;
        for (i = 0; i < bubbleCount; i++) {
            result.bonus /= 2;
            if (result.bonus < 2) {
                result.bonus = 0;
                break;
            }
        }
        this.score += result.bonus;
        return result;
    };

    this.alignBubbles = function () {
        var bubble = null;
        var pos = {x: 0, y: 0};
        var cellSize = this.theme.cell.size;
        var move = {x: 0, y: 0};
        for (pos.x = (this.columns - 1) * cellSize; pos.x >= -0;
                pos.x -= cellSize) {
            move.y = 0;
            for (pos.y = (this.rows - 1) * cellSize; pos.y >= -0;
                    pos.y -= cellSize) {
                bubble = this.bubbles.getBubble(pos);
                if (bubble) {
                    if (move.x || move.y) {
                        this.bubbles.remove(bubble);
                        bubble.x += move.x;
                        bubble.y += move.y;
                        this.bubbles.add(bubble);
                    }
                } else {
                    move.y += cellSize;
                }
            }
            if (move.y == (this.rows) * cellSize) {
                move.x += cellSize;
            }
        }
    };

    this.breakSelection = function () {
        var bubbles = this.selection.getAll("Selection");
        //alert("Selection.bubbles="+jst(bubbles));
        var selectionSize = this.selection.size();
        var i = 0;
        for (i = 0; i < selectionSize; i++) {
            this.bubbles.remove(bubbles[i]);
        }
        this.selection.clear();
        this.score += selectionSize * (selectionSize - 1);
        this.alignBubbles();
        return this.checkGameOver();
    };

    this.select = function (pos) {
        var bubble = null;
        var adjacentPos = [
            {x: pos.x + this.theme.cell.size, y: pos.y},
            {x: pos.x, y: pos.y - this.theme.cell.size},
            {x: pos.x - this.theme.cell.size, y: pos.y},
            {x: pos.x, y: pos.y + this.theme.cell.size},
        ];
        var i = 0;
        this.selection.add(this.bubbles.getBubble(pos));
        for (i = 0; i < 4; i++) {
            bubble = this.bubbles.getBubble(adjacentPos[i]);
            if (bubble &&
                    bubble.color == this.bubbles.getBubble(pos).color &&
                    !this.selection.contains(bubble)) {
                this.select(adjacentPos[i]);
            }
        }
    };

    this.setPoints4Selection = function (pString) {
      var selectionSize = this.selection.size();
      var s4s = selectionSize * (selectionSize - 1);
      this.score4selection = "";
      if (pString) {
        this.scoreSelect.innerHTML = pString
      } else {
        if (s4s > 0) {
          this.scoreSelect.innerHTML = "[+"+s4s+"]";
          //this.scoreSelect.innerHTML = "Points "+s4s;
        } else {
          this.scoreSelect.innerHTML = "";
        }
      }
      console.log("set scoreSelect='"+this.scoreSelect.innerHTML+"'");
    }

    this.bubbleClick = function(pos) {
        var result = {gameOver: false, bonus: 0};
        this.setPoints4Selection();
        // click on an already selected bubble
        if (this.selection.contains(pos)) {
            result = this.breakSelection();
            this.setPoints4Selection(" ");
        } else { // click on bubble which is not selected
            // cancel current selection and select new bubble(s)
            this.selection.clear();
            this.setPoints4Selection(" ");
            this.select(pos);
            // single bubble can not be selected
            if (this.selection.size() < 2) {
                this.selection.clear();
            } else {
              this.setPoints4Selection();
            }
        }
        return result;
    };

    this.handleClick = function (pos) {
        var result = {gameOver: false, bonus: 0};
        // round coordinates
        var oldx = pos.x;
        var oldy = pos.y;
        pos.x = Math.floor(pos.x / this.theme.cell.size);
        pos.x = Math.max(0, Math.min(this.columns - 1, pos.x));
        pos.x *= this.theme.cell.size;
        pos.y = Math.floor(pos.y / this.theme.cell.size);
        pos.y = Math.max(0, Math.min(this.rows - 1, pos.y));
        pos.y *= this.theme.cell.size;
        //alert("bubblebreaker.js:275 - pos.x="+pos.x+" (oldx="+oldx+") pox.y="+pos.y+" (oldy="+oldy+")");
        console.log("bubblebreaker.js:275 - pos.x="+pos.x+" (oldx="+oldx+") pox.y="+pos.y+" (oldy="+oldy+")");
      // a bubble has been clicked
        if (this.bubbles.contains(pos)) {
            result = this.bubbleClick(pos);
        } else { // click did not hit any bubble
            this.selection.clear();
        }
        this.draw();
        return result;
    };

}
