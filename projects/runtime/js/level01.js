var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = [
            {
            name: "Robot Romp",
              number: 1,
              speed: -3,
              gameItems: [
                { type: "sawblade", x: 700, y: groundY-35 },
              ],
            },
            {
              name: "Robot Rampage",
              number: 2,
              speed: -3,
              gameItems: [
                { type: "enemy", x: 400, y: groundY-50 },
                { type: "enemy", x: 600, y: groundY-100 },
                { type: "reward", x: 900, y: groundY -200 },
                { type: "reward", "x": 1700, "y": groundY - 60},
              ],
            },
            {
                name: "Level Awesome",
                number : 3,
                speed: -2,
                gameItems: [
                { type: "sawblade", x: 400, y: groundY },
                { type: "enemy", x: 600, y: groundY },
                { type: "enemy", x: 900, y: groundY },
                ]
            }
        ];
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            
            var obstacleImage = draw.bitmap("img/sawblade.png");
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            sawBladeHitZone.addChild(obstacleImage);
        }
        createSawBlade(230,401)
        createSawBlade(678,345)
        createSawBlade(963,487)

        
        createEnemy = function(x,y) {

            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = - 2;

            
            enemy.onPlayerCollision = function() {
            game.changeIntegrity(-10);
            }
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.shrink()
                }
                

            }
            createEnemy(1250,groundY-50)
            createEnemy(1500,groundY-75)
            createEnemy(1550,groundY-90)


            function createReward(x,y) {

                var reward = game.createGameItem("reward", 50);
                var yellowStar = draw.bitmap("img/watercolor-candy-hand-painted-sweet-clipart-png.webp");
                yellowStar.x = -50;
                yellowStar.y = -50;
                reward.addChild(yellowStar);
                
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -2;
        
                reward.onPlayerCollision = function() {
                    game.changeIntegrity(20)
                };
                reward.onProjectileCollision = function () {
                    game.increaseScore(100);
                    reward.shrink();
                }
              }

              createReward(876,groundY-220)
              createReward(1300,groundY-60)

            function createMarker(x,y) {
                var marker = game.createGameItem("marker", 50);
                var line = draw.bitmap("img/line-symbol_2000x2000.png");
                line.x = -100;
                line.y = -100;
                marker.addChild(line);
                
                marker.x = x;
                marker.y = y;
                game.addGameItem(marker);
                marker.velocityX = -3;
        
                marker.onPlayerCollision = function() {
                    game.startLevel()
                };
                marker.onProjectileCollision = function () {
                    game.startLevel()
                    marker.shrink();
                }
              }
            
            createMarker(3300,groundY-450)

            for (var i = 0; i < levelData.length; i++) {
                var level = levelData[i];
                var gameItems = level.gameItems;
                for (var j = 0; j < gameItems.length; j++) {
                    var item = gameItems[j];
                    var x = item.x;
                    var y = item.y;
                    var type = item.type;
                    if (type === "sawblade") {
                        createSawBlade(x, y);
                    } else if (type === "enemy") {
                        createEnemy(x, y);
                    } else if (type === "reward") {
                        createReward(x, y);
                    } else if (type === "marker") {
                        createMarker(x, y);
                    }
                }
            }
    };
    
       
        // DO NOT EDIT CODE BELOW HERE
}


// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
    }