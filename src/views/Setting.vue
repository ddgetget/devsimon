<template>
    <div class="setting-container">
        <t-tabs v-model="activeTab" placement="top">
            <t-tab-panel value="system" label="系统设置">
                <t-card title="系统设置" bordered>
                    <t-form :data="systemSettings" labelWidth="120px">
                        <t-form-item label="系统语言">
                            <t-select v-model="systemSettings.language" placeholder="请选择语言">
                                <t-option value="zh-CN" label="简体中文" />
                                <t-option value="en-US" label="English" />
                                <t-option value="ja-JP" label="日本語" />
                            </t-select>
                        </t-form-item>

                        <t-form-item label="时区设置">
                            <t-select v-model="systemSettings.timezone" placeholder="请选择时区">
                                <t-option value="Asia/Shanghai" label="中国标准时间 (GMT+8)" />
                                <t-option value="America/New_York" label="美国东部时间 (GMT-5)" />
                                <t-option value="Europe/London" label="格林威治时间 (GMT+0)" />
                                <t-option value="Asia/Tokyo" label="日本标准时间 (GMT+9)" />
                            </t-select>
                        </t-form-item>

                        <t-form-item label="自动保存">
                            <t-switch v-model="systemSettings.autoSave" />
                            <span class="form-item-desc">开启后，系统将自动保存您的操作</span>
                        </t-form-item>

                        <t-form-item label="自动保存间隔">
                            <t-input-number v-model="systemSettings.autoSaveInterval" :min="1" :max="60"
                                :disabled="!systemSettings.autoSave" />
                            <span class="form-item-desc">分钟</span>
                        </t-form-item>

                        <t-form-item>
                            <t-space>
                                <t-button theme="primary" @click="saveSystemSettings">保存设置</t-button>
                                <t-button theme="default" @click="resetSystemSettings">重置</t-button>
                            </t-space>
                        </t-form-item>
                    </t-form>
                </t-card>
            </t-tab-panel>

            <t-tab-panel value="theme" label="主题设置">
                <t-card title="主题设置" bordered>
                    <t-form :data="themeSettings" labelWidth="120px">
                        <t-form-item label="主题模式">
                            <t-radio-group v-model="themeSettings.mode">
                                <t-radio value="light">浅色模式</t-radio>
                                <t-radio value="dark">深色模式</t-radio>
                                <t-radio value="auto">跟随系统</t-radio>
                            </t-radio-group>
                        </t-form-item>

                        <t-form-item label="主题颜色">
                            <div class="color-picker-group">
                                <div v-for="color in themeColors" :key="color.name" class="color-item"
                                    :class="{ active: themeSettings.primaryColor === color.value }"
                                    :style="{ backgroundColor: color.value }" @click="selectThemeColor(color.value)">
                                    <t-icon v-if="themeSettings.primaryColor === color.value" name="check" />
                                </div>
                            </div>
                        </t-form-item>

                        <t-form-item label="字体大小">
                            <t-slider v-model="themeSettings.fontSize" :min="12" :max="20"
                                :marks="{ 12: '小', 14: '标准', 16: '大', 18: '特大', 20: '超大' }" />
                        </t-form-item>

                        <t-form-item label="紧凑模式">
                            <t-switch v-model="themeSettings.compact" />
                            <span class="form-item-desc">开启后，界面元素将更加紧凑</span>
                        </t-form-item>

                        <t-form-item>
                            <t-space>
                                <t-button theme="primary" @click="saveThemeSettings">保存设置</t-button>
                                <t-button theme="default" @click="resetThemeSettings">重置</t-button>
                            </t-space>
                        </t-form-item>
                    </t-form>
                </t-card>
            </t-tab-panel>

            <t-tab-panel value="notification" label="通知设置">
                <t-card title="通知设置" bordered>
                    <t-form :data="notificationSettings" labelWidth="120px">
                        <t-form-item label="桌面通知">
                            <t-switch v-model="notificationSettings.desktop" />
                            <span class="form-item-desc">允许系统发送桌面通知</span>
                        </t-form-item>

                        <t-form-item label="声音提醒">
                            <t-switch v-model="notificationSettings.sound" />
                            <span class="form-item-desc">接收通知时播放提示音</span>
                        </t-form-item>

                        <t-form-item label="邮件通知">
                            <t-switch v-model="notificationSettings.email" />
                            <span class="form-item-desc">重要事件将通过邮件通知</span>
                        </t-form-item>

                        <t-form-item label="通知类型">
                            <t-checkbox-group v-model="notificationSettings.types">
                                <t-checkbox value="system">系统通知</t-checkbox>
                                <t-checkbox value="message">消息通知</t-checkbox>
                                <t-checkbox value="task">任务提醒</t-checkbox>
                                <t-checkbox value="security">安全提醒</t-checkbox>
                            </t-checkbox-group>
                        </t-form-item>

                        <t-form-item label="免打扰时段">
                            <t-time-range-picker v-model="notificationSettings.quietHours" format="HH:mm" />
                        </t-form-item>

                        <t-form-item>
                            <t-space>
                                <t-button theme="primary" @click="saveNotificationSettings">保存设置</t-button>
                                <t-button theme="default" @click="resetNotificationSettings">重置</t-button>
                            </t-space>
                        </t-form-item>
                    </t-form>
                </t-card>
            </t-tab-panel>

            <t-tab-panel value="privacy" label="隐私设置">
                <t-card title="隐私设置" bordered>
                    <t-form :data="privacySettings" labelWidth="120px">
                        <t-form-item label="在线状态">
                            <t-switch v-model="privacySettings.onlineStatus" />
                            <span class="form-item-desc">允许其他用户查看您的在线状态</span>
                        </t-form-item>

                        <t-form-item label="活动记录">
                            <t-switch v-model="privacySettings.activityHistory" />
                            <span class="form-item-desc">保存您的活动历史记录</span>
                        </t-form-item>

                        <t-form-item label="数据分析">
                            <t-switch v-model="privacySettings.analytics" />
                            <span class="form-item-desc">允许收集使用数据以改善产品体验</span>
                        </t-form-item>

                        <t-form-item label="个性化推荐">
                            <t-switch v-model="privacySettings.recommendations" />
                            <span class="form-item-desc">基于您的使用习惯提供个性化内容</span>
                        </t-form-item>

                        <t-form-item label="数据保留期限">
                            <t-select v-model="privacySettings.dataRetention" placeholder="请选择数据保留期限">
                                <t-option value="30" label="30天" />
                                <t-option value="90" label="90天" />
                                <t-option value="180" label="180天" />
                                <t-option value="365" label="1年" />
                                <t-option value="0" label="永久保留" />
                            </t-select>
                        </t-form-item>

                        <t-form-item>
                            <t-space>
                                <t-button theme="primary" @click="savePrivacySettings">保存设置</t-button>
                                <t-button theme="default" @click="resetPrivacySettings">重置</t-button>
                            </t-space>
                        </t-form-item>
                    </t-form>
                </t-card>
            </t-tab-panel>
        </t-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

