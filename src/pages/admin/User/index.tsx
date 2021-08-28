import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag, Drawer, Form } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { searchUser, addUser, updateUser, removeUser } from '@/services/ant-design-pro/api';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserListItem) => {
    const hide = message.loading('正在添加');
    try {
        const aur = await addUser({ ...fields });
        if (aur.code === 20000) {
            hide();
            message.success('添加成功');
        } else {
            hide();
            message.error('添加失败，请重试!错误信息：' + aur.message);
            return false;
        }

        return true;
    } catch (error) {
        hide();
        message.error('添加失败，请重试!错误信息：' + error.message);
        return false;
    }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    try {
        const uur = await updateUser(fields);
        if (uur.code === 20000) {
            hide();
            message.success('配置成功');
        } else {
            hide();
            message.error('配置失败，请重试!错误信息：' + uur.message);
            return false;
        }
        return true;
    } catch (error) {
        hide();
        message.error('配置失败，请重试!错误信息：' + error.message);
        return false;
    }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        const dur = await removeUser({
            ids: selectedRows.map((row) => row.id),
        });
        if (dur.code === 20000) {
            hide();
            message.success('删除成功');
        } else {
            hide();
            message.error('删除失败，请重试!错误信息：' + dur.message);
            return false;
        }
    } catch (error) {
        hide();
        message.error('删除失败，请重试!错误信息:' + error.message);
        return false;
    }
};

const User: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.UserListItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.UserListItem>[] = [
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.id"
                    defaultMessage="ID"
                />
            ),
            dataIndex: 'id',
            valueType: 'indexBorder',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.name"
                    defaultMessage="用户名"
                />
            ),
            dataIndex: 'name',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.display_name"
                    defaultMessage="姓名"
                />
            ),
            dataIndex: 'display_name',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.super_admin"
                    defaultMessage="超级管理员"
                />
            ),
            key: 'super_admin',
            dataIndex: 'super_admin',
            render: (dom, entity) => {
                if (dom) {
                    return (
                        <Tag color="#87d068">YES</Tag>
                    )
                } else {
                    return (
                        <Tag color="#f50">NO</Tag>
                    )

                }
            },
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.mobile"
                    defaultMessage="电话"
                />
            ),
            dataIndex: 'mobile',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.email"
                    defaultMessage="邮箱"
                />
            ),
            dataIndex: 'email',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.admin.user.tablerow.create_time"
                    defaultMessage="创建时间"
                />
            ),
            dataIndex: 'create_time',
        },
        {
            title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalVisible(true);
                        console.log(record)
                        upform.setFieldsValue(record)
                        setCurrentRow(record);
                    }}
                >
                    <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
                </a>,
            ],
        },
    ];
    const [upform] = Form.useForm();
    return (
        <PageContainer>
            <ProTable<API.UserList, API.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.admin.user.tablename',
                    defaultMessage: '用户列表',
                })}
                actionRef={actionRef}
                rowKey="id"
                search={false}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalVisible(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>,
                ]}
                options={{
                    search: true,
                }}
                request={searchUser}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        console.log(selectedRows)
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
                            &nbsp;&nbsp;
                            <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="Total number of service calls"
                                />{' '}
                                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
                    </Button>
                </FooterToolbar>
            )}
            <ModalForm
                title={intl.formatMessage({
                    id: 'pages.admin.user.createForm.newUser',
                    defaultMessage: '新建用户',
                })}
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.UserListItem);
                    if (success) {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
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
                        defaultMessage: '请输入密码!',
                    })}
                    label={intl.formatMessage({
                        id: 'pages.admin.user.tablerow.password',
                        defaultMessage: '密码',
                    })}
                    rules={[
                        {
                            required: true,
                            message: (
                                <FormattedMessage
                                    id="pages.admin.user.tablerow.password"
                                    defaultMessage="请输入密码！"
                                />
                            ),
                        },
                    ]}
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
            <ModalForm
                form={upform}
                title={intl.formatMessage({
                    id: 'pages.admin.user.createForm.editUser',
                    defaultMessage: '配置用户',
                })}
                width="400px"
                visible={updateModalVisible}
                onVisibleChange={handleUpdateModalVisible}
                onFinish={async (value) => {
                    value.id = currentRow.id
                    const success = await handleUpdate(value as API.UserListItem);
                    if (success) {
                        handleUpdateModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
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
                    disabled
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
                        defaultMessage: '请输入密码!',
                    })}
                    label={intl.formatMessage({
                        id: 'pages.admin.user.tablerow.password',
                        defaultMessage: '密码',
                    })}
                // rules={[
                //     {
                //         required: true,
                //         message: (
                //             <FormattedMessage
                //                 id="pages.admin.user.tablerow.password"
                //                 defaultMessage="请输入密码！"
                //             />
                //         ),
                //     },
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

            {/* <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={(value?: boolean) => {
                    handleUpdateModalVisible(value);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                updateModalVisible={updateModalVisible}
                values={currentRow || {}}
            /> */}

            <Drawer
                width={600}
                visible={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<API.RuleListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
                    />
                )}
            </Drawer>
        </PageContainer >
    );
};

export default User;