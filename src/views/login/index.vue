<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      :status-icon="false"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="handleLogin(loginFormRef)"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin(loginFormRef)"
        >Login</el-button
      >
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores";
const router = useRouter();
const route = useRoute();
const UserStore = useUserStore();
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: "",
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const passwordType = ref<string>("password");
const loading = ref<boolean>(false);
const redirect = ref<string>("");

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      UserStore.userLogin(loginForm)
        .then(() => {
          router.push({ path: redirect.value || "/" });
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

const showPwd = () => {
  if (passwordType.value === "password") {
    passwordType.value = "";
  } else {
    passwordType.value = "password";
  }
};
watch(
  () => route,
  () => {
    redirect.value = route.query && (route.query.redirect as string);
  },
  { immediate: true }
);
</script>
<style lang="less">
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    margin-bottom: 28px;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        width: 100%;
        background-color: transparent;
        box-shadow: unset;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: @light_gray;
          height: 47px;
          caret-color: @cursor;

          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px @bg inset !important;
            -webkit-text-fill-color: @cursor !important;
          }
        }
      }
    }
    .el-form-item__error {
      padding-top: 8px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
