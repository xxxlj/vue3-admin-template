<template>
  <div class="app-wrapper" :class="isOpen ? 'openSidebar' : 'hideSidebar'">
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': appStore.fixedHeader }">
        <nav-bar />
      </div>
      <app-main> </app-main>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from "@/layout/components/sideBar/index.vue";
import AppMain from "@/layout/components/appMain.vue";
import NavBar from "@/layout/components/navBar.vue";
import { toRef } from "vue";
import { useAppStore } from "@/stores";
const appStore = useAppStore();
const isOpen = toRef(appStore.sidebar, "opened");
</script>
<style lang="less" scoped>
@import "@/assets/css/mixin.less";
.app-wrapper {
  .clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - @miniSideBarWidth);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
