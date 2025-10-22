<template>
    <div class="container">
        <div class="login-container">
            <div class="login-content">
                <div class="login-header">
                    <h1 class="login-title">StarIT</h1>
                    <p class="login-subtitle">欢迎回来，请登录您的账户</p>
                </div>

                <t-card class="login-card">
                    <t-tabs v-model="loginType" placement="top">
                        <t-tab-panel value="account" label="账号登录">
                            <t-form ref="accountForm" :data="accountFormData" :rules="accountRules" class="login-form">
                                <div class="form-item"> <t-input v-model="accountFormData.username" placeholder="用户名或邮箱"
                                        size="large" prefix-icon="账号：" /></div>


                                <div class="form-item"> <t-input v-model="accountFormData.password" type="password"
                                        placeholder="密码" size="large" prefix-icon="密码：" /></div>

                                <div class="form-item login-options">
                                    <t-checkbox v-model="accountFormData.rememberMe">记住我</t-checkbox>
                                    <t-button variant="text" theme="primary">忘记密码？</t-button>
                                </div>
                                <div class="form-item">
                                    <t-button theme="primary" size="large" block>
                                        登录
                                    </t-button>
                                </div>
                            </t-form>
                        </t-tab-panel>

                        <t-tab-panel value="phone" label="手机登录">
                            <t-form ref="phoneForm" :data="phoneFormData" :rules="phoneRules" class="login-form">
                                <div class="form-item">
                                    <t-input v-model="phoneFormData.phone" placeholder="请输入手机号" size="large"
                                        prefix-icon="手机号：" />
                                </div>



                                <div class="form-item captcha-input">
                                    <t-input v-model="phoneFormData.captcha" placeholder="请输入验证码" size="large"
                                        prefix-icon="验证码：" />
                                    <t-button variant="outline" :disabled="captchaCountdown > 0">
                                        {{ captchaCountdown > 0 ? `${captchaCountdown}s后重试` : '获取验证码' }}
                                    </t-button>
                                </div>
                                <div class="form-item">
                                    <t-button theme="primary" size="large" block>
                                        登录
                                    </t-button>
                                </div>
                            </t-form>
                        </t-tab-panel>
                    </t-tabs>

                    <div class="divider">
                        <span>其他登录方式</span>
                    </div>

                    <div class="third-party-login">
                        <t-space size="large">
                            <t-button shape="circle" variant="outline">
                                <template #icon>
                                    <t-icon name="logo-wechat-stroke" />
                                </template>
                            </t-button>
                            <t-button shape="circle" variant="outline">
                                <template #icon>
                                    <t-icon name="logo-qq" />
                                </template>
                            </t-button>
                            <t-button shape="circle" variant="outline">
                                <template #icon>
                                    <t-icon name="logo-github" />
                                </template>
                            </t-button>
                        </t-space>
                    </div>

                    <div class="register-link">
                        <span>还没有账户？</span>
                        <t-button variant="text" theme="primary">立即注册</t-button>
                    </div>
                </t-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 登录类型
const loginType = ref('account');

// 验证码倒计时
const captchaCountdown = ref(0);

// 账号登录表单数据
const accountFormData = reactive({
    username: '',
    password: '',
    rememberMe: false
});

// 账号登录表单验证规则
const accountRules = {
    username: [
        { required: true, message: '请输入用户名或邮箱', type: 'error' },
        { min: 3, message: '用户名长度不能少于3个字符', type: 'error' }
    ],
    password: [
        { required: true, message: '请输入密码', type: 'error' },
        { min: 6, message: '密码长度不能少于6个字符', type: 'error' }
    ]
};

// 手机登录表单数据
const phoneFormData = reactive({
    phone: '',
    captcha: ''
});

// 手机登录表单验证规则
const phoneRules = {
    phone: [
        { required: true, message: '请输入手机号', type: 'error' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', type: 'error' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', type: 'error' },
        { len: 6, message: '验证码长度为6位', type: 'error' }
    ]
};
</script>

<style lang="scss" scoped>
.container {
    padding: 50px;
    // min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
}

.login-container {
    width: 100%;
    max-width: 400px;
}

.login-content {
    .login-header {
        text-align: center;
        margin-bottom: 24px;

        .login-title {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            margin: 0;
        }

        .login-subtitle {
            font-size: 14px;
            color: #666;
            margin-top: 8px;
        }
    }

    .login-card {
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        background: #ffffff;
        border: 1px solid #e0e0e0;

        :deep(.t-tabs__nav) {
            justify-content: center;
            margin-bottom: 24px;
        }

        :deep(.t-tab-nav-item) {
            font-weight: 500;
        }

        .login-form {
            width: 100%;

            .form-item {
                margin-bottom: 12px;
            }
        }
    }

    .captcha-input {
        display: flex;
        gap: 5px;
        align-items: center;

        .t-input {
            flex: 1;
        }

        .t-button {
            width: auto;
            min-width: 80px;
        }
    }

    .login-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .divider {
        position: relative;
        margin: 24px 0;
        text-align: center;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 42%;
            height: 1px;
            background: #e0e0e0;
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }

        span {
            position: relative;
            z-index: 1;
            background: #fff;
            padding: 0 12px;
            color: #999;
            font-size: 14px;
        }
    }

    .third-party-login {
        text-align: center;
        margin-bottom: 20px;

        .t-button {
            width: 48px;
            height: 48px;
        }
    }

    .register-link {
        text-align: center;
        font-size: 14px;
        color: #666;

        .t-button {
            padding: 0;
            margin-left: 6px;
        }
    }
}
</style>