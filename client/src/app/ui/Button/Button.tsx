import React, {FC} from 'react';
import './Button.module.scss'
import style from './Button.module.scss'
import {Spinner} from "@/ui";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    loading?: boolean;
}

interface ButtonExtensions {
    Danger: typeof ButtonDanger,
    Primary: typeof ButtonPrimary
}

export const Button: FC<IProps> & ButtonExtensions = ({
    children,
    loading,
    className,
    ...props
                                   }) => {
    return (
        <button {...props} className={`${style.buttonDefault} ${className}`} disabled={loading || props.disabled}>
            <div>
                {loading && <Spinner/>}
                {children}
            </div>
        </button>
    );
};

const ButtonDanger: FC<IProps> = ({...props}) => {
    return (
        <Button {...props} className={`${style.buttonDanger} ${props.className}`}>
            {props.children}
        </Button>
    )
}

const ButtonPrimary: FC<IProps> = ({...props}) => {
    return (
        <Button {...props} className={`${style.buttonPrimary} ${props.className}`}>
            {props.children}
        </Button>
    )
}

Button.Danger = ButtonDanger
Button.Primary = ButtonPrimary