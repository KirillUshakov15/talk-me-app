import React, {FC, useEffect, useRef} from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {Messages, SendMessageForm} from "@/modules/MessengerModule/components";
import useAction, {useAppSelector} from "@/hooks/redux";
import {useChat} from "@/hooks/useChat";

export const ChatBody: FC = () => {
    const {room} = useAppSelector(state => state.room)
    const {sendMessage, deleteMessage, editMessage, scrollRef, onScroll} = useChat(room!.id)
    const {exitRoom, deleteEditableMessage} = useAction()

    useEffect(() => {
        return () => {
            exitRoom()
            deleteEditableMessage()
        }
    }, [])

    return (
        <div className={style.body}>
            <div className={style.messagesContainer} ref={scrollRef} onScroll={onScroll}>
                <Messages onDelete={deleteMessage}/>
            </div>
            <SendMessageForm onSend={sendMessage} onEdit={editMessage}/>
        </div>
    );
};
