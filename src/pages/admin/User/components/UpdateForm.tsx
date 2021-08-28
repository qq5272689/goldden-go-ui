import React from 'react';

import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.admin.user.createForm.newUser',
        defaultMessage: '新建用户',
      })}
      width="400px"
      initialValues={{ name: props.values.name }}
      visible={props.updateModalVisible}
      // onVisibleChange={() => {
      //   props.onCancel();
      // }}
      onFinish={props.onSubmit}
    >
      <ProFormText
        width="md"
        name="name"
        label={intl.formatMessage({
          id: 'pages.admin.user.tablerow.name',
          defaultMessage: '用户名',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.admin.user.tablerow.name.placeholder',
          defaultMessage: '请输入用户名',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.admin.user.tablerow.name"
                defaultMessage="用户名"
              />
            ),
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        width="md"
        placeholder={intl.formatMessage({
          id: 'pages.admin.user.tablerow.password.placeholder',
          defaultMessage: '请输入密码!(为空则不修改密码)',
        })}
        label={intl.formatMessage({
          id: 'pages.admin.user.tablerow.password',
          defaultMessage: '密码',
        })}
      // rules={[
      //   {
      //     required: true,
      //     message: (
      //       <FormattedMessage
      //         id="pages.admin.user.tablerow.password"
      //         defaultMessage="请输入密码！"
      //       />
      //     ),
      //   },
      // ]}
      />
      <ProFormText
        width="md"
        name="display_name"
        label={intl.formatMessage({
          id: 'pages.admin.user.tablerow.display_name',
          defaultMessage: '姓名',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.admin.user.tablerow.display_name.placeholder',
          defaultMessage: '请输入姓名',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.admin.user.tablerow.display_name"
                defaultMessage="姓名"
              />
            ),
          },
        ]}
      />
      <ProFormText
        width="md"
        name="mobile"
        label={intl.formatMessage({
          id: 'pages.admin.user.tablerow.mobile',
          defaultMessage: '电话',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.admin.user.tablerow.mobile.placeholder',
          defaultMessage: '请输入电话号码',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.admin.user.tablerow.mobile"
                defaultMessage="电话"
              />
            ),
          },
        ]}
      />
      <ProFormText
        width="md"
        name="email"
        label={intl.formatMessage({
          id: 'pages.admin.user.tablerow.email',
          defaultMessage: '邮箱',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.admin.user.tablerow.email.placeholder',
          defaultMessage: '请输入邮箱',
        })}
      // rules={[
      //     {
      //         required: true,
      //         message: (
      //             <FormattedMessage
      //                 id="pages.admin.user.tablerow.email"
      //                 defaultMessage="邮箱"
      //             />
      //         ),
      //     },
      // ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
