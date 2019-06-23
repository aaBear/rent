import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data = {}, method = 'get') {
  let reqParams = data;
  method = method.toLowerCase();

  // 对get请求参数修改
  if (method === 'get') reqParams = {params: data}

  return axios[method](url, reqParams)
    .then((res) => {
      const { data } = res;
      if (data.status === 0) {
        return data.data;
      } else {
        message.error(data.msg, 2);
      }
    })
    .catch((err) => {
      message.error('网络异常，请刷新重试', 2);
    })
}