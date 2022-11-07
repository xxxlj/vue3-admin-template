import { defineStore } from "pinia";
import { userLogin, getUserInfo, userLogout } from "@/api/user";
import { ElMessage } from "element-plus";
import { setToken, getToken, removeToken } from "@/common/utils/auth";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      avatar: "",
      token: getToken(),
      name: "",
      roles: [],
      introduction: "",
    };
  },
  actions: {
    userLogin(loginMsg: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        userLogin(loginMsg)
          .then((res) => {
            this.token = res.token;
            setToken(this.token);
            resolve(res);
          })
          .catch((err) => {
            ElMessage.error(err.message);
            reject(err);
          });
      });
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo(this.token)
          .then((res) => {
            const { name, roles, introduction, avatar } = res.data;
            this.name = name;
            this.roles = roles;
            this.introduction = introduction;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    resetState() {
      this.name = "";
      this.roles = [];
      this.introduction = "";
      this.avatar = "";
    },
    resetToken() {
      return new Promise((resolve) => {
        removeToken();
        this.resetState();
        resolve({});
      });
    },
    userLogout() {
      return new Promise((resolve, reject) => {
        userLogout(this.token)
          .then(() => {
            removeToken();
            this.resetState();
            resolve({});
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
