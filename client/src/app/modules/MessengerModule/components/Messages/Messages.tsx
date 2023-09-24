import React, {FC} from 'react';
import {IMessagesPeriod} from "@/models/IMessage";
import {Message, Timestamp} from "@/modules/MessengerModule/components";
import {getDate} from "@/utils/datetime";
import {useAppSelector} from "@/hooks/redux";

interface IProps {
    onDelete: (id: string) => () => void
}

export const Messages: FC<IProps> = ({onDelete}) => {

    const {messages} = useAppSelector(state => state.message)

    return (
        <>
            {messages.map(period => {
                return (
                    <div key={period.date}>
                        <Timestamp date={getDate(period.date)} />
                        {period.messages.slice().reverse().map(message =>
                            <Message key={message.id} body={message} onDelete={onDelete}/>
                        )}
                    </div>
                )
            })}
        </>
    );
};
