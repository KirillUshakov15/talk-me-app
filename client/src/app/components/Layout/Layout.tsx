import React, {FC} from 'react';
import style from './Layout.module.scss'
import {Navbar} from '@/components/Navbar';
import {Alert} from "@/ui";
import {Menu} from "@/components/Menu";
import {useAppSelector} from "@/hooks/redux";
import {LogoutModal} from "@/modules/AuthModule";


interface IProps {
    children: React.ReactNode
}

export const Layout: FC<IProps> = ({children}) => {

    const {isAuth} = useAppSelector(state => state.auth);

    return (
        <div className={style.appContainer}>
            <header className={style.header}>
                <Navbar/>
                <Alert/>
            </header>
            <div className={style.wrapper}>
                {isAuth && <Menu/>}
                <div className={style.body}>
                    {children}
                </div>
            </div>

        </div>
    );
};