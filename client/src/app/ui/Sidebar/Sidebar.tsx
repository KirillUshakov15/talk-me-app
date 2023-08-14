import React, {FC, useState} from 'react';
import style from './Sidebar.module.scss'
import icons from '@/assets/icons'
import {SidebarItem} from "@/ui/Sidebar/SidebarItem";

interface SidebarExtensions {
    Item: typeof SidebarItem
}

interface IProps {
    children: React.ReactNode
}

export const Sidebar: FC<IProps> & SidebarExtensions = ({children}) => {
    const [fullWidth, setWidth] = useState(false)

    const toggle = () => {
        setWidth(prevState => !prevState)
    }

    return (
        <div className={fullWidth ? style.bodyLarge : style.bodySlim}>
            <Sidebar.Item onClick={toggle} image={icons.sidebar} title={"Свернуть"}/>
            {children}
        </div>
    );
};

Sidebar.Item = SidebarItem;
