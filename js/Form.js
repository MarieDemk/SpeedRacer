class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  setPosition() {
    this.input.position(width/2 - 125,height/2 - 70);
    this.playButton.position(575, height/2);
    this.titleImg.position(150,100);
    this.greeting.position(300, height/2 -100);
  }
  setStyle() {
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.titleImg.class("gameTitle");
    this.greeting.class("greeting");
  }

  display(){
    this.setPosition();
    this.setStyle();
    this.handleMousePressed()
  }
  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `Hello ${this.input.value()}
      </br> please wait for another player to join...`
      this.greeting.html(message);
      playerCount = playerCount + 1; 
      player.index = playerCount;
      player.name = this.input.value();
      player.addPlayer();
      player.updateCount(playerCount);

    })
  }
}
