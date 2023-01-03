class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185;
    this.life = 185;

  }
  getCount(){
    var location = database.ref("playerCount");
    location.on("value", function (data) {
      playerCount = data.val();
    })
  }
  updateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }
  getCarsAtEnd() {
    var location = database.ref("carsAtEnd");
    location.on("value", (data) => {
      this.rank = data.val();
    })
  }
   static updateCarsAtEnd(a) {
    database.ref("/").update({
      carsAtEnd: a
    })
  }
  addPlayer(){
    var playerIndex = "players/player" + this.index;
    if (this.index == 1) {
      this.positionX = width/2 - 100;
    }
    else {
      this.positionX = width/2 + 100;
    }
    database.ref(playerIndex).set({
      name: this.name, 
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life
      
    })
  }
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life

    }) 
  }
  static getPlayersInfo () {
    var location = database.ref("players");
    location.on("value", function (data) {
    allPlayers = data.val();
  })
  }
}
