<template>
    <div class="todo-container">
        <t-card title="TODO" class="todo-card" header-bordered>
            <!-- 统计信息 -->
            <div class="todo-stats">

                <div class="stat-item">

                    <t-statistic title="总计" :value="todos.length" unit="件" layout="horizontal" :trend="trends.total"
                        color="black">
                    </t-statistic>
                </div>
                <div class="stat-item">

                    <t-statistic title="已完成" :value="completedCount" unit="件" layout="horizontal"
                        :trend="trends.completed" color="green">
                    </t-statistic>
                </div>
                <div class="stat-item">

                    <t-statistic title="未完成" :value="uncompletedCount" unit="件" layout="horizontal" color="red"
                        :trend="trends.uncompleted">
                    </t-statistic>
                </div>
                <div class="stat-item">

                    <t-statistic title="完成率" :value="completionRate" unit="%" layout="horizontal" color="orange"
                        :trend="trends.completionRate">
                    </t-statistic>
                </div>
            </div>

            <!-- 进度条 -->
            <div class="todo-progress">
                <t-progress :percentage="completionRate" :color="{ from: '#0052D9', to: '#00A870' }" status="active"
                    theme="plump" />
            </div>

            <!-- 添加新TODO -->
            <div class="add-todo">
                <t-input v-model="newTodo" placeholder="请输入新的TODO事项" @enter="addTodo" class="todo-input" />
            </div>

            <!-- TODO列表 -->
            <div class="todo-list">
                <t-list :split="true" class="compact-list">
                    <t-list-item v-for="todo in currentPageTodos" :key="todo.id" class="todo-item">
                        <div class="todo-content">
                            <t-checkbox :model-value="todo.completed" @change="() => toggleTodo(todo.id)"
                                class="todo-checkbox" />
                            <span :class="{ 'todo-text': true, 'completed': todo.completed }">
                                {{ todo.text }}
                            </span>
                        </div>
                        <div class="todo-actions">
                            <div class="todo-icons">
                                <t-icon :name="todo.completed ? 'check-circle-filled' : 'time-filled'"
                                    :class="todo.completed ? 'completed-icon' : 'pending-icon'" />
                            </div>
                            <t-button variant="text" theme="danger" @click="() => deleteTodo(todo.id)"
                                class="delete-btn" size="small">
                                删除
                            </t-button>
                        </div>
                    </t-list-item>
                </t-list>
            </div>

            <!-- 分页 -->
            <div class="pagination-container">
                <t-pagination v-model="currentPage" :total="todos.length" :page-size="pageSize" @change="onPageChange"
                    show-jumper show-page-size :page-size-options="[5, 10, 20]" size="small" />
            </div>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

// =============== 类型定义 ===============
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface StatsSnapshot {
    total: number;
    completed: number;
    uncompleted: number;
    completionRate: number;
}

// =============== 工具函数 ===============
const loadFromStorage = <T>(key: string, fallback: T): T => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        console.warn(`[localStorage] 读取 ${key} 失败`, e);
        return fallback;
    }
};

const saveToStorage = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`[localStorage] 保存 ${key} 失败`, e);
    }
};

// =============== 初始数据 ===============
const defaultTodos: Todo[] = [
    { id: 1, text: '完成TODO页面开发', completed: false },
    { id: 2, text: '实现翻页功能', completed: false },
    { id: 3, text: '优化CSS样式', completed: false },
    { id: 4, text: '添加更多交互功能', completed: false },
    { id: 5, text: '编写单元测试', completed: false },
    { id: 6, text: '部署到生产环境', completed: false },
];

const todos = ref<Todo[]>(loadFromStorage('todos', defaultTodos));
const newTodo = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

// =============== 计算属性 ===============
const completedCount = computed(() => todos.value.filter(t => t.completed).length);
const uncompletedCount = computed(() => todos.value.length - completedCount.value);
const completionRate = computed(() =>
    todos.value.length ? Math.round((completedCount.value / todos.value.length) * 100) : 0
);

