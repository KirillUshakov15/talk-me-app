import React, {FC} from 'react';
import style from '@/modules/MessengerModule/styles/Messenger.module.scss'
import {UserIcon} from "@/components/UserIcon";
import {IMessage} from "@/models/IMessage";
import useAction, {useAppSelector} from "@/hooks/redux";
import {useNavigate} from "react-router-dom";
import isCurrentUser from "@/utils/is-current-user";
import {RoomType} from "@/models/IRoom";
import {getTime} from "@/utils/datetime";

interface IProps{
    body: IMessage;
    onDelete: (id: string) => void
}

export const Message: FC<IProps> = ({body, onDelete}) => {
    const {room} = useAppSelector(state => state.room)
    const {editableMessage} = useAppSelector(state => state.message)
    const {setEditableMessage} = useAction()
    const navigate = useNavigate();
    const {id, text, timestamp, author, isEdit} = body;

    const userIsAuthor = isCurrentUser(author.id)

    const openUserProfilePage = () => {
        navigate(`../profile/${body.author.id}`)
    }

    const deleteMessage = () => {
        onDelete(id)
    }

    const selectMessageForEdit = () => {
        setEditableMessage({id, text})
    }

    return (
        <div className={userIsAuthor ? `${style.messageToWrapper}` : `${style.messageFromWrapper}`}>
            <div className={style.messageContainer}>
                {text}
                {(userIsAuthor && !editableMessage) &&
                    <>
                        <i onClick={selectMessageForEdit} className='bx bx-pencil'></i>
                        <i onClick={deleteMessage} className='bx bx-trash'></i>
                    </>
                }
            </div>

            <div className={style.footer}>
                <div className={style.icon}>
                    <UserIcon onClick={openUserProfilePage} icon={author.avatarUrl} />
                </div>

                <div className={style.footerText}>
                    <div>
                        {(!userIsAuthor && room!.type === RoomType.CONVERSATION) &&
                            <p>{author.firstName + ' ' + author.secondName}</p>
                        }
                    </div>
                    <div>
                        <p>
                            {getTime(timestamp)}
                            {isEdit && ' (ред.)'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};
