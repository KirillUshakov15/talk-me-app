import React, {FC, useState} from 'react';
import style from './Sidebar.module.scss'
import icons from '@/assets/icons'
import {SidebarItem} from "@/ui/Sidebar/SidebarItem";
import MediaQuery, {useMediaQuery} from "react-responsive";

interface SidebarExtensions {
    Item: typeof SidebarItem
}

interface IProps {
    children: React.ReactNode
}

export const Sidebar: FC<IProps> & SidebarExtensions = ({children}) => {
    const [fullWidth, setWidth] = useState(false)

    const isLaptopScreen = useMediaQuery({ query: '(max-width: 1224px)' })

    const toggle = () => {
        setWidth(prevState => !prevState)
    }

    return (
        <div className={(fullWidth && !isLaptopScreen) ? style.bodyLarge : style.bodySlim}>
            <MediaQuery minWidth={1224}>
                <Sidebar.Item onClick={toggle} image={icons.sidebar} title={"Свернуть"}/>
            </MediaQuery>
            {children}
        </div>
    );
};

Sidebar.Item = SidebarItem;
