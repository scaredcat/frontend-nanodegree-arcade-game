var COLUMN_HEIGHT = 83;
var COLUMN_WIDTH = 101;
var COLUMNS = 5;
var ROWS = 6;
var ROW_CENTER_OFFSET = 20;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //move the enemy forward
    this.x = this.x + this.speed*dt;

    //check for collission with player
    if(player.y == this.y) { // player is in the same row
        if(player.x < (this.x+50) && player.x > (this.x-50)) { // player is in collission boundary
            player.resetScore();
        }
    }

    //reset the enemy once it's left the right side of the screen
    if (this.x > COLUMN_WIDTH * (COLUMNS+1)) {
        this.reset();
    }
};

//initializes enemy to enter from the left side of the screen
Enemy.prototype.reset = function() {
    //initialize enemy to the left of the screen
    this.x = -100;

    //initialize speed value between 100-300
    this.speed = (Math.floor((Math.random()*10))%3 + 1) * 100;

    //start on a column betwen 1-3 from the top
    this.y = (Math.floor((Math.random()*10))%3 + 1) * COLUMN_HEIGHT - ROW_CENTER_OFFSET;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];

    this.currentSprite = 0;

    this.resetPosition();
};

Player.prototype.resetPosition = function() {
    this.x = 2 * COLUMN_WIDTH;
    this.y = COLUMNS * COLUMN_HEIGHT - ROW_CENTER_OFFSET;
}

//reset the position and the sprite
Player.prototype.resetScore = function() {
    this.resetPosition();
    this.currentSprite = 0;
    this.sprite = this.sprites[this.currentSprite];
}

//nothing happens to the player based on gametime, empty update function
Player.prototype.update = function(dt) {};

Player.prototype.handleInput = function(key) {
    var top = -20;
    var bottom = COLUMN_HEIGHT * (ROWS - 1);
    var left = 0;
    var right = COLUMN_WIDTH * (COLUMNS - 1);

    //handle keyboard input and check boundaries
    switch(key) {
        case 'up': this.y = (this.y - COLUMN_HEIGHT < top)? this.y : this.y - COLUMN_HEIGHT; break;
        case 'down': this.y = (this.y + COLUMN_HEIGHT > bottom)? this.y : this.y + COLUMN_HEIGHT; break;
        case 'left': this.x = (this.x - COLUMN_WIDTH < left)? this.x : this.x - COLUMN_WIDTH; break;
        case 'right': this.x = (this.x + COLUMN_WIDTH > right)? this.x : this.x + COLUMN_WIDTH; break;
    }

    // the player has made it to the water block
    if(this.y < 20) {
        //level up sprites
        if(this.currentSprite < 4) {
            this.currentSprite++;
        }
        
        this.resetPosition();
        this.sprite = this.sprites[this.currentSprite];
    }
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyCount = 5;
var allEnemies = [];
for (var i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
