<template>
  <div class="chinese-chess">
    <div class="game-container">
      <div class="main-board">
        <div class="board-wrapper">
          <svg class="board-svg" :viewBox="`0 0 ${boardWidth * cellSize} ${boardHeight * cellSize}`">
            <!-- 棋盘网格线 -->
            <g class="grid-lines">
              <!-- 横线 -->
              <line v-for="i in 10" :key="`h-${i}`" :x1="cellSize / 2" :y1="i * cellSize - cellSize / 2"
                :x2="8 * cellSize + cellSize / 2" :y2="i * cellSize - cellSize / 2" stroke="#8B7355" stroke-width="2" />

              <!-- 竖线 - 两边的线贯穿全盘 -->
              <line :x1="cellSize / 2" :y1="cellSize / 2" :x2="cellSize / 2" :y2="9 * cellSize + cellSize / 2"
                stroke="#8B7355" stroke-width="2" />
              <line :x1="8 * cellSize + cellSize / 2" :y1="cellSize / 2" :x2="8 * cellSize + cellSize / 2"
                :y2="9 * cellSize + cellSize / 2" stroke="#8B7355" stroke-width="2" />

              <!-- 中间的竖线 - 在楚河汉界处断开 -->
              <line v-for="i in 7" :key="`v-top-${i}`" :x1="(i + 1) * cellSize - cellSize / 2" :y1="cellSize / 2"
                :x2="(i + 1) * cellSize - cellSize / 2" :y2="4 * cellSize + cellSize / 2" stroke="#8B7355"
                stroke-width="2" />
              <line v-for="i in 7" :key="`v-bottom-${i}`" :x1="(i + 1) * cellSize - cellSize / 2"
                :y1="5 * cellSize + cellSize / 2" :x2="(i + 1) * cellSize - cellSize / 2"
                :y2="9 * cellSize + cellSize / 2" stroke="#8B7355" stroke-width="2" />
            </g>

            <!-- 九宫格斜线 -->
            <g class="palace-lines">
              <!-- 楚国九宫 -->
              <line :x1="4 * cellSize - cellSize / 2" :y1="8 * cellSize - cellSize / 2"
                :x2="6 * cellSize - cellSize / 2" :y2="10 * cellSize - cellSize / 2" stroke="#8B7355"
                stroke-width="2" />
              <line :x1="6 * cellSize - cellSize / 2" :y1="8 * cellSize - cellSize / 2"
                :x2="4 * cellSize - cellSize / 2" :y2="10 * cellSize - cellSize / 2" stroke="#8B7355"
                stroke-width="2" />

              <!-- 汉国九宫 -->
              <line :x1="4 * cellSize - cellSize / 2" :y1="cellSize / 2" :x2="6 * cellSize - cellSize / 2"
                :y2="3 * cellSize - cellSize / 2" stroke="#8B7355" stroke-width="2" />
              <line :x1="6 * cellSize - cellSize / 2" :y1="cellSize / 2" :x2="4 * cellSize - cellSize / 2"
                :y2="3 * cellSize - cellSize / 2" stroke="#8B7355" stroke-width="2" />
            </g>

            <!-- 楚河汉界文字 -->
            <text :x="2 * cellSize" :y="5 * cellSize - 5" font-size="24" fill="#8B4513" font-weight="bold"
              text-anchor="middle">
              楚河
            </text>
            <text :x="7 * cellSize" :y="5 * cellSize - 5" font-size="24" fill="#8B4513" font-weight="bold"
              text-anchor="middle">
              汉界
            </text>

            <!-- 炮和兵的标记点 -->
            <g class="marker-points">
              <g v-for="point in markerPoints" :key="`marker-${point.x}-${point.y}`">
                <line :x1="point.x * cellSize - cellSize / 2 - 8" :y1="point.y * cellSize - cellSize / 2 - 8"
                  :x2="point.x * cellSize - cellSize / 2 - 3" :y2="point.y * cellSize - cellSize / 2 - 8"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 - 8" :y1="point.y * cellSize - cellSize / 2 - 8"
                  :x2="point.x * cellSize - cellSize / 2 - 8" :y2="point.y * cellSize - cellSize / 2 - 3"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 + 8" :y1="point.y * cellSize - cellSize / 2 - 8"
                  :x2="point.x * cellSize - cellSize / 2 + 3" :y2="point.y * cellSize - cellSize / 2 - 8"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 + 8" :y1="point.y * cellSize - cellSize / 2 - 8"
                  :x2="point.x * cellSize - cellSize / 2 + 8" :y2="point.y * cellSize - cellSize / 2 - 3"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 - 8" :y1="point.y * cellSize - cellSize / 2 + 8"
                  :x2="point.x * cellSize - cellSize / 2 - 3" :y2="point.y * cellSize - cellSize / 2 + 8"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 - 8" :y1="point.y * cellSize - cellSize / 2 + 8"
                  :x2="point.x * cellSize - cellSize / 2 - 8" :y2="point.y * cellSize - cellSize / 2 + 3"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 + 8" :y1="point.y * cellSize - cellSize / 2 + 8"
                  :x2="point.x * cellSize - cellSize / 2 + 3" :y2="point.y * cellSize - cellSize / 2 + 8"
                  stroke="#8B7355" stroke-width="2" />
                <line :x1="point.x * cellSize - cellSize / 2 + 8" :y1="point.y * cellSize - cellSize / 2 + 8"
                  :x2="point.x * cellSize - cellSize / 2 + 8" :y2="point.y * cellSize - cellSize / 2 + 3"
                  stroke="#8B7355" stroke-width="2" />
              </g>
            </g>

            <!-- 点击区域 -->
            <g class="click-areas">
              <rect v-for="i in boardWidth * boardHeight" :key="`cell-${i}`" :x="((i - 1) % boardWidth) * cellSize"
                :y="Math.floor((i - 1) / boardWidth) * cellSize" :width="cellSize" :height="cellSize" fill="transparent"
                @click.stop="handleBoardClick((i - 1) % boardWidth + 1, Math.floor((i - 1) / boardWidth) + 1)"
                class="click-area" />
            </g>

            <!-- 可移动位置提示 -->
            <g class="move-hints">
              <circle v-for="(pos, index) in validMoves" :key="`move-${index}`" :cx="pos.x * cellSize - cellSize / 2"
                :cy="pos.y * cellSize - cellSize / 2" r="8"
                :fill="hasPieceAt(pos.x, pos.y) ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 150, 0, 0.5)'" class="move-hint"
                @click.stop="handleBoardClick(pos.x, pos.y)" />
            </g>

            <!-- 棋子 -->
            <g class="pieces">
              <g v-for="piece in pieces" :key="piece.id"
                :class="['piece', piece.side, { selected: selectedPiece?.id === piece.id }]"
                @click.stop="handlePieceClick(piece)">
                <circle :cx="piece.x * cellSize - cellSize / 2" :cy="piece.y * cellSize - cellSize / 2"
                  :r="cellSize * 0.42" :fill="piece.side === 'chu' ? '#F5DEB3' : '#FFFAF0'"
                  :stroke="piece.side === 'chu' ? '#8B0000' : '#000'" stroke-width="3" class="piece-bg" />
                <text :x="piece.x * cellSize - cellSize / 2" :y="piece.y * cellSize - cellSize / 2 + 12"
                  :fill="piece.side === 'chu' ? '#DC143C' : '#000'" font-size="28" font-weight="bold"
                  text-anchor="middle" class="piece-text">
                  {{ piece.name }}
                </text>
              </g>
            </g>

          </svg>
        </div>
      </div>

      <div class="sidebar">
        <div class="info-panel">
          <h2>⚔️ 对弈信息</h2>

          <div class="player-info">
            <div :class="['player-item chu', { active: currentSide === 'chu' && !gameEnded }]">
              <div class="side-badge chu-badge">楚</div>
              <span class="side-name">楚国</span>
              <span v-if="currentSide === 'chu' && !gameEnded" class="turn-indicator">👈</span>
            </div>

            <div :class="['player-item han', { active: currentSide === 'han' && !gameEnded }]">
              <div class="side-badge han-badge">汉</div>
              <span class="side-name">汉国</span>
              <span v-if="currentSide === 'han' && !gameEnded" class="turn-indicator">👈</span>
            </div>
          </div>

          <div class="score-item">
            <span>回合数:</span>
            <span>{{ moveHistory.length }}</span>
          </div>

          <div v-if="isCheck" class="check-warning">
            ⚠️ 将军！
          </div>

          <div v-if="gameEnded" class="game-status">
            <div class="status-message">
              {{ winner === 'chu' ? '🎉 楚国获胜！' : '🎉 汉国获胜！' }}
            </div>
          </div>
        </div>

        <div class="controls">
          <h3>📖 游戏说明</h3>
          <p>• 点击棋子选中</p>
          <p>• 绿点：可移动位置</p>
          <p>• 红点：可吃子位置</p>
          <p>• 保护己方帅/将</p>
        </div>

        <div v-if="selectedPiece" class="selected-info">
          <h3>当前选中</h3>
          <div class="selected-piece-display">
            <span :class="['piece-name', selectedPiece.side]">{{ selectedPiece.name }}</span>
            <span class="piece-pos">({{ selectedPiece.x }}, {{ selectedPiece.y }})</span>
          </div>
        </div>

        <div class="button-group">
          <button @click="undoMove" class="btn undo-btn" :disabled="moveHistory.length === 0 || gameEnded">
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
      <h2>游戏结束！</h2>
      <div class="winner-display">
        <div :class="['winner-badge', winner + '-badge']">
          {{ winner === 'chu' ? '楚' : '汉' }}
        </div>
        <p>{{ winner === 'chu' ? '🎊 楚国胜利！' : '🎊 汉国胜利！' }}</p>
      </div>
      <p class="moves-count">总回合数: <strong>{{ moveHistory.length }}</strong></p>
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
  id: number
  name: string
  type: PieceType
  side: 'chu' | 'han'  // 楚国或汉国
  x: number
  y: number
  moved?: boolean  // 用于标记是否移动过（某些规则需要）
}

