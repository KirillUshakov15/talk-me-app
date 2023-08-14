import React, {FC} from 'react';
import style from "@/modules/UserProfileModule/styles/Style.module.scss";

interface IProps{
    username: string | undefined;
    online: boolean | undefined
}

export const UserInfoCard: FC<IProps> = ({username, online}) => {
    return (
        <div className={style.userNameContainer}>
            <div>
                <h2>{username}</h2>
                <span>{online ? 'online' : 'Не в сети'}</span>
            </div>

            <div>
                <p>Пользовательский статус</p>
            </div>
        </div>
    );
};
