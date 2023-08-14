import React, {FC, } from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {UserIcon} from "@/components/UserIcon";
import icons from "@/assets/icons";
import useAction, {useAppSelector} from "@/hooks/redux";

export const ChatHeader: FC = () => {

    const {room} = useAppSelector((state) => state.room)
    const {exitRoom} = useAction()

    return (
        <div className={style.header}>
            <div className={style.icon}>
                <UserIcon icon={room?.icon} size={60}/>
            </div>

            <div className={style.userContainer}>
                <h3>{room?.name}</h3>
                <p>Online</p>
            </div>

            <div className={style.exitRoom} onClick={exitRoom}>
                <img src={icons.exit} alt={"exit"}/>
            </div>
        </div>
    );
};