type PieceType = 'king' | 'advisor' | 'elephant' | 'horse' | 'rook' | 'cannon' | 'pawn'

interface MoveRecord {
  piece: Piece
  from: Position
  to: Position
  captured?: Piece
}

// 常量
const boardWidth = 9
const boardHeight = 10
const cellSize = 60

// 炮和兵的标记点
const markerPoints: Position[] = [
  // 炮的位置
  { x: 2, y: 3 }, { x: 8, y: 3 },
  { x: 2, y: 8 }, { x: 8, y: 8 },
  // 兵/卒的位置
  { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 }, { x: 9, y: 4 },
  { x: 1, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 9, y: 7 },
]

// 响应式状态
const pieces = ref<Piece[]>([])
const selectedPiece = ref<Piece | null>(null)
const validMoves = ref<Position[]>([])
const currentSide = ref<'chu' | 'han'>('chu')  // 楚国先手
const gameEnded = ref<boolean>(false)
const winner = ref<'chu' | 'han' | null>(null)
const moveHistory = ref<MoveRecord[]>([])
const isCheck = ref<boolean>(false)

let pieceIdCounter = 0

// 初始化棋盘
const initBoard = (): void => {
  pieceIdCounter = 0
  pieces.value = []

  // 汉国（黑方，上方）
  const hanPieces: Piece[] = [
    // 第一排
    { id: pieceIdCounter++, name: '車', type: 'rook', side: 'han', x: 1, y: 1 },
    { id: pieceIdCounter++, name: '馬', type: 'horse', side: 'han', x: 2, y: 1 },
    { id: pieceIdCounter++, name: '象', type: 'elephant', side: 'han', x: 3, y: 1 },
    { id: pieceIdCounter++, name: '士', type: 'advisor', side: 'han', x: 4, y: 1 },
    { id: pieceIdCounter++, name: '將', type: 'king', side: 'han', x: 5, y: 1 },
    { id: pieceIdCounter++, name: '士', type: 'advisor', side: 'han', x: 6, y: 1 },
    { id: pieceIdCounter++, name: '象', type: 'elephant', side: 'han', x: 7, y: 1 },
    { id: pieceIdCounter++, name: '馬', type: 'horse', side: 'han', x: 8, y: 1 },
    { id: pieceIdCounter++, name: '車', type: 'rook', side: 'han', x: 9, y: 1 },
    // 炮
    { id: pieceIdCounter++, name: '砲', type: 'cannon', side: 'han', x: 2, y: 3 },
    { id: pieceIdCounter++, name: '砲', type: 'cannon', side: 'han', x: 8, y: 3 },
    // 卒
    { id: pieceIdCounter++, name: '卒', type: 'pawn', side: 'han', x: 1, y: 4 },
    { id: pieceIdCounter++, name: '卒', type: 'pawn', side: 'han', x: 3, y: 4 },
    { id: pieceIdCounter++, name: '卒', type: 'pawn', side: 'han', x: 5, y: 4 },
    { id: pieceIdCounter++, name: '卒', type: 'pawn', side: 'han', x: 7, y: 4 },
    { id: pieceIdCounter++, name: '卒', type: 'pawn', side: 'han', x: 9, y: 4 },
  ]

  // 楚国（红方，下方）
  const chuPieces: Piece[] = [
    // 兵
    { id: pieceIdCounter++, name: '兵', type: 'pawn', side: 'chu', x: 1, y: 7 },
    { id: pieceIdCounter++, name: '兵', type: 'pawn', side: 'chu', x: 3, y: 7 },
    { id: pieceIdCounter++, name: '兵', type: 'pawn', side: 'chu', x: 5, y: 7 },
    { id: pieceIdCounter++, name: '兵', type: 'pawn', side: 'chu', x: 7, y: 7 },
    { id: pieceIdCounter++, name: '兵', type: 'pawn', side: 'chu', x: 9, y: 7 },
    // 炮
    { id: pieceIdCounter++, name: '炮', type: 'cannon', side: 'chu', x: 2, y: 8 },
    { id: pieceIdCounter++, name: '炮', type: 'cannon', side: 'chu', x: 8, y: 8 },
    // 第一排
    { id: pieceIdCounter++, name: '俥', type: 'rook', side: 'chu', x: 1, y: 10 },
    { id: pieceIdCounter++, name: '傌', type: 'horse', side: 'chu', x: 2, y: 10 },
    { id: pieceIdCounter++, name: '相', type: 'elephant', side: 'chu', x: 3, y: 10 },
    { id: pieceIdCounter++, name: '仕', type: 'advisor', side: 'chu', x: 4, y: 10 },
    { id: pieceIdCounter++, name: '帥', type: 'king', side: 'chu', x: 5, y: 10 },
    { id: pieceIdCounter++, name: '仕', type: 'advisor', side: 'chu', x: 6, y: 10 },
    { id: pieceIdCounter++, name: '相', type: 'elephant', side: 'chu', x: 7, y: 10 },
    { id: pieceIdCounter++, name: '傌', type: 'horse', side: 'chu', x: 8, y: 10 },
    { id: pieceIdCounter++, name: '俥', type: 'rook', side: 'chu', x: 9, y: 10 },
  ]

  pieces.value = [...hanPieces, ...chuPieces]
}

