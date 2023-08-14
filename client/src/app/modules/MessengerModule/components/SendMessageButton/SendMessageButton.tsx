import React, {FC} from 'react';
import {Button} from "@/ui";

export const SendMessageButton: FC = () => {
    return (
        <Button type='submit'>
            <i className='bx bx-send'></i>
        </Button>
    );
};
