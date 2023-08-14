import React, {FC} from 'react';
import style from "@/modules/MessengerModule/styles/Room.module.scss";
import {Divider, Skeleton} from "@/ui";

export const RoomsSkeleton: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <Skeleton type={"rectangle"} width={"100%"} height={30} />
                <Skeleton type={"rectangle"} width={"100%"} height={40} />
            </div>
            <Divider/>
            <div className={style.roomsContainer}>
                <Skeleton type={"rectangle"} width={"98%"} height={80} />
                <Skeleton type={"rectangle"} width={"98%"} height={80} />
                <Skeleton type={"rectangle"} width={"98%"} height={80} />
                <Skeleton type={"rectangle"} width={"98%"} height={80} />
            </div>
        </div>
    );
};