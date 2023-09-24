import React, {FC, memo, useEffect, useState} from 'react';
import style from '@/modules/MessengerModule/styles/Room.module.scss'
import {Room} from "@/modules/MessengerModule/components";
import {IRoomPagination} from "@/models/IRoom";
import {useGetRoomsQuery, useLazyGetRoomQuery} from "@/services/messenger-service";
import {RoomsSkeleton} from "@/modules/MessengerModule/components/Rooms/RoomsSkeleton";
import useScrollPagination from "@/hooks/useScrollPagination";
import useAction, {useAppSelector} from "@/hooks/redux";

interface IProps {
    queryText: string
}

export const Rooms: FC<IProps> = memo(({queryText}) => {

    const [page, setPage] = useState<number>(1)

    const {room: selectedRoom} = useAppSelector((state) => state.room)
    const [getRoom] = useLazyGetRoomQuery();

    const {data = {count: 0} as IRoomPagination, isLoading} = useGetRoomsQuery({queryText, page}, {
        refetchOnMountOrArgChange: true,
        pollingInterval: queryText ? undefined : 4500,
    })

    const {page: currentPage, onScroll, scrollRef} = useScrollPagination({
        scrollDirection: 'down',
        limit: 7,
        isFetching: isLoading,
        totalCount: data?.count
    })

    useEffect(() => {
        if(currentPage) setPage(currentPage)
    }, [currentPage])

    if(isLoading){
        return (
            <RoomsSkeleton/>
        )
    }

    return (
        <div className={style.roomsContainer} onScroll={onScroll} ref={scrollRef}>
            {queryText && <h4>Результаты поиска "{queryText}":</h4>}
            {(queryText && data?.rooms?.length <= 0) && <h4 className={style.notFoundLabel}>Ничего не найдено</h4>}
            {(data?.rooms && data?.rooms?.length > 0) && data.rooms.map(room =>
                <Room key={room.id} room={room} selectedRoomID={selectedRoom?.id} onSelected={getRoom}/>
            )}
        </div>

    );
});
