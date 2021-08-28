import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Input, message } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { useIntl } from "umi";
import { getLoginVerify } from "@/services/ant-design-pro/api"





interface CaptchaInputProps {
    value?: string
    onChange?: (value: string) => void;
}

/**
 * 获取验证码
 */
const getCaptcha = async () => {
    try {
        const data = await getLoginVerify();
        if (data.code === 20000) {
            return data.data;
        }
    } catch (error) {
        message.error('获取验证码失败,请重试');
        return [];
    }
    message.error('获取验证码失败,请重试');
    return [];
}

const CaptchaInput = (props?: CaptchaInputProps, ref?: any) => {

    const intl = useIntl();
    const [imageData, setImageData] = useState<string>('');


    // 触发改变
    const triggerChange = (changeValue: string) => {
        if (props && props.onChange) {
            props.onChange(changeValue);
        }
    };

    useEffect(() => {
        if (imageData === '') {
            onClickImage()
        }
    });


    // 输入框变化
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value || ''
        triggerChange(code);
        console.log("输入框变化", code)
    }

    useImperativeHandle(ref, () => ({
        onClickImage
    }))
    // 更新图片
    const onClickImage = () => {
        getCaptcha().then((data: any) => {
            setImageData(data);
            triggerChange('');
        })
    };

    return (
        <span>
            <Input.Group compact>
                <Input prefix={<SafetyCertificateOutlined style={{ color: "#319cff" }} />} placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                })}
                    onChange={onChangeInput}
                    style={{ width: '75%', marginRight: 5, padding: '6.5px 11px 6.5px 11px', verticalAlign: 'middle' }} />
                <img style={{ width: '23%', height: '35px', verticalAlign: 'middle', padding: '0px 0px 0px 0px' }}
                    src={imageData} onClick={onClickImage} />
            </Input.Group>
        </span>
    );
};

export default forwardRef(CaptchaInput);