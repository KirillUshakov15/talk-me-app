import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, Spinner} from "@/ui";
import {Link, useNavigate} from "react-router-dom";
import {REGISTRATION_PAGE_ROUTE} from "@/contants/routes";
import style from '../styles/Style.module.scss'
import {useLoginMutation} from "@/services/auth-service";
import {ILogin} from "@/models/IAuth";
import useInput from "@/hooks/useInput";
import {useAppSelector} from "@/hooks/redux";

const initialState: ILogin = {
    email: '',
    password: ''
}

export const LoginForm: FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ILogin>(initialState);
    const {isAuth, userData} = useAppSelector(state => state.auth)

    const handleChange = useInput(setData)

    useEffect(() => {
        if(isAuth){
            navigate(`profile/${userData.id}`)
        }
    }, [isAuth])

    const [login, {isLoading}] = useLoginMutation()

    const submit = () => {
        login(data)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Form onSubmit={submit}>
                    <h1>Авторизация</h1>

                    <Input
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Введите email..."
                    />
                    <Input.Password
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Введите пароль..."
                    />

                    <Button.Primary type='submit' loading={isLoading}>Войти</Button.Primary>

                    <Divider/>

                    <div className={style.linkContainer}>
                        <p><Link className={style.Link} to={REGISTRATION_PAGE_ROUTE}>У меня нет аккаунта</Link></p>
                        <p><Link className={style.Link} to={REGISTRATION_PAGE_ROUTE}>Я забыл свой пароль</Link></p>
                    </div>

                </Form>

            </div>
        </div>
    );
};
