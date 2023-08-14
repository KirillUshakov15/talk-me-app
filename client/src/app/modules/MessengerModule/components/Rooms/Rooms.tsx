import React, {FC} from 'react';
import style from '@/modules/MessengerModule/styles/Room.module.scss'
import {Room} from "@/modules/MessengerModule/components";
import {IRoom} from "@/models/IRoom";
import {useGetRoomsQuery} from "@/services/user-service";
import {Divider, Input} from "@/ui";
import {RoomsSkeleton} from "@/modules/MessengerModule/components/Rooms/RoomsSkeleton";

export const Rooms: FC = () => {
    const {data: rooms = [] as IRoom[], isLoading} = useGetRoomsQuery('', {
        refetchOnMountOrArgChange: true,
        pollingInterval: 2500,
    })

    if(isLoading){
        return (
            <RoomsSkeleton/>
        )
    }

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h3>Мои чаты</h3>
                <Input placeholder="Поиск..."/>
            </div>
            <Divider/>
            <div className={style.roomsContainer}>
                {(rooms && rooms.length > 0) && rooms.map(room =>
                    <Room key={room.id} room={room}/>
                )}
            </div>
        </div>
    );
};
