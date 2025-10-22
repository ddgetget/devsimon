<!-- App.vue 或任意页面 -->
<template>
  <div>
    <!-- <t-button @click="switchTheme('red')">默认主题</t-button>
    <t-button @click="switchTheme('dark')">暗色主题</t-button> -->
    <t-button>默认主题</t-button>
    <t-button>暗色主题</t-button>

    <!-- 你的业务组件 -->

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, onBeforeMount } from 'vue'
// import { switchTheme } from '@/utils/theme';
onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
}) 
</script>