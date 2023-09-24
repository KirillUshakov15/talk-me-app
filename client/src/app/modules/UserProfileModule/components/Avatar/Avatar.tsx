import React, {FC} from 'react';
import style from "@/modules/UserProfileModule/styles/Style.module.scss";
import {API_SERVER_IMAGES_PATH, API_SERVER_URL} from "@/contants/api";
import icons from "@/assets/icons";

interface IProps{
    uploadedImage?: string | null,
    image: string
}

export const Avatar: FC<IProps> = ({image, uploadedImage}) => {
    return (
        <div className={style.avatar}>
            <img
                src={uploadedImage ? uploadedImage : image ? `${API_SERVER_IMAGES_PATH}${image}` : icons.avatarDefault}
                alt={"avatar"}
            />
        </div>
    );
};
