import {useEffect, useState} from "react";
import {IMessagesPeriod} from "@/models/IMessage";
import useSocket from "@/hooks/useSocket";
import useScrollPagination from "@/hooks/useScrollPagination";
import useAction from "@/hooks/redux";

export function useChat(roomID: string){
    const {fillMessages, clearMessages} = useAction();
    const [count, setCount] = useState<number>(0)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const {page, setPage, onScroll, scrollRef} = useScrollPagination({
        totalCount: count,
        scrollDirection: 'up',
        limit: 10,
        isFetching: isFetching,
    });
    const {initSocket, closeSocket, sendMessage, deleteMessage, getMessages, editMessage} = useSocket(roomID, page)
    //const [messages, setMessages] = useState<IMessagesPeriod[]>([] as IMessagesPeriod[])

    useEffect(() => {
        initSocket();

        fetchNewMessages()

        return () => {
            closeChat();
        }
    }, [roomID])

    useEffect(() => {
        fetchNewMessages()
    }, [page])

    const fetchNewMessages = () => {
        setIsFetching(true)
        getMessages((newMessages: [IMessagesPeriod[], number]) => {
            setCount(newMessages[1]);
            fillMessages([...newMessages[0]])
            setIsFetching(false)
            //setMessages([...messages, ...newMessages[0]])
        });

    }

    const closeChat = () => {
        clearMessages();
        closeSocket();
        setPage(1)
    }

    return {
        editMessage,
        sendMessage,
        deleteMessage,
        onScroll,
        scrollRef,
    }
}