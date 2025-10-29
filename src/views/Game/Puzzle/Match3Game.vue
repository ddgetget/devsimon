<template>
  <div class="match3-game">
    <div class="game-container">
      <div class="main-area">
        <!-- 关卡信息 -->
        <div class="level-banner">
          <div class="level-info">
            <h2>关卡 {{ currentLevel }}</h2>
            <div class="level-stars">
              <span v-for="i in 3" :key="i" class="star" :class="{ filled: i <= stars }">⭐</span>
            </div>
          </div>
          <div class="level-objectives">
            <div class="objective">
              <span class="label">目标分数:</span>
              <span class="value">{{ levelData.targetScore }}</span>
            </div>
            <div class="objective">
              <span class="label">剩余步数:</span>
              <span class="value" :class="{ warning: movesLeft <= 5 }">{{ movesLeft }}</span>
            </div>
          </div>
        </div>

        <!-- 游戏棋盘 -->
        <div class="board-container">
          <div class="board" :class="{ locked: isAnimating }">
            <div v-for="(gem, index) in board" :key="`${index}-${gem.id}`" :class="[
              'gem',
              `gem-${gem.type}`,
              { selected: selectedGem?.index === index },
              { matched: gem.matched },
              { special: gem.special },
              { hidden: gem.type === -1 }
            ]" :data-index="index" :style="{
              left: `${(index % boardSize) * 12.5}%`,
              top: `${Math.floor(index / boardSize) * 12.5}%`,
              transitionDelay: `${gem.delay || 0}ms`
            }" @click.stop="handleGemClick(index)">
              <div class="gem-inner">
                <span class="gem-icon">{{ getGemIcon(gem.type, gem.special) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 得分弹窗 -->
        <transition-group name="score-fade" tag="div" class="score-popups">
          <div v-for="popup in scorePopups" :key="popup.id" class="score-popup" :style="{
            left: `${popup.x * 12.5 + 6.25}%`,
            top: `${popup.y * 12.5 + 6.25}%`
          }">
            +{{ popup.score }}
          </div>
        </transition-group>
      </div>

      <div class="sidebar">
        <!-- 得分面板 -->
        <div class="info-panel">
          <h2>📊 游戏信息</h2>

          <div class="score-display">
            <div class="score-item main-score">
              <span class="label">当前得分</span>
              <span class="value">{{ score }}</span>
            </div>

            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${scoreProgress}%` }"></div>
            </div>

            <div class="score-item">
              <span class="label">最高分</span>
              <span class="value">{{ highScore }}</span>
            </div>

            <div class="score-item">
              <span class="label">连击</span>
              <span class="value combo" v-if="combo > 1">{{ combo }}x 🔥</span>
              <span class="value" v-else>-</span>
            </div>
          </div>
        </div>

        <!-- 关卡进度 -->
        <div class="levels-panel">
          <h3>🎯 关卡进度</h3>
          <div class="levels-grid">
            <div v-for="level in Math.min(maxLevel + 1, 20)" :key="level" :class="[
              'level-badge',
              { current: level === currentLevel },
              { completed: level < currentLevel },
              { locked: level > maxLevel }
            ]" @click="selectLevel(level)">
              <span class="level-number">{{ level }}</span>
              <div v-if="level <= maxLevel && levelStars[level]" class="level-stars-mini">
                <span v-for="i in levelStars[level]" :key="i" class="mini-star">⭐</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 游戏说明 -->
        <div class="controls">
          <h3>📖 游戏说明</h3>
          <p>• 点击相邻宝石交换</p>
          <p>• 3个以上连成一线消除</p>
          <p>• 4连消产生炸弹💣</p>
          <p>• 5连消产生彩虹🌈</p>
          <p>• 完成目标解锁关卡</p>
        </div>

        <div class="button-group">
          <button @click="restartLevel" class="btn restart-btn">
            🔄 重新开始
          </button>
          <button @click="resetProgress" class="btn reset-btn">
            ⚠️ 重置进度
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏结束弹窗 -->
    <div v-if="gameEnded" class="overlay" />
    <div v-if="gameEnded" class="game-over">
      <div v-if="levelCompleted" class="success-modal">
        <h2>🎉 关卡完成！</h2>
        <div class="stars-earned">
          <span v-for="i in 3" :key="i" class="big-star" :class="{ earned: i <= stars }">
            ⭐
          </span>
        </div>
        <p class="final-score">得分: <strong>{{ score }}</strong></p>
        <p class="best-score">目标: {{ levelData.targetScore }}</p>
        <div class="buttons">
          <button @click="nextLevel" class="btn next-btn">下一关 →</button>
          <button @click="restartLevel" class="btn restart-btn">重玩本关</button>
        </div>
      </div>
      <div v-else class="fail-modal">
        <h2>😢 关卡失败</h2>
        <p class="final-score">得分: <strong>{{ score }}</strong></p>
        <p class="reason">{{ failReason }}</p>
        <div class="buttons">
          <button @click="restartLevel" class="btn restart-btn">再试一次</button>
          <button @click="selectLevel(Math.max(1, currentLevel - 1))" class="btn back-btn">
            返回上一关
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// 类型定义
interface Gem {
  id: number
  type: number
  special?: 'bomb' | 'rainbow' | null
  matched?: boolean
  delay?: number
}

interface ScorePopup {
  id: number
  x: number
  y: number
  score: number
}

interface LevelData {
  level: number
  targetScore: number
  moves: number
  gemTypes: number
}

interface GameProgress {
  maxLevel: number
  levelStars: Record<number, number>
  highScore: number
}

// 常量
const boardSize = 8
const gemTypes = 6
const STORAGE_KEY = 'match3_game_progress'

// 关卡配置
const levels: LevelData[] = [
  { level: 1, targetScore: 1000, moves: 20, gemTypes: 4 },
  { level: 2, targetScore: 1500, moves: 20, gemTypes: 4 },
  { level: 3, targetScore: 2000, moves: 20, gemTypes: 5 },
  { level: 4, targetScore: 2500, moves: 18, gemTypes: 5 },
  { level: 5, targetScore: 3000, moves: 18, gemTypes: 5 },
  { level: 6, targetScore: 3500, moves: 18, gemTypes: 6 },
  { level: 7, targetScore: 4000, moves: 16, gemTypes: 6 },
  { level: 8, targetScore: 4500, moves: 16, gemTypes: 6 },
  { level: 9, targetScore: 5000, moves: 15, gemTypes: 6 },
  { level: 10, targetScore: 6000, moves: 15, gemTypes: 6 },
]

// 响应式状态
const board = ref<Gem[]>([])
const selectedGem = ref<{ index: number } | null>(null)
const isAnimating = ref(false)
const score = ref(0)
const highScore = ref(0)
const movesLeft = ref(20)
const combo = ref(0)
const currentLevel = ref(1)
const maxLevel = ref(1)
const levelStars = ref<Record<number, number>>({})
const gameEnded = ref(false)
const levelCompleted = ref(false)
const failReason = ref('')
const scorePopups = ref<ScorePopup[]>([])

let gemIdCounter = 0
let comboTimer: number | null = null

// 计算属性
// @ts-ignore
const levelData = computed<LevelData>(() => {
  return levels[currentLevel.value - 1] || levels[0]
})

const scoreProgress = computed(() => {
  return Math.min(100, (score.value / levelData.value.targetScore) * 100)
})

const stars = computed(() => {
  const progress = score.value / levelData.value.targetScore
  if (progress >= 1.5) return 3
  if (progress >= 1.2) return 2
  if (progress >= 1.0) return 1
  return 0
})

// 获取宝石图标
const getGemIcon = (type: number, special?: 'bomb' | 'rainbow' | null): string => {
  if (special === 'bomb') return '💣'
  if (special === 'rainbow') return '🌈'

  const icons = ['💎', '💚', '💙', '💛', '💜', '🔴']
  return icons[type] || '💎'
}

// 初始化棋盘
const initBoard = (): void => {
  board.value = []
  const types = levelData.value.gemTypes

  for (let i = 0; i < boardSize * boardSize; i++) {
    let type: number
    do {
      type = Math.floor(Math.random() * types)
    } while (wouldCreateMatch(i, type))

    board.value.push({
      id: gemIdCounter++,
      type,
      special: null
    })
  }
}

// 检查是否会立即产生匹配
const wouldCreateMatch = (index: number, type: number): boolean => {
  const x = index % boardSize
  const y = Math.floor(index / boardSize)

  // 检查横向
  if (x >= 2) {
    const left1 = board.value[index - 1]
    const left2 = board.value[index - 2]
    if (left1?.type === type && left2?.type === type) {
      return true
    }
  }

  // 检查纵向
  if (y >= 2) {
    const up1 = board.value[index - boardSize]
    const up2 = board.value[index - boardSize * 2]
    if (up1?.type === type && up2?.type === type) {
      return true
    }
  }

  return false
}

// 处理宝石点击
const handleGemClick = (index: number): void => {
  if (isAnimating.value || gameEnded.value) return

  const gem = board.value[index]
  if (!gem || gem.type === -1) return

  if (!selectedGem.value) {
    // 选中宝石
    selectedGem.value = { index }
  } else {
    const selected = selectedGem.value.index

    if (selected === index) {
      // 点击同一个宝石，取消选择
      selectedGem.value = null
    } else if (isAdjacent(selected, index)) {
      // 交换相邻宝石
      swapGems(selected, index)
      selectedGem.value = null
    } else {
      // 选择新的宝石
      selectedGem.value = { index }
    }
  }
}

// 检查是否相邻
const isAdjacent = (index1: number, index2: number): boolean => {
  const x1 = index1 % boardSize
  const y1 = Math.floor(index1 / boardSize)
  const x2 = index2 % boardSize
  const y2 = Math.floor(index2 / boardSize)

  const dx = Math.abs(x1 - x2)
  const dy = Math.abs(y1 - y2)

  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1)
}

// 交换宝石
const swapGems = async (index1: number, index2: number): Promise<void> => {
  isAnimating.value = true

  // 交换
  const temp = board.value[index1]
  // @ts-ignore
  board.value[index1] = board.value[index2]
  // @ts-ignore
  board.value[index2] = temp

  await new Promise(resolve => setTimeout(resolve, 300))

  // 检查是否有匹配
  const matches1 = findMatches(index1)
  const matches2 = findMatches(index2)
  const hasMatch = matches1.length >= 3 || matches2.length >= 3

  if (!hasMatch) {
    // 没有匹配，换回来
    const temp = board.value[index1]
    // @ts-ignore
    board.value[index1] = board.value[index2]
    // @ts-ignore
    board.value[index2] = temp
    await new Promise(resolve => setTimeout(resolve, 300))
    isAnimating.value = false
  } else {
    // 有匹配，消耗步数
    movesLeft.value--
    combo.value = 1

    // 处理匹配
    await processMatches()

    // 检查游戏状态
    checkGameState()
  }
}

// 查找匹配
const findMatches = (index: number): number[] => {
  const gem = board.value[index]
  if (!gem) return []

  const x = index % boardSize
  const y = Math.floor(index / boardSize)
  const type = gem.type
  const matches = new Set<number>([index])

  // 横向检查
  let left = x - 1
  while (left >= 0 && board.value[y * boardSize + left]?.type === type) {
    matches.add(y * boardSize + left)
    left--
  }

  let right = x + 1
  while (right < boardSize && board.value[y * boardSize + right]?.type === type) {
    matches.add(y * boardSize + right)
    right++
  }

  const horizontalMatches = Array.from(matches)

  // 纵向检查
  matches.clear()
  matches.add(index)

  let up = y - 1
  while (up >= 0 && board.value[up * boardSize + x]?.type === type) {
    matches.add(up * boardSize + x)
    up--
  }

  let down = y + 1
  while (down < boardSize && board.value[down * boardSize + x]?.type === type) {
    matches.add(down * boardSize + x)
    down++
  }

  const verticalMatches = Array.from(matches)

  // 返回最长的匹配
  return horizontalMatches.length >= verticalMatches.length ? horizontalMatches : verticalMatches
}

// 查找所有匹配
const findAllMatches = (): Set<number> => {
  const allMatches = new Set<number>()

  for (let i = 0; i < board.value.length; i++) {
    const matches = findMatches(i)
    if (matches.length >= 3) {
      matches.forEach(m => allMatches.add(m))
    }
  }

  return allMatches
}

// 处理匹配
const processMatches = async (): Promise<void> => {
  let hasMatches = true

  while (hasMatches) {
    const matches = findAllMatches()

    if (matches.size === 0) {
      hasMatches = false
      break
    }

    // 标记为匹配
    matches.forEach(index => {
      // @ts-ignore
      board.value[index].matched = true
    })

    // 计算得分
    const matchScore = calculateScore(matches.size)
    score.value += matchScore

    // 显示得分弹窗
    const firstMatch = Array.from(matches)[0]
    // @ts-ignore
    showScorePopup(firstMatch, matchScore)

    // 检查是否产生特殊宝石
    checkSpecialGems(matches)

    await new Promise(resolve => setTimeout(resolve, 300))

    // 移除匹配的宝石
    matches.forEach(index => {
      board.value[index] = {
        id: gemIdCounter++,
        type: -1,
        special: null
      }
    })

    // 掉落
    await dropGems()

    // 填充新宝石
    fillBoard()

    await new Promise(resolve => setTimeout(resolve, 400))

    // 增加连击
    combo.value++
    resetComboTimer()
  }

  isAnimating.value = false
  combo.value = 0
}

// 掉落宝石
const dropGems = async (): Promise<void> => {
  const newBoard = [...board.value]

  for (let x = 0; x < boardSize; x++) {
    let writeY = boardSize - 1

    // 从底部向上扫描，保留非空宝石
    for (let y = boardSize - 1; y >= 0; y--) {
      const index = y * boardSize + x
      // @ts-ignore
      if (newBoard[index].type !== -1) {
        if (writeY !== y) {
          const newIndex = writeY * boardSize + x
          // @ts-ignore
          newBoard[newIndex] = { ...newBoard[index] }
          // @ts-ignore
          newBoard[newIndex].delay = (writeY - y) * 50
          newBoard[index] = {
            id: gemIdCounter++,
            type: -1,
            special: null
          }
        }
        writeY--
      }
    }
  }

  board.value = newBoard
}

// 填充棋盘
const fillBoard = (): void => {
  const types = levelData.value.gemTypes

  for (let i = 0; i < board.value.length; i++) {
    // @ts-ignore
    if (board.value[i].type === -1) {
      board.value[i] = {
        id: gemIdCounter++,
        type: Math.floor(Math.random() * types),
        special: null,
        delay: 100
      }
    }
  }

  // 清除延迟
  setTimeout(() => {
    board.value.forEach(gem => {
      gem.delay = 0
    })
  }, 500)
}

// 检查特殊宝石
const checkSpecialGems = (matches: Set<number>): void => {
  if (matches.size === 4) {
    // 4连消产生炸弹
    const index = Array.from(matches)[0]
    // @ts-ignore
    board.value[index].special = 'bomb'
  } else if (matches.size >= 5) {
    // 5连消产生彩虹
    const index = Array.from(matches)[0]
    // @ts-ignore
    board.value[index].special = 'rainbow'
  }
}

// 计算得分
const calculateScore = (matchCount: number): number => {
  const baseScore = matchCount * 10
  const comboBonus = (combo.value - 1) * 5
  return baseScore + comboBonus
}

// 显示得分弹窗
const showScorePopup = (index: number, scoreValue: number): void => {
  const popup: ScorePopup = {
    id: Date.now() + Math.random(),
    x: index % boardSize,
    y: Math.floor(index / boardSize),
    score: scoreValue
  }

  scorePopups.value.push(popup)

  setTimeout(() => {
    scorePopups.value = scorePopups.value.filter(p => p.id !== popup.id)
  }, 1000)
}

// 重置连击计时器
const resetComboTimer = (): void => {
  if (comboTimer) clearTimeout(comboTimer)

  comboTimer = window.setTimeout(() => {
    combo.value = 0
  }, 2000)
}

// 检查游戏状态
const checkGameState = (): void => {
  // 检查是否达成目标
  if (score.value >= levelData.value.targetScore) {
    levelCompleted.value = true
    gameEnded.value = true

    // 更新进度
    if (currentLevel.value >= maxLevel.value) {
      maxLevel.value = currentLevel.value + 1
    }

    // 更新星级
    const currentStars = stars.value
    // @ts-ignore
    if (!levelStars.value[currentLevel.value] || currentStars > levelStars.value[currentLevel.value]) {
      levelStars.value[currentLevel.value] = currentStars
    }

    // 更新最高分
    if (score.value > highScore.value) {
      highScore.value = score.value
    }

    saveProgress()
    return
  }

  // 检查是否还有步数
  if (movesLeft.value <= 0) {
    levelCompleted.value = false
    gameEnded.value = true
    failReason.value = '步数用完了！'
    return
  }

  // 检查是否还有可移动的位置
  if (!hasValidMoves()) {
    // 重新洗牌
    shuffleBoard()
  }
}

// 检查是否有有效移动
const hasValidMoves = (): boolean => {
  for (let i = 0; i < board.value.length; i++) {
    const neighbors = getNeighbors(i)

    for (const neighbor of neighbors) {
      // 模拟交换
      const temp = board.value[i]
      // @ts-ignore
      board.value[i] = board.value[neighbor]
      // @ts-ignore
      board.value[neighbor] = temp

      const matches1 = findMatches(i)
      const matches2 = findMatches(neighbor)
      const hasMatch = matches1.length >= 3 || matches2.length >= 3

      // 换回来
      // @ts-ignore
      board.value[neighbor] = board.value[i]
      // @ts-ignore
      board.value[i] = temp

      if (hasMatch) return true
    }
  }

  return false
}

// 获取邻居
const getNeighbors = (index: number): number[] => {
  const neighbors: number[] = []
  const x = index % boardSize
  const y = Math.floor(index / boardSize)

  if (x > 0) neighbors.push(index - 1)
  if (x < boardSize - 1) neighbors.push(index + 1)
  if (y > 0) neighbors.push(index - boardSize)
  if (y < boardSize - 1) neighbors.push(index + boardSize)

  return neighbors
}

// 洗牌
const shuffleBoard = (): void => {
  const types = board.value.map(g => g.type)

  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      // @ts-ignore
      ;[types[i], types[j]] = [types[j], types[i]]
  }

  board.value.forEach((gem, index) => {
    // @ts-ignore
    gem.type = types[index]
    gem.id = gemIdCounter++
  })
}

// 下一关
const nextLevel = (): void => {
  if (currentLevel.value < levels.length) {
    currentLevel.value++
    startLevel()
  }
}

// 选择关卡
const selectLevel = (level: number): void => {
  if (level <= maxLevel.value) {
    currentLevel.value = level
    startLevel()
  }
}

// 开始关卡
const startLevel = (): void => {
  score.value = 0
  movesLeft.value = levelData.value.moves
  combo.value = 0
  gameEnded.value = false
  levelCompleted.value = false
  failReason.value = ''
  selectedGem.value = null
  scorePopups.value = []

  initBoard()
}

// 重新开始关卡
const restartLevel = (): void => {
  startLevel()
}

// 重置进度
const resetProgress = (): void => {
  if (confirm('确定要重置所有进度吗？此操作不可恢复！')) {
    maxLevel.value = 1
    currentLevel.value = 1
    levelStars.value = {}
    highScore.value = 0
    saveProgress()
    startLevel()
  }
}

// 保存进度
const saveProgress = (): void => {
  const progress: GameProgress = {
    maxLevel: maxLevel.value,
    levelStars: levelStars.value,
    highScore: highScore.value
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// 加载进度
const loadProgress = (): void => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    try {
      const progress: GameProgress = JSON.parse(saved)
      maxLevel.value = progress.maxLevel || 1
      levelStars.value = progress.levelStars || {}
      highScore.value = progress.highScore || 0
    } catch (e) {
      console.error('Failed to load progress:', e)
    }
  }
}

// 初始化
onMounted(() => {
  loadProgress()
  startLevel()
})
</script>

<style lang="scss" scoped>
.match3-game {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 5px;


}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.level-banner {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 15px;
  }
}

.level-info {
  h2 {
    font-size: 1.8em;
    color: #667eea;
    margin: 0 0 10px 0;
  }
}

.level-stars {
  display: flex;
  gap: 5px;

  .star {
    font-size: 1.5em;
    opacity: 0.3;
    transition: all 0.3s;

    &.filled {
      opacity: 1;
      animation: starPop 0.3s ease-out;
    }
  }
}

@keyframes starPop {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

.level-objectives {
  display: flex;
  gap: 30px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-around;
  }
}

.objective {
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    font-size: 0.9em;
    color: #666;
  }

  .value {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;

    &.warning {
      color: #f44336;
      animation: pulse-warning 1s ease-in-out infinite;
    }
  }
}

@keyframes pulse-warning {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.board-container {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.board {
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  margin: 0 auto;
  position: relative;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 2px;

  &.locked {
    pointer-events: none;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    max-width: 400px;
  }
}

.gem {
  position: absolute;
  width: 12.5%;
  height: 12.5%;
  padding: 3px;
  transition: left 0.3s ease-out, top 0.3s ease-out, opacity 0.3s;
  cursor: pointer;
  pointer-events: all;
  z-index: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.matched {
    animation: gemPop 0.3s ease-out forwards;
    pointer-events: none;
  }

  &:hover:not(.matched):not(.hidden) {
    z-index: 5;

    .gem-inner {
      transform: scale(1.08);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }

  &.selected {
    z-index: 10;

    .gem-inner {
      transform: scale(1.15);
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
      border: 3px solid #ffd700;
    }
  }
}

@keyframes gemPop {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }

  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.gem-inner {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  pointer-events: none;
}

.gem-icon {
  font-size: 2em;
  user-select: none;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: 1.5em;
  }
}

.score-popups {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
}

.score-popup {
  position: absolute;
  font-size: 1.5em;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: scoreFloat 1s ease-out forwards;
  transform: translate(-50%, -50%);

  @media (max-width: 640px) {
    font-size: 1.2em;
  }
}

@keyframes scoreFloat {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -100px) scale(1.5);
    opacity: 0;
  }
}

.score-fade-enter-active,
.score-fade-leave-active {
  transition: opacity 0.3s;
}

.score-fade-enter-from,
.score-fade-leave-to {
  opacity: 0;
}

.sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 600px;
  }
}

.info-panel {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  h2 {
    font-size: 1.3em;
    color: #667eea;
    margin: 0 0 15px 0;
  }
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;

  &.main-score {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;

    .label {
      font-size: 0.9em;
    }

    .value {
      font-size: 2em;
    }
  }

  .label {
    color: #666;
  }

  .value {
    font-weight: bold;
    font-size: 1.2em;
    color: #333;

    &.combo {
      color: #ff6b6b;
      animation: comboShake 0.5s ease-in-out;
    }
  }
}

@keyframes comboShake {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-5deg);
  }

  75% {
    transform: rotate(5deg);
  }
}

.progress-bar {
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: -5px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
  transition: width 0.3s ease-out;
}

.levels-panel {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  h3 {
    font-size: 1.2em;
    color: #667eea;
    margin: 0 0 15px 0;
  }
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.level-badge {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  background: #f5f5f5;
  border: 2px solid #ddd;

  &.current {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
    transform: scale(1.1);
  }

  &.completed {
    background: #4caf50;
    color: white;
    border-color: #4caf50;
  }

  &.locked {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(.locked) {
    transform: scale(1.1);
  }

  .level-number {
    font-size: 1.2em;
  }

  .level-stars-mini {
    display: flex;
    gap: 2px;
    font-size: 0.6em;
  }
}

.controls {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  h3 {
    font-size: 1.2em;
    color: #667eea;
    margin: 0 0 10px 0;
  }

  p {
    margin: 8px 0;
    color: #666;
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
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
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

.reset-btn {
  background: #f44336;
  color: white;

  &:hover {
    background: #d32f2f;
    box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
  }
}

.next-btn {
  background: #4caf50;
  color: white;

  &:hover {
    background: #45a049;
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }
}

.back-btn {
  background: #9e9e9e;
  color: white;

  &:hover {
    background: #757575;
    box-shadow: 0 5px 15px rgba(158, 158, 158, 0.4);
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
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
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

.success-modal,
.fail-modal {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  min-width: 350px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
}

.success-modal {
  h2 {
    color: #4caf50;
  }
}

.fail-modal {
  h2 {
    color: #f44336;
  }

  .reason {
    color: #666;
    font-size: 1.1em;
    margin-bottom: 20px;
  }
}

.stars-earned {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;

  .big-star {
    font-size: 3em;
    opacity: 0.3;
    transition: all 0.3s;

    &.earned {
      opacity: 1;
      animation: starBounce 0.6s ease-out;
    }
  }
}

@keyframes starBounce {
  0% {
    transform: scale(0) rotate(0deg);
  }

  50% {
    transform: scale(1.3) rotate(180deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
  }
}

.final-score {
  font-size: 1.5em;
  margin: 15px 0;

  strong {
    color: #667eea;
    font-size: 1.2em;
  }
}

.best-score {
  color: #666;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
