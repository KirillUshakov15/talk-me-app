import React, {FC, useEffect} from 'react';
import {useAppSelector} from "@/hooks/redux";
import style from "@/modules/UserProfileModule/styles/Style.module.scss";
import {Button} from "@/ui";
import {useNavigate} from "react-router-dom";
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
            users: [{id: userID}],
            type: RoomType.DIALOG
        })
    }

    const openEditProfilePage = () => {
        navigate(EDIT_PROFILE_PAGE_ROUTE)
    }

    return (
        <div className={style.profileButtons}>
            {isCurrentUser(userID) ?
                <Button onClick={openEditProfilePage}>Редактировать профиль</Button>
                :
                <>
                    <Button onClick={writeMessage} loading={isLoading}>Написать сообщение</Button>
                    <Button>Добавить в друзья</Button>
                </>
            }
        </div>
    );
};
