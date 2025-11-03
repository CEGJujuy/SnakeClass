import { GameState } from './types';

export class GameUI {
  private scoreElement: HTMLElement;
  private highScoreElement: HTMLElement;
  private speedElement: HTMLElement;

  constructor() {
    this.scoreElement = document.getElementById('score')!;
    this.highScoreElement = document.getElementById('highScore')!;
    this.speedElement = document.getElementById('speed')!;
  }

  public update(state: GameState): void {
    this.scoreElement.textContent = state.score.toString();
    this.highScoreElement.textContent = state.highScore.toString();

    const speedPercentage = Math.round(((150 - state.speed) / 100) * 100);
    this.speedElement.textContent = `${speedPercentage}%`;
  }
}

export function createGameUI(): string {
  return `
    <div class="game-container">
      <header class="game-header">
        <h1>Snake Game</h1>
        <div class="stats">
          <div class="stat">
            <span class="stat-label">Puntuación</span>
            <span class="stat-value" id="score">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">Récord</span>
            <span class="stat-value" id="highScore">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">Velocidad</span>
            <span class="stat-value" id="speed">0%</span>
          </div>
        </div>
      </header>
      <div class="canvas-container">
        <canvas id="gameCanvas"></canvas>
      </div>
      <div class="controls-info">
        <div class="control-group">
          <strong>Teclado:</strong> Flechas o WASD para mover
        </div>
        <div class="control-group">
          <strong>Móvil:</strong> Desliza en cualquier dirección
        </div>
        <div class="control-group">
          <strong>Pausa:</strong> Espacio o P | <strong>Reiniciar:</strong> R
        </div>
      </div>
    </div>
  `;
}
