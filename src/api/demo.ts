import request from "@/common/utils/request";

export function post(data: Record<string, unknown>) {
  return request({
    url: "",
    method: "post",
    data,
  });
}

export function get(data: Record<string, unknown>) {
  return request({
    url: "",
    method: "get",
    params: data,
  });
}
