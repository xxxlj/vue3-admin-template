<template>
  <div :class="{ 'has-logo': appStore.sidebarLogo }">
    <logo v-if="appStore.sidebarLogo" :collapse="!isOpen" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :collapse="!isOpen"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import logo from "@/layout/components/sideBar/logo.vue";
import { useAppStore } from "@/stores";
import { toRef, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import variables from "@/assets/css/variable.module.less";
import SidebarItem from "@/layout/components/sideBar/sideBarItem.vue";
const appStore = useAppStore();
/**
 * tips: 直接取值或es6解构会导致响应式丢失
 * 解决方案1: 用toRef转为响应式
 * 解决方案2: 直接在html中使用 <logo v-if="appStore.sidebarLogo" :collapse="appStore.sidebar.opened" />
 */
const isOpen = toRef(appStore.sidebar, "opened");

const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const router = useRouter();
const routes = router.options.routes;
</script>
<style lang="less" scoped></style>
