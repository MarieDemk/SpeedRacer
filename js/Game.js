class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton();
    this.leaderBoardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }
  getState() {
    var location = database.ref("gameState")
    location.on("value", function (data){
      gameState = data.val();
    })
  }
  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();
  

    // creating the cars

    car1 = createSprite(width/2 - 100, height - 100);
    car1.addImage("car1",car1Img);
    car1.addImage("blast", blastImg);
    car1.scale = 0.1;
    car2 = createSprite(width/2 + 100, height - 100);
    car2.addImage("car2",car2Img);
    car2.addImage("blast", blastImg);
    car2.scale = 0.1;

    cars = [car1,car2];


    var obstaclesPositions = [
      {x: width/2 + 250 , y: height - 800,image: obstacle2Img},
      {x: width/2 - 150 , y: height - 1200,image: obstacle1Img},
      {x: width/2 + 250 , y: height - 1600,image: obstacle1Img},
      {x: width/2 - 180 , y: height - 2000,image: obstacle2Img},
      {x: width/2, y: height - 2400,image: obstacle1Img},
      {x: width/2 - 180 , y: height - 2800,image: obstacle1Img},
      {x: width/2 + 180 , y: height - 3200,image: obstacle2Img},
      {x: width/2 + 250 , y: height - 3600,image: obstacle1Img},
      {x: width/2 - 150 , y: height - 4000,image: obstacle1Img},
      {x: width/2 + 250 , y: height - 4400,image: obstacle2Img},
      {x: width/2, y: height - 4800,image: obstacle2Img},
      {x: width/2  - 180, y: height - 5200,image: obstacle2Img},
  
    ];



    // Creating the groups
    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();

    this.addSprites(fuels, 4, fuelImg, 0.02);
    this.addSprites(powerCoins, 20, coinImg, 0.09);
    this.addSprites(obstacles, obstaclesPositions.length, obstacle1Img, 0.04, obstaclesPositions);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImg, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x,y;
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImg = positions[i].image;
      }
      else {
        x = random(width/2 - 150, width/2 + 150);
        y = random(-height*4.5, height - 400);
      }
      var sprite = createSprite(x,y);
      sprite.addImage(spriteImg);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }
  showLeaderboard=async()=> {
    var leader1, leader2;
    var players = await Object.values(allPlayers);
  
    if ((players[0].rank == 0 && players[1].rank == 0) || players[0].rank == 1) {
      // &emsp; this tag is used for displaying four consecutive spaces
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }
    if (players[1].rank == 1) {
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  handleElements() {
    form.hide();
    form.titleImg.class("gameTitleAfter");
    form.titleImg.position(50,50);

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2 + 120, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2 + 150, 100);

    this.leaderBoardTitle.html("Leaderboard");
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width/3 - 60,40)

    this.leader1.class("leadersText");
    this.leader1.position(width/3 - 60,80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3 - 60,130);

  }
  handleResetButton () {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0, gameState: 0, players: {}, carsAtEnd: 0
      })
      window.location.reload();
    })
  }
  handlePlayerControls () {
    if (!this.blast) {
    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true;
      player.positionY = player.positionY + 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW)&& player.positionX > width/2 - 260) {
      this.leftKeyActive = true;
      player.positionX = player.positionX - 5;
      player.update();

    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width/2 + 245) {
      this.leftKeyActive = false;
      player.positionX = player.positionX + 5;
      player.update();
    }
  }
  }
  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      }
      else {
        player.positionX -= 100;
      }
      if (player.life > 0) {
        player.life = player.life - (185/4);
      }
      player.update();
    }
  }
  handleCarCollision(index) {
    if (index == 1) {

    }
    if (index == 2) {
      
    }
  }
  handleFuel(index) {
    //adding fuel
    cars[index - 1].overlap(fuels, function(collector,collected) {
      player.fuel = 185;
      //collected is that sprite in the group collectables that has triggered this collision event
      collected.remove();

    }) 

    // reducing fuel
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel = player.fuel - 0.3;
    }
    if(player.fuel <= 0) {
      gameState = 2;
      this.gameover();
    }
  }
  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector,collected) {
      player.score = player.score + 10;
      player.update();
      collected.remove();
    })
  }
  gameover() {
    swal({
      title: `Game Over!!`,
      text: "Oops You Ran Out of Fuel!!",
      imageUrl: "https://static8.depositphotos.com/1519283/1001/v/450/depositphotos_10017381-stock-illustration-gas-tank-illustration.jpg",
      imageSize: "200x200",
      confirmButtonText: "Thanks for Playing"
    })
  }
  showRank() {
    swal({
      title: `Congratulations!${"\n"} Rank ${"\n"} ${player.rank}`,
      text: "You Reached the Finish Line Successfully!",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/006/425/320/original/flat-design-trophy-trophy-isolated-on-white-background-free-vector.jpg",
      imageSize: "200x200",
      confirmButtonText: "Okay"
    })
  } 
  showLife() {
    push()
    image(lifeImg, width/3 - 450, height - player.positionY - 300, 20, 20);
    fill("white");
    rect(width/3 - 420, height - player.positionY - 300, 185, 20);
    fill("red");
    rect(width/3 -420, height - player.positionY - 300, player.life, 20);
    pop();
  }
  showFuel() {
    push()
    image(fuelImg, width/3 - 450, height - player.positionY - 200, 20, 20);
    fill("white");
    rect(width/3 - 420, height - player.positionY - 200, 185, 20);
    fill("yellow");
    rect(width/3 - 420, height - player.positionY - 200, player.fuel, 20);
    pop();
  }
  play() {
    
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();
    player.getCarsAtEnd();
    if (allPlayers !== undefined) {
      image(track,0,-height*5,width,height*6)
      this.showFuel();
      this.showLife();
      this.showLeaderboard();

      var index = 0;
      for (var i in allPlayers) {
        index = index + 1;
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;
        // saving the value of player.life in a temporary var
        var lifeLeft = allPlayers[i].life;
        if (lifeLeft <= 0) {
          cars[index - 1].changeImage("blast");
          cars[index - 1].scale = 0.4;
        }
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if (index == player.index) {
          fill("yellow");
          ellipse(x,y,80,80);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleObstacleCollision(index);
          this.handleCarCollision(index);
          if (player.life <= 0) {
            this.blast = true;
            this.playerMoving = false;
          }


          //changing camera position and y direction
          camera.position.x = width/2;
          camera.position.y = cars[index-1].position.y;
        }
      }
      this.handlePlayerControls();
      const finishLine = height*6 - 100;
      if (player.positionY > finishLine) {
        gameState = 2;
        player.rank = player.rank + 1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();

      } 
      drawSprites();
    }
    
  }
}
