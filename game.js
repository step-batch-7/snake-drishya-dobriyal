class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.currentFood = food;
    this.previousFood = new Food(0, 0);
    this.score = 0;
    this.scoreCard = scoreCard;
  }

  isFoodEaten(snake) {
    const [snakeColumnId, snakeRowId] = snake.getHeadPosition();
    const [foodColumnId, foodRowId] = this.currentFood.position;
    return (snakeRowId === foodRowId && snakeColumnId === foodColumnId);
  }

  score() {
    return this.score;
  }

  updatePlayer() {
    this.scoreCard.updatePoints();
    this.snake.grow();
  }

  createNewFood() {
    this.previousFood = this.currentFood;
    this.currentFood = new Food(randomNum(NUM_OF_COLS), randomNum(NUM_OF_ROWS));
  }

  updatePosition() {
    if (this.isFoodEaten(this.snake)) {
      this.updatePlayer();
      this.createNewFood();
    }
    if (this.isFoodEaten(this.ghostSnake)) {
      this.createNewFood();
    }
    if (!this.isSnakeInRange(this.ghostSnake)) {
      this.snake.turnLeft();
    }
    this.snake.move();
    this.ghostSnake.move();
  }

  getCurrentStatus() {
    const playerSnake = {
      tail: this.snake.getTailPosition(),
      species: this.snake.species,
      position: this.snake.location,
    }
    const gameSnake = {
      tail: this.ghostSnake.getTailPosition(),
      species: this.ghostSnake.species,
      position: this.ghostSnake.location
    }
    const foodData = {
      previousPosition: this.previousFood.position,
      currentPosition: this.currentFood.position,
    }
    const score = this.scoreCard.getPoints();
    return {
      playerSnake,
      gameSnake,
      foodData,
      score
    }
  }

  turnLeft() {
    this.snake.turnLeft();
  }

  turnRight() {
    this.snake.turnRight();
  }

  isSnakeInRange(snake) {
    const [snakeColumnId, snakeRowId] = snake.getHeadPosition();
    const isColumnInRange = 99 >= snakeColumnId && 0 <= snakeColumnId;
    const isRowInRange = 59 >= snakeRowId && 0 <= snakeRowId;
    return isColumnInRange && isRowInRange;
  }

  isPlayerOut() {
    return !this.isSnakeInRange(this.snake) || this.snake.hasTouchItself();
  }

  randomlyTurnSnake(snake) {
    let x = Math.random() * 100;
    if (x > 50) {
      snake.turnLeft();
    }
  }
};
