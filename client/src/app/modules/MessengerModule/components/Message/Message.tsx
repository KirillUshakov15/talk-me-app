import React, {FC} from 'react';
import style from '@/modules/MessengerModule/styles/Messenger.module.scss'
import {UserIcon} from "@/components/Icons";
import {IMessage} from "@/models/IMessage";
import useAction, {useAppSelector} from "@/hooks/redux";
import {Link} from "react-router-dom";
import isCurrentUser from "@/utils/is-current-user";
import {RoomType} from "@/models/IRoom";
import {getTime} from "@/utils/datetime";
import isMessageTypeDefault from "@/modules/MessengerModule/utils/is-message-type-default";

interface IProps{
    body: IMessage;
    onDelete: (id: string) => () => void
}

export const Message: FC<IProps> = ({body, onDelete}) => {
    const {room} = useAppSelector(state => state.room)
    const {editableMessage} = useAppSelector(state => state.message)
    const {setEditableMessage} = useAction()
    const {id, text, timestamp, author, isEdit, type} = body;

    const userIsAuthor = isCurrentUser(author?.id)

    const selectMessageForEdit = () => {
        setEditableMessage({id, text})
    }

    return (
        <div className={userIsAuthor ? `${style.messageToWrapper}` : `${style.messageFromWrapper}`}>
            <div className={isMessageTypeDefault(type) ? `${style.messageContainer}` : `${style.systemMessage}`}>
                <p>{text}</p>
                {(userIsAuthor && !editableMessage && isMessageTypeDefault(type)) &&
                    <>
                        <i onClick={selectMessageForEdit} className='bx bx-pencil'></i>
                        <i onClick={onDelete(id)} className='bx bx-trash'></i>
                    </>
                }
            </div>
            {isMessageTypeDefault(type) &&
                <Link to={`../profile/${body.author?.id}`}>
                <div className={style.footer}>
                    <div className={style.icon}>
                            <UserIcon icon={author.avatarUrl} />
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
                </Link>
            }
        </div>
    );
};
