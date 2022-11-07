<template>
  <div class="navbar">
    <hamburger
      :is-active="AppStore.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleClick"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown
        class="avatar-container"
        trigger="click"
        @visible-change="visibleChange"
      >
        <div class="avatar-wrapper">
          <img
            :src="UserStore.avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <el-icon v-if="!dropdownStatus"><CaretBottom /></el-icon>
          <el-icon v-else><CaretTop /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="handleLogout">
              <span>Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import hamburger from "@/components/hamburger/index.vue";
import breadcrumb from "@/components/breadcrumb/index.vue";
import { useAppStore, useUserStore } from "@/stores";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const AppStore = useAppStore();
const UserStore = useUserStore();
const toggleClick = () => {
  AppStore.toggleSideBar();
};
const dropdownStatus = ref(false);
const visibleChange = (status: boolean) => {
  dropdownStatus.value = status;
};

const handleLogout = async () => {
  await UserStore.userLogout();
  router.push(`/login?redirect=${route.fullPath}`);
};
</script>
<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
