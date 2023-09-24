import React, {FC} from 'react';
import style from '@/modules/MessengerModule/styles/Room.module.scss'
import {ConversationIcon, UserIcon} from "@/components/Icons";
import {IRoom, RoomType} from "@/models/IRoom";
import useAction, {useAppSelector} from "@/hooks/redux";
import {getLastMessageDateTime, getTime} from "@/utils/datetime";
import showAuthorCondition from "@/modules/MessengerModule/utils/show-author-condition";
import {useLazyGetRoomQuery} from "@/services/messenger-service";

interface IProps{
    room: IRoom,
    selectedRoomID: string | undefined,
    onSelected?: (id: string) => void
}

export const Room: FC<IProps> = ({room, selectedRoomID, onSelected}) => {

    const message = room.messages[0]

    const selectRoom = () => {
        if (onSelected) {
            onSelected(room.id)
        }
    }

    return (
        <div
            className={selectedRoomID === room.id ? `${style.room} ${style.selectedRoom}` : style.room}
            onClick={selectRoom}>
            <div className={style.container}>

                <div className={style.icon}>
                    {room.type === RoomType.DIALOG ?
                        <UserIcon icon={room.icon}/>
                        :
                        <ConversationIcon icon={room.icon}/>
                    }
                </div>

                <div className={style.text}>
                    <p>{room.name}</p>
                    <div className={style.messagePreview}>
                        {showAuthorCondition(room) && <UserIcon size={25} icon={message?.author.avatarUrl}/>}
                        <span>{message?.text}</span>
                    </div>
                </div>

                <div className={style.date}>
                    <p>{getLastMessageDateTime(message?.timestamp)}</p>
                </div>

            </div>
        </div>
    );
};
