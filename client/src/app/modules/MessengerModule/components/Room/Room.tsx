import React, {FC} from 'react';
import style from '@/modules/MessengerModule/styles/Room.module.scss'
import {UserIcon} from "@/components/UserIcon";
import {IRoom} from "@/models/IRoom";
import useAction, {useAppSelector} from "@/hooks/redux";
import isCurrentUser from "@/utils/is-current-user";
import trimString from "@/utils/trim-string";
import {getTime} from "@/utils/datetime";

interface IProps{
    room: IRoom
}

export const Room: FC<IProps> = ({room}) => {

    const {room: selectedRoom} = useAppSelector((state) => state.room)
    const {enterRoom} = useAction()

    const selectRoom = () => {
        enterRoom(room)
    }

    return (
        <div
            className={selectedRoom?.id === room.id ? `${style.room} ${style.selectedRoom}` : style.room}
            onClick={selectRoom}>
            <div className={style.container}>

                <div className={style.icon}>
                    <UserIcon icon={room.icon}/>
                </div>

                <div className={style.text}>
                    <p>{room.name}</p>
                    <span>
                        {isCurrentUser(room.messages[0]?.author.id) && 'Вы: '}
                        {trimString(room.messages[0]?.text, 18)}
                    </span>
                </div>

                <div className={style.date}>
                    <p>{getTime(room.messages[0]?.timestamp)}</p>
                </div>

            </div>
        </div>
    );
};
