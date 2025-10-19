<template>
  <t-layout>
    <t-aside class="aside">

      <t-menu theme="light" default-value="item2" :width="180">
        <template #logo>
          你啊后
        </template>
        <t-menu-group title="主导航">
          <t-menu-item value="item1" to="/">
            <template #icon>
              <t-icon name="app" />
            </template>
            仪表盘
          </t-menu-item>
        </t-menu-group>
        <t-menu-group title="组件">
          <t-submenu title="列表项" value="2-1">
            <template #icon>
              <t-icon name="server" />
            </template>
            <t-menu-item value="2-1-1" to="/about">基础列表项</t-menu-item>


            <t-menu-item value="2-1-3">筛选列表项</t-menu-item>
            <t-menu-item value="2-1-4">树状筛选列表项</t-menu-item>
          </t-submenu>
          <t-menu-item value="2-2">
            <template #icon>
              <t-icon name="edit-1" />
            </template>
            表单项
          </t-menu-item>
          <t-menu-item value="2-3">
            <template #icon>
              <t-icon name="root-list" />
            </template>
            详情页
          </t-menu-item>
          <t-menu-item value="2-4">
            <template #icon>
              <t-icon name="check" />
            </template>
            结果页
          </t-menu-item>
        </t-menu-group>
        <t-menu-group title="更多">
          <t-menu-item value="item3">
            <template #icon>
              <t-icon name="user" />
            </template>
            个人页
          </t-menu-item>
          <t-menu-item value="item4">
            <template #icon>
              <t-icon name="login" />
            </template>
            登录页
          </t-menu-item>
        </t-menu-group>

      </t-menu>


    </t-aside>
    <t-layout>
      <t-header>sadsaf</t-header>
      <t-content>
        <div>
          <RouterView />
        </div>
      </t-content>
      <t-footer>Copyright @ 2005-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer>
    </t-layout>
  </t-layout>
</template>


<script setup lang='ts'>
import { ref } from 'vue';

</script>


<style lang="less" scoped>
.aside {
  transition: width 0.3s ease;
  width: 180px;
}
</style>