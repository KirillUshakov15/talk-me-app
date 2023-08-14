import React, {SetStateAction} from "react";

export default function<T> (setState: React.Dispatch<SetStateAction<T>>){
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    };
}