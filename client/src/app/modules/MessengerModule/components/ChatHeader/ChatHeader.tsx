import React, {FC, } from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {UserIcon} from "@/components/Icons";
import icons from "@/assets/icons";
import useAction, {useAppSelector} from "@/hooks/redux";
import {RoomType} from "@/models/IRoom";
import {ConversationInfoCard} from "@/modules/MessengerModule/components/ConversationInfoCard";
import {CONVERSATION_INFO_MODAL} from "@/contants/modal-names";
import {Icon} from "@/ui";

export const ChatHeader: FC = () => {

    const {room} = useAppSelector((state) => state.room)
    const {isOpen} = useAppSelector((state) => state.popup.modal)
    const {exitRoom, openModal} = useAction()

    const openConversationInfo = () => {
        openModal(CONVERSATION_INFO_MODAL)
    }

    return (
        <div className={style.header}>
            <div className={style.icon}>
                <Icon
                    icon={room?.icon}
                    size={60}
                    defaultIcon={room?.type === RoomType.DIALOG ? icons.avatarDefault : icons.roomIcon}
                />
            </div>

            <div className={style.roomInfoContainer}>
                <h3>{room?.name}</h3>
                {room?.type === RoomType.DIALOG
                    ?
                    <p>Online</p>
                    :
                    <h4 onClick={openConversationInfo}>Информация о беседе</h4>
                }
            </div>

            <div className={style.exitRoom} onClick={exitRoom}>
                <img src={icons.exit} alt={"exit"}/>
            </div>
            {(room?.type === RoomType.CONVERSATION && isOpen) && <ConversationInfoCard/>}
        </div>
    );
};
