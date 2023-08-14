import React, {FC} from 'react';
import style from './Card.module.scss'

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: React.ReactNode,
    width?: number;
    centerAlign?: boolean;
}

export const Card: FC<IProps> = ({
                                     children,
                                     width,
                                     centerAlign = false,
                                     ...props
}) => {
    return (
        <div className={centerAlign ? `${style.wrapper}` : undefined}>
            <div className={`${style.container} ${props.className}`} style={{width: `${width}%`}} {...props}>
                {children}
            </div>
        </div>

    );
};