// 工具函数
const hasPieceAt = (x: number, y: number): boolean => {
  return pieces.value.some(p => p.x === x && p.y === y)
}

const getPieceAt = (x: number, y: number): Piece | undefined => {
  return pieces.value.find(p => p.x === x && p.y === y)
}

const isInBoard = (x: number, y: number): boolean => {
  return x >= 1 && x <= boardWidth && y >= 1 && y <= boardHeight
}

const isInPalace = (x: number, y: number, side: 'chu' | 'han'): boolean => {
  if (x < 4 || x > 6) return false
  if (side === 'han') return y >= 1 && y <= 3
  return y >= 8 && y <= 10
}

const hasPassedRiver = (y: number, side: 'chu' | 'han'): boolean => {
  return side === 'chu' ? y <= 5 : y >= 6
}

// 检查路径是否有障碍
const countPiecesBetween = (from: Position, to: Position): number => {
  let count = 0
  const dx = Math.sign(to.x - from.x)
  const dy = Math.sign(to.y - from.y)

  let x = from.x + dx
  let y = from.y + dy

  while (x !== to.x || y !== to.y) {
    if (hasPieceAt(x, y)) count++
    x += dx
    y += dy
  }

  return count
}

// 获取棋子的有效移动位置
const getValidMoves = (piece: Piece): Position[] => {
  const moves: Position[] = []

  switch (piece.type) {
    case 'king': // 帅/将
      // 九宫格内上下左右移动
      const kingMoves = [
        { x: piece.x, y: piece.y - 1 },
        { x: piece.x, y: piece.y + 1 },
        { x: piece.x - 1, y: piece.y },
        { x: piece.x + 1, y: piece.y }
      ]
      for (const move of kingMoves) {
        if (isInPalace(move.x, move.y, piece.side)) {
          const target = getPieceAt(move.x, move.y)
          if (!target || target.side !== piece.side) {
            moves.push(move)
          }
        }
      }

      // 检查将帅对面（飞将）
      const enemyKing = pieces.value.find(p => p.type === 'king' && p.side !== piece.side)
      if (enemyKing && enemyKing.x === piece.x) {
        if (countPiecesBetween(piece, enemyKing) === 0) {
          moves.push({ x: enemyKing.x, y: enemyKing.y })
        }
      }
      break

    case 'advisor': // 仕/士
      // 九宫格内斜走
      const advisorMoves = [
        { x: piece.x - 1, y: piece.y - 1 },
        { x: piece.x + 1, y: piece.y - 1 },
        { x: piece.x - 1, y: piece.y + 1 },
        { x: piece.x + 1, y: piece.y + 1 }
      ]
      for (const move of advisorMoves) {
        if (isInPalace(move.x, move.y, piece.side)) {
          const target = getPieceAt(move.x, move.y)
          if (!target || target.side !== piece.side) {
            moves.push(move)
          }
        }
      }
      break

    case 'elephant': // 相/象
      // 田字走法，不能过河
      const elephantMoves = [
        { x: piece.x - 2, y: piece.y - 2, blockX: piece.x - 1, blockY: piece.y - 1 },
        { x: piece.x + 2, y: piece.y - 2, blockX: piece.x + 1, blockY: piece.y - 1 },
        { x: piece.x - 2, y: piece.y + 2, blockX: piece.x - 1, blockY: piece.y + 1 },
        { x: piece.x + 2, y: piece.y + 2, blockX: piece.x + 1, blockY: piece.y + 1 }
      ]
      for (const move of elephantMoves) {
        if (isInBoard(move.x, move.y) && !hasPassedRiver(move.y, piece.side)) {
          // 检查象眼是否被堵
          if (!hasPieceAt(move.blockX, move.blockY)) {
            const target = getPieceAt(move.x, move.y)
            if (!target || target.side !== piece.side) {
              moves.push({ x: move.x, y: move.y })
            }
          }
        }
      }
      break

    case 'horse': // 马
      // 日字走法
      const horseMoves = [
        { x: piece.x - 1, y: piece.y - 2, blockX: piece.x, blockY: piece.y - 1 },
        { x: piece.x + 1, y: piece.y - 2, blockX: piece.x, blockY: piece.y - 1 },
        { x: piece.x - 1, y: piece.y + 2, blockX: piece.x, blockY: piece.y + 1 },
        { x: piece.x + 1, y: piece.y + 2, blockX: piece.x, blockY: piece.y + 1 },
        { x: piece.x - 2, y: piece.y - 1, blockX: piece.x - 1, blockY: piece.y },
        { x: piece.x - 2, y: piece.y + 1, blockX: piece.x - 1, blockY: piece.y },
        { x: piece.x + 2, y: piece.y - 1, blockX: piece.x + 1, blockY: piece.y },
        { x: piece.x + 2, y: piece.y + 1, blockX: piece.x + 1, blockY: piece.y }
      ]
      for (const move of horseMoves) {
        if (isInBoard(move.x, move.y)) {
          // 检查马腿是否被蹩
          if (!hasPieceAt(move.blockX, move.blockY)) {
            const target = getPieceAt(move.x, move.y)
            if (!target || target.side !== piece.side) {
              moves.push({ x: move.x, y: move.y })
            }
          }
        }
      }
      break

    case 'rook': // 车
      // 直线移动
      const directions = [
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
      ]
      for (const dir of directions) {
        let x = piece.x + dir.dx
        let y = piece.y + dir.dy
        while (isInBoard(x, y)) {
          const target = getPieceAt(x, y)
          if (target) {
            if (target.side !== piece.side) {
              moves.push({ x, y })
            }
            break
          }
          moves.push({ x, y })
          x += dir.dx
          y += dir.dy
        }
      }
      break

    case 'cannon': // 炮
      // 直线移动，吃子时需要跳过一个棋子
      const cannonDirs = [
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
      ]
      for (const dir of cannonDirs) {
        let x = piece.x + dir.dx
        let y = piece.y + dir.dy
        let jumped = false

        while (isInBoard(x, y)) {
          const target = getPieceAt(x, y)

          if (!jumped) {
            // 还没跳过棋子
            if (target) {
              jumped = true
            } else {
              moves.push({ x, y })
            }
          } else {
            // 已经跳过一个棋子
            if (target) {
              if (target.side !== piece.side) {
                moves.push({ x, y })
              }
              break
            }
          }

          x += dir.dx
          y += dir.dy
        }
      }
      break

    case 'pawn': // 兵/卒
      if (piece.side === 'chu') {
        // 楚国兵
        if (!hasPassedRiver(piece.y, 'chu')) {
          // 未过河，只能前进
          if (piece.y > 1) {
            const target = getPieceAt(piece.x, piece.y - 1)
            if (!target || target.side !== piece.side) {
              moves.push({ x: piece.x, y: piece.y - 1 })
            }
          }
        } else {
          // 过河后，可以前进和左右移动
          const pawnMoves = [
            { x: piece.x, y: piece.y - 1 },
            { x: piece.x - 1, y: piece.y },
            { x: piece.x + 1, y: piece.y }
          ]
          for (const move of pawnMoves) {
            if (isInBoard(move.x, move.y)) {
              const target = getPieceAt(move.x, move.y)
              if (!target || target.side !== piece.side) {
                moves.push(move)
              }
            }
          }
        }
      } else {
        // 汉国卒
        if (!hasPassedRiver(piece.y, 'han')) {
          // 未过河，只能前进
          if (piece.y < boardHeight) {
            const target = getPieceAt(piece.x, piece.y + 1)
            if (!target || target.side !== piece.side) {
              moves.push({ x: piece.x, y: piece.y + 1 })
            }
          }
        } else {
          // 过河后，可以前进和左右移动
          const pawnMoves = [
            { x: piece.x, y: piece.y + 1 },
            { x: piece.x - 1, y: piece.y },
            { x: piece.x + 1, y: piece.y }
          ]
          for (const move of pawnMoves) {
            if (isInBoard(move.x, move.y)) {
              const target = getPieceAt(move.x, move.y)
              if (!target || target.side !== piece.side) {
                moves.push(move)
              }
            }
          }
        }
      }
      break
  }

  return moves
}

