// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CommonResult = {
    code?: number
    message?: string
  }
  type CurrentUserResult = CommonResult & {
    data?: CurrentUser
  }
  type CurrentUser = {
    id?: number
    name?: string;
    display_name?: string;
    super_admin?: boolean;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginVerify = CommonResult & {
    data?: string
  }

  type LoginResult = CommonResult & {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type UserList = CommonResult & {
    data?: {
      data?: UserListItem[]
      page_size?: number
      page_no?: number
      total_page?: number
      total_count?: number

    }
  }

  type UserListItem = {
    id?: number
    name?: string;
    display_name?: string;
    super_admin?: boolean;
    create_time?: string;
    email?: string;
    mobile?: string;
    password?: string;
    group?: number;
  }

  type CommonList = {
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }

  type UserListPro = CommonList & {
    data?: UserListItem[]
  }

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    verify?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
