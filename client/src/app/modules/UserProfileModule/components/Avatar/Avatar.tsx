import React, {FC} from 'react';
import style from "@/modules/UserProfileModule/styles/Style.module.scss";
import {API_SERVER_IMAGES_PATH, API_SERVER_URL} from "@/contants/api";
import icons from "@/assets/icons";

interface IProps{
    image: string
}

export const Avatar: FC<IProps> = ({image}) => {
    return (
        <div className={style.avatar}>
            <img
                src={image ? `${API_SERVER_IMAGES_PATH}${image}` : icons.user}
                alt={"avatar"}
            />
        </div>
    );
};
