import React, {FC, useEffect, useRef} from 'react';
import style from './Alert.module.scss'
import useAction, {useAppSelector} from "@/hooks/redux";
import Icons from '@/assets/alert'

export const Alert: FC = () => {
    const {isShow, title, type} = useAppSelector(state => state.popup.alert)
    const {closeAlert} = useAction()

    const timeout = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if(isShow){
            timeout.current = setTimeout(closeAlert, 5000);
        }
        return () => clearTimeout(timeout.current);
    }, [isShow])

    return (
        <div className={isShow ? `${style.container} ${style.show}` : style.container}>
            <div className={`${style.body} ${style[type]}`}>
                <img src={Icons[type]} className={style.icon} alt={'alert-img'}/>
                <p>{title}</p>
                <span className={style.closeBtn} onClick={closeAlert}>X</span>
            </div>
        </div>
    );
};