import React, {FC} from 'react';
import {Button} from "@/ui";

export const SendMessageButton: FC = () => {
    return (
        <Button.Primary type='submit'>
            <i className='bx bx-send'></i>
        </Button.Primary>
    );
};
