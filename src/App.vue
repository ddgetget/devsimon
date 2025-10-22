<template>
  <t-layout>
    <t-header>
      <t-head-menu theme="light">
        <template #logo><t-icon name="sitemap" size="42" />
          <h2>西蒙大杂烩</h2>
        </template>
        <t-menu-item :value="item.value" v-for="item in HeadMenuList" :key="item.value" :to="item.to"> {{
          item.label
        }}
          <template #icon v-if="item.icon">
            <t-icon :name="item.icon" />
          </template>
        </t-menu-item>

        <t-menu-item value="item4" :disabled="true"> 待开发 </t-menu-item>
        <template #operations>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="search" /></template>
          </t-button>

          <t-button variant="text" shape="square" @click="$router.push('/user')">
            <template #icon><t-icon name="user" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="setting" @click="$router.push('/setting')" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="login" @click="$router.push('/login')" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="logout" @click="$router.push('/logout')" /></template>
          </t-button>
        </template>
      </t-head-menu>
    </t-header>
    <t-content class="content">
      <RouterView></RouterView>
    </t-content>
    <t-footer class="footer"> Copyright©2011-2025 simoncome.com All Rights Reserved京ICP备2011129378号

    </t-footer>
  </t-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import { HeadMenuList } from '@/api/menu'

</script>
<style lang='scss' scoped>
.content {
  background-color: #FFFFFF;
}

.footer {
  text-align: center;
  padding: 10px;
  background-color: #FFFFFF;

}
</style>