import React, {FC} from 'react';

interface IProps{
    children: React.ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: FC<IProps> = ({children, onSubmit, ...props}) => {

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <form {...props} onSubmit={submit}>
            {children}
        </form>
    );
};
