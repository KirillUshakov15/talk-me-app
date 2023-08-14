import React, {FC} from 'react';
import {Sidebar} from "@/ui";
import icons from "@/assets/icons";
import style from './Menu.module.scss'
import {useLogoutMutation} from "@/services/auth-service";
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE_ROUTE, MESSENGER_PAGE_ROUTE} from "@/contants/routes";
import {useAppSelector} from "@/hooks/redux";

export const Menu: FC = () => {
    const {userData} = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const openProfilePage = () => {
        navigate(`profile/${userData.id}`)
    }

    const openMessengerPage = () => {
        navigate(MESSENGER_PAGE_ROUTE)
    }

    const exitAccount = () => {
        logout('');
        navigate(LOGIN_PAGE_ROUTE)
    }

    return (
        <div>
            <Sidebar>
                <Sidebar.Item onClick={openProfilePage} image={icons.user} title={"Мой профиль"}/>
                <Sidebar.Item onClick={openMessengerPage} image={icons.conversation} title={"Сообщения"}/>
                <Sidebar.Item image={icons.friends} title={"Друзья"}/>
                <div className={style.footer}>
                    <Sidebar.Item onClick={exitAccount} image={icons.exit} title={"Выход"}/>
                </div>
            </Sidebar>
        </div>
    );
};
