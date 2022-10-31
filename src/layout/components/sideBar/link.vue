<template>
  <component :is="type" v-bind="linkProps()">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { isExternal } from "@/common/utils/validate";
import { computed } from "vue";
const props = defineProps({
  to: {
    // 跳转地址 (vue-router地址或外链)
    type: String,
    required: true,
  },
});
const type = computed(() => {
  if (isExternal(props.to)) {
    return "a";
  } else {
    return "router-link";
  }
});
const linkProps = () => {
  if (isExternal(props.to)) {
    return {
      href: props.to,
      target: "_blank",
    };
  } else {
    return {
      to: props.to,
    };
  }
};
</script>
<style lang="less" scoped></style>