// 检查是否将军
const checkIsCheck = (side: 'chu' | 'han'): boolean => {
  const king = pieces.value.find(p => p.type === 'king' && p.side === side)
  if (!king) return false

  // 检查是否有敌方棋子可以攻击到己方将/帅
  const enemyPieces = pieces.value.filter(p => p.side !== side)
  for (const enemyPiece of enemyPieces) {
    const moves = getValidMoves(enemyPiece)
    if (moves.some(m => m.x === king.x && m.y === king.y)) {
      return true
    }
  }

  return false
}

// 检查移动后是否会导致己方被将军（用于验证移动合法性）
const wouldBeInCheck = (piece: Piece, to: Position): boolean => {
  // 临时移动棋子
  const originalX = piece.x
  const originalY = piece.y
  const capturedPiece = getPieceAt(to.x, to.y)

  // 执行移动
  piece.x = to.x
  piece.y = to.y
  if (capturedPiece) {
    pieces.value = pieces.value.filter(p => p.id !== capturedPiece.id)
  }

  // 检查是否被将军
  const inCheck = checkIsCheck(piece.side)

  // 恢复棋盘
  piece.x = originalX
  piece.y = originalY
  if (capturedPiece) {
    pieces.value.push(capturedPiece)
  }

  return inCheck
}

