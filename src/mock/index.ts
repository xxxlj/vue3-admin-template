//  mockProdServer.ts
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// 导入mock.ts文件
import userModule from "./source/user";

export function setupProdMockServer() {
  createProdMockServer([...userModule]);
}
