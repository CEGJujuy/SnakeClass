import { GameState } from './types';

export class GameRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number = 0;
  private gridSize: number;

  constructor(canvas: HTMLCanvasElement, gridSize: number) {
    this.canvas = canvas;
    this.gridSize = gridSize;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;

    this.updateCanvasSize();
    window.addEventListener('resize', () => this.updateCanvasSize());
  }

  private updateCanvasSize(): void {
    const maxSize = Math.min(window.innerWidth - 40, window.innerHeight - 200, 600);
    this.canvas.width = maxSize;
    this.canvas.height = maxSize;
    this.cellSize = maxSize / this.gridSize;
  }

  public render(state: GameState): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();
    this.drawFood(state.food);
    this.drawSnake(state.snake);

    if (state.gameOver) {
      this.drawGameOver();
    } else if (state.paused) {
      this.drawPaused();
    }
  }

  private drawGrid(): void {
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= this.gridSize; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.canvas.width, i * this.cellSize);
      this.ctx.stroke();
    }
  }

  private drawSnake(snake: Array<{ x: number; y: number }>): void {
    snake.forEach((segment, index) => {
      const isHead = index === 0;

      this.ctx.fillStyle = isHead ? '#2ecc71' : '#27ae60';
      this.ctx.fillRect(
        segment.x * this.cellSize + 1,
        segment.y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );

      if (isHead) {
        this.ctx.fillStyle = '#fff';
        const eyeSize = this.cellSize * 0.15;
        const eyeOffset = this.cellSize * 0.3;

        this.ctx.beginPath();
        this.ctx.arc(
          segment.x * this.cellSize + eyeOffset,
          segment.y * this.cellSize + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(
          segment.x * this.cellSize + this.cellSize - eyeOffset,
          segment.y * this.cellSize + eyeOffset,
          eyeSize,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    });
  }

  private drawFood(food: { x: number; y: number }): void {
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.beginPath();
    this.ctx.arc(
      food.x * this.cellSize + this.cellSize / 2,
      food.y * this.cellSize + this.cellSize / 2,
      this.cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    this.ctx.fillStyle = '#c0392b';
    this.ctx.beginPath();
    this.ctx.arc(
      food.x * this.cellSize + this.cellSize / 2 - 2,
      food.y * this.cellSize + this.cellSize / 2 - 2,
      this.cellSize / 6,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  private drawGameOver(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = `bold ${this.canvas.width / 12}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);

    this.ctx.font = `${this.canvas.width / 20}px Arial`;
    this.ctx.fillText('Presiona R para reiniciar', this.canvas.width / 2, this.canvas.height / 2 + 30);
  }

  private drawPaused(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = `bold ${this.canvas.width / 12}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('PAUSA', this.canvas.width / 2, this.canvas.height / 2);
  }
}