// 过滤掉会导致己方被将军的移动
const filterSafeMoves = (piece: Piece, moves: Position[]): Position[] => {
  return moves.filter(move => !wouldBeInCheck(piece, move))
}

// 检查是否被将死
const isCheckmate = (side: 'chu' | 'han'): boolean => {
  // 检查己方所有棋子是否都无法移动来解除将军
  const ownPieces = pieces.value.filter(p => p.side === side)
  for (const piece of ownPieces) {
    const moves = getValidMoves(piece)
    const safeMoves = filterSafeMoves(piece, moves)
    if (safeMoves.length > 0) {
      return false
    }
  }
  return true
}

// 事件处理
const handlePieceClick = (piece: Piece): void => {
  if (gameEnded.value) return

  // 如果点击的是对方棋子且当前有选中的己方棋子，尝试吃子
  if (selectedPiece.value && piece.side !== currentSide.value) {
    handleBoardClick(piece.x, piece.y)
    return
  }

  // 只能选择当前回合方的棋子
  if (piece.side !== currentSide.value) return

  selectedPiece.value = piece
  const moves = getValidMoves(piece)
  validMoves.value = filterSafeMoves(piece, moves)
}

const handleBoardClick = (x: number, y: number): void => {
  if (gameEnded.value || !selectedPiece.value) return

  // 检查是否是有效移动
  const isValidMove = validMoves.value.some(m => m.x === x && m.y === y)
  if (!isValidMove) {
    selectedPiece.value = null
    validMoves.value = []
    return
  }

  // 记录移动
  const moveRecord: MoveRecord = {
    piece: { ...selectedPiece.value },
    from: { x: selectedPiece.value.x, y: selectedPiece.value.y },
    to: { x, y }
  }

  // 检查是否吃子
  const capturedPiece = getPieceAt(x, y)
  if (capturedPiece) {
    moveRecord.captured = { ...capturedPiece }
    pieces.value = pieces.value.filter(p => p.id !== capturedPiece.id)

    // 如果吃掉对方的帅/将，游戏结束
    if (capturedPiece.type === 'king') {
      winner.value = currentSide.value
      gameEnded.value = true
    }
  }

  // 移动棋子
  selectedPiece.value.x = x
  selectedPiece.value.y = y
  selectedPiece.value.moved = true

  // 保存移动记录
  moveHistory.value.push(moveRecord)

  // 清除选择
  selectedPiece.value = null
  validMoves.value = []

  if (!gameEnded.value) {
    // 切换回合
    currentSide.value = currentSide.value === 'chu' ? 'han' : 'chu'

    // 检查是否将军
    isCheck.value = checkIsCheck(currentSide.value)

    // 检查是否被将死
    if (isCheck.value && isCheckmate(currentSide.value)) {
      winner.value = currentSide.value === 'chu' ? 'han' : 'chu'
      gameEnded.value = true
    }
  }
}

