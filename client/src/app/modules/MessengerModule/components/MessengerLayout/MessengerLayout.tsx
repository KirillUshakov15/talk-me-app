import React, {FC} from 'react';
import style from "@/modules/MessengerModule/styles/Style.module.scss";
import {Chat} from "@/modules/MessengerModule/components";
import {RoomsContainer} from "@/modules/MessengerModule/components/Rooms";
import {CreateConversationModal} from "@/modules/MessengerModule/components/CreateConversation";
import {useAppSelector} from "@/hooks/redux";

export const MessengerLayout: FC = () => {

    const {isOpen} = useAppSelector(state => state.popup.modal)

    return (
        <div className={style.layoutWrapper}>
            {isOpen && <CreateConversationModal/>}
            <RoomsContainer/>
            <Chat/>
        </div>
    );
};
