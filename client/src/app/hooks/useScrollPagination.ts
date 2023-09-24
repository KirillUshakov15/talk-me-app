import React, {useEffect, useRef, useState} from "react";

type ScrollDirectionType = 'up' | 'down'

interface IOptions {
    scrollDirection: ScrollDirectionType,
    totalCount?: number,
    limit: number,
    isFetching: boolean;
}

export default function ({scrollDirection, totalCount, limit, isFetching}: IOptions){
    const scrollRef = useRef<null | HTMLDivElement>(null);

    const [page, setPage] = useState(1);

    const onScroll = () => {
        switch (scrollDirection){
            case "down": {
                return scrollDown()
            }
            case "up": {
                return scrollUp()
            }
        }
    };

    const scrollDown = () => {
        if (scrollRef.current && totalCount) {
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current
            if ((scrollHeight - (scrollTop + clientHeight) < 100) && page < totalCount / limit && !isFetching) {
                setPage(prevState => prevState + 1)
            }
        }
    }

    const scrollUp = () => {
        if (scrollRef.current && totalCount) {
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current
            if (-scrollTop >= (scrollHeight - clientHeight) && page < totalCount / limit && !isFetching) {
                setPage(prevState => prevState + 1)
            }
        }
    }

    return {
        page,
        setPage,
        onScroll,
        scrollRef,
    }
}