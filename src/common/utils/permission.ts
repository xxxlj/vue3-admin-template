import { progressStart, progressEnd } from "@/common/utils/nprogress";
import router from "@/router/index";
import getPageTitle from "@/common/utils/get-page-title";
import { getToken } from "@/common/utils/auth";
import { useUserStore } from "@/stores";
import { ElMessage } from "element-plus";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  progressStart();
  document.title = getPageTitle(to.meta.title as string);
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      progressEnd();
    } else {
      const UserStore = useUserStore();
      if (UserStore.name) {
        next();
      } else {
        try {
          // get user info
          await UserStore.getUserInfo();
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await UserStore.resetToken();
          ElMessage.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          progressEnd();
        }
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      progressEnd();
    }
  }
});

router.afterEach(() => {
  progressEnd();
});
