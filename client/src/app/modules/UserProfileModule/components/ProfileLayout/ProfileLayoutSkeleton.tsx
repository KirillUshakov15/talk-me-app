import React, {FC} from 'react';
import style from "@/modules/UserProfileModule/styles/Style.module.scss";
import {Skeleton} from "@/ui";

export const ProfileLayoutSkeleton: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.leftContainer}>
                <Skeleton type={"rectangle"} width={"100%"} height={"50%"} />
                <div className={style.profileButtons}>
                    <Skeleton type={"rectangle"} width={"100%"} height={40} />
                    <Skeleton type={"rectangle"} width={"100%"} height={40} />
                </div>
            </div>

            <div className={style.rightContainer}>
                <div className={style.userNameContainer}>
                    <div>
                        <Skeleton type={"rectangle"} width={"50%"} height={25} />
                        <Skeleton type={"rectangle"} width={"15%"} height={25} />
                    </div>

                    <div>
                        <Skeleton type={"rectangle"} width={"30%"} height={25} />
                    </div>
                </div>
                <div className={style.wall}></div>
            </div>
        </div>
    );
};