// 悔棋
const undoMove = (): void => {
  if (moveHistory.value.length === 0 || gameEnded.value) return

  const lastMove = moveHistory.value.pop()
  if (!lastMove) return

  // 恢复棋子位置
  const piece = pieces.value.find(p => p.id === lastMove.piece.id)
  if (piece) {
    piece.x = lastMove.from.x
    piece.y = lastMove.from.y
  }

  // 恢复被吃的棋子
  if (lastMove.captured) {
    pieces.value.push(lastMove.captured)
  }

  // 切换回合
  currentSide.value = currentSide.value === 'chu' ? 'han' : 'chu'
  isCheck.value = checkIsCheck(currentSide.value)

  // 清除选择
  selectedPiece.value = null
  validMoves.value = []
}

// 重新开始
const restartGame = (): void => {
  initBoard()
  selectedPiece.value = null
  validMoves.value = []
  currentSide.value = 'chu'
  gameEnded.value = false
  winner.value = null
  moveHistory.value = []
  isCheck.value = false
}

// 初始化
initBoard()
</script>

<style lang="scss" scoped>
.chinese-chess {
  font-family: 'Arial', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #f5f5dc 0%, #d2b48c 100%);
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
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

  @media (max-width: 1200px) {
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
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.15);
  border: 3px solid #8B7355;
}

