import React, {FC, memo, SetStateAction, useEffect, useState} from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";
import {Form, Input} from "@/ui";
import {SendMessageButton} from "@/modules/MessengerModule/components";
import useInput from "@/hooks/useInput";
import useAction, {useAppSelector} from "@/hooks/redux";

interface IProps{
    onSend: (text: string, author: string) => void,
    onEdit: (id: string, text: string) => void
}

export const SendMessageForm: FC<IProps> = memo(({onSend, onEdit}) => {
    const {userData} = useAppSelector(state => state.auth)
    const {editableMessage} = useAppSelector(state => state.message)
    const {deleteEditableMessage} = useAction()
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        if(editableMessage)
            setMessage(editableMessage.text)
    }, [editableMessage])

    const submit = () => {
        editableMessage
            ? onEdit(editableMessage.id, message)
            : onSend(message, userData.id)

        onDeleteEditableMessage();
    }

    const onDeleteEditableMessage = () => {
        deleteEditableMessage()
        setMessage('')
    }

    return (
        <Form onSubmit={submit}>
            <div className={style.submitForm}>
                <Input
                    value={message || ''}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                />
                <SendMessageButton/>
            </div>
            {editableMessage &&
                <div className={style.editMessageContainer}>
                    <i className='bx bx-pencil'></i>
                    <span>Редактируемое сообщение</span>
                    <p onClick={onDeleteEditableMessage}>X</p>
                </div>
            }
        </Form>
    );
});
