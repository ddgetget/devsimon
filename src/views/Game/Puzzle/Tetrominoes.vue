<template>
    <div class="tetris-game">
        <div class="game-container">
            <div class="board">
                <div v-for="(cell, index) in board" :key="index" :class="['cell', cell ? 'filled ' + cell : '']" />
            </div>

            <div class="sidebar">
                <div class="info-panel">
                    <h2>📊 游戏信息</h2>
                    <div class="score-item">
                        <span>得分:</span>
                        <span>{{ score }}</span>
                    </div>
                    <div class="score-item">
                        <span>等级:</span>
                        <span>{{ level }}</span>
                    </div>
                    <div class="score-item">
                        <span>行数:</span>
                        <span>{{ lines }}</span>
                    </div>

                    <h2 class="next-title">⏭️ 下一个</h2>
                    <div class="next-piece">
                        <div v-for="(cell, index) in nextPiecePreview" :key="index"
                            :class="['cell', cell ? 'filled ' + cell : '']" />
                    </div>
                </div>

                <div class="controls">
                    <h3>⌨️ 控制键</h3>
                    <p><kbd>←</kbd> <kbd>→</kbd> 移动</p>
                    <p><kbd>↓</kbd> 快速下落</p>
                    <p><kbd>↑</kbd> 或 <kbd>Space</kbd> 旋转</p>
                    <p><kbd>P</kbd> 暂停/继续</p>
                </div>

                <button v-if="!isPlaying" @click="startGame" class="btn start-btn">
                    开始游戏
                </button>
                <button v-else @click="togglePause" class="btn pause-btn">
                    {{ isPaused ? '继续' : '暂停' }}
                </button>
                <button @click="restartGame" class="btn restart-btn" :disabled="!isPlaying && score === 0">
                    重新开始
                </button>
            </div>
        </div>

        <div v-if="gameOver" class="overlay" @click="restartGame" />
        <div v-if="gameOver" class="game-over">
            <h2>游戏结束！</h2>
            <p>最终得分: <strong>{{ score }}</strong></p>
            <p>消除行数: <strong>{{ lines }}</strong></p>
            <button @click="restartGame" class="btn start-btn">再玩一次</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 类型定义
interface Position {
    x: number
    y: number
}

interface Piece {
    shape: number[][][]
    color: PieceType
}

type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

// 常量
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const INITIAL_DROP_INTERVAL = 1000

// 方块定义
const pieces: Record<PieceType, Piece> = {
    I: {
        shape: [
            [[1, 1, 1, 1]],
            [[1], [1], [1], [1]]
        ],
        color: 'I'
    },
    O: {
        shape: [
            [[1, 1], [1, 1]]
        ],
        color: 'O'
    },
    T: {
        shape: [
            [[0, 1, 0], [1, 1, 1]],
            [[1, 0], [1, 1], [1, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[0, 1], [1, 1], [0, 1]]
        ],
        color: 'T'
    },
    S: {
        shape: [
            [[0, 1, 1], [1, 1, 0]],
            [[1, 0], [1, 1], [0, 1]]
        ],
        color: 'S'
    },
    Z: {
        shape: [
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1], [1, 1], [1, 0]]
        ],
        color: 'Z'
    },
    J: {
        shape: [
            [[1, 0, 0], [1, 1, 1]],
            [[1, 1], [1, 0], [1, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[0, 1], [0, 1], [1, 1]]
        ],
        color: 'J'
    },
    L: {
        shape: [
            [[0, 0, 1], [1, 1, 1]],
            [[1, 0], [1, 0], [1, 1]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1], [0, 1], [0, 1]]
        ],
        color: 'L'
    }
}

// 响应式状态
const board = ref<(PieceType | null)[]>(Array(BOARD_WIDTH * BOARD_HEIGHT).fill(null))
const currentPiece = ref<PieceType | null>(null)
const currentPosition = ref<Position>({ x: 0, y: 0 })
const currentRotation = ref<number>(0)
const nextPiece = ref<PieceType | null>(null)

const isPlaying = ref<boolean>(false)
const isPaused = ref<boolean>(false)
const gameOver = ref<boolean>(false)
const score = ref<number>(0)
const lines = ref<number>(0)
const level = ref<number>(1)

let gameLoop: number | null = null
const dropInterval = ref<number>(INITIAL_DROP_INTERVAL)

// 计算属性
const nextPiecePreview = computed<(PieceType | null)[]>(() => {
    const preview: (PieceType | null)[] = Array(16).fill(null)
    if (!nextPiece.value) return preview

    const shape = pieces[nextPiece.value].shape[0]
    const color = pieces[nextPiece.value].color

    // @ts-ignore
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                preview[y * 4 + x] = color
            }
        })
    })

    return preview
})

// 工具函数
const getRandomPiece = (): PieceType => {
    const pieceKeys = Object.keys(pieces) as PieceType[]
    // @ts-ignore
    return pieceKeys[Math.floor(Math.random() * pieceKeys.length)]
}

