<!-- App.vue 或任意页面 -->
<template>
  <div>
    <t-button block @click="switchTheme('red')">默认主题</t-button>
    <t-button block theme="primary" @click="switchTheme('default')">暗色主题</t-button>


    <!-- 你的业务组件 -->
    <t-cell title="示例 Cell" />
  </div>
</template>

<script setup lang="ts">
import { switchTheme } from '@/utils/theme';
</script>