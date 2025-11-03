import { Position, Direction, GameState } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 5;
export const SPEED_INCREASE_INTERVAL = 5;

export class SnakeGame {
  private state: GameState;
  private gridSize: number;

  constructor(gridSize: number = GRID_SIZE) {
    this.gridSize = gridSize;
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    const centerX = Math.floor(this.gridSize / 2);
    const centerY = Math.floor(this.gridSize / 2);

    return {
      snake: [
        { x: centerX, y: centerY },
        { x: centerX - 1, y: centerY },
        { x: centerX - 2, y: centerY }
      ],
      food: this.generateFood([{ x: centerX, y: centerY }]),
      direction: Direction.RIGHT,
      nextDirection: Direction.RIGHT,
      score: 0,
      speed: INITIAL_SPEED,
      gameOver: false,
      paused: false,
      highScore: this.loadHighScore()
    };
  }

  private loadHighScore(): number {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  }

  private saveHighScore(score: number): void {
    localStorage.setItem('snakeHighScore', score.toString());
  }

  private generateFood(excludePositions: Position[]): Position {
    let food: Position;
    let isValid: boolean;

    do {
      food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };

      isValid = !excludePositions.some(pos => pos.x === food.x && pos.y === food.y);
    } while (!isValid);

    return food;
  }

  public changeDirection(newDirection: Direction): void {
    const opposites: Record<Direction, Direction> = {
      [Direction.UP]: Direction.DOWN,
      [Direction.DOWN]: Direction.UP,
      [Direction.LEFT]: Direction.RIGHT,
      [Direction.RIGHT]: Direction.LEFT
    };

    if (opposites[newDirection] !== this.state.direction) {
      this.state.nextDirection = newDirection;
    }
  }

  public update(): void {
    if (this.state.gameOver || this.state.paused) return;

    this.state.direction = this.state.nextDirection;

    const head = { ...this.state.snake[0] };

    switch (this.state.direction) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= this.gridSize ||
      head.y < 0 ||
      head.y >= this.gridSize ||
      this.state.snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      this.state.gameOver = true;
      if (this.state.score > this.state.highScore) {
        this.state.highScore = this.state.score;
        this.saveHighScore(this.state.score);
      }
      return;
    }

    this.state.snake.unshift(head);

    if (head.x === this.state.food.x && head.y === this.state.food.y) {
      this.state.score += 10;
      this.state.food = this.generateFood(this.state.snake);

      if (this.state.score % (SPEED_INCREASE_INTERVAL * 10) === 0 && this.state.speed > 50) {
        this.state.speed = Math.max(50, this.state.speed - SPEED_INCREMENT);
      }
    } else {
      this.state.snake.pop();
    }
  }

  public togglePause(): void {
    if (!this.state.gameOver) {
      this.state.paused = !this.state.paused;
    }
  }

  public reset(): void {
    this.state = this.createInitialState();
  }

  public getState(): Readonly<GameState> {
    return this.state;
  }

  public getGridSize(): number {
    return this.gridSize;
  }
}
