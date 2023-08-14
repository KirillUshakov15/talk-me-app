import React, {FC} from 'react';
import style from './Skeleton.module.scss'

interface IProps {
    type: 'rectangle' | 'circle',
    width?: string | number,
    height?: string | number
}

export const Skeleton: FC<IProps> = ({type, width, height}) => {

    switch (type) {
        case "circle": {
            return (
                <div className={style.skeleton} />
            )
        }
        case "rectangle": {
            return (
                <div style={{width: width, height: height, borderRadius: '10px'}} className={style.skeleton} />
            )
        }
    }
};