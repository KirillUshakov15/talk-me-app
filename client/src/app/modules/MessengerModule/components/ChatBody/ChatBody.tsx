import React, {FC, useEffect} from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {Messages, SendMessageForm} from "@/modules/MessengerModule/components";
import useAction, {useAppSelector} from "@/hooks/redux";
import {useChat} from "@/hooks/useChat";
import {MessageType} from "@/models/IMessage";
import sendEventMessage from "@/modules/MessengerModule/utils/send-event-message";

export const ChatBody: FC = () => {
    const {room, roomEvent} = useAppSelector(state => state.room)
    const {userData} = useAppSelector(state => state.auth)
    const {sendMessage, deleteMessage, editMessage, scrollRef, onScroll} = useChat(room!.id)
    const {exitRoom, deleteEditableMessage, setRoomEvent} = useAction()

    useEffect(() => {
        return () => {
            exitRoom()
            deleteEditableMessage()
        }
    }, [])

    useEffect(() => {
        if(!room || roomEvent === 'none') return
        sendEventMessage(roomEvent, room, userData.id, sendMessage)
        setRoomEvent('none')
    }, [roomEvent])

    return (
        <div className={style.body}>
            <div className={style.messagesContainer} ref={scrollRef} onScroll={onScroll}>
                <Messages onDelete={deleteMessage}/>
            </div>
            <SendMessageForm onSend={sendMessage} onEdit={editMessage}/>
        </div>
    );
};
