import React, {FC} from 'react';
import style from "@/modules/MessengerModule/styles/Style.module.scss";
import {Chat, Rooms} from "@/modules/MessengerModule/components";

export const MessengerLayout: FC = () => {

    return (
        <div className={style.wrapper}>
            <Rooms/>
            <Chat/>
        </div>
    );
};
