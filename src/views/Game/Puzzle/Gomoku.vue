<template>
  <div class="gomoku-game">
    <div class="game-container">
      <div class="main-board">
        <div class="board-wrapper">
          <svg class="board-svg" :viewBox="`0 0 ${boardSize * cellSize} ${boardSize * cellSize}`">
            <!-- 棋盘网格线 -->
            <g class="grid-lines">
              <line v-for="i in boardSize" :key="`h-${i}`" :x1="cellSize / 2" :y1="i * cellSize - cellSize / 2"
                :x2="boardSize * cellSize - cellSize / 2" :y2="i * cellSize - cellSize / 2" stroke="#8B7355"
                stroke-width="1" />
              <line v-for="i in boardSize" :key="`v-${i}`" :x1="i * cellSize - cellSize / 2" :y1="cellSize / 2"
                :x2="i * cellSize - cellSize / 2" :y2="boardSize * cellSize - cellSize / 2" stroke="#8B7355"
                stroke-width="1" />
            </g>

            <!-- 星位点 -->
            <g class="star-points">
              <circle v-for="point in starPoints" :key="`star-${point.x}-${point.y}`"
                :cx="point.x * cellSize - cellSize / 2" :cy="point.y * cellSize - cellSize / 2" r="4" fill="#8B7355" />
            </g>

            <!-- 棋子 -->
            <g class="pieces">
              <g v-for="(piece, index) in pieces" :key="index" :class="['piece', piece.color]">
                <circle :cx="piece.x * cellSize - cellSize / 2" :cy="piece.y * cellSize - cellSize / 2"
                  :r="cellSize * 0.4" :fill="piece.color === 'black' ? '#000' : '#fff'"
                  :stroke="piece.color === 'black' ? '#333' : '#ccc'" stroke-width="2"
                  :class="{ 'last-piece': index === pieces.length - 1 }" />
                <!-- 最后一步标记 -->
                <circle v-if="index === pieces.length - 1" :cx="piece.x * cellSize - cellSize / 2"
                  :cy="piece.y * cellSize - cellSize / 2" r="6" :fill="piece.color === 'black' ? '#fff' : '#f00'"
                  class="last-marker" />
              </g>
            </g>

            <!-- 悬停提示 -->
            <circle v-if="hoverPosition && !gameEnded" :cx="hoverPosition.x * cellSize - cellSize / 2"
              :cy="hoverPosition.y * cellSize - cellSize / 2" :r="cellSize * 0.4"
              :fill="currentPlayer === 'black' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'"
              :stroke="currentPlayer === 'black' ? '#333' : '#ccc'" stroke-width="2" class="hover-piece" />

            <!-- 获胜线 -->
            <line v-if="winLine" :x1="winLine.start.x * cellSize - cellSize / 2"
              :y1="winLine.start.y * cellSize - cellSize / 2" :x2="winLine.end.x * cellSize - cellSize / 2"
              :y2="winLine.end.y * cellSize - cellSize / 2" stroke="#ff0000" stroke-width="4" stroke-linecap="round"
              class="win-line" />

            <!-- 点击区域 -->
            <g class="click-areas">
              <rect v-for="i in boardSize * boardSize" :key="`cell-${i}`"
                :x="((i - 1) % boardSize + 1) * cellSize - cellSize"
                :y="(Math.floor((i - 1) / boardSize) + 1) * cellSize - cellSize" :width="cellSize" :height="cellSize"
                fill="transparent"
                @click="handleCellClick((i - 1) % boardSize + 1, Math.floor((i - 1) / boardSize) + 1)"
                @mouseenter="handleCellHover((i - 1) % boardSize + 1, Math.floor((i - 1) / boardSize) + 1)"
                @mouseleave="handleCellLeave" class="click-area" />
            </g>
          </svg>
        </div>
      </div>

      <div class="sidebar">
        <div class="info-panel">
          <h2>🎮 游戏信息</h2>

          <div class="player-info">
            <div :class="['player-item', { active: currentPlayer === 'black' && !gameEnded }]">
              <div class="player-piece black-piece"></div>
              <span>黑棋</span>
              <span v-if="currentPlayer === 'black' && !gameEnded" class="turn-indicator">👈</span>
            </div>

            <div :class="['player-item', { active: currentPlayer === 'white' && !gameEnded }]">
              <div class="player-piece white-piece"></div>
              <span>白棋</span>
              <span v-if="currentPlayer === 'white' && !gameEnded" class="turn-indicator">👈</span>
            </div>
          </div>

          <div class="score-item">
            <span>回合数:</span>
            <span>{{ pieces.length }}</span>
          </div>

          <div v-if="gameEnded" class="game-status">
            <div class="status-message">
              {{ winner ? `${winner === 'black' ? '⚫ 黑棋' : '⚪ 白棋'} 获胜！` : '平局！' }}
            </div>
          </div>
        </div>

        <div class="controls">
          <h3>📖 游戏规则</h3>
          <p>• 黑棋先手</p>
          <p>• 轮流落子</p>
          <p>• 连成五子获胜</p>
          <p>• 横竖斜均可</p>
        </div>

        <div class="button-group">
          <button @click="undoMove" class="btn undo-btn" :disabled="pieces.length === 0 || gameEnded">
            ↶ 悔棋
          </button>
          <button @click="restartGame" class="btn restart-btn">
            🔄 重新开始
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏结束弹窗 -->
    <div v-if="gameEnded" class="overlay" @click="restartGame" />
    <div v-if="gameEnded" class="game-over">
      <h2>{{ winner ? '游戏结束！' : '平局！' }}</h2>
      <div class="winner-display" v-if="winner">
        <div :class="['winner-piece', winner + '-piece']"></div>
        <p>{{ winner === 'black' ? '⚫ 黑棋' : '⚪ 白棋' }} 获胜！</p>
      </div>
      <p v-else>棋盘已满</p>
      <p class="moves-count">总回合数: <strong>{{ pieces.length }}</strong></p>
      <button @click="restartGame" class="btn start-btn">再来一局</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 类型定义
