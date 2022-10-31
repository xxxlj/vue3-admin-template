<template>
  <div v-if="!props.item.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(props.item.children, props.item) &&
        (!state.onlyOneChild.children || state.onlyOneChild.noShowingChildren)
      "
    >
      <app-link :to="resolvePath(state.onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(state.onlyOneChild.path)"
          :class="{ 'sub-menu-title-noDropdown': !isNest }"
        >
          <template #title>{{ state.onlyOneChild.meta.title }}</template>
          <menu-item
            :icon="
              state.onlyOneChild.meta.icon ||
              (props.item.meta && props.item.meta.icon)
            "
            :isElIcon="
              state.onlyOneChild.meta.isElIcon ||
              (props.item.meta && props.item.meta.isElIcon)
            "
            :title="state.onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(props.item.path)"
      popper-append-to-body
    >
      <template #title>
        <menu-item
          v-if="props.item.meta"
          :icon="props.item.meta && props.item.meta.icon"
          :isElIcon="props.item.meta && props.item.meta.isElIcon"
          :title="props.item.meta.title"
          :is-nest="true"
        />
      </template>
      <side-bar-item
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script setup lang="ts">
import { resolve } from "path-browserify";
import { reactive } from "vue";
import type { iObj, iState } from "./type";
import { isExternal } from "@/common/utils/validate";
import menuItem from "@/layout/components/sideBar/item.vue";
import AppLink from "@/layout/components/sideBar/link.vue";

const props = defineProps({
  item: {
    // 路由信息
    type: Object,
    required: true,
  },
  isNest: {
    // 是否有下级菜单
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const state: iState = reactive({
  onlyOneChild: {},
});
const hasOneShowingChild = (children: iObj[] = [], parent: iObj) => {
  const showingChildren = children.filter((item) => {
    if (item.meta?.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      state.onlyOneChild = item;
      return true;
    }
  });
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    state.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return resolve(props.basePath, routePath);
};
</script>
<script lang="ts">
export default {
  name: "SideBarItem",
};
</script>
<style lang="less" scoped></style>