.board-svg {
  width: 540px;
  height: 600px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 360px;
    height: 400px;
  }
}

.click-areas {
  pointer-events: all;
}

.click-area {
  cursor: pointer;

  &:hover {
    fill: rgba(139, 115, 85, 0.1);
  }
}

.move-hint {
  pointer-events: all;
  cursor: pointer;
  animation: pulse 1s ease-in-out infinite;

  &:hover {
    opacity: 1 !important;
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
}

.piece {
  cursor: pointer;
  transition: all 0.2s;
  pointer-events: all;

  &:hover {
    .piece-bg {
      filter: brightness(1.1);
    }
  }

  &.selected {
    .piece-bg {
      filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
      stroke-width: 4;
    }

    animation: bounce 0.5s ease-in-out infinite;
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.piece-bg {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.4));
  transition: all 0.2s;
}

.piece-text {
  pointer-events: none;
  user-select: none;
  font-family: 'KaiTi', 'STKaiti', 'FangSong', serif;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 280px;
}

.info-panel {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;

  h2 {
    font-size: 1.3em;
    color: #8B4513;
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
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: white;
  transition: all 0.3s;

  &.active {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transform: translateX(5px);
  }

  &.chu.active {
    background: #ffe4e1;
    border-left: 4px solid #DC143C;
  }

  &.han.active {
    background: #f0f0f0;
    border-left: 4px solid #333;
  }

  .side-name {
    font-size: 1.1em;
    font-weight: 500;
  }

  .turn-indicator {
    margin-left: auto;
    font-size: 1.2em;
    animation: bounce-side 1s ease-in-out infinite;
  }
}

@keyframes bounce-side {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-5px);
  }
}

