import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [fileURLToPath(new URL("./src/assets/svg", import.meta.url))],
      // 执行 icon name 的格式
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${fileURLToPath(
            new URL("./src/assets/css/variable.module.less", import.meta.url)
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 8899,
    host: "0.0.0.0",
  },
});