interface Position {
  x: number
  y: number
}

interface Piece {
  x: number
  y: number
  color: 'black' | 'white'
}

interface WinLine {
  start: Position
  end: Position
}

// 常量
const boardSize = 15
const cellSize = 40

// 星位点（天元和四个星位）
const starPoints: Position[] = [
  { x: 4, y: 4 },
  { x: 12, y: 4 },
  { x: 4, y: 12 },
  { x: 12, y: 12 },
  { x: 8, y: 8 }  // 天元
]

// 响应式状态
const pieces = ref<Piece[]>([])
const currentPlayer = ref<'black' | 'white'>('black')
const hoverPosition = ref<Position | null>(null)
const gameEnded = ref<boolean>(false)
const winner = ref<'black' | 'white' | null>(null)
const winLine = ref<WinLine | null>(null)

// 检查位置是否已有棋子
const hasPiece = (x: number, y: number): boolean => {
  return pieces.value.some(piece => piece.x === x && piece.y === y)
}

// 检查是否在棋盘范围内
const isInBoard = (x: number, y: number): boolean => {
  return x >= 1 && x <= boardSize && y >= 1 && y <= boardSize
}

// 检查某个方向是否有五连
const checkDirection = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  color: 'black' | 'white'
): { count: number; start: Position; end: Position } | null => {
  let count = 1
  let startX = x
  let startY = y
  let endX = x
  let endY = y

  // 正方向
  let nx = x + dx
  let ny = y + dy
  while (isInBoard(nx, ny) && pieces.value.some(p => p.x === nx && p.y === ny && p.color === color)) {
    count++
    endX = nx
    endY = ny
    nx += dx
    ny += dy
  }

  // 反方向
  nx = x - dx
  ny = y - dy
  while (isInBoard(nx, ny) && pieces.value.some(p => p.x === nx && p.y === ny && p.color === color)) {
    count++
    startX = nx
    startY = ny
    nx -= dx
    ny -= dy
  }

  if (count >= 5) {
    return {
      count,
      start: { x: startX, y: startY },
      end: { x: endX, y: endY }
    }
  }

  return null
}

// 检查是否获胜
const checkWin = (x: number, y: number, color: 'black' | 'white'): boolean => {
  const directions = [
    { dx: 1, dy: 0 },   // 横
    { dx: 0, dy: 1 },   // 竖
    { dx: 1, dy: 1 },   // 斜 \
    { dx: 1, dy: -1 }   // 斜 /
  ]

  for (const { dx, dy } of directions) {
    const result = checkDirection(x, y, dx, dy, color)
    if (result) {
      winLine.value = {
        start: result.start,
        end: result.end
      }
      return true
    }
  }

  return false
}

