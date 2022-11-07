<template>
  <div class="icon-box">
    <el-icon v-if="props.isElIcon" class="sub-el-icon">
      <component :is="props.icon" />
    </el-icon>
    <svg-icon v-else :icon-class="props.icon"></svg-icon>
    <span v-if="props.title && isNest">{{ props.title }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  icon: {
    // icon名称
    type: String,
    default: "",
  },
  isElIcon: {
    // 是否为element-ui的字体图标
    type: Boolean,
    default: false,
  },
  title: {
    // 菜单标题
    type: String,
    default: "",
  },
  isNest: {
    // 是否有下级菜单
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="less" scoped>
.icon-box {
  font-size: 18px;
  display: flex;
  align-items: center;
  .sub-el-icon {
    font-size: 18px;
  }
  > span {
    font-size: 14px;
  }
}
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
