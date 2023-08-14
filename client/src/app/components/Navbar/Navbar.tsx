import React, {FC} from 'react';
import style from './Navbar.module.scss'
import {Logo} from "./Logo";
import {Button} from "@/ui";
import {useLogoutMutation} from "@/services/auth-service";

export const Navbar: FC = () => {

    return (
        <div className={style.container}>
            <Logo/>
        </div>
    );
};