// 当前激活的标签页
const activeTab = ref('system');

// 系统设置
const systemSettings = reactive({
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    autoSave: true,
    autoSaveInterval: 5
});

// 原始系统设置
const originalSystemSettings = { ...systemSettings };

// 主题设置
const themeSettings = reactive({
    mode: 'light',
    primaryColor: '#0052d9',
    fontSize: 14,
    compact: false
});

// 原始主题设置
const originalThemeSettings = { ...themeSettings };

// 主题颜色选项
const themeColors = [
    { name: '默认蓝', value: '#0052d9' },
    { name: '成功绿', value: '#00a870' },
    { name: '警告橙', value: '#ed7b2f' },
    { name: '错误红', value: '#d54941' },
    { name: '中性灰', value: '#4d4d4d' },
    { name: '紫色', value: '#722ed1' },
    { name: '青色', value: '#13c2c2' },
    { name: '粉色', value: '#eb2f96' }
];

// 通知设置
const notificationSettings = reactive({
    desktop: true,
    sound: true,
    email: false,
    types: ['system', 'message', 'security'],
    quietHours: ['22:00', '08:00']
});

// 原始通知设置
const originalNotificationSettings = { ...notificationSettings };

// 隐私设置
const privacySettings = reactive({
    onlineStatus: true,
    activityHistory: true,
    analytics: false,
    recommendations: true,
    dataRetention: '90'
});

// 原始隐私设置
const originalPrivacySettings = { ...privacySettings };

// 选择主题颜色
const selectThemeColor = (color: string) => {
    themeSettings.primaryColor = color;
};

// 保存系统设置
const saveSystemSettings = () => {
    Object.assign(originalSystemSettings, systemSettings);
    MessagePlugin.success('系统设置保存成功');
};

// 重置系统设置
const resetSystemSettings = () => {
    Object.assign(systemSettings, originalSystemSettings);
    MessagePlugin.info('已重置为上次保存的系统设置');
};

// 保存主题设置
const saveThemeSettings = () => {
    Object.assign(originalThemeSettings, themeSettings);
    MessagePlugin.success('主题设置保存成功');
};

// 重置主题设置
const resetThemeSettings = () => {
    Object.assign(themeSettings, originalThemeSettings);
    MessagePlugin.info('已重置为上次保存的主题设置');
};

// 保存通知设置
const saveNotificationSettings = () => {
    Object.assign(originalNotificationSettings, notificationSettings);
    MessagePlugin.success('通知设置保存成功');
};

// 重置通知设置
const resetNotificationSettings = () => {
    Object.assign(notificationSettings, originalNotificationSettings);
    MessagePlugin.info('已重置为上次保存的通知设置');
};

// 保存隐私设置
const savePrivacySettings = () => {
    Object.assign(originalPrivacySettings, privacySettings);
    MessagePlugin.success('隐私设置保存成功');
};

// 重置隐私设置
const resetPrivacySettings = () => {
    Object.assign(privacySettings, originalPrivacySettings);
    MessagePlugin.info('已重置为上次保存的隐私设置');
};
</script>

<style lang="scss" scoped>
.setting-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    .form-item-desc {
        margin-left: 8px;
        font-size: 12px;
        color: var(--td-text-color-secondary);
    }

    .color-picker-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .color-item {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;

            &.active {
                border-color: var(--td-brand-color);
            }

            .t-icon {
                color: white;
                font-size: 16px;
            }
        }
    }
}
</style>