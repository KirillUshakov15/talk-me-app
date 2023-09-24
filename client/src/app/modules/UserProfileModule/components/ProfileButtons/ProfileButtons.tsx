import React, {FC, useEffect} from 'react';
import {useAppSelector} from "@/hooks/redux";
import style from "@/modules/UserProfileModule/styles/Style.module.scss";
import {Button} from "@/ui";
import {Link, useNavigate} from "react-router-dom";
import {EDIT_PROFILE_PAGE_ROUTE, MESSENGER_PAGE_ROUTE} from "@/contants/routes";
import {useCreateRoomMutation} from "@/services/messenger-service";
import {RoomType} from "@/models/IRoom";
import isCurrentUser from "@/utils/is-current-user";

interface IProps {
    userID: string
}

export const ProfileButtons: FC<IProps> = ({userID}) => {
    const navigate = useNavigate();
    const {userData} = useAppSelector((state) => state.auth)
    const [createRoom, {isLoading, isSuccess}] = useCreateRoomMutation()

    useEffect(() => {
        if(isSuccess){
            navigate(MESSENGER_PAGE_ROUTE)
        }
    }, [isSuccess])

    const writeMessage = () => {
        createRoom({
            ids: [userID],
            type: RoomType.DIALOG
        })
    }

    return (
        <div className={style.profileButtons}>
            {isCurrentUser(userID) ?
                <Link to={EDIT_PROFILE_PAGE_ROUTE}>
                    <Button.Primary>Редактировать профиль</Button.Primary>
                </Link>
                :
                <>
                    <Button.Primary onClick={writeMessage} loading={isLoading}>Написать сообщение</Button.Primary>
                    <Button.Primary>Добавить в друзья</Button.Primary>
                </>
            }
        </div>
    );
};
