import request from "@/common/utils/request";

export function post(data: Object) {
  return request({
    url: "",
    method: "post",
    data,
  });
}

export function get(data: Object) {
  return request({
    url: "",
    method: "get",
    params: data,
  });
}
