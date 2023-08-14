import React, {FC} from 'react';
import style from './Spinner.module.scss'

interface IProps{
    title?: string;
}

export const Spinner: FC<IProps> = ({title}) => {
    return (
        <div className={style.container}>
            <i className='bx bx-loader-alt bx-spin'></i>
            <span>{title}</span>
        </div>
    );
};
