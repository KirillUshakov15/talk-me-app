import React, {FC} from 'react';
import style from './Divider.module.scss'

interface IProps {
    className?: string;
}

export const Divider: FC<IProps> = ({className}) => {
    return (
        <hr className={`${className} ${style.divider}`}/>
    );
};
