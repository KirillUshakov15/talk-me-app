import React, {FC, useState} from 'react';
import {Button, Divider, Form, Input} from "@/ui";
import useInput from "@/hooks/useInput";
import {useEditPasswordMutation} from "@/services/user-service";
import style from '@/modules/UserProfileModule/styles/Style.module.scss'

interface IEditPasswordData{
    newPassword: string,
    password: string,
    confirmPassword: string
}

const initialState = {
    newPassword: '',
    password: '',
    confirmPassword: ''
}

export const EditPasswordForm: FC = () => {
    const [passwordData, setPasswordData] = useState<IEditPasswordData>(initialState)
    const handleChange = useInput(setPasswordData);

    const [editPassword, {isLoading}] = useEditPasswordMutation()

    const submit = () => {
        editPassword(passwordData)
        setPasswordData(initialState)
    }

    return (
        <div className={style.formWrapper}>
            <Form onSubmit={submit}>
                <h2>Смена пароля</h2>
                <Input.Password
                    name="password"
                    value={passwordData.password}
                    onChange={handleChange}
                    placeholder="Введите старый пароль"
                />
                <Input.Password
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    placeholder="Придумайте новый пароль"
                />
                <Input.Password
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Повторите пароль"
                />

                <Divider/>

                <Button type="submit" loading={isLoading}>Изменить пароль</Button>
            </Form>
        </div>

    );
};