const getCurrentShape = (): number[][] => {
    if (!currentPiece.value) return []
    // @ts-ignore
    return pieces[currentPiece.value].shape[currentRotation.value]
}

const isCurrentPieceCell = (index: number): boolean => {
    const shape = getCurrentShape()
    const y = Math.floor(index / BOARD_WIDTH)
    const x = index % BOARD_WIDTH

    for (let sy = 0; sy < shape.length; sy++) {
        // @ts-ignore
        for (let sx = 0; sx < shape[sy].length; sx++) {
            // @ts-ignore
            if (shape[sy][sx]) {
                if (currentPosition.value.y + sy === y &&
                    currentPosition.value.x + sx === x) {
                    return true
                }
            }
        }
    }
    return false
}

const checkCollision = (position: Position, rotation: number): boolean => {
    if (!currentPiece.value) return false
    const shape = pieces[currentPiece.value].shape[rotation]
    // @ts-ignore
    for (let y = 0; y < shape.length; y++) {
        // @ts-ignore
        for (let x = 0; x < shape[y].length; x++) {
            // @ts-ignore
            if (shape[y][x]) {
                const newX = position.x + x
                const newY = position.y + y

                // 检查边界
                if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                    return true
                }

                // 检查是否已有方块
                if (newY >= 0) {
                    const index = newY * BOARD_WIDTH + newX
                    if (board.value[index] && !isCurrentPieceCell(index)) {
                        return true
                    }
                }
            }
        }
    }
    return false
}

const clearPiece = (): void => {
    const shape = getCurrentShape()
    for (let y = 0; y < shape.length; y++) {
        // @ts-ignore
        for (let x = 0; x < shape[y].length; x++) {
            // @ts-ignore
            if (shape[y][x]) {
                const index = (currentPosition.value.y + y) * BOARD_WIDTH +
                    (currentPosition.value.x + x)
                if (index >= 0 && index < board.value.length) {
                    board.value[index] = null
                }
            }
        }
    }
}

const drawPiece = (): void => {
    if (!currentPiece.value) return
    const shape = getCurrentShape()
    const color = pieces[currentPiece.value].color

    for (let y = 0; y < shape.length; y++) {
        // @ts-ignore
        for (let x = 0; x < shape[y].length; x++) {
            // @ts-ignore
            if (shape[y][x]) {
                const boardY = currentPosition.value.y + y
                if (boardY >= 0) {
                    const index = boardY * BOARD_WIDTH + (currentPosition.value.x + x)
                    if (index >= 0 && index < board.value.length) {
                        board.value[index] = color
                    }
                }
            }
        }
    }
}

const checkLines = (): void => {
    let linesCleared = 0

    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        let isLineFull = true
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (!board.value[y * BOARD_WIDTH + x]) {
                isLineFull = false
                break
            }
        }

        if (isLineFull) {
            linesCleared++
            // 删除这一行
            for (let yy = y; yy > 0; yy--) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    // @ts-ignore
                    board.value[yy * BOARD_WIDTH + x] =
                        board.value[(yy - 1) * BOARD_WIDTH + x]
                }
            }
            // 清空顶行
            for (let x = 0; x < BOARD_WIDTH; x++) {
                board.value[x] = null
            }
            y++ // 重新检查当前行
        }
    }

    if (linesCleared > 0) {
        lines.value += linesCleared
        // 计分：1行=100, 2行=300, 3行=500, 4行=800
        const points = [0, 100, 300, 500, 800]
        // @ts-ignore
        score.value += points[linesCleared] * level.value

        // 每10行升级
        level.value = Math.floor(lines.value / 10) + 1
        dropInterval.value = Math.max(100, INITIAL_DROP_INTERVAL - (level.value - 1) * 100)
        startGameLoop()
    }
}

const lockPiece = (): void => {
    checkLines()
    spawnPiece()
}

const spawnPiece = (): void => {
    currentPiece.value = nextPiece.value
    nextPiece.value = getRandomPiece()
    currentRotation.value = 0
    currentPosition.value = { x: 3, y: 0 }

    if (checkCollision(currentPosition.value, currentRotation.value)) {
        endGame()
    } else {
        drawPiece()
    }
}

const startGameLoop = (): void => {
    if (gameLoop !== null) clearInterval(gameLoop)
    gameLoop = window.setInterval(() => {
        if (!isPaused.value) {
            moveDown()
        }
    }, dropInterval.value)
}

// 游戏控制
const startGame = (): void => {
    board.value = Array(BOARD_WIDTH * BOARD_HEIGHT).fill(null)
    score.value = 0
    lines.value = 0
    level.value = 1
    gameOver.value = false
    isPlaying.value = true
    isPaused.value = false
    dropInterval.value = INITIAL_DROP_INTERVAL

    nextPiece.value = getRandomPiece()
    spawnPiece()
    startGameLoop()
}

const restartGame = (): void => {
    if (gameLoop !== null) clearInterval(gameLoop)
    startGame()
}

