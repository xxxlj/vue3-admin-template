<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in state.levelList"
        :key="item.path"
      >
        <span
          v-if="
            item.meta.redirect === 'noRedirect' ||
            index == state.levelList.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import * as pathToRegexp from "path-to-regexp";
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
type iObj = {
  [x: string]: any;
};
type iState = {
  levelList: iObj[];
};
const state: iState = reactive({
  levelList: [],
});
const isHome = (route: iObj) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
};
const getBreadcrumb = () => {
  let matched: iObj[] = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];
  if (!isHome(first)) {
    matched = [{ path: "/home", meta: { title: "Home" } }, ...matched];
  }
  state.levelList = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};
watch(
  () => router.currentRoute.value.path,
  () => {
    getBreadcrumb();
  },
  { immediate: true }
);
const pathCompile = (path: string) => {
  // pathToRegexp.compile 用法参考网址 https://www.cnblogs.com/ygunoil/p/15597408.html
  const { params } = route;
  const toPath = pathToRegexp.compile(path);
  return toPath(params);
};
const handleLink = (item: iObj) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
