// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { message } from 'antd';

/** 获取当前的用户 GET /api/goldden-go/v1/userinfo */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/api/goldden-go/v1/userinfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取验证码 GET /api/goldden-go/v1/verify */
export async function getLoginVerify(options?: { [key: string]: any }) {
  return request<API.LoginVerify>('/api/goldden-go/v1/verify', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/goldden-go/v1/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.CommonResult>('/api/goldden-go/v1/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/goldden-go/v1/login/local */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/goldden-go/v1/login/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/goldden-go/v1/user */
export async function searchUser(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  let ulp: API.UserListPro = {
    success: false,
    data: [],
    total: 0
  }
  try {
    const rd = await request<API.UserList>('/api/goldden-go/v1/user', {
      method: 'GET',
      params: {
        pageNo: params.current,
        ...params
      },
      ...(options || {}),
    });

    if (rd.code == 20000) {
      ulp.success = true
      ulp.data = rd.data?.data
      ulp.total = rd.data?.total_count
    } else {
      message.error(rd.message);
    }
    return ulp
  } catch (error) {
    message.error(error.message);
  }
  return ulp

}

/** 新建用户 POST /api/goldden-go/v1/user */
export async function addUser(data?: API.UserListItem, options?: { [key: string]: any }) {
  return request<API.CommonResult>('/api/goldden-go/v1/user', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 新建用户 PUT /api/goldden-go/v1/user */
export async function updateUser(data?: API.UserListItem, options?: { [key: string]: any }) {
  return request<API.CommonResult>('/api/goldden-go/v1/user', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/goldden-go/v1/user */
export async function removeUser(params?: { ids: number[] }, options?: { [key: string]: any }) {
  return request<API.CommonResult>('/api/goldden-go/v1/user', {
    method: 'DELETE',
    params: params,
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
