import type { MockMethod } from "vite-plugin-mock";

const tokensAndPwds = {
  admin: {
    password: "123456",
    token: "admin-token",
  },
  editor: {
    password: "123456",
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    name: "Normal Editor",
  },
};

export default [
  {
    url: "/user/login",
    method: "post",
    response: (config: any) => {
      const { username, password } = config.body;
      const tokenAndPwd = tokensAndPwds[username as "admin" | "editor"];
      if (tokenAndPwd) {
        if (tokenAndPwd.password === password) {
          return {
            code: 0,
            token: tokenAndPwd.token,
          };
        } else {
          return {
            code: 10001,
            message: "用户名或密码错误！",
          };
        }
      } else {
        return {
          code: 10001,
          message: "用户名或密码错误！",
        };
      }
    },
  },
  {
    url: "/user/info",
    method: "get",
    response: (config: any) => {
      const { token } = config.query;
      const userInfo = users[token as "admin-token" | "editor-token"];
      if (userInfo) {
        return {
          code: 0,
          data: userInfo,
        };
      } else {
        return {
          code: 10001,
          message: "token有误！",
        };
      }
    },
  },
  {
    url: "/user/logout",
    method: "post",
    response: () => {
      return {
        code: 0,
        message: "success",
      };
    },
  },
] as MockMethod[];
