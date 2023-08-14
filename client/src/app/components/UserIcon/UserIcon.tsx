import React, {FC} from 'react';
import style from './UserIcon.module.scss'
import icons from "@/assets/icons";
import {API_SERVER_IMAGES_PATH} from "@/contants/api";

interface IProps{
    icon?: string | undefined,
    size?: number,
    onClick?: () => void
}

export const UserIcon: FC<IProps> = ({icon, size = 40, onClick}) => {
    return (
        <div onClick={onClick} className={style.icon}>
            <img src={icon ? `${API_SERVER_IMAGES_PATH}${icon}` : icons.user} width={size} height={size} alt={"user-icon"}/>
        </div>
    );
};
