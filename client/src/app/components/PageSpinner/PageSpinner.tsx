import React, {FC} from 'react';
import style from './PageSpinner.module.scss'
import {Spinner} from "@/ui";

export const PageSpinner: FC = () => {
    return (
        <div className={style.wrapper}>
            <Spinner title="Загрузка содержимого страницы..."/>
        </div>
    );
};
