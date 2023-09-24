import {io, Socket} from "socket.io-client";
import {API_SERVER_URL} from "@/contants/api";
import {useRef} from "react";
import {MessageType} from "@/models/IMessage";

export default function (roomID: string, page: number){

    const socket = useRef<Socket | null>(null);

    const initSocket = () => {
        socket.current = io(API_SERVER_URL, {query: {roomID}})

        socket.current?.on('connect', () => {
            socket.current?.emit('room:join', {roomID})
        })
    }

    const closeSocket = () => {
        socket.current?.emit('room:leave', {roomID})
        socket.current?.disconnect();
    }

    const getMessages = (callback: Function) => {
        const body = {roomID, page}

        socket.current?.emit('messages:get', body);

        socket.current?.on('room:get', newMessages => {
            callback(newMessages);
        })
    }

    const sendMessage = (text: string, author: string, type: MessageType = MessageType.DEFAULT) => {
        const body = {text, author, roomID, page, type}
        socket.current?.emit('message:send', body)
    }

    const editMessage = (id: string, text: string) => {
        const body = {id, text, roomID, page}
        socket.current?.emit('message:edit', body)
    }

    const deleteMessage = (id: string) => {
        return () => {
            const body = {id, roomID, page}
            socket.current?.emit('message:delete', body)
        }
    }

    return {
        initSocket,
        closeSocket,
        getMessages,
        sendMessage,
        deleteMessage,
        editMessage
    }

}