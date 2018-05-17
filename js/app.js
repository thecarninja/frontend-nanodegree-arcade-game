// Enemies our player must avoid
var Enemy = function(speed = 1, startY = 1, startX = -1) {
    this.sprite = 'images/enemy-bug.png';
    this.x = startX * 101;
    this.y = startY * 83;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + (80 * this.speed * dt); //Gives enemies movement
    if (this.x > (5 * 101) + 101) {
        this.x = -101;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles collision with player
Enemy.prototype.checkCollision = function() {
    if (player.x >= this.x - 75 && player.x <= (this.x + 85)){
        if (player.y >= this.y - 40 && player.y <= (this.y + 43)) {
            if (player.win > 0) {
                player.gameOver();
            }
            player.backToStart();
        }
     }
};

// Player we control
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * 101;
    this.y = 5 * 83;
    this.win = 0;
    this.water = false;
}

Player.prototype.update = function() {
    var that = this;

    if (this.y < 0) { this.y = 0; } //makes sure that the player doesn't move off the screen
    if (this.y > (5 * 83)) { this.y = (5 * 83); }
    if (this.x < 0) { this.x = 0; }
    if (this.x > (4 * 101)) { this.x = (4 * 101); }
    
    if (this.y < 83 && this.water === false) {  //win condition 
        this.wins();
        setTimeout(function(){ 
            that.backToStart();
        },  1000);
    }
};

//Draws player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Links player movement to arrow keys
Player.prototype.handleInput = function(key) {
    if (key === 'up') { this.y = this.y - 83; }
    if (key === 'right') { this.x = this.x + 101; }
    if (key === 'down') { this.y = this.y + 83; }
    if (key === 'left') { this.x = this.x - 101; }  
};

//Returns player to the beginning
Player.prototype.backToStart = function() {
    this.x = 2 * 101;
    this.y = 5 * 83;
    this.water = false;
};

// Adds to win counter
Player.prototype.wins = function() {
    if (this.water === false) {
        this.water = true;
        this.win += 1;
        this.updateWins();
    }
}

// updates wins on index.html
Player.prototype.updateWins = function() {
    document.getElementById("totalwins").innerHTML = this.win;
    document.getElementById("wins").innerHTML = this.win;
}

// Shows game over screen
Player.prototype.gameOver = function() {
    this.updateWins();
    document.querySelector('.final-score').style.display = "inline-block";
}

// Instantiating enemies
var enemyOne = new Enemy;
var enemyTwo = new Enemy(2, 2);
var enemyThree = new Enemy(1, 3, 0);
var enemyFour = new Enemy(1, 3, -3);
var enemyFive = new Enemy(3, 1, -2);

//Player obj
var player = new Player;

//Array of enemies that engine uses to draw
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive];

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

// This listens for the click on continue on game over screen
document.querySelector('.continue').addEventListener('click', function() {
    document.querySelector('.final-score').style.display = "none";
    player.win = 0;
    player.updateWins();
})