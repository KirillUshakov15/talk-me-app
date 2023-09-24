import React, {FC, useState} from 'react';
import {Sidebar} from "@/ui";
import icons from "@/assets/icons";
import style from './Menu.module.scss'
import {useLogoutMutation} from "@/services/auth-service";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PAGE_ROUTE, MESSENGER_PAGE_ROUTE} from "@/contants/routes";
import useAction, {useAppSelector} from "@/hooks/redux";
import {LogoutModal} from "@/modules/AuthModule";
import {LOGOUT_MODAL} from "@/contants/modal-names";

export const Menu: FC = () => {
    const {userData} = useAppSelector(state => state.auth)
    const {isOpen} = useAppSelector(state => state.popup.modal)
    const navigate = useNavigate()

    const {openModal} = useAction()

    const openLogoutModal = () => {
        openModal(LOGOUT_MODAL)
    }

    return (
        <div>
            <Sidebar>
                <Link to={`../profile/${userData.id}`}>
                    <Sidebar.Item image={icons.user} title={"Мой профиль"}/>
                </Link>
                <Link to={MESSENGER_PAGE_ROUTE}>
                    <Sidebar.Item image={icons.conversation} title={"Сообщения"}/>
                </Link>
                <Sidebar.Item image={icons.friends} title={"Друзья"}/>
                <div className={style.footer}>
                    <Sidebar.Item onClick={openLogoutModal} image={icons.exit} title={"Выход"}/>
                </div>
            </Sidebar>
            {isOpen && <LogoutModal/>}
        </div>
    );
};
