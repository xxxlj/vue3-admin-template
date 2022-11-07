import { settings } from "@/common/settings";

const title = settings.title || "Vue Admin Template";

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