.side-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'KaiTi', 'STKaiti', serif;

  &.chu-badge {
    background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
    color: white;
  }

  &.han-badge {
    background: linear-gradient(135deg, #333 0%, #000 100%);
    color: white;
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

.check-warning {
  margin-top: 10px;
  padding: 12px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

.game-status {
  margin-top: 15px;
  padding: 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
    color: #8B4513;
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  p {
    margin: 8px 0;
    color: #666;
    font-size: 1em;
  }
}

.selected-info {
  background: #fff3cd;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ffc107;

  h3 {
    color: #8B4513;
    margin-bottom: 10px;
    font-size: 1.1em;
  }
}

.selected-piece-display {
  display: flex;
  align-items: center;
  gap: 10px;

  .piece-name {
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'KaiTi', 'STKaiti', serif;

    &.chu {
      color: #DC143C;
    }

    &.han {
      color: #000;
    }
  }

  .piece-pos {
    color: #666;
    font-size: 0.9em;
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
  min-width: 320px;
  animation: slideIn 0.3s ease-out;

  h2 {
    color: #8B4513;
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

  .winner-badge {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: celebrate 0.6s ease-in-out;
    font-family: 'KaiTi', 'STKaiti', serif;

    &.chu-badge {
      background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
      color: white;
    }

    &.han-badge {
      background: linear-gradient(135deg, #333 0%, #000 100%);
      color: white;
    }
  }
}

@keyframes celebrate {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  25% {
    transform: scale(1.2) rotate(10deg);
  }

  75% {
    transform: scale(1.2) rotate(-10deg);
  }
}
</style>
