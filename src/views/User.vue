<template>
    <div class="user-container">
        <t-card title="用户信息" bordered>
            <div class="user-profile">
                <div class="avatar-section">
                    <t-avatar size="large" :image="userInfo.avatar" alt="用户头像">
                        {{ userInfo.name?.charAt(0) }}
                    </t-avatar>
                    <t-button theme="primary" variant="text" class="change-avatar-btn">
                        更换头像
                    </t-button>
                </div>

                <div class="info-section">
                    <t-form :data="userInfo" labelWidth="100px">
                        <t-form-item label="用户名">
                            <t-input v-model="userInfo.name" placeholder="请输入用户名" />
                        </t-form-item>

                        <t-form-item label="邮箱">
                            <t-input v-model="userInfo.email" placeholder="请输入邮箱" />
                        </t-form-item>

                        <t-form-item label="手机号">
                            <t-input v-model="userInfo.phone" placeholder="请输入手机号" />
                        </t-form-item>

                        <t-form-item label="部门">
                            <t-select v-model="userInfo.department" placeholder="请选择部门">
                                <t-option value="tech" label="技术部" />
                                <t-option value="product" label="产品部" />
                                <t-option value="design" label="设计部" />
                                <t-option value="hr" label="人力资源部" />
                            </t-select>
                        </t-form-item>

                        <t-form-item label="职位">
                            <t-input v-model="userInfo.position" placeholder="请输入职位" />
                        </t-form-item>

                        <t-form-item label="个人简介">
                            <t-textarea v-model="userInfo.bio" placeholder="请输入个人简介" :autosize="{ minRows: 3 }" />
                        </t-form-item>

                        <t-form-item>
                            <t-space>
                                <t-button theme="primary" @click="saveUserInfo">保存</t-button>
                                <t-button theme="default" @click="resetUserInfo">重置</t-button>
                            </t-space>
                        </t-form-item>
                    </t-form>
                </div>
            </div>
        </t-card>

        <t-card title="账户安全" bordered class="security-card">
            <t-list>
                <t-list-item>
                    <div class="security-item">
                        <div class="security-info">
                            <div class="security-title">登录密码</div>
                            <div class="security-desc">建议定期更换密码，确保账户安全</div>
                        </div>
                        <t-button variant="text" theme="primary">修改</t-button>
                    </div>
                </t-list-item>

                <t-list-item>
                    <div class="security-item">
                        <div class="security-info">
                            <div class="security-title">绑定手机</div>
                            <div class="security-desc">已绑定：{{ userInfo.phone || '未绑定' }}</div>
                        </div>
                        <t-button variant="text" theme="primary">修改</t-button>
                    </div>
                </t-list-item>

                <t-list-item>
                    <div class="security-item">
                        <div class="security-info">
                            <div class="security-title">绑定邮箱</div>
                            <div class="security-desc">已绑定：{{ userInfo.email || '未绑定' }}</div>
                        </div>
                        <t-button variant="text" theme="primary">修改</t-button>
                    </div>
                </t-list-item>
            </t-list>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

// 用户信息数据
const userInfo = reactive({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    department: 'tech',
    position: '前端工程师',
    bio: '热爱编程，专注于前端开发，擅长Vue、React等框架。',
    avatar: ''
});

// 原始用户信息，用于重置
const originalUserInfo = { ...userInfo };

// 保存用户信息
const saveUserInfo = () => {
    // 这里可以添加API调用保存用户信息
    Object.assign(originalUserInfo, userInfo);
    MessagePlugin.success('用户信息保存成功');
};

// 重置用户信息
const resetUserInfo = () => {
    Object.assign(userInfo, originalUserInfo);
    MessagePlugin.info('已重置为上次保存的信息');
};
</script>

<style lang="scss" scoped>
.user-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    .user-profile {
        display: flex;
        gap: 40px;

        .avatar-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;

            .change-avatar-btn {
                font-size: 14px;
            }
        }

        .info-section {
            flex: 1;
        }
    }

    .security-card {
        margin-top: 20px;

        .security-item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .security-info {
                .security-title {
                    font-weight: 500;
                    margin-bottom: 4px;
                }

                .security-desc {
                    font-size: 14px;
                    color: var(--td-text-color-secondary);
                }
            }
        }
    }
}
</style>