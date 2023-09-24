import React, {FC} from 'react';
import style from '../../styles/Style.module.scss'
import {Avatar, ProfileButtons, UserInfoCard} from "@/modules/UserProfileModule/components";
import {useGetUserQuery} from "@/services/user-service";
import {useNavigate, useParams} from "react-router-dom";
import {IUser} from "@/models/IUserData";
import {ProfileLayoutSkeleton} from "@/modules/UserProfileModule/components/ProfileLayout/ProfileLayoutSkeleton";

export const ProfileLayout: FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {data: user = {} as IUser, isLoading, isError} = useGetUserQuery(id!)

    if(isLoading){
        return (
            <ProfileLayoutSkeleton/>
        )
    }

    return (
        <>
            <div className={style.header}>
                <UserInfoCard username={`${user.firstName} ${user.secondName}`} online={user.online}/>
            </div>
            <div className={style.wrapper}>
                <div className={style.leftContainer}>
                    <Avatar image={user.avatarUrl}/>
                    <ProfileButtons userID={user.id}/>
                </div>

                <div className={style.rightContainer}>
                    <div className={style.wall}/>
                </div>
            </div>
        </>

    );
};
