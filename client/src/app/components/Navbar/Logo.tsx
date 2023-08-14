import React, {FC} from 'react';
import style from "./Navbar.module.scss";
import appLogo from "@/assets/talk-me-logo.png";

export const Logo: FC = () => {
    return (
        <div className={style.logo}>
            <img src={appLogo} alt='talk-me-logo'/>

            <div className={style.logo_text}>
                <h1>Talk Me Messenger</h1>
                <span>Мессенджер, в котором все твои друзья!</span>
            </div>

        </div>
    );
};
