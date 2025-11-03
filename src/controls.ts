import { Direction } from './types';
import { SnakeGame } from './game';

export class GameControls {
  private game: SnakeGame;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private readonly minSwipeDistance: number = 30;

  constructor(game: SnakeGame) {
    this.game = game;
    this.setupKeyboardControls();
    this.setupTouchControls();
  }

  private setupKeyboardControls(): void {
    document.addEventListener('keydown', (e) => {
      const state = this.game.getState();

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          this.game.changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          this.game.changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          this.game.changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          this.game.changeDirection(Direction.RIGHT);
          break;
        case ' ':
        case 'p':
        case 'P':
          e.preventDefault();
          this.game.togglePause();
          break;
        case 'r':
        case 'R':
          if (state.gameOver) {
            e.preventDefault();
            this.game.reset();
          }
          break;
      }
    });
  }

  private setupTouchControls(): void {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (!e.changedTouches[0]) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - this.touchStartX;
      const deltaY = touchEndY - this.touchStartY;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < this.minSwipeDistance && absY < this.minSwipeDistance) {
        return;
      }

      if (absX > absY) {
        if (deltaX > 0) {
          this.game.changeDirection(Direction.RIGHT);
        } else {
          this.game.changeDirection(Direction.LEFT);
        }
      } else {
        if (deltaY > 0) {
          this.game.changeDirection(Direction.DOWN);
        } else {
          this.game.changeDirection(Direction.UP);
        }
      }
    }, { passive: true });
  }
}