const currentPageTodos = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return todos.value.slice(start, start + pageSize.value);
});

// =============== 趋势计算 ===============
const calculateTrend = (
    current: number,
    previous: number
): 'increase' | 'decrease' | undefined => {
    if (current > previous) return 'increase';
    if (current < previous) return 'decrease';
    return undefined; // 无变化 → 不显示趋势
};

// 上次快照（用于对比）
const previousStats = ref<StatsSnapshot>(
    loadFromStorage('todoPreviousStats', {
        total: todos.value.length,
        completed: completedCount.value,
        uncompleted: uncompletedCount.value,
        completionRate: completionRate.value,
    })
);

// 实时趋势（computed 自动更新）
const trends = computed(() => ({
    total: calculateTrend(todos.value.length, previousStats.value.total),
    completed: calculateTrend(completedCount.value, previousStats.value.completed),
    uncompleted: calculateTrend(uncompletedCount.value, previousStats.value.uncompleted),
    completionRate: calculateTrend(completionRate.value, previousStats.value.completionRate),
}));

// =============== 自动保存 + 更新快照 ===============
watch(
    () => ({
        total: todos.value.length,
        completed: completedCount.value,
        uncompleted: uncompletedCount.value,
        completionRate: completionRate.value,
    }),
    (currentStats, oldStats) => {
        // 保存 todos
        saveToStorage('todos', todos.value);
        // 更新快照（用于下次趋势对比）
        if (oldStats) {
            previousStats.value = oldStats;
            saveToStorage('todoPreviousStats', oldStats);
        }
    },
    { deep: true }
);

// =============== 用户操作 ===============
const addTodo = () => {
    const text = newTodo.value.trim();
    if (!text) {
        MessagePlugin.warning('请输入TODO内容');
        return;
    }

    const maxId = todos.value.length > 0 ? Math.max(...todos.value.map(t => t.id)) : 0;
    todos.value.unshift({ id: maxId + 1, text, completed: false });
    newTodo.value = '';
    currentPage.value = 1;
    MessagePlugin.success('添加成功');
};

const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        MessagePlugin.success(todo.completed ? '已标记为完成' : '已标记为未完成');
    }
};

const deleteTodo = (id: number) => {
    const index = todos.value.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.value.splice(index, 1);
        MessagePlugin.success('删除成功');

        if (currentPageTodos.value.length === 0 && currentPage.value > 1) {
            currentPage.value--;
        }
    }
};

const onPageChange = (pageInfo: { current: number; pageSize: number }) => {
    currentPage.value = pageInfo.current;
    pageSize.value = pageInfo.pageSize;
};
</script>

<style lang="scss" scoped>
.todo-container {
    padding-top: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.todo-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .stat-item {
        flex: 1;
        text-align: center;
    }
}

.todo-progress {
    margin-bottom: 16px;
}

.add-todo {
    margin-bottom: 16px;

    .todo-input {
        width: 80%;
        display: flex;
        margin: 0 auto;
    }
}

.todo-list {
    margin-bottom: 16px;
    min-height: 300px;
}

:deep(.compact-list) {
    .t-list-item {
        padding: 8px 0 !important;
    }
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-content {
    display: flex;
    align-items: center;
    flex: 1;

    .todo-checkbox {
        margin-right: 8px;
    }

    .todo-text {
        font-size: 14px;
        transition: all 0.2s;

        &.completed {
            text-decoration: line-through;
            color: #999;
            opacity: 0.7;
        }
    }
}

.todo-actions {
    display: flex;
    align-items: center;
    gap: 8px;

    .todo-icons {
        .completed-icon {
            color: #00a870;
            font-size: 16px;
        }

        .pending-icon {
            color: #ed7b2f;
            font-size: 16px;
        }
    }

    .delete-btn {
        padding: 2px 4px;
        font-size: 12px;
    }
}
</style>