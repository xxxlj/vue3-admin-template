import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { settings } from "@/common/settings";

const { fixedHeader, sidebarLogo } = settings;

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sidebar: {
        opened: Cookies.get("sidebarStatus")
          ? !!+Cookies.get("sidebarStatus")
          : true,
      },
      fixedHeader,
      sidebarLogo,
    };
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      if (this.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
  },
});
