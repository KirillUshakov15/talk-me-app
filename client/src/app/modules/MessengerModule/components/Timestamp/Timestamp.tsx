import React, {FC} from 'react';
import style from "@/modules/MessengerModule/styles/Messenger.module.scss";

interface IProps{
    date: string | undefined,
}

export const Timestamp: FC<IProps> = ({date}) => {
    return (
        <div className={style.timestampWrapper}>
            <span className={style.timestampContainer}>
                {date}
            </span>
        </div>
    );
};