// 处理点击
const handleCellClick = (x: number, y: number): void => {
  if (gameEnded.value || hasPiece(x, y)) return

  // 放置棋子
  pieces.value.push({
    x,
    y,
    color: currentPlayer.value
  })

  // 检查获胜
  if (checkWin(x, y, currentPlayer.value)) {
    winner.value = currentPlayer.value
    gameEnded.value = true
    return
  }

  // 检查平局
  if (pieces.value.length === boardSize * boardSize) {
    gameEnded.value = true
    return
  }

  // 切换玩家
  currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'
}

// 处理悬停
const handleCellHover = (x: number, y: number): void => {
  if (!gameEnded.value && !hasPiece(x, y)) {
    hoverPosition.value = { x, y }
  }
}

// 处理离开
const handleCellLeave = (): void => {
  hoverPosition.value = null
}

// 悔棋
const undoMove = (): void => {
  if (pieces.value.length > 0 && !gameEnded.value) {
    pieces.value.pop()
    currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'
  }
}

// 重新开始
const restartGame = (): void => {
  pieces.value = []
  currentPlayer.value = 'black'
  gameEnded.value = false
  winner.value = null
  winLine.value = null
  hoverPosition.value = null
}
</script>

<style lang="scss" scoped>
.gomoku-game {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  padding: 5px;

}

.game-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}

.main-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-wrapper {
  background: #DEB887;
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}

.board-svg {
  width: 600px;
  height: 600px;
  max-width: 90vw;
  max-height: 90vw;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
}

.click-area {
  cursor: pointer;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
}

.piece {
  circle {
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
    transition: all 0.2s;
  }

  &.last-piece circle {
    animation: placeAnimation 0.3s ease-out;
  }
}

@keyframes placeAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.last-marker {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.hover-piece {
  pointer-events: none;
  transition: all 0.2s;
}

.win-line {
  animation: drawLine 0.5s ease-out;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 0.5s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 250px;
}

.info-panel {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;

  h2 {
    font-size: 1.3em;
    color: #2c3e50;
    margin-bottom: 15px;
  }
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: white;
  transition: all 0.3s;

  &.active {
    background: #e3f2fd;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
    transform: translateX(5px);
  }

  span {
    font-size: 1.1em;
    font-weight: 500;
  }

  .turn-indicator {
    margin-left: auto;
    font-size: 1.2em;
    animation: bounce 1s ease-in-out infinite;
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-5px);
  }
}

.player-piece {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &.black-piece {
    background: #000;
    border: 2px solid #333;
  }

  &.white-piece {
    background: #fff;
    border: 2px solid #ccc;
  }
}

.score-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
  border-radius: 8px;
  font-size: 1.1em;

  span:first-child {
    color: #666;
  }

  span:last-child {
    font-weight: bold;
    color: #333;
  }
}

.game-status {
  margin-top: 15px;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;

  .status-message {
    color: white;
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
  }
}

.controls {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;

  h3 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  p {
    margin: 8px 0;
    color: #666;
    font-size: 1em;
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
}

.undo-btn {
  background: #ffc107;
  color: white;

  &:hover:not(:disabled) {
    background: #ffb300;
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
  }
}

.restart-btn {
  background: #2196f3;
  color: white;

  &:hover {
    background: #1976d2;
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.4);
  }
}

.start-btn {
  background: #4caf50;
  color: white;

  &:hover {
    background: #45a049;
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.game-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;

  h2 {
    color: #2c3e50;
    font-size: 2em;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #333;
  }

  .moves-count {
    font-size: 1.1em;
    color: #666;
  }
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

.winner-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px 0;

  .winner-piece {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    animation: celebrate 0.6s ease-in-out;

    &.black-piece {
      background: #000;
      border: 3px solid #333;
    }

    &.white-piece {
      background: #fff;
      border: 3px solid #ccc;
    }
  }
}

@keyframes celebrate {

  0%,
  100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.2) rotate(10deg);
  }

  75% {
    transform: scale(1.2) rotate(-10deg);
  }
}
</style>
