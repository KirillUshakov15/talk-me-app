import React, {FC, useEffect, useState} from 'react';
import style from '../styles/Style.module.scss'
import {Button, Divider, Form, Input} from "@/ui";
import {LOGIN_PAGE_ROUTE} from "@/contants/routes";
import {Link, useNavigate} from "react-router-dom";
import {IRegistration} from "@/models/IAuth";
import {useRegistrationMutation} from "@/services/auth-service";
import useInput from "@/hooks/useInput";
import {useAppSelector} from "@/hooks/redux";

const initialValue: IRegistration = {
    email: '',
    firstName: '',
    secondName: '',
    password: '',
    confirmPassword: ''
}

export const RegistrationForm: FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IRegistration>(initialValue);

    const [registration, {isLoading}] = useRegistrationMutation()

    const handleChange = useInput(setData)

    const {isAuth, userData} = useAppSelector(state => state.auth)

    useEffect(() => {
        if(isAuth){
            navigate(`../profile/${userData.id}`)
        }
    }, [isAuth])

    const submit = () => {
        registration(data)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>

                <Form onSubmit={submit}>
                    <h1>Регистрация</h1>

                    <Input
                        placeholder="Укажите имя..."
                        value={data.firstName}
                        onChange={handleChange}
                        name="firstName"
                    />
                    <Input
                        placeholder="Укажите фамилию..."
                        value={data.secondName}
                        onChange={handleChange}
                        name="secondName"
                    />

                    <Input
                        placeholder="Укажите email..."
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                    />

                    <Input.Password
                        placeholder="Придумайте пароль..."
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                    />
                    <Input.Password
                        placeholder="Повторите пароль..."
                        value={data.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                    />

                    <Button.Primary type='submit' loading={isLoading}>Зарегистрироваться</Button.Primary>

                    <Divider/>

                    <div className={style.linkContainer}>
                        <p><Link className={style.Link} to={LOGIN_PAGE_ROUTE}>У меня уже есть аккаунт</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};
