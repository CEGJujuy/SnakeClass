import './style.css';
import { SnakeGame, GRID_SIZE } from './game';
import { GameRenderer } from './renderer';
import { GameControls } from './controls';
import { GameUI, createGameUI } from './ui';

class GameApp {
  private game: SnakeGame;
  private renderer: GameRenderer;
  private ui: GameUI;
  private lastUpdateTime: number = 0;
  private animationId: number | null = null;

  constructor() {
    this.initializeUI();

    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (!canvas) throw new Error('Canvas element not found');

    this.game = new SnakeGame(GRID_SIZE);
    this.renderer = new GameRenderer(canvas, GRID_SIZE);
    this.ui = new GameUI();
    new GameControls(this.game);

    this.start();
  }

  private initializeUI(): void {
    const app = document.getElementById('app');
    if (!app) throw new Error('App element not found');
    app.innerHTML = createGameUI();
  }

  private start(): void {
    this.lastUpdateTime = performance.now();
    this.gameLoop(this.lastUpdateTime);
  }

  private gameLoop = (currentTime: number): void => {
    this.animationId = requestAnimationFrame(this.gameLoop);

    const state = this.game.getState();
    const deltaTime = currentTime - this.lastUpdateTime;

    if (deltaTime >= state.speed) {
      this.game.update();
      this.renderer.render(state);
      this.ui.update(state);
      this.lastUpdateTime = currentTime;
    } else {
      this.renderer.render(state);
    }
  };

  public destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

new GameApp();
