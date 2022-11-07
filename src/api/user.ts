import request from "@/common/utils/request";

type Response = {
  code: number;
  [x: string]: any;
};

export function userLogin(data: Record<string, unknown>): Promise<Response> {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
export function getUserInfo(token: string): Promise<Response> {
  return request({
    url: "/user/info",
    method: "get",
    params: { token },
  });
}
export function userLogout(data: Record<string, unknown>): Promise<Response> {
  return request({
    url: "/user/logout",
    method: "post",
    data,
  });
}