const togglePause = (): void => {
    isPaused.value = !isPaused.value
    if (isPaused.value) {
        if (gameLoop !== null) clearInterval(gameLoop)
    } else {
        startGameLoop()
    }
}

const endGame = (): void => {
    gameOver.value = true
    isPlaying.value = false
    if (gameLoop !== null) clearInterval(gameLoop)
}

// 移动操作
const moveDown = (): void => {
    clearPiece()
    const newPosition: Position = {
        x: currentPosition.value.x,
        y: currentPosition.value.y + 1
    }

    if (!checkCollision(newPosition, currentRotation.value)) {
        currentPosition.value = newPosition
        drawPiece()
    } else {
        drawPiece()
        lockPiece()
    }
}

const moveLeft = (): void => {
    clearPiece()
    const newPosition: Position = {
        x: currentPosition.value.x - 1,
        y: currentPosition.value.y
    }

    if (!checkCollision(newPosition, currentRotation.value)) {
        currentPosition.value = newPosition
    }
    drawPiece()
}

const moveRight = (): void => {
    clearPiece()
    const newPosition: Position = {
        x: currentPosition.value.x + 1,
        y: currentPosition.value.y
    }

    if (!checkCollision(newPosition, currentRotation.value)) {
        currentPosition.value = newPosition
    }
    drawPiece()
}

const rotate = (): void => {
    if (!currentPiece.value) return
    clearPiece()
    const newRotation = (currentRotation.value + 1) % pieces[currentPiece.value].shape.length

    if (!checkCollision(currentPosition.value, newRotation)) {
        currentRotation.value = newRotation
    }
    drawPiece()
}

const drop = (): void => {
    while (!checkCollision(
        { x: currentPosition.value.x, y: currentPosition.value.y + 1 },
        currentRotation.value
    )) {
        clearPiece()
        currentPosition.value.y++
        drawPiece()
    }
    lockPiece()
}

// 键盘控制
const handleKeyPress = (event: KeyboardEvent): void => {
    if (!isPlaying.value || gameOver.value) return

    if (event.key === 'p' || event.key === 'P') {
        togglePause()
        return
    }

    if (isPaused.value) return

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault()
            moveLeft()
            break
        case 'ArrowRight':
            event.preventDefault()
            moveRight()
            break
        case 'ArrowDown':
            event.preventDefault()
            moveDown()
            score.value += 1
            break
        case 'ArrowUp':
        case ' ':
            event.preventDefault()
            rotate()
            break
    }
}

// 生命周期钩子
onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
    if (gameLoop !== null) clearInterval(gameLoop)
})
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.tetris-game {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
}

.board {
    display: grid;
    grid-template-columns: repeat(10, 30px);
    grid-template-rows: repeat(20, 30px);
    gap: 1px;
    background: #ddd;
    border: 3px solid #333;
    padding: 1px;
}

.cell {
    width: 30px;
    height: 30px;
    background: #f5f5f5;
    transition: all 0.1s;

    &.filled {
        border: 2px solid rgba(255, 255, 255, 0.3);
    }

    &.I {
        background: #00f0f0;
    }

    &.O {
        background: #f0f000;
    }

    &.T {
        background: #a000f0;
    }

    &.S {
        background: #00f000;
    }

    &.Z {
        background: #f00000;
    }

    &.J {
        background: #0000f0;
    }

    &.L {
        background: #f0a000;
    }
}

.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.info-panel {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    min-width: 200px;

    h2 {
        font-size: 1.2em;
        color: #667eea;
        margin-bottom: 15px;

        &.next-title {
            margin-top: 20px;
        }
    }
}

.score-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.1em;

    span:first-child {
        color: #666;
    }

    span:last-child {
        font-weight: bold;
        color: #333;
    }
}

.next-piece {
    display: grid;
    grid-template-columns: repeat(4, 25px);
    grid-template-rows: repeat(4, 25px);
    gap: 1px;
    margin-top: 10px;
    justify-content: center;

    .cell {
        width: 25px;
        height: 25px;
    }
}

.controls {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;

    h3 {
        color: #667eea;
        margin-bottom: 10px;
    }

    p {
        margin: 5px 0;
        color: #666;
    }

    kbd {
        background: #667eea;
        color: white;
        padding: 3px 8px;
        border-radius: 3px;
        font-family: monospace;
        font-weight: bold;
    }
}

.btn {
    width: 100%;
    padding: 15px;
    font-size: 1.2em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    margin-top: 10px;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
    }
}

.start-btn {
    background: #00c851;
    color: white;

    &:hover:not(:disabled) {
        background: #007e33;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 200, 81, 0.4);
    }
}

.pause-btn {
    background: #ffbb33;
    color: white;

    &:hover:not(:disabled) {
        background: #ff8800;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 187, 51, 0.4);
    }
}

.restart-btn {
    background: #ff4444;
    color: white;

    &:hover:not(:disabled) {
        background: #cc0000;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 68, 68, 0.4);
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
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    text-align: center;
    z-index: 1000;

    h2 {
        color: #f44336;
        font-size: 2em;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #333;
    }
}
</style>
