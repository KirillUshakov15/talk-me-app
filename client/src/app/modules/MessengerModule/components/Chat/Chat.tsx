import React, {FC, useContext} from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {ChatHeader} from "@/modules/MessengerModule/components/ChatHeader";
import {ChatBody} from "@/modules/MessengerModule/components";
import {useAppSelector} from "@/hooks/redux";
import MediaQuery from "react-responsive";

export const Chat: FC = () => {

    const {room: selectedRoom} = useAppSelector((state) => state.room)

    return (
        <>
            {selectedRoom ?
                <div className={style.chatContainer}>
                    <ChatHeader/>
                    <ChatBody/>
                </div>
                :
                <MediaQuery minWidth={840}>
                    <div className={style.nonSelectedRoomLabelContainer}>
                        <h2>Выберите, кому бы хотели написать</h2>
                    </div>
                </MediaQuery>
            }
        </>

    );
};
