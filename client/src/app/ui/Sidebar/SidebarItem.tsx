import React, {FC} from "react";
import style from "./Sidebar.module.scss";

interface IProps{
    image: string,
    title: string,
    onClick?: () => void
}

export const SidebarItem: FC<IProps> = ({image, title, onClick}) => {
    return (
        <div className={style.item} onClick={onClick}>
            <img src={image} alt='sidebar-icon'/>
            <ul>{title}</ul>
        </div>
    )
}