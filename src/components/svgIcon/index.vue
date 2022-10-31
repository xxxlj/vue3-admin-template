<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  ></div>
  <svg
    v-else
    :class="props.className"
    class="svg-icon"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
import { isExternal } from "@/common/utils/validate";
import { computed } from "vue";
const props = defineProps({
  iconClass: {
    // icon名称（svg文件：svg文件名；外链：外链地址）
    type: String,
    required: true,
  },
  className: {
    // 额外的类名
    type: String,
    default: "",
  },
});
const external = computed(() => {
  return isExternal(props.iconClass);
});
const styleExternalIcon = computed(() => {
  return {
    "--svg-icon-url": `url(${props.iconClass})`,
  };
});
const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
