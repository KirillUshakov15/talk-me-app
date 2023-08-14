import React, {FC, useState} from 'react';
import icon from '@/assets/icons/'
import style from './Input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputExtensions{
    Password: typeof InputPassword
}

export const Input: FC<InputProps> & InputExtensions = ({...props}) => {
    return (
        <input className={style.input} {...props} />
    );
};

const InputPassword: FC<InputProps> = ({...props}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(prevState => !prevState)
    }

    return (
        <div className={style.password_container}>
            <Input type={visible ? 'text' : 'password'} {...props} />
            <img onClick={toggleVisibility} src={visible ? icon.hide : icon.show} alt={'password-icon'}/>
        </div>
    )
}

Input.Password = InputPassword