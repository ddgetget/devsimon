<!-- src/components/Layout.vue -->
<template>
    <div class="container">

        <div :style="{ width: collapsed ? '64px' : '230px' }">
            <t-menu theme="light" default-value="/" :collapsed="collapsed">
                <!-- Logo -->
                <template #logo>
                    <t-icon name="palette-1" size="30" v-if="!collapsed" />

                    <h3 v-if="!collapsed">原型开发</h3>

                    <t-icon :name="iconName" size="30" @click="changeCollapsed" />
                </template>

                <!-- 菜单组遍历 -->
                <t-menu-group v-for="(group, gIndex) in LeftMenuList" :key="gIndex" :title="group.title">
                    <!-- 一级菜单项遍历 -->
                    <template v-for="item in group.children" :key="item.value">
                        <!-- 普通菜单项 -->
                        <t-menu-item v-if="item.type === 'item'" :value="item.value" :to="item.value">
                            <template #icon v-if="item.icon">
                                <t-icon :name="item.icon" />
                            </template>
                            {{ item.label }}
                        </t-menu-item>

                        <!-- 带二级的子菜单 -->
                        <t-submenu v-else-if="item.type === 'submenu'" :value="item.value" :title="item.label">
                            <template #icon v-if="item.icon">
                                <t-icon :name="item.icon" />
                            </template>
                            <t-menu-item
                                v-for="subItem in item.type === 'submenu' && 'children' in item ? item.children : []"
                                :key="subItem.value" :value="subItem.value" :to="subItem.value">
                                {{ subItem.label }}
                            </t-menu-item>
                        </t-submenu>
                    </template>
                </t-menu-group>
            </t-menu>
        </div>
        <!-- 右侧内容 -->
        <div style="flex: 1;" class="content-container">
            <router-view />
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ButtonProps } from 'tdesign-vue-next';
const collapsed = ref(false);
import { LeftMenuList } from '@/api/menu'

const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));
const changeCollapsed: ButtonProps['onClick'] = () => {
    collapsed.value = !collapsed.value;
};



</script>

<style lang="scss" scoped>
.container {
    display: flex;
}

.content-container {
    padding: 5px;


}
</style>